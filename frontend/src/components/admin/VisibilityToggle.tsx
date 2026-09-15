interface VisibilityToggleProps {
  visible: boolean
  onToggle: () => void
  label?: string
}

/** Simple visible/hidden switch - no edit form needed to show or hide an item. */
export function VisibilityToggle({ visible, onToggle, label }: VisibilityToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={visible}
      aria-label={label ?? (visible ? 'Hide item' : 'Show item')}
      className={`admin-visibility-toggle ${visible ? 'is-visible' : 'is-hidden'}`}
      onClick={onToggle}
    >
      <span className="admin-visibility-track" aria-hidden="true">
        <span className="admin-visibility-thumb" />
      </span>
      <span className="admin-visibility-text">{visible ? 'Visible' : 'Hidden'}</span>
    </button>
  )
}
