'use client'

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Info } from 'lucide-react'
import { useState } from 'react'
import type { ContactFormData, ContactFormErrors } from '../../types/contact'
import { Button } from '../ui/Button'

const validateForm = (data: ContactFormData): ContactFormErrors => {
  const errors: ContactFormErrors = {}

  if (!data.name.trim()) {
    errors.name = 'Name is required'
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters'
  } else if (data.name.trim().length > 100) {
    errors.name = 'Name must be less than 100 characters'
  }

  if (!data.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address'
  }

  if (!data.subject.trim()) {
    errors.subject = 'Subject is required'
  } else if (data.subject.trim().length < 3) {
    errors.subject = 'Subject must be at least 3 characters'
  } else if (data.subject.trim().length > 100) {
    errors.subject = 'Subject must be less than 100 characters'
  }

  if (!data.message.trim()) {
    errors.message = 'Message is required'
  } else if (data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters'
  } else if (data.message.trim().length > 5000) {
    errors.message = 'Message must be less than 5000 characters'
  }

  return errors
}

export function ContactForm() {
  const shouldReduceMotion = useReducedMotion()
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [isPrepared, setIsPrepared] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name as keyof ContactFormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newErrors = validateForm(formData)
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsPrepared(true)
  }

  return (
    <motion.form
      className="contact-form"
      onSubmit={handleSubmit}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      viewport={{ once: true, margin: '-100px' }}
      noValidate
    >
      <AnimatePresence>
        {isPrepared && (
          <motion.div
            className="contact-form-success"
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: -10 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            role="alert"
          >
            <div className="contact-form-success-icon">
              <Info aria-hidden="true" size={16} />
            </div>
            <div className="contact-form-success-content">
              <h4 className="contact-form-success-title">Message ready for backend delivery</h4>
              <p className="contact-form-success-message">
                This form is frontend-only. Sending will be connected when backend integration is added.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="contact-form-group">
        <label htmlFor="contact-name" className="contact-form-label">
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={isPrepared}
          className={`contact-form-input ${errors.name ? 'contact-form-input-error' : ''}`}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
          required
        />
        <AnimatePresence>
          {errors.name && (
            <motion.div
              id="contact-name-error"
              className="contact-form-error"
              initial={shouldReduceMotion ? undefined : { opacity: 0, height: 0 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, height: 'auto' }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, height: 0 }}
              role="alert"
            >
              {errors.name}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="contact-form-group">
        <label htmlFor="contact-email" className="contact-form-label">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={isPrepared}
          className={`contact-form-input ${errors.email ? 'contact-form-input-error' : ''}`}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
          required
        />
        <AnimatePresence>
          {errors.email && (
            <motion.div
              id="contact-email-error"
              className="contact-form-error"
              initial={shouldReduceMotion ? undefined : { opacity: 0, height: 0 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, height: 'auto' }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, height: 0 }}
              role="alert"
            >
              {errors.email}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="contact-form-group">
        <label htmlFor="contact-subject" className="contact-form-label">
          Subject
        </label>
        <input
          id="contact-subject"
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          disabled={isPrepared}
          className={`contact-form-input ${errors.subject ? 'contact-form-input-error' : ''}`}
          aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
          required
        />
        <AnimatePresence>
          {errors.subject && (
            <motion.div
              id="contact-subject-error"
              className="contact-form-error"
              initial={shouldReduceMotion ? undefined : { opacity: 0, height: 0 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, height: 'auto' }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, height: 0 }}
              role="alert"
            >
              {errors.subject}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="contact-form-group">
        <label htmlFor="contact-message" className="contact-form-label">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          disabled={isPrepared}
          className={`contact-form-textarea ${errors.message ? 'contact-form-input-error' : ''}`}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          rows={5}
          required
        />
        <AnimatePresence>
          {errors.message && (
            <motion.div
              id="contact-message-error"
              className="contact-form-error"
              initial={shouldReduceMotion ? undefined : { opacity: 0, height: 0 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, height: 'auto' }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, height: 0 }}
              role="alert"
            >
              {errors.message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        whileHover={shouldReduceMotion ? undefined : { y: -2 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
      >
        <Button
          type="submit"
          disabled={isPrepared}
          className="contact-form-submit"
        >
          Prepare Message
        </Button>
      </motion.div>
    </motion.form>
  )
}
