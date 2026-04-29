import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { sendMessageToAI } from "../services/openaiService";
import { apiLoadConversations, apiDeleteConversations } from "../services/conversationApi";

export const DEFAULT_MODEL = 'gpt-4o-mini';

export const AVAILABLE_MODELS = [
  { id: 'gpt-4o-mini',    label: 'GPT-4o mini' },
  { id: 'gpt-4o',         label: 'GPT-4o' },
  { id: 'gpt-4.1',        label: 'GPT-4.1' },
  { id: 'gpt-3.5-turbo',  label: 'GPT-3.5 Turbo' },
];

export const createConversation = createAsyncThunk(
  'dashboard/createConversation',
  async () => ({ id: uuid(), model: DEFAULT_MODEL, persona: '' })
);

export const loadConversations = createAsyncThunk(
  'dashboard/loadConversations',
  async () => await apiLoadConversations()
);

export const deleteConversations = createAsyncThunk(
  'dashboard/deleteConversations',
  async () => { await apiDeleteConversations(); }
);

export const sendConversationMessage = createAsyncThunk(
  'dashboard/sendMessage',
  async ({ message, conversationId, conversationMessages, model, persona }) => {
    const messages = [];

    if (persona) {
      messages.push({ role: 'system', content: persona });
    }

    conversationMessages.forEach(m => {
      messages.push({ role: m.aiMessage ? 'assistant' : 'user', content: m.content });
    });

    messages.push({ role: 'user', content: message.content });

    const aiContent = await sendMessageToAI(messages, model);

    const aiMessage = { content: aiContent, id: uuid(), aiMessage: true };

    return { message, aiMessage, conversationId };
  }
);

const initialState = {
  conversations: [],
  selectedConversationId: null,
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setSelectedConversationId: (state, action) => {
      state.selectedConversationId = action.payload;
    },
    addMessage: (state, action) => {
      const { message, conversationId } = action.payload;
      const conversation = state.conversations.find(c => c.id === conversationId);
      if (conversation) {
        conversation.messages.push(message);
      } else {
        state.conversations.push({ id: conversationId, messages: [message], model: DEFAULT_MODEL, persona: '' });
      }
    },
    setConversationModel: (state, action) => {
      const { conversationId, model } = action.payload;
      const conv = state.conversations.find(c => c.id === conversationId);
      if (conv) conv.model = model;
    },
    setConversationPersona: (state, action) => {
      const { conversationId, persona } = action.payload;
      const conv = state.conversations.find(c => c.id === conversationId);
      if (conv) conv.persona = persona;
    },
    resetDashboard: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createConversation.fulfilled, (state, action) => {
        const { id, model, persona } = action.payload;
        state.conversations.push({ id, messages: [], model, persona });
        state.selectedConversationId = id;
      })
      .addCase(loadConversations.fulfilled, (state, action) => {
        state.conversations = action.payload.map(c => ({
          ...c,
          model:   c.model   || DEFAULT_MODEL,
          persona: c.persona || '',
        }));
      })
      .addCase(deleteConversations.fulfilled, (state) => {
        state.conversations = [];
        state.selectedConversationId = null;
      })
      .addCase(sendConversationMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendConversationMessage.fulfilled, (state, action) => {
        const { aiMessage, conversationId } = action.payload;
        const conv = state.conversations.find(c => c.id === conversationId);
        if (conv) conv.messages.push(aiMessage);
        state.loading = false;
      })
      .addCase(sendConversationMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        const { conversationId } = action.meta.arg;
        const conv = state.conversations.find(c => c.id === conversationId);
        if (conv) {
          conv.messages.push({
            content: "Sorry, I couldn't process your message. Please try again.",
            id: uuid(),
            aiMessage: true,
            error: true,
          });
        }
      });
  },
});

export const {
  setSelectedConversationId,
  addMessage,
  setConversationModel,
  setConversationPersona,
  resetDashboard,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
