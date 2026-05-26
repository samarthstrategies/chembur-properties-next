'use client';
import { useEffect, useState, useCallback } from 'react';
import { Download, Search, Users } from 'lucide-react';
import toast from 'react-hot-toast';
import StatCard from '@/components/admin/StatCard';
import { Pagination } from '@/components/admin/DataTable';
import LeadDrawer from '@/components/admin/LeadDrawer';
import { apiFetch, formatDate, getLeadStatusColor } from '@/lib/admin-utils';

const LIMIT = 10;
const STATUS_OPTIONS = ['', 'New', 'Contacted', 'Converted', 'Not Interested'];

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedLead, setSelectedLead] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [exporting, setExporting] = useState(false);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: LIMIT });
      if (search) params.set('search', search);
      if (statusFilter) params.set('status', statusFilter);
      const data = await apiFetch(`/api/admin/leads?${params}`);
      setLeads(data.data?.leads || []);
      setTotal(data.data?.total || 0);
    } catch { toast.error('Failed to load leads'); }
    finally { setLoading(false); }
  }, [page, search, statusFilter]);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  useEffect(() => {
    apiFetch('/api/admin/leads/stats').catch(() => null).then((r) => setStats(r?.data || r?.stats || null));
  }, []);

  const handleExport = async () => {
    setExporting(true);
    try {
      const res = await fetch('/api/admin/leads/export', { credentials: 'include' });
      if (!res.ok) { toast.error('Export failed'); return; }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('CSV downloaded!');
    } catch { toast.error('Export failed'); }
    finally { setExporting(false); }
  };

  const handleStatusChange = (id, newStatus) => {
    setLeads((prev) => prev.map((l) => l._id === id ? { ...l, status: newStatus } : l));
  };

  const openDrawer = (lead) => { setSelectedLead(lead); setDrawerOpen(true); };

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-lg" style={{ color: '#0F172A' }}>Leads</h2>
          <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>{total} total leads</p>
        </div>
        <button onClick={handleExport} disabled={exporting}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border transition-colors disabled:opacity-60"
          style={{ borderColor: '#E2E8F0', color: '#0F172A', backgroundColor: '#fff' }}>
          <Download className="w-4 h-4" />
          {exporting ? 'Exporting…' : 'Export CSV'}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Total Leads', key: 'total', color: '#0F172A' },
          { title: 'New', key: 'new', color: '#3B82F6' },
          { title: 'Contacted', key: 'contacted', color: '#F59E0B' },
          { title: 'Converted', key: 'converted', color: '#22C55E' },
        ].map((s) => (
          <StatCard key={s.key} loading={!stats} title={s.title} value={stats?.[s.key] ?? '—'}
            icon={Users} color={s.color} />
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-4 flex flex-wrap gap-3" style={{ border: '1px solid #E2E8F0' }}>
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#94A3B8' }} />
          <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search name or phone…"
            className="w-full pl-9 pr-3 py-2 text-sm rounded-md border outline-none"
            style={{ borderColor: '#E2E8F0', color: '#0F172A' }} />
        </div>
        <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="px-3 py-2 text-sm rounded-md border outline-none"
          style={{ borderColor: '#E2E8F0', color: '#0F172A', backgroundColor: '#fff' }}>
          {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s || 'All Statuses'}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg overflow-hidden" style={{ border: '1px solid #E2E8F0' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                {['Name', 'Phone', 'Email', 'Property', 'Unlock Type', 'Date', 'Status', 'Action'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: '#64748B' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 8 }).map((_, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      {Array.from({ length: 8 }).map((__, j) => (
                        <td key={j} className="px-4 py-3"><div className="h-4 bg-slate-100 rounded animate-pulse" /></td>
                      ))}
                    </tr>
                  ))
                : leads.length === 0
                ? (
                  <tr><td colSpan={8} className="text-center py-16 text-sm" style={{ color: '#94A3B8' }}>No leads found</td></tr>
                )
                : leads.map((lead) => {
                  const colors = getLeadStatusColor(lead.status);
                  return (
                    <tr key={lead._id} className="hover:bg-slate-50 transition-colors" style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td className="px-4 py-3 font-semibold text-xs" style={{ color: '#0F172A' }}>{lead.name}</td>
                      <td className="px-4 py-3 text-xs" style={{ color: '#64748B' }}>{lead.phone}</td>
                      <td className="px-4 py-3 text-xs" style={{ color: '#64748B' }}>{lead.email || '—'}</td>
                      <td className="px-4 py-3 text-xs max-w-[140px]">
                        <span className="line-clamp-1" style={{ color: '#64748B' }}>{lead.propertyId?.title || '—'}</span>
                      </td>
                      <td className="px-4 py-3">
                        {lead.unlockType
                          ? <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                              style={{ backgroundColor: lead.unlockType === 'paid' ? '#FFFBEB' : '#EFF6FF',
                                color: lead.unlockType === 'paid' ? '#92400E' : '#1D4ED8' }}>
                              {lead.unlockType === 'lead_unlock' ? 'Lead Unlock' : 'Paid'}
                            </span>
                          : <span style={{ color: '#CBD5E1' }}>—</span>}
                      </td>
                      <td className="px-4 py-3 text-xs whitespace-nowrap" style={{ color: '#94A3B8' }}>
                        {formatDate(lead.createdAt)}
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-[10px] font-semibold px-2 py-1 rounded-full border"
                          style={{ backgroundColor: colors.bg, color: colors.text, borderColor: colors.border }}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => openDrawer(lead)}
                          className="text-xs font-medium px-3 py-1.5 rounded-md transition-colors"
                          style={{ backgroundColor: '#F1F5F9', color: '#64748B' }}>
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination page={page} totalPages={totalPages} total={total} limit={LIMIT} onPageChange={setPage} />

      <LeadDrawer lead={selectedLead} isOpen={drawerOpen} onClose={() => setDrawerOpen(false)}
        onStatusChange={handleStatusChange} />
    </div>
  );
}
