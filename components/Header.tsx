"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/services", label: "Services" },
  { href: "/nri", label: "NRI Portal" },
  { href: "/insights", label: "Market Insights" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const WA_LINK = "https://wa.me/919820182285";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
    document.body.style.overflow = "";
  }, [pathname]);

  const toggleMenu = () => {
    const next = !menuOpen;
    setMenuOpen(next);
    document.body.style.overflow = next ? "hidden" : "";
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "h-[66px] bg-white/98 shadow-header backdrop-blur-xl border-b border-navy-100"
            : "h-20 bg-transparent"
        }`}
      >
        <div className="max-w-8xl mx-auto px-6 md:px-8 h-full flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex flex-col flex-shrink-0">
            <span
              className={`font-display text-[1.3rem] font-bold leading-tight tracking-tight transition-colors duration-300 ${
                scrolled ? "text-navy" : "text-white"
              }`}
            >
              Chembur Properties
            </span>
            <span
              className={`font-body text-[0.58rem] tracking-widest uppercase mt-0.5 transition-colors duration-300 ${
                scrolled ? "text-slate-navy" : "text-white/60"
              }`}
            >
              A Division of Roopam Estate Agency — Est. 1965
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-body text-[0.82rem] font-medium px-3 py-2 rounded tracking-wide transition-colors duration-200 relative ${
                  pathname === link.href
                    ? scrolled
                      ? "text-navy"
                      : "text-white"
                    : scrolled
                    ? "text-slate-navy hover:text-navy"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <span
                    className={`absolute bottom-0 left-3 right-3 h-0.5 rounded ${
                      scrolled ? "bg-gold" : "bg-gold"
                    }`}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop WA CTA */}
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-md text-[0.78rem] font-semibold tracking-wide transition-all duration-300 hover:-translate-y-px flex-shrink-0 ${
              scrolled
                ? "bg-navy text-white hover:bg-navy-rich hover:shadow-navy"
                : "bg-white text-navy hover:bg-white/90 hover:shadow-soft"
            }`}
          >
            <WhatsAppIcon
              className={`w-[15px] h-[15px] ${
                scrolled ? "fill-white" : "fill-navy"
              }`}
            />
            Chat with Us
          </a>

          {/* Mobile Hamburger */}
          <button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className="lg:hidden flex flex-col gap-1.5 p-2 z-[1001] flex-shrink-0"
          >
            <span
              className={`block w-5 h-0.5 rounded transition-all duration-300 origin-center ${
                menuOpen
                  ? "translate-y-2 rotate-45 bg-white"
                  : scrolled
                  ? "bg-navy"
                  : "bg-white"
              }`}
            />
            <span
              className={`block w-5 h-0.5 rounded transition-all duration-300 ${
                menuOpen
                  ? "opacity-0 scale-x-0 bg-white"
                  : scrolled
                  ? "bg-navy"
                  : "bg-white"
              }`}
            />
            <span
              className={`block w-5 h-0.5 rounded transition-all duration-300 origin-center ${
                menuOpen
                  ? "-translate-y-2 -rotate-45 bg-white"
                  : scrolled
                  ? "bg-navy"
                  : "bg-white"
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-navy/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-2 transition-all duration-300 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none -translate-y-3"
        }`}
      >
        {navLinks.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            className={`font-display text-[1.8rem] py-2.5 px-8 transition-colors duration-150 ${
              pathname === link.href
                ? "text-gold"
                : "text-white hover:text-gold"
            }`}
            style={{ transitionDelay: menuOpen ? `${i * 40}ms` : "0ms" }}
          >
            {link.label}
          </Link>
        ))}
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 bg-gold text-navy px-9 py-3.5 rounded-md font-body font-semibold text-base flex items-center gap-2"
        >
          <WhatsAppIcon className="w-5 h-5 fill-navy" />
          WhatsApp Us
        </a>
      </div>
    </>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
