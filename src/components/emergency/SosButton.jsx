import React from 'react';
import { AlertOctagon, XCircle, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';

export function SosButton({ size = 'large', className = '' }) {
  const {
    isEmergencyActive,
    isCountingDown,
    countdownValue,
    triggerSos,
    cancelCountdown
  } = useEmergency();

  if (isCountingDown) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-red-50 dark:bg-red-950/40 rounded-3xl border-4 border-red-500 shadow-2xl animate-pulse text-center max-w-md mx-auto">
        <div className="text-6xl font-black text-red-600 dark:text-red-400 mb-2 font-mono">
          {countdownValue}
        </div>
        <div className="text-xl font-extrabold text-red-950 dark:text-red-100 mb-4">
          ACTIVATING SOS IN {countdownValue}s...
        </div>
        <p className="text-sm text-red-800 dark:text-red-300 mb-6">
          Location will be recorded and emergency contacts prepared.
        </p>
        <button
          type="button"
          onClick={cancelCountdown}
          className="inline-flex items-center justify-center gap-2 w-full py-4 px-6 bg-slate-900 hover:bg-black text-white text-lg font-black rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-slate-400 active:scale-95 transition-all"
          aria-label="Cancel Emergency SOS activation"
        >
          <XCircle className="w-6 h-6 text-rose-400" />
          CANCEL SOS
        </button>
      </div>
    );
  }

  if (isEmergencyActive) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-red-600 text-white rounded-3xl shadow-2xl border-4 border-red-700 text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-3 animate-ping-slow">
          <AlertOctagon className="w-10 h-10 text-white" />
        </div>
        <span className="text-xs uppercase tracking-widest font-black bg-black/30 px-3 py-1 rounded-full mb-2">
          STATUS: ACTIVE
        </span>
        <h2 className="text-2xl font-black mb-1">EMERGENCY SOS ACTIVE</h2>
        <p className="text-xs text-red-100">
          First responders & contacts can access location & medical snapshot below.
        </p>
      </div>
    );
  }

  const isSmall = size === 'small';

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <button
        type="button"
        onClick={() => triggerSos('Manual SOS Button Click')}
        aria-label="Activate Emergency SOS Assistance"
        className={`group relative flex flex-col items-center justify-center font-black tracking-wider uppercase text-white rounded-full bg-gradient-to-b from-red-500 via-red-600 to-rose-700 hover:from-red-600 hover:to-rose-800 active:scale-95 transition-all duration-200 border-4 border-white dark:border-red-400 shadow-2xl focus:outline-none focus:ring-8 focus:ring-red-400/50 cursor-pointer ${
          isSmall
            ? 'w-28 h-28 text-xl shadow-red-600/40'
            : 'w-48 h-48 sm:w-56 sm:h-56 text-3xl sm:text-4xl shadow-red-600/50 sos-pulse'
        }`}
      >
        <span className="absolute -top-1 -right-1 flex h-6 w-6">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-6 w-6 bg-red-500 border-2 border-white"></span>
        </span>

        <AlertOctagon className={`${isSmall ? 'w-8 h-8 mb-1' : 'w-14 h-14 sm:w-16 sm:h-16 mb-2'} drop-shadow-md group-hover:scale-110 transition-transform`} />
        <span className="drop-shadow-md font-black">SOS</span>
        <span className={`text-[10px] sm:text-xs font-semibold tracking-normal normal-case opacity-90 ${isSmall ? 'hidden' : 'block mt-1'}`}>
          Tap for Immediate Help
        </span>
      </button>
      {!isSmall && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 font-medium text-center">
          Press <kbd className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 rounded font-mono text-[11px]">Alt+S</kbd> anytime or tap button
        </p>
      )}
    </div>
  );
}
