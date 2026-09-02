import React from 'react';
import {
  Activity,
  HeartPulse,
  UserX,
  AlertTriangle,
  ShieldAlert,
  Compass
} from 'lucide-react';
import { QUICK_SITUATION_PRESETS } from '../../utils/constants';

const ICON_MAP = {
  Activity,
  HeartPulse,
  UserX,
  AlertTriangle,
  ShieldAlert,
  Compass
};

export function QuickSituationChips({ onSelectPreset, disabled = false }) {
  return (
    <div className="space-y-2">
      <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        Quick Situation Presets (1-Tap):
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {QUICK_SITUATION_PRESETS.map((preset) => {
          const IconComponent = ICON_MAP[preset.icon] || AlertTriangle;
          const isCritical = preset.severity === 'critical';

          return (
            <button
              key={preset.id}
              type="button"
              disabled={disabled}
              onClick={() => onSelectPreset(preset.prompt)}
              className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer ${
                isCritical
                  ? 'bg-rose-50/70 hover:bg-rose-100/90 dark:bg-rose-950/30 dark:hover:bg-rose-950/60 border-rose-200 dark:border-rose-900 focus:ring-rose-400'
                  : 'bg-white hover:bg-slate-50 dark:bg-slate-800/80 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-blue-400 shadow-sm'
              }`}
            >
              <div
                className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                  isCritical
                    ? 'bg-rose-100 dark:bg-rose-900 text-rose-600 dark:text-rose-300'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 group-hover:bg-blue-100 dark:group-hover:bg-blue-900 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors'
                }`}
              >
                <IconComponent className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-slate-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {preset.title}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  {preset.category}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
