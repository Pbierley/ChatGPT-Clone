---
marp: true
theme: default
paginate: true
class: lead
---

# ChatGPT Mock — Individual Project
### Early Starter → Chat assistant remake
**Core Features**
- Chat-based user interface  
- AI-generated responses  
- Multiple chat sessions  
- Multiple conversations per session  
- Conversation history persistence  
- Client-side session tracking  

**Key Requirements**
- React-based frontend  
- Redux for state management  
- Direct integration with an AI API  
- Browser localStorage for session persistence  

---

# Project Description
Build a lightweight **ChatGPT mock** — a single-page app that demonstrates a chat-based UI with AI-generated replies, multi-session support, and persisted conversation history.  
Target audience: students/developers who want a simple local demo of chat UX + AI integration.

---

# Problem Domain
Many learners and teams want a sandboxed way to experiment with conversational UIs and AI without deploying a heavy backend.  
The app focuses on:
- Easy creation and switching of chat sessions
- Multiple conversations per session (topic-based)
- Fast local persistence so users can continue where they left off

---

# Core Features (detailed)
1. Chat-based user interface  
2. AI-generated responses  
3. Multiple chat sessions  
4. Multiple conversations per session  
5. Conversation history persistence  
6. Client-side session tracking  

---

# Key Requirements (implementation notes)
- React for UI  
- Redux (or Redux Toolkit) for global state  
- Direct AI API integration  
- Browser localStorage for persistence  

---

# Architecture
- React SPA frontend  
- Redux state management  
- AI API integration layer  
- localStorage persistence  

---

# Tests
- Acceptance: send & receive messages, persistence across reload  
- Integration: Redux updates + storage sync  
- E2E: full chat flow across sessions  

---

# Schedule & Milestones

## Sprint 1
- Setup React + Redux  
- Session & conversation management  
- Basic chat UI  

## Sprint 2
- AI API integration  
- Persistence polish  
- Testing & UI refinement  

---
