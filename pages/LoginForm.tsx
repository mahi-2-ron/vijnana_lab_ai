import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Atom, Mail, Lock, Loader2, AlertCircle, User, BookOpen, Building, Globe, Check, ArrowRight } from 'lucide-react';
import { auth, db, googleProvider } from '../services/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { signInSchema, signUpSchema, forgotPasswordSchema } from '../services/authValidation';

interface LoginFormProps {
  roleContext: 'student' | 'teacher' | 'superadmin';
}

const AVATARS = [
    'bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-red-500',
    'bg-yellow-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
];

const themeConfig = {
  student: {
    bg: 'bg-[#020617]',
    gradientFrom: 'from-slate-900',
    gradientTo: 'to-indigo-950',
    primaryColor: 'text-emerald-500',
    buttonGradient: 'from-indigo-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500',
    shadow: 'shadow-indigo-600/20',
    title: 'Student Portal',
    greeting: 'Welcome Back, Explorer.',
    subtitle: 'Perform real-time simulations, clear doubts instantly, and grow with smart AI guidance.',
    badgeBg: 'bg-emerald-600'
  },
  teacher: {
    bg: 'bg-slate-900',
    gradientFrom: 'from-purple-900',
    gradientTo: 'to-indigo-950',
    primaryColor: 'text-purple-400',
    buttonGradient: 'from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500',
    shadow: 'shadow-purple-600/20',
    title: 'Teacher Portal',
    greeting: 'Welcome Back, Educator.',
    subtitle: 'Manage your classes, assign virtual labs, and track student progress.',
    badgeBg: 'bg-purple-600'
  },
  superadmin: {
    bg: 'bg-black',
    gradientFrom: 'from-slate-900',
    gradientTo: 'to-slate-800',
    primaryColor: 'text-red-500',
    buttonGradient: 'from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500',
    shadow: 'shadow-slate-600/20',
    title: 'Admin Control Panel',
    greeting: 'Vijnana Lab Administration',
    subtitle: 'System management and platform analytics control centre.',
    badgeBg: 'bg-red-600'
  }
};

