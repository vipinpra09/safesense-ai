import React from 'react';
import { Volume2, VolumeX, Pause, Play, Square } from 'lucide-react';
import { useSpeechSynthesis } from '../../hooks/useSpeechSynthesis';

export function TtsPlayer({ textToRead }) {
  const { speak, stop, pause, resume, isSpeaking, isPaused, isSupported } = useSpeechSynthesis();

  if (!isSupported || !textToRead) return null;

  const handlePlay = () => {
    if (isPaused) {
      resume();
    } else {
      speak(textToRead);
    }
  };

  return (
    <div className="inline-flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
      {isSpeaking && !isPaused ? (
        <>
          <button
            type="button"
            onClick={pause}
            aria-label="Pause voice reading"
            className="p-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            title="Pause Reading"
          >
            <Pause className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={stop}
            aria-label="Stop voice reading"
            className="p-1.5 rounded-lg text-rose-600 dark:text-rose-400 hover:bg-white dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-400"
            title="Stop Reading"
          >
            <Square className="w-3.5 h-3.5 fill-current" />
          </button>
          <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 px-1.5 animate-pulse">
            Reading Aloud...
          </span>
        </>
      ) : (
        <button
          type="button"
          onClick={handlePlay}
          aria-label="Read AI emergency response aloud"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          title="Listen to Response"
        >
          <Volume2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>{isPaused ? 'Resume Voice' : 'Read Aloud'}</span>
        </button>
      )}
    </div>
  );
}
