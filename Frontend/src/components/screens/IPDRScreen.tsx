import React, { useState, useMemo } from 'react';
import { IPDR_RECORDS, SUSPICIOUS_IP_EVENTS } from '../../data/mockData';
import { SuspiciousIPEvent } from '../../types';

interface IPDRScreenProps {
  onOpenExportReport: () => void;
  onSelectEntity: (entityId: string) => void;
}

export const IPDRScreen: React.FC<IPDRScreenProps> = ({
  onOpenExportReport,
  onSelectEntity
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeContextMenu, setActiveContextMenu] = useState<string | null>(null);
  const [inspectedEvent, setInspectedEvent] = useState<SuspiciousIPEvent | null>(null);

  const filteredIPs = useMemo(() => {
    return IPDR_RECORDS.filter((rec) => {
      const matchesSearch =
        rec.ipAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.entity.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLocation =
        selectedLocation === 'ALL' || rec.location === selectedLocation;
      return matchesSearch && matchesLocation;
    });
  }, [searchQuery, selectedLocation]);

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-white mb-1">
            IPDR <span className="font-medium text-indigo-400">INTELLIGENCE</span>
          </h2>
          <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
            Internet Protocol Detail Record Session Correlator
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => {
              setSelectedLocation((prev) => (prev === 'ALL' ? 'India' : 'ALL'));
            }}
            className="px-5 py-2.5 rounded-full border border-white/10 text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 text-xs font-semibold transition-all flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">filter_list</span>
            {selectedLocation === 'ALL' ? 'Filter Location' : `Filtered: ${selectedLocation}`}
          </button>
          <button
            onClick={onOpenExportReport}
            className="px-6 py-2.5 bg-white text-slate-900 rounded-full text-xs uppercase tracking-wider font-bold shadow-xl hover:bg-slate-200 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">download</span> Export Report
          </button>
        </div>
      </div>

      {/* KPIs Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {/* IP Events */}
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 flex flex-col justify-between h-36 shadow-xl backdrop-blur-xl">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              IP Events
            </span>
            <span className="material-symbols-outlined text-indigo-400 text-[18px]">router</span>
          </div>
          <div className="text-3xl font-light text-white leading-none">684</div>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="w-4/5 h-full bg-indigo-400 rounded-full"></div>
          </div>
        </div>

        {/* Unique IPs */}
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 flex flex-col justify-between h-36 shadow-xl backdrop-blur-xl">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Unique IPs
            </span>
            <span className="material-symbols-outlined text-emerald-400 text-[18px]">fingerprint</span>
          </div>
          <div className="text-3xl font-light text-white leading-none">86</div>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="w-2/3 h-full bg-emerald-400 rounded-full"></div>
          </div>
        </div>

        {/* Suspicious */}
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 flex flex-col justify-between h-36 shadow-xl backdrop-blur-xl">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Suspicious
            </span>
            <span className="material-symbols-outlined text-amber-400 text-[18px]">visibility</span>
          </div>
          <div className="text-3xl font-light text-white leading-none">12</div>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="w-1/3 h-full bg-amber-400 rounded-full"></div>
          </div>
        </div>

        {/* High Risk */}
        <div className="bg-white/[0.03] border border-rose-500/30 rounded-3xl p-6 flex flex-col justify-between h-36 shadow-xl backdrop-blur-xl bg-rose-500/[0.02]">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              High Risk
            </span>
            <span className="material-symbols-outlined text-rose-400 text-[18px]">warning</span>
          </div>
          <div className="text-3xl font-light text-rose-400 leading-none">6</div>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="w-1/2 h-full bg-rose-400 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Main Table Section */}
      <div className="bg-white/[0.03] border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl">
        <div className="px-8 py-6 border-b border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/[0.01]">
          <h3 className="text-lg font-medium text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-400">lan</span>
            IP ACTIVITY
          </h3>
          <div className="relative w-full sm:w-72">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-[18px]">
              search
            </span>
            <input
              type="text"
              placeholder="Search IP or Entity..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs text-slate-200 focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.02] border-b border-white/5 text-[10px] font-bold uppercase text-slate-400 tracking-widest">
                <th className="px-6 py-4 whitespace-nowrap">Time</th>
                <th className="px-6 py-4 whitespace-nowrap">IP Address</th>
                <th className="px-6 py-4 whitespace-nowrap">Entity</th>
                <th className="px-6 py-4 whitespace-nowrap">Location</th>
                <th className="px-6 py-4 whitespace-nowrap">Risk</th>
                <th className="px-6 py-4 whitespace-nowrap">Status</th>
                <th className="px-6 py-4 whitespace-nowrap text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-300 divide-y divide-white/5">
              {filteredIPs.map((rec) => (
                <tr
                  key={rec.id}
                  className="hover:bg-white/[0.04] transition-colors group h-14"
                >
                  <td className="px-6 py-3 whitespace-nowrap text-slate-400 font-mono text-xs">
                    {rec.time}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap font-mono text-xs font-semibold text-white">
                    {rec.ipAddress}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    <button
                      onClick={() => onSelectEntity(rec.entity)}
                      className="font-medium hover:text-indigo-400 hover:underline cursor-pointer"
                    >
                      {rec.entity}
                    </button>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    <span className="flex items-center gap-1.5 text-slate-400 text-xs">
                      <span className="material-symbols-outlined text-[16px] text-slate-500">
                        location_on
                      </span>
                      {rec.location}
                    </span>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    {rec.risk === 'HIGH' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        HIGH
                      </span>
                    )}
                    {rec.risk === 'MED' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        MEDIUM
                      </span>
                    )}
                    {rec.risk === 'LOW' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/5 text-slate-400 border border-white/10">
                        LOW
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    <span
                      className={`font-semibold text-xs tracking-wider ${
                        rec.status === 'FLAGGED'
                          ? 'text-rose-400'
                          : 'text-slate-400'
                      }`}
                    >
                      {rec.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-right relative">
                    <button
                      onClick={() =>
                        setActiveContextMenu(
                          activeContextMenu === rec.id ? null : rec.id
                        )
                      }
                      className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
                      title="More actions"
                    >
                      <span className="material-symbols-outlined text-[18px]">more_vert</span>
                    </button>

                    {activeContextMenu === rec.id && (
                      <div className="absolute right-6 top-10 w-48 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl py-2 z-20 text-xs text-left animate-fade-in">
                        <button
                          onClick={() => {
                            setActiveContextMenu(null);
                            onSelectEntity(rec.entity);
                          }}
                          className="w-full px-4 py-2 hover:bg-white/5 flex items-center gap-2 text-slate-200"
                        >
                          <span className="material-symbols-outlined text-[16px]">person</span>
                          Inspect Entity
                        </button>
                        <button
                          onClick={() => {
                            setActiveContextMenu(null);
                            alert(`Geo-Tracer initiated for IP: ${rec.ipAddress}\nAutonomous ISP: AS45129\nCoordinates: 18.9220° N, 72.8347° E`);
                          }}
                          className="w-full px-4 py-2 hover:bg-white/5 flex items-center gap-2 text-slate-200"
                        >
                          <span className="material-symbols-outlined text-[16px]">travel_explore</span>
                          Geo-Trace IP
                        </button>
                        <button
                          onClick={() => {
                            setActiveContextMenu(null);
                            alert(`IP ${rec.ipAddress} tagged for active honeypot monitoring.`);
                          }}
                          className="w-full px-4 py-2 hover:bg-rose-500/10 flex items-center gap-2 text-rose-400"
                        >
                          <span className="material-symbols-outlined text-[16px]">block</span>
                          Tag for Intercept
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Pagination */}
        <div className="px-8 py-4 border-t border-white/5 flex justify-between items-center text-xs text-slate-400 bg-white/[0.01]">
          <span>Showing 1 to {filteredIPs.length} of 684 entries</span>
          <div className="flex gap-1.5 items-center">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-xl border border-white/10 hover:bg-white/5 disabled:opacity-30"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_left</span>
            </button>
            <button
              onClick={() => setCurrentPage(1)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold ${
                currentPage === 1 ? 'bg-white/10 text-white border border-white/10' : 'hover:bg-white/5'
              }`}
            >
              1
            </button>
            <button
              onClick={() => setCurrentPage(2)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold ${
                currentPage === 2 ? 'bg-white/10 text-white border border-white/10' : 'hover:bg-white/5'
              }`}
            >
              2
            </button>
            <button
              onClick={() => setCurrentPage(3)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold ${
                currentPage === 3 ? 'bg-white/10 text-white border border-white/10' : 'hover:bg-white/5'
              }`}
            >
              3
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(3, currentPage + 1))}
              disabled={currentPage === 3}
              className="p-1.5 rounded-xl border border-white/10 hover:bg-white/5 disabled:opacity-30"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section: Suspicious Activity */}
      <div className="bg-white/[0.03] border border-white/10 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-2xl p-6 sm:p-8">
        <div className="flex items-center gap-3 pb-6 border-b border-white/5">
          <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">policy</span>
          </div>
          <h3 className="text-lg font-medium text-white">SUSPICIOUS IP ACTIVITY</h3>
        </div>
        <div className="mt-4">
          <ul className="divide-y divide-white/5">
            {SUSPICIOUS_IP_EVENTS.map((event) => (
              <li
                key={event.id}
                onClick={() => setInspectedEvent(event)}
                className="py-4 hover:bg-white/[0.04] px-4 rounded-2xl transition-colors flex items-start gap-4 cursor-pointer group"
              >
                <div
                  className={`mt-1.5 w-1 h-8 rounded-full shrink-0 ${
                    event.severity === 'error'
                      ? 'bg-rose-500 shadow-sm shadow-rose-500/40'
                      : event.severity === 'warning'
                      ? 'bg-amber-400'
                      : 'bg-indigo-500'
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-white group-hover:text-indigo-300 transition-colors">
                      {event.title}
                    </span>
                    <span className="text-xs text-slate-500">{event.timeAgo}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Detail Modal for IP Event */}
      {inspectedEvent && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-slate-950 rounded-3xl max-w-md w-full border border-white/10 shadow-2xl p-6 animate-fade-in">
            <div className="flex justify-between items-center pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-rose-400">security</span>
                <h4 className="font-bold text-base text-white">{inspectedEvent.title}</h4>
              </div>
              <button
                onClick={() => setInspectedEvent(null)}
                className="text-slate-400 hover:text-white"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="py-6 text-xs space-y-4">
              <p className="text-slate-300 leading-relaxed">{inspectedEvent.description}</p>
              {inspectedEvent.ip && (
                <div className="bg-white/[0.03] p-4 rounded-2xl border border-white/5">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Target IP</span>
                  <p className="font-mono font-bold text-sm text-indigo-300">{inspectedEvent.ip}</p>
                </div>
              )}
            </div>
            <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
              {inspectedEvent.entity && (
                <button
                  onClick={() => {
                    onSelectEntity(inspectedEvent.entity!);
                    setInspectedEvent(null);
                  }}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-full"
                >
                  Inspect Entity {inspectedEvent.entity}
                </button>
              )}
              <button
                onClick={() => setInspectedEvent(null)}
                className="px-5 py-2 bg-white text-slate-950 font-bold text-xs rounded-full hover:bg-slate-200"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
