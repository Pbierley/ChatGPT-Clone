import { describe, test, expect, beforeEach } from 'vitest';
import authReducer, { setAuth, clearAuth } from '../../authSlice';

const emptyState = { token: null, user: null };
const loggedInState = { token: 'tok_abc123', user: { id: 'u1', email: 'test@example.com' } };

describe('authSlice — unit', () => {
  beforeEach(() => localStorage.clear());

  test('initial state has null token and user when localStorage is empty', () => {
    const state = authReducer(undefined, { type: '@@INIT' });
    expect(state.token).toBeNull();
    expect(state.user).toBeNull();
  });

  test('setAuth stores token and user on state', () => {
    const state = authReducer(emptyState, setAuth(loggedInState));
    expect(state.token).toBe('tok_abc123');
    expect(state.user.email).toBe('test@example.com');
  });

  test('setAuth persists token to localStorage', () => {
    authReducer(emptyState, setAuth(loggedInState));
    expect(localStorage.getItem('auth_token')).toBe('tok_abc123');
  });

  test('setAuth persists user to localStorage as JSON', () => {
    authReducer(emptyState, setAuth(loggedInState));
    expect(JSON.parse(localStorage.getItem('auth_user')).email).toBe('test@example.com');
  });

  test('clearAuth resets token to null', () => {
    const state = authReducer(loggedInState, clearAuth());
    expect(state.token).toBeNull();
  });

  test('clearAuth resets user to null', () => {
    const state = authReducer(loggedInState, clearAuth());
    expect(state.user).toBeNull();
  });

  test('clearAuth removes token from localStorage', () => {
    localStorage.setItem('auth_token', 'tok_abc123');
    authReducer(loggedInState, clearAuth());
    expect(localStorage.getItem('auth_token')).toBeNull();
  });
});
