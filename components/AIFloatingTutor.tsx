import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Send, Bot, X, Sparkles, User, Maximize2, Minimize2 } from 'lucide-react';
import { ChatMessage } from '../types';
import { SUBJECTS } from '../constants';
import { createChatSession, sendMessageToGemini, ChatProxy } from '../services/geminiService';
import { useAuth } from '../services/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

// Framer Motion fix for strict TS
const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;

/* ──────────────────────────────────────────────
   Helper: extract lab context from the URL
   ────────────────────────────────────────────── */
function useLabContext() {
  const { pathname } = useLocation();

  return useMemo(() => {
    // URL pattern: /subjects/:subjectId/:labId
    const match = pathname.match(/^\/subjects\/([\w-]+)\/([\w-]+)$/);
    if (!match) return null;

    const [, subjectId, labId] = match;
    const subject = SUBJECTS.find(s => s.id === subjectId);
    if (!subject) return null;
    const lab = subject.labs.find(l => l.id === labId);
    if (!lab) return null;

    // Build a rich context string the AI can understand
    const parts: string[] = [
      `Subject: ${subject.name}`,
      `Experiment: ${lab.title} (${lab.id})`,
      `Category: ${lab.category}`,
      `Difficulty: ${lab.difficulty}`,
      `Duration: ${lab.duration}`,
    ];

    if (lab.content?.aim) parts.push(`Aim: ${lab.content.aim}`);
    if (lab.content?.theory) {
      // Truncate very long theory to ~800 chars to keep token cost down
      let theory = lab.content.theory;
      if (theory.length > 800) {
        theory = theory.slice(0, 800) + '…';
      }
      parts.push(`Theory Summary:\n${theory}`);
    }
    if (lab.content?.procedure?.length) {
      parts.push(`Procedure:\n${lab.content.procedure.map((s, i) => `${i + 1}. ${s}`).join('\n')}`);
    }
    if (lab.content?.requirements?.length) {
      parts.push(`Requirements: ${lab.content.requirements.join(', ')}`);
    }
    if (lab.content?.vivaQuestions?.length) {
      const vivaSnippet = lab.content.vivaQuestions
        .slice(0, 5)
        .map(v => `Q: ${v.question}\nA: ${v.answer}`)
        .join('\n');
      parts.push(`Key Viva Questions:\n${vivaSnippet}`);
    }

    return {
      subjectName: subject.name,
      labTitle: lab.title,
      contextString: parts.join('\n\n'),
    };
  }, [pathname]);
}

/* ──────────────────────────────────────────────
   Main Component
   ────────────────────────────────────────────── */
