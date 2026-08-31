'use client'

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import type { Project } from '../../types/projects'
import { Button, ButtonLink } from '../ui/Button'
import { TechnologyBadge } from '../ui/TechnologyBadge'

interface ProjectDetailsModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectDetailsModal({ project, isOpen, onClose }: ProjectDetailsModalProps) {
  const shouldReduceMotion = useReducedMotion()
  const closeButtonRef = useRef<HTMLButtonElement>(null)

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
    closeButtonRef.current?.focus()

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
            initial={shouldReduceMotion ? undefined : { opacity: 0 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0 }}
            onClick={onClose}
            role="presentation"
          />

          <motion.div
            className="project-modal-container"
            initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.95, y: 20 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
              <div className="project-modal-header">
                <h2 id="project-modal-title" className="project-modal-title">{project.name}</h2>
                <button
                  ref={closeButtonRef}
                  className="project-modal-close"
                  onClick={onClose}
                  aria-label="Close project details"
                  type="button"
                >
                  <X aria-hidden="true" size={20} />
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
                  <h3>Testing</h3>
                  <p>{project.testing}</p>
                </section>

                <section className="project-detail-section project-detail-section-last">
                  <h3>Repository</h3>
                  <ButtonLink
                    variant="primary"
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.name} repository on GitHub`}
                  >
                    View on GitHub
                  </ButtonLink>
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
