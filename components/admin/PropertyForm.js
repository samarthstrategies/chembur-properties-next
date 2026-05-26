'use client';
import React, { useState, useEffect, forwardRef } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  ChevronDown, Plus, Trash2, Save, Send, Trophy, Gem,
  CheckCircle2, Clock, MapPin, Loader2,
} from 'lucide-react';
import dynamic from 'next/dynamic';
import TagInput from './TagInput';
import ImageUploader from './ImageUploader';
import { autoSlugify, apiFetch, getYouTubeId } from '@/lib/admin-utils';

const RichTextEditor = dynamic(() => import('./RichTextEditor'), { ssr: false });

const RESIDENTIAL_TYPES = ['Apartment', 'Bunglow', 'Activity Teen'];
const COMMERCIAL_TYPES = [
  'Office', 'Shop', 'Warehouse', 'Industrial Gala', 'Commercial Space', 'Commercial Godown',
];
const STATUS_OPTIONS = [
  'Buy', 'Lease', 'For Sale', 'For Rent', 'Re-Development Offer',
  'Residential Under Construction', 'Commercial Underconstruction',
  'Shop for Sale', 'Shop on Rent', 'Industrial Unit',
];

// Section wrapper
function SectionCard({ title, id, open, onToggle, children }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden" style={{ border: '1px solid #E2E8F0' }}>
      <button
        type="button"
        onClick={() => onToggle(id)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors"
      >
        <h3 className="font-semibold text-sm" style={{ color: '#0F172A' }}>{title}</h3>
        <ChevronDown
          className="w-4 h-4 transition-transform duration-200"
          style={{ color: '#94A3B8', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>
      {open && (
        <div className="px-5 pb-5" style={{ borderTop: '1px solid #F1F5F9' }}>
          <div className="pt-4">{children}</div>
        </div>
      )}
    </div>
  );
}

// Toggle switch
function Toggle({ checked, onChange, label, sublabel }) {
  return (
    <label className="flex items-center justify-between cursor-pointer">
      <div>
        <p className="text-sm font-medium" style={{ color: '#0F172A' }}>{label}</p>
        {sublabel && <p className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>{sublabel}</p>}
      </div>
      <div
        onClick={() => onChange(!checked)}
        className="relative w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer flex-shrink-0"
        style={{ backgroundColor: checked ? '#0F172A' : '#CBD5E1' }}
      >
        <div
          className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200"
          style={{ transform: checked ? 'translateX(20px)' : 'translateX(2px)' }}
        />
      </div>
    </label>
  );
}

// Form field wrapper
function Field({ label, required, error, hint, children, half }) {
  return (
    <div className={half ? '' : ''}>
      {label && (
        <label className="block text-xs font-semibold mb-1.5" style={{ color: '#64748B' }}>
          {label} {required && <span style={{ color: '#EF4444' }}>*</span>}
        </label>
      )}
      {children}
      {hint && <p className="text-[11px] mt-1" style={{ color: '#94A3B8' }}>{hint}</p>}
      {error && <p className="text-[11px] mt-1" style={{ color: '#EF4444' }}>{error}</p>}
    </div>
  );
}

const Input = forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`w-full px-3 py-2.5 text-sm rounded-md border outline-none transition-colors ${className || ''}`}
      style={{ borderColor: '#E2E8F0', color: '#0F172A', backgroundColor: '#fff' }}
      onFocus={(e) => (e.target.style.borderColor = '#0F172A')}
      onBlur={(e) => (e.target.style.borderColor = '#E2E8F0')}
      {...props}
    />
  );
});

Input.displayName = 'Input';

const TextArea = forwardRef(({ rows = 3, className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={`w-full px-3 py-2.5 text-sm rounded-md border outline-none transition-colors resize-none ${className || ''}`}
      style={{ borderColor: '#E2E8F0', color: '#0F172A', backgroundColor: '#fff' }}
      onFocus={(e) => (e.target.style.borderColor = '#0F172A')}
      onBlur={(e) => (e.target.style.borderColor = '#E2E8F0')}
      {...props}
    />
  );
});

TextArea.displayName = 'TextArea';

