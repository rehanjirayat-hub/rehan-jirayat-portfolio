'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ExternalLink, MapPin } from 'lucide-react'
import type { Education } from '../../types/education'
import { Card } from '../ui/Card'

interface EducationCardProps {
  education: Education
  index: number
  isLatest?: boolean
}

export function EducationCard({
  education,
  index,
  isLatest = false,
}: EducationCardProps) {
  const shouldReduceMotion = useReducedMotion()
  const isCurrently = education.status === 'currently-pursuing'
  const endYear = education.expectedEndYear || education.endYear

  return (
    <motion.div
      className="education-card-wrapper"
      initial={
        shouldReduceMotion
          ? false
          : { opacity: 0, x: index % 2 === 0 ? -20 : 20 }
      }
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <Card className={`education-card ${isLatest ? 'education-card-featured' : ''}`}>
        <div className="education-card-header">
          <div className="education-timeline-indicator">
            <span
              className={`education-milestone ${
                isCurrently
                  ? 'education-milestone-active'
                  : 'education-milestone-completed'
              }`}
            />
          </div>

          <div className="education-header-content">
            <h3 className="education-degree">{education.degree}</h3>

            <p className="education-institution">
              {education.institution}
            </p>

            {education.university && (
              <p className="education-university">
                {education.university}
              </p>
            )}
          </div>

          <span
            className={`education-status ${
              isCurrently
                ? 'education-status-pursuing'
                : 'education-status-completed'
            }`}
          >
            {isCurrently ? 'Currently Pursuing' : 'Completed'}
          </span>
        </div>

        <div className="education-card-body">
          <p className="education-location">
            <MapPin size={15} aria-hidden="true" />
            {education.location}
          </p>

          <dl className="education-meta">
            <div className="education-meta-item">
              <dt className="education-meta-label">Duration</dt>
              <dd className="education-meta-value">
                {education.startYear} {'\u2013'} {endYear}
              </dd>
            </div>

            <div className="education-meta-item">
              <dt className="education-meta-label">CGPA</dt>
              <dd className="education-meta-value">
                {education.cgpa} CGPA
              </dd>
            </div>
          </dl>

          {education.website && (
            <a
              className="education-website"
              href={education.website}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit official website of ${education.institution}`}
            >
              Official Website
              <ExternalLink size={15} aria-hidden="true" />
            </a>
          )}
        </div>
      </Card>
    </motion.div>
  )
}