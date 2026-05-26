'use client';
import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import {
  Plus, Search, X, Pencil, Trash2, Trophy, Gem, Star, Building2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Pagination } from '@/components/admin/DataTable';
import ConfirmModal from '@/components/admin/ConfirmModal';
import { apiFetch, formatDate, formatPrice } from '@/lib/admin-utils';

const LIMIT = 10;

export default function PropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null, title: '' });
  const [bulkDeleting, setBulkDeleting] = useState(false);

  // Filters
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [winGold, setWinGold] = useState('');
  const [premium, setPremium] = useState('');

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: LIMIT });
      if (search) params.set('search', search);
      if (category) params.set('category', category);
      if (statusFilter) params.set('type', statusFilter);
      if (winGold) params.set('isWinGold', winGold);
      if (premium) params.set('isPremium', premium);
      const data = await apiFetch(`/api/admin/properties?${params}`);
      setProperties(data.data?.properties || []);
      setTotal(data.data?.total || 0);
    } catch {
      toast.error('Failed to load properties');
    } finally {
      setLoading(false);
    }
  }, [page, search, category, statusFilter, winGold, premium]);

  useEffect(() => { fetchProperties(); }, [fetchProperties]);

  const clearFilters = () => {
    setSearch(''); setCategory(''); setStatusFilter('');
    setWinGold(''); setPremium(''); setPage(1);
  };

  const toggleSelect = (id) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]);
  };
  const toggleAll = () => {
    setSelected((prev) => prev.length === properties.length ? [] : properties.map((p) => p._id));
  };

  const openDelete = (id, title) => setDeleteModal({ open: true, id, title });
  const closeDelete = () => setDeleteModal({ open: false, id: null, title: '' });

  const handleDelete = async () => {
    try {
      await apiFetch(`/api/admin/properties/${deleteModal.id}`, { method: 'DELETE' });
      toast.success('Property deleted');
      closeDelete();
      fetchProperties();
      setSelected((prev) => prev.filter((id) => id !== deleteModal.id));
    } catch (err) {
      toast.error(err.message || 'Failed to delete');
    }
  };

  const handleBulkDelete = async () => {
    setBulkDeleting(true);
    try {
      await Promise.all(selected.map((id) => apiFetch(`/api/admin/properties/${id}`, { method: 'DELETE' })));
      toast.success(`${selected.length} properties deleted`);
      setSelected([]);
      fetchProperties();
    } catch {
      toast.error('Some deletions failed');
    } finally {
      setBulkDeleting(false);
    }
  };

  const totalPages = Math.ceil(total / LIMIT);
  const hasFilters = search || category || statusFilter || winGold || premium;

  return (
    <div className="space-y-5">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-lg" style={{ color: '#0F172A' }}>All Properties</h2>
          <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>{total} properties total</p>
        </div>
        <Link href="/admin/properties/add">
          <button
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors"
            style={{ backgroundColor: '#0F172A', color: '#fff' }}
          >
            <Plus className="w-4 h-4" /> Add Property
          </button>
        </Link>
      </div>

      {/* Filters */}
      <div
        className="bg-white rounded-lg p-4 flex flex-wrap gap-3 items-end"
        style={{ border: '1px solid #E2E8F0' }}
      >
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#94A3B8' }} />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search title or ID…"
            className="w-full pl-9 pr-3 py-2 text-sm rounded-md border outline-none"
            style={{ borderColor: '#E2E8F0', color: '#0F172A' }}
          />
        </div>
        <FilterSelect value={category} onChange={(v) => { setCategory(v); setPage(1); }}
          options={[['', 'All Categories'], ['Residential', 'Residential'], ['Commercial', 'Commercial']]} />
        <FilterSelect value={winGold} onChange={(v) => { setWinGold(v); setPage(1); }}
          options={[['', '🥇 All'], ['true', '🥇 Win Gold'], ['false', 'No Win Gold']]} />
        <FilterSelect value={premium} onChange={(v) => { setPremium(v); setPage(1); }}
          options={[['', '💎 All'], ['true', '💎 Premium'], ['false', 'Not Premium']]} />
        {hasFilters && (
          <button onClick={clearFilters} className="flex items-center gap-1.5 text-sm px-3 py-2 rounded-md border" style={{ color: '#EF4444', borderColor: '#FECACA' }}>
            <X className="w-3.5 h-3.5" /> Clear
          </button>
        )}
      </div>

      {/* Bulk actions */}
      {selected.length > 0 && (
        <div
          className="flex items-center gap-4 px-4 py-3 rounded-lg"
          style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA' }}
        >
          <span className="text-sm font-semibold" style={{ color: '#B91C1C' }}>
            {selected.length} selected
          </span>
          <button
            onClick={handleBulkDelete}
            disabled={bulkDeleting}
            className="flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-md transition-colors disabled:opacity-60"
            style={{ backgroundColor: '#EF4444', color: '#fff' }}
          >
            <Trash2 className="w-3.5 h-3.5" />
            {bulkDeleting ? 'Deleting…' : 'Delete Selected'}
          </button>
          <button onClick={() => setSelected([])} className="text-sm" style={{ color: '#94A3B8' }}>
            Cancel
          </button>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg overflow-hidden" style={{ border: '1px solid #E2E8F0' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                <th className="px-4 py-3 w-10">
                  <input type="checkbox" checked={selected.length === properties.length && properties.length > 0}
                    onChange={toggleAll} className="rounded" />
                </th>
                {['', 'Title', 'Category', 'Type', 'Status', 'Location', 'Price', '🥇', '💎', '⭐', 'Date', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-3 py-3 text-xs font-semibold uppercase tracking-wide whitespace-nowrap" style={{ color: '#64748B' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 8 }).map((_, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      {Array.from({ length: 13 }).map((__, j) => (
                        <td key={j} className="px-3 py-3">
                          <div className="h-4 bg-slate-100 rounded animate-pulse" />
                        </td>
                      ))}
                    </tr>
                  ))
                : properties.length === 0
                ? (
                  <tr>
                    <td colSpan={13} className="text-center py-16" style={{ color: '#94A3B8' }}>
                      <Building2 className="w-10 h-10 mx-auto mb-2 opacity-30" />
                      <p className="text-sm">No properties found</p>
                    </td>
                  </tr>
                )
                : properties.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-50 transition-colors" style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td className="px-4 py-3">
                      <input type="checkbox" checked={selected.includes(p._id)} onChange={() => toggleSelect(p._id)} className="rounded" />
                    </td>
                    <td className="px-3 py-3">
                      {p.media?.featuredImage
                        ? <img src={p.media.featuredImage} alt="" className="w-12 h-10 object-cover rounded" />
                        : <div className="w-12 h-10 bg-slate-100 rounded flex items-center justify-center"><Building2 className="w-4 h-4" style={{ color: '#94A3B8' }} /></div>}
                    </td>
                    <td className="px-3 py-3 max-w-[160px]">
                      <Link href={`/admin/properties/edit/${p._id}`}>
                        <span className="font-semibold text-xs hover:underline line-clamp-2" style={{ color: '#0F172A' }}>{p.title}</span>
                      </Link>
                      <p className="text-[10px] mt-0.5" style={{ color: '#94A3B8' }}>{p.propertyId}</p>
                    </td>
                    <td className="px-3 py-3"><CategoryBadge category={p.category} /></td>
                    <td className="px-3 py-3 text-xs" style={{ color: '#64748B' }}>
                      {p.propertyType?.slice(0, 2).join(', ') || '—'}
                    </td>
                    <td className="px-3 py-3">
                      {p.propertyStatus?.slice(0, 1).map((s) => (
                        <span key={s} className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: s.includes('Sale') ? '#F0FDF4' : '#EFF6FF', color: s.includes('Sale') ? '#15803D' : '#1D4ED8' }}>
                          {s}
                        </span>
                      ))}
                    </td>
                    <td className="px-3 py-3 text-xs" style={{ color: '#64748B' }}>
                      {p.location?.[0] || '—'}
                    </td>
                    <td className="px-3 py-3 text-xs font-medium whitespace-nowrap" style={{ color: '#0F172A' }}>
                      {formatPrice(p.pricing?.salePrice)}
                    </td>
                    <td className="px-3 py-3 text-center">
                      {p.badges?.isWinGold ? <Trophy className="w-4 h-4 mx-auto" style={{ color: '#D4A017' }} /> : <span style={{ color: '#E2E8F0' }}>—</span>}
                    </td>
                    <td className="px-3 py-3 text-center">
                      {p.badges?.isPremium ? <Gem className="w-4 h-4 mx-auto" style={{ color: '#7C3AED' }} /> : <span style={{ color: '#E2E8F0' }}>—</span>}
                    </td>
                    <td className="px-3 py-3 text-center">
                      {p.isFeatured ? <Star className="w-4 h-4 mx-auto" style={{ color: '#F59E0B' }} /> : <span style={{ color: '#E2E8F0' }}>—</span>}
                    </td>
                    <td className="px-3 py-3 text-xs whitespace-nowrap" style={{ color: '#94A3B8' }}>
                      {formatDate(p.createdAt)}
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1.5">
                        <Link href={`/admin/properties/edit/${p._id}`}>
                          <button className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors"
                            style={{ backgroundColor: '#F1F5F9', color: '#64748B' }}>
                            <Pencil className="w-3 h-3" /> Edit
                          </button>
                        </Link>
                        <button onClick={() => openDelete(p._id, p.title)}
                          className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors"
                          style={{ backgroundColor: '#FEF2F2', color: '#EF4444' }}>
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination page={page} totalPages={totalPages} total={total} limit={LIMIT} onPageChange={setPage} />

      <ConfirmModal
        isOpen={deleteModal.open}
        title="Delete Property"
        message={`Are you sure you want to delete "${deleteModal.title}"? This will also remove all associated Cloudinary images.`}
        onConfirm={handleDelete}
        onCancel={closeDelete}
        confirmLabel="Delete Property"
      />
    </div>
  );
}

function FilterSelect({ value, onChange, options }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}
      className="px-3 py-2 text-sm rounded-md border outline-none"
      style={{ borderColor: '#E2E8F0', color: '#0F172A', backgroundColor: '#fff' }}>
      {options.map(([val, label]) => <option key={val} value={val}>{label}</option>)}
    </select>
  );
}

function CategoryBadge({ category }) {
  const isR = category === 'Residential';
  return (
    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
      style={{ backgroundColor: isR ? '#EFF6FF' : '#FFF7ED', color: isR ? '#1D4ED8' : '#C2410C' }}>
      {category || '—'}
    </span>
  );
}
