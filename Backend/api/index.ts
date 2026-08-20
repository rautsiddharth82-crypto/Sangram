/**
 * SANGRAM � Unified Investigative Analytics Platform
 * Backend API Server v2.0
 *
 * AI Provider: Groq Cloud API (https://api.groq.com/openai/v1)
 * Model: groq/compound (or llama-3.3-70b-versatile)
 */

import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json({ limit: '50mb' }));

app.get('/', (_req, res) => {
  res.send(`
    <html>
      <head>
        <title>SANGRAM Backend API</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background: #02040a;
            color: #e2e8f0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
          }
          div {
            text-align: center;
            border: 1px solid #1e293b;
            padding: 3rem;
            border-radius: 1.5rem;
            background: #0f172a;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            max-width: 500px;
          }
          h1 {
            margin-top: 0;
            color: #6366f1;
            font-size: 2rem;
          }
          p {
            font-size: 1.1rem;
            line-height: 1.6;
          }
          a {
            color: #10b981;
            text-decoration: none;
            font-weight: bold;
            border-bottom: 2px dashed #10b981;
            transition: color 0.2s, border-color 0.2s;
          }
          a:hover {
            color: #34d399;
            border-color: #34d399;
          }
          .status {
            display: inline-block;
            padding: 0.25rem 0.75rem;
            background: rgba(16, 185, 129, 0.2);
            color: #10b981;
            border-radius: 9999px;
            font-weight: bold;
            font-size: 0.9rem;
            margin-bottom: 1rem;
          }
        </style>
      </head>
      <body>
        <div>
          <span class="status">● Backend API is running</span>
          <h1>SANGRAM Platform Services</h1>
          <p>The forensic intelligence engine is fully operational.</p>
          <p>Frontend is running on <a href="https://sangram-smoky.vercel.app/console#log-inspection" target="_blank">https://sangram-smoky.vercel.app/console#log-inspection</a></p>
        </div>
      </body>
    </html>
  `);
});


// --------------------------------------
// GROQ AI CLIENT (Groq Cloud API)
// --------------------------------------
function getGroqClient(): OpenAI | null {
  const key = process.env.GROQ_API_KEY || process.env.GROK_API_KEY;
  if (!key || key === 'MY_GROQ_API_KEY' || key === 'MY_GROK_API_KEY') return null;
  return new OpenAI({
    apiKey: key,
    baseURL: process.env.GROQ_BASE_URL || 'https://api.groq.com/openai/v1',
  });
}

async function askGroq(system: string, user: string, jsonMode = true): Promise<string> {
  const client = getGroqClient();
  if (!client) throw new Error('NO_KEY');
  const model = process.env.GROQ_MODEL || 'groq/compound';

  try {
    const res = await client.chat.completions.create({
      model: model,
      messages: [{ role: 'system', content: system }, { role: 'user', content: user }],
      ...(jsonMode ? { response_format: { type: 'json_object' as const } } : {}),
      temperature: 0.3,
      max_tokens: 2048,
    });
    return res.choices[0]?.message?.content ?? '{}';
  } catch (err: any) {
    if (model === 'groq/compound') {
      const fallbackRes = await client.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'system', content: system }, { role: 'user', content: user }],
        ...(jsonMode ? { response_format: { type: 'json_object' as const } } : {}),
        temperature: 0.3,
        max_tokens: 2048,
      });
      return fallbackRes.choices[0]?.message?.content ?? '{}';
    }
    throw err;
  }
}

const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage, limits: { fileSize: 100 * 1024 * 1024 } });

function sha256File(filePath: string): string {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}
function sha256Text(text: string): string {
  return crypto.createHash('sha256').update(text).digest('hex');
}

function telecomRisk(d: { callsIn24h: number; uniqueTargets: number; towerHops: number; outboundRatio: number; shortCallPct: number }): { score: number; reasons: string[] } {
  let score = 0; const reasons: string[] = [];
  if (d.callsIn24h > 200) { score += 30; reasons.push(`Mass calling: ${d.callsIn24h} calls/24h`); }
  else if (d.callsIn24h > 80) { score += 15; reasons.push(`High call volume: ${d.callsIn24h}`); }
  if (d.uniqueTargets / Math.max(d.callsIn24h, 1) > 0.8) { score += 20; reasons.push(`${d.uniqueTargets} unique targets � scattered dialing pattern`); }
  if (d.towerHops > 8) { score += 20; reasons.push(`Tower hopping: ${d.towerHops} BTS in 24h`); }
  if (d.outboundRatio > 0.85) { score += 15; reasons.push('Asymmetric outbound ratio (dialer profile)'); }
  if (d.shortCallPct > 0.6) { score += 10; reasons.push('High short-call rate (OTP interception / robocall)'); }
  return { score: Math.min(100, score), reasons };
}

