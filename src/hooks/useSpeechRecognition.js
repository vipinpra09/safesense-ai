import { useState, useEffect, useRef, useCallback } from 'react';

export function useSpeechRecognition({ onResult, onError } = {}) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const [error, setError] = useState(null);

  const recognitionRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        setIsSupported(true);
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
          setIsListening(true);
          setError(null);
        };

        recognition.onresult = (event) => {
          let interim = '';
          let final = '';

          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              final += event.results[i][0].transcript;
            } else {
              interim += event.results[i][0].transcript;
            }
          }

          if (final) {
            setTranscript((prev) => {
              const updated = prev ? `${prev} ${final.trim()}` : final.trim();
              if (onResult) onResult(updated);
              return updated;
            });
          }
          setInterimTranscript(interim);
        };

        recognition.onerror = (event) => {
          let msg = 'Speech recognition encountered an issue.';
          if (event.error === 'not-allowed') {
            msg = 'Microphone permission was denied. Please allow microphone access or type your message.';
          } else if (event.error === 'no-speech') {
            msg = 'No speech was detected. Please try speaking again.';
          } else if (event.error === 'network') {
            msg = 'Network error during speech recognition.';
          }
          setError(msg);
          setIsListening(false);
          if (onError) onError(msg);
        };

        recognition.onend = () => {
          setIsListening(false);
          setInterimTranscript('');
        };

        recognitionRef.current = recognition;
      } else {
        setIsSupported(false);
      }
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore cleanup error
        }
      }
    };
  }, [onResult, onError]);

  const startListening = useCallback(() => {
    if (!isSupported || !recognitionRef.current) {
      setError('Speech recognition is not supported in this browser. Please type your message.');
      return;
    }
    try {
      setError(null);
      setInterimTranscript('');
      recognitionRef.current.start();
    } catch {
      // If already started, restart
      try {
        recognitionRef.current.stop();
        setTimeout(() => recognitionRef.current.start(), 200);
      } catch {
        // ignore
      }
    }
  }, [isSupported]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }
    setIsListening(false);
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
    setError(null);
  }, []);

  return {
    isListening,
    transcript,
    interimTranscript,
    isSupported,
    error,
    startListening,
    stopListening,
    resetTranscript,
    setTranscript
  };
}
