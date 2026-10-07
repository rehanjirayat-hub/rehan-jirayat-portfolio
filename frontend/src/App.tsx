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
import { CinematicIntro } from './features/intro/CinematicIntro'

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

  const layout = <PublicLayout>{content}</PublicLayout>

  // The cinematic entrance only plays for a fresh visit to the home page.
  // Deep links (/#projects), the admin area and unknown routes go straight to
  // their content, so back/forward and direct URLs never replay it.
  const shouldPlayIntro = isValidRoute(window.location.pathname) && window.location.hash === ''

  return shouldPlayIntro ? <CinematicIntro>{layout}</CinematicIntro> : layout
}
