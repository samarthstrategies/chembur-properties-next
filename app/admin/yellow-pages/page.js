'use client';
import { useState, useEffect } from 'react';
import ImageUploader from '@/components/admin/ImageUploader';
import { Plus, Edit2, Trash2, X, Star } from 'lucide-react';
import toast from 'react-hot-toast';

export default function YellowPagesAdmin() {
  const [designers, setDesigners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'expired'
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchDesigners();
  }, []);

  const fetchDesigners = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/designers');
      const data = await res.json();
      if (data.success) {
        setDesigners(data.data);
      }
    } catch (err) {
      toast.error('Failed to load designers');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (designer = null) => {
    if (designer) {
      setFormData({
        ...designer,
        subscriptionExpiry: designer.subscriptionExpiry 
          ? new Date(designer.subscriptionExpiry).toISOString().split('T')[0] 
          : '',
      });
    } else {
      setFormData({
        businessName: '',
        ownerName: '',
        phone: '',
        whatsapp: '',
        specialization: '',
        area: '',
        profilePhoto: '',
        subscriptionExpiry: '',
        isFeatured: false,
        isActive: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const isEdit = !!formData._id;
      const url = isEdit ? `/api/admin/designers/${formData._id}` : '/api/admin/designers';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(isEdit ? 'Designer updated' : 'Designer added');
        handleCloseModal();
        fetchDesigners();
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      toast.error(err.message || 'Failed to save designer');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete ${name}?`)) return;
    try {
      const res = await fetch(`/api/admin/designers/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        toast.success('Designer deleted');
        fetchDesigners();
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      toast.error('Failed to delete designer');
    }
  };

  const getStatus = (designer) => {
    if (!designer.isActive) return 'INACTIVE';
    if (!designer.subscriptionExpiry) return 'ACTIVE';
    const expiry = new Date(designer.subscriptionExpiry);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

    if (daysUntilExpiry < 0) return 'EXPIRED';
    if (daysUntilExpiry <= 30) return 'EXPIRING SOON';
    return 'ACTIVE';
  };

  // Filter and Sort
  const filteredDesigners = designers.filter(d => {
    if (filter === 'all') return true;
    const status = getStatus(d);
    if (filter === 'active') return status === 'ACTIVE' || status === 'EXPIRING SOON';
    if (filter === 'expired') return status === 'EXPIRED';
    return true;
  }).sort((a, b) => {
    const statusPriority = { 'ACTIVE': 1, 'EXPIRING SOON': 2, 'INACTIVE': 3, 'EXPIRED': 4 };
    return statusPriority[getStatus(a)] - statusPriority[getStatus(b)];
  });

  return (
    <div className="max-w-6xl mx-auto pb-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="font-bold text-xl" style={{ color: '#0F172A' }}>
            Interior Designers <span className="text-sm font-normal text-slate-500">— Yellow Pages</span>
          </h2>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-navy text-white rounded-md text-sm font-medium hover:bg-navy/90"
        >
          <Plus className="w-4 h-4" /> Add Designer
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        {['all', 'active', 'expired'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider ${
              filter === f ? 'bg-navy text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-500">Loading designers...</div>
      ) : filteredDesigners.length === 0 ? (
        <div className="text-center py-20 bg-white border rounded-lg text-slate-500">
          No designers found matching this filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDesigners.map(d => {
            const status = getStatus(d);
            const isExpired = status === 'EXPIRED';
            return (
              <div 
                key={d._id} 
                className={`bg-white rounded-xl border p-5 shadow-sm relative ${isExpired ? 'opacity-60' : ''}`}
                style={{ borderColor: d.isFeatured ? '#D4A017' : '#E2E8F0' }}
              >
                {d.isFeatured && (
                  <div className="absolute top-0 right-0 bg-gold text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-xl">
                    FEATURED
                  </div>
                )}
                
                <div className="flex items-start gap-4">
                  <img 
                    src={d.profilePhoto || '/images/placeholder.jpg'} 
                    alt={d.businessName}
                    className="w-[70px] h-[70px] rounded-full object-cover border-2 border-slate-100 flex-shrink-0"
                  />
                  <div className="flex-1 overflow-hidden">
                    <h3 className="font-bold text-navy truncate" title={d.businessName}>
                      {d.businessName}
                    </h3>
                    <p className="text-xs text-slate-500 truncate">Owner: {d.ownerName}</p>
                    <div className="mt-2 space-y-1">
                      <p className="text-xs text-slate-600 flex items-center gap-1.5"><span className="text-[10px]">📞</span> {d.phone}</p>
                      {d.whatsapp && <p className="text-xs text-slate-600 flex items-center gap-1.5"><span className="text-[10px]">💬</span> {d.whatsapp}</p>}
                      {d.area && <p className="text-xs text-slate-600 flex items-center gap-1.5"><span className="text-[10px]">📍</span> <span className="truncate">{d.area}</span></p>}
                      {d.specialization && <p className="text-[10px] text-gold-dark font-semibold truncate mt-1 bg-gold/10 inline-block px-2 py-0.5 rounded">
                        {d.specialization}
                      </p>}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    {status === 'ACTIVE' && <span className="text-[10px] bg-green-100 text-green-700 font-bold px-2 py-1 rounded uppercase">Active</span>}
                    {status === 'EXPIRING SOON' && <span className="text-[10px] bg-yellow-100 text-yellow-700 font-bold px-2 py-1 rounded uppercase">Expiring Soon</span>}
                    {status === 'EXPIRED' && <span className="text-[10px] bg-red-100 text-red-700 font-bold px-2 py-1 rounded uppercase">Expired</span>}
                    {status === 'INACTIVE' && <span className="text-[10px] bg-slate-100 text-slate-700 font-bold px-2 py-1 rounded uppercase">Inactive</span>}
                    
                    {d.subscriptionExpiry && (
                      <p className="text-[10px] text-slate-400 mt-1">
                        Exp: {new Date(d.subscriptionExpiry).toLocaleDateString('en-GB')}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <button onClick={() => handleOpenModal(d)} className="p-1.5 text-slate-400 hover:text-navy hover:bg-slate-100 rounded">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(d._id, d.businessName)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && formData && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center z-10">
              <h3 className="font-bold text-lg text-navy">{formData._id ? 'Edit Designer' : 'Add Designer'}</h3>
              <button onClick={handleCloseModal} className="p-2 text-slate-400 hover:bg-slate-100 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase">Business Name *</label>
                  <input type="text" required value={formData.businessName} onChange={e => setFormData(prev => ({...prev, businessName: e.target.value}))} className="lux-input w-full" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase">Owner Name *</label>
                  <input type="text" required value={formData.ownerName} onChange={e => setFormData(prev => ({...prev, ownerName: e.target.value}))} className="lux-input w-full" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase">Phone Number *</label>
                  <input type="tel" required value={formData.phone} onChange={e => setFormData(prev => ({...prev, phone: e.target.value}))} className="lux-input w-full" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase">WhatsApp Number</label>
                  <input type="tel" value={formData.whatsapp} onChange={e => setFormData(prev => ({...prev, whatsapp: e.target.value}))} className="lux-input w-full" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase">Specialization</label>
                  <input type="text" value={formData.specialization} onChange={e => setFormData(prev => ({...prev, specialization: e.target.value}))} placeholder="e.g. Residential, Modular Kitchen, False Ceiling" className="lux-input w-full" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase">Service Area</label>
                  <input type="text" value={formData.area} onChange={e => setFormData(prev => ({...prev, area: e.target.value}))} placeholder="e.g. Chembur, Govandi, Ghatkopar" className="lux-input w-full" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase">Profile Photo</label>
                  <ImageUploader 
                    folder="chemburproperties/designers"
                    multiple={false}
                    value={formData.profilePhoto}
                    onUpload={(url) => setFormData(prev => ({...prev, profilePhoto: url}))}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase">Subscription Expiry</label>
                  <input type="date" value={formData.subscriptionExpiry} onChange={e => setFormData(prev => ({...prev, subscriptionExpiry: e.target.value}))} className="lux-input w-full" />
                </div>
                <div className="flex items-center gap-6 pt-6">
                  <label className="flex items-center gap-2 text-sm text-navy cursor-pointer">
                    <input type="checkbox" checked={formData.isFeatured} onChange={e => setFormData(prev => ({...prev, isFeatured: e.target.checked}))} className="w-4 h-4 rounded text-gold focus:ring-gold" />
                    <Star className="w-4 h-4 text-gold fill-gold" /> Featured
                  </label>
                  <label className="flex items-center gap-2 text-sm text-navy cursor-pointer">
                    <input type="checkbox" checked={formData.isActive} onChange={e => setFormData(prev => ({...prev, isActive: e.target.checked}))} className="w-4 h-4 rounded text-navy focus:ring-navy" />
                    Active
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t">
                <button type="button" onClick={handleCloseModal} className="px-5 py-2.5 rounded-md text-sm font-medium border border-slate-200 text-slate-600 hover:bg-slate-50">
                  Cancel
                </button>
                <button type="submit" disabled={isSaving} className="px-5 py-2.5 rounded-md text-sm font-medium bg-navy text-white hover:bg-navy/90 disabled:opacity-50">
                  {isSaving ? 'Saving...' : 'Save Designer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
