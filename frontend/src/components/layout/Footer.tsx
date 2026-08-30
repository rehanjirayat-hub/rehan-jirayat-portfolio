import { Github, Linkedin } from 'lucide-react'
import { Container } from '../common/Container'

const socialLinks = [
  {
    href: 'https://github.com/rehanjirayat-hub',
    label: 'GitHub profile',
    icon: Github,
  },
  {
    href: 'https://www.linkedin.com/in/rehan-jirayat-5683573a2/',
    label: 'LinkedIn profile',
    icon: Linkedin,
  },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <Container className="site-footer-inner">
        <div>
          <p className="footer-name">Mohammad Rehan Jirayat</p>
          <p className="footer-role">Java Spring Boot Developer</p>
        </div>
        <div className="footer-meta">
          <div className="social-links">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <a
                className="icon-button"
                href={href}
                key={label}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                title={label}
              >
                <Icon aria-hidden="true" size={18} />
              </a>
            ))}
          </div>
          <small>Copyright {year} Mohammad Rehan Jirayat</small>
        </div>
      </Container>
    </footer>
  )
}
