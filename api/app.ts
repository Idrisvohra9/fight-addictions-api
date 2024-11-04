import fightLustData from "./fightLustQuotes.json" with { type: "json" };
import fightDrugsData from "./fightDrugsQuotes.json" with { type: "json" };
import fightScreenData from "./fightScreenQuotes.json" with { type: "json"};
import fightGamblingData from "./fightGamblingQuotes.json" with { type: "json"};
import fightFoodData from "./fightFoodQuotes.json" with { type: "json"};
import { serveFile } from "https://deno.land/std@0.207.0/http/file_server.ts";

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
      if (pathname === "/")
        return new Response("Welcome to Fight Addictions API!\n\nGet a random quote:\n- Tackle Lust, Sex, Masturbation, Porn Addictions: GET lust/quotes?type=random\n- Tackle Drugs, Alcohol Addictions: GET drugs/quotes?type=random\n- Tackle Gambling Addictions: GET gambling/quotes?type=random\n- Tackle Phone, Video Games Addictions: GET screen/quotes?type=random\n- Tackle Food Addictions: GET food/quotes?type=random\n\nGet a daily quote:\n- Tackle Lust, Sex, Masturbation, Porn Addictions: GET lust/quotes?type=daily\n- Tackle Drugs, Alcohol Addictions: GET drugs/quotes?type=daily\n- Tackle Gambling Addictions: GET gambling/quotes?type=daily\n- Tackle Phone, Video Games Addictions: GET screen/quotes?type=daily\n- Tackle Food Addictions: GET food/quotes?type=daily", { status: 200 });

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