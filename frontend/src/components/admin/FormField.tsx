import type { ReactNode } from 'react'

interface FormFieldProps {
  label: string
  required?: boolean
  hint?: string
  error?: string
  wide?: boolean
  children: ReactNode
}

/** Labeled form field with required marker, optional hint, and inline error. */
export function FormField({ label, required, hint, error, wide, children }: FormFieldProps) {
  return (
    <label className={`admin-field ${wide ? 'admin-field-wide' : ''}`}>
      <span className="admin-field-label">
        {label}
        {required ? (
          <span className="admin-required" aria-hidden="true">
            {' '}
            *
          </span>
        ) : (
          <span className="admin-field-hint"> (optional)</span>
        )}
      </span>
      {children}
      {hint ? <span className="admin-field-hint">{hint}</span> : null}
      {error ? (
        <span className="admin-field-error" role="alert">
          {error}
        </span>
      ) : null}
    </label>
  )
}
