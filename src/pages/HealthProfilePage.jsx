import React, { useState } from 'react';
import {
  HeartPulse,
  Droplet,
  AlertTriangle,
  Pill,
  FileText,
  Lock,
  Printer,
  Trash2,
  Save,
  CheckCircle2,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { useHealthProfile } from '../context/HealthProfileContext';
import { useToast } from '../context/ToastContext';
import { BLOOD_GROUPS } from '../utils/constants';

export function HealthProfilePage() {
  const { profile, updateProfile, clearProfile } = useHealthProfile();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({ ...profile });
  const [formErrors, setFormErrors] = useState({});
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setIsSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setFormErrors({});

    const res = updateProfile(formData);
    if (res.success) {
      setIsSaved(true);
      addToast('Emergency Medical Profile saved locally on this device.', 'success');
      setTimeout(() => setIsSaved(false), 4000);
    } else {
      setFormErrors(res.errors || {});
      addToast('Please check the highlighted errors.', 'error');
    }
  };

  const handleClear = () => {
    if (
      window.confirm(
        'Are you sure you want to clear your local emergency health profile? This action removes all medical details from this device.'
      )
    ) {
      clearProfile();
      setFormData({
        fullName: '',
        dateOfBirth: '',
        bloodGroup: 'Unknown / Not Sure',
        allergies: '',
        conditions: '',
        medications: '',
        doctorName: '',
        doctorPhone: '',
        organDonor: false,
        emergencyNotes: ''
      });
      addToast('Medical profile cleared.', 'info');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-8 print:py-0">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm print:hidden">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400">
            <HeartPulse className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Emergency Health Profile & Medical ID
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Crucial information for first responders, paramedics, and emergency physicians
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors"
          >
            <Printer className="w-4 h-4" /> Print / Save PDF
          </button>
        </div>
      </div>

      {/* Privacy Isolation Alert */}
      <div className="bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 p-4 rounded-2xl flex items-center gap-3 text-xs text-emerald-950 dark:text-emerald-200 print:hidden">
        <Lock className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
        <p>
          <strong>Privacy Guarantee:</strong> Health data is stored locally in your browser storage.
          It is never sent to external servers or AI models unless you voluntarily generate an SOS broadcast or AI triage request.
        </p>
      </div>

      {/* Main Profile Form */}
      <form onSubmit={handleSave} className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        {/* Name, DOB & Blood Group Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Full Legal Name
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder="e.g. Alex Johnson"
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
            {formErrors.fullName && (
              <p className="text-xs text-rose-500 mt-1">{formErrors.fullName}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleChange('dateOfBirth', e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Blood Group
            </label>
            <select
              value={formData.bloodGroup}
              onChange={(e) => handleChange('bloodGroup', e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 font-bold"
            >
              {BLOOD_GROUPS.map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Severe Allergies (High prominence) */}
        <div>
          <label className="block text-xs font-bold text-amber-800 dark:text-amber-300 mb-1 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-500" /> Severe Allergies (Foods, Medications, Insects)
          </label>
          <input
            type="text"
            value={formData.allergies}
            onChange={(e) => handleChange('allergies', e.target.value)}
            placeholder="e.g. Penicillin, Peanuts (Carries EpiPen in backpack), Latex"
            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50/40 dark:bg-amber-950/20 text-amber-950 dark:text-amber-100 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
          />
          {formErrors.allergies && (
            <p className="text-xs text-rose-500 mt-1">{formErrors.allergies}</p>
          )}
        </div>

        {/* Medical Conditions */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
            <HeartPulse className="w-4 h-4 text-rose-500" /> Chronic Medical Conditions
          </label>
          <input
            type="text"
            value={formData.conditions}
            onChange={(e) => handleChange('conditions', e.target.value)}
            placeholder="e.g. Type 1 Diabetes, Severe Asthma, Epilepsy, Hypertension"
            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
          {formErrors.conditions && (
            <p className="text-xs text-rose-500 mt-1">{formErrors.conditions}</p>
          )}
        </div>

        {/* Medications */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
            <Pill className="w-4 h-4 text-blue-500" /> Current Daily Medications & Dosages
          </label>
          <input
            type="text"
            value={formData.medications}
            onChange={(e) => handleChange('medications', e.target.value)}
            placeholder="e.g. Albuterol Inhaler (PRN), Metformin 500mg, Lisinopril 10mg"
            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>

        {/* Doctor Contact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Primary Physician / Doctor Name
            </label>
            <input
              type="text"
              value={formData.doctorName}
              onChange={(e) => handleChange('doctorName', e.target.value)}
              placeholder="Dr. Robert Chen"
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Physician Phone / Clinic Number
            </label>
            <input
              type="tel"
              value={formData.doctorPhone}
              onChange={(e) => handleChange('doctorPhone', e.target.value)}
              placeholder="+1 (555) 987-6543"
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 font-mono"
            />
          </div>
        </div>

        {/* Organ Donor Checkbox */}
        <div className="pt-2">
          <label className="flex items-center gap-2 cursor-pointer font-bold text-xs text-slate-800 dark:text-slate-200 select-none">
            <input
              type="checkbox"
              checked={formData.organDonor}
              onChange={(e) => handleChange('organDonor', e.target.checked)}
              className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500"
            />
            <span className="flex items-center gap-1">
              <UserCheck className="w-4 h-4 text-rose-600" /> Registered Organ Donor
            </span>
          </label>
        </div>

        {/* Critical Emergency Notes */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-emerald-500" /> Emergency Instructions & Notes
          </label>
          <textarea
            rows={3}
            value={formData.emergencyNotes}
            onChange={(e) => handleChange('emergencyNotes', e.target.value)}
            placeholder="e.g. Has pacemaker. Non-verbal when stressed. Emergency key is under front mat."
            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
          {formErrors.emergencyNotes && (
            <p className="text-xs text-rose-500 mt-1">{formErrors.emergencyNotes}</p>
          )}
        </div>

        {/* Submit & Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800 print:hidden">
          <button
            type="button"
            onClick={handleClear}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 dark:text-rose-400 p-2 hover:bg-rose-50 dark:hover:bg-rose-950/60 rounded-xl transition-colors"
          >
            <Trash2 className="w-4 h-4" /> Clear Health Profile
          </button>

          <div className="flex items-center gap-3">
            {isSaved && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-4 h-4" /> Changes Saved
              </span>
            )}

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-black text-sm shadow-md focus:outline-none focus:ring-4 focus:ring-rose-300 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" /> Save Medical Profile
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
