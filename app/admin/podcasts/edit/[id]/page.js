'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Loader2, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import PodcastForm from '@/components/admin/PodcastForm';
import { apiFetch } from '@/lib/admin-utils';

export default function EditPodcastPage() {
  const { id } = useParams();
  const [podcast, setPodcast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    apiFetch(`/api/admin/podcasts/${id}`)
      .then((res) => {
        if (res.success || res.data) setPodcast(res.data);
        else setError(res.message || 'Not found');
      })
      .catch((err) => { setError(err.message); toast.error('Failed to load podcast'); })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="flex items-center justify-center py-32">
      <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#D4A017' }} />
    </div>
  );
  if (error || !podcast) return (
    <div className="flex items-center justify-center py-32">
      <div className="text-center">
        <AlertCircle className="w-10 h-10 mx-auto mb-2" style={{ color: '#EF4444' }} />
        <p style={{ color: '#0F172A' }}>{error || 'Podcast not found'}</p>
      </div>
    </div>
  );

  return (
    <div>
      <div className="mb-5 max-w-3xl mx-auto">
        <h2 className="font-bold text-lg" style={{ color: '#0F172A' }}>Edit Podcast</h2>
        <p className="text-xs mt-0.5 line-clamp-1" style={{ color: '#64748B' }}>{podcast.title}</p>
      </div>
      <PodcastForm mode="edit" initialData={podcast} />
    </div>
  );
}
