"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import PropertyCard from "@/components/PropertyCard";
import WhatsAppIcon from "@/components/WhatsAppIcon";

const leadSchema = z.object({
  name: z.string().min(2, "Name required"),
  phone: z.string().min(10, "Valid phone required"),
  email: z.string().email("Valid email").optional().or(z.literal("")),
  message: z.string().optional(),
});

type LeadData = z.infer<typeof leadSchema>;

const ENABLE_OTP = false;

const getYoutubeId = (url: string) => {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/);
  return match ? match[1] : null;
};

export default function PropertyDetailClient({ property, relatedProperties }: { property: any, relatedProperties: any[] }) {
  const [activeTab, setActiveTab] = useState("overview");

  const [isVerified, setIsVerified] = useState(true);
  const [otpStep, setOtpStep] = useState<"phone" | "otp">("phone");
  const [otpForm, setOtpForm] = useState({ name: "", phone: "", otp: "" });
  const [otpLoading, setOtpLoading] = useState(false);
  const [isPodcastUnlocked, setIsPodcastUnlocked] = useState(false);

  useEffect(() => {
    if (ENABLE_OTP) {
      const verified = localStorage.getItem("public_user_verified");
      const name = localStorage.getItem("public_user_name");
      const phone = localStorage.getItem("public_user_phone");
      
      if (verified !== "true") {
        setIsVerified(false);
      } else if (name && phone && property?._id) {
        // Trigger silent lead capture
        fetch("/api/otp/silent-lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, phone, propertyId: property._id }),
        }).catch(err => console.error("Failed to capture silent lead", err));
      }
    }
  }, [property?._id]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpForm.name || otpForm.phone.length < 10) {
      toast.error("Please enter a valid name and phone number");
      return;
    }
    setOtpLoading(true);
    try {
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: otpForm.name, phone: otpForm.phone, propertyId: property?._id }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("OTP sent successfully!");
        setOtpStep("otp");
      } else {
        toast.error(data.message || "Failed to send OTP");
      }
    } catch (e) {
      toast.error("Network error");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpForm.otp) return;
    setOtpLoading(true);
    try {
      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: otpForm.phone, otp: otpForm.otp, name: otpForm.name, propertyId: property?._id }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        localStorage.setItem("public_user_verified", "true");
        localStorage.setItem("public_user_name", otpForm.name);
        localStorage.setItem("public_user_phone", otpForm.phone);
        localStorage.setItem("public_user_verified_at", Date.now().toString());
        window.dispatchEvent(new Event("userLoggedIn"));
        setIsVerified(true);
      } else {
        toast.error(data.message || "Invalid OTP");
      }
    } catch (e) {
      toast.error("Network error");
    } finally {
      setOtpLoading(false);
    }
  };

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<LeadData>({
    resolver: zodResolver(leadSchema),
  });

  const onSubmit = async (data: LeadData) => {
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "property_page",
          propertyId: property._id,
          propertyTitle: property.title,
          inquiryType: (property.propertyStatus && property.propertyStatus[0]) === "For Rent" ? "rent" : "buy",
          ...data,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Inquiry sent successfully!");
      reset();
    } catch (e) {
      toast.error("Failed to send inquiry.");
    }
  };

  const isLease = property.propertyStatus?.some((s: string) => ['Lease', 'For Rent', 'For Lease', 'Shop on Rent'].includes(s));
  const transaction = isLease ? "lease" : "buy";
  const priceVal = transaction === 'buy' ? property.pricing?.salePrice : (property.pricing?.licenceFee || property.pricing?.rentPrice);
  
  const formatPriceRobust = (val: any) => {
    if (!val) return "Price on Request";
    const str = String(val).trim();
    if (/^[\d,.]+$/.test(str)) {
      const num = Number(str.replace(/,/g, ''));
      if (!isNaN(num)) return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(num);
    }
    return str.includes('₹') ? str : `₹ ${str}`;
  };

  const formattedPrice = formatPriceRobust(priceVal || property.pricing?.expectedPrice);

  const images = property.media?.galleryImages || [];
  if (property.media?.featuredImage && !images.includes(property.media.featuredImage)) {
    images.unshift(property.media.featuredImage);
  }

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [copied, setCopied] = useState(false);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const nextImage = useCallback(() => {
    if (lightboxIndex !== null) setLightboxIndex((lightboxIndex + 1) % images.length);
  }, [lightboxIndex, images.length]);
  const prevImage = useCallback(() => {
    if (lightboxIndex !== null) setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
  }, [lightboxIndex, images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, closeLightbox, nextImage, prevImage]);

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) nextImage();
    if (isRightSwipe) prevImage();
    setTouchStart(0);
    setTouchEnd(0);
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `Check out this property: ${property.title} in ${Array.isArray(property.location) ? property.location[0] : property.location} — ${shareUrl}`;

  const handleShareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  const handleCopyLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: property.title, url: shareUrl });
        return;
      } catch (err) { }
    }
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isVerified) {
    return (
      <div className="min-h-screen pt-[140px] flex items-center justify-center bg-surface-light px-4">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-card border border-navy-100 text-center">
          <div className="w-16 h-16 mx-auto bg-navy text-gold rounded-2xl flex items-center justify-center mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          </div>
          <h2 className="font-display text-2xl text-navy mb-2">Unlock Property Details</h2>
          <p className="text-slate-navy text-sm mb-8">Please verify your details to view full property information, floor plans, and pricing.</p>
          
          {otpStep === "phone" ? (
            <form onSubmit={handleSendOtp} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-navy uppercase tracking-widest mb-1.5">Full Name</label>
                <input required type="text" value={otpForm.name} onChange={e => setOtpForm({...otpForm, name: e.target.value})} className="lux-input" placeholder="Jeetu Chhaabria" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-navy uppercase tracking-widest mb-1.5">Mobile Number</label>
                <input required type="tel" value={otpForm.phone} onChange={e => setOtpForm({...otpForm, phone: e.target.value})} className="lux-input" placeholder="9820182285" />
              </div>
              <button disabled={otpLoading} type="submit" className="btn-navy w-full py-3.5 mt-2">
                {otpLoading ? "Sending..." : "Send OTP"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-navy uppercase tracking-widest mb-1.5">Enter OTP</label>
                <input required type="text" value={otpForm.otp} onChange={e => setOtpForm({...otpForm, otp: e.target.value})} className="lux-input text-center text-xl tracking-[0.5em]" placeholder="------" maxLength={6} />
                <p className="text-xs text-center mt-3 text-slate-navy">Sent to +91 {otpForm.phone} <button type="button" onClick={() => setOtpStep("phone")} className="text-gold hover:underline ml-1">Edit</button></p>
              </div>
              <button disabled={otpLoading} type="submit" className="btn-navy w-full py-3.5 mt-2">
                {otpLoading ? "Verifying..." : "Verify & View Property"}
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface-light min-h-screen pb-20 pt-[140px] md:pt-[160px]">
      <div className="max-w-8xl mx-auto px-6 md:px-8">

        {/* Breadcrumbs */}
        <nav className="text-xs text-slate-navy font-medium mb-6 flex items-center gap-2 uppercase tracking-widest">
          <Link href="/" className="hover:text-navy">Home</Link>
          <span>/</span>
          <Link href="/properties" className="hover:text-navy">Properties</Link>
          <span>/</span>
          <span className="text-navy">{property.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content (Left) */}
          <div className="lg:col-span-8 space-y-10">

            {/* 1. Header & Badges */}
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                {property.badges?.isWinGold && (
                  <span className="bg-[#C9A84C] text-white text-[0.65rem] font-bold px-3 py-1 rounded-full uppercase tracking-wide">★ Win Gold</span>
                )}
                {property.badges?.isPremium && (
                  <span className="bg-purple-600 text-white text-[0.65rem] font-bold px-3 py-1 rounded-full uppercase tracking-wide">💎 Premium</span>
                )}
                {property.badges?.isUnderconstruction && (
                  <span className="bg-blue-600 text-white text-[0.65rem] font-bold px-3 py-1 rounded-full uppercase tracking-wide">🚧 Under Construction</span>
                )}
                {property.badges?.isResale && (
                  <span className="bg-emerald-600 text-white text-[0.65rem] font-bold px-3 py-1 rounded-full uppercase tracking-wide">🔄 Resale</span>
                )}
                {property.badges?.isPremiumUnderconstruction && (
                  <span className="bg-orange-600 text-white text-[0.65rem] font-bold px-3 py-1 rounded-full uppercase tracking-wide">⭐ Premium Underconstruction</span>
                )}
                {property.badges?.isPremiumResale && (
                  <span className="bg-pink-600 text-white text-[0.65rem] font-bold px-3 py-1 rounded-full uppercase tracking-wide">✨ Premium Resale</span>
                )}
                <span className="bg-navy text-white text-[0.65rem] font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  {transaction === 'buy' ? 'For Sale' : 'For Lease'}
                </span>
              </div>
              <h1 className="font-display text-navy text-3xl md:text-4xl mb-2">{property.title}</h1>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-navy uppercase tracking-widest font-bold mb-4">
                {property.propertyId && <span>ID: {property.propertyId}</span>}
                {property.propertyId && <span className="text-navy/30">•</span>}
                {property.author && <span>By {property.author}</span>}
                {property.author && property.dateOfPost && <span className="text-navy/30">•</span>}
                {property.dateOfPost && <span>{new Date(property.dateOfPost).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}</span>}
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-slate-navy">
                <p className="flex items-center gap-1.5">
                  <span>📍</span> {Array.isArray(property.location) ? property.location.join(", ") : property.location}
                </p>
                <div className="hidden sm:block w-px h-4 bg-navy-200" />
                <div className="flex items-center gap-3">
                  <button onClick={handleShareWhatsApp} className="flex items-center gap-1.5 text-xs font-semibold hover:text-[#25D366] transition-colors">
                    <WhatsAppIcon className="w-4 h-4 text-current" strokeWidth="1.5" />
                    WhatsApp
                  </button>
                  <button onClick={handleCopyLink} className="flex items-center gap-1.5 text-xs font-semibold hover:text-navy transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                    {copied ? <span className="text-green-600">Copied!</span> : "Share"}
                  </button>
                </div>
              </div>
            </div>

            {/* 2. Price Bar */}
            <div className="bg-white border border-navy-100 rounded-2xl p-6 flex flex-wrap items-center justify-between shadow-sm gap-6">
              <div>
                <p className="text-xs text-slate-navy uppercase tracking-widest font-bold mb-1">{transaction === 'buy' ? 'For Sale' : 'For Lease'}</p>
                <h2 className="font-display text-navy text-3xl">{formattedPrice}</h2>
                {property.badges?.isWinGold && property.winGoldDetails && (
                  <p className="text-[#C9A84C] text-sm font-semibold mt-1">{property.winGoldDetails}</p>
                )}
              </div>
              
              {property.pricing?.licenceFee && (
                <div>
                  <p className="text-xs text-slate-navy uppercase tracking-widest font-bold mb-1">Licence Fee</p>
                  <h2 className="font-display text-navy text-3xl">{formatPriceRobust(property.pricing.licenceFee)} /mo</h2>
                </div>
              )}

              {property.pricing?.securityDeposit && (
                <div>
                  <p className="text-xs text-slate-navy uppercase tracking-widest font-bold mb-1">Security Deposit</p>
                  <p className="text-navy font-semibold text-xl">{property.pricing.securityDeposit}</p>
                </div>
              )}

              {property.pricing?.maintenanceCharges && (
                <div className="text-right">
                  <p className="text-xs text-slate-navy uppercase tracking-widest font-bold mb-1">Maintenance</p>
                  <p className="text-navy font-semibold text-xl">₹{property.pricing.maintenanceCharges} /mo</p>
                </div>
              )}
            </div>

            {/* Premium Note & Excerpt */}
            {property.badges?.isPremium && property.badges?.premiumNote && (
              <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5 shadow-sm">
                <p className="text-sm text-purple-900 font-medium leading-relaxed">
                  <span className="font-bold text-purple-800 uppercase tracking-widest text-[0.65rem] block mb-1">💎 Premium Listing Note</span> 
                  {property.badges.premiumNote}
                </p>
              </div>
            )}
            {property.excerpt && (
              <div className="px-2">
                <p className="text-slate-navy text-lg leading-relaxed italic">"{property.excerpt}"</p>
              </div>
            )}

            {/* 3. Media Gallery (Video & Images) */}
            {(images.length > 0 || property.media?.propertyVideoUrl) && (
              <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[280px] md:h-[360px]">
                <div className={`col-span-4 ${((images.length > 1 && !property.media?.propertyVideoUrl) || (images.length > 0 && property.media?.propertyVideoUrl)) ? 'md:col-span-3' : 'md:col-span-4'} row-span-2 relative rounded-2xl overflow-hidden group bg-black`}>
                  {property.media?.propertyVideoUrl ? (
                    <iframe
                      width="100%"
                      height="100%"
                      src={property.media.propertyVideoUrl.replace("watch?v=", "embed/")}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen>
                    </iframe>
                  ) : (
                    <img 
                      src={images[0]} 
                      onClick={() => setLightboxIndex(0)} 
                      alt="Featured" 
                      className="w-full h-full object-cover cursor-pointer group-hover:scale-105 transition-transform duration-700" 
                    />
                  )}
                </div>
                
                {(property.media?.propertyVideoUrl ? images.slice(0, 2) : images.slice(1, 3)).map((img: string, idx: number) => {
                  const originalIndex = property.media?.propertyVideoUrl ? idx : idx + 1;
                  const remainingCount = property.media?.propertyVideoUrl ? images.length - 2 : images.length - 3;
                  
                  return (
                    <div key={idx} onClick={() => setLightboxIndex(originalIndex)} className="hidden md:block col-span-1 row-span-1 relative rounded-2xl overflow-hidden cursor-pointer group">
                      <img src={img} alt={`Gallery ${originalIndex + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      {idx === 1 && remainingCount > 0 && (
                        <div className="absolute inset-0 bg-navy/60 flex flex-col items-center justify-center text-center p-2">
                          <span className="text-white font-display text-2xl font-bold mb-1">+{remainingCount}</span>
                          <span className="text-white text-[0.65rem] uppercase tracking-widest font-semibold">Click for more images</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* 4. Specs Bar */}
            <div className="bg-white border border-navy-100 rounded-2xl p-6 shadow-sm flex flex-wrap gap-x-10 gap-y-6">
              {property.propertyType && property.propertyType.length > 0 && (
                <div>
                  <p className="text-[0.65rem] text-slate-navy uppercase tracking-widest font-bold mb-1">Property Type</p>
                  <p className="text-navy font-semibold text-lg">{property.propertyType.join(', ')}</p>
                </div>
              )}
              {property.specs?.bedrooms && (
                <div>
                  <p className="text-[0.65rem] text-slate-navy uppercase tracking-widest font-bold mb-1">Configuration</p>
                  <p className="text-navy font-semibold text-lg">{property.specs.bedrooms} BHK</p>
                </div>
              )}
              {property.specs?.carpetArea && (
                <div>
                  <p className="text-[0.65rem] text-slate-navy uppercase tracking-widest font-bold mb-1">Carpet Area</p>
                  <p className="text-navy font-semibold text-lg">{property.specs.carpetArea} {property.specs.areaPostfix || 'sq ft'}</p>
                </div>
              )}
              {property.specs?.bathrooms && (
                <div>
                  <p className="text-[0.65rem] text-slate-navy uppercase tracking-widest font-bold mb-1">Bathrooms</p>
                  <p className="text-navy font-semibold text-lg">{property.specs.bathrooms}</p>
                </div>
              )}
              {property.specs?.parking && (
                <div>
                  <p className="text-[0.65rem] text-slate-navy uppercase tracking-widest font-bold mb-1">Parking</p>
                  <p className="text-navy font-semibold text-lg">{property.specs.parking}</p>
                </div>
              )}
              {property.specs?.yearBuilt && (
                <div>
                  <p className="text-[0.65rem] text-slate-navy uppercase tracking-widest font-bold mb-1">Year Built</p>
                  <p className="text-navy font-semibold text-lg">{property.specs.yearBuilt}</p>
                </div>
              )}
              {property.specs?.totalFloors && (
                <div>
                  <p className="text-[0.65rem] text-slate-navy uppercase tracking-widest font-bold mb-1">Total Floors</p>
                  <p className="text-navy font-semibold text-lg">{property.specs.totalFloors}</p>
                </div>
              )}
              {property.specs?.facing && (
                <div>
                  <p className="text-[0.65rem] text-slate-navy uppercase tracking-widest font-bold mb-1">Facing</p>
                  <p className="text-navy font-semibold text-lg">{property.specs.facing}</p>
                </div>
              )}
            </div>

            {/* RERA Details */}
            {(property.reraNumber || property.reraPossessionDate) && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 shadow-sm mt-6">
                <div className="flex flex-wrap gap-x-10 gap-y-6 mb-4">
                  {property.reraNumber && (
                    <div>
                      <p className="text-[0.65rem] text-amber-800 uppercase tracking-widest font-bold mb-1">RERA Number</p>
                      <p className="text-amber-950 font-semibold text-lg">{property.reraNumber}</p>
                    </div>
                  )}
                  {property.reraPossessionDate && (
                    <div>
                      <p className="text-[0.65rem] text-amber-800 uppercase tracking-widest font-bold mb-1">Possession Date</p>
                      <p className="text-amber-950 font-semibold text-lg">{new Date(property.reraPossessionDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                  )}
                </div>
                <p className="text-xs text-amber-800/80 font-medium">
                  <span className="font-bold text-amber-900">Disclaimer:</span> We do not mention full RERA no as we can loose our business directly to developers.
                </p>
              </div>
            )}

            {/* 5. Tabs (Overview, Features) */}
            <div className="bg-white border border-navy-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="flex border-b border-navy-100 bg-surface-light px-4 overflow-x-auto">
                {['overview', 'features', ...(property.connectivity?.length > 0 ? ['connectivity'] : []), 'floorplan', ...(property.floorDetails?.length > 0 ? ['availability'] : [])].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-6 text-sm font-bold uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab ? "text-navy border-b-2 border-navy" : "text-slate-navy hover:text-navy"
                      }`}
                  >
                    {tab === 'floorplan' ? 'Floor Plan' : tab === 'availability' ? 'Availability' : tab}
                  </button>
                ))}
              </div>
              <div className="p-8">
                {activeTab === 'overview' && (
                  <div className="prose prose-sm max-w-none text-slate-navy leading-relaxed property-description-html">
                    {property.description ? (
                      <div dangerouslySetInnerHTML={{ __html: property.description }} />
                    ) : (
                      <p>No description provided.</p>
                    )}
                  </div>
                )}
                {activeTab === 'features' && (
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(property.features || []).map((f: string, i: number) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-slate-navy">
                        <span className="w-6 h-6 rounded-full bg-navy/5 flex items-center justify-center text-navy">✓</span>
                        {f}
                      </li>
                    ))}
                    {(!property.features || property.features.length === 0) && (
                      <p className="text-sm text-slate-navy">Features not listed.</p>
                    )}
                  </ul>
                )}
                {activeTab === 'connectivity' && (
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(property.connectivity || []).map((c: string, i: number) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-slate-navy">
                        <span className="w-6 h-6 rounded-full bg-navy/5 flex items-center justify-center text-navy text-[0.65rem]">📍</span>
                        {c}
                      </li>
                    ))}
                  </ul>
                )}
                {activeTab === 'floorplan' && (
                  <div>
                    {property.media?.floorPlan ? (
                      <img src={property.media.floorPlan} alt="Floor Plan" className="w-full rounded-xl border border-navy-100" />
                    ) : (
                      <p className="text-sm text-slate-navy">Floor plan not available.</p>
                    )}
                  </div>
                )}
                {activeTab === 'availability' && (
                  <div>
                    {property.floorDetails && property.floorDetails.length > 0 ? (
                      <div className="overflow-x-auto border border-navy-100 rounded-xl">
                        <table className="w-full text-sm text-left">
                          <thead>
                            <tr className="bg-surface-light border-b border-navy-100 text-slate-navy uppercase tracking-widest text-[0.65rem]">
                              <th className="py-3 px-4 font-bold">Floor No.</th>
                              <th className="py-3 px-4 font-bold">BHK Type</th>
                              <th className="py-3 px-4 font-bold">Carpet Area</th>
                              <th className="py-3 px-4 font-bold">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {property.floorDetails.map((floor: any, i: number) => (
                              <tr key={i} className="border-b border-navy-50 last:border-0">
                                <td className="py-3 px-4 text-navy font-semibold">{floor.floorNumber || '-'}</td>
                                <td className="py-3 px-4 text-slate-navy">{floor.bhkType || '-'}</td>
                                <td className="py-3 px-4 text-slate-navy">{floor.carpetArea || '-'}</td>
                                <td className="py-3 px-4">
                                  <span className={`px-2.5 py-1 rounded-full text-[0.65rem] font-bold uppercase tracking-widest ${floor.status === 'Sold' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                                    {floor.status || 'Available'}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-sm text-slate-navy">Floor availability details not added yet.</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Removed separate Video section since it's now in the collage */}

            {/* 7. Podcast Gate */}
            {property.podcast?.podcastId && (
              <div className="rounded-2xl overflow-hidden shadow-card relative border border-navy-100">
                {!isPodcastUnlocked ? (
                  <div className="bg-navy-gradient p-10 text-center relative text-white">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
                    <h3 className="font-display text-2xl mb-2 relative z-10">Exclusive Investor Podcast</h3>
                    <p className="text-white/70 text-sm mb-6 max-w-md mx-auto relative z-10">Listen to our deep-dive analysis on the ROI and future appreciation potential of {property.title}.</p>
                    <button 
                      onClick={() => setIsPodcastUnlocked(true)}
                      className="btn-gold relative z-10 shadow-lg inline-flex items-center gap-2 cursor-pointer"
                    >
                      🔓 Unlock Podcast
                    </button>
                  </div>
                ) : (
                  <div>
                    {property.podcast.podcastId.videoUrl ? (
                      <iframe 
                        width="100%" 
                        height="400" 
                        src={`https://www.youtube.com/embed/${getYoutubeId(property.podcast.podcastId.videoUrl) || ''}?autoplay=1`} 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <div className="p-10 text-center bg-slate-50 text-slate-navy">Video not available</div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* 8. Map */}
            {property.location && (
              <div>
                <h3 className="font-display text-navy text-2xl mb-6">Location Map</h3>
                <div className="h-[400px] w-full rounded-2xl overflow-hidden border border-navy-100 shadow-sm">
                  <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ border: 0 }}
                    src={property.mapEmbedUrl?.includes('<iframe') ? (property.mapEmbedUrl.match(/src="([^"]+)"/)?.[1] || property.mapEmbedUrl) : property.mapEmbedUrl || `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || ''}&q=${encodeURIComponent(Array.isArray(property.location) ? property.location[0] : property.location)}`}
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}

          </div>

          {/* Sidebar (Right) */}
          <div className="lg:col-span-4">
            <div 
              className="sticky space-y-6 transition-[top] duration-300 ease-in-out"
              style={{ top: "calc(var(--header-height, 100px) + 20px)" }}
            >

              {/* 9. Contact Form */}
              <div id="contact-form" className="bg-white border border-navy-100 rounded-2xl p-6 shadow-card">
                <div className="flex items-center justify-between gap-2 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden border border-gold/50 shadow-sm shrink-0 bg-slate-100 flex items-center justify-center text-slate-400">
                      {property.realtor?.photograph ? (
                        <img src={property.realtor.photograph} alt={property.realtor.name} className="w-full h-full object-cover" />
                      ) : (
                        <img src="/images/JeetuChhaabria_half.png" alt="Jeetu" className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div>
                      <p className="text-[0.65rem] uppercase tracking-widest font-bold text-slate-navy">Listing Agent</p>
                      <p className="text-navy font-semibold text-sm leading-tight">{property.realtor?.name || "Jeetu Chhaabria"}</p>
                      {property.realtor?.reraNumber ? (
                        <p className="text-[0.65rem] mt-0.5 text-slate-500 font-mono">RERA: {property.realtor.reraNumber}</p>
                      ) : (
                        <p className="text-[0.65rem] mt-0.5 text-slate-500 font-mono">RERA: AS1800039361</p>
                      )}
                    </div>
                  </div>
                  
                  <a 
                    href={`tel:${property.realtor?.contactNumber || "+919820182285"}`}
                    className="flex items-center gap-2 px-4 py-2 bg-navy text-gold rounded-full hover:bg-slate-800 hover:-translate-y-0.5 transition-all shadow-sm group shrink-0"
                    title="Call Agent"
                  >
                    <div className="bg-gold/10 p-1.5 rounded-full group-hover:bg-gold/20 transition-colors">
                      <svg className="w-3.5 h-3.5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <span className="text-xs font-bold tracking-widest uppercase">Call</span>
                  </a>
                </div>

                <div className="h-px w-full bg-navy-100 mb-6" />

                <h3 className="font-display text-navy text-xl mb-4">Interested?</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <input {...register("name")} placeholder="Your Name" className={`lux-input ${errors.name ? "border-red-500" : ""}`} />
                  </div>
                  <div>
                    <input {...register("phone")} placeholder="Your Phone" className={`lux-input ${errors.phone ? "border-red-500" : ""}`} />
                  </div>
                  <div>
                    <input {...register("email")} placeholder="Your Email (Optional)" className="lux-input" />
                  </div>
                  <div>
                    <textarea {...register("message")} rows={3} placeholder="I am interested in this property..." className="lux-input resize-none" />
                  </div>
                  <button type="submit" disabled={isSubmitting} className="btn-navy w-full text-sm py-3 disabled:opacity-50">
                    {isSubmitting ? "Sending..." : "Request Details"}
                  </button>
                  <a href={`https://wa.me/${(property.realtor?.contactNumber || '919820182285').replace(/\D/g,'')}?text=${encodeURIComponent(`Hi, I'm interested in ${property.title} (${property.slug}).`)}`} target="_blank" rel="noreferrer" className="btn-outline-navy w-full text-sm py-3 block text-center mt-2 flex items-center justify-center gap-2">
                    <WhatsAppIcon className="w-4 h-4 text-navy" strokeWidth="1.5" />
                    WhatsApp
                  </a>
                </form>
              </div>

            </div>
          </div>
        </div>

        {/* 10. Related Properties */}
        {relatedProperties.length > 0 && (
          <div className="mt-24 pt-16 border-t border-navy-100">
            <h2 className="font-display text-navy text-2xl mb-8">Similar Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProperties.map((prop: any) => {
                const pIsLease = prop.propertyStatus?.some((s: string) => ['Lease', 'For Rent', 'For Lease', 'Shop on Rent'].includes(s));
                const pTrans = pIsLease ? "lease" : "buy";
                const pPriceVal = pTrans === 'buy' ? prop.pricing?.salePrice : prop.pricing?.rentPrice;
                const pPriceFormatted = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(pPriceVal || prop.pricing?.expectedPrice || 0);

                let pBadge = pTrans === 'buy' ? "For Sale" : "For Lease";
                let pBadgeVariant: any = "default";

                if (prop.badges?.isWinGold) {
                  pBadge = "★ Win Gold";
                  pBadgeVariant = "premium";
                } else if (prop.badges?.isPremium) {
                  pBadge = "💎 Premium";
                  pBadgeVariant = "premium";
                } else if (pTrans === 'lease') {
                  pBadgeVariant = "rent";
                }

                return (
                  <PropertyCard
                    key={prop._id}
                    code={prop.slug}
                    title={prop.title}
                    location={Array.isArray(prop.location) ? prop.location[0] : prop.location}
                    price={pPriceFormatted}
                    priceNote={prop.badges?.isWinGold && prop.winGoldDetails ? prop.winGoldDetails : undefined}
                    type={prop.category === "Commercial" ? "commercial" : "residential"}
                    transaction={pTrans}
                    bhk={prop.specs?.bedrooms ? `${prop.specs.bedrooms} BHK` : undefined}
                    area={prop.specs?.carpetArea ? `${prop.specs.carpetArea} sq ft` : ""}
                    badge={pBadge}
                    badgeVariant={pBadgeVariant}
                    imgGradient="linear-gradient(135deg, #071430 0%, #0E2452 45%, #0B1B3D 100%)"
                    imageUrl={prop.media?.featuredImage || "/images/placeholder.jpg"}
                  />
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* Mobile Enquire Now */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-40">
        <button
          onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
          className="w-full text-white text-sm font-semibold py-4 rounded-xl shadow-lg transition-transform hover:scale-[1.02] flex items-center justify-center gap-2"
          style={{ backgroundColor: "#D4A017", border: "1px solid rgba(255,255,255,0.2)" }}
        >
          Enquire Now
        </button>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
          style={{ backgroundColor: "rgba(0,0,0,0.95)" }}
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white/80 font-medium tracking-widest text-sm select-none">
            {lightboxIndex + 1} / {images.length}
          </div>
          <button onClick={closeLightbox} className="absolute top-6 right-6 text-white/70 hover:text-white p-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>

          <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-4 hidden md:block">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
          </button>

          <img
            src={images[lightboxIndex]}
            alt="Gallery fullscreen"
            className="max-w-full max-h-[90vh] object-contain select-none"
            onClick={(e) => e.stopPropagation()}
          />

          <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-4 hidden md:block">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>
      )}
    </div>
  );
}
