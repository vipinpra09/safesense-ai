import React, { createContext, useContext, useState, useEffect } from 'react';
import { STORAGE_KEYS } from '../utils/constants';
import { storageService } from '../services/storageService';

const HistoryContext = createContext();

const INITIAL_HISTORY = [
  {
    id: 'emergency-demo-1',
    timestamp: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
    durationSeconds: 142,
    status: 'resolved',
    category: 'Accident / Fall Simulation',
    urgency: 'high',
    location: {
      latitude: 37.7749,
      longitude: -122.4194,
      accuracy: 12,
      available: true
    },
    situationSummary: 'Simulated SOS test: User fell in living room, notified primary contact Sarah Miller with exact coordinates.',
    resolutionNotes: 'User safely got up with assistance. Emergency closed.'
  }
];

export function HistoryProvider({ children }) {
  const [history, setHistory] = useState(() => {
    return storageService.getItem(STORAGE_KEYS.HISTORY, INITIAL_HISTORY);
  });

  useEffect(() => {
    storageService.setItem(STORAGE_KEYS.HISTORY, history);
  }, [history]);

  const addRecord = (recordData) => {
    const newRecord = {
      id: 'emergency-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      timestamp: new Date().toISOString(),
      durationSeconds: 0,
      status: 'active',
      urgency: 'high',
      category: 'SOS Emergency Trigger',
      ...recordData
    };

    setHistory((prev) => [newRecord, ...prev]);
    return newRecord;
  };

  const updateRecord = (id, updatedFields) => {
    setHistory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  const deleteRecord = (id) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
    return true;
  };

  const clearAllHistory = () => {
    setHistory([]);
    return true;
  };

  return (
    <HistoryContext.Provider
      value={{
        history,
        addRecord,
        updateRecord,
        deleteRecord,
        clearAllHistory
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory() {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
}
