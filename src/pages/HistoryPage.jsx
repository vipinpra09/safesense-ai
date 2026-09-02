import React, { useState } from 'react';
import {
  History,
  Clock,
  MapPin,
  Trash2,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Eye,
  FileText,
  CheckCircle2
} from 'lucide-react';
import { useHistory } from '../context/HistoryContext';
import { useToast } from '../context/ToastContext';
import { formatDateTime, formatElapsedSeconds, formatCoordinates, getGoogleMapsUrl } from '../utils/formatters';
import { UrgencyBadge } from '../components/ai/UrgencyBadge';
import { Modal } from '../components/common/Modal';

export function HistoryPage() {
  const { history, deleteRecord, clearAllHistory } = useHistory();
  const { addToast } = useToast();

  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleOpenDetail = (record) => {
    setSelectedRecord(record);
    setIsDetailModalOpen(true);
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    if (window.confirm('Delete this emergency session record?')) {
      deleteRecord(id);
      addToast('Emergency record deleted.', 'info');
      if (selectedRecord?.id === id) {
        setIsDetailModalOpen(false);
      }
    }
  };

  const handleClearAll = () => {
    if (
      window.confirm(
        'Are you sure you want to delete ALL emergency session history from this device? This action cannot be undone.'
      )
    ) {
      clearAllHistory();
      addToast('All emergency history cleared.', 'info');
      setIsDetailModalOpen(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
            <History className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Emergency Session History
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Locally stored audit log of past SOS triggers, GPS locations, and AI triage summaries
            </p>
          </div>
        </div>

        {history.length > 0 && (
          <button
            type="button"
            onClick={handleClearAll}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/60 dark:hover:bg-rose-900 text-rose-700 dark:text-rose-300 font-bold text-xs transition-colors shrink-0"
          >
            <Trash2 className="w-4 h-4" /> Clear All History
          </button>
        )}
      </div>

      {/* History Records List */}
      {history.length > 0 ? (
        <div className="space-y-4">
          {history.map((record) => {
            const mapsUrl = record.location
              ? getGoogleMapsUrl(record.location.latitude, record.location.longitude)
              : null;

            return (
              <div
                key={record.id}
                onClick={() => handleOpenDetail(record)}
                className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-400 dark:hover:border-blue-600 transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 group"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <UrgencyBadge level={record.urgency || 'high'} />
                    <span className="font-bold text-slate-900 dark:text-white text-base">
                      {record.category || 'SOS Emergency Trigger'}
                    </span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {formatDateTime(record.timestamp)}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                    {record.situationSummary || 'Emergency session recorded.'}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      Duration: {formatElapsedSeconds(record.durationSeconds || 0)}
                    </span>

                    {record.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                        {formatCoordinates(record.location.latitude, record.location.longitude)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenDetail(record);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-950 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-blue-500" /> View Details
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleDelete(record.id, e)}
                    aria-label="Delete this history record"
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/60 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-dashed border-slate-300 dark:border-slate-700">
          <History className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
            No Emergency Sessions Logged
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            When you trigger an SOS or emergency triage, audit logs will be stored here on your device.
          </p>
        </div>
      )}

      {/* Record Detail Modal */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title="Emergency Session Details"
        maxWidth="max-w-2xl"
      >
        {selectedRecord && (
          <div className="space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
              <UrgencyBadge level={selectedRecord.urgency || 'high'} />
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {formatDateTime(selectedRecord.timestamp)}
              </span>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                Situation Summary
              </span>
              <p className="text-sm font-medium text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700">
                {selectedRecord.situationSummary || 'No summary text available.'}
              </p>
            </div>

            {selectedRecord.resolutionNotes && (
              <div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-1">
                  Resolution Notes
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300 bg-emerald-50/50 dark:bg-emerald-950/20 p-3 rounded-xl border border-emerald-200 dark:border-emerald-900">
                  {selectedRecord.resolutionNotes}
                </p>
              </div>
            )}

            {selectedRecord.location && (
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-500" /> GPS Coordinates at Activation:
                </span>
                <div className="font-mono text-xs font-bold text-slate-900 dark:text-white">
                  {formatCoordinates(
                    selectedRecord.location.latitude,
                    selectedRecord.location.longitude
                  )}
                </div>
                {getGoogleMapsUrl(
                  selectedRecord.location.latitude,
                  selectedRecord.location.longitude
                ) && (
                  <a
                    href={getGoogleMapsUrl(
                      selectedRecord.location.latitude,
                      selectedRecord.location.longitude
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"
                  >
                    Open Location in Google Maps <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={(e) => handleDelete(selectedRecord.id, e)}
                className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 hover:underline"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete Record
              </button>

              <button
                type="button"
                onClick={() => setIsDetailModalOpen(false)}
                className="px-4 py-2 bg-slate-900 dark:bg-slate-700 text-white rounded-xl text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
