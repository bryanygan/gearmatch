import crypto from "crypto";
import fs from "fs";
import path from "path";
import os from "os";

function resolveKeyPath(keyPath: string): string {
  if (keyPath.startsWith("~")) {
    return path.join(os.homedir(), keyPath.slice(1));
  }
  return keyPath;
}

export function generateWalmartAuth(
  consumerId: string,
  keyPath: string,
  keyVersion = "1"
): Record<string, string> {
  const timestamp = Date.now().toString();
  const resolvedPath = resolveKeyPath(keyPath);
  const privateKey = fs.readFileSync(resolvedPath, "utf-8");
  const stringToSign = `${consumerId}\n${timestamp}\n${keyVersion}\n`;

  const sign = crypto.createSign("RSA-SHA256");
  sign.update(stringToSign);
  const signature = sign.sign(privateKey, "base64");

  return {
    "WM_CONSUMER.ID": consumerId,
    "WM_CONSUMER.INTIMESTAMP": timestamp,
    "WM_SEC.KEY_VERSION": keyVersion,
    "WM_SEC.AUTH_SIGNATURE": signature,
  };
}

export const WALMART_API_BASE =
  "https://developer.api.walmart.com/api-proxy/service/affil/product/v2";

export async function walmartApiCall<T>(
  endpoint: string,
  consumerId: string,
  keyPath: string
): Promise<T | null> {
  const headers = generateWalmartAuth(consumerId, keyPath);
  const url = `${WALMART_API_BASE}${endpoint}`;

  try {
    const res = await fetch(url, {
      headers: {
        ...headers,
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(30000),
    });

    if (!res.ok) {
      if (res.status === 429) {
        console.log("  Walmart rate limited, waiting 60s...");
        await new Promise((r) => setTimeout(r, 60000));
        const retry = await fetch(url, {
          headers: { ...generateWalmartAuth(consumerId, keyPath), Accept: "application/json" },
          signal: AbortSignal.timeout(30000),
        });
        if (!retry.ok) return null;
        return (await retry.json()) as T;
      }
      console.log(`  Walmart API error: ${res.status} ${res.statusText}`);
      return null;
    }

    return (await res.json()) as T;
  } catch (e) {
    console.log(`  Walmart API error: ${e instanceof Error ? e.message : e}`);
    return null;
  }
}
