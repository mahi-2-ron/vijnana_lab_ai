import { auth, db } from './firebase';
import { doc, getDoc, collection, getDocs, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export interface UserRecord {
  uid: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  assignedSubjects?: string[];
}

export const getUserRole = async (uid: string): Promise<string> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      const data = userDoc.data();
      return (data.role || 'student').toLowerCase();
    }
    return 'student';
  } catch (error) {
    console.error("Error fetching user role:", error);
    return 'student';
  }
};

export const createTeacherAccount = async (data: { name: string; email: string; password: string; assignedSubjects?: string[] }) => {
  try {
    const response = await fetch('http://localhost:5000/api/users/create-teacher', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error || "Failed to create teacher account via API");
    }
    
    return { success: true, uid: result.uid };
  } catch (error: any) {
    console.error("Error creating teacher account:", error);
    throw error;
  }
};

export const getAllUsers = async (): Promise<UserRecord[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const users: UserRecord[] = [];
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      users.push({
        uid: docSnap.id,
        name: data.name || '',
        email: data.email || '',
        role: (data.role || 'student').toLowerCase(),
        createdAt: data.createdAt || '',
        assignedSubjects: data.assignedSubjects
      });
    });
    return users;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};
 
