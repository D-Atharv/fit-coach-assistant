# 🗺️ App Routes Guide

## Application Structure

The app now uses a modern multi-page architecture with separate routes for better UX and organization.

---

## Routes

### 1. `/` - Landing Page

**Purpose**: Modern, eye-catching homepage

**Features**:

- Hero section with animated background
- Feature showcase (6 key features)
- "How It Works" section
- Call-to-action buttons
- Daily motivation quote
- Responsive design

**Actions**:

- Click "Create Your Plan" → Goes to `/create`
- Click "Get Motivated" → Loads new quote

---

### 2. `/create` - Plan Creation

**Purpose**: User input form for generating fitness plans

**Features**:

- Complete user profile form
- All fitness parameters
- Loading state during generation
- Back to home link
- Dark mode toggle

**Flow**:

1. User fills out form
2. Clicks "Generate My Fitness Plan"
3. AI generates plan (10-20 seconds)
4. Automatically redirects to `/plan`

**Data Saved**:

- Plan saved to localStorage
- Profile saved to localStorage

---

### 3. `/plan` - Plan Display

**Purpose**: View and interact with generated fitness plan

**Features**:

- Complete workout plan (7 days)
- Full diet plan (4 meals)
- Lifestyle tips
- Motivation message
- Action buttons:
  - 🔊 Read Workout Plan
  - 🔊 Read Diet Plan
  - 📄 Export PDF
  - 🔄 Regenerate Plan
- Image generation for exercises/meals
- Dark mode toggle

**Flow**:

1. Loads plan from localStorage
2. If no plan found → Redirects to `/create`
3. User can interact with all features
4. Click "Regenerate" → Goes back to `/create`

---

## Navigation Flow

```
Landing Page (/)
    ↓
    [Get Started / Create Your Plan]
    ↓
Create Page (/create)
    ↓
    [Fill Form & Generate]
    ↓
Plan Page (/plan)
    ↓
    [Regenerate] → Back to /create
    [Back to Home] → Back to /
```

---

## Data Flow

### Creating a Plan

```
1. User at /create
2. Fills form with profile data
3. Clicks "Generate"
4. POST to /api/generate-plan
5. Plan returned from AI
6. Saved to localStorage:
   - fitnessPlan
   - userProfile
7. Router.push('/plan')
8. Plan displayed at /plan
```

### Viewing a Plan

```
1. User navigates to /plan
2. Check localStorage for:
   - fitnessPlan
   - userProfile
3. If found → Display plan
4. If not found → Redirect to /create
```

### Regenerating

```
1. User clicks "Regenerate" at /plan
2. Clear localStorage
3. Router.push('/create')
4. User starts fresh
```

---

## URL Structure

| Route     | File Location         | Purpose      |
| --------- | --------------------- | ------------ |
| `/`       | `app/page.tsx`        | Landing page |
| `/create` | `app/create/page.tsx` | Form page    |
| `/plan`   | `app/plan/page.tsx`   | Plan display |

---

## API Routes

| Route                 | Method | Purpose                       |
| --------------------- | ------ | ----------------------------- |
| `/api/generate-plan`  | POST   | Generate fitness plan         |
| `/api/generate-image` | POST   | Generate exercise/meal images |
| `/api/generate-voice` | POST   | Generate voice narration      |
| `/api/motivation`     | GET    | Get motivational quote        |

---

## Component Usage by Route

### Landing Page (`/`)

- No form components
- Custom hero section
- Feature cards
- CTA buttons

### Create Page (`/create`)

- `<UserForm />` - Main form
- `<ThemeToggle />` - Dark mode
- Loading spinner

### Plan Page (`/plan`)

- `<FitnessPlanDisplay />` - Main display
- `<ThemeToggle />` - Dark mode
- Navigation links

---

## LocalStorage Keys

| Key           | Type        | Description         |
| ------------- | ----------- | ------------------- |
| `fitnessPlan` | FitnessPlan | Generated plan data |
| `userProfile` | UserProfile | User input data     |
| `theme`       | string      | 'dark' or 'light'   |

---

## Responsive Design

All routes are fully responsive:

- **Mobile** (< 640px): Single column, stacked layout
- **Tablet** (640px - 1024px): 2-column grid where applicable
- **Desktop** (> 1024px): Full multi-column layout

---

## Dark Mode

Available on all routes via `<ThemeToggle />`:

- Toggle button in top-right corner
- Persists across routes
- Smooth transitions
- System preference detection

---

## SEO & Metadata

Each route has proper metadata:

- Landing: "AI Fitness Coach - Personalized Plans"
- Create: "Create Your Plan - AI Fitness Coach"
- Plan: "Your Fitness Plan - AI Fitness Coach"

---

## Error Handling

### No Plan Found

- User navigates to `/plan` without creating plan
- Automatically redirects to `/create`

### API Errors

- Shows user-friendly error message
- Suggests checking API keys
- Allows retry

### Network Errors

- Graceful fallback to demo mode
- User can still use the app

---

## Future Enhancements

Potential new routes:

- `/dashboard` - User dashboard with history
- `/progress` - Track workout progress
- `/settings` - User preferences
- `/about` - About the app
- `/pricing` - Pricing plans (if monetized)

---

## Testing Routes

### Test Landing Page

```
1. Navigate to http://localhost:3001/
2. Should see modern landing page
3. Click "Get Started"
4. Should go to /create
```

### Test Create Page

```
1. Navigate to http://localhost:3001/create
2. Fill out form
3. Click "Generate"
4. Should redirect to /plan
```

### Test Plan Page

```
1. Navigate to http://localhost:3001/plan
2. If no plan → Redirects to /create
3. If plan exists → Shows plan
4. Click "Regenerate" → Goes to /create
```

---

## Quick Reference

**Start fresh**: Go to `/` or `/create`
**View plan**: Go to `/plan` (must have generated plan)
**Go home**: Click logo or "Back to Home" link

---

**The app now has a professional multi-page structure! 🚀**
