import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-navy mb-2">
            Dashboard Overview
          </h1>
          <p className="text-slate-500">
            Welcome back to the Chembur Properties Admin Panel.
          </p>
        </div>
        <Link
          href="/admin/properties/add"
          className="bg-navy text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-navy-rich transition-all flex items-center gap-2 shadow-sm"
        >
          <span>➕</span> Add New Property
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Total Properties
          </p>
          <p className="text-4xl font-display font-bold text-navy">14</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Properties For Sale
          </p>
          <p className="text-4xl font-display font-bold text-navy">6</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Properties For Lease
          </p>
          <p className="text-4xl font-display font-bold text-navy">8</p>
        </div>
      </div>

      {/* Recent Activity placeholder */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-lg font-semibold text-navy">Quick Tips</h2>
        </div>
        <div className="p-6">
          <ul className="space-y-4 text-slate-600">
            <li className="flex items-start gap-3">
              <span className="text-gold">✨</span>
              <span>Use high-quality images to increase inquiry rates by up to 40%.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold">✨</span>
              <span>Keep property titles descriptive and concise (e.g., &quot;Kalpak 3 BHK&quot;).</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold">✨</span>
              <span>Highlight &quot;Premium&quot; properties using the badge feature when adding a property.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
