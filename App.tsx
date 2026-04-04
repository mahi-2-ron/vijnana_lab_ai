import React from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AIFloatingTutor from './components/AIFloatingTutor';

import Login from './pages/Login';
import Home from './pages/Home';
import Subjects from './pages/Subjects';
import SubjectView from './pages/SubjectView';
import LabView from './pages/LabView';
import AITutor from './pages/AITutor';
import About from './pages/About';
import Contact from './pages/Contact';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import Profile from './pages/Profile';
import SyllabusSelector from './pages/SyllabusSelector';
import TeacherLogin from './pages/TeacherLogin';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    // Multiple strategies for reliable scroll-to-top with HashRouter
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null;
};

const AppContent: React.FC = () => {
  const location = useLocation();

  const isLabView = /^\/subjects\/[\w-]+\/[\w-]+$/.test(location.pathname);
  const isLoginView = ['/login', '/teacher/login', '/admin/login'].includes(location.pathname);

  return (
    <div className="font-sans antialiased min-h-screen flex flex-col">
      <ScrollToTop />

      {!isLoginView && <Navbar />}

      <main className="flex-1 flex flex-col">
        <Routes>
          {/* ENTRY */}
          <Route path="/" element={<Navigate to="/home" replace />} />

          {/* AUTH */}
          <Route path="/login" element={<Login />} />
          <Route path="/teacher/login" element={<TeacherLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* MAIN APP */}
          <Route path="/home" element={<Home />} />
          <Route path="/syllabus" element={<SyllabusSelector />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/subjects/:subjectId" element={<SubjectView />} />
          <Route path="/subjects/:subjectId/:labId" element={<LabView />} />
          <Route path="/tutor" element={<AITutor />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route
            path="/student-dashboard"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/teacher-dashboard"
            element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <TeacherDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={['superadmin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/profile" element={<Profile />} />

          {/* FALLBACK */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </main>

      {(!isLabView && !isLoginView) && <Footer />}

      {/* Global Floating AI Tutor — available on every page */}
      <AIFloatingTutor />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
