import { getDb, isFirebaseConfigured } from './firebase.js';
import { localDb } from './localAdapter.js';
import { getAttribution } from './analytics.js';

/**
 * POST to the Cloudflare Worker (worker/index.js). Returns the parsed JSON.
 * In `vite dev` there is no Worker, so a 404 falls back to the local adapter.
 */
async function postApi(path, payload) {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (res.status === 404 && import.meta.env.DEV) return { ok: true, devFallback: true };
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) {
    const err = new Error(data.error || `Request failed (${res.status})`);
    err.fields = data.errors;
    throw err;
  }
  return data;
}

/** Best-effort copy to Firestore (admin dashboard). Never blocks the user. */
async function storeCopy(collection, data) {
  try {
    if (!isFirebaseConfigured) {
      localDb.add(collection, data);
      return;
    }
    const { db, fs } = await getDb();
    await fs.addDoc(fs.collection(db, collection), { ...data, createdAt: fs.serverTimestamp() });
  } catch (err) {
    if (import.meta.env.DEV) console.warn(`[${collection}] store failed`, err);
  }
}

/**
 * Submit a project inquiry: emailed to the studio via /api/contact
 * (Resend), plus a copy in Firestore `leads` when Firebase is configured.
 */
export async function submitLead(input) {
  const lead = {
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    company: input.company?.trim() || '',
    website: input.website?.trim() || '',
    services: input.services ?? [],
    budget: input.budget || '',
    timeline: input.timeline || '',
    message: input.message.trim(),
    consent: input.consent === true,
    status: 'new',
    source: input.source || 'contact',
    meta: getAttribution(),
  };

  const result = await postApi('/api/contact', { ...lead, hp: input.hp || '' });
  storeCopy('leads', lead);
  return result;
}

export async function subscribe(email, source = 'footer') {
  const clean = email.trim().toLowerCase();
  await postApi('/api/subscribe', { email: clean, source });
  if (isFirebaseConfigured) {
    try {
      const { db, fs } = await getDb();
      await fs.setDoc(fs.doc(db, 'subscribers', clean), { email: clean, source, createdAt: fs.serverTimestamp() });
    } catch {
      /* optional */
    }
  } else {
    localDb.add('subscribers', { email: clean, source });
  }
}
