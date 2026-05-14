"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];



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
            ? "h-[96px] md:h-[116px] bg-navy/95 shadow-lg backdrop-blur-xl border-b border-white/10"
            : "h-[110px] md:h-[130px] bg-transparent"
        }`}
      >
        <div className="max-w-8xl mx-auto px-6 md:px-8 h-full flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0 ml-2 md:ml-4 origin-left scale-[1.1] md:scale-[1.25] xl:scale-[1.35] transition-transform">
            <div className="relative w-[250px] h-[58px] md:w-[400px] md:h-[80px] flex-shrink-0">
              <Image 
                src="/images/logo.png" 
                alt="Chembur Properties Logo" 
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav & CTA Group */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-6 flex-1 justify-end pr-2 xl:pr-8">
            <nav className="flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-body text-[0.85rem] font-medium px-3 py-2 rounded tracking-wide transition-colors duration-200 relative ${
                  pathname === link.href
                    ? "text-white"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <span
                    className="absolute bottom-0 left-3 right-3 h-0.5 rounded bg-gold"
                  />
                )}
              </Link>
            ))}
            </nav>

            <a
              href="tel:+919820182285"
              className="flex items-center gap-2 px-5 py-2.5 rounded-md text-[0.8rem] font-semibold tracking-wide transition-all duration-300 hover:-translate-y-px flex-shrink-0 bg-gold text-navy hover:bg-gold/90 shadow-soft"
            >
              <span className="text-sm">📞</span> Call Us
            </a>
          </div>

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
                  : "bg-white"
              }`}
            />
            <span
              className={`block w-5 h-0.5 rounded transition-all duration-300 ${
                menuOpen
                  ? "opacity-0 scale-x-0 bg-white"
                  : "bg-white"
              }`}
            />
            <span
              className={`block w-5 h-0.5 rounded transition-all duration-300 origin-center ${
                menuOpen
                  ? "-translate-y-2 -rotate-45 bg-white"
                  : "bg-white"
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-navy/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-2 transition-all duration-300 ${
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
          href="tel:+919820182285"
          className="mt-6 bg-gold text-navy px-9 py-3.5 rounded-md font-body font-semibold text-base flex items-center gap-2"
        >
          <span className="text-xl">📞</span>
          Call Us
        </a>
      </div>
    </>
  );
}


