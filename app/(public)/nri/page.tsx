import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata = {
  title: "NRI Investment Portal | Chembur Properties",
  description:
    "Trusted NRI concierge for remote property investment in Mumbai. Virtual tours, PoA, NRE/NRO guidance, property management. Serving Dubai, USA, UK, and worldwide.",
};

const challenges = [
  {
    problem: "Buying Without Visiting Mumbai",
    solution:
      "We conduct live video walkthroughs via WhatsApp or Zoom for shortlisted properties. You see the property, neighbourhood, and surroundings in real-time. Our Power of Attorney framework allows you to complete the entire transaction remotely — from token payment to final registration.",
    icon: "🏡",
  },
  {
    problem: "Complex Banking & FEMA Rules",
    solution:
      "NRI property purchases must be funded through NRE or NRO accounts. We provide step-by-step guidance on account setup, FEMA compliance, repatriation rules, and connecting you with RBI-compliant banking channels. Our CA partners handle all compliance filings.",
    icon: "🏦",
  },
  {
    problem: "Tax & Legal Complexity",
    solution:
      "NRI buyers attract a TDS rate of 20% on the purchase value (reduced under DTAA for certain countries). We coordinate with specialist CA firms to ensure correct TDS deduction, Form 16B issuance, and capital gains planning for eventual resale.",
    icon: "⚖️",
  },
  {
    problem: "Managing Property from Abroad",
    solution:
      "Our Property Management Concierge acts as your local representative — tenant sourcing, rent collection, maintenance coordination, society payments, and annual inspections. You receive regular photo/video updates. Peace of mind, guaranteed.",
    icon: "🛡️",
  },
];

const steps = [
  {
    title: "Initial Consultation",
    body: "Schedule a WhatsApp or Zoom consultation with Jeetu Chhaabria. We understand your requirements, budget, purpose (rental yield / capital gains / end-use), and preferred timeline. Confidential and free.",
  },
  {
    title: "Property Shortlisting",
    body: "We curate a shortlist of properties matching your brief. You receive detailed write-ups, floor plans, location analysis, and rental yield projections. No information overload — only relevant options.",
  },
  {
    title: "Virtual Tours",
    body: "We conduct live video walkthroughs of shortlisted properties. You ask questions in real-time. We give you honest assessments of the building quality, neighbourhood, and market value.",
  },
  {
    title: "Power of Attorney Setup",
    body: "You appoint a trusted representative in India (family member or our registered agent) via PoA. We guide you through executing the PoA in your country of residence and apostilling it for use in India.",
  },
  {
    title: "Transaction & Compliance",
    body: "Your PoA holder executes the purchase on your behalf. We coordinate stamp duty payment, registration, TDS deduction, and Form 16B filing. Your funds flow through NRE/NRO accounts as per RBI guidelines.",
  },
  {
    title: "Post-Purchase Management",
    body: "Once you own the property, we take over management. Tenant sourcing, rent collection, society maintenance payments, and property inspections — handled completely by us. Regular updates keep you informed.",
  },
];

const nriStats = [
  { val: "25+", label: "Years of NRI Service" },
  { val: "30%", label: "NRI Share of Transactions" },
  { val: "8", label: "Countries We Serve" },
  { val: "100%", label: "FEMA Compliant" },
];

