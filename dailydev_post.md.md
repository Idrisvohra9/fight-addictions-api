# I Built a Free API to Help People Fight Addictions — And You Can Use It Right Now

We don't talk about it enough — but a lot of us are fighting something.

Maybe it's doomscrolling at 2 AM. Maybe it's a habit you've been trying to break for years. Maybe it's something you haven't told anyone about. Addiction doesn't always look dramatic. Sometimes it's quiet, everyday, and exhausting.

I wanted to build something that helps — even if it's small. So I created **Fight Addictions API**, a completely free REST API that serves curated motivational and spiritual quotes designed to support people on their recovery journey.

No sign-up. No API key. No paywall. Just words that might help someone get through the day.

## What It Does

The API serves **527+ handpicked quotes** across 7 categories:

| Endpoint | What It Tackles | Quotes |
|----------|----------------|--------|
| `/lust/quotes` | Porn, lust, sex addiction | 31 |
| `/drugs/quotes` | Drugs, alcohol, substance abuse | 31 |
| `/gambling/quotes` | Gambling addiction | 31 |
| `/screen/quotes` | Phone, gaming, social media addiction | 31 |
| `/food/quotes` | Binge eating, food addiction | 31 |
| `/motivational/quotes` | General motivation & self-improvement | 62 |
| `/spiritual/quotes` | Spiritual guidance from 9 world religions | 279 |

The spiritual endpoint alone covers **Islam, Christianity, Hinduism, Buddhism, Judaism, Sikhism, Jainism, Sufism, and Atheism** — 31 quotes each. Enough for a unique quote every single day of the month.

## How Simple Is It?

This simple:

```javascript
const res = await fetch(
  "https://fight-addictions-api.deno.dev/spiritual/quotes/islam?type=daily"
);
const quote = await res.json();
console.log(quote.quote);
// "Allah does not burden a soul beyond that it can bear."
```

That's it. One `fetch` call. You get back a clean JSON object:

```json
{
  "id": 2,
  "quote": "Allah does not burden a soul beyond that it can bear.",
  "religion": "Islam",
  "source": "Quran 2:286"
}
```

Use `?type=daily` for a quote that changes once a day. Use `?type=random` for a new one every time. Omit the parameter to get the full array.

Works with any language, any framework, any platform. If it can make an HTTP request, it can use this API.

## Why I Built This

It started because I needed it for one of my upcoming Flutter projects — an app focused on helping people build better habits and break free from the ones holding them back. I needed a quotes API for it, and when I couldn't find one that fit, I decided to build my own.

The original idea was simple: curated quotes for fighting common addictions — lust, drugs, gambling, screen time, food. Real, hard-hitting words that don't sugarcoat the struggle.

But as I kept working on it, I realized something was missing. For a lot of people, recovery isn't just about willpower — it's deeply connected to faith and spirituality. So I thought, why not add that too? That's how the spiritual quotes endpoint was born. 9 religions, 31 quotes each — one for every day of the month. It felt like a natural extension of the same mission.

I believe that sometimes, the right words at the right time can change someone's entire day. A notification with a powerful quote when you're about to relapse. A daily reminder that says "you're stronger than this." A moment of spiritual reflection when you need it most.

Technology should serve people — not just businesses. So I made it free. Forever.

## The Tech Behind It

The API is built with **Deno** and deployed on **Deno Deploy** — which means it's fast, serverless, and runs on the edge. The quotes live as static JSON files, so there's no database, no cold starts, and no downtime to worry about.

The codebase is intentionally simple. If you can read a JSON file and write an `if` statement, you can understand the entire source code.

## How You Can Use It

Here are some ideas:

- **Recovery apps** — Show a daily quote as a push notification
- **Browser extensions** — Replace the new tab page with an uplifting quote
- **Discord/Telegram bots** — Send daily motivation to community channels
- **Personal dashboards** — Add a spiritual quote widget
- **Journaling apps** — Use a daily quote as a writing prompt
- **Widgets** — Build a home screen widget that reminds users of their strength

Or build something I haven't thought of. That's the beauty of an open API.

## Want to Contribute?

The project is open source and contributions are welcome. The simplest way to contribute? **Add more quotes.**

1. Fork the repo
2. Create a branch: `updates/islam-quotes-10` or `fix/daily-quote-bug`
3. Add your quotes to the JSON files in the `data/` folder
4. Submit a PR

Every quote you add could be the one that helps someone through their hardest day.

**GitHub**: [github.com/Idrisvohra9/fight-addictions-api](https://github.com/Idrisvohra9/fight-addictions-api)

**Live API**: [fight-addictions-api.deno.dev](https://fight-addictions-api.deno.dev/)

---

If you're building something that helps people — I'd love to hear about it. Drop a comment or reach out. And if you're someone who's fighting your own battle right now — I see you. You're not alone. And you're stronger than you think. 💪
