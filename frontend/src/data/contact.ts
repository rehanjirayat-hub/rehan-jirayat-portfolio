import type { ContactInfo } from '../types/contact'

export const contactInfo: ContactInfo = {
  email: 'rehanjirayat@gmail.com',
  phone: '9900422726',
  location: 'Belagavi, Karnataka, India',
}

export const contactSocialLinks = [
  {
    platform: 'github' as const,
    label: 'GitHub profile',
    href: 'https://github.com/rehanjirayat-hub',
  },
  {
    platform: 'linkedin' as const,
    label: 'LinkedIn profile',
    href: 'https://www.linkedin.com/in/rehan-jirayat-5683573a2/',
  },
  {
    platform: 'leetcode' as const,
    label: 'LeetCode profile',
    href: 'https://leetcode.com/u/sKGBJtR8N6/',
  },
]
