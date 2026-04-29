import { describe, test, expect } from 'vitest';
import dashboardReducer, {
  addMessage,
  setConversationModel,
  setConversationPersona,
  DEFAULT_MODEL,
} from '../../Dashboard/dashboardSlice';

describe('Message & conversation integrity — regression', () => {
  const blank = { conversations: [], selectedConversationId: null, loading: false, error: null };

  test('every message added has id, content, and aiMessage fields', () => {
    const message = { id: 'msg-1', content: 'Test message', aiMessage: false };
    const state = dashboardReducer(blank, addMessage({ conversationId: 'c1', message }));
    const saved = state.conversations[0].messages[0];
    expect(saved).toHaveProperty('id');
    expect(saved).toHaveProperty('content');
    expect(saved).toHaveProperty('aiMessage');
  });

  test('auto-created conversation always has a model field', () => {
    const message = { id: 'm1', content: 'Hi', aiMessage: false };
    const state = dashboardReducer(blank, addMessage({ conversationId: 'c1', message }));
    expect(state.conversations[0]).toHaveProperty('model');
    expect(state.conversations[0].model).toBe(DEFAULT_MODEL);
  });

  test('auto-created conversation always has a persona field', () => {
    const message = { id: 'm1', content: 'Hi', aiMessage: false };
    const state = dashboardReducer(blank, addMessage({ conversationId: 'c1', message }));
    expect(state.conversations[0]).toHaveProperty('persona');
    expect(state.conversations[0].persona).toBe('');
  });

  test('setting model on unknown conversation does not crash', () => {
    const state = dashboardReducer(blank, setConversationModel({ conversationId: 'ghost', model: 'gpt-4o' }));
    expect(state.conversations).toHaveLength(0);
  });

  test('setting persona on unknown conversation does not crash', () => {
    const state = dashboardReducer(blank, setConversationPersona({ conversationId: 'ghost', persona: 'pirate' }));
    expect(state.conversations).toHaveLength(0);
  });

  test('multiple messages are appended in order', () => {
    const m1 = { id: 'm1', content: 'First', aiMessage: false };
    const m2 = { id: 'm2', content: 'Second', aiMessage: true };
    let state = dashboardReducer(blank, addMessage({ conversationId: 'c1', message: m1 }));
    state = dashboardReducer(state, addMessage({ conversationId: 'c1', message: m2 }));
    expect(state.conversations[0].messages[0].content).toBe('First');
    expect(state.conversations[0].messages[1].content).toBe('Second');
  });

  test('model change does not mutate other conversation fields', () => {
    const m = { id: 'm1', content: 'Hi', aiMessage: false };
    let state = dashboardReducer(blank, addMessage({ conversationId: 'c1', message: m }));
    const beforePersona = state.conversations[0].persona;
    state = dashboardReducer(state, setConversationModel({ conversationId: 'c1', model: 'gpt-4o' }));
    expect(state.conversations[0].persona).toBe(beforePersona);
    expect(state.conversations[0].messages).toHaveLength(1);
  });
});
