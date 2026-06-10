# 🍳 PantryChef

AI-powered meal suggestion app. Enter the ingredients you have at home and get recipe suggestions — including expiry tracking, dietary filters, nutrition info, and more.

## Features

- **Recipe suggestions** based on your pantry ingredients
- **Missing ingredient detection** — shows recipes needing up to 3 extra items
- **Expiry tracking** — purchase date auto-calculates estimated expiry
- **Search** for specific dishes (pasta, burritos, stir fry, etc.)
- **Dietary filters** — vegetarian, vegan, gluten-free, high protein, and more
- **Restrictions** — allergies and dislikes are permanently excluded
- **Full nutrition info** — calories, macros, and micronutrients per recipe
- **Ingredient measurements** shown in each recipe

## Setup

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/pantrychef.git
cd pantrychef
```

### 2. Install dependencies

```bash
npm install
```

### 3. Get a Groq API key

> **Note:** This app uses the [Groq API](https://console.groq.com) specifically. The server is hardcoded to call Groq's endpoint, so API keys from other providers (OpenAI, Anthropic, Google, etc.) will not work without modifying `server.js`.

Sign up and get a free key at [console.groq.com](https://console.groq.com) — no credit card required, takes about 2 minutes.

### 4. Add your API key to the project

```bash
cp .env.example .env
```

Open `.env` and paste your Groq API key:

```
GROQ_API_KEY=your-groq-api-key-here
```

### 5. Run the app

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

For development with auto-restart on file changes:

```bash
npm run dev
```

## Project structure

```
pantrychef/
├── server.js          # Express server — holds API key, proxies AI requests
├── public/
│   └── index.html     # Frontend — all UI and app logic
├── .env               # Your secrets (NOT committed to GitHub)
├── .env.example       # Template showing required variables (safe to commit)
├── .gitignore         # Excludes .env and node_modules
└── package.json
```

## Tech stack

- **Frontend** — vanilla HTML/CSS/JS, localStorage for persistence
- **Backend** — Node.js + Express
- **AI** — Groq API (Llama 4) for recipe generation