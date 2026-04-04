import admin from 'firebase-admin';
import { readFile } from 'fs/promises';

const serviceAccount = JSON.parse(
  await readFile(new URL('./serviceAccountKey.json', import.meta.url))
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function createTeacher() {
  const teacherEmail = 'demo_teacher@vijnanalab.com';
  
  try {
    let userRecord;
    try {
        userRecord = await admin.auth().getUserByEmail(teacherEmail);
        console.log('Found teacher user:', userRecord.uid);
    } catch (e) {
        userRecord = await admin.auth().createUser({
            email: teacherEmail,
            emailVerified: true,
            password: 'Teacher123!',
            displayName: 'Demo Teacher',
            disabled: false,
        });
        console.log('Created teacher user:', userRecord.uid);
    }
    
    // Write teacher document directly to bypassing firestore rules restrictions
    await admin.firestore().doc(`users/${userRecord.uid}`).set({
      role: 'teacher',
      name: 'Demo Teacher',
      email: teacherEmail,
      assignedSubjects: ['Physics'],
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });

    // Explicitly set the custom claim for teacher as well for AuthContext routing
    await admin.auth().setCustomUserClaims(userRecord.uid, { role: 'teacher' });

    console.log(`✓ Teacher setup complete for: ${teacherEmail}`);
  } catch (err) {
    console.error('Failed to set teacher:', err);
  } finally {
    process.exit(0);
  }
}

createTeacher();
