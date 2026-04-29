# AI Chat Client
### A Full-Featured, Privately Hosted ChatGPT Experience

---

## What Is This?

A fully self-contained AI chat application built from the ground up —
not a wrapper around ChatGPT's website, but a complete product with
its own accounts, storage, and features.

Every conversation you have is saved to **your** account, accessible
from any device, and your API key never leaves the server.

---

## Feature 1 — User Accounts & Login

### What it does
Users create an account with an email and password.
Every conversation is tied to that account and no one else's.

### Why it matters
Without accounts, anyone who opened the app would see everyone else's
conversations. Accounts make the app usable by real people in the real
world — your history is private, persistent, and yours.

**The alternative** — storing conversations in the browser — means
clearing your browser wipes everything, and nothing carries over to
another device or another person's computer.

---

## Feature 2 — Cross-Device Conversation Sync

### What it does
Log in on any device — phone, laptop, desktop — and your full
conversation history is right there, exactly where you left off.

### Why it matters
People don't use just one device. A conversation you start on your
laptop during a study session should still be there when you pick up
your phone on the bus. Cloud sync makes the app feel like a real
product instead of a local tool.

---

## Feature 3 — Model Selection

### What it does
Each conversation lets you choose which AI model powers it:
GPT-4o mini, GPT-4o, GPT-4.1, or GPT-3.5 Turbo.
The choice sticks to that conversation — you can have different chats
running different models at the same time.

### Why it matters
Not every question needs the most powerful (and most expensive) model.
Quick questions get a fast, cheap answer. Complex research gets the
most capable model. Giving users this control means the app is both
smarter and more cost-efficient — the right tool for the right job.

---

## Feature 4 — Custom AI Persona (System Prompt)

### What it does
Each conversation can have its own personality or role baked in.
You could tell one chat "you are a concise code reviewer" and another
"you are a friendly tutor who explains everything simply."
That instruction persists across the entire conversation.

### Why it matters
The raw AI without guidance often gives generic responses.
A persona focuses the AI and makes it dramatically more useful for
specific tasks. A student reviewing for an exam needs a different AI
than a developer debugging an app — this feature makes one tool serve
both.

---

## Feature 5 — Conversation Search

### What it does
A search bar in the sidebar filters your conversation history in real
time as you type, matching any word or phrase that appeared in those
messages.

### Why it matters
Once you have dozens — or hundreds — of saved conversations, finding
the one where you asked about a specific topic becomes impossible
without search. This turns the conversation history from an archive
into something you can actually navigate and reuse.

---

## Feature 6 — File Upload & Summarization

### What it does
Attach a PDF or text file directly to a message.
The AI reads the entire document and you can ask it anything:
"Summarize this," "What are the key arguments?" "Does this contract
mention a termination clause?"

### Why it matters
The most tedious part of working with documents is getting through them.
A 40-page report, a dense research paper, a legal agreement — most
people don't have time to read every word. This feature lets you
hand the document to the AI and ask the questions that actually matter
to you, in plain language, instantly.

---

## Feature 7 — Voice Input (Speak Your Message)

### What it does
A microphone button lets you speak instead of type.
Your words appear in the input field in real time as you talk.
When you stop speaking, the transcription is ready to review and send.

### Why it matters
Typing is slow and sometimes inconvenient. Voice input is faster for
longer thoughts, more accessible for users with mobility limitations,
and more natural when you're thinking out loud.
It also makes the app usable hands-free — while cooking, commuting,
or when your hands are simply occupied.

---

## Feature 8 — Voice Output (Read Responses Aloud)

### What it does
Every AI response has a speaker button.
Click it and the AI's answer is read aloud in a natural voice.
Click again to stop at any time.

### Why it matters
Reading long AI responses requires sustained attention.
Listening lets you absorb the same information while doing something
else — reviewing notes, walking, or just resting your eyes.
It also makes the app significantly more accessible for users with
visual impairments or reading difficulties.

---

## Feature 9 — Secure API Key Handling

### What it does
The OpenAI API key — the credential that authorizes every AI request
and controls billing — lives only on the server.
It is never sent to the browser, never visible in the app's code,
and never exposed to the person using the app.

### Why it matters
An exposed API key is a stolen API key.
Anyone who found it could rack up thousands of dollars in charges
on your account. This feature is what makes the app safe to deploy
to real users — without it, sharing the app publicly would be
financially reckless. Security here isn't optional; it's the
difference between a demo and a deployable product.

---

## How It All Fits Together

```
User opens app
    → Logs in (accounts keep conversations private)
    → Picks a conversation or starts a new one
    → Chooses a model and sets a persona (right tool for the task)
    → Types, speaks, or uploads a file (flexible input)
    → Gets an AI response — reads it or listens to it (flexible output)
    → Everything saved to the cloud (available on any device)
    → API key stays on the server the whole time (safe to share)
```

Each feature solves a specific friction point.
Together they turn a basic AI chat box into something people
would actually want to use every day.

---

## Project By The Numbers

| | |
|---|---|
| Development time | 15 weeks |
| Sprint 1 features | 4 (core chat, state management, session persistence, AI integration) |
| Sprint 2 features | 7 (accounts, sync, model selection, persona, search, file upload, voice) |
| Total features delivered | 11 / 11 — 100% |
| Lines of code written | 2,021 |

---

## Thank You
