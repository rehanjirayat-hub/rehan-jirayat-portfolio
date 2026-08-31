interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  titleId?: string
}

export function SectionHeading({ eyebrow, title, description, titleId }: SectionHeadingProps) {
  return (
    <header className="section-heading">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 id={titleId}>{title}</h2>
      {description ? <p className="section-description">{description}</p> : null}
    </header>
  )
}
