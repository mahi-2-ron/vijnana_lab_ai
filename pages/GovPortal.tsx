import React from 'react';
import { 
  Building2, Map, Users, Download, Activity, 
  ShieldCheck, Globe, Database, HelpCircle
} from 'lucide-react';
import { 
  Treemap, ResponsiveContainer, Tooltip, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';

const DISTRICT_DATA = [
  { name: 'Bangalore Urban', size: 45000, color: '#6366f1' },
  { name: 'Mysuru', size: 32000, color: '#4f46e5' },
  { name: 'Dharwad', size: 28000, color: '#4338ca' },
  { name: 'Belagavi', size: 25000, color: '#3730a3' },
  { name: 'Mangaluru', size: 22000, color: '#312e81' },
  { name: 'Kalaburagi', size: 18000, color: '#1e1b4b' },
  { name: 'Shivamogga', size: 15000, color: '#0f172a' },
  { name: 'Tumakuru', size: 12000, color: '#020617' },
];

const SUBJECT_PERFORMANCE = [
  { name: 'Phy', Score: 78, Labs: 12000 },
  { name: 'Che', Score: 82, Labs: 11500 },
  { name: 'Bio', Score: 85, Labs: 10800 },
  { name: 'Mat', Score: 74, Labs: 15000 },
];

const GovPortal: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 md:p-12 relative overflow-hidden font-sans">
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-emerald-500/10 to-transparent pointer-events-none" />
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8 relative z-10">
        <div className="flex items-center gap-10">
           <div className="w-24 h-24 md:w-32 md:h-32 rounded-[3.5rem] bg-emerald-500/20 border-2 border-emerald-500/30 flex items-center justify-center text-emerald-500 shadow-[0_0_100px_rgba(16,185,129,0.1)] relative">
              <ShieldCheck size={64} className="md:size-80" />
              <div className="absolute inset-0 rounded-[3.5rem] border border-emerald-500/20 animate-pulse" />
           </div>
           <div>
              <div className="flex items-center gap-3 mb-3">
                 <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] leading-none px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">Official Monitor</span>
                 <span className="text-xs text-slate-500 font-bold uppercase tracking-[0.2em] italic underline decoration-slate-800 underline-offset-4">Department of Collegiate Education</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-black italic tracking-tighter uppercase leading-none">State Digital Lab <span className="text-emerald-500">Observer</span></h1>
           </div>
        </div>
        <button 
          className="px-12 py-6 rounded-[2.5rem] bg-slate-900 border border-emerald-500/30 hover:bg-slate-800 text-emerald-500 font-black text-xs uppercase tracking-[0.3em] shadow-3xl flex items-center gap-6 transition-all active:scale-95 group"
        >
          Export State Report <Download size={24} className="group-hover:translate-y-1 transition-transform" />
        </button>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 relative z-10">
        {[
          { id: 'k1', icon: Building2, label: 'Schools In Program', val: '2,480', sub: 'Karnataka State Wide' },
          { id: 'k2', icon: Users, label: 'Total Student Sessions', val: '1.24M', sub: 'Last 30 Days Activity' },
          { id: 'k3', icon: Globe, label: 'Districts Reached', val: '31/31', sub: 'Full Saturation Achieved' },
          { id: 'k4', icon: Activity, label: 'Average Lab Score', val: '78.2%', sub: 'Based on 4.5M Quizzes' },
        ].map((k) => (
          <div key={k.id} className="p-10 rounded-[3rem] bg-white/[0.03] border border-white/5 backdrop-blur-3xl shadow-inner group hover:bg-emerald-500/[0.05] hover:border-emerald-500/20 transition-all">
             <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center text-slate-500 group-hover:text-emerald-400 group-hover:bg-emerald-500/10 transition-all mb-8 shadow-xl">
                <k.icon size={28} />
             </div>
             <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2 leading-none group-hover:text-emerald-500/60 transition-colors">{k.label}</p>
             <h2 className="text-4xl font-black italic tracking-tighter mb-2 leading-none group-hover:text-white transition-colors">{k.val}</h2>
             <p className="text-[9px] font-bold text-slate-500/50 uppercase tracking-widest leading-none">{k.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
        {/* District Treemap Heatmap */}
        <div className="lg:col-span-2 p-12 rounded-[4rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl shadow-inner overflow-hidden">
           <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-6">
                 <Map size={32} className="text-emerald-500" />
                 <h3 className="text-3xl font-black italic tracking-tighter uppercase leading-none">Usage Heatmap <span className="text-sm opacity-40 ml-4 font-bold not-italic font-mono lowercase tracking-normal">district-wise-saturation</span></h3>
              </div>
              <div className="flex bg-slate-900/60 p-2 rounded-2xl border border-white/5 shadow-inner">
                 <button className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-widest leading-none">Density</button>
                 <button className="px-4 py-2 rounded-xl text-slate-500 hover:text-emerald-500 text-[10px] font-black uppercase tracking-widest leading-none transition-colors">Completion</button>
              </div>
           </div>
           
           <div className="h-[500px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <Treemap 
                   data={DISTRICT_DATA} 
                   dataKey="size" 
                   stroke="#020617" 
                   strokeWidth={2}
                   content={<CustomContent />}
                 >
                    <Tooltip content={<CustomGovTooltip />} />
                 </Treemap>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Lab Usage by Domain */}
        <div className="grid grid-rows-2 gap-8">
           <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl shadow-inner">
              <div className="flex items-center gap-6 mb-12">
                 <Database size={24} className="text-emerald-500" />
                 <h3 className="text-xl font-black uppercase tracking-widest italic">Subject Velocity</h3>
              </div>
              <div className="h-[200px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={SUBJECT_PERFORMANCE}>
                       <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.05)" />
                       <XAxis dataKey="name" stroke="white" opacity={0.3} fontSize={10} fontWeight="black" />
                       <YAxis hide />
                       <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} content={<CustomGovTooltip />} />
                       <Bar dataKey="Labs" fill="#10b981" radius={[8, 8, 0, 0]} />
                    </BarChart>
                 </ResponsiveContainer>
              </div>
           </div>

           <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl shadow-inner group overflow-hidden relative">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full opacity-50" />
              <div className="flex items-center gap-6 mb-12">
                 <HelpCircle size={24} className="text-emerald-500" />
                 <h3 className="text-xl font-black uppercase tracking-widest italic leading-none">Policy Support</h3>
              </div>
              <p className="text-[11px] text-slate-500 font-bold uppercase tracking-[0.2em] italic mb-8 leading-relaxed max-w-xs">AI-Assisted Policy Summaries based on state-level pedagogical impact. Direct integration with Samagra Shiksha targets.</p>
              <button 
                className="w-full py-6 rounded-2xl bg-white/5 border border-white/5 group-hover:border-emerald-500/40 group-hover:bg-emerald-500/10 text-[10px] font-black text-slate-400 group-hover:text-emerald-500 uppercase tracking-widest transition-all"
              >
                Access Policy Engine
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

const CustomContent = (props: any) => {
   const { x, y, width, height, name, color } = props;
   return (
     <g>
       <rect x={x} y={y} width={width} height={height} style={{ fill: color || '#10b981', stroke: '#020617', strokeWidth: 2 }} />
       {width > 60 && height > 40 && (
         <text x={x + width / 2} y={y + height / 2} textAnchor="middle" fill="white" fontSize={11} fontWeight="black" className="uppercase tracking-tighter opacity-80 pointer-events-none italic italic">
           {name}
         </text>
       )}
     </g>
   );
};

const CustomGovTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-6 rounded-3xl bg-emerald-950/90 border border-emerald-500/40 backdrop-blur-3xl shadow-2xl">
        <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em] mb-2">{payload[0].payload.name}</p>
        <p className="text-2xl font-black italic">{payload[0].value.toLocaleString()} <span className="text-xs not-italic opacity-40 uppercase">Metrics</span></p>
      </div>
    );
  }
  return null;
};

export default GovPortal;
