import {
  CDRRecord,
  CallPattern,
  IPDRRecord,
  SuspiciousIPEvent,
  BankTransaction,
  AnomalyItem,
  SocialProfile,
  ActivityTimelineItem,
  CaseAlert,
  InvestigationNote,
  CaseIntelligenceSummary
} from '../types';

export const CASE_METADATA = {
  id: '#INV-2047',
  title: 'Suspicious Digital & Financial Network',
  subtitle: 'Cross-source correlation across 5 domains',
  status: 'ACTIVE',
  riskLevel: 'HIGH RISK',
  score: 87,
  investigator: {
    name: 'Inspector S. Raut',
    role: 'Lead Intelligence Officer',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=inspector_raut'
  }
};

export const INITIAL_ALERTS: CaseAlert[] = [
  {
    id: 'alt-1',
    title: 'High Risk Transaction Burst',
    timeAgo: '2m ago',
    description: 'Abnormal volume transfer ?14.8L detected from A204 to destination A301.',
    severity: 'error',
    entity: 'A204'
  },
  {
    id: 'alt-2',
    title: 'New SIM Box Communications',
    timeAgo: '15m ago',
    description: 'P087 linked to mastermind P102 via 14 burst communications in 2.5h.',
    severity: 'tertiary',
    entity: 'P087'
  },
  {
    id: 'alt-3',
    title: 'Suspicious VPN Exfiltration',
    timeAgo: '1h ago',
    description: '2.1 GB upload burst logged from known proxy server 49.32.88.19 (NordVPN SG).',
    severity: 'warning',
    entity: 'P102'
  },
  {
    id: 'alt-4',
    title: 'ATM Cashout Velocity Alert',
    timeAgo: '2h ago',
    description: 'Mule account A502 withdrew ?8.6L across 8 simultaneous ATM locations.',
    severity: 'error',
    entity: 'A502'
  }
];

export const CDR_RECORDS: CDRRecord[] = [
  {
    id: 'cdr-1',
    time: '14:31:04',
    caller: 'P102 (+91 99201 88102)',
    receiver: 'P087 (+91 88019 20193)',
    duration: '4m 21s',
    risk: 'HIGH',
    status: 'FLAGGED',
    cellTower: 'TWR-MUM-401 (Nariman Point BTS)',
    imei: '864920048192031 (SIM-Box 32-Ch)',
    notes: 'Triggered ?14.8L banking transaction 15s after hang-up.'
  },
  {
    id: 'cdr-2',
    time: '13:15:22',
    caller: 'P087 (+91 88019 20193)',
    receiver: 'P102 (+91 99201 88102)',
    duration: '1m 08s',
    risk: 'HIGH',
    status: 'FLAGGED',
    cellTower: 'TWR-MUM-208 (BKC Cyber Cell BTS)',
    imei: '864920048192031',
    notes: 'Handover notification for new UPI handle activation.'
  },
  {
    id: 'cdr-3',
    time: '12:02:11',
    caller: 'P102 (+91 99201 88102)',
    receiver: 'Victim-0482 (+91 98210 11920)',
    duration: '0m 42s',
    risk: 'MED',
    status: 'REVIEW',
    cellTower: 'TWR-MUM-319 (Andheri East BTS)',
    notes: 'Victim onboarding pitch call for video rating task.'
  },
  {
    id: 'cdr-4',
    time: '11:48:33',
    caller: 'P044 (+91 70118 29301)',
    receiver: 'P087 (+91 88019 20193)',
    duration: '9m 42s',
    risk: 'HIGH',
    status: 'FLAGGED',
    cellTower: 'TWR-MUM-401 (Nariman Point BTS)',
    notes: 'Discussed mule account passbook and ATM card delivery.'
  },
  {
    id: 'cdr-5',
    time: '10:14:02',
    caller: 'P610 (+91 91360 44819)',
    receiver: 'P102 (+91 99201 88102)',
    duration: '2m 15s',
    risk: 'HIGH',
    status: 'FLAGGED',
    cellTower: 'TWR-MUM-105 (Colaba Fort BTS)',
    notes: 'Local banking aggregator confirming Canara Bank mule activation.'
  },
  {
    id: 'cdr-6',
    time: '09:30:45',
    caller: 'P102 (+91 99201 88102)',
    receiver: 'Victim-0192 (+91 97110 33921)',
    duration: '0m 18s',
    risk: 'MED',
    status: 'REVIEW',
    cellTower: 'TWR-MUM-401 (Nariman Point BTS)',
    notes: 'Short call duration (OTP interception / robocall profile).'
  },
  {
    id: 'cdr-7',
    time: '09:05:12',
    caller: 'P044 (+91 70118 29301)',
    receiver: 'Victim-0821 (+91 98920 44019)',
    duration: '3m 50s',
    risk: 'HIGH',
    status: 'FLAGGED',
    cellTower: 'TWR-MUM-319 (Andheri East BTS)',
    notes: 'Coerced victim into sending initial ?1,000 deposit via UPI.'
  },
  {
    id: 'cdr-8',
    time: '08:45:00',
    caller: 'P087 (+91 88019 20193)',
    receiver: 'P610 (+91 91360 44819)',
    duration: '5m 12s',
    risk: 'HIGH',
    status: 'FLAGGED',
    cellTower: 'TWR-MUM-208 (BKC Cyber Cell BTS)',
    notes: 'Coordinated ATM withdrawal locations in Dadar and Bandra.'
  }
];

