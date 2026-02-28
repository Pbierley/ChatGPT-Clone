import { describe, expect, it } from 'vitest';
import reducer, {
  addMessage,
  deleteConversations,
  setConversationHistory,
  setConversations,
  setSelectedConversationId,
} from './dashboardSlice';

const initialState = {
  sessionEstablished: false,
  conversations: [],
  selectedConversationId: null,
};

describe('dashboardSlice reducer', () => {
  it('returns initial state for unknown action', () => {
    const state = reducer(undefined, { type: 'unknown' });
    expect(state).toEqual(initialState);
  });

  it('sets selected conversation id', () => {
    const state = reducer(initialState, setSelectedConversationId('c1'));
    expect(state.selectedConversationId).toBe('c1');
  });

  it('adds a new conversation with first message', () => {
    const message = { id: 'm1', content: 'hello', aiMessage: false };

    const state = reducer(initialState, addMessage({ message, conversationId: 'c1' }));

    expect(state.conversations).toHaveLength(1);
    expect(state.conversations[0]).toEqual({ id: 'c1', messages: [message] });
  });

  it('appends message to existing conversation', () => {
    const startingState = {
      ...initialState,
      conversations: [{ id: 'c1', messages: [{ id: 'm1', content: 'first', aiMessage: false }] }],
    };

    const state = reducer(
      startingState,
      addMessage({
        conversationId: 'c1',
        message: { id: 'm2', content: 'second', aiMessage: false },
      })
    );

    expect(state.conversations[0].messages).toHaveLength(2);
    expect(state.conversations[0].messages[1].content).toBe('second');
  });

  it('deletes all conversations and resets selected id', () => {
    const startingState = {
      sessionEstablished: true,
      conversations: [{ id: 'c1', messages: [{ id: 'm1', content: 'x', aiMessage: false }] }],
      selectedConversationId: 'c1',
    };

    const state = reducer(startingState, deleteConversations());

    expect(state.conversations).toEqual([]);
    expect(state.selectedConversationId).toBeNull();
  });

  it('sets full conversations and marks session established', () => {
    const conversations = [{ id: 'c1', messages: [] }];
    const state = reducer(initialState, setConversations(conversations));

    expect(state.conversations).toEqual(conversations);
    expect(state.sessionEstablished).toBe(true);
  });

  it('upserts conversation history', () => {
    const newHistory = { id: 'c2', messages: [{ id: 'm1', content: 'history', aiMessage: true }] };

    const state = reducer(initialState, setConversationHistory(newHistory));

    expect(state.conversations).toHaveLength(1);
    expect(state.conversations[0]).toEqual(newHistory);
  });

  it('replaces existing conversation history', () => {
    const startingState = {
      ...initialState,
      conversations: [{ id: 'c1', messages: [{ id: 'm1', content: 'old', aiMessage: false }] }],
    };

    const state = reducer(
      startingState,
      setConversationHistory({ id: 'c1', messages: [{ id: 'm2', content: 'new', aiMessage: true }] })
    );

    expect(state.conversations).toHaveLength(1);
    expect(state.conversations[0].messages).toEqual([{ id: 'm2', content: 'new', aiMessage: true }]);
  });
});
