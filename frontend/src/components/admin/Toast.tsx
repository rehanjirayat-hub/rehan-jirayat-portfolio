import { useCallback, useState } from 'react'

export type ToastKind = 'success' | 'error'

export interface Toast {
  id: number
  kind: ToastKind
  message: string
}

/** Lightweight toast feedback for save/delete/visibility/ordering/upload actions. */
export function useToasts() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const push = useCallback((kind: ToastKind, message: string) => {
    const id = Date.now() + Math.random()
    setToasts((current) => [...current, { id, kind, message }])
    setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id))
    }, 4000)
  }, [])

  const success = useCallback((message: string) => push('success', message), [push])
  const error = useCallback((message: string) => push('error', message), [push])

  return { toasts, success, error }
}

export function ToastStack({ toasts }: { toasts: Toast[] }) {
  return (
    <div className="admin-toast-stack" aria-live="polite" aria-atomic="false">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`admin-toast ${toast.kind === 'error' ? 'admin-toast-error' : 'admin-toast-success'}`}
          role="status"
        >
          {toast.message}
        </div>
      ))}
    </div>
  )
}