export const CALL_PATTERNS: CallPattern[] = [
  {
    id: 'cp-1',
    title: 'Burst Dialing Signature',
    description: '312 calls placed in 2.5h window (09:00–11:30 IST). Classic SIM box mass-dialing profile.',
    type: 'burst',
    icon: 'phone_forwarded',
    badge: '312 calls',
    isHighRisk: true
  },
  {
    id: 'cp-2',
    title: 'Call-then-Transfer Correlation',
    description: '91% of P102?victim calls followed by UPI transaction within 20 minutes.',
    type: 'relationship',
    icon: 'account_balance',
    badge: '91% match',
    isHighRisk: true
  },
  {
    id: 'cp-3',
    title: 'Tower Hopping Anomaly',
    description: '8 BTS cell tower hops across Mumbai in under 24 hours on single IMEI.',
    type: 'frequency',
    icon: 'cell_tower',
    badge: '8 BTS hops',
    isHighRisk: true
  },
  {
    id: 'cp-4',
    title: 'Short Call OTP Interception',
    description: '64% of calls under 20 seconds. Signature of robocall OTP fishing.',
    type: 'repeat',
    icon: 'timer',
    badge: '64% short calls',
    isHighRisk: false
  }
];

export const IPDR_RECORDS: IPDRRecord[] = [
  {
    id: 'ip-1',
    time: '14:34:12',
    ipAddress: '103.45.XX.21',
    entity: 'P102',
    location: 'Mumbai (Jio Fiber AS45129)',
    countryCode: 'IN',
    risk: 'HIGH',
    status: 'FLAGGED',
    port: 443,
    protocol: 'TCP / TLS 1.3',
    bytesTransferred: '42.8 MB'
  },
  {
    id: 'ip-2',
    time: '14:32:18',
    ipAddress: '49.32.88.19',
    entity: 'P102',
    location: 'Mumbai (NordVPN SG Exit)',
    countryCode: 'SG',
    risk: 'HIGH',
    status: 'FLAGGED',
    port: 443,
    protocol: 'HTTPS',
    bytesTransferred: '2.1 GB upload burst'
  },
  {
    id: 'ip-3',
    time: '14:30:05',
    ipAddress: '192.168.XX.55',
    entity: 'Server_A',
    location: 'USA (AWS East Node)',
    countryCode: 'US',
    risk: 'LOW',
    status: 'Active',
    port: 80,
    protocol: 'HTTP',
    bytesTransferred: '1.2 MB'
  },
  {
    id: 'ip-4',
    time: '14:28:44',
    ipAddress: '45.22.XX.19',
    entity: 'U309',
    location: 'London, UK (ProtonVPN CH)',
    countryCode: 'UK',
    risk: 'MED',
    status: 'Monitoring',
    port: 8443,
    protocol: 'WSS',
    bytesTransferred: '18.4 MB'
  },
  {
    id: 'ip-5',
    time: '14:15:10',
    ipAddress: '210.89.XX.02',
    entity: 'P102',
    location: 'Kuala Lumpur, Malaysia',
    countryCode: 'MY',
    risk: 'HIGH',
    status: 'FLAGGED',
    port: 443,
    protocol: 'HTTPS',
    bytesTransferred: '840.5 MB'
  },
  {
    id: 'ip-6',
    time: '13:50:00',
    ipAddress: '103.91.22.10',
    entity: 'P087',
    location: 'Mumbai, Nariman Point',
    countryCode: 'IN',
    risk: 'HIGH',
    status: 'FLAGGED',
    port: 443,
    protocol: 'HTTPS',
    bytesTransferred: '112.0 MB'
  }
];

