import React, { useState } from 'react';
import {
  Users,
  Phone,
  MessageSquare,
  Share2,
  Copy,
  Check,
  Star,
  ExternalLink,
  AlertCircle
} from 'lucide-react';
import { useContacts } from '../../context/ContactsContext';
import { useHealthProfile } from '../../context/HealthProfileContext';
import { useEmergency } from '../../context/EmergencyContext';
import { useToast } from '../../context/ToastContext';
import {
  createSmsUrl,
  createWhatsAppUrl,
  cleanPhoneNumber,
  generateEmergencyDispatchText
} from '../../utils/formatters';
import { Link } from 'react-router-dom';

export function QuickContactAlert() {
  const { contacts } = useContacts();
  const { profile } = useHealthProfile();
  const { location, activeSession } = useEmergency();
  const { addToast } = useToast();
  const [copied, setCopied] = useState(false);

  const dispatchText = generateEmergencyDispatchText({
    userName: profile.fullName || 'SafeSense User',
    location,
    healthProfile: profile,
    situationSummary: activeSession?.situationSummary,
    timestamp: activeSession?.startTime
  });

  const handleCopyDispatch = () => {
    navigator.clipboard
      .writeText(dispatchText)
      .then(() => {
        setCopied(true);
        addToast('Full emergency dispatch alert copied to clipboard!', 'success');
        setTimeout(() => setCopied(false), 3000);
      })
      .catch(() => {
        addToast('Failed to copy to clipboard.', 'error');
      });
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white">Emergency Contacts</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              1-Tap Alert & Coordinates Dispatch
            </p>
          </div>
        </div>

        <Link
          to="/contacts"
          className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline focus:outline-none focus:ring-2 focus:ring-purple-400 rounded px-1"
        >
          Manage ({contacts.length})
        </Link>
      </div>

      {contacts.length > 0 ? (
        <div className="space-y-3">
          {contacts.map((contact) => {
            const smsUrl = createSmsUrl(contact.phone, dispatchText);
            const waUrl = createWhatsAppUrl(contact.phone, dispatchText);
            const telUrl = `tel:${cleanPhoneNumber(contact.phone)}`;

            return (
              <div
                key={contact.id}
                className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                      {contact.name}
                    </span>
                    {contact.isPrimary && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300">
                        <Star className="w-2.5 h-2.5 fill-rose-500" /> Primary
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {contact.relationship} •{' '}
                    <span className="font-mono text-slate-700 dark:text-slate-300">
                      {contact.phone}
                    </span>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={telUrl}
                    className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400 active:scale-95"
                    aria-label={`Call ${contact.name}`}
                  >
                    <Phone className="w-3.5 h-3.5" /> Call
                  </a>

                  <a
                    href={smsUrl}
                    className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 active:scale-95"
                    aria-label={`Send SMS SOS to ${contact.name}`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> SMS Alert
                  </a>

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1 px-2.5 py-2 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400 active:scale-95"
                    aria-label={`Send WhatsApp SOS to ${contact.name}`}
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            );
          })}

          {/* Copy Full Broadcast Card */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleCopyDispatch}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold bg-slate-900 hover:bg-black text-white dark:bg-slate-800 dark:hover:bg-slate-700 transition-all focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" /> Copied Full Emergency Dispatch Alert
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" /> Copy Full Emergency Dispatch Alert for Any App
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-center">
          <AlertCircle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
            No emergency contacts added yet. Add trusted contacts to notify them with 1 click.
          </p>
          <Link
            to="/contacts"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-sm transition-colors"
          >
            <Users className="w-4 h-4" /> Add Emergency Contact
          </Link>
        </div>
      )}
    </div>
  );
}
