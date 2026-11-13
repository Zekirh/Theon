import { afterEach, describe, expect, it, vi } from "vitest";

import { getFirebaseConfig } from "@/lib/firebase";

describe("getFirebaseConfig", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("reads Firebase settings from Vite environment variables", () => {
    vi.stubEnv("VITE_FIREBASE_API_KEY", "test-api-key");
    vi.stubEnv("VITE_FIREBASE_AUTH_DOMAIN", "test-project.firebaseapp.com");
    vi.stubEnv("VITE_FIREBASE_PROJECT_ID", "test-project");
    vi.stubEnv("VITE_FIREBASE_STORAGE_BUCKET", "test-project.appspot.com");
    vi.stubEnv("VITE_FIREBASE_MESSAGING_SENDER_ID", "123456789");
    vi.stubEnv("VITE_FIREBASE_APP_ID", "1:123456789:web:abcdef");
    vi.stubEnv("VITE_FIREBASE_MEASUREMENT_ID", "G-TEST");

    expect(getFirebaseConfig()).toEqual({
      apiKey: "test-api-key",
      authDomain: "test-project.firebaseapp.com",
      projectId: "test-project",
      storageBucket: "test-project.appspot.com",
      messagingSenderId: "123456789",
      appId: "1:123456789:web:abcdef",
      measurementId: "G-TEST",
    });
  });
});
