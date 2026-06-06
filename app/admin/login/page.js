'use client';
import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Building2, Eye, EyeOff, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/admin/dashboard';

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Welcome back!');
        router.push(redirect);
      } else {
        toast.error(data.message || 'Invalid email or password');
      }
    } catch {
      toast.error('Connection error, please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: '#0F172A' }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'radial-gradient(circle at 25% 25%, #D4A017 0%, transparent 50%), radial-gradient(circle at 75% 75%, #D4A017 0%, transparent 50%)',
        }}
      />

      <div className="relative w-full max-w-sm">
        {/* Card */}
        <div
          className="bg-white rounded-2xl p-8 shadow-2xl"
          style={{ boxShadow: '0 25px 60px rgba(0,0,0,0.4)' }}
        >
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
              style={{ backgroundColor: '#0F172A' }}
            >
              <Building2 className="w-7 h-7" style={{ color: '#D4A017' }} />
            </div>
            <h1 className="font-bold text-xl" style={{ color: '#0F172A' }}>
              ChemburProperties.com
            </h1>
            <p className="text-sm mt-1" style={{ color: '#64748B' }}>
              Admin Panel — Sign in to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: '#64748B' }}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="admin@example.com"
                required
                className="w-full px-4 py-3 rounded-lg text-sm border outline-none transition-all"
                style={{
                  borderColor: '#E2E8F0',
                  color: '#0F172A',
                  backgroundColor: '#F8FAFC',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#0F172A')}
                onBlur={(e) => (e.target.style.borderColor = '#E2E8F0')}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: '#64748B' }}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 pr-11 rounded-lg text-sm border outline-none transition-all"
                  style={{
                    borderColor: '#E2E8F0',
                    color: '#0F172A',
                    backgroundColor: '#F8FAFC',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#0F172A')}
                  onBlur={(e) => (e.target.style.borderColor = '#E2E8F0')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: '#94A3B8' }}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-sm transition-all mt-6 disabled:opacity-70"
              style={{ backgroundColor: '#D4A017', color: '#fff' }}
              onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#B8860B')}
              onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#D4A017')}
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: '#475569' }}>
          © {new Date().getFullYear()} ChemburProperties — Secured Admin Access
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0F172A' }}>
          <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: '#D4A017', borderTopColor: 'transparent' }} />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
