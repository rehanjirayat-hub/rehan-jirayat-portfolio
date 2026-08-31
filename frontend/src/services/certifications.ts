import { http } from './http'
import type { Certification } from '../types/education'

export async function fetchCertifications(): Promise<Certification[]> {
  const response = await http.get<Certification[]>('/api/certifications')
  return response.data
}
