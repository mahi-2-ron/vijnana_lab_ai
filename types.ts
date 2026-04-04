
import { LucideIcon } from 'lucide-react';

export enum SubjectType {
  PHYSICS = 'Physics',
  CHEMISTRY = 'Chemistry',
  BIOLOGY = 'Biology',
  MATH = 'Math',
  CS = 'CS',
}

export interface VivaQuestion {
  question: string;
  answer: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface ObservationTable {
    columns: string[];
    rows?: number;
}

export interface Assignment {
  id: number;
  question: string;
  marks: number;
}

export interface LabContent {
  aim: string;
  requirements: string[];
  theory: string;
  procedure: string[];
  objectives: string[];
  safety?: string[];
  realWorldApplications?: string[];
  vivaQuestions?: VivaQuestion[];
  quizQuestions?: QuizQuestion[];
  observationTable?: ObservationTable;
  assignments?: Assignment[];
  videoId?: string;
}

export type Board = 'CBSE' | 'Karnataka PUC' | 'ICSE';
export type Standard = '1st PUC / Class 11' | '2nd PUC / Class 12';

export interface LabExperiment {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: string;
  category: string; 
  content?: LabContent;
  boards?: Board[];
  standards?: Standard[];
}

export interface SubjectData {
  id: string;
  name: SubjectType;
  icon: LucideIcon;
  color: string; // Tailwind color name (e.g. 'blue')
  hex: string; // Specific hex for glows/canvas
  description: string;
  labs: LabExperiment[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  isThinking?: boolean;
}

export interface NavItem {
  label: string;
  path: string;
}

// --- Business Model & Partnerships ---

export type PlanType = 'FREE' | 'STUDENT_PRO' | 'SCHOOL_PLAN' | 'GOV_PARTNER';

export interface UserUsage {
  labsOpenedToday: number;
  aiQueriesUsedToday: number;
  totalLabsCompleted: number;
  lastActiveDate: any; // Firestore Timestamp
  referralCode?: string;
  referredBy?: string;
  referralCount: number;
  proDaysEarned: number;
  examDate?: any; // Firestore Timestamp
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: 'student' | 'teacher' | 'school_admin' | 'gov_admin' | 'ngo_admin' | 'superadmin';
  plan: PlanType;
  schoolId?: string;
  isGovSchool?: boolean;
  schoolName?: string;
  district?: string;
  state?: string;
  usage?: UserUsage;
}

export interface NGOCohort {
  id: string;
  ngoName: string;
  cohortName: string;
  studentIds: string[];
  sponsoredUntil: any; // Firestore Timestamp
  district: string;
  state: string;
  impactScore?: number;
}

export interface GovSchool {
  udiseCode: string;
  schoolName: string;
  district: string;
  state: string;
  contactEmail: string;
  status: 'Invited' | 'Activated' | 'Active';
  onboardedAt?: any; // Firestore Timestamp
}

export interface ExamCountdownProps {
  examDate: Date;
  completedLabs: number;
  totalRequiredLabs: number;
}
