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
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlcTJLL5FqjKnXiTZaHTKm1qi-1A6KnwahP86Tt1XnZgwipboJVL_XhmBELO3NOcfi2gbxWW9HMWEa-ZxRPF4gnWnwIPJAf0JNYJu4L6uFSZtGoihiZjsBNAczhsJRhTtBDR5aQDhqo7iW8tuF7KZbzovS36iVunbljOmu6lpQyuLFexY4lbY3lhxlMySb4pIuS7_BrLPVwRIBQuCuR-hfm_8iByTgfilQPCT3QSahlOUOScOMkhUL'
  }
};

export const INITIAL_ALERTS: CaseAlert[] = [
  {
    id: 'alt-1',
    title: 'High Risk Transaction',
    timeAgo: '2m ago',
    description: 'Abnormal volume transfer detected from A204 to destination A301.',
    severity: 'error',
    entity: 'A204'
  },
  {
    id: 'alt-2',
    title: 'New Relationship',
    timeAgo: '15m ago',
    description: 'P087 linked to unverified entity P102 via frequent burst communications.',
    severity: 'tertiary',
    entity: 'P087'
  },
  {
    id: 'alt-3',
    title: 'Suspicious IP Login',
    timeAgo: '1h ago',
    description: 'Multiple failed attempts from known proxy server 210.89.XX.02.',
    severity: 'warning',
    entity: 'P102'
  },
  {
    id: 'alt-4',
    title: 'Coordinated Telegram Broadcast',
    timeAgo: '2h ago',
    description: '@quick_jobs_help initiated bulk outreach with known mule recruitment script.',
    severity: 'error',
    entity: 'P102'
  }
];

export const CDR_RECORDS: CDRRecord[] = [
  {
    id: 'cdr-1',
    time: '14:31:04',
    caller: 'P102',
    receiver: 'P087',
    duration: '4m 21s',
    risk: 'HIGH',
    status: 'FLAGGED',
    cellTower: 'TWR-MUM-401 (Nariman Point)',
    imei: '864920048192031',
    notes: 'Triggered immediate ₹4.8L banking transaction 15 seconds after hang-up.'
  },
  {
    id: 'cdr-2',
    time: '13:15:22',
    caller: 'P087',
    receiver: 'U992',
    duration: '12s',
    risk: 'LOW',
    status: 'CLEARED',
    cellTower: 'TWR-MUM-102 (Bandra)',
    imei: '864920048192031',
    notes: 'Short ping to courier delivery service.'
  },
  {
    id: 'cdr-3',
    time: '11:05:45',
    caller: 'U405',
    receiver: 'P102',
    duration: '45m 12s',
    risk: 'HIGH',
    status: 'FLAGGED',
    cellTower: 'TWR-DEL-708 (Connaught Place)',
    imei: '359182049182001',
    notes: 'Long encrypted voip/circuit routed call from suspected offshore syndicate handler.'
  },
  {
    id: 'cdr-4',
    time: '09:20:11',
    caller: 'P102',
    receiver: 'P304',
    duration: '1m 05s',
    risk: 'MED',
    status: 'REVIEW',
    cellTower: 'TWR-MUM-401 (Nariman Point)',
    imei: '864920048192031',
    notes: 'Mid-level coordination with secondary mule account holder.'
  },
  {
    id: 'cdr-5',
    time: '08:45:00',
    caller: 'P087',
    receiver: 'P102',
    duration: '2m 30s',
    risk: 'LOW',
    status: 'CLEARED',
    cellTower: 'TWR-MUM-102 (Bandra)',
    imei: '864920048192031',
    notes: 'Morning status synchronization.'
  },
  {
    id: 'cdr-6',
    time: '07:12:19',
    caller: 'P102',
    receiver: 'A204_POC',
    duration: '3m 10s',
    risk: 'HIGH',
    status: 'FLAGGED',
    cellTower: 'TWR-MUM-401 (Nariman Point)',
    imei: '864920048192031',
    notes: 'Account verification phone bridge before batch settlement.'
  }
];

export const CALL_PATTERNS: CallPattern[] = [
  {
    id: 'cp-1',
    title: 'Repeated Contact',
    description: 'High volume pinging between P102 and P087.',
    type: 'repeat',
    icon: 'repeat'
  },
  {
    id: 'cp-2',
    title: 'High Frequency',
    description: 'Spike in activity detected outside normal hours.',
    type: 'frequency',
    icon: 'trending_up',
    isHighRisk: true
  },
  {
    id: 'cp-3',
    title: 'Short Duration Burst',
    description: 'Multiple <30s calls indicative of signalling.',
    type: 'burst',
    icon: 'electric_bolt'
  },
  {
    id: 'cp-4',
    title: 'New Relationship',
    description: 'First contact established with U405.',
    type: 'relationship',
    icon: 'group_add'
  }
];

