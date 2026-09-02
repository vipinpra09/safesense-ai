import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmergency } from '../context/EmergencyContext';

export function useKeyboardShortcuts() {
  const navigate = useNavigate();
  const { triggerSos, isCountingDown, cancelCountdown } = useEmergency();

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Escape cancels countdown
      if (e.key === 'Escape' && isCountingDown) {
        e.preventDefault();
        cancelCountdown();
        return;
      }

      // Check Alt shortcuts
      if (e.altKey && !e.ctrlKey && !e.metaKey) {
        const key = e.key.toLowerCase();

        switch (key) {
          case 's': // Alt + S -> SOS
            e.preventDefault();
            navigate('/sos');
            triggerSos('Keyboard Shortcut Trigger');
            break;
          case 'a': // Alt + A -> AI Assistant
            e.preventDefault();
            navigate('/assistant');
            break;
          case 'd': // Alt + D -> Dashboard
            e.preventDefault();
            navigate('/dashboard');
            break;
          case 'c': // Alt + C -> Contacts
            e.preventDefault();
            navigate('/contacts');
            break;
          case 'h': // Alt + H -> Health Profile
            e.preventDefault();
            navigate('/health');
            break;
          case 'k': // Alt + K -> Accessibility
            e.preventDefault();
            navigate('/accessibility');
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, triggerSos, isCountingDown, cancelCountdown]);
}
