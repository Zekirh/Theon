import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const DEFAULT_FIREBASE_CONFIG = {
  apiKey: "demo-api-key",
  authDomain: "demo-project.firebaseapp.com",
  projectId: "demo-project",
  storageBucket: "demo-project.firebasestorage.app",
  messagingSenderId: "000000000000",
  appId: "1:000000000000:web:0000000000000000000000",
  measurementId: "G-0000000000",
} as const;

function readFirebaseEnv(key: string, fallback: string) {
  const envValue =
    import.meta.env[key] ??
    import.meta.env[key.replace(/^VITE_/, "EXPO_PUBLIC_")] ??
    import.meta.env[key.replace(/^EXPO_PUBLIC_/, "VITE_")];

  if (typeof envValue === "string" && envValue.trim().length > 0) {
    return envValue;
  }

  return fallback;
}

export function getFirebaseConfig() {
  return {
    apiKey: readFirebaseEnv("VITE_FIREBASE_API_KEY", DEFAULT_FIREBASE_CONFIG.apiKey),
    authDomain: readFirebaseEnv(
      "VITE_FIREBASE_AUTH_DOMAIN",
      DEFAULT_FIREBASE_CONFIG.authDomain,
    ),
    projectId: readFirebaseEnv(
      "VITE_FIREBASE_PROJECT_ID",
      DEFAULT_FIREBASE_CONFIG.projectId,
    ),
    storageBucket: readFirebaseEnv(
      "VITE_FIREBASE_STORAGE_BUCKET",
      DEFAULT_FIREBASE_CONFIG.storageBucket,
    ),
    messagingSenderId: readFirebaseEnv(
      "VITE_FIREBASE_MESSAGING_SENDER_ID",
      DEFAULT_FIREBASE_CONFIG.messagingSenderId,
    ),
    appId: readFirebaseEnv("VITE_FIREBASE_APP_ID", DEFAULT_FIREBASE_CONFIG.appId),
    measurementId: readFirebaseEnv(
      "VITE_FIREBASE_MEASUREMENT_ID",
      DEFAULT_FIREBASE_CONFIG.measurementId,
    ),
  };
}

const firebaseConfig = getFirebaseConfig();
const app = initializeApp(firebaseConfig);

let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, analytics };
