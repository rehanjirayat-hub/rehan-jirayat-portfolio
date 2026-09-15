'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Mail, Phone, MapPin, Github, Linkedin, Code2 } from 'lucide-react'
import { contactInfo, contactSocialLinks } from '../../data/contact'
import { useProfile } from '../../hooks/useProfile'

function getSocialIcon(platform: string) {
  switch (platform) {
    case 'github':
      return <Github size={20} />
    case 'linkedin':
      return <Linkedin size={20} />
    case 'leetcode':
      return <Code2 size={20} />
    default:
      return null
  }
}

export function ContactDetails() {
  const shouldReduceMotion = useReducedMotion()
  const { profile } = useProfile()
  const email = profile?.email ?? contactInfo.email
  const phone = profile?.phone ?? contactInfo.phone
  const location = profile?.location ?? contactInfo.location
  const socialLinks = profile?.socialLinks.filter((link) => link.platform !== 'email') ?? contactSocialLinks

  return (
    <motion.div
      className="contact-details"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className="contact-details-section">
        <h3 className="contact-details-heading">Get in Touch</h3>
        <p className="contact-details-description">
          Interested in collaboration, opportunities, or discussing backend development? Let's connect.
        </p>
      </div>

      <div className="contact-details-section">
        <h3 className="contact-details-section-title">Contact Information</h3>
        <div className="contact-details-list">
          <motion.a
            href={`mailto:${email}`}
            className="contact-details-item"
            whileHover={shouldReduceMotion ? undefined : { x: 4 }}
            aria-label={`Email ${email}`}
          >
            <Mail size={18} className="contact-details-icon" aria-hidden="true" />
            <span className="contact-details-text">{email}</span>
          </motion.a>

          <motion.a
            href={`tel:${phone}`}
            className="contact-details-item"
            whileHover={shouldReduceMotion ? undefined : { x: 4 }}
            aria-label={`Call ${phone}`}
          >
            <Phone size={18} className="contact-details-icon" aria-hidden="true" />
            <span className="contact-details-text">{phone}</span>
          </motion.a>

          <div className="contact-details-item">
            <MapPin size={18} className="contact-details-icon" aria-hidden="true" />
            <span className="contact-details-text">{location}</span>
          </div>
        </div>
      </div>

      <div className="contact-details-section">
        <h3 className="contact-details-section-title">Follow Me</h3>
        <div className="contact-details-social">
          {socialLinks.map((link) => (
            <motion.a
              key={link.platform}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-details-social-link"
              aria-label={link.label}
              whileHover={shouldReduceMotion ? undefined : { scale: 1.1, y: -2 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
              title={link.label}
            >
              {getSocialIcon(link.platform)}
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
