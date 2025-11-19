# ✅ Testing Checklist

## Pre-Deployment Testing

### Environment Setup

- [ ] `.env.local` file created with all API keys
- [ ] API keys are valid and have credits
- [ ] Dependencies installed (`npm install`)
- [ ] Development server runs (`npm run dev`)
- [ ] No console errors on page load

### User Form Testing

- [ ] All input fields are visible
- [ ] Form validation works (required fields)
- [ ] Number inputs have proper min/max values
- [ ] Dropdown selections work correctly
- [ ] Optional fields can be left empty
- [ ] Submit button shows loading state
- [ ] Form data is properly collected

### AI Plan Generation

- [ ] Plan generates successfully (10-20 seconds)
- [ ] Workout plan shows 7 days
- [ ] Each day has multiple exercises
- [ ] Exercise details include sets, reps, rest time
- [ ] Diet plan shows all 4 meals
- [ ] Meals include items and nutrition info
- [ ] Tips section displays 5-7 tips
- [ ] Motivation message appears
- [ ] No JSON parsing errors

### Voice Features

- [ ] "Read Workout Plan" button works
- [ ] "Read Diet Plan" button works
- [ ] Audio plays correctly
- [ ] Button shows disabled state while playing
- [ ] Audio quality is clear
- [ ] No errors if API key is missing (graceful failure)

### Image Generation

- [ ] Click on exercise shows image button
- [ ] Click on meal shows image button
- [ ] Image generates successfully (5-10 seconds)
- [ ] Image displays in modal
- [ ] Modal can be closed
- [ ] Loading indicator shows during generation
- [ ] Multiple images can be generated
- [ ] No errors if API fails (graceful failure)

### PDF Export

- [ ] "Export PDF" button works
- [ ] Print dialog opens
- [ ] PDF includes all plan details
- [ ] PDF formatting is readable
- [ ] User profile info is included
- [ ] PDF can be saved/printed

### Storage & Persistence

- [ ] Plan saves to localStorage
- [ ] Page refresh loads saved plan
- [ ] "Regenerate Plan" clears storage
- [ ] New plan can be generated after regenerate
- [ ] No data loss on page refresh

### Dark Mode

- [ ] Theme toggle button visible
- [ ] Dark mode activates correctly
- [ ] Light mode activates correctly
- [ ] Theme persists on page refresh
- [ ] All text is readable in both modes
- [ ] Colors look good in both modes

### Motivation Quote

- [ ] Daily quote displays on load
- [ ] "New Quote" button generates new quote
- [ ] Quote is relevant and motivational
- [ ] No errors if API fails

### Responsive Design

- [ ] Mobile view (< 640px) looks good
- [ ] Tablet view (640px - 1024px) looks good
- [ ] Desktop view (> 1024px) looks good
- [ ] Form is usable on mobile
- [ ] Plan display is readable on mobile
- [ ] Buttons are tappable on mobile
- [ ] Images scale properly on all devices

### Error Handling

- [ ] Invalid API key shows error message
- [ ] Network errors are handled gracefully
- [ ] User sees helpful error messages
- [ ] App doesn't crash on errors
- [ ] Console shows useful error logs

### Performance

- [ ] Initial page load < 2 seconds
- [ ] No layout shift on load
- [ ] Smooth animations
- [ ] No lag when typing in form
- [ ] Images load efficiently
- [ ] No memory leaks

## Post-Deployment Testing

### Production Environment

- [ ] Live URL is accessible
- [ ] HTTPS is enabled
- [ ] Environment variables are set in hosting platform
- [ ] API calls work in production
- [ ] No CORS errors
- [ ] No mixed content warnings

### Cross-Browser Testing

- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### API Usage Monitoring

- [ ] OpenAI API usage is tracked
- [ ] ElevenLabs usage is tracked
- [ ] No unexpected API costs
- [ ] Rate limits are not exceeded

### User Experience

- [ ] App is intuitive to use
- [ ] Loading states are clear
- [ ] Success/error messages are helpful
- [ ] Navigation is smooth
- [ ] No broken links

## Video Demo Checklist

- [ ] Screen recording software ready
- [ ] Audio quality tested
- [ ] Demo script prepared
- [ ] All features work before recording
- [ ] Browser zoom at 100%
- [ ] No personal info visible
- [ ] Recording is 5-7 minutes
- [ ] Video quality is 1080p or higher

## Submission Checklist

- [ ] Code pushed to GitHub
- [ ] README.md is complete
- [ ] .env.local is in .gitignore (not pushed)
- [ ] Live app deployed to Vercel/Netlify
- [ ] Live app URL tested and working
- [ ] GitHub repository is public
- [ ] Video demo recorded and uploaded
- [ ] All three deliverables ready:
  - [ ] Live app link
  - [ ] GitHub link
  - [ ] Video demo link

## Common Issues & Solutions

### Issue: "Failed to generate plan"

**Solution**: Check OpenAI API key and credits

### Issue: "Failed to generate voice"

**Solution**: Verify ElevenLabs API key and quota

### Issue: Images not generating

**Solution**: Check DALL-E API credits or switch to alternative

### Issue: PDF export not working

**Solution**: Check browser popup blocker settings

### Issue: Dark mode not persisting

**Solution**: Check localStorage is enabled in browser

### Issue: Mobile layout broken

**Solution**: Test with browser dev tools mobile view

### Issue: Slow API responses

**Solution**: Check internet connection and API status

## Performance Optimization

- [ ] Images are optimized
- [ ] Unused code is removed
- [ ] API calls are efficient
- [ ] No unnecessary re-renders
- [ ] LocalStorage is used effectively

## Security Checks

- [ ] API keys not exposed in client code
- [ ] Environment variables properly configured
- [ ] No sensitive data in localStorage
- [ ] Input validation implemented
- [ ] XSS protection in place

---

**Testing Status**: Complete all items before submission!

**Last Updated**: Before deployment
