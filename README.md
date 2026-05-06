# Chembur Properties — Roopam Estate Agency
### Next.js 14 Website — Est. 1965

---

## Tech Stack

- **Next.js 14** — App Router
- **TypeScript**
- **Tailwind CSS** — Custom gold/dark color system
- **next/font/google** — Playfair Display (headings) + Inter (body)
- **Vercel** — Recommended deployment platform

---

## Getting Started

```bash
cd chembur-properties-next
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
app/
├── layout.tsx              # Root layout — fonts, Header, Footer, WhatsAppButton
├── globals.css             # Tailwind base + custom utility classes
├── page.tsx                # Homepage (Hero, Search, Pathways, Listings, Metro, Why Chembur, Services, Testimonials, Timeline, CTA)
├── properties/page.tsx     # Property listings with live filter (type/budget/BHK/location)
├── services/page.tsx       # 6 detailed service sections with steps
├── nri/page.tsx            # NRI Investment Portal
├── insights/page.tsx       # Market insights / blog with expandable articles
├── about/page.tsx          # Company story, timeline, team, values
└── contact/page.tsx        # Contact form + office details + map

components/
├── Header.tsx              # Sticky header, mobile hamburger overlay
├── Footer.tsx              # Quick links, contact, trust signals
├── WhatsAppButton.tsx      # Fixed floating WA button with pulse animation
├── PropertyCard.tsx        # Reusable property card component
├── TestimonialCarousel.tsx # Auto-sliding carousel (4s interval, dots nav)
├── ScrollReveal.tsx        # IntersectionObserver scroll-fade-up animation
└── CountUp.tsx             # Animated counter (used in hero stats)
```

---

## Deploying to Vercel

1. Push this project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repo
4. Vercel auto-detects Next.js — click **Deploy**
5. Done. Live in ~90 seconds.

**Custom Domain (chemburproperties.com):**
- Vercel Dashboard → Project → Settings → Domains
- Add `chemburproperties.com` and `www.chemburproperties.com`
- Update your domain registrar's DNS nameservers to Vercel's NS records

---

## TODO for Aryesh — Full Integration Checklist

### Property Database
- [ ] Set up property database (Supabase / Airtable / Contentful / any CMS)
- [ ] Create API route: `app/api/properties/route.ts`
- [ ] Replace static `ALL_PROPERTIES` array in `app/properties/page.tsx` with `fetch('/api/properties')`
- [ ] Replace static `featuredProperties` in `app/page.tsx` with `fetch('/api/properties?featured=true&limit=3')`
- [ ] Add real property images to `public/images/properties/`
- [ ] Update `PropertyCard.tsx` to use `<Image src={...} />` instead of CSS gradient

### Contact Form
- [ ] Create API route: `app/api/contact/route.ts`
- [ ] Connect to email (Resend.com is the easiest — free tier available)
- [ ] OR use Formspree: set `action="https://formspree.io/f/YOUR_ID"` on the `<form>`
- [ ] Connect to CRM (HubSpot / Zoho / Freshsales) via webhook POST
- [ ] Update the `handleSubmit` function in `app/contact/page.tsx` to call your API

### Google Ads & Analytics
- [ ] Add Google Analytics 4 to `app/layout.tsx` (use `next/script`)
  ```tsx
  <Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX" strategy="afterInteractive" />
  ```
- [ ] Add Ads conversion tracking on: form submit, WhatsApp clicks, Call CTA
- [ ] Submit sitemap to Google Search Console (create `app/sitemap.ts`)

### Google Maps — Contact Page
- [ ] Get Maps Embed API key: console.cloud.google.com
- [ ] Replace the map placeholder in `app/contact/page.tsx` with real `<iframe>` embed
  ```html
  <iframe src="https://www.google.com/maps/embed?pb=!1m18...YOUR_EMBED_URL..." />
  ```

### Team Photos
- [ ] Add photos to `public/images/team/jeetu.jpg`, `shyam.jpg`, `raman.jpg`
- [ ] Update `app/about/page.tsx` team section to use `<Image>` instead of gradient initials

### RERA Registration
- [ ] Add actual MahaRERA registration number to Footer.tsx and services pages

### Email Address
- [ ] Replace placeholder `info@chemburproperties.com` with real email throughout

---

## Environment Variables

Create `.env.local` for local dev:

```env
# Google Maps (contact page)
NEXT_PUBLIC_GOOGLE_MAPS_KEY=your_key_here

# Email (if using API route with Resend or SMTP)
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_EMAIL=jeetu@chemburproperties.com

# CRM Webhook
CRM_WEBHOOK_URL=https://your-crm.com/webhook/leads
```

On Vercel: Dashboard → Project → Settings → Environment Variables — add the same keys.

---

## WhatsApp Number

All WhatsApp links use: `https://wa.me/919820182285`

To update the number globally, search-replace `919820182285` across all files.

---

## Color Reference (Tailwind Custom Tokens)

| Token | Hex | Usage |
|-------|-----|-------|
| `bg-bg-primary` | `#0A0A0A` | Main dark background |
| `bg-bg-secondary` | `#111111` | Alternate section dark |
| `bg-bg-light` | `#F9F7F4` | Light/warm off-white sections |
| `gold` / `bg-gold` | `#C9A44A` | Primary accent — CTAs, highlights |
| `gold-light` | `#E8C96A` | Gold hover states |
| `gold-dark` | `#A07C2E` | Gold borders, pressed states |

---

Built by Samarth Strategies for Roopam Estate Agency.
