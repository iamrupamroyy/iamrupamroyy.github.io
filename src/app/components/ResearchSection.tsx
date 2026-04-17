import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen, Clock } from 'lucide-react';

const articles = [
  {
    id: 1,
    title: "TIL: The limits of edge attention in small graphs",
    snippet: "Why adding self-attention layers to small molecular graphs often results in over-smoothing and performance degradation.",
    date: "12 Apr, 2026",
    content: "Detailed analysis on edge attention constraints. We observed that after 3 layers, node representations become indistinguishable. The solution? Jumping knowledge networks and selective edge dropping. Here's a deep dive into the math and PyTorch implementation."
  },
  {
    id: 2,
    title: "Optimizing CUDA kernels for Message Passing",
    snippet: "A breakdown of memory coalescing techniques when writing custom message passing kernels.",
    date: "05 Mar, 2026",
    content: "When writing custom CUDA kernels for GNNs, memory access patterns dominate the execution time. By sorting node indices by their degree, we achieved a 1.4x speedup on NVIDIA A100s. Code snippets included."
  },
  {
    id: 3,
    title: "Scaling embeddings with FAISS and Milvus",
    snippet: "Architecture decisions when moving from 1M to 100M dense vectors.",
    date: "18 Jan, 2026",
    content: "A look into HNSW indexes, IVF-SQ8 quantization, and how we balanced recall latency vs accuracy. Spoiler: pure HNSW is too memory intensive at 100M scale."
  },
  {
    id: 4,
    title: "Understanding Graph Isomorphism Networks",
    snippet: "Why GINs are strictly more expressive than standard Graph Convolutional Networks.",
    date: "22 Nov, 2025",
    content: "GCNs fail to distinguish certain regular graphs. GINs, using injective neighborhood aggregation functions (like MLPs with an epsilon parameter), provably match the Weisfeiler-Lehman test power."
  }
];

export const ResearchSection = () => {
  const [selectedArticle, setSelectedArticle] = useState<any>(null);

  return (
    <section id="research" className="relative py-32 px-6 max-w-6xl mx-auto">
      <div className="mb-20">
        <h2 className="text-sm font-mono text-[#00FFFF] tracking-widest uppercase mb-2">05. Journal</h2>
        <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tighter" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Research Garden.
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {articles.map((article, i) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            onClick={() => setSelectedArticle(article)}
            className="group relative bg-white/5 border border-white/10 p-6 flex flex-col gap-4 cursor-pointer hover:bg-white/10 transition-colors h-[280px]"
          >
            {/* Polaroid top pin effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#BB86FC] opacity-50 shadow-[0_0_10px_#BB86FC]" />
            
            <div className="flex items-center gap-2 text-[#00FFFF] text-xs font-mono">
              <Clock size={14} />
              {article.date}
            </div>
            
            <h4 className="text-xl font-bold text-white group-hover:text-[#BB86FC] transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {article.title}
            </h4>
            
            <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
              {article.snippet}
            </p>

            <div className="mt-auto flex items-center justify-between text-[#00FFFF] opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs font-bold uppercase tracking-widest font-mono">Read Log</span>
              <BookOpen size={16} />
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0E17]/90 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0A0E17] border border-white/20 p-8 md:p-12 shadow-2xl shadow-purple-500/10 overflow-y-auto max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedArticle(null)}
                className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <X size={24} />
              </button>
              
              <div className="flex items-center gap-2 text-[#00FFFF] text-sm font-mono mb-6">
                <Clock size={16} />
                {selectedArticle.date}
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {selectedArticle.title}
              </h2>
              
              <div className="w-full h-px bg-white/10 mb-8" />
              
              <p className="text-gray-300 text-lg leading-relaxed font-light">
                {selectedArticle.content}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
