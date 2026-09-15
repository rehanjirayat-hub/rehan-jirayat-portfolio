import { useProfile } from '../../hooks/useProfile'
import { SocialLinks } from '../common/SocialLinks'
import { Container } from '../common/Container'
import { useSiteContent } from '../../hooks/useSiteContent'

export function Footer() {
  const { profile } = useProfile()
  const { content } = useSiteContent()
  const year = new Date().getFullYear()
  const name = content.siteName || profile?.name || ''

  return (
    <footer className="site-footer">
      <Container className="site-footer-inner">
        <div>
          <p className="footer-name">{name}</p>
          <p className="footer-role">{content.footerDescription || profile?.role || ''}</p>
        </div>
        <div className="footer-meta">
          <SocialLinks />
          <small>{content.copyrightText} {year}{name ? ` ${name}` : ''}</small>
          <a href="/admin" style={{ color: 'var(--color-text-muted)', fontSize: '0.65rem', opacity: 0.7 }}>Admin</a>
        </div>
      </Container>
    </footer>
  )
}
