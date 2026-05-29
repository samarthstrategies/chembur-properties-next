'use client';
import { X, Phone, Mail, Building2, Mic2, CreditCard, Calendar, Tag } from 'lucide-react';
import { useState } from 'react';
import { formatDate, formatPrice, getLeadStatusColor, apiFetch } from '@/lib/admin-utils';
import toast from 'react-hot-toast';

const STATUS_OPTIONS = ['New', 'Contacted', 'Converted', 'Not Interested'];

/**
 * LeadDrawer — slide-in drawer showing full lead details.
 * Props:
 *   lead    — lead object
 *   isOpen  — boolean
 *   onClose — () => void
 *   onStatusChange — (id, newStatus) => void
 */
export default function LeadDrawer({ lead, isOpen, onClose, onStatusChange }) {
  const [status, setStatus] = useState(lead?.status || 'New');
  const [updating, setUpdating] = useState(false);

  // Sync status when lead changes
  if (lead && lead.status !== status && !updating) {
    setStatus(lead.status);
  }

  const handleStatusChange = async (newStatus) => {
    setUpdating(true);
    try {
      await apiFetch(`/api/admin/leads/${lead._id}`, {
        method: 'PUT',
        body: JSON.stringify({ status: newStatus }),
      });
      setStatus(newStatus);
      onStatusChange?.(lead._id, newStatus);
      toast.success('Status updated');
    } catch {
      toast.error('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const colors = getLeadStatusColor(status);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 h-screen z-50 flex flex-col bg-white transition-transform duration-300"
        style={{
          width: '420px',
          boxShadow: '-4px 0 24px rgba(0,0,0,0.1)',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 flex-shrink-0"
          style={{ borderBottom: '1px solid #E2E8F0' }}
        >
          <h3 className="font-semibold text-base" style={{ color: '#0F172A' }}>
            Lead Details
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" style={{ color: '#64748B' }} />
          </button>
        </div>

        {/* Body */}
        {lead && (
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {/* Name & Status */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="font-bold text-lg" style={{ color: '#0F172A' }}>
                  {lead.name}
                </h4>
                <p className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>
                  {formatDate(lead.createdAt)}
                </p>
              </div>
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full border"
                style={{
                  backgroundColor: colors.bg,
                  color: colors.text,
                  borderColor: colors.border,
                }}
              >
                {status}
              </span>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <InfoRow icon={Phone} label="Phone" value={lead.phone} />
              <InfoRow icon={Mail} label="Email" value={lead.email} />
            </div>

            <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '16px' }} />

            {/* Property / Podcast */}
            {lead.propertyId && (
              <InfoRow icon={Building2} label="Property" value={lead.propertyId?.title || lead.propertyId} />
            )}
            {lead.podcastId && (
              <InfoRow icon={Mic2} label="Podcast" value={lead.podcastId?.title || lead.podcastId} />
            )}

            {/* Payment Info */}
            {lead.unlockType && (
              <InfoRow
                icon={Tag}
                label="Unlock Type"
                value={lead.unlockType === 'lead_unlock' ? 'Lead Unlock (Free)' : 'Paid'}
              />
            )}
            {lead.amountPaid > 0 && (
              <InfoRow icon={CreditCard} label="Amount Paid" value={formatPrice(lead.amountPaid)} />
            )}
            {lead.razorpayOrderId && (
              <InfoRow icon={CreditCard} label="Razorpay Order" value={lead.razorpayOrderId} mono />
            )}
            {lead.source && (
              <InfoRow icon={Calendar} label="Source" value={lead.source.replace(/_/g, ' ')} />
            )}

            <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '16px' }} />

            {/* Form Details */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: '#64748B' }}>
                Form Details
              </p>
              {lead.formData && Object.keys(lead.formData).length > 0 ? (
                <div className="rounded-lg overflow-hidden border" style={{ borderColor: '#E2E8F0' }}>
                  {Object.entries(lead.formData).map(([key, value], idx) => (
                    <div
                      key={key}
                      className="flex items-start gap-3 px-3 py-2.5"
                      style={{
                        backgroundColor: idx % 2 === 0 ? '#F8FAFC' : '#FFFFFF',
                        borderBottom: idx < Object.keys(lead.formData).length - 1 ? '1px solid #F1F5F9' : 'none',
                      }}
                    >
                      <span
                        className="text-xs font-medium min-w-[120px] flex-shrink-0 capitalize"
                        style={{ color: '#64748B' }}
                      >
                        {String(key).replace(/_/g, ' ')}
                      </span>
                      <span
                        className="text-xs break-words"
                        style={{ color: '#0F172A' }}
                      >
                        {Array.isArray(value) ? value.join(', ') : String(value || '—')}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs italic" style={{ color: '#94A3B8' }}>
                  No additional details provided
                </p>
              )}
            </div>

            <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '16px' }} />

            {/* Status Change */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#64748B' }}>
                Change Status
              </p>
              <div className="grid grid-cols-2 gap-2">
                {STATUS_OPTIONS.map((s) => {
                  const c = getLeadStatusColor(s);
                  return (
                    <button
                      key={s}
                      onClick={() => handleStatusChange(s)}
                      disabled={updating || s === status}
                      className="text-xs font-semibold py-2 px-3 rounded-md border transition-all disabled:opacity-60"
                      style={{
                        backgroundColor: s === status ? c.bg : '#fff',
                        color: c.text,
                        borderColor: s === status ? c.border : '#E2E8F0',
                      }}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function InfoRow({ icon: Icon, label, value, mono = false }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{ backgroundColor: '#F1F5F9' }}
      >
        <Icon className="w-3.5 h-3.5" style={{ color: '#64748B' }} />
      </div>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: '#94A3B8' }}>
          {label}
        </p>
        <p
          className="text-sm mt-0.5 break-all"
          style={{ color: '#0F172A', fontFamily: mono ? 'monospace' : undefined }}
        >
          {value}
        </p>
      </div>
    </div>
  );
}
