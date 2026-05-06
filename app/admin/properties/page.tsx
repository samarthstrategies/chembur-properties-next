"use client";

import Link from "next/link";
import { useState } from "react";

// Mock data for UI demonstration
const mockProperties = [
  { id: 1, title: "Kalpak 3 BHK", location: "Chembur", type: "Residential", transaction: "Buy", price: "₹3.5 Cr", status: "Active" },
  { id: 2, title: "Swanky Office 430 SqFt", location: "Chembur", type: "Commercial", transaction: "Lease", price: "₹76,000/mo", status: "Active" },
  { id: 3, title: "Orbis 3 BHK", location: "Chembur", type: "Residential", transaction: "Buy", price: "₹4.25 Cr", status: "Active" },
  { id: 4, title: "Pridy Commercial", location: "Chembur", type: "Commercial", transaction: "Lease", price: "₹3,00,000/mo", status: "Draft" },
];

export default function AdminPropertiesPage() {
  const [properties] = useState(mockProperties);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-navy mb-2">
            All Properties
          </h1>
          <p className="text-slate-500">
            Manage your active and draft property listings.
          </p>
        </div>
        <Link
          href="/admin/properties/add"
          className="bg-navy text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-navy-rich transition-all flex items-center gap-2 shadow-sm"
        >
          <span>➕</span> Add New Property
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Property</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {properties.map((prop) => (
                <tr key={prop.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-navy text-sm">{prop.title}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-600">{prop.location}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-600">
                      {prop.type} • {prop.transaction}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-navy">{prop.price}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-[0.65rem] font-bold uppercase tracking-wider ${
                        prop.status === "Active"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {prop.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-navy transition-colors rounded-md hover:bg-slate-100" title="Edit">
                        ✏️
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-md hover:bg-red-50" title="Delete">
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
