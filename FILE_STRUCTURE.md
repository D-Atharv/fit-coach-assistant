# 📁 File Structure Explanation

## Project Overview

This document explains every file and folder in the project, what it does, and why it's there.

---

## Root Directory

```
ai-fitness-coach/
├── app/                    # Next.js App Router directory
├── components/             # React components
├── lib/                    # Utility functions and types
├── public/                 # Static assets
├── node_modules/           # Dependencies (auto-generated)
├── .next/                  # Build output (auto-generated)
├── .git/                   # Git repository (auto-generated)
├── .env.local              # Environment variables (YOU CREATE THIS)
├── .env.example            # Example environment file
├── .gitignore              # Git ignore rules
├── package.json            # Project dependencies
├── package-lock.json       # Locked dependency versions
├── tsconfig.json           # TypeScript configuration
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── postcss.config.mjs      # PostCSS configuration
├── eslint.config.mjs       # ESLint configuration
└── README.md               # Main documentation
```

---

## `/app` Directory (Next.js App Router)

### Purpose

Contains all pages and API routes using Next.js 15 App Router.

### Structure

```
app/
├── api/                    # Backend API routes
│   ├── generate-plan/      # AI plan generation endpoint
│   ├── generate-image/     # Image generation endpoint
│   ├── generate-voice/     # Voice synthesis endpoint
│   └── motivation/         # Daily quotes endpoint
├── globals.css             # Global styles
├── layout.tsx              # Root layout (wraps all pages)
├── page.tsx                # Home page (main app)
└── favicon.ico             # Browser tab icon
```

### Key Files

#### `app/layout.tsx`

**Purpose**: Root layout component that wraps all pages

**What it does**:

- Sets up HTML structure
- Imports global CSS
- Defines metadata (title, description)
- Applies font (Inter)

**Why it's important**: Required by Next.js, defines app-wide settings

#### `app/page.tsx`

**Purpose**: Main application page (home page)

**What it does**:

- Manages app state (plan, loading, user profile)
- Renders UserForm or FitnessPlanDisplay
- Handles plan generation
- Manages localStorage
- Exports PDF functionality

**Why it's important**: This is the main app logic

#### `app/globals.css`

**Purpose**: Global CSS styles

**What it does**:

- Imports Tailwind CSS
- Defines CSS variables
- Sets up dark mode colors
- Adds smooth transitions

**Why it's important**: Styles the entire app

---

## `/app/api` Directory (Backend Routes)

### Purpose

Server-side API endpoints that handle AI integrations.

### `app/api/generate-plan/route.ts`

**Purpose**: Main AI plan generation endpoint

**What it does**:

1. Receives user profile from frontend
2. Constructs detailed prompt for AI
3. Calls OpenAI GPT-4o-mini API
4. Parses JSON response
5. Returns workout and diet plan

**API Used**: OpenAI Chat Completions

**Request**: POST with UserProfile
**Response**: FitnessPlan JSON

**Why it's important**: Core feature - generates personalized plans

### `app/api/generate-image/route.ts`

**Purpose**: AI image generation endpoint

**What it does**:

1. Receives image prompt (exercise or meal name)
2. Calls OpenAI DALL-E API
3. Returns image URL

**API Used**: OpenAI DALL-E 3

**Request**: POST with prompt
**Response**: { imageUrl: string }

**Why it's important**: Visual feature - shows exercises and meals

### `app/api/generate-voice/route.ts`

**Purpose**: Text-to-speech endpoint

**What it does**:

1. Receives text to convert
2. Calls ElevenLabs TTS API
3. Returns audio as base64 data URL

**API Used**: ElevenLabs Text-to-Speech

**Request**: POST with text
**Response**: { audioUrl: string }

**Why it's important**: Voice feature - reads plans aloud

### `app/api/motivation/route.ts`

**Purpose**: Daily motivational quote generator

**What it does**:

1. Calls OpenAI API
2. Generates short motivational quote
3. Returns quote text

**API Used**: OpenAI Chat Completions

**Request**: GET
**Response**: { quote: string }

**Why it's important**: Engagement feature - daily motivation

---

## `/components` Directory

### Purpose

Reusable React components that make up the UI.

### `components/UserForm.tsx`

**Purpose**: User input form component

**What it does**:

- Renders form with all input fields
- Manages form state
- Validates inputs
- Submits to parent component

