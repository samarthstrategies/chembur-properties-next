"use client";

import WhatsAppIcon from "@/components/WhatsAppIcon";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919820182285"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-7 right-7 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 animate-wa-pulse"
    >
      <WhatsAppIcon className="w-7 h-7 text-white" strokeWidth="1.5" />
    </a>
  );
}
