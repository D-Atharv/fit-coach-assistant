# 🔧 Troubleshooting Guide

## Common Issues and Solutions

### Installation Issues

#### Issue: `npm install` fails

**Symptoms**: Error messages during installation, missing dependencies

**Solutions**:

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

#### Issue: Node version incompatibility

**Symptoms**: "Unsupported engine" error

**Solution**:

```bash
# Check your Node version
node --version

# Should be 18.x or higher
# Update Node.js from nodejs.org
```

---

### Environment Variable Issues

#### Issue: "Failed to generate plan" - API key error

**Symptoms**: Error message when generating plan, 401 Unauthorized

**Solutions**:

1. Check `.env.local` file exists in root directory
2. Verify API key format:
   ```env
   OPENAI_API_KEY=sk-proj-abc123...
   ```
3. No spaces around the `=` sign
4. No quotes around the key
5. Restart dev server after changing `.env.local`

#### Issue: Environment variables not loading

**Symptoms**: API calls fail, undefined errors

**Solutions**:

```bash
# Restart the dev server
# Stop with Ctrl+C, then:
npm run dev

# Check if .env.local is in the right location
# Should be in ai-fitness-coach/.env.local
```

---

### API Issues

#### Issue: OpenAI API "Insufficient credits"

**Symptoms**: 429 error, "You exceeded your current quota"

**Solutions**:

1. Go to https://platform.openai.com/account/billing
2. Add payment method
3. Add credits ($5-10 is plenty for testing)
4. Wait 5 minutes for credits to activate

#### Issue: OpenAI API "Invalid API key"

**Symptoms**: 401 error, authentication failed

**Solutions**:

1. Verify key starts with `sk-proj-` or `sk-`
2. Check for extra spaces or characters
3. Generate new key at https://platform.openai.com/api-keys
4. Make sure key has proper permissions

#### Issue: ElevenLabs "Quota exceeded"

**Symptoms**: Voice generation fails, 429 error

**Solutions**:

1. Check quota at https://elevenlabs.io/subscription
2. Free tier: 10,000 characters/month
3. Wait for monthly reset or upgrade plan
4. Reduce text length being converted

#### Issue: ElevenLabs "Invalid voice ID"

**Symptoms**: Voice generation fails, 404 error

**Solution**:
Edit `app/api/generate-voice/route.ts`:

```typescript
// Change the voice ID in the URL
const response = await fetch(
  "https://api.elevenlabs.io/v1/text-to-speech/YOUR_VOICE_ID"
  // ...
);
```

Get voice IDs from: https://elevenlabs.io/voice-library

---

### Build Issues

#### Issue: TypeScript errors during build

**Symptoms**: Build fails with type errors

**Solutions**:

```bash
# Check for errors
npm run build

# If errors persist, check:
# 1. All imports are correct
# 2. Types match in components
# 3. No missing dependencies
```

#### Issue: "Module not found" errors

**Symptoms**: Import errors, can't find modules

**Solutions**:

```bash
# Reinstall dependencies
rm -rf node_modules
npm install

# Check import paths use @ alias:
import { UserProfile } from '@/lib/types';
```

---

### Runtime Issues

#### Issue: "Failed to generate plan" - JSON parsing error

**Symptoms**: Plan generation fails, console shows JSON error

**Cause**: AI returned invalid JSON

**Solutions**:

1. Try generating again (AI responses vary)
2. Check `app/api/generate-plan/route.ts`
3. Verify JSON parsing logic:

```typescript
const jsonMatch = content.match(/\{[\s\S]*\}/);
const plan = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(content);
```

#### Issue: Images not generating

**Symptoms**: Click image button, nothing happens or error

**Solutions**:

1. Check OpenAI credits (DALL-E requires credits)
2. Check browser console for errors
3. Verify API key has image generation permissions
4. Try alternative: Use Replicate API instead

#### Issue: Voice not playing

**Symptoms**: Click voice button, no audio

**Solutions**:

1. Check browser audio permissions
2. Verify ElevenLabs API key
3. Check browser console for errors
4. Try different browser
5. Check system volume

#### Issue: PDF export not working

**Symptoms**: Click export, nothing happens

**Solutions**:

1. Check browser popup blocker
2. Allow popups for localhost/your domain
3. Try different browser
4. Check browser console for errors

---

### UI Issues

#### Issue: Dark mode not working

**Symptoms**: Toggle doesn't change theme

**Solutions**:

1. Check browser localStorage is enabled
2. Clear browser cache
3. Check browser console for errors
4. Verify `ThemeToggle.tsx` is imported in layout

#### Issue: Styles not loading

**Symptoms**: Plain HTML, no styling

**Solutions**:

```bash
# Rebuild Tailwind
npm run dev

# Check tailwind.config.ts exists
# Check globals.css imports Tailwind
```

#### Issue: Mobile view broken

**Symptoms**: Layout issues on mobile

**Solutions**:

1. Check responsive classes in components
2. Test with browser dev tools mobile view
3. Verify viewport meta tag in layout.tsx

---

### Deployment Issues

