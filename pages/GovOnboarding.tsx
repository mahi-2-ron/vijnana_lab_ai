import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, Upload, FileCheck, Send, 
  Search, Filter, Plus, 
  CheckCircle2, XCircle, Users
} from 'lucide-react';

const MOCK_ONBOARDING = [
  { udise: '290101001', name: 'GJC Bangalore North', district: 'Bangalore Urban', status: 'Active', email: 'gjc.north@edu.kar.nic.in' },
  { udise: '290101002', name: 'GJC Majestic Central', district: 'Bangalore Urban', status: 'Activated', email: 'gjc.maj@edu.kar.nic.in' },
  { udise: '290231045', name: 'GJC K.R. Nagar', district: 'Mysuru', status: 'Invited', email: 'krn.v@edu.kar.nic.in' },
];

const GovOnboarding: React.FC = () => {
  const [activeView, setActiveView] = useState<'upload' | 'directory'>('directory');

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 md:p-12 relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-emerald-950/10 opacity-40 pointer-events-none" />
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8 relative z-10">
        <div className="flex items-center gap-8">
           <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-emerald-500/20 border-2 border-emerald-500/30 flex items-center justify-center text-emerald-500 shadow-2xl relative">
              <Building2 size={48} />
              <div className="absolute inset-0 rounded-3xl border border-emerald-500/10 animate-ping" />
           </div>
           <div>
              <div className="flex items-center gap-3 mb-2">
                 <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] leading-none px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">Institutional Enrolment</span>
                 <span className="text-xs text-slate-500 font-bold uppercase tracking-[0.2em] italic">Digital India / Samagra Shiksha</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-black italic tracking-tighter uppercase leading-none">School <span className="text-emerald-500">Deployment</span> Engine</h1>
           </div>
        </div>
        <div className="flex gap-4">
           {activeView === 'directory' ? (
             <button 
               onClick={() => setActiveView('upload')}
               className="px-8 py-5 rounded-3xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-emerald-500/20 transition-all flex items-center gap-3 active:scale-95"
             >
                Bulk Onboard <Upload size={20} />
             </button>
           ) : (
             <button 
                onClick={() => setActiveView('directory')}
                className="px-8 py-5 rounded-3xl bg-slate-900 border border-white/5 text-slate-500 font-black text-sm uppercase tracking-[0.2em] hover:text-white transition-all flex items-center gap-3"
             >
                Back to Directory
             </button>
           )}
        </div>
      </div>

      <AnimatePresence mode="wait">
         {activeView === 'directory' ? (
           <motion.div 
             key="directory" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
             className="space-y-8 relative z-10"
           >
              {/* Toolbar */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-3xl shadow-inner">
                 <div className="flex items-center gap-4 text-slate-500 flex-1">
                    <Search size={20} />
                    <input placeholder="SEARCH BY UDISE OR SCHOOL NAME..." className="bg-transparent border-none text-[10px] uppercase font-black tracking-widest placeholder:text-slate-700 outline-none w-full" />
                 </div>
                 <div className="flex items-center gap-4 text-slate-500">
                    <div className="flex items-center gap-3 bg-black/40 p-3 px-6 rounded-2xl border border-white/5">
                       <Filter size={16} />
                       <span className="text-[10px] font-black uppercase tracking-widest leading-none">State Filter</span>
                    </div>
                    <div className="flex items-center gap-3 bg-black/40 p-3 px-6 rounded-2xl border border-white/5">
                       <Users size={16} />
                       <span className="text-[10px] font-black uppercase tracking-widest leading-none">Capacity Monitor</span>
                    </div>
                 </div>
              </div>

              {/* Grid: School List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {MOCK_ONBOARDING.map((s, index) => {
                   let statusClass = 'bg-slate-800 text-slate-400';
                   if (s.status === 'Active') statusClass = 'bg-emerald-500/20 text-emerald-500';
                   else if (s.status === 'Activated') statusClass = 'bg-amber-500/20 text-amber-500';

                   return (
                   <div key={s.udise} className="p-10 rounded-[3rem] bg-white/[0.03] border border-white/5 backdrop-blur-3xl shadow-inner group hover:bg-emerald-500/[0.05] hover:border-emerald-500/20 transition-all">
                      <div className="flex items-center justify-between mb-8">
                         <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center text-slate-500 group-hover:bg-emerald-500/10 group-hover:text-emerald-500 transition-all shadow-xl">
                            <span className="text-xl font-black italic">S{index+1}</span>
                         </div>
                         <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${statusClass}`}>
                            {s.status}
                         </div>
                      </div>
                      <h3 className="text-2xl font-black italic tracking-tighter uppercase mb-4 leading-none group-hover:text-white transition-colors">{s.name}</h3>
                      <div className="space-y-4 mb-8">
                         <div className="flex items-center gap-3">
                            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest w-20">UDISE CODE</span>
                            <span className="text-[10px] font-mono text-slate-400 group-hover:text-emerald-500/80 transition-colors">{s.udise}</span>
                         </div>
                         <div className="flex items-center gap-3">
                            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest w-20">DISTRICT</span>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.district}</span>
                         </div>
                         <div className="flex items-center gap-3">
                            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest w-20">PRINCIPAL</span>
                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest truncate">{s.email}</span>
                         </div>
                      </div>
                      <button className="w-full py-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-emerald-500/10 hover:border-emerald-500/40 text-[10px] font-black text-slate-500 hover:text-emerald-500 uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 group/btn">
                         Send Activation Remainder <Send size={14} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                      </button>
                   </div>
                   );
                 })}
                 
                 {/* Empty State / Add Single */}
                 <div className="p-10 rounded-[3rem] bg-white/[0.01] border-2 border-dashed border-white/10 hover:border-emerald-500/30 transition-all flex flex-col items-center justify-center text-center group cursor-pointer">
                    <Plus className="text-slate-700 group-hover:text-emerald-500 transition-colors mb-6" size={48} strokeWidth={3} />
                    <p className="text-[10px] font-black text-slate-600 group-hover:text-emerald-500 uppercase tracking-[0.3em] italic">Add Individual Institution</p>
                 </div>
              </div>
           </motion.div>
         ) : (
           <motion.div 
             key="upload" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
             className="relative z-10 max-w-4xl mx-auto"
           >
              <div className="p-16 md:p-32 rounded-[5rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl shadow-3xl text-center flex flex-col items-center">
                 <div className="w-32 h-32 rounded-[2.5rem] bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 mb-12 shadow-3xl shadow-emerald-500/10">
                    <FileCheck size={64} />
                 </div>
                 <h2 className="text-5xl font-black italic tracking-tighter uppercase mb-6 leading-none">Authorized CSV Upload</h2>
                 <p className="text-lg text-slate-500 font-bold uppercase tracking-widest italic max-w-md mb-16 leading-relaxed">
                    Upload Department school mapping CSV provided by state boards. System will automatically generate School Admin accounts.
                 </p>
                 
                 <div className="w-full max-w-md border-2 border-dashed border-white/10 rounded-[3rem] p-12 hover:border-emerald-500/40 transition-all group flex flex-col items-center cursor-pointer bg-black/40">
                    <Upload size={48} className="text-slate-700 group-hover:text-emerald-500 transition-colors mb-8" />
                    <p className="text-sm font-black text-slate-500 group-hover:text-white transition-colors uppercase tracking-[0.2em] mb-2 leading-none italic font-mono lowercase tracking-normal">DRAG & DROP OFFICIAL FILE</p>
                    <p className="text-[10px] text-slate-800 font-black uppercase tracking-widest">Max File Size: 15MB (.CSV only)</p>
                 </div>

                 <div className="mt-16 flex items-center gap-12 justify-center opacity-30">
                    <div className="flex items-center gap-3">
                       <CheckCircle2 size={16} />
                       <span className="text-[10px] font-black uppercase tracking-widest italic">Identity Validation</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <CheckCircle2 size={16} />
                       <span className="text-[10px] font-black uppercase tracking-widest italic">SMTP Relay Prep</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <XCircle size={16} />
                       <span className="text-[10px] font-black uppercase tracking-widest italic">Manual Verification</span>
                    </div>
                 </div>
              </div>
           </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
};

export default GovOnboarding;
