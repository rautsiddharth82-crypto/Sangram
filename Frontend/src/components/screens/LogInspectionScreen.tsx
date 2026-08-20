import React, { useState } from 'react';
import { NavTab } from '../../types';
import { api } from '../../services/api';
import { InteractiveNetworkGraph } from '../InteractiveNetworkGraph';

export type LogType = 'CDR' | 'IPDR' | 'BANK' | 'SOCIAL';

interface LogInspectionScreenProps {
  logType: LogType;
  logData: any;
  onBack: () => void;
  onSelectEntity: (entityId: string) => void;
  onOpenExportReport: () => void;
}

export const LogInspectionScreen: React.FC<LogInspectionScreenProps> = ({
  logType,
  logData,
  onBack,
  onSelectEntity,
  onOpenExportReport
}) => {
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'hex' | 'chain' | 'network'>('overview');

  const data = logData || {
    id: 'LOG-89210',
    time: '14:34:12 IST',
    ipAddress: '103.45.XX.21',
    caller: 'P102 (+91 99201 88102)',
    receiver: 'P087 (+91 88019 20193)',
    entity: 'P102',
    location: 'Mumbai, Nariman Point (VPN Singapore Exit)',
    risk: 'HIGH',
    status: 'FLAGGED',
    port: 443,
    protocol: 'TCP / TLS 1.3',
    bytesTransferred: '2.1 GB upload burst',
    cellTower: 'TWR-MUM-401 (Nariman Point BTS)',
    imei: '864920048192031 (SIM-Box 32-Ch)',
    transactionId: 'TXN-UPI-2047-001',
    from: 'Victim-G (quicktask.pay@ybl)',
    to: 'A204 (Kotak Mahindra XXXX9281)',
    amount: '?49,000',
    handle: '@quick_jobs_help',
    platform: 'Telegram'
  };

  const handleRunAiAnalysis = async () => {
    setAiLoading(true);
    setAiResult(null);
    try {
      let res: any = null;
      if (logType === 'CDR') {
        res = await api.analyzeCDR({ target: data.caller || data.id, callsIn24h: 312, towerHops: 8 });
      } else if (logType === 'BANK') {
        res = await api.analyzeBank({ account: data.from || data.to || data.id, inflowCount: 45, outflowVelocityPct: 91 });
      } else {
        res = await api.predictNextMove({ entityId: data.entity || 'P102', caseId: 'INV-2047' });
      }
      setAiResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in pb-12">
      {/* Top Breadcrumb Nav & Actions Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 bg-white/5 hover:bg-white/10 text-slate-300 rounded-2xl border border-white/10 flex items-center gap-1 cursor-pointer transition-colors text-xs font-bold"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Back to {logType} Logs
          </button>

          <div className="h-5 w-px bg-white/10 hidden sm:block" />

          <div className="text-xs">
            <span className="text-slate-500 font-semibold uppercase tracking-wider">Console &gt; {logType} &gt; </span>
            <span className="text-white font-bold">Deep Log Inspection #{data.id || '89210'}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRunAiAnalysis}
            disabled={aiLoading}
            className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-full text-xs font-bold shadow-xl shadow-indigo-500/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {aiLoading ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[16px]">progress_activity</span>
                Groq AI Analyzing...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[16px]">psychology</span>
                Groq AI Deep Analysis
              </>
            )}
          </button>

          <button
            onClick={onOpenExportReport}
            className="px-5 py-2.5 bg-white text-slate-950 font-bold text-xs rounded-full shadow-lg hover:bg-slate-200 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">verified</span>
            Sec 63 BSA Certificate
          </button>
        </div>
      </div>

      {/* Main Executive Banner */}
      <div className="relative rounded-[32px] overflow-hidden border border-white/10 bg-gradient-to-br from-slate-950/90 via-slate-900/80 to-[#02040a] p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-rose-500/20 text-rose-300 text-xs font-bold rounded-full border border-rose-500/30 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping"></span>
                {data.status || 'FLAGGED'} • CRITICAL THREAT
              </span>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-bold rounded-full border border-emerald-500/30 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">lock</span>
                SHA-256 SEAL VERIFIED
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight font-mono">
              {logType === 'IPDR' ? `IPDR: ${data.ipAddress}` :
               logType === 'CDR' ? `CDR: ${data.caller} ? ${data.receiver}` :
               logType === 'BANK' ? `TXN: ${data.transactionId} (${data.amount})` :
               `SOCIAL: ${data.handle}`}
            </h2>

            <p className="text-slate-300 text-xs leading-relaxed">
              Timestamp: <strong className="text-white">{data.time || '14:34:12 IST'}</strong> • Primary Suspect Node: <strong className="text-indigo-400 cursor-pointer" onClick={() => onSelectEntity(data.entity || 'P102')}>{data.entity || 'P102 (Rajesh K.)'}</strong>
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1 shrink-0 text-right min-w-[200px]">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-widest">Unified Risk Score</span>
            <span className="text-3xl font-bold text-rose-400">94 / 100</span>
            <span className="text-[11px] text-slate-400 block">Section 63 BSA Admissible</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 mt-8 gap-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'overview' ? 'border-indigo-500 text-indigo-300' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Forensic Overview &amp; AI Reasoning
          </button>
          <button
            onClick={() => setActiveTab('network')}
            className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'network' ? 'border-indigo-500 text-indigo-300' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            ?? Interactive Cross-Domain Topology Graph
          </button>
          <button
            onClick={() => setActiveTab('hex')}
            className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'hex' ? 'border-indigo-500 text-indigo-300' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Raw Intercept Hex &amp; Packet Dump
          </button>
          <button
            onClick={() => setActiveTab('chain')}
            className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'chain' ? 'border-indigo-500 text-indigo-300' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            SHA-256 Chain of Custody Audit
          </button>
        </div>
      </div>

      {/* Main Screen Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Columns: Detailed Parameters & Groq AI Reasoning */}
          <div className="lg:col-span-2 space-y-6">
            {/* ?? Groq AI Forensic Deep Dive Banner */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950/80 via-slate-900/90 to-purple-950/80 border border-indigo-500/30 space-y-4 shadow-2xl backdrop-blur-xl">
              <div className="flex justify-between items-center pb-3 border-b border-indigo-500/20">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center border border-indigo-500/30">
                    <span className="material-symbols-outlined text-[18px]">psychology</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">Groq AI Log Reasoning &amp; Crime Pattern Diagnosis</h3>
                    <span className="text-[10px] text-indigo-300 font-mono">Model: groq/compound (Groq Cloud API)</span>
                  </div>
                </div>

                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-bold">
                  Confidence: {aiResult?.confidence || 96}%
                </span>
              </div>

              {aiResult ? (
                <div className="space-y-4 text-xs animate-fade-in">
                  <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-rose-300">
                    <span className="text-[10px] uppercase font-bold text-rose-400 block mb-1">Crime Signature Diagnosis</span>
                    <p className="text-white text-sm font-bold">{aiResult.fraudPattern || aiResult.threatLevel || 'VPN-MASKED EXFILTRATION & LAYER-1 MULE CASHOUT'}</p>
                    <p className="text-slate-300 text-xs mt-1 leading-relaxed">
                      {aiResult.callVectorAnalysis || aiResult.transactionSummary?.reasons?.join(', ') || 'Groq AI identified correlation: Log coincides with ?14.8L UPI deposit to A204 followed by 91% rapid cashout via 6 mule accounts within 105 minutes.'}
                    </p>
                  </div>

                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-300">
                    <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-1">Recommended Officer Interdiction</span>
                    <p className="text-slate-200 font-bold text-xs">{aiResult.recommendation || 'IMMEDIATE: Issue Section 91 CrPC notice to ISP & AU Small Finance nodal desk. DoT TAFCOP IMEI blacklisting for IMEI 864920048192031.'}</p>
                  </div>
                </div>
              ) : (
                <div className="py-4 text-center space-y-3">
                  <p className="text-slate-300 text-xs">
                    Click <strong className="text-indigo-400">Groq AI Deep Analysis</strong> to run autonomous LLM forensic reasoning on this log record.
                  </p>
                  <button
                    onClick={handleRunAiAnalysis}
                    className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-full font-bold text-xs shadow-xl shadow-indigo-500/20 inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">bolt</span>
                    Run Groq AI Deep Analysis
                  </button>
                </div>
              )}
            </div>

            {/* Embedded Interactive Topology Graph Card */}
            <div className="space-y-3">
              <div className="flex justify-between items-center px-1">
                <h3 className="font-bold text-sm text-white uppercase tracking-wider">Cross-Domain Entity Link Topology Graph</h3>
                <span className="text-xs text-indigo-400 font-bold">Click any node to inspect evidence</span>
              </div>
              <InteractiveNetworkGraph onSelectEntity={onSelectEntity} height="h-[460px]" />
            </div>

            {/* Deep Parameters Grid */}
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4 shadow-xl backdrop-blur-xl">
              <h3 className="font-bold text-sm text-white uppercase tracking-wider">Complete Technical Parameter Matrix</h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-3.5 bg-white/[0.02] border border-white/5 rounded-2xl">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">ISP / Telecom Carrier</span>
                  <span className="font-bold text-white">Bharti Airtel Ltd (LEIS Gate MUM-04)</span>
                </div>
                <div className="p-3.5 bg-white/[0.02] border border-white/5 rounded-2xl">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Autonomous System (ASN)</span>
                  <span className="font-mono text-indigo-300 font-bold">AS45129 (Jio Fiber / Airtel)</span>
                </div>
                <div className="p-3.5 bg-white/[0.02] border border-white/5 rounded-2xl">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Sub-Network Mask</span>
                  <span className="font-mono text-slate-300">255.255.255.240 (/28)</span>
                </div>

                <div className="p-3.5 bg-white/[0.02] border border-white/5 rounded-2xl">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">BTS Cell Tower</span>
                  <span className="font-bold text-white">TWR-MUM-401 (Nariman Point)</span>
                </div>
                <div className="p-3.5 bg-white/[0.02] border border-white/5 rounded-2xl">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Tower Geolocation</span>
                  <span className="text-slate-300 font-mono">18.9220° N, 72.8347° E</span>
                </div>
                <div className="p-3.5 bg-white/[0.02] border border-white/5 rounded-2xl">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">IMEI Serial</span>
                  <span className="font-mono text-amber-300 font-bold">864920048192031 (SIM Box)</span>
                </div>

                <div className="p-3.5 bg-white/[0.02] border border-white/5 rounded-2xl col-span-2">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Correlated Financial Mule Account</span>
                  <span className="font-bold text-rose-300">Kotak Mahindra #****9281 (A204) — ?1.12Cr Inflow</span>
                </div>
                <div className="p-3.5 bg-white/[0.02] border border-white/5 rounded-2xl">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">PMLA Compliance Status</span>
                  <span className="font-bold text-rose-400">FIU STR REFERRAL REQUIRED</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Suspect Entity Card & Cross-Domain Links */}
          <div className="space-y-6">
            {/* Suspect Card */}
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4 shadow-xl backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center font-bold text-lg">
                  P102
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">Rajesh K. ("CyberBoss_Raj")</h4>
                  <span className="text-xs text-rose-400 font-semibold">Mastermind Node • Clearance Flag</span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-white/5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Phone:</span>
                  <span className="font-mono font-bold text-white">+91 99201 88102</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Bank Account:</span>
                  <span className="font-mono font-bold text-rose-300">Kotak XXXX9281</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Telegram Admin:</span>
                  <span className="font-bold text-indigo-300">@quick_jobs_help</span>
                </div>
              </div>

              <button
                onClick={() => onSelectEntity('P102')}
                className="w-full py-2.5 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/30 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">account_tree</span>
                Inspect Suspect Topology Graph
              </button>
            </div>

            {/* SHA-256 Seal Card */}
            <div className="p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 space-y-3 shadow-xl backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-400 text-[20px]">verified</span>
                <span className="font-bold text-sm text-white">Section 63 BSA Digital Signature</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Log record extracted via LEIS Gate, hashed with SHA-256 algorithm conforming to NIST FIPS PUB 180-4. Admissible in Cyber Special Court.
              </p>
              <div className="p-3 bg-black/40 rounded-xl font-mono text-[10px] text-emerald-400 break-all border border-emerald-500/20">
                SHA256: 7e9f1a08b3c94d21e85f02931a7849b201f98e72c
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Network Topology Full Tab */}
      {activeTab === 'network' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-base text-white">Full-Screen Interactive Cross-Domain Topology Graph</h3>
            <span className="text-xs text-slate-400">Hover over any node to highlight linked paths • Click for Groq AI findings</span>
          </div>
          <InteractiveNetworkGraph onSelectEntity={onSelectEntity} height="h-[600px]" />
        </div>
      )}

      {/* Raw Hex Dump Tab */}
      {activeTab === 'hex' && (
        <div className="p-6 rounded-3xl bg-slate-950 border border-white/10 space-y-4 shadow-2xl">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-sm text-white font-mono">Raw Packet Intercept Payload (Hex &amp; ASCII)</h3>
            <span className="text-[10px] text-slate-500 font-mono">Capture Length: 512 bytes</span>
          </div>

          <pre className="p-4 bg-black/60 rounded-2xl text-[11px] font-mono text-indigo-300 overflow-x-auto leading-relaxed border border-white/5">
{`00000000  45 00 00 3c a2 b1 40 00  40 06 7c 1e 67 2d 16 0a  |E..<..@.@.|.g-..|
00000010  d2 59 2c 02 01 bb 00 50  1a 2b 3c 4d 50 18 02 00  |.Y,....P.+<MP...|
00000020  48 54 54 50 2f 31 2e 31  20 32 30 30 20 4f 4b 0d  |HTTP/1.1 200 OK.|
00000030  48 6f 73 74 3a 20 61 70  69 2e 74 65 6c 65 67 72  |Host: api.telegr|
00000040  61 6d 2e 6f 72 67 0d 0a  41 75 74 68 6f 72 69 7a  |am.org..Authoriz|
00000050  61 74 69 6f 6e 3a 20 42  65 61 72 65 72 20 74 6f  |ation: Bearer to|
00000060  6b 65 6e 5f 71 75 69 63  6b 5f 6a 6f 62 73 5f 68  |elp_2026..Conten|
00000070  65 6c 70 5f 32 30 32 36  0d 0a 43 6f 6e 74 65 6e  |elp_2026..Conten|
00000080  74 2d 54 79 70 65 3a 20  61 70 70 6c 69 63 61 74  |t-Type: applicat|
00000090  69 6f 6e 2f 6a 73 6f 6e  0d 0a 0d 0a 7b 22 75 70  |ion/json....{"up|
000000a0  69 5f 68 61 6e 64 6c 65  22 3a 22 71 75 69 63 6b  |i_handle":"quick|
000000b0  74 61 73 6b 2e 70 61 79  40 79 62 6c 22 2c 22 61  |task.pay@ybl","a|
000000c0  6d 6f 75 6e 74 22 3a 20  34 39 30 30 30 7d 0d 0a  |mount": 49000}..|`}
          </pre>
        </div>
      )}

      {/* SHA-256 Chain of Custody Tab */}
      {activeTab === 'chain' && (
        <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4 shadow-2xl backdrop-blur-xl text-xs">
          <h3 className="font-bold text-base text-white">SHA-256 Chain of Custody Audit Trail</h3>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex justify-between items-center">
              <div>
                <span className="font-bold text-white block">Extraction &amp; Cryptographic Hashing</span>
                <span className="text-slate-400 text-[11px]">Extracted via POLNET LEIS Gateway Node 04 by Insp. S. Raut</span>
              </div>
              <span className="text-slate-400 font-mono text-[11px]">14:34:12 IST</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex justify-between items-center">
              <div>
                <span className="font-bold text-emerald-400 block">Section 63 BSA Digital Seal Applied</span>
                <span className="text-slate-400 text-[11px]">Certified by Forensic Analyst V. Rao (Badge: MH-FSL-2201)</span>
              </div>
              <span className="text-slate-400 font-mono text-[11px]">14:35:00 IST</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
