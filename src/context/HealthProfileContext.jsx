import React, { createContext, useContext, useState, useEffect } from 'react';
import { STORAGE_KEYS } from '../utils/constants';
import { storageService } from '../services/storageService';
import { validateHealthProfile } from '../utils/validators';

const HealthProfileContext = createContext();

const INITIAL_HEALTH_PROFILE = {
  fullName: 'Alex Johnson',
  dateOfBirth: '1984-06-15',
  bloodGroup: 'O Positive (O+)',
  allergies: 'Penicillin, Peanuts (Severe / Anaphylactic)',
  conditions: 'Asthma, Mild Hypertension',
  medications: 'Albuterol Inhaler (as needed), Lisinopril 10mg daily',
  doctorName: 'Dr. Robert Chen',
  doctorPhone: '+1 (555) 987-6543',
  organDonor: true,
  emergencyNotes: 'Carries EpiPen in right backpack pocket. Asthma triggered by smoke or extreme cold.'
};

export function HealthProfileProvider({ children }) {
  const [profile, setProfile] = useState(() => {
    return storageService.getItem(STORAGE_KEYS.HEALTH_PROFILE, INITIAL_HEALTH_PROFILE);
  });

  useEffect(() => {
    storageService.setItem(STORAGE_KEYS.HEALTH_PROFILE, profile);
  }, [profile]);

  const updateProfile = (updatedFields) => {
    const merged = { ...profile, ...updatedFields };
    const { isValid, errors } = validateHealthProfile(merged);
    if (!isValid) {
      return { success: false, errors };
    }

    setProfile(merged);
    return { success: true, profile: merged };
  };

  const clearProfile = () => {
    const emptyProfile = {
      fullName: '',
      dateOfBirth: '',
      bloodGroup: 'Unknown / Not Sure',
      allergies: '',
      conditions: '',
      medications: '',
      doctorName: '',
      doctorPhone: '',
      organDonor: false,
      emergencyNotes: ''
    };
    setProfile(emptyProfile);
    return { success: true };
  };

  const getFormattedSummary = () => {
    const parts = [];
    if (profile.fullName) parts.push(`Patient: ${profile.fullName}`);
    if (profile.bloodGroup && profile.bloodGroup !== 'Unknown / Not Sure') {
      parts.push(`Blood: ${profile.bloodGroup}`);
    }
    if (profile.allergies) parts.push(`Allergies: ${profile.allergies}`);
    if (profile.conditions) parts.push(`Conditions: ${profile.conditions}`);
    if (profile.medications) parts.push(`Meds: ${profile.medications}`);
    if (profile.emergencyNotes) parts.push(`Notes: ${profile.emergencyNotes}`);
    return parts.join(' | ');
  };

  return (
    <HealthProfileContext.Provider
      value={{
        profile,
        updateProfile,
        clearProfile,
        getFormattedSummary
      }}
    >
      {children}
    </HealthProfileContext.Provider>
  );
}

export function useHealthProfile() {
  const context = useContext(HealthProfileContext);
  if (!context) {
    throw new Error('useHealthProfile must be used within a HealthProfileProvider');
  }
  return context;
}
