"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// ── Types ──────────────────────────────────────────────────────────────────────
type Transaction = "buy" | "lease";
type SubCategory = "projects" | "wingold";

interface Listing {
  id: string;
  slug?: string;
  title: string;
  location: string;
  price: string;
  area: string;
  imageUrl: string;
  transaction: Transaction;
  isWinGold?: boolean;
  beds?: string;
}

// ── Property Card ───────────────────────────────────────────────────────────────
function ShowcaseCard({ listing }: { listing: Listing }) {
  return (
    <div className="flex-shrink-0 w-[280px] md:w-[300px] bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border border-navy/5">
      {/* Image */}
      <div className="relative h-[175px] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={listing.imageUrl || "/images/placeholder.jpg"}
          alt={listing.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 bg-navy/5"
        />
        {/* Overlay badges */}
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          <span className={`text-[0.65rem] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide ${listing.transaction === "buy"
              ? "bg-navy text-white"
              : "bg-[#0B1B3D]/80 text-white backdrop-blur-sm"
            }`}>
            {listing.transaction === "buy" ? "For Buy" : "For Lease"}
          </span>
          {listing.isWinGold && (
            <span className="text-[0.65rem] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide bg-[#C9A84C] text-white flex items-center gap-1">
              ★ Win Gold
            </span>
          )}
        </div>
        {listing.beds && (
          <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white text-[0.7rem] font-semibold px-2.5 py-1 rounded-lg">
            {listing.beds}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display text-navy text-[0.95rem] font-semibold leading-snug mb-1 line-clamp-2">
          {listing.title}
        </h3>
        <p className="text-[0.75rem] text-slate-500 flex items-center gap-1 mb-3">
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-slate-400 flex-shrink-0" aria-hidden="true">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          {listing.location}
        </p>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-display text-navy text-[1.05rem] font-bold leading-none">{listing.price}</p>
            <p className="text-[0.7rem] text-slate-400 mt-0.5">{listing.area}</p>
          </div>
          <Link
            href={`/properties/${listing.slug || ''}`}
            className="text-[0.72rem] font-bold text-navy border border-navy/20 px-3 py-1.5 rounded-full hover:bg-navy hover:text-white transition-all duration-200"
          >
            View →
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Column Component ────────────────────────────────────────────────────────────
function ListingColumn({
  title,
  category,
  accentColor,
}: {
  title: "Residential" | "Commercial";
  category: "Residential" | "Commercial";
  accentColor: string;
}) {
  const [transaction, setTransaction] = useState<Transaction>("buy");
  const [subCat, setSubCat] = useState<SubCategory>("projects");
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  const handleTransactionChange = (t: Transaction) => {
    setTransaction(t);
    if (t === "lease" && subCat === "wingold") {
      setSubCat("projects");
    }
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        let url = `/api/properties?category=${category}&limit=6`;
        if (subCat === "wingold") {
          url += "&isWinGold=true";
        } else {
          url += `&type=${transaction === "buy" ? "Buy,For Sale" : "Lease,For Rent,For Lease,Shop on Rent"}`;
        }

        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();

        const items = Array.isArray(data.data?.properties) ? data.data.properties : Array.isArray(data.data) ? data.data : Array.isArray(data.properties) ? data.properties : Array.isArray(data) ? data : [];

        const mappedListings: Listing[] = items.map((item: any) => {
          const isLease = item.propertyStatus?.some((s: string) => ['Lease', 'For Rent', 'For Lease', 'Shop on Rent'].includes(s));
          const currentTx = isLease ? 'lease' : 'buy';
          const priceVal = currentTx === 'buy' ? item.pricing?.salePrice : item.pricing?.rentPrice;
          const fallbackPrice = item.pricing?.expectedPrice || 0;
          const finalPrice = priceVal || fallbackPrice;
          const formattedPrice = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(finalPrice);

          return {
            id: item._id || item.slug || Math.random().toString(),
            slug: item.slug,
            title: item.title || "",
            location: Array.isArray(item.location) ? item.location[0] : item.location || "",
            price: formattedPrice,
            area: item.specs?.carpetArea ? `${item.specs.carpetArea} sq ft` : "",
            imageUrl: item.media?.featuredImage || "",
            transaction: currentTx,
            isWinGold: item.badges?.isWinGold || false,
            beds: item.specs?.bedrooms ? `${item.specs.bedrooms} BHK` : "",
          };
        });

        setListings(mappedListings);
      } catch (err) {
        console.error(err);
        setListings([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [category, transaction, subCat]);

  return (
    <div className="flex flex-col">
      {/* Column Header */}
      <div className="mb-5">
        <span className={`text-[0.68rem] font-bold tracking-[0.2em] uppercase ${accentColor} mb-1 block`}>
          {title === "Residential" ? "Homes & Flats" : "Offices & Shops"}
        </span>
        <h3 className="font-display text-white text-[1.4rem] md:text-[1.7rem]">
          {title}
        </h3>
      </div>

      {/* Transaction Filter (sticky within column) */}
      <div className="flex gap-1 p-1 bg-white/10 rounded-xl w-fit mb-4">
        {(["buy", "lease"] as Transaction[]).map((t) => (
          <button
            key={t}
            onClick={() => handleTransactionChange(t)}
            className={`px-5 py-2 rounded-lg text-[0.8rem] font-semibold transition-all duration-200 capitalize ${transaction === t
                ? "bg-white text-[#0B1B3D] shadow-md"
                : "text-white/70 hover:text-white"
              }`}
          >
            {t === "buy" ? "Buy" : "Lease"}
          </button>
        ))}
      </div>

      {/* Sub-category Toggle */}
      <div className="flex gap-3 mb-5">
        <button
          onClick={() => setSubCat("projects")}
          className={`flex items-center gap-1.5 text-[0.78rem] font-semibold pb-1.5 border-b-2 transition-all duration-200 ${subCat === "projects"
              ? "border-white text-white"
              : "border-transparent text-white/40 hover:text-white/70"
            }`}
        >
          Projects
        </button>
        {transaction === "buy" && (
          <button
            onClick={() => setSubCat("wingold")}
            className={`flex items-center gap-1.5 text-[0.78rem] font-semibold pb-1.5 border-b-2 transition-all duration-200 ${subCat === "wingold"
                ? "border-[#C9A84C] text-[#C9A84C]"
                : "border-transparent text-white/40 hover:text-[#C9A84C]"
              }`}
          >
            <span className="text-[#C9A84C]">★</span>
            <span className={subCat === "wingold" ? "text-[#C9A84C]" : ""}>Win Gold Projects</span>
          </button>
        )}
      </div>

      {/* Horizontally Scrollable Cards */}
      {loading ? (
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-1 px-1 scrollbar-hide">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex-shrink-0 w-[280px] md:w-[300px] h-[320px] bg-white/5 animate-pulse rounded-2xl border border-white/10" />
          ))}
        </div>
      ) : listings.length > 0 ? (
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-1 px-1 scrollbar-hide">
          {listings.map((listing) => (
            <ShowcaseCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[220px] bg-white/5 rounded-2xl border-2 border-dashed border-white/10">
          <div className="text-center">
            <p className="text-3xl mb-2">🏗️</p>
            <p className="text-sm text-white/50 font-medium">No listings in this category yet</p>
          </div>
        </div>
      )}

      {/* View All */}
      <div className="mt-5">
        <Link
          href="/properties"
          className="text-[0.8rem] text-white/80 font-semibold hover:text-gold flex items-center gap-1.5 transition-all"
        >
          View all {title.toLowerCase()} properties →
        </Link>
      </div>
    </div>
  );
}

// ── Main Export ─────────────────────────────────────────────────────────────────
export default function PropertyShowcase() {
  const [activeCategory, setActiveCategory] = useState<"Residential" | "Commercial">("Residential");
  const [displayCategory, setDisplayCategory] = useState<"Residential" | "Commercial">("Residential");
  const [opacity, setOpacity] = useState(1);
  const [transform, setTransform] = useState("translateY(0)");

  const handleTabSwitch = (newCat: "Residential" | "Commercial") => {
    if (newCat === activeCategory) return;

    setActiveCategory(newCat);

    // Fade out
    setOpacity(0);
    setTransform("translateY(12px)");

    // Switch content half-way through the 300ms transition
    setTimeout(() => {
      setDisplayCategory(newCat);
      // Fade in
      setOpacity(1);
      setTransform("translateY(0)");
    }, 150);
  };

  return (
    <section className="bg-gradient-to-b from-[#0B1B3D] to-[#08132B] py-16 md:py-24 relative overflow-hidden">
      {/* Decorative background glow elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-navy-light/10 blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] rounded-full bg-gold/5 blur-[80px]" />
      </div>

      <div className="max-w-8xl mx-auto px-6 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-10 md:mb-14 gap-4 flex-wrap">
          <div>
            <p className="section-label text-gold">Property Listings</p>
            <h2 className="font-display text-white text-[clamp(1.8rem,3vw,2.8rem)]">
              Find Your Property
            </h2>
          </div>
          <Link
            href="/properties"
            className="text-white hover:text-gold text-sm font-semibold flex items-center gap-2 transition-all"
          >
            View All Properties →
          </Link>
        </div>

        {/* STEP 1: Centered Toggle Pill Buttons */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => handleTabSwitch("Residential")}
            className={`rounded-[50px] px-8 py-3 text-sm tracking-wide uppercase transition-all duration-200 cursor-pointer ${activeCategory === "Residential"
                ? "bg-[#D4A017] text-[#0F172A] border-none font-bold"
                : "bg-white/15 text-white border border-white/40 font-normal hover:bg-white/25 hover:border-white/60"
              }`}
            style={{
              fontFamily: "inherit",
            }}
          >
            Residential
          </button>
          <button
            onClick={() => handleTabSwitch("Commercial")}
            className={`rounded-[50px] px-8 py-3 text-sm tracking-wide uppercase transition-all duration-200 cursor-pointer ${activeCategory === "Commercial"
                ? "bg-[#D4A017] text-[#0F172A] border-none font-bold"
                : "bg-white/15 text-white border border-white/40 font-normal hover:bg-white/25 hover:border-white/60"
              }`}
            style={{
              fontFamily: "inherit",
            }}
          >
            Commercial
          </button>
        </div>

        {/* STEP 2, 3, 4: Content Container with Glassmorphism and Fade Transition */}
        <div
          className="backdrop-blur-[10px] bg-white/[0.05] border border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl"
          style={{
            opacity: opacity,
            transform: transform,
            transition: "opacity 150ms ease-in-out, transform 150ms ease-in-out",
          }}
        >
          {displayCategory === "Residential" ? (
            <ListingColumn
              title="Residential"
              category="Residential"
              accentColor="text-white/60"
            />
          ) : (
            <ListingColumn
              title="Commercial"
              category="Commercial"
              accentColor="text-gold"
            />
          )}
        </div>
      </div>
    </section>
  );
}
