import React, { useState } from 'react';
import { NETWORK_NODES, NETWORK_LINKS } from '../data/mockData';
import { NetworkNode, NetworkLink } from '../types';

interface InteractiveNetworkGraphProps {
  onSelectEntity?: (entityId: string) => void;
  height?: string;
}

export const InteractiveNetworkGraph: React.FC<InteractiveNetworkGraphProps> = ({
  onSelectEntity,
  height = 'h-[520px]'
}) => {
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(NETWORK_NODES[0]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'person' | 'bank' | 'ip' | 'social'>('all');
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const filteredNodes = NETWORK_NODES.filter(
    (node) => filterType === 'all' || node.type === filterType
  );

  const getConnectedNodeIds = (nodeId: string) => {
    const connected = new Set<string>();
    connected.add(nodeId);
    NETWORK_LINKS.forEach((l) => {
      if (l.source === nodeId) connected.add(l.target);
      if (l.target === nodeId) connected.add(l.source);
    });
    return connected;
  };

  const activeConnectedIds = hoveredNode
    ? getConnectedNodeIds(hoveredNode)
    : selectedNode
    ? getConnectedNodeIds(selectedNode.id)
    : null;

  return (
    <div className="flex flex-col md:flex-row bg-slate-950 rounded-3xl border border-white/10 overflow-hidden shadow-2xl relative">
      {/* Dynamic CSS Keyframe Animations for Flow & Pulsing Link Particles */}
      <style>{`
        @keyframes lineFlow {
          0% { stroke-dashoffset: 24; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.15); }
        }
        .animate-flow-line {
          animation: lineFlow 1.2s linear infinite;
        }
        .animate-pulse-glow {
          animation: pulseGlow 2.5s ease-in-out infinite;
        }
      `}</style>

      {/* Main Canvas Area */}
      <div className={`relative flex-1 bg-gradient-to-br from-[#02040a] via-slate-950 to-indigo-950/30 ${height} overflow-hidden`}>
        {/* Controls Overlay Top Left */}
        <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 bg-slate-900/90 backdrop-blur-md p-2 rounded-2xl border border-white/10 shadow-xl">
          <span className="text-[10px] uppercase font-bold text-slate-400 px-2">Filter Network:</span>
          {(['all', 'person', 'bank', 'ip', 'social'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-2.5 py-1 rounded-xl text-[10px] font-bold uppercase transition-all cursor-pointer ${
                filterType === t
                  ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                  : 'bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}

          <div className="h-4 w-px bg-white/10 mx-1" />

          {/* Zoom Buttons */}
          <button
            onClick={() => setZoomLevel(Math.min(1.4, zoomLevel + 0.1))}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/10"
            title="Zoom In"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
          </button>
          <button
            onClick={() => setZoomLevel(Math.max(0.7, zoomLevel - 0.1))}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/10"
            title="Zoom Out"
          >
            <span className="material-symbols-outlined text-[16px]">remove</span>
          </button>
          <button
            onClick={() => setZoomLevel(1)}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 text-[10px] font-mono px-1.5"
            title="Reset Zoom"
          >
            100%
          </button>
        </div>

        {/* Scalable Network Canvas Wrapper */}
        <div
          className="w-full h-full relative transition-transform duration-300 ease-out"
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
        >
          {/* SVG Links Layer */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <defs>
              <linearGradient id="grad-high" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#881337" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="grad-indigo" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#312e81" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {NETWORK_LINKS.map((link, idx) => {
              const sourceNode = NETWORK_NODES.find((n) => n.id === link.source);
              const targetNode = NETWORK_NODES.find((n) => n.id === link.target);

              if (!sourceNode || !targetNode) return null;

              const isConnectedToActive =
                activeConnectedIds &&
                activeConnectedIds.has(link.source) &&
                activeConnectedIds.has(link.target);

              const isDimmed = activeConnectedIds && !isConnectedToActive;
              const isHigh = link.risk === 'HIGH';

              return (
                <g key={idx} className={`transition-opacity duration-300 ${isDimmed ? 'opacity-20' : 'opacity-100'}`}>
                  {/* Outer Glow Path */}
                  <line
                    x1={`${sourceNode.x}%`}
                    y1={`${sourceNode.y}%`}
                    x2={`${targetNode.x}%`}
                    y2={`${targetNode.y}%`}
                    stroke={isHigh ? '#f43f5e' : '#6366f1'}
                    strokeWidth={isHigh ? '5' : '3'}
                    opacity={isConnectedToActive ? '0.6' : '0.2'}
                  />
                  {/* Animated Particle Flow Line */}
                  <line
                    x1={`${sourceNode.x}%`}
                    y1={`${sourceNode.y}%`}
                    x2={`${targetNode.x}%`}
                    y2={`${targetNode.y}%`}
                    stroke={isHigh ? '#fda4af' : '#a5b4fc'}
                    strokeWidth={isHigh ? '2.5' : '1.5'}
                    strokeDasharray="6 6"
                    className="animate-flow-line"
                  />
                  {/* Link Label Midpoint */}
                  {link.label && (
                    <text
                      x={`${(sourceNode.x + targetNode.x) / 2}%`}
                      y={`${(sourceNode.y + targetNode.y) / 2}%`}
                      fill="#e2e8f0"
                      fontSize="9"
                      fontWeight="bold"
                      textAnchor="middle"
                      dy="-6"
                      className="drop-shadow-md select-none font-mono"
                    >
                      {link.label}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Interactive Nodes Layer */}
          {filteredNodes.map((node) => {
            const isSelected = selectedNode?.id === node.id;
            const isHovered = hoveredNode === node.id;
            const isConnected = activeConnectedIds?.has(node.id);
            const isDimmed = activeConnectedIds && !isConnected;
            const isHigh = node.risk === 'HIGH';

            return (
              <div
                key={node.id}
                onClick={() => setSelectedNode(node)}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                className={`absolute -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-1.5 cursor-pointer group transition-all duration-300 ${
                  isDimmed ? 'opacity-30 scale-90' : 'opacity-100'
                } ${isSelected ? 'scale-125 z-30' : isHovered ? 'scale-115 z-20' : ''}`}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                {/* Glowing Pulsing Background Aura for High Risk Nodes */}
                {isHigh && (
                  <div className="absolute inset-0 -m-3 rounded-3xl bg-rose-500/30 animate-pulse-glow blur-md pointer-events-none" />
                )}

                {/* Node Box */}
                <div
                  className={`w-13 h-13 rounded-2xl flex items-center justify-center shadow-2xl border-2 bg-slate-900 transition-all ${
                    isHigh
                      ? 'border-rose-500 text-rose-400 shadow-rose-500/40'
                      : node.type === 'bank'
                      ? 'border-indigo-500 text-indigo-300 shadow-indigo-500/40'
                      : node.type === 'ip'
                      ? 'border-amber-500 text-amber-300 shadow-amber-500/40'
                      : 'border-purple-500 text-purple-300 shadow-purple-500/40'
                  } ${isSelected ? 'ring-4 ring-indigo-500/60 bg-indigo-950' : ''}`}
                >
                  <span className="material-symbols-outlined text-[24px]">
                    {node.type === 'person'
                      ? 'person'
                      : node.type === 'bank'
                      ? 'account_balance'
                      : node.type === 'ip'
                      ? 'lan'
                      : 'public'}
                  </span>
                </div>

                {/* Label Pill */}
                <div className="bg-slate-900/95 backdrop-blur-md px-3 py-1 rounded-full shadow-2xl border border-white/10 text-center">
                  <span className="text-[11px] font-bold text-white block whitespace-nowrap">
                    {node.id}
                  </span>
                  <span className="text-[9px] text-slate-400 font-medium block leading-tight">
                    {node.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend Overlay Bottom Left */}
        <div className="absolute bottom-4 left-4 z-20 bg-slate-900/90 backdrop-blur-md p-3 rounded-2xl border border-white/10 shadow-2xl text-[11px] flex gap-4 text-slate-300">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-sm shadow-rose-500"></span> Mastermind / High Risk
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span> Mule Account
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> IP / Telephony Node
          </div>
        </div>
      </div>

      {/* Node Investigation Inspector Right Sidebar */}
      <div className="w-full md:w-80 bg-slate-900/95 border-t md:border-t-0 md:border-l border-white/10 p-6 flex flex-col justify-between overflow-y-auto">
        {selectedNode ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 font-bold">
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

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Node Category</span>
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
                  {selectedNode.risk} THREAT
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Cross-Domain Links</span>
                <span className="font-bold text-indigo-300">
                  {NETWORK_LINKS.filter((l) => l.source === selectedNode.id || l.target === selectedNode.id).length} Active Hops
                </span>
              </div>
            </div>

            {/* Groq AI Node Correlation Banner */}
            <div className="bg-indigo-950/60 p-4 rounded-2xl border border-indigo-500/30 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-1.5 text-indigo-300 font-bold">
                <span className="material-symbols-outlined text-[16px]">psychology</span>
                Groq AI Cross-Domain Findings
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Node exhibits synchronized cross-domain flow: 14 phone calls followed by ?14.8L UPI transfer within 15 seconds. High probability of central orchestration node.
              </p>
            </div>

            {onSelectEntity && (
              <button
                onClick={() => onSelectEntity(selectedNode.id)}
                className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-full font-bold text-xs shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                Open Entity 360 Dossier
              </button>
            )}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 p-4">
            <span className="material-symbols-outlined text-[40px] mb-2 text-slate-600">touch_app</span>
            <p className="text-sm font-medium text-white">Select a Node</p>
            <p className="text-xs mt-1 text-slate-400">
              Click on any suspect person, bank account, IP session or Telegram channel on the graph to inspect evidence and AI correlations.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
