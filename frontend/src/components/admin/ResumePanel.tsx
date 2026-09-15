import { useRef, useState } from 'react'
import { getResumeStatus, removeResume, uploadResume } from '../../services/media'
import type { ResumeStatus } from '../../types/media'

interface ResumePanelProps {
  onSuccess: (message: string) => void
  onError: (message: string) => void
}

function formatBytes(bytes?: number) {
  if (!bytes) return ''
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

/** Admin resume management: upload/replace/view/remove the single active PDF. */
export function ResumePanel({ onSuccess, onError }: ResumePanelProps) {
  const [status, setStatus] = useState<ResumeStatus | null>(null)
  const [progress, setProgress] = useState<number | null>(null)
  const [loaded, setLoaded] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!loaded) {
    setLoaded(true)
    getResumeStatus().then(setStatus).catch(() => setStatus(null))
  }

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    setProgress(0)
    try {
      const next = await uploadResume(file, setProgress)
      setStatus(next)
      onSuccess('Resume uploaded.')
    } catch (uploadError) {
      onError(uploadErrorMessage(uploadError, 'Upload failed. The file must be a PDF up to 10 MB.'))
    } finally {
      setProgress(null)
    }
  }

  const handleRemove = async () => {
    try {
      await removeResume()
      setStatus((current) => (current ? { ...current, hasResume: false, url: undefined } : current))
      onSuccess('Resume removed.')
    } catch {
      onError('Could not remove the resume.')
    }
  }

  return (
    <article className="admin-card">
      <div className="admin-card-body" style={{ border: 'none' }}>
        <p className="admin-field-group-title">Resume</p>
        {status && !status.storageConfigured ? (
          <p className="admin-field-hint">
            Media storage is not configured yet. Ask the developer to enable the Cloudinary environment
            variables to upload files.
          </p>
        ) : null}
        {status?.hasResume ? (
          <div className="admin-resume-status">
            <span className="admin-resume-file">
              📄 {status.originalFilename ?? 'resume.pdf'}
              {status.bytes ? ` · ${formatBytes(status.bytes)}` : ''}
            </span>
            {status.url ? (
              <a className="admin-button admin-secondary-button" href={status.url} target="_blank" rel="noopener noreferrer">
                View current
              </a>
            ) : null}
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              onChange={handleUpload}
              aria-label="Replace resume PDF"
              hidden
            />
            <button
              type="button"
              className="admin-button admin-secondary-button"
              onClick={() => fileInputRef.current?.click()}
              disabled={progress !== null}
            >
              {progress !== null ? `Uploading... ${progress}%` : 'Replace'}
            </button>
            <button type="button" className="admin-button admin-danger-button" onClick={handleRemove}>
              Remove
            </button>
          </div>
        ) : (
          <div className="admin-resume-status">
            <p className="admin-muted" style={{ margin: 0 }}>No resume uploaded yet.</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              onChange={handleUpload}
              aria-label="Upload resume PDF"
              hidden
            />
            <button
              type="button"
              className="admin-button admin-primary-button"
              onClick={() => fileInputRef.current?.click()}
              disabled={progress !== null || (status ? !status.storageConfigured : false)}
            >
              {progress !== null ? `Uploading... ${progress}%` : 'Upload resume (PDF)'}
            </button>
          </div>
        )}
        {progress !== null ? (
          <div className="admin-upload-progress" role="status">
            <div className="admin-upload-progress-bar" style={{ width: `${progress}%` }} />
          </div>
        ) : null}
      </div>
    </article>
  )
}

export function uploadErrorMessage(error: unknown, fallback: string) {
  if (error && typeof error === 'object' && 'response' in error) {
    const response = (error as { response?: { data?: { message?: string } } }).response
    if (response?.data?.message) return response.data.message
  }
  return fallback
}
