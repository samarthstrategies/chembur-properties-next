'use client';
import { useState, useEffect } from 'react';

export default function YellowPagesPopup() {
  const [hasShown, setHasShown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [designers, setDesigners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only check visibility logic on client
    const isLocalhost = window.location.hostname === 'localhost';
    // If we've already shown it this session, don't show again
    if (sessionStorage.getItem('yellowPagesShown')) {
      return;
    }

    // Don't show on admin routes
    if (window.location.pathname.startsWith('/admin')) {
      return;
    }

    let timeoutId;

    const fetchDesignersAndShow = async () => {
      try {
        // Fetch with a 3s timeout signal
        const controller = new AbortController();
        const timeoutIdFetch = setTimeout(() => controller.abort(), 3000);
        
        const res = await fetch('/api/designers', { signal: controller.signal });
        clearTimeout(timeoutIdFetch);

        if (res.ok) {
          const data = await res.json();
          if (data.success && data.data && data.data.length > 0) {
            setDesigners(data.data);
            setLoading(false);
            setIsVisible(true);
            setHasShown(true);
            sessionStorage.setItem('yellowPagesShown', 'true');
          }
        }
      } catch (err) {
        // Silent fail on timeout or error
        console.error("Yellow Pages fetch failed:", err);
      }
    };

    // Show after 20 seconds
    timeoutId = setTimeout(() => {
      if (!hasShown) {
        fetchDesignersAndShow();
      }
    }, 20000);

    return () => clearTimeout(timeoutId);
  }, [hasShown]);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed bottom-0 md:bottom-6 right-0 md:right-6 w-full md:w-[300px] z-[999] transition-all duration-400 ease-out"
      style={{
        transform: isVisible ? 'translateY(0)' : 'translateY(100px)',
        opacity: isVisible ? 1 : 0,
      }}
    >
      <div className="bg-white md:rounded-xl rounded-t-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
           style={{ borderTop: '3px solid #D4A017' }}>
        
        {/* Header */}
        <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
          <div>
            <p className="text-[10px] font-bold text-slate-400 tracking-wider mb-1">SPONSORED ADS</p>
            <h3 className="text-[14px] text-navy font-bold leading-tight">
              🏠 Interior Designers<br/>in Chembur
            </h3>
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-slate-400 hover:text-slate-600 p-1 -mr-1"
            aria-label="Close"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        {/* List */}
        <div className="max-h-[50vh] overflow-y-auto scrollbar-hide bg-white">
          {loading ? (
            <div className="p-4 space-y-4">
              {[1, 2].map(i => (
                <div key={i} className="animate-pulse flex gap-3">
                  <div className="w-[56px] h-[56px] bg-slate-200 rounded-full flex-shrink-0" />
                  <div className="flex-1 space-y-2 py-1">
                    <div className="h-3 bg-slate-200 rounded w-3/4" />
                    <div className="h-2 bg-slate-200 rounded w-1/2" />
                    <div className="h-2 bg-slate-200 rounded w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col">
              {designers.map((d, idx) => (
                <div key={d._id} className={`p-4 flex gap-3 ${idx !== designers.length - 1 ? 'border-b border-slate-100' : ''}`}>
                  <img 
                    src={d.profilePhoto || '/images/placeholder.jpg'} 
                    alt={d.businessName}
                    className="w-[56px] h-[56px] rounded-full object-cover border border-slate-200 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <div className="flex items-center gap-1 mb-0.5">
                      <h4 className="text-[13px] font-bold text-navy truncate" title={d.businessName}>{d.businessName}</h4>
                      {d.isFeatured && <span className="text-[10px]">⭐</span>}
                    </div>
                    <p className="text-[11px] text-slate-500 truncate">{d.ownerName}</p>
                    {d.area && <p className="text-[11px] text-slate-500 truncate mt-0.5">📍 {d.area}</p>}
                    {d.specialization && <p className="text-[10px] text-gold-dark font-medium truncate mt-1">{d.specialization}</p>}
                    
                    <div className="flex gap-2 mt-2.5">
                      <a 
                        href={`tel:${d.phone}`} 
                        className="bg-navy text-white text-[11px] font-medium py-1 px-2 rounded flex-1 text-center hover:bg-navy/90 transition-colors"
                      >
                        📞 Call
                      </a>
                      {d.whatsapp && (
                        <a 
                          href={`https://wa.me/91${d.whatsapp.replace(/\D/g, '')}?text=Hi, I found you on ChemburProperties.com. I need interior design help.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#25D366] text-white text-[11px] font-medium py-1 px-2 rounded flex-1 text-center hover:bg-[#20b858] transition-colors"
                        >
                          💬 WhatsApp
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-4 py-2 border-t border-slate-100 text-center">
          <a 
            href="https://wa.me/919820182285?text=Hi, I want to advertise on ChemburProperties Yellow Pages"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-slate-500 hover:text-navy hover:underline block"
          >
            List your business here • ChemburProperties.com
          </a>
        </div>
      </div>
    </div>
  );
}
