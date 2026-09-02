/**
 * Input sanitization to prevent XSS and malformed input
 */
export function sanitizeInput(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[<>]/g, '') // remove dangerous HTML brackets
    .trim();
}

/**
 * Phone number validation (international & domestic formats)
 */
export function isValidPhone(phone) {
  if (!phone || typeof phone !== 'string') return false;
  const trimmed = phone.trim();
  // Ensure valid characters: +, digits, spaces, parentheses, hyphens, dots
  if (!/^[+0-9\s()./-]+$/.test(trimmed)) return false;
  // Count total digits (E.164 international standard allows between 7 and 15 digits)
  const digits = trimmed.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 16;
}

/**
 * Email validation (optional field for contacts)
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return true; // email is optional
  if (email.trim() === '') return true;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Validate Contact Object
 */
export function validateContact(contact) {
  const errors = {};

  if (!contact.name || contact.name.trim().length < 2) {
    errors.name = 'Full name is required (at least 2 characters).';
  } else if (contact.name.length > 60) {
    errors.name = 'Name must be under 60 characters.';
  }

  if (!contact.phone || !contact.phone.trim()) {
    errors.phone = 'Phone number is required.';
  } else if (!isValidPhone(contact.phone)) {
    errors.phone = 'Please enter a valid telephone number (at least 7 digits).';
  }

  if (contact.email && !isValidEmail(contact.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!contact.relationship || contact.relationship.trim() === '') {
    errors.relationship = 'Please select or enter a relationship.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Validate Health Profile
 */
export function validateHealthProfile(profile) {
  const errors = {};

  if (profile.fullName && profile.fullName.length > 70) {
    errors.fullName = 'Full name must be under 70 characters.';
  }

  if (profile.emergencyNotes && profile.emergencyNotes.length > 1000) {
    errors.emergencyNotes = 'Emergency notes must be under 1000 characters.';
  }

  if (profile.allergies && profile.allergies.length > 500) {
    errors.allergies = 'Allergies list must be under 500 characters.';
  }

  if (profile.conditions && profile.conditions.length > 500) {
    errors.conditions = 'Medical conditions list must be under 500 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
