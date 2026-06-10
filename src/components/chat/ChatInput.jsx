import { useState } from 'react'

function ChatInput({ onSend, isLoading = false }) {
  const [message, setMessage] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = message.trim()
    if (!trimmed || isLoading) return
    onSend?.(trimmed)
    setMessage('')
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) handleSubmit(e)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end gap-2 border-t border-slate-200 bg-white px-3 py-3 sm:gap-3 sm:px-4 sm:py-3 lg:px-8"
    >
      <label htmlFor="chat-input" className="sr-only">
        Ask a question about your PDF
      </label>

      <textarea
        id="chat-input"
        rows={1}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        placeholder="Ask about your PDF…"
        className="min-h-11 flex-1 resize-none rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-600/15 disabled:cursor-not-allowed disabled:opacity-60 sm:px-4 sm:text-base"
      />

      <button
        type="submit"
        disabled={isLoading || !message.trim()}
        aria-label="Send message"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300 sm:w-auto sm:gap-2 sm:px-4"
      >
        {isLoading ? (
          <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        )}
        <span className="hidden text-sm font-semibold sm:inline">
          {isLoading ? 'Thinking…' : 'Send'}
        </span>
      </button>
    </form>
  )
}

export default ChatInput
