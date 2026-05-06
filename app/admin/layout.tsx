import { ReactNode } from "react";
import Sidebar from "@/components/admin/Sidebar";

export const metadata = {
  title: "Admin Panel | Chembur Properties",
  description: "Manage your real estate listings.",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-surface flex">
      {/* Sidebar is fixed, 64 = 16rem = 256px wide */}
      <Sidebar />
      
      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-8 min-h-screen bg-slate-50">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
