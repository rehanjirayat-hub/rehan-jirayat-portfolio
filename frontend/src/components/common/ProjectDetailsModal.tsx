'use client'

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'
import type { Project } from '../../types/projects'
import { Button } from '../ui/Button'
import { TechnologyBadge } from '../ui/TechnologyBadge'

interface ProjectDetailsModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectDetailsModal({ project, isOpen, onClose }: ProjectDetailsModalProps) {
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    const originalOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.documentElement.style.overflow = originalOverflow
    }
  }, [isOpen, onClose])

  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="project-modal-overlay"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1 }}
            exit={shouldReduceMotion ? false : { opacity: 0 }}
            onClick={onClose}
            role="presentation"
          />

          <motion.div
            className="project-modal-container"
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95, y: 20 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? false : { opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="project-modal">
              <div className="project-modal-header">
                <h2 className="project-modal-title">{project.name}</h2>
                <button
                  className="project-modal-close"
                  onClick={onClose}
                  aria-label="Close project details"
                  type="button"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>

              <div className="project-modal-content">
                <section className="project-detail-section">
                  <h3>Overview</h3>
                  <p>{project.overview}</p>
                </section>

                <section className="project-detail-section">
                  <h3>Technologies</h3>
                  <div className="project-detail-technologies">
                    {project.technologies.map((tech) => (
                      <TechnologyBadge key={tech.name} name={tech.name} category={tech.category} />
                    ))}
                  </div>
                </section>

                <section className="project-detail-section">
                  <h3>Architecture</h3>
                  <p>{project.architecture}</p>
                </section>

                <section className="project-detail-section">
                  <h3>Main Capabilities</h3>
                  <ul className="project-detail-list">
                    {project.capabilities.map((capability) => (
                      <li key={capability}>{capability}</li>
                    ))}
                  </ul>
                </section>

                <section className="project-detail-section">
                  <h3>Testing</h3>
                  <p>{project.testing}</p>
                </section>

                <section className="project-detail-section project-detail-section-last">
                  <h3>Repository</h3>
                  <Button
                    variant="primary"
                    onClick={() => window.open(project.githubUrl, '_blank', 'noopener,noreferrer')}
                    aria-label={`Open ${project.name} repository on GitHub`}
                  >
                    View on GitHub
                  </Button>
                </section>
              </div>

              <div className="project-modal-footer">
                <Button variant="secondary" onClick={onClose}>
                  Close
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
