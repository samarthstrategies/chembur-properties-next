"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const testimonials = [
  {
    name: "S P",
    info: "Google Review — Verified Client",
    initials: "SP",
    rating: 5,
    text: "Jeetu Chhaabria exemplifies the epitome of professionalism within the realm of real estate. Possessing an intimate and comprehensive understanding of the Chembur real estate market, Mr. Chhaabria stands as a seasoned expert. His unwavering commitment to punctuality and impeccable conduct underscores his reliability as a trustworthy professional.",
  },
  {
    name: "Lyn Lobo",
    info: "NRI Client — Dubai",
    initials: "LL",
    rating: 5,
    text: "Mr. Jeetu Chhaabria from Roopam Estate Agency is the Best Realtor. He manages the House Sale/Rental contracts with precise and swift turnarounds. We live in Dubai and Mr. Jeetu manages the entire process by himself. We have been using his Agency for over 20 years and he is like a Family member.",
  },
  {
    name: "Peyush Gupta",
    info: "Relocated from Gurgaon — Verified Client",
    initials: "PG",
    rating: 5,
    text: "Very professional and genuine. Jeetu Chhaabria is one of finest and genuine real estate professional. He is quite fair in his dealing and helped me to find a good flat in Mumbai when I relocated from Gurgaon. Best part is he is always there for you to ensure you get fully settled in the house post shifting.",
  },
  {
    name: "Mohana Subramaniam",
    info: "15-Year Client — Multiple Transactions",
    initials: "MS",
    rating: 5,
    text: "I have been dealing with Jeetu Chabbria for last 15 years for all my real estate requirements of buying, selling and renting. He is very Professional, responsive and comes up with solutions to meet clients requirements. They have been there for more than 30/40 years and have invaluable experience.",
  },
  {
    name: "Venkatesan Udayamurthi",
    info: "Google Review — Rental Client",
    initials: "VU",
    rating: 5,
    text: "I had a very good experience with Roopam Real Estate Agency in finding a flat on Rent in Chembur prime location. Jeetu Chhabria is very nice negotiator and very transparent and lucid in his dealings. No procrastination in taking any decisions. Very prompt in communication.",
  },
  {
    name: "Gautam Suhanda",
    info: "Commercial Client — Restaurant Owner",
    initials: "GS",
    rating: 5,
    text: "I want to sincerely thank Roopam Estate Agency for helping me find the perfect place for my restaurant. Their team was professional, patient, and really understood my requirement. From property visits to finalizing the deal, the entire process was smooth and stress-free.",
  },
  {
    name: "Aasif Parvez",
    info: "Google Review — Verified Client",
    initials: "AP",
    rating: 5,
    text: "Jeetu is very professional, knowledgeable and goes above and beyond to ensure that your requirements as a client are met. I have had a great experience working with him and look forward to having a lasting business relationship. I highly recommend Jeetu Chhabria and his team!",
  },
  {
    name: "Minakshi Sharma",
    info: "4-Year Client — Buy & Rent",
    initials: "MS",
    rating: 5,
    text: "Mr. Jeetu Chhabria is excellent in his work. His professional way of handling his work, personal rapport with his clients, promptness and effective management of property purchase/rent is unmatched. For anyone looking for flats in Chembur, he is the best. I recommend him highly.",
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
