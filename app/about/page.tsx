import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata = {
  title: "About Us | Chembur Properties — Roopam Estate Agency Est. 1965",
  description:
    "61 years of real estate legacy in Chembur. Founded by Late Shri Vashu B. Chhabria in 1965, continued by Jeetu Chhaabria. Meet our team and story.",
};

const timeline = [
  { year: "1965", title: "Foundation", body: "Late Shri Vashu B. Chhabria establishes Roopam Estate Agency in Chembur, Mumbai. The agency starts with a singular focus: honest, personalised real estate service for Chembur families. Chembur at the time is a rapidly growing suburb, attracting families from across Maharashtra." },
  { year: "1975", title: "Community Growth", body: "Roopam Estate Agency establishes itself as the go-to agency for the Chembur community. Word-of-mouth referrals drive growth. The agency begins handling commercial properties alongside residential, serving Chembur's growing business district." },
  { year: "1990", title: "Market Expansion", body: "The agency expands its geographic coverage beyond Chembur to include Ghatkopar, Wadala, and BKC — areas that are beginning to emerge as important commercial hubs. NRI clients begin approaching the agency for property management." },
  { year: "1996", title: "Generational Legacy", body: "Jeetu Chhaabria joins the family business, continuing the generational legacy established by his father. He brings renewed energy and a modernised approach while maintaining the core values of trust and personalised service that define the agency." },
  { year: "2005", title: "Technology Pioneer", body: "Roopam Estate Agency becomes the first agency in Chembur to introduce LCD-based property inspections — showing clients high-quality property visuals before site visits. This was a pioneering move that dramatically improved the client experience." },
  { year: "2010", title: "NRI Services Formalised", body: "The agency formalises its NRI concierge division, responding to growing demand from Indian diaspora clients in Dubai, USA, UK, and Singapore. Remote property buying and management become dedicated service offerings." },
  { year: "2019", title: "Digital Presence", body: "Launch of chemburproperties.com — the agency's first dedicated digital presence. Digital leads and NRI inquiries from across the world begin arriving online." },
  { year: "2026", title: "World-Class Transformation", body: "Roopam Estate Agency launches its comprehensive digital transformation — including this world-class website, digital property management tools, and an enhanced NRI concierge platform. 61 years of trust, powered by modern technology." },
];

const team = [
  { initials: "JC", name: "Jeetu Chhaabria", role: "Principal Broker & Managing Director", bio: "Jeetu sir has been the heart of Roopam Estate Agency since 1996. With over 28 years of hands-on experience in the Chembur market, he personally oversees every significant transaction. His deep knowledge of the local market, combined with his reputation for absolute integrity, has made him Chembur's most trusted real estate advisor." },
  { initials: "SB", name: "Shyam", role: "Senior Associate — Residential", bio: "A veteran of the Chembur residential market with over 15 years of experience. Shyam specialises in residential buy-sell and rental transactions, with deep knowledge of every building and micro-location in Chembur. His attention to detail and client-first approach have earned him a loyal client following." },
  { initials: "RK", name: "Raman", role: "Associate — Commercial & NRI Services", bio: "Raman heads commercial property transactions and provides key support to NRI clients. He coordinates virtual tours, manages property visits, and ensures every client — whether local or overseas — receives the same high standard of service. Fluent in digital tools and remote communication." },
];

