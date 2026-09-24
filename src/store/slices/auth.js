import { createSlice } from '../core.js';

// Admin authentication state (Firebase Auth).
const auth = createSlice({
  name: 'auth',
  initialState: { status: 'idle', user: null, isAdmin: false, error: null },
  reducers: {
    pending: (s) => ({ ...s, status: 'loading', error: null }),
    signedIn: (s, { payload }) => ({ ...s, status: 'ready', user: payload.user, isAdmin: payload.isAdmin, error: null }),
    signedOut: () => ({ status: 'ready', user: null, isAdmin: false, error: null }),
    failed: (s, { payload }) => ({ ...s, status: 'ready', error: payload }),
  },
});

export const authActions = auth.actions;
export const selectAuth = (st) => st.auth;
export default auth.reducer;
