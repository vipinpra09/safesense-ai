import { describe, it, expect } from 'vitest';
import { validateHealthProfile } from '../utils/validators';

describe('Emergency Health Profile Validation', () => {
  it('validates a standard health profile', () => {
    const profile = {
      fullName: 'Alex Johnson',
      bloodGroup: 'O Positive (O+)',
      allergies: 'Penicillin, Peanuts',
      conditions: 'Asthma',
      medications: 'Albuterol',
      emergencyNotes: 'Carries EpiPen',
    };

    const { isValid, errors } = validateHealthProfile(profile);
    expect(isValid).toBe(true);
    expect(Object.keys(errors).length).toBe(0);
  });

  it('flags fields that exceed character safety limits', () => {
    const overlyLongProfile = {
      fullName: 'A'.repeat(80), // limit is 70
      allergies: 'B'.repeat(600), // limit is 500
    };

    const { isValid, errors } = validateHealthProfile(overlyLongProfile);
    expect(isValid).toBe(false);
    expect(errors.fullName).toBeDefined();
    expect(errors.allergies).toBeDefined();
  });

  it('flags overly long conditions and emergency notes fields', () => {
    const overlyLongProfile = {
      conditions: 'C'.repeat(501),
      emergencyNotes: 'N'.repeat(1001),
    };

    const { isValid, errors } = validateHealthProfile(overlyLongProfile);
    expect(isValid).toBe(false);
    expect(errors.conditions).toBeDefined();
    expect(errors.emergencyNotes).toBeDefined();
  });
});
