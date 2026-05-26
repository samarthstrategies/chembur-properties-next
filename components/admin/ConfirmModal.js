'use client';

/**
 * ConfirmModal — generic confirm/delete dialog.
 * Props:
 *   isOpen    — boolean
 *   title     — dialog heading
 *   message   — dialog body text
 *   onConfirm — called when user clicks the confirm button
 *   onCancel  — called when user clicks cancel or backdrop
 *   confirmLabel — text for confirm button (default "Delete")
 *   loading   — boolean, disables buttons while action is in progress
 *   danger    — boolean (default true), makes confirm button red
 */
export default function ConfirmModal({
  isOpen,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  onConfirm,
  onCancel,
  confirmLabel = 'Delete',
  loading = false,
  danger = true,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-lg p-6 w-full max-w-sm shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-semibold text-base mb-2" style={{ color: '#0F172A' }}>
          {title}
        </h3>
        <p className="text-sm mb-6" style={{ color: '#64748B' }}>
          {message}
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium rounded-md border transition-colors"
            style={{ borderColor: '#E2E8F0', color: '#64748B' }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 text-sm font-semibold rounded-md transition-colors disabled:opacity-60"
            style={{
              backgroundColor: danger ? '#EF4444' : '#0F172A',
              color: '#fff',
            }}
          >
            {loading ? 'Please wait…' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
