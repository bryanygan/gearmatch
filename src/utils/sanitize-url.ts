/**
 * Validates that a URL uses a safe protocol (https or http).
 * Returns the URL string if safe, or undefined if potentially dangerous
 * (e.g. javascript:, data:, vbscript: URIs).
 */
export function sanitizeUrl(url: string | undefined | null): string | undefined {
  if (!url) return undefined;
  try {
    const parsed = new URL(url);
    if (parsed.protocol === "https:" || parsed.protocol === "http:") {
      return url;
    }
    return undefined;
  } catch {
    // Relative URLs are safe (they resolve against the current origin)
    if (url.startsWith("/")) return url;
    return undefined;
  }
}
