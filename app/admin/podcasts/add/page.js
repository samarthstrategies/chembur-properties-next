'use client';
import PodcastForm from '@/components/admin/PodcastForm';

export default function AddPodcastPage() {
  return (
    <div>
      <div className="mb-5 max-w-3xl mx-auto">
        <h2 className="font-bold text-lg" style={{ color: '#0F172A' }}>Add New Podcast</h2>
        <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>Add a developer interview or podcast episode.</p>
      </div>
      <PodcastForm mode="add" />
    </div>
  );
}
