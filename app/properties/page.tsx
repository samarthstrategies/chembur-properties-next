"use client";

import { useState, useMemo } from "react";
import PropertyCard from "@/components/PropertyCard";

// TODO (Aryesh): Replace this static array with a fetch from your property database
// Example: const properties = await fetch('/api/properties').then(r => r.json())
// Each property object should include all fields used below as data attributes for filtering
const ALL_PROPERTIES = [
  {
    code: "PSS-NEWPROJECT",
    title: "PSS New Project Chembur",
    location: "Chembur",
    price: "Price on Request",
    type: "residential" as const,
    transaction: "buy" as const,
    bhk: "Contact Us",
    area: "Contact Us",
    badge: "For Sale",
    badgeVariant: "default" as const,
    imgGradient: "linear-gradient(135deg, #0B1B3D 0%, #1A3A6E 45%, #0E2452 100%)",
    dataType: "residential",
    dataTransaction: "buy",
    dataBhk: "",
    dataPrice: "0",
    dataLocation: "chembur",
    isPremium: false,
  },
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
    dataType: "commercial",
    dataTransaction: "lease",
    dataPrice: "76000",
    dataLocation: "chembur",
    isPremium: false,
  },
  {
    code: "YELLOW-1BHK",
    title: "Yellow 1 BHK Flat",
    location: "Chembur",
    price: "₹50,000/mo",
    type: "residential" as const,
    transaction: "lease" as const,
    bhk: "1 BHK",
    area: "Contact Us",
    badge: "For Lease",
    badgeVariant: "rent" as const,
    imgGradient: "linear-gradient(135deg, #0B1B3D 0%, #1A3A6E 45%, #0E2452 100%)",
    dataType: "residential",
    dataTransaction: "lease",
    dataBhk: "1bhk",
    dataPrice: "50000",
    dataLocation: "chembur",
    isPremium: false,
  },
  {
    code: "FIESTA-2BHK",
    title: "Fiesta 2 BHK Flat",
    location: "Chembur",
    price: "₹90,000/mo",
    type: "residential" as const,
    transaction: "lease" as const,
    bhk: "2 BHK",
    area: "758 sq ft",
    badge: "For Lease",
    badgeVariant: "rent" as const,
    imgGradient: "linear-gradient(135deg, #0E2452 0%, #1A3A6E 45%, #071430 100%)",
    dataType: "residential",
    dataTransaction: "lease",
    dataBhk: "2bhk",
    dataPrice: "90000",
    dataLocation: "chembur",
    isPremium: false,
  },
  {
    code: "ORBIS-3BHK",
    title: "Orbis 3 BHK",
    location: "Chembur",
    price: "₹4.25 Cr",
    type: "residential" as const,
    transaction: "buy" as const,
    bhk: "3 BHK",
    area: "1100 sq ft",
    badge: "Premium",
    badgeVariant: "premium" as const,
    imgGradient: "linear-gradient(135deg, #0B1B3D 0%, #1A3A6E 45%, #0E2452 100%)",
    dataType: "residential",
    dataTransaction: "buy",
    dataBhk: "3bhk",
    dataPrice: "42500000",
    dataLocation: "chembur",
    isPremium: true,
  },
  {
    code: "ITSFAIR-2BHK",
    title: "Its Fair 2 BHK",
    location: "Chembur",
    price: "₹2.75 Cr",
    type: "residential" as const,
    transaction: "buy" as const,
    bhk: "2 BHK",
    area: "Contact Us",
    badge: "For Sale",
    badgeVariant: "default" as const,
    imgGradient: "linear-gradient(135deg, #0E2452 0%, #0B1B3D 45%, #1A3A6E 100%)",
    dataType: "residential",
    dataTransaction: "buy",
    dataBhk: "2bhk",
    dataPrice: "27500000",
    dataLocation: "chembur",
    isPremium: false,
  },
  {
    code: "SHANTI-1BHK",
    title: "Shanti CT 1 BHK",
    location: "Chembur",
    price: "₹1.25 Cr",
    type: "residential" as const,
    transaction: "buy" as const,
    bhk: "1 BHK",
    area: "Contact Us",
    badge: "For Sale",
    badgeVariant: "default" as const,
    imgGradient: "linear-gradient(135deg, #071430 0%, #0B1B3D 45%, #0E2452 100%)",
    dataType: "residential",
    dataTransaction: "buy",
    dataBhk: "1bhk",
    dataPrice: "12500000",
    dataLocation: "chembur",
    isPremium: false,
  },
  {
    code: "ADMAN-1BHK",
    title: "Adman 1 BHK Flat",
    location: "Chembur",
    price: "₹45,000/mo",
    type: "residential" as const,
    transaction: "lease" as const,
    bhk: "1 BHK",
    area: "Contact Us",
    badge: "For Lease",
    badgeVariant: "rent" as const,
    imgGradient: "linear-gradient(135deg, #0B1B3D 0%, #0E2452 45%, #1A3A6E 100%)",
    dataType: "residential",
    dataTransaction: "lease",
    dataBhk: "1bhk",
    dataPrice: "45000",
    dataLocation: "chembur",
    isPremium: false,
  },
  {
    code: "SABNIS-1BHK",
    title: "Sabnis SN 1 BHK",
    location: "Chembur",
    price: "₹1.15 Cr",
    type: "residential" as const,
    transaction: "buy" as const,
    bhk: "1 BHK",
    area: "438 sq ft",
    badge: "For Sale",
    badgeVariant: "default" as const,
    imgGradient: "linear-gradient(135deg, #0E2452 0%, #0B1B3D 45%, #1A3A6E 100%)",
    dataType: "residential",
    dataTransaction: "buy",
    dataBhk: "1bhk",
    dataPrice: "11500000",
    dataLocation: "chembur",
    isPremium: false,
  },
  {
    code: "HANUMAN-COMM",
    title: "Hanuman Office",
    location: "Chembur",
    price: "₹45,000/mo",
    type: "commercial" as const,
    transaction: "lease" as const,
    area: "300 sq ft",
    badge: "For Lease",
    badgeVariant: "commercial" as const,
    imgGradient: "linear-gradient(135deg, #071430 0%, #0E2452 45%, #0B1B3D 100%)",
    dataType: "commercial",
    dataTransaction: "lease",
    dataPrice: "45000",
    dataLocation: "chembur",
    isPremium: false,
  },
  {
    code: "SRIRAM-COMM",
    title: "Sriram Office",
    location: "Chembur",
    price: "₹1,40,000/mo",
    type: "commercial" as const,
    transaction: "lease" as const,
    area: "1119 sq ft",
    badge: "For Lease",
    badgeVariant: "commercial" as const,
    imgGradient: "linear-gradient(135deg, #0B1B3D 0%, #1A3A6E 45%, #0E2452 100%)",
    dataType: "commercial",
    dataTransaction: "lease",
    dataPrice: "140000",
    dataLocation: "chembur",
    isPremium: false,
  },
  {
    code: "SOMM-2BHK",
    title: "Somm 2 BHK",
    location: "Chembur",
    price: "₹65,000/mo",
    type: "residential" as const,
    transaction: "lease" as const,
    bhk: "2 BHK",
    area: "Contact Us",
    badge: "For Lease",
    badgeVariant: "rent" as const,
    imgGradient: "linear-gradient(135deg, #0E2452 0%, #1A3A6E 45%, #071430 100%)",
    dataType: "residential",
    dataTransaction: "lease",
    dataBhk: "2bhk",
    dataPrice: "65000",
    dataLocation: "chembur",
    isPremium: false,
  },
  {
    code: "KALPAK-3BHK",
    title: "Kalpak 3 BHK",
    location: "Chembur",
    price: "₹3.5 Cr",
    type: "residential" as const,
    transaction: "buy" as const,
    bhk: "3 BHK",
    area: "Contact Us",
    badge: "Premium",
    badgeVariant: "premium" as const,
    imgGradient: "linear-gradient(135deg, #071430 0%, #0B1B3D 45%, #0E2452 100%)",
    dataType: "residential",
    dataTransaction: "buy",
    dataBhk: "3bhk",
    dataPrice: "35000000",
    dataLocation: "chembur",
    isPremium: true,
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
    dataType: "commercial",
    dataTransaction: "lease",
    dataPrice: "300000",
    dataLocation: "chembur",
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
      <section className="relative bg-navy-gradient min-h-[44vh] flex items-center overflow-hidden pt-20 pb-12">
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
            <div>
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
