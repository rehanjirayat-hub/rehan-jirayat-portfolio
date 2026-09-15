import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import {
  clearAdminToken,
  createExperience,
  deleteEducation,
  deleteExperience,
  deleteProject,
  deleteSkillCategory,
  getAdminToken,
  loadEducation,
  loadExperience,
  loadProjects,
  loadProfile,
  loadSiteContent,
  loadSkills,
  loadSocialLinks,
  login,
  saveEducation,
  saveExperience,
  saveProject,
  saveSiteContent,
  saveSkills,
  updateProfile,
  updateSocialLinks,
} from '../services/admin'
import type { PortfolioProfile, SocialLink } from '../types/profile'
import type { Project } from '../types/projects'
import type { SkillCategory } from '../types/skills'
import type { Education } from '../types/education'
import type { Experience } from '../types/experience'
import type { SiteContent } from '../types/siteContent'
import { SectionHeader } from '../components/admin/SectionHeader'
import { ItemCard } from '../components/admin/ItemCard'
import { FormField } from '../components/admin/FormField'
import { EmptyState } from '../components/admin/EmptyState'
import { ConfirmDialog } from '../components/admin/ConfirmDialog'
import { ToastStack, useToasts } from '../components/admin/Toast'
import { MediaPicker } from '../components/admin/MediaPicker'
import { ResumePanel } from '../components/admin/ResumePanel'
import { MediaLibrary } from '../components/admin/MediaLibrary'
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

const NAV_SECTIONS = [
  { id: 'admin-profile', label: 'Profile' },
  { id: 'admin-projects', label: 'Projects' },
  { id: 'admin-skills', label: 'Skills' },
  { id: 'admin-education', label: 'Education' },
  { id: 'admin-experience', label: 'Experience' },
  { id: 'admin-social', label: 'Social Links' },
  { id: 'admin-website', label: 'Website' },
  { id: 'admin-media', label: 'Media & Resume' },
]

function arrayMove<T>(items: T[], from: number, to: number): T[] {
  if (to < 0 || to >= items.length) return items
  const next = [...items]
  const [moved] = next.splice(from, 1)
  next.splice(to, 0, moved)
  return next
}

function withOrder<T extends { displayOrder?: number }>(items: T[]): T[] {
  return items.map((item, index) => ({ ...item, displayOrder: index }))
}

