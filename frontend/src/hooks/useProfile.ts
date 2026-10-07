import { useEffect, useState } from 'react'
import { profile as fallbackProfile } from '../data/profile'
import { http } from '../services/http'
import type { PortfolioProfile } from '../types/profile'

let cachedProfile: PortfolioProfile | null = null
let pendingFetch: Promise<PortfolioProfile> | null = null

export async function loadProfile(): Promise<PortfolioProfile> {
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
  // Keep the hero and header renderable if the critical API is slower than the
  // intro's maximum wait. The cached API result replaces this fallback as soon
  // as it arrives.
  const [profile, setProfile] = useState<PortfolioProfile>(cachedProfile ?? fallbackProfile)

  useEffect(() => {
    loadProfile()
      .then(setProfile)
      .catch(() => undefined)
  }, [])

  return { profile, isLoading: false, error: null }
}
