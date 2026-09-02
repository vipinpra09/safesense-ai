import { useEffect, useRef, useState } from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { useHealthProfile } from '../../context/HealthProfileContext';
import { sendGeminiEmergencyTriage } from '../../services/geminiService';
import {
  buildLocationSummary,
  createAiMessage,
  createFallbackErrorMessage,
  createUserMessage,
  INITIAL_GREETING,
} from './aiChatHelpers';

export function useAiChat() {
  const [messages, setMessages] = useState([INITIAL_GREETING]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { location } = useEmergency();
  const { getFormattedSummary } = useHealthProfile();

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (customText = null) => {
    const textToSend = typeof customText === 'string' ? customText : inputPrompt;
    if (!textToSend || !textToSend.trim() || isLoading) return;

    const trimmedText = textToSend.trim();
    const userMessage = createUserMessage(trimmedText);
    const nextConversationHistory = [...messages, userMessage];

    setMessages(nextConversationHistory);
    setInputPrompt('');
    setIsLoading(true);

    try {
      const triageResult = await sendGeminiEmergencyTriage({
        prompt: trimmedText,
        conversationHistory: nextConversationHistory,
        healthSummary: getFormattedSummary() || null,
        locationSummary: buildLocationSummary(location),
      });

      setMessages((prev) => [...prev, createAiMessage(triageResult)]);
    } catch (error) {
      console.error('AI triage error:', error);
      const errorMessage = error instanceof Error ? error.message : null;
      setMessages((prev) => [...prev, createAiMessage(createFallbackErrorMessage(errorMessage))]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setMessages([INITIAL_GREETING]);
  };

  return {
    messages,
    inputPrompt,
    isLoading,
    messagesEndRef,
    setInputPrompt,
    handleSendMessage,
    handleKeyDown,
    handleClearChat,
  };
}
