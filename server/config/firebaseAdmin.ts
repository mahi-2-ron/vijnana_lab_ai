import admin from 'firebase-admin';
import path from 'path';
import { readFileSync } from 'fs';

try {
  const serviceAccountPath = path.resolve(process.cwd(), 'scripts', 'serviceAccountKey.json');
  const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  }
} catch (error) {
  console.error('Firebase Admin initialization error (can be ignored if not using admin endpoints):', error);
}

export default admin;
 
