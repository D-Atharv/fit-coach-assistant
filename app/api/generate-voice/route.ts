import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    // Return a flag to use browser's Web Speech API instead
    // This avoids API costs and works without any keys
    return NextResponse.json({
      useBrowserSpeech: true,
      text: text,
    });
  } catch (error) {
    console.error("Error in voice route:", error);
    return NextResponse.json(
      { error: "Failed to process voice request" },
      { status: 500 }
    );
  }
}
