import { Code2, Github, Linkedin, Mail } from 'lucide-react'
import { useProfile } from '../../hooks/useProfile'
import type { SocialLink, SocialPlatform } from '../../types/profile'

const socialIcons: Record<SocialPlatform, typeof Github> = {
  github: Github,
  linkedin: Linkedin,
  leetcode: Code2,
  email: Mail,
}

function isExternalLink(link: SocialLink) {
  return link.platform !== 'email'
}

export function SocialLinks() {
  const { profile } = useProfile()

  if (!profile) return null

  return (
    <div className="social-links" aria-label="Professional profiles">
      {profile.socialLinks.map((link) => {
        const Icon = socialIcons[link.platform]
        const isExternal = isExternalLink(link)

        return (
          <a
            className="icon-button"
            href={link.href}
            key={link.platform}
            aria-label={link.label}
            title={link.label}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
          >
            <Icon aria-hidden="true" size={18} />
          </a>
        )
      })}
    </div>
  )
}
