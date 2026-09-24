import { betterAuth } from "better-auth";
import { firestoreAdapter } from "./firestore-adapter";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET || "default_dev_secret_32_characters_long_entropy",
  database: firestoreAdapter(),
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 days persistent session
    updateAge: 60 * 60 * 24, // 1 day rolling renewal
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes in-memory / cookie cache
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "mock-google-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "mock-google-client-secret",
      enabled: true,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "mock-github-client-id",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "mock-github-client-secret",
      enabled: true,
    },
  },
  trustedOrigins: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://viewmarket.in",
    "https://www.viewmarket.in",
    "https://*.run.app",
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ],
});

export type Session = typeof auth.$Infer.Session;