const AIFloatingTutor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // full-height mode
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user, profileData, loading: authLoading } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const chatSessionRef = useRef<ChatProxy | null>(null);
  // Use a sentinel so the first effect run always creates a session
  const activeContextRef = useRef<string | null>('__UNINITIALIZED__');

  const labContext = useLabContext();
  const location = useLocation();
  const navigate = useNavigate();

  // Don't show the floating tutor on the dedicated /tutor page (avoid duplication)
  const isOnTutorPage = location.pathname === '/tutor';
  // Don't show on login
  const isOnLoginPage = location.pathname === '/login';

  /* ── Session management ──
     We re-create the session when the lab context changes (i.e., the
     user navigates to a different lab), so the AI is always anchored
     to the correct experiment. Chat history resets on context switch. */
  useEffect(() => {
    const newCtx = labContext ? labContext.contextString : null;
    if (newCtx === activeContextRef.current) return; // no change

    activeContextRef.current = newCtx;
    try {
      chatSessionRef.current = createChatSession(newCtx ?? undefined, profileData ?? undefined);
    } catch (e) {
      console.error('Failed to initialise Gemini chat session', e);
      chatSessionRef.current = null;
    }

    // Build welcome message
    let welcomeText: string;
    if (!chatSessionRef.current) {
      welcomeText = '⚠️ AI Tutor could not connect. Please make sure your Gemini API key is set in the `.env.local` file as `VITE_GEMINI_API_KEY=your_key`.';
    } else if (labContext) {
      welcomeText = `👋 Hi! I see you're working on **${labContext.labTitle}** (${labContext.subjectName}). Ask me anything about this experiment — or any other topic!`;
    } else {
      welcomeText = `👋 Hello! I'm your Vijnana Lab AI Tutor. Ask me about any Physics, Chemistry, Biology, Math, or CS experiment!`;
    }

    setMessages([
      {
        id: 'welcome',
        role: 'model',
        text: welcomeText,
        timestamp: Date.now(),
      },
    ]);
  }, [labContext, profileData, navigate]);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  /* ── Send handler ── */
  const handleSend = useCallback(async () => {
    if (!input.trim() || !chatSessionRef.current) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const tempId = 'temp-' + Date.now();
      setMessages(prev => [
        ...prev,
        { id: tempId, role: 'model', text: '', timestamp: Date.now(), isThinking: true },
      ]);

      const result = await sendMessageToGemini(chatSessionRef.current, userMsg.text);

      let fullText = '';
      for await (const chunk of result) {
        const c = chunk as { text: string };
        if (c.text) {
          fullText += c.text;
          setMessages(prev =>
            prev.map(msg =>
              msg.id === tempId ? { ...msg, text: fullText, isThinking: false } : msg
            )
          );
        }
      }
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      let errorMessage = "⚠️ I'm having trouble connecting right now. Please check your internet connection and try again.";
      
      if (error && error.message) {
        if (error.message.includes("429") || error.message.includes("Quota")) {
           errorMessage = "⚠️ Google API Rate Limit Exceeded (429). You are sending messages too fast for the free tier. Please wait 1 minute and try again.";
        } else if (error.message.includes("400") || error.message.includes("API key not valid")) {
           errorMessage = "⚠️ Invalid API Key. Please make sure you have the correct key in your `.env.local` file and that you've refreshed the browser.";
        } else {
           errorMessage = `⚠️ API Error: ${error.message}`;
        }
      }

      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'model',
          text: errorMessage,
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [input]);

  // Don't render on /tutor page or /login page
  if (isOnTutorPage || isOnLoginPage) return null;

  const panelHeight = isExpanded ? 'h-[85vh]' : 'h-[520px]';
  const panelWidth = isExpanded ? 'w-[480px]' : 'w-[380px]';

  return (
    <>
      {/* ────── FLOATING ACTION BUTTON ────── */}
      <AnimatePresence>
        {!isOpen && (
          <MotionButton
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 text-white shadow-lg shadow-purple-600/40 flex items-center justify-center hover:shadow-purple-500/60 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
            aria-label="Open AI Tutor"
            id="ai-tutor-fab"
          >
            <Bot size={24} className="group-hover:rotate-12 transition-transform" />

            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full border-2 border-purple-400 animate-ping opacity-20" />

            {/* Context badge — shows when a lab is active */}
            {labContext && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white flex items-center justify-center">
                <Sparkles size={8} className="text-white" />
              </span>
            )}
          </MotionButton>
        )}
      </AnimatePresence>

      {/* ────── CHAT PANEL ────── */}
      <AnimatePresence>
        {isOpen && (
          <MotionDiv
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className={`fixed bottom-6 right-6 z-40 ${panelWidth} ${panelHeight} flex flex-col rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-white/10 backdrop-blur-xl bg-slate-950/95`}
            id="ai-tutor-panel"
          >
            {/* ── Header ── */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-purple-900/60 to-blue-900/60 border-b border-white/10">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/30 flex-shrink-0">
                  <Bot size={18} className="text-white" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-sm font-bold text-white flex items-center gap-1.5 truncate">
                    AI Lab Tutor <Sparkles size={12} className="text-yellow-400 animate-pulse flex-shrink-0" />
                  </h2>
                  {labContext ? (
                    <p className="text-[10px] text-purple-300 font-mono truncate">
                      📍 {labContext.labTitle}
                    </p>
                  ) : (
                    <p className="text-[10px] text-purple-300/60 font-mono">
                      Gemini AI • General mode
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => setIsExpanded(e => !e)}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                  aria-label={isExpanded ? 'Minimize' : 'Expand'}
                >
                  {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                  aria-label="Close tutor"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* ── Messages area ── */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 custom-scrollbar bg-black/20">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-white ${
                      msg.role === 'model'
                        ? 'bg-gradient-to-br from-purple-600 to-blue-600'
                        : 'bg-blue-600'
                    }`}
                  >
                    {msg.role === 'model' ? <Bot size={13} /> : <User size={13} />}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-sm shadow-lg shadow-blue-600/20'
                        : 'bg-white/[0.07] text-gray-200 rounded-tl-sm border border-white/5'
                    }`}
                  >
                    {msg.isThinking && msg.text === '' ? (
                      <div className="flex gap-1 h-5 items-center py-1">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:75ms]" />
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
                      </div>
                    ) : (
                      <span className="whitespace-pre-wrap break-words">{msg.text}</span>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* ── Quick-action chips (only when on a lab) ── */}
            {labContext && messages.length <= 2 && (
              <div className="px-4 py-2 border-t border-white/5 flex gap-2 overflow-x-auto scrollbar-hide">
                {[
                  'Explain this experiment',
                  'Key formulas?',
                  'Common viva Qs',
                  'Safety tips',
                ].map(chip => (
                  <button
                    key={chip}
                    onClick={() => {
                      setInput(chip);
                      // Auto-send after a tick so the user sees the chip fill the input
                      setTimeout(() => {
                        setInput('');
                        const userMsg: ChatMessage = {
                          id: Date.now().toString(),
                          role: 'user',
                          text: chip,
                          timestamp: Date.now(),
                        };
                        setMessages(prev => [...prev, userMsg]);
                        setIsLoading(true);

                        (async () => {
                          try {
                            if (!chatSessionRef.current) return;
                            const tempId = 'temp-' + Date.now();
                            setMessages(prev => [
                              ...prev,
                              { id: tempId, role: 'model', text: '', timestamp: Date.now(), isThinking: true },
                            ]);
                            const result = await sendMessageToGemini(chatSessionRef.current, chip);
                            let fullText = '';
                            for await (const chunk of result) {
                              const c = chunk as { text: string };
                              if (c.text) {
                                fullText += c.text;
                                setMessages(prev =>
                                  prev.map(m =>
                                    m.id === tempId ? { ...m, text: fullText, isThinking: false } : m
                                  )
                                );
                              }
                            }
                          } catch {
                            setMessages(prev => [
                              ...prev,
                              {
                                id: Date.now().toString(),
                                role: 'model',
                                text: '⚠️ Connection issue. Please try again.',
                                timestamp: Date.now(),
                              },
                            ]);
                          } finally {
                            setIsLoading(false);
                          }
                        })();
                      }, 50);
                    }}
                    disabled={isLoading}
                    className="flex-shrink-0 px-3 py-1.5 rounded-full text-[11px] font-medium bg-purple-500/15 text-purple-300 border border-purple-500/20 hover:bg-purple-500/25 hover:text-purple-200 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}

            {/* ── Input area ── */}
            <div className="px-3 py-3 bg-black/30 border-t border-white/10">
              <div className="relative flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-4 pr-12 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.08] transition-all"
                  placeholder={
                    labContext
                      ? `Ask about ${labContext.labTitle}…`
                      : 'Ask about any experiment…'
                  }
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !isLoading && handleSend()}
                  disabled={isLoading}
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-1.5 w-8 h-8 bg-purple-600 hover:bg-purple-500 rounded-full flex items-center justify-center text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-purple-600/30"
                  aria-label="Send message"
                >
                  <Send size={14} />
                </button>
              </div>
              <p className="text-center text-[9px] text-gray-600 mt-1.5">
                AI can make mistakes. Verify important info.
              </p>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIFloatingTutor;
 
