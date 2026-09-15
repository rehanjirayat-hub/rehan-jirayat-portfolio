export type SocialPlatform = string

export interface SocialLink {
  href: string
  label: string
  platform: SocialPlatform
  visible?: boolean
  displayOrder?: number
}

export interface PortfolioProfile {
  name: string
  role: string
  specialization: string
  location: string
  email: string
  phone: string
  heroStatement: string
  socialLinks: SocialLink[]
}
