import { 
  Users, MapPin, Building2, 
  Heart, ArrowRight, 
  Database, Zap, Trophy, MessageSquare
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ImpactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-hidden font-sans pt-32 pb-48 relative">
      {/* Dynamic Background */}
      <div className="absolute inset-x-0 top-0 h-[1000px] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-white/[0.015] -z-10" />
      
      {/* Hero Section */}
      <section className="container mx-auto px-6 relative mb-48 text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center gap-20">
           <div className="flex-1 space-y-12">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                 <div className="flex items-center justify-center md:justify-start gap-4 mb-8">
                    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.5em] leading-none px-5 py-2.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-xl">Impact Hub Live</span>
                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-ping" />
                 </div>
                 <h1 className="text-7xl md:text-[10rem] font-black italic tracking-tighter uppercase leading-[0.8] mb-10">Vijnana <span className="text-indigo-600">Impact</span> 2026</h1>
                 <p className="text-xl md:text-3xl text-slate-400 font-bold uppercase tracking-[0.1em] italic leading-relaxed max-w-2xl bg-gradient-to-r from-slate-300 to-indigo-400 bg-clip-text text-transparent mb-12">
                    Bridging the laboratory gap for Bharat. Real-time data telemetry from state-wide digital simulations.
                 </p>
                 
                 <div className="flex flex-wrap gap-8 justify-center md:justify-start">
                    <Link to="/donate" className="px-14 py-7 rounded-[2rem] bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-[0.4em] shadow-3xl shadow-indigo-500/30 flex items-center gap-6 transition-all active:scale-95 group">
                       Sponsor Bharat <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                    </Link>
                    <button className="px-14 py-7 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 font-black text-xs uppercase tracking-[0.4em] backdrop-blur-2xl transition-all">
                       Whitepaper
                    </button>
                 </div>
              </motion.div>
           </div>

           {/* Live Counters */}
           <div className="grid grid-cols-2 gap-8 w-full max-w-xl">
              {[
                { label: 'Active Students', count: '124K+', icon: Users, color: 'text-indigo-400' },
                { label: 'Simulations Run', count: '4.5M+', icon: Database, color: 'text-emerald-400' },
                { label: 'State Boards', count: '04+', icon: MapPin, color: 'text-amber-400' },
                { label: 'Partner Schools', count: '2.4K+', icon: Building2, color: 'text-rose-400' },
              ].map((c, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                  key={`impact-count-${c.label}`} 
                  className="p-10 rounded-[4rem] bg-white/[0.03] border border-white/5 backdrop-blur-3xl shadow-inner group hover:bg-white/[0.07] hover:border-white/20 transition-all text-center"
                >
                   <div className="w-16 h-16 rounded-2xl bg-slate-900/50 flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform">
                      <c.icon size={28} className={c.color} />
                   </div>
                   <h2 className="text-5xl font-black italic tracking-tighter mb-2">{c.count}</h2>
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{c.label}</p>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* Partners & Badges */}
      <section className="container mx-auto px-6 mb-48">
         <div className="flex items-center gap-10 mb-20 overflow-hidden px-8">
            <h3 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em] leading-none whitespace-nowrap italic">Institutional Alignment</h3>
            <div className="h-[1px] w-full bg-indigo-500/10" />
         </div>

         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 grayscale hover:grayscale-0 transition-all duration-700">
            {['Karnataka Education', 'Samagra Shiksha', 'NITI Aayog', 'UnitedWay', 'GiveIndia', 'SkillIndia'].map((p) => (
              <div key={`partner-${p}`} className="flex items-center justify-center text-center p-8 border border-white/5 rounded-[2.5rem] bg-white/[0.02] hover:bg-indigo-500/5 hover:border-indigo-500/20 transition-all cursor-crosshair">
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] leading-tight text-slate-500 group-hover:text-white transition-colors">{p}</span>
              </div>
            ))}
         </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-6 mb-48 relative">
         <div className="flex flex-col items-center text-center mb-24 max-w-4xl mx-auto">
            <Trophy className="text-amber-500 mb-10" size={80} strokeWidth={1} />
            <h2 className="text-6xl md:text-9xl font-black italic tracking-tighter uppercase mb-8 leading-[0.8] text-glow">The Impact <span className="text-indigo-600">Narrative</span></h2>
            <p className="text-xl text-slate-500 font-bold uppercase tracking-widest italic max-w-xl">Deep-tech pedagogies, high-human stories.</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { 
                text: "My students in Raichur have never seen an electrolysis setup. Vijnana Lab didn't just show them—it let them experiment until they understood.",
                author: "Dr. Ramesh K.", role: "Physics HOD, GJC Raichur" 
              },
              { 
                text: "The state-level monitoring allows us to target pedagogical interventions where they're needed most. This is the Digital India mission realized.",
                author: "Anitha M.", role: "Education Dept. Official" 
              },
              { 
                text: "As an NGO, we need accountability. The real-time impact scoring for our sponsored students is the most transparent reporting we've ever had.",
                author: "Suhasini P.", role: "Foundation Lead" 
              }
            ].map((t) => (
              <motion.div whileHover={{ y: -10 }} key={`test-${t.author}`} className="p-14 rounded-[5rem] bg-indigo-500/[0.03] border border-indigo-500/10 backdrop-blur-3xl shadow-2xl space-y-12 relative group overflow-hidden">
                 <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/5 blur-3xl rounded-full" />
                 <MessageSquare className="absolute top-12 right-12 text-indigo-500/10" size={64} />
                 <p className="text-2xl font-bold leading-relaxed italic text-slate-300 relative z-10">"{t.text}"</p>
                 <div className="flex items-center gap-8 relative z-10">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center font-black text-indigo-400 text-xl shadow-lg shadow-indigo-500/20">{t.author[0]}</div>
                    <div>
                       <p className="text-xl font-black text-white italic tracking-tighter uppercase leading-none mb-1.5">{t.author}</p>
                       <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest leading-none">{t.role}</p>
                    </div>
                 </div>
              </motion.div>
            ))}
         </div>
      </section>

      {/* CSR Donation CTA */}
      <section className="container mx-auto px-6">
         <motion.div 
            initial={{ scale: 0.95, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} 
            className="p-20 md:p-40 rounded-[6rem] bg-indigo-600 border border-white/20 relative overflow-hidden text-center shadow-[0_50px_100px_-20px_rgba(79,70,229,0.4)]"
         >
            <div className="absolute inset-0 bg-grid-white/10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/20 blur-[150px] rounded-full pointer-events-none" />
            
            <Heart size={100} className="mx-auto mb-16 text-white fill-white/20 animate-pulse" strokeWidth={1} />
            <h2 className="text-7xl md:text-[11rem] font-black italic tracking-tighter text-white uppercase leading-[0.75] mb-16 max-w-6xl mx-auto">Science for <span className="underline decoration-indigo-300 underline-offset-[20px]">Everyone</span></h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-10 px-10 relative z-10">
               <Link to="/donate" className="w-full md:w-auto px-20 py-9 rounded-[3rem] bg-white text-indigo-600 font-black text-sm uppercase tracking-[0.5em] shadow-3xl hover:bg-slate-50 transition-all flex items-center justify-center gap-6 active:scale-95 group">
                  Sponsor Bharat <Zap size={24} fill="currentColor" />
               </Link>
               <button className="w-full md:w-auto px-20 py-9 rounded-[3rem] bg-transparent border-4 border-white/40 text-white font-black text-sm uppercase tracking-[0.5em] backdrop-blur-xl hover:border-white transition-all">
                  Partner View
               </button>
            </div>
         </motion.div>
      </section>
    </div>
  );
};

export default ImpactPage;
