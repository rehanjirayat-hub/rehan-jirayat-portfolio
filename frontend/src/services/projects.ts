import { http } from './http'
import type { Project } from '../types/projects'

export async function fetchProjects(): Promise<Project[]> {
  const response = await http.get<Project[]>('/api/projects')
  return response.data
}

export async function fetchProjectById(id: string): Promise<Project> {
  const response = await http.get<Project>(`/api/projects/${id}`)
  return response.data
}
