import React, { useState } from 'react';
import { BANK_TRANSACTIONS, DETECTED_ANOMALIES as BANK_ANOMALIES } from '../../data/mockData';
import { BankTransaction } from '../../types';

interface BankScreenProps {
  onOpenExportReport: () => void;
  onSelectEntity: (entityId: string) => void;
  onInspectLog?: (type: 'BANK', record: BankTransaction) => void;
}

export const BankScreen: React.FC<BankScreenProps> = ({
  onOpenExportReport,
  onSelectEntity,
  onInspectLog
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTxns = BANK_TRANSACTIONS.filter((tx) => {
    return (
      tx.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.amount.includes(searchQuery)
    );
  });

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            BANK &amp; MULE INTELLIGENCE
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Layer-1 &amp; Layer-2 financial trail tracking, rapid velocity cashout &amp; crypto off-ramp detection
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenExportReport}
            className="px-6 py-2.5 bg-white text-slate-950 font-bold text-xs rounded-full shadow-lg hover:bg-slate-200 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            Export Dossier
          </button>
        </div>
      </div>

      {/* Financial Anomalies Bento */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {BANK_ANOMALIES.map((anomaly) => (
          <div
            key={anomaly.id}
            className="p-5 rounded-3xl bg-white/[0.03] border border-white/10 shadow-xl backdrop-blur-xl flex flex-col justify-between"
          >
            <div className="flex justify-between items-start mb-3">
              <span className="material-symbols-outlined text-rose-400 text-[24px]">
                {anomaly.icon}
              </span>
              <span className="px-2.5 py-0.5 bg-rose-500/20 text-rose-300 text-[10px] font-bold rounded-full border border-rose-500/30 uppercase">
                {anomaly.risk} RISK
              </span>
            </div>
            <div>
              <h4 className="font-bold text-white text-sm mb-1">{anomaly.title}</h4>
              <p className="text-slate-400 text-xs leading-relaxed">{anomaly.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bank Transactions Table */}
      <div className="bg-white/[0.03] border border-white/10 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-2xl">
        <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <h3 className="font-bold text-lg text-white">Financial Transactions &amp; Mule Trails</h3>
            <span className="px-2.5 py-0.5 bg-rose-500/20 text-rose-300 text-xs font-bold rounded-full border border-rose-500/30">
              {filteredTxns.length} Transactions
            </span>
          </div>

          <div className="relative w-full sm:w-80">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
              search
            </span>
            <input
              type="text"
              placeholder="Search TXN ID, account, amount..."
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
                <th className="p-4 pl-6">DATE / TXN ID</th>
                <th className="p-4">FROM SOURCE</th>
                <th className="p-4">TO DESTINATION</th>
                <th className="p-4">AMOUNT</th>
                <th className="p-4">RISK</th>
                <th className="p-4">STATUS</th>
                <th className="p-4 text-right pr-6">ACTION / FULL INSPECTION PAGE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {filteredTxns.map((tx) => (
                <tr
                  key={tx.id}
                  onClick={() => onInspectLog?.('BANK', tx)}
                  className="hover:bg-white/5 transition-colors cursor-pointer group"
                >
                  <td className="p-4 pl-6">
                    <div className="font-mono text-slate-400 text-[11px]">{tx.date}</div>
                    <div className="font-mono font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {tx.transactionId}
                    </div>
                  </td>
                  <td className="p-4 font-bold text-slate-300">{tx.from}</td>
                  <td className="p-4 font-bold text-rose-300">{tx.to}</td>
                  <td className="p-4 font-bold text-emerald-400 text-sm">{tx.amount}</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        tx.risk === 'HIGH'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {tx.risk}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-rose-400">{tx.status}</td>
                  <td className="p-4 text-right pr-6">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onInspectLog?.('BANK', tx);
                      }}
                      className="px-3 py-1.5 bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white rounded-xl text-[11px] font-bold flex items-center gap-1.5 ml-auto cursor-pointer shadow-md"
                    >
                      <span className="material-symbols-outlined text-[14px]">search_hands_free</span>
                      Full Inspection Page
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
