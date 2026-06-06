export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-surface-light">
      <div className="relative flex items-center justify-center w-24 h-24 mb-6">
        {/* Subtle background ring */}
        <div className="absolute inset-0 border-4 border-navy/10 rounded-full"></div>
        {/* Spinning gold ring */}
        <div className="absolute inset-0 border-4 border-[#D4A017] rounded-full border-t-transparent animate-spin"></div>
        {/* Center icon */}
        <div className="text-3xl animate-pulse">🏛️</div>
      </div>
      <h2 className="font-display text-navy text-2xl mb-2 animate-pulse">
        Loading...
      </h2>
      <p className="text-slate-navy text-sm max-w-sm text-center">
        Preparing exceptional properties for you.
      </p>
    </div>
  );
}
