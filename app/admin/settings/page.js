'use client';
import { useState } from 'react';
import { Save, User, Globe, MessageSquare, Key } from 'lucide-react';
import toast from 'react-hot-toast';

function Card({ title, icon: Icon, children, onSave, saving }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden" style={{ border: '1px solid #E2E8F0' }}>
      <div className="px-6 py-4 flex items-center gap-3" style={{ borderBottom: '1px solid #F1F5F9' }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#F1F5F9' }}>
          <Icon className="w-4 h-4" style={{ color: '#64748B' }} />
        </div>
        <h3 className="font-semibold text-sm" style={{ color: '#0F172A' }}>{title}</h3>
      </div>
      <div className="p-6 space-y-4">
        {children}
        {onSave && (
          <div className="pt-2">
            <button onClick={onSave} disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg disabled:opacity-60"
              style={{ backgroundColor: '#0F172A', color: '#fff' }}>
              {saving ? '…' : <Save className="w-4 h-4" />}
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, hint, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-1.5" style={{ color: '#64748B' }}>{label}</label>
      {children}
      {hint && <p className="text-[11px] mt-1" style={{ color: '#94A3B8' }}>{hint}</p>}
    </div>
  );
}
function Input(props) {
  return <input className="w-full px-3 py-2.5 text-sm rounded-md border outline-none"
    style={{ borderColor: '#E2E8F0', color: '#0F172A' }}
    onFocus={(e) => (e.target.style.borderColor = '#0F172A')}
    onBlur={(e) => (e.target.style.borderColor = '#E2E8F0')} {...props} />;
}


export default function SettingsPage() {
  const [profile, setProfile] = useState({ name: '', email: '', currentPassword: '', newPassword: '', confirmPassword: '' });
  const [siteInfo, setSiteInfo] = useState({ siteName: 'ChemburProperties', phone: '', whatsapp: '', instagram: '', youtube: '' });
  const [unlockMessage, setUnlockMessage] = useState('Enter your details to watch the developer interview');
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingSite, setSavingSite] = useState(false);
  const [savingMsg, setSavingMsg] = useState(false);

  const handleSaveProfile = async () => {
    if (profile.newPassword && profile.newPassword !== profile.confirmPassword) {
      toast.error('Passwords do not match'); return;
    }
    setSavingProfile(true);
    await new Promise((r) => setTimeout(r, 800));
    toast.success('Profile updated (local only — connect to API)');
    setSavingProfile(false);
  };
  const handleSaveSite = async () => {
    setSavingSite(true);
    await new Promise((r) => setTimeout(r, 800));
    toast.success('Site info saved (local only — connect to API)');
    setSavingSite(false);
  };
  const handleSaveMsg = async () => {
    setSavingMsg(true);
    await new Promise((r) => setTimeout(r, 600));
    toast.success('Message saved');
    setSavingMsg(false);
  };

  return (
    <div className="max-w-2xl space-y-5">
      <div>
        <h2 className="font-bold text-lg" style={{ color: '#0F172A' }}>Settings</h2>
        <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>Manage admin profile and site configuration</p>
      </div>

      {/* Card 1 — Admin Profile */}
      <Card title="Admin Profile" icon={User} onSave={handleSaveProfile} saving={savingProfile}>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Name">
            <Input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} placeholder="Admin Name" />
          </Field>
          <Field label="Email">
            <Input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} placeholder="admin@example.com" />
          </Field>
        </div>
        <Field label="Current Password">
          <Input type="password" value={profile.currentPassword} onChange={(e) => setProfile({ ...profile, currentPassword: e.target.value })} placeholder="••••••••" />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="New Password">
            <Input type="password" value={profile.newPassword} onChange={(e) => setProfile({ ...profile, newPassword: e.target.value })} placeholder="••••••••" />
          </Field>
          <Field label="Confirm New Password">
            <Input type="password" value={profile.confirmPassword} onChange={(e) => setProfile({ ...profile, confirmPassword: e.target.value })} placeholder="••••••••" />
          </Field>
        </div>
      </Card>

      {/* Card 2 — Site Information */}
      <Card title="Site Information" icon={Globe} onSave={handleSaveSite} saving={savingSite}>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Site Name">
            <Input value={siteInfo.siteName} onChange={(e) => setSiteInfo({ ...siteInfo, siteName: e.target.value })} />
          </Field>
          <Field label="Contact Phone">
            <Input value={siteInfo.phone} onChange={(e) => setSiteInfo({ ...siteInfo, phone: e.target.value })} placeholder="+91 98765 43210" />
          </Field>
        </div>
        <Field label="WhatsApp Number" hint="Used for the WhatsApp CTA button">
          <Input value={siteInfo.whatsapp} onChange={(e) => setSiteInfo({ ...siteInfo, whatsapp: e.target.value })} placeholder="+91 98765 43210" />
        </Field>
        <Field label="Instagram URL">
          <Input value={siteInfo.instagram} onChange={(e) => setSiteInfo({ ...siteInfo, instagram: e.target.value })} placeholder="https://instagram.com/..." />
        </Field>
        <Field label="YouTube Channel URL">
          <Input value={siteInfo.youtube} onChange={(e) => setSiteInfo({ ...siteInfo, youtube: e.target.value })} placeholder="https://youtube.com/..." />
        </Field>
      </Card>

      {/* Card 3 — Lead Unlock Message */}
      <Card title="Lead Unlock Message" icon={MessageSquare} onSave={handleSaveMsg} saving={savingMsg}>
        <Field label="Message shown before podcast unlock form" hint="This encourages users to submit their contact info to unlock a video">
          <textarea value={unlockMessage} onChange={(e) => setUnlockMessage(e.target.value)} rows={3}
            className="w-full px-3 py-2.5 text-sm rounded-md border outline-none resize-none"
            style={{ borderColor: '#E2E8F0', color: '#0F172A' }} />
        </Field>
      </Card>

      {/* Card 4 — Environment Status */}
      <Card title="Cloudinary & Razorpay" icon={Key}>
        <p className="text-xs mb-4" style={{ color: '#64748B' }}>
          To update these keys, edit your <code className="bg-slate-100 px-1 py-0.5 rounded text-xs">.env.local</code> file and restart the server.
        </p>
        <div className="space-y-3">
          {[
            { label: 'Cloudinary Cloud Name', envKey: 'CLOUDINARY_CLOUD_NAME' },
            { label: 'Cloudinary API Key', envKey: 'CLOUDINARY_API_KEY' },
            { label: 'Cloudinary API Secret', envKey: 'CLOUDINARY_API_SECRET' },
            { label: 'Razorpay Key ID', envKey: 'RAZORPAY_KEY_ID' },
            { label: 'Razorpay Secret', envKey: 'RAZORPAY_KEY_SECRET' },
          ].map((item) => (
            <div key={item.envKey} className="flex items-center justify-between py-2.5 px-4 rounded-lg"
              style={{ backgroundColor: '#F8FAFC', border: '1px solid #F1F5F9' }}>
              <span className="text-sm" style={{ color: '#0F172A' }}>{item.label}</span>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-medium" style={{ color: '#94A3B8' }}>
                  {item.envKey}
                </span>
                <span className="text-xs font-semibold" style={{ color: '#94A3B8' }}>
                  (set in .env.local)
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
