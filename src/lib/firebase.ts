import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import firebaseConfigData from '../../firebase-applet-config.json';

const defaultConfig = {
  apiKey: "AIzaSyB1rMuatl2TofmRGZYhNVdq7iKPZqmTkCI",
  authDomain: "gen-lang-client-0477788376.firebaseapp.com",
  projectId: "gen-lang-client-0477788376",
  storageBucket: "gen-lang-client-0477788376.firebasestorage.app",
  messagingSenderId: "954735391789",
  appId: "1:954735391789:web:03010193794dff8d8574a4",
  firestoreDatabaseId: "ai-studio-campusconnectsma-270c62e1-26aa-400f-b6b8-25f830ae4461"
};

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || firebaseConfigData?.apiKey || defaultConfig.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || firebaseConfigData?.authDomain || defaultConfig.authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || firebaseConfigData?.projectId || defaultConfig.projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || firebaseConfigData?.storageBucket || defaultConfig.storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || firebaseConfigData?.messagingSenderId || defaultConfig.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || firebaseConfigData?.appId || defaultConfig.appId,
  firestoreDatabaseId: import.meta.env.VITE_FIREBASE_DATABASE_ID || firebaseConfigData?.firestoreDatabaseId || defaultConfig.firestoreDatabaseId,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || '(default)');
export const storage = getStorage(app);
export default app;

