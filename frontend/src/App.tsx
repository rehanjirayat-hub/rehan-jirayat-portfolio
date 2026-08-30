import { PublicLayout } from './layouts/PublicLayout'
import { AboutSection } from './pages/AboutSection'
import { HomePage } from './pages/HomePage'
import { ProjectsSection } from './pages/ProjectsSection'
import { SkillsSection } from './pages/SkillsSection'
import { EducationSection } from './pages/EducationSection'
import { ContactSection } from './pages/ContactPage'

export function App() {
  return (
    <PublicLayout>
      <HomePage />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <EducationSection />
      <ContactSection />
    </PublicLayout>
  )
}
