'use client';
import { useEffect, useState, useCallback } from 'react';
import { Unlock } from 'lucide-react';
import toast from 'react-hot-toast';
import StatCard from '@/components/admin/StatCard';
import { Pagination } from '@/components/admin/DataTable';
import { apiFetch, formatDate, formatPrice } from '@/lib/admin-utils';

const LIMIT = 10;

export default function VideoUnlocksPage() {
  const [unlocks, setUnlocks] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [typeFilter, setTypeFilter] = useState('');

  const fetchUnlocks = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: LIMIT });
      if (typeFilter) params.set('unlockType', typeFilter);
      const data = await apiFetch(`/api/admin/video-unlocks?${params}`);
      setUnlocks(data.data?.unlocks || data.data || []);
      setTotal(data.data?.total || 0);
    } catch { toast.error('Failed to load unlocks'); }
    finally { setLoading(false); }
  }, [page, typeFilter]);

  useEffect(() => { fetchUnlocks(); }, [fetchUnlocks]);
  useEffect(() => {
    apiFetch('/api/admin/video-unlocks/stats').catch(() => null).then((r) => setStats(r?.data || r?.stats || null));
  }, []);

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-bold text-lg" style={{ color: '#0F172A' }}>Video Unlocks</h2>
        <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>Track all podcast video unlock events</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Total Unlocks', key: 'totalUnlocks', color: '#0F172A' },
          { title: 'Paid Unlocks', key: 'paidUnlocks', color: '#D4A017' },
          { title: 'Lead Unlocks', key: 'leadUnlocks', color: '#3B82F6' },
          { title: 'Total Revenue', key: 'totalRevenue', color: '#22C55E', format: true },
        ].map((s) => (
          <StatCard key={s.key} loading={!stats} title={s.title} icon={Unlock} color={s.color}
            value={s.format ? formatPrice(stats?.[s.key]) : (stats?.[s.key] ?? '—')} />
        ))}
      </div>

      {/* Filter */}
      <div className="bg-white rounded-lg p-4 flex gap-3" style={{ border: '1px solid #E2E8F0' }}>
        <select value={typeFilter} onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
          className="px-3 py-2 text-sm rounded-md border outline-none"
          style={{ borderColor: '#E2E8F0', color: '#0F172A', backgroundColor: '#fff' }}>
          <option value="">All Types</option>
          <option value="paid">Paid</option>
          <option value="lead_unlock">Lead Unlock</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg overflow-hidden" style={{ border: '1px solid #E2E8F0' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                {['Name', 'Phone', 'Property', 'Podcast', 'Type', 'Amount', 'Razorpay Order', 'Date'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: '#64748B' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      {Array.from({ length: 8 }).map((__, j) => (
                        <td key={j} className="px-4 py-3"><div className="h-4 bg-slate-100 rounded animate-pulse" /></td>
                      ))}
                    </tr>
                  ))
                : unlocks.length === 0
                ? <tr><td colSpan={8} className="text-center py-16 text-sm" style={{ color: '#94A3B8' }}>No unlock records found</td></tr>
                : unlocks.map((u) => (
                  <tr key={u._id} className="hover:bg-slate-50 transition-colors" style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td className="px-4 py-3 font-semibold text-xs" style={{ color: '#0F172A' }}>{u.name || '—'}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: '#64748B' }}>{u.phone || '—'}</td>
                    <td className="px-4 py-3 text-xs max-w-[130px]">
                      <span className="line-clamp-1" style={{ color: '#64748B' }}>{u.propertyId?.title || '—'}</span>
                    </td>
                    <td className="px-4 py-3 text-xs max-w-[130px]">
                      <span className="line-clamp-1" style={{ color: '#64748B' }}>{u.podcastId?.title || '—'}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-[10px] font-semibold px-2 py-1 rounded-full border"
                        style={u.unlockType === 'paid'
                          ? { backgroundColor: '#FFFBEB', color: '#92400E', borderColor: '#FDE68A' }
                          : { backgroundColor: '#EFF6FF', color: '#1D4ED8', borderColor: '#BFDBFE' }}>
                        {u.unlockType === 'lead_unlock' ? 'Lead Unlock' : 'Paid'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs font-medium" style={{ color: '#0F172A' }}>
                      {u.amountPaid ? formatPrice(u.amountPaid) : '—'}
                    </td>
                    <td className="px-4 py-3 text-xs font-mono" style={{ color: '#94A3B8' }}>
                      {u.razorpayOrderId ? u.razorpayOrderId.slice(0, 14) + '…' : '—'}
                    </td>
                    <td className="px-4 py-3 text-xs whitespace-nowrap" style={{ color: '#94A3B8' }}>
                      {formatDate(u.createdAt)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination page={page} totalPages={totalPages} total={total} limit={LIMIT} onPageChange={setPage} />
    </div>
  );
}