export const SUSPICIOUS_IP_EVENTS: SuspiciousIPEvent[] = [
  {
    id: 'ipe-1',
    title: 'VPN Data Exfiltration Burst',
    timeAgo: '22 min ago',
    description: '2.1 GB upload in 8 min from 49.32.88.19 to Singapore exit node. Suspected victim credentials exfil.',
    severity: 'error',
    ip: '49.32.88.19',
    entity: 'P102'
  },
  {
    id: 'ipe-2',
    title: 'Unusual Geo-Location Connection',
    timeAgo: '45 min ago',
    description: 'Entity U309 connecting from UK via 45.22.XX.19. Standard region is designated as India (APAC).',
    severity: 'warning',
    ip: '45.22.XX.19',
    entity: 'U309'
  },
  {
    id: 'ipe-3',
    title: 'High Frequency API Hits',
    timeAgo: '2 hours ago',
    description: 'Data transfer rate exceeding baseline by 400% on 210.89.XX.02 targeting Binance P2P endpoint.',
    severity: 'error',
    ip: '210.89.XX.02',
    entity: 'P102'
  }
];

export const BANK_TRANSACTIONS: BankTransaction[] = [
  {
    id: 'tx-1',
    date: '2026-08-02 11:45:00',
    transactionId: 'TXN-UPI-2047-001',
    from: 'Victim-G (quicktask.pay@ybl)',
    to: 'A204 (Kotak Mahindra XXXX9281)',
    amount: '?49,000',
    amountNumeric: 49000,
    risk: 'HIGH',
    status: 'FLAGGED',
    bankName: 'Kotak Mahindra Bank',
    muleFlag: true
  },
  {
    id: 'tx-2',
    date: '2026-08-02 12:10:14',
    transactionId: 'TXN-IMPS-2047-089',
    from: 'A204 (Kotak Mahindra XXXX9281)',
    to: 'A301 (AU Small Finance XXXX1029)',
    amount: '?14,80,000',
    amountNumeric: 1480000,
    risk: 'HIGH',
    status: 'FLAGGED',
    bankName: 'AU Small Finance Bank',
    muleFlag: true
  },
  {
    id: 'tx-3',
    date: '2026-08-02 13:15:00',
    transactionId: 'TXN-RTGS-2047-902',
    from: 'A301 (AU Small Finance XXXX1029)',
    to: 'A502 (Yes Bank XXXX0192)',
    amount: '?22,50,000',
    amountNumeric: 2250000,
    risk: 'HIGH',
    status: 'FLAGGED',
    bankName: 'Yes Bank Ltd',
    muleFlag: true
  },
  {
    id: 'tx-4',
    date: '2026-08-02 14:00:30',
    transactionId: 'TXN-NEFT-2047-118',
    from: 'A502 (Yes Bank XXXX0192)',
    to: 'A610 (Canara Bank XXXX7741)',
    amount: '?18,00,000',
    amountNumeric: 1800000,
    risk: 'HIGH',
    status: 'FLAGGED',
    bankName: 'Canara Bank',
    muleFlag: true
  },
  {
    id: 'tx-5',
    date: '2026-08-02 15:20:00',
    transactionId: 'TXN-ATM-2047-440',
    from: 'A610 (Canara Bank XXXX7741)',
    to: 'ATM Withdrawal (Dadar Branch)',
    amount: '?8,60,000',
    amountNumeric: 860000,
    risk: 'HIGH',
    status: 'FLAGGED',
    bankName: 'Canara Bank ATM',
    muleFlag: true
  }
];