**Props**:

- `onSubmit`: Function to call with form data
- `loading`: Boolean for loading state

**Why it's important**: Collects user data for plan generation

### `components/FitnessPlanDisplay.tsx`

**Purpose**: Displays generated fitness plan

**What it does**:

- Shows workout plan (7 days)
- Shows diet plan (4 meals)
- Shows tips and motivation
- Handles voice generation
- Handles image generation
- Manages image modal

**Props**:

- `plan`: FitnessPlan object
- `onRegenerate`: Function to regenerate plan
- `onExportPDF`: Function to export PDF

**Why it's important**: Main display component for results

### `components/MotivationQuote.tsx`

**Purpose**: Daily motivation quote widget

**What it does**:

- Fetches quote from API on mount
- Displays quote in styled box
- Allows refreshing quote

**Why it's important**: Engagement feature on home page

### `components/ThemeToggle.tsx`

**Purpose**: Dark/Light mode toggle button

**What it does**:

- Detects system theme preference
- Toggles between dark and light mode
- Saves preference to localStorage
- Applies theme to document

**Why it's important**: User preference feature

---

## `/lib` Directory

### Purpose

Utility functions, types, and helper code.

### `lib/types.ts`

**Purpose**: TypeScript type definitions

**What it defines**:

- `UserProfile`: User input data structure
- `WorkoutDay`: Single day workout structure
- `Exercise`: Exercise details structure
- `Meal`: Meal details structure
- `DietPlan`: Complete diet plan structure
- `FitnessPlan`: Complete fitness plan structure

**Why it's important**: Type safety throughout the app

### `lib/ai-service.ts`

**Purpose**: Client-side API service functions

**What it does**:

- `generateFitnessPlan()`: Calls plan generation API
- `generateImage()`: Calls image generation API
- `generateVoice()`: Calls voice generation API
- `getMotivationalQuote()`: Calls motivation API

**Why it's important**: Abstracts API calls from components

### `lib/pdf-export.ts`

**Purpose**: PDF export functionality

**What it does**:

- Creates HTML version of plan
- Opens in new window
- Triggers print dialog
- Formats for printing

**Why it's important**: Export feature for users

---

## Configuration Files

### `package.json`

**Purpose**: Project metadata and dependencies

**What it contains**:

- Project name and version
- Scripts (dev, build, start)
- Dependencies (Next.js, React, etc.)
- DevDependencies (TypeScript, ESLint, etc.)

**Why it's important**: Defines what packages are needed

### `tsconfig.json`

**Purpose**: TypeScript compiler configuration

**What it does**:

- Sets TypeScript rules
- Configures path aliases (@/\*)
- Sets target JavaScript version
- Enables strict mode

**Why it's important**: Makes TypeScript work correctly

### `next.config.ts`

**Purpose**: Next.js configuration

**What it does**:

- Configures Next.js behavior
- Sets up image optimization
- Configures build settings

**Why it's important**: Customizes Next.js

### `tailwind.config.ts`

**Purpose**: Tailwind CSS configuration

**What it does**:

- Defines which files to scan for classes
- Extends theme (colors, fonts, etc.)
- Adds plugins

**Why it's important**: Customizes Tailwind CSS

### `postcss.config.mjs`

**Purpose**: PostCSS configuration

**What it does**:

- Configures Tailwind CSS plugin
- Sets up CSS processing

**Why it's important**: Makes Tailwind work

### `eslint.config.mjs`

**Purpose**: ESLint configuration

**What it does**:

- Sets linting rules
- Configures code quality checks
- Extends Next.js ESLint config

**Why it's important**: Maintains code quality

---

## Environment Files

### `.env.local` (YOU CREATE THIS)

**Purpose**: Environment variables (secrets)

**What it contains**:

```env
OPENAI_API_KEY=sk-proj-...
ELEVENLABS_API_KEY=...
```

**Why it's important**: Stores API keys securely

**⚠️ NEVER commit this file to Git!**

### `.env.example`

**Purpose**: Example environment file

**What it contains**:

- Template for .env.local
- Comments explaining each variable
- Links to get API keys

**Why it's important**: Helps others set up the project

---

## Documentation Files

### `README.md`

Main project documentation

### `QUICKSTART.md`

Quick setup guide (5 minutes)

### `COMPLETE_GUIDE.md`

