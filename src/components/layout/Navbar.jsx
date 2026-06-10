/**
 * Navbar
 * Props:
 *   onUploadClick  – opens the upload flow
 *   onMenuClick    – toggles the mobile sidebar
 *   sidebarOpen    – current sidebar open state (controls aria-expanded)
 */
function Navbar({ onUploadClick, onMenuClick, sidebarOpen = false }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-900/95 backdrop-blur">
      <nav className="flex items-center justify-between gap-3 px-3 py-3 sm:px-4 lg:px-6">

        {/* Left: hamburger (mobile only) + brand */}
        <div className="flex items-center gap-2">
          {/* Hamburger — visible only below lg */}
          <button
            type="button"
            onClick={onMenuClick}
            aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={sidebarOpen}
            aria-controls="app-sidebar"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-800 hover:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 lg:hidden"
          >
            {sidebarOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="3" y1="6"  x2="21" y2="6"  />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>

          {/* Brand */}
          <a
            href="/"
            className="flex items-center gap-2.5 text-base font-bold tracking-tight text-white sm:text-lg"
            aria-label="Study Buddy home"
          >
            {/* Logo mark */}
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500 text-xs font-extrabold text-white shadow ring-1 ring-blue-400/30">
              SB
            </span>
            <span className="hidden sm:inline">
              Study{' '}
              <span className="text-blue-400">Buddy</span>
            </span>
          </a>
        </div>

        {/* Right: upload button */}
        <button
          type="button"
          onClick={onUploadClick}
          className="inline-flex min-h-9 items-center gap-2 rounded-lg bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-blue-400/20 transition hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 sm:px-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <span className="hidden sm:inline">Upload PDF</span>
          <span className="sm:hidden">Upload</span>
        </button>
      </nav>
    </header>
  )
}

export default Navbar
