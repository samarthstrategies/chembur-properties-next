import Link from "next/link";
import Image from "next/image";

const WA_LINK = "https://wa.me/919820182285";

export default function Footer() {
  return (
    <footer className="bg-navy-deep">
      {/* Main */}
      <div className="max-w-8xl mx-auto px-6 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex flex-col mb-6">
              <div className="relative w-[220px] h-[52px] sm:w-[300px] sm:h-[70px] lg:w-[420px] lg:h-[100px]">
                <Image
                  src="/images/logo.png"
                  alt="Chembur Properties Logo"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>

            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold text-navy px-5 py-2.5 rounded-md text-sm font-semibold transition-all hover:bg-gold-light hover:shadow-gold"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-navy" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12c0 1.379.28 2.693.784 3.888c.279.66.418.99.436 1.24c.017.25-.057.524-.204 1.073L2 22l3.799-1.016c.549-.147.823-.22 1.073-.204c.25.018.58.157 1.24.436A10 10 0 0 0 12 22Z" />
                <path strokeLinecap="round" d="M12.882 12C14.052 12 15 13.007 15 14.25s-.948 2.25-2.118 2.25h-2.47c-.666 0-.998 0-1.205-.203S9 15.768 9 15.115V12m3.882 0C14.052 12 15 10.993 15 9.75s-.948-2.25-2.118-2.25h-2.47c-.666 0-.998 0-1.205.203S9 8.232 9 8.885V12m3.882 0H9" />
              </svg>
              WhatsApp Us
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <p className="font-body text-[0.68rem] font-bold tracking-[0.18em] uppercase text-gold mb-5">
              Quick Links
            </p>
            <ul className="flex flex-col gap-3">
              {[
                { href: "/", label: "Home" },
                { href: "/properties", label: "Properties" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/50 hover:text-gold transition-all duration-150 hover:pl-1"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-body text-[0.68rem] font-bold tracking-[0.18em] uppercase text-gold mb-5">
              Contact Us
            </p>
            <div className="flex flex-col gap-4">
              {[
                {
                  icon: "📍",
                  text: "Vishwakarma G-70, Central Avenue, Inbetween Hotel Geeta Bhavan & Ratnagiri, Chembur, Mumbai, Maharashtra 400071",
                },
                {
                  icon: "📧",
                  text: "roopamestate@gmail.com",
                  href: "mailto:roopamestate@gmail.com",
                },
                {
                  icon: "📞",
                  text: "98201 82285",
                  href: "tel:+919820182285",
                },
                {
                  icon: "💬",
                  text: "WhatsApp: wa.me/919820182285",
                  href: WA_LINK,
                },
                {
                  icon: "🕐",
                  text: "Mon–Sat: 10:30 AM – 7:30 PM",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="text-sm mt-0.5 flex-shrink-0">
                    {item.icon}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-sm text-white/50 hover:text-gold transition-colors leading-relaxed"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <p className="text-sm text-white/50 leading-relaxed">
                      {item.text}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Trust Bar */}
      <div className="border-t border-white/8">
        <div className="max-w-8xl mx-auto px-6 md:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center flex-wrap gap-0">
            {[
              "Est. 1965",
              "4.9★ Google Rating",
              "160 Verified Reviews",
              "RERA Registered",
              "MahaRERA: AS1800039361",
            ].map((item, i) => (
              <span
                key={item}
                className={`text-[0.72rem] font-semibold text-gold/80 px-4 ${i > 0 ? "border-l border-gold/20" : ""
                  } ${i === 0 ? "pl-0" : ""}`}
              >
                {item}
              </span>
            ))}
          </div>
          <div className="flex flex-col sm:items-end gap-1 mt-2 sm:mt-0">
            <p className="text-[0.72rem] text-white/25">
              © {new Date().getFullYear()} Roopam Estate Agency. All Rights Reserved.
            </p>
            <p className="text-[0.68rem] text-white/40">
              Designed & Developed by{" "}
              <a 
                href="https://samarthstrategies.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#D4A017] font-semibold tracking-wide hover:text-white transition-colors"
              >
                Samarth Strategies
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
