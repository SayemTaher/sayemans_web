// Persist selected slices to localStorage (browser only).
const KEYS = {
  'ui/setTheme': (s) => ['sayemans:theme', s.ui.theme],
  'consent/setConsent': (s) => ['sayemans:consent', JSON.stringify(s.consent)],
};

export const persistMiddleware = (api) => (next) => (action) => {
  const result = next(action);
  const pick = action && KEYS[action.type];
  if (pick && typeof window !== 'undefined') {
    try {
      const [key, value] = pick(api.getState());
      localStorage.setItem(key, value);
    } catch {
      /* storage unavailable */
    }
  }
  return result;
};

export function readPersisted() {
  const out = {};
  try {
    const theme = localStorage.getItem('sayemans:theme');
    if (theme) out.theme = theme;
    const consent = localStorage.getItem('sayemans:consent');
    if (consent) out.consent = JSON.parse(consent);
  } catch {
    /* ignore */
  }
  return out;
}
