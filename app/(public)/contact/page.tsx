"use client";

import { useState } from "react";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

export default function ContactPage() {
  const [inquiryType, setInquiryType] = useState("buy");
  const [submitted, setSubmitted] = useState(false);

  // TODO (Aryesh): Connect form submission to your backend/CRM
  // Options: Formspree, Netlify Forms, a Next.js API route, or a CRM webhook
  // Example API route: POST /api/contact with the form payload
  // Add Google Ads conversion tracking here on form submit (gtag event)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO (Aryesh): Replace this with actual form submission logic
    // const formData = new FormData(e.currentTarget)
    // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(Object.fromEntries(formData)) })
    setSubmitted(true);
  };

  const inquiryTypes = [
    { val: "buy", label: "I want to Buy" },
    { val: "rent", label: "I want to Rent" },
    { val: "nri", label: "NRI Inquiry" },
    { val: "redevelopment", label: "Redevelopment" },
    { val: "management", label: "Property Management" },
    { val: "sell", label: "I want to Sell" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy-gradient min-h-[38vh] flex items-center overflow-hidden pt-[120px] md:pt-[150px] pb-10">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-navy-light/20 blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-8xl mx-auto px-6 md:px-8 w-full">
          <p className="section-label text-gold">Reach Out</p>
          <h1 className="font-display text-white text-[clamp(2rem,4vw,3.2rem)] mb-3">Get in Touch</h1>
          <p className="text-white/55 text-base max-w-lg leading-relaxed">
            Whether you have a specific property in mind or just want to
            explore your options — we are here to help. No pressure, just
            honest guidance.
          </p>
        </div>
      </section>

      {/* Contact Main */}
      <section className="bg-surface-light py-14 md:py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
            {/* Left — Contact Info */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                <div className="flex items-center gap-4 mb-8">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-gold/50 shadow-md">
                    <Image src="/images/JeetuChhaabria_half.png" alt="Jeetu Chhaabria" fill className="object-cover" />
                  </div>
                  <div>
                    <h2 className="font-display text-navy text-2xl">
                      Contact Details
                    </h2>
                    <p className="text-sm font-medium text-gold-dark mt-1">Speak with Jeetu Chhaabria</p>
                  </div>
                </div>

                {[
                  {
                    icon: "📍",
                    label: "Office Address",
                    content:
                      "Vishwakarma G-70, Central Avenue,\nInbetween Hotel Geeta Bhavan & Ratnagiri,\nChembur, Mumbai, Maharashtra 400071",
                    isMultiline: true,
                  },
                  {
                    icon: "📞",
                    label: "Phone",
                    content: "98201 82285",
                    href: "tel:+919820182285",
                  },
                  {
                    icon: "💬",
                    label: "WhatsApp",
                    content: "wa.me/919820182285",
                    href: "https://wa.me/919820182285",
                    isExternal: true,
                  },
                  {
                    icon: "📧",
                    label: "Email",
                    content: "roopamestate@gmail.com",
                    href: "mailto:roopamestate@gmail.com",
                  },
                ].map((item) => (
                  <div key={item.label} className="flex gap-4 mb-7">
                    <div className="w-11 h-11 bg-navy/10 border border-navy/15 rounded-lg flex items-center justify-center text-lg flex-shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div>
                      <strong className="block text-[0.68rem] font-bold tracking-widest uppercase text-navy mb-1.5">
                        {item.label}
                      </strong>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.isExternal ? "_blank" : undefined}
                          rel={item.isExternal ? "noopener noreferrer" : undefined}
                          className="text-sm text-slate-navy hover:text-navy transition-colors leading-relaxed"
                        >
                          {item.content}
                        </a>
                      ) : (
                        <p className="text-sm text-slate-navy leading-relaxed whitespace-pre-line">
                          {item.content}
                        </p>
                      )}
                    </div>
                  </div>
                ))}

                {/* Office Hours */}
                <div className="bg-white border border-navy-100 rounded-xl p-5 mt-2 shadow-card">
                  <p className="text-[0.68rem] font-bold tracking-widest uppercase text-navy mb-3">
                    Office Hours
                  </p>
                  <div className="flex flex-col gap-2">
                    {[
                      { day: "Monday – Friday", time: "9:30 AM – 7:00 PM" },
                      { day: "Saturday", time: "9:30 AM – 6:00 PM" },
                      { day: "Sunday", time: "By Appointment" },
                    ].map((h) => (
                      <div key={h.day} className="flex justify-between">
                        <span className="text-sm text-slate-navy">{h.day}</span>
                        <span className="text-sm text-navy font-medium">
                          {h.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick actions */}
                <div className="flex gap-3 mt-6 flex-wrap">
                  <a
                    href="https://wa.me/919820182285"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold text-sm flex-1 text-center"
                  >
                    WhatsApp Now
                  </a>
                  <a href="tel:+919820182285" className="btn-outline-navy text-sm flex-1 text-center">
                    Call Now
                  </a>
                </div>
              </ScrollReveal>
            </div>

            {/* Right — Form */}
            <div className="lg:col-span-3">
              <ScrollReveal delay={80}>
                <div className="bg-white border border-navy-100 rounded-2xl p-8 md:p-10 shadow-card">
                  {submitted ? (
                    <div className="text-center py-10">
                      <div className="text-5xl mb-5">✅</div>
                      <h3 className="font-display text-navy text-2xl mb-3">
                        Inquiry Received!
                      </h3>
                      <p className="text-slate-navy text-sm leading-relaxed mb-6">
                        Thank you for reaching out. Jeetu sir or a member of
                        our team will respond within a few hours. For faster
                        response, WhatsApp us directly.
                      </p>
                      <div className="flex gap-3 justify-center flex-wrap">
                        <a
                          href="https://wa.me/919820182285"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-gold text-sm"
                        >
                          WhatsApp Us
                        </a>
                        <button
                          onClick={() => setSubmitted(false)}
                          className="btn-outline-navy text-sm"
                        >
                          Send Another
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 className="font-display text-navy text-xl mb-6">
                        Send an Inquiry
                      </h3>

                      {/* Inquiry Type Pills */}
                      <div className="mb-6">
                        <p className="text-[0.68rem] font-bold tracking-widest uppercase text-slate-navy mb-3">
                          I am inquiring about
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {inquiryTypes.map((t) => (
                            <button
                              key={t.val}
                              type="button"
                              onClick={() => setInquiryType(t.val)}
                              className={`px-4 py-2 rounded-full text-sm border transition-all duration-150 ${inquiryType === t.val
                                  ? "border-navy text-navy bg-navy/5 font-semibold"
                                  : "border-navy-200 text-slate-navy hover:border-navy hover:text-navy"
                                }`}
                            >
                              {t.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                          type="hidden"
                          name="inquiryType"
                          value={inquiryType}
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[0.65rem] font-bold tracking-widest uppercase text-slate-navy">
                              Full Name *
                            </label>
                            <input
                              name="name"
                              required
                              placeholder="Your full name"
                              className="lux-input"
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[0.65rem] font-bold tracking-widest uppercase text-slate-navy">
                              Phone / WhatsApp *
                            </label>
                            <input
                              name="phone"
                              required
                              placeholder="+91 or country code"
                              className="lux-input"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[0.65rem] font-bold tracking-widest uppercase text-slate-navy">
                            Email Address
                          </label>
                          <input
                            name="email"
                            type="email"
                            placeholder="your@email.com"
                            className="lux-input"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[0.65rem] font-bold tracking-widest uppercase text-slate-navy">
                              Budget / Rent Range
                            </label>
                            <select
                              name="budget"
                              className="lux-select"
                              style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%230B1B3D' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "right 12px center",
                                paddingRight: "34px",
                              }}
                            >
                              <option value="">Select budget</option>
                              <option value="under50l">Under ₹50 Lakh</option>
                              <option value="50l-1cr">₹50L – ₹1 Crore</option>
                              <option value="1cr-2cr">₹1 Cr – ₹2 Cr</option>
                              <option value="2cr-5cr">₹2 Cr – ₹5 Cr</option>
                              <option value="above5cr">Above ₹5 Crore</option>
                            </select>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[0.65rem] font-bold tracking-widest uppercase text-slate-navy">
                              Preferred Location
                            </label>
                            <select
                              name="location"
                              className="lux-select"
                              style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%230B1B3D' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "right 12px center",
                                paddingRight: "34px",
                              }}
                            >
                              <option value="">Select area</option>
                              <option value="chembur">Chembur</option>
                              <option value="ghatkopar">Ghatkopar</option>
                              <option value="wadala">Wadala</option>
                              <option value="bkc">BKC</option>
                              <option value="thane">Thane</option>
                              <option value="navi-mumbai">Navi Mumbai</option>
                            </select>
                          </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[0.65rem] font-bold tracking-widest uppercase text-slate-navy">
                            Message / Requirements
                          </label>
                          <textarea
                            name="message"
                            rows={4}
                            placeholder="Tell us about your requirement — configuration, timeline, any specific building or area preferences..."
                            className="lux-input resize-none"
                          />
                        </div>

                        <div className="pt-2">
                          <button type="submit" className="btn-navy w-full py-3.5 text-sm">
                            Send Inquiry
                          </button>
                          <p className="text-xs text-slate-navy text-center mt-3">
                            We respond within 24 hours. For faster response,{" "}
                            <a href="https://wa.me/919820182285" target="_blank" rel="noopener noreferrer" className="text-navy font-semibold">
                              WhatsApp us directly
                            </a>
                            .
                          </p>
                        </div>
                      </form>
                    </>
                  )}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      {/* TODO (Aryesh): Replace the static map embed with Google Maps API for full interactivity */}
      {/* Get an API key at console.cloud.google.com → Maps JavaScript API */}
      <section className="bg-white py-14 md:py-16">
        <div className="max-w-8xl mx-auto px-6 md:px-8">
          <ScrollReveal>
            <h2 className="font-display text-navy text-xl mb-6">
              Find Our Office
            </h2>
            <p className="text-sm text-slate-navy mb-6">
              Vishwakarma G-70, Central Avenue, Inbetween Hotel Geeta Bhavan & Ratnagiri, Chembur, Mumbai, Maharashtra 400071.
            </p>
            <div className="rounded-2xl overflow-hidden border border-navy-100 h-[380px] bg-surface-light relative shadow-card">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.065609748293!2d72.90042067116394!3d19.060852740598566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c61e4833852b%3A0x2d6fca071cb2d4b5!2sChembur%20Properties%20(Roopam%20Estate%20Agency)%20%7C%20Real%20Estate%20Agent%20in%20Chembur!5e0!3m2!1sen!2sin!4v1778693064176!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade" 
                className="absolute inset-0"
              ></iframe>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
