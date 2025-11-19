import { UserProfile, FitnessPlan } from "./types";

export async function generateFitnessPlan(
  profile: UserProfile
): Promise<FitnessPlan> {
  const response = await fetch("/api/generate-plan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profile),
  });

  if (!response.ok) {
    throw new Error("Failed to generate fitness plan");
  }

  return response.json();
}

export async function generateImage(prompt: string): Promise<string> {
  const response = await fetch("/api/generate-image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate image");
  }

  const data = await response.json();
  return data.imageUrl;
}

export async function generateVoice(text: string): Promise<string> {
  const response = await fetch("/api/generate-voice", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate voice");
  }

  const data = await response.json();
  return data.audioUrl;
}

export async function getMotivationalQuote(): Promise<string> {
  const response = await fetch("/api/motivation");
  if (!response.ok) {
    throw new Error("Failed to get motivation");
  }
  const data = await response.json();
  return data.quote;
}
