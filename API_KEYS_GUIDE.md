# 🔑 API Keys Setup Guide

## Current Status

✅ **Demo Mode Active** - The app now works WITHOUT API keys!

The app will automatically use demo data if no valid API keys are found. This lets you test all features immediately.

---

## Getting Real API Keys (Optional)

### Option 1: OpenAI (Recommended)

**Best for**: Most accurate AI-generated plans, image generation

1. Go to https://platform.openai.com/signup
2. Sign up for an account
3. Go to https://platform.openai.com/api-keys
4. Click "Create new secret key"
5. Copy the key (starts with `sk-proj-...`)
6. Add $5-10 credits at https://platform.openai.com/account/billing

**Add to `.env.local`:**

```env
OPENAI_API_KEY=sk-proj-your-actual-key-here
```

**Cost**: ~$0.15 per 1M tokens (very cheap for testing)

---

### Option 2: Google Gemini (Free Alternative)

**Best for**: Free tier available, good quality

1. Go to https://makersuite.google.com/app/apikey
2. Sign in with Google account
3. Click "Create API Key"
4. Copy the key (starts with `AIza...`)

**Add to `.env.local`:**

```env
GEMINI_API_KEY=AIza-your-actual-key-here
```

**Cost**: Free tier available!

---

### Option 3: ElevenLabs (For Voice Features)

**Best for**: Natural voice narration

1. Go to https://elevenlabs.io/sign-up
2. Sign up for free account
3. Go to Profile → API Keys
4. Copy your API key

**Add to `.env.local`:**

```env
ELEVENLABS_API_KEY=your-elevenlabs-key-here
```

**Cost**: Free tier - 10,000 characters/month

---

## Testing the App

### Without API Keys (Demo Mode)

✅ Workout plan generation - Uses demo data
✅ Diet plan generation - Uses demo data
✅ Motivation quotes - Uses demo quotes
❌ Voice features - Requires ElevenLabs
❌ Image generation - Requires OpenAI

### With OpenAI Key

✅ AI-generated personalized plans
✅ AI-generated images (DALL-E)
✅ AI motivation quotes
❌ Voice features - Still needs ElevenLabs

### With All Keys

✅ Everything works!
✅ Fully personalized AI plans
✅ Voice narration
✅ Image generation
✅ Complete experience

---

## Current `.env.local` Status

Your current file has:

```env
GEMINI_API_KEY=.....
```

**Issue**: This Gemini key appears to be invalid or expired.

**Solutions**:

1. **Use Demo Mode** (current) - Works immediately, no setup needed
2. **Get new Gemini key** - Follow Option 2 above
3. **Get OpenAI key** - Follow Option 1 above (recommended)

---

## Recommended Setup for Full Experience

```env
# For AI plan generation (choose one)
OPENAI_API_KEY=sk-proj-your-key-here
# OR
GEMINI_API_KEY=your-valid-gemini-key-here

# For voice features
ELEVENLABS_API_KEY=your-elevenlabs-key-here

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

---

## Quick Test

1. **Refresh your browser** (Ctrl+Shift+R)
2. **Fill out the form** with your details
3. **Click "Generate My Fitness Plan"**
4. **See your plan** - Will use demo data if no valid API keys

The app will automatically:

- ✅ Try Gemini first (if valid key)
- ✅ Fall back to OpenAI (if valid key)
- ✅ Use demo data (if no valid keys)

---

## Troubleshooting

### "Failed to generate plan"

- The app should now use demo mode automatically
- Refresh the page and try again

### Want personalized AI plans?

- Get an OpenAI or Gemini API key
- Add to `.env.local`
- Restart dev server: `npm run dev`

### Voice features not working?

- Voice requires ElevenLabs API key
- Get free key at https://elevenlabs.io
- Add to `.env.local`

---

## For Production Deployment

When deploying to Vercel/Netlify:

1. Add your API keys in the hosting dashboard
2. Don't commit `.env.local` to GitHub
3. The app will work in demo mode if no keys are provided

---

**The app is now fully functional in demo mode! Try it out! 🚀**
