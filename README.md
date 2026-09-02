# 🚨 SafeSense AI
### **AI-Powered Assistive Health & Emergency Safety Platform**

> **Help should be available immediately when every second matters.**

SafeSense AI is an emergency safety and assistive health web application designed for immediate, barrier-free access. It requires **zero authentication**, stores all sensitive medical and contact data locally in the browser, and combines **Google Gemini 2.5 Flash** with the browser's Geolocation and Web Speech APIs to assist users in distress, elderly individuals living alone, people with disabilities, and accident victims.

---

## 📌 Problem Statement

During a sudden medical emergency, fall, or safety threat, vulnerable individuals (elderly, disabled, people living alone, accident victims) face critical barriers:
- Mandatory account sign-up and password prompts cause fatal delays.
- Panicked users struggle to convey complex symptoms or remember exact medical details.
- Locating and messaging emergency contacts with exact coordinates takes too long.
- Low-contrast, inaccessible web interfaces fail users with visual, cognitive, or physical impairments.

SafeSense AI solves this by eliminating all authentication barriers, guaranteeing immediate access to 1-tap SOS alerts, AI emergency triage, and local Medical ID cards.

---

## ✨ Key Features

### 1. 🚨 Emergency SOS Command Center
- **Prominent SOS Button**: High-visibility, tactile pulse button with a 3-second abortable countdown (or instant trigger in Quick SOS mode).
- **Live Elapsed Timer**: Active duration tracking for emergency responders.
- **GPS Coordinates Lock**: Browser Geolocation API integration with accuracy ratings and direct Google Maps links.
- **1-Tap Contact Alerts**: Generates pre-filled SMS, WhatsApp, and Phone Call links containing exact coordinates, medical snapshot, and emergency status.
- **First Responder Medical ID**: Instant snapshot displaying Blood Group, Severe Allergies (e.g. EpiPen notes), and critical conditions.

### 2. 🤖 Google Gemini AI Emergency Assistant
- **Calm, Structured Triage**: Evaluates emergency symptoms and categorizes urgency (Low, Medium, High, Critical).
- **Actionable Guidance**: Generates numbered step-by-step first aid actions and exact talking points for 911 / paramedics.
- **Preset Scenarios**: 1-tap presets for falls, chest tightness, anaphylaxis, unconscious bystanders, and personal safety threats.
- **Safe Guardrails**: Strict safety prompt rules preventing medical diagnoses, panic-inducing language, or dangerous home remedies.

### 3. 🎙️ Voice & Hands-Free Interaction
- **Speech-to-Text (STT)**: Web Speech API microphone input with real-time waveform indicator.
- **Text-to-Speech (TTS)**: Reads AI triage instructions aloud with playback rate control (0.75x to 1.5x) for users under physical or cognitive strain.

### 4. 👥 Emergency Contact Management
- Add, edit, prioritize, and delete trusted emergency contacts with built-in phone number validation.
- One-touch emergency test dialing and contact prioritization (Primary Contact tag).
- Stored **100% locally** in browser `LocalStorage`.

### 5. 🏥 Emergency Health Profile (Medical ID)
- Store Blood Group, Allergies, Medical Conditions, Medications, Primary Physician, and Organ Donor status.
- **Print / PDF Medical Card**: Instant 1-click printable physical emergency sheet.
- Strict client-side isolation guarantee.

### 6. 📜 Emergency Session History
- Local audit log of past SOS activations, durations, GPS coordinates, and AI triage summaries.
- Individual record inspection and one-click history clearing.

### 7. ♿ Accessibility-First Design (WCAG 2.2 AA)
- **High Contrast Modes**: Standard, High Contrast Dark (`#000000` with yellow accents), and High Contrast Light (`#ffffff` with pure black borders).
- **Typography Scaling**: Instant base font scaling (Normal 16px, Large 19px, Extra Large 22px).
- **Reduced Motion**: Disables all animations and pulsing effects for vestibular comfort.
- **Keyboard Navigation**: Global keyboard shortcuts (`Alt+S` for SOS, `Alt+A` for AI Assistant, `Alt+D` for Dashboard, `Alt+C` for Contacts, `Alt+H` for Health, `Alt+K` for Accessibility, `Escape` to cancel countdown).
- **Screen Reader Friendly**: ARIA live regions, semantic HTML5, skip-to-content links, and visible focus rings.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite 6, Tailwind CSS, Lucide React, React Router 6 |
| **Backend / Serverless** | Vercel Serverless Functions (`api/gemini.js`), Node.js |
| **AI Engine** | Google Gemini API (`gemini-2.5-flash` with structured JSON output) |
| **Browser APIs** | Geolocation API, Web Speech Recognition (STT), SpeechSynthesis (TTS), LocalStorage |
| **Testing** | Vitest, React Testing Library, JSDOM, User Event |
| **Deployment** | Vercel |

---

## 🤖 Google Technologies Integration

1. **Google Gemini API**:
   - Deployed via secure serverless backend (`/api/gemini`) to protect API keys.
   - Enforces a dedicated emergency system prompt to deliver calm, concise triage and structured JSON output schema.
2. **Google Maps Platform**:
   - Dynamic Google Maps links (`https://www.google.com/maps?q=lat,lon`) generated for first responders and emergency SMS/WhatsApp dispatches.

---

## 🚀 Getting Started Locally

### 1. Prerequisites
- **Node.js** (v18.0.0 or later)
- **npm** (v9.0.0 or later)

### 2. Clone and Install
```bash
git clone https://github.com/your-username/safesense-ai.git
cd safesense-ai
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Add your Google Gemini API key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
GOOGLE_MAPS_API_KEY=your_optional_maps_key
```
> *Note: SafeSense AI includes an intelligent offline triage fallback engine, so the entire application functions even without an API key during local offline development.*

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧪 Running Automated Tests

SafeSense AI includes a complete unit and integration test suite covering the emergency workflow, contact validation, health profile privacy, accessibility attributes, and AI fallback services:

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch
```

---

## 🔒 Security & Privacy Architecture

- **No Authentication / Zero Cloud Tracking**: No sign-in, login, or cookies tracking users across sessions.
- **Client-Side Storage**: Emergency contacts, health profile, accessibility preferences, and history remain strictly inside browser `LocalStorage`.
- **Protected Gemini API**: API keys are accessed only via serverless functions on the backend (`api/gemini.js`) and are never exposed to client-side bundles.
- **Rate Limiting & Input Sanitization**: Backend requests are sanitized and rate-limited to prevent abuse.

---

## ☁️ Deploying to Vercel

1. Push your repository to GitHub / GitLab.
2. Import the project into [Vercel](https://vercel.com).
3. Under **Project Settings → Environment Variables**, add:
   - `GEMINI_API_KEY`: Your Google Gemini API Key.
4. Deploy! Vercel will automatically build the Vite SPA and deploy the `/api/gemini.js` serverless function.

---

## 🔮 Future Enhancements
- Wearable fall-detection sensor pairing via Web Bluetooth.
- Multilingual voice recognition and dialect synthesis.
- Progressive Web App (PWA) offline service workers with installable desktop/mobile icons.
- Cellular direct 911 SMS relay integration where supported by local municipal APIs.

---

## ⚠️ Safety & Medical Disclaimer

> **SafeSense AI provides assistive guidance and emergency preparation only. It does not replace professional medical advice, diagnosis, doctors, hospitals, or official emergency services (911 / 112). In life-threatening emergencies, dial official emergency services immediately.**
