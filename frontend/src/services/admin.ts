import axios from 'axios'
import type { PortfolioProfile, SocialLink } from '../types/profile'
import type { Project } from '../types/projects'
import type { SkillCategory } from '../types/skills'
import type { Education } from '../types/education'
import type { Experience } from '../types/experience'
import type { SiteContent } from '../types/siteContent'

const ADMIN_TOKEN_KEY = 'portfolio_admin_token'

export interface AdminProfileUpdate {
  name: string
  role: string
  specialization: string
  location: string
  email: string
  phone: string
  heroStatement: string
}

export function getAdminToken() {
  return window.sessionStorage.getItem(ADMIN_TOKEN_KEY)
}

export function setAdminToken(token: string) {
  window.sessionStorage.setItem(ADMIN_TOKEN_KEY, token)
}

export function clearAdminToken() {
  window.sessionStorage.removeItem(ADMIN_TOKEN_KEY)
}

const adminHttp = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { Accept: 'application/json' },
})

adminHttp.interceptors.request.use((config) => {
  const token = getAdminToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export async function login(username: string, password: string) {
  const response = await adminHttp.post<{ accessToken: string }>('/api/admin/auth/login', { username, password })
  setAdminToken(response.data.accessToken)
}

export async function loadProfile() {
  const response = await adminHttp.get<PortfolioProfile>('/api/profile')
  return response.data
}

export async function updateProfile(profile: AdminProfileUpdate) {
  const response = await adminHttp.put<PortfolioProfile>('/api/admin/profile', profile)
  return response.data
}

export async function updateSocialLinks(socialLinks: SocialLink[]) {
  const response = await adminHttp.put<PortfolioProfile>('/api/admin/social-links', socialLinks)
  return response.data
}

export async function loadProjects() {
  const response = await adminHttp.get<Project[]>('/api/admin/projects')
  return response.data
}

export async function saveProject(project: Project) {
  const response = await adminHttp.put<Project>(`/api/admin/projects/${project.id}`, project)
  return response.data
}

export async function loadSkills() {
  const response = await adminHttp.get<SkillCategory[]>('/api/admin/skills')
  return response.data
}

export async function saveSkills(category: SkillCategory) {
  const response = await adminHttp.put<SkillCategory>(`/api/admin/skills/${category.id}`, category)
  return response.data
}

export async function loadEducation() {
  const response = await adminHttp.get<Education[]>('/api/admin/education')
  return response.data
}

export async function saveEducation(education: Education) {
  const response = await adminHttp.put<Education>(`/api/admin/education/${education.id}`, education)
  return response.data
}

export async function loadSiteContent() {
  const response = await adminHttp.get<SiteContent>('/api/admin/site-content')
  return response.data
}

export async function saveSiteContent(content: SiteContent) {
  const response = await adminHttp.put<SiteContent>('/api/admin/site-content', content)
  return response.data
}

export async function loadExperience() {
  const response = await adminHttp.get<Experience[]>('/api/admin/experience')
  return response.data
}

export async function createExperience(experience: Omit<Experience, 'id'>) {
  const response = await adminHttp.post<Experience>('/api/admin/experience', experience)
  return response.data
}

export async function saveExperience(experience: Experience) {
  const response = await adminHttp.put<Experience>(`/api/admin/experience/${experience.id}`, experience)
  return response.data
}

export async function deleteExperience(id: number) {
  await adminHttp.delete(`/api/admin/experience/${id}`)
}

export async function deleteProject(id: string) {
  await adminHttp.delete(`/api/admin/projects/${id}`)
}

export async function deleteSkillCategory(id: string) {
  await adminHttp.delete(`/api/admin/skills/${id}`)
}

export async function deleteEducation(id: string) {
  await adminHttp.delete(`/api/admin/education/${id}`)
}

export async function loadSocialLinks() {
  const response = await adminHttp.get<SocialLink[]>('/api/admin/social-links')
  return response.data
}