export const DETECTED_ANOMALIES: AnomalyItem[] = [
  {
    id: 'an-1',
    title: 'Rapid Cash-Out Velocity (91% in 105m)',
    description: '?1.02Cr transferred out via 6 sub-accounts within 105 minutes of initial deposit credit.',
    icon: 'speed',
    type: 'cashout',
    risk: 'HIGH'
  },
  {
    id: 'an-2',
    title: 'Dormant Mule Account Sudden Activation',
    description: 'Account A204 (Kotak) dormant for 11 months, suddenly processed ?1.12Cr in single session.',
    icon: 'account_balance',
    type: 'layering',
    risk: 'HIGH'
  },
  {
    id: 'an-3',
    title: 'Structuring & Round-Trip Transfers',
    description: 'Split transactions of ?49,000 to bypass mandatory ?50,000 PAN verification rules.',
    icon: 'call_split',
    type: 'counterparties',
    risk: 'HIGH'
  },
  {
    id: 'an-4',
    title: 'Crypto OTC Off-Ramp Detection',
    description: 'P2P transfer from A502 to Binance P2P merchant wallet within 15 mins of credit.',
    icon: 'currency_bitcoin',
    type: 'amount',
    risk: 'HIGH'
  }
];

export const SOCIAL_PROFILES: SocialProfile[] = [
  {
    id: 'sp-1',
    handle: '@quick_jobs_help',
    platform: 'Telegram',
    platformIcon: 'telegram',
    linkedEntity: 'P102',
    risk: 'HIGH',
    confidence: '96%',
    description: '18-day-old Telegram channel. 4,200 subscribers. Broadcasting fake ?13,000 daily video rating tasks.',
    avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=p102',
    followers: '4.2K',
    postsCount: 340,
    lastActive: '14 min ago'
  },
  {
    id: 'sp-2',
    handle: '@video_task_earn',
    platform: 'Telegram',
    platformIcon: 'telegram',
    linkedEntity: 'P044',
    risk: 'HIGH',
    confidence: '92%',
    description: 'Recruitment feeder channel forwarding targets to @quick_jobs_help. 1,800 active members.',
    avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=p044',
    followers: '1.8K',
    postsCount: 190,
    lastActive: '1 hour ago'
  },
  {
    id: 'sp-3',
    handle: '@parttime_upi_2026',
    platform: 'Instagram',
    platformIcon: 'public',
    linkedEntity: 'P087',
    risk: 'HIGH',
    confidence: '88%',
    description: 'Instagram sponsored reel ad leading victims to WhatsApp onboarding links.',
    avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=p087',
    followers: '8.9K',
    postsCount: 45,
    lastActive: '3 hours ago'
  },
  {
    id: 'sp-4',
    handle: '@task_payout_admin',
    platform: 'WhatsApp',
    platformIcon: 'public',
    linkedEntity: 'P610',
    risk: 'HIGH',
    confidence: '94%',
    description: 'WhatsApp Business API account sending fraudulent payment receipts to trick victims into higher deposits.',
    avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=p610',
    followers: '500+',
    postsCount: 120,
    lastActive: '25 min ago'
  }
];

export const ACTIVITY_TIMELINE_ITEMS: ActivityTimelineItem[] = [
  {
    id: 'tl-1',
    time: '14:34 IST',
    title: 'High-Risk VPN Upload Burst (2.1 GB)',
    description: 'Entity P102 exfiltrating victim credentials via 49.32.88.19 (NordVPN SG).',
    color: 'bg-rose-500',
    isPulsing: true,
    category: 'ipdr'
  },
  {
    id: 'tl-2',
    time: '14:31 IST',
    title: 'Critical Coordination Call — P102?P087',
    description: '4m 21s call from TWR-MUM-401. Followed by ?14.8L transfer 15s later.',
    color: 'bg-indigo-500',
    category: 'cdr'
  },
  {
    id: 'tl-3',
    time: '13:15 IST',
    title: 'Rapid Layering Transfer (?22.5 Lakhs)',
    description: 'Account A301 (AU Small Fin) ? A502 (Yes Bank) within 105 minutes.',
    color: 'bg-rose-500',
    category: 'bank'
  },
  {
    id: 'tl-4',
    time: '09:00 IST',
    title: 'Bulk Telegram Campaign Broadcast',
    description: '25,000 promotional messages sent via @quick_jobs_help.',
    color: 'bg-purple-500',
    category: 'social'
  }
];

