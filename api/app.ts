import fightLustData from "../data/fightLustQuotes.json" with { type: "json" };
import fightDrugsData from "../data/fightDrugsQuotes.json" with { type: "json" };
import fightScreenData from "../data/fightScreenQuotes.json" with { type: "json" };
import fightGamblingData from "../data/fightGamblingQuotes.json" with { type: "json" };
import fightFoodData from "../data/fightFoodQuotes.json" with { type: "json" };
import motivationData from "../data/motivationQuotes.json" with { type: "json" };
import spiritualData from "../data/spiritualQuotes.json" with { type: "json" };

import { join } from "https://deno.land/std@0.198.0/path/mod.ts";

// ─── Types ──────────────────────────────────────────────────────
interface Quote {
  id: number;
  quote: string;
  source?: string;
  religion?: string;
}

// ─── Valid religions (uppercase) ────────────────────────────────
const VALID_RELIGIONS = new Set(
  spiritualData.map((q) => q.religion?.toUpperCase()).filter(Boolean)
);

// ─── Caches ─────────────────────────────────────────────────────
// Cache filtered spiritual quotes per religion so we don't filter on every request
const spiritualQuotesByReligion = new Map<string, Quote[]>();
for (const religion of VALID_RELIGIONS) {
  if (religion) {
    spiritualQuotesByReligion.set(
      religion,
      spiritualData.filter(
        (q) => q.religion?.toUpperCase() === religion
      ) as Quote[]
    );
  }
}

// Cache for index.html (read once, serve many)
let cachedIndexHtml: Uint8Array | null = null;

// ─── CORS headers ───────────────────────────────────────────────
const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// ─── Helpers ────────────────────────────────────────────────────

/**
 * Returns a quote based on the requested type:
 * - "random"  → a random quote from the array
 * - "daily"   → deterministic daily quote that cycles through ALL quotes
 *               using (dayOfYear % length), so every quote is used before repeating
 * - (default) → the full array
 */
const getDayOfYear = (): number => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay); // 1–366
};

const getQuoteResponse = (quotes: Quote[], type: string | null): Quote | Quote[] => {
  if (type === "random") {
    return quotes[Math.floor(Math.random() * quotes.length)];
  }
  if (type === "daily") {
    // For religion-specific quotes (31 each), day-of-month (1–31) maps perfectly.
    // For other categories, use dayOfYear % length to cycle through all quotes.
    const dayOfMonth = new Date().getDate(); // 1–31
    if (quotes.length === 31) {
      return quotes[dayOfMonth - 1];
    }
    // For arrays with different lengths, use dayOfYear to cycle through all
    const dayOfYear = getDayOfYear();
    return quotes[dayOfYear % quotes.length];
  }
  return quotes;
};

const getReligiousQuotes = (religion: string, type: string | null): Quote | Quote[] | null => {
  const filteredQuotes = spiritualQuotesByReligion.get(religion);
  if (!filteredQuotes || filteredQuotes.length === 0) {
    return null; // Invalid religion
  }
  return getQuoteResponse(filteredQuotes, type);
};

const createJsonResponse = (data: unknown, status: number, cacheMaxAge = 0): Response => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...CORS_HEADERS,
  };
  if (cacheMaxAge > 0) {
    headers["Cache-Control"] = `public, max-age=${cacheMaxAge}`;
  }
  return new Response(JSON.stringify(data), { headers, status });
};

const createErrorResponse = (message: string, status: number): Response =>
  createJsonResponse({ error: message }, status);

