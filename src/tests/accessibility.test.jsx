import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { AccessibilityProvider, useAccessibility } from '../context/AccessibilityContext';

function TestAccessibilityComponent() {
  const { settings, setFontSize, setContrastMode, toggleReducedMotion } = useAccessibility();

  return (
    <div>
      <span data-testid="current-font-size">{settings.fontSize}</span>
      <span data-testid="current-contrast">{settings.contrastMode}</span>
      <span data-testid="current-motion">{String(settings.reducedMotion)}</span>

      <button onClick={() => setFontSize('xlarge')}>Set XL Font</button>
      <button onClick={() => setContrastMode('high-contrast-dark')}>Set HC Dark</button>
      <button onClick={toggleReducedMotion}>Toggle Motion</button>
    </div>
  );
}

describe('Accessibility & WCAG 2.2 Features', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.removeAttribute('data-font-size');
  });

  it('updates document root attributes when font size changes', () => {
    render(
      <AccessibilityProvider>
        <TestAccessibilityComponent />
      </AccessibilityProvider>
    );

    const btn = screen.getByText('Set XL Font');
    act(() => {
      fireEvent.click(btn);
    });

    expect(document.documentElement.getAttribute('data-font-size')).toBe('xlarge');
  });

  it('applies high contrast dark theme classes to document root', () => {
    render(
      <AccessibilityProvider>
        <TestAccessibilityComponent />
      </AccessibilityProvider>
    );

    const btn = screen.getByText('Set HC Dark');
    act(() => {
      fireEvent.click(btn);
    });

    expect(document.documentElement.getAttribute('data-theme')).toBe('high-contrast-dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
