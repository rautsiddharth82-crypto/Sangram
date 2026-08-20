import React, { useState, useMemo } from 'react';
import { BANK_TRANSACTIONS, DETECTED_ANOMALIES } from '../../data/mockData';
import { BankTransaction } from '../../types';

interface BankScreenProps {
  onOpenExportReport: () => void;
  onSelectEntity: (entityId: string) => void;
}

export const BankScreen: React.FC<BankScreenProps> = ({
  onOpenExportReport,
  onSelectEntity
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRisk, setFilterRisk] = useState<string>('ALL');
  const [selectedTxn, setSelectedTxn] = useState<BankTransaction | null>(null);

  const filteredTxns = useMemo(() => {
    return BANK_TRANSACTIONS.filter((txn) => {
      const matchesSearch =
        txn.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
        txn.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
        txn.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        txn.amount.includes(searchQuery);
      const matchesRisk = filterRisk === 'ALL' || txn.risk === filterRisk;
      return matchesSearch && matchesRisk;
    });
  }, [searchQuery, filterRisk]);

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-white mb-1">
            BANKING <span className="font-medium text-indigo-400">INTELLIGENCE</span>
          </h2>
          <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
            Financial Layering, Mule Accounts &amp; Fund Flow Tracker
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => {
              alert('Generating FIU-IND suspicious transaction report template...');
            }}
            className="px-5 py-2.5 rounded-full border border-white/10 text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 text-xs font-semibold transition-all flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
            FIU Export
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
        {/* Transactions */}
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 flex flex-col justify-between h-36 shadow-xl backdrop-blur-xl">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Transactions
            </span>
            <span className="material-symbols-outlined text-indigo-400 text-[18px]">receipt_long</span>
          </div>
          <div className="text-3xl font-light text-white leading-none">482</div>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="w-4/5 h-full bg-indigo-400 rounded-full"></div>
          </div>
        </div>

        {/* Total Value */}
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 flex flex-col justify-between h-36 shadow-xl backdrop-blur-xl">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Total Value
            </span>
            <span className="material-symbols-outlined text-emerald-400 text-[18px]">currency_rupee</span>
          </div>
          <div className="text-3xl font-light text-white leading-none">₹18.7L</div>
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
            <span className="material-symbols-outlined text-amber-400 text-[18px]">warning</span>
          </div>
          <div className="text-3xl font-light text-white leading-none">27</div>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="w-2/5 h-full bg-amber-400 rounded-full"></div>
          </div>
        </div>

        {/* Mule Accounts */}
        <div className="bg-white/[0.03] border border-rose-500/30 rounded-3xl p-6 flex flex-col justify-between h-36 shadow-xl backdrop-blur-xl bg-rose-500/[0.02]">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Mule Accounts
            </span>
            <span className="material-symbols-outlined text-rose-400 text-[18px]">gavel</span>
          </div>
          <div className="text-3xl font-light text-rose-400 leading-none">11</div>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="w-3/4 h-full bg-rose-400 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Bank Statement Table (8 cols) */}
        <div className="lg:col-span-8 bg-white/[0.03] border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl min-h-[520px]">
          <div className="p-6 border-b border-white/5 flex flex-wrap justify-between items-center gap-4 bg-white/[0.01]">
            <h3 className="text-lg font-medium text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-indigo-400">account_balance</span>
              BANK STATEMENT
            </h3>
            <div className="flex items-center gap-3">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-[16px]">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search account / Txn ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-full text-slate-200 placeholder:text-slate-500 outline-none focus:border-indigo-500 w-48 transition-all"
                />
              </div>
              <select
                value={filterRisk}
                onChange={(e) => setFilterRisk(e.target.value)}
                className="text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-slate-300 outline-none cursor-pointer"
              >
                <option value="ALL" className="bg-slate-900 text-slate-200">All Transactions</option>
                <option value="HIGH" className="bg-slate-900 text-rose-300">High Risk Only</option>
                <option value="MED" className="bg-slate-900 text-amber-300">Medium Risk</option>
                <option value="LOW" className="bg-slate-900 text-slate-300">Low Risk</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/[0.02] border-b border-white/5 text-[10px] font-bold uppercase text-slate-400 tracking-widest">
                  <th className="px-6 py-4 whitespace-nowrap">Date</th>
                  <th className="px-6 py-4 whitespace-nowrap">Txn ID</th>
                  <th className="px-6 py-4 whitespace-nowrap">From</th>
                  <th className="px-6 py-4 whitespace-nowrap">To</th>
                  <th className="px-6 py-4 whitespace-nowrap">Amount</th>
                  <th className="px-6 py-4 whitespace-nowrap">Risk</th>
                  <th className="px-6 py-4 whitespace-nowrap">Status</th>
                  <th className="px-6 py-4 whitespace-nowrap text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-300 divide-y divide-white/5">
                {filteredTxns.map((txn) => (
                  <tr
                    key={txn.id}
                    onClick={() => setSelectedTxn(txn)}
                    className="hover:bg-white/[0.04] transition-colors cursor-pointer group"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-slate-400 font-mono text-xs">
                      {txn.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-mono text-xs text-slate-300">
                      {txn.transactionId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-semibold">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectEntity(txn.from);
                        }}
                        className="text-white hover:text-indigo-400 hover:underline cursor-pointer"
                      >
                        {txn.from}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-semibold">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectEntity(txn.to);
                        }}
                        className={`hover:underline cursor-pointer ${
                          txn.to === 'A204' ? 'text-rose-400' : 'text-white'
                        }`}
                      >
                        {txn.to}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-bold text-white">
                      {txn.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {txn.risk === 'HIGH' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          HIGH
                        </span>
                      )}
                      {txn.risk === 'MED' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          MED
                        </span>
                      )}
                      {txn.risk === 'LOW' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/5 text-slate-400 border border-white/10">
                          LOW
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`font-semibold text-xs tracking-wider ${
                          txn.status === 'FLAGGED'
                            ? 'text-rose-400'
                            : txn.status === 'REVIEW'
                            ? 'text-amber-400'
                            : 'text-slate-400'
                        }`}
                      >
                        {txn.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTxn(txn);
                        }}
                        className="text-indigo-400 hover:text-indigo-300 p-1.5 rounded-xl hover:bg-white/5 transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">receipt</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-white/5 bg-white/[0.01] flex justify-between items-center text-xs text-slate-400">
            <span>Showing {filteredTxns.length} financial transactions</span>
            <span className="font-mono text-[10px] text-slate-500">Gateway: NPCI UPI / IMPS Switch</span>
          </div>
        </div>

        {/* Right Column: Flow Visualizer & Anomalies (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Flow Visualizer Widget */}
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-medium text-white mb-6 border-b border-white/5 pb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-rose-400">account_tree</span>
                MONEY FLOW
              </h3>

              <div className="flex items-center justify-between relative py-6">
                {/* SVG link */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                  <line
                    stroke="#f43f5e"
                    strokeWidth="3"
                    x1="20%"
                    x2="80%"
                    y1="50%"
                    y2="50%"
                  />
                </svg>

                {/* Node P087 */}
                <div
                  onClick={() => onSelectEntity('P087')}
                  className="flex flex-col items-center gap-2 cursor-pointer relative z-10 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 border-2 border-indigo-500 shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-indigo-300 text-[24px]">person</span>
                  </div>
                  <span className="text-xs font-bold text-white">P087</span>
                  <span className="text-[10px] text-slate-400">Source</span>
                </div>

                {/* Transfer Pill */}
                <div className="bg-rose-500/20 border border-rose-500/40 text-rose-300 px-3 py-1.5 rounded-full text-[11px] font-bold shadow-xl relative z-10 flex flex-col items-center animate-pulse">
                  <span>₹4,80,000</span>
                  <span className="text-[9px] text-rose-400 font-mono">IMPS REF#912</span>
                </div>

                {/* Node A204 Mule */}
                <div
                  onClick={() => onSelectEntity('A204')}
                  className="flex flex-col items-center gap-2 cursor-pointer relative z-10 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 border-2 border-rose-500 shadow-xl shadow-rose-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-rose-400 text-[24px]">account_balance</span>
                  </div>
                  <span className="text-xs font-bold text-rose-400">A204</span>
                  <span className="text-[10px] text-rose-400 font-semibold uppercase">Mule</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 leading-relaxed">
              <span className="font-bold block mb-1">Instant Cashout Flag:</span>
              Funds transferred from P087 to A204 were withdrawn within 4 minutes at ATM-Nariman Point.
            </div>
          </div>

          {/* Detected Anomalies */}
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-medium text-white mb-6 border-b border-white/5 pb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-400">policy</span>
                DETECTED ANOMALIES
              </h3>
              <div className="flex flex-col gap-3">
                {DETECTED_ANOMALIES.map((anomaly) => (
                  <div
                    key={anomaly.id}
                    className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-amber-500/40 transition-colors flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[18px]">{anomaly.icon}</span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{anomaly.title}</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {anomaly.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => alert('Freezing order generated for Mule Account A204 via Legal Sec 91 CrPC.')}
              className="w-full mt-6 py-3.5 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl text-xs font-bold shadow-xl shadow-rose-500/20 transition-all cursor-pointer text-center"
            >
              Generate Account Freeze Notice (A204)
            </button>
          </div>
        </div>
      </div>

      {/* Transaction Modal */}
      {selectedTxn && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-slate-950 rounded-3xl max-w-md w-full border border-white/10 shadow-2xl p-6 animate-fade-in">
            <div className="flex justify-between items-center pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-indigo-400">receipt</span>
                <h4 className="font-bold text-base text-white">Txn Voucher: {selectedTxn.transactionId}</h4>
              </div>
              <button
                onClick={() => setSelectedTxn(null)}
                className="text-slate-400 hover:text-white"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="py-6 space-y-4 text-xs">
              <div className="bg-white/[0.03] p-4 rounded-2xl border border-white/5 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Transaction Amount</span>
                  <span className="text-base font-bold text-white">{selectedTxn.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Transfer Time</span>
                  <span className="font-mono text-slate-300">{selectedTxn.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Remitter Entity</span>
                  <span className="font-bold text-white">{selectedTxn.from}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Beneficiary Entity</span>
                  <span className="font-bold text-rose-400">{selectedTxn.to}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
              <button
                onClick={() => {
                  onSelectEntity(selectedTxn.to);
                  setSelectedTxn(null);
                }}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-full"
              >
                Inspect Beneficiary {selectedTxn.to}
              </button>
              <button
                onClick={() => setSelectedTxn(null)}
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
