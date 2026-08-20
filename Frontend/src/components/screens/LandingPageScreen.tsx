import React, { useState } from 'react';
import { NavTab } from '../../types';

interface LandingPageScreenProps {
  onEnterApp: (tab?: NavTab) => void;
  onOpenNetworkModal: () => void;
  onOpenExportModal: () => void;
}

export const LandingPageScreen: React.FC<LandingPageScreenProps> = ({
  onEnterApp,
  onOpenNetworkModal,
  onOpenExportModal
}) => {
  const [activePreviewTab, setActivePreviewTab] = useState<'all' | 'cdr' | 'ipdr' | 'bank' | 'social'>('all');

  return (
    <div className="min-h-screen bg-[#02040a] text-slate-200 font-sans flex flex-col relative overflow-x-hidden selection:bg-indigo-500/30 selection:text-white">
      {/* Background Decorative Glow Orbs */}
      <div className="fixed top-[-15%] left-[20%] w-[900px] h-[600px] bg-indigo-600/15 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="fixed top-[40%] right-[-10%] w-[700px] h-[700px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[170px] pointer-events-none z-0" />

      {/* Standalone Public Header (No Sidebar) */}
      <header className="sticky top-0 w-full bg-[#02040a]/80 backdrop-blur-2xl border-b border-white/5 z-50 transition-all">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
          {/* SANGRAM Brand Logo */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white">
              <span className="material-symbols-outlined fill text-[22px]">shield</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[19px] font-light tracking-tight text-white">
                  Project <span className="font-semibold text-indigo-400">SANGRAM</span>
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 hidden sm:inline-block">
                  v4.2 PRO
                </span>
              </div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest hidden sm:block">
                Digital Intel &amp; Cross-Correlation Matrix
              </p>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-400">
            <a href="#domains" className="hover:text-white transition-colors">
              Intelligence Domains
            </a>
            <a href="#terminal" className="hover:text-white transition-colors">
              Live Terminal Matrix
            </a>
            <a href="#cases" className="hover:text-white transition-colors">
              Case 360 Search
            </a>
            <a href="#compliance" className="hover:text-white transition-colors">
              Sec 65B Compliance
            </a>
          </nav>

          {/* Right Action Trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onEnterApp('case-search')}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full text-xs font-semibold backdrop-blur-md transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-indigo-400">manage_search</span>
              Case 360 Search
            </button>

            <button
              id="landing-enter-console-btn"
              onClick={() => onEnterApp('dashboard')}
              className="px-6 py-2.5 bg-white text-slate-950 hover:bg-slate-200 rounded-full font-bold text-xs shadow-xl shadow-white/10 transition-all flex items-center gap-2 cursor-pointer hover:scale-105"
            >
              <span className="material-symbols-outlined text-[16px]">lock_open</span>
              Launch Command Center
            </button>
          </div>
        </div>
      </header>

      {/* Main Landing Content */}
      <main className="flex-1 z-10 space-y-24 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Hero Section */}
        <section className="text-center space-y-8 max-w-5xl mx-auto pt-6 sm:pt-14">
          {/* Top Floating Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-2xl">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-slate-300">
              NATIONAL DIGITAL INTELLIGENCE &amp; CORRELATION GRID
            </span>
          </div>

          {/* Hero Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extralight tracking-tight text-white leading-[1.08]">
            Cross-Domain Intelligence <br />
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-200 to-emerald-300">
              Automated at Line-Rate
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-400 font-light max-w-3xl mx-auto leading-relaxed">
            Instantly correlate <span className="text-indigo-300 font-medium">Call Detail Records (CDR)</span>,{' '}
            <span className="text-emerald-300 font-medium">IPDR Cyber Sessions</span>,{' '}
            <span className="text-rose-300 font-medium">Mule Banking Trails</span>, and{' '}
            <span className="text-amber-300 font-medium">Darknet/Social OSINT</span> in real time for law enforcement agencies.
          </p>

          {/* Hero CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onEnterApp('dashboard')}
              className="px-8 py-4 bg-white text-slate-950 hover:bg-slate-200 rounded-full font-bold text-sm shadow-2xl shadow-white/20 transition-all flex items-center gap-3 cursor-pointer group hover:scale-105"
            >
              <span className="material-symbols-outlined text-[20px] text-indigo-600">shield</span>
              Enter Investigation Console
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>

            <button
              onClick={() => onEnterApp('case-search')}
              className="px-8 py-4 bg-indigo-500/15 hover:bg-indigo-500/25 border border-indigo-500/30 text-indigo-200 hover:text-white rounded-full font-semibold text-sm backdrop-blur-xl shadow-xl transition-all flex items-center gap-2 cursor-pointer hover:border-indigo-400"
            >
              <span className="material-symbols-outlined text-[20px]">manage_search</span>
              Universal Case 360 Search
            </button>

            <button
              onClick={onOpenNetworkModal}
              className="px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white rounded-full font-semibold text-sm backdrop-blur-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">hub</span>
              Live Link Graph Demo
            </button>
          </div>

          {/* Live Threat Telemetry Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 pt-8 text-left">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md">
              <span className="text-[10px] uppercase font-mono font-bold text-slate-500 tracking-wider">
                Telemetry Ingestion
              </span>
              <div className="text-2xl font-light text-white font-mono mt-1.5 flex items-baseline gap-1.5">
                18,400+ <span className="text-xs text-indigo-400 font-normal">events/sec</span>
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md">
              <span className="text-[10px] uppercase font-mono font-bold text-slate-500 tracking-wider">
                Correlation Latency
              </span>
              <div className="text-2xl font-light text-emerald-400 font-mono mt-1.5 flex items-baseline gap-1.5">
                &lt; 1.2s <span className="text-xs text-slate-400 font-normal">cross-domain</span>
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md">
              <span className="text-[10px] uppercase font-mono font-bold text-slate-500 tracking-wider">
                Mule Chains Tracked
              </span>
              <div className="text-2xl font-light text-rose-400 font-mono mt-1.5 flex items-baseline gap-1.5">
                ₹18.7 Cr+ <span className="text-xs text-slate-400 font-normal">flagged</span>
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md">
              <span className="text-[10px] uppercase font-mono font-bold text-slate-500 tracking-wider">
                Statutory Readiness
              </span>
              <div className="text-2xl font-light text-amber-400 font-mono mt-1.5 flex items-baseline gap-1.5">
                Sec 65B <span className="text-xs text-slate-400 font-normal">Certified</span>
              </div>
            </div>
          </div>
        </section>

        {/* Holographic Interactive Showcase Terminal */}
        <section id="terminal" className="space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest">
              SIMULATED INVESTIGATION MATRIX
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-white">
              Real-Time Cross-Domain Intercept Console
            </h2>
          </div>

          <div className="rounded-3xl sm:rounded-[36px] bg-slate-950/90 border border-white/10 shadow-2xl overflow-hidden backdrop-blur-2xl">
            {/* Terminal Window Chrome */}
            <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-xs font-mono text-slate-400 ml-2">
                  sangram-intel-terminal://case-2047/matrix-live
                </span>
              </div>

              {/* Interactive Domain Filter Tabs */}
              <div className="flex bg-white/5 p-1 rounded-full border border-white/10 text-xs font-semibold">
                {[
                  { id: 'all', label: 'All 5 Domains' },
                  { id: 'cdr', label: 'CDR Intercepts' },
                  { id: 'ipdr', label: 'IPDR Cyber' },
                  { id: 'bank', label: 'Banking Flow' },
                  { id: 'social', label: 'OSINT Footprint' }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActivePreviewTab(t.id as any)}
                    className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                      activePreviewTab === t.id
                        ? 'bg-white/20 text-white font-bold shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6 bg-[#02040a]">
              {/* Left: Active Investigation Snapshot */}
              <div className="lg:col-span-2 space-y-5">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono font-bold text-indigo-300">#INV-2047</span>
                      <span className="px-2 py-0.5 bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold rounded-full">
                        HIGH RISK CRITICAL
                      </span>
                    </div>
                    <h4 className="text-base font-medium text-white mt-1">
                      Telegram Mule Task Fraud &amp; ATM Cashout Cluster
                    </h4>
                  </div>
                  <button
                    onClick={() => onEnterApp('case-search')}
                    className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full text-xs font-bold transition-colors cursor-pointer"
                  >
                    Inspect Case 360
                  </button>
                </div>

                {/* Dynamic Live Domain Feed */}
                <div className="space-y-3">
                  {(activePreviewTab === 'all' || activePreviewTab === 'cdr') && (
                    <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center">
                          <span className="material-symbols-outlined text-[20px]">call</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white">4m 21s Cellular Intercept</span>
                            <span className="text-[10px] font-mono text-slate-400">14:22:15 IST</span>
                          </div>
                          <p className="text-xs text-slate-300">
                            P102 (+91 98201 44812) ➔ P087 (+91 98332 99182) via Cell Tower #881 (Nariman Point)
                          </p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 bg-rose-500/20 text-rose-300 text-[10px] font-bold rounded-full shrink-0">
                        FLAGGED
                      </span>
                    </div>
                  )}

                  {(activePreviewTab === 'all' || activePreviewTab === 'ipdr') && (
                    <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
                          <span className="material-symbols-outlined text-[20px]">lan</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white">SSH Proxy Jump Detected</span>
                            <span className="text-[10px] font-mono text-slate-400">14:25:01 IST</span>
                          </div>
                          <p className="text-xs text-slate-300">
                            IP 103.45.XX.21 connected through WireGuard Tunnel (Port 9001) targeting Telegram Bot
                          </p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold rounded-full shrink-0">
                        TRACKED
                      </span>
                    </div>
                  )}

                  {(activePreviewTab === 'all' || activePreviewTab === 'bank') && (
                    <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-300 flex items-center justify-center">
                          <span className="material-symbols-outlined text-[20px]">payments</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white">₹4,80,000 Rapid Layering Transfer</span>
                            <span className="text-[10px] font-mono text-slate-400">14:28:40 IST</span>
                          </div>
                          <p className="text-xs text-slate-300">
                            HDFC #8821 ➔ Mule ICICI #4412 (A204). Cash withdrawn within 4 minutes at ATM
                          </p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 bg-rose-500/20 text-rose-300 text-[10px] font-bold rounded-full shrink-0">
                        LEIN APPLIED
                      </span>
                    </div>
                  )}

                  {(activePreviewTab === 'all' || activePreviewTab === 'social') && (
                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center">
                          <span className="material-symbols-outlined text-[20px]">public</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white">Telegram Broadcast Lead</span>
                            <span className="text-[10px] font-mono text-slate-400">12:04:00 IST</span>
                          </div>
                          <p className="text-xs text-slate-300">
                            @quick_jobs_help recruited 14,200 channel members using fraudulent work-from-home tasks
                          </p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 text-[10px] font-bold rounded-full shrink-0">
                        MONITORED
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Quick Topology & Action Strip */}
              <div className="space-y-4 flex flex-col justify-between">
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Cross-Correlation Score
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="text-4xl font-light font-mono text-indigo-300">98.4%</div>
                    <div className="text-[11px] text-slate-400 leading-tight">
                      Deterministic link between telephony &amp; financial timing
                    </div>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-indigo-400 h-full w-[98.4%]" />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Evidence Readiness
                  </span>
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                    SHA-256 Hash Chained &amp; Ready
                  </div>
                  <p className="text-xs text-slate-400">
                    Automated Section 65B Indian Evidence Act certificates ready for court filing.
                  </p>
                </div>

                <button
                  onClick={() => onEnterApp('dashboard')}
                  className="w-full py-3.5 bg-white text-slate-950 hover:bg-slate-200 rounded-full font-bold text-xs shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                  Open Live Investigation Workspace
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 4 Core Intelligence Pillars (Bento Grid) */}
        <section id="domains" className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest">
              FOUR RECONNAISSANCE DOMAINS
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-white">
              Complete Digital Forensic Arsenal
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pillar 1: CDR */}
            <div
              onClick={() => onEnterApp('cdr')}
              className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-indigo-500/40 hover:bg-white/[0.04] transition-all cursor-pointer group shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[24px]">call</span>
                </div>
                <h3 className="text-xl font-medium text-white mb-2 group-hover:text-indigo-300 transition-colors">
                  CDR Telephony Intelligence
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  Parse millions of carrier Call Detail Records in seconds. Identify recurring call bursts, burner phone SIM rotations, IMEI handset shifts, and cell tower triangulation.
                </p>
              </div>
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-indigo-400 font-semibold">
                <span>Explore CDR Module</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>

            {/* Pillar 2: IPDR */}
            <div
              onClick={() => onEnterApp('ipdr')}
              className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-emerald-500/40 hover:bg-white/[0.04] transition-all cursor-pointer group shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[24px]">lan</span>
                </div>
                <h3 className="text-xl font-medium text-white mb-2 group-hover:text-emerald-300 transition-colors">
                  IPDR Cyber &amp; Proxy Tracking
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  Unmask VPN hops, Tor exit relays, and malicious proxy servers. Map autonomous system numbers (ASN), protocol port behaviors, and high-frequency data transfers.
                </p>
              </div>
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-emerald-400 font-semibold">
                <span>Explore IPDR Module</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>

            {/* Pillar 3: Bank */}
            <div
              onClick={() => onEnterApp('bank')}
              className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-rose-500/40 hover:bg-white/[0.04] transition-all cursor-pointer group shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[24px]">account_balance</span>
                </div>
                <h3 className="text-xl font-medium text-white mb-2 group-hover:text-rose-300 transition-colors">
                  Mule Ring &amp; Banking Trail
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  Trace complex multi-hop financial layering across savings accounts, current accounts, UPI IDs, and cryptocurrency on-ramp gateways with automated debit freezes.
                </p>
              </div>
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-rose-400 font-semibold">
                <span>Explore Bank Module</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>

            {/* Pillar 4: Social OSINT */}
            <div
              onClick={() => onEnterApp('social')}
              className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-amber-500/40 hover:bg-white/[0.04] transition-all cursor-pointer group shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[24px]">public</span>
                </div>
                <h3 className="text-xl font-medium text-white mb-2 group-hover:text-amber-300 transition-colors">
                  Social Footprint &amp; OSINT
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  Continuously scan open-source channels, Telegram syndicates, Instagram handles, and dark web forums. Associate physical suspect identities with digital aliases.
                </p>
              </div>
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-amber-400 font-semibold">
                <span>Explore OSINT Module</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Legal & Compliance Section */}
        <section id="compliance" className="max-w-5xl mx-auto w-full text-center">
          <div className="p-10 sm:p-14 rounded-3xl sm:rounded-[40px] bg-gradient-to-b from-indigo-950/40 via-slate-950/80 to-[#02040a] border border-white/10 shadow-2xl relative overflow-hidden space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center mx-auto shadow-xl shadow-indigo-500/20">
              <span className="material-symbols-outlined text-[32px]">shield</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-light text-white">
              Ready to Investigate at Enterprise Scale?
            </h2>

            <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
              Experience the full SANGRAM Digital Intel command center with active simulation records, multi-domain graph mapping, and legal report generation.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={() => onEnterApp('dashboard')}
                className="px-8 py-3.5 bg-white text-slate-950 hover:bg-slate-200 rounded-full font-bold text-sm shadow-xl transition-all cursor-pointer"
              >
                Access Command Center
              </button>
              <button
                onClick={onOpenExportModal}
                className="px-8 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full font-semibold text-sm transition-all cursor-pointer"
              >
                Sample Case Report
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Standalone Public Footer */}
      <footer className="w-full bg-[#02040a] border-t border-white/5 py-10 px-6 sm:px-8 mt-20 z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>SANGRAM Defense &amp; Cyber Telemetry Grid • Restricted Authorized Use</span>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => onEnterApp('dashboard')} className="hover:text-white transition-colors cursor-pointer">
              Command Console
            </button>
            <button onClick={() => onEnterApp('case-search')} className="hover:text-white transition-colors cursor-pointer">
              Case 360
            </button>
            <button onClick={onOpenExportModal} className="hover:text-white transition-colors cursor-pointer">
              Statutory Formats
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
