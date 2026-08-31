import { profile } from './profile'
import type { ContactInfo } from '../types/contact'

export const contactInfo: ContactInfo = {
  email: profile.email,
  phone: profile.phone,
  location: profile.location,
}

export const contactSocialLinks = profile.socialLinks.filter((link) => link.platform !== 'email')
