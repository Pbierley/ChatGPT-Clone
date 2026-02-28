const test = require('node:test');
const assert = require('node:assert/strict');

const {
  __handlers,
  __resetSessions,
  __setOpenAIClient,
} = require('./socketServer');

const createMockSocket = () => {
  const events = [];
  return {
    emit: (event, data) => {
      events.push({ event, data });
    },
    getEvents: () => events,
    getLastEvent: () => events[events.length - 1],
  };
};

test.beforeEach(() => {
  __resetSessions();
  __setOpenAIClient({
    createChatCompletion: async () => ({
      data: {
        choices: [{ message: { content: 'AI mock response' } }],
      },
    }),
  });
});

test('sessionHistoryHandler creates a new session when none exists', () => {
  const socket = createMockSocket();

  __handlers.sessionHistoryHandler(socket, { sessionId: 'missing-session' });

  const event = socket.getLastEvent();
  assert.equal(event.event, 'session-details');
  assert.equal(Array.isArray(event.data.conversations), true);
  assert.equal(event.data.conversations.length, 0);
  assert.equal(typeof event.data.sessionId, 'string');
  assert.ok(event.data.sessionId.length > 0);
});

test('sessionHistoryHandler returns existing session details', () => {
  const socket = createMockSocket();

  __handlers.sessionHistoryHandler(socket, { sessionId: 'missing-session' });
  const createdSessionId = socket.getLastEvent().data.sessionId;

  const socket2 = createMockSocket();
  __handlers.sessionHistoryHandler(socket2, { sessionId: createdSessionId });

  const event = socket2.getLastEvent();
  assert.equal(event.event, 'session-details');
  assert.equal(event.data.sessionId, createdSessionId);
  assert.deepEqual(event.data.conversations, []);
});

test('conversationMessageHandler ignores unknown sessions', async () => {
  const socket = createMockSocket();

  await __handlers.conversationMessageHandler(socket, {
    sessionId: 'unknown',
    conversationId: 'c1',
    message: { id: 'u1', content: 'hello', aiMessage: false },
  });

  assert.equal(socket.getEvents().length, 0);
});

test('conversationMessageHandler appends user and ai messages', async () => {
  const socket = createMockSocket();

  __handlers.sessionHistoryHandler(socket, { sessionId: 'missing-session' });
  const sessionId = socket.getLastEvent().data.sessionId;

  const messageSocket = createMockSocket();
  await __handlers.conversationMessageHandler(messageSocket, {
    sessionId,
    conversationId: 'conv-1',
    message: { id: 'u1', content: 'hello', aiMessage: false },
  });

  const event = messageSocket.getLastEvent();
  assert.equal(event.event, 'conversation-details');
  assert.equal(event.data.id, 'conv-1');
  assert.equal(event.data.messages.length, 2);
  assert.equal(event.data.messages[0].content, 'hello');
  assert.equal(event.data.messages[0].aiMessage, false);
  assert.equal(event.data.messages[1].aiMessage, true);
  assert.equal(event.data.messages[1].content, 'AI mock response');
});

test('conversationDeleteHandler clears session conversations', () => {
  const socket = createMockSocket();

  __handlers.sessionHistoryHandler(socket, { sessionId: 'missing-session' });
  const sessionId = socket.getLastEvent().data.sessionId;

  __handlers.conversationDeleteHandler(socket, { sessionId });

  const verifySocket = createMockSocket();
  __handlers.sessionHistoryHandler(verifySocket, { sessionId });

  const event = verifySocket.getLastEvent();
  assert.equal(event.event, 'session-details');
  assert.equal(event.data.sessionId, sessionId);
  assert.deepEqual(event.data.conversations, []);
});
