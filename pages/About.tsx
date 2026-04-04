import React from 'react';
import { Atom, Globe, ShieldCheck, Sparkles, Users, Zap, Award, BookOpen, Glasses, Rocket, Mic, Cpu } from 'lucide-react';
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

          {/* Roadmap */}
          <div className="relative mt-24">
             <div className="text-center mb-16">
                 <h2 className="text-4xl font-display font-bold text-white mb-4 italic uppercase tracking-tighter">Future Roadmap</h2>
                 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
                     <Rocket size={16} className="text-blue-400"/> 
                     <span className="text-blue-300 font-mono text-[10px] tracking-widest uppercase italic">Architected by Team SUPRA</span>
                 </div>
             </div>

             <div className="relative max-w-4xl mx-auto px-4">
                 <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500/40 via-transparent to-transparent rounded-full opacity-20"></div>

                 <div className="relative flex items-center justify-between mb-16 flex-col md:flex-row">
                     <div className="order-2 md:order-1 md:w-[45%] w-full pl-12 md:pl-0 md:pr-12 md:text-right">
                         <GlassCard className="p-8 relative border-t border-l border-white/10" color="blue">
                             <div className="flex items-center md:justify-end gap-4 mb-4">
                                 <h3 className="text-xl font-bold text-white italic">Immersive VR Labs</h3>
                                 <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400">
                                     <Glasses size={20} />
                                 </div>
                             </div>
                             <p className="text-gray-400 text-xs font-medium uppercase tracking-[0.2em] leading-relaxed">Full WebXR support for Quest 3 and Vision Pro. Virtual reality integration for atomic-scale physics precision.</p>
                         </GlassCard>
                     </div>
                     <div className="order-1 md:order-2 absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-blue-500 border-4 border-[#020617] z-10 shadow-[0_0_20px_rgba(59,130,246,0.5)]"></div>
                     <div className="order-3 md:w-[45%] w-full hidden md:block"></div>
                 </div>

                 <div className="relative flex items-center justify-between mb-16 flex-col md:flex-row">
                     <div className="order-3 md:order-1 md:w-[45%] w-full hidden md:block"></div>
                     <div className="order-1 md:order-2 absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-emerald-500 border-4 border-[#020617] z-10 shadow-[0_0_20px_rgba(16,185,129,0.5)]"></div>
                     <div className="order-2 md:order-3 md:w-[45%] w-full pl-12 md:pl-12">
                         <GlassCard className="p-8 relative border-t border-l border-white/10" color="emerald">
                             <div className="flex items-center gap-4 mb-4">
                                 <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400">
                                     <Zap size={20} />
                                 </div>
                                 <h3 className="text-xl font-bold text-white italic">Real-time Telemetry</h3>
                             </div>
                             <p className="text-gray-400 text-xs font-medium uppercase tracking-[0.2em] leading-relaxed">Live pedagogical data streaming for students to track precision and error margins in real-time, bridging digital/physical outcomes.</p>
                         </GlassCard>
                     </div>
                 </div>

                 <div className="relative flex items-center justify-between mb-16 flex-col md:flex-row">
                     <div className="order-2 md:order-1 md:w-[45%] w-full pl-12 md:pl-0 md:pr-12 md:text-right">
                         <GlassCard className="p-8 relative border-t border-l border-white/10" color="rose">
                             <div className="flex items-center md:justify-end gap-4 mb-4">
                                 <h3 className="text-xl font-bold text-white italic">Voice-AI Mentorship</h3>
                                 <div className="p-3 rounded-xl bg-rose-500/20 text-rose-400">
                                     <Mic size={20} />
                                 </div>
                             </div>
                             <p className="text-gray-400 text-xs font-medium uppercase tracking-[0.2em] leading-relaxed">Deep-learning voice assistant with regional language support (Hindi, Kannada, Tamil) for real-time safety and theory guidance.</p>
                         </GlassCard>
                     </div>
                     <div className="order-1 md:order-2 absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-rose-500 border-4 border-[#020617] z-10 shadow-[0_0_20px_rgba(244,63,94,0.5)]"></div>
                     <div className="order-3 md:w-[45%] w-full hidden md:block"></div>
                 </div>

                 <div className="relative flex items-center justify-between mb-16 flex-col md:flex-row">
                     <div className="order-3 md:order-1 md:w-[45%] w-full hidden md:block"></div>
                     <div className="order-1 md:order-2 absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-amber-500 border-4 border-[#020617] z-10 shadow-[0_0_20px_rgba(245,158,11,0.5)]"></div>
                     <div className="order-2 md:order-3 md:w-[45%] w-full pl-12 md:pl-12">
                         <GlassCard className="p-8 relative border-t border-l border-white/10" color="amber">
                             <div className="flex items-center gap-4 mb-4">
                                 <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400">
                                     <Users size={20} />
                                 </div>
                                 <h3 className="text-xl font-bold text-white italic">Collaborative Labs</h3>
                             </div>
                             <p className="text-gray-400 text-xs font-medium uppercase tracking-[0.2em] leading-relaxed">Multi-user lab instances allowing students across different geographies to collaborate on the same complex scientific apparatus.</p>
                         </GlassCard>
                     </div>
                 </div>

                 <div className="relative flex items-center justify-between mb-16 flex-col md:flex-row">
                     <div className="order-2 md:order-1 md:w-[45%] w-full pl-12 md:pl-0 md:pr-12 md:text-right">
                         <GlassCard className="p-8 relative border-t border-l border-white/10" color="indigo">
                             <div className="flex items-center md:justify-end gap-4 mb-4">
                                 <h3 className="text-xl font-bold text-white italic">Cloud-Ray Physics</h3>
                                 <div className="p-3 rounded-xl bg-indigo-500/20 text-indigo-400">
                                     <Cpu size={20} />
                                 </div>
                             </div>
                             <p className="text-gray-400 text-xs font-medium uppercase tracking-[0.2em] leading-relaxed">Server-side physics calculation cluster providing high-end raytraced visualizations for students on low-specification mobile devices.</p>
                         </GlassCard>
                     </div>
                     <div className="order-1 md:order-2 absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-indigo-500 border-4 border-[#020617] z-10 shadow-[0_0_20px_rgba(99,102,241,0.5)]"></div>
                     <div className="order-3 md:w-[45%] w-full hidden md:block"></div>
                 </div>
             </div>
          </div>
       </div>
    </div>
  );
};

export default About;