export const IPDR_RECORDS: IPDRRecord[] = [
  {
    id: 'ipdr-1',
    time: '14:34:12',
    ipAddress: '103.45.XX.21',
    entity: 'P102',
    location: 'India',
    countryCode: 'IN',
    risk: 'HIGH',
    status: 'FLAGGED',
    port: 443,
    protocol: 'TCP/TLS',
    bytesTransferred: '42.8 MB'
  },
  {
    id: 'ipdr-2',
    time: '14:30:05',
    ipAddress: '192.168.XX.55',
    entity: 'Server_A',
    location: 'USA',
    countryCode: 'US',
    risk: 'LOW',
    status: 'Active',
    port: 8080,
    protocol: 'HTTPS',
    bytesTransferred: '1.2 MB'
  },
  {
    id: 'ipdr-3',
    time: '14:28:44',
    ipAddress: '45.22.XX.19',
    entity: 'U309',
    location: 'UK',
    countryCode: 'GB',
    risk: 'MED',
    status: 'Monitoring',
    port: 9001,
    protocol: 'VPN Tunnel',
    bytesTransferred: '15.4 MB'
  },
  {
    id: 'ipdr-4',
    time: '14:15:10',
    ipAddress: '210.89.XX.02',
    entity: 'P102',
    location: 'India',
    countryCode: 'IN',
    risk: 'HIGH',
    status: 'FLAGGED',
    port: 22,
    protocol: 'SSH Proxy',
    bytesTransferred: '128.0 MB'
  },
  {
    id: 'ipdr-5',
    time: '12:04:19',
    ipAddress: '185.190.XX.14',
    entity: 'Node_X',
    location: 'Netherlands',
    countryCode: 'NL',
    risk: 'MED',
    status: 'Monitoring',
    port: 5353,
    protocol: 'DNS/DoH',
    bytesTransferred: '8.1 MB'
  }
];

export const SUSPICIOUS_IP_EVENTS: SuspiciousIPEvent[] = [
  {
    id: 'sip-1',
    title: 'New IP Detected',
    timeAgo: '2 mins ago',
    description: 'Connection from 103.45.XX.21 established for Entity P102. IP never seen before in this investigation context.',
    severity: 'error',
    ip: '103.45.XX.21',
    entity: 'P102'
  },
  {
    id: 'sip-2',
    title: 'Unusual Location Setup',
    timeAgo: '15 mins ago',
    description: 'Entity U309 connecting from UK via 45.22.XX.19. Standard operating region is designated as APAC.',
    severity: 'warning',
    ip: '45.22.XX.19',
    entity: 'U309'
  },
  {
    id: 'sip-3',
    title: 'Repeated Connection Attempts',
    timeAgo: '1 hr ago',
    description: 'Multiple failed connection handshakes logged from 210.89.XX.02 targeting secured sub-network.',
    severity: 'error',
    ip: '210.89.XX.02',
    entity: 'P102'
  },
  {
    id: 'sip-4',
    title: 'High Frequency Activity',
    timeAgo: '3 hrs ago',
    description: 'Data transfer rates exceeding normal baseline by 400% on 192.168.XX.101 over a 10-minute window.',
    severity: 'info',
    ip: '192.168.XX.101',
    entity: 'Server_A'
  }
];

export const BANK_TRANSACTIONS: BankTransaction[] = [
  {
    id: 'txn-1',
    date: '18 Aug 2026',
    transactionId: 'TXN-2047-001',
    from: 'P087',
    to: 'A204',
    amount: '₹4,80,000',
    amountNumeric: 480000,
    risk: 'HIGH',
    status: 'FLAGGED',
    bankName: 'HDFC Bank - Current A/C',
    muleFlag: true
  },
  {
    id: 'txn-2',
    date: '18 Aug 2026',
    transactionId: 'TXN-2047-002',
    from: 'A204',
    to: 'A301',
    amount: '₹4,80,000',
    amountNumeric: 480000,
    risk: 'HIGH',
    status: 'FLAGGED',
    bankName: 'ICICI Bank - Fast Transit A/C',
    muleFlag: true
  },
  {
    id: 'txn-3',
    date: '17 Aug 2026',
    transactionId: 'TXN-2047-003',
    from: 'B112',
    to: 'P087',
    amount: '₹50,000',
    amountNumeric: 50000,
    risk: 'MED',
    status: 'CLEARED',
    bankName: 'SBI - Savings A/C',
    muleFlag: false
  },
  {
    id: 'txn-4',
    date: '16 Aug 2026',
    transactionId: 'TXN-2047-004',
    from: 'C998',
    to: 'P087',
    amount: '₹12,500',
    amountNumeric: 12500,
    risk: 'LOW',
    status: 'CLEARED',
    bankName: 'Axis Bank',
    muleFlag: false
  },
  {
    id: 'txn-5',
    date: '15 Aug 2026',
    transactionId: 'TXN-2047-005',
    from: 'A301',
    to: 'Offshore_Wallet_99',
    amount: '₹4,75,000',
    amountNumeric: 475000,
    risk: 'HIGH',
    status: 'FLAGGED',
    bankName: 'Crypto On-Ramp Gateway',
    muleFlag: true
  }
];

