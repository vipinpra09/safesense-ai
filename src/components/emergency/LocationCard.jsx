import React, { useState } from 'react';
import {
  MapPin,
  ExternalLink,
  Copy,
  Check,
  RefreshCw,
  AlertTriangle,
  Navigation,
  Edit3
} from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';
import { useToast } from '../../context/ToastContext';
import { formatCoordinates, getGoogleMapsUrl } from '../../utils/formatters';

export function LocationCard() {
  const { location, locationStatus, requestLocation } = useEmergency();
  const { addToast } = useToast();
  const [copied, setCopied] = useState(false);
  const [manualNote, setManualNote] = useState('');
  const [isEditingNote, setIsEditingNote] = useState(false);

  const mapsUrl = location ? getGoogleMapsUrl(location.latitude, location.longitude) : null;

  const handleCopyLocation = () => {
    if (!location) {
      addToast('No GPS coordinates available to copy.', 'warning');
      return;
    }

    const textToCopy = `📍 Emergency Location: ${formatCoordinates(
      location.latitude,
      location.longitude
    )}\nGoogle Maps Link: ${mapsUrl}${
      manualNote ? `\nLandmark/Details: ${manualNote}` : ''
    }`;

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopied(true);
        addToast('Coordinates & Maps link copied to clipboard!', 'success');
        setTimeout(() => setCopied(false), 3000);
      })
      .catch(() => {
        addToast('Could not access clipboard.', 'error');
      });
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white">Emergency Location</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Browser Geolocation API (User Permission Required)
            </p>
          </div>
        </div>

        {/* Location Status Badge */}
        <div>
          {locationStatus === 'requesting' && (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 animate-pulse">
              <RefreshCw className="w-3 h-3 animate-spin" /> Locating...
            </span>
          )}
          {locationStatus === 'success' && location && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
              <Navigation className="w-3 h-3" /> GPS Acquired
            </span>
          )}
          {locationStatus === 'denied' && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300">
              <AlertTriangle className="w-3 h-3" /> Permission Denied
            </span>
          )}
          {locationStatus === 'idle' && !location && (
            <span className="text-xs font-medium text-slate-400">Not Requested</span>
          )}
        </div>
      </div>

      {/* Main Coordinate Block */}
      {location ? (
        <div className="space-y-3">
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">
              Current GPS Coordinates:
            </div>
            <div className="font-mono text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-wide">
              {formatCoordinates(location.latitude, location.longitude)}
            </div>
            {location.accuracy && (
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Accuracy: within ~{Math.round(location.accuracy)} meters
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:hover:bg-blue-900/80 text-blue-700 dark:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <ExternalLink className="w-4 h-4" /> Open in Google Maps
            </a>
            <button
              type="button"
              onClick={handleCopyLocation}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied' : 'Copy Coordinates'}
            </button>
            <button
              type="button"
              onClick={requestLocation}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 ml-auto"
              title="Refresh GPS Signal"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Refresh
            </button>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
            {locationStatus === 'denied'
              ? 'GPS permission was denied. You can add a manual landmark or address note below.'
              : 'Acquiring GPS location helps emergency contacts and responders locate you quickly.'}
          </p>
          <button
            type="button"
            onClick={requestLocation}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
          >
            <MapPin className="w-4 h-4" /> Request Current GPS Location
          </button>
        </div>
      )}

      {/* Manual Location / Landmark Note */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between mb-1.5">
          <label
            htmlFor="manual-landmark-input"
            className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1"
          >
            <Edit3 className="w-3.5 h-3.5 text-slate-400" />
            Specific Landmark / Apartment / Room Note:
          </label>
        </div>
        <input
          id="manual-landmark-input"
          type="text"
          value={manualNote}
          onChange={(e) => setManualNote(e.target.value)}
          placeholder="e.g. 2nd Floor, Room 204, near red fire exit"
          className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}
