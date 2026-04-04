import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, BookOpen, ChevronRight, Sparkles, School } from 'lucide-react';
import type { Board, Standard } from '../types';
import { useAuth } from '../services/AuthContext';
import { updateUserData } from '../services/firebase';

const BOARDS: { id: Board; name: string; fullName: string; color: string; icon: string; states: string }[] = [
  { id: 'CBSE', name: 'CBSE', fullName: 'Central Board of Secondary Education', color: '#3b82f6', icon: '🏛️', states: 'Pan-India · NCERT Curriculum' },
  { id: 'Karnataka PUC', name: 'Karnataka PUC', fullName: 'Karnataka Pre-University Board', color: '#ef4444', icon: '🔴', states: 'Karnataka State · PUE Board' },
  { id: 'ICSE', name: 'ICSE / ISC', fullName: 'Indian Certificate of Secondary Education', color: '#10b981', icon: '📗', states: 'Pan-India · CISCE Council' },
];

const STANDARDS: { id: Standard; name: string; subtitle: string; icon: string; color: string }[] = [
  { id: '1st PUC / Class 11', name: '1st PUC / Class 11', subtitle: 'Foundation Year · Core Concepts', icon: '📘', color: '#6366f1' },
  { id: '2nd PUC / Class 12', name: '2nd PUC / Class 12', subtitle: 'Advanced Year · Board Exams', icon: '📕', color: '#f59e0b' },
];

const SyllabusSelector: React.FC = () => {
  const navigate = useNavigate();
  const { user, profileData, loading: authLoading } = useAuth();
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);
  const [selectedStandard, setSelectedStandard] = useState<Standard | null>(null);
  const [phase, setPhase] = useState<'board' | 'standard' | 'done'>('board');
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    // 1. Priority: Profile data from Firestore (via AuthContext)
    if (profileData?.grade && profileData?.syllabus) {
      const board = profileData.syllabus as Board;
      const std = profileData.grade as Standard;
      setSelectedBoard(board);
      setSelectedStandard(std);
      
      // Auto-navigate if matched and valid
      if (BOARDS.some(b => b.id === board) && STANDARDS.some(s => s.id === std)) {
        navigate('/subjects', { replace: true });
      }
      return;
    }

    // 2. Secondary: LocalStorage fallback
    const saved = localStorage.getItem('vl_board');
    const savedStd = localStorage.getItem('vl_standard');
    if (saved && savedStd) {
      setSelectedBoard(saved as Board);
      setSelectedStandard(savedStd as Standard);
      
      // Auto-navigate if valid
      if (BOARDS.some(b => b.id === saved) && STANDARDS.some(s => s.id === savedStd)) {
        navigate('/subjects', { replace: true });
      }
    }
  }, [profileData, navigate]);

  const selectBoard = (board: Board) => {
    setAnimating(true);
    setSelectedBoard(board);
    setTimeout(() => { setPhase('standard'); setAnimating(false); }, 400);
  };

  const selectStandard = async (std: Standard) => {
    setSelectedStandard(std);
    localStorage.setItem('vl_board', selectedBoard!);
    localStorage.setItem('vl_standard', std);
    
    // If user is logged in, sync to profile
    if (user) {
      try {
        await updateUserData(user.uid, {
          syllabus: selectedBoard!,
          grade: std
        });
      } catch (error) {
        console.error("Failed to sync syllabus to profile:", error);
      }
    }

    setAnimating(true);
    setTimeout(() => { setPhase('done'); navigate('/subjects'); }, 600);
  };

  const goBack = () => { setPhase('board'); setSelectedBoard(null); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/3 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <div className="text-center mb-10 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-5">
          <Sparkles size={14} className="text-yellow-400" />
          <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">Choose Your Syllabus</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
          {phase === 'board' ? 'Select Your Board' : 'Select Your Standard'}
        </h1>
        <p className="text-gray-400 text-lg max-w-md mx-auto">
          {phase === 'board'
            ? 'Pick your education board to see labs tailored to your curriculum'
            : `${selectedBoard} — Now pick your class level`}
        </p>
      </div>

      {/* Board Selection */}
      {phase === 'board' && (
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl w-full relative z-10 transition-all duration-500 ${animating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          {BOARDS.map((board) => (
            <button
              key={board.id}
              onClick={() => selectBoard(board.id)}
              className="group relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-opacity-50 text-left overflow-hidden active:scale-95"
              style={{ '--glow': board.color } as React.CSSProperties}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{ boxShadow: `inset 0 0 40px ${board.color}15, 0 0 30px ${board.color}10` }} />

              <div className="relative z-10">
                <div className="text-4xl mb-3">{board.icon}</div>
                <h3 className="text-xl font-black text-white mb-1">{board.name}</h3>
                <p className="text-sm text-gray-400 mb-3">{board.fullName}</p>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider" style={{ color: board.color }}>
                  <School size={12} />
                  {board.states}
                </div>
                <div className="mt-4 flex items-center gap-1 text-white/60 group-hover:text-white transition-colors text-sm font-bold">
                  Select <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Standard Selection */}
      {phase === 'standard' && (
        <div className={`max-w-2xl w-full relative z-10 transition-all duration-500 ${animating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          {/* Back button */}
          <button onClick={goBack} className="mb-5 flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-bold">
            ← Change Board
          </button>

          {/* Selected board chip */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ backgroundColor: BOARDS.find(b => b.id === selectedBoard)?.color + '20', border: `1px solid ${BOARDS.find(b => b.id === selectedBoard)?.color}40` }}>
            <span className="text-sm font-bold" style={{ color: BOARDS.find(b => b.id === selectedBoard)?.color }}>
              {BOARDS.find(b => b.id === selectedBoard)?.icon} {selectedBoard}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {STANDARDS.map((std) => (
              <button
                key={std.id}
                onClick={() => selectStandard(std.id)}
                className="group relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:scale-105 text-left overflow-hidden active:scale-95"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{ boxShadow: `inset 0 0 40px ${std.color}15, 0 0 30px ${std.color}10` }} />
                <div className="relative z-10">
                  <div className="text-5xl mb-4">{std.icon}</div>
                  <h3 className="text-xl font-black text-white mb-1">{std.name}</h3>
                  <p className="text-sm text-gray-400 mb-3">{std.subtitle}</p>
                  <div className="flex items-center gap-2 text-sm font-bold" style={{ color: std.color }}>
                    <GraduationCap size={14} />
                    {std.id.includes('1st') ? '5 Subjects · Foundation Labs' : '5 Subjects · Advanced Labs'}
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-white/60 group-hover:text-white transition-colors text-sm font-bold">
                    Start Learning <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Already selected — quick action */}
      {selectedBoard && selectedStandard && phase === 'board' && (
        <div className="mt-8 relative z-10 text-center">
          <p className="text-gray-500 text-sm mb-2">Currently set:</p>
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-white font-bold text-sm">{selectedBoard} · {selectedStandard}</span>
            <button onClick={() => navigate('/subjects')} className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all">
              Continue →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SyllabusSelector;
