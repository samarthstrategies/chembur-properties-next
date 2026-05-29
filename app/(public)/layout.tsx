import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import LeadCapturePopup from "@/components/LeadCapturePopup";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
      <LeadCapturePopup />
    </>
  );
}
