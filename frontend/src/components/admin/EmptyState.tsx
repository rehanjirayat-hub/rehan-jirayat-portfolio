interface EmptyStateProps {
  title: string
  description: string
  actionLabel: string
  onAction: () => void
}

/** Friendly message shown when a collection has no items yet. */
export function EmptyState({ title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="admin-empty-state">
      <p className="admin-empty-title">{title}</p>
      <p className="admin-empty-description">{description}</p>
      <button type="button" className="admin-primary-button" onClick={onAction}>
        {actionLabel}
      </button>
    </div>
  )
}
