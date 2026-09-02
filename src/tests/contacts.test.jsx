import { describe, it, expect } from 'vitest';
import { validateContact, isValidPhone, isValidEmail } from '../utils/validators';

describe('Emergency Contacts Validation & Processing', () => {
  it('validates standard international and domestic phone numbers correctly', () => {
    expect(isValidPhone('+1 (555) 234-5678')).toBe(true);
    expect(isValidPhone('911')).toBe(false); // too short for full phone
    expect(isValidPhone('+44 20 7946 0958')).toBe(true);
    expect(isValidPhone('invalid-phone-abc')).toBe(false);
  });

  it('validates optional email addresses', () => {
    expect(isValidEmail('')).toBe(true);
    expect(isValidEmail('contact@example.com')).toBe(true);
    expect(isValidEmail('not-an-email')).toBe(false);
  });

  it('rejects contact objects missing mandatory fields', () => {
    const emptyContact = {
      name: '',
      relationship: '',
      phone: '',
    };
    const { isValid, errors } = validateContact(emptyContact);
    expect(isValid).toBe(false);
    expect(errors.name).toBeDefined();
    expect(errors.phone).toBeDefined();
  });

  it('accepts fully valid contact objects', () => {
    const validContact = {
      name: 'Sarah Miller',
      relationship: 'Spouse / Partner',
      phone: '+1 (555) 234-5678',
      email: 'sarah@example.com',
    };
    const { isValid, errors } = validateContact(validContact);
    expect(isValid).toBe(true);
    expect(Object.keys(errors).length).toBe(0);
  });

  it('rejects contacts with overlong names and malformed emails', () => {
    const invalidContact = {
      name: 'A'.repeat(61),
      relationship: 'Friend',
      phone: '+1 (555) 123-4567',
      email: 'invalid-email',
    };

    const { isValid, errors } = validateContact(invalidContact);
    expect(isValid).toBe(false);
    expect(errors.name).toBeDefined();
    expect(errors.email).toBeDefined();
  });
});
