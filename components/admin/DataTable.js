'use client';
import { useMemo } from 'react';

/**
 * DataTable — generic table with loading skeleton and empty state.
 * Props:
 *   columns  — [{ key, label, width?, render? }]
 *   data     — array of row objects
 *   loading  — boolean
 *   emptyMsg — string shown when data is empty
 *   rowKey   — string (key for row identity, default '_id')
 */
export default function DataTable({
  columns = [],
  data = [],
  loading = false,
  emptyMsg = 'No data found.',
  rowKey = '_id',
}) {
  const skeletonRows = useMemo(() => Array.from({ length: 6 }), []);

  return (
    <div className="w-full overflow-x-auto rounded-lg" style={{ border: '1px solid #E2E8F0' }}>
      <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
            {columns.map((col) => (
              <th
                key={col.key}
                className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide"
                style={{ color: '#64748B', width: col.width || 'auto', whiteSpace: 'nowrap' }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            skeletonRows.map((_, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #F1F5F9' }}>
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3">
                    <div
                      className="h-4 rounded animate-pulse"
                      style={{
                        backgroundColor: '#F1F5F9',
                        width: col.key === 'actions' ? '80px' : '100%',
                      }}
                    />
                  </td>
                ))}
              </tr>
            ))
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-16" style={{ color: '#94A3B8' }}>
                <div className="flex flex-col items-center gap-2">
                  <svg
                    className="w-10 h-10 opacity-30"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  <p className="text-sm">{emptyMsg}</p>
                </div>
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr
                key={row[rowKey] || idx}
                className="transition-colors hover:bg-slate-50"
                style={{ borderBottom: idx < data.length - 1 ? '1px solid #F1F5F9' : 'none' }}
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3" style={{ color: '#0F172A' }}>
                    {col.render
                      ? col.render(row[col.key], row)
                      : (row[col.key] ?? '—')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Pagination controls companion component.
 */
export function Pagination({ page, totalPages, total, limit, onPageChange }) {
  if (totalPages <= 1) return null;
  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  return (
    <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
      <p className="text-sm" style={{ color: '#64748B' }}>
        Showing <span className="font-medium">{start}</span> to{' '}
        <span className="font-medium">{end}</span> of{' '}
        <span className="font-medium">{total}</span>
      </p>
      <div className="flex gap-1.5">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="px-3 py-1.5 text-sm rounded-md border transition-colors disabled:opacity-40"
          style={{ borderColor: '#E2E8F0', color: '#0F172A' }}
        >
          ←
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
          .reduce((acc, p, idx, arr) => {
            if (idx > 0 && arr[idx - 1] !== p - 1) acc.push('…');
            acc.push(p);
            return acc;
          }, [])
          .map((p, idx) =>
            p === '…' ? (
              <span key={`ellipsis-${idx}`} className="px-2 py-1.5 text-sm" style={{ color: '#94A3B8' }}>
                …
              </span>
            ) : (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                className="w-9 h-9 text-sm rounded-md border transition-colors font-medium"
                style={{
                  borderColor: page === p ? '#0F172A' : '#E2E8F0',
                  backgroundColor: page === p ? '#0F172A' : '#fff',
                  color: page === p ? '#fff' : '#0F172A',
                }}
              >
                {p}
              </button>
            )
          )}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="px-3 py-1.5 text-sm rounded-md border transition-colors disabled:opacity-40"
          style={{ borderColor: '#E2E8F0', color: '#0F172A' }}
        >
          →
        </button>
      </div>
    </div>
  );
}
