import { getDb, isFirebaseConfigured } from './firebase.js';
import { localDb } from './localAdapter.js';
import { getAttribution } from './analytics.js';

/**
 * Submit a project inquiry. Shape is enforced by firestore.rules.
 * @returns {Promise<{ id: string }>}
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

  if (!isFirebaseConfigured) {
    const doc = localDb.add('leads', lead);
    return { id: doc.id };
  }
  const { db, fs } = await getDb();
  const ref = await fs.addDoc(fs.collection(db, 'leads'), { ...lead, createdAt: fs.serverTimestamp() });
  return { id: ref.id };
}

export async function subscribe(email, source = 'footer') {
  const clean = email.trim().toLowerCase();
  if (!isFirebaseConfigured) {
    localDb.add('subscribers', { email: clean, source });
    return;
  }
  const { db, fs } = await getDb();
  await fs.setDoc(fs.doc(db, 'subscribers', clean), { email: clean, source, createdAt: fs.serverTimestamp() });
}
