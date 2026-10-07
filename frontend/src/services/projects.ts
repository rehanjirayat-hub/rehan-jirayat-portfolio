import { http } from './http'
import type { Project } from '../types/projects'

let cachedProjects: Project[] | null = null
let pendingFetch: Promise<Project[]> | null = null

/** Cached so page sections and the intro preload share a single request. */
export async function fetchProjects(): Promise<Project[]> {
  if (cachedProjects) return cachedProjects
  if (pendingFetch) return pendingFetch

  pendingFetch = http
    .get<Project[]>('/api/projects')
    .then((res) => {
      cachedProjects = res.data
      pendingFetch = null
      return res.data
    })
    .catch((err) => {
      pendingFetch = null
      throw err
    })

  return pendingFetch
}

export async function fetchProjectById(id: string): Promise<Project> {
  const response = await http.get<Project>(`/api/projects/${id}`)
  return response.data
}
