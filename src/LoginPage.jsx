import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { setAuth } from './authSlice';
import { apiLogin, apiRegister } from './services/authApi';

const LoginPage = () => {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = mode === 'login'
        ? await apiLogin(email, password)
        : await apiRegister(email, password);
      dispatch(setAuth(data));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setMode(m => m === 'login' ? 'register' : 'login');
    setError('');
  };

  return (
    <div className="login_page">
      <div className="login_card">
        <h1 className="login_title">ChatGPT Clone</h1>
        <h2 className="login_subtitle">{mode === 'login' ? 'Sign in' : 'Create account'}</h2>
        <form className="login_form" onSubmit={handleSubmit}>
          <input
            className="login_input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoFocus
          />
          <div className="login_password_wrapper">
            <input
              className="login_input login_password_input"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="login_password_toggle"
              onClick={() => setShowPassword(v => !v)}
              tabIndex={-1}
            >
              {showPassword
                ? <AiOutlineEyeInvisible size={18} />
                : <AiOutlineEye size={18} />}
            </button>
          </div>
          {error && <p className="login_error">{error}</p>}
          <button className="login_button" type="submit" disabled={loading}>
            {loading ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}
          </button>
        </form>
        <p className="login_switch">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <span className="login_switch_link" onClick={switchMode}>
            {mode === 'login' ? 'Register' : 'Sign in'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
