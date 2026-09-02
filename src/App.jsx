import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { ToastProvider } from './context/ToastContext';
import { ContactsProvider } from './context/ContactsContext';
import { HealthProfileProvider } from './context/HealthProfileContext';
import { HistoryProvider } from './context/HistoryContext';
import { EmergencyProvider } from './context/EmergencyContext';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

// Layout & Global Components
import { SkipLink } from './components/common/SkipLink';
import { AccessibilityBar } from './components/accessibility/AccessibilityBar';
import { Navbar } from './components/common/Navbar';
import { DisclaimerBanner } from './components/common/DisclaimerBanner';
import { Footer } from './components/common/Footer';

// Pages
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { SosPage } from './pages/SosPage';
import { AiAssistantPage } from './pages/AiAssistantPage';
import { ContactsPage } from './pages/ContactsPage';
import { HealthProfilePage } from './pages/HealthProfilePage';
import { HistoryPage } from './pages/HistoryPage';
import { AccessibilityPage } from './pages/AccessibilityPage';
import { NotFoundPage } from './pages/NotFoundPage';

function AppContent() {
  // Bind global keyboard shortcuts (Alt+S, Alt+A, etc.)
  useKeyboardShortcuts();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <SkipLink />
      <AccessibilityBar />
      <Navbar />
      <DisclaimerBanner />

      <main id="main-content" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 focus:outline-none" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/sos" element={<SosPage />} />
          <Route path="/assistant" element={<AiAssistantPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/health" element={<HealthProfilePage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/accessibility" element={<AccessibilityPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AccessibilityProvider>
        <ToastProvider>
          <ContactsProvider>
            <HealthProfileProvider>
              <HistoryProvider>
                <EmergencyProvider>
                  <AppContent />
                </EmergencyProvider>
              </HistoryProvider>
            </HealthProfileProvider>
          </ContactsProvider>
        </ToastProvider>
      </AccessibilityProvider>
    </BrowserRouter>
  );
}
