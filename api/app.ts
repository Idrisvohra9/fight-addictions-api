import fightLustData from "./fightLustQuotes.json" with { type: "json" };
import fightDrugsData from "./fightDrugsQuotes.json" with { type: "json" };

export default {
  async fetch(req: Request): Promise<Response> {
    const url = new URL(req.url);

    // Define routes
    if (url.pathname === "/" && req.method === "GET") {
      return new Response("Welcome to Fight Addictions API!", { status: 200 });
      // Fight Lust Quotes
    } else if (url.pathname === "/lust/quotes" && req.method === "GET") {
      // Fight Lust Quotes - Random Quote
      if (url.searchParams.get("type") === "random") {
        const randomIndex = Math.floor(Math.random() * fightLustData.length);
        const randomQuote = fightLustData[randomIndex];
        return new Response(JSON.stringify(randomQuote), {
          headers: { "Content-Type": "application/json" },
          status: 200
        });

      // Fight Lust Quotes - Daily Quote
      } else if (url.searchParams.get("type") === "daily"){
        const currentDate = new Date();
        const currentDay = currentDate.getDate();
        const todaysQuote = fightLustData[currentDay-1];
        return new Response(JSON.stringify(todaysQuote), {
          headers: { "Content-Type": "application/json" },
          status: 200
        });
      }

      return new Response(JSON.stringify(fightLustData), {
        headers: { "Content-Type": "application/json" },
        status: 200
      });
      // Fight Drugs Quotes
    } else if (url.pathname === "/drugs/quotes" && req.method === "GET") {
      // Fight drugs Quotes - Random Quote
      if (url.searchParams.get("type") === "random") {
        const randomIndex = Math.floor(Math.random() * fightDrugsData.length);
        const randomQuote = fightDrugsData[randomIndex];
        return new Response(JSON.stringify(randomQuote), {
          headers: { "Content-Type": "application/json" },
          status: 200
        });

      // Fight drugs Quotes - Daily Quote
      } else if (url.searchParams.get("type") === "daily"){
        const currentDate = new Date();
        const currentDay = currentDate.getDate();
        const todaysQuote = fightDrugsData[currentDay-1];
        return new Response(JSON.stringify(todaysQuote), {
          headers: { "Content-Type": "application/json" },
          status: 200
        });
      }

      return new Response(JSON.stringify(fightLustData), {
        headers: { "Content-Type": "application/json" },
        status: 200
      });
    } else if (url.pathname === "/add/quotes" && req.method === "POST") {
      const body = await req.json();
      return new Response(JSON.stringify({ message: `User ${body.name} added.` }), {
        headers: { "Content-Type": "application/json" },
        status: 201
      });
    } else {
      return new Response("Not Found", { status: 404 });
    }
  },
};
