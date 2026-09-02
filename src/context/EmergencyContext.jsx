import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { STORAGE_KEYS } from '../utils/constants';
import { storageService } from '../services/storageService';
import { useAccessibility } from './AccessibilityContext';
import { useHistory } from './HistoryContext';
import { useContacts } from './ContactsContext';
import { useHealthProfile } from './HealthProfileContext';
import { useToast } from './ToastContext';
import { useGeolocation } from '../hooks/useGeolocation';

const EmergencyContext = createContext();

export function EmergencyProvider({ children }) {
  const { settings } = useAccessibility();
  const { addRecord, updateRecord } = useHistory();
  const { contacts } = useContacts();
  const { profile, getFormattedSummary } = useHealthProfile();
  const { addToast } = useToast();
  const { location, status: locationStatus, requestLocation } = useGeolocation();

  const [isCountingDown, setIsCountingDown] = useState(false);
  const [countdownValue, setCountdownValue] = useState(3);
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [activeSession, setActiveSession] = useState(() => {
    return storageService.getItem(STORAGE_KEYS.ACTIVE_SESSION, null);
  });

  const countdownTimerRef = useRef(null);
  const sessionTimerRef = useRef(null);

  // Restore active session on reload if exists
  useEffect(() => {
    if (activeSession && activeSession.status === 'active') {
      setIsEmergencyActive(true);
    }
  }, []);

  // Update session elapsed timer every second when active
  useEffect(() => {
    if (isEmergencyActive && activeSession) {
      sessionTimerRef.current = setInterval(() => {
        setActiveSession((prev) => {
          if (!prev) return null;
          const updated = {
            ...prev,
            elapsedSeconds: (prev.elapsedSeconds || 0) + 1
          };
          storageService.setItem(STORAGE_KEYS.ACTIVE_SESSION, updated);
          return updated;
        });
      }, 1000);
    } else {
      if (sessionTimerRef.current) clearInterval(sessionTimerRef.current);
    }

    return () => {
      if (sessionTimerRef.current) clearInterval(sessionTimerRef.current);
    };
  }, [isEmergencyActive]);

  // Sync geolocation to active session when location arrives
  useEffect(() => {
    if (isEmergencyActive && location && activeSession) {
      setActiveSession((prev) => {
        if (!prev) return null;
        const updated = { ...prev, location };
        storageService.setItem(STORAGE_KEYS.ACTIVE_SESSION, updated);
        return updated;
      });
      if (activeSession.id) {
        updateRecord(activeSession.id, { location });
      }
    }
  }, [location, isEmergencyActive]);

  // Direct activation method
  const activateSosNow = useCallback(
    (category = 'SOS Emergency Trigger') => {
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
      setIsCountingDown(false);
      setIsEmergencyActive(true);

      // Request geolocation
      requestLocation();

      const newSession = {
        id: 'session-' + Date.now(),
        startTime: new Date().toISOString(),
        elapsedSeconds: 0,
        status: 'active',
        category,
        urgency: 'high',
        location: location || null,
        medicalSnapshot: getFormattedSummary(),
        situationSummary: 'Emergency SOS activated. User requested immediate assistive support.',
        triageResult: null,
        contactsNotifiedCount: contacts.length
      };

      setActiveSession(newSession);
      storageService.setItem(STORAGE_KEYS.ACTIVE_SESSION, newSession);

      // Log in history
      addRecord(newSession);

      addToast('🚨 Emergency SOS Activated! Location and emergency details ready.', 'error', 6000);
    },
    [contacts.length, getFormattedSummary, location, requestLocation, addRecord, addToast]
  );

  // Trigger SOS with countdown or immediate
  const triggerSos = useCallback(
    (category = 'SOS Emergency Trigger') => {
      if (isEmergencyActive) return; // already active

      if (settings?.quickSos) {
        activateSosNow(category);
        return;
      }

      setIsCountingDown(true);
      setCountdownValue(3);

      let currentCount = 3;
      countdownTimerRef.current = setInterval(() => {
        currentCount -= 1;
        if (currentCount > 0) {
          setCountdownValue(currentCount);
        } else {
          clearInterval(countdownTimerRef.current);
          activateSosNow(category);
        }
      }, 1000);
    },
    [isEmergencyActive, settings?.quickSos, activateSosNow]
  );

  // Cancel countdown before it fires
  const cancelCountdown = useCallback(() => {
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
    }
    setIsCountingDown(false);
    setCountdownValue(3);
    addToast('SOS countdown cancelled.', 'info', 3000);
  }, [addToast]);

  // Deactivate active emergency
  const deactivateSos = useCallback(
    (resolutionNotes = 'User marked emergency as resolved / safe.') => {
      if (!isEmergencyActive) return;

      if (sessionTimerRef.current) clearInterval(sessionTimerRef.current);

      if (activeSession?.id) {
        updateRecord(activeSession.id, {
          status: 'resolved',
          durationSeconds: activeSession.elapsedSeconds || 0,
          resolutionNotes,
          resolvedAt: new Date().toISOString()
        });
      }

      setIsEmergencyActive(false);
      setActiveSession(null);
      storageService.removeItem(STORAGE_KEYS.ACTIVE_SESSION);

      addToast('Emergency SOS session ended. You are marked safe.', 'success', 5000);
    },
    [isEmergencyActive, activeSession, updateRecord, addToast]
  );

  // Update situation summary from AI triage
  const updateEmergencySummary = useCallback(
    (situationSummary, triageResult = null) => {
      setActiveSession((prev) => {
        if (!prev) return null;
        const updated = {
          ...prev,
          situationSummary,
          urgency: triageResult?.urgency || prev.urgency,
          triageResult
        };
        storageService.setItem(STORAGE_KEYS.ACTIVE_SESSION, updated);
        return updated;
      });

      if (activeSession?.id) {
        updateRecord(activeSession.id, {
          situationSummary,
          urgency: triageResult?.urgency || 'high',
          triageResult
        });
      }
    },
    [activeSession, updateRecord]
  );

  return (
    <EmergencyContext.Provider
      value={{
        isEmergencyActive,
        isCountingDown,
        countdownValue,
        activeSession,
        triggerSos,
        cancelCountdown,
        activateSosNow,
        deactivateSos,
        updateEmergencySummary,
        location,
        locationStatus,
        requestLocation
      }}
    >
      {children}
    </EmergencyContext.Provider>
  );
}

export function useEmergency() {
  const context = useContext(EmergencyContext);
  if (!context) {
    throw new Error('useEmergency must be used within an EmergencyProvider');
  }
  return context;
}
