import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;

if (typeof window !== "undefined") {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
  auth = getAuth(app);
  db = getFirestore(app);
}

export function getNamedFirebaseApp(name: string): FirebaseApp {
  if (typeof window === "undefined") {
    throw new Error("[getNamedFirebaseApp] Firebase apps are only available in the browser.");
  }

  return getApps().some((existingApp) => existingApp.name === name)
    ? getApp(name)
    : initializeApp(firebaseConfig, name);
}

export function getAuthSafe(): Auth {
  if (!auth) throw new Error("[getAuthSafe] Firebase Auth not initialized yet.");
  return auth;
}

export function getDbSafe(): Firestore {
  if (!db) throw new Error("[getDbSafe] Firestore not initialized yet.");
  return db;
}

export { app, auth, db };