const LoginForm: React.FC<LoginFormProps> = ({ roleContext }) => {
  const navigate = useNavigate();
  const theme = themeConfig[roleContext];
  
  type FormMode = 'login' | 'signup' | 'forgot';
  const [mode, setMode] = useState<FormMode>('login');
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  const [profileData, setProfileData] = useState({
      grade: '',
      institution: '',
      language: 'English',
      avatar: 'bg-blue-500'
  });

  const resetState = () => {
    setError('');
    setInfo('');
    setStep(1);
  };

  const switchMode = (next: FormMode) => {
    resetState();
    setMode(next);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    resetState();
    
    const result = forgotPasswordSchema.safeParse({ email });
    if (!result.success) {
      setError(result.error.errors[0].message);
      setLoading(false);
      return;
    }
    
    try {
      await sendPasswordResetEmail(auth, result.data.email);
      setInfo('If an account exists for that email, a reset link has been sent. Check your inbox.');
    } catch (err: any) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    resetState();

    const result = signInSchema.safeParse({ email, password });
    if (!result.success) {
      setError(result.error.errors[0].message);
      setLoading(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, result.data.email, result.data.password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      let role = roleContext;
      
      // Reading from custom claims is primarily done in AuthContext globally,
      // but here we check database state to enforce specific portal routing restrictions.
      if (!userDoc.exists()) {
          await setDoc(doc(db, "users", user.uid), {
              name: user.displayName || user.email?.split('@')[0] || "User",
              email: user.email,
              role: roleContext,
              assignedSubjects: [],
              progress: { physics: 0, chemistry: 0, biology: 0, math: 0, cs: 0 },
              createdAt: new Date().toISOString()
          });
      } else {
          role = (userDoc.data().role || 'student').toLowerCase();
      }

      if (role !== roleContext) {
        await auth.signOut();
        throw new Error(`This login portal is for ${roleContext}s only.`);
      }

      if (role === 'student') navigate('/student-dashboard');
      else if (role === 'teacher') navigate('/teacher-dashboard');
      else if (role === 'superadmin') navigate('/admin/dashboard');
      else navigate('/home');
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    resetState();

    if (step === 1 && roleContext === 'student') {
        const partialResult = name.length > 1 && email.includes('@') && password.length >= 8 && password === confirmPassword;
        if (!partialResult) {
            setError(password !== confirmPassword ? "Passwords do not match." : "Please fill out all fields properly.");
            setLoading(false);
            return;
        }
        setStep(2);
        setLoading(false);
        return;
    }

    const result = signUpSchema.safeParse({ name, email, password, confirmPassword });
    if (!result.success) {
      setError(result.error.errors[0].message);
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, result.data.email, result.data.password);
      const user = userCredential.user;
      
      if (roleContext === 'student') {
          await setDoc(doc(db, "users", user.uid), {
              name: result.data.name,
              email: result.data.email,
              ...profileData,
              role: 'student',
              progress: { physics: 0, chemistry: 0, biology: 0, math: 0, cs: 0 },
              createdAt: new Date().toISOString()
          });
          navigate('/student-dashboard');
      } else {
          await setDoc(doc(db, "users", user.uid), {
              name: result.data.name,
              email: result.data.email,
              role: roleContext,
              assignedSubjects: [],
              createdAt: new Date().toISOString()
          });
          navigate(roleContext === 'teacher' ? '/teacher-dashboard' : '/admin/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
      setError('');
      setLoading(true);
      try {
          const result = await signInWithPopup(auth, googleProvider);
          const user = result.user;

          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          let role = roleContext;
          if (!docSnap.exists()) {
              if (roleContext === 'student') {
                  await setDoc(docRef, {
                      name: user.displayName || 'User',
                      email: user.email,
                      role: 'student',
                      grade: 'Not Specified',
                      institution: 'Not Specified',
                      language: 'English',
                      avatar: user.photoURL || 'bg-blue-500',
                      progress: { physics: 0, chemistry: 0, biology: 0, math: 0, cs: 0 },
                      createdAt: new Date().toISOString()
                  });
              } else {
                  await setDoc(docRef, {
                      name: user.displayName || 'User',
                      email: user.email,
                      role: roleContext,
                      assignedSubjects: [],
                      createdAt: new Date().toISOString()
                  });
              }
          } else {
              role = (docSnap.data().role || 'student').toLowerCase();
          }

          if (role !== roleContext) {
            await auth.signOut();
            throw new Error(`This portal is for ${roleContext}s only.`);
          }

          if (role === 'student') navigate('/student-dashboard');
          else if (role === 'teacher') navigate('/teacher-dashboard');
          else if (role === 'superadmin') navigate('/admin/dashboard');
      } catch (err: any) {
          setError(err.message || 'Google Sign-In failed');
      } finally {
          setLoading(false);
      }
  };

  return (
    <div className={`min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden ${theme.bg}`}>
      <div className="w-full max-w-4xl bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col md:flex-row relative z-10">
        
        {/* Left Side */}
        <div className={`md:w-1/2 p-8 md:p-12 bg-gradient-to-br ${theme.gradientFrom} ${theme.gradientTo} flex flex-col justify-between relative overflow-hidden`}>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className={`p-2 ${theme.badgeBg} rounded-lg shadow-lg`}>
                <Atom className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-display font-bold text-white tracking-tight">{theme.title}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              {mode === 'signup' ? "Start Your Scientific Journey." : mode === 'forgot' ? "Recover Setup" : theme.greeting}
            </h2>
            <p className="text-gray-300 leading-relaxed font-light">{theme.subtitle}</p>
          </div>
          <div className="absolute -bottom-20 -right-20 text-white/5 rotate-12">
            <Atom size={300} />
          </div>
        </div>

        {/* Right Side */}
        <div className="md:w-1/2 p-8 md:p-12 bg-black/20 flex flex-col justify-center">
          
          <form onSubmit={mode === 'login' ? handleSignIn : mode === 'signup' ? handleSignUp : handleForgotPassword} className="space-y-6">
            
            {/* Header Switcher */}
            {mode !== 'forgot' && (
              <div className="flex justify-end mb-6">
                  <button
                      onClick={() => switchMode(mode === 'login' ? 'signup' : 'login')}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                      type="button"
                  >
                      {mode === 'signup' ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
                  </button>
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm">
                <AlertCircle size={16} /> {error}
              </div>
            )}
            
            {info && (
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3 text-green-400 text-sm">
                <Check size={16} /> {info}
              </div>
            )}

            {mode === 'forgot' && (
              <div className="space-y-4 animate-in slide-in-from-left-8 fade-in duration-300">
                <h2 className="text-lg text-white font-medium mb-2">Reset your password</h2>
                <div className="relative group">
                  <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:${theme.primaryColor} transition-colors`} size={18} />
                  <input
                    type="email"
                    placeholder="Enrolled Email Address"
                    className="w-full bg-black/20 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-white/50 focus:bg-white/5 transition-all"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="flex justify-end pt-2">
                    <button type="button" onClick={() => switchMode('login')} className="text-xs text-gray-400 hover:text-white transition-colors">
                        Back to Log In
                    </button>
                </div>
              </div>
            )}

            {(mode !== 'forgot' && step === 1) && (
              <div className="space-y-4 animate-in slide-in-from-left-8 fade-in duration-300">
                {mode === 'signup' && (
                    <div className="relative group">
                        <User className={`absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:${theme.primaryColor} transition-colors`} size={18} />
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full bg-black/20 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-white/50 focus:bg-white/5 transition-all"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required={mode === 'signup'}
                        />
                    </div>
                )}
                
                <div className="relative group">
                  <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:${theme.primaryColor} transition-colors`} size={18} />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className={`w-full bg-black/20 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-white/50 focus:bg-white/5 transition-all`}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="relative group">
                  <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:${theme.primaryColor} transition-colors`} size={18} />
                  <input
                    type="password"
                    placeholder="Password"
                    className={`w-full bg-black/20 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-white/50 focus:bg-white/5 transition-all`}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                </div>

                {mode === 'signup' && (
                  <div className="relative group">
                    <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:${theme.primaryColor} transition-colors`} size={18} />
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      className={`w-full bg-black/20 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-white/50 focus:bg-white/5 transition-all`}
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                )}

                {mode === 'login' && (
                    <div className="flex justify-end pt-1">
                        <button type="button" onClick={() => switchMode('forgot')} className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                            Forgot password?
                        </button>
                    </div>
                )}
              </div>
            )}

            {mode === 'signup' && step === 2 && (
                <div className="space-y-4 animate-in slide-in-from-right-8 fade-in duration-300">
                    <div className="relative group">
                        <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 focus-within:text-emerald-400 transition-colors" size={18} />
                        <select
                            className="w-full bg-black/20 border border-white/10 rounded-xl py-3.5 pl-12 pr-10 text-white placeholder-gray-500 focus:outline-none focus:border-white/50 focus:bg-white/5 transition-all appearance-none cursor-pointer"
                            value={profileData.grade}
                            onChange={e => setProfileData({ ...profileData, grade: e.target.value })}
                            required
                        >
                            <option className="bg-slate-900 text-gray-500" value="" disabled>Select Grade / Class</option>
                            <option className="bg-slate-900 text-white" value="8th Grade">8th Grade</option>
                            <option className="bg-slate-900 text-white" value="9th Grade">9th Grade</option>
                            <option className="bg-slate-900 text-white" value="10th Grade">10th Grade</option>
                            <option className="bg-slate-900 text-white" value="11th Grade (PUC I)">11th Grade (PUC I)</option>
                            <option className="bg-slate-900 text-white" value="12th Grade (PUC II)">12th Grade (PUC II)</option>
                        </select>
                    </div>

                    <div className="relative group">
                        <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 focus-within:text-emerald-400 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Institution Name"
                            className="w-full bg-black/20 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:bg-white/5 transition-all"
                            value={profileData.institution}
                            onChange={e => setProfileData({ ...profileData, institution: e.target.value })}
                            required
                        />
                    </div>

                    <div className="relative group">
                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 focus-within:text-emerald-400 transition-colors" size={18} />
                        <select
                            className="w-full bg-black/20 border border-white/10 rounded-xl py-3.5 pl-12 pr-10 text-white focus:outline-none focus:border-emerald-500/50 focus:bg-white/5 transition-all appearance-none cursor-pointer"
                            value={profileData.language}
                            onChange={e => setProfileData({ ...profileData, language: e.target.value })}
                        >
                            <option className="bg-slate-900 text-white" value="English">English</option>
                            <option className="bg-slate-900 text-white" value="Hindi">Hindi</option>
                            <option className="bg-slate-900 text-white" value="Kannada">Kannada</option>
                        </select>
                    </div>

                    <div className="pt-2">
                        <span className="block text-xs text-gray-400 mb-2 ml-1 uppercase">Choose Avatar</span>
                        <div className="flex flex-wrap gap-3 justify-center">
                            {AVATARS.map((av) => (
                                <button
                                    type="button"
                                    key={av}
                                    onClick={() => setProfileData({ ...profileData, avatar: av })}
                                    className={`w-10 h-10 rounded-full ${av} transition-transform hover:scale-110 relative ${profileData.avatar === av ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900 scale-110' : 'opacity-70 hover:opacity-100'}`}
                                >
                                    {profileData.avatar === av && <Check size={14} className="text-white absolute inset-0 m-auto" />}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl bg-gradient-to-r ${theme.buttonGradient} text-white font-bold shadow-lg ${theme.shadow} transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
            >
              {loading && <Loader2 className="animate-spin" size={20} />}
              {!loading && mode === 'signup' && step === 1 && roleContext === 'student' && (
                  <>Next Step <ArrowRight size={20} /></>
              )}
              {!loading && mode === 'signup' && (step === 2 || roleContext !== 'student') && "Create Account"}
              {!loading && mode === 'login' && "Log In"}
              {!loading && mode === 'forgot' && "Send Reset Link"}
            </button>

            {mode !== 'forgot' && (
              <>
                <div className="relative py-4">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className={`${theme.bg} px-2 text-gray-500`}>Or continue with</span></div>
                </div>

                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-white hover:bg-gray-100 text-slate-900 font-bold transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                >
                    <svg width="20" height="20" viewBox="0 0 18 18"><path d="M17.64 9.2c0-.637-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/><path d="M9 18c2.43 0 4.467-.806 5.956-2.18L12.048 13.56c-.806.54-1.836.86-3.048.86-2.344 0-4.328-1.584-5.036-3.715H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/><path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.159 6.656 3.58 9 3.58z" fill="#EA4335"/></svg>
                    Continue with Google
                </button>
              </>
            )}
          </form>

          {/* Portal Switcher */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center text-xs text-gray-500 font-medium">
            {roleContext !== 'student' && <Link to="/login" className="hover:text-white transition-colors uppercase">Student Login</Link>}
            {roleContext !== 'teacher' && <Link to="/teacher/login" className="hover:text-white transition-colors uppercase">Teacher Login</Link>}
            {roleContext !== 'superadmin' && <Link to="/admin/login" className="hover:text-white transition-colors uppercase">Admin Login</Link>}
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginForm;
