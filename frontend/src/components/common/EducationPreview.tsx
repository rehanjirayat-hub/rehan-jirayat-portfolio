import { GraduationCap } from 'lucide-react'
import { educationHighlights } from '../../data/about'

export function EducationPreview() {
  return (
    <section className="education-preview" aria-labelledby="education-preview-title">
      <div className="education-preview-heading">
        <GraduationCap aria-hidden="true" size={18} />
        <h3 id="education-preview-title">Education</h3>
      </div>
      <div className="education-grid">
        {educationHighlights.map((education) => (
          <article className="education-item" key={education.degree}>
            <div>
              <p className="education-degree">{education.degree}</p>
              <p className="education-institution">{education.institution}</p>
            </div>
            <dl className="education-meta">
              <div>
                <dt>Period</dt>
                <dd>{education.period}</dd>
              </div>
              <div>
                <dt>CGPA</dt>
                <dd>{education.cgpa}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}
