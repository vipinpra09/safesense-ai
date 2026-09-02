import { useState, useCallback } from 'react';
import { getGoogleMapsUrl } from '../utils/formatters';

export function useGeolocation() {
  const [location, setLocation] = useState(null);
  const [status, setStatus] = useState('idle'); // 'idle' | 'requesting' | 'success' | 'denied' | 'unavailable' | 'timeout'
  const [error, setError] = useState(null);

  const requestLocation = useCallback(() => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      setStatus('unavailable');
      setError('Geolocation is not supported by your browser.');
      return;
    }

    setStatus('requesting');
    setError(null);

    const options = {
      enableHighAccuracy: true,
      timeout: 12000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
          altitude: pos.coords.altitude,
          timestamp: pos.timestamp,
          mapsUrl: getGoogleMapsUrl(pos.coords.latitude, pos.coords.longitude),
        };
        setLocation(coords);
        setStatus('success');
        setError(null);
      },
      (err) => {
        let errMsg = 'Failed to retrieve location.';
        let newStatus = 'unavailable';

        switch (err.code) {
          case err.PERMISSION_DENIED:
            errMsg =
              'Location permission was denied. You can still enter your location manually or proceed with SOS.';
            newStatus = 'denied';
            break;
          case err.POSITION_UNAVAILABLE:
            errMsg = 'Location signal is unavailable. Please check GPS/network.';
            newStatus = 'unavailable';
            break;
          case err.TIMEOUT:
            errMsg = 'Location request timed out. Retrying with network location.';
            newStatus = 'timeout';
            break;
        }

        setError(errMsg);
        setStatus(newStatus);
      },
      options
    );
  }, []);

  const clearLocation = useCallback(() => {
    setLocation(null);
    setStatus('idle');
    setError(null);
  }, []);

  return {
    location,
    status,
    error,
    requestLocation,
    clearLocation,
  };
}
