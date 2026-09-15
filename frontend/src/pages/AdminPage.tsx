import { useEffect, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { clearAdminToken, getAdminToken, loadEducation, loadProjects, loadProfile, loadSkills, login, saveEducation, saveProject, saveSkills, updateProfile, updateSocialLinks } from '../services/admin'
import type { PortfolioProfile, SocialLink } from '../types/profile'
import type { Project } from '../types/projects'
import type { SkillCategory } from '../types/skills'
import type { Education } from '../types/education'
import './admin.css'

const emptyProfile: PortfolioProfile = {
  name: '',
  role: '',
  specialization: '',
  location: '',
  email: '',
  phone: '',
  heroStatement: '',
  socialLinks: [],
}

export function AdminPage() {
  const [token, setToken] = useState(getAdminToken())
  const [profile, setProfile] = useState<PortfolioProfile>(emptyProfile)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [projects, setProjects] = useState<Project[]>([])
  const [skills, setSkills] = useState<SkillCategory[]>([])
  const [education, setEducation] = useState<Education[]>([])

  useEffect(() => {
    if (!token) return
    Promise.all([loadProfile(), loadProjects(), loadSkills(), loadEducation()]).then(([nextProfile, nextProjects, nextSkills, nextEducation]) => {
      setProfile(nextProfile)
      setProjects(nextProjects)
      setSkills(nextSkills)
      setEducation(nextEducation)
    }).catch(() => {
      clearAdminToken()
      setToken(null)
      setError('Your session has expired. Please sign in again.')
    })
  }, [token])

  if (!token) {
    return <AdminLogin onLoggedIn={() => setToken(getAdminToken())} error={error} setError={setError} />
  }

  const saveProfile = async (event: FormEvent) => {
    event.preventDefault()
    setError('')
    setNotice('')
    try {
      const nextProfile = await updateProfile(profile)
      setProfile(nextProfile)
      setNotice('Profile saved.')
    } catch {
      setError('Could not save the profile.')
    }
  }

  const saveSocialLinks = async (event: FormEvent) => {
    event.preventDefault()
    setError('')
    setNotice('')
    try {
      const nextProfile = await updateSocialLinks(profile.socialLinks)
      setProfile(nextProfile)
      setNotice('Social links saved.')
    } catch {
      setError('Could not save social links.')
    }
  }

  const saveProjects = async (event: FormEvent) => {
    event.preventDefault()
    try {
      const saved = await Promise.all(projects.map(saveProject))
      setProjects(saved)
      setNotice('Projects saved.')
    } catch {
      setError('Could not save projects.')
    }
  }

  const saveSkillCategories = async (event: FormEvent) => {
    event.preventDefault()
    try {
      const saved = await Promise.all(skills.map(saveSkills))
      setSkills(saved)
      setNotice('Skills saved.')
    } catch {
      setError('Could not save skills.')
    }
  }

  const saveEducationRecords = async (event: FormEvent) => {
    event.preventDefault()
    try {
      const saved = await Promise.all(education.map(saveEducation))
      setEducation(saved)
      setNotice('Education saved.')
    } catch {
      setError('Could not save education.')
    }
  }

  const updateLink = (index: number, field: keyof SocialLink, value: string) => {
    setProfile((current) => ({
      ...current,
      socialLinks: current.socialLinks.map((link, linkIndex) =>
        linkIndex === index ? { ...link, [field]: value } : link,
      ),
    }))
  }

  return (
    <main className="admin-shell">
      <header className="admin-header">
        <div>
          <p className="admin-eyebrow">Portfolio Admin</p>
          <h1>Content dashboard</h1>
        </div>
        <button type="button" className="admin-secondary-button" onClick={() => { clearAdminToken(); setToken(null) }}>
          Log out
        </button>
      </header>

      {error ? <p className="admin-feedback admin-error">{error}</p> : null}
      {notice ? <p className="admin-feedback admin-success">{notice}</p> : null}

      <section className="admin-panel">
        <div className="admin-panel-heading">
          <div>
            <p className="admin-eyebrow">Profile</p>
            <h2>Core portfolio details</h2>
          </div>
        </div>
        <form className="admin-form" onSubmit={saveProfile}>
          {(['name', 'role', 'specialization', 'location', 'email', 'phone'] as const).map((field) => (
            <label key={field}>
              <span>{field === 'name' ? 'Full name' : field[0].toUpperCase() + field.slice(1)}</span>
              <input value={profile[field]} onChange={(event) => setProfile({ ...profile, [field]: event.target.value })} required />
            </label>
          ))}
          <label className="admin-wide-field">
            <span>Hero statement</span>
            <textarea value={profile.heroStatement} onChange={(event) => setProfile({ ...profile, heroStatement: event.target.value })} required rows={4} />
          </label>
          <button className="admin-primary-button" type="submit">Save profile</button>
        </form>
      </section>

      <AdminCollectionPanel title="Projects" description="Edit the projects already published on the portfolio." onSubmit={saveProjects}>
        {projects.map((project, index) => (
          <div className="admin-record" key={project.id}>
            <strong>{project.name}</strong>
            <label><span>Name</span><input value={project.name} onChange={(event) => setProjects(current => current.map((item, itemIndex) => itemIndex === index ? { ...item, name: event.target.value } : item))} /></label>
            <label><span>Short description</span><textarea rows={3} value={project.description} onChange={(event) => setProjects(current => current.map((item, itemIndex) => itemIndex === index ? { ...item, description: event.target.value } : item))} /></label>
            <label><span>GitHub URL</span><input value={project.githubUrl} onChange={(event) => setProjects(current => current.map((item, itemIndex) => itemIndex === index ? { ...item, githubUrl: event.target.value } : item))} /></label>
          </div>
        ))}
      </AdminCollectionPanel>

      <AdminCollectionPanel title="Skills" description="Edit the existing skill categories and their skill lists." onSubmit={saveSkillCategories}>
        {skills.map((category, index) => (
          <div className="admin-record" key={category.id}>
            <strong>{category.title}</strong>
            <label><span>Category title</span><input value={category.title} onChange={(event) => setSkills(current => current.map((item, itemIndex) => itemIndex === index ? { ...item, title: event.target.value } : item))} /></label>
            <label><span>Description</span><input value={category.description} onChange={(event) => setSkills(current => current.map((item, itemIndex) => itemIndex === index ? { ...item, description: event.target.value } : item))} /></label>
            <label><span>Skills, comma-separated</span><input value={category.skills.join(', ')} onChange={(event) => setSkills(current => current.map((item, itemIndex) => itemIndex === index ? { ...item, skills: event.target.value.split(',').map(skill => skill.trim()).filter(Boolean) } : item))} /></label>
          </div>
        ))}
      </AdminCollectionPanel>

      <AdminCollectionPanel title="Education" description="Edit the education records already shown publicly." onSubmit={saveEducationRecords}>
        {education.map((record, index) => (
          <div className="admin-record" key={record.id}>
            <strong>{record.degree}</strong>
            <label><span>Degree</span><input value={record.degree} onChange={(event) => setEducation(current => current.map((item, itemIndex) => itemIndex === index ? { ...item, degree: event.target.value } : item))} /></label>
            <label><span>Institution</span><input value={record.institution} onChange={(event) => setEducation(current => current.map((item, itemIndex) => itemIndex === index ? { ...item, institution: event.target.value } : item))} /></label>
            <label><span>Location</span><input value={record.location} onChange={(event) => setEducation(current => current.map((item, itemIndex) => itemIndex === index ? { ...item, location: event.target.value } : item))} /></label>
          </div>
        ))}
      </AdminCollectionPanel>

      <section className="admin-panel">
        <div className="admin-panel-heading">
          <div>
            <p className="admin-eyebrow">Social Links</p>
            <h2>Professional profiles</h2>
          </div>
        </div>
        <form className="admin-form" onSubmit={saveSocialLinks}>
          {profile.socialLinks.map((link, index) => (
            <div className="admin-link-row" key={`${link.platform}-${index}`}>
              <label><span>Platform</span><input value={link.platform} onChange={(event) => updateLink(index, 'platform', event.target.value)} required /></label>
              <label><span>URL</span><input value={link.href} onChange={(event) => updateLink(index, 'href', event.target.value)} required /></label>
              <label><span>Display label</span><input value={link.label} onChange={(event) => updateLink(index, 'label', event.target.value)} required /></label>
            </div>
          ))}
          <button className="admin-primary-button" type="submit">Save social links</button>
        </form>
      </section>
    </main>
  )
}

function AdminLogin({ onLoggedIn, error, setError }: { onLoggedIn: () => void; error: string; setError: (value: string) => void }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)
    setError('')
    try {
      await login(username, password)
      onLoggedIn()
    } catch {
      setError('Invalid admin credentials.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="admin-shell admin-login-shell">
      <form className="admin-login-panel" onSubmit={submit}>
        <p className="admin-eyebrow">Portfolio Admin</p>
        <h1>Sign in</h1>
        <p className="admin-muted">Manage your portfolio content securely.</p>
        {error ? <p className="admin-feedback admin-error">{error}</p> : null}
        <label><span>Username</span><input value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" required /></label>
        <label><span>Password</span><input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required /></label>
        <button className="admin-primary-button" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Signing in...' : 'Sign in'}</button>
      </form>
    </main>
  )
}

function AdminCollectionPanel({ title, description, onSubmit, children }: { title: string; description: string; onSubmit: (event: FormEvent) => void; children: ReactNode }) {
  return (
    <section className="admin-panel">
      <div className="admin-panel-heading"><div><p className="admin-eyebrow">{title}</p><h2>{description}</h2></div></div>
      <form className="admin-form" onSubmit={onSubmit}>
        {children}
        <button className="admin-primary-button" type="submit">Save {title.toLowerCase()}</button>
      </form>
    </section>
  )
}