"use client";

import { useState, useEffect } from "react";
import PropertyCard from "@/components/PropertyCard";

export default function PropertiesPage() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterTransaction, setFilterTransaction] = useState("");
  const [filterBudget, setFilterBudget] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterBhk, setFilterBhk] = useState("");
  const [isWinGold, setIsWinGold] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalDocs, setTotalDocs] = useState(0);

  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [search, filterType, filterTransaction, filterBudget, filterLocation, filterBhk, isWinGold, isPremium]);

  useEffect(() => {
    async function fetchProps() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("limit", "12");
        if (search) params.append("search", search);
        if (filterType === "residential") params.append("category", "Residential");
        if (filterType === "commercial") params.append("category", "Commercial");
        if (filterTransaction === "buy") params.append("type", "Buy,For Sale");
        if (filterTransaction === "rent") params.append("type", "Lease,For Rent,For Lease,Shop on Rent");
        if (filterTransaction === "lease") params.append("type", "Lease,For Rent,For Lease,Shop on Rent");
        if (filterLocation) params.append("location", filterLocation);
        
        if (filterBhk === "1bhk") params.append("bedrooms", "1");
        if (filterBhk === "2bhk") params.append("bedrooms", "2");
        if (filterBhk === "3bhk") params.append("bedrooms", "3");
        if (filterBhk === "4bhk") params.append("bedrooms", "4");

        if (isWinGold) params.append("isWinGold", "true");
        if (isPremium) params.append("isPremium", "true");
        
        if (filterBudget) {
          if (filterBudget === "under50l") params.append("maxPrice", "5000000");
          if (filterBudget === "50l-1cr") { params.append("minPrice", "5000000"); params.append("maxPrice", "10000000"); }
          if (filterBudget === "1cr-2cr") { params.append("minPrice", "10000000"); params.append("maxPrice", "20000000"); }
          if (filterBudget === "2cr-5cr") { params.append("minPrice", "20000000"); params.append("maxPrice", "50000000"); }
          if (filterBudget === "above5cr") params.append("minPrice", "50000000");
        }

        const res = await fetch(`/api/properties?${params.toString()}`);
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        
        const items = Array.isArray(data.data?.properties) ? data.data.properties : Array.isArray(data.properties) ? data.properties : Array.isArray(data) ? data : [];
        setProperties(items);
        setTotalPages(data.totalPages || 1);
        setTotalDocs(data.totalDocs || items.length);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProps();
  }, [search, filterType, filterTransaction, filterBudget, filterLocation, filterBhk, isWinGold, isPremium, page]);

  const resetFilters = () => {
    setSearch("");
    setFilterType("");
    setFilterTransaction("");
    setFilterBudget("");
    setFilterLocation("");
    setFilterBhk("");
    setIsWinGold(false);
    setIsPremium(false);
  };

  const renderCard = (prop: any) => {
    const isLease = prop.propertyStatus?.some((s: string) => ['Lease', 'For Rent', 'For Lease', 'Shop on Rent'].includes(s));
    const transaction = isLease ? "lease" : "buy";
    const priceVal = transaction === 'buy' ? prop.pricing?.salePrice : prop.pricing?.rentPrice;
    const fallbackPrice = prop.pricing?.expectedPrice || 0;
    const formattedPrice = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(priceVal || fallbackPrice);

    let badge = transaction === 'buy' ? "For Sale" : "For Lease";
    let badgeVariant: any = "default";
    
    if (prop.badges?.isWinGold) {
      badge = "★ Win Gold";
      badgeVariant = "premium";
    } else if (prop.badges?.isPremium) {
      badge = "💎 Premium";
      badgeVariant = "premium";
    } else if (transaction === 'lease') {
      badgeVariant = "rent";
    }

    return (
      <PropertyCard
        key={prop._id || prop.slug}
        code={prop.slug || "PROP"}
        title={prop.title || "Property Title"}
        location={Array.isArray(prop.location) ? prop.location[0] : prop.location || "Chembur"}
        price={formattedPrice}
        priceNote={prop.badges?.isWinGold && prop.winGoldDetails ? prop.winGoldDetails : (prop.badges?.isWinGold ? "🥇 1 gram gold on booking" : undefined)}
        type={prop.category === "Commercial" ? "commercial" : "residential"}
        transaction={transaction}
        bhk={prop.specs?.bedrooms ? `${prop.specs.bedrooms} BHK` : undefined}
        area={prop.specs?.carpetArea ? `${prop.specs.carpetArea} sq ft` : ""}
        badge={badge}
        badgeVariant={badgeVariant}
        imgGradient="linear-gradient(135deg, #071430 0%, #0E2452 45%, #0B1B3D 100%)"
        imageUrl={prop.media?.featuredImage || "/images/placeholder.jpg"}
      />
    );
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
      <section className="bg-white py-8 border-b border-navy-100 sticky top-[66px] z-30 shadow-soft">
        <div className="max-w-8xl mx-auto px-6 md:px-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="flex-1 max-w-xl">
                <label className="text-[0.65rem] font-bold tracking-widest uppercase text-slate-navy block mb-1.5">
                  Search
                </label>
                <input
                  type="text"
                  placeholder="Search by keyword, building, or area..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="lux-input w-full"
                />
              </div>
            </div>
            
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
                    { val: "Chembur", label: "Chembur" },
                    { val: "Ghatkopar", label: "Ghatkopar" },
                    { val: "Wadala", label: "Wadala" },
                    { val: "BKC", label: "BKC" },
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
                className="py-2.5 px-4 border border-navy-200 rounded text-sm text-slate-navy hover:border-navy hover:text-navy transition-all h-[42px]"
              >
                Reset
              </button>
            </div>

            <div className="flex items-center gap-6 mt-1">
              <label className="flex items-center gap-2 text-sm text-slate-navy cursor-pointer hover:text-navy font-semibold">
                <input type="checkbox" checked={isWinGold} onChange={(e) => setIsWinGold(e.target.checked)} className="rounded border-navy-200 w-4 h-4 text-[#C9A84C] focus:ring-[#C9A84C]" />
                🥇 Win Gold Projects
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-navy cursor-pointer hover:text-navy font-semibold">
                <input type="checkbox" checked={isPremium} onChange={(e) => setIsPremium(e.target.checked)} className="rounded border-navy-200 w-4 h-4 text-purple-600 focus:ring-purple-600" />
                💎 Premium Collection
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="bg-surface-light py-16 md:py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-8">
          <p className="text-sm text-slate-navy mb-8">
            Showing{" "}
            <strong className="text-navy font-bold">{loading ? "..." : totalDocs}</strong>{" "}
            properties
          </p>

          {!loading && properties.length === 0 && (
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
                className="btn-gold text-sm inline-block"
              >
                WhatsApp Us — We&apos;ll Find It For You
              </a>
            </div>
          )}

          {/* Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              [1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="w-full h-[380px] bg-navy/5 animate-pulse rounded-2xl border border-navy/10" />
              ))
            ) : (
              properties.map(renderCard)
            )}
          </div>

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="mt-16 flex justify-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
                className="px-4 py-2 rounded-md border border-navy-200 bg-white disabled:opacity-50 text-sm font-medium hover:bg-navy/5 transition-colors"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-10 h-10 rounded-md text-sm font-medium transition-all ${page === i + 1 ? 'bg-navy text-white shadow-md' : 'bg-white border border-navy-200 hover:bg-navy/5'}`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                disabled={page === totalPages}
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                className="px-4 py-2 rounded-md border border-navy-200 bg-white disabled:opacity-50 text-sm font-medium hover:bg-navy/5 transition-colors"
              >
                Next
              </button>
            </div>
          )}

          {/* Our Services Summary */}
          <div className="my-24">
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
          <div className="mt-12 bg-navy rounded-2xl p-10 md:p-14 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
            <div className="relative z-10">
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
                className="btn-gold text-sm inline-block shadow-lg"
              >
                WhatsApp Your Requirements
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
