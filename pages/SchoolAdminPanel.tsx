import React from 'react';
import { 
  Users, BarChart3, AlertTriangle, 
  Send, Zap, Layout
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Cell 
} from 'recharts';

const MOCK_USAGE_DATA = [
  { name: 'Titration', count: 145 },
  { name: 'Electrolysis', count: 112 },
  { name: 'pH Test', count: 89 },
  { name: 'Concave Mirror', count: 67 },
  { name: 'Ohm Law', count: 54 },
];

const InactiveStudents = [
  { id: 1, name: 'Adithi Sharma', lastActive: '8 days ago', labs: 12 },
  { id: 2, name: 'Rahul Varma', lastActive: '11 days ago', labs: 8 },
  { id: 3, name: 'Suhas K.', lastActive: '14 days ago', labs: 5 },
];

const SchoolAdminPanel: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 md:p-12 relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[#0f172a] opacity-50 pointer-events-none" />
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8 relative z-10">
        <div>
           <div className="flex items-center gap-3 mb-2">
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em] leading-none">Institutional Insight</span>
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
           </div>
           <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none">School Commander <span className="text-indigo-500 underline decoration-indigo-500/20 underline-offset-8">v1.2</span></h1>
        </div>
        <button 
          className="px-10 py-5 rounded-3xl bg-indigo-500 hover:bg-indigo-400 text-white font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-indigo-500/20 transition-all flex items-center gap-4 active:scale-95"
        >
          Assign Lab Module <Send size={20} />
        </button>
      </div>

      {/* Grid: Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 relative z-10">
        <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-3xl shadow-2xl group transition-all hover:bg-white/10">
           <div className="flex items-center justify-between mb-8">
              <Users className="text-indigo-400" size={32} />
              <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-widest">+12%</div>
           </div>
           <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Active Students This Week</p>
           <h2 className="text-5xl font-black tracking-tighter italic">248 <span className="text-base text-slate-600 not-italic uppercase ml-2">Scientists</span></h2>
        </div>

        <div className="p-8 rounded-[2.5rem] bg-indigo-600/10 border border-indigo-500/20 backdrop-blur-3xl shadow-2xl group transition-all hover:bg-indigo-600/20">
           <div className="flex items-center justify-between mb-8">
              <Zap className="text-indigo-400" size={32} />
              <div className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest">Live</div>
           </div>
           <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Compute Efficiency Score</p>
           <h2 className="text-5xl font-black tracking-tighter italic">98.4 <span className="text-base text-indigo-400/50 not-italic uppercase ml-2">Sigma</span></h2>
        </div>

        <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-3xl shadow-2xl group transition-all hover:bg-white/10">
           <div className="flex items-center justify-between mb-8">
              <BarChart3 className="text-indigo-400" size={32} />
           </div>
           <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Avg Labs Completed / User</p>
           <h2 className="text-5xl font-black tracking-tighter italic">14.2 <span className="text-base text-slate-600 not-italic uppercase ml-2">Units</span></h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
        {/* Lab Usage Analytics */}
        <div className="p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-3xl shadow-inner">
           <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-4">
                 <Layout className="text-indigo-400" size={24} />
                 <h3 className="text-2xl font-black uppercase tracking-widest italic">Research Hotspots</h3>
              </div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic leading-none">Last 30 Days Domain Frequency</span>
           </div>

           <div className="h-[300px] w-full">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={MOCK_USAGE_DATA} layout="vertical" margin={{ left: 20 }}>
                 <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.05)" />
                 <XAxis type="number" hide />
                 <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.4)" fontSize={10} width={100} tick={<CustomYAxisTick />} />
                 <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} content={<CustomTooltip />} />
                 <Bar dataKey="count" radius={[0, 10, 10, 0]} >
                   {MOCK_USAGE_DATA.map((entry) => (
                      <Cell key={entry.name} fill={entry.name === MOCK_USAGE_DATA[0].name ? '#6366f1' : '#4f46e5'} style={{ opacity: 1 }} />
                   ))}
                 </Bar>
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Inertia Alert: Inactive Students */}
        <div className="p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-3xl shadow-inner">
           <div className="flex items-center gap-4 mb-10">
              <AlertTriangle className="text-amber-500" size={24} />
              <h3 className="text-2xl font-black uppercase tracking-widest italic">Inertia Alert <span className="text-sm text-slate-500 opacity-60 ml-2">(7+ Days Inactive)</span></h3>
           </div>

           <div className="space-y-4">
              {InactiveStudents.map((s) => (
                <div key={s.id} className="p-6 rounded-[2rem] bg-white/5 border border-white/5 flex items-center justify-between group hover:bg-white/[0.08] hover:border-amber-500/20 transition-all">
                   <div className="flex items-center gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center font-black text-slate-400 group-hover:bg-amber-500/10 group-hover:text-amber-500 transition-colors">
                        {s.name?.charAt(0) || '?'}
                      </div>
                      <div>
                         <p className="text-lg font-black text-white leading-none mb-1">{s.name}</p>
                         <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Completed: {s.labs} Labs</p>
                      </div>
                   </div>
                   <div className="flex flex-col items-end">
                      <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest leading-none mb-1">{s.lastActive}</span>
                      <div className="flex items-center gap-2">
                         <div className="w-1 h-1 rounded-full bg-slate-600" />
                         <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Drift detected</span>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

const CustomYAxisTick = (props: any) => {
   const { x, y, payload } = props;
   return <text x={x} y={y} dy={4} textAnchor="end" fill="rgba(255,255,255,0.6)" fontSize={10} fontWeight="black" className="uppercase tracking-widest font-mono italic">{payload.value}</text>;
};

const CustomTooltip = ({ active, payload }: any) => {
   if (active && payload && payload.length) {
     return (
       <div className="p-4 rounded-2xl bg-indigo-950/90 border border-indigo-500/40 backdrop-blur-2xl">
         <p className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-1">{payload[0].payload.name}</p>
         <p className="text-lg font-black italic">{payload[0].value} Accesses</p>
       </div>
     );
   }
   return null;
};

export default SchoolAdminPanel;
