export const STORAGE_KEYS = {
  CONTACTS: 'safesense_emergency_contacts_v1',
  HEALTH_PROFILE: 'safesense_health_profile_v1',
  HISTORY: 'safesense_emergency_history_v1',
  ACCESSIBILITY: 'safesense_accessibility_settings_v1',
  ACTIVE_SESSION: 'safesense_active_sos_session_v1'
};

export const EMERGENCY_HOTLINES = [
  { name: 'Emergency Services (US / Canada)', number: '911', desc: 'Police, Fire, Ambulance' },
  { name: 'European Emergency (EU / UK / India)', number: '112', desc: 'Universal Emergency Hotline' },
  { name: 'Crisis & Suicide Lifeline', number: '988', desc: '24/7 Free & Confidential Support' },
  { name: 'Poison Control Center', number: '1-800-222-1222', desc: 'Immediate Toxic Ingestion Guidance' },
  { name: 'Disaster Distress Helpline', number: '1-800-985-5990', desc: 'Crisis Counseling Support' }
];

export const BLOOD_GROUPS = [
  'O Positive (O+)',
  'O Negative (O-)',
  'A Positive (A+)',
  'A Negative (A-)',
  'B Positive (B+)',
  'B Negative (B-)',
  'AB Positive (AB+)',
  'AB Negative (AB-)',
  'Unknown / Not Sure'
];

export const RELATIONSHIPS = [
  'Spouse / Partner',
  'Parent / Guardian',
  'Child / Dependent',
  'Sibling',
  'Friend',
  'Caregiver / Nurse',
  'Primary Physician',
  'Neighbor',
  'Other'
];

export const DEFAULT_ACCESSIBILITY_SETTINGS = {
  fontSize: 'normal', // 'normal' | 'large' | 'xlarge'
  contrastMode: 'normal', // 'normal' | 'high-contrast-dark' | 'high-contrast-light'
  reducedMotion: false,
  ttsAutoRead: false,
  speechRate: 1.0,
  quickSos: false // If true, bypasses 3-second countdown
};

export const QUICK_SITUATION_PRESETS = [
  {
    id: 'fall',
    title: 'Fall & Inability to Stand',
    icon: 'Activity',
    prompt: 'I have fallen down and cannot get back up. I may be injured and need immediate assistance.',
    category: 'Accident / Fall',
    severity: 'high'
  },
  {
    id: 'chest_pain',
    title: 'Chest Pain / Shortness of Breath',
    icon: 'HeartPulse',
    prompt: 'I am experiencing sudden chest tightness, pain, or difficulty breathing. Please guide me immediately.',
    category: 'Medical Emergency',
    severity: 'critical'
  },
  {
    id: 'unresponsive',
    title: 'Someone Collapsed / Unresponsive',
    icon: 'UserX',
    prompt: 'Someone near me has collapsed and is unresponsive. Tell me what critical steps to take right now while calling for an ambulance.',
    category: 'First Aid / Resuscitation',
    severity: 'critical'
  },
  {
    id: 'allergy',
    title: 'Severe Allergic Reaction',
    icon: 'AlertTriangle',
    prompt: 'I am having an allergic reaction. My throat feels tight, hives are spreading, and breathing is becoming difficult.',
    category: 'Anaphylaxis',
    severity: 'critical'
  },
  {
    id: 'unsafe',
    title: 'Feeling Unsafe / Being Followed',
    icon: 'ShieldAlert',
    prompt: 'I feel in danger or am being followed. I need to quietly prepare emergency details and dispatch my location.',
    category: 'Personal Safety',
    severity: 'high'
  },
  {
    id: 'lost_confused',
    title: 'Lost / Disoriented',
    icon: 'Compass',
    prompt: 'I am lost, disoriented, and do not recognize my surroundings. Help me find safe coordinates and notify my contacts.',
    category: 'Orientation Assistance',
    severity: 'medium'
  }
];

export const SAFETY_DISCLAIMER_TEXT = 
  'SafeSense AI provides assistive guidance and emergency preparation only. It does not replace professional emergency services (911/112), doctors, or hospital care. In life-threatening situations, contact official emergency services immediately.';