export const INITIAL_NOTES: InvestigationNote[] = [
  {
    id: 'note-1',
    author: 'Insp. S. Raut',
    date: '2026-08-14 14:30 IST',
    content: 'Cross-domain correlation confirms P102 is the central orchestrator. Priority: obtain production order for Kotak and AU Small Finance SFTP logs.',
    tag: 'CRITICAL'
  },
  {
    id: 'note-2',
    author: 'Tech Analyst V. Rao',
    date: '2026-08-14 11:15 IST',
    content: 'IMEI 864920048192031 is associated with 32 active MSISDNs. Classic SIM-Box signature. Requesting DoT TAFCOP lock.',
    tag: 'EVIDENCE'
  }
];

export const NETWORK_NODES: { id: string; label: string; type: 'person' | 'bank' | 'ip' | 'social'; risk: 'HIGH' | 'MED' | 'LOW'; x: number; y: number }[] = [
  { id: 'P102', label: 'P102 — Rajesh K. (Mastermind)', type: 'person', risk: 'HIGH', x: 50, y: 30 },
  { id: 'P087', label: 'P087 — Vikram S. (Mule Handler)', type: 'person', risk: 'HIGH', x: 28, y: 55 },
  { id: 'P044', label: 'P044 — Sunita R. (Social Lure)', type: 'person', risk: 'MED', x: 72, y: 55 },
  { id: 'P610', label: 'P610 — Suresh V. (Aggregator)', type: 'person', risk: 'HIGH', x: 15, y: 80 },
  { id: 'A204', label: 'A204 — Kotak (Layer-1 Mule)', type: 'bank', risk: 'HIGH', x: 30, y: 82 },
  { id: 'A301', label: 'A301 — AU Small Fin (Layer-2)', type: 'bank', risk: 'HIGH', x: 50, y: 82 },
  { id: 'A502', label: 'A502 — Yes Bank (Crypto Offramp)', type: 'bank', risk: 'HIGH', x: 70, y: 82 },
  { id: 'IP-49', label: '49.32.88.19 (NordVPN SG)', type: 'ip', risk: 'HIGH', x: 82, y: 25 },
  { id: 'IP-103', label: '103.45.XX.21 (Jio LEIS)', type: 'ip', risk: 'HIGH', x: 20, y: 25 },
  { id: 'SOC-1', label: '@quick_jobs_help (Telegram)', type: 'social', risk: 'HIGH', x: 78, y: 40 }
];

export const NETWORK_LINKS: { source: string; target: string; type: 'cdr' | 'bank' | 'ip' | 'social'; risk: 'HIGH' | 'MED' | 'LOW'; label?: string }[] = [
  { source: 'P102', target: 'P087', type: 'cdr', risk: 'HIGH', label: '14 Calls' },
  { source: 'P102', target: 'P044', type: 'cdr', risk: 'MED', label: '8 Calls' },
  { source: 'P102', target: 'IP-49', type: 'ip', risk: 'HIGH', label: '2.1 GB Exfil' },
  { source: 'P102', target: 'IP-103', type: 'ip', risk: 'HIGH', label: 'Main Terminal' },
  { source: 'P102', target: 'SOC-1', type: 'social', risk: 'HIGH', label: 'Channel Owner' },
  { source: 'P087', target: 'A204', type: 'bank', risk: 'HIGH', label: 'Controls UPI' },
  { source: 'P087', target: 'P610', type: 'cdr', risk: 'HIGH', label: 'Cashout Coordination' },
  { source: 'A204', target: 'A301', type: 'bank', risk: 'HIGH', label: '?14.8L Transfer' },
  { source: 'A301', target: 'A502', type: 'bank', risk: 'HIGH', label: '?22.5L Transfer' }
];

