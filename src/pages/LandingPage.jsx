import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldAlert,
  AlertOctagon,
  Bot,
  Users,
  HeartPulse,
  Sliders,
  CheckCircle2,
  Lock,
  Sparkles,
  MapPin,
  PhoneCall,
  Volume2,
  Eye,
  ArrowRight
} from 'lucide-react';
import { SosButton } from '../components/emergency/SosButton';
import { useEmergency } from '../context/EmergencyContext';

export function LandingPage() {
  const { isEmergencyActive } = useEmergency();

  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950 text-white p-6 sm:p-12 border border-slate-800 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-black uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
            Zero Authentication • Immediate Help
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            When Every Second Counts, <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-red-400 to-amber-300">
              Assistance Should Be Instant.
            </span>
          </h1>

          <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
            SafeSense AI is an accessibility-first emergency safety platform powered by Google Gemini.
            No sign-up, no login passwords, no barriers. Immediate SOS activation, medical triage, and
            1-tap emergency contact dispatch.
          </p>

          {/* Core SOS Button Placement */}
          <div className="pt-4 pb-2">
            <SosButton size="large" />
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-sm shadow-xl focus:outline-none focus:ring-4 focus:ring-white transition-all active:scale-95"
            >
              Open Safety Dashboard <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/assistant"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-indigo-600/80 hover:bg-indigo-600 text-white font-extrabold text-sm border border-indigo-400/40 shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all active:scale-95"
            >
              <Bot className="w-4 h-4" /> AI Emergency Assistant
            </Link>
          </div>
        </div>
      </section>

      {/* Target Audiences Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Built for Vulnerable & High-Risk Moments
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
            Designed specifically for users who need frictionless emergency support without navigating complex apps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-rose-300 dark:hover:border-rose-700 transition-all">
            <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-4">
              <HeartPulse className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1">
              Elderly & Solo Living
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Instant fall recovery guidance, 1-tap alerts with GPS coordinates, and clear large buttons.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-300 dark:hover:border-blue-700 transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1">
              Accessibility First
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Full screen reader support, high contrast dark/light modes, font scaling, and voice STT/TTS.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-purple-300 dark:hover:border-purple-700 transition-all">
            <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1">
              Personal Safety
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Discreet coordinate dispatch, silent panic options, and pre-formatted emergency SMS alerts.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-300 dark:hover:border-emerald-700 transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1">
              Complete Privacy
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              No cloud storage of personal records. All health profiles and contacts live strictly on this browser.
            </p>
          </div>
        </div>
      </section>

      {/* 3 Step Workflow */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-400">
              Simple 3-Step Emergency Flow
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mt-1">How SafeSense AI Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center font-black text-xl mb-4">
                1
              </div>
              <h3 className="font-bold text-lg mb-2">Tap SOS or Speak</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Activate the giant SOS button or speak your emergency using voice recognition. No login required.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-xl mb-4">
                2
              </div>
              <h3 className="font-bold text-lg mb-2">AI Triage & GPS Lock</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Google Gemini synthesizes immediate, calm first aid instructions while the browser locks your GPS coordinates.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-xl mb-4">
                3
              </div>
              <h3 className="font-bold text-lg mb-2">1-Tap Alert Broadcast</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Dispatch pre-filled SMS and WhatsApp alerts to loved ones with direct Google Maps links and Medical ID.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase">
              <Sparkles className="w-3.5 h-3.5" /> Powered by Google Gemini
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white leading-tight">
              Calm, Structured AI Emergency Triage
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              During panic or acute stress, complex instructions fail. SafeSense AI's customized Gemini
              model synthesizes symptoms into clear, numbered actions and generates exact briefing points for 911 dispatchers.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Urgency rating from Low to Critical</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Text-to-speech voice narration for hands-free listening</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Strict guardrails preventing dangerous or misleading medical claims</span>
              </li>
            </ul>
            <div className="pt-2">
              <Link
                to="/assistant"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-xs sm:text-sm hover:opacity-90 transition-opacity"
              >
                Try AI Emergency Assistant →
              </Link>
            </div>
          </div>

          <div className="p-6 bg-gradient-to-br from-indigo-900 to-slate-950 text-white rounded-3xl border border-indigo-800/60 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-indigo-800/60">
              <span className="text-xs font-bold uppercase text-indigo-300">Live Triage Snapshot Preview</span>
              <span className="px-2.5 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-black uppercase">
                High Urgency
              </span>
            </div>
            <div className="text-sm font-semibold text-indigo-100">
              "User reports slipping in kitchen, cannot stand due to severe hip pain."
            </div>
            <div className="space-y-2 text-xs bg-black/40 p-4 rounded-xl border border-white/10">
              <div className="font-bold text-amber-300">Recommended Steps:</div>
              <div>1. Stay still on floor to prevent secondary joint dislocation.</div>
              <div>2. Cover with nearby cloth/towel to preserve core body temperature.</div>
              <div>3. Dispatch GPS coordinates to primary contact Sarah Miller.</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
