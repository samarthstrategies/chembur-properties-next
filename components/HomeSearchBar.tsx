"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";

export default function HomeSearchBar() {
  const router = useRouter();
  const resultsRef = useRef<HTMLDivElement>(null);

  const [type, setType] = useState("All Types");
  const [transaction, setTransaction] = useState("Buy / Lease");
  const [budget, setBudget] = useState("Any Budget");
  const [location, setLocation] = useState("All Areas of Chembur");

  const [locations, setLocations] = useState<string[]>([]);
  const [loadingLocations, setLoadingLocations] = useState(true);

  // New states for inline results
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [lastSearchParams, setLastSearchParams] = useState<string>("");

  useEffect(() => {
    async function fetchLocations() {
      try {
        const res = await fetch('/api/admin/locations');
        if (!res.ok) throw new Error('Failed to fetch locations');
        const data = await res.json();
        if (Array.isArray(data)) {
          const locNames = data.map(d => typeof d === 'string' ? d : (d.name || d.title || ''));
          setLocations(locNames.filter(Boolean));
        } else if (data.data && Array.isArray(data.data)) {
          const locNames = data.data.map((d: any) => typeof d === 'string' ? d : (d.name || d.title || ''));
          setLocations(locNames.filter(Boolean));
        } else {
          throw new Error('Invalid format');
        }
      } catch (err) {
        console.error(err);
        setLocations(["Chembur", "Govandi", "Deonar", "Sion", "Wadala", "Tilaknagar"]);
      } finally {
        setLoadingLocations(false);
      }
    }
    fetchLocations();
  }, []);

  const executeSearch = async (quickParams?: URLSearchParams) => {
    setLoading(true);
    setSearched(true);
    
    let params = new URLSearchParams();
    
    if (quickParams) {
      params = quickParams;
    } else {
      if (type === "Residential") params.append("category", "Residential");
      if (type === "Commercial") params.append("category", "Commercial");
      
      if (transaction !== "Buy / Lease") {
        if (transaction === "Buy") params.append("type", "Buy,For Sale");
        if (transaction === "Lease") params.append("type", "Lease,For Rent,For Lease,Shop on Rent");
      }
      
      if (budget !== "Any Budget") {
        if (budget === "50L - 1Cr") { params.append("minPrice", "5000000"); params.append("maxPrice", "10000000"); }
        if (budget === "1Cr - 1.5Cr") { params.append("minPrice", "10000000"); params.append("maxPrice", "15000000"); }
        if (budget === "1.5Cr - 2Cr") { params.append("minPrice", "15000000"); params.append("maxPrice", "20000000"); }
        if (budget === "2Cr - 3Cr") { params.append("minPrice", "20000000"); params.append("maxPrice", "30000000"); }
        if (budget === "3Cr - 5Cr") { params.append("minPrice", "30000000"); params.append("maxPrice", "50000000"); }
        if (budget === "5Cr+") params.append("minPrice", "50000000");
      }
      
      if (location !== "All Areas of Chembur") params.append("location", location);
    }

    setLastSearchParams(params.toString());

    try {
      const response = await fetch(`/api/properties?${params.toString()}&limit=6`);
      if (!response.ok) throw new Error("Search failed");
      const data = await response.json();
      
      const items = Array.isArray(data.data?.properties) ? data.data.properties : Array.isArray(data.properties) ? data.properties : Array.isArray(data.data) ? data.data : [];
      
      setResults(items);
      setTotalResults(data.data?.total || data.totalDocs || items.length);
    } catch (err) {
      console.error(err);
      setResults([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleSearch = () => executeSearch();

  const handleQuickLink = (key: string, value: string) => {
    // Reset standard dropdowns so they don't visually conflict with the quick pill
    setType("All Types");
    setTransaction("Buy / Lease");
    setBudget("Any Budget");
    setLocation("All Areas of Chembur");
    
    const params = new URLSearchParams();
    params.append(key, value);
    executeSearch(params);
  };

  const handleClear = () => {
    setType("All Types");
    setTransaction("Buy / Lease");
    setBudget("Any Budget");
    setLocation("All Areas of Chembur");
    setResults([]);
    setSearched(false);
    setLoading(false);
    setLastSearchParams("");
  };

  const typeOptions = [
    "All Types",
    "Residential",
    "Commercial"
  ];

  const transactionOptions = [
    "Buy / Lease",
    "Buy",
    "Lease"
  ];

  const budgetOptions = [
    "Any Budget",
    "50L - 1Cr",
    "1Cr - 1.5Cr",
    "1.5Cr - 2Cr",
    "2Cr - 3Cr",
    "3Cr - 5Cr",
    "5Cr+"
  ];

  const locationOptions = ["All Areas of Chembur"];
  if (loadingLocations) {
    locationOptions.push("Loading...");
  } else {
    locationOptions.push(...locations);
  }

  return (
    <section className="bg-white pt-16 md:pt-20 pb-16">
      <div className="max-w-8xl mx-auto px-6 md:px-8">
        <h2 className="font-display text-navy text-center text-[2rem] md:text-[2.4rem] mb-10">Find Your Ideal Property</h2>
        <div className="bg-surface-light rounded-2xl p-6 md:p-9 shadow-soft">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            
            {/* Type */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[0.68rem] font-bold tracking-widest uppercase text-slate-navy">Property Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="lux-select"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%230B1B3D' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 14px center",
                  paddingRight: "38px",
                }}
              >
                {typeOptions.map((opt) => (<option key={opt} value={opt}>{opt}</option>))}
              </select>
            </div>

            {/* Transaction */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[0.68rem] font-bold tracking-widest uppercase text-slate-navy">Transaction</label>
              <select
                value={transaction}
                onChange={(e) => setTransaction(e.target.value)}
                className="lux-select"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%230B1B3D' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 14px center",
                  paddingRight: "38px",
                }}
              >
                {transactionOptions.map((opt) => (<option key={opt} value={opt}>{opt}</option>))}
              </select>
            </div>

            {/* Budget */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[0.68rem] font-bold tracking-widest uppercase text-slate-navy">Budget</label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="lux-select"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%230B1B3D' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 14px center",
                  paddingRight: "38px",
                }}
              >
                {budgetOptions.map((opt) => (<option key={opt} value={opt}>{opt}</option>))}
              </select>
            </div>

            {/* Location */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[0.68rem] font-bold tracking-widest uppercase text-slate-navy">Location</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="lux-select"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%230B1B3D' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 14px center",
                  paddingRight: "38px",
                }}
              >
                {locationOptions.map((opt) => (<option key={opt} value={opt}>{opt}</option>))}
              </select>
            </div>

            <div className="flex items-end gap-2">
              <button onClick={handleSearch} className="w-full btn-navy py-3 text-sm">
                Search Properties
              </button>
            </div>
          </div>
          
          {searched && (
            <div className="flex justify-end mt-4">
              <button onClick={handleClear} className="text-sm font-semibold text-slate-navy hover:text-[#EF4444] transition-colors">
                Clear ✕
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Inline Results Section */}
      {searched && (
        <div ref={resultsRef} className="max-w-8xl mx-auto px-6 md:px-8 mt-12 animate-fade-up">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-full h-[380px] bg-navy/5 animate-pulse rounded-2xl border border-navy/10" />
              ))}
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-16 bg-surface-light rounded-2xl border border-navy-100">
              <span className="text-4xl mb-4 block">🔍</span>
              <h3 className="font-display text-navy text-2xl mb-2">No properties found</h3>
              <p className="text-slate-navy mb-6">Try adjusting your filters to find what you are looking for.</p>
              <button onClick={handleClear} className="btn-outline-navy py-2 px-6">Clear Filters</button>
            </div>
          ) : (
            <>
              <p className="font-semibold text-navy text-lg mb-6 border-b border-navy-100 pb-2">
                Showing {totalResults} properties
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((prop: any, i: number) => {
                  const isLease = prop.propertyStatus?.some((s: string) => ['Lease', 'For Rent', 'For Lease', 'Shop on Rent'].includes(s));
                  const transactionType = isLease ? "lease" : "buy";
                  const priceVal = transactionType === 'buy' ? prop.pricing?.salePrice : prop.pricing?.rentPrice;
                  const fallbackPrice = prop.pricing?.expectedPrice || 0;
                  const formattedPrice = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(priceVal || fallbackPrice);

                  let badge = transactionType === 'buy' ? "For Sale" : "For Lease";
                  let badgeVariant: any = "default";
                  
                  if (prop.badges?.isWinGold) {
                    badge = "★ Win Gold";
                    badgeVariant = "premium";
                  } else if (prop.badges?.isPremium) {
                    badge = "💎 Premium";
                    badgeVariant = "premium";
                  } else if (transactionType === 'lease') {
                    badgeVariant = "rent";
                  }

                  return (
                    <div key={prop._id || prop.slug || i} className="animate-fade-up" style={{ animationDelay: `${i * 50}ms` }}>
                      <PropertyCard
                        code={prop.slug || "PROP"}
                        title={prop.title || "Property Title"}
                        location={Array.isArray(prop.location) ? prop.location[0] : prop.location || "Chembur"}
                        price={formattedPrice}
                        priceNote={prop.badges?.isWinGold && prop.winGoldDetails ? prop.winGoldDetails : (prop.badges?.isWinGold ? "🥇 1 gram gold on booking" : undefined)}
                        type="residential"
                        transaction={transactionType}
                        bhk={prop.specs?.bedrooms ? `${prop.specs.bedrooms} BHK` : undefined}
                        area={prop.specs?.carpetArea ? `${prop.specs.carpetArea} sq ft` : ""}
                        badge={badge}
                        badgeVariant={badgeVariant}
                        imgGradient="linear-gradient(135deg, #071430 0%, #0E2452 45%, #0B1B3D 100%)"
                        imageUrl={prop.media?.featuredImage || "/images/placeholder.jpg"}
                      />
                    </div>
                  );
                })}
              </div>
              
              {totalResults > 6 && (
                <div className="text-center mt-12 animate-fade-up">
                  <Link href={`/properties?${lastSearchParams}`} className="btn-navy py-3 px-8 text-sm">
                    View All {totalResults} Properties →
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </section>
  );
}
