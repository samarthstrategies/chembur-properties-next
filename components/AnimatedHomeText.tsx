"use client";

import React, { useEffect, useRef, useState } from "react";

export default function AnimatedHomeText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fillPercent, setFillPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // We want the animation to start when the top of the container hits the bottom third of the screen
      // and finish when it reaches the middle of the screen.
      const startTrigger = windowHeight * 0.8;
      const endTrigger = windowHeight * 0.3;
      
      const currentPos = rect.top;
      
      if (currentPos > startTrigger) {
        setFillPercent(0);
      } else if (currentPos < endTrigger) {
        setFillPercent(100);
      } else {
        const range = startTrigger - endTrigger;
        const scrolled = startTrigger - currentPos;
        const percentage = (scrolled / range) * 100;
        setFillPercent(percentage);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger once on mount
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-[60vh] bg-[#0B1B3D] flex flex-col items-center justify-center py-32 overflow-hidden border-t border-white/5"
    >
      {/* Subtle Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', 
          backgroundSize: '80px 80px', 
          backgroundPosition: 'center' 
        }} 
      />

      <div className="relative z-10 w-full flex flex-col items-center text-center px-4">
        <p className="font-display italic text-gold text-2xl md:text-4xl mb-4 md:mb-8 animate-fade-up">
          Find Your
        </p>

        <div className="relative w-full max-w-7xl mx-auto">
          {/* Base Layer: Outlined Text */}
          <h2 
            className="font-display font-bold text-[20vw] md:text-[18vw] leading-none tracking-widest uppercase select-none w-full text-center"
            style={{
              color: "transparent",
              WebkitTextStroke: "1px rgba(255, 215, 0, 0.4)", // Gold outline
            }}
          >
            HOME
          </h2>

          {/* Fill Layer: Image-Masked Text */}
          <div 
            className="absolute top-0 left-0 w-full h-full overflow-hidden"
            style={{
              clipPath: `inset(${100 - fillPercent}% 0 0 0)`
            }}
          >
            <h2 
              className="font-display font-bold text-[20vw] md:text-[18vw] leading-none tracking-widest uppercase select-none w-full text-center"
              style={{
                color: "transparent",
                backgroundImage: "url('/images/hero-property.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextStroke: "1px rgba(255, 215, 0, 0.8)", // Bright gold outline for filled state
              }}
            >
              HOME
            </h2>
          </div>
        </div>

        {/* Revealing Subtitle */}
        <p 
          className="font-body text-white/60 text-sm md:text-base tracking-[0.3em] uppercase mt-12 transition-all duration-1000"
          style={{
            opacity: fillPercent > 80 ? 1 : 0,
            transform: `translateY(${fillPercent > 80 ? 0 : 20}px)`
          }}
        >
          Mumbai&apos;s Most Exclusive Properties
        </p>
      </div>
    </section>
  );
}
