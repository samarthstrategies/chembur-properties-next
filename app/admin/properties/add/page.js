'use client';
import PropertyForm from '@/components/admin/PropertyForm';

export default function AddPropertyPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-5">
        <h2 className="font-bold text-lg" style={{ color: '#0F172A' }}>Add New Property</h2>
        <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>
          Fill in the sections below. Auto-saves every 30 seconds.
        </p>
      </div>
      <PropertyForm mode="add" />
    </div>
  );
}
