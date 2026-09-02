import React, { useState } from 'react';
import { ShieldAlert, ChevronDown, ChevronUp, PhoneCall } from 'lucide-react';
import { SAFETY_DISCLAIMER_TEXT } from '../../utils/constants';

export function DisclaimerBanner() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      role="region"
      aria-label="Safety and Medical Disclaimer"
      className="bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200 dark:border-amber-800/60 px-4 py-2 text-xs sm:text-sm text-amber-900 dark:text-amber-200"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-start sm:items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
          <p className="font-medium">
            <span className="font-bold uppercase tracking-wider text-[11px] bg-amber-200 dark:bg-amber-900/80 px-1.5 py-0.5 rounded text-amber-900 dark:text-amber-100 mr-1.5">
              Notice
            </span>
            {isExpanded ? SAFETY_DISCLAIMER_TEXT : 'SafeSense AI provides assistive guidance only. In life-threatening emergencies, call 911 / 112 immediately.'}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
          <a
            href="tel:911"
            className="inline-flex items-center gap-1 font-bold text-rose-700 dark:text-rose-400 hover:underline focus:outline-none focus:ring-2 focus:ring-rose-500 rounded px-1"
          >
            <PhoneCall className="w-3.5 h-3.5" /> Call 911 / 112
          </a>
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            className="text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-white font-medium inline-flex items-center gap-0.5 focus:outline-none focus:ring-2 focus:ring-amber-500 rounded px-1"
          >
            {isExpanded ? (
              <>
                Less <ChevronUp className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                More <ChevronDown className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
