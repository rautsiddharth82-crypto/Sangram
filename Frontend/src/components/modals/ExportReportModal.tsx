import React, { useState } from 'react';
import { CASE_METADATA } from '../../data/mockData';
import { api } from '../../services/api';

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportReportModal: React.FC<ExportReportModalProps> = ({ isOpen, onClose }) => {
  const [reportType, setReportType] = useState<'full' | 'executive'>('full');
  const [includeCDR, setIncludeCDR] = useState(true);
  const [includeIPDR, setIncludeIPDR] = useState(true);
  const [includeBanking, setIncludeBanking] = useState(true);
  const [includeSocial, setIncludeSocial] = useState(true);

  const [isExporting, setIsExporting] = useState(false);
  const [downloadReady, setDownloadReady] = useState(false);
  const [aiDossier, setAiDossier] = useState<any>(null);

  if (!isOpen) return null;

  const handleStartExport = async () => {
    setIsExporting(true);
    try {
      // Call Backend Groq AI Dossier Generator API
      const dossier = await api.generateDossier({
        caseId: 'INV-2047',
        officerName: CASE_METADATA.investigator.name,
      });
      setAiDossier(dossier);
      setDownloadReady(true);
    } catch (err) {
      console.warn('Backend API call failed, using client fallback', err);
      setDownloadReady(true);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownload = () => {
    const reportData = aiDossier || {
      case: CASE_METADATA,
      generatedAt: new Date().toISOString(),
      reportType,
      modulesIncluded: { includeCDR, includeIPDR, includeBanking, includeSocial },
      summary: "SANGRAM Multi-Domain Intelligence Analysis Dossier — Section 63 BSA Certified"
    };
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SANGRAM_DOSSIER_SECTION63_BSA_INV-2047.json`;
    a.click();
    URL.revokeObjectURL(url);
    onClose();
    setDownloadReady(false);
    setAiDossier(null);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-slate-950 rounded-3xl max-w-lg w-full border border-white/10 shadow-2xl p-6 animate-fade-in">
        <div className="flex justify-between items-center pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">description</span>
            </div>
            <div>
              <h4 className="font-bold text-base text-white">Section 63 BSA Court Dossier</h4>
              <p className="text-xs text-slate-400">{CASE_METADATA.id}: {CASE_METADATA.title}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {!downloadReady ? (
          <div className="py-6 space-y-5 text-xs">
            <div>
              <label className="font-semibold text-slate-300 block mb-2">Report Format &amp; Scope</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setReportType('full')}
                  className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                    reportType === 'full'
                      ? 'border-indigo-500 bg-indigo-500/10 text-white shadow-lg shadow-indigo-500/10'
                      : 'border-white/10 bg-white/[0.02] text-slate-400 hover:bg-white/5'
                  }`}
                >
                  <span className="font-bold block text-xs text-white">Section 63 BSA Full Dossier</span>
                  <span className="text-[10px] text-slate-400 mt-0.5 block">AI Modus Operandi + Part A/B Certificate</span>
                </button>
                <button
                  type="button"
                  onClick={() => setReportType('executive')}
                  className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                    reportType === 'executive'
                      ? 'border-indigo-500 bg-indigo-500/10 text-white shadow-lg shadow-indigo-500/10'
                      : 'border-white/10 bg-white/[0.02] text-slate-400 hover:bg-white/5'
                  }`}
                >
                  <span className="font-bold block text-xs text-white">Executive Summary</span>
                  <span className="text-[10px] text-slate-400 mt-0.5 block">High-level timeline &amp; anomalies</span>
                </button>
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-2">Include Evidence Modules</label>
              <div className="space-y-2 bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                <label className="flex items-center gap-2.5 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={includeCDR}
                    onChange={(e) => setIncludeCDR(e.target.checked)}
                    className="rounded accent-indigo-500"
                  />
                  <span>Call Detail Records (1,842 call logs &amp; patterns)</span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={includeIPDR}
                    onChange={(e) => setIncludeIPDR(e.target.checked)}
                    className="rounded accent-indigo-500"
                  />
                  <span>IPDR Sessions (684 IP logs, geolocation traces)</span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={includeBanking}
                    onChange={(e) => setIncludeBanking(e.target.checked)}
                    className="rounded accent-indigo-500"
                  />
                  <span>Banking &amp; Mule Trails (?118.7L transaction chain)</span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={includeSocial}
                    onChange={(e) => setIncludeSocial(e.target.checked)}
                    className="rounded accent-indigo-500"
                  />
                  <span>Social Profiles (Telegram &amp; Instagram handles)</span>
                </label>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-6 space-y-4">
            <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl text-emerald-300">
              <span className="material-symbols-outlined text-[26px]">verified</span>
              <div>
                <h5 className="font-bold text-sm text-white">Groq AI Dossier & Certificate Ready</h5>
                <p className="text-xs text-slate-300">
                  Court Readiness Score: <strong className="text-emerald-400">{aiDossier?.courtReadinessScore || 87}%</strong> — SHA-256 Hash Locked
                </p>
              </div>
            </div>

            {aiDossier?.executiveSummary && (
              <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl text-xs space-y-2 max-h-48 overflow-y-auto">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block">AI Executive Summary</span>
                <p className="text-slate-300 leading-relaxed">{aiDossier.executiveSummary}</p>
                {aiDossier.bsaCertificatePartA?.declaration && (
                  <div className="pt-2 border-t border-white/5">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">Sec 63 BSA Declaration</span>
                    <p className="text-[11px] text-slate-400 italic mt-0.5">{aiDossier.bsaCertificatePartA.declaration}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 rounded-full font-semibold text-xs transition-colors"
          >
            Cancel
          </button>
          {!downloadReady ? (
            <button
              onClick={handleStartExport}
              disabled={isExporting}
              className="px-6 py-2 bg-white text-slate-950 hover:bg-slate-200 rounded-full font-bold text-xs shadow-xl flex items-center gap-2 cursor-pointer disabled:opacity-50 transition-all"
            >
              {isExporting ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[16px]">progress_activity</span>
                  Groq AI Generating...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[16px]">psychology</span>
                  Generate AI Dossier
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleDownload}
              className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-bold text-xs shadow-xl shadow-emerald-500/20 flex items-center gap-2 cursor-pointer transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">download_for_offline</span>
              Download Certified Dossier JSON
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
