import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AccessibilityProvider } from '../context/AccessibilityContext';
import { ToastProvider } from '../context/ToastContext';
import { ContactsProvider } from '../context/ContactsContext';
import { HealthProfileProvider } from '../context/HealthProfileContext';
import { HistoryProvider } from '../context/HistoryContext';
import { EmergencyProvider } from '../context/EmergencyContext';
import { SosButton } from '../components/emergency/SosButton';
import { EmergencyStatusScreen } from '../components/emergency/EmergencyStatusScreen';

function renderWithProviders(ui) {
  return render(
    <BrowserRouter>
      <AccessibilityProvider>
        <ToastProvider>
          <ContactsProvider>
            <HealthProfileProvider>
              <HistoryProvider>
                <EmergencyProvider>
                  {ui}
                </EmergencyProvider>
              </HistoryProvider>
            </HealthProfileProvider>
          </ContactsProvider>
        </ToastProvider>
      </AccessibilityProvider>
    </BrowserRouter>
  );
}

describe('Emergency SOS Activation Workflow', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    window.localStorage.clear();
  });

  it('renders the initial SOS button in ready state', () => {
    renderWithProviders(<SosButton />);
    expect(screen.getByRole('button', { name: /activate emergency sos assistance/i })).toBeInTheDocument();
    expect(screen.getByText('SOS')).toBeInTheDocument();
  });

  it('starts a 3-second countdown when SOS button is clicked', () => {
    renderWithProviders(<SosButton />);
    const sosBtn = screen.getByRole('button', { name: /activate emergency sos assistance/i });
    
    act(() => {
      fireEvent.click(sosBtn);
    });

    expect(screen.getByText(/ACTIVATING SOS IN 3s/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel emergency sos/i })).toBeInTheDocument();
  });

  it('allows cancelling the countdown before activation', () => {
    renderWithProviders(<SosButton />);
    const sosBtn = screen.getByRole('button', { name: /activate emergency sos assistance/i });
    
    act(() => {
      fireEvent.click(sosBtn);
    });

    const cancelBtn = screen.getByRole('button', { name: /cancel emergency sos/i });
    act(() => {
      fireEvent.click(cancelBtn);
    });

    // Should return to ready state
    expect(screen.getByRole('button', { name: /activate emergency sos assistance/i })).toBeInTheDocument();
  });

  it('completes countdown and activates full emergency state', () => {
    renderWithProviders(
      <>
        <SosButton />
        <EmergencyStatusScreen />
      </>
    );

    const sosBtn = screen.getByRole('button', { name: /activate emergency sos assistance/i });
    
    act(() => {
      fireEvent.click(sosBtn);
    });

    // Advance timers by 3 seconds
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.getByText(/EMERGENCY SOS ACTIVE/i)).toBeInTheDocument();
    expect(screen.getByText(/Emergency Location/i)).toBeInTheDocument();
    expect(screen.getAllByText(/First Responder Medical ID/i).length).toBeGreaterThan(0);
  });
});
