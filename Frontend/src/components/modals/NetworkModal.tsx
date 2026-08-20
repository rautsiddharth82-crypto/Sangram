import React from 'react';
import { InteractiveNetworkGraph } from '../InteractiveNetworkGraph';

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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-slate-950 rounded-3xl max-w-5xl w-full border border-white/10 shadow-2xl p-6 animate-fade-in flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">account_tree</span>
            </div>
            <div>
              <h4 className="font-bold text-base text-white">Cross-Domain Intelligence Topology Graph</h4>
              <p className="text-xs text-slate-400">Interactive link analysis across Telecom, Bank &amp; Social OSINT</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="py-4 flex-1 overflow-hidden">
          <InteractiveNetworkGraph
            onSelectEntity={(ent) => {
              onSelectEntity(ent);
              onClose();
            }}
            height="h-[560px]"
          />
        </div>

        <div className="flex justify-end pt-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-white text-slate-950 hover:bg-slate-200 rounded-full font-bold text-xs shadow-xl cursor-pointer"
          >
            Close Graph
          </button>
        </div>
      </div>
    </div>
  );
};
