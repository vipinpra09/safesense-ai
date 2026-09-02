import React from 'react';
import { Link } from 'react-router-dom';
import { AlertOctagon, Home, LayoutDashboard, ArrowLeft } from 'lucide-react';
import { SosButton } from '../components/emergency/SosButton';

export function NotFoundPage() {
  return (
    <div className="max-w-2xl mx-auto py-16 px-4 text-center space-y-6">
      <div className="w-16 h-16 rounded-3xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto text-2xl font-black">
        404
      </div>

      <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
        Page Not Found
      </h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
        The requested page does not exist. If this is an emergency, you can trigger SOS immediately below.
      </p>

      <div className="py-4 flex justify-center">
        <SosButton size="small" />
      </div>

      <div className="flex items-center justify-center gap-4 pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-sm shadow hover:bg-black transition-colors"
        >
          <Home className="w-4 h-4" /> Go to Home
        </Link>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm hover:bg-slate-200 transition-colors"
        >
          <LayoutDashboard className="w-4 h-4" /> Safety Dashboard
        </Link>
      </div>
    </div>
  );
}
