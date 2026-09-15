import { useEffect, useState } from 'react'
import { http } from '../services/http'
import type { SiteContent } from '../types/siteContent'

export const defaultSiteContent: SiteContent = {
  heroSubtitle: 'Spring Boot • REST APIs • JPA/Hibernate • MySQL',
  heroPrimaryCtaLabel: 'View Projects',
  heroPrimaryCtaUrl: '#projects',
  heroSecondaryCtaLabel: 'Download Resume',
  heroSecondaryCtaUrl: '/resume/Mohammad_Rehan_Jirayat_Resume.pdf',
  aboutEyebrow: 'About',
  aboutHeading: 'Building toward thoughtful Java backend development.',
  aboutParagraphOne: "I'm Mohammad Rehan Jirayat, an MCA student and Java Backend Developer focused on building practical backend systems with Java, Spring Boot, REST APIs, and database-driven application design.",
  aboutParagraphTwo: 'My development journey includes Core Java, JDBC, MySQL, layered architecture, Spring Data JPA, Spring Security, testing, and clean backend engineering through hands-on project work.',
  aboutCtaLabel: 'Explore my projects',
  aboutCtaUrl: '#projects',
  contactHeading: 'Contact',
  contactDescription: "Have a question or want to work together? Send me a message and I'll get back to you.",
  footerDescription: 'Mohammad Rehan Jirayat',
  copyrightText: 'Copyright',
  siteName: 'Mohammad Rehan Jirayat',
  professionalTitle: 'Java Backend Developer',
  navigation: [
    { label: 'Home', href: '#home', isExternal: false, visible: true, displayOrder: 0 },
    { label: 'About', href: '#about', isExternal: false, visible: true, displayOrder: 1 },
    { label: 'Skills', href: '#skills', isExternal: false, visible: true, displayOrder: 2 },
    { label: 'Projects', href: '#projects', isExternal: false, visible: true, displayOrder: 3 },
    { label: 'Education', href: '#education', isExternal: false, visible: true, displayOrder: 4 },
    { label: 'Certifications', href: '#certifications', isExternal: false, visible: true, displayOrder: 5 },
    { label: 'GitHub', href: 'https://github.com/rehanjirayat-hub', isExternal: true, visible: true, displayOrder: 6 },
    { label: 'Resume', href: '#resume', isExternal: false, visible: true, displayOrder: 7 },
    { label: 'Contact', href: '#contact', isExternal: false, visible: true, displayOrder: 8 },
  ],
  sections: ['home', 'about', 'skills', 'projects', 'experience', 'education', 'certifications', 'resume', 'contact'].map((id, displayOrder) => ({ id, visible: true, displayOrder })),
}

let cachedContent: SiteContent | null = null
let pendingFetch: Promise<SiteContent> | null = null

function loadSiteContent() {
  if (cachedContent) return Promise.resolve(cachedContent)
  if (!pendingFetch) {
    pendingFetch = http.get<SiteContent>('/api/site-content').then((response) => {
      cachedContent = response.data
      pendingFetch = null
      return response.data
    }).catch((error) => {
      pendingFetch = null
      throw error
    })
  }
  return pendingFetch
}

export function useSiteContent() {
  const [content, setContent] = useState<SiteContent>(cachedContent ?? defaultSiteContent)
  const [isLoading, setIsLoading] = useState(!cachedContent)

  useEffect(() => {
    loadSiteContent().then(setContent).catch(() => undefined).finally(() => setIsLoading(false))
  }, [])

  return { content, isLoading }
}
