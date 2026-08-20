import React, { useState } from 'react';
import { api } from '../../services/api';

interface AICopilotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AICopilotModal: React.FC<AICopilotModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'predict' | 'cdr' | 'bank' | 'dossier'>('predict');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  // Form Inputs
  const [entityId, setEntityId] = useState('P102');
  const [cdrTarget, setCdrTarget] = useState('+91 99201 88102');
  const [bankAccount, setBankAccount] = useState('Kotak XXXX9281');

  if (!isOpen) return null;

  const handleRunPredict = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await api.predictNextMove({ entityId, caseId: 'INV-2047' });
      setResult(res);
    } catch (e: any) {
      setResult({ error: e.message || 'Failed to execute AI Next-Move Engine' });
    } finally {
      setLoading(false);
    }
  };

  const handleRunCDR = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await api.analyzeCDR({ target: cdrTarget, callsIn24h: 312, towerHops: 8 });
      setResult(res);
    } catch (e: any) {
      setResult({ error: e.message });
    } finally {
      setLoading(false);
    }
  };

  const handleRunBank = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await api.analyzeBank({ account: bankAccount, inflowCount: 45, outflowVelocityPct: 91 });
      setResult(res);
    } catch (e: any) {
      setResult({ error: e.message });
    } finally {
      setLoading(false);
    }
  };

  const handleRunDossier = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await api.generateDossier({ caseId: 'INV-2047', officerName: 'Inspector S. Raut' });
      setResult(res);
    } catch (e: any) {
      setResult({ error: e.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-slate-950 rounded-3xl max-w-4xl w-full border border-white/10 shadow-2xl p-6 sm:p-8 animate-fade-in flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span className="material-symbols-outlined text-[22px]">bolt</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-white">Sangram AI Intelligence Engine</h3>
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold rounded-full border border-emerald-500/30">
                  LIVE MODEL
                </span>
              </div>
              <p className="text-xs text-slate-400">Autonomous LLM Reasoning for Cybercrime Interdiction</p>
            </div>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-white p-2">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-white/10 mt-4 gap-2">
          <button
            onClick={() => { setActiveTab('predict'); setResult(null); }}
            className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'predict' ? 'border-indigo-500 text-indigo-300' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            ?? Criminal Next Move Engine
          </button>
          <button
            onClick={() => { setActiveTab('cdr'); setResult(null); }}
            className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'cdr' ? 'border-indigo-500 text-indigo-300' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            ?? CDR Call Vector AI
          </button>
          <button
            onClick={() => { setActiveTab('bank'); setResult(null); }}
            className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'bank' ? 'border-indigo-500 text-indigo-300' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            ?? Financial Mule AI
          </button>
          <button
            onClick={() => { setActiveTab('dossier'); setResult(null); }}
            className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'dossier' ? 'border-indigo-500 text-indigo-300' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            ?? Sec 63 BSA Court Dossier
          </button>
        </div>

        {/* Form Controls & Execution */}
        <div className="py-6 flex-1 overflow-y-auto space-y-6">
          {activeTab === 'predict' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm">Target Suspect Entity</h4>
                  <p className="text-xs text-slate-400">Select entity to compute next criminal move probability</p>
                </div>
                <input
                  type="text"
                  value={entityId}
                  onChange={(e) => setEntityId(e.target.value)}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-2xl text-xs text-white outline-none w-48 font-mono"
                />
              </div>

              <button
                onClick={handleRunPredict}
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-2xl font-bold text-xs shadow-xl cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[16px]">progress_activity</span>
                    AI Engine Computing...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[16px]">bolt</span>
                    Execute Next-Move Prediction
                  </>
                )}
              </button>
            </div>
          )}

          {activeTab === 'cdr' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm">Target Phone / SIM Box MSISDN</h4>
                  <p className="text-xs text-slate-400">Analyze telephony burst vector signatures</p>
                </div>
                <input
                  type="text"
                  value={cdrTarget}
                  onChange={(e) => setCdrTarget(e.target.value)}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-2xl text-xs text-white outline-none w-56 font-mono"
                />
              </div>

              <button
                onClick={handleRunCDR}
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-2xl font-bold text-xs shadow-xl cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? 'Analyzing CDR Intercepts...' : 'Run CDR Vector Analysis'}
              </button>
            </div>
          )}

          {activeTab === 'bank' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm">Target Bank Mule Account</h4>
                  <p className="text-xs text-slate-400">Detect multi-tier cashout layering velocity</p>
                </div>
                <input
                  type="text"
                  value={bankAccount}
                  onChange={(e) => setBankAccount(e.target.value)}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-2xl text-xs text-white outline-none w-56 font-mono"
                />
              </div>

              <button
                onClick={handleRunBank}
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white rounded-2xl font-bold text-xs shadow-xl cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? 'Analyzing Bank Mule Layering...' : 'Run Financial Mule Analysis'}
              </button>
            </div>
          )}

          {activeTab === 'dossier' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-300">
                Generate official court dossier with Section 63 BSA Part A &amp; Part B Certificates.
              </p>
              <button
                onClick={handleRunDossier}
                disabled={loading}
                className="w-full py-3 bg-white text-slate-950 hover:bg-slate-200 rounded-2xl font-bold text-xs shadow-xl cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? 'Generating Sec 63 BSA Dossier...' : 'Generate Sec 63 BSA Court Certificate'}
              </button>
            </div>
          )}

          {/* AI Result Card Display */}
          {result && (
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3 text-xs animate-fade-in">
              <div className="flex justify-between items-center pb-2 border-b border-white/10">
                <span className="font-bold text-indigo-300">AI Intelligence Output</span>
                <span className="text-[10px] text-slate-400 font-mono">Response Status: OK</span>
              </div>
              <pre className="p-4 bg-black/60 rounded-xl text-[11px] font-mono text-slate-200 overflow-x-auto leading-relaxed border border-white/5 whitespace-pre-wrap">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 rounded-2xl font-bold text-xs transition-colors cursor-pointer"
          >
            Close Engine Modal
          </button>
        </div>
      </div>
    </div>
  );
};
