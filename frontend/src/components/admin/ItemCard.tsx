import type { ReactNode } from 'react'
import { StatusBadge } from './StatusBadge'
import { MoveControls } from './MoveControls'
import { VisibilityToggle } from './VisibilityToggle'

interface ItemCardProps {
  title: string
  subtitle?: string
  visible: boolean
  isFirst: boolean
  isLast: boolean
  expanded: boolean
  onToggleVisibility: () => void
  onToggleExpanded: () => void
  onMoveUp: () => void
  onMoveDown: () => void
  onDelete: () => void
  children?: ReactNode
}

/**
 * Natural-language content card for repeatable CMS items:
 * human summary row + expandable edit body. No database IDs exposed.
 */
export function ItemCard({
  title,
  subtitle,
  visible,
  isFirst,
  isLast,
  expanded,
  onToggleVisibility,
  onToggleExpanded,
  onMoveUp,
  onMoveDown,
  onDelete,
  children,
}: ItemCardProps) {
  return (
    <article className="admin-card">
      <div className="admin-card-summary">
        <div className="admin-card-summary-info">
          <h3 className="admin-card-title">{title}</h3>
          {subtitle ? <p className="admin-card-subtitle">{subtitle}</p> : null}
        </div>
        <StatusBadge visible={visible} />
        <div className="admin-card-summary-actions">
          <VisibilityToggle
            visible={visible}
            onToggle={onToggleVisibility}
            label={expanded ? `Show or hide ${title}` : `Show or hide ${title}`}
          />
          <MoveControls onMoveUp={onMoveUp} onMoveDown={onMoveDown} isFirst={isFirst} isLast={isLast} label={title} />
          <button
            type="button"
            className="admin-button admin-secondary-button"
            aria-expanded={expanded}
            onClick={onToggleExpanded}
          >
            {expanded ? 'Close' : 'Edit'}
          </button>
          <button type="button" className="admin-button admin-danger-button" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
      {expanded && children ? <div className="admin-card-body">{children}</div> : null}
    </article>
  )
}
