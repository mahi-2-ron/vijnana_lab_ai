import React, { useState, useEffect } from 'react';
import { Users, Plus, Book, LayoutDashboard, Shield, LogOut, Loader2, AlertCircle } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { auth, db } from '../services/firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { SUBJECTS } from '../constants';
import { createTeacherAccount } from '../services/userService';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [teacherName, setTeacherName] = useState('');
  const [teacherEmail, setTeacherEmail] = useState('');
  const [teacherPassword, setTeacherPassword] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [creating, setCreating] = useState(false);
  const [createMsg, setCreateMsg] = useState({ type: '', text: '' });

  // Pagination bounds
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const fetched: any[] = [];
      querySnapshot.forEach((doc) => {
        fetched.push({ uid: doc.id, ...doc.data() });
      });
      setUsers(fetched);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/login');
  };

  const handleCreateTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setCreateMsg({ type: '', text: '' });
    try {
      await createTeacherAccount({
        name: teacherName,
        email: teacherEmail,
        password: teacherPassword,
        assignedSubjects: selectedSubjects,
      });
      setCreateMsg({ type: 'success', text: 'Teacher account created successfully! Please re-login as Admin since Firebase Auth changed session.' });
      setTeacherName(''); setTeacherEmail(''); setTeacherPassword(''); setSelectedSubjects([]);
      fetchUsers();
    } catch (error: any) {
      setCreateMsg({ type: 'error', text: error.message || 'Failed to create teacher account' });
    } finally {
      setCreating(false);
    }
  };

  const toggleSubjectSelection = (subjectName: string) => {
    if (selectedSubjects.includes(subjectName)) {
      setSelectedSubjects(selectedSubjects.filter(s => s !== subjectName));
    } else {
      setSelectedSubjects([...selectedSubjects, subjectName]);
    }
  };

  const handleAssignSubjects = async (teacherUid: string, subs: string[]) => {
    try {
      await updateDoc(doc(db, "users", teacherUid), {
        assignedSubjects: subs
      });
      alert('Subjects updated successfully!');
      fetchUsers();
    } catch (error) {
      console.error("Failed to update subjects:", error);
      alert('Failed to update subjects.');
    }
  };

  const stats = {
    total: users.length,
    students: users.filter(u => (u.role || 'student').toLowerCase() === 'student').length,
    teachers: users.filter(u => (u.role || '').toLowerCase() === 'teacher').length
  };

  const renderContent = () => {
    if (activeTab === 'Users') {
      const paginatedUsers = users.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
      const totalPages = Math.ceil(users.length / rowsPerPage);

      return (
        <GlassCard className="p-6" color="gray">
            <h2 className="text-xl font-bold text-white mb-6">All Users</h2>
            {loading ? <div className="text-gray-400">Loading users...</div> : (
              <>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-xs text-gray-500 uppercase border-b border-white/10">
                                <th className="pb-4 pl-4">Name</th>
                                <th className="pb-4">Email</th>
                                <th className="pb-4">Role</th>
                                <th className="pb-4">Joined</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {paginatedUsers.map(u => (
                                <tr key={u.uid} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="py-4 pl-4 font-medium text-white">{u.name}</td>
                                    <td className="py-4 text-gray-400">{u.email}</td>
                                    <td className="py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                                            (u.role || 'student').toLowerCase() === 'superadmin' ? 'bg-red-500/10 text-red-500' :
                                            (u.role || 'student').toLowerCase() === 'teacher' ? 'bg-purple-500/10 text-purple-400' :
                                            'bg-blue-500/10 text-blue-400'
                                        }`}>
                                            {(u.role || 'student').toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="py-4 text-gray-500">{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
                  <span>Page {page + 1} of {totalPages || 1}</span>
                  <div className="flex gap-2">
                    <button onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0} className="px-3 py-1 bg-white/5 rounded hover:bg-white/10 disabled:opacity-50">Prev</button>
                    <button onClick={() => setPage(Math.min(totalPages - 1, page + 1))} disabled={page >= totalPages - 1} className="px-3 py-1 bg-white/5 rounded hover:bg-white/10 disabled:opacity-50">Next</button>
                  </div>
                </div>
              </>
            )}
        </GlassCard>
      );
    }

    if (activeTab === 'Teachers') {
      return (
        <GlassCard className="p-6" color="purple">
          <h2 className="text-xl font-bold text-white mb-6">Create Teacher Account</h2>
          {createMsg.text && (
            <div className={`p-4 mb-6 rounded-lg ${createMsg.type === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'} flex items-start gap-3`}>
              {createMsg.type === 'error' && <AlertCircle size={18} className="mt-0.5" />}
              {createMsg.text}
            </div>
          )}
          <form onSubmit={handleCreateTeacher} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                <input required type="text" value={teacherName} onChange={e=>setTeacherName(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-purple-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                <input required type="email" value={teacherEmail} onChange={e=>setTeacherEmail(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-purple-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
                <input minLength={6} required type="password" value={teacherPassword} onChange={e=>setTeacherPassword(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-purple-500" />
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-400 mb-3">Assign Subjects (Optional)</label>
              <div className="flex flex-wrap gap-2">
                {SUBJECTS.map(sub => (
                  <button 
                    type="button" 
                    key={sub.id} 
                    onClick={() => toggleSubjectSelection(sub.name)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedSubjects.includes(sub.name) ? 'bg-purple-600 text-white' : 'bg-white/5 text-gray-400 border border-white/10 hover:border-purple-500/50'}`}
                  >
                    {sub.name}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" disabled={creating} className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50">
              {creating ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />}
              {creating ? "Creating..." : "Create Teacher"}
            </button>
          </form>
        </GlassCard>
      );
    }

    if (activeTab === 'Subjects') {
      const teachers = users.filter(u => (u.role || '').toLowerCase() === 'teacher');
      return (
        <GlassCard className="p-6" color="blue">
          <h2 className="text-xl font-bold text-white mb-6">Assign Subjects to Teachers</h2>
          <div className="space-y-6">
            {teachers.length > 0 ? teachers.map(teacher => (
              <div key={teacher.uid} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="font-bold text-white mb-1">{teacher.name}</h3>
                <p className="text-sm text-gray-400 mb-4">{teacher.email}</p>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap gap-2">
                    {SUBJECTS.map(sub => {
                      const isAssigned = (teacher.assignedSubjects || []).includes(sub.name);
                      return (
                        <button 
                          key={sub.id} 
                          onClick={() => {
                            const current = teacher.assignedSubjects || [];
                            const updated = isAssigned ? current.filter((s: string) => s !== sub.name) : [...current, sub.name];
                            handleAssignSubjects(teacher.uid, updated);
                          }}
                          className={`px-3 py-1 text-xs rounded-full border transition-colors ${isAssigned ? 'bg-blue-600 border-blue-500 text-white' : 'bg-transparent border-white/20 text-gray-400 hover:border-blue-400'}`}
                        >
                          {sub.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )) : <p className="text-gray-400">No teachers found.</p>}
          </div>
        </GlassCard>
      );
    }

    // Default Overview
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white mb-6">Platform Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard className="p-6" color="blue">
              <p className="text-gray-400 text-sm mb-1">Total Users</p>
              <div className="flex items-center justify-between">
                <h3 className="text-4xl font-bold text-white">{stats.total}</h3>
                <Users size={32} className="text-blue-500/50" />
              </div>
          </GlassCard>
          <GlassCard className="p-6" color="green">
              <p className="text-gray-400 text-sm mb-1">Total Students</p>
              <div className="flex items-center justify-between">
                <h3 className="text-4xl font-bold text-white">{stats.students}</h3>
                <Users size={32} className="text-green-500/50" />
              </div>
          </GlassCard>
          <GlassCard className="p-6" color="purple">
              <p className="text-gray-400 text-sm mb-1">Total Teachers</p>
              <div className="flex items-center justify-between">
                <h3 className="text-4xl font-bold text-white">{stats.teachers}</h3>
                <Book size={32} className="text-purple-500/50" />
              </div>
          </GlassCard>
        </div>
      </div>
    );
  };

  return (
    <div className="flex bg-[#020617] min-h-screen relative text-slate-100">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-slate-900 border-r border-white/10 flex flex-col justify-between hidden md:flex h-screen sticky top-0">
        <div>
          <div className="p-6 border-b border-white/10 flex flex-col gap-2">
             <div className="flex items-center gap-3">
               <Shield className="text-red-500 w-6 h-6" />
               <h2 className="font-bold text-white text-lg tracking-wide">VIJNANA LAB ADMIN</h2>
             </div>
             <div><span className="px-3 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">Super Admin</span></div>
          </div>
          <nav className="p-4 space-y-2">
            {[
              { id: 'Overview', icon: LayoutDashboard },
              { id: 'Users', icon: Users },
              { id: 'Teachers', icon: Plus },
              { id: 'Subjects', icon: Book }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === item.id ? 'bg-red-600/20 text-red-400 border border-red-500/20' : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'}`}
              >
                <item.icon size={18} /> {item.id}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen overflow-y-auto">
        <header className="md:hidden bg-slate-900 border-b border-white/10 p-4 flex justify-between items-center sticky top-0 z-20">
             <div className="flex items-center gap-2">
               <Shield size={20} className="text-red-500" />
               <h2 className="font-bold text-white">Vijnana Lab Admin</h2>
             </div>
             <button onClick={handleLogout} className="text-red-400 p-2"><LogOut size={16} /></button>
        </header>

        {/* Mobile Nav Overlay */}
        <div className="md:hidden p-4 bg-slate-900/50 flex space-x-2 overflow-x-auto sticky top-[60px] z-10 border-b border-white/10">
          {['Overview', 'Users', 'Teachers', 'Subjects'].map(id => (
            <button key={id} onClick={() => setActiveTab(id)} className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${activeTab === id ? 'bg-red-600 text-white' : 'bg-white/5 text-gray-400'}`}>
              {id}
            </button>
          ))}
        </div>

        <div className="p-6 md:p-10">
          <div className="max-w-5xl mx-auto">
             {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
 
