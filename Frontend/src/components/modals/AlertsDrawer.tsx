import React from 'react';
import { CaseAlert } from '../../types';

interface AlertsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  alerts: CaseAlert[];
  onSelectEntity: (entityId: string) => void;
}

export const AlertsDrawer: React.FC<AlertsDrawerProps> = ({
  isOpen,
  onClose,
  alerts,
  onSelectEntity
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex justify-end">
      <div className="w-full max-w-sm bg-[#02040a]/95 backdrop-blur-2xl h-full shadow-2xl flex flex-col border-l border-white/10 animate-slide-in overflow-hidden">
        <div className="p-6 border-b border-white/5 bg-white/[0.01] flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-rose-400 text-[22px]">notifications_active</span>
            <h3 className="font-medium text-base text-white">Investigation Alerts</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-3 text-xs">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              onClick={() => {
                if (alert.entity) {
                  onSelectEntity(alert.entity);
                  onClose();
                }
              }}
              className="p-4 bg-white/[0.02] hover:bg-white/[0.05] rounded-2xl border border-white/10 hover:border-indigo-500/40 cursor-pointer transition-all flex gap-3"
            >
              <div
                className={`w-1 h-8 rounded-full mt-1 shrink-0 ${
                  alert.severity === 'error'
                    ? 'bg-rose-500 shadow-sm shadow-rose-500/40'
                    : alert.severity === 'tertiary'
                    ? 'bg-amber-400'
                    : 'bg-indigo-500'
                }`}
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-bold text-white text-xs">{alert.title}</span>
                  <span className="text-[10px] text-slate-500 ml-2">{alert.timeAgo}</span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">{alert.description}</p>
                {alert.entity && (
                  <div className="mt-2 text-[11px] text-indigo-400 font-semibold flex items-center gap-1">
                    <span>Inspect: {alert.entity}</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-white/5 bg-white/[0.01] text-center">
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">
            All events synced with Intelligence Grid
          </span>
        </div>
      </div>
    </div>
  );
};
