'use client';
import { useState, useEffect, forwardRef } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Save, Send, Loader2 } from 'lucide-react';
import TagInput from '@/components/admin/TagInput';
import ImageUploader from '@/components/admin/ImageUploader';
import { autoSlugify, apiFetch, getYouTubeId } from '@/lib/admin-utils';

const TOPIC_SUGGESTIONS = [
  'Pricing', 'Connectivity', 'Floor Plan', 'Amenities', 'Overview', 'Developer Background',
  'Construction Update', 'Legal', 'Investment Potential',
];

const Input = forwardRef((props, ref) => {
  return (
    <input ref={ref} className="w-full px-3 py-2.5 text-sm rounded-md border outline-none transition-colors"
      style={{ borderColor: '#E2E8F0', color: '#0F172A', backgroundColor: '#fff' }}
      onFocus={(e) => (e.target.style.borderColor = '#0F172A')}
      onBlur={(e) => (e.target.style.borderColor = '#E2E8F0')} {...props} />
  );
});
function Field({ label, required, hint, children }) {
  return (
    <div>
      {label && <label className="block text-xs font-semibold mb-1.5" style={{ color: '#64748B' }}>
        {label} {required && <span style={{ color: '#EF4444' }}>*</span>}
      </label>}
      {children}
      {hint && <p className="text-[11px] mt-1" style={{ color: '#94A3B8' }}>{hint}</p>}
    </div>
  );
}
function Toggle({ checked, onChange, label }) {
  return (
    <label className="flex items-center justify-between cursor-pointer">
      <span className="text-sm font-medium" style={{ color: '#0F172A' }}>{label}</span>
      <div onClick={() => onChange(!checked)}
        className="relative w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer"
        style={{ backgroundColor: checked ? '#0F172A' : '#CBD5E1' }}>
        <div className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200"
          style={{ transform: checked ? 'translateX(20px)' : 'translateX(2px)' }} />
      </div>
    </label>
  );
}

