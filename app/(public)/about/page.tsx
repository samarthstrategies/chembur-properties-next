import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata = {
  title: "About Us | Chembur Properties — Roopam Estate Agency Est. 1965",
  description:
    "Founded by Late Shri Vashu B. Chhaabria in 1965, continued by Jeetu Chhaabria.",
};

const timeline = [
  { year: "1965", title: "Foundation", body: "Late Shri Vashu B. Chhaabria establishes Roopam Estate Agency in Chembur, Mumbai. The agency starts with a singular focus: honest, personalised real estate service for Chembur families. Chembur at the time is a rapidly growing suburb, attracting families from across Maharashtra." },
  { year: "1975", title: "Community Growth", body: "Roopam Estate Agency establishes itself as the go-to agency for the Chembur community. Word-of-mouth referrals drive growth. The agency begins handling commercial properties alongside residential, serving Chembur's growing business district." },
  { year: "1990", title: "Market Expansion", body: "The agency expands its geographic coverage beyond Chembur to include Ghatkopar, Wadala, and BKC — areas that are beginning to emerge as important commercial hubs. NRI clients begin approaching the agency for property management." },
  { year: "1990", title: "Generational Legacy", body: "Jeetu Chhaabria joins the family business, continuing the generational legacy established by his father. He brings renewed energy and a modernised approach while maintaining the core values of trust and personalised service that define the agency." },
  { year: "2003", title: "Digital Footprints", body: "Roopam Estate Agency becomes the first agency in Chembur to introduce LCD-based property inspections — showing clients high-quality property visuals before site visits. This was a pioneering move that dramatically improved the client experience." },
  { year: "2006", title: "The Website was Launched", body: "Roopam Estate Agency launches its first dedicated digital presence — chemburproperties.com.  " },
  { year: "2022", title: "Youtube Channel Launch", body: "Jeetu Chhaabria launches his Youtube channel — Chembur Properties — sharing market insights and property videos." },
  { year: "2026", title: "World-Class Transformation", body: "A New World Class transformation yet to come because of AI presence, a new technology acceptance to get a full proof service policy for buy, sell real estate" },
];

const team = [
  { initials: "JC", name: "Jeetu Chhaabria", role: "Principal Broker & Managing Director", bio: "Jeetu Chhaabria has been the heart of Roopam Estate Agency since 1990. With over 36 years of hands-on experience in the Chembur market, he personally oversees every significant transaction. His deep knowledge of the local market, combined with his reputation for unwavering integrity, has made him Chembur's most trusted real estate advisor. Because of this profound trust, national and international clients frequently grant him Power of Attorney to execute transactions and manage affairs on their behalf." },
  { initials: "CM", name: "", role: "Commercial Manager", bio: "" },
  { initials: "SM", name: "", role: "Sale Manager", bio: "" },
  { initials: "L&L", name: "", role: "Leave & Licence", bio: "" },
];



