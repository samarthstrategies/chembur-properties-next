'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  Home,
  Briefcase,
  Star,
  Trophy,
  Gem,
  Users,
  Unlock,
  Pencil,
} from 'lucide-react';
import StatCard from '@/components/admin/StatCard';
import { apiFetch, formatDate, getLeadStatusColor } from '@/lib/admin-utils';

export default function DashboardPage() {
  const [propStats, setPropStats] = useState(null);
  const [leadStats, setLeadStats] = useState(null);
  const [unlockStats, setUnlockStats] = useState(null);
  const [recentProps, setRecentProps] = useState([]);
  const [recentLeads, setRecentLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      apiFetch('/api/admin/properties/stats').catch(() => null),
      apiFetch('/api/admin/leads/stats').catch(() => null),
      apiFetch('/api/admin/video-unlocks/stats').catch(() => null),
      apiFetch('/api/admin/properties?limit=5&page=1').catch(() => null),
      apiFetch('/api/admin/leads?limit=5&page=1').catch(() => null),
    ]).then(([ps, ls, us, rp, rl]) => {
      setPropStats(ps?.data || ps?.stats || null);
      setLeadStats(ls?.data || ls?.stats || null);
      setUnlockStats(us?.data || us?.stats || null);
      setRecentProps(rp?.data?.properties || []);
      setRecentLeads(rl?.data?.leads || []);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      {/* Row 1 — Property stats */}
      <div>
        <h2 className="font-semibold text-sm mb-3" style={{ color: '#64748B' }}>
          PROPERTIES
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            loading={loading}
            title="Total Properties"
            value={propStats?.total ?? '—'}
            icon={Building2}
            color="#0F172A"
          />
          <StatCard
            loading={loading}
            title="Residential"
            value={propStats?.residential ?? '—'}
            icon={Home}
            color="#3B82F6"
          />
          <StatCard
            loading={loading}
            title="Commercial"
            value={propStats?.commercial ?? '—'}
            icon={Briefcase}
            color="#F97316"
          />
          <StatCard
            loading={loading}
            title="Featured"
            value={propStats?.featured ?? '—'}
            icon={Star}
            color="#8B5CF6"
          />
        </div>
      </div>

      {/* Row 2 — Badges + CRM */}
      <div>
        <h2 className="font-semibold text-sm mb-3" style={{ color: '#64748B' }}>
          BADGES & CRM
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            loading={loading}
            title="Win Gold Properties"
            value={propStats?.winGold ?? '—'}
            icon={Trophy}
            color="#D4A017"
          />
          <StatCard
            loading={loading}
            title="Premium Properties"
            value={propStats?.premium ?? '—'}
            icon={Gem}
            color="#7C3AED"
          />
          <StatCard
            loading={loading}
            title="Total Leads"
            value={leadStats?.total ?? '—'}
            icon={Users}
            color="#22C55E"
          />
          <StatCard
            loading={loading}
            title="Total Unlocks"
            value={unlockStats?.totalUnlocks ?? '—'}
            icon={Unlock}
            color="#06B6D4"
          />
        </div>
      </div>

      {/* Bottom two tables */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Properties */}
        <div
          className="bg-white rounded-lg overflow-hidden"
          style={{ border: '1px solid #E2E8F0', boxShadow: '0 1px 8px rgba(15,23,42,0.05)' }}
        >
          <div
            className="flex items-center justify-between px-5 py-4"
            style={{ borderBottom: '1px solid #F1F5F9' }}
          >
            <h3 className="font-semibold text-sm" style={{ color: '#0F172A' }}>
              Recent Properties
            </h3>
            <Link
              href="/admin/properties"
              className="text-xs font-semibold hover:opacity-70 transition-opacity"
              style={{ color: '#D4A017' }}
            >
              View All →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC' }}>
                  {['Image', 'Title', 'Category', 'Win Gold', 'Premium', 'Date', ''].map((h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wide"
                      style={{ color: '#94A3B8' }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading
                  ? Array.from({ length: 5 }).map((_, i) => (
                      <tr key={i} style={{ borderTop: '1px solid #F1F5F9' }}>
                        {Array.from({ length: 7 }).map((__, j) => (
                          <td key={j} className="px-4 py-3">
                            <div className="h-4 bg-slate-100 rounded animate-pulse" />
                          </td>
                        ))}
                      </tr>
                    ))
                  : recentProps.length === 0
                  ? (
                    <tr>
                      <td colSpan={7} className="text-center py-10 text-sm" style={{ color: '#94A3B8' }}>
                        No properties yet
                      </td>
                    </tr>
                  )
                  : recentProps.map((p) => (
                    <tr
                      key={p._id}
                      className="hover:bg-slate-50 transition-colors"
                      style={{ borderTop: '1px solid #F1F5F9' }}
                    >
                      <td className="px-4 py-3">
                        {p.media?.featuredImage ? (
                          <img
                            src={p.media.featuredImage}
                            alt={p.title}
                            className="w-12 h-10 object-cover rounded"
                          />
                        ) : (
                          <div
                            className="w-12 h-10 rounded flex items-center justify-center"
                            style={{ backgroundColor: '#F1F5F9' }}
                          >
                            <Building2 className="w-4 h-4" style={{ color: '#94A3B8' }} />
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 font-medium max-w-[160px]">
                        <span className="line-clamp-1 text-xs" style={{ color: '#0F172A' }}>
                          {p.title}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <CategoryBadge category={p.category} />
                      </td>
                      <td className="px-4 py-3 text-center">
                        {p.badges?.isWinGold ? (
                          <Trophy className="w-4 h-4 mx-auto" style={{ color: '#D4A017' }} />
                        ) : (
                          <span style={{ color: '#CBD5E1' }}>—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {p.badges?.isPremium ? (
                          <Gem className="w-4 h-4 mx-auto" style={{ color: '#7C3AED' }} />
                        ) : (
                          <span style={{ color: '#CBD5E1' }}>—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-xs whitespace-nowrap" style={{ color: '#94A3B8' }}>
                        {formatDate(p.createdAt)}
                      </td>
                      <td className="px-4 py-3">
                        <Link href={`/admin/properties/edit/${p._id}`}>
                          <button
                            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors"
                            style={{ backgroundColor: '#F1F5F9', color: '#64748B' }}
                          >
                            <Pencil className="w-3 h-3" /> Edit
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Leads */}
        <div
          className="bg-white rounded-lg overflow-hidden"
          style={{ border: '1px solid #E2E8F0', boxShadow: '0 1px 8px rgba(15,23,42,0.05)' }}
        >
          <div
            className="flex items-center justify-between px-5 py-4"
            style={{ borderBottom: '1px solid #F1F5F9' }}
          >
            <h3 className="font-semibold text-sm" style={{ color: '#0F172A' }}>
              Recent Leads
            </h3>
            <Link
              href="/admin/leads"
              className="text-xs font-semibold hover:opacity-70 transition-opacity"
              style={{ color: '#D4A017' }}
            >
              View All →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC' }}>
                  {['Name', 'Phone', 'Property', 'Date', 'Status'].map((h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wide"
                      style={{ color: '#94A3B8' }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading
                  ? Array.from({ length: 5 }).map((_, i) => (
                      <tr key={i} style={{ borderTop: '1px solid #F1F5F9' }}>
                        {Array.from({ length: 5 }).map((__, j) => (
                          <td key={j} className="px-4 py-3">
                            <div className="h-4 bg-slate-100 rounded animate-pulse" />
                          </td>
                        ))}
                      </tr>
                    ))
                  : recentLeads.length === 0
                  ? (
                    <tr>
                      <td colSpan={5} className="text-center py-10 text-sm" style={{ color: '#94A3B8' }}>
                        No leads yet
                      </td>
                    </tr>
                  )
                  : recentLeads.map((lead) => {
                    const colors = getLeadStatusColor(lead.status);
                    return (
                      <tr
                        key={lead._id}
                        className="hover:bg-slate-50 transition-colors"
                        style={{ borderTop: '1px solid #F1F5F9' }}
                      >
                        <td className="px-4 py-3 font-medium text-xs" style={{ color: '#0F172A' }}>
                          {lead.name}
                        </td>
                        <td className="px-4 py-3 text-xs" style={{ color: '#64748B' }}>
                          {lead.phone}
                        </td>
                        <td className="px-4 py-3 text-xs max-w-[120px]">
                          <span className="line-clamp-1" style={{ color: '#64748B' }}>
                            {lead.propertyId?.title || '—'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs whitespace-nowrap" style={{ color: '#94A3B8' }}>
                          {formatDate(lead.createdAt)}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className="text-xs font-semibold px-2 py-1 rounded-full border whitespace-nowrap"
                            style={{
                              backgroundColor: colors.bg,
                              color: colors.text,
                              borderColor: colors.border,
                            }}
                          >
                            {lead.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryBadge({ category }) {
  const isResidential = category === 'Residential';
  return (
    <span
      className="text-xs font-semibold px-2 py-0.5 rounded-full"
      style={{
        backgroundColor: isResidential ? '#EFF6FF' : '#FFF7ED',
        color: isResidential ? '#1D4ED8' : '#C2410C',
      }}
    >
      {category || '—'}
    </span>
  );
}
