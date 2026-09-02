import React, { useState } from 'react';
import {
  ShieldAlert,
  CheckCircle2,
  PhoneCall,
  AlertTriangle,
  Copy,
  Check,
  Share2,
  FileText,
  Activity
} from 'lucide-react';
import { UrgencyBadge } from './UrgencyBadge';
import { TtsPlayer } from './TtsPlayer';
import { useEmergency } from '../../context/EmergencyContext';
import { useToast } from '../../context/ToastContext';

export function StructuredSummaryCard({ data }) {
  const { isEmergencyActive, updateEmergencySummary, triggerSos } = useEmergency();
  const { addToast } = useToast();
  const [copied, setCopied] = useState(false);

  if (!data) return null;

  const {
    urgency = 'medium',
    situation_summary,
    recommended_actions = [],
    what_to_tell_responders = [],
    important_information = [],
    disclaimer
  } = data;

  // Build audio text for TTS player
  const speechText = `
    Urgency level: ${urgency}.
    Situation: ${situation_summary || ''}.
    Recommended actions: ${recommended_actions.join('. ')}.
    What to tell responders: ${what_to_tell_responders.join('. ')}.
  `;

  const handleCopySummary = () => {
    let text = `🚨 SAFESENSE AI EMERGENCY TRIAGE SUMMARY\n`;
    text += `Urgency: ${urgency.toUpperCase()}\n\n`;
    if (situation_summary) text += `Situation: ${situation_summary}\n\n`;
    if (recommended_actions.length > 0) {
      text += `Recommended Immediate Actions:\n` + recommended_actions.map((a, i) => `${i + 1}. ${a}`).join('\n') + `\n\n`;
    }
    if (what_to_tell_responders.length > 0) {
      text += `What to Tell 911 / Responders:\n` + what_to_tell_responders.map((r) => `• ${r}`).join('\n') + `\n\n`;
    }
    if (important_information.length > 0) {
      text += `Safety Warnings:\n` + important_information.map((w) => `! ${w}`).join('\n') + `\n\n`;
    }
    text += disclaimer || '';

    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        addToast('Emergency summary copied to clipboard!', 'success');
        setTimeout(() => setCopied(false), 3000);
      })
      .catch(() => addToast('Failed to copy to clipboard.', 'error'));
  };

  const handleApplyToSos = () => {
    if (isEmergencyActive) {
      updateEmergencySummary(situation_summary, data);
      addToast('Situation summary attached to your active SOS session!', 'success');
    } else {
      triggerSos('AI Triage Trigger');
      setTimeout(() => {
        updateEmergencySummary(situation_summary, data);
      }, 500);
    }
  };

  const isCritical = urgency === 'critical' || urgency === 'high';

  return (
    <div
      className={`rounded-2xl border-2 p-5 sm:p-6 shadow-md transition-all ${
        isCritical
          ? 'bg-rose-50/50 dark:bg-rose-950/30 border-rose-400 dark:border-rose-900'
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
      }`}
    >
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 flex-wrap">
          <UrgencyBadge level={urgency} />
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            AI Emergency Synthesis
          </span>
        </div>

        <div className="flex items-center gap-2">
          <TtsPlayer textToRead={speechText} />
          <button
            type="button"
            onClick={handleCopySummary}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Critical Call to Action if Urgency is Critical */}
      {isCritical && (
        <div className="mb-4 p-3.5 rounded-xl bg-red-600 text-white flex items-center justify-between gap-3 shadow-md animate-pulse">
          <div className="flex items-center gap-2 font-black text-xs sm:text-sm">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <span>High Severity Detected — Call Emergency Services (911 / 112) Immediately</span>
          </div>
          <a
            href="tel:911"
            className="px-3 py-1.5 bg-white text-red-600 rounded-lg font-black text-xs hover:bg-slate-100 transition-colors shrink-0 shadow"
          >
            Call 911
          </a>
        </div>
      )}

      {/* Situation Summary */}
      {situation_summary && (
        <div className="mb-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-blue-500" /> Situation Assessment:
          </h3>
          <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white leading-relaxed">
            {situation_summary}
          </p>
        </div>
      )}

      {/* Recommended Actions */}
      {recommended_actions && recommended_actions.length > 0 && (
        <div className="mb-4 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Recommended Immediate Actions:
          </h3>
          <ol className="space-y-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
            {recommended_actions.map((action, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-snug">{action}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* What to tell Responders */}
      {what_to_tell_responders && what_to_tell_responders.length > 0 && (
        <div className="mb-4 bg-blue-50/70 dark:bg-blue-950/30 p-4 rounded-xl border border-blue-200 dark:border-blue-900">
          <h3 className="text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-blue-200 mb-2 flex items-center gap-1.5">
            <PhoneCall className="w-4 h-4 text-blue-600 dark:text-blue-400" /> What to Tell 911 / Paramedics:
          </h3>
          <ul className="space-y-1.5 text-xs sm:text-sm text-blue-950 dark:text-blue-100">
            {what_to_tell_responders.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Important Medical Watchouts */}
      {important_information && important_information.length > 0 && (
        <div className="mb-4 bg-amber-50/70 dark:bg-amber-950/30 p-3.5 rounded-xl border border-amber-200 dark:border-amber-900">
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-200 mb-1.5 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> Critical Safety Warnings:
          </h3>
          <ul className="space-y-1 text-xs text-amber-950 dark:text-amber-100">
            {important_information.map((info, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="font-bold text-amber-600">!</span>
                <span>{info}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Bottom SOS Sync Trigger */}
      <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
          {disclaimer || 'SafeSense AI provides assistive support only.'}
        </p>

        <button
          type="button"
          onClick={handleApplyToSos}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold bg-red-600 hover:bg-red-700 text-white shadow-md focus:outline-none focus:ring-4 focus:ring-red-400 transition-all shrink-0 w-full sm:w-auto"
        >
          <FileText className="w-4 h-4" />
          {isEmergencyActive ? 'Update Active SOS Session' : 'Trigger SOS with this Summary'}
        </button>
      </div>
    </div>
  );
}
