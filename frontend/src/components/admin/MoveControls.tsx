interface MoveControlsProps {
  onMoveUp: () => void
  onMoveDown: () => void
  isFirst: boolean
  isLast: boolean
  label: string
}

/** Clear Move Up / Move Down ordering controls (no raw display_order numbers). */
export function MoveControls({ onMoveUp, onMoveDown, isFirst, isLast, label }: MoveControlsProps) {
  return (
    <div className="admin-move-controls" role="group" aria-label={`Reorder ${label}`}>
      <button
        type="button"
        className="admin-move-button"
        onClick={onMoveUp}
        disabled={isFirst}
        aria-label={`Move ${label} up`}
      >
        ↑
      </button>
      <button
        type="button"
        className="admin-move-button"
        onClick={onMoveDown}
        disabled={isLast}
        aria-label={`Move ${label} down`}
      >
        ↓
      </button>
    </div>
  )
}
