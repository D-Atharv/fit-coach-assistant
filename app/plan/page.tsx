"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import FitnessPlanDisplay from "@/components/FitnessPlanDisplay";
import WorkoutStreak from "@/components/WorkoutStreak";
import { FitnessPlan, UserProfile } from "@/lib/types";
import { exportToPDF } from "@/lib/pdf-export";
import Link from "next/link";

export default function PlanPage() {
  const [plan, setPlan] = useState<FitnessPlan | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedPlan = localStorage.getItem("fitnessPlan");
    const savedProfile = localStorage.getItem("userProfile");

    if (savedPlan && savedProfile) {
      setPlan(JSON.parse(savedPlan));
      setUserProfile(JSON.parse(savedProfile));
    } else {
      router.push("/create");
    }
  }, [router]);

  const handleRegenerate = () => {
    setPlan(null);
    setUserProfile(null);
    localStorage.removeItem("fitnessPlan");
    localStorage.removeItem("userProfile");
    router.push("/create");
  };

  const handleExportPDF = () => {
    if (plan && userProfile) {
      exportToPDF(plan, userProfile);
    }
  };

  if (!plan || !userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-orange-200 border-t-orange-600 mb-4"></div>
          <p className="text-xl font-semibold text-slate-800">
            Loading your plan...
          </p>
        </div>
      </div>
    );
  }

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

      <div className="relative max-w-7xl mx-auto space-y-8">
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
            Your Personalized
            <br />
            <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Fitness Plan
            </span>
          </h1>
          <p className="text-xl text-slate-700 font-light">
            Welcome back, {userProfile.name}! Here's your custom plan.
          </p>
        </div>

        <FitnessPlanDisplay
          plan={plan}
          onRegenerate={handleRegenerate}
          onExportPDF={handleExportPDF}
        />
      </div>
    </main>
  );
}
