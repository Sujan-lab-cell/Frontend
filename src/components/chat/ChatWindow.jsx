import { useEffect, useRef } from 'react'
import EmptyState from './EmptyState'

/* ── Subcomponents ───────────────────────────────────────────────────── */

function ThinkingDots() {
  return (
    <span className="flex items-center gap-1" aria-label="Thinking">
      {['-0.3s', '-0.15s', '0s'].map((delay) => (
        <span
          key={delay}
          className="h-2 w-2 animate-bounce rounded-full bg-slate-500"
          style={{ animationDelay: delay }}
        />
      ))}
    </span>
  )
}

function SourceList({ sources }) {
  if (!sources?.length) return null
  return (
    <div className="mt-2 space-y-1 border-t border-slate-700 pt-2">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        Sources
      </p>
      {sources.map((src, i) => (
        <div
          key={i}
          className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-slate-400"
        >
          <span className="font-semibold text-slate-300">Page {src.page}: </span>
          {src.text}
        </div>
      ))}
    </div>
  )
}

function MessageBubble({ message }) {
  const isUser = message.sender === 'user'

  return (
    <article className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      {/* Assistant avatar */}
      {!isUser && (
        <div className="mr-2 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white ring-1 ring-blue-400/30">
          SB
        </div>
      )}

      <div
        className={[
          'max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm sm:max-w-[75%] lg:max-w-[70%]',
          isUser
            ? 'rounded-br-sm bg-blue-500 text-white ring-1 ring-blue-400/20'
            : message.isError
            ? 'rounded-bl-sm border border-red-800 bg-red-950 text-red-400'
            : 'rounded-bl-sm border border-slate-700 bg-slate-800 text-slate-200',
        ].join(' ')}
      >
        {message.isThinking ? (
          <ThinkingDots />
        ) : (
          <>
            <p className="whitespace-pre-wrap">{message.text}</p>
            {!isUser && <SourceList sources={message.sources} />}
          </>
        )}
      </div>
    </article>
  )
}

/* ── Main component ──────────────────────────────────────────────────── */

function ChatWindow({ activeDocument, messages = [], onPromptSelect }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <main className="flex min-h-0 flex-1 flex-col bg-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <h1 className="truncate text-base font-bold text-slate-100 sm:text-lg lg:text-xl">
          {activeDocument ? activeDocument.name : 'Study Buddy'}
        </h1>
        <p className="mt-0.5 truncate text-xs text-slate-500 sm:text-sm">
          {activeDocument
            ? 'Ready to answer your questions.'
            : 'Upload a PDF to get started.'}
        </p>
      </header>

      {/* Message area */}
      <section className="min-h-0 flex-1 overflow-y-auto px-3 py-4 sm:px-4 sm:py-5 lg:px-8 lg:py-6">
        {messages.length === 0 ? (
          <EmptyState onPromptSelect={onPromptSelect} />
        ) : (
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 sm:gap-4">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            <div ref={bottomRef} />
          </div>
        )}
      </section>
    </main>
  )
}

export default ChatWindow
