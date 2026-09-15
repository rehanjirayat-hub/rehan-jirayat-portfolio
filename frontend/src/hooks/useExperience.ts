import { useEffect, useState } from 'react'
import { http } from '../services/http'
import type { Experience } from '../types/experience'

export function useExperience() {
  const [experience, setExperience] = useState<Experience[]>([])
  useEffect(() => {
    http.get<Experience[]>('/api/experience').then((response) => setExperience(response.data)).catch(() => undefined)
  }, [])
  return experience
}
