"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import PropertyCard from "@/components/PropertyCard";

const leadSchema = z.object({
  name: z.string().min(2, "Name required"),
  phone: z.string().min(10, "Valid phone required"),
  email: z.string().email("Valid email").optional().or(z.literal("")),
  message: z.string().optional(),
});

type LeadData = z.infer<typeof leadSchema>;

export default function PropertyDetailClient({ property, relatedProperties }: { property: any, relatedProperties: any[] }) {
  const [activeTab, setActiveTab] = useState("overview");

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
  const priceVal = transaction === 'buy' ? property.pricing?.salePrice : property.pricing?.rentPrice;
  const fallbackPrice = property.pricing?.expectedPrice || 0;
  const formattedPrice = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(priceVal || fallbackPrice);
  
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
      } catch (err) {}
    }
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
              <div className="flex gap-2 mb-3">
                {property.badges?.isWinGold && (
                  <span className="bg-[#C9A84C] text-white text-[0.65rem] font-bold px-3 py-1 rounded-full uppercase tracking-wide">★ Win Gold</span>
                )}
                {property.badges?.isPremium && (
                  <span className="bg-purple-600 text-white text-[0.65rem] font-bold px-3 py-1 rounded-full uppercase tracking-wide">💎 Premium</span>
                )}
                <span className="bg-navy text-white text-[0.65rem] font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  {transaction === 'buy' ? 'For Sale' : 'For Lease'}
                </span>
              </div>
              <h1 className="font-display text-navy text-3xl md:text-4xl mb-2">{property.title}</h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-slate-navy">
                <p className="flex items-center gap-1.5">
                  <span>📍</span> {Array.isArray(property.location) ? property.location.join(", ") : property.location}
                </p>
                <div className="hidden sm:block w-px h-4 bg-navy-200" />
                <div className="flex items-center gap-3">
                  <button onClick={handleShareWhatsApp} className="flex items-center gap-1.5 text-xs font-semibold hover:text-[#25D366] transition-colors">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp
                  </button>
                  <button onClick={handleCopyLink} className="flex items-center gap-1.5 text-xs font-semibold hover:text-navy transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                    {copied ? <span className="text-green-600">Copied!</span> : "Copy Link"}
                  </button>
                </div>
              </div>
            </div>

            {/* 2. Price Bar */}
            <div className="bg-white border border-navy-100 rounded-2xl p-6 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-xs text-slate-navy uppercase tracking-widest font-bold mb-1">Asking Price</p>
                <h2 className="font-display text-navy text-3xl">{formattedPrice}</h2>
                {property.badges?.isWinGold && property.winGoldDetails && (
                  <p className="text-[#C9A84C] text-sm font-semibold mt-1">{property.winGoldDetails}</p>
                )}
              </div>
              {property.pricing?.maintenanceCharges && (
                <div className="text-right">
                  <p className="text-xs text-slate-navy uppercase tracking-widest font-bold mb-1">Maintenance</p>
                  <p className="text-navy font-semibold">₹{property.pricing.maintenanceCharges} /mo</p>
                </div>
              )}
            </div>

            {/* 3. Image Gallery */}
            {images.length > 0 && (
              <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[400px] md:h-[500px]">
                <div onClick={() => setLightboxIndex(0)} className={`col-span-4 ${images.length > 1 ? 'md:col-span-3' : 'md:col-span-4'} row-span-2 relative rounded-2xl overflow-hidden cursor-pointer group`}>
                  <img src={images[0]} alt="Featured" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                {images.slice(1, 3).map((img: string, idx: number) => (
                  <div key={idx} onClick={() => setLightboxIndex(idx + 1)} className="hidden md:block col-span-1 row-span-1 relative rounded-2xl overflow-hidden cursor-pointer group">
                    <img src={img} alt={`Gallery ${idx+1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    {idx === 1 && images.length > 3 && (
                      <div className="absolute inset-0 bg-navy/60 flex items-center justify-center">
                        <span className="text-white font-display text-xl font-bold">+{images.length - 3}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* 4. Specs Bar */}
            <div className="bg-white border border-navy-100 rounded-2xl p-6 shadow-sm flex flex-wrap gap-x-10 gap-y-6">
              {property.specs?.bedrooms && (
                <div>
                  <p className="text-[0.65rem] text-slate-navy uppercase tracking-widest font-bold mb-1">Configuration</p>
                  <p className="text-navy font-semibold text-lg">{property.specs.bedrooms} BHK</p>
                </div>
              )}
              {property.specs?.carpetArea && (
                <div>
                  <p className="text-[0.65rem] text-slate-navy uppercase tracking-widest font-bold mb-1">Carpet Area</p>
                  <p className="text-navy font-semibold text-lg">{property.specs.carpetArea} sq ft</p>
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
              {property.specs?.facing && (
                <div>
                  <p className="text-[0.65rem] text-slate-navy uppercase tracking-widest font-bold mb-1">Facing</p>
                  <p className="text-navy font-semibold text-lg">{property.specs.facing}</p>
                </div>
              )}
            </div>

            {/* 5. Tabs (Overview, Features) */}
            <div className="bg-white border border-navy-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="flex border-b border-navy-100 bg-surface-light px-4 overflow-x-auto">
                {['overview', 'features', 'floorplan', ...(property.floorDetails?.length > 0 ? ['availability'] : [])].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-6 text-sm font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                      activeTab === tab ? "text-navy border-b-2 border-navy" : "text-slate-navy hover:text-navy"
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

            {/* 6. Video */}
            {property.media?.propertyVideoUrl && (
              <div>
                <h3 className="font-display text-navy text-2xl mb-6">Property Tour</h3>
                <div className="aspect-video w-full rounded-2xl overflow-hidden border border-navy-100 shadow-sm">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src={property.media.propertyVideoUrl.replace("watch?v=", "embed/")} 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen>
                  </iframe>
                </div>
              </div>
            )}

            {/* 7. Podcast Gate */}
            {property.podcastId && (
              <div className="bg-navy-gradient rounded-2xl p-10 text-center relative overflow-hidden shadow-card text-white">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
                <h3 className="font-display text-2xl mb-2 relative z-10">Exclusive Investor Podcast</h3>
                <p className="text-white/70 text-sm mb-6 max-w-md mx-auto relative z-10">Listen to our deep-dive analysis on the ROI and future appreciation potential of {property.title}.</p>
                <Link href={`/podcasts/${property.podcastId}`} className="btn-gold relative z-10 shadow-lg inline-flex items-center gap-2">
                  🔒 Unlock Podcast
                </Link>
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
            <div className="sticky top-[100px] space-y-6">
              
              {/* 9. Contact Form */}
              <div id="contact-form" className="bg-white border border-navy-100 rounded-2xl p-6 shadow-card">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full overflow-hidden border border-gold/50 shadow-sm shrink-0">
                    <img src="/images/JeetuChhaabria_half.png" alt="Jeetu" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-[0.65rem] uppercase tracking-widest font-bold text-slate-navy">Listed By</p>
                    <p className="text-navy font-semibold text-sm">Jeetu Chhaabria</p>
                    <a href="tel:+919820182285" className="text-gold text-xs font-bold hover:underline">+91 98201 82285</a>
                  </div>
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
                  <a href={`https://wa.me/919820182285?text=${encodeURIComponent(`Hi, I'm interested in ${property.title} (${property.slug}).`)}`} target="_blank" rel="noreferrer" className="btn-outline-navy w-full text-sm py-3 block text-center mt-2 flex items-center justify-center gap-2">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-navy"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
          
          <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-4 hidden md:block">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          
          <img 
            src={images[lightboxIndex]} 
            alt="Gallery fullscreen" 
            className="max-w-full max-h-[90vh] object-contain select-none" 
            onClick={(e) => e.stopPropagation()} 
          />
          
          <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-4 hidden md:block">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      )}
    </div>
  );
}
