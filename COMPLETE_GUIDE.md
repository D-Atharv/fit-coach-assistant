# 🎯 Complete Guide - AI Fitness Coach App

## 📚 Table of Contents

1. [Project Overview](#project-overview)
2. [Quick Start](#quick-start)
3. [Features Walkthrough](#features-walkthrough)
4. [API Setup](#api-setup)
5. [Deployment](#deployment)
6. [Video Demo](#video-demo)
7. [Troubleshooting](#troubleshooting)

---

## 🎯 Project Overview

This is a full-stack AI-powered fitness application that generates personalized workout and diet plans using Large Language Models. Built with Next.js 15, TypeScript, and Tailwind CSS.

**Time Estimate**: 24-30 hours
**Difficulty**: Intermediate
**Tech Stack**: Next.js, TypeScript, OpenAI, ElevenLabs, Tailwind CSS

---

## 🚀 Quick Start

### 1. Installation (5 minutes)

```bash
cd ai-fitness-coach
npm install
```

### 2. API Keys Setup (10 minutes)

Copy the example environment file:

```bash
cp .env.example .env.local
```

Get your API keys:

**OpenAI** (Required):

1. Go to https://platform.openai.com
2. Sign up/login
3. Go to API Keys section
4. Create new secret key
5. Copy to `.env.local` as `OPENAI_API_KEY`

**ElevenLabs** (Required):

1. Go to https://elevenlabs.io
2. Sign up (free tier available)
3. Go to Profile → API Keys
4. Copy to `.env.local` as `ELEVENLABS_API_KEY`

Your `.env.local` should look like:

```env
OPENAI_API_KEY=sk-proj-abc123...
ELEVENLABS_API_KEY=xyz789...
```

### 3. Run the App (1 minute)

```bash
npm run dev
```

Open http://localhost:3000

### 4. Test It Out (5 minutes)

1. Fill in the fitness profile form
2. Click "Generate My Fitness Plan"
3. Wait 10-20 seconds
4. Explore all features!

---

## 🎨 Features Walkthrough

### 1. User Profile Form

**Location**: Home page (before plan generation)

**Fields**:

- Basic Info: Name, Age, Gender
- Physical: Height (cm), Weight (kg)
- Goals: Fitness Goal, Fitness Level
- Preferences: Workout Location, Diet Type
- Optional: Medical History, Stress Level

**Validation**: All required fields must be filled

### 2. AI Plan Generation

**How it works**:

1. User submits form
2. Data sent to `/api/generate-plan`
3. OpenAI GPT-4o-mini generates custom plan
4. Response parsed and displayed

**What's Generated**:

- 7-day workout routine
- Complete diet plan (4 meals)
- 5-7 lifestyle tips
- Motivational message

### 3. Workout Plan Display

**Features**:

- Day-by-day breakdown
- Exercise details (sets, reps, rest)
- Click any exercise to generate AI image
- Visual representation of movements

### 4. Diet Plan Display

**Features**:

- Breakfast, Lunch, Dinner, Snacks
- Food items listed
- Calorie and protein info
- Click any meal to see AI-generated food image

### 5. Voice Features

**Buttons**:

- 🔊 Read Workout Plan
- 🔊 Read Diet Plan

**How it works**:

1. Text extracted from plan
2. Sent to ElevenLabs API
3. Audio returned and played
4. Natural-sounding voice narration

### 6. Image Generation

**Trigger**: Click 🖼️ button on any exercise or meal

**Process**:

1. Prompt sent to OpenAI DALL-E
2. Image generated (5-10 seconds)
3. Displayed in full-screen modal
4. Click anywhere to close

### 7. PDF Export

**Button**: 📄 Export PDF

**What's included**:

- User profile info
- Complete workout plan
- Complete diet plan
- All tips and motivation
- Print-friendly format

### 8. Additional Features

- **Dark Mode**: Toggle in top-right corner
- **LocalStorage**: Plans auto-saved
- **Regenerate**: Start fresh with new plan
- **Daily Quotes**: AI-generated motivation

---

## 🔑 API Setup Details

### OpenAI Configuration

**Used For**:

- Plan generation (GPT-4o-mini)
- Image generation (DALL-E 3)
- Motivational quotes

**Cost**:

- GPT-4o-mini: ~$0.15 per 1M tokens
- DALL-E 3: ~$0.04 per image
- Very affordable for testing!

**Setup**:

```env
OPENAI_API_KEY=sk-proj-your-key-here
```

**Test it**:

```bash
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

### ElevenLabs Configuration

**Used For**:

- Text-to-speech voice generation

**Cost**:

- Free tier: 10,000 characters/month
- Paid: $5/month for 30,000 characters

**Setup**:

```env
ELEVENLABS_API_KEY=your-key-here
```

**Voice ID**: Using default voice (21m00Tcm4TlvDq8ikWAM)
**Customization**: Change voice ID in `app/api/generate-voice/route.ts`

### Alternative APIs (Optional)

**Gemini**:

```env
GEMINI_API_KEY=your-key-here
```

**Claude**:

```env
CLAUDE_API_KEY=your-key-here
```

**XAI**:

```env
XAI_API_KEY=your-key-here
```

---

## 🚀 Deployment

### Option 1: Vercel (Recommended)

**Why Vercel?**

- Built for Next.js
- Zero configuration
- Automatic HTTPS
- Free tier available

**Steps**:

1. Push code to GitHub
2. Go to vercel.com
3. Import repository
4. Add environment variables
5. Deploy!

**Time**: 10 minutes

### Option 2: Netlify

**Steps**:

1. Push code to GitHub
2. Go to netlify.com
3. Import repository
4. Add environment variables
5. Deploy!

**Time**: 10 minutes

### Environment Variables in Production

Add these in your hosting dashboard:

```
OPENAI_API_KEY=sk-proj-...
ELEVENLABS_API_KEY=...
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

---

## 🎥 Video Demo Guide

### Recording Setup (5 minutes)

**Tools**:

- Screen recorder: OBS, Loom, or QuickTime
- Microphone: Built-in or external
- Resolution: 1080p minimum

**Preparation**:

1. Clear browser cache
2. Close unnecessary tabs
3. Set browser zoom to 100%
4. Test audio levels
5. Have demo script ready

### Demo Script (7 minutes)

**0:00-0:30 - Introduction**

- "Hi! This is my AI Fitness Coach app"
- Show landing page
- Highlight key features

**0:30-1:30 - User Input**

- Fill in profile form
- Explain each field
- Click generate button

**1:30-2:00 - AI Generation**

- Show loading state
- Explain AI is generating custom plan
- "No hardcoded content!"

**2:00-3:30 - Workout Plan**

- Scroll through 7 days
- Show exercise details
- Generate an exercise image
- Show image modal

**3:30-4:30 - Diet Plan**

- Show all meals
- Display nutrition info
- Generate a meal image

**4:30-5:00 - Voice Features**

- Click "Read Workout Plan"
- Let it play for 10 seconds
- Explain ElevenLabs integration

**5:00-5:30 - Additional Features**

- Show tips section
- Export PDF (show print dialog)
- Toggle dark mode
- Click regenerate

**5:30-6:30 - Tech Stack & Code**

- Show file structure
- Highlight key files
- Mention technologies used
- Show deployment

**6:30-7:00 - Conclusion**

- Recap features
- Show live deployed version
- Thank viewers

### Recording Tips

- Speak clearly and confidently
- Show your face (optional but nice)
- Use cursor highlighting
- Add text overlays for key points
- Keep it under 7 minutes
- Edit out mistakes

---

## 🔧 Troubleshooting

### Common Issues

**1. "Failed to generate plan"**

```
Cause: Invalid or missing OpenAI API key
Solution: Check .env.local file, verify key is correct
```

**2. "Failed to generate voice"**

```
Cause: Invalid ElevenLabs API key or quota exceeded
Solution: Check API key, verify free tier quota
```

**3. Images not generating**

```
Cause: DALL-E API requires credits
Solution: Add credits to OpenAI account or disable feature
```

**4. Build errors**

```
Cause: Missing dependencies or TypeScript errors
Solution: Run npm install, check for syntax errors
```

**5. Dark mode not working**

```
Cause: LocalStorage disabled or browser issue
Solution: Enable localStorage, try different browser
```

### Debug Mode

Add to `.env.local`:

```env
NODE_ENV=development
```

Check browser console for detailed errors.

### API Testing

Test OpenAI:

```bash
curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-4o-mini",
    "messages": [{"role": "user", "content": "Hello"}]
  }'
```

Test ElevenLabs:

```bash
curl https://api.elevenlabs.io/v1/voices \
  -H "xi-api-key: $ELEVENLABS_API_KEY"
```

---

## 📊 Project Checklist

### Before Submission

- [ ] Code works locally
- [ ] All features tested
- [ ] Deployed to production
- [ ] Live URL accessible
- [ ] GitHub repo is public
- [ ] README is complete
- [ ] Video demo recorded
- [ ] All three deliverables ready

### Deliverables

1. **Live App Link**: https://your-app.vercel.app
2. **GitHub Link**: https://github.com/yourusername/ai-fitness-coach
3. **Video Demo**: YouTube/Loom link

---

## 🎓 Learning Resources

### Next.js

- [Next.js Documentation](https://nextjs.org/docs)
- [App Router Guide](https://nextjs.org/docs/app)

### OpenAI

- [OpenAI API Docs](https://platform.openai.com/docs)
- [GPT Best Practices](https://platform.openai.com/docs/guides/gpt-best-practices)

### ElevenLabs

- [ElevenLabs Docs](https://elevenlabs.io/docs)
- [Voice Library](https://elevenlabs.io/voice-library)

### Tailwind CSS

- [Tailwind Docs](https://tailwindcss.com/docs)
- [Tailwind UI](https://tailwindui.com)

---

## 💡 Tips for Success

1. **Start Simple**: Get basic features working first
2. **Test Often**: Test each feature as you build it
3. **Use Console**: Check browser console for errors
4. **Read Docs**: API documentation is your friend
5. **Ask for Help**: Use ChatGPT, Stack Overflow, Discord
6. **Version Control**: Commit often to GitHub
7. **Deploy Early**: Deploy to production early to catch issues
8. **Monitor Costs**: Set spending limits on API dashboards

---

## 🎉 Congratulations!

You've built a complete AI-powered fitness application! This project demonstrates:

- Full-stack development
- AI API integration
- Modern React patterns
- TypeScript usage
- Responsive design
- Production deployment

**Next Steps**:

- Add user authentication
- Integrate database
- Add progress tracking
- Build mobile app
- Add social features

---

## 📞 Support

- **Documentation**: See README.md
- **Issues**: Open GitHub issue
- **Questions**: Check TESTING_CHECKLIST.md

**Good luck with your submission! 🚀**
