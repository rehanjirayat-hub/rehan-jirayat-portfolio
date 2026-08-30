export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface ContactFormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export interface ContactInfo {
  email: string
  phone: string
  location: string
}

export interface SocialLink {
  platform: 'github' | 'linkedin' | 'leetcode'
  label: string
  href: string
  icon?: string
}
