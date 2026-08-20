import React from 'react';
import { NavTab } from '../types';

interface SideNavBarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

interface NavItem {
  id: NavTab;
  label: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'case-search', label: 'Case 360 Search', icon: 'manage_search' },
  { id: 'cdr', label: 'CDR Telephony', icon: 'call' },
  { id: 'ipdr', label: 'IPDR Cyber', icon: 'lan' },
  { id: 'bank', label: 'Bank & Mule', icon: 'account_balance' },
  { id: 'social', label: 'Social OSINT', icon: 'public' }
];

export const SideNavBar: React.FC<SideNavBarProps> = ({
  activeTab,
  onSelectTab,
  mobileOpen = false,
  onCloseMobile
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-40 md:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        id="main-sidebar"
        className={`fixed left-0 top-0 h-full w-[230px] bg-[#02040a]/80 backdrop-blur-2xl border-r border-white/5 flex flex-col z-50 transition-transform duration-200 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white">
              <span className="material-symbols-outlined fill text-[22px]">shield</span>
            </div>
            <div>
              <h1 className="text-[18px] font-medium text-white leading-tight tracking-tight">
                SANGRAM
              </h1>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                Intel Intelligence
              </p>
            </div>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 overflow-y-auto py-6 px-3">
          <ul className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <li key={item.id}>
                  <button
                    id={`nav-item-${item.id}`}
                    onClick={() => {
                      onSelectTab(item.id);
                      if (onCloseMobile) onCloseMobile();
                    }}
                    className={`w-full flex items-center gap-3 py-3 px-4 rounded-xl transition-all duration-200 text-left cursor-pointer border ${
                      isActive
                        ? 'bg-white/10 border-white/10 text-white font-medium shadow-lg shadow-indigo-500/10'
                        : 'border-transparent text-slate-400 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-[20px] ${
                        isActive ? 'text-indigo-400' : 'text-slate-400'
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="text-[13px] tracking-wide">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Active System Status Footer */}
        <div className="p-4 border-t border-white/5 bg-white/[0.01]">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Feed Synced
            </span>
            <span className="font-mono text-[10px] text-slate-500">v4.2.0</span>
          </div>
        </div>
      </aside>
    </>
  );
};
