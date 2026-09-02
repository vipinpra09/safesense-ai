import React from 'react';
import { PhoneCall, ShieldCheck, Lock, Sparkles, Heart, Keyboard } from 'lucide-react';
import { EMERGENCY_HOTLINES } from '../../utils/constants';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hotlines Grid */}
        <div className="mb-10 p-6 rounded-2xl bg-slate-800/80 border border-slate-700">
          <div className="flex items-center gap-2 mb-4">
            <PhoneCall className="w-5 h-5 text-rose-500" />
            <h2 className="text-lg font-bold text-white">Direct Official Emergency Hotlines</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {EMERGENCY_HOTLINES.map((hotline) => (
              <a
                key={hotline.number}
                href={`tel:${hotline.number}`}
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/90 border border-slate-700/80 hover:border-rose-500/80 hover:bg-slate-900 transition-all focus:outline-none focus:ring-2 focus:ring-rose-400 group"
              >
                <div>
                  <div className="font-bold text-white group-hover:text-rose-400 transition-colors">
                    {hotline.name}
                  </div>
                  <div className="text-xs text-slate-400">{hotline.desc}</div>
                </div>
                <div className="text-base font-extrabold text-rose-400 bg-rose-950/60 px-2.5 py-1 rounded-lg border border-rose-800">
                  {hotline.number}
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Info Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-2 font-bold text-white">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>Zero-Auth & Local Privacy</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              SafeSense AI requires no login, passwords, or signup. All health records, emergency
              contacts, and history remain strictly on this device's LocalStorage.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2 font-bold text-white">
              <Sparkles className="w-4 h-4 text-sky-400" />
              <span>Google Gemini AI Engine</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Powered by Google Gemini 2.5 Flash via secure serverless functions for calm,
              accessible, and rapid emergency triage synthesis.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2 font-bold text-white">
              <Keyboard className="w-4 h-4 text-amber-400" />
              <span>Keyboard Shortcuts</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-200 text-[11px] font-mono">Alt+S</kbd> SOS Trigger •{' '}
              <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-200 text-[11px] font-mono">Alt+A</kbd> AI Assistant •{' '}
              <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-200 text-[11px] font-mono">Alt+D</kbd> Dashboard
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} SafeSense AI — AI-Powered Assistive Health & Emergency Safety Platform.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" /> WCAG 2.2 AA Compliant
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
