import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AlertOctagon,
  Bot,
  Users,
  HeartPulse,
  History,
  Sliders,
  MapPin,
  ShieldCheck,
  PhoneCall,
  Activity,
  ArrowRight,
  Plus
} from 'lucide-react';
import { useEmergency } from '../context/EmergencyContext';
import { useContacts } from '../context/ContactsContext';
import { useHealthProfile } from '../context/HealthProfileContext';
import { useHistory } from '../context/HistoryContext';
import { SosButton } from '../components/emergency/SosButton';
import { QUICK_SITUATION_PRESETS } from '../utils/constants';

export function DashboardPage() {
  const { isEmergencyActive, location, locationStatus, requestLocation } = useEmergency();
  const { contacts } = useContacts();
  const { profile } = useHealthProfile();
  const { history } = useHistory();
  const navigate = useNavigate();

  const handleLaunchAiWithPrompt = (prompt) => {
    navigate('/assistant');
  };

  return (
    <div className="space-y-8 py-6">
      {/* Top Welcome & SOS Section */}
      <div className="flex flex-col lg:flex-row items-stretch gap-6">
        {/* Main SOS Trigger Card */}
        <div className="lg:w-1/2 bg-gradient-to-br from-rose-600 to-red-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-red-500 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/30 text-white text-xs font-black uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-red-300 animate-ping" />
              Instant Access
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Emergency SOS Trigger
            </h1>
            <p className="text-xs sm:text-sm text-red-100 mt-1 max-w-md">
              Tap the button below or press <kbd className="bg-black/30 px-1.5 py-0.5 rounded font-mono">Alt+S</kbd> to activate immediate SOS, lock GPS coordinates, and prepare alerts.
            </p>
          </div>

          <div className="py-6 flex justify-center">
            <SosButton size={isEmergencyActive ? 'large' : 'small'} />
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-red-200 border-t border-white/20">
            <span>Official Hotline: <strong>911 / 112</strong></span>
            <Link
              to="/sos"
              className="underline font-bold text-white hover:text-red-100 flex items-center gap-1"
            >
              Full Command Center →
            </Link>
          </div>
        </div>

        {/* Quick Health & AI Overview Card */}
        <div className="lg:w-1/2 flex flex-col justify-between gap-4">
          {/* AI Assistant Quick Launcher */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
                    AI Emergency Triage
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Google Gemini 2.5 Flash
                  </p>
                </div>
              </div>

              <Link
                to="/assistant"
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                Open Chat <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">
              Instant guidance for falls, chest tightness, severe allergies, or personal safety emergencies.
            </p>

            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/assistant"
                className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950 text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors text-center border border-slate-200 dark:border-slate-700"
              >
                "I fell down"
              </Link>
              <Link
                to="/assistant"
                className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950 text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors text-center border border-slate-200 dark:border-slate-700"
              >
                "Chest pain"
              </Link>
            </div>
          </div>

          {/* Location & Status Pill Strip */}
          <div className="bg-slate-900 text-white rounded-2xl p-4 border border-slate-800 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
              <div className="text-xs">
                <span className="text-slate-400">GPS Status: </span>
                <span className="font-bold text-white">
                  {location ? 'Acquired' : locationStatus === 'denied' ? 'Permission Denied' : 'Ready to Request'}
                </span>
              </div>
            </div>

            {!location && (
              <button
                type="button"
                onClick={requestLocation}
                className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
              >
                Acquire GPS
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 4 Feature Hub Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Emergency Contacts Hub */}
        <Link
          to="/contacts"
          className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-purple-400 dark:hover:border-purple-600 transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 group-hover:scale-105 transition-transform">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-xs font-extrabold bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-full">
                {contacts.length} Contacts
              </span>
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
              Emergency Contacts
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Primary alerts, SMS & WhatsApp 1-tap dispatch links.
            </p>
          </div>
          <div className="text-xs font-bold text-purple-600 dark:text-purple-400 mt-4 flex items-center gap-1">
            Manage Contacts →
          </div>
        </Link>

        {/* Health Profile Hub */}
        <Link
          to="/health"
          className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-rose-400 dark:hover:border-rose-600 transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 group-hover:scale-105 transition-transform">
                <HeartPulse className="w-5 h-5" />
              </div>
              <span className="text-xs font-extrabold bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 px-2 py-0.5 rounded-full">
                {profile.bloodGroup && profile.bloodGroup !== 'Unknown / Not Sure' ? profile.bloodGroup : 'Local ID'}
              </span>
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
              Medical Profile
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Blood group, allergies, medications & first responder card.
            </p>
          </div>
          <div className="text-xs font-bold text-rose-600 dark:text-rose-400 mt-4 flex items-center gap-1">
            Edit Medical ID →
          </div>
        </Link>

        {/* History Hub */}
        <Link
          to="/history"
          className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-400 dark:hover:border-blue-600 transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform">
                <History className="w-5 h-5" />
              </div>
              <span className="text-xs font-extrabold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">
                {history.length} Logs
              </span>
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              Emergency History
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Past SOS activations, AI triage records & durations.
            </p>
          </div>
          <div className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-4 flex items-center gap-1">
            View History →
          </div>
        </Link>

        {/* Accessibility Hub */}
        <Link
          to="/accessibility"
          className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-amber-400 dark:hover:border-amber-600 transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 group-hover:scale-105 transition-transform">
                <Sliders className="w-5 h-5" />
              </div>
              <span className="text-xs font-extrabold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-full">
                WCAG 2.2
              </span>
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              Accessibility
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              High contrast, font size scale, voice TTS & quick modes.
            </p>
          </div>
          <div className="text-xs font-bold text-amber-600 dark:text-amber-400 mt-4 flex items-center gap-1">
            Configure Settings →
          </div>
        </Link>
      </div>

      {/* Quick Direct Contacts Dial Bar */}
      {contacts.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-emerald-500" /> Fast Contact Dials
            </h2>
            <Link to="/contacts" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
              All Contacts
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {contacts.slice(0, 3).map((c) => (
              <a
                key={c.id}
                href={`tel:${c.phone}`}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">{c.name}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">{c.relationship}</div>
                </div>
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-1 rounded-lg">
                  Call
                </span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
