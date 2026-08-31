'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Mail, Phone, MapPin, Github, Linkedin, Code2 } from 'lucide-react'
import { contactInfo, contactSocialLinks } from '../../data/contact'

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

  return (
    <motion.div
      className="contact-details"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className="contact-details-section">
        <h4 className="contact-details-heading">Get in Touch</h4>
        <p className="contact-details-description">
          Interested in collaboration, opportunities, or discussing backend development? Let's connect.
        </p>
      </div>

      <div className="contact-details-section">
        <h4 className="contact-details-section-title">Contact Information</h4>
        <div className="contact-details-list">
          <motion.a
            href={`mailto:${contactInfo.email}`}
            className="contact-details-item"
            whileHover={shouldReduceMotion ? undefined : { x: 4 }}
            aria-label={`Email ${contactInfo.email}`}
          >
            <Mail size={18} className="contact-details-icon" aria-hidden="true" />
            <span className="contact-details-text">{contactInfo.email}</span>
          </motion.a>

          <motion.a
            href={`tel:${contactInfo.phone}`}
            className="contact-details-item"
            whileHover={shouldReduceMotion ? undefined : { x: 4 }}
            aria-label={`Call ${contactInfo.phone}`}
          >
            <Phone size={18} className="contact-details-icon" aria-hidden="true" />
            <span className="contact-details-text">{contactInfo.phone}</span>
          </motion.a>

          <div className="contact-details-item">
            <MapPin size={18} className="contact-details-icon" aria-hidden="true" />
            <span className="contact-details-text">{contactInfo.location}</span>
          </div>
        </div>
      </div>

      <div className="contact-details-section">
        <h4 className="contact-details-section-title">Follow Me</h4>
        <div className="contact-details-social">
          {contactSocialLinks.map((link) => (
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
