import { useEffect, useState } from 'react'
import { http } from '../services/http'
import type { PortfolioProfile } from '../types/profile'

let cachedProfile: PortfolioProfile | null = null
let pendingFetch: Promise<PortfolioProfile> | null = null

async function loadProfile(): Promise<PortfolioProfile> {
  if (cachedProfile) return cachedProfile
  if (pendingFetch) return pendingFetch

  pendingFetch = http
    .get<PortfolioProfile>('/api/profile')
    .then((res) => {
      cachedProfile = res.data
      pendingFetch = null
      return res.data
    })
    .catch((err) => {
      pendingFetch = null
      throw err
    })

  return pendingFetch
}

export function useProfile() {
  const [profile, setProfile] = useState<PortfolioProfile | null>(cachedProfile)
  const [isLoading, setIsLoading] = useState(!cachedProfile)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (cachedProfile) {
      setProfile(cachedProfile)
      setIsLoading(false)
      return
    }

    loadProfile()
      .then(setProfile)
      .catch(() => setError('Failed to load profile.'))
      .finally(() => setIsLoading(false))
  }, [])

  return { profile, isLoading, error }
}