export default function PropertyForm({ mode = 'add', initialData = null }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  // Sections open state
  const [open, setOpen] = useState({
    A: true, B: true, C: true, D: true, E: true,
    F: true, G: true, H: true, I: false, J: true, K: false, L: false, M: true,
  });
  const toggleSection = (id) => setOpen((p) => ({ ...p, [id]: !p[id] }));

  // Complex fields (arrays) managed as local state
  const [description, setDescription] = useState(initialData?.description || '');
  const [tags, setTags] = useState(initialData?.tags || []);
  const [connectivity, setConnectivity] = useState(initialData?.connectivity || ['']);
  const [floorDetails, setFloorDetails] = useState(initialData?.floorDetails || []);
  const [selectedFeatures, setSelectedFeatures] = useState(initialData?.features || []);
  const [selectedLocations, setSelectedLocations] = useState(initialData?.location || []);
  const [selectedPropTypes, setSelectedPropTypes] = useState(initialData?.propertyType || []);
  const [selectedStatuses, setSelectedStatuses] = useState(initialData?.propertyStatus || []);

  // Media
  const [featuredImage, setFeaturedImage] = useState(initialData?.media?.featuredImage || '');
  const [galleryImages, setGalleryImages] = useState(initialData?.media?.galleryImages || []);
  const [floorPlanImages, setFloorPlanImages] = useState(initialData?.media?.floorPlanImages || []);

  // Toggle booleans (managed locally for immediate UI feedback)
  const [isWinGold, setIsWinGold] = useState(initialData?.badges?.isWinGold || false);
  const [isPremium, setIsPremium] = useState(initialData?.badges?.isPremium || false);
  const [isFeatured, setIsFeatured] = useState(initialData?.isFeatured || false);
  const [isDraftToggle, setIsDraftToggle] = useState(initialData?.isDraft || false);
  const [hasPodcast, setHasPodcast] = useState(initialData?.podcast?.hasPodcast || false);
  const [isLocked, setIsLocked] = useState(initialData?.propertyAccess?.isLocked || false);
  const [podcastAccessType, setPodcastAccessType] = useState(
    initialData?.podcast?.accessType || 'free'
  );
  const [videoUrl, setVideoUrl] = useState(initialData?.media?.propertyVideoUrl || '');
  const [mapEmbedUrl, setMapEmbedUrl] = useState(initialData?.mapEmbedUrl || '');

  // API reference data
  const [availableFeatures, setAvailableFeatures] = useState([]);
  const [availableLocations, setAvailableLocations] = useState([]);
  const [availablePodcasts, setAvailablePodcasts] = useState([]);
  const [newFeatureName, setNewFeatureName] = useState('');
  const [addingFeature, setAddingFeature] = useState(false);

  // RHF for simple scalar fields
  const { register, watch, setValue, getValues } = useForm({
    defaultValues: {
      title: initialData?.title || '',
      slug: initialData?.slug || '',
      excerpt: initialData?.excerpt || '',
      author: initialData?.author || 'Jeetu Chhaabria',
      dateOfPost: initialData?.dateOfPost
        ? new Date(initialData.dateOfPost).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0],
      category: initialData?.category || '',
      salePrice: initialData?.pricing?.salePrice || '',
      oldPrice: initialData?.pricing?.oldPrice || '',
      pricePrefix: initialData?.pricing?.pricePrefix || '',
      pricePostfix: initialData?.pricing?.pricePostfix || '',
      licenceFee: initialData?.pricing?.licenceFee || '',
      securityDeposit: initialData?.pricing?.securityDeposit || '',
      carpetArea: initialData?.specs?.carpetArea || '',
      areaPostfix: initialData?.specs?.areaPostfix || 'sq ft',
      lotSize: initialData?.specs?.lotSize || '',
      lotSizePostfix: initialData?.specs?.lotSizePostfix || '',
      bedrooms: initialData?.specs?.bedrooms || '',
      bathrooms: initialData?.specs?.bathrooms || '',
      parking: initialData?.specs?.parking || '',
      yearBuilt: initialData?.specs?.yearBuilt || '',
      totalFloors: initialData?.specs?.totalFloors || '',
      propertyId: initialData?.propertyId || `RH-${Date.now()}-property`,
      winGoldDetails: initialData?.badges?.winGoldDetails || '',
      premiumNote: initialData?.badges?.premiumNote || '',
      podcastId: initialData?.podcast?.podcastId || '',
      podcastPrice: initialData?.podcast?.price || '',
      accessPrice: initialData?.propertyAccess?.price || '',
      metaTitle: initialData?.metaTitle || '',
      metaDescription: initialData?.metaDescription || '',
    },
  });

  const watchTitle = watch('title');
  const watchCategory = watch('category');
  const watchExcerpt = watch('excerpt');

  // Auto-generate slug from title in add mode
  useEffect(() => {
    if (mode === 'add' && watchTitle) setValue('slug', autoSlugify(watchTitle));
  }, [watchTitle, mode, setValue]);

  // Fetch reference data
  useEffect(() => {
    Promise.all([
      apiFetch('/api/admin/features').catch(() => ({ data: [] })),
      apiFetch('/api/admin/locations').catch(() => ({ data: [] })),
      apiFetch('/api/admin/podcasts?limit=50').catch(() => ({ data: { podcasts: [] } })),
    ]).then(([f, l, p]) => {
      setAvailableFeatures(f.data || []);
      setAvailableLocations(l.data || []);
      setAvailablePodcasts(p.data?.podcasts || []);
    });
  }, []);

  // Auto-save every 30 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      const draft = {
        ...getValues(), description, tags, connectivity, floorDetails,
        features: selectedFeatures, location: selectedLocations,
        propertyType: selectedPropTypes, propertyStatus: selectedStatuses,
        media: { featuredImage, galleryImages, floorPlanImages, propertyVideoUrl: videoUrl },
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem('chembur-property-draft', JSON.stringify(draft));
      setLastSaved(new Date());
    }, 30000);
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [description, tags, connectivity, floorDetails, selectedFeatures, selectedLocations,
      selectedPropTypes, selectedStatuses, featuredImage, galleryImages, floorPlanImages, videoUrl]);

  const toggleArr = (arr, setArr, val) =>
    setArr((prev) => prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]);

  const assemblePayload = (asDraft) => ({
    title: getValues('title'),
    slug: getValues('slug'),
    excerpt: getValues('excerpt'),
    description,
    author: getValues('author'),
    dateOfPost: getValues('dateOfPost'),
    category: getValues('category'),
    propertyType: selectedPropTypes,
    propertyStatus: selectedStatuses,
    location: selectedLocations,
    mapEmbedUrl,
    pricing: {
      salePrice: +getValues('salePrice') || undefined,
      oldPrice: +getValues('oldPrice') || undefined,
      pricePrefix: getValues('pricePrefix'),
      pricePostfix: getValues('pricePostfix'),
      licenceFee: +getValues('licenceFee') || undefined,
      securityDeposit: getValues('securityDeposit'),
    },
    specs: {
      carpetArea: +getValues('carpetArea') || undefined,
      areaPostfix: getValues('areaPostfix'),
      lotSize: +getValues('lotSize') || undefined,
      lotSizePostfix: getValues('lotSizePostfix'),
      bedrooms: +getValues('bedrooms') || undefined,
      bathrooms: +getValues('bathrooms') || undefined,
      parking: +getValues('parking') || undefined,
      yearBuilt: +getValues('yearBuilt') || undefined,
      totalFloors: +getValues('totalFloors') || undefined,
    },
    propertyId: getValues('propertyId'),
    features: selectedFeatures,
    connectivity: connectivity.filter(Boolean),
    floorDetails,
    media: { featuredImage, galleryImages, floorPlanImages, propertyVideoUrl: videoUrl },
    badges: {
      isWinGold, winGoldDetails: getValues('winGoldDetails'),
      isPremium, premiumNote: getValues('premiumNote'),
    },
    podcast: {
      hasPodcast,
      podcastId: getValues('podcastId') || undefined,
      accessType: podcastAccessType,
      price: +getValues('podcastPrice') || undefined,
    },
    propertyAccess: {
      isLocked, accessType: isLocked ? 'paid' : 'free',
      price: +getValues('accessPrice') || undefined,
    },
    isFeatured, isDraft: asDraft, tags,
    metaTitle: getValues('metaTitle'),
    metaDescription: getValues('metaDescription'),
  });

  const submit = async (asDraft) => {
    const title = getValues('title');
    if (!title) { toast.error('Property title is required'); return; }
    if (!asDraft && !getValues('category')) { toast.error('Category is required to publish'); return; }
    setSaving(asDraft ? 'draft' : 'publish');
    try {
      const payload = assemblePayload(asDraft);
      const url = mode === 'edit' ? `/api/admin/properties/${initialData._id}` : '/api/admin/properties';
      const method = mode === 'edit' ? 'PUT' : 'POST';
      const res = await apiFetch(url, { method, body: JSON.stringify(payload) });
      if (res.success || res._status < 300) {
        toast.success(asDraft ? 'Draft saved!' : (mode === 'edit' ? 'Property updated!' : 'Property published!'));
        localStorage.removeItem('chembur-property-draft');
        router.push('/admin/properties');
      } else {
        toast.error(res.message || 'Something went wrong');
      }
    } catch (err) {
      toast.error(err.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const addFeature = async () => {
    if (!newFeatureName.trim()) return;
    setAddingFeature(true);
    try {
      const res = await apiFetch('/api/admin/features', {
        method: 'POST', body: JSON.stringify({ name: newFeatureName.trim() }),
      });
      const newF = res.data || { name: newFeatureName.trim() };
      setAvailableFeatures((prev) => [...prev, newF]);
      setSelectedFeatures((prev) => [...prev, newF.name || newF._id]);
      setNewFeatureName('');
      toast.success('Feature added');
    } catch { toast.error('Failed to add feature'); }
    finally { setAddingFeature(false); }
  };

  const youtubeId = getYouTubeId(videoUrl);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-4 pb-32">
      {/* Auto-save indicator */}
      {lastSaved && (
        <div className="flex items-center gap-2 text-xs" style={{ color: '#22C55E' }}>
          <CheckCircle2 className="w-3.5 h-3.5" />
          Auto-saved at {lastSaved.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
        </div>
      )}

      {mode === 'edit' && initialData?.updatedAt && (
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs" style={{ backgroundColor: '#F0FDF4', color: '#15803D' }}>
          <Clock className="w-3.5 h-3.5" />
          Last updated: {new Date(initialData.updatedAt).toLocaleString('en-IN')}
        </div>
      )}

      {/* ─────────────────────── SECTION A — BASIC INFO ─────────────────────── */}
      <SectionCard title="A · Basic Information" id="A" open={open.A} onToggle={toggleSection}>
        <div className="space-y-4">
          <Field label="Property Title" required>
            <Input {...register('title')} placeholder="e.g. Luxurious 3BHK in Chembur" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Slug (URL)" hint={`Preview: /properties/${watch('slug') || 'your-slug'}`}>
              <Input {...register('slug')} placeholder="auto-generated-slug" />
            </Field>
            <Field label="Author">
              <Input {...register('author')} />
            </Field>
          </div>
          <Field label="Excerpt / Short Description" hint={`${watchExcerpt?.length || 0} / 200`}>
            <TextArea {...register('excerpt')} maxLength={200} rows={2} placeholder="Brief summary shown in listing cards…" />
          </Field>
          <Field label="Full Description">
            <RichTextEditor value={description} onChange={setDescription} />
          </Field>
          <Field label="Date of Post">
            <Input type="date" {...register('dateOfPost')} />
          </Field>
        </div>
      </SectionCard>

      {/* ─────────────────────── SECTION B — CATEGORY & TYPE ─────────────────────── */}
      <SectionCard title="B · Category & Type" id="B" open={open.B} onToggle={toggleSection}>
        <div className="space-y-5">
          <Field label="Category" required>
            <div className="flex gap-6">
              {['Residential', 'Commercial'].map((cat) => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" value={cat} {...register('category')} className="w-4 h-4" />
                  <span className="text-sm font-medium" style={{ color: '#0F172A' }}>{cat}</span>
                </label>
              ))}
            </div>
          </Field>
          <Field label="Property Type">
            <div className="grid grid-cols-3 gap-2">
              {(watchCategory === 'Commercial' ? COMMERCIAL_TYPES : RESIDENTIAL_TYPES).map((type) => (
                <label key={type} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={selectedPropTypes.includes(type)}
                    onChange={() => toggleArr(selectedPropTypes, setSelectedPropTypes, type)} className="rounded" />
                  <span className="text-sm" style={{ color: '#0F172A' }}>{type}</span>
                </label>
              ))}
            </div>
          </Field>
          <Field label="Property Status (multi-select)">
            <div className="grid grid-cols-2 gap-2">
              {STATUS_OPTIONS.map((s) => (
                <label key={s} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={selectedStatuses.includes(s)}
                    onChange={() => toggleArr(selectedStatuses, setSelectedStatuses, s)} className="rounded" />
                  <span className="text-sm" style={{ color: '#0F172A' }}>{s}</span>
                </label>
              ))}
            </div>
          </Field>
          <div className="space-y-3">
            <Toggle checked={isFeatured} onChange={setIsFeatured} label="Is Featured?" sublabel="Shows in featured listings on homepage" />
            <Toggle checked={isDraftToggle} onChange={setIsDraftToggle} label="Save as Draft?" sublabel="Draft properties are not visible to public" />
          </div>
        </div>
      </SectionCard>

      {/* ─────────────────────── SECTION C — BADGES ─────────────────────── */}
      <SectionCard title="C · Badges & Collections" id="C" open={open.C} onToggle={toggleSection}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Win Gold */}
          <div className="p-4 rounded-lg border-2 transition-colors" style={{ borderColor: isWinGold ? '#D4A017' : '#E2E8F0' }}>
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="w-5 h-5" style={{ color: '#D4A017' }} />
              <span className="font-semibold text-sm" style={{ color: '#0F172A' }}>Win Gold Project</span>
            </div>
            <Toggle checked={isWinGold} onChange={setIsWinGold} label="Enable Win Gold badge" />
            {isWinGold && (
              <div className="mt-3">
                <Field label="Gold Scheme Details">
                  <Input {...register('winGoldDetails')} placeholder="e.g. 1 gram gold on booking" />
                </Field>
              </div>
            )}
          </div>
          {/* Premium */}
          <div className="p-4 rounded-lg border-2 transition-colors" style={{ borderColor: isPremium ? '#7C3AED' : '#E2E8F0' }}>
            <div className="flex items-center gap-2 mb-3">
              <Gem className="w-5 h-5" style={{ color: '#7C3AED' }} />
              <span className="font-semibold text-sm" style={{ color: '#0F172A' }}>Premium Collection</span>
            </div>
            <Toggle checked={isPremium} onChange={setIsPremium} label="Enable Premium badge" />
            {isPremium && (
              <div className="mt-3">
                <Field label="Why Premium?">
                  <Input {...register('premiumNote')} placeholder="e.g. Sea facing luxury 4BHK" />
                </Field>
              </div>
            )}
          </div>
        </div>
      </SectionCard>

      {/* ─────────────────────── SECTION D — LOCATION ─────────────────────── */}
      <SectionCard title="D · Location" id="D" open={open.D} onToggle={toggleSection}>
        <div className="space-y-4">
          <Field label="Select Locations (multi-select)">
            {availableLocations.length === 0 ? (
              <p className="text-sm" style={{ color: '#94A3B8' }}>Loading locations…</p>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {availableLocations.map((loc) => {
                  const name = loc.name || loc;
                  return (
                    <label key={name} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={selectedLocations.includes(name)}
                        onChange={() => toggleArr(selectedLocations, setSelectedLocations, name)} className="rounded" />
                      <span className="text-sm" style={{ color: '#0F172A' }}>{name}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </Field>
          <Field label="Google Maps Embed URL" hint="Click 'Share' → 'Embed a map' on Google Maps and paste the HTML code here">
            <Input 
              value={mapEmbedUrl} 
              onChange={(e) => {
                let val = e.target.value;
                const iframeMatch = val.match(/src="([^"]+)"/);
                if (iframeMatch) val = iframeMatch[1];
                setMapEmbedUrl(val);
              }} 
              placeholder='<iframe src="https://www.google.com/maps/embed?pb=..." width="600" height="450" ...' 
            />
            {mapEmbedUrl && !mapEmbedUrl.includes('/maps/embed') && (
              <p className="text-red-500 text-xs mt-1.5 font-medium">⚠️ Error: Short links (maps.app.goo.gl) cannot be embedded. Please use "Embed a map" on Google Maps.</p>
            )}
          </Field>
          {mapEmbedUrl && mapEmbedUrl.includes('/maps/embed') && (
            <div className="rounded-lg overflow-hidden" style={{ border: '1px solid #E2E8F0' }}>
              <iframe src={mapEmbedUrl.includes('<iframe') ? (mapEmbedUrl.match(/src="([^"]+)"/)?.[1] || mapEmbedUrl) : mapEmbedUrl} width="100%" height="300" loading="lazy" title="Property Map" />
            </div>
          )}
        </div>
      </SectionCard>

      {/* ─────────────────────── SECTION E — PRICING ─────────────────────── */}
      <SectionCard title="E · Pricing" id="E" open={open.E} onToggle={toggleSection}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Sale / Rent Price (₹)">
              <Input type="number" {...register('salePrice')} placeholder="e.g. 3750000" />
            </Field>
            <Field label="Old / Crossed Price (₹)">
              <Input type="number" {...register('oldPrice')} placeholder="e.g. 4000000" />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Price Prefix">
              <Input {...register('pricePrefix')} placeholder="e.g. From, Starting at" />
            </Field>
            <Field label="Price Postfix">
              <Input {...register('pricePostfix')} placeholder="e.g. Per Month, Onwards" />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Licence Fee (₹)">
              <Input type="number" {...register('licenceFee')} placeholder="e.g. 50000" />
            </Field>
            <Field label="Security Deposit">
              <Input {...register('securityDeposit')} placeholder="e.g. 3 Months Rent" />
            </Field>
          </div>
        </div>
      </SectionCard>

      {/* ─────────────────────── SECTION F — SPECS ─────────────────────── */}
      <SectionCard title="F · Property Specifications" id="F" open={open.F} onToggle={toggleSection}>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <Field label="Carpet Area">
              <Input type="number" {...register('carpetArea')} placeholder="e.g. 950" />
            </Field>
            <Field label="Area Unit">
              <Input {...register('areaPostfix')} placeholder="sq ft" />
            </Field>
            <Field label="Lot Size">
              <Input type="number" {...register('lotSize')} />
            </Field>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Field label="Lot Size Unit">
              <Input {...register('lotSizePostfix')} placeholder="sq ft" />
            </Field>
            <Field label="Bedrooms">
              <Input type="number" {...register('bedrooms')} />
            </Field>
            <Field label="Bathrooms">
              <Input type="number" {...register('bathrooms')} />
            </Field>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Field label="Parking Spaces">
              <Input type="number" {...register('parking')} />
            </Field>
            <Field label="Year Built">
              <Input type="number" {...register('yearBuilt')} placeholder="e.g. 2024" />
            </Field>
            <Field label="Total Floors">
              <Input type="number" {...register('totalFloors')} />
            </Field>
          </div>
          <Field label="Property ID" hint="Auto-generated — editable">
            <Input {...register('propertyId')} />
          </Field>
        </div>
      </SectionCard>

      {/* ─────────────────────── SECTION G — FEATURES ─────────────────────── */}
      <SectionCard title="G · Features & Amenities" id="G" open={open.G} onToggle={toggleSection}>
        <div className="space-y-4">
          {availableFeatures.length === 0 ? (
            <p className="text-sm" style={{ color: '#94A3B8' }}>Loading features…</p>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {availableFeatures.map((f) => {
                const name = f.name || f;
                return (
                  <label key={name} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={selectedFeatures.includes(name)}
                      onChange={() => toggleArr(selectedFeatures, setSelectedFeatures, name)} className="rounded" />
                    <span className="text-sm" style={{ color: '#0F172A' }}>{name}</span>
                  </label>
                );
              })}
            </div>
          )}
          <div className="flex gap-2 pt-2" style={{ borderTop: '1px solid #F1F5F9' }}>
            <Input value={newFeatureName} onChange={(e) => setNewFeatureName(e.target.value)}
              placeholder="Add new feature…" onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())} />
            <button type="button" onClick={addFeature} disabled={addingFeature}
              className="px-4 py-2 text-sm font-semibold rounded-md whitespace-nowrap disabled:opacity-60"
              style={{ backgroundColor: '#0F172A', color: '#fff' }}>
              {addingFeature ? '…' : '+ Add'}
            </button>
          </div>
        </div>
      </SectionCard>

      {/* ─────────────────────── SECTION H — CONNECTIVITY ─────────────────────── */}
      <SectionCard title="H · Connectivity Points" id="H" open={open.H} onToggle={toggleSection}>
        <div className="space-y-2">
          {connectivity.map((item, i) => (
            <div key={i} className="flex gap-2">
              <div className="flex items-center" style={{ color: '#94A3B8' }}>
                <MapPin className="w-4 h-4" />
              </div>
              <Input value={item} onChange={(e) => {
                const next = [...connectivity]; next[i] = e.target.value; setConnectivity(next);
              }} placeholder="e.g. Diamond Garden — 5 mins walk" />
              <button type="button" onClick={() => setConnectivity(connectivity.filter((_, j) => j !== i))}
                className="p-2 rounded-md hover:bg-red-50 transition-colors" style={{ color: '#EF4444' }}>
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button type="button" onClick={() => setConnectivity([...connectivity, ''])}
            className="flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-md transition-colors mt-1"
            style={{ color: '#64748B', backgroundColor: '#F8FAFC', border: '1px dashed #CBD5E1' }}>
            <Plus className="w-4 h-4" /> Add Connectivity Point
          </button>
        </div>
      </SectionCard>

      {/* ─────────────────────── SECTION I — FLOOR DETAILS ─────────────────────── */}
      <SectionCard title="I · Floor Wise Details (Optional)" id="I" open={open.I} onToggle={toggleSection}>
        <div className="space-y-3">
          {floorDetails.length > 0 && (
            <div className="overflow-x-auto rounded-lg" style={{ border: '1px solid #E2E8F0' }}>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: '#F8FAFC' }}>
                    {['Floor No.', 'BHK Type', 'Carpet Area', 'Status', ''].map((h) => (
                      <th key={h} className="text-left px-3 py-2.5 text-xs font-semibold" style={{ color: '#64748B' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {floorDetails.map((row, i) => (
                    <tr key={i} style={{ borderTop: '1px solid #F1F5F9' }}>
                      {['floorNumber', 'bhkType', 'carpetArea'].map((key) => (
                        <td key={key} className="px-3 py-2">
                          <Input value={row[key] || ''} onChange={(e) => {
                            const next = [...floorDetails]; next[i] = { ...next[i], [key]: e.target.value }; setFloorDetails(next);
                          }} placeholder={key === 'floorNumber' ? '1' : key === 'bhkType' ? '2BHK' : '650 sq ft'} />
                        </td>
                      ))}
                      <td className="px-3 py-2">
                        <select value={row.status || 'Available'} onChange={(e) => {
                          const next = [...floorDetails]; next[i] = { ...next[i], status: e.target.value }; setFloorDetails(next);
                        }} className="w-full px-2 py-2 text-sm rounded-md border outline-none" style={{ borderColor: '#E2E8F0' }}>
                          <option>Available</option><option>Sold</option>
                        </select>
                      </td>
                      <td className="px-3 py-2">
                        <button type="button" onClick={() => setFloorDetails(floorDetails.filter((_, j) => j !== i))}
                          style={{ color: '#EF4444' }}><Trash2 className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <button type="button" onClick={() => setFloorDetails([...floorDetails, { floorNumber: '', bhkType: '', carpetArea: '', status: 'Available' }])}
            className="flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-md transition-colors"
            style={{ color: '#64748B', backgroundColor: '#F8FAFC', border: '1px dashed #CBD5E1' }}>
            <Plus className="w-4 h-4" /> Add Floor
          </button>
        </div>
      </SectionCard>

      {/* ─────────────────────── SECTION J — MEDIA ─────────────────────── */}
      <SectionCard title="J · Media Upload" id="J" open={open.J} onToggle={toggleSection}>
        <div className="space-y-6">
          <ImageUploader folder="chemburproperties/featured" multiple={false} value={featuredImage}
            onUpload={setFeaturedImage} label="Featured Image (Main)" />
          <ImageUploader folder="chemburproperties/gallery" multiple value={galleryImages}
            onUpload={setGalleryImages}
            label="Gallery Images" />
          <ImageUploader folder="chemburproperties/floorplans" multiple value={floorPlanImages}
            onUpload={setFloorPlanImages}
            label="Floor Plan Images" />
          <Field label="Property Video URL (YouTube)" hint="Paste full YouTube link — preview will appear below">
            <Input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..." />
          </Field>
          {youtubeId && (
            <div className="rounded-lg overflow-hidden" style={{ border: '1px solid #E2E8F0' }}>
              <iframe width="100%" height="315"
                src={`https://www.youtube.com/embed/${youtubeId}`}
                allowFullScreen title="Property video preview" />
            </div>
          )}
        </div>
      </SectionCard>

      {/* ─────────────────────── SECTION K — PODCAST ─────────────────────── */}
      <SectionCard title="K · Developer Podcast" id="K" open={open.K} onToggle={toggleSection}>
        <div className="space-y-4">
          <Toggle checked={hasPodcast} onChange={setHasPodcast} label="Attach Developer Podcast to this property?" />
          {hasPodcast && (
            <>
              <Field label="Select Existing Podcast">
                <select {...register('podcastId')} className="w-full px-3 py-2.5 text-sm rounded-md border outline-none"
                  style={{ borderColor: '#E2E8F0', color: '#0F172A' }}>
                  <option value="">— Select a podcast —</option>
                  {availablePodcasts.map((p) => (
                    <option key={p._id} value={p._id}>{p.title} {p.developerName ? `— ${p.developerName}` : ''}</option>
                  ))}
                </select>
              </Field>
              <Field label="Video Access Type">
                <div className="flex gap-6">
                  {['free', 'lead_unlock', 'paid'].map((t) => (
                    <label key={t} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value={t} checked={podcastAccessType === t}
                        onChange={() => setPodcastAccessType(t)} className="w-4 h-4" />
                      <span className="text-sm capitalize" style={{ color: '#0F172A' }}>
                        {t === 'lead_unlock' ? 'Lead Unlock' : t.charAt(0).toUpperCase() + t.slice(1)}
                      </span>
                    </label>
                  ))}
                </div>
              </Field>
              {podcastAccessType === 'paid' && (
                <Field label="Podcast Access Price (₹)">
                  <Input type="number" {...register('podcastPrice')} placeholder="e.g. 199" />
                </Field>
              )}
            </>
          )}
        </div>
      </SectionCard>

      {/* ─────────────────────── SECTION L — PROPERTY ACCESS ─────────────────────── */}
      <SectionCard title="L · Property Detail Access" id="L" open={open.L} onToggle={toggleSection}>
        <div className="space-y-4">
          <Toggle checked={isLocked} onChange={setIsLocked} label="Lock Full Property Details?"
            sublabel="User must pay to view full description, connectivity & floor details" />
          {isLocked && (
            <Field label="Unlock Price (₹)" hint="User pays this amount to unlock full property details">
              <Input type="number" {...register('accessPrice')} placeholder="e.g. 99" />
            </Field>
          )}
        </div>
      </SectionCard>

      {/* ─────────────────────── SECTION M — SEO & TAGS ─────────────────────── */}
      <SectionCard title="M · SEO & Tags" id="M" open={open.M} onToggle={toggleSection}>
        <div className="space-y-4">
          <Field label="Tags">
            <TagInput value={tags} onChange={setTags}
              suggestions={['Luxury', 'Sea View', 'Ready Possession', 'New Launch', 'Affordable', 'Corner Unit']} />
          </Field>
          <Field label="Meta Title" hint="Leave empty to use property title">
            <Input {...register('metaTitle')} placeholder="SEO page title…" />
          </Field>
          <Field label="Meta Description" hint={`${watch('metaDescription')?.length || 0} / 160 — Leave empty to use excerpt`}>
            <TextArea {...register('metaDescription')} maxLength={160} rows={2} placeholder="SEO meta description…" />
          </Field>
        </div>
      </SectionCard>

      {/* ─────────────────────── STICKY ACTION BAR ─────────────────────── */}
      <div
        className="fixed bottom-0 right-0 z-30 flex items-center justify-between px-6 py-4"
        style={{
          left: '260px',
          backgroundColor: '#fff',
          borderTop: '1px solid #E2E8F0',
          boxShadow: '0 -4px 20px rgba(15,23,42,0.08)',
        }}
      >
        <div className="text-xs" style={{ color: '#94A3B8' }}>
          {lastSaved ? (
            <span className="flex items-center gap-1.5" style={{ color: '#22C55E' }}>
              <CheckCircle2 className="w-3.5 h-3.5" />
              Auto-saved at {lastSaved.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
            </span>
          ) : (
            'Auto-saves every 30 seconds'
          )}
        </div>
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => submit(true)}
            disabled={!!saving}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg border transition-colors disabled:opacity-60"
            style={{ borderColor: '#E2E8F0', color: '#64748B' }}>
            {saving === 'draft' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Draft
          </button>
          <button type="button" onClick={() => submit(false)}
            disabled={!!saving}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg transition-colors disabled:opacity-60"
            style={{ backgroundColor: '#0F172A', color: '#fff' }}>
            {saving === 'publish' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            {mode === 'edit' ? 'Update' : 'Publish'}
          </button>
        </div>
      </div>
    </form>
  );
}
