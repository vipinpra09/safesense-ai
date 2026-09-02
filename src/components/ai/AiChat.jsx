import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Bot,
  User,
  Trash2,
  Sparkles,
  ShieldAlert,
  Loader2,
  RefreshCw,
  PhoneCall
} from 'lucide-react';
import { QuickSituationChips } from './QuickSituationChips';
import { VoiceInput } from './VoiceInput';
import { StructuredSummaryCard } from './StructuredSummaryCard';
import { sendGeminiEmergencyTriage } from '../../services/geminiService';
import { useHealthProfile } from '../../context/HealthProfileContext';
import { useEmergency } from '../../context/EmergencyContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { formatCoordinates } from '../../utils/formatters';

const INITIAL_GREETING = {
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
      'If you are experiencing life-threatening symptoms, dial 911 or 112 immediately.'
    ],
    what_to_tell_responders: [
      'Your exact location or address landmarks.',
      'Primary symptoms and immediate safety hazards.'
    ],
    important_information: [
      'Do not panic. Keep your airways clear and remain in a safe location.'
    ],
    disclaimer:
      'SafeSense AI provides assistive guidance only and does not replace medical diagnosis or emergency services.'
  }
};

export function AiChat() {
  const [messages, setMessages] = useState([INITIAL_GREETING]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { profile, getFormattedSummary } = useHealthProfile();
  const { location, isEmergencyActive } = useEmergency();
  const { settings } = useAccessibility();

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (customText = null) => {
    const textToSend = typeof customText === 'string' ? customText : inputPrompt;
    if (!textToSend || !textToSend.trim() || isLoading) return;

    const userMessage = {
      id: 'msg-user-' + Date.now(),
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toISOString()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputPrompt('');
    setIsLoading(true);

    // Build context
    const healthSummary = getFormattedSummary();
    const locationSummary = location
      ? `GPS: ${formatCoordinates(location.latitude, location.longitude)} (Accuracy: ${Math.round(
          location.accuracy || 0
        )}m)`
      : 'Location unavailable';

    try {
      const triageResult = await sendGeminiEmergencyTriage({
        prompt: textToSend.trim(),
        conversationHistory: messages,
        healthSummary: healthSummary || null,
        locationSummary
      });

      const aiResponseMsg = {
        id: 'msg-ai-' + Date.now(),
        sender: 'ai',
        timestamp: new Date().toISOString(),
        data: triageResult
      };

      setMessages((prev) => [...prev, aiResponseMsg]);
    } catch (err) {
      console.error('AI Triage error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: 'msg-err-' + Date.now(),
          sender: 'ai',
          timestamp: new Date().toISOString(),
          data: {
            urgency: 'high',
            situation_summary:
              'Could not connect to external AI service. Please contact 911 / 112 directly if in immediate danger.',
            recommended_actions: [
              'Call official emergency services (911 / 112).',
              'Alert your emergency contacts.',
              'Stay in a safe, visible position.'
            ],
            what_to_tell_responders: ['Current location and symptoms.'],
            important_information: ['Keep warm and conserve phone battery.']
          }
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setMessages([INITIAL_GREETING]);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col h-[750px] max-h-[85vh]">
      {/* Top Header */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 to-indigo-950 text-white border-b border-indigo-900/50 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-indigo-500 to-rose-500 text-white shadow-md">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold">AI Emergency Assistant</h2>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Gemini Active
              </span>
            </div>
            <p className="text-xs text-indigo-200">
              Calm, accessible emergency triage & guidance
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleClearChat}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors"
            title="Clear Chat Conversation"
            aria-label="Clear chat conversation"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <a
            href="tel:911"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black shadow focus:outline-none focus:ring-2 focus:ring-white"
          >
            <PhoneCall className="w-3.5 h-3.5" /> 911
          </a>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6 bg-slate-50/50 dark:bg-slate-950/40">
        {/* Quick Situation Presets Bar */}
        <div className="mb-4">
          <QuickSituationChips
            onSelectPreset={(presetPrompt) => handleSendMessage(presetPrompt)}
            disabled={isLoading}
          />
        </div>

        {/* Message bubbles */}
        {messages.map((msg) => {
          if (msg.sender === 'user') {
            return (
              <div key={msg.id} className="flex justify-end items-start gap-2.5">
                <div className="max-w-xl bg-slate-900 dark:bg-blue-600 text-white p-4 rounded-2xl rounded-tr-none shadow-md">
                  <div className="text-xs font-semibold text-slate-300 dark:text-blue-100 mb-1 flex items-center justify-between gap-4">
                    <span>You</span>
                    <span className="text-[10px] opacity-75">
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base font-medium whitespace-pre-wrap leading-relaxed">
                    {msg.text}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              </div>
            );
          }

          return (
            <div key={msg.id} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-rose-600 text-white flex items-center justify-center shrink-0 mt-1 shadow">
                <Bot className="w-4 h-4" />
              </div>
              <div className="flex-1 max-w-2xl">
                <StructuredSummaryCard data={msg.data} />
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 animate-pulse">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
              <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
              <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                SafeSense AI is evaluating emergency symptoms and safety steps...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Input Area */}
      <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0 space-y-3">
        <VoiceInput
          onTranscriptChange={(text) => setInputPrompt(text)}
          currentInput={inputPrompt}
        />

        <div className="flex items-center gap-2">
          <textarea
            rows={2}
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your emergency (e.g. 'I fell down and hurt my wrist' or 'Someone collapsed')..."
            disabled={isLoading}
            className="flex-1 p-3 text-xs sm:text-sm rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none disabled:opacity-50"
            aria-label="Describe your emergency"
          />

          <button
            type="button"
            onClick={() => handleSendMessage()}
            disabled={!inputPrompt.trim() || isLoading}
            aria-label="Send emergency description"
            className="p-3.5 sm:px-5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all shrink-0 flex items-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span className="hidden sm:inline text-sm">Send</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
