"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";

const unlockSchema = z.object({
  name: z.string().min(2, "Name required"),
  phone: z.string().min(10, "Valid phone required"),
  email: z.string().email("Valid email").optional().or(z.literal("")),
});

type UnlockData = z.infer<typeof unlockSchema>;

export default function PodcastDetailClient({ podcast }: { podcast: any }) {
  const [unlockedVideoUrl, setUnlockedVideoUrl] = useState<string | null>(podcast.videoUrl || null);
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UnlockData>({
    resolver: zodResolver(unlockSchema),
  });

  const onSubmit = async (data: UnlockData) => {
    try {
      const res = await fetch("/api/unlock/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          podcastId: podcast._id,
          propertyId: podcast.linkedPropertyId,
          ...data,
        }),
      });
      const resData = await res.json();
      if (!res.ok) throw new Error(resData.message || "Failed to unlock");
      
      if (resData.videoUrl) {
        setUnlockedVideoUrl(resData.videoUrl);
        toast.success("Podcast unlocked successfully!");
      }
    } catch (e: any) {
      toast.error(e.message || "Failed to unlock podcast.");
    }
  };

  const isLocked = podcast.isLocked && !unlockedVideoUrl;

  return (
    <div className="bg-surface-light min-h-screen pb-20 pt-[120px]">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        
        <nav className="text-xs text-slate-navy font-medium mb-8 flex items-center gap-2 uppercase tracking-widest">
          <Link href="/" className="hover:text-navy">Home</Link>
          <span>/</span>
          <Link href="/podcasts" className="hover:text-navy">Podcasts</Link>
          <span>/</span>
          <span className="text-navy">{podcast.title}</span>
        </nav>

        <div className="bg-white border border-navy-100 rounded-3xl p-8 md:p-12 shadow-sm mb-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-navy/5 text-navy font-bold text-[0.65rem] px-3 py-1 rounded-full uppercase tracking-wider">
              {new Date(podcast.publishDate || podcast.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            <span className={`text-[0.65rem] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
              podcast.accessType === "free" ? "bg-emerald-500/10 text-emerald-600" :
              podcast.accessType === "lead_unlock" ? "bg-[#C9A84C]/10 text-[#C9A84C]" :
              "bg-purple-500/10 text-purple-600"
            }`}>
              {podcast.accessType === "free" ? "Free to Listen" :
               podcast.accessType === "lead_unlock" ? "Lead Required" : "Premium Content"}
            </span>
          </div>

          <h1 className="font-display text-navy text-3xl md:text-5xl leading-tight mb-6">{podcast.title}</h1>
          <p className="text-slate-navy text-base md:text-lg leading-relaxed mb-10">{podcast.description}</p>

          <div className="relative rounded-2xl overflow-hidden border border-navy-100 bg-black aspect-video flex items-center justify-center shadow-card">
            {!isLocked && unlockedVideoUrl ? (
              <iframe 
                width="100%" 
                height="100%" 
                src={unlockedVideoUrl.replace("watch?v=", "embed/")} 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="absolute inset-0"
              ></iframe>
            ) : (
              <>
                <div className="absolute inset-0">
                  <img src={podcast.thumbnailUrl || "/images/placeholder.jpg"} alt={podcast.title} className="w-full h-full object-cover opacity-40 blur-sm" />
                  <div className="absolute inset-0 bg-navy/60"></div>
                </div>
                
                {podcast.accessType === "lead_unlock" && (
                  <div className="relative z-10 bg-white p-8 rounded-2xl max-w-md w-full mx-4 shadow-2xl">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-[#C9A84C]/10 text-[#C9A84C] rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                        🔒
                      </div>
                      <h3 className="font-display text-navy text-2xl mb-2">Unlock this Episode</h3>
                      <p className="text-slate-navy text-sm">Enter your details to instantly unlock and watch this exclusive podcast episode.</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      <div>
                        <input {...register("name")} placeholder="Your Name *" className={`lux-input ${errors.name ? "border-red-500" : ""}`} />
                        {errors.name && <span className="text-red-500 text-[0.65rem] mt-1 block">{errors.name.message}</span>}
                      </div>
                      <div>
                        <input {...register("phone")} placeholder="Phone / WhatsApp *" className={`lux-input ${errors.phone ? "border-red-500" : ""}`} />
                        {errors.phone && <span className="text-red-500 text-[0.65rem] mt-1 block">{errors.phone.message}</span>}
                      </div>
                      <div>
                        <input {...register("email")} placeholder="Email Address (Optional)" className="lux-input" />
                      </div>
                      <button type="submit" disabled={isSubmitting} className="btn-gold w-full py-3.5 mt-2 disabled:opacity-50 text-sm">
                        {isSubmitting ? "Unlocking..." : "Unlock Now"}
                      </button>
                    </form>
                  </div>
                )}

                {podcast.accessType === "paid" && (
                  <div className="relative z-10 text-center p-8">
                    <div className="w-20 h-20 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 backdrop-blur-sm">
                      💎
                    </div>
                    <h3 className="font-display text-white text-3xl mb-4">Premium Episode</h3>
                    <p className="text-white/70 max-w-md mx-auto mb-8">This deep-dive analysis is reserved for our premium members.</p>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-colors">
                      Purchase Access for ₹{podcast.price || 999}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
