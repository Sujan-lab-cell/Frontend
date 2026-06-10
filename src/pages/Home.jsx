import { useRef, useState } from 'react'
import Navbar from '../components/layout/Navbar'
import Sidebar from '../components/layout/Sidebar'
import PDFUpload from '../components/upload/PDFUpload'
import ChatWindow from '../components/chat/ChatWindow'
import ChatInput from '../components/chat/ChatInput'
import { uploadPdf } from '../services/uploadService'
import { sendMessage } from '../services/chatService'

function Home() {
  const [messages, setMessages]             = useState([])
  const [isLoading, setIsLoading]           = useState(false)
  const [activeDocument, setActiveDocument] = useState(null)
  const [chatHistory, setChatHistory]       = useState([])
  const [sidebarOpen, setSidebarOpen]       = useState(false)
  const uploadRef                           = useRef(null)

  // Called by both the Navbar button and the sidebar slot
  function handleUploadClick() {
    // On mobile: open the sidebar so the user sees the upload widget
    // On desktop: directly trigger the file picker (sidebar always visible)
    if (window.innerWidth < 1024) {
      setSidebarOpen(true)
    } else {
      uploadRef.current?.openFilePicker()
    }
  }

  async function handleSend(text) {
    const trimmed = text.trim()
    if (!trimmed || isLoading) return

    const thinkingId = crypto.randomUUID()

    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), sender: 'user', text: trimmed },
      { id: thinkingId, sender: 'assistant', text: '', isThinking: true },
    ])
    setIsLoading(true)

    try {
      const { answer, sources } = await sendMessage({
        message: trimmed,
        documentId: activeDocument?.id,
      })

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === thinkingId
            ? { ...msg, text: answer, sources, isThinking: false }
            : msg,
        ),
      )

      setChatHistory((prev) => [
        { id: crypto.randomUUID(), title: trimmed.slice(0, 40) },
        ...prev,
      ])
    } catch {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === thinkingId
            ? {
                ...msg,
                text: 'Something went wrong. Please try again.',
                isError: true,
                isThinking: false,
              }
            : msg,
        ),
      )
    } finally {
      setIsLoading(false)
    }
  }

  function handleNewChat() {
    setMessages([])
    setActiveDocument(null)
  }

  return (
    // Prevent body scroll when mobile sidebar is open
    <div className={`flex min-h-screen flex-col bg-slate-50 text-slate-950 ${sidebarOpen ? 'overflow-hidden lg:overflow-auto' : ''}`}>
      <Navbar
        onUploadClick={handleUploadClick}
        onMenuClick={() => setSidebarOpen((v) => !v)}
        sidebarOpen={sidebarOpen}
      />

      {/* Body */}
      <div className="flex min-h-0 flex-1">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          chatHistory={chatHistory}
          onNewChat={handleNewChat}
          onSelectChat={() => {}}
        >
          <PDFUpload
            ref={uploadRef}
            onUpload={uploadPdf}
            onUploadComplete={(doc) => {
              setActiveDocument(doc)
              setSidebarOpen(false)
            }}
          />
        </Sidebar>

        {/* Main — always full width, sidebar overlays on mobile */}
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <ChatWindow
            activeDocument={activeDocument}
            messages={messages}
            onPromptSelect={handleSend}
          />
          <ChatInput onSend={handleSend} isLoading={isLoading} />
        </div>
      </div>
    </div>
  )
}

export default Home