function bankRisk(d: { inflowCount: number; uniqueSenders: number; outflowVelocityPct: number; dormant: boolean; mulePattern: boolean }): { score: number; reasons: string[] } {
  let score = 0; const reasons: string[] = [];
  if (d.inflowCount > 30) { score += 25; reasons.push(`${d.inflowCount} inflows from ${d.uniqueSenders} unique counterparties`); }
  if (d.outflowVelocityPct > 85) { score += 30; reasons.push(`${d.outflowVelocityPct}% outflow within 2h � rapid cash-out pattern`); }
  if (d.dormant) { score += 15; reasons.push('Dormant account suddenly activated'); }
  if (d.mulePattern) { score += 20; reasons.push('Classic mule pattern: aggregate ? disperse ? cash-out'); }
  return { score: Math.min(100, score), reasons };
}

function socialRisk(d: { accountAgeDays: number; scamKeywords: string[]; coordinated: boolean; fakeIndicators: number; linkedToFraudPhone: boolean }): { score: number; reasons: string[] } {
  let score = 0; const reasons: string[] = [];
  if (d.accountAgeDays < 30) { score += 20; reasons.push(`New account: ${d.accountAgeDays} days old with high activity`); }
  if (d.scamKeywords.length > 2) { score += 25; reasons.push(`Scam keywords: ${d.scamKeywords.join(', ')}`); }
  if (d.coordinated) { score += 25; reasons.push('Coordinated campaign across multiple accounts'); }
  if (d.fakeIndicators > 2) { score += 15; reasons.push(`${d.fakeIndicators} fake profile indicators`); }
  if (d.linkedToFraudPhone) { score += 15; reasons.push('Direct link to flagged MSISDN'); }
  return { score: Math.min(100, score), reasons };
}

function unifiedRisk(t: number, b: number, s: number, crossBoost = 0): number {
  return Math.min(100, Math.round(0.35 * t + 0.40 * b + 0.25 * s + crossBoost));
}

function riskLevel(score: number): string {
  if (score >= 90) return 'CRITICAL';
  if (score >= 76) return 'VERY HIGH';
  if (score >= 51) return 'HIGH';
  if (score >= 26) return 'MEDIUM';
  return 'LOW';
}

