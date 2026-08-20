import React, { useState } from 'react';
import { CASE_METADATA } from '../../data/mockData';
import { useTheme } from '../../ThemeContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { theme, setTheme } = useTheme();
  const [liveSync, setLiveSync] = useState(true);
  const [autoCorrelate, setAutoCorrelate] = useState(true);
  const [highRiskSound, setHighRiskSound] = useState(false);
  const [selectedGateway, setSelectedGateway] = useState('Gateway-Mumbai-West');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-slate-950 rounded-3xl max-w-md w-full border border-white/10 shadow-2xl p-6 animate-fade-in">
        <div className="flex justify-between items-center pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-indigo-400">settings</span>
            <h4 className="font-bold text-base text-white">SANGRAM System Config</h4>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="py-6 space-y-5 text-xs">
          {/* Theme Selector */}
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-2">
              Console Visual Theme
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`p-3 rounded-2xl border flex items-center justify-center gap-2 font-bold cursor-pointer transition-all ${
                  theme === 'dark'
                    ? 'bg-indigo-600/20 border-indigo-500 text-white'
                    : 'bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/5'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">dark_mode</span>
                Dark Theme
              </button>
              <button
                type="button"
                onClick={() => setTheme('light')}
                className={`p-3 rounded-2xl border flex items-center justify-center gap-2 font-bold cursor-pointer transition-all ${
                  theme === 'light'
                    ? 'bg-indigo-600/20 border-indigo-500 text-white'
                    : 'bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/5'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">light_mode</span>
                Light Theme
              </button>
            </div>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Investigator Credentials</span>
            <div className="flex items-center gap-3 mt-2 p-3 bg-white/[0.03] rounded-2xl border border-white/5">
              <img
                src={CASE_METADATA.investigator.avatar}
                alt="Investigator"
                className="w-10 h-10 rounded-xl object-cover border border-white/10"
                referrerPolicy="no-referrer"
              />
              <div>
                <p className="font-bold text-white text-xs">{CASE_METADATA.investigator.name}</p>
                <p className="text-[11px] text-slate-400">{CASE_METADATA.investigator.role} • Clearance L5</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Ingestion & Feeds</span>
            
            <label className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/5 cursor-pointer">
              <span className="text-slate-200">Real-time Telephony / IP Ingestion</span>
              <input
                type="checkbox"
                checked={liveSync}
                onChange={(e) => setLiveSync(e.target.checked)}
                className="rounded accent-indigo-500 w-4 h-4"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/5 cursor-pointer">
              <span className="text-slate-200">AI Cross-Domain Correlation Engine</span>
              <input
                type="checkbox"
                checked={autoCorrelate}
                onChange={(e) => setAutoCorrelate(e.target.checked)}
                className="rounded accent-indigo-500 w-4 h-4"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/5 cursor-pointer">
              <span className="text-slate-200">Critical Risk Audio Alert</span>
              <input
                type="checkbox"
                checked={highRiskSound}
                onChange={(e) => setHighRiskSound(e.target.checked)}
                className="rounded accent-indigo-500 w-4 h-4"
              />
            </label>
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-2">
              Active Security Intercept Gateway
            </label>
            <select
              value={selectedGateway}
              onChange={(e) => setSelectedGateway(e.target.value)}
              className="w-full p-3 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-indigo-500"
            >
              <option value="Gateway-Mumbai-West" className="bg-slate-900">Gateway-Mumbai-West (Primary 10 Gbps)</option>
              <option value="Gateway-Delhi-North" className="bg-slate-900">Gateway-Delhi-North (Failover 10 Gbps)</option>
              <option value="Gateway-Bangalore-South" className="bg-slate-900">Gateway-Bangalore-South (Cyber Cell)</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-white text-slate-950 hover:bg-slate-200 rounded-full font-bold text-xs shadow-xl transition-all cursor-pointer"
          >
            Apply Preferences
          </button>
        </div>
      </div>
    </div>
  );
};
