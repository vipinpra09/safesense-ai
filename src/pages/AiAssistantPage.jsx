import React from 'react';
import { AiChat } from '../components/ai/AiChat';
import { HealthSnapshot } from '../components/emergency/HealthSnapshot';
import { Bot, PhoneCall, ShieldAlert, AlertOctagon } from 'lucide-react';
import { useEmergency } from '../context/EmergencyContext';

export function AiAssistantPage() {
  const { isEmergencyActive, triggerSos } = useEmergency();

  return (
    <div className="py-6 space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-indigo-600 to-rose-600 text-white shadow-md">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              AI Emergency & Assistive Health Assistant
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Powered by Google Gemini • Voice STT & TTS Audio Output Supported
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isEmergencyActive && (
            <button
              type="button"
              onClick={() => triggerSos('AI Assistant Header Trigger')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 cursor-pointer"
            >
              <AlertOctagon className="w-4 h-4" /> Trigger SOS
            </button>
          )}
          <a
            href="tel:911"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-black text-white font-bold text-xs shadow focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            <PhoneCall className="w-4 h-4 text-rose-400" /> Call 911
          </a>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: AI Chat */}
        <div className="lg:col-span-2">
          <AiChat />
        </div>

        {/* Right 1 Col: Health Snapshot & Emergency Guidelines */}
        <div className="space-y-6">
          <HealthSnapshot />

          {/* Safety Guidelines Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-500" />
              <h2 className="font-bold text-sm text-slate-900 dark:text-white">
                Emergency Communication Tips
              </h2>
            </div>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-1.5">
                <span className="text-amber-500 font-bold">•</span>
                <span>
                  Speak or type the most critical symptom first (e.g. "difficulty breathing").
                </span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-amber-500 font-bold">•</span>
                <span>Use the "Read Aloud" voice button to listen if reading is strenuous.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-amber-500 font-bold">•</span>
                <span>Attach AI summaries directly to your active SOS session with 1 click.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
