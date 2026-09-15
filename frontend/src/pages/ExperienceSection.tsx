import { Container } from '../components/common/Container'
import { SectionHeading } from '../components/common/SectionHeading'
import { useExperience } from '../hooks/useExperience'

export function ExperienceSection() {
  const experience = useExperience()
  if (experience.length === 0) return null

  return (
    <section id="experience" className="education-section" aria-labelledby="experience-heading">
      <Container>
        <SectionHeading eyebrow="CAREER" title="Experience" description="Professional experience and backend engineering work." titleId="experience-heading" />
        <div className="education-grid">
          {experience.map((item) => (
            <article className="education-card" key={item.id}>
              <h3 className="education-degree">{item.jobTitle}</h3>
              <p className="education-institution">{item.company}</p>
              <p className="education-location">{item.location}</p>
              <p className="education-meta-value">{item.startDate} - {item.current ? 'Present' : item.endDate}</p>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