export const DETECTED_ANOMALIES: AnomalyItem[] = [
  {
    id: 'ano-1',
    title: 'Rapid Cash-Out',
    description: 'Funds transferred out of A204 within 12 minutes of receipt.',
    icon: 'speed',
    type: 'cashout',
    risk: 'HIGH'
  },
  {
    id: 'ano-2',
    title: 'Unusual Amount',
    description: '₹4,80,000 exceeds the 95th percentile of historical profile P087.',
    icon: 'account_balance_wallet',
    type: 'amount',
    risk: 'MED'
  },
  {
    id: 'ano-3',
    title: 'Multiple Counterparties',
    description: 'Account A301 received deposits from 14 distinct sources today.',
    icon: 'hub',
    type: 'counterparties',
    risk: 'HIGH'
  },
  {
    id: 'ano-4',
    title: 'Round-Tripping Layering',
    description: 'Fractional amounts returned via intermediary shells to obscure primary remitters.',
    icon: 'sync',
    type: 'layering',
    risk: 'HIGH'
  }
];

export const SOCIAL_PROFILES: SocialProfile[] = [
  {
    id: 'soc-1',
    handle: '@quick_jobs_help',
    platform: 'Telegram',
    platformIcon: 'send',
    linkedEntity: 'Entity P102',
    risk: 'HIGH',
    confidence: '91%',
    description: 'Recent activity indicates aggressive recruitment patterns typical of established mule networks. Frequent IP shifts noted.',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArCot99FUsWyKeMKVUvWtRthwwkrWDNXCZe4EUy2ZIlGZmuGU9AQmjCjYxwOCkZLSNfuR_i24I9B0VWNqslCykWxj7b1uCISpDC_H978pLH6EK1tP-qzArE10hOk4kLvIuN7FwMpHpSHVNVtVmwUG3inTXbsTiYm4uW8ifIzncGDqXEZzl26bqLtohw8PbCv3rs5oV0CWRt5DAHigI953yYfB4O0-bHZJxfn4se-jMZg3G8inHaD51',
    followers: '14.2K',
    postsCount: 382,
    lastActive: '6 mins ago'
  },
  {
    id: 'soc-2',
    handle: '@secure_payment24',
    platform: 'Instagram',
    platformIcon: 'photo_camera',
    linkedEntity: 'Entity P204',
    risk: 'MED',
    confidence: '78%',
    description: 'Account acts as a secondary funnel. Moderate interaction with primary risk nodes.',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCP_DdzT7qOv0QRKk0j1Eg70bIQ73O2MDGWuS80xd6SZeFLVE3HQXL2rgxK5ntVjab3S9jEwANRdQtarryt3Ihc5oHHjaYH-jB_XVeUwBrKSbnHsXqzhPbPK5nNd8Ksv4npPTnqav-PZEDXOY-TQImV_YCkOS350FIU8HF6c3w7H3jZJV5LdmawNck4i460SVHRqjyebUoXEaNKMxY6BkKWGU4ZzG_XPHHGK4J12k-PSrgynzLf4Yz-',
    followers: '3.8K',
    postsCount: 89,
    lastActive: '22 mins ago'
  }
];

export const ACTIVITY_TIMELINE_ITEMS: ActivityTimelineItem[] = [
  {
    id: 'atl-1',
    time: '14:20',
    title: 'Suspicious post',
    description: 'Flagged by NLP keyword scanner.',
    color: '#ba1a1a',
    category: 'social'
  },
  {
    id: 'atl-2',
    time: '14:24',
    title: 'P102 interaction',
    description: 'Direct message established.',
    color: '#0054cb',
    category: 'social'
  },
  {
    id: 'atl-3',
    time: '14:27',
    title: 'New account',
    description: 'Creation detected on same IP subnet.',
    color: '#73777f',
    category: 'ipdr'
  },
  {
    id: 'atl-4',
    time: '14:33',
    title: 'Coordinated activity',
    description: 'Multiple nodes broadcasting simultaneously.',
    color: '#ba1a1a',
    isPulsing: true,
    category: 'social'
  }
];

export const INITIAL_NOTES: InvestigationNote[] = [
  {
    id: 'note-1',
    author: 'Inspector S. Raut',
    date: '18 Aug 2026, 14:40',
    content: 'P102 and P087 demonstrate tight synchronization. The 4m 21s phone call immediately preceded the ₹4,80,000 transfer from P087 to mule account A204. Recommending immediate lien on A204 and A301.',
    tag: 'CRITICAL'
  },
  {
    id: 'note-2',
    author: 'Cyber Analyst K. Verma',
    date: '18 Aug 2026, 13:55',
    content: 'IP address 103.45.XX.21 traced to Nariman Point proxy relay. Subnet coincides with Telegram handler @quick_jobs_help.',
    tag: 'EVIDENCE'
  }
];

