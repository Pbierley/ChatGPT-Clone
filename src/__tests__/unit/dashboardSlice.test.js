import { describe, test, expect } from 'vitest';
import dashboardReducer, {
  setSelectedConversationId,
  addMessage,
  setConversationModel,
  setConversationPersona,
  resetDashboard,
  DEFAULT_MODEL,
  AVAILABLE_MODELS,
} from '../../Dashboard/dashboardSlice';

const makeConversation = (id = 'conv1') => ({
  id,
  messages: [],
  model: DEFAULT_MODEL,
  persona: '',
});

const stateWith = (conv) => ({
  conversations: [conv],
  selectedConversationId: conv.id,
  loading: false,
  error: null,
});

describe('dashboardSlice — unit', () => {
  test('initial state has empty conversations list', () => {
    const state = dashboardReducer(undefined, { type: '@@INIT' });
    expect(state.conversations).toEqual([]);
    expect(state.selectedConversationId).toBeNull();
    expect(state.loading).toBe(false);
  });

  test('DEFAULT_MODEL is gpt-4o-mini', () => {
    expect(DEFAULT_MODEL).toBe('gpt-4o-mini');
  });

  test('AVAILABLE_MODELS has four entries', () => {
    expect(AVAILABLE_MODELS).toHaveLength(4);
  });

  test('setSelectedConversationId updates selected id', () => {
    const state = dashboardReducer(undefined, setSelectedConversationId('conv42'));
    expect(state.selectedConversationId).toBe('conv42');
  });

  test('addMessage appends message to existing conversation', () => {
    const conv = makeConversation();
    const message = { id: 'm1', content: 'Hello', aiMessage: false };
    const state = dashboardReducer(stateWith(conv), addMessage({ conversationId: 'conv1', message }));
    expect(state.conversations[0].messages).toHaveLength(1);
    expect(state.conversations[0].messages[0].content).toBe('Hello');
  });

  test('addMessage creates new conversation if id not found', () => {
    const initialState = { conversations: [], selectedConversationId: null, loading: false, error: null };
    const message = { id: 'm1', content: 'Hi', aiMessage: false };
    const state = dashboardReducer(initialState, addMessage({ conversationId: 'newConv', message }));
    expect(state.conversations).toHaveLength(1);
    expect(state.conversations[0].id).toBe('newConv');
  });

  test('setConversationModel updates model on correct conversation', () => {
    const conv = makeConversation();
    const state = dashboardReducer(stateWith(conv), setConversationModel({ conversationId: 'conv1', model: 'gpt-4o' }));
    expect(state.conversations[0].model).toBe('gpt-4o');
  });

  test('setConversationPersona updates persona on correct conversation', () => {
    const conv = makeConversation();
    const state = dashboardReducer(stateWith(conv), setConversationPersona({ conversationId: 'conv1', persona: 'You are a pirate.' }));
    expect(state.conversations[0].persona).toBe('You are a pirate.');
  });

  test('resetDashboard returns initial state', () => {
    const state = dashboardReducer(stateWith(makeConversation()), resetDashboard());
    expect(state.conversations).toEqual([]);
    expect(state.selectedConversationId).toBeNull();
  });
});
