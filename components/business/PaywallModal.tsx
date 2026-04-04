import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Crown, Zap, ShieldCheck, Calendar, CheckCircle2 } from 'lucide-react';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  reason: 'lab' | 'ai' | 'pro' | null;
  examDate?: any; // Firestore Timestamp or Date
}

const PaywallModal: React.FC<PaywallModalProps> = ({ isOpen, onClose, reason, examDate }) => {
  const getDaysToExam = () => {
    if (!examDate) return null;
    const date = examDate.toDate ? examDate.toDate() : new Date(examDate);
    const diff = date.getTime() - new Date().getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const daysToExam = getDaysToExam();
  const isUrgent = daysToExam !== null && daysToExam <= 60 && daysToExam > 0;

  const features = [
    { title: 'Unlimited Simulations', pro: true, free: '3 total' },
    { title: '24/7 AI Lab Tutor', pro: 'Unlimited', free: '10 queries/day' },
    { title: 'Lab Record PDF Export', pro: true, free: false },
    { title: 'Detailed Analytics', pro: true, free: false },
    { title: 'Classroom Connectivity', pro: true, free: false },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-slate-900 shadow-3xl border border-white/10 rounded-[3rem] p-8 md:p-10 overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/20 blur-[80px] rounded-full" />
            
            <button onClick={onClose} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors">
              <X size={24} />
            </button>

            <div className="flex flex-col items-center text-center mb-10">
              <div className="w-16 h-16 rounded-[1.5rem] bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center mb-6 shadow-xl shadow-indigo-500/10">
                <Crown className="text-indigo-400" size={32} />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-3 uppercase italic leading-tight">
                {reason === 'ai' ? 'Brain Power Limit!' : 'Unlock Every Lab'}
              </h2>
              <p className="text-slate-400 text-sm font-bold uppercase tracking-widest leading-relaxed px-4">
                Score Higher in Boards with Vijnana Pro
              </p>
            </div>

            {isUrgent && (
              <div className="mb-8 p-6 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-5">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
                  <Calendar size={24} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em] mb-1">Practical Exam Alert</p>
                  <p className="text-xs text-slate-300 font-bold leading-relaxed">Only <span className="text-white text-base">{daysToExam} days</span> left. Master all practicals now.</p>
                </div>
              </div>
            )}

            <div className="space-y-3 mb-10">
              {features.map((f, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 group hover:bg-white/[0.05] transition-colors">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{f.title}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-[9px] text-slate-600 font-black uppercase">{f.free ? 'Free' : '-'}</span>
                    <div className="w-[1px] h-3 bg-white/10" />
                    <CheckCircle2 size={16} className="text-emerald-400" />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <button 
                className="w-full py-6 rounded-[2rem] bg-indigo-500 hover:bg-indigo-400 text-white font-black text-sm uppercase tracking-[0.25em] shadow-2xl shadow-indigo-500/30 transition-all flex items-center justify-center gap-4 active:scale-95"
              >
                UPGRADE NOW <Zap size={20} fill="currentColor" />
              </button>
              <div className="flex items-center justify-center gap-3 text-slate-600 mt-2">
                <ShieldCheck size={16} />
                <span className="text-[9px] font-black uppercase tracking-[0.2em]">Verified Secure Checkout</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PaywallModal;
