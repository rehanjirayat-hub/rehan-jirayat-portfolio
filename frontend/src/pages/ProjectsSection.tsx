'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Container } from '../components/common/Container'
import { SectionHeading } from '../components/common/SectionHeading'
import { ProjectCard } from '../components/common/ProjectCard'
import { ProjectDetailsModal } from '../components/common/ProjectDetailsModal'
import { projects } from '../data/projects'
import type { Project } from '../types/projects'

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const shouldReduceMotion = useReducedMotion()

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
          />
        </motion.div>

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
      </Container>

      <ProjectDetailsModal
        project={selectedProject}
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  )
}
