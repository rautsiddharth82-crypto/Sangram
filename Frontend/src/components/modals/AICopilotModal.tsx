import React, { useState } from 'react';
import { api } from '../../services/api';

interface AICopilotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AICopilotModal: React.FC<AICopilotModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'next-move' | 'cdr' | 'bank' | 'dossier'>('next-move');
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);

  if (!isOpen) return null;

  const handleRunNextMove = async () => {
    setLoading(true);
    setAiResult(null);
    try {
      const res = await api.predictNextMove({ entityId: 'P102', caseId: 'INV-2047' });
      setAiResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleRunCDR = async () => {
    setLoading(true);
    setAiResult(null);
    try {
      const res = await api.analyzeCDR({ target: 'INV-2047', callsIn24h: 312, towerHops: 8 });
      setAiResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleRunBank = async () => {
    setLoading(true);
    setAiResult(null);
    try {
      const res = await api.analyzeBank({ account: 'A204', inflowCount: 45, outflowVelocityPct: 91 });
      setAiResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleRunDossier = async () => {
    setLoading(true);
    setAiResult(null);
    try {
      const res = await api.generateDossier({ caseId: 'INV-2047', officerName: 'Inspector S. Raut' });
      setAiResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-slate-950 rounded-3xl max-w-2xl w-full border border-white/10 shadow-2xl p-6 animate-fade-in flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span className="material-symbols-outlined text-[22px]">psychology</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-base text-white">SANGRAM Groq AI Intelligence Engine</h4>
                <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 text-[10px] font-bold rounded-full border border-indigo-500/30">
                  groq/compound
                </span>
              </div>
              <p className="text-xs text-slate-400">Autonomous Cybercrime Intelligence & Forensic Engine</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* AI Action Tabs */}
        <div className="flex border-b border-white/10 mt-4 overflow-x-auto gap-2">
          <button
            onClick={() => { setActiveTab('next-move'); setAiResult(null); }}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'next-move'
                ? 'bg-indigo-500/20 text-indigo-300 border-b-2 border-indigo-500'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">online_prediction</span>
            Next Move Engine
          </button>

          <button
            onClick={() => { setActiveTab('cdr'); setAiResult(null); }}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'cdr'
                ? 'bg-indigo-500/20 text-indigo-300 border-b-2 border-indigo-500'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">cell_tower</span>
            CDR AI Pattern
          </button>

          <button
            onClick={() => { setActiveTab('bank'); setAiResult(null); }}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'bank'
                ? 'bg-indigo-500/20 text-indigo-300 border-b-2 border-indigo-500'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">account_balance</span>
            Bank Mule Layering
          </button>

          <button
            onClick={() => { setActiveTab('dossier'); setAiResult(null); }}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'dossier'
                ? 'bg-indigo-500/20 text-indigo-300 border-b-2 border-indigo-500'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">gavel</span>
            Sec 63 BSA Dossier
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto py-6 space-y-4 text-xs">
          {activeTab === 'next-move' && (
            <div className="space-y-4">
              <div className="bg-white/[0.02] p-4 rounded-2xl border border-white/5 flex justify-between items-center">
                <div>
                  <h5 className="font-bold text-white text-sm">Predictive "Criminal Next Move" Engine</h5>
                  <p className="text-slate-400 text-xs mt-0.5">Target: P102 (Mastermind Rajesh K.) — Case #INV-2047</p>
                </div>
                <button
                  onClick={handleRunNextMove}
                  disabled={loading}
                  className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-full font-bold shadow-lg shadow-indigo-500/20 flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-[16px]">progress_activity</span>
                      Groq Thinking...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[16px]">bolt</span>
                      Run AI Next Move
                    </>
                  )}
                </button>
              </div>

              {aiResult && (
                <div className="space-y-4 animate-fade-in">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300">
                      <span className="text-[10px] uppercase font-bold tracking-widest block text-rose-400">Predicted Threat Level</span>
                      <span className="text-xl font-bold text-white mt-1 block">{aiResult.threatLevel || 'CRITICAL'}</span>
                      <span className="text-[11px] text-slate-400 mt-1 block">Timeframe: {aiResult.predictedTimestamp || 'Within 4-6 hours'}</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300">
                      <span className="text-[10px] uppercase font-bold tracking-widest block text-indigo-400">AI Confidence Score</span>
                      <span className="text-xl font-bold text-white mt-1 block">{aiResult.confidence || 91}%</span>
                      <span className="text-[11px] text-slate-400 mt-1 block">Algorithm: Groq Behavioral Model</span>
                    </div>
                  </div>

                  {aiResult.vectors && (
                    <div>
                      <span className="font-bold text-slate-300 block mb-2">Predicted Action Vectors</span>
                      <div className="space-y-2">
                        {aiResult.vectors.map((v: any, idx: number) => (
                          <div key={idx} className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-white">{v.title}</span>
                              <span className="px-2 py-0.5 bg-rose-500/20 text-rose-300 text-[10px] font-bold rounded-full">
                                {v.timeframe || 'Immediate'} (Risk: {v.risk}%)
                              </span>
                            </div>
                            <p className="text-slate-400 text-xs">{v.detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {aiResult.preventiveActions && (
                    <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl text-emerald-300">
                      <span className="font-bold text-white block mb-1">Recommended Preventive CrPC Protocol</span>
                      <ul className="list-disc list-inside space-y-1 text-slate-300">
                        {aiResult.preventiveActions.map((act: string, i: number) => (
                          <li key={i}>{act}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'cdr' && (
            <div className="space-y-4">
              <div className="bg-white/[0.02] p-4 rounded-2xl border border-white/5 flex justify-between items-center">
                <div>
                  <h5 className="font-bold text-white text-sm">Groq AI Telephony CDR Risk Analyzer</h5>
                  <p className="text-slate-400 text-xs mt-0.5">312 flagged calls, 8 BTS tower hops analyzed</p>
                </div>
                <button
                  onClick={handleRunCDR}
                  disabled={loading}
                  className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-full font-bold shadow-lg flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? 'Analyzing...' : 'Run CDR Analysis'}
                </button>
              </div>

              {aiResult && (
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-3 animate-fade-in">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white">Telecom Risk Score: {aiResult.telecomRiskScore}/100</span>
                    <span className="px-3 py-1 bg-rose-500 text-white font-bold rounded-full text-xs">
                      {aiResult.riskLevel}
                    </span>
                  </div>
                  <div className="space-y-1 text-slate-300">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Identified Reason Codes</span>
                    {aiResult.reasonCodes?.map((rc: string, i: number) => (
                      <div key={i} className="flex items-center gap-2 text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                        <span>{rc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'bank' && (
            <div className="space-y-4">
              <div className="bg-white/[0.02] p-4 rounded-2xl border border-white/5 flex justify-between items-center">
                <div>
                  <h5 className="font-bold text-white text-sm">Groq AI Financial Mule & Layering Analyzer</h5>
                  <p className="text-slate-400 text-xs mt-0.5">Target: Account A204 (Kotak Mahindra) — ?1.12Cr inflow</p>
                </div>
                <button
                  onClick={handleRunBank}
                  disabled={loading}
                  className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-full font-bold shadow-lg flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? 'Analyzing...' : 'Run Layering Analysis'}
                </button>
              </div>

              {aiResult && (
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-3 animate-fade-in">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white">Bank Mule Score: {aiResult.bankRiskScore}/100</span>
                    <span className="px-3 py-1 bg-rose-500 text-white font-bold rounded-full text-xs">
                      {aiResult.riskLevel}
                    </span>
                  </div>
                  <div className="space-y-1 text-slate-300">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Laundering Signatures</span>
                    {aiResult.reasonCodes?.map((rc: string, i: number) => (
                      <div key={i} className="flex items-center gap-2 text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                        <span>{rc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'dossier' && (
            <div className="space-y-4">
              <div className="bg-white/[0.02] p-4 rounded-2xl border border-white/5 flex justify-between items-center">
                <div>
                  <h5 className="font-bold text-white text-sm">Section 63 BSA Legal Dossier Generator</h5>
                  <p className="text-slate-400 text-xs mt-0.5">Court Certificate Part A & Part B digital signature</p>
                </div>
                <button
                  onClick={handleRunDossier}
                  disabled={loading}
                  className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-full font-bold shadow-lg flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? 'Generating...' : 'Generate Court Dossier'}
                </button>
              </div>

              {aiResult && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 space-y-2 animate-fade-in">
                  <span className="font-bold text-white text-sm">Court Readiness Score: {aiResult.courtReadinessScore}%</span>
                  <p className="text-slate-300 leading-relaxed text-xs">{aiResult.executiveSummary}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-white text-slate-950 hover:bg-slate-200 rounded-full font-bold text-xs shadow-xl cursor-pointer"
          >
            Close AI Console
          </button>
        </div>
      </div>
    </div>
  );
};
