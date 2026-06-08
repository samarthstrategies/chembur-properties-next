/**
 * Format a number as Indian currency with ₹ symbol
 * e.g. 3750000 → ₹37,50,000
 */
export function formatPrice(value) {
  if (value === null || value === undefined || value === '') return '—';
  const num = Number(value);
  if (isNaN(num)) return '—';
  if (num === 0) return '₹0';
  return '₹' + num.toLocaleString('en-IN');
}

/**
 * Format a date as DD/MM/YYYY
 */
export function formatDate(date) {
  if (!date) return '—';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '—';
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Format a date as DD/MM/YYYY HH:MM
 */
export function formatDateTime(date) {
  if (!date) return '—';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '—';
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

/**
 * Extract YouTube video ID from URL
 */
export function getYouTubeId(url) {
  if (!url) return null;
  const regex =
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

/**
 * Get YouTube thumbnail URL
 */
export function getYouTubeThumbnail(url) {
  const id = getYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : null;
}

/**
 * Generate a URL-safe slug from text
 */
export function autoSlugify(text) {
  if (!text) return '';
  const slug = text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
    
  // Prevent empty slugs if user only types symbols like "-"
  return slug || `property-${Date.now().toString().slice(-6)}`;
}

/**
 * Generic admin API fetch — always sends credentials (JWT cookie)
 * Redirects to login on 401.
 */
export async function apiFetch(url, options = {}) {
  const isFormData = options.body instanceof FormData;
  const config = {
    credentials: 'include',
    ...options,
    headers: {
      ...(!isFormData ? { 'Content-Type': 'application/json' } : {}),
      ...(options.headers || {}),
    },
  };
  const res = await fetch(url, config);
  if (res.status === 401) {
    if (typeof window !== 'undefined') {
      window.location.href = '/admin/login';
    }
    throw new Error('Unauthorized');
  }
  const data = await res.json();
  return { ...data, _status: res.status };
}

/**
 * Lead status badge colors
 */
export function getLeadStatusColor(status) {
  const map = {
    New: { bg: '#EFF6FF', text: '#1D4ED8', border: '#BFDBFE' },
    Contacted: { bg: '#FEFCE8', text: '#A16207', border: '#FEF08A' },
    Converted: { bg: '#F0FDF4', text: '#15803D', border: '#BBF7D0' },
    'Not Interested': { bg: '#FEF2F2', text: '#B91C1C', border: '#FECACA' },
  };
  return map[status] || { bg: '#F1F5F9', text: '#475569', border: '#E2E8F0' };
}

/**
 * Access type badge colors
 */
export function getAccessTypeColor(type) {
  if (type === 'free') return { bg: '#F0FDF4', text: '#15803D', border: '#BBF7D0' };
  if (type === 'paid') return { bg: '#FFFBEB', text: '#92400E', border: '#FDE68A' };
  // lead_unlock
  return { bg: '#EFF6FF', text: '#1D4ED8', border: '#BFDBFE' };
}

/**
 * Toggle an item in/out of an array
 */
export function toggleArrayItem(arr, item) {
  return arr.includes(item) ? arr.filter((v) => v !== item) : [...arr, item];
}
