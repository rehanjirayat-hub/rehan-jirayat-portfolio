import { http } from './http'
import type { ContactFormData } from '../types/contact'

export interface ContactSubmissionResponse {
  id: number
  name: string
  email: string
  subject: string
  message: string
}

export interface ContactValidationError {
  errors: string[]
}

export async function submitContactMessage(
  data: ContactFormData
): Promise<ContactSubmissionResponse> {
  const response = await http.post<ContactSubmissionResponse>('/api/contact', data)
  return response.data
}
