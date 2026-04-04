import React from 'react';
import { ShieldCheck, MapPin, Building2 } from 'lucide-react';
import { usePlan } from '../../services/PlanContext';

const GovBadge: React.FC = () => {
  const { isGov } = usePlan();
  if (!isGov) return null;

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 p-4 md:p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-3xl shadow-xl shadow-emerald-500/5 transition-all hover:border-emerald-500/40 group overflow-hidden relative">
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full" />
      
      {/* Ashoka Emblem Placeholder / SVG */}
      <div className="w-12 h-12 md:w-16 md:h-16 rounded-[1.5rem] bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-500 shadow-2xl relative shrink-0">
          <ShieldCheck size={28} />
          <div className="absolute inset-0 rounded-[1.5rem] border border-emerald-500/10 animate-ping" />
      </div>

      <div className="flex flex-col items-center md:items-start text-center md:text-left min-w-0">
         <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] leading-none">Government Partner</span>
            <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
         </div>
         <h3 className="text-xl md:text-2xl font-black text-white italic tracking-tighter leading-none mb-2 uppercase truncate">Digital India Mission Partner</h3>
         
         <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <div className="flex items-center gap-2">
               <Building2 size={12} className="text-slate-500" />
               <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">SAMAGRA SHIKSHA</span>
            </div>
            <div className="w-[1px] h-2 bg-white/10 hidden md:block" />
            <div className="flex items-center gap-2">
               <MapPin size={12} className="text-slate-500" />
               <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">GOVERNMENT OF KARNATAKA</span>
            </div>
         </div>
      </div>
    </div>
  );
};

export default GovBadge;
