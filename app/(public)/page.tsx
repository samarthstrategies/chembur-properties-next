import Link from "next/link";
import Image from "next/image";
import PropertyCard from "@/components/PropertyCard";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import ScrollReveal from "@/components/ScrollReveal";
import CountUp from "@/components/CountUp";
import AnimatedHomeText from "@/components/AnimatedHomeText";
import PropertyShowcase from "@/components/PropertyShowcase";
import DynamicPropertySection from "@/components/DynamicPropertySection";
import HomeSearchBar from "@/components/HomeSearchBar";
import SocietySecurityForm from "@/components/SocietySecurityForm";

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0B1B3D] pt-[120px] md:pt-[150px] pb-20">
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
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-16 lg:gap-8 items-center">

            {/* Left Column: Text & CTA */}
            <div className="pt-10 lg:pt-0">
              <div className="flex items-center gap-3 mb-6 animate-fade-up">
                <span className="block w-10 h-px bg-gold" />
                <span className="font-body text-[0.72rem] font-bold tracking-[0.2em] uppercase text-gold">
                  Roopam Estate Agency
                </span>
              </div>

              <h1 className="font-display text-white text-[clamp(2.2rem,4vw,4rem)] xl:text-[5.5rem] leading-[1.05] mb-2 animate-fade-up lg:whitespace-nowrap" style={{ animationDelay: "80ms" }}>
                Chemburproperties<span className="text-gold">.com</span>
              </h1>
              <p className="text-white/80 font-light tracking-wide text-xl md:text-2xl mt-2 mb-4 animate-fade-up flex items-center gap-2" style={{ animationDelay: "120ms" }}>
                <span className="w-8 h-[1px] bg-white/30 inline-block"></span>
                By <strong className="text-gold font-normal">Jeetu Chhaabria</strong>
              </p>

              <p className="text-lg text-white/55 max-w-[500px] mt-6 mb-10 leading-[1.8] animate-fade-up" style={{ animationDelay: "160ms" }}>

              </p>

              <div className="flex flex-wrap gap-4 mb-14 animate-fade-up" style={{ animationDelay: "240ms" }}>
                <Link href="/properties" className="bg-white text-[#0B1B3D] font-bold text-sm px-8 py-4 rounded-full hover:bg-gray-100 transition-colors shadow-lg">Explore Properties</Link>
              </div>

              <div className="flex gap-8 md:gap-14 pt-8 border-t border-white/10 flex-wrap animate-fade-up" style={{ animationDelay: "320ms" }}>
                {[
                  { target: 61, suffix: "+", label: "Years in Business" },
                  { target: 4.9, suffix: "★", label: "Google Rating", decimals: 1 },

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
              <div className="relative w-full max-w-[280px] h-[580px] md:max-w-none md:w-[320px] md:h-[660px] lg:w-[360px] lg:h-[740px] rounded-[3rem] border-[8px] md:border-[10px] border-[#222] shadow-[0_0_80px_rgba(255,255,255,0.06)] bg-[#111] overflow-hidden group hover:scale-[1.02] transition-transform duration-500 lg:-ml-12">
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



      {/* ── PROPERTY SHOWCASE ── */}
      <PropertyShowcase />

      {/* ── SEARCH ── */}
      <HomeSearchBar />

      {/* ── TRUST BAR ── */}
      <section className="bg-surface-light py-7 border-y border-navy-100">
        <div className="max-w-8xl mx-auto px-6 md:px-8">
          <div className="flex justify-center items-center gap-8 md:gap-16 flex-wrap">
            {[
              { icon: "🏛️", title: "Established 1965", sub: "61 Years of Legacy" },
              { icon: "📋", title: "MahaRERA Registered", sub: "AS1800039361" },
              { icon: "⭐", title: "4.8★ Justdial Rating", sub: "160 Verified Reviews" },
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



      <DynamicPropertySection
        endpoint="featured"
        label="Featured Listings"
        title="Premium Projects"
        viewAllLink="/properties"
      />

      <DynamicPropertySection
        endpoint="win-gold"
        label="Exclusive Offers"
        title="🥇 Win Gold Projects"
        subtitle="Buy a property and win gold — exclusive developer offers in Chembur"
        viewAllLink="/win-gold"
        defaultBadge="win-gold"
      />

      <DynamicPropertySection
        endpoint="premium"
        label="Hand-picked"
        title="💎 Premium Projects"
        subtitle="Hand-picked luxury properties in Chembur"
        viewAllLink="/premium"
        defaultBadge="premium"
      />



      {/* ── WHY CHEMBUR ── */}
      <section className="bg-navy py-20 md:py-24">
        <div className="max-w-8xl mx-auto px-6 md:px-8">
          <ScrollReveal className="text-center mb-12">
            <p className="section-label justify-center">Location Advantage</p>
            <h2 className="font-display text-white text-[clamp(1.8rem,3vw,2.8rem)] mb-4">Why Smart Investors Choose Chembur</h2>
            <p className="text-white/50 max-w-xl mx-auto text-base leading-relaxed">Strategic location, premium infrastructure, and excellent connectivity make Chembur Mumbai&apos;s most compelling real estate market.</p>
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



      {/* ── SOCIETY SECURITY SERVICES ── */}
      <section className="bg-[#0B1B3D] py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            
            {/* Left Column */}
            <div className="w-full md:w-1/2">
              <ScrollReveal>
                <p className="text-gold font-bold tracking-widest text-[0.65rem] uppercase mb-4">Society Security Services</p>
                <h2 className="font-display text-white text-[2rem] md:text-[2.5rem] lg:text-[3rem] leading-[1.1] mb-5">
                  Need Security For Your Society?
                </h2>
                <p className="text-slate-300 text-base md:text-lg mb-8 leading-relaxed max-w-lg font-light">
                  Professional and verified security staff for Chembur housing societies. Quick deployment. Trusted service.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    "Trained & Verified Guards",
                    "24/7 Round the Clock Coverage",
                    "Chembur Based Staff",
                    "Quick Deployment"
                  ].map((bullet, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-[10px]">✅</span>
                      </div>
                      <span className="text-white/90 font-medium">{bullet}</span>
                    </div>
                  ))}
                </div>

                <p className="text-gold text-sm font-semibold tracking-wide border-l-2 border-gold pl-3">
                  Trusted by Chembur societies
                </p>
              </ScrollReveal>
            </div>

            {/* Right Column */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-end">
              <ScrollReveal delay={150} className="w-full max-w-md">
                <SocietySecurityForm />
              </ScrollReveal>
            </div>

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


      {/* ── CTA ── */}
      <section className="bg-navy pt-16 md:pt-20 pb-16 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="bg-gradient-to-br from-gold/10 to-transparent rounded-[2.5rem] border border-gold/20 flex flex-col md:flex-row items-center justify-between overflow-hidden shadow-2xl relative">
            <div className="p-8 md:p-12 lg:p-16 flex-1 text-center md:text-left z-10">
              <p className="text-gold font-bold tracking-widest text-xs uppercase mb-3">Speak to the Expert</p>
              <h2 className="font-display text-white text-[2rem] md:text-[2.5rem] mb-4 leading-tight">Ready to Find Your Property?</h2>
              <p className="text-white/70 text-base max-w-md mx-auto md:mx-0 mb-8 leading-relaxed">Speak with Jeetu Chhaabria, Chembur&apos;s most trusted real estate expert today. No pressure — just honest guidance.</p>
              <div className="flex gap-4 justify-center md:justify-start flex-wrap">
                <a href="https://wa.me/919820182285" target="_blank" rel="noopener noreferrer" className="btn-gold text-sm shadow-xl flex items-center gap-2">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-navy" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12c0 1.379.28 2.693.784 3.888c.279.66.418.99.436 1.24c.017.25-.057.524-.204 1.073L2 22l3.799-1.016c.549-.147.823-.22 1.073-.204c.25.018.58.157 1.24.436A10 10 0 0 0 12 22Z" />
                    <path strokeLinecap="round" d="M12.882 12C14.052 12 15 13.007 15 14.25s-.948 2.25-2.118 2.25h-2.47c-.666 0-.998 0-1.205-.203S9 15.768 9 15.115V12m3.882 0C14.052 12 15 10.993 15 9.75s-.948-2.25-2.118-2.25h-2.47c-.666 0-.998 0-1.205.203S9 8.232 9 8.885V12m3.882 0H9" />
                  </svg>
                  WhatsApp Us Now
                </a>
                <a href="tel:+919820182285" className="btn-outline-white text-sm">📞 Call 98201 82285</a>
              </div>
            </div>

            <div className="relative w-full md:w-[350px] lg:w-[450px] h-[300px] md:h-[400px] lg:h-[450px] self-end mt-8 md:mt-0 z-10 md:-mr-10">
              <Image
                src="/images/JeetuChhaabria_full.png"
                alt="Jeetu Chhaabria"
                fill
                className="object-contain object-bottom drop-shadow-2xl"
              />
            </div>

            {/* Background elements */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-gold/20 rounded-full blur-3xl z-0 pointer-events-none" />
          </div>
        </div>
      </section>
    </>
  );
}