export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy-gradient min-h-[55vh] flex items-center overflow-hidden pt-[120px] md:pt-[150px] pb-14">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-60 -right-60 w-[700px] h-[700px] rounded-full bg-navy-light/20 blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-8xl mx-auto px-6 md:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div>
              <p className="section-label text-gold">Our Story</p>
              <h1 className="font-display text-white text-[clamp(2rem,4vw,3.2rem)] mb-5">
                50+ Years of Excellence
                <span className="text-gold block">in Chembur Real Estate.</span>
              </h1>
              <p className="text-white/55 text-base max-w-xl leading-[1.82]">
                We are a real estate firm based in Chembur with a vision to provide comprehensive and reliable property services to the community, backed by above 50 years of experience. We deal in residential and commercial properties in buy, sell and leave and lease.
              </p>
            </div>
            
            {/* Right Image */}
            <div className="relative h-[350px] md:h-[450px] w-full max-w-lg mx-auto lg:ml-auto lg:mr-0">
              <div className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent z-10 pointer-events-none" />
                <Image 
                  src="/images/JeetuChhaabria_half.png" 
                  alt="Jeetu Chhaabria - Chembur Properties"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
              {/* Decorative Accent */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gold/10 rounded-full blur-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Legacy Narrative */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-8xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal>
              <div className="flex items-center justify-center h-full min-h-[300px] lg:min-h-[400px]">
                <div className="relative w-[70%] max-w-[350px] aspect-square">
                  <Image 
                    src="/images/logo.png" 
                    alt="Chembur Properties Logo" 
                    fill
                    className="object-contain drop-shadow-xl"
                  />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={120}>
              <p className="section-label mb-4">Our Operations & Innovations</p>
              <h2 className="font-display text-navy text-[1.8rem] md:text-[2.2rem] mb-5">
                Setting New Standards
              </h2>
              <div className="space-y-4">
                <p className="text-sm text-slate-navy leading-[1.85]">
                  We mainly operate in Chembur — including Chunabhatti, Deonar, Govandi, Mahul, Pestom Sagar, Chheda Nagar, Tilak Nagar, and Ghatkopar Mankhurd Link Road. We also look forward to managing deals in nearby locations like Wadala, Sion, Ghatkopar, and Bhakti Park.
                </p>
                <p className="text-sm text-slate-navy leading-[1.85]">
                  In 2005, we became the first and only estate agent in Chembur to introduce property inspections via LCD projection at our office. This innovation was designed to save our clients <strong>TIME, FUEL, and ENERGY</strong>. This kind of presentation has been highly appreciated by our esteemed clients, further strengthening our commitment to exceptional service.
                </p>
                <p className="text-sm text-slate-navy leading-[1.85]">
                  To continue adding real value, we proudly launched <strong className="text-gold-dark">www.chemburproperties.com</strong> — a complete user-friendly portal dedicated to the Chembur area. This platform establishes our corporate image, maintains long-lasting customer relationships, and provides the best options from small projects to high-quality developments for Buy, Resell, Group Booking, Re-Development, and Leave & License deals.
                </p>
                <p className="text-sm text-slate-navy leading-[1.85] italic mt-4">
                  &ldquo;We are constantly improvising existing products and coming up with newer and better solutions. I thank you for logging onto www.chemburproperties.com and look forward to building a mutually beneficial relationship.&rdquo;
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
            
            <h2 className="font-display text-white mb-3">Man Himself</h2>
            <p className="text-white/50 max-w-md mx-auto text-sm leading-relaxed">
              The face of man the founder of chemburproperties.com
            </p>
          </ScrollReveal>

          {/* Leader */}
          <div className="flex justify-center mb-2">
            <ScrollReveal delay={0} className="max-w-sm">
              <div className="text-center">
                <div className="relative w-36 h-36 mx-auto mb-6 rounded-full border-3 border-gold/25 shadow-[0_0_0_6px_rgba(201,164,74,0.08)] overflow-hidden bg-navy-light">
                  <Image
                    src="/images/JeetuChhaabria_half.png"
                    alt={team[0].name}
                    fill
                    className="object-cover"
                    sizes="144px"
                  />
                </div>
                <h3 className="font-display text-white text-xl mb-1">
                  {team[0].name}
                </h3>
                <p className="text-[0.72rem] font-bold tracking-widest uppercase text-gold mb-4">
                  {team[0].role}
                </p>
                <p className="text-sm text-white/50 leading-[1.78]">
                  {team[0].bio}
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Connectors */}
          <div className="hidden md:block relative w-full h-[60px] mb-8">
            {/* Vertical drop from leader */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-[25px] bg-gold/40"></div>
            {/* Horizontal branch */}
            <div className="absolute top-[25px] h-px bg-gold/40" style={{ left: '16.66%', right: '16.66%' }}></div>
            {/* Three drops to subordinates */}
            <div className="absolute top-[25px] w-px h-[25px] bg-gold/40" style={{ left: '16.66%' }}>
              <div className="absolute bottom-[-6px] left-[-3.5px] w-0 h-0 border-l-[4px] border-r-[4px] border-t-[6px] border-l-transparent border-r-transparent border-t-gold/40"></div>
            </div>
            <div className="absolute top-[25px] left-1/2 -translate-x-1/2 w-px h-[25px] bg-gold/40">
              <div className="absolute bottom-[-6px] left-[-3.5px] w-0 h-0 border-l-[4px] border-r-[4px] border-t-[6px] border-l-transparent border-r-transparent border-t-gold/40"></div>
            </div>
            <div className="absolute top-[25px] w-px h-[25px] bg-gold/40" style={{ right: '16.66%' }}>
              <div className="absolute bottom-[-6px] left-[-3.5px] w-0 h-0 border-l-[4px] border-r-[4px] border-t-[6px] border-l-transparent border-r-transparent border-t-gold/40"></div>
            </div>
          </div>

          {/* Mobile Connectors */}
          <div className="md:hidden flex justify-center h-[40px] mb-6 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-[30px] bg-gold/40">
              <div className="absolute bottom-[-6px] left-[-3.5px] w-0 h-0 border-l-[4px] border-r-[4px] border-t-[6px] border-l-transparent border-r-transparent border-t-gold/40"></div>
            </div>
          </div>

          {/* Subordinates */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {team.slice(1).map((member, i) => (
              <ScrollReveal key={member.role} delay={(i + 1) * 100}>
                <div className="text-center">
                  <div className="w-36 h-36 rounded-full bg-gradient-to-br from-gold-dark to-gold flex items-center justify-center font-display font-bold text-navy text-3xl mx-auto mb-6 border-3 border-gold/25 shadow-[0_0_0_6px_rgba(201,164,74,0.08)]">
                    {member.initials}
                  </div>
                  <h3 className="font-display text-white text-xl mb-1">
                    {member.role}
                  </h3>
                  <p className="text-[0.72rem] font-bold tracking-widest uppercase text-gold mb-4">
                    Department Head
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
                    { val: "4.9★", label: "Google Rating" },
                    { val: "4.8★", label: "Justdial Rating" },
                    { val: "160", label: "Verified Reviews" },
                    { val: "RERA", label: "MahaRERA No: AS1800039361" },
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

      {/* Address */}
      <section className="bg-navy py-16 md:py-20 text-center">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <ScrollReveal>
            
            <h2 className="font-display text-white text-[2rem] md:text-[2.5rem] mb-6">
              Our Office
            </h2>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 backdrop-blur-sm shadow-xl">
              <p className="text-white text-lg font-display tracking-wide mb-3">Chembur Properties (Roopam Estate Agency)</p>
              <p className="text-white/60 text-sm leading-relaxed max-w-md mx-auto mb-8">
                Vishwakarma G-70, Central Avenue,<br />
                Inbetween Hotel Geeta Bhavan & Ratnagiri,<br />
                Chembur, Mumbai, Maharashtra 400071
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <a href="tel:+919820182285" className="btn-gold text-sm">
                  📞 98201 82285
                </a>
                <a href="mailto:roopamestate@gmail.com" className="btn-outline-white text-sm">
                  ✉️ Email Us
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
