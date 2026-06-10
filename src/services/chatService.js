import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

/**
 * Send a chat message to the backend.
 * Swap the mock block for the real axios call when the backend is ready.
 *
 * @param {{ message: string, documentId?: string }} payload
 * @returns {Promise<{ answer: string, sources: Array<{ page: number, text: string }> }>}
 */
export async function sendMessage({ message, documentId }) {
  // ─── MOCK ────────────────────────────────────────────────────────────────
  await new Promise((r) => setTimeout(r, 1200))
  return {
    answer:
      'This is a mock AI response. Connect the backend to get real answers from your PDF.',
    sources: [
      { page: 1, text: 'Sample source excerpt from page 1.' },
      { page: 3, text: 'Another relevant excerpt from page 3.' },
    ],
  }
  // ─── REAL (uncomment when backend is ready) ───────────────────────────────
  // const { data } = await axios.post(`${API_BASE_URL}/chat`, {
  //   message,
  //   document_id: documentId,
  // })
  // return data  // expected: { answer, sources: [{ page, text }] }
}
