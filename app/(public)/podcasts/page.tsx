import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Podcasts | Chembur Properties",
  description: "Listen to real estate insights, market trends, and property highlights from Chembur Properties.",
};

export default async function PodcastsPage() {
  let podcasts = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/podcasts`, { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      podcasts = Array.isArray(data.podcasts) ? data.podcasts : Array.isArray(data) ? data : [];
    }
  } catch (err) {
    console.error(err);
  }

  const featured = podcasts.find((p: any) => p.isFeatured) || podcasts[0];
  const others = podcasts.filter((p: any) => p._id !== featured?._id);

  return (
    <>
      <section className="relative bg-navy-gradient min-h-[40vh] flex items-center overflow-hidden pt-[120px] md:pt-[150px] pb-12">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-navy-light/20 blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-8xl mx-auto px-6 md:px-8 w-full">
          <p className="section-label text-gold">Insights & Market Trends</p>
          <h1 className="font-display text-white text-[clamp(2rem,4vw,3.2rem)] mb-4">
            Real Estate Podcasts
          </h1>
          <p className="text-white/55 text-base max-w-lg leading-relaxed">
            Expert analysis, deep dives into upcoming projects, and ROI forecasts for properties in Chembur.
          </p>
        </div>
      </section>

      <section className="bg-surface-light py-16 md:py-24 min-h-[50vh]">
        <div className="max-w-8xl mx-auto px-6 md:px-8">
          
          {podcasts.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed border-navy/10 rounded-2xl">
              <p className="text-4xl mb-4">🎙️</p>
              <h3 className="font-display text-navy text-xl mb-3">No Podcasts Yet</h3>
              <p className="text-slate-navy text-sm">Check back later for exciting real estate insights.</p>
            </div>
          ) : (
            <>
              {featured && (
                <div className="mb-20">
                  <h2 className="font-display text-navy text-[1.6rem] md:text-[1.9rem] mb-8">Featured Episode</h2>
                  <Link href={`/podcasts/${featured.slug}`} className="block group">
                    <div className="bg-white rounded-2xl overflow-hidden border border-navy-100 shadow-card flex flex-col md:flex-row transition-transform duration-500 hover:-translate-y-2 hover:shadow-card-hover">
                      <div className="w-full md:w-2/5 relative h-64 md:h-auto overflow-hidden">
                        <img 
                          src={featured.thumbnailUrl || "/images/placeholder.jpg"} 
                          alt={featured.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors duration-500 flex items-center justify-center">
                           <div className="w-16 h-16 bg-gold/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                             <div className="w-0 h-0 border-t-8 border-b-8 border-l-[14px] border-t-transparent border-b-transparent border-l-white ml-1"></div>
                           </div>
                        </div>
                      </div>
                      <div className="p-8 md:p-12 flex flex-col justify-center w-full md:w-3/5">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="bg-navy/5 text-navy font-bold text-[0.65rem] px-3 py-1 rounded-full uppercase tracking-wider">
                            {new Date(featured.publishDate || featured.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                          <span className={`text-[0.65rem] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                            featured.accessType === "free" ? "bg-emerald-500/10 text-emerald-600" :
                            featured.accessType === "lead_unlock" ? "bg-[#C9A84C]/10 text-[#C9A84C]" :
                            "bg-purple-500/10 text-purple-600"
                          }`}>
                            {featured.accessType === "free" ? "Free to Listen" :
                             featured.accessType === "lead_unlock" ? "🔓 Unlock to Listen" : "💎 Premium Content"}
                          </span>
                        </div>
                        <h3 className="font-display text-navy text-2xl md:text-3xl mb-3 leading-tight group-hover:text-gold transition-colors">{featured.title}</h3>
                        <p className="text-slate-navy text-sm leading-relaxed mb-6 line-clamp-3">{featured.description}</p>
                        <span className="text-navy font-bold text-sm flex items-center gap-2">
                          Listen Now <span className="text-gold transition-transform duration-300 group-hover:translate-x-2">→</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {others.length > 0 && (
                <div>
                  <h2 className="font-display text-navy text-[1.6rem] md:text-[1.9rem] mb-8">More Episodes</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {others.map((p: any, i: number) => (
                      <ScrollReveal key={p._id} delay={i * 100}>
                        <Link href={`/podcasts/${p.slug}`} className="block group">
                          <div className="bg-white rounded-2xl overflow-hidden border border-navy-100 shadow-sm transition-transform duration-500 hover:-translate-y-2 hover:shadow-card">
                            <div className="relative h-48 overflow-hidden">
                              <img 
                                src={p.thumbnailUrl || "/images/placeholder.jpg"} 
                                alt={p.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                              <div className="absolute top-3 left-3 flex gap-2">
                                <span className={`text-[0.6rem] font-bold px-2 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm ${
                                  p.accessType === "free" ? "bg-black/50 text-white" :
                                  "bg-[#C9A84C] text-navy shadow-md"
                                }`}>
                                  {p.accessType === "free" ? "Free" :
                                   p.accessType === "lead_unlock" ? "🔒 Unlock" : "💎 Premium"}
                                </span>
                              </div>
                            </div>
                            <div className="p-6">
                              <p className="text-[0.65rem] text-slate-400 font-bold uppercase tracking-wider mb-2">
                                {new Date(p.publishDate || p.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </p>
                              <h3 className="font-display text-navy text-lg mb-2 leading-snug group-hover:text-gold transition-colors line-clamp-2">{p.title}</h3>
                              <p className="text-slate-navy text-xs leading-relaxed line-clamp-2">{p.description}</p>
                            </div>
                          </div>
                        </Link>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

        </div>
      </section>
    </>
  );
}
