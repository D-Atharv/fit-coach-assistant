# 🚀 Quick Start Guide

## Get Running in 5 Minutes

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up API Keys

Create `.env.local` file with at least these keys:

```env
OPENAI_API_KEY=sk-your-key-here
ELEVENLABS_API_KEY=your-key-here
```

**Get Free API Keys:**

- OpenAI: https://platform.openai.com/api-keys (Free trial available)
- ElevenLabs: https://elevenlabs.io (10,000 free characters/month)

### 3. Run the App

```bash
npm run dev
```

Open http://localhost:3000

### 4. Test the App

1. Fill in the form with your details
2. Click "Generate My Fitness Plan"
3. Wait 10-20 seconds for AI to generate your plan
4. Explore features:
   - Click 🔊 to hear your plan
   - Click 🖼️ on exercises/meals to see images
   - Click 📄 to export as PDF
   - Toggle 🌙/☀️ for dark/light mode

## Troubleshooting

### "Failed to generate plan"

- Check your API keys in `.env.local`
- Make sure you have credits in your OpenAI account
- Check the browser console for detailed errors

### "Failed to generate voice"

- Verify your ElevenLabs API key
- Check if you have remaining characters in your quota

### "Failed to generate image"

- Image generation uses OpenAI DALL-E which requires credits
- You can disable this feature or use alternative APIs

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
# Then deploy to production
vercel --prod
```

## Next Steps

- Customize the AI prompts in `app/api/generate-plan/route.ts`
- Add more exercises or meal options
- Integrate with a database (Supabase, MongoDB)
- Add user authentication
- Create workout tracking features
