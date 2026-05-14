"use client";

import { useState, useMemo } from "react";
import PropertyCard from "@/components/PropertyCard";

// TODO (Aryesh): Replace this static array with a fetch from your property database
// Example: const properties = await fetch('/api/properties').then(r => r.json())
// Each property object should include all fields used below as data attributes for filtering
const ALL_PROPERTIES = [
  {
    code: "SWANKY-COMM",
    title: "Swanky Office 430 SqFt",
    location: "Chembur",
    price: "₹76,000/mo",
    type: "commercial" as const,
    transaction: "lease" as const,
    area: "430 sq ft",
    badge: "For Lease",
    badgeVariant: "commercial" as const,
    imgGradient: "linear-gradient(135deg, #071430 0%, #0E2452 45%, #0B1B3D 100%)",
    imageUrl: "https://chemburproperties.com/wp-content/uploads/2026/04/IMG_7437-Large-2-1240x720.jpeg",
    dataType: "commercial",
    dataTransaction: "lease",
    dataPrice: "76000",
    dataLocation: "chembur",
    dataBhk: "",
    isPremium: false,
  },
  {
    code: "PRIDY-COMM",
    title: "Pridy Commercial",
    location: "Chembur",
    price: "₹3,00,000/mo",
    type: "commercial" as const,
    transaction: "lease" as const,
    area: "2100 sq ft",
    badge: "For Lease",
    badgeVariant: "commercial" as const,
    imgGradient: "linear-gradient(135deg, #0B1B3D 0%, #1A3A6E 45%, #0E2452 100%)",
    imageUrl: "https://chemburproperties.com/wp-content/uploads/2026/04/IMG_7427-Large-2-1240x720.jpeg",
    dataType: "commercial",
    dataTransaction: "lease",
    dataPrice: "300000",
    dataLocation: "chembur",
    dataBhk: "",
    isPremium: false,
  },
];

