import { GraduationCap } from 'lucide-react'
import { educationData } from '../../data/education'

export function EducationPreview() {
  return (
    <section className="education-preview" aria-labelledby="education-preview-title">
      <div className="education-preview-heading">
        <GraduationCap aria-hidden="true" size={18} />
        <h3 id="education-preview-title">Education</h3>
      </div>
      <div className="education-grid">
        {educationData.map((education) => (
          <article className="education-item" key={education.id}>
            <div>
              <p className="education-degree">{education.degree.includes('MCA') ? 'MCA' : 'BCA'}</p>
              <p className="education-institution">{education.institution}</p>
              <p className="education-preview-status">
                {education.status === 'currently-pursuing' ? 'Currently pursuing' : 'Completed'}
              </p>
            </div>
            <dl className="education-meta">
              <div>
                <dt>Period</dt>
                <dd>{education.startYear}-{education.endYear}</dd>
              </div>
              <div>
                <dt>CGPA</dt>
                <dd>{education.cgpa} CGPA</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}
