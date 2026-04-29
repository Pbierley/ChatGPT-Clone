import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import dashboardReducer, {
  addMessage,
  createConversation,
  sendConversationMessage,
  setConversationModel,
  setConversationPersona,
} from "./Dashboard/dashboardSlice";
import authReducer from "./authSlice";
import { apiSaveConversation } from "./services/conversationApi";

const listenerMiddleware = createListenerMiddleware();

function getConversation(listenerApi, id) {
  return listenerApi.getState().dashboard.conversations.find(c => c.id === id);
}

async function saveConversation(conversation) {
  if (!conversation) return;
  try {
    await apiSaveConversation(conversation);
  } catch (err) {
    console.error('[DB] Save failed:', err.message);
  }
}

listenerMiddleware.startListening({
  actionCreator: createConversation.fulfilled,
  effect: (action, listenerApi) => saveConversation(getConversation(listenerApi, action.payload.id)),
});

listenerMiddleware.startListening({
  actionCreator: addMessage,
  effect: (action, listenerApi) => saveConversation(getConversation(listenerApi, action.payload.conversationId)),
});

listenerMiddleware.startListening({
  actionCreator: sendConversationMessage.fulfilled,
  effect: (action, listenerApi) => saveConversation(getConversation(listenerApi, action.payload.conversationId)),
});

listenerMiddleware.startListening({
  actionCreator: setConversationModel,
  effect: (action, listenerApi) => saveConversation(getConversation(listenerApi, action.payload.conversationId)),
});

listenerMiddleware.startListening({
  actionCreator: setConversationPersona,
  effect: (action, listenerApi) => saveConversation(getConversation(listenerApi, action.payload.conversationId)),
});

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});
