"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const testimonials = [
  {
    name: "Rituparna",
    info: "Local Guide · 12 reviews",
    initials: "R",
    rating: 5,
    text: "I had an amazing experience with Kunal. He was very helpful during the whole process. Finding a suitable place as per my requirements, helping with the process of making the agreement, regaitration and even post support have been very good. Extremely satisfied. Roopam Estates and Jeetu Chabbaria and Kunal are going to for any property related work in Chembur.",
  },
  {
    name: "Avinash Jadhao",
    info: "Local Guide · 62 reviews",
    initials: "AJ",
    rating: 5,
    text: "When I came to Mumbai around 50 days back, I contacted a few brokers for a flat. I saw around 15-20 flats personally through different brokers. However, the flats shown by Meenu Ma’am were as per my requirements — including car parking, proximity to my office, and fairly new construction. After almost a week of flat hunting, she found me a really good flat in an area close to my office!",
  },
  {
    name: "Vilas Sawant",
    info: "1 review",
    initials: "VS",
    rating: 5,
    text: "I have done business from with mr vasu chhaabria father of jeetu chhaabria. The father was also good at his services and jeetu chhaabria has also given the same of good professional business real estate services. We are thanks full to the team meenu has also given us good assistance in finding us a good home. Thanks to Mr jeetu. We highly recommend roopam estate agency at chembur.",
  },
  {
    name: "Urvi Shah",
    info: "Local Guide · 16 reviews",
    initials: "US",
    rating: 5,
    text: "Had a great experience with Roop Estate Agency. The whole process was smooth and hassle-free. Jeetu bhai and Kunal ji are very professional, helpful, and made sure the deal was done in benefit of all. Really happy with the service.",
  },
  {
    name: "Gautam Suhanda",
    info: "1 review",
    initials: "GS",
    rating: 5,
    text: "I want to sincerely thank Roopam Estate Agency for helping me find the perfect place for my restaurant. Their team was professional, patient, and really understood my requirement. From property visits to finalizing the deal, the entire process was smooth and stress-free. I truly appreciate their support and highly recommend them to anyone looking for commercial spaces.",
  },
  {
    name: "Lyn Lobo",
    info: "9 reviews",
    initials: "LL",
    rating: 5,
    text: "Mr. Jeetu Chhaabria from Roopam Estate Agency is the Best Realtor … He is very experienced and so professional. He manages the House Sale/ Rental contracts with such precise and swift turnarounds. We live in Dubai and Mr. Jeetu manages the entire process by himself with just some pre- approvals from us. We highly recommend everyone to use Roopam Estate Agency.",
  },
  {
    name: "Venkatesan Udayamurthi",
    info: "9 reviews",
    initials: "VU",
    rating: 5,
    text: "I had a very good experience with Roopam Real Estate Agency in finding a flat on Rent in Chembur prime location. Jeetu Chhabria is very nice negotiator and very transparent and lucid in his dealings. No procrastination in taking any decisions. Very prompt in communication. Thanks to Jeetu bhai.",
  },
  {
    name: "Purushartha Satish",
    info: "3 reviews",
    initials: "PS",
    rating: 5,
    text: "Roopam Estate Agency is undoubtedly the best in Chembur (Mumbai) … Jeetu Ji and his associate Meenu were a blessing in disguise - they were kind, patient, understood my requirement perfectly, and delivered on their promise in record time. For a tenant, there is nothing more valuable than a trustworthy, pragmatic and reliable broker. Thank you Jeetu Ji and Meenu!",
  },
  {
    name: "Philoo Lobo",
    info: "5 reviews",
    initials: "PL",
    rating: 5,
    text: "Chembur Properties (Roopam Estate) has given us quick and excellent Service from last 2 decades. Jeetu Chhabria managed all A to Z of finding new tenants n smootening the way through all the steps required: easing the old tenants out n making the house ready for the new tenants. He does this in the quickest time. We have 100% trust n Confidence in him.",
  },
  {
    name: "Anushal Singh",
    info: "9 reviews",
    initials: "AS",
    rating: 5,
    text: "Had a great experience with Jeetu and his team. They were really helpful and got me a flat within a day. Will recommend Chembur properties for anyone looking for real estate options.",
  }
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
            className={`h-2 rounded-full transition-all duration-300 border-none cursor-pointer ${i === current ? "bg-gold w-6" : "bg-navy-200 w-2"
              }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
