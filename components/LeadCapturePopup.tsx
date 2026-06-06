"use client";

import { useState, useEffect, useCallback, useRef, forwardRef } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

// ─── Constants ────────────────────────────────────────────────────────────────

const GOLD = "#D4A017";
const NAVY = "#0B1B3D";

const BHK_OPTIONS = ["1 BHK", "2 BHK", "3 BHK", "3.5 BHK", "4 BHK", "4.5 BHK"];
const BUDGET_SALE_OPTIONS = ["Under 50L", "50L–1Cr", "1Cr–1.5Cr", "1.5Cr–2Cr", "2Cr–3Cr", "3Cr–5Cr", "5Cr+"];
const BUDGET_LEASE_OPTIONS = ["Under 20k", "20k–30k", "30k–50k", "50k–75k", "75k–1L", "1L+"];
const OFFICE_SIZE_OPTIONS = ["Under 500 sqft", "500–1000 sqft", "1000–2000 sqft", "2000+ sqft"];
const FAMILY_SIZE_OPTIONS = ["1–2", "3–4", "5–6", "7+"];
const POSSESSION_SALE_OPTIONS = ["Immediate", "3 months", "6 months", "1 year", "1+ year"];
const POSSESSION_LEASE_OPTIONS = ["Immediate", "1 month", "3 months", "6 months"];

const DOCS = [
  "Occupation Certificate",
  "Building/Flat Assessment Tax Demand Bill",
  "Approved Development Plan (with rubber stamp of Bldg Dept)",
  "Society Maintenance Bill (Latest)",
  "Society Registration Certificate",
  "RERA Number (if constructed 2020 onwards)",
  "All Chain of Agreements Available",

];

// ─── Shared form field components ─────────────────────────────────────────────

function FieldLabel({ label, required }: { label: string; required?: boolean }) {
  return (
    <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: "#64748B" }}>
      {label}
      {required && <span style={{ color: GOLD }} className="ml-0.5">*</span>}
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-red-500 text-xs mt-1">{message}</p>;
}

const SelectField = forwardRef<HTMLSelectElement, any>(({
  label,
  required,
  options,
  error,
  ...props
}, ref) => {
  return (
    <div>
      <FieldLabel label={label} required={required} />
      <select
        ref={ref}
        className="w-full px-4 py-3 border rounded-lg text-sm font-body transition-colors duration-200 appearance-none bg-white"
        style={{
          borderColor: error ? "#EF4444" : "#C3CFE7",
          color: NAVY,
          outline: "none",
        }}
        onFocus={(e) => { e.target.style.borderColor = NAVY; e.target.style.boxShadow = `0 0 0 2px rgba(11,27,61,0.1)`; }}
        onBlur={(e) => { e.target.style.borderColor = error ? "#EF4444" : "#C3CFE7"; e.target.style.boxShadow = "none"; }}
        {...props}
      >
        <option value="">Select…</option>
        {options.map((o: string) => <option key={o} value={o}>{o}</option>)}
      </select>
      <FieldError message={error} />
    </div>
  );
});

const TextField = forwardRef<HTMLInputElement, any>(({
  label,
  required,
  error,
  type = "text",
  placeholder,
  ...props
}, ref) => {
  return (
    <div>
      <FieldLabel label={label} required={required} />
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 border rounded-lg text-sm font-body transition-colors duration-200"
        style={{
          borderColor: error ? "#EF4444" : "#C3CFE7",
          color: NAVY,
          outline: "none",
        }}
        onFocus={(e) => { e.target.style.borderColor = NAVY; e.target.style.boxShadow = `0 0 0 2px rgba(11,27,61,0.1)`; }}
        onBlur={(e) => { e.target.style.borderColor = error ? "#EF4444" : "#C3CFE7"; e.target.style.boxShadow = "none"; }}
        {...props}
      />
      <FieldError message={error} />
    </div>
  );
});

