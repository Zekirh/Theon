// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVzrM-OOxgqRtbf2D2ZPpWnv9jhlNeMMo",
  authDomain: "forgepoint-3e246.firebaseapp.com",
  projectId: "forgepoint-3e246",
  storageBucket: "forgepoint-3e246.firebasestorage.app",
  messagingSenderId: "668961943697",
  appId: "1:668961943697:web:aae313946ceacb8ce20f30",
  measurementId: "G-H011N809J5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Analytics is only available in the browser (not SSR/build-time).
// isSupported() guards against non-browser environments.
let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, analytics };
