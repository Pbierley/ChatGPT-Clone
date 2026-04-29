# ChatGPT Clone

A full-stack AI chat application built with React, Redux, and Express — featuring user accounts, cloud-synced conversation history, voice I/O, file summarization, and a secure server-side OpenAI integration. Runs in the browser or as a standalone Electron desktop app.

---

## Features

### Core Chat
- Clean chat interface with animated AI responses
- Multiple simultaneous conversations, each independently managed
- Conversation history persisted to the cloud — survives page refresh and browser restarts

### User Accounts & Cloud Sync
- Register and log in with email and password
- Each user's conversations are private and isolated
- Log in from any device and your full history is there

### Model Selection
- Choose the AI model per conversation: GPT-4o mini, GPT-4o, GPT-4.1, or GPT-3.5 Turbo
- Selection is saved to the conversation and remembered across sessions

### Custom AI Persona
- Set a system prompt per conversation to give the AI a specific role or personality
- Persona persists for the lifetime of the conversation

### Conversation Search
- Search bar in the sidebar filters conversations in real time by message content

### File Upload & Summarization
- Attach a PDF or TXT file to any message
- The AI reads the full document and answers questions about it
- File content is shown as a labelled chip in the chat — not raw text

### Voice Input
- Click the microphone button to speak your message
- Transcription appears in the input field in real time
- Works hands-free; stops automatically on silence

### Voice Output
- Every AI message has a speaker button (visible on hover)
- Click to have the response read aloud; click again to stop

### Security
- OpenAI API key lives only on the server — never sent to the browser or bundled into the client
- All API routes are protected with JWT authentication
- Passwords are hashed with bcrypt before storage

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Redux Toolkit, Vite 4 |
| Backend | Node.js, Express 5 |
| Database | MongoDB Atlas |
| Auth | JSON Web Tokens (JWT), bcryptjs |
| AI | OpenAI API (v3 client) |
| Voice | Web Speech API (built-in — no extra packages) |
| File parsing | PDF.js (pdfjs-dist) |
| Desktop | Electron 27 |

---

## Prerequisites

- Node.js 18+
- A [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (free tier works)
- An [OpenAI API key](https://platform.openai.com/api-keys)

---

## Setup

**1. Clone and install dependencies**

```bash
git clone https://github.com/Pbierley/ChatGPT-Clone.git
cd ChatGPT-Clone/7-Standalone_ChatGPT_Clone
npm install
```

**2. Create a `.env` file** in the project root:

```env
OPENAI_API_KEY=sk-...
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/
MONGODB_DB_NAME=ChatGPT-Clone
JWT_SECRET=replace-this-with-a-long-random-string
```

> Never commit `.env` — it is already listed in `.gitignore`.

---

## Running the App

### Browser (recommended for development)

Starts the Express API server and the Vite dev server together:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

### Electron (desktop app)

```bash
npm run electron-dev
```

### Production build (browser)

```bash
npm run build
npm run preview
```

---

## Project Structure

```
7-Standalone_ChatGPT_Clone/
├── server.js                  # Express API — auth, OpenAI proxy, MongoDB CRUD
├── main.js                    # Electron main process
├── preload.js                 # Electron preload script
├── src/
│   ├── App.jsx                # Auth gate + conversation loader
│   ├── LoginPage.jsx          # Register / login UI
│   ├── authSlice.js           # JWT + user Redux state
│   ├── store.js               # Redux store + cloud-save listeners
│   ├── Dashboard/
│   │   ├── dashboardSlice.js  # Conversation state + AI thunks
│   │   ├── dashboard.css      # All styles
│   │   ├── Chat/
│   │   │   ├── ChatSettings.jsx    # Model selector + persona popover
│   │   │   ├── NewMessageInput.jsx # Input bar, file attach, mic button
│   │   │   ├── Message.jsx         # Message bubble + speaker button
│   │   │   └── Messages.jsx        # Scrollable message list
│   │   └── Sidebar/
│   │       ├── Sidebar.jsx         # Search, conversation list, logout
│   │       └── ...
│   └── services/
│       ├── openaiService.js   # POST /api/chat fetch wrapper
│       ├── conversationApi.js # Cloud conversation CRUD
│       ├── authApi.js         # Register / login API calls
│       ├── fileExtractor.js   # PDF + TXT text extraction
│       └── speechService.js   # Web Speech API (STT + TTS)
└── .env                       # Secret keys — not committed
```

---

## Environment Variables

| Variable | Description |
|---|---|
| `OPENAI_API_KEY` | Your OpenAI secret key (server-side only) |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `MONGODB_DB_NAME` | Database name (e.g. `ChatGPT-Clone`) |
| `JWT_SECRET` | Random secret for signing auth tokens |

No `VITE_` prefixed variables are needed — the API key never touches the client.
