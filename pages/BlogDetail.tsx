
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, User, Share2, Bookmark, Play, ChevronRight, Zap, Target, BookOpen, Quote, Sparkles } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { BLOG_POSTS, BlogPost } from '../data/blog_data';
import { motion } from 'framer-motion';

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const foundPost = BLOG_POSTS.find(p => p.id === id);
    if (foundPost) {
      setPost(foundPost);
    } else {
      navigate('/blog');
    }
    window.scrollTo(0, 0);
  }, [id, navigate]);

  if (!post) return null;

  return (
    <div className="pt-24 px-6 md:px-12 lg:px-20 min-h-screen pb-32 bg-[#020617]">
      
      {/* Back & Actions */}
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-12">
        <Link to="/blog" className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors group">
          <div className="p-2 rounded-full group-hover:bg-white/5 bg-transparent border border-transparent group-hover:border-white/10 transition-all">
            <ArrowLeft size={18} />
          </div>
          <span className="text-sm font-medium">Back to Articles</span>
        </Link>
        <div className="flex gap-4">
           <button className="p-2 rounded-full border border-white/5 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all">
              <Share2 size={18} />
           </button>
           <button className="p-2 rounded-full border border-white/5 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all">
              <Bookmark size={18} />
           </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
        >
          {/* Category Badge & Meta */}
          <div className="flex items-center gap-4 mb-8">
            <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
               post.category === 'Physics' ? 'bg-blue-500/10 text-blue-400' :
               post.category === 'Chemistry' ? 'bg-emerald-500/10 text-emerald-400' :
               post.category === 'Biology' ? 'bg-rose-500/10 text-rose-400' :
               post.category === 'Math' ? 'bg-amber-500/10 text-amber-400' :
               'bg-purple-500/10 text-purple-400'
            }`}>
              {post.category}
            </span>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <div className="flex items-center gap-1"><Clock size={14} /> {post.readTime} read</div>
              <div className="w-1.5 h-1.5 rounded-full bg-white/10"></div>
              <div className="flex items-center gap-1 truncate"><User size={14} /> {post.author}</div>
              <div className="w-1.5 h-1.5 rounded-full bg-white/10 hidden md:block"></div>
              <div className="md:flex items-center gap-1 hidden md:block"><Calendar size={14} /> {post.date}</div>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-10 leading-tight">
            {post.title}
          </h1>

          <div className="p-6 md:p-10 bg-white/5 rounded-3xl border border-white/10 mb-16 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                <Quote size={80} className="text-white" />
             </div>
             <p className="text-xl md:text-2xl italic text-gray-300 relative z-10 leading-relaxed font-medium">
               "{post.description}"
             </p>
          </div>

          {/* Article Content */}
          <div className="prose prose-invert prose-blue max-w-none mb-20">
             {post.content.split('\n\n').map((para, i) => {
                // Support multi-color highlighting tags: [[B:blue]], [[G:green]], [[Y:yellow]], [[R:red]]
                let html = para.trim()
                  .replace(/\[\[B:(.*?)\]\]/g, '<strong class="text-blue-400 bg-blue-400/10 px-1.5 py-0.5 rounded border border-blue-400/20">$1</strong>')
                  .replace(/\[\[G:(.*?)\]\]/g, '<strong class="text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded border border-emerald-400/20">$1</strong>')
                  .replace(/\[\[Y:(.*?)\]\]/g, '<strong class="text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">$1</strong>')
                  .replace(/\[\[R:(.*?)\]\]/g, '<strong class="text-rose-400 bg-rose-400/10 px-1.5 py-0.5 rounded border border-rose-400/20">$1</strong>')
                  .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white bg-white/10 px-1.5 py-0.5 rounded border border-white/10">$1</strong>');
                
                return (
                  <p 
                    key={i} 
                    className="text-gray-400 text-lg md:text-xl leading-relaxed mb-8"
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                );
             })}
          </div>

          {/* Connection to Lab (THE PRODUCT LINK) */}
          <GlassCard className="p-10 relative overflow-hidden group border-white/10 hover:border-blue-500/30 transition-all duration-500" color="blue">
             {/* Glowing gradient background */}
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
             
             <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="flex-1 text-center md:text-left">
                   <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30 group-hover:rotate-12 transition-transform duration-500">
                         <Play size={24} className="text-blue-400" fill="currentColor" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">Theory meet practice</h3>
                   </div>
                   <p className="text-gray-400 text-lg mb-6 max-w-md">
                      Apply what you've just learned about <span className="text-white font-bold">{post.category}</span>. Our virtual labs allow you to experiment safely and visualize any concept.
                   </p>
                   <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm font-medium">
                      <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400">
                         <Target size={14} className="text-blue-400" /> Interactive Simulation
                      </span>
                      <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400">
                         <Sparkles size={14} className="text-blue-400" /> AI Feedback
                      </span>
                   </div>
                </div>

                <div className="w-full md:w-auto">
                   <Link 
                     to={post.relatedLabId ? `/subjects/${post.relatedSubjectId}/${post.relatedLabId}` : `/subjects/${post.relatedSubjectId}`}
                     className="block w-full text-center"
                   >
                     <button className="w-full md:w-64 bg-blue-600 hover:bg-blue-500 text-white font-bold py-5 rounded-3xl transition-all shadow-xl shadow-blue-500/30 hover:scale-[1.05] active:scale-[0.98] flex items-center justify-center gap-3 text-lg">
                        Try Simulation <ChevronRight size={20} />
                     </button>
                   </Link>
                </div>
             </div>
          </GlassCard>

          {/* AI Helper Integration (Internal loop) */}
          <div className="mt-20 p-8 rounded-3xl bg-white/[0.02] border border-dashed border-white/10 text-center">
             <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/20">
                <Zap size={28} className="text-white" />
             </div>
             <h4 className="text-xl font-bold text-white mb-2">Confused by this concept?</h4>
             <p className="text-gray-500 mb-8 max-w-sm mx-auto font-medium">
                Our AI Tutor is experts in {post.category} and can explain this to you in simpler terms.
             </p>
             <button 
               onClick={() => {
                 // Trigger AI Tutor open logic could go here
                 const tutorBtn = document.getElementById('ai-tutor-trigger');
                 if (tutorBtn) tutorBtn.click();
               }}
               className="text-white font-bold border border-white/10 hover:border-white/30 px-10 py-4 rounded-2xl hover:bg-white/5 transition-all text-sm uppercase tracking-widest"
             >
                Ask Vijnana AI
             </button>
          </div>

        </motion.div>
      </div>

    </div>
  );
};

export default BlogDetail;
