import fightLustData from "../data/fightLustQuotes.json" with { type: "json" };
import fightDrugsData from "../data/fightDrugsQuotes.json" with { type: "json" };
import fightScreenData from "../data/fightScreenQuotes.json" with { type: "json" };
import fightGamblingData from "../data/fightGamblingQuotes.json" with { type: "json" };
import fightFoodData from "../data/fightFoodQuotes.json" with { type: "json" };
import motivationData from "../data/motivationQuotes.json" with { type: "json" };
import { join } from "https://deno.land/std@0.198.0/path/mod.ts";

const getQuoteResponse = (quotes: any[], type: string | null) =>
  type === "random"
    ? quotes[Math.floor(Math.random() * quotes.length)]
    : type === "daily"
    ? quotes[new Date().getDate() - 1]
    : quotes;

const createJsonResponse = (data: any, status: number) =>
  new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
    status,
  });

export default {
  async fetch(req: Request): Promise<Response> {
    const { pathname, searchParams } = new URL(req.url);
    const quoteType = searchParams.get("type");

    if (req.method === "GET") {
      if (pathname === "/") {
        // Serve the index.html file for the root path
        try {
          const filePath = join(Deno.cwd(), "./index.html");
          const file = await Deno.readFile(filePath);
          return new Response(file, {
            headers: { "Content-Type": "text/html" },
            status: 200,
          });
        } catch {
          return new Response("Index file not found", { status: 500 });
        }
      }
      // Serve static assets like images
      if (pathname.startsWith("/assets/")) {
        const filePath = join(Deno.cwd(), pathname);
        try {
          const file = await Deno.readFile(filePath);

          // Determine content type based on file extension
          const ext = filePath.split(".").pop();
          const mimeType = {
            jpg: "image/jpeg",
            jpeg: "image/jpeg",
            png: "image/png",
            gif: "image/gif",
            svg: "image/svg+xml",
          }[ext || ""];

          return new Response(file, {
            headers: { "Content-Type": mimeType || "application/octet-stream" },
            status: 200,
          });
        } catch {
          return new Response("File not found", { status: 404 });
        }
      }
      if (pathname === "/lust/quotes")
        return createJsonResponse(getQuoteResponse(fightLustData, quoteType), 200);

      if (pathname === "/drugs/quotes")
        return createJsonResponse(getQuoteResponse(fightDrugsData, quoteType), 200);

      if (pathname === "/screen/quotes")
        return createJsonResponse(getQuoteResponse(fightScreenData, quoteType), 200);

      if (pathname === "/gambling/quotes")
        return createJsonResponse(getQuoteResponse(fightGamblingData, quoteType), 200);

      if (pathname === "/food/quotes")
        return createJsonResponse(getQuoteResponse(fightFoodData, quoteType), 200);

      if (pathname === "/motivational/quotes")
        return createJsonResponse(getQuoteResponse(motivationData, quoteType), 200);
    }

    return new Response("Not Found", { status: 404 });
  },
};
