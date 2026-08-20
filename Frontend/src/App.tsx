import React, { useState, useEffect } from 'react';
import { NavTab, CaseAlert } from './types';
import { INITIAL_ALERTS } from './data/mockData';

import { TopAppBar } from './components/TopAppBar';
import { SideNavBar } from './components/SideNavBar';

import { LandingPageScreen } from './components/screens/LandingPageScreen';
import { DashboardScreen } from './components/screens/DashboardScreen';
import { CaseSearchSummaryScreen } from './components/screens/CaseSearchSummaryScreen';
import { CDRScreen } from './components/screens/CDRScreen';
import { IPDRScreen } from './components/screens/IPDRScreen';
import { BankScreen } from './components/screens/BankScreen';
import { SocialScreen } from './components/screens/SocialScreen';
import { LogInspectionScreen, LogType } from './components/screens/LogInspectionScreen';

import { NetworkModal } from './components/modals/NetworkModal';
import { ExportReportModal } from './components/modals/ExportReportModal';
import { AddNoteModal } from './components/modals/AddNoteModal';
import { EntityDrawer } from './components/modals/EntityDrawer';
import { AlertsDrawer } from './components/modals/AlertsDrawer';
import { SettingsModal } from './components/modals/SettingsModal';
import { AICopilotModal } from './components/modals/AICopilotModal';

