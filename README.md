# 💪 AI Fitness Coach App

An AI-powered fitness assistant built with **Next.js** that generates **personalized workout and diet plans** using LLMs. Features voice narration and AI image generation for an immersive experience.

## 🚀 Features

### User Input

- Name, Age, Gender
- Height & Weight
- Fitness Goal (Weight Loss, Muscle Gain, Maintenance, Endurance, Flexibility)
- Current Fitness Level (Beginner/Intermediate/Advanced)
- Workout Location (Home/Gym/Outdoor)
- Dietary Preferences (Vegetarian/Non-Vegetarian/Vegan/Keto)
- Optional: Medical history, stress level

### 🧠 AI-Powered Plan Generation

- **Workout Plan** — 7-day routine with exercises, sets, reps, and rest times
- **Diet Plan** — Complete meal breakdown with calories and protein
- **AI Tips & Motivation** — Lifestyle tips and motivational messages
- All content is dynamically generated based on user input (no hardcoded plans)

### 🔊 Voice Features

- Text-to-speech using **ElevenLabs API**
- Read workout or diet plans aloud
- Natural voice narration

### 🖼️ Image Generation

- Click any exercise or meal to generate AI images
- Uses **OpenAI DALL-E** (or alternative APIs)
- Visual representation of workouts and meals

### 🧾 Extra Features

- 📄 Export plan as PDF
- 🌗 Dark/Light mode toggle
- 💾 Save plans in localStorage
- 🔄 Regenerate plan option
- 💬 Daily AI-generated motivational quotes
- ⚡ Smooth, responsive UI with Tailwind CSS

## 🛠️ Tech Stack

| Category   | Tools                                      |
| ---------- | ------------------------------------------ |
| Frontend   | Next.js 15 (App Router), React, TypeScript |
| Styling    | Tailwind CSS                               |
| AI APIs    | OpenAI GPT-4 / Gemini / Claude / XAI       |
| Voice      | ElevenLabs TTS API                         |
| Images     | OpenAI DALL-E / Replicate / Gemini         |
| Deployment | Vercel / Netlify                           |

## 📦 Installation

### Prerequisites

- Node.js 18+ installed
- API keys for:
  - OpenAI (or Gemini/Claude/XAI)
  - ElevenLabs (for voice)
  - Optional: Replicate (for alternative image generation)

### Setup Steps

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd ai-fitness-coach
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a `.env.local` file in the root directory:

```env
# AI API Keys (Choose at least one)
OPENAI_API_KEY=sk-your-openai-key-here
GEMINI_API_KEY=your-gemini-key-here
XAI_API_KEY=your-xai-key-here

# Voice API
ELEVENLABS_API_KEY=your-elevenlabs-key-here

# Image Generation (Optional)
REPLICATE_API_TOKEN=your-replicate-token-here

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Run the development server**

```bash
npm run dev
```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 Getting API Keys

### OpenAI

1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up/login
3. Navigate to API Keys section
4. Create a new secret key

### ElevenLabs

1. Go to [elevenlabs.io](https://elevenlabs.io)
2. Sign up for a free account
3. Go to Profile → API Keys
4. Copy your API key

### Alternative APIs

- **Gemini**: [ai.google.dev](https://ai.google.dev)
- **Claude**: [console.anthropic.com](https://console.anthropic.com)
- **XAI**: [x.ai](https://x.ai)

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel dashboard
5. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Import your repository
4. Build command: `npm run build`
5. Publish directory: `.next`
6. Add environment variables
7. Deploy!

## 📁 Project Structure

```
ai-fitness-coach/
├── app/
│   ├── api/
│   │   ├── generate-plan/route.ts    # Main AI plan generation
│   │   ├── generate-image/route.ts   # Image generation
│   │   ├── generate-voice/route.ts   # Voice synthesis
│   │   └── motivation/route.ts       # Daily quotes
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                      # Main page
├── components/
│   ├── UserForm.tsx                  # User input form
│   ├── FitnessPlanDisplay.tsx        # Plan display
│   ├── MotivationQuote.tsx           # Daily motivation
│   └── ThemeToggle.tsx               # Dark mode toggle
├── lib/
│   ├── types.ts                      # TypeScript types
│   ├── ai-service.ts                 # API client functions
│   └── pdf-export.ts                 # PDF export utility
└── .env.local                        # Environment variables
```

## 🎯 Usage

1. Fill in your fitness profile
2. Click "Generate My Fitness Plan"
3. View your personalized workout and diet plan
4. Click 🔊 to hear your plan read aloud
5. Click 🖼️ on any exercise/meal to see AI-generated images
6. Export as PDF or regenerate for a new plan

## 🔧 Customization

### Switch AI Provider

Edit `app/api/generate-plan/route.ts` to use different AI APIs:

**For Gemini:**

```typescript
const response = await fetch(
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": process.env.GEMINI_API_KEY,
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  }
);
```

### Customize Voice

Edit `app/api/generate-voice/route.ts` to change voice ID or settings.

## 📝 License

MIT License - feel free to use this project for your portfolio or learning!

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit PRs.

## 📧 Support

For issues or questions, please open a GitHub issue.

---

**Built with ❤️ using Next.js and AI**
