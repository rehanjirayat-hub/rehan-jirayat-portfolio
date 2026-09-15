import { PublicLayout } from './layouts/PublicLayout'
import { AboutSection } from './pages/AboutSection'
import { HomePage } from './pages/HomePage'
import { ProjectsSection } from './pages/ProjectsSection'
import { SkillsSection } from './pages/SkillsSection'
import { EducationSection } from './pages/EducationSection'
import { ContactSection } from './pages/ContactPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { AdminPage } from './pages/AdminPage'
import { ExperienceSection } from './pages/ExperienceSection'
import { useSiteContent } from './hooks/useSiteContent'

/** Only the root path is a valid route for this single-page portfolio. */
function isValidRoute(pathname: string): boolean {
  return pathname === '/' || pathname === ''
}

export function App() {
  if (
    window.location.pathname === '/admin' ||
    window.location.pathname === '/admin/' ||
    window.location.pathname === '/admin/profile' ||
    window.location.pathname === '/admin/profile/'
  ) {
    return <AdminPage />
  }

  const { content: siteContent } = useSiteContent()
  const visible = (id: string) => siteContent.sections.find((section) => section.id === id)?.visible ?? true

  const content = isValidRoute(window.location.pathname) ? (
    <>
      {visible('home') ? <HomePage /> : null}
      {visible('about') ? <AboutSection /> : null}
      {visible('skills') ? <SkillsSection /> : null}
      {visible('projects') ? <ProjectsSection /> : null}
      {visible('experience') ? <ExperienceSection /> : null}
      {visible('education') ? <EducationSection /> : null}
      {visible('contact') || visible('resume') ? <ContactSection /> : null}
    </>
  ) : (
    <NotFoundPage />
  )

  return <PublicLayout>{content}</PublicLayout>
}
