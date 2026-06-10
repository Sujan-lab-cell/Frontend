import { useImperativeHandle, useRef, useState } from 'react'

// ref exposes { openFilePicker } so a parent (e.g. Navbar button) can trigger it directly
function PDFUpload({ onUpload, onUploadComplete, ref }) {
  const inputRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [status, setStatus] = useState('idle') // idle | uploading | success | error
  const [fileName, setFileName] = useState('')
  const [progress, setProgress] = useState(0)
  const [errorMsg, setErrorMsg] = useState('')

  useImperativeHandle(ref, () => ({
    openFilePicker() {
      inputRef.current?.click()
    },
  }))

  function isValidPdf(file) {
    return file?.type === 'application/pdf' || file?.name?.toLowerCase().endsWith('.pdf')
  }

  async function startUpload(file) {
    setFileName(file.name)
    setProgress(0)
    setStatus('uploading')
    setErrorMsg('')
    try {
      const doc = await onUpload?.(file, { onProgress: setProgress })
      setStatus('success')
      onUploadComplete?.(doc)
    } catch (err) {
      setStatus('error')
      setErrorMsg(err?.message || 'Upload failed. Please try again.')
    }
  }

  function handleFile(file) {
    if (!file) return
    if (!isValidPdf(file)) {
      setStatus('error')
      setErrorMsg('Please upload a valid PDF file.')
      return
    }
    startUpload(file)
  }

  function handleDrop(e) {
    e.preventDefault()
    setIsDragging(false)
    handleFile(e.dataTransfer.files?.[0])
  }

  return (
    <section className="w-full rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
      {/* Drop zone */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload PDF by dragging or clicking"
        className={`flex min-h-32 flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-5 text-center transition cursor-pointer sm:min-h-36 ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50/50'
        }`}
        onDragEnter={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf,.pdf"
          className="sr-only"
          onChange={(e) => { handleFile(e.target.files?.[0]); e.target.value = '' }}
        />
        <svg xmlns="http://www.w3.org/2000/svg" className="mb-2 h-8 w-8 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <line x1="10" y1="9" x2="8" y2="9" />
        </svg>
        <p className="text-sm font-semibold text-slate-700">Drag &amp; drop a PDF here</p>
        <p className="mt-1 text-xs text-slate-400">or click to browse</p>
      </div>

      {/* Progress bar */}
      {status === 'uploading' && (
        <div className="mt-4">
          <div className="mb-1.5 flex items-center justify-between text-xs text-slate-600">
            <span className="max-w-[80%] truncate font-medium">{fileName}</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full rounded-full bg-blue-600 transition-all duration-150" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {/* Success */}
      {status === 'success' && (
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-sm text-emerald-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span className="truncate font-medium">{fileName} uploaded</span>
        </div>
      )}

      {/* Error */}
      {status === 'error' && (
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700" role="alert">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {errorMsg}
        </div>
      )}
    </section>
  )
}

export default PDFUpload
