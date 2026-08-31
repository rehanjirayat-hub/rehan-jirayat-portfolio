'use client'

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { useState } from 'react'
import type { ContactFormData, ContactFormErrors } from '../../types/contact'
import { submitContactMessage } from '../../services/contact'
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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitError(null)

    const newErrors = validateForm(formData)
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)
    try {
      await submitContactMessage(formData)
      setSubmitSuccess(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (err: unknown) {
      if (
        err &&
        typeof err === 'object' &&
        'response' in err
      ) {
        const axiosErr = err as { response?: { data?: { errors?: string[]; detail?: string } } }
        const serverErrors = axiosErr.response?.data?.errors
        if (serverErrors && serverErrors.length > 0) {
          setSubmitError(serverErrors.join('; '))
        } else {
          setSubmitError(axiosErr.response?.data?.detail || 'Failed to send message. Please try again.')
        }
      } else {
        setSubmitError('Failed to send message. Please try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
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
        {submitSuccess && (
          <motion.div
            className="contact-form-success"
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: -10 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            role="alert"
          >
            <div className="contact-form-success-icon">
              <CheckCircle aria-hidden="true" size={16} />
            </div>
            <div className="contact-form-success-content">
              <h4 className="contact-form-success-title">Message sent!</h4>
              <p className="contact-form-success-message">
                Thank you for reaching out. I will get back to you soon.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {submitError && (
          <motion.div
            className="contact-form-error-banner"
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: -10 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            role="alert"
          >
            <div className="contact-form-error-icon">
              <AlertCircle aria-hidden="true" size={16} />
            </div>
            <div className="contact-form-error-content">
              <p className="contact-form-error-message">{submitError}</p>
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
          disabled={isSubmitting || submitSuccess}
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
          disabled={isSubmitting || submitSuccess}
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
          disabled={isSubmitting || submitSuccess}
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
          disabled={isSubmitting || submitSuccess}
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
          disabled={isSubmitting || submitSuccess}
          className="contact-form-submit"
        >
          {isSubmitting ? (
            <span className="contact-form-submit-loading">
              <Loader2 size={16} className="contact-form-spinner" aria-hidden="true" />
              Sending...
            </span>
          ) : submitSuccess ? (
            'Sent!'
          ) : (
            'Send Message'
          )}
        </Button>
      </motion.div>
    </motion.form>
  )
}
