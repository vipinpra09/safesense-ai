import React, { useState } from 'react';
import {
  Sliders,
  Type,
  Eye,
  Volume2,
  Sparkles,
  Zap,
  RotateCcw,
  CheckCircle2,
  ShieldCheck,
  Play
} from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import { useToast } from '../context/ToastContext';

export function AccessibilityPage() {
  const {
    settings,
    setFontSize,
    setContrastMode,
    toggleReducedMotion,
    toggleTtsAutoRead,
    setSpeechRate,
    toggleQuickSos,
    resetAccessibility
  } = useAccessibility();

  const { speak, isSpeaking } = useSpeechSynthesis();
  const { addToast } = useToast();

  const handleTestSpeech = () => {
    speak('SafeSense AI voice accessibility is configured and working properly.');
  };

  const handleReset = () => {
    resetAccessibility();
    addToast('Accessibility settings reset to default.', 'info');
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
            <Sliders className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Accessibility Settings
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Personalize visual contrast, font scaling, motion, and voice speech (WCAG 2.2 AA)
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset Defaults
        </button>
      </div>

      {/* 1. Font Size Scaling */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Type className="w-5 h-5 text-blue-500" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            Font & Typography Scaling
          </h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Scale base application typography for improved legibility without breaking layouts.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <button
            type="button"
            onClick={() => setFontSize('normal')}
            aria-pressed={settings.fontSize === 'normal'}
            className={`p-4 rounded-2xl border text-left transition-all focus:outline-none focus:ring-4 cursor-pointer ${
              settings.fontSize === 'normal'
                ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-500 ring-2 ring-blue-500 text-blue-950 dark:text-blue-100'
                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="font-bold text-sm">Standard (16px)</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Default interface scale
            </div>
          </button>

          <button
            type="button"
            onClick={() => setFontSize('large')}
            aria-pressed={settings.fontSize === 'large'}
            className={`p-4 rounded-2xl border text-left transition-all focus:outline-none focus:ring-4 cursor-pointer ${
              settings.fontSize === 'large'
                ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-500 ring-2 ring-blue-500 text-blue-950 dark:text-blue-100'
                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="font-bold text-base">Large (19px)</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Enhanced readability
            </div>
          </button>

          <button
            type="button"
            onClick={() => setFontSize('xlarge')}
            aria-pressed={settings.fontSize === 'xlarge'}
            className={`p-4 rounded-2xl border text-left transition-all focus:outline-none focus:ring-4 cursor-pointer ${
              settings.fontSize === 'xlarge'
                ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-500 ring-2 ring-blue-500 text-blue-950 dark:text-blue-100'
                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="font-bold text-lg">Extra Large (22px)</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Maximum visual size
            </div>
          </button>
        </div>
      </section>

      {/* 2. High Contrast Modes */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-amber-500" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            High Contrast Color Themes
          </h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Meets WCAG 2.2 AAA contrast ratios for low-vision and sunlight conditions.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <button
            type="button"
            onClick={() => setContrastMode('normal')}
            aria-pressed={settings.contrastMode === 'normal'}
            className={`p-4 rounded-2xl border text-left transition-all focus:outline-none focus:ring-4 cursor-pointer ${
              settings.contrastMode === 'normal'
                ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 ring-2 ring-amber-500 text-amber-950 dark:text-amber-100'
                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
            }`}
          >
            <div className="font-bold text-sm">Default Contrast</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Standard light / dark styling
            </div>
          </button>

          <button
            type="button"
            onClick={() => setContrastMode('high-contrast-dark')}
            aria-pressed={settings.contrastMode === 'high-contrast-dark'}
            className={`p-4 rounded-2xl border text-left transition-all focus:outline-none focus:ring-4 cursor-pointer ${
              settings.contrastMode === 'high-contrast-dark'
                ? 'bg-yellow-400 text-black border-black ring-4 ring-yellow-500 font-bold'
                : 'bg-black text-white border-white hover:border-yellow-400'
            }`}
          >
            <div className="font-bold text-sm">High Contrast Dark</div>
            <div className="text-xs opacity-90 mt-1">
              Pure #000 Black & Yellow text
            </div>
          </button>

          <button
            type="button"
            onClick={() => setContrastMode('high-contrast-light')}
            aria-pressed={settings.contrastMode === 'high-contrast-light'}
            className={`p-4 rounded-2xl border text-left transition-all focus:outline-none focus:ring-4 cursor-pointer ${
              settings.contrastMode === 'high-contrast-light'
                ? 'bg-white text-black border-4 border-black ring-4 ring-black font-bold'
                : 'bg-white text-black border-2 border-slate-400'
            }`}
          >
            <div className="font-bold text-sm">High Contrast Light</div>
            <div className="text-xs opacity-90 mt-1">
              Pure #FFF White & Deep Black
            </div>
          </button>
        </div>
      </section>

      {/* 3. Speech & Voice Synthesis */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-emerald-500" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            Voice & Speech Synthesis (TTS)
          </h2>
        </div>

        <div className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              Speech Reading Speed: {settings.speechRate || 1.0}x
            </label>
            <div className="flex items-center gap-3">
              {[0.75, 1.0, 1.25, 1.5].map((rate) => (
                <button
                  key={rate}
                  type="button"
                  onClick={() => setSpeechRate(rate)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    settings.speechRate === rate
                      ? 'bg-emerald-600 text-white shadow'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {rate}x
                </button>
              ))}

              <button
                type="button"
                onClick={handleTestSpeech}
                disabled={isSpeaking}
                className="ml-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-700 hover:bg-black text-white font-bold text-xs"
              >
                <Play className="w-3.5 h-3.5" /> Test Voice Audio
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Motion & Quick SOS Mode */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-purple-500" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            Motion & Emergency Behaviors
          </h2>
        </div>

        <div className="space-y-3 pt-2">
          {/* Reduced Motion Toggle */}
          <label className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 cursor-pointer">
            <div>
              <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                Reduced Motion
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Disable pulsing animations and page transitions (vestibular accessibility)
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.reducedMotion}
              onChange={toggleReducedMotion}
              className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500"
            />
          </label>

          {/* Quick SOS Mode Toggle */}
          <label className="flex items-center justify-between p-4 bg-red-50/50 dark:bg-red-950/20 rounded-2xl border border-red-200 dark:border-red-900/40 cursor-pointer">
            <div>
              <div className="font-bold text-xs sm:text-sm text-red-950 dark:text-red-100 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-red-600" /> Quick SOS Mode
              </div>
              <div className="text-xs text-red-800 dark:text-red-300 mt-0.5">
                Instantly activate emergency session on tap (bypasses 3-second countdown)
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.quickSos}
              onChange={toggleQuickSos}
              className="w-5 h-5 rounded text-red-600 focus:ring-red-500"
            />
          </label>
        </div>
      </section>
    </div>
  );
}
