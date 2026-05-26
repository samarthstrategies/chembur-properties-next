'use client';
import { usePathname } from 'next/navigation';
import { Bell } from 'lucide-react';

const PAGE_TITLES = {
  '/admin/dashboard': 'Dashboard',
  '/admin/properties': 'All Properties',
  '/admin/properties/add': 'Add Property',
  '/admin/podcasts': 'All Podcasts',
  '/admin/podcasts/add': 'Add Podcast',
  '/admin/leads': 'Leads',
  '/admin/video-unlocks': 'Video Unlocks',
  '/admin/locations': 'Locations',
  '/admin/features': 'Features',
  '/admin/property-types': 'Property Types',
  '/admin/settings': 'Settings',
};

function getTitle(pathname) {
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname];
  if (pathname.includes('/properties/edit')) return 'Edit Property';
  if (pathname.includes('/podcasts/edit')) return 'Edit Podcast';
  return 'Admin Panel';
}

export default function AdminHeader({ adminEmail }) {
  const pathname = usePathname();
  const title = getTitle(pathname);
  const initials = adminEmail ? adminEmail[0].toUpperCase() : 'A';

  return (
    <header
      className="fixed top-0 right-0 z-40 flex items-center justify-between px-6"
      style={{
        left: '260px',
        height: '64px',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        boxShadow: '0 1px 4px rgba(15,23,42,0.05)',
      }}
    >
      {/* Page title */}
      <h1 className="font-semibold text-base" style={{ color: '#0F172A' }}>
        {title}
      </h1>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <button
          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-slate-100"
          style={{ color: '#64748B' }}
        >
          <Bell className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
            style={{ backgroundColor: '#0F172A', color: '#D4A017' }}
          >
            {initials}
          </div>
          <span className="text-sm font-medium hidden sm:block" style={{ color: '#64748B' }}>
            {adminEmail || 'Admin'}
          </span>
        </div>
      </div>
    </header>
  );
}
