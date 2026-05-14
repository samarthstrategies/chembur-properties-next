"use client";

import Link from "next/link";
import { useState } from "react";

type Property = {
  id: number;
  title: string;
  location: string;
  type: string;
  transaction: string;
  price: string;
  status: string;
};

const initialProperties: Property[] = [
  { id: 1, title: "Swanky Office 430 SqFt", location: "Chembur", type: "Commercial", transaction: "Lease", price: "₹76,000/mo", status: "Active" },
  { id: 2, title: "Pridy Commercial", location: "Chembur", type: "Commercial", transaction: "Lease", price: "₹3,00,000/mo", status: "Active" },
];

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editingProp, setEditingProp] = useState<Property | null>(null);
  const [editForm, setEditForm] = useState<Property | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ── DELETE ──
  const handleDeleteConfirm = () => {
    if (deleteId == null) return;
    setProperties((prev) => prev.filter((p) => p.id !== deleteId));
    setDeleteId(null);
    showToast("Property deleted successfully.");
  };

  // ── EDIT ──
  const openEdit = (prop: Property) => {
    setEditingProp(prop);
    setEditForm({ ...prop });
  };

  const handleEditSave = () => {
    if (!editForm) return;
    setIsSaving(true);
    // Simulate brief async save
    setTimeout(() => {
      setProperties((prev) =>
        prev.map((p) => (p.id === editForm.id ? { ...editForm } : p))
      );
      setEditingProp(null);
      setEditForm(null);
      setIsSaving(false);
      showToast("Property updated successfully.");
    }, 600);
  };

  const handleEditChange = (field: keyof Property, value: string) => {
    setEditForm((prev) => prev ? { ...prev, [field]: value } : prev);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 relative">

      {/* ── TOAST ── */}
      {toast && (
        <div className={`fixed top-6 right-6 z-[200] px-5 py-3 rounded-xl shadow-2xl text-sm font-semibold flex items-center gap-3 transition-all ${
          toast.type === "success" ? "bg-emerald-600 text-white" : "bg-red-600 text-white"
        }`}>
          <span>{toast.type === "success" ? "✅" : "❌"}</span>
          {toast.msg}
        </div>
      )}

      {/* ── HEADER ── */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-navy mb-2">All Properties</h1>
          <p className="text-slate-500">
            Manage your active and draft property listings. ({properties.length} total)
          </p>
        </div>
        <Link
          href="/admin/properties/add"
          className="bg-navy text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-navy-rich transition-all flex items-center gap-2 shadow-sm"
        >
          <span>➕</span> Add New Property
        </Link>
      </div>

      {/* ── TABLE ── */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        {properties.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <p className="text-4xl mb-4">🏘️</p>
            <p className="font-semibold text-navy">No properties yet</p>
            <p className="text-sm mt-1">Add your first listing to get started.</p>
          </div>
        ) : (
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
                      <p className="text-sm text-slate-600">{prop.type} • {prop.transaction}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-navy">{prop.price}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-[0.65rem] font-bold uppercase tracking-wider ${
                        prop.status === "Active"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-600"
                      }`}>
                        {prop.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEdit(prop)}
                          className="p-2 text-slate-400 hover:text-navy transition-colors rounded-md hover:bg-slate-100"
                          title="Edit property"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => setDeleteId(prop.id)}
                          className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-md hover:bg-red-50"
                          title="Delete property"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── DELETE CONFIRMATION MODAL ── */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="text-5xl mb-4">🗑️</div>
            <h2 className="text-xl font-display font-bold text-navy mb-2">Delete Property?</h2>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
              Are you sure you want to delete{" "}
              <strong className="text-navy">{properties.find((p) => p.id === deleteId)?.title}</strong>?
              This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setDeleteId(null)}
                className="px-5 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-5 py-2.5 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-all shadow-sm"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── EDIT MODAL ── */}
      {editingProp && editForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-7 pt-6 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-display font-bold text-navy">Edit Property</h2>
                <p className="text-sm text-slate-400 mt-0.5">{editingProp.title}</p>
              </div>
              <button
                onClick={() => { setEditingProp(null); setEditForm(null); }}
                className="text-slate-400 hover:text-navy transition-colors text-2xl leading-none"
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-7 py-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Property Title *</label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => handleEditChange("title", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-navy focus:ring-2 focus:ring-navy/15 outline-none transition-all text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Location *</label>
                  <input
                    type="text"
                    value={editForm.location}
                    onChange={(e) => handleEditChange("location", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-navy focus:ring-2 focus:ring-navy/15 outline-none transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Price *</label>
                  <input
                    type="text"
                    value={editForm.price}
                    onChange={(e) => handleEditChange("price", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-navy focus:ring-2 focus:ring-navy/15 outline-none transition-all text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Type</label>
                  <select
                    value={editForm.type}
                    onChange={(e) => handleEditChange("type", e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-200 focus:border-navy focus:ring-2 focus:ring-navy/15 outline-none transition-all text-sm bg-white"
                  >
                    <option>Residential</option>
                    <option>Commercial</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Transaction</label>
                  <select
                    value={editForm.transaction}
                    onChange={(e) => handleEditChange("transaction", e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-200 focus:border-navy focus:ring-2 focus:ring-navy/15 outline-none transition-all text-sm bg-white"
                  >
                    <option>Buy</option>
                    <option>Lease</option>
                    <option>Rent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Status</label>
                  <select
                    value={editForm.status}
                    onChange={(e) => handleEditChange("status", e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-200 focus:border-navy focus:ring-2 focus:ring-navy/15 outline-none transition-all text-sm bg-white"
                  >
                    <option>Active</option>
                    <option>Draft</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 px-7 py-5 bg-slate-50/80 border-t border-slate-100 rounded-b-2xl">
              <button
                onClick={() => { setEditingProp(null); setEditForm(null); }}
                className="px-5 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-100 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                disabled={isSaving}
                className="px-6 py-2.5 rounded-lg bg-navy text-white text-sm font-semibold hover:bg-navy-rich transition-all shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
