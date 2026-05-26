import { Metadata } from 'next';
import Link from 'next/link';
import PropertyCard from '@/components/PropertyCard';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: "Premium Collection | Chembur Properties",
  description: "Discover our exclusive collection of ultra-luxury premium properties and penthouses in Chembur.",
};

export default async function PremiumPage() {
  let properties = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/properties?isPremium=true&limit=50`, { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      properties = Array.isArray(data.data?.properties) ? data.data.properties : [];
    }
  } catch (err) {
    console.error(err);
  }

  return (
    <>
      <section className="relative min-h-[40vh] flex items-center overflow-hidden pt-[120px] md:pt-[150px] pb-12 bg-[#0B1B3D]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1B3D] via-[#1a0b2e] to-[#070b19] opacity-90" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-900/40 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-8xl mx-auto px-6 md:px-8 w-full">
          <p className="text-purple-300 font-bold tracking-widest uppercase text-xs mb-3 flex items-center gap-2">
            <span>💎</span> Ultra Luxury
          </p>
          <h1 className="font-display text-white text-[clamp(2.5rem,5vw,4rem)] mb-4">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-fuchsia-200">Premium</span> Collection
          </h1>
          <p className="text-white/70 text-lg max-w-xl leading-relaxed mb-8">
            Experience unparalleled luxury. Discover our handpicked selection of premium residences, 
            penthouses, and bespoke commercial spaces for the elite.
          </p>
        </div>
      </section>

      <section className="bg-surface-light py-16 md:py-24 min-h-[50vh]">
        <div className="max-w-8xl mx-auto px-6 md:px-8">
          
          {properties.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed border-navy/10 rounded-2xl">
              <p className="text-4xl mb-4">💎</p>
              <h3 className="font-display text-navy text-xl mb-3">No Premium Properties Found</h3>
              <p className="text-slate-navy text-sm">We are updating our premium collection. Check back soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((prop: any, i: number) => {
                const transaction = (prop.propertyStatus && prop.propertyStatus[0]) === "For Rent" || (prop.propertyStatus && prop.propertyStatus[0]) === "For Lease" ? "lease" : "buy";
                const priceVal = transaction === 'buy' ? prop.pricing?.salePrice : prop.pricing?.rentPrice;
                const formattedPrice = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(priceVal || prop.pricing?.expectedPrice || 0);

                return (
                  <ScrollReveal key={prop._id} delay={i * 100}>
                    <PropertyCard
                      code={prop.slug}
                      title={prop.title}
                      location={Array.isArray(prop.location) ? prop.location[0] : prop.location}
                      price={formattedPrice}
                      priceNote={prop.badges?.isWinGold && prop.winGoldDetails ? prop.winGoldDetails : undefined}
                      type={prop.category === "Commercial" ? "commercial" : "residential"}
                      transaction={transaction}
                      bhk={prop.specs?.bedrooms ? `${prop.specs.bedrooms} BHK` : undefined}
                      area={prop.specs?.carpetArea ? `${prop.specs.carpetArea} sq ft` : ""}
                      badge="💎 Premium"
                      badgeVariant="premium"
                      imgGradient="linear-gradient(135deg, #1a0b2e 0%, #0B1B3D 100%)"
                      imageUrl={prop.media?.featuredImage || "/images/placeholder.jpg"}
                    />
                  </ScrollReveal>
                );
              })}
            </div>
          )}

        </div>
      </section>
    </>
  );
}
