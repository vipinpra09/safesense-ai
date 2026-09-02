import React, { createContext, useContext, useState, useEffect } from 'react';
import { STORAGE_KEYS, DEFAULT_ACCESSIBILITY_SETTINGS } from '../utils/constants';
import { storageService } from '../services/storageService';

const AccessibilityContext = createContext();

export function AccessibilityProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    return storageService.getItem(STORAGE_KEYS.ACCESSIBILITY, DEFAULT_ACCESSIBILITY_SETTINGS);
  });

  // Apply attributes to <html> element whenever settings change
  useEffect(() => {
    const root = document.documentElement;

    // Font size attribute
    root.setAttribute('data-font-size', settings.fontSize || 'normal');

    // High contrast theme
    if (settings.contrastMode === 'high-contrast-dark') {
      root.setAttribute('data-theme', 'high-contrast-dark');
      root.classList.add('dark');
    } else if (settings.contrastMode === 'high-contrast-light') {
      root.setAttribute('data-theme', 'high-contrast-light');
      root.classList.remove('dark');
    } else {
      root.removeAttribute('data-theme');
      root.classList.remove('dark');
    }

    // Reduced motion attribute
    root.setAttribute('data-reduced-motion', settings.reducedMotion ? 'true' : 'false');

    // Persist to LocalStorage
    storageService.setItem(STORAGE_KEYS.ACCESSIBILITY, settings);
  }, [settings]);

  const updateSettings = (partialSettings) => {
    setSettings((prev) => ({
      ...prev,
      ...partialSettings
    }));
  };

  const setFontSize = (size) => updateSettings({ fontSize: size });
  const setContrastMode = (mode) => updateSettings({ contrastMode: mode });
  const toggleReducedMotion = () => updateSettings({ reducedMotion: !settings.reducedMotion });
  const toggleTtsAutoRead = () => updateSettings({ ttsAutoRead: !settings.ttsAutoRead });
  const setSpeechRate = (rate) => updateSettings({ speechRate: rate });
  const toggleQuickSos = () => updateSettings({ quickSos: !settings.quickSos });

  const resetAccessibility = () => {
    setSettings(DEFAULT_ACCESSIBILITY_SETTINGS);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        settings,
        updateSettings,
        setFontSize,
        setContrastMode,
        toggleReducedMotion,
        toggleTtsAutoRead,
        setSpeechRate,
        toggleQuickSos,
        resetAccessibility
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}
