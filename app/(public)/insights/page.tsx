"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";

const articles = [
  {
    id: "metro-2b",
    category: "Infrastructure",
    date: "May 2026",
    title: "How Metro Line 2B Will Transform Chembur Real Estate in 2026",
    imageUrl: "/images/insights/metro.png",
    excerpt:
      "The Metro Line 2B Chembur station is weeks away from launch. MMRDA has fast-tracked the timeline after years of delays. Here's what this means for property values, demand, and the investment case for Chembur.",
    full: [
      { type: "para", content: "After years of anticipation, Metro Line 2B — running from DN Nagar to Mankhurd — is finally on the cusp of operational reality. The Chembur station, positioned at one of the most strategically important nodes of this corridor, is confirmed for a May/June 2026 launch. MMRDA (Mumbai Metropolitan Region Development Authority) has been fast-tracking the final commissioning work." },
      { type: "heading", content: "What Metro 2B Means for Travel Times" },
      { type: "para", content: "The Metro Line 2B will reduce travel times from Chembur to key business districts by 50–75%. A journey to BKC that currently takes 35–45 minutes by road will drop to under 20 minutes. CST/Fort connectivity improves dramatically. The BKC-Chembur corridor, already one of Mumbai's most important commercial axes, becomes significantly more efficient." },
      { type: "para", content: "This connectivity upgrade matters enormously for residential demand. BKC hosts the offices of hundreds of multinational companies, financial institutions, and government bodies. Professionals who currently live in Bandra, Kurla, or Santacruz — paying premium rents — will find Chembur an extremely compelling alternative." },
      { type: "heading", content: "Historical Evidence: What Metro Does to Property Prices" },
      { type: "para", content: "Research from multiple Indian metro launches shows a consistent pattern: property prices within 500m–1km of new metro stations appreciate 15–30% within 24 months of operations commencing. The appreciation is front-loaded — much of it happens in the 6–12 months just before and just after launch." },
      { type: "para", content: "We are currently in that window. Properties in Chembur's core catchment area (within 1km of the station) are already seeing increased inquiry volumes and tighter inventory. The properties still available today represent the last opportunity to buy before this appreciation cycle runs its course." },
      { type: "heading", content: "Chembur's Current Price Position" },
      { type: "para", content: "Residential properties in Chembur currently trade at ₹20,000–₹34,000 per sq ft depending on quality, floor, and exact micro-location. This compares to Bandra West at ₹55,000–₹80,000 and BKC at ₹35,000–₹55,000. Even post-metro appreciation, Chembur will remain a relative value play versus these western suburbs." },
      { type: "para", content: "Investors looking for capital appreciation should focus on properties within 700m of the Chembur Metro Station. These will command a 'metro premium' that grows over the next 3–5 years as the infrastructure becomes embedded in commuter patterns." },
      { type: "heading", content: "Our Recommendation" },
      { type: "para", content: "The window to buy before the metro premium gets priced in is closing. We estimate that by Q3 2026, prices in the immediate metro catchment will have adjusted upward by 8–12%. Buyers who move in May/June 2026 are likely looking at strong appreciation over the next 2–3 years, plus superior rental yields driven by increased demand from metro commuters." },
    ],
  },
  {
    id: "nri-chembur",
    category: "NRI Investment",
    date: "April 2026",
    title: "Why NRIs Are Choosing Chembur Over Bandra in 2026",
    imageUrl: "/images/insights/nri.png",
    excerpt:
      "NRI investment in Mumbai residential real estate surged 30% in 2025. A growing share of these buyers are choosing Chembur over traditional hotspots like Bandra and Powai. Here's the data behind this shift.",
    full: [
      { type: "para", content: "NRI investment in Mumbai real estate hit a multi-year high in 2025, with transaction volumes up approximately 30% year-on-year. The weak rupee, strong rental yields, and India's robust economic outlook continue to attract overseas Indian buyers. What's changed is where they are buying." },
      { type: "heading", content: "The Price Differential Is the Story" },
      { type: "para", content: "The core reason NRIs are looking at Chembur is straightforward: it offers significantly better value. Bandra West — historically the NRI favourite — now trades at ₹55,000–₹80,000 per sq ft. A 2 BHK of 800 sq ft costs ₹4.4 to ₹6.4 crore. In Chembur, the equivalent property costs ₹2.4–₹3.2 crore. That's nearly half the price for a property in a location with comparable infrastructure and better connectivity." },
      { type: "para", content: "For NRI investors focused on rental yield, the maths is even more compelling. Chembur yields 3.5–4.5% gross rental returns versus Bandra's 2.5–3.2%. Combined with stronger capital appreciation potential (starting from a lower base), the investment case for Chembur is difficult to ignore." },
      { type: "heading", content: "Infrastructure Convergence" },
      { type: "para", content: "Chembur now offers a connectivity profile that rivals Bandra and exceeds Powai. The Eastern Freeway provides direct, signal-free access to Fort and CST in 25 minutes. The Monorail connects to Jacob Circle (and onward transfers). And Metro Line 2B — launching in 2026 — adds BKC connectivity in under 20 minutes." },
      { type: "para", content: "The social infrastructure has also matured significantly. Chembur now has quality schools, hospitals (Kokilaben Dhirubhai Ambani Hospital is minutes away), premium retail (R-City, Phoenix Marketcity accessible in 15 min), and excellent restaurant culture along Central Avenue Road." },
      { type: "heading", content: "Comparative Market Data" },
      { type: "table", headers: ["Location", "Avg Price/Sq Ft", "Gross Yield", "Metro Access"], rows: [["Chembur", "₹20,000–₹34,000", "3.5–4.5%", "Line 2B (2026)"], ["Bandra West", "₹55,000–₹80,000", "2.5–3.2%", "Line 2 (Western)"], ["Powai", "₹28,000–₹42,000", "3.0–3.8%", "Indirect"], ["Ghatkopar", "₹22,000–₹32,000", "3.5–4.2%", "Line 1 (Direct)"], ["Wadala", "₹18,000–₹28,000", "3.8–4.8%", "Monorail + 2B"]] },
      { type: "para", content: "For NRI buyers from Dubai, the affordability angle is particularly relevant. With the AED at approximately ₹23, a ₹3 crore Chembur apartment represents AED 1.3 million — significantly less than comparable Mumbai locations and comparable to mid-tier Dubai properties, but in a high-growth market." },
    ],
  },
  {
    id: "price-guide",
    category: "Market Guide",
    date: "March 2026",
    title: "Chembur Property Prices 2026 — The Complete Micro-Market Guide",
    imageUrl: "/images/insights/price.png",
    excerpt:
      "A detailed breakdown of property prices across Chembur's key micro-markets — Chembur East, Chembur West, Sion-Trombay Road, and the Railway Colony area — with data from recent transactions.",
    full: [
      { type: "para", content: "Chembur is not a monolithic market. Prices vary significantly across micro-locations, building age, amenities, and proximity to key infrastructure. Here is our comprehensive guide to what you can expect to pay in each micro-market in 2026." },
      { type: "heading", content: "Chembur East — The Premium Zone" },
      { type: "para", content: "Chembur East, centred around the Chembur Station area and extending towards Tilak Nagar, is the most sought-after micro-market. New and near-new projects here trade at ₹27,000–₹34,000 per sq ft. Heritage and older buildings are available at ₹18,000–₹24,000 depending on age and maintenance." },
      { type: "para", content: "Key drivers of Chembur East's premium: walkability to the railway station, Eastern Freeway access at Anik, proximity to the upcoming Metro station, and superior social infrastructure. This micro-market will see the most direct benefit from the Metro Line 2B launch." },
      { type: "heading", content: "Chembur West — Value Play" },
      { type: "para", content: "Chembur West, extending towards Sion and Chunabhatti, offers better value at ₹20,000–₹26,000 per sq ft. The tradeoff is slightly longer commute times and less walkable infrastructure. However, with the Monorail at Chembur station and bus connectivity, this area has strong value for price-sensitive buyers." },
      { type: "heading", content: "Sion–Trombay Road Corridor" },
      { type: "para", content: "The stretch from Sion towards Govandi along Trombay Road offers the most affordable entry points into the Chembur catchment — ₹16,000–₹22,000 per sq ft. This area has seen significant new project launches in 2024–2026 and offers strong long-term appreciation potential as the broader area gentrifies." },
      { type: "heading", content: "Configuration-wise Price Guide (2026)" },
      { type: "table", headers: ["Configuration", "Area", "Price Range", "Rental Yield"], rows: [["1 BHK", "350–500 sq ft", "₹70L – ₹1.4 Cr", "4.0–5.0%"], ["2 BHK", "550–800 sq ft", "₹1.5 Cr – ₹3.2 Cr", "3.5–4.5%"], ["3 BHK", "850–1200 sq ft", "₹3 Cr – ₹6 Cr", "3.0–4.0%"], ["4 BHK+", "1200+ sq ft", "₹6 Cr – ₹15 Cr+", "2.8–3.5%"], ["Commercial", "300–2000 sq ft", "₹25K–₹80K/mo", "6.0–8.0%"]] },
      { type: "heading", content: "Investment Outlook" },
      { type: "para", content: "Chembur's overall market is expected to appreciate 12–18% over the next 24 months, driven by the Metro launch, ongoing infrastructure improvement, and the increasing migration of professionals from higher-cost western suburbs. Commercial properties — particularly office spaces and retail units near the Metro station — are expected to outperform residential." },
      { type: "para", content: "For investors, we recommend focusing on well-maintained 2 BHK and 3 BHK units within 800m of the Metro station. These will benefit from both the metro premium and strong rental demand from professionals employed in BKC and the western business districts. First-time buyers should consider 1 BHK units in Chembur East or Chembur West for the best combination of affordability and appreciation." },
    ],
  },
];

