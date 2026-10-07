import { http } from './http'
import type { Certification } from '../types/education'

let cachedCertifications: Certification[] | null = null
let pendingFetch: Promise<Certification[]> | null = null

/** Cached so page sections and the intro preload share a single request. */
export async function fetchCertifications(): Promise<Certification[]> {
  if (cachedCertifications) return cachedCertifications
  if (pendingFetch) return pendingFetch

  pendingFetch = http
    .get<Certification[]>('/api/certifications')
    .then((res) => {
      cachedCertifications = res.data
      pendingFetch = null
      return res.data
    })
    .catch((err) => {
      pendingFetch = null
      throw err
    })

  return pendingFetch
}
