'use client';
import { useEffect, useState } from 'react';
import { Plus, Pencil, Check, X, Trash2, User, Phone, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';
import ConfirmModal from '@/components/admin/ConfirmModal';
import { apiFetch } from '@/lib/admin-utils';
import ImageUploader from '@/components/admin/ImageUploader';

export default function RealtorsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [updating, setUpdating] = useState(false);
  
  // Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ name: '', companyName: '', contactNumber: '', reraNumber: '', photograph: '' });
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null, name: '' });

  useEffect(() => {
    loadRealtors();
  }, []);

  const loadRealtors = async () => {
    try {
      const res = await apiFetch('/api/admin/realtors');
      setItems(res.data || []);
    } catch (err) {
      toast.error('Failed to load realtors');
    } finally {
      setLoading(false);
    }
  };

  const openAddForm = () => {
    setFormData({ name: '', companyName: '', contactNumber: '', reraNumber: '', photograph: '' });
    setEditId(null);
    setIsFormOpen(true);
  };

  const openEditForm = (item) => {
    setFormData({ name: item.name || '', companyName: item.companyName || '', contactNumber: item.contactNumber || '', reraNumber: item.reraNumber || '', photograph: item.photograph || '' });
    setEditId(item._id);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditId(null);
  };

  const handleSave = async () => {
    if (!formData.name.trim()) return toast.error('Name is required');
    
    if (editId) {
      setUpdating(true);
      try {
        await apiFetch(`/api/admin/realtors/${editId}`, { method: 'PUT', body: JSON.stringify(formData) });
        toast.success('Realtor updated');
        loadRealtors();
        closeForm();
      } catch (err) { toast.error(err.message || 'Failed to update'); }
      finally { setUpdating(false); }
    } else {
      setAdding(true);
      try {
        await apiFetch('/api/admin/realtors', { method: 'POST', body: JSON.stringify(formData) });
        toast.success('Realtor added');
        loadRealtors();
        closeForm();
      } catch (err) { toast.error(err.message || 'Failed to add'); }
      finally { setAdding(false); }
    }
  };

  const handleDelete = async () => {
    try {
      await apiFetch(`/api/admin/realtors/${deleteModal.id}`, { method: 'DELETE' });
      setItems((prev) => prev.filter((item) => item._id !== deleteModal.id));
      toast.success('Deleted successfully');
    } catch (err) { toast.error(err.message || 'Failed to delete'); }
    finally { setDeleteModal({ open: false, id: null, name: '' }); }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-xl" style={{ color: '#0F172A' }}>Realtors</h2>
          <p className="text-sm mt-1" style={{ color: '#64748B' }}>Manage realtors and agents to assign to properties.</p>
        </div>
        <button onClick={openAddForm} className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 transition-colors">
          <Plus className="w-4 h-4" /> Add Realtor
        </button>
      </div>

      {isFormOpen && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-bold text-lg">{editId ? 'Edit Realtor' : 'New Realtor'}</h3>
            <button onClick={closeForm} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name *</label>
                <input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-slate-500" placeholder="e.g. Rahul Sharma" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Company Name</label>
                <input value={formData.companyName} onChange={(e) => setFormData({...formData, companyName: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-slate-500" placeholder="e.g. Roopam Estate" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Contact Number</label>
                <input value={formData.contactNumber} onChange={(e) => setFormData({...formData, contactNumber: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-slate-500" placeholder="e.g. +91 9876543210" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">RERA Number</label>
                <input value={formData.reraNumber} onChange={(e) => setFormData({...formData, reraNumber: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-slate-500" placeholder="e.g. A51800000000" />
              </div>
            </div>
            <div>
               <ImageUploader 
                 folder="chemburproperties/realtors"
                 label="Photograph"
                 value={formData.photograph}
                 onUpload={(url) => setFormData({...formData, photograph: url})}
               />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3 pt-5 border-t border-slate-100">
            <button onClick={closeForm} className="px-5 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded-lg border border-slate-200">Cancel</button>
            <button onClick={handleSave} disabled={adding || updating} className="px-6 py-2 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 disabled:opacity-50">
              {adding || updating ? 'Saving...' : 'Save Realtor'}
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
           <div className="p-8 text-center text-slate-400">Loading...</div>
        ) : items.length === 0 ? (
           <div className="p-12 text-center">
             <User className="w-12 h-12 text-slate-300 mx-auto mb-3" />
             <p className="text-slate-500 font-medium">No realtors added yet.</p>
           </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {items.map((item) => (
              <div key={item._id} className="flex items-center gap-4 p-5 hover:bg-slate-50 transition-colors">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                  {item.photograph ? (
                    <img src={item.photograph} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400"><User className="w-6 h-6" /></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 truncate">{item.name}</h4>
                  {item.companyName && <p className="text-xs text-slate-500 mt-0.5">{item.companyName}</p>}
                  <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
                    {item.contactNumber && <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {item.contactNumber}</span>}
                    {item.reraNumber && <span className="flex items-center gap-1 font-mono text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 border border-slate-200">RERA: {item.reraNumber}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => openEditForm(item)} className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => setDeleteModal({ open: true, id: item._id, name: item.name })} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmModal isOpen={deleteModal.open} title={`Delete ${deleteModal.name}?`}
        message="This realtor will be deleted. Any properties assigned to them will fallback to the default contact."
        onConfirm={handleDelete} onCancel={() => setDeleteModal({ open: false, id: null, name: '' })} />
    </div>
  );
}
