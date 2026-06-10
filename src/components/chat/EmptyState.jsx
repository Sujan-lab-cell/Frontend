const DEFAULT_PROMPTS = [
  'Summarize this document in simple terms.',
  'What are the most important points?',
  'Create 5 quiz questions from this PDF.',
]

/**
 * Shown in ChatWindow when no messages exist yet.
 *
 * Props:
 *   prompts        – array of example question strings (optional, max 3 shown)
 *   onPromptSelect – called with the question string when a card is clicked
 */
function EmptyState({ prompts = DEFAULT_PROMPTS, onPromptSelect }) {
  return (
    <div className="flex flex-1 items-start justify-center px-3 py-6 sm:px-6 sm:py-10">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-5 text-center shadow-xl sm:p-8 lg:p-10">

        {/* Avatar */}
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500 text-sm font-extrabold text-white shadow ring-1 ring-blue-400/30 sm:h-14 sm:w-14">
          SB
        </div>

        {/* Heading */}
        <h2 className="text-lg font-bold text-slate-100 sm:text-xl lg:text-2xl">
          Welcome to Study Buddy
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
          Upload a PDF, then ask anything about it. Study Buddy reads your
          document and gives you clear, cited answers.
        </p>

        <div className="my-5 border-t border-slate-800 sm:my-6" />

        {/* Example prompts */}
        <p className="mb-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
          Try asking
        </p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
          {prompts.slice(0, 3).map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => onPromptSelect?.(prompt)}
              className="min-h-[4rem] rounded-xl border border-slate-700 bg-slate-800 p-3 text-left text-sm font-medium leading-5 text-slate-400 transition hover:border-blue-500/50 hover:bg-slate-700 hover:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 sm:min-h-[5rem]"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EmptyState
