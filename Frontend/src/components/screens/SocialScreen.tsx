import React, { useState } from 'react';
import { SOCIAL_PROFILES } from '../../data/mockData';
import { SocialProfile } from '../../types';
import { LogInspectorModal } from '../modals/LogInspectorModal';

interface SocialScreenProps {
  onOpenExportReport: () => void;
  onSelectEntity: (entityId: string) => void;
}

export const SocialScreen: React.FC<SocialScreenProps> = ({
  onOpenExportReport,
  onSelectEntity
}) => {
  const [inspectedSocialLog, setInspectedSocialLog] = useState<SocialProfile | null>(null);

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            SOCIAL OSINT &amp; RECRUITMENT INTELLIGENCE
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Telegram, Instagram &amp; WhatsApp scam recruitment channels &amp; coordinated lure campaign monitoring
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenExportReport}
            className="px-6 py-2.5 bg-white text-slate-950 font-bold text-xs rounded-full shadow-lg hover:bg-slate-200 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            Export Report
          </button>
        </div>
      </div>

      {/* Social Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SOCIAL_PROFILES.map((profile) => (
          <div
            key={profile.id}
            onClick={() => setInspectedSocialLog(profile)}
            className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-white/20 shadow-xl backdrop-blur-xl space-y-4 cursor-pointer group transition-all"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 overflow-hidden flex items-center justify-center text-indigo-300">
                  <span className="material-symbols-outlined text-[24px]">public</span>
                </div>
                <div>
                  <h4 className="font-bold text-white text-base group-hover:text-indigo-300 transition-colors">
                    {profile.handle}
                  </h4>
                  <span className="text-xs text-slate-400">
                    {profile.platform} • Linked Suspect: <strong className="text-white">{profile.linkedEntity}</strong>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-rose-500/20 text-rose-300 text-[10px] font-bold rounded-full border border-rose-500/30 uppercase">
                  {profile.risk} RISK
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setInspectedSocialLog(profile);
                  }}
                  className="px-3 py-1 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30 rounded-xl text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">psychology</span>
                  Inspect
                </button>
              </div>
            </div>

            <p className="text-slate-300 text-xs leading-relaxed">{profile.description}</p>

            <div className="flex justify-between items-center pt-3 border-t border-white/5 text-xs text-slate-400">
              <span>Subscribers: <strong className="text-white">{profile.followers || '4.2K'}</strong></span>
              <span>Confidence: <strong className="text-emerald-400">{profile.confidence}</strong></span>
              <span>Active: <strong className="text-slate-300">{profile.lastActive}</strong></span>
            </div>
          </div>
        ))}
      </div>

      {/* Log Inspector Modal with Groq AI Reasoning */}
      <LogInspectorModal
        isOpen={!!inspectedSocialLog}
        onClose={() => setInspectedSocialLog(null)}
        logType="SOCIAL"
        logData={inspectedSocialLog}
        onSelectEntity={onSelectEntity}
      />
    </div>
  );
};
