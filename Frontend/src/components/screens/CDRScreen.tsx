import React, { useState, useMemo } from 'react';
import { CDR_RECORDS, CALL_PATTERNS } from '../../data/mockData';
import { CDRRecord } from '../../types';

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
  onInspectRecord
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRisk, setFilterRisk] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'time' | 'duration' | 'risk'>('time');
  const [sortAsc, setSortAsc] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<CDRRecord | null>(null);

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

  const handleRowClick = (rec: CDRRecord) => {
    setSelectedRecord(rec);
    if (onInspectRecord) onInspectRecord(rec);
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      {/* Page Header */}
      <div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-white mb-1">
              CDR <span className="font-medium text-indigo-400">INTELLIGENCE</span>
            </h2>
            <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
              Call Detail Record Investigation &amp; Intercept Matrix
            </p>
          </div>
          <div className="flex gap-3">
            <button
              id="cdr-export-btn"
              onClick={onOpenExportReport}
              className="px-6 py-2.5 bg-white text-slate-900 rounded-full text-xs uppercase tracking-wider font-bold shadow-xl hover:bg-slate-200 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">download</span> Export Report
            </button>
          </div>
        </div>

        {/* Case Context Bar */}
        <div className="bg-white/[0.03] border border-white/10 border-l-4 border-l-indigo-500 rounded-3xl p-6 flex flex-col md:flex-row justify-between items-center gap-4 shadow-xl backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">folder_special</span>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Active Case Context
              </p>
              <p className="text-sm font-medium text-white">
                #INV-2047: Suspicious Digital &amp; Financial Network
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span> ACTIVE
            </span>
            <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 px-3.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
              <span className="material-symbols-outlined text-[14px]">warning</span> HIGH RISK
            </span>
          </div>
        </div>
      </div>

      {/* KPIs Bento */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 flex flex-col justify-between h-36 shadow-xl backdrop-blur-xl">
          <div className="flex justify-between items-start">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Total Calls
            </p>
            <span className="material-symbols-outlined text-indigo-400 text-[18px]">call</span>
          </div>
          <p className="text-3xl font-light text-white leading-none">1,842</p>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="w-4/5 h-full bg-indigo-400 rounded-full"></div>
          </div>
        </div>

        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 flex flex-col justify-between h-36 shadow-xl backdrop-blur-xl">
          <div className="flex justify-between items-start">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Suspicious
            </p>
            <span className="material-symbols-outlined text-amber-400 text-[18px]">policy</span>
          </div>
          <p className="text-3xl font-light text-white leading-none">126</p>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="w-2/5 h-full bg-amber-400 rounded-full"></div>
          </div>
        </div>

        <div className="bg-white/[0.03] border border-rose-500/30 rounded-3xl p-6 flex flex-col justify-between h-36 shadow-xl backdrop-blur-xl bg-rose-500/[0.02]">
          <div className="flex justify-between items-start">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              High Risk
            </p>
            <span className="material-symbols-outlined text-rose-400 text-[18px]">gavel</span>
          </div>
          <p className="text-3xl font-light text-rose-400 leading-none">17</p>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="w-1/2 h-full bg-rose-400 rounded-full"></div>
          </div>
        </div>

        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 flex flex-col justify-between h-36 shadow-xl backdrop-blur-xl">
          <div className="flex justify-between items-start">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Avg Duration
            </p>
            <span className="material-symbols-outlined text-emerald-400 text-[18px]">timer</span>
          </div>
          <p className="text-3xl font-light text-white leading-none">3m 42s</p>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="w-3/5 h-full bg-emerald-400 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Call Records Table (Spans 8 cols) */}
        <div className="lg:col-span-8 bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden flex flex-col shadow-2xl backdrop-blur-2xl min-h-[520px]">
          <div className="p-6 border-b border-white/5 flex flex-wrap justify-between items-center gap-4 bg-white/[0.01]">
            <h3 className="text-lg font-medium text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-indigo-400">list_alt</span> CALL RECORDS
            </h3>
            <div className="flex items-center gap-3">
              {/* Search input */}
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-[16px]">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Filter caller / receiver..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-full text-slate-200 placeholder:text-slate-500 outline-none focus:border-indigo-500 w-48 transition-all"
                />
              </div>

              {/* Risk Filter toggle */}
              <select
                value={filterRisk}
                onChange={(e) => setFilterRisk(e.target.value)}
                className="text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-slate-300 outline-none cursor-pointer"
              >
                <option value="ALL" className="bg-slate-900 text-slate-200">All Risks</option>
                <option value="HIGH" className="bg-slate-900 text-rose-300">High Risk</option>
                <option value="MED" className="bg-slate-900 text-amber-300">Medium Risk</option>
                <option value="LOW" className="bg-slate-900 text-slate-300">Low Risk</option>
              </select>

              <button
                onClick={() => {
                  setSortBy('time');
                  setSortAsc(!sortAsc);
                }}
                aria-label="Sort"
                title="Toggle Time Sort"
                className="text-slate-400 hover:text-white transition-colors p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">sort</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02] text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <th className="py-4 px-6">Time</th>
                  <th className="py-4 px-6">Caller</th>
                  <th className="py-4 px-6">Receiver</th>
                  <th className="py-4 px-6">Duration</th>
                  <th className="py-4 px-6">Risk</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-300 divide-y divide-white/5">
                {filteredRecords.map((rec) => (
                  <tr
                    key={rec.id}
                    onClick={() => handleRowClick(rec)}
                    className="hover:bg-white/[0.04] transition-colors cursor-pointer group"
                  >
                    <td className="py-4 px-6 text-slate-400 whitespace-nowrap font-mono text-xs">
                      {rec.time}
                    </td>
                    <td className="py-4 px-6 font-semibold">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectEntity(rec.caller);
                        }}
                        className={`hover:underline cursor-pointer ${
                          rec.caller === 'U405' ? 'text-rose-400' : 'text-white'
                        }`}
                      >
                        {rec.caller}
                      </button>
                    </td>
                    <td className="py-4 px-6 font-semibold">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectEntity(rec.receiver);
                        }}
                        className={`hover:underline cursor-pointer ${
                          rec.receiver === 'P304' ? 'text-amber-400' : 'text-white'
                        }`}
                      >
                        {rec.receiver}
                      </button>
                    </td>
                    <td className="py-4 px-6 text-slate-400 text-xs">{rec.duration}</td>
                    <td className="py-4 px-6">
                      {rec.risk === 'HIGH' && (
                        <span className="inline-flex items-center gap-1.5 bg-rose-500/20 border border-rose-500/30 text-rose-300 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span> HIGH
                        </span>
                      )}
                      {rec.risk === 'MED' && (
                        <span className="inline-flex items-center gap-1.5 bg-amber-500/20 border border-amber-500/30 text-amber-300 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                          MED
                        </span>
                      )}
                      {rec.risk === 'LOW' && (
                        <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-slate-400 px-2.5 py-0.5 rounded-full text-[10px] font-semibold">
                          LOW
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      {rec.status === 'FLAGGED' && (
                        <span className="text-rose-400 font-bold text-xs tracking-wider">FLAGGED</span>
                      )}
                      {rec.status === 'CLEARED' && (
                        <span className="text-slate-400 font-semibold text-xs tracking-wider">CLEARED</span>
                      )}
                      {rec.status === 'REVIEW' && (
                        <span className="text-amber-400 font-semibold text-xs tracking-wider">REVIEW</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRowClick(rec);
                        }}
                        className="text-indigo-400 hover:text-indigo-300 p-1.5 rounded-xl hover:bg-white/5 transition-colors"
                        title="View Call Evidence"
                      >
                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="p-4 border-t border-white/5 bg-white/[0.01] flex justify-between items-center text-xs text-slate-400">
            <span>Showing {filteredRecords.length} of 1,842 total calls</span>
            <span className="font-mono text-[10px] text-slate-500">Telephony Gateway Node: IN-MUM-GW-04</span>
          </div>
        </div>

        {/* Call Pattern Analysis (Spans 4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl h-full flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-medium text-white mb-6 border-b border-white/5 pb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-indigo-400">psychology</span> CALL PATTERNS
              </h3>
              <div className="flex flex-col gap-3">
                {CALL_PATTERNS.map((pattern) => {
                  const isHigh = pattern.isHighRisk;
                  return (
                    <div
                      key={pattern.id}
                      onClick={() => onOpenNetworkModal()}
                      className={`flex gap-3.5 p-4 rounded-2xl border transition-all cursor-pointer ${
                        isHigh
                          ? 'bg-rose-500/10 border-rose-500/30 shadow-lg shadow-rose-500/10'
                          : 'bg-white/[0.02] border-white/10 hover:border-indigo-500/40 hover:bg-white/[0.05]'
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          isHigh
                            ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
                            : pattern.type === 'repeat'
                            ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                            : pattern.type === 'burst'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[20px]">{pattern.icon}</span>
                      </div>
                      <div>
                        <h4
                          className={`text-xs font-bold ${
                            isHigh ? 'text-rose-400' : 'text-white'
                          }`}
                        >
                          {pattern.title}
                        </h4>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                          {pattern.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              id="analyze-full-network-btn"
              onClick={onOpenNetworkModal}
              className="w-full mt-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-xs font-semibold text-indigo-300 hover:text-white transition-all cursor-pointer text-center"
            >
              Analyze Full Network Graph
            </button>
          </div>
        </div>
      </div>

      {/* Record Inspection Mini-Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-slate-950 rounded-3xl max-w-lg w-full border border-white/10 shadow-2xl overflow-hidden animate-fade-in p-6">
            <div className="flex justify-between items-center pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-indigo-400">call_log</span>
                <h4 className="text-base font-bold text-white">
                  Call Record Details: {selectedRecord.id}
                </h4>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="py-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 bg-white/[0.03] p-4 rounded-2xl border border-white/5">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Caller Entity</span>
                  <p className="font-bold text-sm text-white">{selectedRecord.caller}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Receiver Entity</span>
                  <p className="font-bold text-sm text-white">{selectedRecord.receiver}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Call Time</span>
                  <p className="font-mono text-slate-300">{selectedRecord.time}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Call Duration</span>
                  <p className="font-mono text-slate-300">{selectedRecord.duration}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-500">Cell Tower Azimuth</span>
                  <span className="font-medium text-slate-300">{selectedRecord.cellTower || 'Cell-Twr-881'}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-500">Handset IMEI / IMSI</span>
                  <span className="font-mono text-slate-300">{selectedRecord.imei || '35892019482019'}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-500">Analyst Note</span>
                  <span className="text-slate-300 text-right max-w-[280px]">{selectedRecord.notes || 'Associated with primary case cluster.'}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
              <button
                onClick={() => {
                  onSelectEntity(selectedRecord.caller);
                  setSelectedRecord(null);
                }}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-full"
              >
                Inspect Caller {selectedRecord.caller}
              </button>
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-5 py-2 bg-white text-slate-950 font-bold text-xs rounded-full hover:bg-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
