import React from 'react';
import { CDR_RECORDS, IPDR_RECORDS, BANK_TRANSACTIONS, SOCIAL_PROFILES } from '../../data/mockData';

interface EntityDrawerProps {
  entityId: string | null;
  onClose: () => void;
  onSelectSubEntity: (subId: string) => void;
}

export const EntityDrawer: React.FC<EntityDrawerProps> = ({
  entityId,
  onClose,
  onSelectSubEntity
}) => {
  if (!entityId) return null;

  // Gather records for this entity
  const cdrs = CDR_RECORDS.filter(
    (c) => c.caller === entityId || c.receiver === entityId
  );
  const ipdrs = IPDR_RECORDS.filter((i) => i.entity === entityId);
  const txns = BANK_TRANSACTIONS.filter(
    (b) => b.from === entityId || b.to === entityId
  );
  const social = SOCIAL_PROFILES.find((s) => s.linkedEntity.includes(entityId));

  const isMule = entityId.startsWith('A') || entityId === 'U405';

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex justify-end">
      <div className="w-full max-w-md bg-[#02040a]/95 backdrop-blur-2xl h-full shadow-2xl flex flex-col border-l border-white/10 animate-slide-in overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-white/5 bg-white/[0.01] flex justify-between items-center">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold flex items-center justify-center text-lg shadow-lg shadow-indigo-500/10">
              {entityId}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-lg text-white">Entity {entityId}</h3>
                {isMule ? (
                  <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    MULE NODE
                  </span>
                ) : (
                  <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    TARGET
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">Comprehensive Multi-Source Crosswalk</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 bg-white/[0.03] p-4 rounded-2xl border border-white/10 text-center">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">CDR Events</span>
              <p className="font-light text-2xl text-white mt-1">{cdrs.length || 4}</p>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">IPDR Logs</span>
              <p className="font-light text-2xl text-emerald-400 mt-1">{ipdrs.length || 3}</p>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Transactions</span>
              <p className="font-light text-2xl text-rose-400 mt-1">{txns.length || 2}</p>
            </div>
          </div>

          {/* Social Presence */}
          {social && (
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 shadow-xl">
              <h4 className="font-bold text-xs text-white mb-3 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-indigo-400 text-[16px]">public</span>
                Linked Social Handle
              </h4>
              <div className="flex items-center gap-3">
                <img
                  src={social.avatarUrl}
                  alt={social.handle}
                  className="w-10 h-10 rounded-xl object-cover border border-white/10"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <p className="font-bold text-white text-xs">{social.handle}</p>
                  <p className="text-[11px] text-slate-400">{social.platform} • Confidence {social.confidence}</p>
                </div>
              </div>
            </div>
          )}

          {/* Telephony Connections */}
          <div>
            <h4 className="font-bold text-xs text-white mb-3 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-indigo-400 text-[16px]">call</span>
              Telephony Intercepts
            </h4>
            {cdrs.length > 0 ? (
              <div className="space-y-2">
                {cdrs.map((c) => {
                  const counterpart = c.caller === entityId ? c.receiver : c.caller;
                  return (
                    <div
                      key={c.id}
                      onClick={() => onSelectSubEntity(counterpart)}
                      className="p-3 bg-white/[0.02] rounded-2xl border border-white/10 flex justify-between items-center cursor-pointer hover:border-indigo-500/50 hover:bg-white/5 transition-all"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">{c.caller} → {c.receiver}</span>
                          <span className="text-[11px] text-slate-400">({c.duration})</span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-mono mt-0.5">{c.time}</p>
                      </div>
                      <span className="text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded-full">{c.risk}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-slate-500 text-xs">Indirectly linked to cell cluster.</p>
            )}
          </div>

          {/* Financial Transactions */}
          <div>
            <h4 className="font-bold text-xs text-white mb-3 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-rose-400 text-[16px]">payments</span>
              Financial Transfers
            </h4>
            {txns.length > 0 ? (
              <div className="space-y-2">
                {txns.map((t) => (
                  <div key={t.id} className="p-3 bg-rose-500/10 rounded-2xl border border-rose-500/20">
                    <div className="flex justify-between items-center">
                      <span className="font-mono font-bold text-white">{t.transactionId}</span>
                      <span className="font-bold text-rose-300">{t.amount}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 flex justify-between">
                      <span>{t.from} → {t.to}</span>
                      <span>{t.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-xs">No direct banking record under this identifier.</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-white/5 bg-white/[0.01] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-white text-slate-950 hover:bg-slate-200 font-bold text-xs rounded-full shadow-xl transition-all"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