// ─── Main handler ───────────────────────────────────────────────
export default {
  async fetch(req: Request): Promise<Response> {
    const { pathname, searchParams } = new URL(req.url);
    const quoteType = searchParams.get("type");

    // Validate type parameter if provided
    if (quoteType && !["random", "daily"].includes(quoteType)) {
      return createErrorResponse(
        "Invalid type parameter. Use 'random', 'daily', or omit for all quotes.",
        400
      );
    }

    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
      return new Response(null, { headers: CORS_HEADERS, status: 204 });
    }

    // Only allow GET requests
    if (req.method !== "GET") {
      return createErrorResponse("Method not allowed. Only GET requests are supported.", 405);
    }

    // ── Serve index.html ──────────────────────────────────────
    if (pathname === "/") {
      try {
        if (!cachedIndexHtml) {
          const filePath = join(Deno.cwd(), "index.html");
          cachedIndexHtml = await Deno.readFile(filePath);
        }
        return new Response(cachedIndexHtml, {
          headers: {
            "Content-Type": "text/html",
            "Cache-Control": "public, max-age=600",
            ...CORS_HEADERS,
          },
          status: 200,
        });
      } catch {
        return new Response("Index file not found", { status: 500 });
      }
    }

    // ── Serve static assets ───────────────────────────────────
    if (pathname.startsWith("/assets/")) {
      // Prevent path traversal attacks
      const sanitizedPath = pathname.replace(/\.\./g, "");
      const filePath = join(Deno.cwd(), sanitizedPath);

      try {
        const file = await Deno.readFile(filePath);
        const ext = filePath.split(".").pop()?.toLowerCase();
        const mimeTypes: Record<string, string> = {
          jpg: "image/jpeg",
          jpeg: "image/jpeg",
          png: "image/png",
          gif: "image/gif",
          svg: "image/svg+xml",
          webp: "image/webp",
          ico: "image/x-icon",
          css: "text/css",
          js: "application/javascript",
        };

        return new Response(file, {
          headers: {
            "Content-Type": mimeTypes[ext || ""] || "application/octet-stream",
            "Cache-Control": "public, max-age=86400", // 24h cache for assets
            ...CORS_HEADERS,
          },
          status: 200,
        });
      } catch {
        return createErrorResponse("File not found", 404);
      }
    }

    // ── Quote endpoints ───────────────────────────────────────
    // Cache durations: daily=until-midnight (~43200s avg), random=no-cache, all=1h
    const quoteCacheAge = quoteType === "daily" ? 43200 : quoteType === "random" ? 0 : 600;

    if (pathname === "/lust/quotes") {
      return createJsonResponse(getQuoteResponse(fightLustData, quoteType), 200, quoteCacheAge);
    }

    if (pathname === "/drugs/quotes") {
      return createJsonResponse(getQuoteResponse(fightDrugsData, quoteType), 200, quoteCacheAge);
    }

    if (pathname === "/screen/quotes") {
      return createJsonResponse(getQuoteResponse(fightScreenData, quoteType), 200, quoteCacheAge);
    }

    if (pathname === "/gambling/quotes") {
      return createJsonResponse(getQuoteResponse(fightGamblingData, quoteType), 200, quoteCacheAge);
    }

    if (pathname === "/food/quotes") {
      return createJsonResponse(getQuoteResponse(fightFoodData, quoteType), 200, quoteCacheAge);
    }

    if (pathname === "/motivational/quotes") {
      return createJsonResponse(getQuoteResponse(motivationData, quoteType), 200, quoteCacheAge);
    }

    // ── Spiritual quotes (with optional religion filter) ─────
    if (pathname.startsWith("/spiritual/quotes")) {
      const parts = pathname.split("/");
      const religion = parts[3]?.toUpperCase();

      if (religion && religion !== "QUOTES") {
        // Validate religion
        if (!VALID_RELIGIONS.has(religion)) {
          const validList = [...VALID_RELIGIONS].map((r) => r.toLowerCase()).sort().join(", ");
          return createErrorResponse(
            `Invalid religion '${parts[3]}'. Valid options: ${validList}`,
            400
          );
        }

        const result = getReligiousQuotes(religion, quoteType);
        if (!result) {
          return createErrorResponse("No quotes found for this religion.", 404);
        }
        return createJsonResponse(result, 200, quoteCacheAge);
      }

      // All spiritual quotes
      return createJsonResponse(getQuoteResponse(spiritualData as Quote[], quoteType), 200, quoteCacheAge);
    }

    // ── 404 fallback ──────────────────────────────────────────
    return createErrorResponse("Not Found. Visit / for API documentation.", 404);
  },
};