export default function NRIPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy-gradient min-h-[80vh] flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-60 -right-60 w-[800px] h-[800px] rounded-full bg-navy-light/20 blur-[120px]" />
          <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-gold/5 blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-8xl mx-auto px-6 md:px-8 py-20 md:py-28 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left */}
            <div>
              <p className="section-label text-gold mb-5">NRI Investment Concierge</p>
              <h1 className="font-display text-white text-[clamp(2rem,4vw,3.2rem)] mb-5">
                Your Trusted Partner for Remote Property Investment
                <span className="text-gold block">in Mumbai.</span>
              </h1>
              <p className="text-white/55 text-base leading-[1.82] mb-8 max-w-lg">
                Serving NRI clients from Dubai, USA, UK, Singapore, Canada,
                and Australia for over 25 years. We make buying, managing,
                and selling Mumbai property completely seamless — no matter
                where in the world you are.
              </p>
              <div className="flex gap-4 flex-wrap">
                <a
                  href="https://wa.me/919820182285?text=Hi, I am an NRI looking to invest in Mumbai property. Can we schedule a consultation?"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold"
                >
                  Schedule NRI Consultation
                </a>
                <Link href="/contact" className="btn-outline-white">
                  Send Enquiry
                </Link>
              </div>
            </div>

            {/* Right — mini cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: "🇦🇪", label: "Dubai", sub: "DIFC & UAE Clients" },
                { icon: "🇺🇸", label: "USA & Canada", sub: "From New York to Toronto" },
                { icon: "🇬🇧", label: "UK", sub: "London, Manchester & More" },
                { icon: "🇦🇺", label: "Australia & Singapore", sub: "Asia-Pacific Clients" },
              ].map((c) => (
                <div
                  key={c.label}
                  className="bg-white/5 border border-white/10 rounded-xl p-5 flex gap-4 items-center hover:bg-white/10 transition-colors backdrop-blur-sm"
                >
                  <span className="text-3xl flex-shrink-0">{c.icon}</span>
                  <div>
                    <strong className="block text-white text-sm font-semibold mb-0.5">
                      {c.label}
                    </strong>
                    <span className="text-xs text-white/45">{c.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-8 md:gap-16 pt-12 mt-12 border-t border-white/15 flex-wrap">
            {nriStats.map((s) => (
              <div key={s.val}>
                <div className="font-display text-gold text-3xl font-bold mb-1">
                  {s.val}
                </div>
                <p className="text-xs text-white/45 tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges & Solutions */}
      <section className="bg-surface-light py-20 md:py-24">
        <div className="max-w-8xl mx-auto px-6 md:px-8">
          <ScrollReveal className="text-center mb-14">
            <p className="section-label justify-center">Common NRI Concerns</p>
            <h2 className="font-display text-navy mb-3">
              Every Challenge — Solved
            </h2>
            <p className="text-slate-navy max-w-md mx-auto text-sm leading-relaxed">
              We&apos;ve helped hundreds of NRI clients navigate these exact
              challenges. Here&apos;s how we solve each one.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {challenges.map((c, i) => (
              <ScrollReveal key={c.problem} delay={i * 80}>
                <div className="bg-white border border-navy-100 rounded-xl p-7 md:p-8 hover:border-navy-300 hover:-translate-y-0.5 transition-all duration-300 h-full shadow-card">
                  <div className="flex items-start gap-4 mb-5">
                    <span className="text-3xl flex-shrink-0">{c.icon}</span>
                    <div>
                      <p className="text-[0.65rem] font-bold tracking-widest uppercase text-slate-navy mb-1.5">
                        The Challenge
                      </p>
                      <h3 className="font-display text-navy text-lg leading-snug">
                        {c.problem}
                      </h3>
                    </div>
                  </div>
                  <div className="border-t border-navy-100 pt-5">
                    <p className="text-[0.68rem] font-bold tracking-widest uppercase text-navy mb-2.5">
                      Our Solution
                    </p>
                    <p className="text-sm text-slate-navy leading-[1.8]">
                      {c.solution}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Step-by-Step Guide */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-8xl mx-auto px-6 md:px-8">
          <ScrollReveal className="mb-14">
            <p className="section-label">How It Works</p>
            <h2 className="font-display text-navy mb-3">
              Your Remote Buying Journey — Step by Step
            </h2>
            <p className="text-slate-navy max-w-lg text-sm leading-relaxed">
              From first inquiry to keys in hand — this is exactly how we
              make remote Mumbai property purchase work.
            </p>
          </ScrollReveal>

          <div className="max-w-3xl">
            {steps.map((step, i) => (
              <ScrollReveal
                key={step.title}
                delay={i * 80}
                className="relative"
              >
                <div
                  className={`flex gap-6 ${i < steps.length - 1 ? "pb-10" : ""}`}
                >
                  {/* Number + line */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-11 h-11 rounded-full bg-navy flex items-center justify-center font-display font-bold text-white text-base z-10">
                      {i + 1}
                    </div>
                    {i < steps.length - 1 && (
                      <div
                        className="flex-1 w-0.5 mt-1"
                        style={{
                          background:
                            "linear-gradient(to bottom, #0B1B3D, rgba(11,27,61,0.12))",
                          minHeight: 32,
                        }}
                      />
                    )}
                  </div>
                  {/* Content */}
                  <div className="pt-2.5 pb-2">
                    <h4 className="font-display text-navy text-lg mb-2">
                      {step.title}
                    </h4>
                    <p className="text-sm text-slate-navy leading-[1.82]">
                      {step.body}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* NRI Specific Info */}
      <section className="bg-navy py-20 md:py-24">
        <div className="max-w-8xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <ScrollReveal>
              <p className="section-label text-gold mb-4">Compliance Guide</p>
              <h2 className="font-display text-white text-[1.7rem] mb-5">
                Key NRI Property Rules in India
              </h2>
              <div className="flex flex-col gap-5">
                {[
                  {
                    icon: "🏦",
                    title: "Funding Your Purchase",
                    desc: "NRIs must fund property purchases through NRE (Non-Resident External) or NRO (Non-Resident Ordinary) accounts. Direct foreign currency remittances are not permitted for immovable property.",
                  },
                  {
                    icon: "📊",
                    title: "TDS on Purchase",
                    desc: "When buying from a resident seller, TDS @ 1% applies. When buying from another NRI, TDS @ 20% (long-term) or 30% (short-term) applies on the capital gain. We coordinate all TDS filings.",
                  },
                  {
                    icon: "🔄",
                    title: "Repatriation of Funds",
                    desc: "Sale proceeds from up to 2 residential properties can be repatriated from an NRO account to your foreign account (up to $1 million per year) subject to tax clearance and RBI norms.",
                  },
                  {
                    icon: "📋",
                    title: "RERA Protection",
                    desc: "All properties we handle are RERA-registered, offering you statutory protection even as a remote buyer. Developers are legally obligated to deliver as promised.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 items-start">
                    <span className="text-xl flex-shrink-0 mt-0.5">{item.icon}</span>
                    <div>
                      <strong className="block text-sm font-semibold text-white mb-1">
                        {item.title}
                      </strong>
                      <p className="text-sm text-white/50 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Testimonial + CTA */}
            <ScrollReveal delay={120}>
              {/* NRI Testimonial */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-7 md:p-9 mb-6 backdrop-blur-sm">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(i => <span key={i} className="text-gold">★</span>)}
                </div>
                <p className="text-sm text-white/60 italic leading-[1.85] mb-6">
                  &ldquo;I was nervous about buying property in Mumbai while
                  living in Dubai. Jeetu sir handled absolutely everything —
                  virtual tours, the PoA process, TDS coordination, and even
                  the society transfer paperwork. I never needed to visit
                  India once. The property is now generating excellent rental
                  income. I can&apos;t recommend them enough.&rdquo;
                </p>
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-gold-dark to-gold flex items-center justify-center font-display font-bold text-navy">
                    VN
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Vikram Nair</p>
                    <p className="text-xs text-white/45">
                      NRI Client — Dubai | Purchased 2 BHK in Chembur
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Card */}
              <div className="bg-gold rounded-2xl p-7 md:p-9">
                <h3 className="font-display text-navy text-xl mb-3">
                  Schedule a Confidential NRI Consultation
                </h3>
                <p className="text-navy/60 text-sm leading-relaxed mb-6">
                  Tell us your requirements, budget, and timeline. We&apos;ll
                  respond within 24 hours with a personalised recommendation.
                  Free and no-obligation.
                </p>
                <a
                  href="https://wa.me/919820182285?text=Hi, I am an NRI based [your city] looking to invest in Mumbai real estate. Budget: [amount]. Looking for: [residential/commercial]. Can we schedule a consultation?"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-navy w-full justify-center text-sm"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white flex-shrink-0">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp for NRI Consultation
                </a>
                <p className="text-xs text-navy/45 text-center mt-3">
                  Response within 24 hours. WhatsApp, email, or Zoom.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
