import { formatCoordinates } from '../../utils/formatters';

export const INITIAL_GREETING = {
  id: 'msg-initial',
  sender: 'ai',
  timestamp: new Date().toISOString(),
  data: {
    urgency: 'low',
    situation_summary:
      'SafeSense AI Emergency Assistant is ready. Describe what is happening or choose a preset below for instant guidance.',
    recommended_actions: [
      'State what happened or what assistance is required.',
      'Use voice input or type your situation in plain words.',
      'If you are experiencing life-threatening symptoms, dial 911 or 112 immediately.',
    ],
    what_to_tell_responders: [
      'Your exact location or address landmarks.',
      'Primary symptoms and immediate safety hazards.',
    ],
    important_information: ['Do not panic. Keep your airways clear and remain in a safe location.'],
    disclaimer:
      'SafeSense AI provides assistive guidance only and does not replace medical diagnosis or emergency services.',
  },
};

export function buildLocationSummary(location) {
  if (!location) {
    return 'Location unavailable';
  }

  return `GPS: ${formatCoordinates(location.latitude, location.longitude)} (Accuracy: ${Math.round(
    location.accuracy || 0
  )}m)`;
}

export function createUserMessage(text) {
  return {
    id: 'msg-user-' + Date.now(),
    sender: 'user',
    text: text.trim(),
    timestamp: new Date().toISOString(),
  };
}

export function createAiMessage(data) {
  return {
    id: 'msg-ai-' + Date.now(),
    sender: 'ai',
    timestamp: new Date().toISOString(),
    data,
  };
}

export function createFallbackErrorMessage(errorMessage) {
  return {
    urgency: 'high',
    situation_summary:
      errorMessage ||
      'Could not connect to external AI service. Please contact 911 / 112 directly if in immediate danger.',
    recommended_actions: [
      'Call official emergency services (911 / 112).',
      'Alert your emergency contacts.',
      'Stay in a safe, visible position.',
    ],
    what_to_tell_responders: ['Current location and symptoms.'],
    important_information: ['Keep warm and conserve phone battery.'],
    disclaimer:
      'SafeSense AI provides assistive guidance only and does not replace medical diagnosis or emergency services.',
  };
}
