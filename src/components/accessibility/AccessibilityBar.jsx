import React from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { Eye, Type, Volume2, Sparkles, Sliders, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AccessibilityBar() {
  const {
    settings,
    setFontSize,
    setContrastMode,
    toggleReducedMotion,
    toggleTtsAutoRead
  } = useAccessibility();

  return (
    <nav
      aria-label="Quick Accessibility Controls"
      className="bg-slate-900 text-white border-b border-slate-800 text-xs px-4 py-1.5"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-1.5 text-slate-300">
          <Eye className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-semibold uppercase tracking-wider text-[10px]">Accessibility:</span>
        </div>

        {/* Quick controls group */}
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
          {/* Text Size */}
          <div className="flex items-center gap-1 bg-slate-800 rounded-lg p-0.5" role="group" aria-label="Text Size Controls">
            <span className="sr-only">Font Size:</span>
            <button
              onClick={() => setFontSize('normal')}
              aria-pressed={settings.fontSize === 'normal'}
              className={`px-2 py-0.5 rounded font-bold transition-colors ${
                settings.fontSize === 'normal'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="Standard Font Size"
            >
              A
            </button>
            <button
              onClick={() => setFontSize('large')}
              aria-pressed={settings.fontSize === 'large'}
              className={`px-2 py-0.5 rounded font-bold text-sm transition-colors ${
                settings.fontSize === 'large'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="Large Font Size"
            >
              A+
            </button>
            <button
              onClick={() => setFontSize('xlarge')}
              aria-pressed={settings.fontSize === 'xlarge'}
              className={`px-2 py-0.5 rounded font-bold text-base transition-colors ${
                settings.fontSize === 'xlarge'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="Extra Large Font Size"
            >
              A++
            </button>
          </div>

          {/* Contrast Mode */}
          <div className="flex items-center gap-1 bg-slate-800 rounded-lg p-0.5" role="group" aria-label="Contrast Modes">
            <button
              onClick={() => setContrastMode('normal')}
              aria-pressed={settings.contrastMode === 'normal'}
              className={`px-2 py-0.5 rounded transition-colors ${
                settings.contrastMode === 'normal'
                  ? 'bg-slate-700 text-white font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="Standard Theme"
            >
              Default
            </button>
            <button
              onClick={() => setContrastMode('high-contrast-dark')}
              aria-pressed={settings.contrastMode === 'high-contrast-dark'}
              className={`px-2 py-0.5 rounded transition-colors ${
                settings.contrastMode === 'high-contrast-dark'
                  ? 'bg-yellow-400 text-black font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="High Contrast Dark Theme"
            >
              HC Dark
            </button>
            <button
              onClick={() => setContrastMode('high-contrast-light')}
              aria-pressed={settings.contrastMode === 'high-contrast-light'}
              className={`px-2 py-0.5 rounded transition-colors ${
                settings.contrastMode === 'high-contrast-light'
                  ? 'bg-white text-black font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="High Contrast Light Theme"
            >
              HC Light
            </button>
          </div>

          {/* Full Settings Link */}
          <Link
            to="/accessibility"
            className="inline-flex items-center gap-1 text-slate-300 hover:text-white font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-amber-400 rounded px-1.5 py-0.5"
          >
            <Sliders className="w-3.5 h-3.5" /> All Settings
          </Link>
        </div>
      </div>
    </nav>
  );
}
