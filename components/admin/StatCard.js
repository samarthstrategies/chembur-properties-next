'use client';

/**
 * StatCard — displays a single stat with icon, value, and label.
 * Props:
 *   title   — label text
 *   value   — number or string to display
 *   icon    — lucide-react icon component
 *   color   — hex color for the icon circle background accent
 *   loading — show skeleton while loading
 */
export default function StatCard({ title, value, icon: Icon, color = '#0F172A', loading = false }) {
  if (loading) {
    return (
      <div
        className="bg-white rounded-lg p-5 flex items-center gap-4"
        style={{ boxShadow: '0 1px 8px rgba(15,23,42,0.07)', border: '1px solid #E2E8F0' }}
      >
        <div className="w-12 h-12 rounded-full bg-slate-100 animate-pulse flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-7 w-16 bg-slate-100 rounded animate-pulse" />
          <div className="h-3.5 w-24 bg-slate-100 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-white rounded-lg p-5 flex items-center gap-4 transition-shadow hover:shadow-md"
      style={{ boxShadow: '0 1px 8px rgba(15,23,42,0.07)', border: '1px solid #E2E8F0' }}
    >
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: color + '1A' }}
      >
        {Icon && <Icon className="w-5 h-5" style={{ color }} />}
      </div>
      <div>
        <p className="text-2xl font-bold leading-none" style={{ color: '#0F172A' }}>
          {value ?? '—'}
        </p>
        <p className="text-xs mt-1.5 font-medium" style={{ color: '#64748B' }}>
          {title}
        </p>
      </div>
    </div>
  );
}
