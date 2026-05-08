import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import ScrollReveal from "@/components/ScrollReveal";
import CountUp from "@/components/CountUp";
import AnimatedHomeText from "@/components/AnimatedHomeText";

// TODO (Aryesh): Replace featuredProperties with a dynamic fetch from your property database/CMS
const featuredProperties = [
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
    imageUrl: "https://chemburproperties.com/wp-content/uploads/2026/04/t1-3-1240x720.jpeg",
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
    imageUrl: "https://chemburproperties.com/wp-content/uploads/2026/04/t2-1240x720.jpeg",
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
    imageUrl: "https://chemburproperties.com/wp-content/uploads/2026/04/IMG_7427-Large-2-1240x720.jpeg",
  },
];

const services = [
  { img: "/images/home_services/buy.png", title: "Buy & Sell Properties", desc: "Expert guidance for residential and commercial transactions. From search to registration.", href: "/services#buy-sell" },
  { img: "/images/home_services/rent.png", title: "Rent & Lease", desc: "Leave and License agreements, group bookings, and tenant matching for all budgets.", href: "/services#rent-lease" },
  { img: "/images/home_services/mgmt.png", title: "Property Management", desc: "Full lifecycle management — tenant coordination, repairs, and NRI absentee landlord services.", href: "/services#management" },
  { img: "/images/home_services/redev.png", title: "Redevelopment Advisory", desc: "Society consensus building, builder due diligence, and legal structuring for redevelopment.", href: "/services#redevelopment" },
  { img: "/images/home_services/legal.png", title: "Legal & Registration", desc: "Stamp duty guidance, title clearance, registration — simplified step by step.", href: "/services#legal" },
  { img: "/images/home_services/nri.png", title: "NRI Concierge Services", desc: "Remote buying, PoA framework, NRE/NRO accounts, and TDS compliance for overseas clients.", href: "/nri" },
];

