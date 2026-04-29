---
marp: true
theme: default
paginate: true
---

# ChatGPT Clone — User Manual
### Everything you need to get started

---

# Getting Started

1. Open the app in your browser at **http://localhost:3000**
   (or launch the desktop app)
2. Click **Register** to create a new account with your email and password
3. After registering, you are automatically logged in
4. Your conversations are saved to the cloud and available on any device

---

# Creating a New Conversation

- Click the **+ New Chat** button at the top of the sidebar
- A new empty conversation opens immediately
- Type your message in the input bar at the bottom and press **Enter** or click the send button
- The AI response appears automatically and is animated as it arrives

---

# Managing Conversations

**Switching between chats**
Click any conversation in the left sidebar to open it.

**Searching your history**
Type in the search bar at the top of the sidebar.
Results filter in real time as you type — matching any word in any message.

**Deleting all conversations**
Click the **Delete All** button at the bottom of the sidebar.
This permanently removes all conversations for your account.

---

# Choosing an AI Model

Each conversation has its own model setting.

1. Click the **☰ Settings** button (bottom-left, next to the input bar)
2. Select a model from the dropdown:
   - **GPT-4o mini** — fast and cost-efficient (default)
   - **GPT-4o** — most capable for complex tasks
   - **GPT-4.1** — latest generation
   - **GPT-3.5 Turbo** — fastest, lowest cost

The model you choose is saved to that conversation and remembered between sessions.

---

# Setting a Custom Persona

A persona shapes how the AI responds throughout the conversation.

1. Click the **☰ Settings** button
2. Type in the **Persona** text box — for example:
   - *"You are a concise technical assistant. Skip all introductions."*
   - *"You are a friendly tutor. Explain everything simply with examples."*
   - *"You are a strict editor. Rewrite everything I give you for clarity."*
3. The persona is applied to every message in that conversation

---

# Attaching a File (PDF or TXT)

1. Click the **📎 paperclip button** next to the input bar
2. Choose a `.pdf` or `.txt` file from your computer
3. A chip appears above the input showing the file name
4. Optionally type a question (e.g. *"Summarize this"* or *"What are the key arguments?"*)
5. Press **Enter** — the AI reads the full document and responds

**Notes:**
- Files up to ~50,000 characters are processed automatically
- Very large files are trimmed with a notice
- To remove the file before sending, click the **✕** on the chip

---

# Voice Input — Speaking Your Message

1. Click the **🎤 microphone button** (next to the paperclip)
2. Allow microphone access when prompted by the browser
3. Speak your message — the text appears in real time as you talk
4. When you stop speaking, transcription ends automatically
   (or click the mic button again to cancel)
5. Review the text and press **Enter** to send

The mic button glows red while listening.

---

# Voice Output — Listening to Responses

Every AI message has a **🔊 speaker button** that appears when you hover over it.

- Click it to have the response read aloud
- Click it again (now showing 🔇) to stop at any time
- The button turns green while speaking

**Tip:** Use voice output while reviewing long responses — listen while you take notes.

---

# Logging Out

Click **Log out** at the bottom of the sidebar.

Your conversations remain saved in the cloud.
The next time you log in — from any device — your full history is restored.

---

# Troubleshooting

| Problem | Solution |
|---|---|
| Blank screen on load | Make sure the server is running (`npm run dev`) |
| "Waiting for response…" stuck | Check your internet connection; the server needs to reach OpenAI |
| Mic button not working | Use Chrome or Edge — Firefox has limited speech support |
| File content not appearing | Only PDF and TXT files are supported |
| Can't log in | Check your email/password; use Register if you don't have an account yet |

---

# Keyboard Shortcuts

| Key | Action |
|---|---|
| **Enter** | Send message |
| **Tab** | Move between fields |
| **Esc** | Close settings panel |

---

# That's it!

The app saves everything automatically.
No manual saving, no exports needed.

Questions? Check the README on GitHub:
**https://github.com/Pbierley/ChatGPT-Clone**
