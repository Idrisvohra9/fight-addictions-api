# Fight Addictions API 💪

Overcoming addictions is a crucial step towards living a healthier and more fulfilling life. Addictions can take control of our daily routines, relationships, and overall well-being, making it difficult to achieve our goals and maintain meaningful connections with loved ones. By fighting and conquering our addictions, we regain control of our lives, improve our physical and mental health, and open doors to new opportunities. Whether it's substance abuse, gambling, or any other form of addiction, taking the first step towards recovery is a brave decision that can lead to positive, lasting change. Remember, seeking help and support is not a sign of weakness, but rather a demonstration of strength and commitment to personal growth.

---

## 📖 About the API

This project is a **free, open-source RESTful API** — no sign-up or API key required! Built with [Deno](https://deno.com/), it provides powerful, curated quotes designed to help people fight their addictions and stay motivated on the path to recovery.

### 🔗 Live API: **[https://fight-addictions-api.deno.dev/](https://fight-addictions-api.deno.dev/)**

---

## 📊 Quotes Overview

The API currently serves a total of **527 quotes** across **7 endpoints**:

| Endpoint | Quotes | Tackles |
|----------|--------|---------|
| `/lust/quotes` | 31 | Lust, Sex, Masturbation, Porn addictions |
| `/drugs/quotes` | 31 | Drugs, Alcohol, Substance abuse |
| `/gambling/quotes` | 31 | Gambling addiction |
| `/screen/quotes` | 31 | Phone, Video Games, Social Media addiction |
| `/food/quotes` | 31 | Food, Binge eating addiction |
| `/motivational/quotes` | 62 | General motivation for daily tasks & self-improvement |
| `/spiritual/quotes` | 279 | Spiritual guidance across 9 religions |

### 🕊️ Spiritual Quotes Breakdown

The spiritual quotes endpoint contains **31 quotes for each of the 9 religions**:

| Religion | Endpoint | Quotes |
|----------|----------|--------|
| Islam | `/spiritual/quotes/islam` | 31 |
| Christianity | `/spiritual/quotes/christianity` | 31 |
| Hinduism | `/spiritual/quotes/hinduism` | 31 |
| Buddhism | `/spiritual/quotes/buddhism` | 31 |
| Judaism | `/spiritual/quotes/judaism` | 31 |
| Sikhism | `/spiritual/quotes/sikhism` | 31 |
| Jainism | `/spiritual/quotes/jainism` | 31 |
| Sufism | `/spiritual/quotes/sufism` | 31 |
| Atheism | `/spiritual/quotes/atheism` | 31 |

---

## 🚀 How to Use the API

The API is **completely free** — use it in your projects without any restrictions. No authentication needed!

### Query Parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `type` | `random` | Returns a single random quote |
| `type` | `daily` | Returns a quote that changes once per day |
| *(omit)* | — | Returns all quotes in the category |

### Get a Random Quote

- **Lust / Porn**: [`/lust/quotes?type=random`](https://fight-addictions-api.deno.dev/lust/quotes?type=random)
- **Drugs / Alcohol**: [`/drugs/quotes?type=random`](https://fight-addictions-api.deno.dev/drugs/quotes?type=random)
- **Gambling**: [`/gambling/quotes?type=random`](https://fight-addictions-api.deno.dev/gambling/quotes?type=random)
- **Screen / Gaming**: [`/screen/quotes?type=random`](https://fight-addictions-api.deno.dev/screen/quotes?type=random)
- **Food**: [`/food/quotes?type=random`](https://fight-addictions-api.deno.dev/food/quotes?type=random)
- **Motivation**: [`/motivational/quotes?type=random`](https://fight-addictions-api.deno.dev/motivational/quotes?type=random)
- **Spiritual (all)**: [`/spiritual/quotes?type=random`](https://fight-addictions-api.deno.dev/spiritual/quotes?type=random)
- **Spiritual (Islam)**: [`/spiritual/quotes/islam?type=random`](https://fight-addictions-api.deno.dev/spiritual/quotes/islam?type=random)

### Get a Daily Quote

Daily quotes change once per day and cycle through all available quotes without repeating within a month (for categories with 31 quotes).

- **Lust / Porn**: [`/lust/quotes?type=daily`](https://fight-addictions-api.deno.dev/lust/quotes?type=daily)
- **Drugs / Alcohol**: [`/drugs/quotes?type=daily`](https://fight-addictions-api.deno.dev/drugs/quotes?type=daily)
- **Gambling**: [`/gambling/quotes?type=daily`](https://fight-addictions-api.deno.dev/gambling/quotes?type=daily)
- **Screen / Gaming**: [`/screen/quotes?type=daily`](https://fight-addictions-api.deno.dev/screen/quotes?type=daily)
- **Food**: [`/food/quotes?type=daily`](https://fight-addictions-api.deno.dev/food/quotes?type=daily)
- **Motivation**: [`/motivational/quotes?type=daily`](https://fight-addictions-api.deno.dev/motivational/quotes?type=daily)
- **Spiritual (Christianity)**: [`/spiritual/quotes/christianity?type=daily`](https://fight-addictions-api.deno.dev/spiritual/quotes/christianity?type=daily)

### Get All Quotes

Simply omit the `type` parameter to get the full array:

- **All Lust Quotes**: [`/lust/quotes`](https://fight-addictions-api.deno.dev/lust/quotes)
- **All Spiritual Quotes**: [`/spiritual/quotes`](https://fight-addictions-api.deno.dev/spiritual/quotes)
- **All Buddhism Quotes**: [`/spiritual/quotes/buddhism`](https://fight-addictions-api.deno.dev/spiritual/quotes/buddhism)

### Example Response

**Single quote** (`?type=random` or `?type=daily`):
```json
{
  "id": 1,
  "quote": "The sun never complains about rising every day; so must we rise and shine in our tasks."
}
```

**Spiritual quote** (includes `religion` and `source`):
```json
{
  "id": 2,
  "quote": "Allah does not burden a soul beyond that it can bear.",
  "religion": "Islam",
  "source": "Quran 2:286"
}
```

---

## 🛠️ Tech Stack

- **Runtime**: [Deno](https://deno.com/) (TypeScript)
- **Deployment**: [Deno Deploy](https://deno.com/deploy)
- **Data**: Static JSON files (no database needed)

---

## 💻 Running Locally

1. **Install Deno** (if you haven't already):
   ```bash
   # Windows
   winget install --id DenoLand.Deno

   # macOS / Linux
   curl -fsSL https://deno.land/install.sh | sh
   ```

2. **Clone the repository**:
   ```bash
   git clone https://github.com/Idrisvohra9/fight-addictions-api.git
   cd fight-addictions-api
   ```

3. **Start the development server**:
   ```bash
   deno task start
   ```

4. The API will be available at **http://localhost:8000/**

---

## 🤝 Contributing

Contributions are welcome! Whether it's adding new quotes, fixing bugs, or improving the codebase — every bit helps.

### How to Contribute

1. **Fork** the repository
2. **Create a new branch** from `main` with the appropriate naming convention (see below)
3. **Make your changes**
4. **Submit a Pull Request** with a clear description of what you changed

### Branch Naming Convention

Use the following format depending on the type of contribution:

| Type | Branch Name Format | Example |
|------|-------------------|---------|
| 🐛 Bug fix | `fix/<bug-description>` | `fix/daily-quote-index-error` |
| ✨ New quotes | `updates/<endpoint>-<number-of-quotes>` | `updates/islam-quotes-10` |
| 📝 Other updates | `updates/<description>` | `updates/readme-improvements` |

### Adding New Quotes

1. Quotes are stored as JSON files in the `data/` directory
2. Each quote object must follow the existing format:
   ```json
   {
     "id": 32,
     "quote": "Your motivational quote here."
   }
   ```
   For spiritual quotes, also include `religion` and `source`:
   ```json
   {
     "id": 280,
     "quote": "Your spiritual quote here.",
     "religion": "Islam",
     "source": "Quran 2:286"
   }
   ```
3. Make sure the `id` is sequential and unique
4. Ensure the quote is **unique** and doesn't already exist in the file
5. Test locally with `deno task start` before submitting

---

## 📂 Project Structure

```
fight-addictions-api/
├── api/
│   └── app.ts              # Main API handler (routing, caching, CORS)
├── data/
│   ├── fightLustQuotes.json      # 31 quotes
│   ├── fightDrugsQuotes.json     # 31 quotes
│   ├── fightGamblingQuotes.json  # 31 quotes
│   ├── fightScreenQuotes.json    # 31 quotes
│   ├── fightFoodQuotes.json      # 31 quotes
│   ├── motivationQuotes.json     # 62 quotes
│   └── spiritualQuotes.json      # 279 quotes (31 × 9 religions)
├── assets/                  # Static assets (images)
├── index.html               # API landing page
├── deno.json                # Deno configuration & tasks
└── README.md
```

---

## 📄 License

This project is free and open-source. Use it to build apps, integrations, or anything that helps people on their recovery journey. 🙏