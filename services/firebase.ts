import { getApps, getApp, initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  updateProfile,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  updateDoc,
  setDoc
} from 'firebase/firestore';

// Configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1nL3MsH3sQvlIi-ukKhPrm7nW2Vqosoo",
  authDomain: "vijnanalab.firebaseapp.com",
  projectId: "vijnanalab",
  storageBucket: "vijnanalab.firebasestorage.app",
  messagingSenderId: "407063617574",
  appId: "1:407063617574:web:5b216eb4363c41dfd6c6e7"
};

// Initialize Firebase (Robust pattern)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

// Set default persistence
setPersistence(auth, browserLocalPersistence).catch(err => console.error("Auth persistence error:", err));

const googleProvider = new GoogleAuthProvider();

// Configure Google Provider
googleProvider.addScope('profile');
googleProvider.addScope('email');

/**
 * Updates user data in Firestore and optionally syncs basic profile info to Firebase Auth.
 * @param uid User ID
 * @param data Object containing fields to update
 */
const updateUserData = async (uid: string, data: any) => {
    try {
        const userRef = doc(db, "users", uid);
        await setDoc(userRef, data, { merge: true });

        // Sync with Auth Profile if name or avatar is changed
        if (auth.currentUser && (data.name || data.avatar)) {
            const profileUpdates: { displayName?: string; photoURL?: string } = {};
            if (data.name) profileUpdates.displayName = data.name;
            if (data.avatar) profileUpdates.photoURL = data.avatar;
            
            if (Object.keys(profileUpdates).length > 0) {
                await updateProfile(auth.currentUser, profileUpdates);
            }
        }
        return true;
    } catch (error) {
        console.error("Error updating user data:", error);
        throw error;
    }
};

// Export direct SDK functions using cleaner syntax
export { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';

export { 
  doc, 
  setDoc, 
  getDoc,
  updateDoc
} from 'firebase/firestore';

// Export services and custom helpers
export { 
  auth, 
  db, 
  googleProvider,
  updateUserData
}; 
