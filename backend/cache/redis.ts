import { Redis } from "@upstash/redis";

/**
 * Upstash Redis client singleton.
 *
 * Uses REST-based HTTP connection — no persistent TCP socket needed,
 * which makes it compatible with Next.js Edge Runtime and serverless
 * environments like Vercel.
 *
 * Cache key convention: `link:<shortCode>`
 * TTL: 24 hours (86400 seconds) for standard links,
 *      or time-until-expiry for links with an expiresAt date.
 *
 * Redis is OPTIONAL — if env vars are not configured (e.g. in local dev),
 * `redis` will be `null` and all cache operations become no-ops.
 */

function createRedisClient(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token || url.includes("[") || token.includes("[")) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[Redis] UPSTASH_REDIS_REST_URL / TOKEN not configured — running without cache."
      );
    }
    return null;
  }

  try {
    return new Redis({ url, token });
  } catch (err) {
    console.error("[Redis] Failed to create client:", err);
    return null;
  }
}

export const redis = createRedisClient();

/** Cache key builder */
export const linkCacheKey = (shortCode: string) => `link:${shortCode}`;

/** Default TTL in seconds (24 hours) */
export const DEFAULT_CACHE_TTL = 86400;
