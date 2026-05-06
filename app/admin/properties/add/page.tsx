"use client";

import Link from "next/link";
import { useState } from "react";

export default function AddPropertyPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Property added successfully! (UI Simulation)");
    }, 1000);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
      <div className="mb-8">
        <Link
          href="/admin/properties"
          className="text-sm font-semibold text-slate-400 hover:text-navy transition-colors mb-4 inline-block"
        >
          ← Back to Properties
        </Link>
        <h1 className="text-3xl font-display font-bold text-navy mb-2">
          Add New Property
        </h1>
        <p className="text-slate-500">
          Fill in the details below to publish a new listing to your website.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 space-y-8">
          
          {/* Basic Info */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-navy border-b border-slate-100 pb-2">Basic Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Property Title *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Kalpak 3 BHK Premium"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Location *</label>
                <input
                  required
                  type="text"
                  defaultValue="Chembur"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Price *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. ₹3.5 Cr or ₹75,000/mo"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all text-sm"
                />
              </div>
            </div>
          </div>

          {/* Categorization */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-navy border-b border-slate-100 pb-2">Categorization</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Transaction Type *</label>
                <select className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all text-sm bg-white">
                  <option value="buy">For Sale (Buy)</option>
                  <option value="lease">For Lease (Rent)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Property Type *</label>
                <select className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all text-sm bg-white">
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Badge Highlight</label>
                <select className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all text-sm bg-white">
                  <option value="default">Default (For Sale)</option>
                  <option value="rent">Rent / Lease</option>
                  <option value="premium">Premium Property</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-navy border-b border-slate-100 pb-2">Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Configuration (BHK)</label>
                <input
                  type="text"
                  placeholder="e.g. 3 BHK (Leave blank for commercial)"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Carpet Area</label>
                <input
                  type="text"
                  placeholder="e.g. 1100 sq ft"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all text-sm"
                />
              </div>
            </div>
          </div>

          {/* Media */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-navy border-b border-slate-100 pb-2">Media</h2>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Image URL</label>
              <input
                type="url"
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all text-sm"
              />
              <p className="text-xs text-slate-400 mt-2">Provide a high-resolution image link. In the future, this will be an image upload field.</p>
            </div>
          </div>

        </div>

        {/* Form Actions */}
        <div className="bg-slate-50/80 px-8 py-5 border-t border-slate-100 flex items-center justify-end gap-4">
          <Link
            href="/admin/properties"
            className="text-sm font-semibold text-slate-500 hover:text-navy transition-colors px-4 py-2"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-navy text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-navy-rich transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
          >
            {isSubmitting ? "Publishing..." : "Publish Property"}
          </button>
        </div>
      </form>
    </div>
  );
}