export function AdminPage() {
  const [token, setToken] = useState(getAdminToken())
  const [profile, setProfile] = useState<PortfolioProfile>(emptyProfile)
  const [projects, setProjects] = useState<Project[]>([])
  const [skills, setSkills] = useState<SkillCategory[]>([])
  const [education, setEducation] = useState<Education[]>([])
  const [experience, setExperience] = useState<Experience[]>([])
  const [siteContent, setSiteContent] = useState<SiteContent | null>(null)
  const [expandedKey, setExpandedKey] = useState<string | null>(null)
  const [confirmState, setConfirmState] = useState<{
    title: string
    message: string
    onConfirm: () => void
  } | null>(null)
  const { toasts, success, error } = useToasts()

  useEffect(() => {
    if (!token) return
    Promise.all([
      loadProfile(),
      loadSocialLinks(),
      loadProjects(),
      loadSkills(),
      loadEducation(),
      loadExperience(),
      loadSiteContent(),
    ]).then(([nextProfile, nextSocialLinks, nextProjects, nextSkills, nextEducation, nextExperience, nextSiteContent]) => {
      setProfile({ ...nextProfile, socialLinks: nextSocialLinks })
      setProjects(nextProjects)
      setSkills(nextSkills)
      setEducation(nextEducation)
      setExperience(nextExperience)
      setSiteContent(nextSiteContent)
    }).catch(() => {
      clearAdminToken()
      setToken(null)
    })
  }, [token])

  if (!token) {
    return <AdminLogin onLoggedIn={() => setToken(getAdminToken())} />
  }

  const askConfirm = (title: string, message: string, onConfirm: () => void) =>
    setConfirmState({ title, message, onConfirm })

  const reloadProjects = () => loadProjects().then(setProjects).catch(() => error('Could not reload projects.'))
  const reloadSkills = () => loadSkills().then(setSkills).catch(() => error('Could not reload skills.'))
  const reloadEducation = () => loadEducation().then(setEducation).catch(() => error('Could not reload education.'))
  const reloadExperience = () => loadExperience().then(setExperience).catch(() => error('Could not reload experience.'))

  /* ---------------- Profile ---------------- */

  const saveProfile = async (event: FormEvent) => {
    event.preventDefault()
    try {
      const nextProfile = await updateProfile(profile)
      setProfile((current) => ({ ...nextProfile, socialLinks: current.socialLinks }))
      success('Profile saved.')
    } catch {
      error('Could not save the profile.')
    }
  }

  /* ---------------- Projects ---------------- */

  const addProject = () => {
    setProjects((items) => [
      ...items,
      {
        id: `project-${Date.now()}`,
        name: 'New project',
        description: '',
        status: 'planned',
        technologies: [],
        githubUrl: '',
        overview: '',
        architecture: '',
        testing: '',
        imageUrl: undefined,
        visible: true,
        displayOrder: items.length,
      },
    ])
    setExpandedKey(`project:${projects.length}`)
  }

  const updateProject = (index: number, patch: Partial<Project>) =>
    setProjects((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item)))

  const saveProjectCard = async (index: number) => {
    const project = projects[index]
    try {
      const saved = await saveProject(project)
      setProjects((current) => current.map((item, itemIndex) => (itemIndex === index ? saved : item)))
      success('Project saved.')
      setExpandedKey(null)
    } catch {
      error('Could not save the project. Check the required fields.')
    }
  }

  const toggleProjectVisibility = async (index: number) => {
    const project = { ...projects[index], visible: !(projects[index].visible !== false) }
    setProjects((current) => current.map((item, itemIndex) => (itemIndex === index ? project : item)))
    try {
      await saveProject(project)
      success(project.visible ? 'Project is now visible.' : 'Project is now hidden.')
    } catch {
      updateProject(index, { visible: !project.visible })
      error('Could not change visibility.')
    }
  }

  const moveProject = (index: number, delta: number) => {
    const next = withOrder(arrayMove(projects, index, index + delta))
    setProjects(next)
    setExpandedKey(null)
    Promise.all(next.map(saveProject))
      .then(() => success('Project order saved.'))
      .catch(() => error('Could not save the new order.'))
  }

  const removeProject = (index: number) => {
    const project = projects[index]
    askConfirm('Delete project?', `"${project.name}" will be permanently removed.`, async () => {
      setConfirmState(null)
      try {
        await deleteProject(project.id)
        setProjects((current) => withOrder(current.filter((_, itemIndex) => itemIndex !== index)))
        success('Project deleted.')
      } catch {
        error('Could not delete the project.')
      }
    })
  }

  /* ---------------- Skills ---------------- */

  const addSkillCategory = () => {
    setSkills((items) => [
      ...items,
      {
        id: `category-${Date.now()}`,
        title: 'New category',
        description: '',
        emphasis: 'supporting',
        skills: [],
        visible: true,
        displayOrder: items.length,
      },
    ])
    setExpandedKey(`skill:${skills.length}`)
  }

  const updateSkillCategory = (index: number, patch: Partial<SkillCategory>) =>
    setSkills((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item)))

  const saveSkillCard = async (index: number) => {
    const category = skills[index]
    try {
      const saved = await saveSkills(category)
      setSkills((current) => current.map((item, itemIndex) => (itemIndex === index ? saved : item)))
      success('Skill category saved.')
      setExpandedKey(null)
    } catch {
      error('Could not save the skill category.')
    }
  }

  const toggleSkillVisibility = async (index: number) => {
    const category = { ...skills[index], visible: !(skills[index].visible !== false) }
    setSkills((current) => current.map((item, itemIndex) => (itemIndex === index ? category : item)))
    try {
      await saveSkills(category)
      success(category.visible ? 'Category is now visible.' : 'Category is now hidden.')
    } catch {
      updateSkillCategory(index, { visible: !category.visible })
      error('Could not change visibility.')
    }
  }

  const moveSkillCategory = (index: number, delta: number) => {
    const next = withOrder(arrayMove(skills, index, index + delta))
    setSkills(next)
    setExpandedKey(null)
    Promise.all(next.map(saveSkills))
      .then(() => success('Category order saved.'))
      .catch(() => error('Could not save the new order.'))
  }

  const removeSkillCategory = (index: number) => {
    const category = skills[index]
    askConfirm('Delete skill category?', `"${category.title}" and its skills will be permanently removed.`, async () => {
      setConfirmState(null)
      try {
        await deleteSkillCategory(category.id)
        setSkills((current) => withOrder(current.filter((_, itemIndex) => itemIndex !== index)))
        success('Skill category deleted.')
      } catch {
        error('Could not delete the skill category.')
      }
    })
  }

  /* ---------------- Education ---------------- */

  const addEducation = () => {
    setEducation((items) => [
      ...items,
      {
        id: `education-${Date.now()}`,
        degree: 'New degree',
        institution: '',
        location: '',
        startYear: new Date().getFullYear(),
        endYear: new Date().getFullYear(),
        status: 'completed',
        cgpa: 0,
        visible: true,
        displayOrder: items.length,
      },
    ])
    setExpandedKey(`education:${education.length}`)
  }

  const updateEducation = (index: number, patch: Partial<Education>) =>
    setEducation((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item)))

  const saveEducationCard = async (index: number) => {
    const record = education[index]
    try {
      const saved = await saveEducation(record)
      setEducation((current) => current.map((item, itemIndex) => (itemIndex === index ? saved : item)))
      success('Education saved.')
      setExpandedKey(null)
    } catch {
      error('Could not save the education record. Check the required fields.')
    }
  }

  const toggleEducationVisibility = async (index: number) => {
    const record = { ...education[index], visible: !(education[index].visible !== false) }
    setEducation((current) => current.map((item, itemIndex) => (itemIndex === index ? record : item)))
    try {
      await saveEducation(record)
      success(record.visible ? 'Education is now visible.' : 'Education is now hidden.')
    } catch {
      updateEducation(index, { visible: !record.visible })
      error('Could not change visibility.')
    }
  }

  const moveEducation = (index: number, delta: number) => {
    const next = withOrder(arrayMove(education, index, index + delta))
    setEducation(next)
    setExpandedKey(null)
    Promise.all(next.map(saveEducation))
      .then(() => success('Education order saved.'))
      .catch(() => error('Could not save the new order.'))
  }

  const removeEducationRecord = (index: number) => {
    const record = education[index]
    askConfirm('Delete education record?', `"${record.degree}" will be permanently removed.`, async () => {
      setConfirmState(null)
      try {
        await deleteEducation(record.id)
        setEducation((current) => withOrder(current.filter((_, itemIndex) => itemIndex !== index)))
        success('Education deleted.')
      } catch {
        error('Could not delete the education record.')
      }
    })
  }

  /* ---------------- Experience ---------------- */

  const addExperience = () => {
    setExperience((items) => [
      ...items,
      {
        jobTitle: 'New position',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        displayOrder: items.length,
        companyUrl: '',
        visible: true,
      },
    ])
    setExpandedKey(`experience:${experience.length}`)
  }

  const updateExperience = (index: number, patch: Partial<Experience>) =>
    setExperience((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item)))

  const saveExperienceCard = async (index: number) => {
    const record = experience[index]
    try {
      const saved = record.id ? await saveExperience(record) : await createExperience(record)
      setExperience((current) => current.map((item, itemIndex) => (itemIndex === index ? saved : item)))
      success('Experience saved.')
      setExpandedKey(null)
    } catch {
      error('Could not save the experience record. Check the required fields.')
    }
  }

  const toggleExperienceVisibility = async (index: number) => {
    const record = { ...experience[index], visible: !(experience[index].visible !== false) }
    setExperience((current) => current.map((item, itemIndex) => (itemIndex === index ? record : item)))
    if (!record.id) return
    try {
      const saved = await saveExperience(record)
      setExperience((current) => current.map((item, itemIndex) => (itemIndex === index ? saved : item)))
      success(record.visible ? 'Experience is now visible.' : 'Experience is now hidden.')
    } catch {
      updateExperience(index, { visible: !record.visible })
      error('Could not change visibility.')
    }
  }

  const moveExperience = (index: number, delta: number) => {
    const next = withOrder(arrayMove(experience, index, index + delta))
    setExperience(next)
    setExpandedKey(null)
    Promise.all(
      next
        .filter((record) => record.id)
        .map((record) => saveExperience(record)),
    )
      .then(() => success('Experience order saved.'))
      .catch(() => error('Could not save the new order.'))
  }

  const removeExperienceRecord = (index: number) => {
    const record = experience[index]
    askConfirm('Delete experience record?', `"${record.jobTitle}" will be permanently removed.`, async () => {
      setConfirmState(null)
      try {
        if (record.id) await deleteExperience(record.id)
        setExperience((current) => withOrder(current.filter((_, itemIndex) => itemIndex !== index)))
        success('Experience deleted.')
      } catch {
        error('Could not delete the experience record.')
      }
    })
  }

  /* ---------------- Social links ---------------- */

  const saveSocialLinks = async (event: FormEvent) => {
    event.preventDefault()
    try {
      const nextProfile = await updateSocialLinks(profile.socialLinks)
      setProfile((current) => ({ ...nextProfile, socialLinks: current.socialLinks.map((link, index) => ({ ...link, displayOrder: link.displayOrder ?? index })) }))
      success('Social links saved.')
    } catch {
      error('Could not save social links.')
    }
  }

  const addSocialLink = () =>
    setProfile((current) => ({
      ...current,
      socialLinks: [
        ...current.socialLinks,
        { platform: 'website', href: 'https://', label: 'Website profile', visible: true, displayOrder: current.socialLinks.length },
      ],
    }))

  const updateSocialLink = (index: number, patch: Partial<SocialLink>) =>
    setProfile((current) => ({
      ...current,
      socialLinks: current.socialLinks.map((link, linkIndex) => (linkIndex === index ? { ...link, ...patch } : link)),
    }))

  const moveSocialLink = (index: number, delta: number) =>
    setProfile((current) => ({
      ...current,
      socialLinks: withOrder(arrayMove(current.socialLinks, index, index + delta)),
    }))

  const removeSocialLink = (index: number) =>
    setProfile((current) => ({
      ...current,
      socialLinks: withOrder(current.socialLinks.filter((_, linkIndex) => linkIndex !== index)),
    }))

  /* ---------------- Website settings ---------------- */

  const saveSiteSettings = async (event: FormEvent) => {
    event.preventDefault()
    if (!siteContent) return
    try {
      setSiteContent(await saveSiteContent(siteContent))
      success('Website content saved.')
    } catch {
      error('Could not save website content.')
    }
  }

  const updateSiteField = <K extends keyof SiteContent>(field: K, value: SiteContent[K]) =>
    setSiteContent((current) => (current ? { ...current, [field]: value } : current))

  const addNavigationItem = () =>
    siteContent &&
    updateSiteField('navigation', [
      ...siteContent.navigation,
      { label: 'New link', href: '#', isExternal: false, visible: true, displayOrder: siteContent.navigation.length },
    ])

  const moveNavigationItem = (index: number, delta: number) =>
    siteContent &&
    updateSiteField('navigation', withOrder(arrayMove(siteContent.navigation, index, index + delta)))

  const moveSection = (index: number, delta: number) =>
    siteContent &&
    updateSiteField('sections', withOrder(arrayMove(siteContent.sections, index, index + delta)))

  const siteTextField = (field: keyof SiteContent, label: string, wide = false) => (
    <FormField key={field} label={label} required wide={wide}>
      {wide ? (
        <textarea rows={3} value={String(siteContent?.[field] ?? '')} onChange={(event) => updateSiteField(field, event.target.value as never)} />
      ) : (
        <input value={String(siteContent?.[field] ?? '')} onChange={(event) => updateSiteField(field, event.target.value as never)} />
      )}
    </FormField>
  )

  return (
    <main className="admin-shell">
      <header className="admin-topbar">
        <div className="admin-topbar-inner">
          <span className="admin-brand">
            <span className="admin-brand-mark" aria-hidden="true">MRJ</span>
            <span className="admin-brand-text">
              <strong>Mohammad Rehan Jirayat</strong>
              <span>Portfolio Admin</span>
            </span>
          </span>
          <nav className="admin-nav" aria-label="Admin sections">
            {NAV_SECTIONS.map((section) => (
              <a key={section.id} href={`#${section.id}`}>
                {section.label}
              </a>
            ))}
          </nav>
          <div className="admin-topbar-actions">
            <a className="admin-button admin-secondary-button" href="/">View Website</a>
            <button
              type="button"
              className="admin-button admin-ghost-button"
              onClick={() => {
                clearAdminToken()
                setToken(null)
              }}
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      <div className="admin-main">
        <div className="admin-page-heading">
          <p className="admin-eyebrow">Content dashboard</p>
          <h1>Edit your website</h1>
          <p className="admin-muted">
            Changes here update the live portfolio immediately. Every section below is stored in the
            database — adding items never requires code changes.
          </p>
        </div>

        <ToastStack toasts={toasts} />

        {/* ------------ Profile ------------ */}
        <section className="admin-panel" id="admin-profile">
          <SectionHeader eyebrow="Profile" title="Core portfolio details" />
          <form className="admin-card-form" onSubmit={saveProfile}>
            <FormField label="Full name" required>
              <input value={profile.name} onChange={(event) => setProfile({ ...profile, name: event.target.value })} required />
            </FormField>
            <FormField label="Role" required>
              <input value={profile.role} onChange={(event) => setProfile({ ...profile, role: event.target.value })} required />
            </FormField>
            <FormField label="Specialization" required>
              <input value={profile.specialization} onChange={(event) => setProfile({ ...profile, specialization: event.target.value })} required />
            </FormField>
            <FormField label="Location" required>
              <input value={profile.location} onChange={(event) => setProfile({ ...profile, location: event.target.value })} required />
            </FormField>
            <FormField label="Email" required>
              <input type="email" value={profile.email} onChange={(event) => setProfile({ ...profile, email: event.target.value })} required />
            </FormField>
            <FormField label="Phone" required>
              <input value={profile.phone} onChange={(event) => setProfile({ ...profile, phone: event.target.value })} required />
            </FormField>
            <FormField label="Hero statement" required wide>
              <textarea rows={3} value={profile.heroStatement} onChange={(event) => setProfile({ ...profile, heroStatement: event.target.value })} required />
            </FormField>
            <div className="admin-card-footer">
              <button className="admin-button admin-primary-button" type="submit">Save profile</button>
            </div>
          </form>
        </section>

        {/* ------------ Projects ------------ */}
        <section className="admin-panel" id="admin-projects">
          <SectionHeader
            eyebrow="Projects"
            title="Showcase your work"
            actions={
              <button className="admin-button admin-primary-button" type="button" onClick={addProject}>
                + Add Project
              </button>
            }
          />
          {projects.length === 0 ? (
            <EmptyState
              title="No projects yet"
              description="Add your first project to showcase your work."
              actionLabel="+ Add Project"
              onAction={addProject}
            />
          ) : (
            <div className="admin-card-list">
              {projects.map((project, index) => {
                const expanded = expandedKey === `project:${index}`
                return (
                  <ItemCard
                    key={project.id}
                    title={project.name}
                    subtitle={project.description}
                    visible={project.visible !== false}
                    isFirst={index === 0}
                    isLast={index === projects.length - 1}
                    expanded={expanded}
                    onToggleVisibility={() => toggleProjectVisibility(index)}
                    onToggleExpanded={() => setExpandedKey(expanded ? null : `project:${index}`)}
                    onMoveUp={() => moveProject(index, -1)}
                    onMoveDown={() => moveProject(index, 1)}
                    onDelete={() => removeProject(index)}
                  >
                    <form
                      className="admin-card-form"
                      onSubmit={(event) => {
                        event.preventDefault()
                        void saveProjectCard(index)
                      }}
                    >
                      <p className="admin-field-group-title">Basic information</p>
                      <FormField label="Project name" required>
                        <input value={project.name} onChange={(event) => updateProject(index, { name: event.target.value })} required />
                      </FormField>
                      <FormField label="Status" required>
                        <select value={project.status} onChange={(event) => updateProject(index, { status: event.target.value as Project['status'] })}>
                          <option value="completed">Completed</option>
                          <option value="in-progress">In progress</option>
                          <option value="planned">Planned</option>
                        </select>
                      </FormField>
                      <FormField label="Short description" required wide>
                        <textarea rows={2} value={project.description} onChange={(event) => updateProject(index, { description: event.target.value })} required />
                      </FormField>
                      <FormField label="GitHub URL" required hint="Link to the project repository.">
                        <input value={project.githubUrl} onChange={(event) => updateProject(index, { githubUrl: event.target.value })} required />
                      </FormField>
                      <FormField label="Detailed overview" required wide>
                        <textarea rows={3} value={project.overview} onChange={(event) => updateProject(index, { overview: event.target.value })} required />
                      </FormField>
                      <FormField label="Architecture notes" required wide>
                        <textarea rows={2} value={project.architecture} onChange={(event) => updateProject(index, { architecture: event.target.value })} required />
                      </FormField>
                      <FormField label="Testing notes" required wide>
                        <textarea rows={2} value={project.testing} onChange={(event) => updateProject(index, { testing: event.target.value })} required />
                      </FormField>
                      <p className="admin-field-group-title">Technologies</p>
                      <FormField label="Technologies" wide hint="Comma-separated, e.g. Java, Spring Boot, MySQL">
                        <input
                          value={project.technologies.map((technology) => technology.name).join(', ')}
                          onChange={(event) =>
                            updateProject(index, {
                              technologies: event.target.value
                                .split(',')
                                .map((name) => name.trim())
                                .filter(Boolean)
                                .map((name) => ({ name, category: 'framework' as const })),
                            })
                          }
                        />
                      </FormField>
                      <p className="admin-field-group-title">Publishing</p>
                      <MediaPicker
                        label="Project image"
                        value={project.imageUrl}
                        onChange={(url) => updateProject(index, { imageUrl: url })}
                      />
                      <div className="admin-card-footer">
                        <button type="button" className="admin-button admin-ghost-button" onClick={() => { setExpandedKey(null); void reloadProjects() }}>
                          Cancel
                        </button>
                        <button className="admin-button admin-primary-button" type="submit">Save project</button>
                      </div>
                    </form>
                  </ItemCard>
                )
              })}
            </div>
          )}
        </section>

        {/* ------------ Skills ------------ */}
        <section className="admin-panel" id="admin-skills">
          <SectionHeader
            eyebrow="Skills"
            title="Categories and skills"
            actions={
              <button className="admin-button admin-primary-button" type="button" onClick={addSkillCategory}>
                + Add Skill Category
              </button>
            }
          />
          {skills.length === 0 ? (
            <EmptyState
              title="No skill categories yet"
              description="Add a category to group your skills."
              actionLabel="+ Add Skill Category"
              onAction={addSkillCategory}
            />
          ) : (
            <div className="admin-card-list">
              {skills.map((category, index) => {
                const expanded = expandedKey === `skill:${index}`
                return (
                  <ItemCard
                    key={category.id}
                    title={category.title}
                    subtitle={category.skills.length ? `${category.skills.length} skills` : category.description}
                    visible={category.visible !== false}
                    isFirst={index === 0}
                    isLast={index === skills.length - 1}
                    expanded={expanded}
                    onToggleVisibility={() => toggleSkillVisibility(index)}
                    onToggleExpanded={() => setExpandedKey(expanded ? null : `skill:${index}`)}
                    onMoveUp={() => moveSkillCategory(index, -1)}
                    onMoveDown={() => moveSkillCategory(index, 1)}
                    onDelete={() => removeSkillCategory(index)}
                  >
                    <form
                      className="admin-card-form"
                      onSubmit={(event) => {
                        event.preventDefault()
                        void saveSkillCard(index)
                      }}
                    >
                      <FormField label="Category title" required>
                        <input value={category.title} onChange={(event) => updateSkillCategory(index, { title: event.target.value })} required />
                      </FormField>
                      <FormField label="Emphasis" required hint="Controls how prominently the category is displayed.">
                        <select value={category.emphasis} onChange={(event) => updateSkillCategory(index, { emphasis: event.target.value as SkillCategory['emphasis'] })}>
                          <option value="primary">Primary</option>
                          <option value="secondary">Secondary</option>
                          <option value="supporting">Supporting</option>
                        </select>
                      </FormField>
                      <FormField label="Description" required wide>
                        <input value={category.description} onChange={(event) => updateSkillCategory(index, { description: event.target.value })} required />
                      </FormField>
                      <FormField label="Skills" wide hint="Comma-separated list of skills in this category.">
                        <input
                          value={category.skills.join(', ')}
                          onChange={(event) =>
                            updateSkillCategory(index, {
                              skills: event.target.value.split(',').map((skill) => skill.trim()).filter(Boolean),
                            })
                          }
                        />
                      </FormField>
                      <div className="admin-card-footer">
                        <button type="button" className="admin-button admin-ghost-button" onClick={() => { setExpandedKey(null); void reloadSkills() }}>
                          Cancel
                        </button>
                        <button className="admin-button admin-primary-button" type="submit">Save category</button>
                      </div>
                    </form>
                  </ItemCard>
                )
              })}
            </div>
          )}
        </section>

        {/* ------------ Education ------------ */}
        <section className="admin-panel" id="admin-education">
          <SectionHeader
            eyebrow="Education"
            title="Academic background"
            actions={
              <button className="admin-button admin-primary-button" type="button" onClick={addEducation}>
                + Add Education
              </button>
            }
          />
          {education.length === 0 ? (
            <EmptyState
              title="No education records yet"
              description="Add your first degree or program."
              actionLabel="+ Add Education"
              onAction={addEducation}
            />
          ) : (
            <div className="admin-card-list">
              {education.map((record, index) => {
                const expanded = expandedKey === `education:${index}`
                return (
                  <ItemCard
                    key={record.id}
                    title={record.degree}
                    subtitle={`${record.institution} · ${record.startYear}–${record.endYear}`}
                    visible={record.visible !== false}
                    isFirst={index === 0}
                    isLast={index === education.length - 1}
                    expanded={expanded}
                    onToggleVisibility={() => toggleEducationVisibility(index)}
                    onToggleExpanded={() => setExpandedKey(expanded ? null : `education:${index}`)}
                    onMoveUp={() => moveEducation(index, -1)}
                    onMoveDown={() => moveEducation(index, 1)}
                    onDelete={() => removeEducationRecord(index)}
                  >
                    <form
                      className="admin-card-form"
                      onSubmit={(event) => {
                        event.preventDefault()
                        void saveEducationCard(index)
                      }}
                    >
                      <FormField label="Degree" required>
                        <input value={record.degree} onChange={(event) => updateEducation(index, { degree: event.target.value })} required />
                      </FormField>
                      <FormField label="Institution" required>
                        <input value={record.institution} onChange={(event) => updateEducation(index, { institution: event.target.value })} required />
                      </FormField>
                      <FormField label="University" hint="Affiliating university, if any.">
                        <input value={record.university ?? ''} onChange={(event) => updateEducation(index, { university: event.target.value })} />
                      </FormField>
                      <FormField label="Location" required>
                        <input value={record.location} onChange={(event) => updateEducation(index, { location: event.target.value })} required />
                      </FormField>
                      <FormField label="Status" required>
                        <select value={record.status} onChange={(event) => updateEducation(index, { status: event.target.value as Education['status'] })}>
                          <option value="currently-pursuing">Currently pursuing</option>
                          <option value="completed">Completed</option>
                        </select>
                      </FormField>
                      <FormField label="Website" hint="Institution website link.">
                        <input value={record.website ?? ''} onChange={(event) => updateEducation(index, { website: event.target.value })} />
                      </FormField>
                      <FormField label="Start year" required>
                        <input type="number" value={record.startYear} onChange={(event) => updateEducation(index, { startYear: Number(event.target.value) })} required />
                      </FormField>
                      <FormField label="End year" required>
                        <input type="number" value={record.endYear} onChange={(event) => updateEducation(index, { endYear: Number(event.target.value) })} required />
                      </FormField>
                      <FormField label="Expected end year" hint="For programs still in progress.">
                        <input type="number" value={record.expectedEndYear ?? ''} onChange={(event) => updateEducation(index, { expectedEndYear: event.target.value ? Number(event.target.value) : undefined })} />
                      </FormField>
                      <FormField label="CGPA" hint="Whole number, e.g. 8 for 8.0 CGPA.">
                        <input type="number" value={record.cgpa} onChange={(event) => updateEducation(index, { cgpa: Number(event.target.value) })} />
                      </FormField>
                      <div className="admin-card-footer">
                        <button type="button" className="admin-button admin-ghost-button" onClick={() => { setExpandedKey(null); void reloadEducation() }}>
                          Cancel
                        </button>
                        <button className="admin-button admin-primary-button" type="submit">Save education</button>
                      </div>
                    </form>
                  </ItemCard>
                )
              })}
            </div>
          )}
        </section>

        {/* ------------ Experience ------------ */}
        <section className="admin-panel" id="admin-experience">
          <SectionHeader
            eyebrow="Experience"
            title="Professional experience"
            actions={
              <button className="admin-button admin-primary-button" type="button" onClick={addExperience}>
                + Add Experience
              </button>
            }
          />
          {experience.length === 0 ? (
            <EmptyState
              title="No experience records yet"
              description="Add a position when you are ready — nothing is shown publicly until then."
              actionLabel="+ Add Experience"
              onAction={addExperience}
            />
          ) : (
            <div className="admin-card-list">
              {experience.map((record, index) => {
                const expanded = expandedKey === `experience:${index}`
                return (
                  <ItemCard
                    key={record.id ?? `experience-new-${index}`}
                    title={record.jobTitle}
                    subtitle={`${record.company}${record.current ? ' · Current' : ''}`}
                    visible={record.visible !== false}
                    isFirst={index === 0}
                    isLast={index === experience.length - 1}
                    expanded={expanded}
                    onToggleVisibility={() => toggleExperienceVisibility(index)}
                    onToggleExpanded={() => setExpandedKey(expanded ? null : `experience:${index}`)}
                    onMoveUp={() => moveExperience(index, -1)}
                    onMoveDown={() => moveExperience(index, 1)}
                    onDelete={() => removeExperienceRecord(index)}
                  >
                    <form
                      className="admin-card-form"
                      onSubmit={(event) => {
                        event.preventDefault()
                        void saveExperienceCard(index)
                      }}
                    >
                      <FormField label="Job title" required>
                        <input value={record.jobTitle} onChange={(event) => updateExperience(index, { jobTitle: event.target.value })} required />
                      </FormField>
                      <FormField label="Company" required>
                        <input value={record.company} onChange={(event) => updateExperience(index, { company: event.target.value })} required />
                      </FormField>
                      <FormField label="Location" required>
                        <input value={record.location} onChange={(event) => updateExperience(index, { location: event.target.value })} required />
                      </FormField>
                      <FormField label="Company URL" hint="Company website link.">
                        <input value={record.companyUrl ?? ''} onChange={(event) => updateExperience(index, { companyUrl: event.target.value })} />
                      </FormField>
                      <FormField label="Start date" required hint="e.g. Jan 2025">
                        <input value={record.startDate} onChange={(event) => updateExperience(index, { startDate: event.target.value })} required />
                      </FormField>
                      <FormField label="End date" hint={record.current ? 'Disabled while this is the current position.' : 'e.g. Mar 2026'}>
                        <input
                          value={record.endDate ?? ''}
                          disabled={record.current}
                          onChange={(event) => updateExperience(index, { endDate: event.target.value })}
                        />
                      </FormField>
                      <label className="admin-checkbox admin-field-wide">
                        <input
                          type="checkbox"
                          checked={record.current}
                          onChange={(event) => updateExperience(index, { current: event.target.checked, endDate: event.target.checked ? '' : record.endDate })}
                        />
                        This is my current position
                      </label>
                      <FormField label="Description" required wide>
                        <textarea rows={3} value={record.description} onChange={(event) => updateExperience(index, { description: event.target.value })} required />
                      </FormField>
                      <div className="admin-card-footer">
                        <button type="button" className="admin-button admin-ghost-button" onClick={() => { setExpandedKey(null); void reloadExperience() }}>
                          Cancel
                        </button>
                        <button className="admin-button admin-primary-button" type="submit">Save experience</button>
                      </div>
                    </form>
                  </ItemCard>
                )
              })}
            </div>
          )}
        </section>

        {/* ------------ Social links ------------ */}
        <section className="admin-panel" id="admin-social">
          <SectionHeader
            eyebrow="Social links"
            title="Professional profiles"
            actions={
              <button className="admin-button admin-primary-button" type="button" onClick={addSocialLink}>
                + Add Social Link
              </button>
            }
          />
          {profile.socialLinks.length === 0 ? (
            <EmptyState
              title="No social links yet"
              description="Add GitHub, LinkedIn, or any other profile you want to share."
              actionLabel="+ Add Social Link"
              onAction={addSocialLink}
            />
          ) : (
            <form onSubmit={saveSocialLinks}>
              <div className="admin-card-list">
                {profile.socialLinks.map((link, index) => (
                  <div className="admin-card" key={`${link.platform}-${index}`}>
                    <div className="admin-card-summary">
                      <div className="admin-card-summary-info">
                        <h3 className="admin-card-title">{link.platform}</h3>
                        <p className="admin-card-subtitle">{link.href}</p>
                      </div>
                      <div className="admin-card-summary-actions">
                        <button
                          type="button"
                          role="switch"
                          aria-checked={link.visible !== false}
                          aria-label={`Show or hide ${link.platform}`}
                          className={`admin-visibility-toggle ${link.visible !== false ? 'is-visible' : 'is-hidden'}`}
                          onClick={() => updateSocialLink(index, { visible: !(link.visible !== false) })}
                        >
                          <span className="admin-visibility-track" aria-hidden="true"><span className="admin-visibility-thumb" /></span>
                          <span className="admin-visibility-text">{link.visible !== false ? 'Visible' : 'Hidden'}</span>
                        </button>
                        <button type="button" className="admin-move-button" aria-label={`Move ${link.platform} up`} disabled={index === 0} onClick={() => moveSocialLink(index, -1)}>↑</button>
                        <button type="button" className="admin-move-button" aria-label={`Move ${link.platform} down`} disabled={index === profile.socialLinks.length - 1} onClick={() => moveSocialLink(index, 1)}>↓</button>
                        <button
                          type="button"
                          className="admin-button admin-danger-button"
                          onClick={() =>
                            askConfirm('Delete social link?', `"${link.platform}" will be removed from the website.`, () => {
                              setConfirmState(null)
                              removeSocialLink(index)
                              success('Social link removed. Save to apply.')
                            })
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="admin-card-body">
                      <div className="admin-card-form">
                        <FormField label="Platform" required>
                          <input value={link.platform} onChange={(event) => updateSocialLink(index, { platform: event.target.value })} required />
                        </FormField>
                        <FormField label="Display label" required>
                          <input value={link.label} onChange={(event) => updateSocialLink(index, { label: event.target.value })} required />
                        </FormField>
                        <FormField label="URL" required wide>
                          <input value={link.href} onChange={(event) => updateSocialLink(index, { href: event.target.value })} required />
                        </FormField>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="admin-card-footer" style={{ marginTop: '1rem' }}>
                <button className="admin-button admin-primary-button" type="submit">Save social links</button>
              </div>
            </form>
          )}
        </section>

        {/* ------------ Website settings ------------ */}
        {siteContent ? (
          <section className="admin-panel" id="admin-website">
            <SectionHeader eyebrow="Website settings" title="Hero, About, Contact & Footer" />
            <form className="admin-card-form" onSubmit={saveSiteSettings}>
              <p className="admin-field-group-title">Hero</p>
              {siteTextField('heroSubtitle', 'Hero subtitle')}
              {siteTextField('heroPrimaryCtaLabel', 'Primary button label')}
              {siteTextField('heroPrimaryCtaUrl', 'Primary button link')}
              {siteTextField('heroSecondaryCtaLabel', 'Secondary button label')}
              {siteTextField('heroSecondaryCtaUrl', 'Secondary button link')}
              <p className="admin-field-group-title">About</p>
              {siteTextField('aboutEyebrow', 'About eyebrow')}
              {siteTextField('aboutHeading', 'About heading', true)}
              {siteTextField('aboutParagraphOne', 'About paragraph one', true)}
              {siteTextField('aboutParagraphTwo', 'About paragraph two', true)}
              {siteTextField('aboutCtaLabel', 'About button label')}
              {siteTextField('aboutCtaUrl', 'About button link')}
              <p className="admin-field-group-title">Contact</p>
              {siteTextField('contactHeading', 'Contact heading')}
              {siteTextField('contactDescription', 'Contact description', true)}
              <p className="admin-field-group-title">Footer & site identity</p>
              {siteTextField('footerDescription', 'Footer description')}
              {siteTextField('copyrightText', 'Copyright text')}
              {siteTextField('siteName', 'Site name')}
              {siteTextField('professionalTitle', 'Professional title')}

              <p className="admin-field-group-title">Navigation links</p>
              <div className="admin-field-wide admin-row-list">
                {siteContent.navigation.map((item, index) => (
                  <div className="admin-row" key={`${item.href}-${index}`}>
                    <span className="admin-row-label">{item.label || 'Link'}</span>
                    <label className="admin-field">
                      <span className="admin-field-label">Label</span>
                      <input
                        value={item.label}
                        onChange={(event) =>
                          updateSiteField('navigation', siteContent.navigation.map((entry, entryIndex) => (entryIndex === index ? { ...entry, label: event.target.value } : entry)))
                        }
                      />
                    </label>
                    <label className="admin-field">
                      <span className="admin-field-label">Target</span>
                      <input
                        value={item.href}
                        onChange={(event) =>
                          updateSiteField('navigation', siteContent.navigation.map((entry, entryIndex) => (entryIndex === index ? { ...entry, href: event.target.value } : entry)))
                        }
                      />
                    </label>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={item.visible}
                      aria-label={`Show or hide ${item.label}`}
                      className={`admin-visibility-toggle ${item.visible ? 'is-visible' : 'is-hidden'}`}
                      onClick={() =>
                        updateSiteField('navigation', siteContent.navigation.map((entry, entryIndex) => (entryIndex === index ? { ...entry, visible: !entry.visible } : entry)))
                      }
                    >
                      <span className="admin-visibility-track" aria-hidden="true"><span className="admin-visibility-thumb" /></span>
                      <span className="admin-visibility-text">{item.visible ? 'Visible' : 'Hidden'}</span>
                    </button>
                    <button type="button" className="admin-move-button" aria-label={`Move ${item.label} up`} disabled={index === 0} onClick={() => moveNavigationItem(index, -1)}>↑</button>
                    <button
                      type="button"
                      className="admin-move-button"
                      aria-label={`Move ${item.label} down`}
                      disabled={index === siteContent.navigation.length - 1}
                      onClick={() => moveNavigationItem(index, 1)}
                    >
                      ↓
                    </button>
                  </div>
                ))}
                <div>
                  <button type="button" className="admin-button admin-secondary-button" onClick={addNavigationItem}>+ Add navigation link</button>
                </div>
              </div>

              <p className="admin-field-group-title">Website sections</p>
              <div className="admin-field-wide admin-row-list">
                {siteContent.sections.map((section, index) => (
                  <div className="admin-row" key={section.id}>
                    <span className="admin-row-label">{section.id}</span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={section.visible}
                      aria-label={`Show or hide ${section.id} section`}
                      className={`admin-visibility-toggle ${section.visible ? 'is-visible' : 'is-hidden'}`}
                      onClick={() =>
                        updateSiteField('sections', siteContent.sections.map((entry, entryIndex) => (entryIndex === index ? { ...entry, visible: !entry.visible } : entry)))
                      }
                    >
                      <span className="admin-visibility-track" aria-hidden="true"><span className="admin-visibility-thumb" /></span>
                      <span className="admin-visibility-text">{section.visible ? 'Visible' : 'Hidden'}</span>
                    </button>
                    <button type="button" className="admin-move-button" aria-label={`Move ${section.id} up`} disabled={index === 0} onClick={() => moveSection(index, -1)}>↑</button>
                    <button
                      type="button"
                      className="admin-move-button"
                      aria-label={`Move ${section.id} down`}
                      disabled={index === siteContent.sections.length - 1}
                      onClick={() => moveSection(index, 1)}
                    >
                      ↓
                    </button>
                  </div>
                ))}
              </div>

              <div className="admin-card-footer">
                <button className="admin-button admin-primary-button" type="submit">Save website content</button>
              </div>
            </form>
          </section>
        ) : null}

        {/* ------------ Media & resume ------------ */}
        <section className="admin-panel" id="admin-media">
          <SectionHeader eyebrow="Media & Resume" title="Images and resume file" />
          <div className="admin-card-list">
            <ResumePanel onSuccess={success} onError={error} />
            <MediaLibrary onSuccess={success} onError={error} />
          </div>
        </section>
      </div>

      <ConfirmDialog
        isOpen={confirmState !== null}
        title={confirmState?.title ?? ''}
        message={confirmState?.message ?? ''}
        onConfirm={() => confirmState?.onConfirm()}
        onCancel={() => setConfirmState(null)}
      />
    </main>
  )
}

function AdminLogin({ onLoggedIn }: { onLoggedIn: () => void }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

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
    <main className="admin-login-shell">
      <form className="admin-login-panel" onSubmit={submit}>
        <span className="admin-login-brand">
          <span className="admin-brand-mark" aria-hidden="true">MRJ</span>
          <span className="admin-brand-text">
            <strong>Mohammad Rehan Jirayat</strong>
            <span>Portfolio Admin</span>
          </span>
        </span>
        <h1>Sign in</h1>
        <p className="admin-muted">Manage your portfolio content securely.</p>
        {error ? (
          <p className="admin-field-error" role="alert">
            {error}
          </p>
        ) : null}
        <label className="admin-field">
          <span className="admin-field-label">
            Username<span className="admin-required" aria-hidden="true"> *</span>
          </span>
          <input value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" required />
        </label>
        <label className="admin-field">
          <span className="admin-field-label">
            Password<span className="admin-required" aria-hidden="true"> *</span>
          </span>
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required />
        </label>
        <button className="admin-button admin-primary-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </main>
  )
}