export const NETWORK_NODES: { id: string; label: string; type: 'person' | 'bank' | 'ip' | 'social'; risk: 'HIGH' | 'MED' | 'LOW'; x: number; y: number }[] = [
  { id: 'P102', label: 'Primary Target', type: 'person', risk: 'HIGH', x: 20, y: 35 },
  { id: 'P087', label: 'Facilitator', type: 'person', risk: 'HIGH', x: 45, y: 35 },
  { id: 'A204', label: 'Mule Account', type: 'bank', risk: 'HIGH', x: 70, y: 25 },
  { id: 'A301', label: 'Destination Pool', type: 'bank', risk: 'MED', x: 88, y: 25 },
  { id: 'U405', label: 'Layering Node', type: 'person', risk: 'HIGH', x: 45, y: 70 },
  { id: 'IP-Nariman', label: '103.45.XX.21', type: 'ip', risk: 'MED', x: 20, y: 70 },
  { id: 'TG-QuickJobs', label: '@quick_jobs', type: 'social', risk: 'HIGH', x: 20, y: 15 },
  { id: 'IG-SecurePay', label: '@secure_pay', type: 'social', risk: 'MED', x: 70, y: 65 }
];

export const NETWORK_LINKS: { source: string; target: string; type: 'cdr' | 'bank' | 'ip' | 'social'; risk: 'HIGH' | 'MED' | 'LOW'; label?: string }[] = [
  { source: 'P102', target: 'P087', type: 'cdr', risk: 'HIGH', label: 'CALLS' },
  { source: 'P087', target: 'A204', type: 'bank', risk: 'HIGH', label: 'TRANSFERS' },
  { source: 'A204', target: 'A301', type: 'bank', risk: 'HIGH', label: 'TRANSFERS' },
  { source: 'P102', target: 'TG-QuickJobs', type: 'social', risk: 'HIGH', label: 'ADMIN' },
  { source: 'P102', target: 'IP-Nariman', type: 'ip', risk: 'MED', label: 'SESSION' },
  { source: 'P087', target: 'U405', type: 'cdr', risk: 'HIGH', label: 'BURST CALLS' },
  { source: 'U405', target: 'IG-SecurePay', type: 'social', risk: 'MED', label: 'RECRUIT' }
];

