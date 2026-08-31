import { PublicLayout } from './layouts/PublicLayout'
import { AboutSection } from './pages/AboutSection'
import { HomePage } from './pages/HomePage'
import { ProjectsSection } from './pages/ProjectsSection'
import { SkillsSection } from './pages/SkillsSection'
import { EducationSection } from './pages/EducationSection'
import { ContactSection } from './pages/ContactPage'
import { NotFoundPage } from './pages/NotFoundPage'

/** Only the root path is a valid route for this single-page portfolio. */
function isValidRoute(pathname: string): boolean {
  return pathname === '/' || pathname === ''
}

export function App() {
  const content = isValidRoute(window.location.pathname) ? (
    <>
      <HomePage />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <EducationSection />
      <ContactSection />
    </>
  ) : (
    <NotFoundPage />
  )

  return <PublicLayout>{content}</PublicLayout>
}
