"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const testimonials = [
  {
    name: "Anjali Mallya",
    info: "Chembur Resident — 10+ Year Client",
    initials: "AM",
    rating: 5,
    text: "Working with Roopam Estate Agency for over a decade. Jeetu sir's ability to understand complex requirements and genuinely reduce the stress of property hunting is truly unmatched. Every transaction felt personal, never transactional.",
  },
  {
    name: "Sameer Gokhale",
    info: "Long-term Client — Multiple Transactions",
    initials: "SG",
    rating: 5,
    text: "6–7 years of continuous relationship with the team. The groundwork, personal involvement, and meticulous follow-through from Jeetu sir, Shyam, and Raman is extraordinary. They don't just sell properties — they build trust.",
  },
  {
    name: "Rajashree Lala",
    info: "Chembur East — Residential Client",
    initials: "RL",
    rating: 5,
    text: "The out-of-the-way support this agency provides is something no other agency offers. They treat every transaction with deep personal involvement and are always available when you need them most.",
  },
  {
    name: "Vikram Nair",
    info: "NRI Client — Dubai",
    initials: "VN",
    rating: 5,
    text: "As an NRI based in Dubai, I was nervous about buying property remotely. Jeetu sir handled everything — from site visits to paperwork to registration — while keeping me informed at every step. Extraordinary service.",
  },
  {
    name: "Priya Desai",
    info: "Commercial Property Owner",
    initials: "PD",
    rating: 5,
    text: "Roopam Estate Agency managed my commercial property in Chembur while I lived abroad for 3 years. Not a single day of vacancy, zero maintenance headaches. Their property management service is world-class.",
  },
];

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const getVisible = () => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1100) return 2;
    return 3;
  };

  const [visible, setVisible] = useState(3);
  const maxIndex = Math.max(0, testimonials.length - visible);

  useEffect(() => {
    setVisible(getVisible());
    const handleResize = () => {
      setVisible(getVisible());
      setCurrent(0);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);
  }, [maxIndex]);

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startInterval]);

  const handleDotClick = (idx: number) => {
    setCurrent(Math.max(0, Math.min(idx, maxIndex)));
    startInterval();
  };

  const gap = 24;

  return (
    <div>
      {/* Track wrapper */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(calc(-${current * (100 / visible)}% - ${(current * gap) / visible}px))`,
            gap: `${gap}px`,
          }}
        >
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex-shrink-0 bg-white rounded-xl p-8 border border-navy-100 shadow-card hover:shadow-card-hover transition-all duration-300"
              style={{
                width: `calc(${100 / visible}% - ${(gap * (visible - 1)) / visible}px)`,
              }}
            >
              {/* Quote icon */}
              <div className="mb-4">
                <svg
                  className="w-8 h-8 text-gold/40"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="text-gold text-base">
                    ★
                  </span>
                ))}
              </div>
              {/* Text */}
              <p className="text-sm text-slate-dark leading-[1.85] italic mb-6">
                &ldquo;{t.text}&rdquo;
              </p>
              {/* Separator */}
              <div className="h-px bg-navy-100 mb-5" />
              {/* Author */}
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-navy to-navy-light flex items-center justify-center font-display font-bold text-white text-sm flex-shrink-0">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-bold text-navy">{t.name}</p>
                  <p className="text-xs text-slate-navy">{t.info}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => handleDotClick(i)}
            className={`h-2 rounded-full transition-all duration-300 border-none cursor-pointer ${
              i === current ? "bg-gold w-6" : "bg-navy-200 w-2"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
