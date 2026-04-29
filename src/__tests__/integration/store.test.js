import { describe, test, expect, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import authReducer, { setAuth, clearAuth } from '../../authSlice';
import dashboardReducer, {
  addMessage,
  setSelectedConversationId,
  resetDashboard,
  DEFAULT_MODEL,
} from '../../Dashboard/dashboardSlice';

const buildStore = () =>
  configureStore({ reducer: { auth: authReducer, dashboard: dashboardReducer } });

describe('Redux store — integration', () => {
  let store;
  beforeEach(() => {
    localStorage.clear();
    store = buildStore();
  });

  test('auth and dashboard slices coexist without conflict', () => {
    const state = store.getState();
    expect(state.auth).toBeDefined();
    expect(state.dashboard).toBeDefined();
  });

  test('logging in does not affect conversation state', () => {
    store.dispatch(setAuth({ token: 'tok', user: { id: '1', email: 'a@b.com' } }));
    expect(store.getState().dashboard.conversations).toEqual([]);
  });

  test('resetting dashboard does not affect auth state', () => {
    store.dispatch(setAuth({ token: 'tok', user: { id: '1', email: 'a@b.com' } }));
    store.dispatch(resetDashboard());
    expect(store.getState().auth.token).toBe('tok');
    expect(store.getState().dashboard.conversations).toEqual([]);
  });

  test('clearing auth does not affect conversation data', () => {
    store.dispatch(addMessage({ conversationId: 'c1', message: { id: 'm1', content: 'Hi', aiMessage: false } }));
    store.dispatch(clearAuth());
    expect(store.getState().dashboard.conversations).toHaveLength(1);
    expect(store.getState().auth.token).toBeNull();
  });

  test('full login → create conversation → add message flow', () => {
    store.dispatch(setAuth({ token: 'tok', user: { id: '1', email: 'a@b.com' } }));
    store.dispatch(setSelectedConversationId('conv1'));
    store.dispatch(addMessage({ conversationId: 'conv1', message: { id: 'm1', content: 'Hello AI', aiMessage: false } }));

    const state = store.getState();
    expect(state.auth.token).toBe('tok');
    expect(state.dashboard.selectedConversationId).toBe('conv1');
    expect(state.dashboard.conversations[0].messages[0].content).toBe('Hello AI');
  });

  test('new conversation gets DEFAULT_MODEL', () => {
    store.dispatch(addMessage({ conversationId: 'newConv', message: { id: 'm1', content: 'Hi', aiMessage: false } }));
    expect(store.getState().dashboard.conversations[0].model).toBe(DEFAULT_MODEL);
  });
});
