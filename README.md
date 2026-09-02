# 🛡️ SafeSense AI

<p align="center">
  <b>AI-Powered Assistive Health & Emergency Safety Platform</b>
</p>

<p align="center">
  Your Safety. Smarter. Faster. Connected.
</p>

<p align="center">
  <a href="https://safesense-ai.vercel.app/sos">🌐 Live Demo</a> •
  <a href="https://github.com/vipinpra09/safesense-ai">💻 GitHub Repository</a>
</p>

---

## 🚨 About SafeSense AI

**SafeSense AI** is an intelligent web-based platform designed to provide **emergency assistance, health support, and safety tools** when users need help the most.

The platform combines **Artificial Intelligence, location services, interactive maps, and emergency-focused features** to create a smarter and more accessible safety assistance experience.

---

## 🎯 Problem Statement

During medical emergencies or dangerous situations, people may struggle to quickly:

- 🚑 Find nearby emergency services
- 📍 Share their location
- 🏥 Locate nearby hospitals
- 🤖 Get immediate AI-powered guidance
- 📞 Access emergency resources quickly

**SafeSense AI** aims to help solve these problems by providing a centralized and intelligent emergency safety platform.

---

# ✨ Features

### 🤖 AI Emergency Assistant

An AI-powered assistant that helps users understand emergency situations and provides general guidance.

### 📍 Location-Based Assistance

Uses location services to identify the user's location and provide location-based safety assistance.

### 🗺️ Interactive Maps

Integrates map functionality to display important locations and improve emergency navigation.

### 🚨 Emergency Support

Provides quick access to emergency-related tools and important safety resources.

### 📱 Responsive Design

Designed to work smoothly across:

- 💻 Desktop
- 📱 Mobile
- 📟 Tablet

### 🔐 Secure API Architecture

Sensitive API keys and credentials are handled securely using server-side environment variables.

---

# 🛠️ Technology Stack

## Frontend

- HTML5
- CSS3
- JavaScript
- Tailwind CSS

## Backend

- Node.js
- Express.js
- Vercel Serverless Functions

## Artificial Intelligence

- Google Gemini API

## Maps & Location

- Google Maps API
- Browser Geolocation API

## Deployment

- Vercel

---

# 📂 Project Structure

```text
SafeSense-ai/
│
├── api/                    # Serverless API functions
│   └── gemini.js           # Gemini AI integration
│
├── public/                 # Static assets
├── src/                    # Application source code
├── .env.example            # Environment variable template
├── .gitignore              # Ignored files and secrets
├── package.json            # Dependencies and scripts
├── vercel.json             # Vercel configuration
└── README.md               # Project documentation
```

---

# 🚀 Getting Started

## Prerequisites

Make sure you have installed:

- Node.js
- npm
- Git

---

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/vipinpra09/safesense-ai.git
```

Move into the project folder:

```bash
cd safesense-ai
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 🧪 Quality Scripts

```bash
npm run lint
npm run lint:fix
npm run format
npm run format:check
npm test
```

---

## 3️⃣ Configure Environment Variables

Create a `.env` file:

```env
GEMINI_API_KEY=your_gemini_api_key_here
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

⚠️ **Never upload your `.env` file or real API keys to GitHub.**

---

# 🔑 APIs Used

### 🤖 Google Gemini API

Used to power the AI Emergency Assistant.

### 🗺️ Google Maps API

Used for map and location-based functionality.

### 📍 Browser Geolocation API

Used to retrieve the user's location after permission is granted.

---

# 🔐 Security

SafeSense AI follows important security practices:

- 🔒 API keys are stored in environment variables
- 🚫 `.env` files are excluded from GitHub
- 🔐 Sensitive credentials are not exposed in frontend code
- 🛡️ Server-side APIs handle sensitive operations
- ✅ User input should be validated
- 🚨 API keys should be restricted in production

### Recommended `.gitignore`

```gitignore
node_modules/
.env
.env.local
.env.production
.vercel/
```

---

# 🌐 Deployment

SafeSense AI is designed to be deployed using **Vercel**.

### 🚀 Live Application

**Try SafeSense AI here:**

👉 https://safesense-ai.vercel.app/sos

### Deployment Steps

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Configure environment variables in Vercel.
4. Deploy the application.

⚠️ Never hardcode API keys inside your source code.

---

# 🗺️ Future Improvements

Planned features include:

- 🚑 Nearby hospital discovery
- 🚓 Nearby police station discovery
- 🆘 One-click SOS functionality
- 📍 Real-time location sharing
- 👨‍👩‍👧 Emergency contact management
- 🔔 Emergency notifications
- 🧠 Improved AI emergency guidance
- 🏥 Medical emergency resources
- 🌙 Dark mode
- 📱 Progressive Web App (PWA) support

---

# ⚠️ Disclaimer

SafeSense AI provides **general assistance and safety-related information**.

It is **not a replacement for professional medical advice, doctors, hospitals, emergency responders, or official emergency services**.

🚨 In a life-threatening emergency, immediately contact your local emergency services.

---

# 🤝 Contributing

Contributions and suggestions are welcome!

1. Fork the repository.
2. Create a new branch.

```bash
git checkout -b feature/your-feature-name
```

3. Make your changes.
4. Commit your changes.

```bash
git commit -m "Add new feature"
```

5. Push your branch.

```bash
git push origin feature/your-feature-name
```

6. Create a Pull Request.

---

# 👨‍💻 Author

**Vipin Prajapati**

- GitHub: https://github.com/vipinpra09

---

## ⭐ Support

If you like this project, please consider giving it a **star ⭐**!

---

<p align="center">
  <b>🛡️ SafeSense AI</b>
  <br>
  <i>Smart Technology for Safer Moments.</i>
</p>
