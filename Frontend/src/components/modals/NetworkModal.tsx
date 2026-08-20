import React, { useState } from 'react';
import { NETWORK_NODES, NETWORK_LINKS } from '../../data/mockData';
import { NetworkNode } from '../../types';

interface NetworkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEntity: (entityId: string) => void;
}

export const NetworkModal: React.FC<NetworkModalProps> = ({
  isOpen,
  onClose,
  onSelectEntity
}) => {
  const [filterType, setFilterType] = useState<string>('ALL');
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);

  if (!isOpen) return null;

  const filteredNodes = NETWORK_NODES.filter((n) => {
    if (filterType === 'ALL') return true;
    return n.type.toUpperCase() === filterType;
  });

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-slate-950 rounded-[32px] w-full max-w-5xl h-[85vh] border border-white/10 shadow-2xl flex flex-col overflow-hidden animate-fade-in">
        {/* Modal Header */}
        <div className="px-8 py-5 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">hub</span>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white">
                Interactive Multi-Domain Graph Analysis
              </h3>
              <p className="text-xs text-slate-400">
                Case #INV-2047 • Cross-correlation of Telecom, Cyber, Financial &amp; Social links
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Filter */}
            <div className="flex bg-white/5 p-1 rounded-full border border-white/10 text-xs font-semibold">
              {['ALL', 'PERSON', 'BANK', 'IP', 'SOCIAL'].map((t) => (
                <button
                  key={t}
                  onClick={() => setFilterType(t)}
                  className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                    filterType === t
                      ? 'bg-white/20 text-white shadow-sm font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors ml-2"
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>
          </div>
        </div>

        {/* Modal Body: Split between Interactive Canvas & Node Sidebar */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Graph Canvas */}
          <div className="flex-1 bg-[#02040a] relative p-6 flex items-center justify-center overflow-hidden">
            {/* Background Grid Lines */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:24px_24px] opacity-30"></div>

            {/* SVG Connecting Links */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {NETWORK_LINKS.map((link, idx) => {
                const sourceNode = NETWORK_NODES.find((n) => n.id === link.source);
                const targetNode = NETWORK_NODES.find((n) => n.id === link.target);
                if (!sourceNode || !targetNode) return null;

                const isFlagged = link.risk === 'HIGH';

                return (
                  <g key={idx}>
                    <line
                      x1={`${sourceNode.x}%`}
                      y1={`${sourceNode.y}%`}
                      x2={`${targetNode.x}%`}
                      y2={`${targetNode.y}%`}
                      stroke={isFlagged ? '#f43f5e' : '#475569'}
                      strokeWidth={isFlagged ? '3' : '1.5'}
                      strokeDasharray={link.type === 'cdr' ? '4 4' : 'none'}
                      opacity="0.8"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Nodes on Canvas */}
            {filteredNodes.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              const isHigh = node.risk === 'HIGH';

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-1.5 cursor-pointer group transition-all duration-200 ${
                    isSelected ? 'scale-115 z-30' : 'hover:scale-110'
                  }`}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl border-2 bg-slate-900 transition-all ${
                      isHigh
                        ? 'border-rose-500 text-rose-400 shadow-rose-500/20'
                        : node.type === 'bank'
                        ? 'border-indigo-500 text-indigo-300 shadow-indigo-500/20'
                        : node.type === 'ip'
                        ? 'border-emerald-500 text-emerald-300 shadow-emerald-500/20'
                        : 'border-slate-500 text-slate-200'
                    } ${isSelected ? 'ring-4 ring-indigo-500/40' : ''}`}
                  >
                    <span className="material-symbols-outlined text-[22px]">
                      {node.type === 'person'
                        ? 'person'
                        : node.type === 'bank'
                        ? 'account_balance'
                        : node.type === 'ip'
                        ? 'lan'
                        : 'public'}
                    </span>
                  </div>
                  <div className="bg-slate-900/90 backdrop-blur-md px-2.5 py-0.5 rounded-full shadow-lg border border-white/10 text-center">
                    <span className="text-[11px] font-bold text-white block whitespace-nowrap">
                      {node.id}
                    </span>
                    <span className="text-[9px] text-slate-400 uppercase font-semibold block leading-tight">
                      {node.label}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Canvas overlay legend */}
            <div className="absolute bottom-6 left-6 bg-slate-900/90 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 shadow-2xl text-xs flex gap-5 text-slate-300">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> High Risk Flow
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span> Bank Node
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Telecom / IP
              </div>
            </div>
          </div>

          {/* Node Inspector Side Panel */}
          <div className="w-full md:w-80 bg-white/[0.02] border-t md:border-t-0 md:border-l border-white/5 p-6 flex flex-col justify-between overflow-y-auto">
            {selectedNode ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300">
                    <span className="material-symbols-outlined">
                      {selectedNode.type === 'person'
                        ? 'person'
                        : selectedNode.type === 'bank'
                        ? 'account_balance'
                        : selectedNode.type === 'ip'
                        ? 'lan'
                        : 'public'}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-white">{selectedNode.id}</h4>
                    <span className="text-xs text-slate-400">{selectedNode.label}</span>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Entity Type</span>
                    <span className="font-bold uppercase text-white">{selectedNode.type}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Risk Assessment</span>
                    <span
                      className={`font-bold px-2.5 py-0.5 rounded-full text-[10px] ${
                        selectedNode.risk === 'HIGH'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-white/10 text-slate-300'
                      }`}
                    >
                      {selectedNode.risk}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Connected Links</span>
                    <span className="font-bold text-white">
                      {NETWORK_LINKS.filter(
                        (l) => l.source === selectedNode.id || l.target === selectedNode.id
                      ).length}
                    </span>
                  </div>
                </div>

                <div className="bg-white/[0.03] p-4 rounded-2xl border border-white/5 text-xs text-slate-300 leading-relaxed">
                  <strong className="text-white block mb-1">Analyst Summary:</strong> Node exhibits synchronized activity during money laundering hops. Direct connection logged to P087 within 4 minutes of telegram trigger.
                </div>

                <button
                  onClick={() => {
                    onSelectEntity(selectedNode.id);
                    onClose();
                  }}
                  className="w-full py-3 bg-white hover:bg-slate-200 text-slate-950 rounded-full font-bold text-xs shadow-xl transition-all cursor-pointer"
                >
                  Open Full Entity Dossier
                </button>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 p-4">
                <span className="material-symbols-outlined text-[40px] mb-2 text-slate-600">
                  touch_app
                </span>
                <p className="text-sm font-medium text-white">Select a node</p>
                <p className="text-xs mt-1 text-slate-400">
                  Click on any person, bank account, IP or social node on the map to inspect links and evidence.
                </p>
              </div>
            )}

            <div className="pt-4 border-t border-white/5">
              <button
                onClick={onClose}
                className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 rounded-full font-semibold text-xs transition-colors"
              >
                Close Graph
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
