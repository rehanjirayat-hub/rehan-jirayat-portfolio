import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { navigationItems } from '../../data/navigation'
import { useProfile } from '../../hooks/useProfile'
import { classNames } from '../../utils/classNames'
import { Container } from '../common/Container'

export function Navbar() {
  const { profile } = useProfile()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  return (
    <header className="site-header">
      <Container className="site-header-inner">
        <a className="brand-mark" href="#home" aria-label={profile ? `${profile.name} home` : 'Home'}>
          MRJ
        </a>

        <nav className="desktop-navigation" aria-label="Primary navigation">
          {navigationItems.map((item) => (
            <a
              className={classNames('navigation-link', item.href === '#home' && 'navigation-link-active')}
              href={item.href}
              key={item.href}
              aria-current={item.href === '#home' ? 'page' : undefined}
              target={item.isExternal ? '_blank' : undefined}
              rel={item.isExternal ? 'noopener noreferrer' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          className="icon-button mobile-menu-toggle"
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
        </button>
      </Container>

      <AnimatePresence initial={false}>
        {isMenuOpen ? (
          <motion.nav
            id="mobile-navigation"
            className="mobile-navigation"
            aria-label="Primary navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            <Container className="mobile-navigation-inner">
              {navigationItems.map((item) => (
                <a
                  className="mobile-navigation-link"
                  href={item.href}
                  key={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  target={item.isExternal ? '_blank' : undefined}
                  rel={item.isExternal ? 'noopener noreferrer' : undefined}
                >
                  {item.label}
                </a>
              ))}
            </Container>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
