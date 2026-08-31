'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Loader2, AlertCircle } from 'lucide-react'
import { Container } from '../components/common/Container'
import { SectionHeading } from '../components/common/SectionHeading'
import { ProjectCard } from '../components/common/ProjectCard'
import { ProjectDetailsModal } from '../components/common/ProjectDetailsModal'
import { fetchProjects } from '../services/projects'
import type { Project } from '../types/projects'

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    fetchProjects()
      .then(setProjects)
      .catch(() => setError('Failed to load projects. Please try again later.'))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <section
      id="projects"
      className="projects-section"
      aria-labelledby="projects-heading"
    >
      <Container>
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <SectionHeading
            eyebrow="FEATURED WORK"
            title="Featured Projects"
            description="Practical Java development showcasing backend architecture, database integration, and maintainable code."
            titleId="projects-heading"
          />
        </motion.div>

        {isLoading && (
          <div className="projects-status" role="status">
            <Loader2 size={24} className="projects-spinner" aria-hidden="true" />
            <p>Loading projects...</p>
          </div>
        )}

        {error && (
          <div className="projects-status projects-error" role="alert">
            <AlertCircle size={24} aria-hidden="true" />
            <p>{error}</p>
          </div>
        )}

        {!isLoading && !error && (
          <div className="projects-grid">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                onViewDetails={setSelectedProject}
                index={index}
              />
            ))}
          </div>
        )}
      </Container>

      <ProjectDetailsModal
        project={selectedProject}
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  )
}