Comprehensive guide (everything you need)

### `DEPLOYMENT.md`

Deployment instructions for Vercel/Netlify

### `TESTING_CHECKLIST.md`

Testing checklist before submission

### `SUBMISSION_CHECKLIST.md`

Final submission checklist

### `TROUBLESHOOTING.md`

Common issues and solutions

### `VIDEO_DEMO_SCRIPT.md`

Script for recording demo video

### `PROJECT_SUMMARY.md`

Project overview and features

### `FILE_STRUCTURE.md`

This file - explains project structure

---

## Auto-Generated Directories

### `/node_modules`

**Purpose**: Installed npm packages
**Generated by**: `npm install`
**Should commit?**: NO (in .gitignore)

### `/.next`

**Purpose**: Next.js build output
**Generated by**: `npm run dev` or `npm run build`
**Should commit?**: NO (in .gitignore)

### `/.git`

**Purpose**: Git repository data
**Generated by**: `git init`
**Should commit?**: NO (automatically managed by Git)

---

## File Relationships

### How Components Connect

```
app/page.tsx (Main App)
    ├── UserForm.tsx (if no plan)
    │   └── Submits to generateFitnessPlan()
    │       └── Calls /api/generate-plan
    │           └── Returns FitnessPlan
    │
    ├── FitnessPlanDisplay.tsx (if plan exists)
    │   ├── Shows workout and diet
    │   ├── Calls generateImage() for images
    │   │   └── Calls /api/generate-image
    │   ├── Calls generateVoice() for audio
    │   │   └── Calls /api/generate-voice
    │   └── Calls exportToPDF() for PDF
    │
    ├── MotivationQuote.tsx
    │   └── Calls /api/motivation
    │
    └── ThemeToggle.tsx
        └── Manages dark mode
```

### Data Flow

```
1. User fills form (UserForm.tsx)
2. Form data → app/page.tsx
3. page.tsx → lib/ai-service.ts → /api/generate-plan
4. API calls OpenAI → returns plan
5. Plan stored in state and localStorage
6. FitnessPlanDisplay.tsx renders plan
7. User clicks features:
   - Voice → /api/generate-voice → ElevenLabs
   - Image → /api/generate-image → DALL-E
   - PDF → lib/pdf-export.ts → Print dialog
```

---

## What You Need to Modify

### To Change AI Provider

Edit: `app/api/generate-plan/route.ts`
Change: API endpoint and request format

### To Change Voice

Edit: `app/api/generate-voice/route.ts`
Change: Voice ID or API provider

### To Add New Features

1. Create component in `/components`
2. Import in `app/page.tsx`
3. Add API route in `/app/api` if needed
4. Update types in `lib/types.ts`

### To Customize Styling

Edit: `app/globals.css` or component className props

---

## File Size Reference

| File                              | Lines | Purpose          |
| --------------------------------- | ----- | ---------------- |
| app/page.tsx                      | ~80   | Main app logic   |
| components/UserForm.tsx           | ~150  | Input form       |
| components/FitnessPlanDisplay.tsx | ~200  | Plan display     |
| app/api/generate-plan/route.ts    | ~100  | AI generation    |
| lib/types.ts                      | ~40   | Type definitions |

---

## Best Practices

### File Organization

- Keep components in `/components`
- Keep API routes in `/app/api`
- Keep utilities in `/lib`
- Keep types in `lib/types.ts`

### Naming Conventions

- Components: PascalCase (UserForm.tsx)
- API routes: kebab-case (generate-plan/)
- Functions: camelCase (generatePlan)
- Types: PascalCase (UserProfile)

### Import Paths

Use `@/` alias for imports:

```typescript
import { UserProfile } from "@/lib/types";
import UserForm from "@/components/UserForm";
```

---

## Quick Reference

### Need to add a feature?

1. Create component in `/components`
2. Import in `app/page.tsx`
3. Add types in `lib/types.ts`

### Need to add an API?

1. Create folder in `/app/api`
2. Add `route.ts` file
3. Export POST or GET function

### Need to change styling?

1. Edit component className props
2. Or edit `app/globals.css`

### Need to add environment variable?

1. Add to `.env.local`
2. Add to `.env.example`
3. Use in code: `process.env.VARIABLE_NAME`

---

**This structure follows Next.js 15 App Router best practices and is optimized for deployment to Vercel/Netlify.**
