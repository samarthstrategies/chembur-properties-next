"use client";

import { useState, useEffect } from "react";

export default function HeroMockupCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % totalSlides);
    }, 6000); // 6 seconds per slide
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[600px] md:h-[750px] flex items-center justify-center">
      
      {/* ── Slide 1: iPhone (Current Video) ── */}
      <div 
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
          activeSlide === 0 ? "opacity-100 z-20" : "opacity-0 z-0 pointer-events-none"
        }`}
      >
        <div className="relative w-[300px] h-[620px] md:w-[360px] md:h-[740px] rounded-[3.5rem] md:rounded-[4rem] bg-black p-[3px] shadow-[0_30px_60px_rgba(0,0,0,0.1),_0_0_80px_rgba(255,255,255,0.8)]">
          {/* Outer Titanium Border Gradient */}
          <div className="absolute inset-0 rounded-[3.5rem] md:rounded-[4rem] bg-gradient-to-b from-[#e5e7eb] via-[#71717a] to-[#27272a]" />
          
          {/* Inner Black Bezel */}
          <div className="absolute inset-[3px] bg-black rounded-[3.3rem] md:rounded-[3.8rem] overflow-hidden border-[6px] md:border-[8px] border-black">
            
            {/* Screen Content (Video) */}
            <div className="relative w-full h-full bg-[#111] rounded-[2.8rem] md:rounded-[3.2rem] overflow-hidden">
              {/* Dynamic Island */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[100px] md:w-[110px] h-7 md:h-8 bg-black rounded-full z-20 flex items-center justify-end px-3 shadow-[inset_0_-1px_2px_rgba(255,255,255,0.1)]">
                <div className="w-2.5 h-2.5 rounded-full bg-[#0a0a0a] shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)] relative overflow-hidden">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-blue-500/30 rounded-full blur-[1px]" />
                </div>
              </div>

              <video 
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay 
                loop 
                muted 
                playsInline
              >
                <source src="/videos/founder-intro.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
          
          {/* Physical Buttons */}
          <div className="absolute top-[100px] md:top-[120px] -left-[4px] w-[4px] h-[25px] md:h-[30px] bg-gradient-to-r from-[#71717a] to-[#a1a1aa] rounded-l-md" />
          <div className="absolute top-[140px] md:top-[170px] -left-[4px] w-[4px] h-[45px] md:h-[50px] bg-gradient-to-r from-[#71717a] to-[#a1a1aa] rounded-l-md" />
          <div className="absolute top-[200px] md:top-[240px] -left-[4px] w-[4px] h-[45px] md:h-[50px] bg-gradient-to-r from-[#71717a] to-[#a1a1aa] rounded-l-md" />
          <div className="absolute top-[160px] md:top-[190px] -right-[4px] w-[4px] h-[70px] md:h-[80px] bg-gradient-to-l from-[#71717a] to-[#a1a1aa] rounded-r-md" />
        </div>
      </div>

      {/* ── Slide 2: MacBook Pro ── */}
      <div 
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
          activeSlide === 1 ? "opacity-100 z-20" : "opacity-0 z-0 pointer-events-none"
        }`}
      >
        <div className="relative w-[95%] max-w-[700px] aspect-[16/10] mt-10">
          {/* Top Lid */}
          <div className="w-full h-[85%] bg-black rounded-t-3xl p-3 md:p-4 shadow-[0_20px_50px_rgba(255,255,255,0.4)] relative">
            <div className="absolute top-1 md:top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/20" /> {/* Camera */}
            
            {/* Screen */}
            <div className="w-full h-full bg-white rounded-lg md:rounded-xl overflow-hidden relative border border-white/10 flex flex-col">
               {/* Browser Mockup */}
               <div className="w-full h-10 bg-slate-100 border-b border-slate-200 flex items-center px-4 gap-2 flex-shrink-0">
                 <div className="flex gap-1.5 mr-4">
                   <div className="w-3 h-3 rounded-full bg-red-400" />
                   <div className="w-3 h-3 rounded-full bg-amber-400" />
                   <div className="w-3 h-3 rounded-full bg-green-400" />
                 </div>
                 <div className="flex-1 max-w-sm h-6 bg-white rounded-md text-[10px] text-slate-500 flex items-center px-3 shadow-sm overflow-hidden">
                    {/* CSS Typing effect */}
                    <span className="inline-block overflow-hidden whitespace-nowrap border-r-2 border-slate-400 animate-typing w-[25ch]">
                      www.chemburproperties.com
                    </span>
                 </div>
               </div>
               
               {/* Inside Screen Content / Video */}
               <div className="relative w-full flex-1 bg-navy-light flex flex-col items-center justify-center overflow-hidden">
                 <p className="text-white/50 text-sm z-10 mb-2">Drop macbook-demo.mp4 here</p>
                 <video 
                   className="absolute inset-0 w-full h-full object-cover z-0 mix-blend-lighten opacity-80"
                   autoPlay loop muted playsInline
                 >
                   <source src="/videos/macbook-demo.mp4" type="video/mp4" />
                 </video>
                 {/* Placeholder graphic if video fails */}
                 <div className="absolute inset-0 bg-navy z-[-1] flex flex-col items-center justify-center">
                    <h1 className="text-gold font-display text-4xl mb-2">Chembur Properties</h1>
                    <p className="text-white/50">Luxury Real Estate</p>
                 </div>
               </div>
            </div>
          </div>
          
          {/* Bottom Base */}
          <div className="w-[110%] -ml-[5%] h-[4%] bg-gradient-to-b from-[#e5e7eb] to-[#9ca3af] rounded-t-sm rounded-b-[40%] shadow-[0_30px_50px_rgba(0,0,0,0.2)] relative z-10 flex justify-center">
             <div className="w-1/4 h-[40%] bg-[#d1d5db] rounded-b-md shadow-inner" />
          </div>
        </div>
      </div>

      {/* ── Slide 3: iPad Pro ── */}
      <div 
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
          activeSlide === 2 ? "opacity-100 z-20" : "opacity-0 z-0 pointer-events-none"
        }`}
      >
        <div className="relative w-[320px] h-[450px] md:w-[480px] md:h-[640px] rounded-3xl md:rounded-[2rem] bg-black p-[10px] shadow-[0_30px_60px_rgba(0,0,0,0.1),_0_0_80px_rgba(255,255,255,0.6)]">
            <div className="absolute inset-0 rounded-3xl md:rounded-[2rem] border border-[#a1a1aa]/50 pointer-events-none" />
            <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-1.5 h-16 bg-white/20 rounded-l-sm" /> {/* Apple Pencil Mockup */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/20 z-20" /> {/* Camera */}
            
            <div className="relative w-full h-full bg-[#111] rounded-2xl md:rounded-[1.5rem] overflow-hidden flex flex-col items-center justify-center border border-white/5">
              <p className="text-white/50 text-sm z-10 mb-2">Drop ipad-demo.mp4 here</p>
              <video 
                className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
                autoPlay 
                loop 
                muted 
                playsInline
              >
                <source src="/videos/ipad-demo.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-navy-light z-[-1] flex flex-col items-center justify-center">
                  <div className="grid grid-cols-2 gap-4 p-8 w-full h-full opacity-50">
                     <div className="bg-white/10 rounded-xl" />
                     <div className="bg-white/10 rounded-xl" />
                     <div className="bg-white/10 rounded-xl" />
                     <div className="bg-white/10 rounded-xl" />
                  </div>
              </div>
            </div>
        </div>
      </div>

      {/* Navigation Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {[0, 1, 2].map((idx) => (
          <button
            key={idx}
            onClick={() => setActiveSlide(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              activeSlide === idx ? "bg-navy w-6" : "bg-navy/30 hover:bg-navy/50"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
      
    </div>
  );
}
