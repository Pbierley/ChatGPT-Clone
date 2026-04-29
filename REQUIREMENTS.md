# ChatGPT Clone — Software Requirements Specification

**Project:** ChatGPT Clone  
**Author:** Philip Bierley  
**Course:** ASE 285 — NKU  
**Status:** All requirements implemented and verified ✅

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Sprint 1 Requirements](#2-sprint-1-requirements)
3. [Sprint 2 Requirements](#3-sprint-2-requirements)
4. [Requirements Completion Summary](#4-requirements-completion-summary)

---

## 1. Project Overview

### 1.1 Purpose
Build a full-stack AI chat application that replicates and extends the core ChatGPT experience — featuring user authentication, cloud-synced conversations, multiple AI model options, file intelligence, and voice interaction.

### 1.2 Scope
The application runs in a web browser and as a standalone Electron desktop app. All AI requests are routed through a secure backend server. User data is stored in MongoDB Atlas and scoped per authenticated user.

### 1.3 Definitions

| Term | Definition |
|---|---|
| Conversation | A named chat thread containing an ordered list of messages |
| Message | A single user or AI turn within a conversation |
| Persona | A system-level instruction that shapes AI behavior for a conversation |
| JWT | JSON Web Token — a signed credential used to authenticate API requests |

---

## 2. Sprint 1 Requirements

### REQ-01 — React-Based Frontend

**Description:** The application shall be built as a single-page application using React 18.

**Acceptance Criteria:**
- [ AC1 ] The UI renders in a modern browser without errors
- [ AC2 ] Components are organized in a modular folder structure
- [ AC3 ] The chat interface displays user and AI messages in distinct styles
- [ AC4 ] The sidebar lists all conversations and allows switching between them

**Status:** ✅ Complete  
**Implementation:** `src/Dashboard/`, `src/App.jsx`, `index.html`

---

### REQ-02 — Redux State Management

**Description:** Application state shall be managed globally using Redux Toolkit, including conversations, selected conversation, and loading state.

**Acceptance Criteria:**
- [ AC1 ] Conversation list is held in Redux store, not local component state
- [ AC2 ] Selecting a conversation updates the store and re-renders the chat view
- [ AC3 ] Loading state is tracked during AI requests and reflected in the UI
- [ AC4 ] Dispatching `resetDashboard` clears all conversation state

**Status:** ✅ Complete  
**Implementation:** `src/Dashboard/dashboardSlice.js`, `src/store.js`

---

### REQ-03 — Direct AI API Integration

**Description:** The application shall send user messages to the OpenAI Chat Completions API and display the response.

**Acceptance Criteria:**
- [ AC1 ] Sending a message produces an AI reply within the same conversation
- [ AC2 ] The full conversation history is included in each API request for context
- [ AC3 ] Errors from the API are caught and displayed gracefully in the chat
- [ AC4 ] The AI response is animated character-by-character on arrival

**Status:** ✅ Complete  
**Implementation:** `src/services/openaiService.js`, `src/Dashboard/dashboardSlice.js` (`sendConversationMessage` thunk)

---

### REQ-04 — Conversation Persistence

**Description:** Conversations shall persist across page reloads and browser restarts.

**Acceptance Criteria:**
- [ AC1 ] Conversations are not lost when the page is refreshed
- [ AC2 ] The previously selected conversation is restored on reload
- [ AC3 ] Message history within a conversation is preserved in full

**Status:** ✅ Complete  
**Implementation:** Cloud persistence via MongoDB (upgraded from localStorage in Sprint 2); `src/services/conversationApi.js`, `src/store.js` listener middleware

---

## 3. Sprint 2 Requirements

### REQ-05 — Backend-Only API Calls (Secure AI Proxy)

**Description:** All OpenAI API requests shall be made server-side. The API key shall never be sent to or accessible from the browser.

**Acceptance Criteria:**
- [ AC1 ] `OPENAI_API_KEY` is set only as a server environment variable
- [ AC2 ] No `VITE_OPENAI_API_KEY` or equivalent key exists in the client bundle
- [ AC3 ] The client sends messages to `POST /api/chat` (authenticated), not to OpenAI directly
- [ AC4 ] The server validates the JWT before forwarding any request to OpenAI
- [ AC5 ] OpenAI error responses (e.g. rate limit, invalid key) are forwarded to the client with correct HTTP status

**Status:** ✅ Complete  
**Implementation:** `server.js` (`POST /api/chat`), `src/services/openaiService.js`

---

### REQ-06 — User Authentication & Cloud Sync

**Description:** The application shall support user registration and login. Each user's conversations shall be private, persisted to the cloud, and available on any device.

**Acceptance Criteria:**
- [ AC1 ] A user can register with a valid email address and password
- [ AC2 ] Duplicate email registration is rejected with a clear error message
- [ AC3 ] A user can log in and receive a JWT valid for 7 days
- [ AC4 ] Invalid credentials return a "Invalid email or password" error
- [ AC5 ] All conversation API routes require a valid Bearer token
- [ AC6 ] Conversations are stored in MongoDB scoped to the authenticated user's ID
- [ AC7 ] Logging out clears the session and redirects to the login page
- [ AC8 ] Logging in on a second device shows the same conversation history

**Status:** ✅ Complete  
**Implementation:** `server.js` (`/api/auth/*`, `/api/conversations`), `src/LoginPage.jsx`, `src/authSlice.js`, `src/services/authApi.js`

---

### REQ-07 — Model Selection Per Conversation

**Description:** Each conversation shall allow the user to select which OpenAI model processes its messages. The selection shall persist with the conversation.

**Acceptance Criteria:**
- [ AC1 ] The settings panel exposes a model dropdown with at least 4 options
- [ AC2 ] Available models: GPT-4o mini (default), GPT-4o, GPT-4.1, GPT-3.5 Turbo
- [ AC3 ] The selected model is sent with every AI request for that conversation
- [ AC4 ] Changing the model in one conversation does not affect other conversations
- [ AC5 ] The model selection is saved to MongoDB and restored on next login

**Status:** ✅ Complete  
**Implementation:** `src/Dashboard/Chat/ChatSettings.jsx`, `src/Dashboard/dashboardSlice.js` (`setConversationModel`), `server.js`

---

### REQ-08 — Editable System Prompt / Persona Per Chat

**Description:** Each conversation shall support a user-defined system prompt that instructs the AI how to behave throughout the conversation.

**Acceptance Criteria:**
- [ AC1 ] The settings panel includes a text area for entering a persona
- [ AC2 ] The persona is sent as a `system` role message at the start of every API request
- [ AC3 ] Changing the persona mid-conversation takes effect on the next message
- [ AC4 ] Each conversation has an independent persona (changing one does not affect others)
- [ AC5 ] The persona is saved to MongoDB and restored on next login

**Status:** ✅ Complete  
**Implementation:** `src/Dashboard/Chat/ChatSettings.jsx`, `src/Dashboard/dashboardSlice.js` (`setConversationPersona`), `server.js`

---

### REQ-09 — Conversation Search

**Description:** The sidebar shall provide a search input that filters the conversation list by message content.

**Acceptance Criteria:**
- [ AC1 ] A search input is visible in the sidebar
- [ AC2 ] Typing in the search field filters conversations in real time
- [ AC3 ] Filtering matches any word in any message in the conversation (case-insensitive)
- [ AC4 ] Clearing the search input restores the full conversation list
- [ AC5 ] Search does not trigger a new network request (client-side filtering)

**Status:** ✅ Complete  
**Implementation:** `src/Dashboard/Sidebar/Sidebar.jsx`

---

### REQ-10 — File Upload & Summarization

**Description:** The user shall be able to attach a PDF or TXT file to a message. The AI shall receive the full document text as context and respond to questions about it.

**Acceptance Criteria:**
- [ AC1 ] A file attachment button is present in the input bar
- [ AC2 ] The file picker accepts `.pdf` and `.txt` files only
- [ AC3 ] PDF text is extracted client-side using PDF.js (no file upload to our server)
- [ AC4 ] TXT files are read using the browser's FileReader API
- [ AC5 ] Files exceeding 50,000 characters are truncated with a visible notice
- [ AC6 ] An attached file is shown as a labelled chip above the input field
- [ AC7 ] The chip can be dismissed before sending
- [ AC8 ] The message bubble shows the filename chip and the user's typed text (not raw extracted content)
- [ AC9 ] The full file text is included in the content sent to the AI

**Status:** ✅ Complete  
**Implementation:** `src/services/fileExtractor.js`, `src/Dashboard/Chat/NewMessageInput.jsx`, `src/Dashboard/Chat/Message.jsx`

---

### REQ-11 — Voice Input / Output

**Description:** The application shall support speech-to-text message input and text-to-speech playback of AI responses.

**Acceptance Criteria — Voice Input (STT):**
- [ AC1 ] A microphone button is present in the input bar
- [ AC2 ] Clicking the button requests microphone permission and begins listening
- [ AC3 ] Interim transcription results update the input field in real time
- [ AC4 ] Recognition stops automatically on silence; clicking the button again cancels it
- [ AC5 ] The mic button displays a red pulsing animation while active
- [ AC6 ] The input placeholder changes to "Listening…" during recognition
- [ AC7 ] If the browser does not support SpeechRecognition, the button is hidden

**Acceptance Criteria — Voice Output (TTS):**
- [ AC8 ] Every AI message has a speaker button (visible on hover)
- [ AC9 ] Clicking the speaker button reads the message aloud using SpeechSynthesis
- [ AC10 ] Clicking the button while speaking stops playback immediately
- [ AC11 ] The button turns green and shows a mute icon while speaking
- [ AC12 ] Speech is cancelled if the component unmounts (e.g. switching conversations)
- [ AC13 ] If the browser does not support SpeechSynthesis, the button is hidden

**Status:** ✅ Complete  
**Implementation:** `src/services/speechService.js`, `src/Dashboard/Chat/NewMessageInput.jsx`, `src/Dashboard/Chat/Message.jsx`

---

## 4. Requirements Completion Summary

| ID | Requirement | Sprint | Status |
|---|---|---|---|
| REQ-01 | React-based frontend | 1 | ✅ Complete |
| REQ-02 | Redux state management | 1 | ✅ Complete |
| REQ-03 | Direct AI API integration | 1 | ✅ Complete |
| REQ-04 | Conversation persistence | 1 | ✅ Complete |
| REQ-05 | Backend-only API calls (secure proxy) | 2 | ✅ Complete |
| REQ-06 | User authentication & cloud sync | 2 | ✅ Complete |
| REQ-07 | Model selection per conversation | 2 | ✅ Complete |
| REQ-08 | Editable system prompt / persona | 2 | ✅ Complete |
| REQ-09 | Conversation search | 2 | ✅ Complete |
| REQ-10 | File upload & summarization | 2 | ✅ Complete |
| REQ-11 | Voice input / output | 2 | ✅ Complete |

**Total: 11 / 11 requirements complete (100%)**

---

### Acceptance Criteria Summary

| Requirement | Criteria Defined | All Passing |
|---|---|---|
| REQ-01 | 4 | ✅ |
| REQ-02 | 4 | ✅ |
| REQ-03 | 4 | ✅ |
| REQ-04 | 3 | ✅ |
| REQ-05 | 5 | ✅ |
| REQ-06 | 8 | ✅ |
| REQ-07 | 5 | ✅ |
| REQ-08 | 5 | ✅ |
| REQ-09 | 5 | ✅ |
| REQ-10 | 9 | ✅ |
| REQ-11 | 13 | ✅ |
| **Total** | **65** | **✅ All** |
