export interface NavigationItem {
  label: string
  href: string
  isExternal: boolean
  visible: boolean
  displayOrder: number
}

export interface SectionSetting {
  id: string
  visible: boolean
  displayOrder: number
}

export interface SiteContent {
  heroSubtitle: string
  heroPrimaryCtaLabel: string
  heroPrimaryCtaUrl: string
  heroSecondaryCtaLabel: string
  heroSecondaryCtaUrl: string
  aboutEyebrow: string
  aboutHeading: string
  aboutParagraphOne: string
  aboutParagraphTwo: string
  aboutCtaLabel: string
  aboutCtaUrl: string
  contactHeading: string
  contactDescription: string
  footerDescription: string
  copyrightText: string
  siteName: string
  professionalTitle: string
  navigation: NavigationItem[]
  sections: SectionSetting[]
}
