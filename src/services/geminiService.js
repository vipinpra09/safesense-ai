/**
 * Intelligent local fallback triage engine in case API endpoint is unavailable or offline
 */
function generateLocalFallbackTriage(userMessage) {
  const lower = (userMessage || '').toLowerCase();

  let urgency = 'medium';
  let situation_summary = 'User described an emergency or assistive health need.';
  let recommended_actions = [
    'Stay calm, breathe deeply, and find a stable, safe position.',
    'Contact official emergency services (911 / 112) if in acute distress or danger.',
    'Notify trusted contacts with your current location.',
  ];
  let what_to_tell_responders = [
    'Your exact current location or nearest landmarks.',
    'Any symptoms, injuries, or immediate safety hazards.',
    'Any vital medical conditions or severe allergies.',
  ];
  let medical_watchouts = [
    'Do not attempt sudden vigorous movements if pain is severe.',
    'Keep your airways clear.',
  ];

  if (
    lower.includes('chest') ||
    lower.includes('heart') ||
    lower.includes('breath') ||
    lower.includes('stroke') ||
    lower.includes('unconscious') ||
    lower.includes('bleed')
  ) {
    urgency = 'critical';
    situation_summary =
      'User reports symptoms indicating a potential high-severity medical emergency (e.g. chest discomfort, breathing difficulty, or severe distress).';
    recommended_actions = [
      'Call emergency services (911 / 112 / 999) IMMEDIATELY.',
      'Sit comfortably in a resting position (semi-upright) to ease breathing.',
      'Loosen any tight clothing around the neck and waist.',
      'Unlock the front door if safely possible so first responders can enter.',
      'Do not exert yourself or walk around.',
    ];
    what_to_tell_responders = [
      'Exact onset time of symptoms and severity level.',
      'Any known cardiac or respiratory conditions.',
      'Current medications or aspirin intake if applicable.',
    ];
    medical_watchouts = [
      'Do not drive yourself to the hospital.',
      'If breathing ceases, CPR should be initiated by trained bystanders.',
    ];
  } else if (
    lower.includes('fall') ||
    lower.includes('fell') ||
    lower.includes('stand') ||
    lower.includes('slip') ||
    lower.includes('drop')
  ) {
    urgency = 'high';
    situation_summary = 'User experienced a fall and cannot get up or is immobilised.';
    recommended_actions = [
      'Do not rush to stand immediately; check yourself for sharp pain or head injury.',
      'If uninjured, roll gently onto your stomach, get onto hands and knees, and crawl to a sturdy chair.',
      'If unable to move, keep warm with nearby rugs or clothing and activate emergency contact alerts.',
      'Stay still and conserve your voice/energy.',
    ];
    what_to_tell_responders = [
      'How long you have been on the ground.',
      'Whether you hit your head or lost consciousness.',
      'Specific areas of severe pain or inability to bear weight.',
    ];
    medical_watchouts = [
      'Avoid pulling on unstable furniture that could topple.',
      'Protect your hips and spine from sudden twists.',
    ];
  } else if (
    lower.includes('unsafe') ||
    lower.includes('follow') ||
    lower.includes('stalk') ||
    lower.includes('threat') ||
    lower.includes('scared') ||
    lower.includes('danger')
  ) {
    urgency = 'high';
    situation_summary = 'User feels in immediate personal danger or is being followed.';
    recommended_actions = [
      'Head immediately toward a well-lit, populated public area (store, station, hospital lobby).',
      'Quietly dispatch your GPS location to trusted contacts using SafeSense AI SOS.',
      'Dial emergency services (911 / 112) or approach security personnel directly.',
      'Do not head to an isolated location or dark corner.',
    ];
    what_to_tell_responders = [
      'Your direction of travel and current coordinates.',
      'Description of any suspicious individuals or vehicles.',
      'Whether you are currently in a public or private location.',
    ];
    medical_watchouts = ['Keep your phone accessible and screen dimmed if necessary.'];
  } else if (
    lower.includes('allergic') ||
    lower.includes('allergy') ||
    lower.includes('throat') ||
    lower.includes('anaphylaxis') ||
    lower.includes('swelling')
  ) {
    urgency = 'critical';
    situation_summary = 'User is experiencing an allergic reaction or signs of anaphylaxis.';
    recommended_actions = [
      'If you have an epinephrine auto-injector (EpiPen), administer it into the outer mid-thigh right away.',
      'Call emergency services (911 / 112) immediately.',
      'Lie flat with your legs elevated, unless breathing is difficult (in which case sit upright).',
      'Remove or distance yourself from the allergen source.',
    ];
    what_to_tell_responders = [
      'Suspected allergen (food, insect sting, medication).',
      'Whether epinephrine has already been administered and at what time.',
    ];
    medical_watchouts = ['Anaphylaxis can worsen rapidly; do not wait to see if symptoms improve.'];
  }

  return {
    urgency,
    situation_summary,
    recommended_actions,
    what_to_tell_responders,
    important_information: medical_watchouts,
    disclaimer:
      'SafeSense AI provides assistive guidance and does not replace medical diagnosis or emergency 911 services.',
  };
}

