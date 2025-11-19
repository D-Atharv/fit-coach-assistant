"use client";

import { useState } from "react";
import { UserProfile } from "@/lib/types";

interface UserFormProps {
  onSubmit: (profile: UserProfile) => void;
  loading: boolean;
}

export default function UserForm({ onSubmit, loading }: UserFormProps) {
  const [formData, setFormData] = useState<UserProfile>({
    name: "",
    age: 25,
    gender: "male",
    height: 170,
    weight: 70,
    fitnessGoal: "muscle_gain",
    fitnessLevel: "beginner",
    workoutLocation: "gym",
    dietaryPreference: "non_vegetarian",
    medicalHistory: "",
    stressLevel: "medium",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto">
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-2xl shadow-xl overflow-hidden">
        {/* Form Header */}
        <div className="bg-gradient-to-r from-orange-600 to-amber-600 p-8 text-white">
          <h2 className="text-3xl font-bold mb-2">Your Fitness Profile</h2>
          <p className="text-orange-100">
            Tell us about yourself to get a personalized plan
          </p>
        </div>

        <div className="p-8 space-y-8">
          {/* Personal Information Section */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
                👤
              </span>
              Personal Information
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 bg-amber-50 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-slate-900 placeholder-slate-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Age *
                </label>
                <input
                  type="number"
                  required
                  min="10"
                  max="100"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: parseInt(e.target.value) })
                  }
                  className="w-full px-4 py-3 bg-amber-50 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-slate-900"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Gender *
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value as any })
                  }
                  className="w-full px-4 py-3 bg-amber-50 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-slate-900 appearance-none cursor-pointer"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Stress Level
                </label>
                <select
                  value={formData.stressLevel}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stressLevel: e.target.value as any,
                    })
                  }
                  className="w-full px-4 py-3 bg-amber-50 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-slate-900 appearance-none cursor-pointer"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
          </div>

          {/* Physical Metrics Section */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
                📏
              </span>
              Physical Metrics
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Height (cm) *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    required
                    min="100"
                    max="250"
                    value={formData.height}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        height: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-4 py-3 bg-amber-50 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-slate-900"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 text-sm font-medium">
                    cm
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Weight (kg) *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    required
                    min="30"
                    max="200"
                    value={formData.weight}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        weight: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-4 py-3 bg-amber-50 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-slate-900"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 text-sm font-medium">
                    kg
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Fitness Goals Section */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center text-rose-600">
                🎯
              </span>
              Fitness Goals
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Primary Goal *
                </label>
                <select
                  value={formData.fitnessGoal}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fitnessGoal: e.target.value as any,
                    })
                  }
                  className="w-full px-4 py-3 bg-amber-50 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-slate-900 appearance-none cursor-pointer"
                >
                  <option value="weight_loss">🔥 Weight Loss</option>
                  <option value="muscle_gain">💪 Muscle Gain</option>
                  <option value="maintenance">⚖️ Maintenance</option>
                  <option value="endurance">🏃 Endurance</option>
                  <option value="flexibility">🧘 Flexibility</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Fitness Level *
                </label>
                <select
                  value={formData.fitnessLevel}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fitnessLevel: e.target.value as any,
                    })
                  }
                  className="w-full px-4 py-3 bg-amber-50 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-slate-900 appearance-none cursor-pointer"
                >
                  <option value="beginner">🌱 Beginner</option>
                  <option value="intermediate">🌿 Intermediate</option>
                  <option value="advanced">🌳 Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Workout Location *
                </label>
                <select
                  value={formData.workoutLocation}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      workoutLocation: e.target.value as any,
                    })
                  }
                  className="w-full px-4 py-3 bg-amber-50 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-slate-900 appearance-none cursor-pointer"
                >
                  <option value="home">🏠 Home</option>
                  <option value="gym">🏋️ Gym</option>
                  <option value="outdoor">🌳 Outdoor</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Dietary Preference *
                </label>
                <select
                  value={formData.dietaryPreference}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dietaryPreference: e.target.value as any,
                    })
                  }
                  className="w-full px-4 py-3 bg-amber-50 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-slate-900 appearance-none cursor-pointer"
                >
                  <option value="vegetarian">🥬 Vegetarian</option>
                  <option value="non_vegetarian">🍗 Non-Vegetarian</option>
                  <option value="vegan">🌱 Vegan</option>
                  <option value="keto">🥑 Keto</option>
                </select>
              </div>
            </div>
          </div>

          {/* Additional Information Section */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
                📋
              </span>
              Additional Information
            </h3>
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                Medical History (Optional)
              </label>
              <textarea
                value={formData.medicalHistory}
                onChange={(e) =>
                  setFormData({ ...formData, medicalHistory: e.target.value })
                }
                rows={4}
                placeholder="Any injuries, conditions, or medications we should know about..."
                className="w-full px-4 py-3 bg-amber-50 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-slate-900 placeholder-slate-500 resize-none"
              />
              <p className="mt-2 text-sm text-slate-600">
                This helps us create a safer, more personalized plan for you
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold text-lg rounded-xl hover:shadow-2xl hover:shadow-orange-600/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 group"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                  <span>Generating Your Plan...</span>
                </>
              ) : (
                <>
                  <span>🚀 Generate My Fitness Plan</span>
                  <svg
                    className="w-6 h-6 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </>
              )}
            </button>
            <p className="mt-4 text-center text-sm text-slate-600">
              Powered by Gemini 2.0 Flash • Takes 10-20 seconds
            </p>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-xl p-6">
          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-2xl mb-4">
            🤖
          </div>
          <h4 className="font-bold text-slate-900 mb-2">AI-Powered</h4>
          <p className="text-sm text-slate-700">
            Advanced Gemini 2.0 Flash creates personalized plans based on your
            unique profile
          </p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-xl p-6">
          <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-2xl mb-4">
            ⚡
          </div>
          <h4 className="font-bold text-slate-900 mb-2">Fast Generation</h4>
          <p className="text-sm text-slate-700">
            Get your complete 7-day workout and diet plan in just 10-20 seconds
          </p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-xl p-6">
          <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center text-2xl mb-4">
            🎯
          </div>
          <h4 className="font-bold text-slate-900 mb-2">Fully Customized</h4>
          <p className="text-sm text-slate-700">
            Every plan is unique to your goals, fitness level, and lifestyle
            preferences
          </p>
        </div>
      </div>
    </form>
  );
}
