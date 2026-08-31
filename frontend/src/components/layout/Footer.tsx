import { useProfile } from '../../hooks/useProfile'
import { SocialLinks } from '../common/SocialLinks'
import { Container } from '../common/Container'

export function Footer() {
  const { profile } = useProfile()
  const year = new Date().getFullYear()
  const name = profile?.name ?? ''

  return (
    <footer className="site-footer">
      <Container className="site-footer-inner">
        <div>
          <p className="footer-name">{name}</p>
          <p className="footer-role">{profile?.role ?? ''}</p>
        </div>
        <div className="footer-meta">
          <SocialLinks />
          <small>Copyright {year}{name ? ` ${name}` : ''}</small>
        </div>
      </Container>
    </footer>
  )
}
