import React, { useState } from 'react';
import { NavTab, CaseAlert } from '../../types';
import { api } from '../../services/api';

interface DashboardScreenProps {
  onNavigateTab: (tab: NavTab) => void;
  onOpenExportReport: () => void;
  onOpenAddNote: () => void;
  onOpenNetworkModal: () => void;
  onSelectEntity: (entityId: string) => void;
  alerts: CaseAlert[];
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  onNavigateTab,
  onOpenExportReport,
  onOpenAddNote,
  onOpenNetworkModal,
  onSelectEntity,
  alerts
}) => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isTracing, setIsTracing] = useState(false);
  const [aiPredicting, setAiPredicting] = useState(false);
  const [aiNextMoveResult, setAiNextMoveResult] = useState<any>(null);

  const handleTraceClick = () => {
    setIsTracing(!isTracing);
  };

  const handleRunAiPrediction = async () => {
    setAiPredicting(true);
    try {
      const res = await api.predictNextMove({ entityId: 'P102', caseId: 'INV-2047' });
      setAiNextMoveResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setAiPredicting(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      {/* Hero Header & Status Banner */}
      <div className="relative rounded-[32px] sm:rounded-[40px] overflow-hidden border border-white/10 bg-gradient-to-br from-slate-950/80 via-slate-900/60 to-[#02040a] p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
        <div className="absolute top-0 right-0 p-6 sm:p-8">
          <div className="px-4 py-1.5 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-[11px] font-semibold tracking-widest uppercase text-indigo-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></span>
            ACTIVE STREAM
          </div>
        </div>

        <div className="flex flex-col gap-4 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-semibold px-3 py-1 bg-rose-500/20 text-rose-300 rounded-full border border-rose-500/30 flex items-center gap-1.5 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span> ACTIVE CASE
            </span>
            <span className="text-[11px] font-semibold px-3 py-1 bg-rose-500 text-white rounded-full uppercase tracking-wider shadow-lg shadow-rose-500/20">
              High Risk
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-white tracking-tight leading-tight">
            Suspicious Digital &amp; <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-indigo-200">
              Financial Network
            </span>
          </h2>

          <div className="flex flex-wrap items-center gap-4 mt-2">
            <div className="flex items-center gap-2 px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-xl text-xs font-bold border border-indigo-500/30">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div> 98.4% CORRELATION
            </div>
            <p className="text-slate-400 text-sm">
              Cross-source intelligence synchronized across 5 investigation domains
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mt-8">
          <button
            id="run-ai-next-move-btn"
            onClick={handleRunAiPrediction}
            disabled={aiPredicting}
            className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500 hover:opacity-90 text-white rounded-full text-sm font-bold shadow-xl shadow-indigo-500/25 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {aiPredicting ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                Groq AI Computing Next Move...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">psychology</span>
                Predict Criminal Next Move (Groq AI)
              </>
            )}
          </button>
          <button
            id="case-search-dash-btn"
            onClick={() => onNavigateTab('case-search')}
            className="px-6 py-2.5 bg-white/10 hover:bg-white/15 text-white border border-white/10 rounded-full text-sm font-bold shadow-xl transition-all flex items-center gap-2 cursor-pointer backdrop-blur-md"
          >
            <span className="material-symbols-outlined text-[18px]">manage_search</span> Universal Case Search
          </button>
          <button
            id="export-report-dash-btn"
            onClick={onOpenExportReport}
            className="px-6 py-2.5 bg-white text-slate-900 rounded-full text-sm font-bold shadow-xl hover:bg-slate-200 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">download</span> Export Report
          </button>
        </div>

        {/* AI Next Move Live Card Output */}
        {aiNextMoveResult && (
          <div className="mt-6 p-6 rounded-3xl bg-indigo-950/60 border border-indigo-500/30 text-xs space-y-4 animate-fade-in backdrop-blur-xl">
            <div className="flex justify-between items-center pb-3 border-b border-indigo-500/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-indigo-400">psychology</span>
                <span className="font-bold text-sm text-white">Groq AI Next Move Forecast</span>
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold rounded-full border border-emerald-500/30">
                  {aiNextMoveResult.confidence || 91}% AI Confidence
                </span>
              </div>
              <span className="px-3 py-1 bg-rose-500 text-white font-bold rounded-full text-[10px] uppercase tracking-wider">
                Threat: {aiNextMoveResult.threatLevel || 'CRITICAL'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {aiNextMoveResult.vectors?.map((v: any, idx: number) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white text-xs">{v.title}</span>
                    <span className="text-rose-400 font-bold text-[10px]">{v.timeframe}</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">{v.detail}</p>
                </div>
              ))}
            </div>

            {aiNextMoveResult.preventiveActions && (
              <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-300">
                <span className="font-bold text-white block mb-1">Recommended Interdiction Protocols (Section 91 CrPC)</span>
                <div className="flex flex-wrap gap-2">
                  {aiNextMoveResult.preventiveActions.map((act: string, i: number) => (
                    <span key={i} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-xl text-[11px] text-slate-200">
                      {act}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* KPIs Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Monitored Entities */}
        <div
          onClick={() => onNavigateTab('social')}
          className="bg-white/[0.03] border border-white/10 hover:border-white/20 rounded-3xl p-6 flex flex-col justify-between h-40 shadow-xl transition-all cursor-pointer group backdrop-blur-xl"
        >
          <div className="flex justify-between items-start">
            <div className="text-slate-400 text-xs font-bold uppercase tracking-widest">
              Suspect Entities
            </div>
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[18px]">person</span>
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white tracking-tight">24 Clusters</div>
            <div className="text-xs text-indigo-400 font-medium mt-1">4 Primary Suspect Nodes</div>
          </div>
        </div>

        {/* Flagged CDR Telephony */}
        <div
          onClick={() => onNavigateTab('cdr')}
          className="bg-white/[0.03] border border-white/10 hover:border-white/20 rounded-3xl p-6 flex flex-col justify-between h-40 shadow-xl transition-all cursor-pointer group backdrop-blur-xl"
        >
          <div className="flex justify-between items-start">
            <div className="text-slate-400 text-xs font-bold uppercase tracking-widest">
              Flagged Calls
            </div>
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[18px]">call</span>
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white tracking-tight">312 Logs</div>
            <div className="text-xs text-purple-400 font-medium mt-1">8 BTS Towers Hopped</div>
          </div>
        </div>

        {/* IP Sessions Exfil */}
        <div
          onClick={() => onNavigateTab('ipdr')}
          className="bg-white/[0.03] border border-white/10 hover:border-white/20 rounded-3xl p-6 flex flex-col justify-between h-40 shadow-xl transition-all cursor-pointer group backdrop-blur-xl"
        >
          <div className="flex justify-between items-start">
            <div className="text-slate-400 text-xs font-bold uppercase tracking-widest">
              IPDR Sessions
            </div>
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[18px]">lan</span>
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white tracking-tight">684 IPs</div>
            <div className="text-xs text-amber-400 font-medium mt-1">2.1 GB Exfil Burst</div>
          </div>
        </div>

        {/* Financial Mule Network */}
        <div
          onClick={() => onNavigateTab('bank')}
          className="bg-white/[0.03] border border-white/10 hover:border-white/20 rounded-3xl p-6 flex flex-col justify-between h-40 shadow-xl transition-all cursor-pointer group backdrop-blur-xl"
        >
          <div className="flex justify-between items-start">
            <div className="text-slate-400 text-xs font-bold uppercase tracking-widest">
              Financial Volume
            </div>
            <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[18px]">account_balance</span>
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white tracking-tight">?4.2 Crore</div>
            <div className="text-xs text-rose-400 font-medium mt-1">?1.1Cr Frozen (Sec 102)</div>
          </div>
        </div>
      </div>
    </div>
  );
};
