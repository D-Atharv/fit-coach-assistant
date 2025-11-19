# 🚀 Deployment Guide

## Deploy to Vercel (Recommended)

Vercel is the easiest way to deploy Next.js apps.

### Steps:

1. **Push to GitHub**

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. **Connect to Vercel**

- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Import your GitHub repository
- Vercel will auto-detect Next.js settings

3. **Add Environment Variables**
   In Vercel dashboard, go to Settings → Environment Variables:

```
OPENAI_API_KEY=sk-your-key
ELEVENLABS_API_KEY=your-key
GEMINI_API_KEY=your-key (optional)
XAI_API_KEY=your-key (optional)
REPLICATE_API_TOKEN=your-key (optional)
```

4. **Deploy**

- Click "Deploy"
- Wait 2-3 minutes
- Your app is live! 🎉

### Custom Domain (Optional)

- Go to Settings → Domains
- Add your custom domain
- Update DNS records as instructed

---

## Deploy to Netlify

### Steps:

1. **Build Configuration**
   Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

2. **Deploy**

- Go to [netlify.com](https://netlify.com)
- Click "Add new site" → "Import an existing project"
- Connect your GitHub repo
- Add environment variables
- Deploy!

---

## Deploy to Railway

1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub"
3. Select your repository
4. Add environment variables
5. Railway will auto-deploy

---

## Deploy to Your Own Server

### Using PM2:

```bash
# Build the app
npm run build

# Install PM2
npm install -g pm2

# Start the app
pm2 start npm --name "fitness-app" -- start

# Save PM2 config
pm2 save
pm2 startup
```

### Using Docker:

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:

```bash
docker build -t fitness-app .
docker run -p 3000:3000 --env-file .env.local fitness-app
```

---

## Environment Variables Checklist

Before deploying, make sure you have:

- ✅ `OPENAI_API_KEY` (Required for plan generation)
- ✅ `ELEVENLABS_API_KEY` (Required for voice features)
- ⚠️ `GEMINI_API_KEY` (Optional alternative)
- ⚠️ `XAI_API_KEY` (Optional alternative)
- ⚠️ `REPLICATE_API_TOKEN` (Optional for images)

---

## Post-Deployment Checklist

- [ ] Test the form submission
- [ ] Verify AI plan generation works
- [ ] Test voice generation
- [ ] Test image generation
- [ ] Check PDF export
- [ ] Test dark mode toggle
- [ ] Verify mobile responsiveness
- [ ] Check all API keys are working
- [ ] Monitor API usage and costs

---

## Monitoring & Analytics

### Add Vercel Analytics:

```bash
npm install @vercel/analytics
```

In `app/layout.tsx`:

```typescript
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Add Google Analytics:

Add to `app/layout.tsx`:

```typescript
<Script src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" />
<Script id="google-analytics">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
  `}
</Script>
```

---

## Cost Optimization

### OpenAI API Costs:

- GPT-4o-mini: ~$0.15 per 1M input tokens
- DALL-E 3: ~$0.04 per image
- Budget: Set spending limits in OpenAI dashboard

### ElevenLabs Costs:

- Free tier: 10,000 characters/month
- Paid: $5/month for 30,000 characters

### Tips:

- Use GPT-4o-mini instead of GPT-4 (cheaper)
- Cache generated plans in database
- Implement rate limiting
- Add user authentication to prevent abuse

---

## Troubleshooting

### Build Errors:

```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### API Errors:

- Check environment variables are set correctly
- Verify API keys have sufficient credits
- Check API rate limits

### Performance Issues:

- Enable Next.js caching
- Use CDN for static assets
- Optimize images
- Implement lazy loading

---

## Support

For deployment issues:

- Vercel: [vercel.com/support](https://vercel.com/support)
- Netlify: [netlify.com/support](https://netlify.com/support)
- GitHub Issues: Open an issue in your repo
