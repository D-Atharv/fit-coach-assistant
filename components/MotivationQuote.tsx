"use client";

import { useEffect, useState } from "react";
import { getMotivationalQuote } from "@/lib/ai-service";

export default function MotivationQuote() {
  const [quote, setQuote] = useState("Loading motivation...");

  useEffect(() => {
    loadQuote();
  }, []);

  const loadQuote = async () => {
    try {
      const newQuote = await getMotivationalQuote();
      setQuote(newQuote);
    } catch (error) {
      setQuote("Your only limit is you. Push harder today!");
    }
  };

  return (
    <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white p-6 rounded-lg text-center shadow-lg">
      <h3 className="text-lg font-semibold mb-2">💬 Daily Motivation</h3>
      <p className="text-xl italic">{quote}</p>
      <button
        onClick={loadQuote}
        className="mt-4 px-4 py-2 bg-white text-orange-600 rounded-lg hover:bg-gray-100 text-sm font-semibold"
      >
        🔄 New Quote
      </button>
    </div>
  );
}
