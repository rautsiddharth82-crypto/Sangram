/**
 * SANGRAM Frontend API Client Service
 * Connects frontend screens to Express backend (http://localhost:5000 / /api)
 */

const API_BASE = (import.meta as any).env?.VITE_API_BASE || '/api';

async function fetchJSON<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });
  if (!res.ok) throw new Error(`API Error ${res.status}: ${res.statusText}`);
  return res.json();
}

export const api = {
  // System Health
  health: () => fetchJSON<{ status: string; system: string; version: string; aiProvider: string; aiActive: boolean }>('/health'),

  // Cases
  getCases: () => fetchJSON<any[]>('/cases'),
  getCaseById: (id: string) => fetchJSON<any>(`/cases/${id}`),
  createCase: (data: any) => fetchJSON<any>('/cases', { method: 'POST', body: JSON.stringify(data) }),

  // CDR & Telecom
  getCDR: (params?: { risk?: string; q?: string }) => {
    const query = new URLSearchParams(params as any).toString();
    return fetchJSON<{ records: any[]; patterns: any[] }>(`/cdr${query ? `?${query}` : ''}`);
  },
  analyzeCDR: (data: any) => fetchJSON<any>('/cdr/analyze', { method: 'POST', body: JSON.stringify(data) }),

  // IPDR & Internet Sessions
  getIPDR: () => fetchJSON<{ records: any[]; suspiciousEvents: any[] }>('/ipdr'),

  // Bank & UPI Transactions
  getBankData: () => fetchJSON<{ transactions: any[]; anomalies: any[] }>('/bank'),
  analyzeBank: (data: any) => fetchJSON<any>('/bank/analyze', { method: 'POST', body: JSON.stringify(data) }),

  // Social Media & OSINT
  getSocialData: () => fetchJSON<{ profiles: any[]; activityTimeline: any[] }>('/social'),

  // Risk Scoring Engine
  calculateRisk: (data: { telecom?: number; bank?: number; social?: number; crossBoost?: number }) =>
    fetchJSON<{ unifiedRiskScore: number; riskLevel: string; breakdown: any }>('/risk/score', { method: 'POST', body: JSON.stringify(data) }),

  // Network Topology
  getNetwork: () => fetchJSON<{ nodes: any[]; links: any[] }>('/network'),

  // Global Search
  search: (query: string, type = 'all') => fetchJSON<{ results: any[]; total: number }>(`/search?q=${encodeURIComponent(query)}&type=${type}`),

  // Evidence & Chain of Custody
  getEvidence: () => fetchJSON<any[]>('/evidence'),

  // Audit Logs
  getAuditLogs: () => fetchJSON<any[]>('/audit'),

  // Predictions & Criminal Next Move
  getPredictions: () => fetchJSON<any[]>('/predictions'),
  predictNextMove: (data: { entityId?: string; caseId?: string }) =>
    fetchJSON<any>('/ai/next-move', { method: 'POST', body: JSON.stringify(data) }),

  // Section 63 BSA Dossier Generator
  generateDossier: (data: { caseId?: string; officerName?: string }) =>
    fetchJSON<any>('/ai/generate-dossier', { method: 'POST', body: JSON.stringify(data) }),
};