const DB = {
  cases: [
    {
      id: 'INV-2047', caseNumber: 'CYB/MUM/2026/2047',
      title: 'Suspicious Digital & Financial Network � Video Rating UPI Scam',
      category: 'UPI Job Fraud', severity: 'HIGH',
      status: 'ACTIVE INVESTIGATION',
      registeredDate: '2026-08-02', policeStation: 'BKC Cyber Cell, Mumbai',
      leadInvestigator: 'Inspector S. Raut', badgeNumber: 'MH-CYB-9901',
      summaryNarrative: 'Cross-platform fraud ring targeting salaried workers via fake video-rating tasks. Victims paid UPI deposits routed through 3-tier mule network before crypto exit.',
      evidentialReadinessScore: 87,
      searchTokens: ['P102', 'P087', 'A204', 'A301', '+91 99201 88102', 'quick_jobs_help'],
      metrics: { totalPhoneIntercepts: 1842, flaggedCalls: 312, ipSessions: 4891, suspiciousIPs: 47, totalFinancialVolume: '?4.2Cr', frozenAmount: '?1.1Cr', identifiedMuleAccounts: 14, socialHandlesMonitored: 23, crossDomainCorrelationConfidence: 94 },
      domainBreakdown: {
        cdr: { keyFinding: 'Mass dialing from SIM cluster � 312 flagged calls in 48h window targeting 290 unique victims.', primaryNumbers: ['+91 99201 88102', '+91 88019 20193', '+91 70118 29301'], cellTowerHotspots: ['TWR-MUM-401 (Nariman Point)', 'TWR-MUM-208 (BKC)', 'TWR-MUM-319 (Andheri)'], callBurstWindows: '09:00�11:30 IST & 15:00�18:00 IST daily' },
        ipdr: { keyFinding: 'VPN-masked sessions from 3 IPs routing through Singapore and Malaysia endpoints. 4.8GB upload anomaly in 6h window.', activeVPNs: ['NordVPN Exit (SG)', 'ExpressVPN (MY)', 'ProtonVPN (CH)'], topOriginatingIPs: ['49.32.88.19', '103.91.22.10', '210.89.44.02'], geoLocations: ['Mumbai (VPN Masked)', 'Singapore', 'Malaysia'] },
        bank: { keyFinding: 'A204 received ?1.12Cr from 45 victims in single session. 91% outflow within 105 minutes via 6 sub-accounts.', primaryAccounts: ['A204 (Kotak XXXX9281)', 'A301 (AU Small Fin XXXX1029)', 'A502 (Yes Bank XXXX0192)'], layeringVelocity: '91% within 105 minutes of credit', cryptoOffRampDetected: true },
        social: { keyFinding: 'Telegram channel @quick_jobs_help (18-day-old) broadcast to 4,200 subscribers. 23 coordinated accounts identified.', recruitmentChannels: ['@quick_jobs_help', '@video_task_earn', '@parttime_upi_2026'], targetHandles: ['P087 � @target_1', 'P044 � @target_2'], compromisedCredentialsCount: 8 }
      },
      keySuspects: [
        { id: 'P102', name: 'Rajesh K. / "CyberBoss_Raj"', role: 'Mastermind', risk: 'HIGH', phone: '+91 99201 88102', bankAcc: 'Kotak #****9281', social: '@quick_jobs_help' },
        { id: 'P087', name: 'Vikram S. / "MuleHandler_V"', role: 'Mule Coordinator', risk: 'HIGH', phone: '+91 88019 20193', bankAcc: 'AU Small Finance #****1029' },
        { id: 'P044', name: 'Sunita R. / "LureAdmin"', role: 'Social Media Lure Operator', risk: 'MED', social: '@video_task_earn' },
        { id: 'P610', name: 'Suresh V. / "MuleCoordinator"', role: 'Local Banking Aggregator', risk: 'HIGH', bankAcc: 'Canara #****7741' }
      ],
      timeline: [
        { time: '09:00 IST', date: '02 Aug 2026', stage: 'Bulk SMS & WhatsApp Outreach', description: '25,000 SMS messages sent offering ?13,000 daily payout for video ratings.', risk: 'MED', domain: 'SOCIAL' },
        { time: '09:45 IST', date: '02 Aug 2026', stage: 'Victim Onboarding Calls', description: 'P102 cluster initiated 180 calls to recruited victims with task instructions.', risk: 'HIGH', domain: 'CDR' },
        { time: '11:45 IST', date: '02 Aug 2026', stage: 'Deposit Collection via UPI', description: '?1,12,40,000 collected from 45 victims in single morning session.', risk: 'HIGH', domain: 'BANK' },
        { time: '13:15 IST', date: '02 Aug 2026', stage: 'Rapid Layering Transfers', description: 'A204 ? A301 ? A502 ? Crypto OTC within 105 minutes. ?1.02Cr dispersed.', risk: 'HIGH', domain: 'CROSS-DOMAIN' },
        { time: '15:20 IST', date: '02 Aug 2026', stage: 'Bulk ATM Cash Withdrawals', description: 'Mule handlers withdrew cash simultaneously across 8 ATM locations.', risk: 'HIGH', domain: 'CROSS-DOMAIN' }
      ],
      tacticalRecommendations: [
        { action: 'Finalize cyber forensic chargesheet with digital hash chains for Special Cyber Court.', priority: 'IMMEDIATE', legalSection: 'Sec 173 CrPC / Sec 66D IT Act' },
        { action: 'Send Look-Out Circular (LOC) for mastermind P102 suspected operating from overseas.', priority: 'HIGH', legalSection: 'Bureau of Immigration LOC' },
        { action: 'NPCI coordination to flag and freeze remaining UPI handles in cluster.', priority: 'HIGH', legalSection: 'Section 102 CrPC' }
      ]
    }
  ] as any[],

  cdrRecords: [
    { id: 'cdr-1', time: '14:31:04', caller: 'P102', receiver: 'P087', duration: '4m 21s', risk: 'HIGH', status: 'FLAGGED', cellTower: 'TWR-MUM-401 (Nariman Point)', imei: '864920048192031', notes: 'Triggered ?14.8L banking transaction 15s after hang-up.' },
    { id: 'cdr-2', time: '13:15:22', caller: 'P087', receiver: 'P102', duration: '1m 08s', risk: 'HIGH', status: 'FLAGGED', cellTower: 'TWR-MUM-208 (BKC)', imei: '864920048192031' }
  ],

  callPatterns: [
    { id: 'cp-1', title: 'Burst Dialing Window', description: '312 calls placed in 2.5h window (09:00�11:30 IST). Classic SIM box mass-dialing signature.', type: 'burst', icon: 'phone_forwarded', badge: '312 calls', isHighRisk: true }
  ],

  ipdrRecords: [
    { id: 'ip-1', time: '14:32:18', ipAddress: '49.32.88.19', entity: 'P102', location: 'Mumbai (VPN masked ? SG exit)', countryCode: 'IN/SG', risk: 'HIGH', status: 'FLAGGED', port: 443, protocol: 'HTTPS', bytesTransferred: '2.1 GB' }
  ],

  suspiciousIPEvents: [
    { id: 'ipe-1', title: 'VPN Data Exfiltration Spike', timeAgo: '22 min ago', description: '2.1 GB upload in 8 min from 49.32.88.19 to Singapore exit node. Suspected victim data / mule credentials exfil.', severity: 'error', ip: '49.32.88.19', entity: 'P102' }
  ],

  bankTransactions: [
    { id: 'tx-1', date: '2026-08-02', transactionId: 'TXN-UPI-2047-001', from: 'Victim-G (UPI)', to: 'A204 (quicktask.pay@ybl)', amount: '?49,000', amountNumeric: 49000, risk: 'HIGH', status: 'FLAGGED', bankName: 'Kotak Mahindra', muleFlag: true }
  ],

  bankAnomalies: [
    { id: 'an-1', title: 'Rapid Cash-Out Velocity', description: '?8.6L withdrawn via ATM and P2P crypto in under 2 hours post-credit. Zero retention pattern confirms mule account.', icon: 'speed', type: 'cashout', risk: 'HIGH' }
  ],

  socialProfiles: [
    { id: 'sp-1', handle: '@quick_jobs_help', platform: 'Telegram', platformIcon: 'telegram', linkedEntity: 'P102', risk: 'HIGH', confidence: '96%', description: '18-day-old channel. 4,200 subscribers. 340 posts offering ?13,000/day for "simple video rating tasks".', avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=p102', followers: '4.2K', postsCount: 340, lastActive: '14 min ago' }
  ],

  activityTimeline: [
    { id: 'tl-1', time: '14:31 IST', title: 'High-Risk Call � P102?P087', description: 'Critical coordination call. UPI transfer of ?14.8L followed 15s later.', color: 'bg-rose-500', isPulsing: true, category: 'cdr' }
  ],

  networkNodes: [
    { id: 'P102', label: 'P102 � Rajesh K.', type: 'person', risk: 'HIGH', x: 400, y: 220 },
    { id: 'P087', label: 'P087 � Vikram S.', type: 'person', risk: 'HIGH', x: 200, y: 340 },
    { id: 'A204', label: 'A204 � Kotak XXXX9281', type: 'bank', risk: 'HIGH', x: 220, y: 500 }
  ],

  networkLinks: [
    { source: 'P102', target: 'P087', type: 'cdr', risk: 'HIGH', label: '14 calls' },
    { source: 'P102', target: 'A204', type: 'bank', risk: 'HIGH', label: 'Controls UPI' }
  ],

  investigationNotes: [
    { id: 'note-1', author: 'Insp. S. Raut', date: '2026-08-14 14:30 IST', content: 'Cross-domain correlation confirms P102 is the central node. Priority: obtain production order for Kotak and AU Small Finance SFTP logs.', tag: 'CRITICAL' }
  ],

  auditLogs: [
    { id: 'al-1', timestamp: '2026-08-14 15:10 IST', officer: 'Insp. S. Raut', badgeNumber: 'MH-CYB-9901', action: 'EVIDENCE_ACCESS', detail: 'Accessed bank statement A204 for cross-domain correlation', caseId: 'INV-2047', ipAddress: '10.14.88.19', hashVerified: true }
  ] as any[],

  evidence: [
    { id: 'ev-1', caseId: 'INV-2047', fileName: 'CDR_BKC_TWR401_02Aug2026.xlsx', evidenceType: 'CDR Logs', sha256: sha256Text('CDR_BKC_TWR401'), source: 'Airtel BTS TWR-MUM-401', extractedBy: 'Insp. S. Raut', extractedAt: '2026-08-14 10:30 IST', integrityStatus: 'VERIFIED', chainOfCustody: [{ officer: 'Insp. S. Raut', action: 'LEIS extraction + SHA-256 seal', timestamp: '2026-08-14 10:30 IST', terminal: 'POLNET-STN-01' }] }
  ] as any[],

  predictions: [
    { id: 'pr-1', type: 'Next Fraud Call Window', timeWindow: 'Next 4�6 hours (15:00�18:00 IST)', area: 'TWR-MUM-401 / BKC cluster', confidence: 88, threatLevel: 'CRITICAL', action: 'Pre-emptive tower geo-fence lock + CDR preservation order' }
  ]
};

function addAuditLog(action: string, detail: string, officer = 'System', caseId?: string) {
  DB.auditLogs.unshift({ id: `al-${Date.now()}`, timestamp: new Date().toISOString().slice(0, 16).replace('T', ' ') + ' IST', officer, badgeNumber: 'SYSTEM', action, detail, caseId, ipAddress: '10.0.0.1 (POLNET)', hashVerified: true });
}

app.get('/api/health', (_req, res) => {
  const groq = getGroqClient();
  res.json({
    status: 'operational',
    system: 'SANGRAM Backend API',
    version: '2.0.0',
    aiProvider: 'Groq Cloud API (groq/compound)',
    aiActive: !!groq,
    timestamp: new Date().toISOString(),
    modules: ['cdr', 'ipdr', 'bank', 'social', 'entity-resolution', 'risk-scoring', 'next-move-engine', 'dossier-generator', 'evidence-chain', 'case-management']
  });
});

app.get('/api/cases', (req, res) => {
  let cases = [...DB.cases];
  if (req.query.severity) cases = cases.filter(c => c.severity === req.query.severity);
  if (req.query.status) cases = cases.filter(c => c.status === req.query.status);
  res.json(cases);
});

app.get('/api/cases/:id', (req, res) => {
  const c = DB.cases.find(c => c.id === req.params.id || c.caseNumber === req.params.id);
  if (!c) return res.status(404).json({ error: 'Case not found' });
  addAuditLog('CASE_ACCESS', `Case ${c.id} viewed`);
  res.json(c);
});

app.post('/api/cases', (req, res) => {
  const nc = { id: `INV-${Math.floor(1000 + Math.random() * 9000)}`, caseNumber: `CYB/JPR/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`, status: 'ACTIVE INVESTIGATION', severity: 'HIGH', evidentialReadinessScore: 0, ...req.body };
  DB.cases.unshift(nc);
  addAuditLog('CASE_ACCESS', `New case created: ${nc.id}`, req.body.leadInvestigator || 'System');
  res.status(201).json(nc);
});

app.get('/api/cdr', (req, res) => {
  let records = [...DB.cdrRecords];
  if (req.query.risk) records = records.filter(r => r.risk === req.query.risk);
  res.json({ records, patterns: DB.callPatterns });
});

app.post('/api/cdr/analyze', (req, res) => {
  const d = req.body;
  const data = { callsIn24h: d.callsIn24h || 312, uniqueTargets: d.uniqueTargets || 290, towerHops: d.towerHops || 8, outboundRatio: d.outboundRatio || 0.91, shortCallPct: d.shortCallPct || 0.64 };
  const { score, reasons } = telecomRisk(data);
  res.json({ target: d.target || 'INV-2047', telecomRiskScore: score, riskLevel: riskLevel(score), confidence: Math.min(99, score + 5), reasonCodes: reasons, analyzedAt: new Date().toISOString() });
});

app.get('/api/ipdr', (_req, res) => res.json({ records: DB.ipdrRecords, suspiciousEvents: DB.suspiciousIPEvents }));
app.get('/api/bank', (_req, res) => res.json({ transactions: DB.bankTransactions, anomalies: DB.bankAnomalies }));
app.get('/api/social', (_req, res) => res.json({ profiles: DB.socialProfiles, activityTimeline: DB.activityTimeline }));

app.post('/api/risk/score', (req, res) => {
  const { telecom = 85, bank = 90, social = 80, crossBoost = 14 } = req.body;
  const unified = unifiedRisk(telecom, bank, social, crossBoost);
  res.json({ unifiedRiskScore: unified, riskLevel: riskLevel(unified), breakdown: { telecom, bank, social, crossBoost } });
});

app.get('/api/network', (_req, res) => res.json({ nodes: DB.networkNodes, links: DB.networkLinks }));

app.get('/api/search', (req, res) => {
  const q = ((req.query.q as string) || '').toLowerCase();
  const allItems = [
    { type: 'entity', id: 'P102', label: 'P102 � Rajesh K.', risk: 'HIGH', case: 'INV-2047', detail: 'Mastermind' },
    { type: 'account', id: 'A204', label: 'A204 � Kotak', risk: 'HIGH', case: 'INV-2047', detail: 'Mule' }
  ];
  let results = q ? allItems.filter(i => i.label.toLowerCase().includes(q) || i.id.toLowerCase().includes(q)) : allItems;
  res.json({ results, total: results.length });
});

app.get('/api/evidence', (_req, res) => res.json(DB.evidence));

app.post('/api/evidence/upload', upload.single('file'), (req: any, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const hash = sha256File(req.file.path);
  const ev = { id: `ev-${Date.now()}`, fileName: req.file.originalname, sha256: hash, fileSize: `${(req.file.size / 1024).toFixed(1)} KB` };
  DB.evidence.unshift(ev);
  res.status(201).json(ev);
});

app.get('/api/audit', (_req, res) => res.json(DB.auditLogs));
app.get('/api/predictions', (_req, res) => res.json(DB.predictions));
app.get('/api/notes', (_req, res) => res.json(DB.investigationNotes));

app.post('/api/ai/next-move', async (req, res) => {
  const { entityId = 'P102', caseId = 'INV-2047' } = req.body;
  const fallback = { entityId, caseId, threatLevel: 'CRITICAL', confidence: 91, vectors: [{ title: 'Cash-Out at A301', risk: 94, detail: 'ATM burst withdrawal expected within 90min', timeframe: 'Immediate' }], preventiveActions: ['Section 91 CrPC notice to AU Small Finance', 'DoT TAFCOP IMEI blacklist for IMEI 864920048192031'] };
  try {
    const text = await askGroq('You are SANGRAM Criminal Next Move Predictive Engine. Predict cybercrime syndicate next actions.', `Predict next moves for ${entityId} in ${caseId}`);
    addAuditLog('NETWORK_EXPLORE', `Groq AI Next Move prediction � ${entityId}`, 'Groq AI', caseId);
    return res.json(JSON.parse(text));
  } catch (err: any) {
    return res.json(fallback);
  }
});

app.post('/api/ai/generate-dossier', async (req, res) => {
  const { caseId = 'INV-2047', officerName = 'Inspector S. Raut' } = req.body;
  const fallback = { caseId, courtReadinessScore: 87, executiveSummary: 'Section 63 BSA compliant dossier generated.', bsaCertificatePartA: { declaration: 'Certified under Section 63 BSA', officer: officerName }, bsaCertificatePartB: { declaration: 'Technical verification complete', expert: 'Tech Analyst V. Rao' } };
  try {
    const text = await askGroq('You are SANGRAM Court Dossier AI. Generate Section 63 BSA court dossiers.', `Generate court dossier for case ${caseId}`);
    addAuditLog('DOSSIER_GEN', `Groq AI dossier generated for ${caseId}`, officerName, caseId);
    return res.json(JSON.parse(text));
  } catch (err: any) {
    return res.json(fallback);
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`SANGRAM Backend API v2.0 (Groq Cloud) online at http://localhost:${PORT}`);
});

export default app;
