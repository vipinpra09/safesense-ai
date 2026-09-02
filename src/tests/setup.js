import '@testing-library/jest-dom';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = String(value);
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Mock Geolocation
const geolocationMock = {
  getCurrentPosition: vi.fn((success) =>
    success({
      coords: {
        latitude: 37.7749,
        longitude: -122.4194,
        accuracy: 10,
        altitude: null
      },
      timestamp: Date.now()
    })
  ),
  watchPosition: vi.fn(),
  clearWatch: vi.fn()
};

Object.defineProperty(navigator, 'geolocation', {
  value: geolocationMock,
  configurable: true
});

// Mock SpeechSynthesis
const speechSynthesisMock = {
  speak: vi.fn(),
  cancel: vi.fn(),
  pause: vi.fn(),
  resume: vi.fn(),
  getVoices: vi.fn(() => [])
};

Object.defineProperty(window, 'speechSynthesis', {
  value: speechSynthesisMock,
  configurable: true
});

// Mock window.scrollTo
window.scrollTo = vi.fn();
Element.prototype.scrollIntoView = vi.fn();
