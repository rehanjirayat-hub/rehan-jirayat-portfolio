import { useEffect, useState } from 'react'
import { http } from '../services/http'
import type { Experience } from '../types/experience'

let cachedExperience: Experience[] | null = null
let pendingFetch: Promise<Experience[]> | null = null

export function loadExperience(): Promise<Experience[]> {
  if (cachedExperience) return Promise.resolve(cachedExperience)
  if (pendingFetch) return pendingFetch

  pendingFetch = http
    .get<Experience[]>('/api/experience')
    .then((res) => {
      cachedExperience = res.data
      pendingFetch = null
      return res.data
    })
    .catch((err) => {
      pendingFetch = null
      throw err
    })

  return pendingFetch
}

export function useExperience() {
  const [experience, setExperience] = useState<Experience[]>(cachedExperience ?? [])
  useEffect(() => {
    loadExperience()
      .then(setExperience)
      .catch(() => undefined)
  }, [])
  return experience
}
