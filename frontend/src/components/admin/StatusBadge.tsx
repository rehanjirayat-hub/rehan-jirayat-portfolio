interface StatusBadgeProps {
  visible: boolean
}

/** Visible/Hidden pill used on content cards. */
export function StatusBadge({ visible }: StatusBadgeProps) {
  return (
    <span className={`admin-status-badge ${visible ? 'admin-status-visible' : 'admin-status-hidden'}`}>
      {visible ? 'Visible' : 'Hidden'}
    </span>
  )
}