const values = [
  { icon: "🏛️", title: "Legacy", desc: "61 years of serving Chembur families. Our history is our credibility — earned transaction by transaction, client by client." },
  { icon: "🤝", title: "Transparency", desc: "We tell you what we know, including the things you might not want to hear. Honest guidance over short-term gains, always." },
  { icon: "🌍", title: "Community", desc: "Chembur is more than a market to us — it's our home. We have deep roots here and a genuine stake in the community's growth." },
  { icon: "⭐", title: "Excellence", desc: "From the first conversation to the final registration, we hold ourselves to the highest standards of professional service." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy-gradient min-h-[55vh] flex items-center overflow-hidden pt-20 pb-14">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-60 -right-60 w-[700px] h-[700px] rounded-full bg-navy-light/20 blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-8xl mx-auto px-6 md:px-8 w-full">
          <p className="section-label text-gold">Our Story</p>
          <h1 className="font-display text-white text-[clamp(2rem,4vw,3.2rem)] mb-5">
            Six Decades of Trust
            <span className="text-gold block">in Chembur.</span>
          </h1>
          <p className="text-white/55 text-base max-w-xl leading-[1.82]">
            What began as a one-man real estate agency on Central Avenue Road
            in 1965 has grown into Chembur&apos;s most respected and enduring
            real estate institution. Three generations, thousands of
            transactions, and one unwavering commitment — to serve our
            clients honestly.
          </p>
        </div>
      </section>

      {/* Legacy Narrative */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-8xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal>
              <div
                className="h-[400px] md:h-[500px] rounded-2xl relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, #0B1B3D 0%, #1A3A6E 50%, #0E2452 100%)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gold/12 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="border-t border-gold/25 pt-6">
                    <p className="font-display text-gold text-5xl font-bold mb-2">
                      1965
                    </p>
                    <p className="text-white/55 text-sm">
                      Year Roopam Estate Agency was founded
                      <br />
                      by Late Shri Vashu B. Chhabria
                    </p>
                  </div>
                </div>
                <div className="absolute top-8 right-8 text-7xl opacity-15">
                  🏛️
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={120}>
              <p className="section-label mb-4">The Foundation</p>
              <h2 className="font-display text-navy text-[1.8rem] md:text-[2.2rem] mb-5">
                A Legacy Built on Trust
              </h2>
              <div className="space-y-4">
                <p className="text-sm text-slate-navy leading-[1.85]">
                  In 1965, Chembur was a suburb in transformation — a mix of
                  residential colonies, industrial workers&apos; quarters, and
                  the homes of Mumbai&apos;s growing middle class. It was into
                  this environment that Late Shri Vashu B. Chhabria launched
                  Roopam Estate Agency, driven by a simple belief: that every
                  family deserved honest guidance when making the most
                  important financial decision of their lives.
                </p>
                <p className="text-sm text-slate-navy leading-[1.85]">
                  Over the decades that followed, Chembur transformed. The
                  industrial belt gave way to residential high-rises. The
                  old mill workers&apos; colonies were redeveloped. The
                  Eastern Freeway, the Monorail, and eventually Metro Line 2B
                  brought infrastructure that would have been unimaginable in
                  1965. Through all of this, Roopam Estate Agency remained —
                  a constant in an ever-changing landscape.
                </p>
                <p className="text-sm text-slate-navy leading-[1.85]">
                  In 1996, Jeetu Chhaabria joined his father&apos;s business,
                  bringing with him a new generation&apos;s energy and vision.
                  The core values remained unchanged: honesty, personal
                  involvement, and genuine care for every client. What changed
                  was the scale and sophistication of service.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Extended Timeline */}
      <section className="bg-surface-light py-20 md:py-24 overflow-hidden">
        <div className="max-w-8xl mx-auto px-6 md:px-8">
          <ScrollReveal className="text-center mb-14">
            <p className="section-label justify-center">Milestones</p>
            <h2 className="font-display text-navy">Our Journey</h2>
          </ScrollReveal>

          <div className="max-w-3xl mx-auto">
            <div className="relative pl-10">
              {/* Vertical line */}
              <div
                className="absolute left-3.5 top-4 bottom-4 w-0.5"
                style={{
                  background:
                    "linear-gradient(to bottom, #0B1B3D, rgba(11,27,61,0.08))",
                }}
              />

              <div className="flex flex-col gap-0">
                {timeline.map((item, i) => (
                  <ScrollReveal
                    key={item.year}
                    delay={i * 60}
                    className="relative pb-10"
                  >
                    {/* Dot */}
                    <div className="absolute -left-[26px] top-1 w-5 h-5 rounded-full bg-navy border-4 border-surface-light outline outline-2 outline-navy z-10" />
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="font-display text-navy text-xl font-bold">
                        {item.year}
                      </span>
                      <span className="text-xs font-bold text-slate-navy uppercase tracking-widest">
                        {item.title}
                      </span>
                    </div>
                    <p className="text-sm text-slate-navy leading-[1.82]">
                      {item.body}
                    </p>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-navy py-20 md:py-24">
        <div className="max-w-8xl mx-auto px-6 md:px-8">
          <ScrollReveal className="text-center mb-14">
            <p className="section-label text-gold justify-center">The People</p>
            <h2 className="font-display text-white mb-3">Meet Our Team</h2>
            <p className="text-white/50 max-w-md mx-auto text-sm leading-relaxed">
              The faces behind 61 years of trusted real estate service in
              Chembur.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {team.map((member, i) => (
              <ScrollReveal key={member.name} delay={i * 100}>
                <div className="text-center">
                  {/* TODO (Aryesh): Replace gradient avatar with actual team photo */}
                  {/* Use Next.js Image component: <Image src="/images/team/jeetu.jpg" .../> */}
                  <div className="w-36 h-36 rounded-full bg-gradient-to-br from-gold-dark to-gold flex items-center justify-center font-display font-bold text-navy text-3xl mx-auto mb-6 border-3 border-gold/25 shadow-[0_0_0_6px_rgba(201,164,74,0.08)]">
                    {member.initials}
                  </div>
                  <h3 className="font-display text-white text-xl mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[0.72rem] font-bold tracking-widest uppercase text-gold mb-4">
                    {member.role}
                  </p>
                  <p className="text-sm text-white/50 leading-[1.78]">
                    {member.bio}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-surface-light py-20 md:py-24">
        <div className="max-w-8xl mx-auto px-6 md:px-8">
          <ScrollReveal className="text-center mb-12">
            <p className="section-label justify-center">What We Stand For</p>
            <h2 className="font-display text-navy">Our Values</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 80}>
                <div className="bg-white border border-navy-100 rounded-2xl p-8 text-center hover:border-navy-300 hover:-translate-y-1 transition-all duration-300 h-full shadow-card">
                  <div className="text-4xl mb-5">{v.icon}</div>
                  <h4 className="font-display text-navy text-lg mb-3">
                    {v.title}
                  </h4>
                  <p className="text-sm text-slate-navy leading-[1.75]">
                    {v.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-8">
          <ScrollReveal>
            <div className="bg-navy rounded-2xl p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="section-label text-gold mb-4">Recognition & Trust</p>
                  <h2 className="font-display text-white text-[1.6rem] md:text-[2rem] mb-5">
                    Earned Over Six Decades
                  </h2>
                  <p className="text-sm text-white/50 leading-[1.82] mb-6">
                    Our reputation is not manufactured — it is the product of
                    61 years of honest dealing, every single day. The ratings,
                    reviews, and registrations reflect what our clients and
                    regulatory bodies have independently verified.
                  </p>
                  <div className="flex gap-4 flex-wrap">
                    <Link href="/contact" className="btn-gold text-sm">
                      Work With Us
                    </Link>
                    <a
                      href="https://wa.me/919820182285"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline-white text-sm"
                    >
                      WhatsApp Us
                    </a>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { val: "4.8★", label: "Google Rating" },
                    { val: "4.81★", label: "Justdial Rating" },
                    { val: "188", label: "Verified Reviews" },
                    { val: "RERA", label: "MahaRERA Registered" },
                  ].map((c) => (
                    <div
                      key={c.label}
                      className="bg-white/5 border border-white/10 rounded-xl p-5 text-center backdrop-blur-sm"
                    >
                      <div className="font-display text-gold text-2xl font-bold mb-1">
                        {c.val}
                      </div>
                      <p className="text-xs text-white/45">{c.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Community */}
      <section className="bg-navy py-16 md:py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-8">
          <ScrollReveal>
            <div className="text-center">
              <p className="section-label text-gold justify-center mb-3">
                Community Roots
              </p>
              <h2 className="font-display text-white mb-4">
                More Than a Business
              </h2>
              <p className="text-white/50 text-sm max-w-2xl mx-auto leading-[1.85] mb-8">
                Roopam Estate Agency has been part of the Chembur community
                for 61 years. We have watched families grow up, seen children
                become homeowners, and accompanied multiple generations through
                their most important life decisions. Chembur is not just our
                market — it is our home. We are invested in its growth,
                its infrastructure, and the wellbeing of its residents in ways
                that go beyond any individual transaction.
              </p>
              <p className="text-white/50 text-sm max-w-2xl mx-auto leading-[1.85]">
                Our office on Central Avenue Road, near Ambedkar Udyan and
                Chembur Station, has been a fixture in this neighbourhood
                for decades. We know the buildings, the builders, the
                neighbourhood politics, and the micro-market dynamics in ways
                that no outsider — no matter how well-funded — can replicate.
                This local knowledge is our most valuable asset, and it is
                available to every client we serve.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
