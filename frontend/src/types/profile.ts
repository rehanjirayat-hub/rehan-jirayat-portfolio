export type SocialPlatform = 'github' | 'linkedin' | 'leetcode' | 'email'

export interface SocialLink {
  href: string
  label: string
  platform: SocialPlatform
}

export interface PortfolioProfile {
  name: string
  role: string
  location: string
  email: string
  heroStatement: string
  socialLinks: SocialLink[]
}
