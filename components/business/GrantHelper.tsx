import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Sparkles, Download, ArrowRight, 
  BrainCircuit, Globe, Building2, CheckCircle2,
  Database, Activity
} from 'lucide-react';

const GrantHelper: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [grantType, setGrantType] = useState<'NITI' | 'SAMAGRA' | 'NDLI'>('NITI');

  const generateGrantCopy = async () => {
    setIsGenerating(true);
    // In a real app, this would call the /api/ai-grant endpoint
    // to interact with Gemini 2.0 Flash
    setTimeout(() => setIsGenerating(false), 3000);
  };

  const GRANT_MODELS = [
    { id: 'NITI', label: 'NITI AAYOG EDTECH', sub: 'Atal Innovation Mission' },
    { id: 'SAMAGRA', label: 'SAMAGRA SHIKSHA', sub: 'School Digital Inclusion' },
    { id: 'NDLI', label: 'NDLI PARTNERSHIP', sub: 'National Digital Library' },
  ];

  return (
    <div className="p-12 rounded-[4rem] bg-white/[0.03] border border-white/5 backdrop-blur-3xl shadow-3xl relative overflow-hidden group">
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
        <div className="flex items-center gap-8">
           <div className="w-20 h-20 rounded-[2.5rem] bg-indigo-600/20 border border-indigo-600/30 flex items-center justify-center text-indigo-400 shadow-2xl relative">
              <BrainCircuit size={40} className="animate-pulse" />
              <div className="absolute inset-x-0 bottom-[-10px] h-1 bg-indigo-500 blur-sm rounded-full" />
           </div>
           <div>
              <div className="flex items-center gap-3 mb-2">
                 <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em] leading-none px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">AI Intelligence Core</span>
                 <span className="text-xs text-slate-500 font-bold uppercase tracking-[0.2em] italic leading-none">Powered by Gemini 2.0 Flash</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase leading-none italic leading-none">Grant <span className="text-indigo-500">Navigator</span></h1>
           </div>
        </div>
        <div className="hidden md:flex items-center gap-8 px-10">
           <div className="flex flex-col items-end">
              <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest leading-none mb-1">State Data Integration</span>
              <span className="text-sm font-black text-emerald-500 uppercase italic">Active & Synchronized</span>
           </div>
           <div className="w-[1px] h-10 bg-white/5" />
           <div className="flex flex-col items-end">
              <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest leading-none mb-1">Model Accuracy</span>
              <span className="text-sm font-black text-indigo-400 italic">94.2%</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Step 1: Selection */}
        <div className="space-y-10">
           <div className="space-y-4">
              <h3 className="text-xl font-black uppercase tracking-widest leading-none italic">Step 01: Select Grant Program</h3>
              <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest max-w-sm italic">Synchronizes usage telemetry for automated impact justification.</p>
           </div>
           
           <div className="space-y-4">
              {GRANT_MODELS.map((g) => (
                <button 
                  key={g.id}
                  onClick={() => setGrantType(g.id as any)}
                  className={`w-full p-8 rounded-[2.5rem] border transition-all text-left group flex items-center justify-between ${
                    grantType === g.id ? 'bg-indigo-600/10 border-indigo-500/40 shadow-2xl shadow-indigo-500/10' : 'bg-white/[0.02] border-white/5 hover:border-white/20'
                  }`}
                >
                   <div className="flex items-center gap-6">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                        grantType === g.id ? 'bg-indigo-500 text-white shadow-xl' : 'bg-slate-800 text-slate-600'
                      }`}>
                         <FileText size={20} />
                      </div>
                      <div>
                         <p className={`text-lg font-black italic tracking-tighter uppercase leading-none mb-1 ${grantType === g.id ? 'text-white' : 'text-slate-500'}`}>{g.label}</p>
                         <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest leading-none">{g.sub}</p>
                      </div>
                   </div>
                   {grantType === g.id && <CheckCircle2 size={24} className="text-indigo-400" />}
                </button>
              ))}
           </div>
        </div>

        {/* Step 2: Generation */}
        <div className="p-12 rounded-[3.5rem] bg-black/40 border border-white/5 flex flex-col justify-between group overflow-hidden relative">
           <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full opacity-40" />
           
           <div className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                 <Building2 size={20} className="text-slate-500" />
                 <h3 className="text-sm font-black uppercase tracking-widest italic opacity-40">Live Impact Manifest</h3>
              </div>
              
              <div className="space-y-6">
                 <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Students Reach</span>
                    <span className="text-xl font-black italic tracking-tighter">124,500</span>
                 </div>
                 <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">State Saturation Index</span>
                    <span className="text-xl font-black italic tracking-tighter">78.4%</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Laboratory Engagement</span>
                    <span className="text-xl font-black italic tracking-tighter leading-none">4.5M Units</span>
                 </div>
              </div>
           </div>

           <div className="mt-20 flex flex-col gap-4">
              <button 
                onClick={generateGrantCopy}
                disabled={isGenerating}
                className="w-full py-6 rounded-[2rem] bg-indigo-500 hover:bg-indigo-400 text-white font-black text-xs uppercase tracking-[0.3em] shadow-3xl shadow-indigo-500/20 transition-all flex items-center justify-center gap-4 active:scale-95 disabled:grayscale"
              >
                 {isGenerating ? (
                   <span className="flex items-center gap-3"><Sparkles className="animate-spin" size={20} /> SYNCHRONIZING WITH GEMINI...</span>
                 ) : (
                   <span className="flex items-center gap-3 italic uppercase font-black uppercase">Launch AI Application Builder <Sparkles size={18} fill="currentColor" /></span>
                 )}
              </button>
              <button 
                className="w-full py-5 rounded-2xl bg-white/5 border border-white/5 text-slate-500 hover:text-white font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 group"
              >
                 Direct Download Impact Metadata <Download size={16} />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default GrantHelper;
