import { useEffect, useState } from 'react'
import { http } from '../services/http'
import type { Education } from '../types/education'

let cachedEducation: Education[] | null = null
let pendingFetch: Promise<Education[]> | null = null

async function loadEducation(): Promise<Education[]> {
  if (cachedEducation) return cachedEducation
  if (pendingFetch) return pendingFetch

  pendingFetch = http
    .get<Education[]>('/api/education')
    .then((res) => {
      cachedEducation = res.data
      pendingFetch = null
      return res.data
    })
    .catch((err) => {
      pendingFetch = null
      throw err
    })

  return pendingFetch
}

export function useEducation() {
  const [education, setEducation] = useState<Education[]>(cachedEducation ?? [])
  const [isLoading, setIsLoading] = useState(!cachedEducation)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (cachedEducation) {
      setEducation(cachedEducation)
      setIsLoading(false)
      return
    }

    loadEducation()
      .then(setEducation)
      .catch(() => setError('Failed to load education.'))
      .finally(() => setIsLoading(false))
  }, [])

  return { education, isLoading, error }
}
