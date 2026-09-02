import { describe, it, expect } from 'vitest';
import { isValidPhone, sanitizeInput } from '../utils/validators';

describe('General validators', () => {
  it('sanitizes potentially unsafe HTML-like user input', () => {
    expect(sanitizeInput('  <script>alert(1)</script>  ')).toBe('scriptalert(1)/script');
    expect(sanitizeInput(null)).toBe('');
  });

  it('enforces phone digit-length limits', () => {
    expect(isValidPhone('+123456')).toBe(false);
    expect(isValidPhone('+1234567')).toBe(true);
    expect(isValidPhone('+1234567890123456')).toBe(true);
    expect(isValidPhone('+12345678901234567')).toBe(false);
  });
});
