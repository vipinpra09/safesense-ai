import React from 'react';
import { AlertTriangle, AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';

export function UrgencyBadge({ level = 'medium', className = '' }) {
  const normLevel = (level || 'medium').toLowerCase();

  const configs = {
    critical: {
      bg: 'bg-rose-600 text-white border-rose-700',
      icon: ShieldAlert,
      label: 'Critical Urgency — Call 911 Immediately',
      badgeText: 'CRITICAL PRIORITY'
    },
    high: {
      bg: 'bg-red-500 text-white border-red-600',
      icon: AlertCircle,
      label: 'High Urgency — Immediate Attention Required',
      badgeText: 'HIGH URGENCY'
    },
    medium: {
      bg: 'bg-amber-500 text-slate-900 border-amber-600 font-black',
      icon: AlertTriangle,
      label: 'Medium Urgency — Caution & Monitoring',
      badgeText: 'MEDIUM URGENCY'
    },
    low: {
      bg: 'bg-emerald-600 text-white border-emerald-700',
      icon: CheckCircle2,
      label: 'Low Urgency — Stable / Non-critical',
      badgeText: 'LOW URGENCY'
    }
  };

  const config = configs[normLevel] || configs.medium;
  const Icon = config.icon;

  return (
    <span
      role="status"
      aria-label={config.label}
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border shadow-sm ${config.bg} ${className}`}
    >
      <Icon className="w-3.5 h-3.5 shrink-0" />
      <span>{config.badgeText}</span>
    </span>
  );
}
