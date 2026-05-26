"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import ScrollReveal from "@/components/ScrollReveal";

interface SectionProps {
  endpoint: string;
  label: string;
  title: string;
  subtitle?: string;
  viewAllLink: string;
  defaultBadge?: string;
}

export default function DynamicPropertySection({ endpoint, label, title, subtitle, viewAllLink, defaultBadge }: SectionProps) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchProps() {
      try {
        const res = await fetch(`/api/properties/${endpoint}`);
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        const items = Array.isArray(data.data) ? data.data : Array.isArray(data.properties) ? data.properties : Array.isArray(data.data?.properties) ? data.data.properties : [];
        setProperties(items);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchProps();
  }, [endpoint]);

  if (!loading && (error || properties.length === 0)) return null; // Gracefully hide empty/error state

  return (
    <section className="bg-surface-light py-20 md:py-24">
      <div className="max-w-8xl mx-auto px-6 md:px-8">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-12 gap-4 flex-wrap">
            <div>
              <p className="section-label">{label}</p>
              <h2 className="font-display text-navy text-[clamp(1.8rem,3vw,2.8rem)]">{title}</h2>
              {subtitle && <p className="text-slate-navy mt-2 max-w-2xl">{subtitle}</p>}
            </div>
            <Link href={viewAllLink} className="text-navy text-sm font-semibold hover:text-navy-light flex items-center gap-2 transition-all">View All →</Link>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            [1, 2, 3].map((i) => (
              <div key={i} className="w-full h-[380px] bg-navy/5 animate-pulse rounded-2xl border border-navy/10" />
            ))
          ) : (
            properties.slice(0, 3).map((prop: any, i: number) => {
              // Map API to PropertyCard props
              const transaction = (prop.propertyStatus && prop.propertyStatus[0]) === "For Rent" || (prop.propertyStatus && prop.propertyStatus[0]) === "For Lease" ? "lease" : "buy";
              const priceVal = transaction === 'buy' ? prop.pricing?.salePrice : prop.pricing?.rentPrice;
              const fallbackPrice = prop.pricing?.expectedPrice || 0;
              const formattedPrice = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(priceVal || fallbackPrice);

              let badge = transaction === 'buy' ? "For Sale" : "For Lease";
              let badgeVariant: any = "default";
              
              if (defaultBadge === 'win-gold' || prop.badges?.isWinGold) {
                badge = "★ Win Gold";
                badgeVariant = "premium";
              } else if (defaultBadge === 'premium' || prop.badges?.isPremium) {
                badge = "💎 Premium";
                badgeVariant = "premium";
              } else if (transaction === 'lease') {
                badgeVariant = "rent";
              }

              return (
                <ScrollReveal key={prop._id || prop.slug || i} delay={i * 100}>
                  <PropertyCard
                    code={prop.slug || "PROP"}
                    title={prop.title || "Property Title"}
                    location={Array.isArray(prop.location) ? prop.location[0] : prop.location || "Chembur"}
                    price={formattedPrice}
                    priceNote={prop.badges?.isWinGold && prop.winGoldDetails ? prop.winGoldDetails : (prop.badges?.isWinGold ? "🥇 1 gram gold on booking" : undefined)}
                    type="residential"
                    transaction={transaction}
                    bhk={prop.specs?.bedrooms ? `${prop.specs.bedrooms} BHK` : undefined}
                    area={prop.specs?.carpetArea ? `${prop.specs.carpetArea} sq ft` : ""}
                    badge={badge}
                    badgeVariant={badgeVariant}
                    imgGradient="linear-gradient(135deg, #071430 0%, #0E2452 45%, #0B1B3D 100%)"
                    imageUrl={prop.media?.featuredImage || "/images/placeholder.jpg"}
                  />
                </ScrollReveal>
              );
            })
          )}
        </div>
        {!loading && properties.length > 3 && (
          <ScrollReveal className="mt-12 text-center">
            <Link href={viewAllLink} className="btn-outline-navy">View All Properties</Link>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
