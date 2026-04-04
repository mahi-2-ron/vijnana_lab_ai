
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, Clock, ChevronRight, Filter, Zap, BookMarked, Share2 } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { BLOG_POSTS, BlogPost } from '../data/blog_data';
import { motion } from 'framer-motion';

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Physics', 'Chemistry', 'Biology', 'Math', 'Computer Science'];

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-24 px-6 md:px-12 lg:px-20 min-h-screen pb-20 bg-slate-950">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            Learn <span className="text-blue-400">Beyond</span> Labs
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Not just experiments — we help students understand the theory behind them. 
            Simple explanations for high school and PU students.
          </p>
        </motion.div>
      </div>

      {/* Controls: Search & Filters */}
      <div className="max-w-6xl mx-auto mb-12 flex flex-col md:flex-row gap-6 items-center justify-between">
        
        {/* Search Bar */}
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search concepts, topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-blue-500/50 transition-all placeholder-gray-600"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                activeCategory === cat 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 ring-2 ring-blue-400/20' 
                : 'bg-white/5 text-gray-400 border border-white/10 hover:border-blue-500/50 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link to={`/blog/${post.id}`}>
                <GlassCard className="h-full group overflow-hidden flex flex-col hover:translate-y-[-5px] transition-all duration-300 border-white/5 hover:border-blue-500/30" color="blue">
                  {/* Category Badge */}
                  <div className="p-6 pb-0 flex justify-between items-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      post.category === 'Physics' ? 'bg-blue-500/20 text-blue-400' :
                      post.category === 'Chemistry' ? 'bg-emerald-500/20 text-emerald-400' :
                      post.category === 'Biology' ? 'bg-rose-500/20 text-rose-400' :
                      post.category === 'Math' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-purple-500/20 text-purple-400'
                    }`}>
                      {post.category}
                    </span>
                    <span className="text-[10px] text-gray-500 font-medium">
                      {post.type}
                    </span>
                  </div>

                  <div className="p-6 flex-1">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-6">
                      {post.description}
                    </p>
                  </div>

                  <div className="p-6 pt-0 mt-auto border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock size={14} />
                      <span>{post.readTime} read</span>
                    </div>
                    <div className="text-blue-400 font-bold text-xs flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read Article <ChevronRight size={14} />
                    </div>
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
            <BookOpen className="mx-auto text-gray-600 mb-4" size={48} />
            <h3 className="text-xl font-bold text-white mb-2">No articles found</h3>
            <p className="text-gray-500">Try adjusting your search or category filters.</p>
          </div>
        )}
      </div>

      {/* Newsletter / CTA */}
      <div className="max-w-5xl mx-auto mt-32">
        <GlassCard className="p-8 md:p-12 relative overflow-hidden" color="purple">
           <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Zap size={120} className="text-white" />
           </div>
           
           <div className="relative z-10 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-lg">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Want more concept guides?</h2>
                <p className="text-gray-400">Sign up for our weekly science digest. No fluff, just pure visual learning.</p>
              </div>
              <div className="flex w-full md:w-auto gap-3">
                 <input 
                   type="email" 
                   placeholder="Your email address" 
                   className="bg-black/20 border border-white/10 px-6 py-3 rounded-xl focus:outline-none focus:border-purple-500 flex-1 md:w-64 text-white" 
                 />
                 <button className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-purple-500/20">
                    Join
                 </button>
              </div>
           </div>
        </GlassCard>
      </div>

    </div>
  );
};

export default Blog;
