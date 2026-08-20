import React, { useState, useMemo } from 'react';
import { CDR_RECORDS, CALL_PATTERNS } from '../../data/mockData';
import { CDRRecord } from '../../types';
import { LogInspectorModal } from '../modals/LogInspectorModal';

interface CDRScreenProps {
  onOpenExportReport: () => void;
  onOpenNetworkModal: () => void;
  onSelectEntity: (entityId: string) => void;
  onInspectRecord?: (record: CDRRecord) => void;
}

export const CDRScreen: React.FC<CDRScreenProps> = ({
  onOpenExportReport,
  onOpenNetworkModal,
  onSelectEntity,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRisk, setFilterRisk] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'time' | 'duration' | 'risk'>('time');
  const [sortAsc, setSortAsc] = useState(false);

  // Inspector modal state
  const [inspectedLog, setInspectedLog] = useState<CDRRecord | null>(null);

  const filteredRecords = useMemo(() => {
    return CDR_RECORDS.filter((rec) => {
      const matchesSearch =
        rec.caller.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.receiver.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.time.includes(searchQuery);
      const matchesRisk = filterRisk === 'ALL' || rec.risk === filterRisk;
      return matchesSearch && matchesRisk;
    }).sort((a, b) => {
      if (sortBy === 'time') {
        return sortAsc ? a.time.localeCompare(b.time) : b.time.localeCompare(a.time);
      }
      if (sortBy === 'risk') {
        const weight: Record<string, number> = { HIGH: 3, MED: 2, LOW: 1 };
        return sortAsc ? weight[a.risk] - weight[b.risk] : weight[b.risk] - weight[a.risk];
      }
      return 0;
    });
  }, [searchQuery, filterRisk, sortBy, sortAsc]);

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            CDR TELEPHONY INTELLIGENCE
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Real-time call detail records, SIM-box cluster signatures &amp; tower correlation
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenExportReport}
            className="px-5 py-2.5 bg-white text-slate-950 font-bold text-xs rounded-full shadow-lg hover:bg-slate-200 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            Export Dossier
          </button>
        </div>
      </div>

      {/* Call Patterns Bento */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {CALL_PATTERNS.map((pattern) => (
          <div
            key={pattern.id}
            className="p-5 rounded-3xl bg-white/[0.03] border border-white/10 shadow-xl backdrop-blur-xl flex flex-col justify-between"
          >
            <div className="flex justify-between items-start mb-3">
              <span className="material-symbols-outlined text-indigo-400 text-[24px]">
                {pattern.icon}
              </span>
              {pattern.badge && (
                <span className="px-2.5 py-0.5 bg-rose-500/20 text-rose-300 text-[10px] font-bold rounded-full border border-rose-500/30">
                  {pattern.badge}
                </span>
              )}
            </div>
            <div>
              <h4 className="font-bold text-white text-sm mb-1">{pattern.title}</h4>
              <p className="text-slate-400 text-xs leading-relaxed">{pattern.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CDR Records Table */}
      <div className="bg-white/[0.03] border border-white/10 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-2xl">
        <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <h3 className="font-bold text-lg text-white">Call Detail Records</h3>
            <span className="px-2.5 py-0.5 bg-indigo-500/20 text-indigo-300 text-xs font-bold rounded-full border border-indigo-500/30">
              {filteredRecords.length} Logs
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
                search
              </span>
              <input
                type="text"
                placeholder="Search caller, receiver..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-2xl text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500"
              />
            </div>

            <select
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value)}
              className="px-3 py-2 bg-white/5 border border-white/10 rounded-2xl text-xs text-slate-200 outline-none cursor-pointer"
            >
              <option value="ALL" className="bg-slate-900">All Risks</option>
              <option value="HIGH" className="bg-slate-900">High Risk</option>
              <option value="MED" className="bg-slate-900">Med Risk</option>
              <option value="LOW" className="bg-slate-900">Low Risk</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/5 border-b border-white/10 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4 pl-6">Time</th>
                <th className="p-4">Caller</th>
                <th className="p-4">Receiver</th>
                <th className="p-4">Duration</th>
                <th className="p-4">Risk Level</th>
                <th className="p-4">Cell Tower</th>
                <th className="p-4 text-right pr-6">Action / Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {filteredRecords.map((rec) => (
                <tr
                  key={rec.id}
                  onClick={() => setInspectedLog(rec)}
                  className="hover:bg-white/5 transition-colors cursor-pointer group"
                >
                  <td className="p-4 pl-6 font-mono font-semibold text-slate-200">{rec.time}</td>
                  <td className="p-4 font-mono font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {rec.caller}
                  </td>
                  <td className="p-4 font-mono font-bold text-slate-300">{rec.receiver}</td>
                  <td className="p-4">{rec.duration}</td>
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
                  <td className="p-4 text-slate-400 max-w-xs truncate">{rec.cellTower || 'TWR-MUM-401'}</td>
                  <td className="p-4 text-right pr-6">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setInspectedLog(rec);
                      }}
                      className="px-3 py-1 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/30 rounded-xl text-[11px] font-bold flex items-center gap-1 ml-auto cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[14px]">psychology</span>
                      Inspect Log
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
        isOpen={!!inspectedLog}
        onClose={() => setInspectedLog(null)}
        logType="CDR"
        logData={inspectedLog}
        onSelectEntity={onSelectEntity}
      />
    </div>
  );
};
