export interface MediaAsset {
  id: number
  publicId: string
  resourceType: string
  format: string
  originalFilename?: string
  secureUrl: string
  width?: number
  height?: number
  bytes: number
  createdAt?: string
}

export interface ResumeStatus {
  hasResume: boolean
  publicId?: string
  url?: string
  originalFilename?: string
  bytes?: number
  updatedAt?: string
  storageConfigured: boolean
}

export interface PublicResume {
  hasResume: boolean
  url?: string
  originalFilename?: string
  updatedAt?: string
}
