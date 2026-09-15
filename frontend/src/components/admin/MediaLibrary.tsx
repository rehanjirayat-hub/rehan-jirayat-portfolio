import { useEffect, useState } from 'react'
import { deleteMedia, listMedia } from '../../services/media'
import type { MediaAsset } from '../../types/media'

interface MediaLibraryProps {
  onSuccess: (message: string) => void
  onError: (message: string) => void
}

function formatBytes(bytes?: number) {
  if (!bytes) return ''
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

/** Lightweight media library: thumbnails, filename, dimensions, size, delete. */
export function MediaLibrary({ onSuccess, onError }: MediaLibraryProps) {
  const [assets, setAssets] = useState<MediaAsset[] | null>(null)

  useEffect(() => {
    listMedia()
      .then(setAssets)
      .catch(() => setAssets([]))
  }, [])

  const handleDelete = async (asset: MediaAsset) => {
    try {
      await deleteMedia(asset.id)
      setAssets((current) => (current ? current.filter((item) => item.id !== asset.id) : current))
      onSuccess('Media file deleted.')
    } catch {
      onError('Could not delete that file.')
    }
  }

  return (
    <article className="admin-card">
      <div className="admin-card-body" style={{ border: 'none' }}>
        <p className="admin-field-group-title">Media library</p>
        {assets === null ? (
          <p className="admin-muted">Loading media…</p>
        ) : assets.length === 0 ? (
          <p className="admin-muted">
            No images yet. Upload images from the Projects section — they will appear here.
          </p>
        ) : (
          <ul className="admin-media-grid">
            {assets.map((asset) => (
              <li key={asset.id} className="admin-media-item">
                <span className="admin-media-select">
                  <img src={asset.secureUrl} alt="" loading="lazy" />
                  <span className="admin-media-meta">
                    {asset.originalFilename ?? asset.publicId}
                    {asset.width && asset.height ? ` · ${asset.width}×${asset.height}` : ''}
                    {` · ${formatBytes(asset.bytes)}`}
                  </span>
                </span>
                <button
                  type="button"
                  className="admin-media-delete"
                  onClick={() => handleDelete(asset)}
                  aria-label={`Delete ${asset.originalFilename ?? asset.publicId}`}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}
