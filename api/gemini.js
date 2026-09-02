/**
 * Vercel Serverless Function: /api/gemini
 * Securely proxies emergency triage requests to Google Gemini API
 */

// Simple in-memory rate limiting map (IP -> { count, resetTime })
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 30;

function checkRateLimit(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  record.count += 1;
  return true;
}

const SYSTEM_PROMPT = `
You are SafeSense AI, a calm, concise, accessibility-first AI emergency assistance & assistive health advisor.
Your primary role is to provide immediate, clear, actionable guidance during health, accident, personal safety, or assistive emergency situations.

CRITICAL SAFETY RULES:
1. NEVER diagnose medical conditions or diseases.
2. NEVER claim to be a doctor, paramedic, or emergency dispatcher.
3. NEVER guarantee medical outcomes or safety.
4. For high-urgency or life-threatening symptoms (chest pain, severe breathing difficulty, uncontrolled bleeding, loss of consciousness, stroke signs, anaphylaxis), IMMEDIATELY recommend contacting official emergency services (911 / 112 / 999).
5. Avoid panic-inducing or overly medical jargon. Use simple, short sentences suitable for someone in distress or with cognitive/visual strain.
6. Provide structured output in clean JSON format adhering strictly to this schema:
{
  "urgency": "low" | "medium" | "high" | "critical",
  "situation_summary": "A 1-2 sentence calm summary of what the user is experiencing",
  "recommended_actions": [
    "Step 1: Immediate physical action or safety measure",
    "Step 2: Key first aid or position advice",
    "Step 3: Communication or alert step"
  ],
  "what_to_tell_responders": [
    "Key detail 1 to tell 911 / paramedics",
    "Key detail 2 (symptoms, duration, allergies)"
  ],
  "important_information": [
    "Critical warning or things to avoid doing"
  ],
  "disclaimer": "SafeSense AI provides assistive guidance only and does not replace professional medical advice, doctors, hospitals, or emergency services."
}
`;

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  // Rate Limiting
  const clientIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
  if (!checkRateLimit(clientIp)) {
    return res.status(429).json({
      error: 'Rate limit exceeded. Please wait a moment before sending another message.'
    });
  }

  try {
    const { prompt, conversationHistory = [], healthSummary = null, locationSummary = null } = req.body || {};

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return res.status(400).json({ error: 'Prompt is required.' });
    }

    if (prompt.length > 2000) {
      return res.status(400).json({ error: 'Prompt is too long (maximum 2000 characters).' });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.warn('GEMINI_API_KEY not configured on server.');
      return res.status(503).json({
        error: 'Gemini API key is not configured on the server. Please add GEMINI_API_KEY to environment variables.',
        isDemoFallbackNeeded: true
      });
    }

    // Build context contents
    let userContext = `USER EMERGENCY DESCRIPTION:\n"${prompt}"\n`;
    if (healthSummary) {
      userContext += `\nOPTIONAL USER MEDICAL PROFILE (provided voluntarily by user):\n${healthSummary}\n`;
    }
    if (locationSummary) {
      userContext += `\nUSER LOCATION CONTEXT:\n${locationSummary}\n`;
    }

    const contents = [
      {
        role: 'user',
        parts: [
          { text: `${SYSTEM_PROMPT}\n\n${userContext}\n\nPlease respond with valid JSON matching the requested structure.` }
        ]
      }
    ];

    // Add prior conversation messages if any
    if (Array.isArray(conversationHistory) && conversationHistory.length > 0) {
      const recent = conversationHistory.slice(-4);
      recent.forEach((msg) => {
        contents.push({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: typeof msg.text === 'string' ? msg.text : JSON.stringify(msg.text) }]
        });
      });
    }

    // Request to Google Gemini API
    const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    
    const geminiRes = await fetch(geminiEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.2, // low temperature for consistent, calm, accurate guidance
          topP: 0.8,
          maxOutputTokens: 1000,
          responseMimeType: 'application/json'
        }
      })
    });

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      console.error('Google Gemini API Error:', geminiRes.status, errText);
      return res.status(502).json({
        error: 'Error communicating with Google Gemini API.',
        details: errText
      });
    }

    const data = await geminiRes.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText) {
      return res.status(500).json({ error: 'No response received from Gemini.' });
    }

    // Clean JSON response (strip markdown blocks if present)
    let cleaned = candidateText.trim();
    if (cleaned.startsWith('```json')) {
      cleaned = cleaned.replace(/^```json/, '').replace(/```$/, '').trim();
    } else if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```/, '').replace(/```$/, '').trim();
    }

    try {
      const parsed = JSON.parse(cleaned);
      return res.status(200).json(parsed);
    } catch {
      // If parsing fails, wrap the raw text gracefully
      return res.status(200).json({
        urgency: 'medium',
        situation_summary: candidateText,
        recommended_actions: ['Stay calm and contact emergency services (911 / 112) if in immediate danger.'],
        what_to_tell_responders: ['Describe your symptoms and exact location.'],
        important_information: ['Keep warm and stay in a safe position.'],
        disclaimer: 'SafeSense AI provides assistive guidance only and does not replace medical diagnosis or emergency 911 services.'
      });
    }
  } catch (error) {
    console.error('Serverless function error:', error);
    return res.status(500).json({
      error: 'An unexpected internal error occurred while processing emergency triage.'
    });
  }
}