type ArticleType = (typeof articles)[0];

function ArticleCard({ article }: { article: ArticleType }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white border border-navy-100 rounded-2xl overflow-hidden hover:border-navy-300 transition-all duration-300 flex flex-col hover:-translate-y-1 shadow-card">
      {/* Image */}
      <div className="h-52 relative flex-shrink-0">
        <img 
          src={article.imageUrl} 
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
        <span className="absolute top-4 left-4 bg-gold text-navy pill-tag text-[0.65rem] font-bold z-10 shadow-lg">
          {article.category}
        </span>
      </div>

      {/* Body */}
      <div className="p-7 md:p-8 flex flex-col flex-1">
        <p className="text-[0.7rem] text-slate-navy uppercase tracking-widest mb-2.5">
          {article.date}
        </p>
        <h3 className="font-display text-navy text-[1.08rem] mb-3.5 leading-snug">
          {article.title}
        </h3>

        {/* Excerpt */}
        {!expanded && (
          <p className="text-sm text-slate-navy leading-[1.78] mb-5 flex-1">
            {article.excerpt}
          </p>
        )}

        {/* Full article */}
        {expanded && (
          <div className="mb-5 flex-1 space-y-4">
            {article.full.map((block, i) => {
              if (block.type === "para") {
                return (
                  <p key={i} className="text-sm text-slate-navy leading-[1.82]">
                    {block.content as string}
                  </p>
                );
              }
              if (block.type === "heading") {
                return (
                  <h4
                    key={i}
                    className="font-display text-navy text-base mt-6"
                  >
                    {block.content as string}
                  </h4>
                );
              }
              if (block.type === "table") {
                const tableData = block as {
                  type: string;
                  headers: string[];
                  rows: string[][];
                };
                return (
                  <div key={i} className="overflow-x-auto mt-4">
                    <table className="w-full text-xs border-collapse">
                      <thead>
                        <tr className="bg-navy/5">
                          {tableData.headers.map((h) => (
                            <th
                              key={h}
                              className="text-left px-3 py-2.5 text-navy font-semibold tracking-wide border-b border-navy-100"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {tableData.rows.map((row, ri) => (
                          <tr
                            key={ri}
                            className={ri % 2 === 0 ? "bg-surface-light" : ""}
                          >
                            {row.map((cell, ci) => (
                              <td
                                key={ci}
                                className="px-3 py-2.5 text-slate-navy border-b border-navy-50"
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              }
              return null;
            })}
          </div>
        )}

        <button
          onClick={() => setExpanded(!expanded)}
          className="text-[0.8rem] text-navy font-semibold flex items-center gap-2 hover:gap-4 transition-all self-start"
        >
          {expanded ? "← Show Less" : "Read Full Article →"}
        </button>
      </div>
    </div>
  );
}

export default function InsightsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy-gradient min-h-[44vh] flex items-center overflow-hidden pt-20 pb-12">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-navy-light/20 blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-8xl mx-auto px-6 md:px-8 w-full">
          <p className="section-label text-gold">Research & Analysis</p>
          <h1 className="font-display text-white text-[clamp(2rem,4vw,3.2rem)] mb-4">
            Chembur Real Estate Market Insights
          </h1>
          <p className="text-white/55 text-base max-w-lg leading-relaxed">
            In-depth analysis of Mumbai&apos;s real estate market, with
            special focus on Chembur. Data-driven insights to help you invest
            with confidence.
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="bg-surface-light py-16 md:py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <ScrollReveal key={article.id}>
                <ArticleCard article={article} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Market at a Glance */}
      <section className="bg-navy py-16 md:py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-8">
          <ScrollReveal className="text-center mb-12">
            <p className="section-label text-gold justify-center">Quick Reference</p>
            <h2 className="font-display text-white mb-3">
              Chembur Market Snapshot — 2026
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { icon: "💰", val: "₹20K–34K", label: "Per Sq Ft — Residential" },
              { icon: "📈", val: "12–18%", label: "Projected 2-Year Appreciation" },
              { icon: "🏢", val: "₹25K–80K/mo", label: "Commercial Rental Range" },
              { icon: "⭐", val: "3.5–4.5%", label: "Gross Rental Yield" },
            ].map((s, i) => (
              <ScrollReveal key={s.val} delay={i * 80}>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:-translate-y-1 transition-all backdrop-blur-sm">
                  <div className="text-3xl mb-3">{s.icon}</div>
                  <div className="font-display text-gold text-xl font-bold mb-1.5">
                    {s.val}
                  </div>
                  <p className="text-xs text-white/45 leading-snug">{s.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gold py-16 text-center">
        <div className="max-w-8xl mx-auto px-6 md:px-8">
          <h2 className="font-display text-navy text-[1.8rem] md:text-[2.2rem] mb-3">
            Want a Personalised Market Report?
          </h2>
          <p className="text-navy/60 text-sm max-w-md mx-auto mb-8">
            Tell us your investment interest and we&apos;ll share current
            pricing, available inventory, and our recommendation — free of
            charge.
          </p>
          <a
            href="https://wa.me/919820182285?text=Hi, I would like a personalised market report for Chembur real estate. My investment interest is [describe]."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-navy text-sm"
          >
            Request Market Report
          </a>
        </div>
      </section>
    </>
  );
}