#### Issue: Vercel build fails

**Symptoms**: Deployment fails, build errors

**Solutions**:

1. Test build locally first:
   ```bash
   npm run build
   ```
2. Fix any errors shown
3. Push fixes to GitHub
4. Redeploy on Vercel

#### Issue: Environment variables not working in production

**Symptoms**: API calls fail in production

**Solutions**:

1. Go to Vercel dashboard → Settings → Environment Variables
2. Add all variables from `.env.local`
3. Redeploy after adding variables
4. Check variable names match exactly

#### Issue: "Module not found" in production

**Symptoms**: Works locally, fails in production

**Solutions**:

1. Check import paths use correct case
2. Verify all files are committed to GitHub
3. Check `.gitignore` isn't excluding needed files

---

### Performance Issues

#### Issue: Slow plan generation

**Symptoms**: Takes > 30 seconds to generate

**Causes**:

- OpenAI API latency
- Large prompt size
- Network issues

**Solutions**:

1. Normal: 10-20 seconds is expected
2. Check internet connection
3. Try different time of day
4. Consider using GPT-3.5-turbo for faster responses

#### Issue: Slow image generation

**Symptoms**: Images take > 20 seconds

**Cause**: DALL-E 3 is slower than DALL-E 2

**Solutions**:

1. Normal: 5-15 seconds is expected
2. Consider using DALL-E 2 (faster, cheaper)
3. Or use alternative: Replicate, Stability AI

---

### Browser-Specific Issues

#### Issue: Safari issues

**Symptoms**: Features don't work in Safari

**Solutions**:

1. Update Safari to latest version
2. Check Safari console for errors
3. Enable JavaScript
4. Clear Safari cache

#### Issue: Firefox issues

**Symptoms**: Styling looks different

**Solutions**:

1. Update Firefox to latest version
2. Check for CSS compatibility
3. Test in Firefox Developer Edition

---

### Development Issues

#### Issue: Hot reload not working

**Symptoms**: Changes don't reflect without manual refresh

**Solutions**:

```bash
# Restart dev server
# Stop with Ctrl+C
npm run dev

# Clear .next folder
rm -rf .next
npm run dev
```

#### Issue: Port 3000 already in use

**Symptoms**: "Port 3000 is already in use"

**Solutions**:

```bash
# Use different port
npm run dev -- -p 3001

# Or kill process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

---

## Debugging Tips

### Enable Verbose Logging

Add to `.env.local`:

```env
NODE_ENV=development
DEBUG=*
```

### Check Browser Console

1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for red errors
4. Check Network tab for failed requests

### Check API Responses

In browser DevTools:

1. Network tab
2. Filter by "Fetch/XHR"
3. Click on API request
4. Check Response tab

### Test API Keys Directly

**OpenAI**:

```bash
curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "model": "gpt-4o-mini",
    "messages": [{"role": "user", "content": "Hello"}]
  }'
```

**ElevenLabs**:

```bash
curl https://api.elevenlabs.io/v1/voices \
  -H "xi-api-key: YOUR_API_KEY"
```

---

## Getting Help

### Resources

- **Next.js Docs**: https://nextjs.org/docs
- **OpenAI Docs**: https://platform.openai.com/docs
- **ElevenLabs Docs**: https://elevenlabs.io/docs
- **Tailwind Docs**: https://tailwindcss.com/docs

### Community Support

- **Next.js Discord**: https://nextjs.org/discord
- **Stack Overflow**: Tag questions with `next.js`, `openai`, `typescript`
- **GitHub Issues**: Open issue in your repository

### Still Stuck?

1. Check all environment variables are set correctly
2. Verify API keys have credits/quota
3. Test in different browser
4. Clear cache and restart
5. Check browser console for specific errors
6. Search error message on Google/Stack Overflow

---

## Prevention Tips

### Before Starting Development

- [ ] Verify Node.js version (18+)
- [ ] Get all API keys first
- [ ] Add credits to OpenAI account
- [ ] Test API keys before coding

### During Development

- [ ] Commit code frequently
- [ ] Test features as you build them
- [ ] Check browser console regularly
- [ ] Keep dependencies updated

### Before Deployment

- [ ] Test build locally (`npm run build`)
- [ ] Verify all features work
- [ ] Check all environment variables
- [ ] Test in multiple browsers

---

## Emergency Fixes

### Nuclear Option: Start Fresh

If nothing works:

```bash
# Backup your .env.local
cp .env.local .env.backup

# Delete everything except source code
rm -rf node_modules .next package-lock.json

# Reinstall
npm install

# Restore .env.local
cp .env.backup .env.local

# Restart
npm run dev
```

### Rollback to Working Version

If you broke something:

```bash
# See git history
git log --oneline

# Rollback to previous commit
git reset --hard <commit-hash>

# Or create new branch from working commit
git checkout -b fix-branch <commit-hash>
```

---

**Remember**: Most issues are caused by:

1. Missing/incorrect API keys (60%)
2. Environment variables not loading (20%)
3. API quota/credits issues (15%)
4. Other (5%)

Always check these first! 🔍
