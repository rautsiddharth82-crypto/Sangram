import React, { useState, useMemo } from 'react';
import { CASES_INTELLIGENCE_DATABASE } from '../../data/mockData';
import { CaseIntelligenceSummary } from '../../types';

interface CaseSearchSummaryScreenProps {
  onSelectEntity: (entityId: string) => void;
  onOpenNetworkModal: () => void;
  onOpenExportModal: () => void;
  onOpenAddNoteModal: () => void;
  onNavigateTab: (tab: 'dashboard' | 'cdr' | 'ipdr' | 'bank' | 'social') => void;
}

export const CaseSearchSummaryScreen: React.FC<CaseSearchSummaryScreenProps> = ({
  onSelectEntity,
  onOpenNetworkModal,
  onOpenExportModal,
  onOpenAddNoteModal,
  onNavigateTab
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomainFilter, setSelectedDomainFilter] = useState<'ALL' | 'CASE' | 'PHONE' | 'BANK' | 'IP' | 'SOCIAL'>('ALL');
  const [selectedCaseId, setSelectedCaseId] = useState<string>('case-2047');

  // Filter cases based on search query
  const matchingCases = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return CASES_INTELLIGENCE_DATABASE;

    return CASES_INTELLIGENCE_DATABASE.filter((c) => {
      const matchNumber = c.caseNumber.toLowerCase().includes(query);
      const matchTitle = c.title.toLowerCase().includes(query);
      const matchCategory = c.category.toLowerCase().includes(query);
      const matchPolice = c.policeStation.toLowerCase().includes(query);
      const matchInvestigator = c.leadInvestigator.toLowerCase().includes(query);
      const matchTokens = c.searchTokens.some((token) => token.toLowerCase().includes(query));
      const matchSuspects = c.keySuspects.some(
        (s) =>
          s.id.toLowerCase().includes(query) ||
          s.name.toLowerCase().includes(query) ||
          (s.phone && s.phone.toLowerCase().includes(query)) ||
          (s.bankAcc && s.bankAcc.toLowerCase().includes(query)) ||
          (s.ip && s.ip.toLowerCase().includes(query)) ||
          (s.social && s.social.toLowerCase().includes(query))
      );

      return (
        matchNumber ||
        matchTitle ||
        matchCategory ||
        matchPolice ||
        matchInvestigator ||
        matchTokens ||
        matchSuspects
      );
    });
  }, [searchQuery]);

  // Active selected case
  const activeCase: CaseIntelligenceSummary = useMemo(() => {
    const found = matchingCases.find((c) => c.id === selectedCaseId);
    if (found) return found;
    return matchingCases[0] || CASES_INTELLIGENCE_DATABASE[0];
  }, [matchingCases, selectedCaseId]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Search Header Banner */}
      <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl relative overflow-hidden">
        {/* Glow orbs */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="material-symbols-outlined text-indigo-400 text-[26px]">manage_search</span>
                <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-white">
                  Universal Case Search &amp; Intelligence Summary
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-400">
                Search across multiple entities (Case ID, Phone/CDR, IMEI, IPDR/IP, Bank A/C, UPI, Telegram/IG handle) to generate instant cross-domain case summaries.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onOpenExportModal}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">print</span>
                Export Summary
              </button>
              <button
                onClick={onOpenNetworkModal}
                className="px-5 py-2 bg-white hover:bg-slate-200 text-slate-950 font-bold rounded-full text-xs shadow-xl flex items-center gap-2 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">hub</span>
                Full Graph
              </button>
            </div>
          </div>

          {/* Search Input Bar */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[22px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Case # (e.g. INV-2047), Suspect ID (P102, P087), Phone (+91 98201...), Bank A/C (A204), IP (103.45...), Handle (@quick_jobs_help)..."
              className="w-full pl-12 pr-28 py-3.5 bg-slate-950/80 border border-white/15 rounded-2xl text-white placeholder:text-slate-500 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 shadow-inner transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white px-2 py-1 text-xs"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Case Switcher Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
              Active Cases:
            </span>
            {CASES_INTELLIGENCE_DATABASE.map((c) => {
              const isSelected = activeCase?.id === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedCaseId(c.id);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 border ${
                    isSelected
                      ? 'bg-indigo-500 text-white border-indigo-400 shadow-lg shadow-indigo-500/20'
                      : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="font-mono font-bold">{c.caseNumber}</span>
                  <span className="truncate max-w-[150px] sm:max-w-none">{c.title.split(' ')[0]}...</span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      c.severity === 'HIGH' ? 'bg-rose-400' : 'bg-amber-400'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {activeCase ? (
        <div className="space-y-6">
          {/* Top Case Overview Card */}
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-white/5">
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xl sm:text-2xl font-mono font-bold text-indigo-300">
                    {activeCase.caseNumber}
                  </span>
                  <span className="px-3 py-1 bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold rounded-full">
                    {activeCase.severity} RISK
                  </span>
                  <span className="px-3 py-1 bg-white/10 text-slate-200 border border-white/10 text-xs font-semibold rounded-full">
                    {activeCase.status}
                  </span>
                  <span className="text-xs text-slate-400">
                    Registered: {activeCase.registeredDate}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-light text-white leading-tight">
                  {activeCase.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
                  {activeCase.summaryNarrative}
                </p>
              </div>

              {/* Readiness Meter & Investigator */}
              <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-4 shrink-0 bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
                <div className="text-left lg:text-right">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Evidentiary Readiness
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-28 sm:w-36 bg-white/10 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-400 rounded-full shadow-sm shadow-emerald-400/50"
                        style={{ width: `${activeCase.evidentialReadinessScore}%` }}
                      />
                    </div>
                    <span className="font-mono text-sm font-bold text-emerald-400">
                      {activeCase.evidentialReadinessScore}%
                    </span>
                  </div>
                </div>

                <div className="text-left lg:text-right border-l lg:border-l-0 lg:border-t border-white/10 pl-4 lg:pl-0 lg:pt-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Investigating Officer
                  </span>
                  <p className="text-xs font-bold text-white mt-0.5">{activeCase.leadInvestigator}</p>
                  <p className="text-[10px] text-slate-400">{activeCase.policeStation}</p>
                </div>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Telephony</span>
                  <span className="material-symbols-outlined text-indigo-400 text-[18px]">call</span>
                </div>
                <p className="text-2xl font-light text-white mt-2">
                  {activeCase.metrics.totalPhoneIntercepts.toLocaleString()}
                </p>
                <span className="text-[11px] text-rose-400 font-semibold">
                  {activeCase.metrics.flaggedCalls} Flagged Burst Calls
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">IPDR &amp; Cyber</span>
                  <span className="material-symbols-outlined text-emerald-400 text-[18px]">lan</span>
                </div>
                <p className="text-2xl font-light text-emerald-400 mt-2">
                  {activeCase.metrics.ipSessions.toLocaleString()}
                </p>
                <span className="text-[11px] text-slate-400 font-semibold">
                  {activeCase.metrics.suspiciousIPs} Suspicious Proxies
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-rose-500/30 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Financial Volume</span>
                  <span className="material-symbols-outlined text-rose-400 text-[18px]">payments</span>
                </div>
                <p className="text-2xl font-light text-rose-400 mt-2">
                  {activeCase.metrics.totalFinancialVolume}
                </p>
                <span className="text-[11px] text-emerald-400 font-semibold">
                  {activeCase.metrics.frozenAmount} Frozen
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-amber-500/30 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Cross Correlation</span>
                  <span className="material-symbols-outlined text-amber-400 text-[18px]">hub</span>
                </div>
                <p className="text-2xl font-light text-amber-400 mt-2">
                  {activeCase.metrics.crossDomainCorrelationConfidence}%
                </p>
                <span className="text-[11px] text-slate-400 font-semibold">
                  {activeCase.metrics.identifiedMuleAccounts} Mules • {activeCase.metrics.socialHandlesMonitored} Handles
                </span>
              </div>
            </div>
          </div>

          {/* 4-Domain Detailed Summary Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* CDR Telephony Summary */}
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-indigo-400">call</span>
                    <h4 className="text-base font-medium text-white">Telephony (CDR) Intelligence</h4>
                  </div>
                  <button
                    onClick={() => onNavigateTab('cdr')}
                    className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold cursor-pointer"
                  >
                    Open CDR Module <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                </div>
                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  <strong>Finding:</strong> {activeCase.domainBreakdown.cdr.keyFinding}
                </p>

                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-white/[0.02] rounded-2xl border border-white/5">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Target Phone Numbers</span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeCase.domainBreakdown.cdr.primaryNumbers.map((num, i) => (
                        <span key={i} className="px-2.5 py-0.5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-[11px] font-mono">
                          {num}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-white/[0.02] rounded-2xl border border-white/5">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Cell Tower Hotspots</span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeCase.domainBreakdown.cdr.cellTowerHotspots.map((twr, i) => (
                        <span key={i} className="px-2.5 py-0.5 bg-white/5 text-slate-300 border border-white/10 rounded-full text-[11px]">
                          {twr}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-slate-400 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-indigo-400 text-[14px]">schedule</span>
                Burst Window: {activeCase.domainBreakdown.cdr.callBurstWindows}
              </div>
            </div>

            {/* IPDR Cyber Summary */}
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-400">lan</span>
                    <h4 className="text-base font-medium text-white">Cyber &amp; IPDR Intercepts</h4>
                  </div>
                  <button
                    onClick={() => onNavigateTab('ipdr')}
                    className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold cursor-pointer"
                  >
                    Open IPDR Module <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                </div>
                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  <strong>Finding:</strong> {activeCase.domainBreakdown.ipdr.keyFinding}
                </p>

                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-white/[0.02] rounded-2xl border border-white/5">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Top Originating IPs</span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeCase.domainBreakdown.ipdr.topOriginatingIPs.map((ip, i) => (
                        <span key={i} className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-[11px] font-mono">
                          {ip}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-white/[0.02] rounded-2xl border border-white/5">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Active VPN / Proxies</span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeCase.domainBreakdown.ipdr.activeVPNs.map((vpn, i) => (
                        <span key={i} className="px-2.5 py-0.5 bg-white/5 text-slate-300 border border-white/10 rounded-full text-[11px]">
                          {vpn}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-slate-400 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-emerald-400 text-[14px]">public</span>
                Geolocations: {activeCase.domainBreakdown.ipdr.geoLocations.join(' • ')}
              </div>
            </div>

            {/* Banking & Mule Flow Summary */}
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-rose-400">payments</span>
                    <h4 className="text-base font-medium text-white">Banking &amp; Mule Trail</h4>
                  </div>
                  <button
                    onClick={() => onNavigateTab('bank')}
                    className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 font-semibold cursor-pointer"
                  >
                    Open Bank Module <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                </div>
                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  <strong>Finding:</strong> {activeCase.domainBreakdown.bank.keyFinding}
                </p>

                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-white/[0.02] rounded-2xl border border-white/5">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Primary Mule Accounts</span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeCase.domainBreakdown.bank.primaryAccounts.map((acc, i) => (
                        <span key={i} className="px-2.5 py-0.5 bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-full text-[11px] font-mono">
                          {acc}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-white/[0.02] rounded-2xl border border-white/5">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Layering Velocity</span>
                    <span className="text-slate-300 text-xs">{activeCase.domainBreakdown.bank.layeringVelocity}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-slate-400 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-rose-400 text-[14px]">currency_exchange</span>
                Crypto Gateway Exit: {activeCase.domainBreakdown.bank.cryptoOffRampDetected ? 'DETECTED (High Velocity)' : 'None Logged'}
              </div>
            </div>

            {/* Social & OSINT Summary */}
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-amber-400">share</span>
                    <h4 className="text-base font-medium text-white">Social &amp; OSINT Footprint</h4>
                  </div>
                  <button
                    onClick={() => onNavigateTab('social')}
                    className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold cursor-pointer"
                  >
                    Open Social Module <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                </div>
                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  <strong>Finding:</strong> {activeCase.domainBreakdown.social.keyFinding}
                </p>

                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-white/[0.02] rounded-2xl border border-white/5">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Monitored Handles &amp; Groups</span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeCase.domainBreakdown.social.targetHandles.map((handle, i) => (
                        <span key={i} className="px-2.5 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-[11px] font-mono">
                          {handle}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-white/[0.02] rounded-2xl border border-white/5">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Recruitment Channels</span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeCase.domainBreakdown.social.recruitmentChannels.map((rec, i) => (
                        <span key={i} className="px-2.5 py-0.5 bg-white/5 text-slate-300 border border-white/10 rounded-full text-[11px]">
                          {rec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-slate-400 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-amber-400 text-[14px]">security</span>
                Credentials Compromised: {activeCase.domainBreakdown.social.compromisedCredentialsCount} records
              </div>
            </div>
          </div>

          {/* Key Suspects & Identified Entities */}
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">group</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Identified Entities &amp; Suspect Network</h3>
                  <p className="text-xs text-slate-400">Click any suspect card to inspect complete cross-source dossier</p>
                </div>
              </div>
              <button
                onClick={onOpenAddNoteModal}
                className="px-4 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">edit_note</span>
                Add Case Note
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {activeCase.keySuspects.map((suspect) => (
                <div
                  key={suspect.id}
                  onClick={() => onSelectEntity(suspect.id)}
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-indigo-500/50 hover:bg-white/5 transition-all cursor-pointer flex flex-col justify-between group shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold flex items-center justify-center text-sm group-hover:scale-105 transition-transform">
                        {suspect.id}
                      </div>
                      <span className="px-2.5 py-0.5 bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold rounded-full">
                        {suspect.risk}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-white group-hover:text-indigo-300 transition-colors">
                      {suspect.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 mb-3 leading-tight">{suspect.role}</p>

                    <div className="space-y-1.5 text-[11px] pt-3 border-t border-white/5 font-mono">
                      {suspect.phone && (
                        <div className="text-slate-300 flex items-center gap-1">
                          <span className="material-symbols-outlined text-indigo-400 text-[13px]">call</span>
                          <span className="truncate">{suspect.phone}</span>
                        </div>
                      )}
                      {suspect.bankAcc && (
                        <div className="text-slate-300 flex items-center gap-1">
                          <span className="material-symbols-outlined text-rose-400 text-[13px]">account_balance</span>
                          <span className="truncate">{suspect.bankAcc}</span>
                        </div>
                      )}
                      {suspect.ip && (
                        <div className="text-slate-300 flex items-center gap-1">
                          <span className="material-symbols-outlined text-emerald-400 text-[13px]">lan</span>
                          <span className="truncate">{suspect.ip}</span>
                        </div>
                      )}
                      {suspect.social && (
                        <div className="text-slate-300 flex items-center gap-1">
                          <span className="material-symbols-outlined text-amber-400 text-[13px]">share</span>
                          <span className="truncate">{suspect.social}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-indigo-400 text-[11px] font-semibold">
                    <span>Inspect Dossier</span>
                    <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Unified Cross-Domain Timeline & Chronology */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">timeline</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">Chronological Event Reconstruction</h3>
                    <p className="text-xs text-slate-400">Step-by-step cross-correlated sequence of events</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {activeCase.timeline.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/5 transition-all"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-xs font-mono font-bold text-indigo-300 shrink-0 mt-0.5">
                        0{idx + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-white">{item.stage}</span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              item.domain === 'CDR'
                                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                                : item.domain === 'IPDR'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : item.domain === 'BANK'
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                : item.domain === 'SOCIAL'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                            }`}
                          >
                            {item.domain}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
                      </div>
                    </div>

                    <div className="sm:text-right shrink-0 pl-12 sm:pl-0">
                      <span className="font-mono text-xs text-indigo-400 font-bold block">{item.time}</span>
                      <span className="text-[10px] text-slate-500">{item.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tactical Actions & Legal Provisions */}
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 pb-4 border-b border-white/5 mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">gavel</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">Actionable Legal Directives</h3>
                    <p className="text-xs text-slate-400">Statutory notices &amp; warrant orders</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {activeCase.tacticalRecommendations.map((rec, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2 hover:border-amber-500/40 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            rec.priority === 'IMMEDIATE'
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse'
                              : rec.priority === 'HIGH'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-white/10 text-slate-300'
                          }`}
                        >
                          {rec.priority}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 font-semibold">{rec.legalSection}</span>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed font-medium">{rec.action}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex gap-2">
                <button
                  onClick={onOpenExportModal}
                  className="w-full py-3 bg-white hover:bg-slate-200 text-slate-950 rounded-full font-bold text-xs shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">download</span>
                  Download Full Legal Dossier
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-12 text-center shadow-2xl backdrop-blur-2xl">
          <span className="material-symbols-outlined text-[48px] text-slate-500 mb-3">search_off</span>
          <h3 className="text-lg font-medium text-white">No Matching Cases Found</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
            No active case or entity matches "{searchQuery}". Try searching for another Case ID (e.g. #INV-2047, #INV-1092, #INV-3011, #INV-4088), suspect ID (P102, P087), or mule account (A204).
          </p>
        </div>
      )}
    </div>
  );
};
