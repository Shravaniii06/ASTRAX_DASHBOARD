import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

let db = null;

try {
  const hasFirebaseKeys =
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY;

  if (hasFirebaseKeys) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
      }),
      databaseURL: process.env.FIREBASE_DATABASE_URL
    });

    db = admin.database();

    console.log("✅ Firebase connected successfully");
  } else {
    console.log("⚠️ Firebase keys not found — running in local demo mode");
  }
} catch (error) {
  console.log("⚠️ Firebase connection unavailable — local demo mode enabled");
  console.log(error.message);
}

export { db };