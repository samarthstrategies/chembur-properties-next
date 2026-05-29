import Link from "next/link";
import WhatsAppIcon from "@/components/WhatsAppIcon";

export interface PropertyCardProps {
  code: string;
  title: string;
  location: string;
  price: string;
  priceNote?: string;
  type: "residential" | "commercial";
  transaction: "buy" | "rent" | "lease";
  bhk?: string;
  area: string;
  badge: string;
  badgeVariant?: "default" | "rent" | "commercial" | "premium";
  imgGradient: string; // Tailwind gradient string or inline style
  imageUrl?: string;
  dataType?: string;
  dataTransaction?: string;
  dataBhk?: string;
  dataPrice?: string;
  dataLocation?: string;
}

const badgeColors: Record<string, string> = {
  default: "bg-navy text-white",
  rent: "bg-emerald-500 text-white",
  commercial: "bg-navy-light text-white",
  premium: "bg-gold text-navy",
};

export default function PropertyCard({
  code,
  title,
  location,
  price,
  priceNote,
  area,
  badge,
  badgeVariant = "default",
  imgGradient,
  imageUrl,
  bhk,
  dataType,
  dataTransaction,
  dataBhk,
  dataPrice,
  dataLocation,
}: PropertyCardProps) {
  const waMessage = encodeURIComponent(
    `Hi, I am interested in ${title} (${code}) listed on Chembur Properties. Please share more details.`
  );

  return (
    <div
      className="bg-white rounded-xl overflow-hidden border border-navy-100 transition-all duration-400 hover:-translate-y-2 hover:shadow-card-hover group"
      data-type={dataType}
      data-transaction={dataTransaction}
      data-bhk={dataBhk}
      data-price={dataPrice}
      data-location={dataLocation}
    >
      {/* Image placeholder with gradient or real image */}
      <Link href={`/properties/${code}`} className="relative h-56 overflow-hidden block">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div
            className="w-full h-full transition-transform duration-700 group-hover:scale-110"
            style={{ background: imgGradient }}
          />
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
        {/* Badge */}
        <span
          className={`absolute top-4 left-4 z-10 pill-tag text-[0.65rem] ${badgeColors[badgeVariant]}`}
        >
          {badge}
        </span>
        {/* Price */}
        <span className="absolute bottom-4 left-4 z-10 font-display text-white text-xl font-bold drop-shadow-lg">
          {price}
        </span>
        {priceNote && (
          <span className="absolute bottom-4 right-4 z-10 text-[0.7rem] text-white/70">
            {priceNote}
          </span>
        )}
      </Link>

      {/* Body */}
      <div className="p-5">
        <p className="text-[0.62rem] font-bold tracking-[0.14em] uppercase text-gold mb-1.5">
          {code}
        </p>
        <h3 className="font-display text-[1.05rem] text-navy mb-2 leading-snug">
          {title}
        </h3>
        <p className="text-sm text-slate-navy flex items-center gap-1.5 mb-3.5">
          <span>📍</span> {location}
        </p>

        {/* Specs */}
        <div className="flex gap-4 mb-4 flex-wrap">
          {bhk && (
            <span className="text-[0.75rem] text-slate-navy flex items-center gap-1">
              🛏 {bhk}
            </span>
          )}
          <span className="text-[0.75rem] text-slate-navy flex items-center gap-1">
            📐 {area}
          </span>
        </div>

        {/* Separator */}
        <div className="h-px bg-navy-100 mb-4" />

        {/* Actions */}
        <div className="flex gap-2">
          <a
            href={`https://wa.me/919820182285?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 bg-navy text-white py-2.5 px-3 rounded-md text-[0.75rem] font-semibold transition-all hover:bg-navy-rich hover:-translate-y-px hover:shadow-navy"
          >
            <WhatsAppIcon className="w-4 h-4 text-white" strokeWidth="1.5" />
            Inquire on WhatsApp
          </a>
          <Link
            href={`/properties/${code}`}
            className="px-3 py-2.5 border border-navy-200 rounded-md text-[0.75rem] text-slate-navy hover:border-navy hover:text-navy transition-all"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
