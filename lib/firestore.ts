import { Firestore } from "@google-cloud/firestore";

declare global {
  var __firestore_db__: Firestore | undefined;
}

function getFirestoreClient(): Firestore {
  if (global.__firestore_db__) {
    return global.__firestore_db__;
  }

  const projectId = process.env.GCP_PROJECT_ID || "viewmarket-platform-2026";
  const clientEmail = process.env.GCP_CLIENT_EMAIL;
  const privateKey = process.env.GCP_PRIVATE_KEY?.replace(/\\n/g, "\n");

  const isBuildPhase =
    process.env.NEXT_PHASE === "phase-production-build" ||
    process.env.BUILDING_CONTAINER === "true";

  if (!privateKey && !process.env.K_SERVICE && !isBuildPhase && process.env.NODE_ENV === "production") {
    throw new Error(
      "Missing GCP credentials in environment variables (GCP_PROJECT_ID, GCP_CLIENT_EMAIL, GCP_PRIVATE_KEY)."
    );
  }

  const db = new Firestore({
    projectId,
    ignoreUndefinedProperties: true,
    ...(clientEmail && privateKey
      ? {
          credentials: {
            client_email: clientEmail,
            private_key: privateKey,
          },
        }
      : {}),
  });

  if (process.env.NODE_ENV !== "production") {
    global.__firestore_db__ = db;
  }

  return db;
}

export const firestore = getFirestoreClient();
