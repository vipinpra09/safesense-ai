import React from 'react';
import { useEmergency } from '../context/EmergencyContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { SosButton } from '../components/emergency/SosButton';
import { EmergencyStatusScreen } from '../components/emergency/EmergencyStatusScreen';
import {
  AlertOctagon,
  ShieldCheck,
  MapPin,
  Users,
  HeartPulse,
  PhoneCall,
  Zap
} from 'lucide-react';

export function SosPage() {
  const { isEmergencyActive } = useEmergency();
  const { settings, toggleQuickSos } = useAccessibility();

  if (isEmergencyActive) {
    return (
      <div className="py-6">
        <EmergencyStatusScreen />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-10">
      {/* Top Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 text-xs font-black uppercase tracking-wider">
          <AlertOctagon className="w-4 h-4" />
          Immediate Emergency Trigger
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Activate Emergency SOS
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Tap the giant button below to initiate emergency assistance. A 3-second countdown allows
          cancelling accidental triggers.
        </p>
      </div>

      {/* Main SOS Trigger Hub */}
      <div className="bg-gradient-to-b from-red-50 to-white dark:from-red-950/20 dark:to-slate-900 p-8 sm:p-12 rounded-3xl border-2 border-red-200 dark:border-red-900/60 shadow-xl flex flex-col items-center justify-center space-y-6">
        <SosButton size="large" />

        {/* Quick SOS Mode Toggle Option */}
        <div className="flex items-center gap-3 pt-4 border-t border-red-200 dark:border-red-900/40 text-xs text-slate-700 dark:text-slate-300">
          <label className="flex items-center gap-2 cursor-pointer font-bold select-none">
            <input
              type="checkbox"
              checked={settings.quickSos}
              onChange={toggleQuickSos}
              className="w-4 h-4 rounded text-red-600 focus:ring-red-500"
            />
            <span className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-500" /> Quick SOS Mode (Instant trigger, bypasses 3s countdown)
            </span>
          </label>
        </div>
      </div>

      {/* What Happens Next Card */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-500" /> What Happens When SOS is Activated:
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-blue-500" /> 1. GPS Location Lock
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-xs">
              Your browser requests exact coordinates to generate Google Maps links for responders.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-1.5">
              <HeartPulse className="w-4 h-4 text-rose-500" /> 2. Medical ID Prepared
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-xs">
              Your blood group, allergies, and critical conditions are formatted into a high-visibility badge.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-purple-500" /> 3. 1-Tap Contact Alert
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-xs">
              Pre-filled SMS & WhatsApp emergency alerts are generated with 1-click transmission.
            </p>
          </div>
        </div>
      </div>

      {/* Official emergency hotlines */}
      <div className="text-center">
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 font-medium">
          Need immediate official help right away?
        </p>
        <a
          href="tel:911"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 hover:bg-black text-white font-black text-sm shadow-md focus:outline-none focus:ring-4 focus:ring-slate-400 transition-all"
        >
          <PhoneCall className="w-4 h-4 text-rose-400" /> Call Official Emergency Services (911)
        </a>
      </div>
    </div>
  );
}
