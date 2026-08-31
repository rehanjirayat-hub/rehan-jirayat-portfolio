import { useEffect, useState } from 'react'
import { http } from '../services/http'
import type { SkillCategory } from '../types/skills'

let cachedSkills: SkillCategory[] | null = null
let pendingFetch: Promise<SkillCategory[]> | null = null

async function loadSkills(): Promise<SkillCategory[]> {
  if (cachedSkills) return cachedSkills
  if (pendingFetch) return pendingFetch

  pendingFetch = http
    .get<SkillCategory[]>('/api/skills')
    .then((res) => {
      cachedSkills = res.data
      pendingFetch = null
      return res.data
    })
    .catch((err) => {
      pendingFetch = null
      throw err
    })

  return pendingFetch
}

export function useSkills() {
  const [skills, setSkills] = useState<SkillCategory[]>(cachedSkills ?? [])
  const [isLoading, setIsLoading] = useState(!cachedSkills)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (cachedSkills) {
      setSkills(cachedSkills)
      setIsLoading(false)
      return
    }

    loadSkills()
      .then(setSkills)
      .catch(() => setError('Failed to load skills.'))
      .finally(() => setIsLoading(false))
  }, [])

  return { skills, isLoading, error }
}
