import React, { useState } from 'react';
import {
  AlertOctagon,
  Clock,
  ShieldCheck,
  PhoneCall,
  Bot,
  MapPin,
  HeartPulse,
  Users,
  CheckCircle2,
  XCircle,
  FileText
} from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';
import { LocationCard } from './LocationCard';
import { HealthSnapshot } from './HealthSnapshot';
import { QuickContactAlert } from './QuickContactAlert';
import { formatElapsedSeconds, formatDateTime } from '../../utils/formatters';
import { Modal } from '../common/Modal';
import { Link } from 'react-router-dom';

export function EmergencyStatusScreen() {
  const { activeSession, deactivateSos } = useEmergency();
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const [resolutionReason, setResolutionReason] = useState('I am safe now and no longer require assistance.');

  if (!activeSession) return null;

  const handleConfirmDeactivation = () => {
    deactivateSos(resolutionReason);
    setIsDeactivateModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Emergency Active Alert Banner */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-red-500 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white/20 rounded-2xl shrink-0 animate-bounce">
            <AlertOctagon className="w-10 h-10 text-white" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/30 text-white text-xs font-black uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
              Emergency Active
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              SOS Emergency Assistance Active
            </h1>
            <p className="text-xs sm:text-sm text-red-100 mt-1 max-w-xl">
              Location requested, first responder Medical ID generated, and emergency dispatch alerts
              ready for 1-tap transmission.
            </p>
          </div>
        </div>

        {/* Live Timer & Hotlines */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full md:w-auto">
          <div className="bg-black/30 backdrop-blur-md rounded-2xl px-5 py-3 text-center border border-white/10">
            <span className="text-[11px] text-red-200 uppercase tracking-wider block font-bold flex items-center justify-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Active Duration
            </span>
            <span className="text-2xl font-mono font-black text-white">
              {formatElapsedSeconds(activeSession.elapsedSeconds || 0)}
            </span>
          </div>

          <a
            href="tel:911"
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-red-600 font-extrabold text-base shadow-xl focus:outline-none focus:ring-4 focus:ring-white transition-all active:scale-95"
          >
            <PhoneCall className="w-5 h-5 fill-red-600" />
            CALL 911 NOW
          </a>
        </div>
      </div>

      {/* AI Emergency Triage Quick Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-5 border border-indigo-800/50 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-600 text-white shrink-0">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base text-white">AI Emergency Assistant</span>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-300 border border-indigo-400/30">
                Google Gemini
              </span>
            </div>
            <p className="text-xs text-indigo-200 mt-0.5">
              Describe symptoms or situations to get instant, calm guidance & structured triage summary.
            </p>
          </div>
        </div>

        <Link
          to="/assistant"
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-indigo-500 hover:bg-indigo-400 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all active:scale-95 shrink-0 w-full sm:w-auto"
        >
          Open AI Assistant →
        </Link>
      </div>

      {/* Main Grid: Location, Medical Snapshot, Contacts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LocationCard />
        <HealthSnapshot />
      </div>

      <div>
        <QuickContactAlert />
      </div>

      {/* Deactivate SOS Bar */}
      <div className="p-6 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-300 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="font-bold text-slate-900 dark:text-white text-base">
            Ready to end this emergency session?
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            This will mark you as safe, log the duration in your local history, and deactivate the active alarm.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsDeactivateModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold text-sm shadow-md focus:outline-none focus:ring-4 focus:ring-emerald-400 transition-all shrink-0 w-full sm:w-auto cursor-pointer"
        >
          <ShieldCheck className="w-5 h-5" /> I Am Safe — Deactivate SOS
        </button>
      </div>

      {/* Deactivation Confirmation Modal */}
      <Modal
        isOpen={isDeactivateModalOpen}
        onClose={() => setIsDeactivateModalOpen(false)}
        title="Confirm Emergency Deactivation"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Please confirm that you are currently safe or have received necessary emergency support.
          </p>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Resolution Note (Optional):
            </label>
            <textarea
              rows={3}
              value={resolutionReason}
              onChange={(e) => setResolutionReason(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsDeactivateModalOpen(false)}
              className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmDeactivation}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <CheckCircle2 className="w-4 h-4" /> Confirm & Mark Safe
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
