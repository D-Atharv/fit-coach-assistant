import { NextRequest, NextResponse } from "next/server";
import { UserProfile } from "@/lib/types";

// Demo plan for testing without API keys
function generateDemoPlan(profile: UserProfile) {
  return {
    workoutPlan: [
      {
        day: "Monday",
        exercises: [
          {
            name: "Bench Press",
            sets: 4,
            reps: "8-10",
            restTime: "90s",
            notes: "Focus on form",
          },
          {
            name: "Incline Dumbbell Press",
            sets: 3,
            reps: "10-12",
            restTime: "60s",
          },
          { name: "Cable Flyes", sets: 3, reps: "12-15", restTime: "45s" },
          { name: "Tricep Dips", sets: 3, reps: "10-12", restTime: "60s" },
        ],
      },
      {
        day: "Tuesday",
        exercises: [
          {
            name: "Squats",
            sets: 4,
            reps: "8-10",
            restTime: "90s",
            notes: "Keep back straight",
          },
          { name: "Leg Press", sets: 3, reps: "12-15", restTime: "60s" },
          { name: "Leg Curls", sets: 3, reps: "12-15", restTime: "45s" },
          { name: "Calf Raises", sets: 4, reps: "15-20", restTime: "45s" },
        ],
      },
      {
        day: "Wednesday",
        exercises: [
          {
            name: "Rest Day",
            sets: 0,
            reps: "0",
            restTime: "0s",
            notes: "Active recovery",
          },
        ],
      },
      {
        day: "Thursday",
        exercises: [
          { name: "Pull-ups", sets: 4, reps: "8-10", restTime: "90s" },
          { name: "Barbell Rows", sets: 4, reps: "8-10", restTime: "90s" },
          { name: "Lat Pulldowns", sets: 3, reps: "10-12", restTime: "60s" },
          { name: "Bicep Curls", sets: 3, reps: "10-12", restTime: "45s" },
        ],
      },
      {
        day: "Friday",
        exercises: [
          { name: "Overhead Press", sets: 4, reps: "8-10", restTime: "90s" },
          { name: "Lateral Raises", sets: 3, reps: "12-15", restTime: "45s" },
          { name: "Front Raises", sets: 3, reps: "12-15", restTime: "45s" },
          { name: "Shrugs", sets: 3, reps: "12-15", restTime: "45s" },
        ],
      },
      {
        day: "Saturday",
        exercises: [
          {
            name: "Deadlifts",
            sets: 4,
            reps: "6-8",
            restTime: "120s",
            notes: "Maintain proper form",
          },
          {
            name: "Romanian Deadlifts",
            sets: 3,
            reps: "10-12",
            restTime: "60s",
          },
          { name: "Planks", sets: 3, reps: "60s hold", restTime: "45s" },
        ],
      },
      {
        day: "Sunday",
        exercises: [
          {
            name: "Rest Day",
            sets: 0,
            reps: "0",
            restTime: "0s",
            notes: "Complete rest",
          },
        ],
      },
    ],
    dietPlan: {
      breakfast: {
        name: "Breakfast",
        items: [
          "Oatmeal with berries",
          "2 whole eggs",
          "Greek yogurt",
          "Green tea",
        ],
        calories: "450",
        protein: "30g",
      },
      lunch: {
        name: "Lunch",
        items: [
          "Grilled chicken breast",
          "Brown rice",
          "Mixed vegetables",
          "Olive oil",
        ],
        calories: "600",
        protein: "45g",
      },
      dinner: {
        name: "Dinner",
        items: ["Salmon fillet", "Sweet potato", "Broccoli", "Quinoa"],
        calories: "550",
        protein: "40g",
      },
      snacks: {
        name: "Snacks",
        items: ["Protein shake", "Almonds", "Apple", "Cottage cheese"],
        calories: "300",
        protein: "25g",
      },
    },
    tips: [
      "Stay hydrated - drink at least 8 glasses of water daily",
      "Get 7-9 hours of quality sleep each night for optimal recovery",
      "Maintain proper form over heavy weights to prevent injuries",
      "Track your progress weekly to stay motivated",
      "Include stretching and mobility work in your routine",
      "Listen to your body and take rest days when needed",
      "Meal prep on Sundays to stay consistent with your diet",
    ],
    motivation: `${profile.name}, your journey to ${profile.fitnessGoal.replace(
      "_",
      " "
    )} starts now! Stay consistent, trust the process, and remember - every workout brings you closer to your goals!`,
  };
}

