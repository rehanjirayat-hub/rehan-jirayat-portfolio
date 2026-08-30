'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import type { Project } from '../../types/projects'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { TechnologyBadge } from '../ui/TechnologyBadge'

interface ProjectCardProps {
  project: Project
  onViewDetails: (project: Project) => void
  index: number
}

export function ProjectCard({ project, onViewDetails, index }: ProjectCardProps) {
  const shouldReduceMotion = useReducedMotion()
  const [isHovering, setIsHovering] = useState(false)

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <Card
        className="project-card"
        onMouseEnter={() => !shouldReduceMotion && setIsHovering(true)}
        onMouseLeave={() => !shouldReduceMotion && setIsHovering(false)}
      >
        <div className="project-card-header">
          <div className="project-visual">
            <div className="project-visual-inner">
              <span className="project-icon">{'</>'}</span>
            </div>
          </div>
          <div className="project-meta">
            <span className="project-status">{project.status}</span>
          </div>
        </div>

        <div className="project-content">
          <h3 className="project-name">{project.name}</h3>
          <p className="project-description">{project.description}</p>

          <div className="project-technologies">
            {project.technologies.map((tech) => (
              <TechnologyBadge key={tech.name} name={tech.name} category={tech.category} />
            ))}
          </div>

          <div className="project-actions">
            <motion.div
              whileHover={shouldReduceMotion ? undefined : { y: -2 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            >
              <Button
                variant="primary"
                onClick={() => onViewDetails(project)}
                className="project-details-btn"
              >
                View Details
              </Button>
            </motion.div>
            <motion.div
              whileHover={shouldReduceMotion ? undefined : { y: -2 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            >
              <Button
                variant="secondary"
                onClick={() => window.open(project.githubUrl, '_blank', 'noopener,noreferrer')}
                className="project-github-btn"
                aria-label={`Open ${project.name} repository on GitHub`}
              >
                GitHub
              </Button>
            </motion.div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