export default function PodcastForm({ mode = 'add', initialData = null }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [topics, setTopics] = useState(initialData?.topics || []);
  const [accessType, setAccessType] = useState(initialData?.accessType || 'free');
  const [isFeatured, setIsFeatured] = useState(initialData?.isFeatured || false);
  const [isDraft, setIsDraft] = useState(initialData?.isDraft || false);
  const [thumbnailUrl, setThumbnailUrl] = useState(initialData?.thumbnailUrl || '');
  const [properties, setProperties] = useState([]);
  const [videoUrlInput, setVideoUrlInput] = useState(initialData?.videoUrl || '');

  const { register, watch, setValue, getValues } = useForm({
    defaultValues: {
      title: initialData?.title || '',
      slug: initialData?.slug || '',
      developerName: initialData?.developerName || '',
      projectName: initialData?.projectName || '',
      linkedPropertyId: initialData?.linkedPropertyId?._id || initialData?.linkedPropertyId || '',
      description: initialData?.description || '',
      duration: initialData?.duration || '',
      recordedDate: initialData?.recordedDate
        ? new Date(initialData.recordedDate).toISOString().split('T')[0] : '',
      price: initialData?.price || '',
    },
  });

  const watchTitle = watch('title');
  useEffect(() => {
    if (mode === 'add' && watchTitle) setValue('slug', autoSlugify(watchTitle));
  }, [watchTitle, mode, setValue]);

  useEffect(() => {
    apiFetch('/api/admin/properties?limit=100').then((r) => setProperties(r.data?.properties || []));
  }, []);

  // Auto-fetch YouTube thumbnail
  const youtubeId = getYouTubeId(videoUrlInput);
  const ytThumb = youtubeId ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg` : null;

  const submit = async (asDraft) => {
    const title = getValues('title');
    if (!title) { toast.error('Title is required'); return; }
    setSaving(asDraft ? 'draft' : 'publish');
    try {
      const payload = {
        title, slug: getValues('slug'), developerName: getValues('developerName'),
        projectName: getValues('projectName'),
        linkedPropertyId: getValues('linkedPropertyId') || undefined,
        videoUrl: videoUrlInput, thumbnailUrl: thumbnailUrl || ytThumb || '',
        description: getValues('description'), duration: getValues('duration'),
        topics, recordedDate: getValues('recordedDate') || undefined,
        accessType, price: +getValues('price') || undefined,
        isFeatured, isDraft: asDraft,
      };
      const url = mode === 'edit' ? `/api/admin/podcasts/${initialData._id}` : '/api/admin/podcasts';
      const method = mode === 'edit' ? 'PUT' : 'POST';
      const res = await apiFetch(url, { method, body: JSON.stringify(payload) });
      if (res.success || res._status < 300) {
        toast.success(asDraft ? 'Draft saved!' : (mode === 'edit' ? 'Podcast updated!' : 'Podcast published!'));
        router.push('/admin/podcasts');
      } else {
        toast.error(res.message || 'Something went wrong');
      }
    } catch (err) {
      toast.error(err.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="max-w-3xl mx-auto space-y-5 pb-24">
      <div className="bg-white rounded-lg p-6 space-y-4" style={{ border: '1px solid #E2E8F0' }}>
        <h3 className="font-semibold text-sm pb-2" style={{ color: '#0F172A', borderBottom: '1px solid #F1F5F9' }}>
          Podcast Details
        </h3>
        <Field label="Podcast Title" required>
          <Input {...register('title')} placeholder="e.g. Developer Interview — Chembur Heights" />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Slug">
            <Input {...register('slug')} />
          </Field>
          <Field label="Developer Name">
            <Input {...register('developerName')} placeholder="e.g. Ravi Constructions" />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Project / Property Name">
            <Input {...register('projectName')} placeholder="e.g. Chembur Heights" />
          </Field>
          <Field label="Link to Property">
            <select {...register('linkedPropertyId')} className="w-full px-3 py-2.5 text-sm rounded-md border outline-none"
              style={{ borderColor: '#E2E8F0', color: '#0F172A' }}>
              <option value="">— Select property —</option>
              {properties.map((p) => (
                <option key={p._id} value={p._id}>{p.title} ({p.location?.[0] || '—'})</option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="YouTube Video URL *" hint="Paste the full YouTube link — embed preview appears below">
          <Input value={videoUrlInput} onChange={(e) => setVideoUrlInput(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..." />
        </Field>
        {youtubeId && (
          <div className="rounded-lg overflow-hidden" style={{ border: '1px solid #E2E8F0' }}>
            <iframe src={`https://www.youtube.com/embed/${youtubeId}`} width="100%" height="280" allowFullScreen title="Preview" />
          </div>
        )}

        <Field label="Custom Thumbnail (optional)" hint="Uploads to Cloudinary — overrides YouTube auto-thumbnail">
          <ImageUploader folder="chemburproperties/podcasts" multiple={false}
            value={thumbnailUrl} onUpload={setThumbnailUrl} />
        </Field>

        <Field label="Description">
          <textarea {...register('description')} rows={3}
            placeholder="What is this podcast about?"
            className="w-full px-3 py-2.5 text-sm rounded-md border outline-none resize-none"
            style={{ borderColor: '#E2E8F0', color: '#0F172A' }} />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Duration" hint="e.g. 12:34">
            <Input {...register('duration')} placeholder="12:34" />
          </Field>
          <Field label="Recorded Date">
            <Input type="date" {...register('recordedDate')} />
          </Field>
        </div>

        <Field label="Topics">
          <TagInput value={topics} onChange={setTopics} suggestions={TOPIC_SUGGESTIONS}
            placeholder="Add topic and press Enter…" />
        </Field>
      </div>

      {/* Access & Publish */}
      <div className="bg-white rounded-lg p-6 space-y-4" style={{ border: '1px solid #E2E8F0' }}>
        <h3 className="font-semibold text-sm pb-2" style={{ color: '#0F172A', borderBottom: '1px solid #F1F5F9' }}>
          Access & Publishing
        </h3>
        <Field label="Video Access Type">
          <div className="flex gap-6">
            {[['free', 'Free'], ['lead_unlock', 'Lead Unlock'], ['paid', 'Paid']].map(([val, label]) => (
              <label key={val} className="flex items-center gap-2 cursor-pointer">
                <input type="radio" value={val} checked={accessType === val} onChange={() => setAccessType(val)} className="w-4 h-4" />
                <span className="text-sm" style={{ color: '#0F172A' }}>{label}</span>
              </label>
            ))}
          </div>
        </Field>
        {accessType === 'paid' && (
          <Field label="Price (₹)">
            <Input type="number" {...register('price')} placeholder="e.g. 199" />
          </Field>
        )}
        <Toggle checked={isFeatured} onChange={setIsFeatured} label="Mark as Featured?" />
        <Toggle checked={isDraft} onChange={setIsDraft} label="Save as Draft?" />
      </div>

      {/* Action bar */}
      <div className="fixed bottom-0 right-0 z-30 flex items-center justify-end gap-3 px-6 py-4"
        style={{ left: '260px', backgroundColor: '#fff', borderTop: '1px solid #E2E8F0', boxShadow: '0 -4px 20px rgba(15,23,42,0.08)' }}>
        <button type="button" onClick={() => submit(true)} disabled={!!saving}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg border disabled:opacity-60"
          style={{ borderColor: '#E2E8F0', color: '#64748B' }}>
          {saving === 'draft' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Draft
        </button>
        <button type="button" onClick={() => submit(false)} disabled={!!saving}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg disabled:opacity-60"
          style={{ backgroundColor: '#0F172A', color: '#fff' }}>
          {saving === 'publish' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          {mode === 'edit' ? 'Update' : 'Publish'}
        </button>
      </div>
    </form>
  );
}
