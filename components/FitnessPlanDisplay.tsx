"use client";

import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useState,
} from "react";
import { FitnessPlan } from "@/lib/types";
import WorkoutStreak from "./WorkoutStreak";

interface FitnessPlanDisplayProps {
  plan: FitnessPlan;
  onRegenerate: () => void;
  onExportPDF: () => void;
}

type TabType = "workout" | "diet" | "tips" | "streak";

export default function FitnessPlanDisplay({
  plan,
  onRegenerate,
  onExportPDF,
}: FitnessPlanDisplayProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loadingImage, setLoadingImage] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("workout");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const handleImageGeneration = async (prompt: string) => {
    setLoadingImage(true);
    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (data.description) {
        alert(
          `AI Visual Description:\n\n${data.description}\n\nNote: Gemini provides descriptions, not actual images.`
        );
      } else {
        throw new Error(data.error || "Failed to generate description");
      }
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Image generation is currently unavailable.");
    } finally {
      setLoadingImage(false);
    }
  };

  const getTextForTab = (tab: TabType): string => {
    if (tab === "workout") {
      return plan.workoutPlan
        .map(
          (day) =>
            `${day.day}: ${day.exercises
              .map((ex) => `${ex.name}, ${ex.sets} sets of ${ex.reps}`)
              .join(". ")}`
        )
        .join(". ");
    } else if (tab === "diet") {
      return `Breakfast: ${plan.dietPlan.breakfast.items.join(
        ", "
      )}. Lunch: ${plan.dietPlan.lunch.items.join(
        ", "
      )}. Dinner: ${plan.dietPlan.dinner.items.join(
        ", "
      )}. Snacks: ${plan.dietPlan.snacks.items.join(", ")}.`;
    } else {
      return `Here are your lifestyle tips: ${plan.tips.join(". ")}`;
    }
  };

  const handlePlay = () => {
    if (activeTab === "streak") return;

    if ("speechSynthesis" in window) {
      if (isPaused) {
        window.speechSynthesis.resume();
        setIsPaused(false);
        setIsPlaying(true);
      } else {
        window.speechSynthesis.cancel();
        const text = getTextForTab(activeTab);
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 1;

        utterance.onend = () => {
          setIsPlaying(false);
          setIsPaused(false);
        };

        utterance.onerror = () => {
          setIsPlaying(false);
          setIsPaused(false);
        };

        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);
        setIsPaused(false);
      }
    } else {
      alert("Voice feature is not supported in your browser.");
    }
  };

  const handlePause = () => {
    if ("speechSynthesis" in window && isPlaying) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
    }
  };

  const handleRestart = () => {
    handleStop();
    setTimeout(() => handlePlay(), 100);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Motivation Banner */}
      <div className="relative bg-gradient-to-r from-orange-600 to-amber-600 rounded-2xl p-6 sm:p-8 text-white overflow-hidden shadow-xl">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        ></div>
        <div className="relative z-10 text-center">
          <h3 className="text-xl sm:text-2xl font-bold mb-2">
            💪 Your Motivation
          </h3>
          <p className="text-lg sm:text-xl italic">{plan.motivation}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
        <button
          onClick={onExportPDF}
          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-300 text-slate-900 rounded-xl font-semibold hover:shadow-lg hover:border-orange-400 transition-all flex items-center justify-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Export PDF
        </button>
        <button
          onClick={onRegenerate}
          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-300 text-slate-900 rounded-xl font-semibold hover:shadow-lg hover:border-orange-400 transition-all flex items-center justify-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Regenerate Plan
        </button>
      </div>

      {/* Voice Controls */}
      {activeTab !== "streak" && (
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-2xl p-4 sm:p-6 shadow-lg">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-amber-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  Voice Narration
                </h3>
                <p className="text-sm text-slate-700">
                  Listen to your {activeTab} plan
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:flex gap-2">
              <button
                onClick={handlePlay}
                disabled={isPlaying}
                className="px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-1 sm:gap-2 shadow-md text-sm sm:text-base"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span className="hidden sm:inline">
                  {isPaused ? "Resume" : "Play"}
                </span>
                <span className="sm:hidden">▶</span>
              </button>

              <button
                onClick={handlePause}
                disabled={!isPlaying}
                className="px-3 sm:px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-1 sm:gap-2 shadow-md text-sm sm:text-base"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
                <span className="hidden sm:inline">Pause</span>
                <span className="sm:hidden">⏸</span>
              </button>

              <button
                onClick={handleStop}
                disabled={!isPlaying && !isPaused}
                className="px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-1 sm:gap-2 shadow-md text-sm sm:text-base"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 6h12v12H6z" />
                </svg>
                <span className="hidden sm:inline">Stop</span>
                <span className="sm:hidden">⏹</span>
              </button>

              <button
                onClick={handleRestart}
                disabled={!isPlaying && !isPaused}
                className="px-3 sm:px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-1 sm:gap-2 shadow-md text-sm sm:text-base"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
                </svg>
                <span className="hidden sm:inline">Restart</span>
                <span className="sm:hidden">↻</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-2xl overflow-hidden shadow-xl">
        <div className="border-b-2 border-orange-200">
          <div className="flex overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveTab("workout")}
              className={`flex-1 min-w-[120px] px-3 sm:px-6 py-3 sm:py-4 font-semibold transition-all whitespace-nowrap ${
                activeTab === "workout"
                  ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg"
                  : "text-slate-700 hover:bg-orange-100"
              }`}
            >
              <div className="flex items-center justify-center gap-1 sm:gap-2">
                <span className="text-xl sm:text-2xl">🏋️</span>
                <span className="text-sm sm:text-base">Workout</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("diet")}
              className={`flex-1 min-w-[120px] px-3 sm:px-6 py-3 sm:py-4 font-semibold transition-all whitespace-nowrap ${
                activeTab === "diet"
                  ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg"
                  : "text-slate-700 hover:bg-orange-100"
              }`}
            >
              <div className="flex items-center justify-center gap-1 sm:gap-2">
                <span className="text-xl sm:text-2xl">🥗</span>
                <span className="text-sm sm:text-base">Diet</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("tips")}
              className={`flex-1 min-w-[120px] px-3 sm:px-6 py-3 sm:py-4 font-semibold transition-all whitespace-nowrap ${
                activeTab === "tips"
                  ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg"
                  : "text-slate-700 hover:bg-orange-100"
              }`}
            >
              <div className="flex items-center justify-center gap-1 sm:gap-2">
                <span className="text-xl sm:text-2xl">💡</span>
                <span className="text-sm sm:text-base">Tips</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("streak")}
              className={`flex-1 min-w-[120px] px-3 sm:px-6 py-3 sm:py-4 font-semibold transition-all whitespace-nowrap ${
                activeTab === "streak"
                  ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg"
                  : "text-slate-700 hover:bg-orange-100"
              }`}
            >
              <div className="flex items-center justify-center gap-1 sm:gap-2">
                <span className="text-xl sm:text-2xl">🔥</span>
                <span className="text-sm sm:text-base">Streak</span>
              </div>
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          {/* Workout Plan Tab */}
          {activeTab === "workout" && (
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 sm:mb-6">
                7-Day Workout Plan
              </h2>
              {plan.workoutPlan.map((day, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-orange-200 rounded-xl p-4 sm:p-6 shadow-md"
                >
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-orange-700">
                    {day.day}
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    {day.exercises.map((exercise, exIdx) => (
                      <div
                        key={exIdx}
                        className="bg-white/80 border border-orange-200 rounded-lg p-3 sm:p-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                          <div className="flex-1">
                            <h4 className="font-semibold text-base sm:text-lg text-slate-900">
                              {exercise.name}
                            </h4>
                            <p className="text-sm sm:text-base text-slate-700 mt-1">
                              {exercise.sets} sets × {exercise.reps} reps |
                              Rest: {exercise.restTime}
                            </p>
                            {exercise.notes && (
                              <p className="text-xs sm:text-sm text-slate-600 mt-2 italic">
                                {exercise.notes}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => handleImageGeneration(exercise.name)}
                            disabled={loadingImage}
                            className="w-full sm:w-auto sm:ml-4 px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white text-sm rounded-lg hover:shadow-lg disabled:opacity-50 transition-all flex-shrink-0"
                          >
                            🖼️ View
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Diet Plan Tab */}
          {activeTab === "diet" && (
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 sm:mb-6">
                Daily Diet Plan
              </h2>
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                {Object.entries(plan.dietPlan).map(([mealType, meal]) => (
                  <div
                    key={mealType}
                    className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-orange-200 rounded-xl p-4 sm:p-6 shadow-md"
                  >
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-orange-700 capitalize">
                      {mealType}
                    </h3>
                    <div className="bg-white/80 border border-orange-200 rounded-lg p-3 sm:p-4">
                      <ul className="space-y-3">
                        {meal.items.map(
                          (
                            item:
                              | string
                              | number
                              | bigint
                              | boolean
                              | ReactElement<
                                  unknown,
                                  string | JSXElementConstructor<any>
                                >
                              | Iterable<ReactNode>
                              | ReactPortal
                              | Promise<
                                  | string
                                  | number
                                  | bigint
                                  | boolean
                                  | ReactPortal
                                  | ReactElement<
                                      unknown,
                                      string | JSXElementConstructor<any>
                                    >
                                  | Iterable<ReactNode>
                                  | null
                                  | undefined
                                >
                              | null
                              | undefined,
                            idx: Key | null | undefined
                          ) => (
                            <li
                              key={idx}
                              className="flex justify-between items-center"
                            >
                              <span className="text-slate-900">{item}</span>
                              <button
                                onClick={() =>
                                  handleImageGeneration(
                                    `${item} food photography`
                                  )
                                }
                                disabled={loadingImage}
                                className="ml-2 px-3 py-1 bg-gradient-to-r from-orange-600 to-amber-600 text-white text-xs rounded-lg hover:shadow-lg disabled:opacity-50 transition-all"
                              >
                                🖼️
                              </button>
                            </li>
                          )
                        )}
                      </ul>
                      {meal.calories && (
                        <div className="mt-4 pt-4 border-t-2 border-orange-200 flex justify-between text-sm">
                          <span className="text-slate-700 font-medium">
                            📊 {meal.calories}
                          </span>
                          <span className="text-slate-700 font-medium">
                            💪 {meal.protein}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tips Tab */}
          {activeTab === "tips" && (
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 sm:mb-6">
                Lifestyle Tips
              </h2>
              <div className="space-y-3 sm:space-y-4">
                {plan.tips.map((tip, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-orange-200 rounded-xl p-4 sm:p-6 flex items-start gap-3 sm:gap-4 shadow-md"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-600 to-amber-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 shadow-lg text-sm sm:text-base">
                      {idx + 1}
                    </div>
                    <p className="text-base sm:text-lg text-slate-900 flex-1">
                      {tip}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Streak Tab */}
          {activeTab === "streak" && (
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 sm:mb-6">
                Your Workout Streak
              </h2>
              <WorkoutStreak />
            </div>
          )}
        </div>
      </div>

      {loadingImage && (
        <div className="fixed bottom-8 right-8 bg-gradient-to-r from-orange-600 to-amber-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
          <span>Generating description...</span>
        </div>
      )}
    </div>
  );
}
