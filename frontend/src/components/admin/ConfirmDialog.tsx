import { useEffect, useRef } from 'react'

interface ConfirmDialogProps {
  isOpen: boolean
  title: string
  message: string
  confirmLabel?: string
  onConfirm: () => void
  onCancel: () => void
}

const FOCUSABLE =
  'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'

/** Accessible confirmation dialog used for destructive actions. */
export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = 'Delete',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const confirmButtonRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const timer = setTimeout(() => confirmButtonRef.current?.focus(), 50)
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onCancel()
        return
      }
      if (event.key === 'Tab' && dialogRef.current) {
        const elements = dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
        if (elements.length === 0) return
        const first = elements[0]
        const last = elements[elements.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      clearTimeout(timer)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onCancel])

  if (!isOpen) return null

  return (
    <div className="admin-dialog-overlay" onClick={onCancel} role="presentation">
      <div
        ref={dialogRef}
        className="admin-dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="admin-dialog-title"
        aria-describedby="admin-dialog-message"
        onClick={(event) => event.stopPropagation()}
      >
        <h3 id="admin-dialog-title">{title}</h3>
        <p id="admin-dialog-message">{message}</p>
        <div className="admin-dialog-actions">
          <button type="button" className="admin-secondary-button" onClick={onCancel}>
            Cancel
          </button>
          <button
            ref={confirmButtonRef}
            type="button"
            className="admin-danger-button admin-dialog-confirm"
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