const RadioGroup = forwardRef<HTMLInputElement, any>(({
  label,
  required,
  options,
  watchValue,
  error,
  ...props
}, ref) => {
  return (
    <div>
      <FieldLabel label={label} required={required} />
      <div className="flex gap-2 flex-wrap">
        {options.map((opt: string) => {
          const isSelected = watchValue === opt;
          return (
            <label
              key={opt}
              className="px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-150 cursor-pointer"
              style={{
                backgroundColor: isSelected ? NAVY : "transparent",
                color: isSelected ? "#fff" : NAVY,
                borderColor: isSelected ? NAVY : "#C3CFE7",
              }}
            >
              <input type="radio" value={opt} className="hidden" ref={ref} {...props} />
              {opt}
            </label>
          );
        })}
      </div>
      <FieldError message={error} />
    </div>
  );
});

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-widest mb-3 mt-5 first:mt-0 pb-1.5 border-b" style={{ color: NAVY, borderColor: "#E1E7F3" }}>
      {children}
    </p>
  );
}

// ─── Shared prop type for all form sections ────────────────────────────────────

type FormProps = {
  register: any;
  errors: any;
  watch: any;
  setValue: any;
};

// ─── Submit helper ────────────────────────────────────────────────────────────

async function submitLead(payload: { name: string; phone: string; email?: string; source: string; formData: Record<string, any> }) {
  const res = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.message || "Submission failed");
  return data;
}

// ─── Submit Button ────────────────────────────────────────────────────────────

function SubmitButton({ loading }: { loading: boolean }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 mt-6 flex items-center justify-center gap-2"
      style={{
        backgroundColor: loading ? "#E8C96A" : GOLD,
        color: NAVY,
        opacity: loading ? 0.8 : 1,
      }}
    >
      {loading ? (
        <>
          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Submitting…
        </>
      ) : (
        "Submit Enquiry →"
      )}
    </button>
  );
}

// ─── FORM SECTIONS (stateless — receive register/errors/watch/setValue as props) ─