export const App: React.FC = () => {
  const [isConsoleMode, setIsConsoleMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const hash = window.location.hash;
      return path.includes('/console') || hash.includes('#/console');
    }
    return false;
  });

  const [activeTab, setActiveTab] = useState<NavTab>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash.includes('#/console')) {
        const tabPart = hash.split('#')[1]?.replace('/console', '').replace('/', '');
        if (['dashboard', 'case-search', 'cdr', 'ipdr', 'bank', 'social', 'log-inspection'].includes(tabPart)) {
          return tabPart as NavTab;
        }
      }
    }
    return 'dashboard';
  });

  // Modal / Drawer state controls
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [networkModalOpen, setNetworkModalOpen] = useState(false);
  const [exportReportModalOpen, setExportReportModalOpen] = useState(false);
  const [addNoteModalOpen, setAddNoteModalOpen] = useState(false);
  const [alertsDrawerOpen, setAlertsDrawerOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [aiCopilotModalOpen, setAiCopilotModalOpen] = useState(false);
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(null);

  // Full Page Log Inspector State
  const [inspectedLogRecord, setInspectedLogRecord] = useState<{ type: LogType; data: any } | null>(null);
  const [previousTab, setPreviousTab] = useState<NavTab>('dashboard');

  // Dynamic Alerts & Notes
  const [alerts, setAlerts] = useState<CaseAlert[]>(INITIAL_ALERTS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/' && !hash.includes('#/console')) {
        setIsConsoleMode(false);
      } else if (path.includes('/console') || hash.includes('#/console')) {
        setIsConsoleMode(true);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToLanding = () => {
    setIsConsoleMode(false);
    window.history.pushState({}, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToConsole = (tab: NavTab = 'dashboard') => {
    setActiveTab(tab);
    setIsConsoleMode(true);
    window.history.pushState({}, '', `/console#${tab}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3000);
  };

  const handleAddNote = (note: { text: string; tag: string }) => {
    const newAlert: CaseAlert = {
      id: `alert-note-${Date.now()}`,
      title: `Analyst Note (${note.tag})`,
      description: note.text,
      timeAgo: 'Just now',
      severity: note.tag === 'FLAGGED' ? 'error' : 'secondary',
      entity: 'P102'
    };
    setAlerts([newAlert, ...alerts]);
    showToast('Investigation note saved to case dossier');
  };

  const handleInspectLog = (type: LogType, record: any) => {
    setPreviousTab(activeTab);
    setInspectedLogRecord({ type, data: record });
    setActiveTab('log-inspection');
    window.history.pushState({}, '', `/console#log-inspection`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If outside authorized console (Landing Page Route '/')
  if (!isConsoleMode) {
    return (
      <>
        <LandingPageScreen
          onEnterApp={(tab) => navigateToConsole(tab || 'dashboard')}
          onOpenNetworkModal={() => setNetworkModalOpen(true)}
          onOpenExportModal={() => setExportReportModalOpen(true)}
        />

        <NetworkModal
          isOpen={networkModalOpen}
          onClose={() => setNetworkModalOpen(false)}
          onSelectEntity={(ent) => {
            setSelectedEntityId(ent);
            navigateToConsole('dashboard');
          }}
        />

        <ExportReportModal
          isOpen={exportReportModalOpen}
          onClose={() => setExportReportModalOpen(false)}
        />
      </>
    );
  }

  // Inside Authorized Investigation Console
  return (
    <div className="min-h-screen bg-[#02040a] text-slate-200 font-sans flex flex-col relative overflow-x-hidden selection:bg-indigo-500/30 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900/90 backdrop-blur-md text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-3 animate-slide-in text-[13px] font-medium">
          <span className="material-symbols-outlined text-emerald-400 text-[20px]">check_circle</span>
          {toastMessage}
        </div>
      )}

      {/* Top Application Bar */}
      <TopAppBar
        alerts={alerts}
        onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        onOpenAlerts={() => setAlertsDrawerOpen(true)}
        onOpenSettings={() => setSettingsModalOpen(true)}
        onOpenAICopilot={() => setAiCopilotModalOpen(true)}
        onNavigateLanding={navigateToLanding}
      />

      {/* Side Navigation Bar */}
      <SideNavBar
        activeTab={activeTab === 'log-inspection' ? previousTab : activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.history.pushState({}, '', `/console#${tab}`);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main Authorized Content Area */}
      <main className="md:pl-[230px] pt-20 flex-1 flex flex-col z-10 relative">
        <div className="w-full max-w-[1440px] mx-auto p-4 sm:p-6 lg:p-8 flex-1">
          {activeTab === 'dashboard' && (
            <DashboardScreen
              alerts={alerts}
              onNavigateTab={(tab) => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenExportReport={() => setExportReportModalOpen(true)}
              onOpenAddNote={() => setAddNoteModalOpen(true)}
              onOpenNetworkModal={() => setNetworkModalOpen(true)}
              onSelectEntity={(ent) => setSelectedEntityId(ent)}
            />
          )}

          {activeTab === 'case-search' && (
            <CaseSearchSummaryScreen
              onSelectEntity={(ent) => setSelectedEntityId(ent)}
              onOpenNetworkModal={() => setNetworkModalOpen(true)}
              onOpenExportModal={() => setExportReportModalOpen(true)}
              onOpenAddNote={() => setAddNoteModalOpen(true)}
              onNavigateTab={(tab) => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {activeTab === 'cdr' && (
            <CDRScreen
              onOpenExportReport={() => setExportReportModalOpen(true)}
              onOpenNetworkModal={() => setNetworkModalOpen(true)}
              onSelectEntity={(ent) => setSelectedEntityId(ent)}
              onInspectLog={(type, rec) => handleInspectLog(type, rec)}
            />
          )}

          {activeTab === 'ipdr' && (
            <IPDRScreen
              onOpenExportReport={() => setExportReportModalOpen(true)}
              onSelectEntity={(ent) => setSelectedEntityId(ent)}
              onInspectLog={(type, rec) => handleInspectLog(type, rec)}
            />
          )}

          {activeTab === 'bank' && (
            <BankScreen
              onOpenExportReport={() => setExportReportModalOpen(true)}
              onSelectEntity={(ent) => setSelectedEntityId(ent)}
              onInspectLog={(type, rec) => handleInspectLog(type, rec)}
            />
          )}

          {activeTab === 'social' && (
            <SocialScreen
              onOpenExportReport={() => setExportReportModalOpen(true)}
              onSelectEntity={(ent) => setSelectedEntityId(ent)}
              onInspectLog={(type, rec) => handleInspectLog(type, rec)}
            />
          )}

          {activeTab === 'log-inspection' && (
            <LogInspectionScreen
              logType={inspectedLogRecord?.type || 'IPDR'}
              logData={inspectedLogRecord?.data}
              onBack={() => {
                setActiveTab(previousTab || 'dashboard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectEntity={(ent) => setSelectedEntityId(ent)}
              onOpenExportReport={() => setExportReportModalOpen(true)}
            />
          )}
        </div>
      </main>

      {/* Overlay Modals & Drawers */}
      <NetworkModal
        isOpen={networkModalOpen}
        onClose={() => setNetworkModalOpen(false)}
        onSelectEntity={(ent) => setSelectedEntityId(ent)}
      />

      <ExportReportModal
        isOpen={exportReportModalOpen}
        onClose={() => setExportReportModalOpen(false)}
      />

      <AddNoteModal
        isOpen={addNoteModalOpen}
        onClose={() => setAddNoteModalOpen(false)}
        onAddNote={handleAddNote}
      />

      <EntityDrawer
        entityId={selectedEntityId}
        onClose={() => setSelectedEntityId(null)}
        onSelectSubEntity={(ent) => setSelectedEntityId(ent)}
      />

      <AlertsDrawer
        isOpen={alertsDrawerOpen}
        onClose={() => setAlertsDrawerOpen(false)}
        alerts={alerts}
        onSelectEntity={(ent) => setSelectedEntityId(ent)}
      />

      <SettingsModal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
      />

      <AICopilotModal
        isOpen={aiCopilotModalOpen}
        onClose={() => setAiCopilotModalOpen(false)}
      />
    </div>
  );
};

export default App;
