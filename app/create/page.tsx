"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import UserForm from "@/components/UserForm";
import { UserProfile } from "@/lib/types";
import { generateFitnessPlan } from "@/lib/ai-service";
import Link from "next/link";

export default function CreatePlanPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGeneratePlan = async (profile: UserProfile) => {
    setLoading(true);
    try {
      const generatedPlan = await generateFitnessPlan(profile);

      localStorage.setItem("fitnessPlan", JSON.stringify(generatedPlan));
      localStorage.setItem("userProfile", JSON.stringify(profile));

      router.push("/plan");
    } catch (error) {
      console.error("Error generating plan:", error);
      alert("Failed to generate plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 py-12 px-4">
      <div
        className="fixed inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #fb923c 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-6 transition-colors font-medium"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight text-slate-900">
            Create Your
            <br />
            <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Fitness Plan
            </span>
          </h1>
          <p className="text-xl text-slate-700 font-light">
            Tell us about yourself and we'll create a personalized plan
          </p>
        </div>

        {loading && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-orange-200 border-t-orange-600"></div>
            <p className="mt-6 text-xl font-semibold text-slate-900">
              Generating your personalized plan...
            </p>
            <p className="mt-2 text-slate-700">This may take 10-20 seconds</p>
          </div>
        )}

        {!loading && (
          <UserForm onSubmit={handleGeneratePlan} loading={loading} />
        )}
      </div>
    </main>
  );
}
