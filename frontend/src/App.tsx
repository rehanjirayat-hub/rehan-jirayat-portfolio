import { PublicLayout } from './layouts/PublicLayout'
import { AboutSection } from './pages/AboutSection'
import { HomePage } from './pages/HomePage'
import { ProjectsSection } from './pages/ProjectsSection'
import { SkillsSection } from './pages/SkillsSection'

export function App() {
  return (
    <PublicLayout>
      <HomePage />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
    </PublicLayout>
  )
}
