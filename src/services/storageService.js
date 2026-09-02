/**
 * Storage Service - Safe LocalStorage wrapper with in-memory fallback
 */
const inMemoryCache = {};

export const storageService = {
  getItem(key, defaultValue = null) {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return inMemoryCache[key] !== undefined ? inMemoryCache[key] : defaultValue;
      }
      const raw = window.localStorage.getItem(key);
      if (raw === null) return defaultValue;
      return JSON.parse(raw);
    } catch (err) {
      console.warn(`LocalStorage read error for key "${key}":`, err);
      return inMemoryCache[key] !== undefined ? inMemoryCache[key] : defaultValue;
    }
  },

  setItem(key, value) {
    try {
      inMemoryCache[key] = value;
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
      return true;
    } catch (err) {
      console.warn(`LocalStorage write error for key "${key}":`, err);
      return false;
    }
  },

  removeItem(key) {
    try {
      delete inMemoryCache[key];
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
      }
      return true;
    } catch (err) {
      console.warn(`LocalStorage remove error for key "${key}":`, err);
      return false;
    }
  },

  clearAll() {
    try {
      Object.keys(inMemoryCache).forEach((k) => delete inMemoryCache[k]);
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.clear();
      }
      return true;
    } catch (err) {
      console.warn('LocalStorage clear error:', err);
      return false;
    }
  }
};
