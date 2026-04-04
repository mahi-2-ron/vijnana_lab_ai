import { Router, Request, Response } from 'express';
import User from '../models/User';
import admin from '../config/firebaseAdmin';

const router = Router();

// POST /api/users/create-teacher - Create a teacher from backend (bypasses client auth state swap & rules)
router.post('/create-teacher', async (req: Request, res: Response) => {
  try {
    const { name, email, password, assignedSubjects } = req.body;
    
    // Create the user in Firebase Auth
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    });
    
    // Set custom claim
    await admin.auth().setCustomUserClaims(userRecord.uid, { role: 'teacher' });
    
    // Create the firestore document bypassing rules
    await admin.firestore().collection('users').doc(userRecord.uid).set({
      name,
      email,
      role: 'teacher',
      assignedSubjects: assignedSubjects || [],
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    res.status(200).json({ success: true, uid: userRecord.uid });
  } catch (error: any) {
    console.error("Error creating teacher via api:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/users — Create or sync user from Firebase
router.post('/', async (req: Request, res: Response) => {
  try {
    const { firebaseUID, name, email, role, grade, institution } = req.body;

    // Upsert: create if not exists, update if exists
    const user = await User.findOneAndUpdate(
      { firebaseUID },
      { 
        firebaseUID, name, email, role, grade, institution,
        lastActive: new Date()
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({ success: true, data: user });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/users/:firebaseUID — Get user profile
router.get('/:firebaseUID', async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ firebaseUID: req.params.firebaseUID });
    if (!user) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }
    res.status(200).json({ success: true, data: user });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT /api/users/:firebaseUID — Update user profile
router.put('/:firebaseUID', async (req: Request, res: Response) => {
  try {
    const user = await User.findOneAndUpdate(
      { firebaseUID: req.params.firebaseUID },
      { ...req.body, lastActive: new Date() },
      { new: true }
    );
    if (!user) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }
    res.status(200).json({ success: true, data: user });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/users/:firebaseUID/stats — Get user dashboard stats
router.get('/:firebaseUID/stats', async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ firebaseUID: req.params.firebaseUID });
    if (!user) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }
    res.status(200).json({
      success: true,
      data: {
        labsCompleted: user.labsCompleted,
        totalScore: user.totalScore,
        streak: user.streak,
        lastActive: user.lastActive,
        memberSince: user.createdAt
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
 
