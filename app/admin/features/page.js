'use client';
import { useEffect, useState } from 'react';
import { Plus, Pencil, Check, X, Trash2, Tag } from 'lucide-react';
import toast from 'react-hot-toast';
import ConfirmModal from '@/components/admin/ConfirmModal';
import { apiFetch } from '@/lib/admin-utils';

export default function FeaturesPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState('');
  const [adding, setAdding] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [updating, setUpdating] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null, name: '' });

  useEffect(() => {
    apiFetch('/api/admin/features').then((r) => setItems(r.data || [])).catch(() => toast.error('Failed to load'))
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = async () => {
    if (!newName.trim()) return;
    setAdding(true);
    try {
      const res = await apiFetch('/api/admin/features', { method: 'POST', body: JSON.stringify({ name: newName.trim() }) });
      setItems((prev) => [...prev, res.data || { name: newName.trim(), _id: Date.now() }]);
      setNewName(''); toast.success('Feature added');
    } catch (err) { toast.error(err.message || 'Failed to add'); }
    finally { setAdding(false); }
  };

  const handleUpdate = async (id) => {
    if (!editName.trim()) return;
    setUpdating(true);
    try {
      await apiFetch(`/api/admin/features/${id}`, { method: 'PUT', body: JSON.stringify({ name: editName.trim() }) });
      setItems((prev) => prev.map((item) => item._id === id ? { ...item, name: editName.trim() } : item));
      setEditId(null); toast.success('Updated');
    } catch (err) { toast.error(err.message || 'Failed to update'); }
    finally { setUpdating(false); }
  };

  const handleDelete = async () => {
    try {
      await apiFetch(`/api/admin/features/${deleteModal.id}`, { method: 'DELETE' });
      setItems((prev) => prev.filter((item) => item._id !== deleteModal.id));
      toast.success('Deleted');
    } catch (err) { toast.error(err.message || 'Failed to delete'); }
    finally { setDeleteModal({ open: false, id: null, name: '' }); }
  };

  return (
    <div className="max-w-2xl space-y-5">
      <div>
        <h2 className="font-bold text-lg" style={{ color: '#0F172A' }}>Property Features</h2>
        <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>These appear as amenity checkboxes when adding properties</p>
      </div>

      <div className="bg-white rounded-lg p-5" style={{ border: '1px solid #E2E8F0' }}>
        <h3 className="font-semibold text-sm mb-3" style={{ color: '#0F172A' }}>Add New Feature</h3>
        <div className="flex gap-2">
          <input value={newName} onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            placeholder="e.g. Swimming Pool, Gym, Parking…"
            className="flex-1 px-3 py-2.5 text-sm rounded-md border outline-none"
            style={{ borderColor: '#E2E8F0', color: '#0F172A' }} />
          <button onClick={handleAdd} disabled={adding || !newName.trim()}
            className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold rounded-md disabled:opacity-60"
            style={{ backgroundColor: '#0F172A', color: '#fff' }}>
            {adding ? '…' : <><Plus className="w-4 h-4" /> Add</>}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg overflow-hidden" style={{ border: '1px solid #E2E8F0' }}>
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="px-5 py-3.5" style={{ borderBottom: '1px solid #F1F5F9' }}>
                <div className="h-4 bg-slate-100 rounded animate-pulse w-32" />
              </div>
            ))
          : items.length === 0
          ? <p className="text-center py-12 text-sm" style={{ color: '#94A3B8' }}>No features yet. Add one above.</p>
          : items.map((item, idx) => (
            <div key={item._id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50 transition-colors"
              style={{ borderBottom: idx < items.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#F1F5F9' }}>
                <Tag className="w-3.5 h-3.5" style={{ color: '#64748B' }} />
              </div>
              <div className="flex-1">
                {editId === item._id
                  ? <input value={editName} onChange={(e) => setEditName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleUpdate(item._id)}
                      className="w-full px-2 py-1 text-sm rounded border outline-none"
                      style={{ borderColor: '#0F172A', color: '#0F172A' }} autoFocus />
                  : <span className="text-sm font-medium" style={{ color: '#0F172A' }}>{item.name}</span>}
              </div>
              <div className="flex items-center gap-1.5">
                {editId === item._id ? (
                  <>
                    <button onClick={() => handleUpdate(item._id)} disabled={updating}
                      className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-green-50" style={{ color: '#22C55E' }}>
                      <Check className="w-4 h-4" />
                    </button>
                    <button onClick={() => setEditId(null)}
                      className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-slate-100" style={{ color: '#94A3B8' }}>
                      <X className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => { setEditId(item._id); setEditName(item.name); }}
                      className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-slate-100" style={{ color: '#64748B' }}>
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => setDeleteModal({ open: true, id: item._id, name: item.name })}
                      className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-red-50" style={{ color: '#EF4444' }}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
      </div>

      <ConfirmModal isOpen={deleteModal.open} title={`Delete "${deleteModal.name}"?`}
        message="This feature will be removed from the list. Existing properties won't be affected."
        onConfirm={handleDelete} onCancel={() => setDeleteModal({ open: false, id: null, name: '' })} />
    </div>
  );
}