export default function PropertiesPage() {
  const [filterType, setFilterType] = useState("");
  const [filterTransaction, setFilterTransaction] = useState("");
  const [filterBudget, setFilterBudget] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterBhk, setFilterBhk] = useState("");

  const filtered = useMemo(() => {
    return ALL_PROPERTIES.filter((p) => {
      if (filterType && p.dataType !== filterType) return false;
      if (filterTransaction && p.dataTransaction !== filterTransaction) return false;
      if (filterLocation && p.dataLocation !== filterLocation) return false;
      if (filterBhk && p.dataBhk !== filterBhk) return false;
      if (filterBudget) {
        const price = parseFloat(p.dataPrice || "0");
        if (filterBudget === "under50l" && price >= 5000000) return false;
        if (filterBudget === "50l-1cr" && (price < 5000000 || price >= 10000000)) return false;
        if (filterBudget === "1cr-2cr" && (price < 10000000 || price >= 20000000)) return false;
        if (filterBudget === "2cr-5cr" && (price < 20000000 || price >= 50000000)) return false;
        if (filterBudget === "above5cr" && price < 50000000) return false;
      }
      return true;
    });
  }, [filterType, filterTransaction, filterBudget, filterLocation, filterBhk]);

  const premium = filtered.filter((p) => p.isPremium);
  const standard = filtered.filter((p) => !p.isPremium);

  const resetFilters = () => {
    setFilterType("");
    setFilterTransaction("");
    setFilterBudget("");
    setFilterLocation("");
    setFilterBhk("");
  };

  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy-gradient min-h-[44vh] flex items-center overflow-hidden pt-[120px] md:pt-[150px] pb-12">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-navy-light/20 blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-8xl mx-auto px-6 md:px-8 w-full">
          <p className="section-label text-gold">Roopam Estate Agency</p>
          <h1 className="font-display text-white text-[clamp(2rem,4vw,3.2rem)] mb-4">
            Our Property Portfolio
          </h1>
          <p className="text-white/55 text-base max-w-lg leading-relaxed">
            Carefully curated residential and commercial properties across
            Chembur and Mumbai. Updated regularly with new listings.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      {/* TODO (Aryesh): Connect filters to live database query — replace useMemo with API call */}
      <section className="bg-white py-8 border-b border-navy-100 sticky top-[66px] z-30 shadow-soft">
        <div className="max-w-8xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 items-end">
            {[
              {
                label: "Type",
                id: "type",
                value: filterType,
                onChange: setFilterType,
                options: [
                  { val: "", label: "All Types" },
                  { val: "residential", label: "Residential" },
                  { val: "commercial", label: "Commercial" },
                ],
              },
              {
                label: "Transaction",
                id: "transaction",
                value: filterTransaction,
                onChange: setFilterTransaction,
                options: [
                  { val: "", label: "Buy / Rent" },
                  { val: "buy", label: "Buy" },
                  { val: "rent", label: "Rent" },
                  { val: "lease", label: "Lease" },
                ],
              },
              {
                label: "Budget",
                id: "budget",
                value: filterBudget,
                onChange: setFilterBudget,
                options: [
                  { val: "", label: "Any Budget" },
                  { val: "under50l", label: "Under ₹50 Lakh" },
                  { val: "50l-1cr", label: "₹50L – ₹1 Cr" },
                  { val: "1cr-2cr", label: "₹1 Cr – ₹2 Cr" },
                  { val: "2cr-5cr", label: "₹2 Cr – ₹5 Cr" },
                  { val: "above5cr", label: "Above ₹5 Cr" },
                ],
              },
              {
                label: "Location",
                id: "location",
                value: filterLocation,
                onChange: setFilterLocation,
                options: [
                  { val: "", label: "All Areas" },
                  { val: "chembur", label: "Chembur" },
                  { val: "ghatkopar", label: "Ghatkopar" },
                  { val: "wadala", label: "Wadala" },
                  { val: "bkc", label: "BKC" },
                ],
              },
              {
                label: "BHK",
                id: "bhk",
                value: filterBhk,
                onChange: setFilterBhk,
                options: [
                  { val: "", label: "Any BHK" },
                  { val: "1bhk", label: "1 BHK" },
                  { val: "2bhk", label: "2 BHK" },
                  { val: "3bhk", label: "3 BHK" },
                  { val: "4bhk", label: "4 BHK+" },
                ],
              },
            ].map((f) => (
              <div key={f.id} className="flex flex-col gap-1.5">
                <label className="text-[0.65rem] font-bold tracking-widest uppercase text-slate-navy">
                  {f.label}
                </label>
                <select
                  value={f.value}
                  onChange={(e) => f.onChange(e.target.value)}
                  className="lux-select"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%230B1B3D' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 12px center",
                    paddingRight: "34px",
                  }}
                >
                  {f.options.map((o) => (
                    <option key={o.val} value={o.val}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            <button
              onClick={resetFilters}
              className="py-2.5 px-4 border border-navy-200 rounded text-sm text-slate-navy hover:border-navy hover:text-navy transition-all"
            >
              Reset
            </button>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="bg-surface-light py-16 md:py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-8">
          <p className="text-sm text-slate-navy mb-8">
            Showing{" "}
            <strong className="text-navy font-bold">{filtered.length}</strong>{" "}
            {filtered.length === 1 ? "property" : "properties"}
          </p>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">🔍</p>
              <h3 className="font-display text-navy text-xl mb-3">
                No properties match your filters
              </h3>
              <p className="text-slate-navy text-sm mb-6">
                Try adjusting your search criteria or{" "}
                <button
                  onClick={resetFilters}
                  className="text-navy font-semibold underline"
                >
                  reset filters
                </button>
              </p>
              <a
                href="https://wa.me/919820182285?text=Hi, I am looking for a property and need your help finding the right one."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold text-sm"
              >
                WhatsApp Us — We&apos;ll Find It For You
              </a>
            </div>
          )}

          {/* Premium Collection */}
          {premium.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center gap-5 mb-8">
                <h2 className="font-display text-navy text-[1.6rem] md:text-[1.9rem] whitespace-nowrap">
                  Premium Collections
                </h2>
                <div
                  className="flex-1 h-px"
                  style={{
                    background:
                      "linear-gradient(to right, #0B1B3D, rgba(11,27,61,0.08))",
                  }}
                />
                <span className="text-xs text-slate-navy whitespace-nowrap">
                  Above ₹3 Crore
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {premium.map((p) => (
                  <PropertyCard key={p.code} {...p} />
                ))}
              </div>
            </div>
          )}

          {/* Standard Listings */}
          {standard.length > 0 && (
            <div className="mb-20">
              <div className="flex items-center gap-5 mb-8">
                <h2 className="font-display text-navy text-[1.6rem] md:text-[1.9rem] whitespace-nowrap">
                  All Listings
                </h2>
                <div className="flex-1 h-px bg-navy-100" />
                <span className="text-xs text-slate-navy whitespace-nowrap">
                  All Budgets
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {standard.map((p) => (
                  <PropertyCard key={p.code} {...p} />
                ))}
              </div>
            </div>
          )}

          {/* Our Services Summary */}
          <div className="mb-20">
            <div className="flex items-center gap-5 mb-8">
              <h2 className="font-display text-navy text-[1.6rem] md:text-[1.9rem] whitespace-nowrap">
                Our Services
              </h2>
              <div className="flex-1 h-px bg-navy-100" />
              <span className="text-xs text-slate-navy whitespace-nowrap">
                Beyond Listings
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { icon: "🏠", title: "Buy & Sell", desc: "Residential and commercial transactions guided by 61 years of expertise." },
                { icon: "🔑", title: "Rent & Lease", desc: "Leave & License, commercial leasing, and verified tenant sourcing." },
                { icon: "🛡️", title: "Property Management", desc: "End-to-end absentee landlord and NRI concierge services." },
                { icon: "🏗️", title: "Redevelopment", desc: "Advisory for housing societies from consensus to builder selection." },
                { icon: "⚖️", title: "Legal & Registration", desc: "Stamp duty calculation, title clearance, and registration assistance." },
                { icon: "✈️", title: "NRI Concierge", desc: "Remote property sourcing, power of attorney, and tax advisory." },
              ].map((svc, i) => (
                <div key={i} className="bg-white border border-navy-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-3">{svc.icon}</div>
                  <h3 className="font-display text-navy text-lg mb-2">{svc.title}</h3>
                  <p className="text-slate-navy text-sm leading-relaxed">{svc.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-20 bg-navy rounded-2xl p-10 md:p-14 text-center">
            <h3 className="font-display text-white text-[1.5rem] md:text-[1.9rem] mb-3">
              Don&apos;t See What You&apos;re Looking For?
            </h3>
            <p className="text-white/50 text-sm max-w-md mx-auto mb-7 leading-relaxed">
              We have exclusive off-market listings and upcoming inventory not
              yet listed. WhatsApp us with your requirements for a personalised
              search.
            </p>
            <a
              href="https://wa.me/919820182285?text=Hi, I am looking for a property in Chembur. Can you help me find something that matches my requirements?"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold text-sm"
            >
              WhatsApp Your Requirements
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
