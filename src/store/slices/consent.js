import { createSlice } from '../core.js';

// status: 'unknown' (banner shown) | 'decided'
const consent = createSlice({
  name: 'consent',
  initialState: { status: 'unknown', analytics: false, marketing: false, updatedAt: null, hydrated: false },
  reducers: {
    hydrate: (s, { payload }) => ({ ...s, ...payload, hydrated: true }),
    setConsent: (s, { payload }) => ({
      ...s,
      status: 'decided',
      analytics: !!payload.analytics,
      marketing: !!payload.marketing,
      updatedAt: new Date().toISOString(),
    }),
    reopen: (s) => ({ ...s, status: 'unknown' }),
  },
});

export const { hydrate: hydrateConsent, setConsent, reopen: reopenConsent } = consent.actions;
export const selectConsent = (st) => st.consent;
export default consent.reducer;
