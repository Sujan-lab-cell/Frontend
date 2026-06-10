/**
 * Sidebar — space-themed dark UI
 * Functionality unchanged. Purple accents on dark background.
 */

const DUMMY_HISTORY = [
  { id: '1', title: 'Chapter 1 summary' },
  { id: '2', title: 'Research paper notes' },
  { id: '3', title: 'Exam prep questions' },
]

function Sidebar({
  isOpen = false,
  onClose,
  chatHistory = DUMMY_HISTORY,
  children,
  onNewChat,
  onSelectChat,
}) {
  function handleNewChat() {
    onNewChat?.()
    onClose?.()
  }

  function handleSelectChat(chat) {
    onSelectChat?.(chat)
    onClose?.()
  }

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/70 lg:hidden"
          aria-hidden="true"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        id="app-sidebar"
        className={[
          'fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-[#0d0d1a] shadow-2xl transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:static lg:z-auto lg:translate-x-0 lg:shadow-none lg:border-r lg:border-purple-900/40',
        ].join(' ')}
      >
        {/* Close button — mobile only */}
        <div className="flex items-center justify-between border-b border-purple-900/40 p-3 lg:hidden">
          <span className="text-sm font-semibold text-purple-300">Menu</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-purple-400 hover:bg-purple-900/30 hover:text-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#0d0d1a]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* New Chat button */}
        <div className="border-b border-purple-900/40 p-3 sm:p-4">
          <button
            type="button"
            onClick={handleNewChat}
            className="flex min-h-10 w-full items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-purple-500/30 hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-[#0d0d1a]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5"  y1="12" x2="19" y2="12" />
            </svg>
            New Chat
          </button>
        </div>

        {/* Optional slot — e.g. PDFUpload */}
        {children && (
          <div className="border-b border-purple-900/40 p-3 sm:p-4">{children}</div>
        )}

        {/* Chat history */}
        <section className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-4">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-purple-500/70">
            Chat History
          </h2>
          <nav aria-label="Chat history">
            {chatHistory.length === 0 ? (
              <p className="text-sm text-purple-400/50">No chats yet.</p>
            ) : (
              <ul className="space-y-0.5">
                {chatHistory.map((chat) => (
                  <li key={chat.id}>
                    <button
                      type="button"
                      onClick={() => handleSelectChat(chat)}
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-400 hover:bg-purple-900/30 hover:text-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1 focus:ring-offset-[#0d0d1a]"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      <span className="truncate">{chat.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </nav>
        </section>
      </aside>
    </>
  )
}

export default Sidebar
