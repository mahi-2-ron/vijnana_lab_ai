import { SubjectData, NavItem } from './types';
import { physicsData } from "./data/physics_data";
import { chemistryData } from "./data/chemistry_data";
import { biologyData } from "./data/biology_data";
import { mathData } from "./data/math_data";
import { csData } from "./data/cs_data";

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/home' },
  { label: 'Subjects', path: '/subjects' },
  { label: 'Blog', path: '/blog' },
  { label: 'AI Tutor', path: '/tutor' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export const SUBJECTS: SubjectData[] = [
  physicsData,
  chemistryData,
  biologyData,
  mathData,
  csData
];
