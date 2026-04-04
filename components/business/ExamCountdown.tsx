import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Target, AlertCircle, ShoppingCart } from 'lucide-react';
import { useUsageTracker, usePlan } from '../../services/PlanContext';

const ExamCountdown: React.FC = () => {
  const { usageStats, setShowPaywall } = useUsageTracker();
  const { isPro } = usePlan();

  const getExamData = () => {
    if (!usageStats?.examDate) return null;
    const examDate = usageStats.examDate.toDate ? usageStats.examDate.toDate() : new Date(usageStats.examDate);
    const diff = examDate.getTime() - Date.now();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return { days, date: examDate };
  };

  const examData = getExamData();
  if (!examData) return null;

  const { days } = examData;

  let statusColor = 'text-emerald-500';
  let bgColor = 'bg-emerald-500/10 border-emerald-500/20';
  let progressColor = 'bg-emerald-500';

  if (days < 15) {
    statusColor = 'text-red-500';
    bgColor = 'bg-red-500/10 border-red-500/20';
    progressColor = 'bg-red-500';
  } else if (days < 30) {
    statusColor = 'text-amber-500';
    bgColor = 'bg-amber-500/10 border-amber-500/20';
    progressColor = 'bg-amber-500';
  }

  const completed = usageStats?.totalLabsCompleted || 0;
  const totalRequired = 45; // Standard count
  const progress = (completed / totalRequired) * 100;
  const needsNudge = !isPro && (totalRequired - completed > 3) && days < 15;

  return (
    <div className={`p-6 rounded-[2rem] border ${bgColor} backdrop-blur-xl relative overflow-hidden group transition-all duration-500 hover:shadow-2xl`}>
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/5 blur-3xl rounded-full" />
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-2xl ${bgColor} flex items-center justify-center ${statusColor}`}>
            <Calendar size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Board Practicals</p>
            <h3 className={`text-3xl font-black italic tracking-tighter ${statusColor}`}>
              T-{days} <span className="text-sm not-italic opacity-60">DAYS</span>
            </h3>
          </div>
        </div>
        {!isPro && (
          <button 
            onClick={() => setShowPaywall(true)}
            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all active:scale-95"
          >
            <ShoppingCart size={20} />
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-end">
           <div className="flex items-center gap-2">
              <Target size={14} className="text-slate-400" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Syllabus Density</span>
           </div>
           <span className="text-xs font-black text-white">{completed}/{totalRequired} LABS</span>
        </div>
        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, progress)}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className={`h-full ${statusColor.replace('text', 'bg')}`}
          />
        </div>
      </div>

      {needsNudge && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4"
        >
          <AlertCircle className="text-red-400 shrink-0" size={18} />
          <div>
             <p className="text-[9px] font-black text-white uppercase tracking-wider leading-none mb-1">Critical Deficiency</p>
             <p className="text-[10px] text-slate-400 leading-tight">You have <span className="text-white font-bold">{totalRequired - completed}</span> labs pending. Unlock Pro to finish fast.</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ExamCountdown;
