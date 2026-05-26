'use client';
import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Plus, Pencil, Trash2, Mic2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { Pagination } from '@/components/admin/DataTable';
import ConfirmModal from '@/components/admin/ConfirmModal';
import { apiFetch, formatDate, getAccessTypeColor } from '@/lib/admin-utils';

const LIMIT = 10;

export default function PodcastsPage() {
  const [podcasts, setPodcasts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null, title: '' });

  const fetchPodcasts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiFetch(`/api/admin/podcasts?page=${page}&limit=${LIMIT}`);
      setPodcasts(data.data?.podcasts || []);
      setTotal(data.data?.total || 0);
    } catch {
      toast.error('Failed to load podcasts');
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => { fetchPodcasts(); }, [fetchPodcasts]);

  const handleDelete = async () => {
    try {
      await apiFetch(`/api/admin/podcasts/${deleteModal.id}`, { method: 'DELETE' });
      toast.success('Podcast deleted');
      setDeleteModal({ open: false, id: null, title: '' });
      fetchPodcasts();
    } catch (err) {
      toast.error(err.message || 'Failed to delete');
    }
  };

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-lg" style={{ color: '#0F172A' }}>All Podcasts</h2>
          <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>{total} total</p>
        </div>
        <Link href="/admin/podcasts/add">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold"
            style={{ backgroundColor: '#0F172A', color: '#fff' }}>
            <Plus className="w-4 h-4" /> Add Podcast
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-lg overflow-hidden" style={{ border: '1px solid #E2E8F0' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                {['Thumbnail', 'Title', 'Developer', 'Property', 'Access', 'Featured', 'Date', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: '#64748B' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      {Array.from({ length: 8 }).map((__, j) => (
                        <td key={j} className="px-4 py-3">
                          <div className="h-4 bg-slate-100 rounded animate-pulse" />
                        </td>
                      ))}
                    </tr>
                  ))
                : podcasts.length === 0
                ? (
                  <tr>
                    <td colSpan={8} className="text-center py-16" style={{ color: '#94A3B8' }}>
                      <Mic2 className="w-10 h-10 mx-auto mb-2 opacity-30" />
                      <p className="text-sm">No podcasts yet</p>
                    </td>
                  </tr>
                )
                : podcasts.map((p) => {
                  const colors = getAccessTypeColor(p.accessType);
                  const thumbUrl = p.thumbnailUrl || (p.videoUrl && p.videoUrl.includes('youtube')
                    ? `https://img.youtube.com/vi/${p.videoUrl.split('v=')[1]?.split('&')[0]}/maxresdefault.jpg`
                    : null);
                  return (
                    <tr key={p._id} className="hover:bg-slate-50 transition-colors" style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td className="px-4 py-3">
                        {thumbUrl
                          ? <img src={thumbUrl} alt={p.title} className="w-20 h-14 object-cover rounded" />
                          : <div className="w-20 h-14 bg-slate-100 rounded flex items-center justify-center">
                              <Mic2 className="w-5 h-5" style={{ color: '#94A3B8' }} /></div>}
                      </td>
                      <td className="px-4 py-3 max-w-[200px]">
                        <p className="font-semibold text-xs line-clamp-2" style={{ color: '#0F172A' }}>{p.title}</p>
                        {p.slug && <p className="text-[10px] mt-0.5" style={{ color: '#94A3B8' }}>{p.slug}</p>}
                      </td>
                      <td className="px-4 py-3 text-xs" style={{ color: '#64748B' }}>{p.developerName || '—'}</td>
                      <td className="px-4 py-3 text-xs max-w-[140px]">
                        <span className="line-clamp-1" style={{ color: '#64748B' }}>
                          {p.linkedPropertyId?.title || '—'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-[10px] font-semibold px-2 py-1 rounded-full border capitalize"
                          style={{ backgroundColor: colors.bg, color: colors.text, borderColor: colors.border }}>
                          {p.accessType === 'lead_unlock' ? 'Lead Unlock' : p.accessType}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {p.isFeatured
                          ? <span className="text-xs font-semibold" style={{ color: '#D4A017' }}>Yes</span>
                          : <span style={{ color: '#E2E8F0' }}>—</span>}
                      </td>
                      <td className="px-4 py-3 text-xs whitespace-nowrap" style={{ color: '#94A3B8' }}>
                        {formatDate(p.createdAt)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <Link href={`/admin/podcasts/edit/${p._id}`}>
                            <button className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-md"
                              style={{ backgroundColor: '#F1F5F9', color: '#64748B' }}>
                              <Pencil className="w-3 h-3" /> Edit
                            </button>
                          </Link>
                          <button onClick={() => setDeleteModal({ open: true, id: p._id, title: p.title })}
                            className="px-2.5 py-1.5 text-xs font-medium rounded-md"
                            style={{ backgroundColor: '#FEF2F2', color: '#EF4444' }}>
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination page={page} totalPages={totalPages} total={total} limit={LIMIT} onPageChange={setPage} />
      <ConfirmModal isOpen={deleteModal.open} title="Delete Podcast"
        message={`Delete "${deleteModal.title}"?`}
        onConfirm={handleDelete} onCancel={() => setDeleteModal({ open: false, id: null, title: '' })} />
    </div>
  );
}
