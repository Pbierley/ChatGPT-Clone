import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import LoginPage from '../../LoginPage';
import authReducer from '../../authSlice';

vi.mock('../../services/authApi', () => ({
  apiLogin: vi.fn(() => Promise.resolve({ token: 'tok', user: { id: '1', email: 'a@b.com' } })),
  apiRegister: vi.fn(() => Promise.resolve({ token: 'tok', user: { id: '1', email: 'a@b.com' } })),
}));

const renderWithStore = () => {
  const store = configureStore({ reducer: { auth: authReducer } });
  return render(<Provider store={store}><LoginPage /></Provider>);
};

describe('LoginPage — acceptance', () => {
  test('renders the app title', () => {
    renderWithStore();
    expect(screen.getByText('ChatGPT Clone')).toBeInTheDocument();
  });

  test('shows Sign in subtitle by default', () => {
    renderWithStore();
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Sign in');
  });

  test('renders an email input', () => {
    renderWithStore();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
  });

  test('renders a password input', () => {
    renderWithStore();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  test('password input is hidden by default', () => {
    renderWithStore();
    expect(screen.getByPlaceholderText('Password')).toHaveAttribute('type', 'password');
  });

  test('clicking Register link switches subtitle to Create account', () => {
    renderWithStore();
    fireEvent.click(screen.getByText('Register'));
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Create account');
  });

  test('clicking Sign in link switches subtitle back', () => {
    renderWithStore();
    fireEvent.click(screen.getByText('Register'));
    fireEvent.click(screen.getByText('Sign in'));
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Sign in');
  });

  test('submit button is present', () => {
    renderWithStore();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  test('typing in email field updates its value', () => {
    renderWithStore();
    const emailInput = screen.getByPlaceholderText('Email');
    fireEvent.change(emailInput, { target: { value: 'user@test.com' } });
    expect(emailInput.value).toBe('user@test.com');
  });

  test('typing in password field updates its value', () => {
    renderWithStore();
    const passwordInput = screen.getByPlaceholderText('Password');
    fireEvent.change(passwordInput, { target: { value: 'secret123' } });
    expect(passwordInput.value).toBe('secret123');
  });
});
