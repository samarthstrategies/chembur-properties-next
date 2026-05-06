"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: "📊" },
  { name: "All Properties", href: "/admin/properties", icon: "🏢" },
  { name: "Add Property", href: "/admin/properties/add", icon: "➕" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-navy min-h-screen flex flex-col fixed left-0 top-0 border-r border-navy-light/20 z-50">
      {/* Brand */}
      <div className="h-20 flex items-center px-6 border-b border-white/10">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="text-xl font-display text-white">Chembur</span>
          <span className="text-xl font-display font-bold text-gold">
            Admin
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-8 flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium ${
                isActive
                  ? "bg-gold/10 text-gold shadow-sm"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-white/50 hover:text-white hover:bg-white/5 transition-all"
        >
          <span>🌐</span>
          Back to Website
        </Link>
      </div>
    </aside>
  );
}
