interface TechnologyBadgeProps {
  name: string
  category?: 'language' | 'framework' | 'database' | 'testing' | 'tool' | 'architecture'
}

export function TechnologyBadge({ name, category }: TechnologyBadgeProps) {
  return (
    <span className="badge" title={category ? `Category: ${category}` : undefined}>
      {name}
    </span>
  )
}