function ResidentialBuyFields({ register, errors, watch, setValue }: FormProps) {
  const residency = watch("residency") || "";
  const hasCar = watch("hasCar") || "";
  const hasPet = watch("hasPet") || "";
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextField label="Full Name" required error={errors.name?.message} {...register("name", { required: "Name is required", minLength: { value: 2, message: "Min 2 characters" } })} />
        <TextField label="Mobile Number" required type="tel" error={errors.phone?.message} {...register("phone", { required: "Phone is required", pattern: { value: /^[6-9]\d{9}$/, message: "Enter valid 10 digit number" } })} />
      </div>
      <TextField label="Email ID" type="email" placeholder="Optional" error={errors.email?.message} {...register("email", { pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter valid email" } })} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SelectField label="BHK Required" required options={BHK_OPTIONS} error={errors.bhk?.message} {...register("bhk", { required: "This field is required" })} />
        <SelectField label="Budget" required options={BUDGET_SALE_OPTIONS} error={errors.budget?.message} {...register("budget", { required: "This field is required" })} />
      </div>
      <RadioGroup label="Current Residency" options={["Own", "Leased"]} watchValue={residency} {...register("residency")} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SelectField label="Family Size" options={FAMILY_SIZE_OPTIONS} {...register("familySize")} />
        <SelectField label="Possession From" required options={POSSESSION_SALE_OPTIONS} error={errors.possession?.message} {...register("possession", { required: "This field is required" })} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <RadioGroup label="Own Car?" options={["No", "1", "2", "3+"]} watchValue={hasCar} {...register("hasCar")} />
        <RadioGroup label="Pet Parent?" options={["Yes", "No"]} watchValue={hasPet} {...register("hasPet")} />
      </div>
    </div>
  );
}

function CommercialBuyFields({ register, errors }: FormProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextField label="Full Name" required error={errors.name?.message} {...register("name", { required: "Name is required", minLength: { value: 2, message: "Min 2 characters" } })} />
        <TextField label="Mobile Number" required type="tel" error={errors.phone?.message} {...register("phone", { required: "Phone is required", pattern: { value: /^[6-9]\d{9}$/, message: "Enter valid 10 digit number" } })} />
      </div>
      <TextField label="Company Name" required error={errors.companyName?.message} {...register("companyName", { required: "This field is required" })} />
      <TextField label="Business Profile" placeholder="Type of business" {...register("businessProfile")} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SelectField label="Office Size Required" options={OFFICE_SIZE_OPTIONS} {...register("officeSize")} />
        <SelectField label="Budget" required options={BUDGET_SALE_OPTIONS} error={errors.budget?.message} {...register("budget", { required: "This field is required" })} />
      </div>
      <SelectField label="Possession From" required options={POSSESSION_SALE_OPTIONS} error={errors.possession?.message} {...register("possession", { required: "This field is required" })} />
    </div>
  );
}

function SellFields({ register, errors, watch, setValue }: FormProps) {
  const flatCurrently = watch("flatCurrently") || "";
  const bankLoan = watch("bankLoanStatus") || "";
  const maintenanceIncludesTax = watch("maintenanceIncludesTax") || "";
  return (
    <div className="space-y-4">
      <SectionHeading>Owner Details</SectionHeading>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextField label="Name of Flat Owner" required error={errors.name?.message} {...register("name", { required: "Name is required", minLength: { value: 2, message: "Min 2 characters" } })} />
        <TextField label="Mobile Number" required type="tel" error={errors.phone?.message} {...register("phone", { required: "Phone is required", pattern: { value: /^[6-9]\d{9}$/, message: "Enter valid 10 digit number" } })} />
      </div>
      <TextField label="Email" type="email" placeholder="Optional" error={errors.email?.message} {...register("email", { pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter valid email" } })} />

      <SectionHeading>Property Details</SectionHeading>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextField label="Name of Society" required error={errors.societyName?.message} {...register("societyName", { required: "This field is required" })} />
        <TextField label="Flat Number" required error={errors.flatNumber?.message} {...register("flatNumber", { required: "This field is required" })} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <TextField label="Floor Number" required type="number" error={errors.floorNumber?.message} {...register("floorNumber", { required: "This field is required" })} />
        <SelectField label="BHK" required options={BHK_OPTIONS} error={errors.bhk?.message} {...register("bhk", { required: "This field is required" })} />
        <TextField label="Carpet Area (sqft)" required type="number" error={errors.carpetArea?.message} {...register("carpetArea", { required: "This field is required" })} />
        <TextField label="Quote Price (₹)" required type="number" placeholder="In Rs." error={errors.quotePrice?.message} {...register("quotePrice", { required: "This field is required" })} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <TextField label="Year of Construction" type="number" placeholder="e.g. 2010" {...register("yearOfConstruction")} />
        <TextField label="Total Floors in Building" type="number" {...register("totalFloors")} />
        <TextField label="Car Parks" type="number" {...register("carParks")} />
        <TextField label="Flats on Floor" type="number" {...register("flatsOnFloor")} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextField label="Car Park Location" placeholder="e.g. Stilt, Basement" {...register("carParkLocation")} />
        <TextField label="Vastu Door Facing" placeholder="Direction as you exit flat" {...register("vastuDoorFacing")} />
      </div>

      <SectionHeading>Financial Details</SectionHeading>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextField label="Society Maintenance (₹/month)" type="number" {...register("societyMaintenance")} />
        <TextField label="Yearly Property Tax (₹)" type="number" {...register("yearlyPropertyTax")} />
      </div>
      <RadioGroup label="Does Maintenance Include Property Tax?" options={["Yes", "No"]} watchValue={maintenanceIncludesTax} {...register("maintenanceIncludesTax")} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SelectField label="Seller is ___ Owner" options={["1st Owner", "2nd Owner", "3rd Owner", "Resale"]} {...register("sellerOwnerType")} />
      </div>
      <RadioGroup label="Flat Currently" required options={["Self Occupied", "Leased", "Vacant"]} watchValue={flatCurrently} error={errors.flatCurrently?.message} {...register("flatCurrently", { required: "This field is required" })} />
      <RadioGroup label="Bank Loan Status" required options={["Loan Free", "On Bank Loan"]} watchValue={bankLoan} error={errors.bankLoanStatus?.message} {...register("bankLoanStatus", { required: "This field is required" })} />
      {bankLoan === "On Bank Loan" && (
        <TextField label="Bank Name & Loan Amount" placeholder="e.g. HDFC Bank, ₹50L" {...register("bankDetails")} />
      )}

      <SectionHeading>Documents Available</SectionHeading>
      <p className="text-xs mb-2" style={{ color: "#64748B" }}>Tick all that apply</p>
      <div className="space-y-2">
        {DOCS.map((doc) => (
          <label key={doc} className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              value={doc}
              className="mt-0.5 w-4 h-4 rounded accent-[#D4A017] flex-shrink-0"
              {...register("documents")}
            />
            <span className="text-xs leading-relaxed" style={{ color: NAVY }}>{doc}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function LeaseOutFields({ register, errors }: FormProps) {
  return (
    <div className="space-y-4">
      <SectionHeading>Owner Details</SectionHeading>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextField label="Name of Flat Owner" required error={errors.name?.message} {...register("name", { required: "Name is required", minLength: { value: 2, message: "Min 2 characters" } })} />
        <TextField label="Mobile Number" required type="tel" error={errors.phone?.message} {...register("phone", { required: "Phone is required", pattern: { value: /^[6-9]\d{9}$/, message: "Enter valid 10 digit number" } })} />
      </div>
      <TextField label="Email" type="email" placeholder="Optional" error={errors.email?.message} {...register("email", { pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter valid email" } })} />

      <SectionHeading>Property Details</SectionHeading>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextField label="Name of Society" required error={errors.societyName?.message} {...register("societyName", { required: "This field is required" })} />
        <TextField label="Flat Number" required error={errors.flatNumber?.message} {...register("flatNumber", { required: "This field is required" })} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <TextField label="Floor Number" required type="number" error={errors.floorNumber?.message} {...register("floorNumber", { required: "This field is required" })} />
        <SelectField label="BHK" required options={BHK_OPTIONS} error={errors.bhk?.message} {...register("bhk", { required: "This field is required" })} />
        <TextField label="Carpet Area (sqft)" required type="number" error={errors.carpetArea?.message} {...register("carpetArea", { required: "This field is required" })} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextField label="Expected Monthly Compensation" required type="number" placeholder="In Rs." error={errors.quotePrice?.message} {...register("quotePrice", { required: "This field is required" })} />
        <TextField label="Security Deposit (₹)" required type="number" placeholder="In Rs." error={errors.securityDeposit?.message} {...register("securityDeposit", { required: "This field is required" })} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <TextField label="Year of Construction" type="number" placeholder="e.g. 2010" {...register("yearOfConstruction")} />
        <TextField label="Total Floors in Building" type="number" {...register("totalFloors")} />
        <TextField label="Car Parks" type="number" {...register("carParks")} />
        <TextField label="Flats on Floor" type="number" {...register("flatsOnFloor")} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextField label="Car Park Location" placeholder="e.g. Stilt, Basement" {...register("carParkLocation")} />
        <TextField label="Vastu Door Facing" placeholder="Direction as you exit flat" {...register("vastuDoorFacing")} />
      </div>

      <SectionHeading>Inventories & Amenities</SectionHeading>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <SelectField label="How many ACs" options={["0", "1", "2", "3", "4", "5+"]} {...register("acCount")} />
        <SelectField label="Bed" options={["Yes", "No"]} {...register("hasBed")} />
        <SelectField label="Curtains" options={["Yes", "No"]} {...register("hasCurtains")} />
        <SelectField label="Electric Chimney" options={["Yes", "No"]} {...register("hasChimney")} />
        <SelectField label="Wardrobe" options={["Yes", "No"]} {...register("hasWardrobe")} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextField label="Other details" placeholder="please specify the special inventories" {...register("otherInventories")} />
        <TextField label="Amenities in the Society" placeholder="e.g. Gym, Pool, Club House" {...register("societyAmenities")} />
      </div>
    </div>
  );
}

function ResidentialLeaseFields({ register, errors, watch, setValue }: FormProps) {
  const hasCar = watch("hasCar") || "";
  const hasPet = watch("hasPet") || "";
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextField label="Full Name" required error={errors.name?.message} {...register("name", { required: "Name is required", minLength: { value: 2, message: "Min 2 characters" } })} />
        <TextField label="Mobile Number" required type="tel" error={errors.phone?.message} {...register("phone", { required: "Phone is required", pattern: { value: /^[6-9]\d{9}$/, message: "Enter valid 10 digit number" } })} />
      </div>
      <TextField label="Work Profile" placeholder="e.g. IT Professional, Business Owner" {...register("workProfile")} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SelectField label="Family Size" options={FAMILY_SIZE_OPTIONS} {...register("familySize")} />
        <SelectField label="BHK Required" required options={BHK_OPTIONS} error={errors.bhk?.message} {...register("bhk", { required: "This field is required" })} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SelectField label="Budget (per month)" required options={BUDGET_LEASE_OPTIONS} error={errors.budget?.message} {...register("budget", { required: "This field is required" })} />
        <SelectField label="Possession From" required options={POSSESSION_LEASE_OPTIONS} error={errors.possession?.message} {...register("possession", { required: "This field is required" })} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <RadioGroup label="Own Car?" options={["No", "1", "2", "3+"]} watchValue={hasCar} {...register("hasCar")} />
        <RadioGroup label="Pet Parent?" options={["Yes", "No"]} watchValue={hasPet} {...register("hasPet")} />
      </div>
    </div>
  );
}

function CommercialLeaseFields({ register, errors }: FormProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextField label="Full Name" required error={errors.name?.message} {...register("name", { required: "Name is required", minLength: { value: 2, message: "Min 2 characters" } })} />
        <TextField label="Mobile Number" required type="tel" error={errors.phone?.message} {...register("phone", { required: "Phone is required", pattern: { value: /^[6-9]\d{9}$/, message: "Enter valid 10 digit number" } })} />
      </div>
      <TextField label="Company Name" required error={errors.companyName?.message} {...register("companyName", { required: "This field is required" })} />
      <TextField label="Business Profile" placeholder="Type of business" {...register("businessProfile")} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SelectField label="Office Size Required" options={OFFICE_SIZE_OPTIONS} {...register("officeSize")} />
        <SelectField label="Budget (per month)" required options={BUDGET_LEASE_OPTIONS} error={errors.budget?.message} {...register("budget", { required: "This field is required" })} />
      </div>
      <SelectField label="Possession From" required options={POSSESSION_LEASE_OPTIONS} error={errors.possession?.message} {...register("possession", { required: "This field is required" })} />
    </div>
  );
}

// ─── Main Popup Component ─────────────────────────────────────────────────────

export default function LeadCapturePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showFloatingBtn, setShowFloatingBtn] = useState(false);
  const [mainTab, setMainTab] = useState<"buy" | "sell" | "lease" | "lease_out">("buy");
  const [buySubTab, setBuySubTab] = useState<"residential" | "commercial">("residential");
  const [leaseSubTab, setLeaseSubTab] = useState<"residential" | "commercial">("residential");
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  // Bug 1 fix: simple per-page-load state, no sessionStorage
  const [hasShown, setHasShown] = useState(false);

  // Single top-level useForm instance — never remounts
  const { register, handleSubmit, formState: { errors }, watch, setValue, reset } = useForm<any>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  // ── Responsive check ──
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ── Open / Close helpers ──
  const openPopup = useCallback(() => {
    setIsOpen(true);
    setSubmitted(false);
    setTimeout(() => setVisible(true), 10);
  }, []);

  const closePopup = useCallback(() => {
    setVisible(false);
    setTimeout(() => {
      setIsOpen(false);
      setShowFloatingBtn(true);
    }, 400);
  }, []);

  // ── Tab change handlers (reset form on switch) ──
  const handleMainTabChange = (tab: "buy" | "sell" | "lease" | "lease_out") => {
    setMainTab(tab);
    reset();
  };

  const handleBuySubTabChange = (sub: "residential" | "commercial") => {
    setBuySubTab(sub);
    reset();
  };

  const handleLeaseSubTabChange = (sub: "residential" | "commercial") => {
    setLeaseSubTab(sub);
    reset();
  };

  // ── Determine active form source ──
  const getSource = () => {
    if (mainTab === "buy") return buySubTab === "residential" ? "popup_residential_buy" : "popup_commercial_buy";
    if (mainTab === "sell") return "popup_sell";
    if (mainTab === "lease_out") return "popup_lease_out";
    return leaseSubTab === "residential" ? "popup_residential_lease" : "popup_commercial_lease";
  };

  // ── Form submission ──
  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const { name, phone, email, ...rest } = data;
      await submitLead({ name, phone, email, source: getSource(), formData: rest });
      setSubmittedName(name);
      setSubmitted(true);
      reset();
      setTimeout(() => closePopup(), 3000);
    } catch (e: any) {
      toast.error(e.message || "Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Bug 1 fix: scroll trigger uses hasShown state, NO sessionStorage
  useEffect(() => {
    const handleScroll = () => {
      if (hasShown) return;
      const scrollPercent = window.scrollY / document.documentElement.scrollHeight;
      if (scrollPercent >= 0.12) {
        setHasShown(true);
        setIsOpen(true);
        setTimeout(() => setVisible(true), 10);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasShown]);

  // ── ESC key ──
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) closePopup();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, closePopup]);

  // ── Lock body scroll when popup open ──
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // ── Tab styles ──
  const tabStyle = (active: boolean) => ({
    color: NAVY,
    fontWeight: active ? "700" : "500",
    borderBottom: active ? `2px solid ${GOLD}` : "2px solid transparent",
    paddingBottom: "8px",
    transition: "all 150ms",
    background: "none",
    cursor: "pointer",
    fontSize: "0.875rem",
  } as React.CSSProperties);

  const subTabStyle = (active: boolean) => ({
    padding: "6px 18px",
    borderRadius: "50px",
    fontSize: "0.78rem",
    fontWeight: active ? "600" : "400",
    backgroundColor: active ? NAVY : "transparent",
    color: active ? "#fff" : NAVY,
    border: `1px solid ${active ? NAVY : "#C3CFE7"}`,
    cursor: "pointer",
    transition: "all 150ms",
  } as React.CSSProperties);

  const formProps = { register, errors, watch, setValue };

  return (
    <>
      {/* ── Floating "Quick Enquiry" button ── */}
      <div
        style={{
          position: "fixed",
          left: showFloatingBtn ? "0" : "-100px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 999,
          transition: "left 300ms ease-in-out 200ms",
        }}
      >
        <button
          onClick={openPopup}
          className="text-white text-xs font-bold tracking-widest uppercase px-2.5 py-6 shadow-lg flex items-center justify-center"
          style={{
            backgroundColor: GOLD,
            borderRadius: "8px 0 0 8px",
            whiteSpace: "nowrap",
            letterSpacing: "0.12em",
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
          }}
        >
          Quick Enquiry
        </button>
      </div>

      {/* ── Popup ── */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={closePopup}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.6)",
              zIndex: 1000,
              opacity: visible ? 1 : 0,
              transition: "opacity 400ms ease-out",
            }}
          />

          {/* Card */}
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1001,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                background: "#fff",
                borderRadius: isMobile ? "0" : "16px",
                width: "100%",
                maxWidth: "580px",
                maxHeight: isMobile ? "100dvh" : "85vh",
                overflowY: "auto",
                padding: isMobile ? "24px 20px" : "32px",
                boxShadow: "0 25px 80px rgba(0,0,0,0.25)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(40px)",
                transition: "opacity 400ms ease-out, transform 400ms ease-out",
                pointerEvents: "all",
                position: "relative",
              }}
            >
              {/* Close Button */}
              <button
                onClick={closePopup}
                aria-label="Close popup"
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  border: "none",
                  backgroundColor: "#F1F5F9",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                  color: "#64748B",
                  transition: "background-color 150ms",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#E2E8F0")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#F1F5F9")}
              >
                ✕
              </button>

              {/* Header */}
              <div className="mb-6 pr-8">
                <p className="text-[0.65rem] font-bold tracking-[0.22em] uppercase mb-1.5" style={{ color: GOLD }}>
                  chemburproperties.com
                </p>
                <h2 className="font-display text-2xl mb-1" style={{ color: NAVY }}>
                  How Can We Help You?
                </h2>
                <p className="text-sm" style={{ color: "#64748B" }}>
                  Fill in your details and Jeetu Chhaabria will contact you.
                </p>
              </div>

              {/* Success State */}
              {submitted ? (
                <div
                  className="flex flex-col items-center justify-center py-12 text-center"
                  style={{ minHeight: "200px" }}
                >
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="font-display text-xl mb-2" style={{ color: NAVY }}>
                    Thank you, {submittedName}!
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#64748B" }}>
                    Jeetu Chhaabria will contact you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  {/* Main Tabs */}
                  <div className="flex gap-4 sm:gap-6 border-b mb-5 overflow-x-auto whitespace-nowrap" style={{ borderColor: "#E1E7F3", paddingBottom: "2px" }}>
                    <button type="button" style={tabStyle(mainTab === "buy")} onClick={() => handleMainTabChange("buy")}>
                      🏠 Buy
                    </button>
                    <button type="button" style={tabStyle(mainTab === "sell")} onClick={() => handleMainTabChange("sell")}>
                      🏷️ Sell
                    </button>
                    <button type="button" style={tabStyle(mainTab === "lease")} onClick={() => handleMainTabChange("lease")}>
                      🔑 Lease
                    </button>
                    <button type="button" style={tabStyle(mainTab === "lease_out")} onClick={() => handleMainTabChange("lease_out")}>
                      🏢 Lessor
                    </button>
                  </div>

                  {/* Sub Tabs for Buy */}
                  {mainTab === "buy" && (
                    <div className="flex gap-2 mb-5">
                      <button type="button" style={subTabStyle(buySubTab === "residential")} onClick={() => handleBuySubTabChange("residential")}>
                        Residential
                      </button>
                      <button type="button" style={subTabStyle(buySubTab === "commercial")} onClick={() => handleBuySubTabChange("commercial")}>
                        Commercial
                      </button>
                    </div>
                  )}

                  {/* Sub Tabs for Lease */}
                  {mainTab === "lease" && (
                    <div className="flex gap-2 mb-5">
                      <button type="button" style={subTabStyle(leaseSubTab === "residential")} onClick={() => handleLeaseSubTabChange("residential")}>
                        Residential
                      </button>
                      <button type="button" style={subTabStyle(leaseSubTab === "commercial")} onClick={() => handleLeaseSubTabChange("commercial")}>
                        Commercial
                      </button>
                    </div>
                  )}

                  {/* Active Form Fields — conditionally rendered, but form itself never unmounts */}
                  {mainTab === "buy" && buySubTab === "residential" && <ResidentialBuyFields {...formProps} />}
                  {mainTab === "buy" && buySubTab === "commercial" && <CommercialBuyFields {...formProps} />}
                  {mainTab === "sell" && <SellFields {...formProps} />}
                  {mainTab === "lease_out" && <LeaseOutFields {...formProps} />}
                  {mainTab === "lease" && leaseSubTab === "residential" && <ResidentialLeaseFields {...formProps} />}
                  {mainTab === "lease" && leaseSubTab === "commercial" && <CommercialLeaseFields {...formProps} />}

                  <SubmitButton loading={loading} />
                </form>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
