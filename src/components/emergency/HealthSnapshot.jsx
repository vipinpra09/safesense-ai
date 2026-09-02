import React from 'react';
import { HeartPulse, Droplet, AlertTriangle, Pill, FileText, UserCheck, Lock } from 'lucide-react';
import { useHealthProfile } from '../../context/HealthProfileContext';
import { Link } from 'react-router-dom';

export function HealthSnapshot() {
  const { profile } = useHealthProfile();

  const hasAnyData =
    profile.fullName ||
    profile.bloodGroup !== 'Unknown / Not Sure' ||
    profile.allergies ||
    profile.conditions ||
    profile.medications ||
    profile.emergencyNotes;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
            <HeartPulse className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white">
              First Responder Medical ID
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Immediate vital info for paramedics & doctors
            </p>
          </div>
        </div>

        <Link
          to="/health"
          className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline focus:outline-none focus:ring-2 focus:ring-rose-400 rounded px-1"
        >
          Edit Profile
        </Link>
      </div>

      {hasAnyData ? (
        <div className="space-y-3">
          {/* Patient Name & Blood Group */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {profile.fullName && (
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Patient Name
                </span>
                <span className="text-base font-extrabold text-slate-900 dark:text-white">
                  {profile.fullName}
                </span>
              </div>
            )}

            {profile.bloodGroup && (
              <div className="p-3 bg-red-50 dark:bg-red-950/40 rounded-xl border border-red-200 dark:border-red-800">
                <span className="text-[11px] font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider block flex items-center gap-1">
                  <Droplet className="w-3.5 h-3.5 fill-red-500" /> Blood Group
                </span>
                <span className="text-base font-black text-red-700 dark:text-red-300">
                  {profile.bloodGroup}
                </span>
              </div>
            )}
          </div>

          {/* Allergies */}
          {profile.allergies && (
            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800">
              <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider flex items-center gap-1 mb-0.5">
                <AlertTriangle className="w-3.5 h-3.5" /> Severe Allergies
              </span>
              <p className="text-sm font-semibold text-amber-950 dark:text-amber-100">
                {profile.allergies}
              </p>
            </div>
          )}

          {/* Conditions */}
          {profile.conditions && (
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Medical Conditions
              </span>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                {profile.conditions}
              </p>
            </div>
          )}

          {/* Medications */}
          {profile.medications && (
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Pill className="w-3.5 h-3.5 text-blue-500" /> Current Medications
              </span>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                {profile.medications}
              </p>
            </div>
          )}

          {/* Emergency Notes */}
          {profile.emergencyNotes && (
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-emerald-500" /> Critical Emergency Notes
              </span>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                {profile.emergencyNotes}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
            No health profile configured yet. Adding your blood group and allergies helps first
            responders.
          </p>
          <Link
            to="/health"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm transition-colors"
          >
            <HeartPulse className="w-4 h-4" /> Setup Medical Profile
          </Link>
        </div>
      )}

      {/* Privacy note */}
      <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 pt-3 border-t border-slate-100 dark:border-slate-800">
        <span className="flex items-center gap-1">
          <Lock className="w-3 h-3 text-emerald-500" /> Stored locally on this device only
        </span>
        {profile.organDonor && (
          <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400 font-bold">
            <UserCheck className="w-3 h-3" /> Organ Donor
          </span>
        )}
      </div>
    </div>
  );
}
