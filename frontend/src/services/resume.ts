import { http } from './http'
import type { PublicResume } from '../types/media'

let cachedResume: PublicResume | null = null
let pendingFetch: Promise<PublicResume> | null = null

/** Cached so the resume section and the intro preload share a single request. */
export async function fetchPublicResume(): Promise<PublicResume> {
  if (cachedResume) return cachedResume
  if (pendingFetch) return pendingFetch

  pendingFetch = http
    .get<PublicResume>('/api/resume')
    .then((res) => {
      cachedResume = res.data
      pendingFetch = null
      return res.data
    })
    .catch((err) => {
      pendingFetch = null
      throw err
    })

  return pendingFetch
}
