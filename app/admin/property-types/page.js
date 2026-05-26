'use client';
import { useEffect, useState } from 'react';
import { Plus, Pencil, Check, X, Trash2, FolderOpen } from 'lucide-react';
import toast from 'react-hot-toast';
import ConfirmModal from '@/components/admin/ConfirmModal';
import { apiFetch } from '@/lib/admin-utils';

export default function PropertyTypesPage() {
  const [residentialTypes, setResidentialTypes] = useState([]);
  const [commercialTypes, setCommercialTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch('/api/admin/property-types')
      .then((r) => {
        const all = r.data || [];
        setResidentialTypes(all.filter((t) => t.category === 'Residential'));
        setCommercialTypes(all.filter((t) => t.category === 'Commercial'));
      })
      .catch(() => toast.error('Failed to load'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-bold text-lg" style={{ color: '#0F172A' }}>Property Types</h2>
        <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>Manage Residential and Commercial property type options</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TypeColumn
          title="Residential Types"
          category="Residential"
          items={residentialTypes}
          setItems={setResidentialTypes}
          loading={loading}
          color="#3B82F6"
        />
        <TypeColumn
          title="Commercial Types"
          category="Commercial"
          items={commercialTypes}
          setItems={setCommercialTypes}
          loading={loading}
          color="#F97316"
        />
      </div>
    </div>
  );
}

function TypeColumn({ title, category, items, setItems, loading, color }) {
  const [newName, setNewName] = useState('');
  const [adding, setAdding] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [updating, setUpdating] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null, name: '' });

  const handleAdd = async () => {
    if (!newName.trim()) return;
    setAdding(true);
    try {
      const res = await apiFetch('/api/admin/property-types', {
        method: 'POST', body: JSON.stringify({ name: newName.trim(), category }),
      });
      setItems((prev) => [...prev, res.data || { name: newName.trim(), category, _id: Date.now() }]);
      setNewName(''); toast.success(`${category} type added`);
    } catch (err) { toast.error(err.message || 'Failed'); }
    finally { setAdding(false); }
  };

  const handleUpdate = async (id) => {
    if (!editName.trim()) return;
    setUpdating(true);
    try {
      await apiFetch(`/api/admin/property-types/${id}`, { method: 'PUT', body: JSON.stringify({ name: editName.trim() }) });
      setItems((prev) => prev.map((t) => t._id === id ? { ...t, name: editName.trim() } : t));
      setEditId(null); toast.success('Updated');
    } catch (err) { toast.error(err.message || 'Failed'); }
    finally { setUpdating(false); }
  };

  const handleDelete = async () => {
    try {
      await apiFetch(`/api/admin/property-types/${deleteModal.id}`, { method: 'DELETE' });
      setItems((prev) => prev.filter((t) => t._id !== deleteModal.id));
      toast.success('Deleted');
    } catch (err) { toast.error(err.message || 'Failed'); }
    finally { setDeleteModal({ open: false, id: null, name: '' }); }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg p-5" style={{ border: '1px solid #E2E8F0' }}>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
          <h3 className="font-semibold text-sm" style={{ color: '#0F172A' }}>{title}</h3>
        </div>
        <div className="flex gap-2">
          <input value={newName} onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            placeholder={`Add ${category} type…`}
            className="flex-1 px-3 py-2 text-sm rounded-md border outline-none"
            style={{ borderColor: '#E2E8F0', color: '#0F172A' }} />
          <button onClick={handleAdd} disabled={adding || !newName.trim()}
            className="px-3 py-2 text-sm font-semibold rounded-md disabled:opacity-60"
            style={{ backgroundColor: '#0F172A', color: '#fff' }}>
            {adding ? '…' : <Plus className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg overflow-hidden" style={{ border: '1px solid #E2E8F0' }}>
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="px-4 py-3" style={{ borderBottom: '1px solid #F1F5F9' }}>
                <div className="h-4 bg-slate-100 rounded animate-pulse w-28" />
              </div>
            ))
          : items.length === 0
          ? <p className="text-center py-10 text-sm" style={{ color: '#94A3B8' }}>No {category.toLowerCase()} types yet</p>
          : items.map((item, idx) => (
            <div key={item._id} className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors"
              style={{ borderBottom: idx < items.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
              <FolderOpen className="w-3.5 h-3.5 flex-shrink-0" style={{ color }} />
              <div className="flex-1">
                {editId === item._id
                  ? <input value={editName} onChange={(e) => setEditName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleUpdate(item._id)}
                      className="w-full px-2 py-1 text-sm rounded border outline-none"
                      style={{ borderColor: '#0F172A' }} autoFocus />
                  : <span className="text-sm font-medium" style={{ color: '#0F172A' }}>{item.name}</span>}
              </div>
              <div className="flex items-center gap-1">
                {editId === item._id ? (
                  <>
                    <button onClick={() => handleUpdate(item._id)} disabled={updating}
                      className="w-7 h-7 rounded flex items-center justify-center" style={{ color: '#22C55E' }}>
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => setEditId(null)}
                      className="w-7 h-7 rounded flex items-center justify-center" style={{ color: '#94A3B8' }}>
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => { setEditId(item._id); setEditName(item.name); }}
                      className="w-7 h-7 rounded flex items-center justify-center hover:bg-slate-100" style={{ color: '#64748B' }}>
                      <Pencil className="w-3 h-3" />
                    </button>
                    <button onClick={() => setDeleteModal({ open: true, id: item._id, name: item.name })}
                      className="w-7 h-7 rounded flex items-center justify-center hover:bg-red-50" style={{ color: '#EF4444' }}>
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
      </div>
      <ConfirmModal isOpen={deleteModal.open} title={`Delete "${deleteModal.name}"?`}
        message="This type will be removed from the options." onConfirm={handleDelete}
        onCancel={() => setDeleteModal({ open: false, id: null, name: '' })} />
    </div>
  );
}
