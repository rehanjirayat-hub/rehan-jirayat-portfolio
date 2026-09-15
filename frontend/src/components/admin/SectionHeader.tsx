import type { ReactNode } from 'react'

interface SectionHeaderProps {
  eyebrow: string
  title: string
  description?: string
  actions?: ReactNode
}

/** Consistent admin section header with optional actions. */
export function SectionHeader({ eyebrow, title, description, actions }: SectionHeaderProps) {
  return (
    <div className="admin-panel-heading">
      <div>
        <p className="admin-eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {description ? <p className="admin-muted admin-section-description">{description}</p> : null}
      </div>
      {actions ? <div className="admin-panel-actions">{actions}</div> : null}
    </div>
  )
}
