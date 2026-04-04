import admin from 'firebase-admin';
import { readFile } from 'fs/promises';

const serviceAccount = JSON.parse(
  await readFile(new URL('./serviceAccountKey.json', import.meta.url))
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function resetPasswords() {
  try {
    const adminUser = await admin.auth().getUserByEmail('admin@vijnanalab.com');
    await admin.auth().updateUser(adminUser.uid, { password: 'Admin123!' });
    console.log('Successfully updated password for admin@vijnanalab.com to Admin123!');

    const teacherUser = await admin.auth().getUserByEmail('demo_teacher@vijnanalab.com');
    await admin.auth().updateUser(teacherUser.uid, { password: 'Teacher123!' });
    console.log('Successfully updated password for demo_teacher@vijnanalab.com to Teacher123!');

  } catch (error) {
    console.error('Error updating passwords:', error);
  } finally {
    process.exit(0);
  }
}

resetPasswords();
