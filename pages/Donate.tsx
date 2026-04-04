import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, Zap, ShieldCheck, Globe, 
  Users, Building2, 
  ArrowRight, Sparkles, AlertTriangle
} from 'lucide-react';

const Donate: React.FC = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Inject Razorpay script if not present
    if (!document.getElementById('razorpay-js')) {
      const script = document.createElement('script');
      script.id = 'razorpay-js';
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const initiatePayment = async (planAmount: number) => {
    setLoading(true);

    let planDesc = 'Custom Cohort';
    if (planAmount === 299) planDesc = '1 Student';
    else if (planAmount === 8000) planDesc = '1 School';
    
    const options = {
      key: 'YOUR_RAZORPAY_KEY', // Should be in env
      amount: planAmount * 100, // in paise
      currency: 'INR',
      name: 'Vijnana Lab Philanthropy',
      description: `Sponsorship for ${planDesc}`,
      handler: function (response: any) {
        alert(response.razorpay_payment_id);
      },
      prefill: {
         name: '',
         email: '',
      },
      theme: { color: '#6366f1' },
    };

    const rzp = new (globalThis as any).Razorpay(options);
    rzp.open();
    setLoading(false);
  };

  const TIERS = [
    { id: 't1', icon: Users, title: 'Sponsor a Student', price: 299, sub: '₹299/mo', beneficiaries: '01 Student', impact: 'Individual Access to All Labs & AI', color: 'bg-indigo-500' },
    { id: 't2', icon: Building2, title: 'Sponsor a School', price: 8000, sub: '₹8,000/yr', beneficiaries: 'Unlimited Students', impact: 'Full Institutional Access + Analytics', color: 'bg-emerald-500' },
    { id: 't3', icon: Globe, title: 'Sponsor a District', price: 50000, sub: '₹50,000+', beneficiaries: 'Custom Cohorts', impact: 'State-wide Pedagogical Impact', color: 'bg-amber-500' },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-32 pb-48 relative overflow-hidden font-sans">
      {/* Background Ambience */}
      <div className="absolute inset-x-0 top-0 h-[1000px] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-white/[0.015] -z-10" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Hero */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-24">
           <motion.div 
             initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
             className="w-20 h-20 rounded-[2rem] bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-10 shadow-3xl shadow-indigo-500/10"
           >
              <Heart size={40} className="fill-indigo-500/20 animate-pulse" />
           </motion.div>
           
           <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.85] mb-8">Science for <span className="text-indigo-500">Every Bharat</span></h1>
           <p className="text-xl text-slate-400 font-bold uppercase tracking-widest italic leading-relaxed max-w-2xl text-center">
              Your contribution breaks the lab equipment gap in rural colleges. Every Rupee sponsors a digital exploration.
           </p>
        </div>

        {/* Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
           {TIERS.map((t) => (
             <motion.div 
               key={t.id}
               initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
               className="group p-10 rounded-[4rem] bg-white/[0.03] border border-white/5 backdrop-blur-3xl shadow-inner relative overflow-hidden hover:bg-white/[0.06] hover:border-white/20 transition-all flex flex-col items-center text-center"
             >
                <div className={`w-16 h-16 rounded-2xl ${t.color}/20 flex items-center justify-center ${t.color.replace('bg', 'text')} mb-10 shadow-xl`}>
                   <t.icon size={32} />
                </div>
                <h3 className="text-2xl font-black italic tracking-tighter uppercase mb-2">{t.title}</h3>
                <p className="text-4xl font-black text-white italic tracking-tighter mb-8 leading-none">{t.sub}</p>
                
                <div className="w-full space-y-4 mb-12 text-left">
                   <div className="flex items-center gap-4 p-4 rounded-3xl bg-black/20 border border-white/5">
                      <Users size={16} className="text-slate-500" />
                      <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none">{t.beneficiaries} Benefited</span>
                   </div>
                   <div className="flex items-center gap-4 p-4 rounded-3xl bg-black/20 border border-white/5">
                      <Sparkles size={16} className="text-slate-500" />
                      <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-[1.4]">{t.impact}</span>
                   </div>
                </div>

                <button 
                  onClick={() => initiatePayment(t.price)}
                  disabled={loading}
                  className={`w-full py-6 rounded-[2rem] ${t.color} hover:saturate-150 text-white font-black text-xs uppercase tracking-[0.3em] shadow-3xl shadow-indigo-500/10 transition-all flex items-center justify-center gap-4 active:scale-95`}
                >
                   Sponsor Now <ArrowRight size={18} />
                </button>
             </motion.div>
           ))}
        </div>

        {/* Custom Amount / Enterprise */}
        <div className="max-w-4xl mx-auto p-12 md:p-20 rounded-[5rem] bg-white/[0.02] border border-white/10 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
           <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />
           <div className="flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
              <div className="p-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-500 shrink-0 shadow-2xl">
                 <ShieldCheck size={48} />
              </div>
              <div className="flex-1 space-y-6">
                 <div>
                    <h3 className="text-3xl font-black italic tracking-tighter uppercase leading-none mb-3">CSR Institutional & CSR Partnership</h3>
                    <p className="text-lg text-slate-500 font-bold uppercase tracking-widest italic font-mono lowercase tracking-normal">Large scale deployment for Districts / States</p>
                 </div>
                 <p className="text-sm text-slate-400 font-bold uppercase tracking-widest italic leading-relaxed">
                    Customized reporting, impact dashboards, and tax-exempt (80G) receipts for corporate-led educational interventions.
                 </p>
                 <button className="px-12 py-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-emerald-500/10 hover:border-emerald-500/30 text-slate-400 hover:text-emerald-500 font-black text-xs uppercase tracking-[0.3em] transition-all flex items-center gap-6">
                    Download Enterprise Brochure <DownloadIcon size={20} />
                 </button>
              </div>
           </div>
        </div>

        {/* Global Security Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 opacity-40">
           {[
             { id: 's1', icon: ShieldCheck, label: 'Secure Transaction' },
             { id: 's2', icon: Heart, label: 'Direct Impact' },
             { id: 's3', icon: Zap, label: 'Instant Activation' },
             { id: 's4', icon: AlertTriangle, label: '80G Tax Exempt' },
           ].map((s) => (
             <div key={s.id} className="flex items-center justify-center gap-4">
                <s.icon size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">{s.label}</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

const DownloadIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
);

export default Donate;
