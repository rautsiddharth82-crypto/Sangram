import React from 'react';
import { CASE_METADATA } from '../data/mockData';
import { CaseAlert } from '../types';
import { useTheme } from '../ThemeContext';

interface TopAppBarProps {
  onToggleMobileMenu?: () => void;
  alerts: CaseAlert[];
  onOpenAlerts?: () => void;
  onOpenSettings?: () => void;
  onOpenAICopilot?: () => void;
  onSelectCase?: (caseId: string) => void;
  onNavigateLanding?: () => void;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  onToggleMobileMenu,
  alerts,
  onOpenAlerts,
  onOpenSettings,
  onOpenAICopilot,
  onNavigateLanding
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-[#02040a]/70 backdrop-blur-2xl border-b border-white/5 flex justify-between items-center h-20 w-full md:pl-[230px] px-8 fixed top-0 left-0 z-40 transition-all duration-200">
      {/* Left side */}
      <div className="flex items-center gap-4">
        {/* Mobile menu toggle */}
        <button
          id="mobile-menu-btn"
          onClick={onToggleMobileMenu}
          aria-label="Menu"
          className="md:hidden p-2 text-slate-400 hover:text-white transition-colors hover:bg-white/5 rounded-xl border border-white/5"
        >
          <span className="material-symbols-outlined text-[20px]">menu</span>
        </button>

        <button
          onClick={onNavigateLanding}
          className="hidden md:flex items-center gap-2 text-left cursor-pointer hover:opacity-80 transition-opacity"
        >
          <span className="text-[18px] font-light tracking-tight text-white">
            Project <span className="font-semibold text-indigo-400">SANGRAM</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold px-2 py-0.5 rounded-full bg-white/[0.03] border border-white/5">
            Command Console
          </span>
        </button>
      </div>

      {/* Center Navigation / Active Case Link */}
      <div className="flex items-center gap-6">
        <nav className="flex gap-4 items-center">
          <button
            id="active-case-btn"
            className="text-indigo-400 font-semibold border-b-2 border-indigo-500 pb-1 text-[12px] uppercase tracking-widest hover:text-indigo-300 transition-colors cursor-pointer"
          >
            {CASE_METADATA.id}
          </button>
          <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-widest hidden sm:inline-flex items-center gap-2 px-3 py-1 bg-rose-500/10 text-rose-300 rounded-full border border-rose-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse"></span>
            LIVE INVESTIGATION
          </span>
        </nav>
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-3">
        {/* Groq AI Engine Button */}
        <button
          id="ai-copilot-btn"
          onClick={onOpenAICopilot}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 hover:from-indigo-500/30 hover:to-purple-500/30 border border-indigo-500/30 text-indigo-300 font-bold text-xs cursor-pointer shadow-lg shadow-indigo-500/10 transition-all"
          title="Open Groq AI Intelligence Engine"
        >
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></span>
          <span className="material-symbols-outlined text-[16px]">psychology</span>
          <span className="hidden sm:inline">Groq AI Engine</span>
        </button>

        {/* Theme Toggle Button */}
        <button
          id="theme-toggle-btn"
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className="text-slate-400 hover:text-white transition-colors p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 cursor-pointer"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          <span className="material-symbols-outlined text-[20px]">
            {theme === 'dark' ? 'light_mode' : 'dark_mode'}
          </span>
        </button>

        <button
          id="notifications-btn"
          onClick={onOpenAlerts}
          aria-label="notifications"
          className="text-slate-400 hover:text-white transition-colors p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 relative cursor-pointer"
          title="Investigation Alerts"
        >
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          {alerts.length > 0 && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-[#02040a]"></span>
          )}
        </button>

        <button
          id="settings-btn"
          onClick={onOpenSettings}
          aria-label="settings"
          className="text-slate-400 hover:text-white transition-colors p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 cursor-pointer"
          title="System Settings"
        >
          <span className="material-symbols-outlined text-[20px]">settings</span>
        </button>

        <div
          id="investigator-profile-avatar"
          className="w-9 h-9 rounded-full bg-slate-800 overflow-hidden border border-white/10 cursor-pointer ml-1 hover:ring-2 hover:ring-indigo-500/50 transition-all shadow-md"
          title={`${CASE_METADATA.investigator.name} (${CASE_METADATA.investigator.role})`}
        >
          <img
            src={CASE_METADATA.investigator.avatar}
            alt="Investigator Profile"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </header>
  );
};
