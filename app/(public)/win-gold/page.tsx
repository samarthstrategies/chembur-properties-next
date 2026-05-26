import { Metadata } from 'next';
import Link from 'next/link';
import PropertyCard from '@/components/PropertyCard';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: "Win Gold Properties | Chembur Properties",
  description: "Explore our exclusive Win Gold properties in Chembur and enjoy assured gold rewards on booking.",
};

export default async function WinGoldPage() {
  let properties = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/properties?isWinGold=true&limit=50`, { next: { revalidate: 60 } });
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
        <div className="absolute inset-0 bg-gradient-to-br from-[#122A5E] via-[#0B1B3D] to-[#251D0A] opacity-80" />
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#C9A84C]/30 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-8xl mx-auto px-6 md:px-8 w-full">
          <p className="text-[#C9A84C] font-bold tracking-widest uppercase text-xs mb-3 flex items-center gap-2">
            <span>★</span> Exclusive Offer
          </p>
          <h1 className="font-display text-white text-[clamp(2.5rem,5vw,4rem)] mb-4">
            Win <span className="text-[#C9A84C]">Gold</span>
          </h1>
          <p className="text-white/70 text-lg max-w-xl leading-relaxed mb-8">
            Book any of our carefully curated Win Gold properties and receive assured 
            gold rewards on successful registration.
          </p>
        </div>
      </section>

      <section className="bg-surface-light py-16 md:py-24 min-h-[50vh]">
        <div className="max-w-8xl mx-auto px-6 md:px-8">
          
          {properties.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed border-navy/10 rounded-2xl">
              <p className="text-4xl mb-4">✨</p>
              <h3 className="font-display text-navy text-xl mb-3">No Win Gold Properties Found</h3>
              <p className="text-slate-navy text-sm">Check back later for exciting new offers.</p>
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
                      priceNote={prop.winGoldDetails || "Assured Gold on Booking"}
                      type={prop.category === "Commercial" ? "commercial" : "residential"}
                      transaction={transaction}
                      bhk={prop.specs?.bedrooms ? `${prop.specs.bedrooms} BHK` : undefined}
                      area={prop.specs?.carpetArea ? `${prop.specs.carpetArea} sq ft` : ""}
                      badge="★ Win Gold"
                      badgeVariant="premium"
                      imgGradient="linear-gradient(135deg, #071430 0%, #0E2452 45%, #0B1B3D 100%)"
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
