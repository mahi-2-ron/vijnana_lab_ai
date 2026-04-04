import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Gift, BarChart3, Download, Plus, 
  MapPin, Clock, BookOpen, Search, Filter,
  ExternalLink, ArrowRight
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Cell 
} from 'recharts';

const MOCK_COHORTS = [
  { id: 'c1', name: 'STEM for Girls - Hubli', count: 450, budget: '₹67,500/mo', impact: 82, location: 'Dharwad' },
  { id: 'c2', name: 'Vijnana Rural Outreach', count: 1200, budget: '₹1,80,000/mo', impact: 76, location: 'Raichur' },
  { id: 'c3', name: 'Youth in Science Fellowship', count: 120, budget: '₹18,000/mo', impact: 94, location: 'Mysuru' },
];

const IMPACT_STREAMS = [
  { name: 'Labs Completed', value: 14500, color: '#6366f1' },
  { name: 'AI Quests Solved', value: 32000, color: '#4f46e5' },
  { name: 'Quiz Mastery', value: 85, color: '#4338ca', unit: '%' },
];

const NGOPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cohorts' | 'impact'>('cohorts');

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 md:p-12 relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-indigo-950/20 opacity-40 pointer-events-none" />
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8 relative z-10">
        <div className="flex items-center gap-8">
           <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-indigo-500/20 border-2 border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-2xl relative">
              <Gift size={48} />
              <div className="absolute inset-0 rounded-3xl border border-indigo-500/20 animate-ping" />
           </div>
           <div>
              <div className="flex items-center gap-3 mb-2">
                 <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em] leading-none px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">Philanthropy Monitor</span>
                 <span className="text-xs text-slate-500 font-bold uppercase tracking-[0.2em] italic">NGO Digital Equity Partner v1.0</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-black italic tracking-tighter uppercase leading-none">Cohort <span className="text-indigo-500">Mastery</span> Hub</h1>
           </div>
        </div>
        <div className="flex gap-4">
           <button className="px-8 py-5 rounded-3xl bg-slate-900 border border-white/10 hover:border-indigo-500/30 text-slate-400 hover:text-indigo-400 font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center gap-3">
              Impact Report <Download size={20} />
           </button>
           <button className="px-8 py-5 rounded-3xl bg-indigo-500 hover:bg-indigo-400 text-white font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-indigo-500/20 transition-all flex items-center gap-3 active:scale-95">
              New Cohort <Plus size={20} />
           </button>
        </div>
      </div>

      {/* Internal Navigation Area */}
      <div className="flex gap-12 border-b border-white/5 mb-16 relative z-10">
         {['cohorts', 'impact', 'reporting'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`pb-6 text-xs font-black uppercase tracking-[0.3em] transition-all relative ${activeTab === tab ? 'text-indigo-400' : 'text-slate-600 hover:text-slate-400'}`}
            >
               {tab}
               {activeTab === tab && <motion.div layoutId="ngo-nav" className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]" />}
            </button>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
           <AnimatePresence mode="wait">
              {activeTab === 'cohorts' ? (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                   <div className="flex items-center justify-between mb-8 px-4">
                      <div className="flex items-center gap-4 text-slate-500">
                         <Filter size={18} />
                         <span className="text-[10px] font-black uppercase tracking-widest leading-none">Filter by Location</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-500 border border-white/5 bg-slate-950/60 p-2 rounded-xl">
                         <Search size={16} />
                         <input placeholder="SEARCH COHORTS..." className="bg-transparent border-none text-[10px] uppercase font-black tracking-widest placeholder:text-slate-700 outline-none w-48" />
                      </div>
                   </div>

                   {MOCK_COHORTS.map((c) => (
                     <div key={c.id} className="p-10 rounded-[3rem] bg-white/[0.03] border border-white/5 backdrop-blur-3xl shadow-inner group hover:bg-indigo-500/[0.05] hover:border-indigo-500/20 transition-all">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
                           <div className="flex items-center gap-8">
                              <div className="w-16 h-16 rounded-[1.5rem] bg-slate-900 flex items-center justify-center text-slate-500 group-hover:bg-indigo-500/10 group-hover:text-indigo-400 transition-all shadow-xl">
                                 <BookOpen size={28} />
                              </div>
                              <div>
                                 <h3 className="text-3xl font-black italic tracking-tighter uppercase leading-none mb-3 group-hover:text-white transition-colors">{c.name}</h3>
                                 <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2">
                                       <MapPin size={12} className="text-slate-600" />
                                       <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{c.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                       <Clock size={12} className="text-slate-600" />
                                       <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Sponsored for 12 months</span>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className="flex flex-col items-end">
                              <span className="text-4xl font-black italic tracking-tighter leading-none mb-2">{c.count}</span>
                              <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] leading-none">Sponsored Scientists</span>
                           </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 rounded-3xl bg-black/40 border border-white/5">
                           <div>
                              <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1 leading-none">Deployment Status</p>
                              <p className="text-xs font-black text-emerald-500 uppercase leading-none italic">Active & Optimized</p>
                           </div>
                           <div>
                              <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1 leading-none">Pedagogical Score</p>
                              <p className="text-xl font-black italic tracking-tighter leading-none">{c.impact}% <span className="text-[10px] not-italic opacity-40 uppercase">Impact</span></p>
                           </div>
                           <div className="md:col-span-2 flex justify-end">
                              <button className="flex items-center gap-3 text-[10px] font-black text-indigo-400 uppercase tracking-widest hover:text-white transition-colors">
                                 View Cohort Analytics <ExternalLink size={14} />
                              </button>
                           </div>
                        </div>
                     </div>
                   ))}
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                  className="p-12 rounded-[4rem] bg-white/[0.03] border border-white/5 backdrop-blur-3xl shadow-inner min-h-[600px] flex flex-col items-center justify-center text-center"
                >
                   <div className="w-24 h-24 rounded-[2.5rem] bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-8 shadow-2xl">
                      <BarChart3 size={48} />
                   </div>
                   <h3 className="text-3xl font-black italic tracking-tighter uppercase leading-none mb-4">Deep Analytics Integration</h3>
                   <p className="text-slate-500 text-sm font-bold uppercase tracking-[0.3em] italic max-w-sm mb-12 leading-relaxed">
                      Measuring real-world educational transformation across all sponsored cohorts. Synchronizing with state curriculum targets.
                   </p>
                   <button className="px-12 py-6 rounded-2xl bg-indigo-500 hover:bg-indigo-400 text-white font-black text-xs uppercase tracking-[0.3em] flex items-center gap-4 transition-all hover:gap-8 active:scale-95">
                      Generate Interactive Impact Matrix <ArrowRight size={20} />
                   </button>
                </motion.div>
              )}
           </AnimatePresence>
        </div>

        {/* Sidebar: Global NGO Metrics */}
        <div className="space-y-8">
           <div className="p-10 rounded-[3rem] bg-indigo-600/10 border border-indigo-500/20 backdrop-blur-3xl shadow-2xl overflow-hidden relative group transition-all hover:bg-indigo-600/20">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/20 blur-3xl rounded-full" />
              <div className="flex items-center gap-4 mb-10">
                 <Users size={24} className="text-indigo-400" />
                 <h3 className="text-xl font-black uppercase tracking-widest italic">Global Footprint</h3>
              </div>
              <div className="space-y-8">
                 {IMPACT_STREAMS.map((s, i) => (
                    <div key={`impact-stream-${i}`} className="space-y-3">
                       <div className="flex justify-between items-end">
                          <span className="text-[10px] font-black text-indigo-400/60 uppercase tracking-widest">{s.name}</span>
                          <span className="text-2xl font-black italic leading-none">{s.value.toLocaleString()}{s.unit}</span>
                       </div>
                       <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} transition={{ duration: 1, delay: i * 0.2 }} className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           <div className="p-10 rounded-[3rem] bg-emerald-500/5 border border-emerald-500/10 backdrop-blur-3xl shadow-2xl relative group overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full opacity-40" />
              <div className="flex items-center gap-4 mb-8">
                 <Gift size={20} className="text-emerald-500" />
                 <h3 className="text-lg font-black uppercase tracking-widest italic leading-none">Beneficiaries</h3>
              </div>
              <h2 className="text-5xl font-black italic tracking-tighter leading-none mb-2">1,820 <span className="text-sm not-italic opacity-40 uppercase">Units</span></h2>
              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest italic leading-relaxed">Active student sponsorships synchronized with the Digital Literacy mission roadmap.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default NGOPortal;
