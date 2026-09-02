/**
 * Format Date & Time for emergency display and history logs
 */
export function formatDateTime(isoString) {
  if (!isoString) return 'Unknown time';
  try {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('default', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(date);
  } catch {
    return isoString;
  }
}

/**
 * Format elapsed seconds into MM:SS or HH:MM:SS
 */
export function formatElapsedSeconds(seconds) {
  if (typeof seconds !== 'number' || seconds < 0) return '00:00';
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const pad = (n) => String(n).padStart(2, '0');

  if (hrs > 0) {
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  }
  return `${pad(mins)}:${pad(secs)}`;
}

/**
 * Format GPS coordinates nicely
 */
export function formatCoordinates(lat, lon) {
  if (lat === null || lon === null || lat === undefined || lon === undefined) {
    return 'Location unavailable';
  }
  const latDir = lat >= 0 ? 'N' : 'S';
  const lonDir = lon >= 0 ? 'E' : 'W';
  return `${Math.abs(lat).toFixed(5)}° ${latDir}, ${Math.abs(lon).toFixed(5)}° ${lonDir}`;
}

/**
 * Get Google Maps Link
 */
export function getGoogleMapsUrl(lat, lon) {
  if (lat === null || lon === null || lat === undefined || lon === undefined) {
    return null;
  }
  return `https://www.google.com/maps?q=${lat},${lon}`;
}

/**
 * Clean phone number for tel: and wa.me: links
 */
export function cleanPhoneNumber(phone) {
  if (!phone) return '';
  return phone.replace(/[^0-9+]/g, '');
}

/**
 * Create Pre-filled SMS URL
 */
export function createSmsUrl(phone, message) {
  const clean = cleanPhoneNumber(phone);
  return `sms:${clean}?body=${encodeURIComponent(message)}`;
}

/**
 * Create Pre-filled WhatsApp URL
 */
export function createWhatsAppUrl(phone, message) {
  const clean = cleanPhoneNumber(phone).replace('+', '');
  return `https://api.whatsapp.com/send?phone=${clean}&text=${encodeURIComponent(message)}`;
}

/**
 * Generate Emergency Broadcast Message for Contacts & Dispatch
 */
export function generateEmergencyDispatchText({
  userName = 'I',
  location,
  healthProfile,
  situationSummary,
  timestamp
}) {
  const timeStr = timestamp ? formatDateTime(timestamp) : new Date().toLocaleTimeString();
  let text = `🚨 EMERGENCY ALERT FROM ${userName.toUpperCase()} (${timeStr})\n\n`;
  text += `I have triggered an emergency SOS using SafeSense AI and require immediate assistance.\n\n`;

  if (location && location.latitude && location.longitude) {
    text += `📍 CURRENT LOCATION:\n`;
    text += `Coordinates: ${formatCoordinates(location.latitude, location.longitude)}\n`;
    text += `Maps Link: ${getGoogleMapsUrl(location.latitude, location.longitude)}\n`;
    if (location.accuracy) {
      text += `Accuracy: within ~${Math.round(location.accuracy)} meters\n`;
    }
    text += `\n`;
  } else {
    text += `📍 LOCATION: Not shared or unavailable via GPS.\n\n`;
  }

  if (situationSummary) {
    text += `📋 SITUATION SUMMARY:\n${situationSummary}\n\n`;
  }

  if (healthProfile && (healthProfile.bloodGroup || healthProfile.allergies || healthProfile.conditions)) {
    text += `🏥 MEDICAL SNAPSHOT:\n`;
    if (healthProfile.bloodGroup) text += `• Blood Group: ${healthProfile.bloodGroup}\n`;
    if (healthProfile.allergies) text += `• Allergies: ${healthProfile.allergies}\n`;
    if (healthProfile.conditions) text += `• Medical Conditions: ${healthProfile.conditions}\n`;
    if (healthProfile.medications) text += `• Current Medications: ${healthProfile.medications}\n`;
    text += `\n`;
  }

  text += `Please check on me or dispatch emergency response immediately.`;
  return text;
}
