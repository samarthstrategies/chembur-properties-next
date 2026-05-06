import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata = {
  title: "Real Estate Services | Chembur Properties",
  description:
    "Comprehensive real estate services: Buy & Sell, Rent & Lease, Property Management, Redevelopment Advisory, Legal & Registration, NRI Concierge.",
};

const services = [
  {
    id: "buy-sell",
    num: "01",
    icon: "🏠",
    title: "Buy & Sell Properties",
    tag: "Residential & Commercial",
    imageUrl: "/images/services/buy_sell.png",
    body: [
      "With 61 years of deep market knowledge in Chembur and Mumbai, Roopam Estate Agency facilitates seamless property purchases and sales for residential and commercial clients.",
      "Whether you are a first-time buyer navigating the complexities of a Mumbai property transaction, an investor seeking capital appreciation, or a seller wanting the best price in minimum time — our team provides end-to-end guidance.",
    ],
    steps: [
      { title: "Requirement Understanding", desc: "We begin with a detailed consultation to understand your budget, location preference, configuration needs, and timeline." },
      { title: "Curated Property Shortlist", desc: "Based on your requirements, we present only relevant options — saving you time and reducing decision fatigue." },
      { title: "Site Visits & Due Diligence", desc: "We accompany you on visits, provide honest assessments, and conduct preliminary due diligence on each property." },
      { title: "Negotiation & Deal Structuring", desc: "Our deep market knowledge allows us to negotiate fair prices and structure deals that protect your interests." },
      { title: "Documentation & Registration", desc: "We coordinate with solicitors, builders, and banks to ensure smooth paperwork and timely registration." },
    ],
    highlight:
      "We have facilitated transactions worth hundreds of crores across Chembur, Ghatkopar, Wadala, and BKC. Every buyer and seller we work with receives personal attention from Jeetu Chhaabria himself.",
  },
  {
    id: "rent-lease",
    num: "02",
    icon: "🔑",
    title: "Rent & Lease",
    tag: "Leave & License | Commercial Leasing",
    imageUrl: "/images/services/rent_lease.png",
    body: [
      "Our rental and leasing services cover residential Leave & License agreements, commercial leasing, and group/bulk bookings for corporate housing. We serve landlords seeking reliable tenants and tenants seeking quality homes.",
      "For commercial clients, we specialise in office spaces, retail units, and industrial properties across Chembur's prime corridors.",
    ],
    steps: [
      { title: "Tenant / Property Sourcing", desc: "We match landlords with pre-verified tenants and tenants with properties that meet their specific requirements." },
      { title: "Background Verification", desc: "Basic background and employment verification for prospective tenants to protect landlord interests." },
      { title: "Agreement Drafting", desc: "We assist with Leave & License agreement drafting, ensuring all clauses protect both parties appropriately." },
      { title: "Registration & Notarisation", desc: "Full support for agreement registration, notarisation, and the deposit of applicable stamp duty." },
      { title: "Handover Coordination", desc: "We coordinate the property handover, key exchange, and document checklist to ensure a smooth transition." },
    ],
    highlight:
      "Our rental inventory includes options from ₹20,000/month starter apartments to ₹1,50,000/month luxury homes. Commercial spaces from 300 sq ft to 10,000+ sq ft.",
  },
  {
    id: "management",
    num: "03",
    icon: "🛡️",
    title: "Property Management Concierge",
    tag: "NRI Absentee Landlord Services",
    imageUrl: "/images/services/property_management.png",
    body: [
      "Our Property Management Concierge service is designed for landlords who cannot — or do not want to — be involved in the day-to-day management of their Mumbai properties. This service is particularly valuable for NRI clients who live overseas.",
      "We act as your trusted local representative, handling everything from tenant management and rent collection to maintenance coordination and refurbishment oversight.",
    ],
    steps: [
      { title: "Tenant Exit Management", desc: "We manage tenant exits professionally — inspections, security deposit reconciliation, and legal notices if required." },
      { title: "Property Assessment & Repairs", desc: "Post-vacancy, we assess the property condition, coordinate minor repairs, and supervise any required maintenance work." },
      { title: "Refurbishment Oversight", desc: "For properties requiring renovation before re-letting, we manage the entire refurbishment process with trusted contractors." },
      { title: "New Tenant Sourcing", desc: "We source, screen, and onboard new tenants — minimising vacancy periods and maximising rental yield." },
      { title: "Ongoing Liaison", desc: "Regular updates to you on property condition, rent status, and any issues — completely remote-friendly." },
    ],
    highlight:
      "For NRI landlords: we have managed absentee landlord properties for clients in Dubai, USA, UK, Singapore, and Canada. Our clients trust us to protect and grow their most valuable Indian assets while they are abroad.",
  },
  {
    id: "redevelopment",
    num: "04",
    icon: "🏗️",
    title: "Redevelopment Advisory",
    tag: "Housing Society | Builder Liaison",
    imageUrl: "/images/services/redevelopment_advisory.png",
    body: [
      "Redevelopment is one of the most complex and high-stakes decisions a housing society can make. Roopam Estate Agency has guided multiple housing societies through the redevelopment process — from the very first conversation to successful completion and handover.",
      "Our advisory service covers every stage: building internal consensus, conducting builder due diligence, structuring legal agreements, and ensuring resident interests are protected throughout the process.",
    ],
    steps: [
      { title: "Society Feasibility Assessment", desc: "We evaluate whether your society is a viable redevelopment candidate based on FSI availability, land area, and market conditions." },
      { title: "Committee Consensus Building", desc: "We facilitate structured committee meetings, resident Q&A sessions, and help build the required consensus among society members." },
      { title: "Builder Shortlisting & Due Diligence", desc: "We evaluate builders based on track record, financial strength, RERA compliance, and past project delivery quality." },
      { title: "Term Sheet & Agreement Review", desc: "We help residents understand and negotiate key terms: area ratio, corpus fund, rent during construction, and handover timelines." },
      { title: "Legal Structuring Coordination", desc: "We coordinate with solicitors to ensure the Development Agreement, POA, and related documents are resident-friendly and legally sound." },
      { title: "Construction Period Support", desc: "Ongoing liaison with the developer during construction to ensure commitments are honoured and timelines are met." },
    ],
    highlight:
      "Chembur has seen significant redevelopment activity in recent years. With FSI norms favouring redevelopment and land being scarce, societies that move now are best positioned to maximise their benefit.",
  },
  {
    id: "legal",
    num: "05",
    icon: "⚖️",
    title: "Legal & Registration",
    tag: "Stamp Duty | Title Clearance | Registration",
    imageUrl: "/images/services/legal_registration.png",
    body: [
      "Property transactions in Maharashtra involve complex stamp duty calculations, registration procedures, and title verification requirements. Our team provides practical, step-by-step guidance to simplify this process.",
      "We work alongside qualified solicitors to provide legal advisory services — ensuring you understand every document you sign and every fee you pay.",
    ],
    steps: [
      { title: "Stamp Duty Calculation", desc: "We calculate the applicable stamp duty based on property type, location, and transaction value — including available exemptions." },
      { title: "Title Search & Clearance", desc: "We assist with title searches to verify that the property has clear, marketable title with no encumbrances or disputes." },
      { title: "Agreement to Sale", desc: "We coordinate the drafting and execution of the Agreement to Sale, protecting buyer and seller interests." },
      { title: "Home Loan Coordination", desc: "If you require a home loan, we coordinate with bank representatives to streamline the approval and disbursement process." },
      { title: "Sub-Registrar Appointment", desc: "We book and coordinate your Sub-Registrar appointment, prepare all required documents, and accompany you if needed." },
      { title: "Society Transfer & Share Certificate", desc: "Post-registration, we assist with the society membership transfer and share certificate endorsement." },
    ],
    highlight:
      "Maharashtra stamp duty is 5% for men, 4% for women buyers. Registration fees are 1% of the transaction value. We help you plan these costs in advance and avoid surprises.",
  },
  {
    id: "nri",
    num: "06",
    icon: "✈️",
    title: "NRI Concierge Services",
    tag: "Remote Buying | Property Management | Compliance",
    imageUrl: "/images/services/nri_concierge.png",
    body: [
      "For over 25 years, Roopam Estate Agency has been the trusted partner of NRI clients from Dubai, USA, UK, Singapore, Canada, and Australia. We understand the unique challenges of buying, selling, and managing property in India while living abroad.",
      "Our NRI Concierge service covers the full lifecycle: from initial property identification and virtual tours, through remote purchase with Power of Attorney, to ongoing property management and eventual resale.",
    ],
    steps: [
      { title: "Virtual Property Tours", desc: "We conduct live video walkthroughs of shortlisted properties, giving you an authentic feel without being physically present." },
      { title: "Power of Attorney Framework", desc: "We guide you through the PoA process — who to appoint, how to execute it in your country of residence, and how to use it legally." },
      { title: "Banking & FEMA Compliance", desc: "We advise on NRE/NRO/FCNR account requirements, repatriation rules, and FEMA compliance for your transaction." },
      { title: "TDS & Tax Advisory", desc: "NRI property purchases attract TDS. We coordinate with our CA partners to ensure correct TDS deduction and filing." },
      { title: "Full Transaction Management", desc: "From token payment to registration — we manage everything on your behalf with regular updates via WhatsApp and email." },
      { title: "Post-Purchase Management", desc: "Once you own the property, we manage it — tenant sourcing, rent collection, maintenance, and yearly inspections." },
    ],
    highlight:
      "30% of our transactions in 2025 were with NRI clients. We have facilitated NRI investments from ₹50 Lakh to ₹15 Crore — fully remote, fully compliant.",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy-gradient min-h-[44vh] flex items-center overflow-hidden pt-20 pb-12">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-navy-light/20 blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-8xl mx-auto px-6 md:px-8 w-full">
          <p className="section-label text-gold">What We Offer</p>
          <h1 className="font-display text-white text-[clamp(2rem,4vw,3.2rem)] mb-4">
            Comprehensive Real Estate Services
          </h1>
          <p className="text-white/55 text-base max-w-xl leading-relaxed">
            From property search to registration, from NRI concierge to
            redevelopment advisory — we provide complete lifecycle support
            for every real estate need.
          </p>
        </div>
      </section>

      {/* Service Sections — alternating white/light */}
      {services.map((svc, i) => {
        const isNavy = i % 2 !== 0;
        return (
          <section
            key={svc.id}
            id={svc.id}
            className={`py-20 md:py-24 ${isNavy ? "bg-navy" : "bg-surface-light"}`}
          >
            <div className="max-w-8xl mx-auto px-6 md:px-8">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center ${i % 2 === 0 ? "" : "lg:[direction:rtl]"}`}>
                {/* Visual */}
                <ScrollReveal>
                  <div
                    className="relative h-[340px] md:h-[420px] rounded-2xl overflow-hidden lg:[direction:ltr] bg-navy group"
                  >
                    <img
                      src={svc.imageUrl}
                      alt={svc.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-navy/50 via-transparent to-navy/80 mix-blend-multiply" />
                    <div className="absolute bottom-7 right-7 text-6xl opacity-90 drop-shadow-lg">
                      {svc.icon}
                    </div>
                    <div className="absolute top-7 left-7">
                      <span className="font-display text-white/50 text-7xl font-bold leading-none drop-shadow-md">
                        {svc.num}
                      </span>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Content */}
                <ScrollReveal delay={100} className="lg:[direction:ltr]">
                  <p className={`font-body text-[0.68rem] font-bold tracking-[0.18em] uppercase mb-3 ${isNavy ? "text-gold" : "text-navy"}`}>
                    {svc.tag}
                  </p>
                  <h2 className={`font-display text-[1.7rem] md:text-[2.1rem] mb-5 ${isNavy ? "text-white" : "text-navy"}`}>
                    {svc.title}
                  </h2>
                  {svc.body.map((para, j) => (
                    <p
                      key={j}
                      className={`text-sm leading-[1.82] mb-4 ${isNavy ? "text-white/55" : "text-slate-navy"}`}
                    >
                      {para}
                    </p>
                  ))}

                  {/* Highlight box */}
                  <div className={`border-l-4 border-gold px-5 py-4 my-5 rounded-r ${isNavy ? "bg-gold/8" : "bg-gold/10"}`}>
                    <p className={`text-sm leading-[1.75] italic ${isNavy ? "text-white/60" : "text-slate-dark"}`}>
                      {svc.highlight}
                    </p>
                  </div>

                  {/* Steps */}
                  <div className="flex flex-col gap-4 mt-6">
                    {svc.steps.slice(0, 3).map((step, j) => (
                      <div key={j} className="flex gap-3.5 items-start">
                        <div className="w-7 h-7 rounded-full bg-gold flex items-center justify-center text-navy font-bold text-xs flex-shrink-0 mt-0.5">
                          {j + 1}
                        </div>
                        <div>
                          <strong className={`block text-sm font-semibold mb-0.5 ${isNavy ? "text-white" : "text-navy"}`}>
                            {step.title}
                          </strong>
                          <span className={`text-xs leading-relaxed ${isNavy ? "text-white/45" : "text-slate-navy"}`}>
                            {step.desc}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex gap-4 flex-wrap">
                    <a
                      href="https://wa.me/919820182285"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-gold text-sm"
                    >
                      Inquire on WhatsApp
                    </a>
                    <Link href="/contact" className={`text-sm font-semibold flex items-center gap-1.5 hover:gap-3 transition-all ${isNavy ? "text-gold" : "text-navy"}`}>
                      Contact Form →
                    </Link>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="bg-gold py-16 md:py-20 text-center">
        <div className="max-w-8xl mx-auto px-6 md:px-8">
          <h2 className="font-display text-navy text-[2rem] md:text-[2.4rem] mb-3">
            Ready to Get Started?
          </h2>
          <p className="text-navy/60 text-base max-w-md mx-auto mb-9">
            Whatever your real estate need, our team has the expertise and
            the relationships to make it happen.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="https://wa.me/919820182285"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-navy text-sm"
            >
              WhatsApp Consultation
            </a>
            <Link
              href="/contact"
              className="btn-outline-navy text-sm"
            >
              Send an Enquiry
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
