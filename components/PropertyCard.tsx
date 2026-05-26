import Link from "next/link";

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
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
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
