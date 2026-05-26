'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import Sidebar from '@/components/admin/Sidebar';
import AdminHeader from '@/components/admin/Header';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);
  const [adminEmail, setAdminEmail] = useState('');

  useEffect(() => {
    if (pathname === '/admin/login') {
      setChecking(false);
      return;
    }
    fetch('/api/admin/auth/verify', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          router.replace(`/admin/login?redirect=${encodeURIComponent(pathname)}`);
        } else {
          setAdminEmail(data.data?.email || data.email || '');
          setChecking(false);
        }
      })
      .catch(() => {
        router.replace('/admin/login');
      });
  }, [pathname, router]);

  // Login page — render without chrome
  if (pathname === '/admin/login') {
    return (
      <>
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        {children}
      </>
    );
  }

  if (checking) {
    return (
      <div
        className="fixed inset-0 flex items-center justify-center"
        style={{ backgroundColor: '#F8FAFC' }}
      >
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: '#D4A017', borderTopColor: 'transparent' }}
          />
          <p className="text-sm" style={{ color: '#64748B' }}>
            Verifying session…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>
      <Sidebar />

      {/* Main area (offset by sidebar width) */}
      <div className="flex-1" style={{ marginLeft: '260px' }}>
        <AdminHeader adminEmail={adminEmail} />

        {/* Content below fixed header */}
        <main
          className="p-6"
          style={{ paddingTop: 'calc(64px + 24px)', minHeight: '100vh' }}
        >
          {children}
        </main>
      </div>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: { fontSize: '14px', fontWeight: '500' },
        }}
      />
    </div>
  );
}