const VALID_URGENCY_LEVELS = new Set(['low', 'medium', 'high', 'critical']);

function normalizeStringList(value, fallback) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const cleaned = value
    .map((entry) => (typeof entry === 'string' ? entry.trim() : ''))
    .filter(Boolean);

  return cleaned.length > 0 ? cleaned : fallback;
}

function normalizeTriageResult(data, prompt) {
  const fallback = generateLocalFallbackTriage(prompt);

  if (!data || typeof data !== 'object') {
    return fallback;
  }

  return {
    urgency: VALID_URGENCY_LEVELS.has(data.urgency) ? data.urgency : fallback.urgency,
    situation_summary:
      typeof data.situation_summary === 'string' && data.situation_summary.trim()
        ? data.situation_summary.trim()
        : fallback.situation_summary,
    recommended_actions: normalizeStringList(
      data.recommended_actions,
      fallback.recommended_actions
    ),
    what_to_tell_responders: normalizeStringList(
      data.what_to_tell_responders,
      fallback.what_to_tell_responders
    ),
    important_information: normalizeStringList(
      data.important_information,
      fallback.important_information
    ),
    disclaimer:
      typeof data.disclaimer === 'string' && data.disclaimer.trim()
        ? data.disclaimer.trim()
        : fallback.disclaimer,
  };
}

async function getApiErrorDetails(response) {
  try {
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const json = await response.json();
      return json?.error || json?.message || null;
    }

    const text = await response.text();
    return text || null;
  } catch {
    return null;
  }
}

function createHandledError(message) {
  const error = new Error(message);
  error.isHandled = true;
  return error;
}

function buildClientFacingError(status, details) {
  if (status === 400) {
    return details || 'The emergency description is invalid. Please provide more details.';
  }

  if (status === 429) {
    return 'SafeSense AI is currently rate-limited. Please wait a moment and try again.';
  }

  if (status === 503) {
    return 'SafeSense AI service is temporarily unavailable. Using offline emergency guidance.';
  }

  if (status >= 500) {
    return 'SafeSense AI service had a temporary server error. Using offline emergency guidance.';
  }

  return details || `SafeSense AI request failed with status ${status}.`;
}

/**
 * Call Gemini API endpoint or fallback gracefully
 */
export async function sendGeminiEmergencyTriage({
  prompt,
  conversationHistory = [],
  healthSummary = null,
  locationSummary = null,
}) {
  const trimmedPrompt = typeof prompt === 'string' ? prompt.trim() : '';
  if (!trimmedPrompt) {
    throw new Error('Please describe your emergency situation before sending.');
  }

  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: trimmedPrompt,
        conversationHistory,
        healthSummary,
        locationSummary,
      }),
    });

    if (!response.ok) {
      const details = await getApiErrorDetails(response);
      const errorMessage = buildClientFacingError(response.status, details);

      if (response.status === 400) {
        throw createHandledError(errorMessage);
      }

      console.warn(
        `Serverless API returned status ${response.status}. Falling back to local triage.`,
        details
      );
      return normalizeTriageResult(
        {
          ...generateLocalFallbackTriage(trimmedPrompt),
          important_information: [
            'Live AI service is currently unavailable.',
            `Reason: ${errorMessage}`,
          ],
        },
        trimmedPrompt
      );
    }

    const data = await response.json();
    return normalizeTriageResult(data, trimmedPrompt);
  } catch (err) {
    if (
      err instanceof Error &&
      (err.isHandled || err.message.includes('Please describe your emergency situation'))
    ) {
      throw err;
    }

    console.warn('Network or API endpoint error, using intelligent offline triage:', err);
    return normalizeTriageResult(generateLocalFallbackTriage(trimmedPrompt), trimmedPrompt);
  }
}
