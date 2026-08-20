import React, { useState } from 'react';
import { api } from '../../services/api';

export type LogType = 'CDR' | 'IPDR' | 'BANK' | 'SOCIAL';

interface LogInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  logType: LogType;
  logData: any;
  onSelectEntity?: (entityId: string) => void;
}

export const LogInspectorModal: React.FC<LogInspectorModalProps> = ({
  isOpen,
  onClose,
  logType,
  logData,
  onSelectEntity
}) => {
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);

  if (!isOpen || !logData) return null;

  const handleRunAiLogAnalysis = async () => {
    setAiAnalyzing(true);
    setAiAnalysis(null);
    try {
      let res: any = null;
      if (logType === 'CDR') {
        res = await api.analyzeCDR({ target: logData.caller || logData.id, callsIn24h: 312, towerHops: 8 });
      } else if (logType === 'BANK') {
        res = await api.analyzeBank({ account: logData.from || logData.to || logData.id, inflowCount: 45, outflowVelocityPct: 91 });
      } else if (logType === 'IPDR') {
        res = await api.predictNextMove({ entityId: logData.entity || 'P102', caseId: 'INV-2047' });
      } else {
        res = await api.calculateRisk({ telecom: 85, bank: 90, social: 80 });
      }
      setAiAnalysis(res);
    } catch (err) {
      console.error(err);
    } finally {
      setAiAnalyzing(false);
    }
  };

  const getLogTitle = () => {
    switch (logType) {
      case 'CDR': return `CDR Call Log: ${logData.caller} ? ${logData.receiver}`;
      case 'IPDR': return `IPDR Session: ${logData.ipAddress}`;
      case 'BANK': return `Financial Txn: ${logData.transactionId || logData.id}`;
      case 'SOCIAL': return `Social OSINT: ${logData.handle || logData.platform}`;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-slate-950 rounded-3xl max-w-2xl w-full border border-white/10 shadow-2xl p-6 animate-fade-in flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex justify-between items-start pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-lg ${
              logType === 'CDR' ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40' :
              logType === 'IPDR' ? 'bg-amber-600/30 text-amber-300 border border-amber-500/40' :
              logType === 'BANK' ? 'bg-rose-600/30 text-rose-300 border border-rose-500/40' :
              'bg-purple-600/30 text-purple-300 border border-purple-500/40'
            }`}>
              <span className="material-symbols-outlined text-[24px]">
                {logType === 'CDR' ? 'call' : logType === 'IPDR' ? 'lan' : logType === 'BANK' ? 'account_balance' : 'public'}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-base text-white">{getLogTitle()}</h4>
                <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider ${
                  logData.risk === 'HIGH' ? 'bg-rose-500 text-white' :
                  logData.risk === 'MED' || logData.risk === 'MEDIUM' ? 'bg-amber-500 text-slate-950' : 'bg-slate-700 text-slate-200'
                }`}>
                  {logData.risk || 'HIGH'} RISK
                </span>
              </div>
              <p className="text-xs text-slate-400">Timestamp: {logData.time || logData.date || 'Live Log Feed'}</p>
            </div>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto py-5 space-y-5 text-xs">
          {/* Key Parameters Grid */}
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-2">
              Technical Log Forensic Parameters
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {logType === 'CDR' && (
                <>
                  <div className="p-3 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Caller MSISDN</span>
                    <span className="font-mono font-bold text-white text-sm">{logData.caller}</span>
                  </div>
                  <div className="p-3 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Receiver MSISDN</span>
                    <span className="font-mono font-bold text-white text-sm">{logData.receiver}</span>
                  </div>
                  <div className="p-3 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Duration</span>
                    <span className="font-bold text-indigo-300 text-sm">{logData.duration || '3m 12s'}</span>
                  </div>
                  <div className="p-3 bg-white/[0.02] border border-white/5 rounded-2xl col-span-2">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Cell Tower Location</span>
                    <span className="text-slate-200 text-xs">{logData.cellTower || 'TWR-MUM-401 (Nariman Point)'}</span>
                  </div>
                  <div className="p-3 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">IMEI Serial</span>
                    <span className="font-mono text-slate-300 text-xs">{logData.imei || '864920048192031'}</span>
                  </div>
                </>
              )}

              {logType === 'IPDR' && (
                <>
                  <div className="p-3 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">IP Address</span>
                    <span className="font-mono font-bold text-amber-300 text-sm">{logData.ipAddress}</span>
                  </div>
                  <div className="p-3 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Linked Entity</span>
                    <span className="font-bold text-white text-sm">{logData.entity || 'P102'}</span>
                  </div>
                  <div className="p-3 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Geolocation</span>
                    <span className="text-slate-200 text-xs">{logData.location || 'Mumbai (VPN SG)'}</span>
                  </div>
                  <div className="p-3 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Protocol / Port</span>
                    <span className="font-mono text-slate-300 text-xs">{logData.protocol || 'HTTPS'} / {logData.port || 443}</span>
                  </div>
                  <div className="p-3 bg-white/[0.02] border border-white/5 rounded-2xl col-span-2">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Data Transfer Volume</span>
                    <span className="font-bold text-amber-400 text-xs">{logData.bytesTransferred || '2.1 GB upload'}</span>
                  </div>
                </>
              )}

              {logType === 'BANK' && (
                <>
                  <div className="p-3 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">From Source</span>
                    <span className="font-bold text-white text-xs">{logData.from}</span>
                  </div>
                  <div className="p-3 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">To Destination</span>
                    <span className="font-bold text-rose-300 text-xs">{logData.to}</span>
                  </div>
                  <div className="p-3 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Amount</span>
                    <span className="font-bold text-emerald-400 text-sm">{logData.amount}</span>
                  </div>
                  <div className="p-3 bg-white/[0.02] border border-white/5 rounded-2xl col-span-2">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Bank Name / Gateway</span>
                    <span className="text-slate-200 text-xs">{logData.bankName || 'Kotak Mahindra Bank'}</span>
                  </div>
                  <div className="p-3 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Mule Account Flag</span>
                    <span className="font-bold text-rose-400 text-xs">{logData.muleFlag ? 'CONFIRMED MULE' : 'SUSPECTED'}</span>
                  </div>
                </>
              )}

              {logType === 'SOCIAL' && (
                <>
                  <div className="p-3 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Social Handle</span>
                    <span className="font-bold text-indigo-300 text-sm">{logData.handle}</span>
                  </div>
                  <div className="p-3 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Platform</span>
                    <span className="font-bold text-white text-xs">{logData.platform || 'Telegram'}</span>
                  </div>
                  <div className="p-3 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Linked Suspect</span>
                    <span className="font-bold text-white text-xs">{logData.linkedEntity || 'P102'}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Notes or description if present */}
          {logData.notes && (
            <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-300">
              <span className="text-[10px] font-bold uppercase tracking-widest block text-amber-400 mb-0.5">Analyst Note</span>
              <p className="text-slate-200 text-xs">{logData.notes}</p>
            </div>
          )}

          {/* Groq AI Log Intelligence Card */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-indigo-950/80 via-slate-900/90 to-purple-950/80 border border-indigo-500/30 space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-indigo-400 text-[20px]">psychology</span>
                <span className="font-bold text-sm text-white">Groq AI Log Inspection & Reasoning</span>
              </div>

              <button
                onClick={handleRunAiLogAnalysis}
                disabled={aiAnalyzing}
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-full font-bold text-xs shadow-lg shadow-indigo-500/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {aiAnalyzing ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[14px]">progress_activity</span>
                    Groq AI Reasoning...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[14px]">bolt</span>
                    Analyze Log with Groq AI
                  </>
                )}
              </button>
            </div>

            {aiAnalysis ? (
              <div className="space-y-3 pt-2 animate-fade-in border-t border-white/10">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-300 font-medium">AI Forensic Assessment:</span>
                  <span className="px-2.5 py-0.5 bg-rose-500 text-white text-[10px] font-bold rounded-full uppercase">
                    {aiAnalysis.riskLevel || 'CRITICAL ANOMALY'}
                  </span>
                </div>

                {aiAnalysis.reasonCodes && (
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-indigo-300">Detected Crime Signatures</span>
                    <ul className="list-disc list-inside text-slate-300 space-y-0.5">
                      {aiAnalysis.reasonCodes.map((rc: string, i: number) => (
                        <li key={i}>{rc}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {aiAnalysis.recommendation && (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-300">
                    <span className="text-[10px] font-bold uppercase text-emerald-400 block mb-0.5">Recommended Officer Interdiction</span>
                    <p className="text-slate-200 text-xs">{aiAnalysis.recommendation}</p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-slate-400 text-xs italic">
                Click "Analyze Log with Groq AI" to run autonomous LLM reasoning on this specific {logType} entry.
              </p>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-between items-center pt-4 border-t border-white/10">
          {onSelectEntity && logData.entity ? (
            <button
              onClick={() => {
                onSelectEntity(logData.entity);
                onClose();
              }}
              className="px-4 py-2 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/30 rounded-full font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">person</span>
              Inspect Suspect {logData.entity}
            </button>
          ) : <div />}

          <button
            onClick={onClose}
            className="px-5 py-2 bg-white text-slate-950 font-bold text-xs rounded-full hover:bg-slate-200 cursor-pointer"
          >
            Close Log Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
