import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ShieldAlert,
  AlertOctagon,
  LayoutDashboard,
  Bot,
  Users,
  HeartPulse,
  History,
  Sliders,
  Menu,
  X,
  PhoneCall
} from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isEmergencyActive, activeSession } = useEmergency();
  const location = useLocation();

  const navLinks = [
    { path: '/sos', label: 'SOS Emergency', icon: AlertOctagon, isSos: true },
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/assistant', label: 'AI Assistant', icon: Bot },
    { path: '/contacts', label: 'Contacts', icon: Users },
    { path: '/health', label: 'Health Profile', icon: HeartPulse },
    { path: '/history', label: 'History', icon: History },
    { path: '/accessibility', label: 'Accessibility', icon: Sliders }
  ];

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
      {/* Active SOS Warning Bar if SOS is running */}
      {isEmergencyActive && (
        <div className="bg-red-600 text-white px-4 py-2 text-center text-sm font-black tracking-wide flex items-center justify-center gap-2 animate-pulse">
          <AlertOctagon className="w-5 h-5 animate-spin" />
          <span>EMERGENCY SOS ACTIVE ({activeSession?.elapsedSeconds || 0}s)</span>
          <Link
            to="/sos"
            className="underline ml-2 bg-white/20 px-2 py-0.5 rounded hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white"
          >
            Open Command Center →
          </Link>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-2.5 focus:outline-none focus:ring-4 focus:ring-rose-400 rounded-xl px-2 py-1 -ml-2"
            aria-label="SafeSense AI Home"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-red-500 flex items-center justify-center text-white shadow-md shadow-rose-500/20">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white tracking-tight">
                  SafeSense<span className="text-rose-600 dark:text-rose-500">AI</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 px-1.5 py-0.5 rounded">
                  Instant
                </span>
              </div>
              <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 -mt-0.5 hidden sm:block">
                Immediate Assistive Health & Safety
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;

              if (link.isSos) {
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="ml-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-extrabold text-white bg-red-600 hover:bg-red-700 shadow-md shadow-red-600/25 active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-400 transition-all"
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                );
              }

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isActive
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              to="/sos"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-black text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              <AlertOctagon className="w-3.5 h-3.5" /> SOS
            </Link>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle main menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <nav
          className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-1.5 shadow-xl animate-fadeIn"
          aria-label="Mobile Navigation"
        >
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;

            if (link.isSos) {
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 w-full p-3 rounded-xl font-extrabold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-400 text-center uppercase tracking-wide"
                >
                  <Icon className="w-5 h-5" />
                  {link.label}
                </Link>
              );
            }

            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-base transition-colors ${
                  isActive
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                {link.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
