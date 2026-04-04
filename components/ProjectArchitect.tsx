
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lightbulb, Rocket, Target, BookOpen, 
  ChevronRight, ChevronLeft, Sparkles, 
  Trash2, Download, Save, Share2
} from 'lucide-react';
import GlassCard from './GlassCard';

const MotionDiv = motion.div as any;

const SUBJECTS = [
  { id: 'physics', label: 'Physics', color: 'indigo' },
  { id: 'chemistry', label: 'Chemistry', color: 'emerald' },
  { id: 'biology', label: 'Biology', color: 'lime' },
  { id: 'math', label: 'Math', color: 'amber' },
  { id: 'cs', label: 'Computer Science', color: 'sky' }
];

const ProjectArchitect: React.FC = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        subject: '',
        topic: '',
        level: 'Intermediate',
        goal: '',
        hypothesis: ''
    });

    const [isGenerating, setIsGenerating] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleGenerate = () => {
        setIsGenerating(true);
        // Mocking AI delay
        setTimeout(() => {
            setResult({
                title: `Experimental Study of ${formData.topic || 'New Horizons'}`,
                aim: `To investigate the relationship between ${formData.topic} and system behavioral patterns under ${formData.level} constraints.`,
                apparatus: [
                    "Virtual Multi-meter",
                    "Reaction Vessel Alpha",
                    "Calibration Sensor v4",
                    "Environment Control Unit"
                ],
                procedure: [
                    "Initialize the simulation environment with baseline parameters.",
                    "Slowly introduce variable X while monitoring Y sensors.",
                    "Record disturbances in the sub-atomic grid every 50ms.",
                    "Repeat the cycle 3 times to ensure statistical significance."
                ],
                safety: "Wear standard Class-B protective gear. Ensure virtual discharge vents are open."
            });
            setIsGenerating(false);
            setStep(4);
        }, 3000);
    };

    const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    return (
        <div className="w-full max-w-5xl mx-auto p-4 md:p-8">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-amber-500/20 rounded-2xl">
                    <Lightbulb className="text-amber-500 w-8 h-8 animate-pulse" />
                </div>
                <div>
                    <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white">Project Architect</h2>
                    <p className="text-slate-600 dark:text-gray-400">Brainstorm and blueprint your next big scientific discovery.</p>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="flex gap-2 mb-8 h-1.5 px-2">
                {[1, 2, 3, 4].map(s => (
                    <div 
                        key={s} 
                        className={`flex-1 rounded-full transition-all duration-500 ${step >= s ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'bg-slate-200 dark:bg-white/10'}`}
                    />
                ))}
            </div>

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <MotionDiv
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Choose Your Discipline</h3>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {SUBJECTS.map(sub => (
                                <button
                                    key={sub.id}
                                    onClick={() => { setFormData({ ...formData, subject: sub.id }); nextStep(); }}
                                    className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${
                                        formData.subject === sub.id 
                                        ? 'border-amber-500 bg-amber-500/10' 
                                        : 'border-slate-200 dark:border-white/5 bg-white/5 hover:border-amber-500/50'
                                    }`}
                                >
                                    <div className={`p-3 rounded-xl bg-${sub.color}-500/20`}>
                                        <Rocket className={`text-${sub.color}-500 w-6 h-6`} />
                                    </div>
                                    <span className="font-bold text-slate-700 dark:text-white">{sub.label}</span>
                                </button>
                            ))}
                        </div>
                    </MotionDiv>
                )}

                {step === 2 && (
                    <MotionDiv
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <label htmlFor="topic-input" className="block text-sm font-bold text-slate-500 uppercase tracking-widest">
                                    General Topic
                                    <input 
                                        id="topic-input"
                                        type="text" 
                                        placeholder="e.g. Thermodynamics, Genetics, Quantum Entanglement"
                                        className="w-full mt-2 bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-amber-500/50"
                                        value={formData.topic}
                                        onChange={e => setFormData({...formData, topic: e.target.value})}
                                    />
                                </label>
                            </div>
                            <div className="space-y-4">
                                <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest">Complexity Level</label>
                                <div className="flex gap-2">
                                    {['Beginner', 'Intermediate', 'Advanced'].map(lvl => (
                                        <button
                                            key={lvl}
                                            onClick={() => setFormData({...formData, level: lvl})}
                                            className={`flex-1 py-3 rounded-xl border font-bold transition-all ${
                                                formData.level === lvl 
                                                ? 'bg-amber-500 border-amber-500 text-white' 
                                                : 'border-white/10 text-slate-400 hover:border-amber-500/30'
                                            }`}
                                        >
                                            {lvl}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between pt-8">
                            <button onClick={prevStep} className="px-6 py-3 rounded-xl hover:bg-white/5 text-slate-500 font-bold transition-all flex items-center gap-2">
                                <ChevronLeft size={20} /> Back
                            </button>
                            <button onClick={nextStep} disabled={!formData.topic} className="px-8 py-3 bg-amber-600 rounded-xl text-white font-bold transition-all flex items-center gap-2 hover:bg-amber-500 disabled:opacity-50">
                                Specifics <ChevronRight size={20} />
                            </button>
                        </div>
                    </MotionDiv>
                )}

                {step === 3 && (
                    <MotionDiv
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <label htmlFor="goal-input" className="flex items-center gap-2 text-sm font-bold text-slate-500 uppercase tracking-widest text-glow">
                                    <Target size={16} /> What is your primary goal?
                                </label>
                                <textarea 
                                    id="goal-input"
                                    placeholder="Describe what you want to achieve or discover..."
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-amber-500/50 h-32 resize-none"
                                    value={formData.goal}
                                    onChange={e => setFormData({...formData, goal: e.target.value})}
                                />
                            </div>
                            <div className="space-y-4">
                                <label htmlFor="hypothesis-input" className="flex items-center gap-2 text-sm font-bold text-slate-500 uppercase tracking-widest">
                                    <Sparkles size={16} /> Your Initial Hypothesis
                                </label>
                                <textarea 
                                    id="hypothesis-input"
                                    placeholder="I think that if I change X, then Y will happen because..."
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-amber-500/50 h-24 resize-none"
                                    value={formData.hypothesis}
                                    onChange={e => setFormData({...formData, hypothesis: e.target.value})}
                                />
                            </div>
                        </div>
                        <div className="flex justify-between pt-8">
                            <button onClick={prevStep} className="px-6 py-3 rounded-xl hover:bg-white/5 text-slate-500 font-bold transition-all flex items-center gap-2">
                                <ChevronLeft size={20} /> Back
                            </button>
                            <button 
                                onClick={handleGenerate} 
                                disabled={isGenerating || !formData.goal} 
                                className="px-10 py-4 bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl text-white font-bold transition-all flex items-center gap-3 hover:scale-105 shadow-lg shadow-amber-500/20"
                            >
                                {isGenerating ? (
                                    <>Architecting Lab... <div className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full"></div></>
                                ) : (
                                    <>Generate Blueprint <Sparkles size={20} className="text-yellow-300" /></>
                                )}
                            </button>
                        </div>
                    </MotionDiv>
                )}

                {step === 4 && result && (
                    <MotionDiv
                        key="step4"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-8"
                    >
                        <GlassCard color="amber" className="!p-8 border-amber-500/30 overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <BookOpen size={200} />
                            </div>
                            <div className="relative z-10 space-y-8">
                                <div className="border-b border-white/10 pb-6 flex justify-between items-start">
                                    <div>
                                        <h1 className="text-2xl font-display font-bold text-white mb-2">{result.title}</h1>
                                        <div className="flex gap-2">
                                            <span className="px-2 py-1 rounded-md bg-amber-500/20 text-amber-500 text-xs font-bold uppercase">{formData.subject}</span>
                                            <span className="px-2 py-1 rounded-md bg-white/10 text-slate-400 text-xs font-bold uppercase">{formData.level}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white transition-colors" title="Save Blueprint"><Save size={18}/></button>
                                        <button className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white transition-colors" title="Export PDF"><Download size={18}/></button>
                                        <button className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white transition-colors" title="Share"><Share2 size={18}/></button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                                    <div className="md:col-span-2 space-y-6">
                                        <section>
                                            <h4 className="text-amber-500 font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                                                <Target size={16}/> Aim & Objective
                                            </h4>
                                            <p className="text-slate-300 leading-relaxed font-light italic">"{result.aim}"</p>
                                        </section>
                                        
                                        <section>
                                            <h4 className="text-sky-500 font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                                                <ChevronRight size={18} className="text-sky-400"/> Step-by-Step Procedure
                                            </h4>
                                            <ul className="space-y-3">
                                                {result.procedure.map((p: string, i: number) => (
                                                    <li key={`${result.title}-step-${i}`} className="flex gap-3 text-slate-400">
                                                        <span className="text-sky-500 font-mono">0{i+1}.</span>
                                                        <p className="flex-1">{p}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        </section>
                                    </div>

                                    <div className="space-y-6">
                                        <section className="p-5 rounded-2xl bg-white/5 border border-white/5">
                                            <h4 className="text-emerald-500 font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                                                <Sparkles size={16}/> Virtual Apparatus
                                            </h4>
                                            <ul className="space-y-2">
                                                {result.apparatus.map((app: string, i: number) => (
                                                    <li key={`${result.title}-app-${i}`} className="text-slate-400 flex items-center gap-2">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                                        {app}
                                                    </li>
                                                ))}
                                            </ul>
                                        </section>

                                        <section className="p-5 rounded-2xl bg-red-500/10 border border-red-500/20">
                                            <h4 className="text-red-500 font-bold uppercase tracking-widest mb-2">Safety Protocols</h4>
                                            <p className="text-xs text-red-500/80 leading-relaxed">{result.safety}</p>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>

                        <div className="flex justify-center gap-4">
                            <button 
                                onClick={() => { setStep(1); setResult(null); }} 
                                className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all flex items-center gap-2"
                            >
                                <Trash2 size={18} /> Start New Draft
                            </button>
                            <button className="px-8 py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20">
                                Enter Simulation Sandbox
                            </button>
                        </div>
                    </MotionDiv>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProjectArchitect;
