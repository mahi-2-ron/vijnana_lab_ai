import admin from 'firebase-admin';
import { readFile } from 'fs/promises';

const serviceAccount = JSON.parse(
  await readFile(new URL('./serviceAccountKey.json', import.meta.url))
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function setAdminClaim() {
  const adminEmail = 'admin@vijnanalab.com';
  
  try {
    let userRecord;
    try {
        userRecord = await admin.auth().getUserByEmail(adminEmail);
        console.log('Found user:', userRecord.uid);
    } catch (e) {
        userRecord = await admin.auth().createUser({
            email: adminEmail,
            emailVerified: true,
            password: 'Admin123!',
            displayName: 'System Admin',
            disabled: false,
        });
        console.log('Created user:', userRecord.uid);
    }
    
    const adminUID = userRecord.uid;

    console.log('Setting custom claim...');
    await admin.auth().setCustomUserClaims(adminUID, { role: 'superadmin' });
    console.log('Claim set.');

    // console.log('Writing to Firestore...');
    // await admin.firestore().doc(`users/${adminUID}`).set({
    //  role: 'superadmin',
    //  name: 'System Admin',
    //  email: adminEmail,
    //  createdAt: admin.firestore.FieldValue.serverTimestamp(),
    // }, { merge: true });
    // console.log('Firestore write complete.');

    console.log(`✓ Custom claim set for UID: ${adminUID} (${adminEmail})`);
    console.log('  The admin user must sign out and sign back in for the claim to take effect.');
  } catch (err) {
    console.error('Failed to set claim. Detailed error:', err);
  } finally {
    process.exit(0);
  }
}

setAdminClaim();
