/**
 * API Middleware
 *
 * Handles CORS, rate limiting, and security headers for all /api/* routes.
 * Runs on Cloudflare Pages Functions via the middleware convention.
 */

interface Env {
  ASSETS: Fetcher;
  ALLOWED_ORIGIN?: string;
}

// In-memory rate limit tracking (per isolate, resets on cold start)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMITS: Record<string, { max: number; windowMs: number }> = {
  search: { max: 30, windowMs: 60_000 },
  filter: { max: 10, windowMs: 60_000 },
};

function getRateLimitKey(ip: string, endpoint: string): string {
  return `${ip}:${endpoint}`;
}

function checkRateLimit(ip: string, endpoint: string): { allowed: boolean; remaining: number } {
  const config = RATE_LIMITS[endpoint];
  if (!config) return { allowed: true, remaining: -1 };

  const key = getRateLimitKey(ip, endpoint);
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + config.windowMs });
    return { allowed: true, remaining: config.max - 1 };
  }

  entry.count++;
  const remaining = Math.max(0, config.max - entry.count);
  return { allowed: entry.count <= config.max, remaining };
}

function getRateLimitEndpoint(pathname: string): string | null {
  if (pathname.includes("/search")) return "search";
  if (pathname.includes("/filter")) return "filter";
  return null;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request } = context;
  const origin = context.env.ALLOWED_ORIGIN || "*";

  // Handle CORS preflight
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "86400",
      },
    });
  }

  // Rate limiting
  const url = new URL(request.url);
  const endpoint = getRateLimitEndpoint(url.pathname);
  if (endpoint) {
    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    const { allowed, remaining } = checkRateLimit(ip, endpoint);

    if (!allowed) {
      const res = new Response(
        JSON.stringify({ error: "Too many requests", retryAfterSeconds: 60 }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": "60",
          },
        }
      );
      addSecurityHeaders(res, origin);
      return res;
    }

    // Attach rate limit info to pass downstream (via headers on response)
    const response = await context.next();
    const newResponse = new Response(response.body, response);
    newResponse.headers.set("X-RateLimit-Remaining", String(remaining));
    addSecurityHeaders(newResponse, origin);
    return newResponse;
  }

  // Non-rate-limited endpoints
  const response = await context.next();
  const newResponse = new Response(response.body, response);
  addSecurityHeaders(newResponse, origin);
  return newResponse;
};

function addSecurityHeaders(response: Response, origin: string): void {
  response.headers.set("Access-Control-Allow-Origin", origin);
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  response.headers.set("Content-Type", "application/json");
}
