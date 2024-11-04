import fightLustData from "./fightLustQuotes.json" with { type: "json" };
import fightDrugsData from "./fightDrugsQuotes.json" with { type: "json" };
import fightScreenData from "./fightScreenQuotes.json" with { type: "json"};
import fightGamblingData from "./fightGamblingQuotes.json" with { type: "json"};
import fightFoodData from "./fightFoodQuotes.json" with { type: "json"};

const getQuoteResponse = (quotes: any[], type: string | null) =>
  type === "random" ? quotes[Math.floor(Math.random() * quotes.length)] :
    type === "daily" ? quotes[new Date().getDate() - 1] :
      quotes;

const createJsonResponse = (data: any, status: number) =>
  new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
    status
  });

export default {
  async fetch(req: Request): Promise<Response> {
    const { pathname, searchParams } = new URL(req.url);
    const quoteType = searchParams.get("type");

    if (req.method === "GET") {
      if (pathname === "/" && req.method === "GET")
        return new Response("Welcome to Fight Addictions API!", { status: 200 });

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

    }

    // if (pathname === "/add/quotes" && req.method === "POST") {
    //   const body = await req.json();
    //   return createJsonResponse({ message: `User ${body.name} added.` }, 201);
    // }

    return new Response("Not Found", { status: 404 });
  },
};