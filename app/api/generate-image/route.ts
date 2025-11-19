import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    const geminiKey = process.env.GEMINI_API_KEY;

    if (!geminiKey || geminiKey === "your_gemini_key_here") {
      return NextResponse.json(
        { error: "Gemini API key not configured" },
        { status: 400 }
      );
    }

    // Use Gemini 2.0 Flash Pro for better image understanding and description
    try {
      const aiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${geminiKey}`,
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
                    text: `Create a detailed, vivid description for: "${prompt}". 
                    
Describe it as if you're painting a picture with words. Include:
- Visual appearance and form
- Colors and lighting
- Key details and characteristics
- Composition and perspective

Make it detailed enough that someone could visualize it clearly.`,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.8,
              maxOutputTokens: 300,
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
          const description = aiData.candidates[0].content.parts[0].text;

          // Return the description as a visual guide
          // Note: Gemini doesn't generate actual images, but provides detailed descriptions
          return NextResponse.json({
            description,
            success: true,
            message: "Generated visual description using Gemini 2.0 Flash",
          });
        }
      }

      const errorText = await aiResponse.text();
      console.error("Gemini API error:", errorText);
      throw new Error("Gemini API failed");
    } catch (error) {
      console.error("Gemini API error:", error);
      return NextResponse.json(
        {
          error:
            "Image generation is currently unavailable. Gemini API provides descriptions, not actual images.",
          description: `Visual concept: ${prompt}`,
          success: false,
        },
        { status: 503 }
      );
    }
  } catch (error) {
    console.error("Error in image generation:", error);
    return NextResponse.json(
      { error: "Failed to process image request" },
      { status: 500 }
    );
  }
}