export const CASES_INTELLIGENCE_DATABASE: CaseIntelligenceSummary[] = [
  {
    id: 'INV-2047',
    caseNumber: 'CYB/MUM/2026/2047',
    title: 'Suspicious Digital & Financial Network — Video Rating UPI Scam',
    category: 'UPI Job Fraud',
    severity: 'HIGH',
    status: 'ACTIVE INVESTIGATION',
    registeredDate: '2026-08-02',
    policeStation: 'BKC Cyber Cell, Mumbai',
    leadInvestigator: 'Inspector S. Raut',
    badgeNumber: 'MH-CYB-9901',
    summaryNarrative: 'Cross-platform fraud ring targeting salaried workers via fake video-rating tasks. Victims paid UPI deposits routed through 3-tier mule network before crypto exit.',
    evidentialReadinessScore: 87,
    searchTokens: ['P102', 'P087', 'A204', 'A301', '+91 99201 88102', 'quick_jobs_help', '103.45.XX.21'],
    metrics: {
      totalPhoneIntercepts: 1842,
      flaggedCalls: 312,
      ipSessions: 4891,
      suspiciousIPs: 47,
      totalFinancialVolume: '?4.2Cr',
      frozenAmount: '?1.1Cr',
      identifiedMuleAccounts: 14,
      socialHandlesMonitored: 23,
      crossDomainCorrelationConfidence: 94
    },
    domainBreakdown: {
      cdr: {
        keyFinding: 'Mass dialing from SIM cluster — 312 flagged calls in 48h window.',
        primaryNumbers: ['+91 99201 88102', '+91 88019 20193'],
        cellTowerHotspots: ['TWR-MUM-401 (Nariman Point)', 'TWR-MUM-208 (BKC)'],
        callBurstWindows: '09:00–11:30 IST & 15:00–18:00 IST daily'
      },
      ipdr: {
        keyFinding: 'VPN-masked sessions from 3 IPs routing through Singapore endpoints. 4.8GB upload anomaly.',
        activeVPNs: ['NordVPN SG', 'ExpressVPN MY'],
        topOriginatingIPs: ['49.32.88.19', '103.45.XX.21'],
        geoLocations: ['Mumbai', 'Singapore']
      },
      bank: {
        keyFinding: 'A204 received ?1.12Cr from 45 victims. 91% outflow within 105 minutes via 6 sub-accounts.',
        primaryAccounts: ['A204 (Kotak XXXX9281)', 'A301 (AU Small Fin XXXX1029)'],
        layeringVelocity: '91% within 105 minutes',
        cryptoOffRampDetected: true
      },
      social: {
        keyFinding: 'Telegram channel @quick_jobs_help broadcast to 4,200 subscribers.',
        recruitmentChannels: ['@quick_jobs_help', '@video_task_earn'],
        targetHandles: ['P087', 'P044'],
        compromisedCredentialsCount: 8
      }
    },
    keySuspects: [
      { id: 'P102', name: 'Rajesh K. / CyberBoss_Raj', role: 'Mastermind', risk: 'HIGH', phone: '+91 99201 88102', bankAcc: 'Kotak #****9281', social: '@quick_jobs_help' },
      { id: 'P087', name: 'Vikram S. / MuleHandler_V', role: 'Mule Coordinator', risk: 'HIGH', phone: '+91 88019 20193', bankAcc: 'AU Small Finance #****1029' }
    ],
    timeline: [
      { time: '09:00 IST', date: '02 Aug 2026', stage: 'Bulk SMS Outreach', description: '25,000 SMS sent offering ?13,000 daily payout.', risk: 'MED', domain: 'SOCIAL' },
      { time: '11:45 IST', date: '02 Aug 2026', stage: 'UPI Deposit Collection', description: '?1.12Cr collected from 45 victims in single session.', risk: 'HIGH', domain: 'BANK' }
    ],
    tacticalRecommendations: [
      { action: 'Finalize chargesheet under Sec 66D IT Act / Sec 63 BSA.', priority: 'IMMEDIATE', legalSection: 'Sec 66D IT Act' },
      { action: 'Send Look-Out Circular (LOC) for mastermind P102.', priority: 'HIGH', legalSection: 'Bureau of Immigration' }
    ]
  }
];
