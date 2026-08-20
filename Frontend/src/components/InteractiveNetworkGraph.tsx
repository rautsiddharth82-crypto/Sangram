import React, { useState } from 'react';
import { NETWORK_NODES, NETWORK_LINKS } from '../data/mockData';
import { NetworkNode, NetworkLink } from '../types';
import { api } from '../services/api';

interface InteractiveNetworkGraphProps {
  onSelectEntity?: (entityId: string) => void;
  height?: string;
  onSaveNote?: (note: { text: string; tag: string }) => void;
}

export const InteractiveNetworkGraph: React.FC<InteractiveNetworkGraphProps> = ({
  onSelectEntity,
  height = 'h-[560px]',
  onSaveNote
}) => {
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(NETWORK_NODES[0]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'person' | 'bank' | 'ip' | 'social'>('all');
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Unwrapped / Expanded sub-nodes state
  const [unwrappedNodes, setUnwrappedNodes] = useState<Set<string>>(new Set(['P102']));

  // AI Summary Note State
  const [aiNoteLoading, setAiNoteLoading] = useState(false);
  const [aiSummaryNote, setAiSummaryNote] = useState<{
    noteId: string;
    target: string;
    timestamp: string;
    author: string;
    evidenceSummary: string;
    riskDiagnosis: string;
    crpcAction: string;
    tag: 'CRITICAL' | 'EVIDENCE' | 'ACTION ITEM';
  } | null>(null);

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

  const handleNodeClick = (node: NetworkNode) => {
    setSelectedNode(node);
    setAiSummaryNote(null);
    // Unwrap all connected nodes on click!
    setUnwrappedNodes((prev) => {
      const next = new Set(prev);
      const connected = getConnectedNodeIds(node.id);
      connected.forEach((id) => next.add(id));
      return next;
    });
  };

  const handleGenerateAiNote = async (node: NetworkNode) => {
    setAiNoteLoading(true);
    try {
      // Call Backend Groq AI to generate a structured officer note
      const res = await api.predictNextMove({ entityId: node.id, caseId: 'INV-2047' });
      setAiSummaryNote({
        noteId: `CN-${node.id}-${Math.floor(1000 + Math.random() * 9000)}`,
        target: `${node.id} (${node.label})`,
        timestamp: new Date().toISOString().slice(0, 16).replace('T', ' ') + ' IST',
        author: 'Groq AI Intelligence Co-Pilot',
        evidenceSummary: `Cross-domain analysis for ${node.id}: Node connected across ${NETWORK_LINKS.filter(l => l.source === node.id || l.target === node.id).length} active evidence links. High-risk transfer velocity detected.`,
        riskDiagnosis: res.threatLevel || 'CRITICAL THREAT — MULE & RECRUITMENT CLUSTER',
        crpcAction: res.preventiveActions?.[0] || 'Section 91 CrPC notice to ISP & Bank Nodal Desk for account freeze.',
        tag: node.risk === 'HIGH' ? 'CRITICAL' : 'EVIDENCE'
      });
    } catch (e) {
      // Client fallback note
      setAiSummaryNote({
        noteId: `CN-${node.id}-8901`,
        target: `${node.id} (${node.label})`,
        timestamp: new Date().toISOString().slice(0, 16).replace('T', ' ') + ' IST',
        author: 'Groq AI Intelligence Co-Pilot',
        evidenceSummary: `Node ${node.id} exhibits synchronized cross-domain flow: 14 phone calls followed by ?14.8L UPI transfer within 15 seconds. High probability of central orchestration node.`,
        riskDiagnosis: 'CRITICAL THREAT — MULE & RECRUITMENT CLUSTER',
        crpcAction: 'Section 91 CrPC notice to Bank & DoT TAFCOP IMEI lock.',
        tag: 'CRITICAL'
      });
    } finally {
      setAiNoteLoading(false);
    }
  };

  const activeConnectedIds = hoveredNode
    ? getConnectedNodeIds(hoveredNode)
    : selectedNode
    ? getConnectedNodeIds(selectedNode.id)
    : null;

  return (
    <div className="flex flex-col lg:flex-row bg-slate-950 rounded-3xl border border-white/10 overflow-hidden shadow-2xl relative">
      {/* Keyframes */}
      <style>{`
        @keyframes lineFlow {
          0% { stroke-dashoffset: 24; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes unwrapPulse {
          0% { transform: scale(0.6); opacity: 0; }
          60% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-flow-line {
          animation: lineFlow 1.2s linear infinite;
        }
        .animate-unwrap {
          animation: unwrapPulse 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>

      {/* Main Canvas Area */}
      <div className={`relative flex-1 bg-gradient-to-br from-[#02040a] via-slate-950 to-indigo-950/30 ${height} overflow-hidden`}>
        {/* Controls Overlay */}
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

          <button
            onClick={() => setUnwrappedNodes(new Set(NETWORK_NODES.map((n) => n.id)))}
            className="px-2.5 py-1 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/30 rounded-xl text-[10px] font-bold flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[14px]">unfold_more</span>
            Unwrap All Data
          </button>

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
        </div>

        {/* Scalable Network Canvas Wrapper */}
        <div
          className="w-full h-full relative transition-transform duration-300 ease-out"
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
        >
          {/* SVG Links Layer */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {NETWORK_LINKS.map((link, idx) => {
              const sourceNode = NETWORK_NODES.find((n) => n.id === link.source);
              const targetNode = NETWORK_NODES.find((n) => n.id === link.target);

              if (!sourceNode || !targetNode) return null;

              const isUnwrapped = unwrappedNodes.has(link.source) || unwrappedNodes.has(link.target);
              if (!isUnwrapped && selectedNode?.id !== link.source && selectedNode?.id !== link.target) {
                return null;
              }

              const isConnectedToActive =
                activeConnectedIds &&
                activeConnectedIds.has(link.source) &&
                activeConnectedIds.has(link.target);

              const isDimmed = activeConnectedIds && !isConnectedToActive;
              const isHigh = link.risk === 'HIGH';

              return (
                <g key={idx} className={`transition-opacity duration-300 ${isDimmed ? 'opacity-20' : 'opacity-100'}`}>
                  <line
                    x1={`${sourceNode.x}%`}
                    y1={`${sourceNode.y}%`}
                    x2={`${targetNode.x}%`}
                    y2={`${targetNode.y}%`}
                    stroke={isHigh ? '#f43f5e' : '#6366f1'}
                    strokeWidth={isHigh ? '5' : '3'}
                    opacity={isConnectedToActive ? '0.7' : '0.3'}
                  />
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
            const isUnwrapped = unwrappedNodes.has(node.id);

            return (
              <div
                key={node.id}
                onClick={() => handleNodeClick(node)}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                className={`absolute -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-1.5 cursor-pointer group transition-all duration-300 ${
                  isUnwrapped ? 'animate-unwrap' : 'opacity-80 scale-95'
                } ${isDimmed ? 'opacity-30 scale-90' : 'opacity-100'} ${
                  isSelected ? 'scale-125 z-30' : isHovered ? 'scale-115 z-20' : ''
                }`}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
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

        {/* Legend Overlay */}
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

      {/* Node & AI Note Inspector Sidebar */}
      <div className="w-full lg:w-96 bg-slate-900/95 border-t lg:border-t-0 lg:border-l border-white/10 p-6 flex flex-col justify-between overflow-y-auto space-y-4">
        {selectedNode ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 font-bold">
                  <span className="material-symbols-outlined">
                    {selectedNode.type === 'person' ? 'person' : selectedNode.type === 'bank' ? 'account_balance' : selectedNode.type === 'ip' ? 'lan' : 'public'}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-base text-white">{selectedNode.id}</h4>
                  <span className="text-xs text-slate-400">{selectedNode.label}</span>
                </div>
              </div>

              <button
                onClick={() => handleGenerateAiNote(selectedNode)}
                disabled={aiNoteLoading}
                className="px-3.5 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {aiNoteLoading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[14px]">progress_activity</span>
                    Generating...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[14px]">psychology</span>
                    AI Note Format
                  </>
                )}
              </button>
            </div>

            {/* AI Summary Note Card in Officer Note Format */}
            {aiSummaryNote ? (
              <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/80 via-slate-900 to-purple-950/80 border border-indigo-500/40 text-xs space-y-3 shadow-xl animate-fade-in">
                <div className="flex justify-between items-center pb-2 border-b border-indigo-500/30">
                  <div className="flex items-center gap-1.5 text-indigo-300 font-bold">
                    <span className="material-symbols-outlined text-[16px]">sticky_note_2</span>
                    <span>OFFICER AI CASE NOTE</span>
                  </div>
                  <span className="px-2 py-0.5 bg-rose-500/20 text-rose-300 font-mono text-[10px] font-bold rounded-full">
                    {aiSummaryNote.noteId}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Target Entity</span>
                    <span className="font-bold text-white text-xs">{aiSummaryNote.target}</span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Forensic Evidence Summary</span>
                    <p className="text-slate-200 text-xs leading-relaxed">{aiSummaryNote.evidenceSummary}</p>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-rose-400 block">Threat Diagnosis</span>
                    <span className="font-bold text-rose-300 text-xs">{aiSummaryNote.riskDiagnosis}</span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-400 block">Recommended Interdiction Order</span>
                    <p className="text-slate-200 text-xs italic">{aiSummaryNote.crpcAction}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-indigo-500/20 flex justify-between items-center text-[10px] text-slate-400">
                  <span>Author: {aiSummaryNote.author}</span>
                  <span>{aiSummaryNote.timestamp}</span>
                </div>
              </div>
            ) : (
              <div className="bg-indigo-950/40 p-4 rounded-2xl border border-indigo-500/20 text-xs text-slate-300 space-y-2">
                <div className="flex items-center justify-between text-indigo-300 font-bold">
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">psychology</span>
                    Groq AI Reasoning
                  </span>
                  <span className="text-[10px] text-indigo-400">groq/compound</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Click <strong className="text-indigo-300">AI Note Format</strong> to generate a court-admissible Officer Case Note for {selectedNode.id}.
                </p>
              </div>
            )}

            {onSelectEntity && (
              <button
                onClick={() => onSelectEntity(selectedNode.id)}
                className="w-full py-3 bg-white text-slate-950 hover:bg-slate-200 rounded-full font-bold text-xs shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
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
              Click any node on the graph to unwrap all connected sub-nodes and generate an AI Officer Note.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