const timeline = [
  { year: "1965", event: "Founded by Late Shri Vashu B. Chhabria in Chembur" },
  { year: "1996", event: "Jeetu Chhaabria continues the family legacy" },
  { year: "2005", event: "First agency in Chembur to introduce LCD property inspections" },
  { year: "2019", event: "Digital launch of chemburproperties.com" },
  { year: "2026", event: "World-class digital transformation begins" },
];

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0B1B3D] pt-28 pb-20">
        {/* Protective Top Gradient for Header text visibility over white background */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#0B1B3D] via-[#0B1B3D]/50 to-transparent z-20 pointer-events-none" />


        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Animated floating orbs */}
          <div className="absolute -top-40 -left-10 w-[600px] h-[600px] rounded-full bg-navy-light/30 blur-[120px] animate-pulse" />
          <div className="absolute bottom-10 left-10 w-[400px] h-[400px] rounded-full bg-gold/10 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
          
          {/* Light beams */}
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent opacity-50" />
        </div>

        <div className="relative z-10 max-w-8xl mx-auto px-6 md:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
            
            {/* Left Column: Text & CTA */}
            <div className="pt-10 lg:pt-0">
              <div className="flex items-center gap-3 mb-6 animate-fade-up">
                <span className="block w-10 h-px bg-gold" />
                <span className="font-body text-[0.72rem] font-bold tracking-[0.2em] uppercase text-gold">
                  Roopam Estate Agency — Mumbai&apos;s Trusted Realtors
                </span>
              </div>

              <h1 className="font-display text-white text-[clamp(2.8rem,5vw,5rem)] leading-[1.05] mb-4 animate-fade-up" style={{ animationDelay: "80ms" }}>
                Chembur&apos;s Real Estate Legacy.
                <span className="text-gold block">Trusted Since 1965.</span>
              </h1>

              <p className="text-lg text-white/55 max-w-[500px] mt-6 mb-10 leading-[1.8] animate-fade-up" style={{ animationDelay: "160ms" }}>
                61 years of guiding Mumbai families, investors, and NRIs to their perfect property. Rooted in Chembur. Trusted across Mumbai.
              </p>

              <div className="flex flex-wrap gap-4 mb-14 animate-fade-up" style={{ animationDelay: "240ms" }}>
                <Link href="/properties" className="bg-white text-[#0B1B3D] font-bold text-sm px-8 py-4 rounded-full hover:bg-gray-100 transition-colors shadow-lg">Explore Properties</Link>
                <Link href="/nri" className="btn-outline-white text-sm px-8 py-4">NRI Investment Portal</Link>
              </div>

              <div className="flex gap-8 md:gap-14 pt-8 border-t border-white/10 flex-wrap animate-fade-up" style={{ animationDelay: "320ms" }}>
                {[
                  { target: 61, suffix: "+", label: "Years in Business" },
                  { target: 4.8, suffix: "★", label: "Google Rating", decimals: 1 },
                  { target: 500, suffix: "+", label: "Families Served" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="font-display text-3xl font-bold text-gold leading-none mb-1.5">
                      <CountUp target={s.target} suffix={s.suffix} decimals={s.decimals || 0} />
                    </div>
                    <p className="text-[0.75rem] text-white/45 tracking-wide">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Video */}
            <div className="relative flex justify-center items-center mt-16 lg:mt-0 z-10 animate-fade-up" style={{ animationDelay: "400ms" }}>
              <div className="relative w-[280px] h-[580px] md:w-[320px] md:h-[660px] lg:w-[360px] lg:h-[740px] rounded-[3rem] border-[8px] md:border-[10px] border-[#222] shadow-[0_0_80px_rgba(255,255,255,0.06)] bg-[#111] overflow-hidden group hover:scale-[1.02] transition-transform duration-500 lg:-ml-12">
                {/* Subtle reflection on the frame */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none z-20" />
                
                <video 
                  className="absolute inset-0 w-full h-full object-cover z-0"
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  controls
                >
                  <source src="/videos/founder-intro.mp4" type="video/mp4" />
                </video>
              </div>
            </div>

          </div>
        </div>
      </section>



      {/* ── SEARCH ── */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-8">
          <h2 className="font-display text-navy text-center text-[2rem] md:text-[2.4rem] mb-10">Find Your Perfect Property</h2>
          <div className="bg-surface-light rounded-2xl p-6 md:p-9 shadow-soft">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              {[
                { label: "Property Type", id: "type", options: ["All Types", "Residential", "Commercial", "Industrial"] },
                { label: "Transaction", id: "transaction", options: ["Buy / Rent / Lease", "Buy", "Rent", "Lease"] },
                { label: "Budget", id: "budget", options: ["Any Budget", "Under ₹50 Lakh", "₹50L – ₹1 Crore", "₹1 Cr – ₹2 Cr", "₹2 Cr – ₹5 Cr", "Above ₹5 Crore"] },
                { label: "Location", id: "location", options: ["All Areas", "Chembur", "Ghatkopar", "Wadala", "BKC", "Thane", "Navi Mumbai"] },
              ].map((field) => (
                <div key={field.id} className="flex flex-col gap-1.5">
                  <label className="text-[0.68rem] font-bold tracking-widest uppercase text-slate-navy">{field.label}</label>
                  <select
                    id={field.id}
                    className="lux-select"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%230B1B3D' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 14px center",
                      paddingRight: "38px",
                    }}
                  >
                    {field.options.map((opt) => (<option key={opt}>{opt}</option>))}
                  </select>
                </div>
              ))}
              <div className="flex items-end">
                <Link href="/properties" className="w-full btn-navy py-3 text-sm">Search Properties</Link>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-[0.72rem] text-slate-navy font-semibold tracking-wide uppercase">Quick:</span>
              {["1 BHK", "2 BHK", "3 BHK", "Commercial", "NRI Special"].map((label) => (
                <Link key={label} href="/properties" className="px-4 py-1.5 rounded-full border-[1.5px] border-navy-200 text-[0.78rem] font-medium text-slate-dark hover:border-navy hover:text-navy bg-white transition-all duration-150">{label}</Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="bg-surface-light py-7 border-y border-navy-100">
        <div className="max-w-8xl mx-auto px-6 md:px-8">
          <div className="flex justify-center items-center gap-8 md:gap-16 flex-wrap">
            {[
              { icon: "🏛️", title: "Established 1965", sub: "61 Years of Legacy" },
              { icon: "📋", title: "MahaRERA Registered", sub: "Fully Compliant" },
              { icon: "⭐", title: "4.81★ Justdial Rating", sub: "188 Verified Reviews" },
              { icon: "🔑", title: "End-to-End Service", sub: "Search to Registration" },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3.5">
                <div className="w-10 h-10 bg-navy rounded-lg flex items-center justify-center text-lg flex-shrink-0">{item.icon}</div>
                <div>
                  <strong className="block text-sm font-bold text-navy leading-tight">{item.title}</strong>
                  <span className="text-xs text-slate-navy">{item.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CINEMATIC TYPOGRAPHY BRIDGE ── */}
      <AnimatedHomeText />

      {/* ── TWO PATHWAYS ── */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-8xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ScrollReveal>
              <div className="bg-navy rounded-2xl p-12 md:p-14 hover:-translate-y-1 transition-transform duration-300 hover:shadow-navy">
                <span className="text-5xl block mb-6">🏡</span>
                <h3 className="font-display text-white text-[1.8rem] md:text-[2rem] mb-4">Looking for a Home?</h3>
                <p className="text-white/55 text-base leading-relaxed mb-8">Browse residential properties across Chembur and Mumbai. From compact 1 BHKs to sprawling luxury apartments — we have the perfect home for every family.</p>
                <Link href="/properties" className="btn-gold text-sm">Browse Properties</Link>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <div className="bg-gold rounded-2xl p-12 md:p-14 hover:-translate-y-1 transition-transform duration-300 hover:shadow-gold">
                <span className="text-5xl block mb-6">✈️</span>
                <h3 className="font-display text-navy text-[1.8rem] md:text-[2rem] mb-4">NRI Investor?</h3>
                <p className="text-navy/65 text-base leading-relaxed mb-8">Remote buying, property management, and concierge services for overseas clients. We handle everything — from virtual tours to final registration.</p>
                <Link href="/nri" className="btn-navy text-sm">NRI Concierge Portal</Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── FEATURED LISTINGS ── */}
      <section className="bg-surface-light py-20 md:py-24">
        <div className="max-w-8xl mx-auto px-6 md:px-8">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-12 gap-4 flex-wrap">
              <div>
                <p className="section-label">Featured Listings</p>
                <h2 className="font-display text-navy text-[clamp(1.8rem,3vw,2.8rem)]">Premium Collections</h2>
              </div>
              <Link href="/properties" className="text-navy text-sm font-semibold hover:text-navy-light flex items-center gap-2 transition-all">View All Properties →</Link>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((prop, i) => (
              <ScrollReveal key={prop.code} delay={i * 100}><PropertyCard {...prop} /></ScrollReveal>
            ))}
          </div>
          <ScrollReveal className="mt-12 text-center">
            <Link href="/properties" className="btn-outline-navy">View All Properties</Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ── METRO URGENCY ── */}
      <section className="bg-gold py-16 md:py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16">
            <div className="text-6xl md:text-7xl flex-shrink-0">🚇</div>
            <div>
              <p className="font-body text-[0.72rem] font-bold tracking-[0.18em] uppercase text-navy/40 mb-3">Market Alert — May / June 2026</p>
              <h2 className="font-display text-navy text-[1.6rem] md:text-[2.2rem] mb-4">Chembur Metro Station — Launching May/June 2026</h2>
              <p className="text-navy/65 text-base leading-relaxed max-w-2xl mb-7">The Metro Line 2B Chembur station is weeks away from launch. MMRDA has confirmed the timeline. Properties in the catchment area are expected to see a 15–25% value surge within 12 months of launch. This is your window to invest before prices rise.</p>
              <Link href="/insights" className="btn-navy text-sm">Read Our Market Analysis →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHEMBUR ── */}
      <section className="bg-navy py-20 md:py-24">
        <div className="max-w-8xl mx-auto px-6 md:px-8">
          <ScrollReveal className="text-center mb-12">
            <p className="section-label justify-center">Location Advantage</p>
            <h2 className="font-display text-white text-[clamp(1.8rem,3vw,2.8rem)] mb-4">Why Smart Investors Choose Chembur</h2>
            <p className="text-white/50 max-w-xl mx-auto text-base leading-relaxed">Strategic location, premium infrastructure, and unbeatable connectivity make Chembur Mumbai&apos;s most compelling real estate market.</p>
          </ScrollReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {[
              { val: "₹20K–34K", label: "Per Sq Ft — Current Range" },
              { val: "25 Min", label: "To BKC — By Road" },
              { val: "35 Min", label: "To Lower Parel" },
              { val: "Metro + Mono", label: "+ Eastern Expressway" },
            ].map((s, i) => (
              <ScrollReveal key={s.val} delay={i * 80}>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 text-center hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm">
                  <div className="font-display text-gold text-xl md:text-2xl font-bold mb-2 leading-tight">{s.val}</div>
                  <p className="text-[0.78rem] text-white/45 leading-snug">{s.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="max-w-3xl mx-auto text-center">
            <p className="text-white/55 text-base leading-[1.85]">Chembur sits at the intersection of Mumbai&apos;s most important infrastructure corridors. With the Eastern Freeway, the Monorail, and now Metro Line 2B — Chembur offers sub-30-minute access to BKC, Lower Parel, and Fort. Combined with price points significantly below Bandra and Powai, the investment case is compelling.</p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── SERVICES (STICKY STACK) ── */}
      <section className="bg-navy py-24 md:py-32 relative">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <ScrollReveal className="text-center mb-16">
            <p className="section-label text-gold justify-center">What We Do</p>
            <h2 className="font-display text-white text-[clamp(2rem,4vw,3.2rem)]">Our Services</h2>
          </ScrollReveal>

          <div className="flex flex-col gap-0 pb-32">
            {services.map((svc, i) => {
              const topOffset = `calc(15vh + ${i * 35}px)`;
              return (
                <div 
                  key={svc.title} 
                  className="sticky w-full"
                  style={{ top: topOffset }}
                >
                  <div className="bg-surface-light border border-white/20 rounded-[2rem] p-5 md:p-8 shadow-[0_-10px_30px_rgba(11,27,61,0.5)] transition-all duration-500 hover:shadow-[0_-15px_40px_rgba(11,27,61,0.6)] flex flex-col md:flex-row items-center gap-6 md:gap-12 mb-8 overflow-hidden group">
                    
                    {/* Left: Image */}
                    <div className="w-full md:w-[35%] h-[220px] md:h-[260px] rounded-2xl overflow-hidden relative flex-shrink-0">
                      <img 
                        src={svc.img} 
                        alt={svc.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent pointer-events-none" />
                    </div>

                    {/* Middle: Content */}
                    <div className="flex-1 text-center md:text-left py-2">
                      <h3 className="font-display text-navy text-2xl md:text-[2.1rem] mb-4">{svc.title}</h3>
                      <p className="text-slate-navy text-sm md:text-base leading-relaxed max-w-lg mx-auto md:mx-0">{svc.desc}</p>
                    </div>

                    {/* Right: Button */}
                    <div className="flex-shrink-0 pb-4 md:pb-0">
                      <Link 
                        href={svc.href}
                        className="bg-gold text-navy font-semibold px-7 py-3.5 rounded-full text-sm flex items-center gap-2 hover:bg-gold-light hover:-translate-y-1 transition-all shadow-md"
                      >
                        Explore <span className="text-lg leading-none">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-navy py-20 md:py-24">
        <div className="max-w-8xl mx-auto px-6 md:px-8">
          <ScrollReveal className="text-center mb-12">
            <p className="section-label justify-center">Client Stories</p>
            <h2 className="font-display text-white text-[clamp(1.8rem,3vw,2.8rem)] mb-3">What Our Clients Say</h2>
            <p className="text-white/45 max-w-md mx-auto text-sm leading-relaxed">Over six decades of relationships built on trust, transparency, and results.</p>
          </ScrollReveal>
          <TestimonialCarousel />
        </div>
      </section>

      {/* ── LEGACY TIMELINE ── */}
      <section className="bg-surface-light py-20 md:py-24 overflow-hidden">
        <div className="max-w-8xl mx-auto px-6 md:px-8">
          <ScrollReveal className="text-center mb-16">
            <p className="section-label justify-center">Our Story</p>
            <h2 className="font-display text-navy text-[clamp(1.8rem,3vw,2.8rem)]">Six Decades of Trust</h2>
          </ScrollReveal>

          {/* Desktop horizontal timeline */}
          <div className="hidden md:block relative">
            <div className="absolute top-[27px] left-0 right-0 h-0.5" style={{ background: "linear-gradient(to right, #0B1B3D 0%, rgba(11,27,61,0.15) 100%)" }} />
            <div className="flex justify-between">
              {timeline.map((item, i) => (
                <ScrollReveal key={item.year} delay={i * 120} className="flex-1 flex flex-col items-center text-center px-3">
                  <div className="w-6 h-6 rounded-full bg-navy border-4 border-surface-light outline outline-2 outline-navy mb-6 flex-shrink-0 relative z-10" />
                  <p className="font-display text-navy text-2xl font-bold mb-2">{item.year}</p>
                  <p className="text-[0.78rem] text-slate-navy leading-snug max-w-[140px]">{item.event}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Mobile vertical */}
          <div className="md:hidden relative pl-8">
            <div className="absolute left-2.5 top-0 bottom-0 w-0.5" style={{ background: "linear-gradient(to bottom, #0B1B3D, rgba(11,27,61,0.1))" }} />
            <div className="flex flex-col gap-8">
              {timeline.map((item, i) => (
                <ScrollReveal key={item.year} delay={i * 80} className="relative">
                  <div className="absolute -left-[26px] top-1 w-5 h-5 rounded-full bg-navy border-4 border-surface-light outline outline-2 outline-navy z-10" />
                  <p className="font-display text-navy text-xl font-bold mb-1">{item.year}</p>
                  <p className="text-sm text-slate-navy leading-snug">{item.event}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-navy py-16 md:py-20 text-center">
        <div className="max-w-8xl mx-auto px-6 md:px-8">
          <ScrollReveal>
            <h2 className="font-display text-white text-[2rem] md:text-[2.5rem] mb-3">Ready to Find Your Property?</h2>
            <p className="text-white/55 text-base max-w-md mx-auto mb-10">Speak with Chembur&apos;s most trusted real estate expert today. No pressure — just honest guidance.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a href="https://wa.me/919820182285" target="_blank" rel="noopener noreferrer" className="btn-gold text-sm">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-navy"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                WhatsApp Us Now
              </a>
              <a href="tel:+919820182285" className="btn-outline-white text-sm">📞 Call 98201 82285</a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
