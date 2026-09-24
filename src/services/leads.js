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

/** Reject if a promise takes too long (Firestore retries forever when offline). */
const withTimeout = (promise, ms = 8000) =>
  Promise.race([promise, new Promise((_, reject) => setTimeout(() => reject(new Error('Timed out')), ms))]);

/** Save a copy to Firestore (admin dashboard), or the local adapter in dev. */
async function store(collection, data, docId) {
  if (!isFirebaseConfigured) {
    localDb.add(collection, data);
    return;
  }
  const { db, fs } = await getDb();
  const payload = { ...data, createdAt: fs.serverTimestamp() };
  await withTimeout(docId ? fs.setDoc(fs.doc(db, collection, docId), payload) : fs.addDoc(fs.collection(db, collection), payload));
}

/** Run email + storage in parallel; succeed if either one worked. */
async function deliver(label, mailPromise, storePromise) {
  const [mail, saved] = await Promise.allSettled([mailPromise, storePromise]);
  if (import.meta.env.DEV) {
    if (mail.status === 'rejected') console.warn(`[${label}] email failed`, mail.reason);
    if (saved.status === 'rejected') console.warn(`[${label}] store failed`, saved.reason);
  }
  if (mail.status === 'fulfilled' || saved.status === 'fulfilled') {
    return { ok: true, emailed: mail.status === 'fulfilled', stored: saved.status === 'fulfilled' };
  }
  throw mail.reason;
}

/**
 * Submit a project inquiry. Two independent channels run in parallel:
 *   1. email via the Worker (/api/contact → Resend → studio inbox)
 *   2. a copy in Firestore `leads` (admin dashboard)
 * The visitor sees success if either channel worked, so a lead is never
 * lost when one of them is down or not configured yet.
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

  return deliver('lead', postApi('/api/contact', { ...lead, hp: input.hp || '' }), store('leads', lead));
}

export async function subscribe(email, source = 'footer') {
  const clean = email.trim().toLowerCase();
  return deliver('subscribe', postApi('/api/subscribe', { email: clean, source }), store('subscribers', { email: clean, source }, clean));
}
