'use client';
import { useCallback } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { Upload, X, ImagePlus } from 'lucide-react';

/**
 * ImageUploader — Cloudinary upload widget wrapper.
 * Props:
 *   folder    — Cloudinary folder path
 *   multiple  — boolean (default false)
 *   value     — string | string[] (current URL or URLs)
 *   onUpload  — (url: string | string[]) => void
 *   label     — string (optional display label)
 */
export default function ImageUploader({
  folder = 'chemburproperties',
  multiple = false,
  value,
  onUpload,
  label,
}) {
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'ml_default';

  const handleSuccess = useCallback(
    (result) => {
      const url = result?.info?.secure_url;
      if (!url) return;
      if (multiple) {
        onUpload(prev => {
          const current = Array.isArray(prev) ? prev : [];
          if (current.includes(url)) return current;
          return [...current, url];
        });
      } else {
        onUpload(url);
      }
    },
    [multiple, onUpload]
  );

  const removeImage = (urlToRemove) => {
    if (multiple) {
      onUpload(prev => Array.isArray(prev) ? prev.filter((u) => u !== urlToRemove) : []);
    } else {
      onUpload('');
    }
  };

  const images = multiple
    ? Array.isArray(value) ? value : []
    : value ? [value] : [];

  return (
    <div className="space-y-3">
      {label && (
        <p className="text-sm font-medium" style={{ color: '#0F172A' }}>
          {label}
        </p>
      )}

      {/* Upload trigger */}
      <CldUploadWidget
        uploadPreset={uploadPreset}
        options={{
          folder,
          multiple,
          maxFiles: multiple ? 20 : 1,
          sources: ['local', 'url', 'camera'],
          resourceType: 'image',
        }}
        onSuccess={handleSuccess}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open()}
            className="flex flex-col items-center justify-center w-full gap-3 border-2 border-dashed rounded-lg transition-all hover:border-slate-400 py-8"
            style={{ borderColor: '#CBD5E1', backgroundColor: '#F8FAFC' }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#E2E8F0' }}
            >
              {multiple ? (
                <ImagePlus className="w-5 h-5" style={{ color: '#64748B' }} />
              ) : (
                <Upload className="w-5 h-5" style={{ color: '#64748B' }} />
              )}
            </div>
            <div className="text-center">
              <p className="text-sm font-medium" style={{ color: '#0F172A' }}>
                {images.length > 0
                  ? multiple
                    ? 'Upload more images'
                    : 'Change image'
                  : 'Click to upload'}
              </p>
              <p className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>
                PNG, JPG, WebP — max 10 MB
              </p>
            </div>
          </button>
        )}
      </CldUploadWidget>

      {/* Previews */}
      {images.length > 0 && (
        <div className={multiple ? 'grid grid-cols-4 gap-3' : ''}>
          {images.map((url, idx) => (
            <div
              key={url + idx}
              className="relative group rounded-lg overflow-hidden"
              style={{
                aspectRatio: '4/3',
                border: '1px solid #E2E8F0',
                ...(multiple ? {} : { maxWidth: '200px', aspectRatio: '4/3' }),
              }}
            >
              <img
                src={url}
                alt={`Upload ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(url)}
                className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                style={{ backgroundColor: '#EF4444' }}
              >
                <X className="w-3 h-3 text-white" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
