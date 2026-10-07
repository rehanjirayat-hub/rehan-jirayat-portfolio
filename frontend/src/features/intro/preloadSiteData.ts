import { loadProfile } from '../../hooks/useProfile'
import { loadSiteContent } from '../../hooks/useSiteContent'
import { loadSkills } from '../../hooks/useSkills'
import { loadEducation } from '../../hooks/useEducation'
import { loadExperience } from '../../hooks/useExperience'
import { fetchProjects } from '../../services/projects'
import { fetchCertifications } from '../../services/certifications'
import { fetchPublicResume } from '../../services/resume'

/**
 * Starts every request the public page needs as early as possible.
 *
 * Critical data (profile + site content) drives the header, hero and section
 * layout, so it decides when the cinematic intro may reveal the website.
 * Everything else is loaded in parallel but never delays the reveal.
 *
 * Every loader is the same module-cached request the page components use, so
 * preloading joins — never duplicates — the requests the components make.
 *
 * The returned promise always resolves (never rejects) once the critical
 * requests have settled, including when they fail, so callers can never wait
 * forever on it.
 */
export function preloadSiteData(): Promise<void> {
  const critical = Promise.allSettled([loadProfile(), loadSiteContent()]).then(() => undefined)

  void Promise.allSettled([
    loadSkills(),
    loadEducation(),
    loadExperience(),
    fetchProjects(),
    fetchCertifications(),
    fetchPublicResume(),
  ]).then(() => undefined)

  return critical
}
