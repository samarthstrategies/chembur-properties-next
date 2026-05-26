'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Building2,
  Plus,
  Mic2,
  Users,
  Unlock,
  MapPin,
  Tag,
  FolderOpen,
  Settings,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const NAV_GROUPS = [
  {
    items: [{ href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' }],
  },
  {
    label: 'PROPERTIES',
    items: [
      { href: '/admin/properties', icon: Building2, label: 'All Properties' },
      { href: '/admin/properties/add', icon: Plus, label: 'Add Property' },
    ],
  },
  {
    label: 'CONTENT',
    items: [
      { href: '/admin/podcasts', icon: Mic2, label: 'All Podcasts' },
      { href: '/admin/podcasts/add', icon: Plus, label: 'Add Podcast' },
    ],
  },
  {
    label: 'CRM',
    items: [
      { href: '/admin/leads', icon: Users, label: 'Leads' },
      { href: '/admin/video-unlocks', icon: Unlock, label: 'Video Unlocks' },
    ],
  },
  {
    label: 'SETTINGS',
    items: [
      { href: '/admin/locations', icon: MapPin, label: 'Locations' },
      { href: '/admin/features', icon: Tag, label: 'Features' },
      { href: '/admin/property-types', icon: FolderOpen, label: 'Property Types' },
      { href: '/admin/settings', icon: Settings, label: 'Settings' },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const isActive = (href: string) => {
    if (href === '/admin/dashboard') return pathname === href;
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST', credentials: 'include' });
      toast.success('Logged out');
      router.push('/admin/login');
    } catch {
      toast.error('Logout failed');
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <aside
      className="fixed left-0 top-0 h-screen flex flex-col z-50 overflow-hidden"
      style={{ width: '260px', backgroundColor: '#0F172A' }}
    >
      {/* Logo */}
      <div className="px-5 py-5 flex-shrink-0" style={{ borderBottom: '1px solid #1E293B' }}>
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: '#D4A017' }}
          >
            <Building2 className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm leading-tight">ChemburProperties</p>
            <p className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>
              Admin Panel
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 overflow-y-auto scrollbar-hide">
        {NAV_GROUPS.map((group, gi) => (
          <div key={gi} className="mb-1">
            {group.label && (
              <p
                className="text-[10px] font-semibold tracking-widest uppercase px-5 pt-4 pb-1.5"
                style={{ color: '#475569' }}
              >
                {group.label}
              </p>
            )}
            {group.items.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 mx-3 px-3 py-2.5 rounded-md transition-all duration-150 group"
                  style={{
                    backgroundColor: active ? '#1E293B' : 'transparent',
                    color: active ? '#FFFFFF' : '#94A3B8',
                    borderLeft: active ? '3px solid #D4A017' : '3px solid transparent',
                  }}
                >
                  <item.icon
                    className="w-4 h-4 flex-shrink-0 transition-colors"
                    style={{ color: active ? '#D4A017' : '#94A3B8' }}
                  />
                  <span className="text-sm font-medium flex-1">{item.label}</span>
                  {active && (
                    <ChevronRight className="w-3 h-3 opacity-40" style={{ color: '#D4A017' }} />
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer — Logout */}
      <div className="p-3 flex-shrink-0" style={{ borderTop: '1px solid #1E293B' }}>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-150 hover:bg-slate-800 disabled:opacity-60"
          style={{ color: '#94A3B8' }}
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm">{loggingOut ? 'Logging out…' : 'Logout'}</span>
        </button>
      </div>
    </aside>
  );
}