export async function POST(req: NextRequest) {
  try {
    const profile: UserProfile = await req.json();

    const prompt = `You are an expert fitness coach and nutritionist. Generate a personalized fitness plan for the following user:

Name: ${profile.name}
Age: ${profile.age}
Gender: ${profile.gender}
Height: ${profile.height}cm
Weight: ${profile.weight}kg
Fitness Goal: ${profile.fitnessGoal.replace("_", " ")}
Fitness Level: ${profile.fitnessLevel}
Workout Location: ${profile.workoutLocation}
Dietary Preference: ${profile.dietaryPreference.replace("_", " ")}
${profile.medicalHistory ? `Medical History: ${profile.medicalHistory}` : ""}
${profile.stressLevel ? `Stress Level: ${profile.stressLevel}` : ""}

Generate a comprehensive fitness plan in JSON format with:
1. A 7-day workout plan with exercises, sets, reps, and rest times
2. A detailed diet plan with breakfast, lunch, dinner, and snacks (including items and approximate calories/protein)
3. 5-7 lifestyle and posture tips
4. A motivational message

Return ONLY valid JSON in this exact structure:
{
  "workoutPlan": [
    {
      "day": "Monday",
      "exercises": [
        {"name": "Exercise name", "sets": 3, "reps": "10-12", "restTime": "60s", "notes": "Optional notes"}
      ]
    }
  ],
  "dietPlan": {
    "breakfast": {"name": "Breakfast", "items": ["item1", "item2"], "calories": "400", "protein": "25g"},
    "lunch": {"name": "Lunch", "items": ["item1", "item2"], "calories": "600", "protein": "40g"},
    "dinner": {"name": "Dinner", "items": ["item1", "item2"], "calories": "500", "protein": "35g"},
    "snacks": {"name": "Snacks", "items": ["item1", "item2"], "calories": "200", "protein": "10g"}
  },
  "tips": ["tip1", "tip2", "tip3"],
  "motivation": "Your motivational message here"
}`;

    const geminiKey = process.env.GEMINI_API_KEY;

    // Check if we have valid Gemini API key
    const hasValidGemini =
      geminiKey &&
      geminiKey !== "your_gemini_key_here" &&
      geminiKey.startsWith("AIza");

    if (!hasValidGemini) {
      console.log("No valid Gemini API key found, using demo plan");
      return NextResponse.json(generateDemoPlan(profile));
    }

    // Use Gemini 2.0 Flash
    try {
      console.log("Using Gemini 2.0 Flash API...");
      const aiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 8192,
              responseMimeType: "application/json",
            },
          }),
        }
      );

      if (aiResponse.ok) {
        const aiData = await aiResponse.json();
        if (
          aiData.candidates &&
          aiData.candidates[0]?.content?.parts?.[0]?.text
        ) {
          const content = aiData.candidates[0].content.parts[0].text;
          console.log("Gemini 2.0 Flash API success!");

          // Parse JSON response
          const jsonMatch = content.match(/\{[\s\S]*\}/);
          const plan = jsonMatch
            ? JSON.parse(jsonMatch[0])
            : JSON.parse(content);

          return NextResponse.json(plan);
        } else {
          throw new Error("Invalid Gemini response structure");
        }
      } else {
        const errorText = await aiResponse.text();
        console.error("Gemini API error:", errorText);
        throw new Error(`Gemini API failed: ${aiResponse.status}`);
      }
    } catch (geminiError) {
      console.error("Gemini API error:", geminiError);
      console.log("Falling back to demo plan");
      return NextResponse.json(generateDemoPlan(profile));
    }
  } catch (error) {
    console.error("Error generating plan:", error);
    // Return demo plan as fallback
    try {
      const profile: UserProfile = await req.json();
      return NextResponse.json(generateDemoPlan(profile));
    } catch {
      return NextResponse.json(
        { error: "Failed to generate fitness plan" },
        { status: 500 }
      );
    }
  }
}
