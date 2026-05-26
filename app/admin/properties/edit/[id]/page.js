'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Loader2, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import PropertyForm from '@/components/admin/PropertyForm';
import { apiFetch } from '@/lib/admin-utils';

export default function EditPropertyPage() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    apiFetch(`/api/admin/properties/${id}`)
      .then((res) => {
        if (res.success || res.data) {
          setProperty(res.data);
        } else {
          setError(res.message || 'Property not found');
        }
      })
      .catch((err) => {
        setError(err.message || 'Failed to load property');
        toast.error('Failed to load property');
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#D4A017' }} />
          <p className="text-sm" style={{ color: '#64748B' }}>Loading property…</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="flex flex-col items-center gap-3 text-center">
          <AlertCircle className="w-10 h-10" style={{ color: '#EF4444' }} />
          <p className="font-semibold" style={{ color: '#0F172A' }}>{error || 'Property not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-5">
        <h2 className="font-bold text-lg" style={{ color: '#0F172A' }}>Edit Property</h2>
        <p className="text-xs mt-0.5 line-clamp-1" style={{ color: '#64748B' }}>{property.title}</p>
      </div>
      <PropertyForm mode="edit" initialData={property} />
    </div>
  );
}
