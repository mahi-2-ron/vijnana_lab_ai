import { Share2, Gift, Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { useUsageTracker } from '../../services/PlanContext';

const ReferralCard: React.FC = () => {
  const { usageStats } = useUsageTracker();
  const [isCopied, setIsCopied] = useState(false);

  const referralCode = usageStats?.referralCode || 'VIJNANA-' + Math.random().toString(36).substring(2, 7).toUpperCase();
  const shareMessage = `I've been using Vijnana Lab to prep for my practicals! Use my code [${referralCode}] to get your first month free 🔬`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareMessage);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const shareToWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="p-8 rounded-[2.5rem] bg-indigo-600/10 border border-indigo-500/20 backdrop-blur-2xl relative overflow-hidden group">
      <div className="absolute -top-12 -left-12 w-32 h-32 bg-indigo-500/20 blur-3xl rounded-full" />
      <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-indigo-500/10 blur-2xl rounded-full" />
      
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-5">
           <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-xl shadow-indigo-500/10">
              <Gift size={28} />
           </div>
           <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-1">Affiliate Program</p>
              <h3 className="text-2xl font-black text-white italic tracking-tighter leading-none uppercase">Spread the Science</h3>
           </div>
        </div>
        <div className="flex flex-col items-end">
           <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Rewards Won</span>
           <span className="text-xl font-black text-white italic">{usageStats?.proDaysEarned || 0} PRO DAYS</span>
        </div>
      </div>

      <p className="text-sm text-slate-400 leading-relaxed font-medium mb-8 max-w-xs">
        Invite a fellow scientist to the lab. When they sign up, <span className="text-white font-black underline decoration-indigo-500/50 underline-offset-4">YOU GET 7 DAYS OF PRO FOR FREE</span>.
      </p>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 flex items-center justify-between p-4 px-6 rounded-2xl bg-black/40 border border-white/5 font-mono text-sm tracking-widest text-indigo-400 relative overflow-hidden">
           <div className="absolute inset-0 bg-indigo-500/5" />
           <span className="relative z-10 font-black">{referralCode}</span>
           <button onClick={copyToClipboard} className="relative z-10 p-2 hover:bg-white/5 rounded-lg transition-colors text-slate-400 hover:text-white">
              {isCopied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
           </button>
        </div>

        <button 
          onClick={shareToWhatsApp}
          className="flex-1 py-4 px-6 rounded-2xl bg-indigo-500 hover:bg-indigo-400 text-white font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-indigo-500/20 transition-all flex items-center justify-center gap-3 active:scale-95 group"
        >
          Share on WhatsApp <Share2 size={16} className="group-hover:scale-110 transition-transform" />
        </button>
      </div>

      <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
         <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Active Referrals</span>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
         </div>
         <span className="text-sm font-black text-white italic">{usageStats?.referralCount || 0} SCIENTISTS</span>
      </div>
    </div>
  );
};

export default ReferralCard;
