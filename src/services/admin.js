// Admin data access: auth + dashboard queries.
import { getAuthInstance, getDb, isFirebaseConfigured } from './firebase.js';
import { localDb } from './localAdapter.js';

const DEV_ADMIN = { uid: 'local-dev', email: 'dev@localhost' };

export async function watchAuth(onChange) {
  if (!isFirebaseConfigured) {
    const signed = sessionStorage.getItem('sayemans:dev-admin') === '1';
    onChange(signed ? { user: DEV_ADMIN, isAdmin: true } : { user: null, isAdmin: false });
    return () => {};
  }
  const [{ auth, a }, { db, fs }] = await Promise.all([getAuthInstance(), getDb()]);
  return a.onAuthStateChanged(auth, async (user) => {
    if (!user) return onChange({ user: null, isAdmin: false });
    let isAdmin = false;
    try {
      isAdmin = (await fs.getDoc(fs.doc(db, 'admins', user.uid))).exists();
    } catch {
      isAdmin = false;
    }
    onChange({ user: { uid: user.uid, email: user.email }, isAdmin });
  });
}

export async function signIn(email, password) {
  if (!isFirebaseConfigured) {
    if (!import.meta.env.DEV) throw new Error('Backend is not configured.');
    sessionStorage.setItem('sayemans:dev-admin', '1');
    return;
  }
  const { auth, a } = await getAuthInstance();
  await a.signInWithEmailAndPassword(auth, email, password);
}

export async function signOut() {
  if (!isFirebaseConfigured) {
    sessionStorage.removeItem('sayemans:dev-admin');
    return;
  }
  const { auth, a } = await getAuthInstance();
  await a.signOut(auth);
}

const toDate = (v) => (v?.toDate ? v.toDate() : new Date(v));

export async function fetchCollection(name, max = 200) {
  if (!isFirebaseConfigured) return localDb.list(name).map((d) => ({ ...d, createdAt: new Date(d.createdAt) }));
  const { db, fs } = await getDb();
  const snap = await fs.getDocs(fs.query(fs.collection(db, name), fs.orderBy('createdAt', 'desc'), fs.limit(max)));
  return snap.docs.map((d) => ({ id: d.id, ...d.data(), createdAt: toDate(d.data().createdAt) }));
}

export async function updateLeadStatus(id, status) {
  if (!isFirebaseConfigured) return localDb.update('leads', id, { status });
  const { db, fs } = await getDb();
  await fs.updateDoc(fs.doc(db, 'leads', id), { status });
}
