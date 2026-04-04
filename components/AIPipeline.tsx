
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, Brain, Cpu, FlaskConical, 
  Eye, SlidersHorizontal, BarChart3, ArrowDown
} from 'lucide-react';

const MotionDiv = motion.div as any;

const PIPELINE_STEPS = [
  {
    phase: "01",
    title: "Concept Input",
    desc: "The student types a scientific question in plain language. Our NLP interface accepts queries like \"What happens when light passes through a prism?\" or \"How does concentration affect reaction rates?\"",
    icon: Zap,
    color: "amber",
    bgClass: "bg-amber-500/10",
    textClass: "text-amber-500",
    borderClass: "border-amber-500/30",
    glowClass: "shadow-amber-500/20"
  },
  {
    phase: "02",
    title: "Semantic Analysis",
    desc: "Our AI engine parses the query to identify independent and dependent variables, relevant physical constants, scientific laws, and the domain (Physics, Chemistry, Biology).",
    icon: Brain,
    color: "indigo",
    bgClass: "bg-indigo-500/10",
    textClass: "text-indigo-500",
    borderClass: "border-indigo-500/30",
    glowClass: "shadow-indigo-500/20"
  },
  {
    phase: "03",
    title: "Experiment Generation",
    desc: "The system architects a structured experiment blueprint — defining the virtual apparatus, initialization parameters, step-by-step procedures, and safety constraints.",
    icon: Cpu,
    color: "emerald",
    bgClass: "bg-emerald-500/10",
    textClass: "text-emerald-500",
    borderClass: "border-emerald-500/30",
    glowClass: "shadow-emerald-500/20"
  },
  {
    phase: "04",
    title: "Simulation Engine",
    desc: "A headless physics or chemistry engine runs real-time calculations using differential equations, stoichiometric balances, or kinematic models to produce accurate outcomes.",
    icon: FlaskConical,
    color: "sky",
    bgClass: "bg-sky-500/10",
    textClass: "text-sky-500",
    borderClass: "border-sky-500/30",
    glowClass: "shadow-sky-500/20"
  },
  {
    phase: "05",
    title: "3D Visualization",
    desc: "Raw simulation data is transformed into interactive 3D models or smooth SVG-based animations — molecules rotating, waves propagating, circuits glowing.",
    icon: Eye,
    color: "violet",
    bgClass: "bg-violet-500/10",
    textClass: "text-violet-500",
    borderClass: "border-violet-500/30",
    glowClass: "shadow-violet-500/20"
  },
  {
    phase: "06",
    title: "User Interaction",
    desc: "Students manipulate variables through glass-morphic sliders and knobs — adjusting Force, Molarity, Temperature, or Voltage — triggering instant re-simulation and visual feedback.",
    icon: SlidersHorizontal,
    color: "rose",
    bgClass: "bg-rose-500/10",
    textClass: "text-rose-500",
    borderClass: "border-rose-500/30",
    glowClass: "shadow-rose-500/20"
  },
  {
    phase: "07",
    title: "Results & Explanation",
    desc: "The system visualizes outcomes through dynamic charts, generates an AI-written summary of what was discovered, and suggests follow-up experiments for deeper learning.",
    icon: BarChart3,
    color: "emerald",
    bgClass: "bg-emerald-500/10",
    textClass: "text-emerald-500",
    borderClass: "border-emerald-500/30",
    glowClass: "shadow-emerald-500/20"
  }
];

const AIPipeline: React.FC = () => {
    return (
        <div className="py-20 px-4">
            {/* Header */}
            <div className="text-center mb-20 space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4">
                    <Cpu size={14} /> System Architecture
                </div>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white text-glow leading-tight">
                    How the Lab Generation<br/>Pipeline Works
                </h2>
                <p className="text-slate-400 max-w-xl mx-auto font-light leading-relaxed">
                    From a student's curiosity to a fully functional virtual simulation — in seven intelligent stages.
                </p>
            </div>

            {/* Timeline Layout */}
            <div className="max-w-4xl mx-auto relative">
                {/* Central Vertical Line */}
                <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-amber-500/50 via-indigo-500/50 to-emerald-500/50 md:-translate-x-px"></div>

                {PIPELINE_STEPS.map((step, index) => {
                    const isLeft = index % 2 === 0;
                    return (
                        <MotionDiv
                            key={step.phase}
                            initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1, duration: 0.5 }}
                            viewport={{ once: true, margin: "-50px" }}
                            className={`relative flex items-start gap-6 mb-12 md:mb-16 ${
                                isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                            } flex-row`}
                        >
                            {/* Phase Number Dot */}
                            <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                                <div className={`w-12 h-12 rounded-full ${step.bgClass} border-2 ${step.borderClass} flex items-center justify-center shadow-lg ${step.glowClass} backdrop-blur-md`}>
                                    <step.icon className={`${step.textClass} w-5 h-5`} />
                                </div>
                            </div>

                            {/* Content Card */}
                            <div className={`ml-20 md:ml-0 md:w-[calc(50%-40px)] ${isLeft ? 'md:pr-4 md:text-right' : 'md:pl-4 md:text-left'}`}>
                                <div className={`glass-panel rounded-2xl p-6 border ${step.borderClass} hover:shadow-lg ${step.glowClass} transition-all duration-300 group`}>
                                    <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                                        <span className={`text-xs font-mono font-bold ${step.textClass} opacity-60`}>PHASE {step.phase}</span>
                                        <h3 className="text-lg font-bold text-white tracking-tight">{step.title}</h3>
                                    </div>
                                    <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                                </div>
                            </div>

                            {/* Spacer for the other side */}
                            <div className="hidden md:block md:w-[calc(50%-40px)]"></div>
                        </MotionDiv>
                    );
                })}

                {/* Final Node */}
                <div className="relative flex items-center justify-center">
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                        <MotionDiv 
                            animate={{ scale: [1, 1.2, 1] }} 
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-600 to-emerald-600 flex items-center justify-center shadow-xl shadow-indigo-500/30"
                        >
                            <Zap className="text-white w-7 h-7" />
                        </MotionDiv>
                    </div>
                    <div className="ml-20 md:ml-0 md:w-full md:text-center md:pt-2">
                        <p className="text-lg font-bold text-white md:ml-20">Experiment Ready ✨</p>
                        <p className="text-xs text-slate-500 md:ml-20">The student can now interact with a fully generated virtual lab.</p>
                    </div>
                </div>
            </div>

            {/* Bottom Gradient Line */}
            <div className="w-full max-w-4xl mx-auto h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mt-16"></div>
        </div>
    );
};

export default AIPipeline;
