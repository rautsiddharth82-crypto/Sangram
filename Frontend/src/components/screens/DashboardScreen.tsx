import React from 'react';
import { NavTab, CaseAlert } from '../../types';
import { CASE_METADATA } from '../../data/mockData';

interface DashboardScreenProps {
  alerts: CaseAlert[];
  onNavigateTab: (tab: NavTab) => void;
  onOpenExportReport: () => void;
  onOpenAddNote: () => void;
  onOpenNetworkModal: () => void;
  onSelectEntity: (entityId: string) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  onNavigateTab,
  onOpenExportReport,
  onOpenAddNote,
  onOpenNetworkModal,
  onSelectEntity
}) => {
  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      {/* Header Banner (hero-banner) */}
      <div className="hero-banner flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-slate-900 p-6 sm:p-8 rounded-[32px] border border-white/10 shadow-2xl backdrop-blur-2xl">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold rounded-full uppercase tracking-wider">
              ACTIVE CASE {CASE_METADATA.id}
            </span>
            <span className="px-3 py-1 bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold rounded-full uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
              {CASE_METADATA.riskLevel}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            {CASE_METADATA.title}
          </h2>

          <p className="text-slate-400 text-xs sm:text-sm">
            Cross-source intelligence synchronized across 5 investigation domains
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            id="open-network-topology-btn"
            onClick={onOpenNetworkModal}
            className="px-5 py-2.5 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/30 rounded-2xl font-bold text-xs shadow-xl transition-all flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">account_tree</span>
            Network Graph 360
          </button>

          <button
            id="open-add-note-btn"
            onClick={onOpenAddNote}
            className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 rounded-2xl font-bold text-xs shadow-xl transition-all flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">edit_note</span>
            Add Note
          </button>

          <button
            id="export-court-dossier-btn"
            onClick={onOpenExportReport}
            className="px-5 py-2.5 bg-white text-slate-950 hover:bg-slate-200 rounded-2xl font-bold text-xs shadow-xl transition-all flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">verified</span>
            Sec 63 BSA Dossier
          </button>
        </div>
      </div>

      {/* Primary Intelligence Domains Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* CDR Telephony Card */}
        <div
          onClick={() => onNavigateTab('cdr')}
          className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-indigo-500/50 shadow-xl backdrop-blur-xl space-y-4 cursor-pointer group transition-all"
        >
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">call</span>
            </div>
            <span className="px-2.5 py-0.5 bg-rose-500/20 text-rose-300 text-[10px] font-bold rounded-full border border-rose-500/30">
              312 FLAGGED
            </span>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
              CDR Telephony
            </h3>
            <p className="text-slate-400 text-xs mt-1 leading-relaxed">
              1,842 total intercepts, 8 BTS cell tower hops across Mumbai clusters.
            </p>
          </div>

          <div className="pt-3 border-t border-white/5 flex justify-between items-center text-xs font-semibold text-indigo-400">
            <span>Inspect CDR Logs</span>
            <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </div>
        </div>

        {/* IPDR Cyber Card */}
        <div
          onClick={() => onNavigateTab('ipdr')}
          className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-indigo-500/50 shadow-xl backdrop-blur-xl space-y-4 cursor-pointer group transition-all"
        >
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">lan</span>
            </div>
            <span className="px-2.5 py-0.5 bg-rose-500/20 text-rose-300 text-[10px] font-bold rounded-full border border-rose-500/30">
              47 SUSPICIOUS IPs
            </span>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
              IPDR Cyber Sessions
            </h3>
            <p className="text-slate-400 text-xs mt-1 leading-relaxed">
              4,891 sessions, 2.1 GB VPN upload burst to Singapore exit node.
            </p>
          </div>

          <div className="pt-3 border-t border-white/5 flex justify-between items-center text-xs font-semibold text-purple-400">
            <span>Inspect IPDR Sessions</span>
            <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </div>
        </div>

        {/* Bank & Mule Card */}
        <div
          onClick={() => onNavigateTab('bank')}
          className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-indigo-500/50 shadow-xl backdrop-blur-xl space-y-4 cursor-pointer group transition-all"
        >
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">account_balance</span>
            </div>
            <span className="px-2.5 py-0.5 bg-rose-500/20 text-rose-300 text-[10px] font-bold rounded-full border border-rose-500/30">
              14 MULE ACCS
            </span>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
              Financial &amp; Mule Trails
            </h3>
            <p className="text-slate-400 text-xs mt-1 leading-relaxed">
              ?4.2Cr total volume, ?1.1Cr frozen, 91% cash-out velocity in 105m.
            </p>
          </div>

          <div className="pt-3 border-t border-white/5 flex justify-between items-center text-xs font-semibold text-amber-400">
            <span>Inspect Mule Trails</span>
            <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </div>
        </div>

        {/* Social OSINT Card */}
        <div
          onClick={() => onNavigateTab('social')}
          className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-indigo-500/50 shadow-xl backdrop-blur-xl space-y-4 cursor-pointer group transition-all"
        >
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">public</span>
            </div>
            <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold rounded-full border border-emerald-500/30">
              23 MONITORED
            </span>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
              Social OSINT &amp; Lures
            </h3>
            <p className="text-slate-400 text-xs mt-1 leading-relaxed">
              @quick_jobs_help Telegram channel (4.2K members), Instagram ads.
            </p>
          </div>

          <div className="pt-3 border-t border-white/5 flex justify-between items-center text-xs font-semibold text-emerald-400">
            <span>Inspect OSINT Handles</span>
            <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </div>
        </div>
      </div>

      {/* Main Suspect Node Summary */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-6 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-4">
          <div>
            <h3 className="text-xl font-bold text-white">Target Mastermind Entity Dossier</h3>
            <p className="text-slate-400 text-xs mt-0.5">Primary suspect node identified by unified cross-domain correlation engine</p>
          </div>

          <button
            onClick={() => onSelectEntity('P102')}
            className="px-5 py-2 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/30 rounded-2xl text-xs font-bold flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">account_tree</span>
            Inspect P102 Dossier
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Identity &amp; Phone</span>
            <h4 className="text-base font-bold text-white">P102 — Rajesh K. ("CyberBoss_Raj")</h4>
            <p className="font-mono text-slate-300">+91 99201 88102 (Bharti Airtel)</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Banking Mule Account</span>
            <h4 className="text-base font-bold text-rose-300">Kotak Mahindra #****9281 (A204)</h4>
            <p className="text-slate-300">?1.12Cr total credits • Layer-1 Mule</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Cyber &amp; OSINT Footprint</span>
            <h4 className="text-base font-bold text-indigo-300">@quick_jobs_help (Telegram)</h4>
            <p className="font-mono text-slate-300">49.32.88.19 (NordVPN SG Exit)</p>
          </div>
        </div>
      </div>
    </div>
  );
};
