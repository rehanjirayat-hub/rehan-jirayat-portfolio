import { profile } from '../../data/profile'
import { SocialLinks } from '../common/SocialLinks'
import { Container } from '../common/Container'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <Container className="site-footer-inner">
        <div>
          <p className="footer-name">{profile.name}</p>
          <p className="footer-role">{profile.role}</p>
        </div>
        <div className="footer-meta">
          <SocialLinks />
          <small>Copyright {year} {profile.name}</small>
        </div>
      </Container>
    </footer>
  )
}
