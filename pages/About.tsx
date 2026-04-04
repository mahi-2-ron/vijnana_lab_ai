
import React from 'react';
import { Atom, Globe, ShieldCheck, Sparkles, Users, Zap, Award, BookOpen, Glasses, Mic, WifiOff, Rocket, Cpu, BrainCircuit } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const About: React.FC = () => {
  return (
    <div className="pt-24 px-6 md:px-12 lg:px-32 min-h-screen pb-12">
       
       {/* Header */}
       <div className="text-center mb-16">
           <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">About Vijnana Lab</h1>
           <p className="text-gray-400 text-lg max-w-2xl mx-auto">
             Bridging the gap between theoretical knowledge and practical application through immersive digital experiences.
           </p>
       </div>
       
       <div className="space-y-16 max-w-6xl mx-auto">
         
         {/* Mission Section */}
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <div className="inline-block p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                    <Atom className="text-blue-400 w-8 h-8" />
                </div>
                <h2 className="text-3xl font-display font-bold text-white">Our Mission</h2>
                <p className="text-gray-300 leading-relaxed text-lg">
                    Vijnana Lab aims to democratize practical education. We believe that every student, regardless of their access to physical infrastructure, deserves to experience the wonder of scientific discovery. By leveraging advanced web technologies and AI, we bring the laboratory to your fingertips.
                </p>
                <p className="text-gray-400 leading-relaxed">
                    We are building a future where high-quality science education is accessible, safe, and engaging for everyone, everywhere.
                </p>
            </div>
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 blur-3xl rounded-full"></div>
                <GlassCard className="relative p-8 md:p-10 border-t border-l border-white/10" color="blue">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 p-4 rounded-xl text-center">
                            <div className="text-3xl font-bold text-white mb-1">10k+</div>
                            <div className="text-xs text-gray-400">Active Students</div>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl text-center">
                            <div className="text-3xl font-bold text-blue-400 mb-1">50+</div>
                            <div className="text-xs text-gray-400">Simulations</div>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl text-center">
                            <div className="text-3xl font-bold text-purple-400 mb-1">24/7</div>
                            <div className="text-xs text-gray-400">AI Support</div>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl text-center">
                            <div className="text-3xl font-bold text-green-400 mb-1">100%</div>
                            <div className="text-xs text-gray-400">Free Access</div>
                        </div>
                    </div>
                </GlassCard>
            </div>
         </div>

         {/* Features Grid */}
         <div>
             <h2 className="text-3xl font-display font-bold text-white mb-12 text-center">Why Choose Vijnana Lab?</h2>
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <GlassCard color="green" className="p-8">
                    <Zap className="text-green-400 w-10 h-10 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-3">Interactive Simulations</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Gone are the days of rote memorization. Manipulate variables, observe outcomes in real-time, and visualize abstract concepts like never before.
                    </p>
                </GlassCard>
                
                <GlassCard color="purple" className="p-8">
                    <Sparkles className="text-purple-400 w-10 h-10 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-3">AI-Powered Guidance</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Our Vijnana Lab AI tutor provides instant feedback, safety tips, and theoretical explanations, acting as your personal lab assistant.
                    </p>
                </GlassCard>

                <GlassCard color="blue" className="p-8">
                    <ShieldCheck className="text-blue-400 w-10 h-10 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-3">Safe Environment</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Perform dangerous chemical reactions and complex physics experiments without the risk of burns, breakage, or exposure to hazardous materials.
                    </p>
                </GlassCard>

                <GlassCard color="amber" className="p-8">
                    <Globe className="text-amber-400 w-10 h-10 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-3">Multi-Language Support</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Learning science shouldn't be limited by language. Switch seamlessly between English, Hindi, and Kannada to learn in your preferred medium.
                    </p>
                </GlassCard>

                <GlassCard color="red" className="p-8">
                    <Award className="text-red-400 w-10 h-10 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-3">Progress Tracking</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Earn certificates, track your completion rates across subjects, and identify areas for improvement with our detailed dashboard.
                    </p>
                </GlassCard>

                <GlassCard color="cyan" className="p-8">
                    <BookOpen className="text-cyan-400 w-10 h-10 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-3">Curriculum Aligned</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Our labs are designed to align with standard Pre-University and High School curriculums (CBSE/State Boards) to directly support your academic goals.
                    </p>
                </GlassCard>
             </div>
         </div>

         {/* Vision Section */}
         <GlassCard className="p-10 text-center relative overflow-hidden" color="indigo">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10"></div>
            <div className="relative z-10 max-w-3xl mx-auto">
                <Users className="text-indigo-400 w-12 h-12 mx-auto mb-6" />
                <h2 className="text-3xl font-display font-bold text-white mb-6">Our Vision</h2>
                <p className="text-lg text-gray-300 leading-relaxed mb-8">
                    We envision a world where quality STEM education is not a privilege but a fundamental right. By removing physical barriers to entry, we hope to inspire the next generation of scientists, engineers, and innovators who will solve the world's biggest challenges.
                </p>
                <div className="flex justify-center gap-4">
                    <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">🚀 Innovation First</span>
                    <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">🎓 Student Centric</span>
                    <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">🌍 Global Access</span>
                </div>
            </div>
         </GlassCard>

         {/* Future Implementation / Roadmap */}
         <div className="relative mt-20">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                    Future Roadmap
                </h2>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20">
                    <Rocket size={16} className="text-purple-400"/> 
                    <span className="text-purple-300 font-mono text-xs tracking-widest uppercase">Architected by Team SUPRA</span>
                </div>
            </div>

            {/* Timeline Container */}
            <div className="relative max-w-4xl mx-auto px-4">
                {/* Vertical Line */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-transparent opacity-30 rounded-full"></div>

                {/* Item 1: VR */}
                <div className="relative flex items-center justify-between mb-16 flex-col md:flex-row">
                    {/* Left Content (Desktop) */}
                    <div className="order-2 md:order-1 md:w-[45%] w-full pl-12 md:pl-0 md:pr-12 md:text-right">
                        <GlassCard className="p-6 relative group hover:bg-white/5 transition-colors" color="indigo">
                            <div className="absolute top-1/2 -right-3 w-6 h-6 bg-indigo-900/50 rotate-45 transform -translate-y-1/2 border-r border-t border-indigo-500/30 hidden md:block backdrop-blur-xl"></div>
                            <div className="flex items-center md:justify-end gap-4 mb-3">
                                <h3 className="text-xl font-bold text-white">Immersive VR Labs</h3>
                                <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400 shrink-0">
                                    <Glasses size={20} />
                                </div>
                            </div>
                            <p className="text-gray-400 text-sm">Full WebXR support to conduct experiments in a fully immersive 3D environment using VR headsets like Quest 3 and Vision Pro.</p>
                        </GlassCard>
                    </div>
                    
                    {/* Center Node */}
                    <div className="order-1 md:order-2 absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-indigo-500 border-4 border-slate-900 z-10 shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>

                    {/* Right Spacer (Desktop) */}
                    <div className="order-3 md:w-[45%] w-full hidden md:block"></div>
                </div>

                {/* Item 2: Multiplayer (Right Side) */}
                <div className="relative flex items-center justify-between mb-16 flex-col md:flex-row">
                    <div className="order-3 md:order-1 md:w-[45%] w-full hidden md:block"></div>
                    
                    <div className="order-1 md:order-2 absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-pink-500 border-4 border-slate-900 z-10 shadow-[0_0_15px_rgba(236,72,153,0.5)]"></div>

                    <div className="order-2 md:order-3 md:w-[45%] w-full pl-12 md:pl-12">
                        <GlassCard className="p-6 relative group hover:bg-white/5 transition-colors" color="pink">
                            <div className="absolute top-1/2 -left-3 w-6 h-6 bg-pink-900/50 rotate-45 transform -translate-y-1/2 border-l border-b border-pink-500/30 hidden md:block backdrop-blur-xl"></div>
                            <div className="flex items-center gap-4 mb-3">
                                <div className="p-2 rounded-lg bg-pink-500/20 text-pink-400 shrink-0">
                                    <Users size={20} />
                                </div>
                                <h3 className="text-xl font-bold text-white">Multiplayer Labs</h3>
                            </div>
                            <p className="text-gray-400 text-sm">Real-time synchronization allowing students to work on the same virtual apparatus simultaneously from different locations.</p>
                        </GlassCard>
                    </div>
                </div>

                {/* Item 3: Voice AI (Left Side) */}
                <div className="relative flex items-center justify-between mb-16 flex-col md:flex-row">
                    <div className="order-2 md:order-1 md:w-[45%] w-full pl-12 md:pl-0 md:pr-12 md:text-right">
                        <GlassCard className="p-6 relative group hover:bg-white/5 transition-colors" color="cyan">
                            <div className="absolute top-1/2 -right-3 w-6 h-6 bg-cyan-900/50 rotate-45 transform -translate-y-1/2 border-r border-t border-cyan-500/30 hidden md:block backdrop-blur-xl"></div>
                            <div className="flex items-center md:justify-end gap-4 mb-3">
                                <h3 className="text-xl font-bold text-white">Supra Voice Assistant</h3>
                                <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 shrink-0">
                                    <Mic size={20} />
                                </div>
                            </div>
                            <p className="text-gray-400 text-sm">Hands-free lab operation powered by Team SUPRA's NLP engine. "Hey Vijnana, add 10ml HCL" or "Record observation".</p>
                        </GlassCard>
                    </div>
                    
                    <div className="order-1 md:order-2 absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-cyan-500 border-4 border-slate-900 z-10 shadow-[0_0_15px_rgba(6,182,212,0.5)]"></div>

                    <div className="order-3 md:w-[45%] w-full hidden md:block"></div>
                </div>

                {/* Item 4: Offline Mode (Right Side) */}
                <div className="relative flex items-center justify-between mb-16 flex-col md:flex-row">
                    <div className="order-3 md:order-1 md:w-[45%] w-full hidden md:block"></div>
                    
                    <div className="order-1 md:order-2 absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-amber-500 border-4 border-slate-900 z-10 shadow-[0_0_15px_rgba(245,158,11,0.5)]"></div>

                    <div className="order-2 md:order-3 md:w-[45%] w-full pl-12 md:pl-12">
                        <GlassCard className="p-6 relative group hover:bg-white/5 transition-colors" color="amber">
                            <div className="absolute top-1/2 -left-3 w-6 h-6 bg-amber-900/50 rotate-45 transform -translate-y-1/2 border-l border-b border-amber-500/30 hidden md:block backdrop-blur-xl"></div>
                            <div className="flex items-center gap-4 mb-3">
                                <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 shrink-0">
                                    <WifiOff size={20} />
                                </div>
                                <h3 className="text-xl font-bold text-white">Offline Access</h3>
                            </div>
                            <p className="text-gray-400 text-sm">PWA capability with local caching allowing complete lab access in remote areas without active internet connection.</p>
                        </GlassCard>
                    </div>
                </div>

                {/* Item 5: Business Plan / Brand Integration (Left Side) */}
                <div className="relative flex items-center justify-between mb-12 flex-col md:flex-row">
                    <div className="order-2 md:order-1 md:w-[45%] w-full pl-12 md:pl-0 md:pr-12 md:text-right">
                        <GlassCard className="p-6 relative group hover:bg-white/5 transition-colors" color="emerald">
                            <div className="absolute top-1/2 -right-3 w-6 h-6 bg-emerald-900/50 rotate-45 transform -translate-y-1/2 border-r border-t border-emerald-500/30 hidden md:block backdrop-blur-xl"></div>
                            <div className="flex items-center md:justify-end gap-4 mb-3">
                                <h3 className="text-xl font-bold text-white">B2B Monetization & Ads</h3>
                                <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0">
                                    <Rocket size={20} />
                                </div>
                            </div>
                            <p className="text-gray-400 text-sm">A strategic, non-intrusive revenue model. We will implement high-quality 3D product placement where educational sponsors can feature their brand logo and name directly on laboratory equipment. This provides targeted visibility for advertisers while ensuring the core product remains 100% free for students.</p>
                        </GlassCard>
                    </div>
                    
                    <div className="order-1 md:order-2 absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-emerald-500 border-4 border-slate-900 z-10 shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>

                    <div className="order-3 md:w-[45%] w-full hidden md:block"></div>
                </div>

            </div>
         </div>

       </div>
    </div>
  );
};

export default About;
