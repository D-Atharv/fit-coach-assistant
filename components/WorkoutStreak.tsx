"use client";

import { useState, useEffect } from "react";

export default function WorkoutStreak() {
  const [streak, setStreak] = useState(0);
  const [workoutDays, setWorkoutDays] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Load workout days from localStorage
    const saved = localStorage.getItem("workoutDays");
    if (saved) {
      setWorkoutDays(new Set(JSON.parse(saved)));
    }

    // Calculate streak
    calculateStreak();
  }, []);

  const calculateStreak = () => {
    const saved = localStorage.getItem("workoutDays");
    if (!saved) return;

    const days = new Set(JSON.parse(saved));
    let currentStreak = 0;
    const today = new Date();

    // Count consecutive days backwards from today
    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];

      if (days.has(dateStr)) {
        currentStreak++;
      } else if (i > 0) {
        break;
      }
    }

    setStreak(currentStreak);
  };

  const toggleWorkoutDay = (dateStr: string) => {
    const newDays = new Set(workoutDays);
    if (newDays.has(dateStr)) {
      newDays.delete(dateStr);
    } else {
      newDays.add(dateStr);
    }
    setWorkoutDays(newDays);
    localStorage.setItem("workoutDays", JSON.stringify([...newDays]));
    calculateStreak();
  };

  // Get last 42 days (6 weeks) for calendar
  const getLast42Days = () => {
    const days = [];
    const today = new Date();

    for (let i = 41; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      days.push(date);
    }

    return days;
  };

  const days = getLast42Days();
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-2xl p-8 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-800 mb-1">
            Workout Streak
          </h3>
          <p className="text-slate-600">Track your consistency</p>
        </div>
        <div className="text-center">
          <div className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            {streak}
          </div>
          <div className="text-sm text-slate-600 font-medium">
            day{streak !== 1 ? "s" : ""}
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="space-y-2">
        {/* Week day labels */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {weekDays.map((day) => (
            <div
              key={day}
              className="text-center text-xs font-semibold text-slate-600"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((date, idx) => {
            const dateStr = date.toISOString().split("T")[0];
            const isWorkoutDay = workoutDays.has(dateStr);
            const isToday = dateStr === new Date().toISOString().split("T")[0];

            return (
              <button
                key={idx}
                onClick={() => toggleWorkoutDay(dateStr)}
                className={`
                  aspect-square rounded-lg text-xs font-medium transition-all hover:scale-110
                  ${
                    isWorkoutDay
                      ? "bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30"
                      : "bg-amber-100 text-slate-600 hover:bg-amber-200"
                  }
                  ${isToday ? "ring-2 ring-orange-600 ring-offset-2" : ""}
                `}
                title={date.toLocaleDateString()}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-br from-orange-500 to-amber-500"></div>
            <span className="text-slate-600">Workout completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-amber-100"></div>
            <span className="text-slate-600">Rest day</span>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-orange-100 to-amber-100 rounded-xl">
        <p className="text-sm text-slate-700 text-center">
          <span className="font-semibold">💪 Keep it up!</span> Click on any day
          to mark your workout
        </p>
      </div>
    </div>
  );
}
