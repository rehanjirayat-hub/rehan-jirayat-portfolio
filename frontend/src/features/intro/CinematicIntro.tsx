import { useEffect, useLayoutEffect, useRef, useState, type PropsWithChildren } from 'react'
import { preloadSiteData } from './preloadSiteData'
import './intro.css'

const DISPLAY_NAME = 'Mohammed Rehan Jirayat'
const APP_CLASS = 'PortfolioApplication'
const COMMAND = 'mvn spring-boot:run'

interface IntroTiming {
  maxWait: number
  transition: number
  typeSpeed: number
}

const TIMING: Record<'default' | 'reduced', IntroTiming> = {
  default: { maxWait: 5600, transition: 920, typeSpeed: 90 },
  reduced: { maxWait: 1200, transition: 120, typeSpeed: 0 },
}

type IntroPhase = 'hold' | 'zoom' | 'done'

export function CinematicIntro({ children }: PropsWithChildren) {
  const [timing] = useState<IntroTiming>(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? TIMING.reduced : TIMING.default,
  )
  const [phase, setPhase] = useState<IntroPhase>('hold')
  const [commandLength, setCommandLength] = useState(timing.typeSpeed === 0 ? COMMAND.length : 0)
  const [outputCount, setOutputCount] = useState(timing.typeSpeed === 0 ? 5 : 0)
  const [isCriticalDataReady, setIsCriticalDataReady] = useState(false)
  const [isStartupReady, setIsStartupReady] = useState(timing.typeSpeed === 0)
  const startedAtRef = useRef(0)

  // These are the same cached loaders used by the page, so preload joins the
  // requests made by mounted sections instead of issuing duplicate requests.
  useLayoutEffect(() => {
    let active = true
    startedAtRef.current = performance.now()
    preloadSiteData().then(() => {
      if (active) setIsCriticalDataReady(true)
    })
    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    if (timing.typeSpeed === 0) return
    let typed = 0
    const interval = window.setInterval(() => {
      typed += 1
      setCommandLength(typed)
      if (typed >= COMMAND.length) {
        window.clearInterval(interval)
        const timers = [
          window.setTimeout(() => setOutputCount(1), 500),
          window.setTimeout(() => setOutputCount(2), 1000),
          window.setTimeout(() => setOutputCount(3), 1500),
          window.setTimeout(() => setOutputCount(4), 2000),
          window.setTimeout(() => {
            setOutputCount(5)
          }, 2500),
          window.setTimeout(() => setIsStartupReady(true), 3300),
        ]
        // Keep the staged output timers scoped to this intro instance.
        cleanupTimers.current = timers
      }
    }, timing.typeSpeed)
    return () => window.clearInterval(interval)
  }, [timing.typeSpeed])

  const cleanupTimers = useRef<number[]>([])
  useEffect(() => () => cleanupTimers.current.forEach(window.clearTimeout), [])

  // Reveal when startup and critical content are ready, with a hard timeout
  // so an unavailable API never leaves the intro on screen indefinitely.
  useEffect(() => {
    if (phase !== 'hold') return
    if (isStartupReady && isCriticalDataReady) {
      setPhase('zoom')
      return
    }
    const elapsed = performance.now() - startedAtRef.current
    const timer = window.setTimeout(() => setPhase('zoom'), Math.max(timing.maxWait - elapsed, 0))
    return () => window.clearTimeout(timer)
  }, [phase, isCriticalDataReady, isStartupReady, timing])

  useEffect(() => {
    if (phase !== 'zoom') return
    const timer = window.setTimeout(() => setPhase('done'), timing.transition)
    return () => window.clearTimeout(timer)
  }, [phase, timing])

  const isDone = phase === 'done'
  const isZooming = phase === 'zoom'
  const output = [
    ` :: Spring Boot :: (v3.5.0)`,
    `Starting ${APP_CLASS}...`,
    'Tomcat initialized...',
    `Started ${APP_CLASS}`,
    'Portfolio ready.',
  ]

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
            <section className={`intro-terminal${isZooming ? ' is-zooming' : ''}`} aria-label={`${DISPLAY_NAME} starting his application`}>
              <header className="intro-terminal-header">
                <span className="intro-terminal-title">{DISPLAY_NAME}</span>
                <span className="intro-terminal-status">Starting application</span>
              </header>
              <div className="intro-terminal-body" aria-live="off">
                <p className="intro-terminal-command">
                  <span className="intro-terminal-path">C:\Mohammed-Rehan-Jirayat\portfolio&gt;</span>{' '}
                  <span>{COMMAND.slice(0, commandLength)}</span>
                  {commandLength < COMMAND.length && <span className="intro-terminal-cursor" aria-hidden="true" />}
                </p>
                {output.slice(0, outputCount).map((line, index) => (
                  <p className={index >= 3 ? 'intro-terminal-success' : 'intro-terminal-output'} key={line}>
                    {line}
                  </p>
                ))}
              </div>
            </section>
          </div>
        </>
      )}
    </>
  )
}
