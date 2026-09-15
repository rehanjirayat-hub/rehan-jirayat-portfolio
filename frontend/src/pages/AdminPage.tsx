import { useEffect, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { clearAdminToken, createExperience, deleteEducation, deleteExperience, deleteProject, deleteSkillCategory, getAdminToken, loadEducation, loadExperience, loadProjects, loadProfile, loadSiteContent, loadSkills, loadSocialLinks, login, saveEducation, saveExperience, saveProject, saveSiteContent, saveSkills, updateProfile, updateSocialLinks } from '../services/admin'
import type { PortfolioProfile, SocialLink } from '../types/profile'
import type { Project } from '../types/projects'
import type { SkillCategory } from '../types/skills'
import type { Education } from '../types/education'
import type { Experience } from '../types/experience'
import type { SiteContent } from '../types/siteContent'
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
  const [experience, setExperience] = useState<Experience[]>([])
  const [siteContent, setSiteContent] = useState<SiteContent | null>(null)

  useEffect(() => {
    if (!token) return
    Promise.all([loadProfile(), loadSocialLinks(), loadProjects(), loadSkills(), loadEducation(), loadExperience(), loadSiteContent()]).then(([nextProfile, nextSocialLinks, nextProjects, nextSkills, nextEducation, nextExperience, nextSiteContent]) => {
      setProfile({ ...nextProfile, socialLinks: nextSocialLinks })
      setProjects(nextProjects)
      setSkills(nextSkills)
      setEducation(nextEducation)
      setExperience(nextExperience)
      setSiteContent(nextSiteContent)
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

  const saveSiteSettings = async (event: FormEvent) => {
    event.preventDefault()
    if (!siteContent) return
    try {
      setSiteContent(await saveSiteContent(siteContent))
      setNotice('Website content saved.')
    } catch { setError('Could not save website content.') }
  }

  const addProject = () => setProjects((items) => [...items, { id: `project-${Date.now()}`, name: 'New project', description: '', status: 'planned', technologies: [], githubUrl: '', overview: '', architecture: '', testing: '', visible: true, displayOrder: items.length }])
  const addSkillCategory = () => setSkills((items) => [...items, { id: `category-${Date.now()}` as SkillCategory['id'], title: 'New category', description: '', emphasis: 'supporting', skills: [], visible: true, displayOrder: items.length }])
  const addEducation = () => setEducation((items) => [...items, { id: `education-${Date.now()}`, degree: 'New degree', institution: '', location: '', startYear: new Date().getFullYear(), endYear: new Date().getFullYear(), status: 'completed', cgpa: 0, visible: true, displayOrder: items.length }])
  const addExperience = async () => {
    setExperience((items) => [...items, { jobTitle: 'New position', company: '', location: '', startDate: '', endDate: '', current: false, description: '', displayOrder: items.length, companyUrl: '', visible: true }])
  }

  const removeProject = async (id: string) => { try { await deleteProject(id); setProjects((items) => items.filter((item) => item.id !== id)); setNotice('Project deleted.') } catch { setError('Could not delete project.') } }
  const removeSkillCategory = async (id: string) => { try { await deleteSkillCategory(id); setSkills((items) => items.filter((item) => item.id !== id)); setNotice('Skill category deleted.') } catch { setError('Could not delete skill category.') } }
  const removeEducation = async (id: string) => { try { await deleteEducation(id); setEducation((items) => items.filter((item) => item.id !== id)); setNotice('Education deleted.') } catch { setError('Could not delete education.') } }
  const removeExperience = async (id: number) => { try { await deleteExperience(id); setExperience((items) => items.filter((item) => item.id !== id)); setNotice('Experience deleted.') } catch { setError('Could not delete experience.') } }

  const updateSiteField = <K extends keyof SiteContent>(field: K, value: SiteContent[K]) => setSiteContent((current) => current ? { ...current, [field]: value } : current)
  const addNavigationItem = () => siteContent && updateSiteField('navigation', [...siteContent.navigation, { label: 'New link', href: '#', isExternal: false, visible: true, displayOrder: siteContent.navigation.length }])

  const saveExperienceRecords = async (event: FormEvent) => {
    event.preventDefault()
    try {
      const saved = await Promise.all(experience.map((item) => item.id ? saveExperience(item) : createExperience(item)))
      setExperience(saved)
      setNotice('Experience saved.')
    } catch { setError('Could not save experience.') }
  }

  const updateLink = (index: number, field: keyof SocialLink, value: string) => {
    setProfile((current) => ({
      ...current,
      socialLinks: current.socialLinks.map((link, linkIndex) =>
        linkIndex === index ? { ...link, [field]: value } : link,
      ),
    }))
  }

  const addSocialLink = () => setProfile((current) => ({ ...current, socialLinks: [...current.socialLinks, { platform: 'website', href: 'https://', label: 'Website profile', visible: true, displayOrder: current.socialLinks.length }] }))
  const removeSocialLink = (index: number) => setProfile((current) => ({ ...current, socialLinks: current.socialLinks.filter((_, linkIndex) => linkIndex !== index).map((link, linkIndex) => ({ ...link, displayOrder: linkIndex })) }))

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

      <div className="admin-panel-action"><button className="admin-primary-button" type="button" onClick={addProject}>Add Project</button></div>
      <AdminCollectionPanel title="Projects" description="Manage projects without changing source code." onSubmit={saveProjects}>
        {projects.map((project, index) => (
          <div className="admin-record" key={project.id}>
            <strong>{project.name}</strong>
            <label><span>Name</span><input value={project.name} onChange={(event) => setProjects(current => current.map((item, itemIndex) => itemIndex === index ? { ...item, name: event.target.value } : item))} /></label>
            <label><span>Short description</span><textarea rows={3} value={project.description} onChange={(event) => setProjects(current => current.map((item, itemIndex) => itemIndex === index ? { ...item, description: event.target.value } : item))} /></label>
            <label><span>Status</span><input value={project.status} onChange={(event) => setProjects(current => current.map((item, itemIndex) => itemIndex === index ? { ...item, status: event.target.value as Project['status'] } : item))} /></label>
            <label><span>GitHub URL</span><input value={project.githubUrl} onChange={(event) => setProjects(current => current.map((item, itemIndex) => itemIndex === index ? { ...item, githubUrl: event.target.value } : item))} /></label>
            <label><span>Overview</span><textarea rows={3} value={project.overview} onChange={(event) => setProjects(current => current.map((item, itemIndex) => itemIndex === index ? { ...item, overview: event.target.value } : item))} /></label>
            <label><span>Architecture</span><textarea rows={2} value={project.architecture} onChange={(event) => setProjects(current => current.map((item, itemIndex) => itemIndex === index ? { ...item, architecture: event.target.value } : item))} /></label>
            <label><span>Testing</span><textarea rows={2} value={project.testing} onChange={(event) => setProjects(current => current.map((item, itemIndex) => itemIndex === index ? { ...item, testing: event.target.value } : item))} /></label>
            <label><span>Technologies, comma-separated</span><input value={project.technologies.map((technology) => technology.name).join(', ')} onChange={(event) => setProjects(current => current.map((item, itemIndex) => itemIndex === index ? { ...item, technologies: event.target.value.split(',').map((name) => name.trim()).filter(Boolean).map((name) => ({ name, category: 'framework' as const })) } : item))} /></label>
            <label><span>Visibility</span><input type="checkbox" checked={project.visible !== false} onChange={(event) => setProjects(current => current.map((item, itemIndex) => itemIndex === index ? { ...item, visible: event.target.checked } : item))} /></label>
            <label><span>Display order</span><input type="number" value={project.displayOrder ?? index} onChange={(event) => setProjects(current => current.map((item, itemIndex) => itemIndex === index ? { ...item, displayOrder: Number(event.target.value) } : item))} /></label>
            <button className="admin-danger-button" type="button" onClick={() => removeProject(project.id)}>Delete project</button>
          </div>
        ))}
      </AdminCollectionPanel>

      <div className="admin-panel-action"><button className="admin-primary-button" type="button" onClick={addSkillCategory}>Add Skill Category</button></div>
      <AdminCollectionPanel title="Skills" description="Manage categories and skills without fixed record limits." onSubmit={saveSkillCategories}>
        {skills.map((category, index) => (
          <div className="admin-record" key={category.id}>
            <strong>{category.title}</strong>
            <label><span>Category title</span><input value={category.title} onChange={(event) => setSkills(current => current.map((item, itemIndex) => itemIndex === index ? { ...item, title: event.target.value } : item))} /></label>
            <label><span>Description</span><input value={category.description} onChange={(event) => setSkills(current => current.map((item, itemIndex) => itemIndex === index ? { ...item, description: event.target.value } : item))} /></label>
            <label><span>Skills, comma-separated</span><input value={category.skills.join(', ')} onChange={(event) => setSkills(current => current.map((item, itemIndex) => itemIndex === index ? { ...item, skills: event.target.value.split(',').map(skill => skill.trim()).filter(Boolean) } : item))} /></label>
            <label><span>Visibility</span><input type="checkbox" checked={category.visible !== false} onChange={(event) => setSkills(current => current.map((item, itemIndex) => itemIndex === index ? { ...item, visible: event.target.checked } : item))} /></label>
            <label><span>Display order</span><input type="number" value={category.displayOrder ?? index} onChange={(event) => setSkills(current => current.map((item, itemIndex) => itemIndex === index ? { ...item, displayOrder: Number(event.target.value) } : item))} /></label>
            <button className="admin-danger-button" type="button" onClick={() => removeSkillCategory(category.id)}>Delete category</button>
          </div>
        ))}
      </AdminCollectionPanel>

      <div className="admin-panel-action"><button className="admin-primary-button" type="button" onClick={addEducation}>Add Education</button></div>
      <AdminCollectionPanel title="Education" description="Manage education records without fixed limits." onSubmit={saveEducationRecords}>
        {education.map((record, index) => (
          <div className="admin-record" key={record.id}>
            <strong>{record.degree}</strong>
            <label><span>Degree</span><input value={record.degree} onChange={(event) => setEducation(current => current.map((item, itemIndex) => itemIndex === index ? { ...item, degree: event.target.value } : item))} /></label>
            <label><span>Institution</span><input value={record.institution} onChange={(event) => setEducation(current => current.map((item, itemIndex) => itemIndex === index ? { ...item, institution: event.target.value } : item))} /></label>
            <label><span>Location</span><input value={record.location} onChange={(event) => setEducation(current => current.map((item, itemIndex) => itemIndex === index ? { ...item, location: event.target.value } : item))} /></label>
            <label><span>Visibility</span><input type="checkbox" checked={record.visible !== false} onChange={(event) => setEducation(current => current.map((item, itemIndex) => itemIndex === index ? { ...item, visible: event.target.checked } : item))} /></label>
            <label><span>Display order</span><input type="number" value={record.displayOrder ?? index} onChange={(event) => setEducation(current => current.map((item, itemIndex) => itemIndex === index ? { ...item, displayOrder: Number(event.target.value) } : item))} /></label>
            <button className="admin-danger-button" type="button" onClick={() => removeEducation(record.id)}>Delete education</button>
          </div>
        ))}
      </AdminCollectionPanel>

      <div className="admin-panel-action"><button className="admin-primary-button" type="button" onClick={addExperience}>Add Experience</button></div>
      <AdminCollectionPanel title="Experience" description="Manage professional experience records without fixed limits." onSubmit={saveExperienceRecords}>
        {experience.map((record, index) => (
          <div className="admin-record" key={record.id}>
            <strong>{record.jobTitle || 'New position'}</strong>
            <label><span>Job title</span><input value={record.jobTitle} onChange={(event) => setExperience(current => current.map((item, itemIndex) => itemIndex === index ? { ...item, jobTitle: event.target.value } : item))} /></label>
            <label><span>Company</span><input value={record.company} onChange={(event) => setExperience(current => current.map((item, itemIndex) => itemIndex === index ? { ...item, company: event.target.value } : item))} /></label>
            <label><span>Location</span><input value={record.location} onChange={(event) => setExperience(current => current.map((item, itemIndex) => itemIndex === index ? { ...item, location: event.target.value } : item))} /></label>
            <label><span>Start date</span><input value={record.startDate} onChange={(event) => setExperience(current => current.map((item, itemIndex) => itemIndex === index ? { ...item, startDate: event.target.value } : item))} /></label>
            <label><span>End date</span><input value={record.endDate ?? ''} onChange={(event) => setExperience(current => current.map((item, itemIndex) => itemIndex === index ? { ...item, endDate: event.target.value } : item))} /></label>
            <label><span>Description</span><textarea rows={3} value={record.description} onChange={(event) => setExperience(current => current.map((item, itemIndex) => itemIndex === index ? { ...item, description: event.target.value } : item))} /></label>
            <label><span>Current position</span><input type="checkbox" checked={record.current} onChange={(event) => setExperience(current => current.map((item, itemIndex) => itemIndex === index ? { ...item, current: event.target.checked } : item))} /></label>
            <label><span>Visible</span><input type="checkbox" checked={record.visible !== false} onChange={(event) => setExperience(current => current.map((item, itemIndex) => itemIndex === index ? { ...item, visible: event.target.checked } : item))} /></label>
            <label><span>Display order</span><input type="number" value={record.displayOrder} onChange={(event) => setExperience(current => current.map((item, itemIndex) => itemIndex === index ? { ...item, displayOrder: Number(event.target.value) } : item))} /></label>
            {record.id ? <button className="admin-danger-button" type="button" onClick={() => removeExperience(record.id as number)}>Delete experience</button> : null}
          </div>
        ))}
      </AdminCollectionPanel>

      {siteContent ? <section className="admin-panel">
        <div className="admin-panel-heading"><div><p className="admin-eyebrow">Website Settings</p><h2>Hero, About, Contact, Footer, and navigation</h2></div></div>
        <form className="admin-form" onSubmit={saveSiteSettings}>
          {(['heroSubtitle', 'heroPrimaryCtaLabel', 'heroPrimaryCtaUrl', 'heroSecondaryCtaLabel', 'heroSecondaryCtaUrl', 'aboutEyebrow', 'aboutHeading', 'aboutParagraphOne', 'aboutParagraphTwo', 'aboutCtaLabel', 'aboutCtaUrl', 'contactHeading', 'contactDescription', 'footerDescription', 'copyrightText', 'siteName', 'professionalTitle'] as const).map((field) => (
            <label className={field.includes('Paragraph') || field === 'aboutHeading' || field === 'contactDescription' ? 'admin-wide-field' : ''} key={field}><span>{field}</span>{field.includes('Paragraph') || field === 'aboutHeading' || field === 'contactDescription' ? <textarea rows={3} value={siteContent[field]} onChange={(event) => updateSiteField(field, event.target.value)} /> : <input value={siteContent[field]} onChange={(event) => updateSiteField(field, event.target.value)} />}</label>
          ))}
          <div className="admin-wide-field"><strong>Navigation</strong><button className="admin-secondary-button" type="button" onClick={addNavigationItem}>Add navigation link</button>{siteContent.navigation.map((item, index) => <div className="admin-link-row" key={`${item.href}-${index}`}><label><span>Label</span><input value={item.label} onChange={(event) => updateSiteField('navigation', siteContent.navigation.map((entry, entryIndex) => entryIndex === index ? { ...entry, label: event.target.value } : entry))} /></label><label><span>Target</span><input value={item.href} onChange={(event) => updateSiteField('navigation', siteContent.navigation.map((entry, entryIndex) => entryIndex === index ? { ...entry, href: event.target.value } : entry))} /></label><label><span>Visible</span><input type="checkbox" checked={item.visible} onChange={(event) => updateSiteField('navigation', siteContent.navigation.map((entry, entryIndex) => entryIndex === index ? { ...entry, visible: event.target.checked } : entry))} /></label><label><span>Order</span><input type="number" value={item.displayOrder} onChange={(event) => updateSiteField('navigation', siteContent.navigation.map((entry, entryIndex) => entryIndex === index ? { ...entry, displayOrder: Number(event.target.value) } : entry))} /></label></div>)}</div>
          <div className="admin-wide-field"><strong>Sections</strong>{siteContent.sections.map((section, index) => <div className="admin-link-row" key={section.id}><label><span>{section.id} visible</span><input type="checkbox" checked={section.visible} onChange={(event) => updateSiteField('sections', siteContent.sections.map((entry, entryIndex) => entryIndex === index ? { ...entry, visible: event.target.checked } : entry))} /></label><label><span>Order</span><input type="number" value={section.displayOrder} onChange={(event) => updateSiteField('sections', siteContent.sections.map((entry, entryIndex) => entryIndex === index ? { ...entry, displayOrder: Number(event.target.value) } : entry))} /></label></div>)}</div>
          <button className="admin-primary-button" type="submit">Save website content</button>
        </form>
      </section> : null}

      <section className="admin-panel">
        <div className="admin-panel-heading">
          <div>
            <p className="admin-eyebrow">Social Links</p>
            <h2>Professional profiles</h2>
          </div>
        </div>
        <button className="admin-secondary-button" type="button" onClick={addSocialLink}>Add social link</button>
        <form className="admin-form" onSubmit={saveSocialLinks}>
          {profile.socialLinks.map((link, index) => (
            <div className="admin-link-row" key={`${link.platform}-${index}`}>
              <label><span>Platform</span><input value={link.platform} onChange={(event) => updateLink(index, 'platform', event.target.value)} required /></label>
              <label><span>URL</span><input value={link.href} onChange={(event) => updateLink(index, 'href', event.target.value)} required /></label>
              <label><span>Display label</span><input value={link.label} onChange={(event) => updateLink(index, 'label', event.target.value)} required /></label>
              <label><span>Visibility</span><input type="checkbox" checked={link.visible !== false} onChange={(event) => setProfile(current => ({ ...current, socialLinks: current.socialLinks.map((item, itemIndex) => itemIndex === index ? { ...item, visible: event.target.checked } : item) }))} /></label>
              <label><span>Display order</span><input type="number" value={link.displayOrder ?? index} onChange={(event) => setProfile(current => ({ ...current, socialLinks: current.socialLinks.map((item, itemIndex) => itemIndex === index ? { ...item, displayOrder: Number(event.target.value) } : item) }))} /></label>
              <button className="admin-danger-button" type="button" onClick={() => removeSocialLink(index)}>Delete link</button>
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