export const CASES_INTELLIGENCE_DATABASE: CaseIntelligenceSummary[] = [
  {
    id: 'case-2047',
    caseNumber: '#INV-2047',
    title: 'Multi-Account Telegram Task Mule Fraud & Money Laundering Network',
    category: 'Cyber Financial Fraud / Mule Syndicate',
    severity: 'HIGH',
    status: 'ACTIVE INVESTIGATION',
    registeredDate: '16 Aug 2026',
    policeStation: 'Cyber Crime Police Station (BKC, Mumbai)',
    leadInvestigator: 'Inspector S. Raut',
    badgeNumber: 'MH-CYB-8821',
    summaryNarrative: 'A coordinated cyber-financial operation exploiting Telegram part-time job lures (@quick_jobs_help) to siphon funds into mule accounts (A204, A301). Cross-domain telemetry reveals synchronized 4m 21s cellular voice intercepts between P102 and P087 immediately before ₹4,80,000 IMPS layering transfers, followed by rapid ATM withdrawals and SSH proxy concealment via IP 103.45.XX.21.',
    evidentialReadinessScore: 89,
    searchTokens: [
      'INV-2047',
      '2047',
      'P102',
      'P087',
      'A204',
      'A301',
      'U405',
      '103.45.XX.21',
      '@quick_jobs_help',
      'TXN-2047-001',
      'TXN-2047-002',
      'Nariman Point',
      'IMPS REF#912',
      '+91 98201 44812',
      '35892019482019',
      'Mule',
      'Telegram',
      'HDFC',
      'ICICI',
      'S. Raut'
    ],
    metrics: {
      totalPhoneIntercepts: 1842,
      flaggedCalls: 34,
      ipSessions: 684,
      suspiciousIPs: 12,
      totalFinancialVolume: '₹18,70,000',
      frozenAmount: '₹9,60,000',
      identifiedMuleAccounts: 4,
      socialHandlesMonitored: 3,
      crossDomainCorrelationConfidence: 94
    },
    domainBreakdown: {
      cdr: {
        keyFinding: 'High-frequency burst calls between P102 and P087 strictly 3 to 5 minutes prior to banking fund dispersals.',
        primaryNumbers: ['+91 98201 44812 (P102)', '+91 98332 99182 (P087)', '+91 99104 22091 (U405)'],
        cellTowerHotspots: ['Cell-Twr-881 (Nariman Pt)', 'Cell-Twr-402 (BKC Central)', 'Cell-Twr-119 (Andheri East)'],
        callBurstWindows: '14:00 - 14:45 IST (Coincides with Banking Cleared Tranches)'
      },
      ipdr: {
        keyFinding: 'IP 103.45.XX.21 utilized as a domestic SSH jump host to administer malicious Telegram automation bots.',
        activeVPNs: ['NordVPN Netherlands Relay', 'Mullvad WireGuard Tunnel (Port 9001)'],
        topOriginatingIPs: ['103.45.XX.21 (Mumbai Proxy)', '210.89.XX.02 (SSH Proxy)', '45.22.XX.19 (UK Tunnel)'],
        geoLocations: ['Mumbai (India)', 'London (United Kingdom)', 'Amsterdam (Netherlands)']
      },
      bank: {
        keyFinding: 'Instant 2-stage layering: ₹4,80,000 sent from P087 to A204, split immediately into A301 and overseas crypto on-ramp.',
        primaryAccounts: ['HDFC A/C #****8821 (P087)', 'ICICI Fast Transit #****4412 (A204)', 'Axis Pool #****3309 (A301)'],
        layeringVelocity: 'Funds moved in under 12 minutes (95th percentile risk velocity)',
        cryptoOffRampDetected: true
      },
      social: {
        keyFinding: 'Public recruitment campaigns on Telegram and Instagram targeting students for mule bank account rentals.',
        recruitmentChannels: ['@quick_jobs_help (Telegram - 14.2k members)', '@secure_pay_official (Instagram)'],
        targetHandles: ['@quick_jobs_help', '@invest_crypto_guru', '@dark_alpha_ops'],
        compromisedCredentialsCount: 18
      }
    },
    keySuspects: [
      {
        id: 'P102',
        name: 'Arjun M. / Alias "Shadow_Admin"',
        role: 'Primary Syndicate Controller & Bot Master',
        risk: 'HIGH',
        phone: '+91 98201 44812',
        ip: '103.45.XX.21',
        social: '@quick_jobs_help'
      },
      {
        id: 'P087',
        name: 'Rohan K. / "Vortex_99"',
        role: 'Financial Mule Ring Facilitator',
        risk: 'HIGH',
        phone: '+91 98332 99182',
        bankAcc: 'HDFC #****8821',
        ip: '210.89.XX.02'
      },
      {
        id: 'A204',
        name: 'Deepak S. (Mule Account Holder)',
        role: 'First-Hop Intermediate Mule Pool',
        risk: 'HIGH',
        bankAcc: 'ICICI #****4412'
      },
      {
        id: 'U405',
        name: 'Vikram N. / "LayerNode"',
        role: 'Cell Cluster Coordinator & ATM Cashout Handler',
        risk: 'HIGH',
        phone: '+91 99104 22091',
        social: '@secure_pay_official'
      }
    ],
    timeline: [
      {
        time: '12:04 IST',
        date: '18 Aug 2026',
        stage: 'Initial Telegram Campaign Launch',
        description: '@quick_jobs_help broadcasts deceptive daily task investment offer to 14,200 channel members.',
        risk: 'MED',
        domain: 'SOCIAL'
      },
      {
        time: '13:58 IST',
        date: '18 Aug 2026',
        stage: 'SSH Proxy Tunnel Established',
        description: 'P102 initiates encrypted SSH connection from 103.45.XX.21 via Cell Tower #881 (Nariman Point).',
        risk: 'HIGH',
        domain: 'IPDR'
      },
      {
        time: '14:22 IST',
        date: '18 Aug 2026',
        stage: 'Critical Telephony Synchronization',
        description: '4m 21s telephone conversation between controller P102 and financial handler P087.',
        risk: 'HIGH',
        domain: 'CDR'
      },
      {
        time: '14:28 IST',
        date: '18 Aug 2026',
        stage: 'First Layer IMPS Fund Transfer',
        description: '₹4,80,000 dispatched from HDFC #8821 to Mule Account A204 (ICICI #4412).',
        risk: 'HIGH',
        domain: 'BANK'
      },
      {
        time: '14:40 IST',
        date: '18 Aug 2026',
        stage: 'Rapid Layering & ATM Withdrawal',
        description: '₹4,75,000 routed to crypto gateway while ₹5,000 cash withdrawn from ATM at Nariman Point.',
        risk: 'HIGH',
        domain: 'CROSS-DOMAIN'
      }
    ],
    tacticalRecommendations: [
      {
        action: 'Issue Section 91 CrPC notice to ICICI Bank to freeze current balance on A204 & A301.',
        priority: 'IMMEDIATE',
        legalSection: 'Sec 91 CrPC / Sec 437A BNS'
      },
      {
        action: 'Request Telegram LLC for IP connection logs and phone metadata associated with @quick_jobs_help.',
        priority: 'HIGH',
        legalSection: 'Sec 79(3)(b) IT Act 2000'
      },
      {
        action: 'Add IMEI 35892019482019 to National CEIR Blacklist and activate real-time cell tower geofence alerts.',
        priority: 'HIGH',
        legalSection: 'Telecom Regulatory Guidelines'
      },
      {
        action: 'Compile Sec 65B Indian Evidence Act certificate for digital audio recordings and IPDR session traces.',
        priority: 'ROUTINE',
        legalSection: 'Sec 65B Indian Evidence Act / Sec 63 BSA'
      }
    ]
  },
  {
    id: 'case-1092',
    caseNumber: '#INV-1092',
    title: 'Sophisticated SIM-Swap & OTP Intercept Banking Phishing Syndicate',
    category: 'Telecommunication Intercept / Banking Phishing',
    severity: 'HIGH',
    status: 'ACTIVE INVESTIGATION',
    registeredDate: '12 Aug 2026',
    policeStation: 'Cyber Crime Unit (Bandra East, Mumbai)',
    leadInvestigator: 'Inspector K. Verma',
    badgeNumber: 'MH-CYB-7410',
    summaryNarrative: 'Fraudulent SIM swap executed against high-net-worth victim via compromised telecom distributor login. OTPs intercepted within 90 seconds to drain net-banking accounts across multiple regional co-operative banks.',
    evidentialReadinessScore: 78,
    searchTokens: [
      'INV-1092',
      '1092',
      'P304',
      'P712',
      'B881',
      'B992',
      '210.89.XX.02',
      '@instant_loan_fast',
      '35892019482019',
      'Bandra East',
      'SIM-Swap',
      '+91 97110 33491',
      'Cooperative Bank',
      'OTP Intercept'
    ],
    metrics: {
      totalPhoneIntercepts: 940,
      flaggedCalls: 18,
      ipSessions: 320,
      suspiciousIPs: 7,
      totalFinancialVolume: '₹34,50,000',
      frozenAmount: '₹14,20,000',
      identifiedMuleAccounts: 6,
      socialHandlesMonitored: 2,
      crossDomainCorrelationConfidence: 88
    },
    domainBreakdown: {
      cdr: {
        keyFinding: 'SIM reactivated on new handset (IMEI ending 482019) at 02:15 AM; 14 SMS OTP packets intercepted.',
        primaryNumbers: ['+91 97110 33491 (Target)', '+91 98402 11982 (Rogue Agent)'],
        cellTowerHotspots: ['Cell-Twr-620 (Bandra East)', 'Cell-Twr-104 (Kurla West)'],
        callBurstWindows: '02:00 - 03:30 AM IST (Off-peak SIM Swap)'
      },
      ipdr: {
        keyFinding: 'Access from residential broadband switched abruptly to commercial datacenter IP within 4 minutes.',
        activeVPNs: ['ProtonVPN Switzerland Node'],
        topOriginatingIPs: ['210.89.XX.02', '185.220.101.5'],
        geoLocations: ['Mumbai (India)', 'Zurich (Switzerland)']
      },
      bank: {
        keyFinding: 'Beneficiary addition cooling period bypassed using compromised biometric credentials.',
        primaryAccounts: ['Apex Co-op Bank #9941', 'State Bank Current #1044'],
        layeringVelocity: '₹34.5L dispersed across 6 accounts within 18 minutes',
        cryptoOffRampDetected: false
      },
      social: {
        keyFinding: 'Victim targeted through spear-phishing WhatsApp loan approval link.',
        recruitmentChannels: ['WhatsApp Business Rogue Catalog API'],
        targetHandles: ['@instant_loan_fast', '@kyc_update_official'],
        compromisedCredentialsCount: 42
      }
    },
    keySuspects: [
      {
        id: 'P304',
        name: 'Sameer Q. / "MasterSwap"',
        role: 'SIM Replacement & Telecom Store Insider',
        risk: 'HIGH',
        phone: '+91 97110 33491',
        ip: '210.89.XX.02'
      },
      {
        id: 'P712',
        name: 'Dinesh B. / "CashMaster"',
        role: 'Beneficiary Manager & Mule Recruiter',
        risk: 'HIGH',
        bankAcc: 'Apex Bank #****9941',
        social: '@instant_loan_fast'
      }
    ],
    timeline: [
      {
        time: '01:45 IST',
        date: '12 Aug 2026',
        stage: 'Unauthorized SIM Replacement Request',
        description: 'Duplicate e-SIM QR issued from rogue franchise store without physical verification.',
        risk: 'HIGH',
        domain: 'CDR'
      },
      {
        time: '02:18 IST',
        date: '12 Aug 2026',
        stage: 'Net Banking Password Reset',
        description: 'OTP intercepted on new handset; netbanking credentials altered.',
        risk: 'HIGH',
        domain: 'IPDR'
      },
      {
        time: '02:35 IST',
        date: '12 Aug 2026',
        stage: 'Fund Exfiltration',
        description: '₹34,50,000 transferred to 6 mule bank accounts in rapid succession.',
        risk: 'HIGH',
        domain: 'BANK'
      }
    ],
    tacticalRecommendations: [
      {
        action: 'Summon Telecom Franchise Master Distributor for forensic audit of SIM issuance logs.',
        priority: 'IMMEDIATE',
        legalSection: 'Sec 91 CrPC'
      },
      {
        action: 'Debit freeze requests sent to Apex Co-op Bank & State Bank of India.',
        priority: 'IMMEDIATE',
        legalSection: 'Sec 102 CrPC'
      }
    ]
  },
  {
    id: 'case-3011',
    caseNumber: '#INV-3011',
    title: 'Darknet Narcotics Layering & P2P Crypto Laundering Grid',
    category: 'Organized Cyber Narcotics & Crypto Layering',
    severity: 'HIGH',
    status: 'UNDER SURVEILLANCE',
    registeredDate: '08 Aug 2026',
    policeStation: 'Special Cell (Cyber & Narcotics Division, New Delhi)',
    leadInvestigator: 'ACP Devendra Rao',
    badgeNumber: 'DL-CYB-1004',
    summaryNarrative: 'Cross-border narcotics distribution ring taking payments via INR UPI merchant accounts, immediately converting fiat into USDT-TRC20 through P2P merchants on decentralized exchanges.',
    evidentialReadinessScore: 92,
    searchTokens: [
      'INV-3011',
      '3011',
      'P909',
      'P441',
      'W772',
      '185.190.XX.14',
      '@crypto_insider_ops',
      'USDT-TRC20',
      'Offshore_Wallet_99',
      'Cyber Cell Delhi',
      '+91 98109 77201',
      'Binance P2P',
      'Tor Relay'
    ],
    metrics: {
      totalPhoneIntercepts: 2150,
      flaggedCalls: 52,
      ipSessions: 1420,
      suspiciousIPs: 24,
      totalFinancialVolume: '₹1,12,00,000',
      frozenAmount: '₹41,00,000',
      identifiedMuleAccounts: 9,
      socialHandlesMonitored: 5,
      crossDomainCorrelationConfidence: 96
    },
    domainBreakdown: {
      cdr: {
        keyFinding: 'Satellite-enabled secure handsets and international roaming VoIP trunks used for drop logistics.',
        primaryNumbers: ['+91 98109 77201', '+44 7911 204911', '+971 50 119 2831'],
        cellTowerHotspots: ['Delhi IGI Airport Periphery', 'Rohini Sector 18'],
        callBurstWindows: '23:00 - 04:00 IST (Darknet Dead-drop Coordination)'
      },
      ipdr: {
        keyFinding: 'Tor onion routing exit nodes matched with high-bandwidth DoH (DNS-over-HTTPS) traffic on port 5353.',
        activeVPNs: ['Tor Hidden Services (.onion)', 'Custom ShadowSocks Relay'],
        topOriginatingIPs: ['185.190.XX.14', '198.51.100.44', '104.244.42.1'],
        geoLocations: ['New Delhi (India)', 'Frankfurt (Germany)', 'Dubai (UAE)']
      },
      bank: {
        keyFinding: 'UPI QR merchant codes masquerading as retail grocery stores received ₹1.12 Cr in small denominations of ₹2,000 - ₹5,000.',
        primaryAccounts: ['Merchant UPI IDs #pay_mart_99', 'Crypto Exchange Escrow P2P'],
        layeringVelocity: 'Converted to USDT within 6 minutes of UPI credit',
        cryptoOffRampDetected: true
      },
      social: {
        keyFinding: 'Encrypted Wickr / Telegram channels using self-destructing dead-drop GPS coordinates.',
        recruitmentChannels: ['@crypto_insider_ops (Telegram)', 'Session ID #05a8f9b2...'],
        targetHandles: ['@crypto_insider_ops', '@dark_alpha_ops', '@delhi_drop_247'],
        compromisedCredentialsCount: 65
      }
    },
    keySuspects: [
      {
        id: 'P909',
        name: 'Kabir T. / "AlphaOnion"',
        role: 'Darknet Vendor & Crypto Escrow Master',
        risk: 'HIGH',
        phone: '+91 98109 77201',
        ip: '185.190.XX.14',
        social: '@crypto_insider_ops'
      },
      {
        id: 'P441',
        name: 'Harpreet S. / "DropRider"',
        role: 'Ground Logistics & Physical Drop Courier',
        risk: 'HIGH',
        phone: '+91 98112 00192'
      }
    ],
    timeline: [
      {
        time: '23:14 IST',
        date: '08 Aug 2026',
        stage: 'Tor Node Payment Notification',
        description: 'Payment escrow confirmed on darknet forum for batch shipment #NARC-88.',
        risk: 'HIGH',
        domain: 'IPDR'
      },
      {
        time: '23:30 IST',
        date: '08 Aug 2026',
        stage: 'Micro-UPI Inflow to Mule Merchant',
        description: '₹4,50,000 credited across 90 separate UPI QR scan payments.',
        risk: 'HIGH',
        domain: 'BANK'
      },
      {
        time: '23:42 IST',
        date: '08 Aug 2026',
        stage: 'P2P Crypto Conversion',
        description: '₹4,40,000 locked into USDT on decentralized P2P exchange wallet Offshore_Wallet_99.',
        risk: 'HIGH',
        domain: 'CROSS-DOMAIN'
      }
    ],
    tacticalRecommendations: [
      {
        action: 'File MLAT (Mutual Legal Assistance Treaty) request for blockchain tracking on USDT wallet address.',
        priority: 'IMMEDIATE',
        legalSection: 'International MLAT / FIU-IND'
      },
      {
        action: 'Deploy electronic surveillance on IMEI at Rohini Sector 18 tower sector.',
        priority: 'HIGH',
        legalSection: 'Sec 5(2) Indian Telegraph Act'
      }
    ]
  },
  {
    id: 'case-4088',
    caseNumber: '#INV-4088',
    title: 'Part-Time Work-From-Home Rating Scam & WhatsApp Bot Farm',
    category: 'Mass Phishing / Fraudulent Task Platform',
    severity: 'MED',
    status: 'CHARGESHEET READY',
    registeredDate: '02 Aug 2026',
    policeStation: 'Cyber Crime Police Station (Bengaluru City)',
    leadInvestigator: 'Inspector Ananya Rao',
    badgeNumber: 'KA-CYB-5519',
    summaryNarrative: 'Victims lured into paying deposits to "review luxury hotels and YouTube videos". Over 380 victims across Karnataka and Maharashtra scammed with fabricated profit dashboards.',
    evidentialReadinessScore: 96,
    searchTokens: [
      'INV-4088',
      '4088',
      'P552',
      'P610',
      'A774',
      'A912',
      '45.22.XX.19',
      '@earn_daily_task',
      'UPI-Bulk',
      'Bengaluru Cyber',
      '+91 94480 11928',
      'Work From Home Scam'
    ],
    metrics: {
      totalPhoneIntercepts: 3100,
      flaggedCalls: 64,
      ipSessions: 890,
      suspiciousIPs: 15,
      totalFinancialVolume: '₹62,00,000',
      frozenAmount: '₹28,50,000',
      identifiedMuleAccounts: 12,
      socialHandlesMonitored: 8,
      crossDomainCorrelationConfidence: 98
    },
    domainBreakdown: {
      cdr: {
        keyFinding: 'Automated dialer systems pushing voice blasts from virtual PBX lines.',
        primaryNumbers: ['+91 94480 11928', '+91 98801 22849'],
        cellTowerHotspots: ['Whitefield Outer Ring Rd', 'Koramangala 4th Block'],
        callBurstWindows: '10:00 - 18:00 IST (Working Hours Calling)'
      },
      ipdr: {
        keyFinding: 'Hosted on bulletproof offshore hosting in Southeast Asia with Cloudflare CDN fronting.',
        activeVPNs: ['Hong Kong Residential Proxy Farm'],
        topOriginatingIPs: ['45.22.XX.19', '103.110.22.18'],
        geoLocations: ['Bengaluru (India)', 'Singapore', 'Phnom Penh (Cambodia)']
      },
      bank: {
        keyFinding: 'Rent-a-mule network operated by college students paid 2% commissions.',
        primaryAccounts: ['Canara Bank #****7741', 'Kotak Mahindra #****9120'],
        layeringVelocity: 'Layered across 3 tiers of accounts in under 30 minutes',
        cryptoOffRampDetected: true
      },
      social: {
        keyFinding: 'Over 40 WhatsApp groups and Instagram sponsored ads pushing fraudulent APK download links.',
        recruitmentChannels: ['@earn_daily_task', 'WhatsApp Group: Daily Work India VIP 04'],
        targetHandles: ['@earn_daily_task', '@hotel_rating_rewards'],
        compromisedCredentialsCount: 110
      }
    },
    keySuspects: [
      {
        id: 'P552',
        name: 'Manoj P. / "BotMaster_BLR"',
        role: 'Virtual PBX Administrator & Ad Buyer',
        risk: 'HIGH',
        phone: '+91 94480 11928',
        ip: '45.22.XX.19'
      },
      {
        id: 'P610',
        name: 'Suresh V. / "MuleCoordinator"',
        role: 'Local Banking Accounts Aggregator',
        risk: 'HIGH',
        bankAcc: 'Canara #****7741'
      }
    ],
    timeline: [
      {
        time: '09:00 IST',
        date: '02 Aug 2026',
        stage: 'Bulk SMS & WhatsApp Outreach',
        description: '25,000 SMS messages sent offering ₹3,000 daily payout for video ratings.',
        risk: 'MED',
        domain: 'SOCIAL'
      },
      {
        time: '11:45 IST',
        date: '02 Aug 2026',
        stage: 'Deposit Collection via UPI',
        description: '₹12,40,000 collected from 45 victims in single morning session.',
        risk: 'HIGH',
        domain: 'BANK'
      },
      {
        time: '15:20 IST',
        date: '02 Aug 2026',
        stage: 'Bulk Cash Withdrawals at Multiple ATMs',
        description: 'Mule handlers withdrew cash simultaneously across 8 ATM locations.',
        risk: 'HIGH',
        domain: 'CROSS-DOMAIN'
      }
    ],
    tacticalRecommendations: [
      {
        action: 'Finalize Cyber Forensic Chargesheet with digital hash chains for Special Cyber Court.',
        priority: 'IMMEDIATE',
        legalSection: 'Sec 173 CrPC / Sec 66D IT Act'
      },
      {
        action: 'Send Look-Out Circular (LOC) alert for mastermind suspected operating from overseas.',
        priority: 'HIGH',
        legalSection: 'Bureau of Immigration LOC'
      }
    ]
  }
];


