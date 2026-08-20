import React, { useState } from 'react';
import { IPDR_RECORDS, SUSPICIOUS_IP_EVENTS } from '../../data/mockData';
import { IPDRRecord, SuspiciousIPEvent } from '../../types';
import { LogInspectorModal } from '../modals/LogInspectorModal';

interface IPDRScreenProps {
  onOpenExportReport: () => void;
  onSelectEntity: (entityId: string) => void;
}

export const IPDRScreen: React.FC<IPDRScreenProps> = ({
  onOpenExportReport,
  onSelectEntity
}) => {
  const [activeTabFilter, setActiveTabFilter] = useState<'all' | 'high' | 'suspicious'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectedEvent, setInspectedEvent] = useState<SuspiciousIPEvent | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeContextMenu, setActiveContextMenu] = useState<string | null>(null);

  // Inspector modal state
  const [inspectedIPDRLog, setInspectedIPDRLog] = useState<IPDRRecord | null>(null);

  const filteredIPs = IPDR_RECORDS.filter((rec) => {
    const matchesSearch =
      rec.ipAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.entity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.location.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTabFilter === 'high') return matchesSearch && rec.risk === 'HIGH';
    if (activeTabFilter === 'suspicious') return matchesSearch && rec.status === 'FLAGGED';
    return matchesSearch;
  });

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            IPDR INTELLIGENCE
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Internet Protocol Detail Records &amp; Cyber Session Geolocation
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenExportReport}
            id="export-ipdr-report-btn"
            className="px-6 py-2.5 bg-slate-900 text-white hover:bg-slate-800 rounded-2xl font-bold text-xs shadow-xl transition-all flex items-center gap-2 cursor-pointer border border-slate-700"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Stats Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 flex items-center gap-4 shadow-xl backdrop-blur-xl">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">lan</span>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest block">
              IP Events
            </span>
            <span className="text-3xl font-bold text-white tracking-tight">684</span>
          </div>
        </div>

        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 flex items-center gap-4 shadow-xl backdrop-blur-xl">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">hub</span>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest block">
              Unique IPs
            </span>
            <span className="text-3xl font-bold text-white tracking-tight">86</span>
          </div>
        </div>

        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 flex items-center gap-4 shadow-xl backdrop-blur-xl">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">policy</span>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest block">
              Suspicious
            </span>
            <span className="text-3xl font-bold text-white tracking-tight">12</span>
          </div>
        </div>

        <div className="bg-white/[0.03] border border-l-4 border-l-rose-500 border-white/10 rounded-3xl p-6 flex items-center gap-4 shadow-xl backdrop-blur-xl">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">warning</span>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest block">
              High Risk
            </span>
            <span className="text-3xl font-bold text-rose-400 tracking-tight">6</span>
          </div>
        </div>
      </div>

      {/* Main IP Activity Table */}
      <div className="bg-white/[0.03] border border-white/10 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-2xl">
        <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="font-bold text-lg text-white">IP ACTIVITY</h3>
          <div className="relative w-full sm:w-80">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
              search
            </span>
            <input
              type="text"
              placeholder="Search IP or Entity..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-2xl text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/5 border-b border-white/10 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4 pl-6">TIME</th>
                <th className="p-4">IP ADDRESS</th>
                <th className="p-4">ENTITY</th>
                <th className="p-4">LOCATION</th>
                <th className="p-4">RISK</th>
                <th className="p-4">STATUS</th>
                <th className="p-4 text-right pr-6">ACTION / INSPECT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {filteredIPs.map((rec) => (
                <tr
                  key={rec.id}
                  onClick={() => setInspectedIPDRLog(rec)}
                  className="hover:bg-white/5 transition-colors cursor-pointer group"
                >
                  <td className="p-4 pl-6 font-mono text-slate-200">{rec.time}</td>
                  <td className="p-4 font-mono font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {rec.ipAddress}
                  </td>
                  <td className="p-4 font-bold text-slate-300">{rec.entity}</td>
                  <td className="p-4 text-slate-400 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">location_on</span>
                    {rec.location}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        rec.risk === 'HIGH'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : rec.risk === 'MED'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-slate-700/50 text-slate-300'
                      }`}
                    >
                      {rec.risk}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-rose-400">{rec.status}</td>
                  <td className="p-4 text-right pr-6">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setInspectedIPDRLog(rec);
                      }}
                      className="px-3 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 rounded-xl text-[11px] font-bold flex items-center gap-1 ml-auto cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[14px]">psychology</span>
                      Inspect IP Log
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Log Inspector Modal with Groq AI Reasoning */}
      <LogInspectorModal
        isOpen={!!inspectedIPDRLog}
        onClose={() => setInspectedIPDRLog(null)}
        logType="IPDR"
        logData={inspectedIPDRLog}
        onSelectEntity={onSelectEntity}
      />
    </div>
  );
};
