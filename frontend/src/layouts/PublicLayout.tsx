import type { PropsWithChildren } from 'react'
import { Footer } from '../components/layout/Footer'
import { Navbar } from '../components/layout/Navbar'

export function PublicLayout({ children }: PropsWithChildren) {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#home">
        Skip to content
      </a>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
