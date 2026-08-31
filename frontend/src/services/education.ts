import { http } from './http'
import type { Education } from '../types/education'

export async function fetchEducation(): Promise<Education[]> {
  const response = await http.get<Education[]>('/api/education')
  return response.data
}

export async function fetchEducationById(id: string): Promise<Education> {
  const response = await http.get<Education>(`/api/education/${id}`)
  return response.data
}
