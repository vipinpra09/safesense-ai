import React from 'react';
import { Mic, MicOff, AlertCircle } from 'lucide-react';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';

export function VoiceInput({ onTranscriptChange, currentInput, onSendVoice }) {
  const {
    isListening,
    interimTranscript,
    isSupported,
    error,
    startListening,
    stopListening
  } = useSpeechRecognition({
    onResult: (finalText) => {
      onTranscriptChange(finalText);
    }
  });

  const handleToggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  if (!isSupported) {
    return (
      <div className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/60 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
        <MicOff className="w-3.5 h-3.5 text-slate-400" />
        <span>Voice speech input not supported in this browser. Please type.</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleToggleListening}
          aria-pressed={isListening}
          aria-label={isListening ? 'Stop listening' : 'Start speaking emergency description'}
          className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all focus:outline-none focus:ring-4 cursor-pointer ${
            isListening
              ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse focus:ring-rose-300 shadow-md shadow-rose-600/30'
              : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 focus:ring-slate-400'
          }`}
        >
          {isListening ? (
            <>
              <MicOff className="w-4 h-4 text-white animate-bounce" />
              <span>Listening... (Tap to Stop)</span>
            </>
          ) : (
            <>
              <Mic className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Speak Emergency Description</span>
            </>
          )}
        </button>

        {isListening && (
          <div className="flex items-center gap-1">
            <span className="w-2 h-4 bg-rose-500 rounded-full animate-pulse" />
            <span className="w-2 h-6 bg-rose-500 rounded-full animate-pulse delay-75" />
            <span className="w-2 h-3 bg-rose-500 rounded-full animate-pulse delay-150" />
          </div>
        )}
      </div>

      {interimTranscript && (
        <div className="text-xs italic text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/80 p-2 rounded-lg border border-slate-200 dark:border-slate-700">
          Listening: "{interimTranscript}"
        </div>
      )}

      {error && (
        <div className="text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 p-2 rounded-lg border border-rose-200 dark:border-rose-900 flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
