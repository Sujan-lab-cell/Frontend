import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

/**
 * Upload a PDF file to the backend.
 * Swap the mock block for the real axios call when the backend is ready.
 *
 * @param {File} file
 * @param {{ onProgress?: (pct: number) => void }} options
 * @returns {Promise<{ id: string, name: string, size: number }>}
 */
export async function uploadPdf(file, { onProgress } = {}) {
  // ─── MOCK ────────────────────────────────────────────────────────────────
  return new Promise((resolve, reject) => {
    if (!file) return reject(new Error('No file provided.'))
    let progress = 0
    const timer = setInterval(() => {
      progress = Math.min(progress + 10, 100)
      onProgress?.(progress)
      if (progress === 100) {
        clearInterval(timer)
        resolve({ id: crypto.randomUUID(), name: file.name, size: file.size })
      }
    }, 150)
  })
  // ─── REAL (uncomment when backend is ready) ───────────────────────────────
  // const formData = new FormData()
  // formData.append('file', file)
  // const { data } = await axios.post(`${API_BASE_URL}/upload`, formData, {
  //   headers: { 'Content-Type': 'multipart/form-data' },
  //   onUploadProgress: (e) => {
  //     const pct = Math.round((e.loaded * 100) / (e.total ?? 1))
  //     onProgress?.(pct)
  //   },
  // })
  // return data  // expected: { id, name, size }
}
