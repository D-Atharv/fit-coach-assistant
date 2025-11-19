"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getMotivationalQuote } from "@/lib/ai-service";
import WorkoutStreak from "@/components/WorkoutStreak";

export default function LandingPage() {
  const [quote, setQuote] = useState(
    "Transform your body, transform your life"
  );
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    loadQuote();

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const loadQuote = async () => {
    try {
      const newQuote = await getMotivationalQuote();
      setQuote(newQuote);
    } catch (error) {
      console.error("Error loading quote:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 text-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgb(251 146 60 / 0.3) 1px, transparent 0)",
            backgroundSize: "48px 48px",
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />

        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-rose-400/20 rounded-full blur-3xl animate-float"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 border-b border-orange-200 backdrop-blur-xl bg-amber-50/80">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-600/30">
                  <span className="text-2xl">💪</span>
                </div>
                <span className="text-xl font-bold text-slate-900">
                  AI Fitness Coach
                </span>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <a
                  href="#features"
                  className="text-sm font-medium text-slate-700 hover:text-orange-600 transition-colors"
                >
                  Features
                </a>
                <a
                  href="#streak"
                  className="text-sm font-medium text-slate-700 hover:text-orange-600 transition-colors"
                >
                  Track Progress
                </a>
                <a
                  href="#how-it-works"
                  className="text-sm font-medium text-slate-700 hover:text-orange-600 transition-colors"
                >
                  How It Works
                </a>
                <a
                  href="#testimonials"
                  className="text-sm font-medium text-slate-700 hover:text-orange-600 transition-colors"
                >
                  Testimonials
                </a>
              </div>
              <Link
                href="/create"
                className="px-6 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-600/50 transition-all"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center space-y-8 max-w-5xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-orange-100 border border-orange-300 rounded-full text-sm font-medium backdrop-blur-sm animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              <span className="text-orange-800">
                Powered by Gemini 2.0 Flash AI
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight animate-slide-up">
              <span className="block text-slate-900">Transform Your</span>
              <span className="block bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 bg-clip-text text-transparent animate-gradient">
                Fitness Journey
              </span>
              <span className="block text-slate-900">With AI</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-700 leading-relaxed max-w-3xl mx-auto animate-fade-in-delay">
              Get personalized workout and diet plans powered by advanced AI.
              Tailored to your goals, fitness level, and lifestyle. Start your
              transformation today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 animate-fade-in-delay-2">
              <Link
                href="/create"
                className="group px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-orange-600/50 transition-all hover:scale-105 flex items-center space-x-2"
              >
                <span>Create Your Plan</span>
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
              </Link>
              <button
                onClick={loadQuote}
                className="px-8 py-4 bg-amber-100 border-2 border-orange-300 text-slate-900 rounded-xl font-semibold text-lg hover:bg-amber-200 hover:border-orange-400 transition-all"
              >
                Get Inspired ✨
              </button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-16 max-w-3xl mx-auto animate-fade-in-delay-3">
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  10K+
                </div>
                <div className="text-sm text-slate-600 mt-1">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  50K+
                </div>
                <div className="text-sm text-slate-600 mt-1">Plans Created</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  98%
                </div>
                <div className="text-sm text-slate-600 mt-1">Satisfaction</div>
              </div>
            </div>

            <div className="pt-16 max-w-3xl mx-auto animate-fade-in-delay-4">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-amber-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-2xl p-8">
                  <svg
                    className="w-10 h-10 text-orange-600 mb-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-lg md:text-xl text-slate-800 italic leading-relaxed">
                    {quote}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Workout Streak Section */}
        <section
          id="streak"
          className="relative border-t-2 border-orange-200 py-32 bg-gradient-to-br from-orange-100 to-amber-100"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900">
                Track Your Progress
              </h2>
              <p className="text-xl text-slate-700 max-w-2xl mx-auto">
                Stay motivated with our workout streak calendar. Build
                consistency and watch your progress grow!
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <WorkoutStreak />
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-2xl p-8 text-center">
                <div className="text-5xl mb-4">🔥</div>
                <h3 className="text-2xl font-bold mb-3 text-slate-900">
                  Build Habits
                </h3>
                <p className="text-slate-700">
                  Consistency is key. Track your daily workouts and build
                  lasting fitness habits.
                </p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-2xl p-8 text-center">
                <div className="text-5xl mb-4">📈</div>
                <h3 className="text-2xl font-bold mb-3 text-slate-900">
                  See Progress
                </h3>
                <p className="text-slate-700">
                  Visualize your commitment with our interactive calendar. Every
                  day counts!
                </p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-2xl p-8 text-center">
                <div className="text-5xl mb-4">🏆</div>
                <h3 className="text-2xl font-bold mb-3 text-slate-900">
                  Stay Motivated
                </h3>
                <p className="text-slate-700">
                  Watch your streak grow and stay motivated to reach your
                  fitness goals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="relative border-t-2 border-orange-200 py-32"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900">
                Everything You Need
              </h2>
              <p className="text-xl text-slate-700 max-w-2xl mx-auto">
                Comprehensive AI-powered tools to help you reach your fitness
                goals faster
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: "🏋️",
                  title: "Custom Workouts",
                  desc: "7-day personalized workout plans with detailed exercises, sets, reps, and rest times tailored to your fitness level and goals.",
                  color: "from-orange-500 to-amber-500",
                },
                {
                  icon: "🥗",
                  title: "Nutrition Plans",
                  desc: "Complete diet plans with meal breakdowns, calorie tracking, and protein targets based on your dietary preferences.",
                  color: "from-amber-500 to-yellow-500",
                },
                {
                  icon: "🤖",
                  title: "AI-Powered",
                  desc: "Advanced Gemini 2.0 Flash AI analyzes your profile to create adaptive, personalized plans that evolve with you.",
                  color: "from-orange-600 to-rose-500",
                },
                {
                  icon: "🔊",
                  title: "Voice Narration",
                  desc: "Listen to your workout and diet plans with natural voice synthesis. Perfect for hands-free guidance during workouts.",
                  color: "from-rose-500 to-pink-500",
                },
                {
                  icon: "📊",
                  title: "Progress Tracking",
                  desc: "Monitor your fitness journey with detailed analytics. Track workouts, meals, and see your transformation over time.",
                  color: "from-amber-500 to-orange-500",
                },
                {
                  icon: "📄",
                  title: "Export & Save",
                  desc: "Download your plans as PDF, save them locally, and access them anytime. Your fitness plan, always with you.",
                  color: "from-orange-500 to-amber-600",
                },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="group relative bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-2xl p-8 hover:shadow-2xl hover:shadow-orange-200/50 transition-all duration-300 hover:-translate-y-2"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform shadow-lg`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="text-slate-700 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section
          id="how-it-works"
          className="relative border-t-2 border-orange-200 py-32 bg-gradient-to-br from-orange-100 to-amber-100"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900">
                How It Works
              </h2>
              <p className="text-xl text-slate-700">
                Get your personalized fitness plan in 4 simple steps
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  num: "01",
                  title: "Enter Details",
                  desc: "Share your fitness goals, current level, and preferences",
                  icon: "📝",
                },
                {
                  num: "02",
                  title: "AI Generates",
                  desc: "Gemini 2.0 Flash creates your personalized plan in seconds",
                  icon: "🤖",
                },
                {
                  num: "03",
                  title: "Review Plan",
                  desc: "See your complete 7-day workout and diet plan",
                  icon: "👀",
                },
                {
                  num: "04",
                  title: "Start Training",
                  desc: "Follow your plan and achieve your fitness goals",
                  icon: "🚀",
                },
              ].map((step, idx) => (
                <div key={idx} className="relative text-center">
                  {idx < 3 && (
                    <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-orange-600 to-amber-600 opacity-30"></div>
                  )}
                  <div className="relative inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-600 to-amber-600 rounded-2xl text-white font-bold text-3xl mb-6 shadow-2xl shadow-orange-600/30">
                    <span className="text-4xl">{step.icon}</span>
                  </div>
                  <div className="text-sm font-bold text-orange-600 mb-2">
                    {step.num}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-slate-900">
                    {step.title}
                  </h3>
                  <p className="text-slate-700">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section
          id="testimonials"
          className="relative border-t-2 border-orange-200 py-32"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900">
                Loved by Thousands
              </h2>
              <p className="text-xl text-slate-700">
                See what our users are saying about their transformation
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Lost 15kg in 3 months",
                  text: "The AI-generated plan was exactly what I needed. Personalized, effective, and easy to follow!",
                  rating: 5,
                },
                {
                  name: "Mike Chen",
                  role: "Gained 8kg muscle",
                  text: "Best fitness app I've used. The workout plans are challenging but achievable. Highly recommend!",
                  rating: 5,
                },
                {
                  name: "Emma Davis",
                  role: "Improved endurance",
                  text: "The voice narration feature is a game-changer. I can follow my workouts hands-free!",
                  rating: 5,
                },
              ].map((testimonial, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-2xl p-8 hover:shadow-xl transition-all"
                >
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-amber-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-slate-800 mb-6 italic">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <div className="font-bold text-slate-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-slate-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative border-t-2 border-orange-200 py-32 bg-gradient-to-br from-orange-600 via-amber-600 to-orange-700 text-white overflow-hidden">
          <div
            className="absolute inset-0 bg-grid opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          ></div>
          <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Ready to Transform?
            </h2>
            <p className="text-xl text-orange-100 mb-10 max-w-2xl mx-auto">
              Join thousands of people achieving their fitness goals with
              AI-powered personalization. Start your journey today, completely
              free.
            </p>
            <Link
              href="/create"
              className="inline-block px-12 py-5 bg-white text-orange-600 rounded-xl font-bold text-xl hover:bg-orange-50 transition-all shadow-2xl hover:scale-105"
            >
              Get Your Free Plan Now
            </Link>
            <p className="mt-6 text-orange-100 text-sm">
              No credit card required • Takes 2 minutes
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t-2 border-orange-200 py-12 bg-gradient-to-br from-amber-50 to-orange-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-600 to-amber-600 rounded-lg flex items-center justify-center">
                  <span className="text-lg">💪</span>
                </div>
                <span className="font-semibold text-slate-900">
                  AI Fitness Coach
                </span>
              </div>
              <p className="text-sm text-slate-600">
                © 2024 AI Fitness Coach. Powered by Gemini 2.0 Flash.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
