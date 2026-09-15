import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { deleteMedia, listMedia, uploadMedia } from '../../services/media'
import type { MediaAsset } from '../../types/media'

interface MediaPickerProps {
  value?: string
  onChange: (url: string | undefined) => void
  label: string
}

function formatBytes(bytes?: number) {
  if (!bytes) return ''
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

/**
 * Upload-or-select image picker for CMS forms. Uploads go through the
 * authenticated backend (never direct-to-Cloudinary from the browser).
 */
export function MediaPicker({ value, onChange, label }: MediaPickerProps) {
  const [library, setLibrary] = useState<MediaAsset[]>([])
  const [isLibraryOpen, setIsLibraryOpen] = useState(false)
  const [progress, setProgress] = useState<number | null>(null)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const libraryLoaded = useRef(false)

  useEffect(() => {
    if (isLibraryOpen && !libraryLoaded.current) {
      libraryLoaded.current = true
      listMedia()
        .then(setLibrary)
        .catch(() => setError('Could not load the media library.'))
    }
  }, [isLibraryOpen])

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    setError('')
    setProgress(0)
    try {
      const asset = await uploadMedia(file, setProgress)
      setLibrary((current) => [asset, ...current])
      onChange(asset.secureUrl)
    } catch (uploadError) {
      const message = axiosErrorMessage(uploadError, 'Upload failed. Check the file type and size.')
      setError(message)
    } finally {
      setProgress(null)
    }
  }

  const handleRemoveReference = () => {
    onChange(undefined)
  }

  const handleDeleteAsset = async (asset: MediaAsset) => {
    try {
      await deleteMedia(asset.id)
      setLibrary((current) => current.filter((item) => item.id !== asset.id))
      if (value === asset.secureUrl) onChange(undefined)
    } catch {
      setError('Could not delete that file.')
    }
  }

  return (
    <div className="admin-media-picker">
      <span className="admin-field-label">{label}</span>
      {value ? (
        <div className="admin-media-preview">
          <img src={value} alt={`${label} preview`} />
          <div className="admin-media-preview-actions">
            <button type="button" className="admin-secondary-button" onClick={() => setIsLibraryOpen((open) => !open)}>
              Replace
            </button>
            <button type="button" className="admin-danger-button" onClick={handleRemoveReference}>
              Remove image
            </button>
          </div>
        </div>
      ) : (
        <div className="admin-media-upload">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleUpload}
            aria-label={`Upload ${label}`}
            hidden
          />
          <button
            type="button"
            className="admin-secondary-button"
            onClick={() => fileInputRef.current?.click()}
            disabled={progress !== null}
          >
            {progress !== null ? `Uploading... ${progress}%` : 'Upload image'}
          </button>
          <button type="button" className="admin-secondary-button" onClick={() => setIsLibraryOpen((open) => !open)}>
            {isLibraryOpen ? 'Hide library' : 'Choose from library'}
          </button>
        </div>
      )}

      {progress !== null ? (
        <div className="admin-upload-progress" role="status">
          <div className="admin-upload-progress-bar" style={{ width: `${progress}%` }} />
        </div>
      ) : null}

      {error ? <p className="admin-field-error" role="alert">{error}</p> : null}

      {isLibraryOpen ? (
        <div className="admin-media-library">
          {library.length === 0 ? (
            <p className="admin-muted">No images uploaded yet.</p>
          ) : (
            <ul className="admin-media-grid">
              {library.map((asset) => (
                <li key={asset.id} className="admin-media-item">
                  <button
                    type="button"
                    className="admin-media-select"
                    onClick={() => {
                      onChange(asset.secureUrl)
                      setIsLibraryOpen(false)
                    }}
                    aria-label={`Select ${asset.originalFilename ?? asset.publicId}`}
                  >
                    <img src={asset.secureUrl} alt="" loading="lazy" />
                    <span className="admin-media-meta">
                      {asset.originalFilename ?? asset.publicId}
                      {asset.width && asset.height ? ` · ${asset.width}×${asset.height}` : ''}
                      {` · ${formatBytes(asset.bytes)}`}
                    </span>
                  </button>
                  <button
                    type="button"
                    className="admin-media-delete"
                    onClick={() => handleDeleteAsset(asset)}
                    aria-label={`Delete ${asset.originalFilename ?? asset.publicId}`}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  )
}

function axiosErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string } | undefined
    if (data?.message) return data.message
  }
  return fallback
}
