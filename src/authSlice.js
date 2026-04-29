import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('auth_token'),
    user: JSON.parse(localStorage.getItem('auth_user') || 'null'),
  },
  reducers: {
    setAuth: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem('auth_token', action.payload.token);
      localStorage.setItem('auth_user', JSON.stringify(action.payload.user));
    },
    clearAuth: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
