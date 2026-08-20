import React from 'react';
import { CaseAlert } from '../types';
import { useTheme } from '../ThemeContext';

interface TopAppBarProps {
  alerts: CaseAlert[];
  onToggleMobileMenu: () => void;
  onOpenAlerts: () => void;
  onOpenSettings: () => void;
  onOpenAICopilot: () => void;
  onNavigateLanding: () => void;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  alerts,
  onToggleMobileMenu,
  onOpenAlerts,
  onOpenSettings,
  onOpenAICopilot,
  onNavigateLanding
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#02040a]/90 backdrop-blur-xl border-b border-white/10 z-40 px-4 sm:px-6 flex items-center justify-between shadow-2xl">
      {/* Left: Mobile Menu & Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          className="md:hidden p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[22px]">menu</span>
        </button>

        <div
          onClick={onNavigateLanding}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-rose-500 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-[18px]">security</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-wider text-white font-mono group-hover:text-indigo-300 transition-colors">
                SANGRAM
              </span>
              <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[9px] font-bold rounded-full uppercase tracking-widest hidden sm:inline">
                POLICE v1.0
              </span>
            </div>
            <span className="text-[10px] text-slate-400 block -mt-1 font-medium hidden sm:block">
              Cybercrime Intelligence &amp; Analytics Platform
            </span>
          </div>
        </div>
      </div>

      {/* Middle: Active Case Badge */}
      <div className="hidden lg:flex items-center gap-3">
        <button
          id="active-case-btn"
          className="px-3.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs font-semibold text-slate-200 flex items-center gap-2 transition-colors cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Active Case: <strong className="text-white">#INV-2047</strong>
        </button>

        <span className="px-3 py-1 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold rounded-full uppercase flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
          High Risk Fraud Syndicate
        </span>
      </div>

      {/* Right: Controls & AI Copilot */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* AI Intelligence Engine Button */}
        <button
          onClick={onOpenAICopilot}
          title="Open AI Intelligence Engine"
          className="px-3.5 py-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500 hover:from-indigo-600 hover:to-rose-600 text-white rounded-full text-xs font-bold shadow-lg shadow-indigo-500/25 flex items-center gap-1.5 cursor-pointer transition-all hover:scale-105"
        >
          <span className="material-symbols-outlined text-[16px]">bolt</span>
          <span className="hidden sm:inline">AI Intelligence Engine</span>
        </button>

        {/* Theme Toggle (Sun/Moon) */}
        <button
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className="p-2 text-slate-400 hover:text-white rounded-2xl hover:bg-white/5 transition-colors cursor-pointer border border-white/5"
        >
          <span className="material-symbols-outlined text-[20px]">
            {theme === 'dark' ? 'light_mode' : 'dark_mode'}
          </span>
        </button>

        {/* Alerts Bell Button */}
        <button
          onClick={onOpenAlerts}
          className="relative p-2 text-slate-400 hover:text-white rounded-2xl hover:bg-white/5 transition-colors cursor-pointer border border-white/5"
          title="Investigation Alerts"
        >
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          {alerts.length > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-extrabold rounded-full flex items-center justify-center border-2 border-[#02040a]">
              {alerts.length}
            </span>
          )}
        </button>

        {/* Settings Button */}
        <button
          onClick={onOpenSettings}
          className="p-2 text-slate-400 hover:text-white rounded-2xl hover:bg-white/5 transition-colors cursor-pointer border border-white/5"
          title="System Settings"
        >
          <span className="material-symbols-outlined text-[20px]">settings</span>
        </button>
      </div>
    </header>
  );
};
