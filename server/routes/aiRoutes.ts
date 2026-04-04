import { Router, Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';

const router = Router();

// Cache system instructions or helper functions if needed
const buildSystemInstruction = (labContext?: string, profile?: { grade?: string; syllabus?: string }): string => {
  const base = `You are **Vijnana Lab AI Tutor** — a friendly, knowledgeable science tutor for Pre-University (Class 11 & 12) students across CBSE, ICSE and Karnataka PUC boards.

CORE BEHAVIOUR RULES:
1. **Be concise by default.** Give short, accurate answers of 2-4 sentences. Only expand into a full detailed explanation if the student explicitly asks for more detail, elaboration, or says "explain in detail".
2. Use simple language and real-world analogies. Avoid jargon unless explaining it.
3. Use emojis sparingly to keep the tone warm (🔬 ⚡ 🧪).
4. For lab experiments: cover aim, theory, procedure, formula, and common viva questions briefly.
5. For Math/CS: provide step-by-step logic.
6. Always cite the correct formula with units.
7. If the student asks about safety, always mention safety precautions relevant to the experiment.
8. If you are unsure, say so honestly rather than guessing.`;

  let contextSnippet = '';
  if (profile?.grade || profile?.syllabus) {
    contextSnippet += `\n\nSTUDENT PROFILE:
The student is in **${profile.grade || 'Unknown Grade'}** following the **${profile.syllabus || 'General NCERT'}** syllabus. Ensure all definitions, formulas, and terminology match this specific curriculum level.`;
  }

  if (labContext) {
    contextSnippet += `\n\nACTIVE EXPERIMENT CONTEXT:
The student currently has the following experiment open in their lab workspace. When they ask a question, assume it relates to THIS experiment unless they explicitly mention a different one.

--- BEGIN LAB CONTEXT ---
${labContext}
--- END LAB CONTEXT ---`;
  }

  return `${base}${contextSnippet}`;
};

/**
 * Helper: sleep for `ms` milliseconds.
 */
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// POST /api/ai/chat — Handle AI chat requests
router.post('/chat', async (req: Request, res: Response) => {
  try {
    const { message, history, labContext, profile } = req.body;
    
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      res.status(500).json({ success: false, error: 'GEMINI_API_KEY not configured on server' });
      return;
    }

    const genAI = new GoogleGenAI({ apiKey });
    const chat = genAI.chats.create({
      model: 'gemini-2.0-flash',
      config: {
        systemInstruction: buildSystemInstruction(labContext, profile),
      },
      history: history || [],
    });

    // Implement retry logic for 429 Errors (Rate Limits)
    let result;
    const maxRetries = 3;
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        result = await chat.sendMessageStream({ message });
        break; // Success, exit loop
      } catch (error: any) {
        const isRateLimit = error?.message?.includes('429') || error?.message?.includes('Quota');
        if (isRateLimit && attempt < maxRetries) {
          const delay = 3000 * Math.pow(2, attempt); // 3s, 6s, 12s
          console.warn(`[AI PROXY] Rate limited (429). Retrying in ${delay / 1000}s... (attempt ${attempt + 1}/${maxRetries})`);
          await sleep(delay);
          continue;
        }
        throw error; // Re-throw if not 429 or retries exhausted
      }
    }

    if (!result) throw new Error('Failed to get result from AI service');
    
    // Set headers for streaming response
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Transfer-Encoding', 'chunked');

    for await (const chunk of result) {
      if (chunk.text) {
        res.write(chunk.text);
      }
    }
    
    res.end();
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Error communicating with AI service' 
    });
  }
});

export default router;
 
