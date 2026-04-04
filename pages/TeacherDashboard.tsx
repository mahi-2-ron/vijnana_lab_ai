import React, { useState, useEffect } from 'react';
import { Users, Plus, FileText, MessageSquare, Download, Search, CheckCircle, Send, Trash2, Upload, Cloud, UserPlus, LogOut, Book, LayoutDashboard } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { auth, db } from '../services/firebase';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const TeacherDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const [students, setStudents] = useState<any[]>([]);
  const [assignedSubjects, setAssignedSubjects] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [uploading, setUploading] = useState(false);
  const [doubts, setDoubts] = useState([
    { id: 1, studentId: "RS", name: "Rahul Sharma", question: "Sir, I'm getting a parallax error in the optics lab simulation. How do I fix it?", time: "2m ago" },
    { id: 2, studentId: "SG", name: "Sneha Gupta", question: "Can we submit the Salt Analysis report by tomorrow evening?", time: "15m ago" }
  ]);
  const [assignments, setAssignments] = useState([
      { id: 1, title: "Physics Lab 01", grade: "12-A", submitted: 42, total: 45, due: "Tomorrow" }
  ]);

  useEffect(() => {
    const fetchData = async () => {
      if (!auth.currentUser) return;
      try {
        // Fetch teacher's assigned subjects
        const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
        if (userDoc.exists()) {
          setAssignedSubjects(userDoc.data().assignedSubjects || []);
        }

        // Fetch students
        const q = query(collection(db, "users"), where("role", "==", "student"));
        const querySnapshot = await getDocs(q);
        const fetchedStudents: any[] = [];
        querySnapshot.forEach((doc) => {
          fetchedStudents.push({ id: doc.id, ...doc.data(), status: 'Active', progress: Math.floor(Math.random() * 100) });
        });
        setStudents(fetchedStudents);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/login');
  };

  const filteredStudents = students.filter(s => 
    (s.name || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
    (s.email || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUpload = () => {
      setUploading(true);
      setTimeout(() => {
          setUploading(false);
          alert("Lecture notes uploaded successfully!");
      }, 1500);
  };

  const renderContent = () => {
    if (activeTab === 'Students') {
      return (
        <GlassCard className="p-6 h-full" color="gray">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Student Roster</h2>
                <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"/>
                    <input 
                        type="text" 
                        placeholder="Search student..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-gray-300 focus:outline-none focus:border-blue-500 transition-colors w-48 focus:w-64"
                    />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-xs text-gray-500 uppercase border-b border-white/10">
                            <th className="pb-4 pl-4">Name</th>
                            <th className="pb-4">Email</th>
                            <th className="pb-4">Progress (Mock)</th>
                            <th className="pb-4">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {filteredStudents.length > 0 ? filteredStudents.map(student => (
                            <tr key={student.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                <td className="py-4 pl-4 font-medium text-white">{student.name}</td>
                                <td className="py-4 text-gray-400">{student.email}</td>
                                <td className="py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-24 bg-white/10 rounded-full h-1.5">
                                            <div className="bg-blue-500 h-1.5 rounded-full" style={{width: `${student.progress}%`}}></div>
                                        </div>
                                        <span className="text-xs text-gray-400">{student.progress}%</span>
                                    </div>
                                </td>
                                <td className="py-4">
                                    <span className="px-2 py-1 rounded text-xs font-bold bg-green-500/10 text-green-400">
                                        {student.status}
                                    </span>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={4} className="py-8 text-center text-gray-500">No students found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </GlassCard>
      );
    }

    if (activeTab === 'Upload') {
      return (
        <GlassCard className="p-6" color="indigo">
            <h2 className="text-xl font-bold text-white mb-6">Upload Content</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                <input type="text" placeholder="e.g. Intro to Thermodynamics" className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                <textarea placeholder="Describe the materials..." className="w-full h-24 bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">File</label>
                <input type="file" className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-indigo-500" />
              </div>
              <button onClick={handleUpload} disabled={uploading} className="w-full py-3 mt-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl flex justify-center items-center gap-2 transition-colors">
                {uploading ? <Cloud size={16} className="animate-bounce" /> : <Upload size={16} />}
                {uploading ? "Uploading..." : "Upload Material"}
              </button>
            </div>
        </GlassCard>
      );
    }

    if (activeTab === 'Subjects') {
      return (
        <GlassCard className="p-6" color="blue">
            <h2 className="text-xl font-bold text-white mb-4">Assigned Subjects</h2>
            {assignedSubjects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {assignedSubjects.map((sub, idx) => (
                  <div key={idx} className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
                    <span className="text-white font-medium">{sub}</span>
                    <Book size={20} className="text-blue-400" />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No subjects currently assigned to you.</p>
            )}
        </GlassCard>
      );
    }

    // Default Overview
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard className="p-6" color="blue">
              <p className="text-gray-400 text-sm mb-1">Total Students</p>
              <h3 className="text-3xl font-bold text-white">{students.length}</h3>
          </GlassCard>
          <GlassCard className="p-6" color="green">
              <p className="text-gray-400 text-sm mb-1">Avg. Completion</p>
              <h3 className="text-3xl font-bold text-white">76%</h3>
          </GlassCard>
          <GlassCard className="p-6" color="purple">
              <p className="text-gray-400 text-sm mb-1">Pending Doubts</p>
              <h3 className="text-3xl font-bold text-white">{doubts.length}</h3>
          </GlassCard>
        </div>

        <GlassCard className="p-6" color="red">
            <h2 className="text-xl font-bold text-white mb-4">Recent Doubts</h2>
            <div className="space-y-4">
                {doubts.map(doubt => (
                    <div key={doubt.id} className="bg-white/5 p-3 rounded-xl border border-white/10 flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-xs font-bold text-white shrink-0">
                            {doubt.studentId}
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-xs font-bold text-gray-300">{doubt.name}</span>
                                <span className="text-[10px] text-gray-500">{doubt.time}</span>
                            </div>
                            <p className="text-sm text-gray-300 line-clamp-2 mb-2">"{doubt.question}"</p>
                        </div>
                    </div>
                ))}
            </div>
        </GlassCard>
      </div>
    );
  };

  return (
    <div className="flex bg-[#020617] min-h-screen relative text-slate-100">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 bg-slate-900 border-r border-white/10 flex flex-col justify-between hidden md:flex h-screen sticky top-0">
        <div>
          <div className="p-6 border-b border-white/10 flex items-center gap-3">
             <div className="p-2 bg-purple-600/20 rounded-lg"><Book className="text-purple-400 w-5 h-5" /></div>
             <div>
               <h2 className="font-bold text-white leading-tight">Vijnana Lab</h2>
               <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-purple-100 text-purple-800">Teacher</span>
             </div>
          </div>
          <nav className="p-4 space-y-1">
            {[
              { id: 'Overview', icon: LayoutDashboard },
              { id: 'Subjects', icon: Book },
              { id: 'Students', icon: Users },
              { id: 'Upload', icon: Upload }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${activeTab === item.id ? 'bg-purple-600/20 text-purple-400 font-bold' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
              >
                <item.icon size={16} /> {item.id}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen overflow-y-auto">
        <header className="md:hidden bg-slate-900 border-b border-white/10 p-4 flex justify-between items-center sticky top-0 z-20">
             <div className="flex items-center gap-2">
               <h2 className="font-bold text-white">Vijnana Lab</h2>
               <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-purple-100 text-purple-800">Teacher</span>
             </div>
        <button onClick={handleLogout} className="text-red-400 p-2"><LogOut size={16} /></button>
        </header>

        {/* Mobile Nav Overlay */}
        <div className="md:hidden p-4 bg-slate-900/50 flex space-x-2 overflow-x-auto sticky top-[60px] z-10 border-b border-white/10">
          {['Overview', 'Subjects', 'Students', 'Upload'].map(id => (
            <button key={id} onClick={() => setActiveTab(id)} className={`px-4 py-1.5 rounded-full text-xs whitespace-nowrap ${activeTab === id ? 'bg-purple-600 text-white font-bold' : 'bg-white/5 text-gray-400'}`}>
              {id}
            </button>
          ))}
        </div>

        <div className="p-6 md:p-10 max-w-6xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;
