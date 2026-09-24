import { createSlice } from '../core.js';

const ui = createSlice({
  name: 'ui',
  initialState: {
    theme: 'system', // 'light' | 'dark' | 'system'
    navOpen: false,
    toast: null, // { id, message, tone }
  },
  reducers: {
    setTheme: (s, { payload }) => ({ ...s, theme: payload }),
    toggleNav: (s) => ({ ...s, navOpen: !s.navOpen }),
    closeNav: (s) => (s.navOpen ? { ...s, navOpen: false } : s),
    showToast: (s, { payload }) => ({ ...s, toast: { id: Date.now(), tone: 'default', ...payload } }),
    clearToast: (s) => ({ ...s, toast: null }),
  },
});

export const { setTheme, toggleNav, closeNav, showToast, clearToast } = ui.actions;
export const selectTheme = (st) => st.ui.theme;
export const selectNavOpen = (st) => st.ui.navOpen;
export const selectToast = (st) => st.ui.toast;
export default ui.reducer;
