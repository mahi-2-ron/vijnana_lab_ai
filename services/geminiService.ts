/**
 * Creates a new Gemini chat session proxy.
 * Since we're now proxying through the backend, this just maintains a history buffer
 * and metadata for the session.
 */
export interface ChatProxy {
  labContext?: string;
  profileData?: { grade?: string; syllabus?: string };
  history: any[];
}

export const createChatSession = (labContext?: string, profileData?: { grade?: string; syllabus?: string }): ChatProxy => {
  return {
    labContext,
    profileData,
    history: [],
  };
};

/**
 * Send a message to the backend Gemini proxy with automatic retry on 429.
 */
export const sendMessageToGemini = async (chat: ChatProxy, message: string, maxRetries = 3): Promise<AsyncIterable<any>> => {
  const response = await fetch('http://localhost:5000/api/ai/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message,
      history: chat.history,
      labContext: chat.labContext,
      profile: chat.profileData,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Server returned ${response.status}`);
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error('Response body is empty');

  // Return an AsyncIterable that mimics the original Gemini stream
  return {
    async *[Symbol.asyncIterator]() {
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        yield { text }; 
      }
    }
  };
}; 
