import axios from 'axios'
import type { MediaAsset, ResumeStatus } from '../types/media'
import { getAdminToken } from './admin'

const adminHttp = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { Accept: 'application/json' },
})

adminHttp.interceptors.request.use((config) => {
  const token = getAdminToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export async function listMedia() {
  const response = await adminHttp.get<MediaAsset[]>('/api/admin/media')
  return response.data
}

export async function uploadMedia(
  file: File,
  onProgress?: (percent: number) => void,
): Promise<MediaAsset> {
  const formData = new FormData()
  formData.append('file', file)
  const response = await adminHttp.post<MediaAsset>('/api/admin/media', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (event) => {
      if (onProgress && event.total) onProgress(Math.round((event.loaded / event.total) * 100))
    },
  })
  return response.data
}

export async function deleteMedia(id: number) {
  await adminHttp.delete(`/api/admin/media/${id}`)
}

export async function getResumeStatus() {
  const response = await adminHttp.get<ResumeStatus>('/api/admin/resume')
  return response.data
}

export async function uploadResume(
  file: File,
  onProgress?: (percent: number) => void,
): Promise<ResumeStatus> {
  const formData = new FormData()
  formData.append('file', file)
  const response = await adminHttp.post<ResumeStatus>('/api/admin/resume', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (event) => {
      if (onProgress && event.total) onProgress(Math.round((event.loaded / event.total) * 100))
    },
  })
  return response.data
}

export async function removeResume() {
  await adminHttp.delete('/api/admin/resume')
}
