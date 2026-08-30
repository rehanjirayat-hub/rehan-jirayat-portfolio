import { PublicLayout } from './layouts/PublicLayout'
import { AboutSection } from './pages/AboutSection'
import { HomePage } from './pages/HomePage'
import { SkillsSection } from './pages/SkillsSection'

export function App() {
  return (
    <PublicLayout>
      <HomePage />
      <AboutSection />
      <SkillsSection />
    </PublicLayout>
  )
}
