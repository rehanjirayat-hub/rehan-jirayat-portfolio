import { useEffect, useLayoutEffect, useRef, useState, type PropsWithChildren } from 'react'
import { preloadSiteData } from './preloadSiteData'
import './intro.css'

/**
 * The opening title card. Rendered as one visual element — never animated word
 * by word — and displayed in the site's uppercase hero treatment.
 */
const INTRO_NAME = 'Mohammed Rehan Jirayat'

interface IntroTiming {
  /** Earliest moment the camera may start pulling back. */
  minHold: number
  /** Hard limit before the reveal starts, whatever the APIs are doing. */
  maxWait: number
  /** Matches the shared camera transform, plus a small transition buffer. */
  zoom: number
}

const TIMING: Record<'default' | 'reduced', IntroTiming> = {
  // The normal reveal completes in about 3s, with a hard API wait of 2.8s.
  default: { minHold: 1500, maxWait: 2800, zoom: 1420 },
  reduced: { minHold: 350, maxWait: 1500, zoom: 300 },
}

type IntroPhase = 'hold' | 'zoom' | 'done'

/**
 * Cinematic entrance for the public home page.
 *
 * The page mounts behind the veil immediately while `preloadSiteData` starts
 * its cached API requests. Critical data controls when the camera may pull
 * back; a maximum wait keeps a slow request from holding the intro forever.
 */
export function CinematicIntro({ children }: PropsWithChildren) {
  const [timing] = useState<IntroTiming>(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? TIMING.reduced : TIMING.default,
  )
  const [phase, setPhase] = useState<IntroPhase>('hold')
  const [isCriticalDataReady, setIsCriticalDataReady] = useState(false)
  const startedAtRef = useRef(0)

  // Start the shared cached requests before the first paint. The portfolio
  // is already mounted behind the intro veil while the requests are running.
  useLayoutEffect(() => {
    let active = true
    startedAtRef.current = performance.now()
    preloadSiteData().then(() => {
      if (!active) return
      setIsCriticalDataReady(true)
    })
    return () => {
      active = false
    }
  }, [])

  // Pull back when critical data is ready, but never before the minimum hold
  // and never after the maximum wait.
  useEffect(() => {
    if (phase !== 'hold') return
    const elapsed = performance.now() - startedAtRef.current
    const target = isCriticalDataReady ? timing.minHold : timing.maxWait
    const timer = window.setTimeout(() => setPhase('zoom'), Math.max(target - elapsed, 0))
    return () => window.clearTimeout(timer)
  }, [phase, isCriticalDataReady, timing])

  // Release the page once the camera has settled. The extra 80ms lets the CSS
  // transition finish first; cleanup clears the timer if the phase changes.
  useEffect(() => {
    if (phase !== 'zoom') return
    const timer = window.setTimeout(() => setPhase('done'), timing.zoom + 80)
    return () => window.clearTimeout(timer)
  }, [phase, timing])

  const isDone = phase === 'done'
  const isZooming = phase === 'zoom'

  return (
    <>
      <div
        className={isDone ? undefined : `intro-camera${isZooming ? ' is-zooming' : ''}`}
        aria-hidden={isDone ? undefined : true}
        inert={isDone ? undefined : true}
      >
        {children}
      </div>

      {isDone ? null : (
        <>
          <div className={`intro-veil${isZooming ? ' is-zooming' : ''}`} aria-hidden="true" />
          <div className={`intro-title-camera${isZooming ? ' is-zooming' : ''}`}>
            <h1 className={`intro-name${isZooming ? ' is-zooming' : ''}`}>{INTRO_NAME}</h1>
          </div>
        </>
      )}
    </>
  )
}
