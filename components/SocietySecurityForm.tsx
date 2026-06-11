'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';

const schema = z.object({
  societyName: z.string().min(1, "Society Name is required"),
  secretaryName: z.string().min(1, "Secretary Name is required"),
  contactNumber: z.string().regex(/^[0-9]{10}$/, "Please enter a valid 10-digit number"),
});

export default function SocietySecurityForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/security-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        setSubmittedData(data);
        setIsSuccess(true);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess && submittedData) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center shadow-2xl border border-slate-100 flex flex-col items-center justify-center min-h-[300px]">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <span className="text-3xl">✅</span>
        </div>
        <h3 className="text-navy font-bold text-xl mb-2">Thank you {submittedData.societyName}!</h3>
        <p className="text-slate-600 leading-relaxed max-w-sm mx-auto">
          Jeetu Chhaabria will contact <strong className="text-navy">{submittedData.secretaryName}</strong> within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-2xl border border-slate-100 w-full relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gold" />
      
      <div className="mb-6">
        <h3 className="text-navy font-bold text-2xl mb-1">Request a Free Callback</h3>
        <p className="text-slate-500 text-sm">We respond within 24 hours</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase">Society Name *</label>
          <input 
            type="text" 
            {...register("societyName")} 
            placeholder="e.g. Sai Krupa CHS" 
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent transition-all placeholder-slate-400 text-slate-800"
          />
          {errors.societyName && <p className="text-red-500 text-xs mt-1">{errors.societyName.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase">Secretary Name *</label>
          <input 
            type="text" 
            {...register("secretaryName")} 
            placeholder="Your full name" 
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent transition-all placeholder-slate-400 text-slate-800"
          />
          {errors.secretaryName && <p className="text-red-500 text-xs mt-1">{errors.secretaryName.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase">Contact Number *</label>
          <input 
            type="tel" 
            {...register("contactNumber")} 
            placeholder="WhatsApp preferred" 
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent transition-all placeholder-slate-400 text-slate-800"
          />
          {errors.contactNumber && <p className="text-red-500 text-xs mt-1">{errors.contactNumber.message}</p>}
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-[#D4A017] text-navy font-bold py-4 rounded-lg mt-2 hover:bg-[#c29113] transition-colors shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Request Security Quote"}
        </button>
      </form>
    </div>
  );
}
