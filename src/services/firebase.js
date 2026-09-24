// Lazy Firebase bootstrap. Firebase SDKs are only downloaded when a feature
// actually needs them (form submit, consented analytics, admin), keeping the
// initial bundle small. When env vars are missing, `isFirebaseConfigured`
// is false and services fall back to the local adapter.

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

export const isFirebaseConfigured = Boolean(config.apiKey && config.projectId && config.appId);

let appPromise;
export function getApp() {
  if (!isFirebaseConfigured) return Promise.reject(new Error('Firebase is not configured'));
  appPromise ??= import('firebase/app').then(async ({ initializeApp }) => {
    const app = initializeApp(config);
    const siteKey = import.meta.env.VITE_FIREBASE_APPCHECK_KEY;
    if (siteKey) {
      const { initializeAppCheck, ReCaptchaEnterpriseProvider } = await import('firebase/app-check');
      initializeAppCheck(app, { provider: new ReCaptchaEnterpriseProvider(siteKey), isTokenAutoRefreshEnabled: true });
    }
    return app;
  });
  return appPromise;
}

let dbPromise;
export function getDb() {
  dbPromise ??= Promise.all([getApp(), import('firebase/firestore')]).then(([app, fs]) => ({
    db: fs.getFirestore(app),
    fs,
  }));
  return dbPromise;
}

let authPromise;
export function getAuthInstance() {
  authPromise ??= Promise.all([getApp(), import('firebase/auth')]).then(([app, a]) => ({
    auth: a.getAuth(app),
    a,
  }));
  return authPromise;
}
