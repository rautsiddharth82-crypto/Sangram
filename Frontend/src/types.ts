export type NavTab = 'dashboard' | 'case-search' | 'cdr' | 'ipdr' | 'bank' | 'social' | 'log-inspection';

export type RiskLevel = 'HIGH' | 'MED' | 'LOW';
export type RecordStatus = 'FLAGGED' | 'CLEARED' | 'REVIEW' | 'Active' | 'Monitoring';

export interface CaseIntelligenceSummary {
  id: string;
  caseNumber: string;
  title: string;
  category: string;
  severity: RiskLevel;
  status: 'ACTIVE INVESTIGATION' | 'UNDER SURVEILLANCE' | 'CHARGESHEET READY' | 'INTERDICTED';
  registeredDate: string;
  policeStation: string;
  leadInvestigator: string;
  badgeNumber: string;
  summaryNarrative: string;
  evidentialReadinessScore: number; // 0 - 100%
  searchTokens: string[]; // keywords, numbers, IPs, IDs, handles
  metrics: {
    totalPhoneIntercepts: number;
    flaggedCalls: number;
    ipSessions: number;
    suspiciousIPs: number;
    totalFinancialVolume: string;
    frozenAmount: string;
    identifiedMuleAccounts: number;
    socialHandlesMonitored: number;
    crossDomainCorrelationConfidence: number; // percentage
  };
  domainBreakdown: {
    cdr: {
      keyFinding: string;
      primaryNumbers: string[];
      cellTowerHotspots: string[];
      callBurstWindows: string;
    };
    ipdr: {
      keyFinding: string;
      activeVPNs: string[];
      topOriginatingIPs: string[];
      geoLocations: string[];
    };
    bank: {
      keyFinding: string;
      primaryAccounts: string[];
      layeringVelocity: string;
      cryptoOffRampDetected: boolean;
    };
    social: {
      keyFinding: string;
      recruitmentChannels: string[];
      targetHandles: string[];
      compromisedCredentialsCount: number;
    };
  };
  keySuspects: {
    id: string;
    name: string;
    role: string;
    risk: RiskLevel;
    phone?: string;
    bankAcc?: string;
    ip?: string;
    social?: string;
  }[];
  timeline: {
    time: string;
    date: string;
    stage: string;
    description: string;
    risk: RiskLevel;
    domain: 'CDR' | 'IPDR' | 'BANK' | 'SOCIAL' | 'CROSS-DOMAIN';
  }[];
  tacticalRecommendations: {
    action: string;
    priority: 'IMMEDIATE' | 'HIGH' | 'ROUTINE';
    legalSection: string;
  }[];
}

export interface CDRRecord {
  id: string;
  time: string;
  caller: string;
  receiver: string;
  duration: string;
  risk: RiskLevel;
  status: RecordStatus;
  cellTower?: string;
  imei?: string;
  notes?: string;
}

export interface CallPattern {
  id: string;
  title: string;
  description: string;
  type: 'repeat' | 'frequency' | 'burst' | 'relationship';
  icon: string;
  badge?: string;
  isHighRisk?: boolean;
}

export interface IPDRRecord {
  id: string;
  time: string;
  ipAddress: string;
  entity: string;
  location: string;
  countryCode: string;
  risk: RiskLevel;
  status: string;
  port?: number;
  protocol?: string;
  bytesTransferred?: string;
}

export interface SuspiciousIPEvent {
  id: string;
  title: string;
  timeAgo: string;
  description: string;
  severity: 'error' | 'warning' | 'info';
  ip?: string;
  entity?: string;
}

export interface BankTransaction {
  id: string;
  date: string;
  transactionId: string;
  from: string;
  to: string;
  amount: string;
  amountNumeric: number;
  risk: RiskLevel;
  status: 'FLAGGED' | 'CLEARED' | 'REVIEW';
  bankName?: string;
  muleFlag?: boolean;
}

export interface AnomalyItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: 'cashout' | 'amount' | 'counterparties' | 'layering';
  risk: RiskLevel;
}

export interface SocialProfile {
  id: string;
  handle: string;
  platform: 'Telegram' | 'Instagram' | 'Twitter' | 'WhatsApp';
  platformIcon: string;
  linkedEntity: string;
  risk: RiskLevel;
  confidence: string;
  description: string;
  avatarUrl: string;
  followers?: string;
  postsCount?: number;
  lastActive?: string;
}

export interface ActivityTimelineItem {
  id: string;
  time: string;
  title: string;
  description: string;
  color: string;
  isPulsing?: boolean;
  category?: 'social' | 'cdr' | 'bank' | 'ipdr';
}

export interface CaseAlert {
  id: string;
  title: string;
  timeAgo: string;
  description: string;
  severity: 'error' | 'tertiary' | 'warning' | 'secondary';
  entity?: string;
}

export interface NetworkNode {
  id: string;
  label: string;
  type: 'person' | 'bank' | 'ip' | 'social';
  risk: RiskLevel;
  x: number;
  y: number;
}

export interface NetworkLink {
  source: string;
  target: string;
  type: 'cdr' | 'bank' | 'ip' | 'social';
  risk: RiskLevel;
  label?: string;
}

export interface InvestigationNote {
  id: string;
  author: string;
  date: string;
  content: string;
  tag: 'CRITICAL' | 'OBSERVATION' | 'EVIDENCE' | 'ACTION ITEM';
}
