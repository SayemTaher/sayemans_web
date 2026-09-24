import { createSlice } from '../core.js';

const ui = createSlice({
  name: 'ui',
  initialState: {
    theme: 'system', // 'light' | 'dark' | 'system'
    navOpen: false,
    toast: null, // { id, message, tone }
    pendingLoads: 0, // number of things currently loading (drives the global loader)
  },
  reducers: {
    setTheme: (s, { payload }) => ({ ...s, theme: payload }),
    toggleNav: (s) => ({ ...s, navOpen: !s.navOpen }),
    closeNav: (s) => (s.navOpen ? { ...s, navOpen: false } : s),
    showToast: (s, { payload }) => ({ ...s, toast: { id: Date.now(), tone: 'default', ...payload } }),
    clearToast: (s) => ({ ...s, toast: null }),
    loadStart: (s) => ({ ...s, pendingLoads: s.pendingLoads + 1 }),
    loadEnd: (s) => ({ ...s, pendingLoads: Math.max(0, s.pendingLoads - 1) }),
    loadReset: (s) => (s.pendingLoads ? { ...s, pendingLoads: 0 } : s),
  },
});

export const { setTheme, toggleNav, closeNav, showToast, clearToast, loadStart, loadEnd, loadReset } = ui.actions;
export const selectTheme = (st) => st.ui.theme;
export const selectNavOpen = (st) => st.ui.navOpen;
export const selectToast = (st) => st.ui.toast;
export const selectPendingLoads = (st) => st.ui.pendingLoads;
export default ui.reducer;
