import React, { useState } from 'react';
import { SOCIAL_PROFILES, ACTIVITY_TIMELINE_ITEMS } from '../../data/mockData';
import { SocialProfile } from '../../types';

interface SocialScreenProps {
  onOpenExportReport: () => void;
  onSelectEntity: (entityId: string) => void;
}

export const SocialScreen: React.FC<SocialScreenProps> = ({
  onOpenExportReport,
  onSelectEntity
}) => {
  const [filterPlatform, setFilterPlatform] = useState<string>('ALL');
  const [searchHandle, setSearchHandle] = useState('');
  const [selectedProfile, setSelectedProfile] = useState<SocialProfile | null>(null);
  const [addProfileOpen, setAddProfileOpen] = useState(false);
  const [newHandle, setNewHandle] = useState('');
  const [newPlatform, setNewPlatform] = useState<'Telegram' | 'Instagram' | 'Twitter' | 'WhatsApp'>('Telegram');

  const filteredProfiles = SOCIAL_PROFILES.filter((prof) => {
    const matchesPlatform =
      filterPlatform === 'ALL' || prof.platform.toUpperCase() === filterPlatform;
    const matchesSearch =
      prof.handle.toLowerCase().includes(searchHandle.toLowerCase()) ||
      prof.linkedEntity.toLowerCase().includes(searchHandle.toLowerCase());
    return matchesPlatform && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-white mb-1">
            SOCIAL <span className="font-medium text-indigo-400">INTELLIGENCE</span>
          </h2>
          <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
            Digital Footprint, Handle Correlation &amp; OSINT Broadcasts
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setAddProfileOpen(true)}
            className="px-5 py-2.5 rounded-full border border-white/10 text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 text-xs font-semibold transition-all flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            Add Target Profile
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
        {/* Monitored Accounts */}
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 flex flex-col justify-between h-36 shadow-xl backdrop-blur-xl">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Monitored Accounts
            </span>
            <span className="material-symbols-outlined text-indigo-400 text-[18px]">group</span>
          </div>
          <div className="text-3xl font-light text-white leading-none">8</div>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="w-3/4 h-full bg-indigo-400 rounded-full"></div>
          </div>
        </div>

        {/* Suspicious Profiles */}
        <div className="bg-white/[0.03] border border-rose-500/30 rounded-3xl p-6 flex flex-col justify-between h-36 shadow-xl backdrop-blur-xl bg-rose-500/[0.02]">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Suspicious Profiles
            </span>
            <span className="material-symbols-outlined text-rose-400 text-[18px]">verified_user</span>
          </div>
          <div className="text-3xl font-light text-rose-400 leading-none">5</div>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="w-2/3 h-full bg-rose-400 rounded-full"></div>
          </div>
        </div>

        {/* Network Interactions */}
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 flex flex-col justify-between h-36 shadow-xl backdrop-blur-xl">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Network Interactions
            </span>
            <span className="material-symbols-outlined text-emerald-400 text-[18px]">share</span>
          </div>
          <div className="text-3xl font-light text-white leading-none">128</div>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="w-4/5 h-full bg-emerald-400 rounded-full"></div>
          </div>
        </div>

        {/* New Accounts Detected */}
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 flex flex-col justify-between h-36 shadow-xl backdrop-blur-xl">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              New Accounts Detected
            </span>
            <span className="material-symbols-outlined text-amber-400 text-[18px]">fiber_new</span>
          </div>
          <div className="text-3xl font-light text-white leading-none">4</div>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="w-1/2 h-full bg-amber-400 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Social Profile Cards (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Controls Bar */}
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 flex flex-wrap justify-between items-center gap-4 shadow-xl backdrop-blur-xl">
            <h3 className="text-lg font-medium text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-indigo-400">public</span>
              MONITORED PROFILES
            </h3>

            <div className="flex items-center gap-3">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-[16px]">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search handle or entity..."
                  value={searchHandle}
                  onChange={(e) => setSearchHandle(e.target.value)}
                  className="pl-9 pr-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-full text-slate-200 placeholder:text-slate-500 outline-none focus:border-indigo-500 w-44"
                />
              </div>

              {/* Filter Tabs */}
              <div className="flex bg-white/5 p-1 rounded-full border border-white/10">
                {['ALL', 'TELEGRAM', 'INSTAGRAM', 'TWITTER'].map((plat) => (
                  <button
                    key={plat}
                    onClick={() => setFilterPlatform(plat)}
                    className={`px-3 py-1 text-[10px] font-bold rounded-full transition-all cursor-pointer ${
                      filterPlatform === plat
                        ? 'bg-white/20 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {plat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Profile Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProfiles.map((prof) => (
              <div
                key={prof.id}
                onClick={() => setSelectedProfile(prof)}
                className="bg-white/[0.03] border border-white/10 hover:border-white/20 rounded-3xl p-6 flex flex-col justify-between shadow-2xl backdrop-blur-2xl transition-all cursor-pointer group"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={prof.avatarUrl}
                        alt={prof.handle}
                        className="w-12 h-12 rounded-2xl object-cover border border-white/10 group-hover:ring-2 group-hover:ring-indigo-500/50 transition-all"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="font-bold text-white text-sm group-hover:text-indigo-300 transition-colors">
                          {prof.handle}
                        </h4>
                        <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <span className="material-symbols-outlined text-[14px] text-indigo-400">
                            {prof.platformIcon}
                          </span>
                          {prof.platform}
                        </span>
                      </div>
                    </div>

                    {prof.risk === 'HIGH' && (
                      <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                        HIGH
                      </span>
                    )}
                    {prof.risk === 'MED' && (
                      <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                        MED
                      </span>
                    )}
                    {prof.risk === 'LOW' && (
                      <span className="bg-white/5 text-slate-400 border border-white/10 text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                        LOW
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {prof.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500 text-[11px]">Linked:</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectEntity(prof.linkedEntity);
                      }}
                      className="font-bold text-white hover:text-indigo-400 hover:underline cursor-pointer"
                    >
                      {prof.linkedEntity}
                    </button>
                  </div>
                  <span className="font-bold text-indigo-400 text-xs">{prof.confidence} Match</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Activity Timeline (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl flex-1 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-white/5 mb-6">
                <h3 className="text-lg font-medium text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-indigo-400">notifications</span>
                  ACTIVITY TIMELINE
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                  Real-time
                </span>
              </div>

              {/* Vertical Timeline */}
              <div className="relative pl-6 space-y-6">
                {/* Vertical connecting line */}
                <div className="absolute left-2.5 top-3 bottom-3 w-0.5 bg-white/10"></div>

                {ACTIVITY_TIMELINE_ITEMS.map((item) => (
                  <div key={item.id} className="relative group cursor-pointer">
                    {/* Node Dot */}
                    <div
                      className={`absolute -left-6 top-1 w-3 h-3 rounded-full border-2 border-[#02040a] ${
                        item.isPulsing
                          ? 'bg-rose-500 ring-4 ring-rose-500/30 animate-pulse'
                          : 'bg-indigo-400'
                      }`}
                    />
                    <div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white group-hover:text-indigo-300 transition-colors">
                          {item.title}
                        </span>
                        <span className="font-mono text-[11px] text-slate-500">{item.time}</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => alert('Starting real-time web crawler across Telegram channels and Instagram tags...')}
              className="w-full mt-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-xs font-semibold text-slate-200 transition-all cursor-pointer text-center"
            >
              Sync Live OSINT Scraping
            </button>
          </div>
        </div>
      </div>

      {/* Target Profile Inspection Modal */}
      {selectedProfile && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-slate-950 rounded-3xl max-w-lg w-full border border-white/10 shadow-2xl p-6 animate-fade-in">
            <div className="flex justify-between items-center pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <img
                  src={selectedProfile.avatarUrl}
                  alt={selectedProfile.handle}
                  className="w-10 h-10 rounded-xl object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-base text-white">{selectedProfile.handle}</h4>
                  <p className="text-xs text-slate-400">{selectedProfile.platform} Intelligence Record</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedProfile(null)}
                className="text-slate-400 hover:text-white"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="py-6 space-y-4 text-xs">
              <div className="bg-white/[0.03] p-4 rounded-2xl border border-white/5 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Linked Entity Dossier</span>
                  <span className="font-bold text-indigo-300">{selectedProfile.linkedEntity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Confidence Rating</span>
                  <span className="font-bold text-emerald-400">{selectedProfile.confidence}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Audience / Followers</span>
                  <span className="text-white font-mono">{selectedProfile.followers || '4,210'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Last Broadcast</span>
                  <span className="text-slate-300">{selectedProfile.lastActive || '18m ago'}</span>
                </div>
              </div>

              <div>
                <span className="font-bold text-white block mb-1">Intelligence Assessment:</span>
                <p className="text-slate-400 leading-relaxed">{selectedProfile.description}</p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
              <button
                onClick={() => {
                  onSelectEntity(selectedProfile.linkedEntity);
                  setSelectedProfile(null);
                }}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-full"
              >
                Inspect Linked {selectedProfile.linkedEntity}
              </button>
              <button
                onClick={() => setSelectedProfile(null)}
                className="px-5 py-2 bg-white text-slate-950 font-bold text-xs rounded-full hover:bg-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Target Profile Modal */}
      {addProfileOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-slate-950 rounded-3xl max-w-md w-full border border-white/10 shadow-2xl p-6 animate-fade-in">
            <div className="flex justify-between items-center pb-4 border-b border-white/10">
              <h4 className="font-bold text-base text-white">Add Target Social Profile</h4>
              <button
                onClick={() => setAddProfileOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(`Target handle ${newHandle} on ${newPlatform} added to automated monitoring index.`);
                setAddProfileOpen(false);
                setNewHandle('');
              }}
              className="py-6 space-y-4 text-xs"
            >
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Platform</label>
                <select
                  value={newPlatform}
                  onChange={(e) => setNewPlatform(e.target.value as any)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white outline-none"
                >
                  <option value="Telegram" className="bg-slate-900">Telegram</option>
                  <option value="Instagram" className="bg-slate-900">Instagram</option>
                  <option value="Twitter" className="bg-slate-900">Twitter (X)</option>
                  <option value="WhatsApp" className="bg-slate-900">WhatsApp Group</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Handle / Channel Link</label>
                <input
                  type="text"
                  required
                  placeholder="@handle or t.me/channel"
                  value={newHandle}
                  onChange={(e) => setNewHandle(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setAddProfileOpen(false)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 font-semibold text-xs rounded-full"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-white text-slate-950 font-bold text-xs rounded-full hover:bg-slate-200"
                >
                  Add Target
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
