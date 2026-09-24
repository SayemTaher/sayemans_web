// First-party, consent-aware analytics.
// Nothing is collected until the visitor opts in to analytics cookies.
// Events go to Firestore `events` (for the admin dashboard) and, if a
// measurement ID is configured, to Google Analytics 4 via Firebase Analytics.
import { getApp, getDb, isFirebaseConfigured } from './firebase.js';
import { localDb } from './localAdapter.js';

let enabled = false;
let ga = null; // { analytics, logEvent }
const queue = [];

const isBrowser = typeof window !== 'undefined';

function id(storage, key) {
  try {
    let v = storage.getItem(key);
    if (!v) {
      v = crypto.randomUUID().replace(/-/g, '');
      storage.setItem(key, v);
    }
    return v;
  } catch {
    return 'anonymous-session';
  }
}

/** UTM + referrer captured on first landing (session scoped). */
export function getAttribution() {
  if (!isBrowser) return {};
  try {
    const cached = sessionStorage.getItem('sayemans:attr');
    if (cached) return JSON.parse(cached);
    const p = new URLSearchParams(location.search);
    const attr = {
      landing: location.pathname,
      referrer: document.referrer ? new URL(document.referrer).hostname : '',
      utm_source: p.get('utm_source') || '',
      utm_medium: p.get('utm_medium') || '',
      utm_campaign: p.get('utm_campaign') || '',
    };
    sessionStorage.setItem('sayemans:attr', JSON.stringify(attr));
    return attr;
  } catch {
    return {};
  }
}

function device() {
  const w = window.innerWidth;
  return {
    type: w < 768 ? 'mobile' : w < 1024 ? 'tablet' : 'desktop',
    lang: navigator.language,
    screen: `${screen.width}x${screen.height}`,
    tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
}

async function send(evt) {
  const attr = getAttribution();
  const doc = {
    type: evt.type,
    name: evt.name || evt.type,
    path: evt.path || location.pathname,
    referrer: attr.referrer || '',
    sessionId: id(sessionStorage, 'sayemans:sid'),
    visitorId: id(localStorage, 'sayemans:vid'),
    utm: { source: attr.utm_source, medium: attr.utm_medium, campaign: attr.utm_campaign },
    device: device(),
    props: evt.props || {},
  };

  if (ga) ga.logEvent(ga.analytics, evt.type === 'page_view' ? 'page_view' : doc.name, { page_path: doc.path, ...doc.props });

  if (!isFirebaseConfigured) {
    localDb.add('events', doc);
    return;
  }
  try {
    const { db, fs } = await getDb();
    await fs.addDoc(fs.collection(db, 'events'), { ...doc, createdAt: fs.serverTimestamp() });
  } catch (err) {
    if (import.meta.env.DEV) console.warn('[analytics]', err);
  }
}

export async function setAnalyticsConsent(granted) {
  enabled = granted;
  if (!granted) {
    queue.length = 0;
    return;
  }
  if (isFirebaseConfigured && import.meta.env.VITE_FIREBASE_MEASUREMENT_ID && !ga) {
    try {
      const [app, mod] = await Promise.all([getApp(), import('firebase/analytics')]);
      if (await mod.isSupported()) ga = { analytics: mod.getAnalytics(app), logEvent: mod.logEvent };
    } catch {
      /* analytics optional */
    }
  }
  while (queue.length) send(queue.shift());
}

export function track(type, props = {}, name) {
  if (!isBrowser) return;
  const evt = { type, name, props, path: location.pathname };
  if (enabled) send(evt);
  else if (queue.length < 20) queue.push(evt); // held until consent is decided
}

export const trackPageView = () => track('page_view', {}, 'page_view');
