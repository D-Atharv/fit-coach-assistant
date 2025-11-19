import { NextResponse } from "next/server";

const demoQuotes = [
  "Your only limit is you. Push harder today!",
  "Success starts with self-discipline and dedication.",
  "The pain you feel today will be the strength you feel tomorrow.",
  "Don't wish for it, work for it!",
  "Your body can stand almost anything. It's your mind you have to convince.",
  "The only bad workout is the one that didn't happen.",
  "Strive for progress, not perfection.",
  "Believe in yourself and all that you are capable of achieving.",
];

export async function GET() {
  try {
    const geminiKey = process.env.GEMINI_API_KEY;
    const hasValidGemini =
      geminiKey &&
      geminiKey !== "your_gemini_key_here" &&
      geminiKey.startsWith("AIza");

    if (!hasValidGemini) {
      const randomQuote =
        demoQuotes[Math.floor(Math.random() * demoQuotes.length)];
      return NextResponse.json({ quote: randomQuote });
    }

    // Use Gemini 2.0 Flash
    try {
      const response = await fetch(
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
                    text: "Generate a short, powerful motivational fitness quote (max 20 words). Return only the quote, no quotation marks.",
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.9,
              maxOutputTokens: 50,
            },
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
          const quote = data.candidates[0].content.parts[0].text.trim();
          return NextResponse.json({ quote });
        }
      }
    } catch (geminiError) {
      console.error("Gemini API error:", geminiError);
    }

    // Fallback to demo quotes
    const randomQuote =
      demoQuotes[Math.floor(Math.random() * demoQuotes.length)];
    return NextResponse.json({ quote: randomQuote });
  } catch (error) {
    console.error("Error generating motivation:", error);
    const randomQuote =
      demoQuotes[Math.floor(Math.random() * demoQuotes.length)];
    return NextResponse.json({ quote: randomQuote });
  }
}
