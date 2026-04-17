import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GitCommit, ChevronRight, X, Briefcase, GraduationCap, Award, History, ArrowLeft } from 'lucide-react';
import { SectionHeader } from './ui/SectionHeader';
import { useIsMobile } from './ui/use-mobile';
import portfolioData from '../../data/config.json';

export const CareerLog = () => {
  const [selectedCommit, setSelectedCommit] = useState<any>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const timelineData = portfolioData.experience;

  const getIcon = (type: string) => {
    switch(type) {
      case 'work': return <Briefcase size={16} />;
      case 'role': return <Award size={16} />;
      case 'edu': return <GraduationCap size={16} />;
      default: return <GitCommit size={16} />;
    }
  };

  return (
    <section id="timeline" className="relative py-32 px-6 max-w-7xl mx-auto border-t overflow-hidden" style={{ borderColor: 'var(--border-color)' }}>
      <SectionHeader 
        icon={History} 
        sectionNum="05" 
        title="Career" 
        subtitle="CHRONOLOGICAL_LOG"
      />

      <div className="relative pl-12 md:pl-48 font-mono">
        <div className="absolute top-4 bottom-4 left-[19px] md:left-[171px] w-0.5 opacity-10 bg-white" />

        <div className="flex flex-col gap-12">
          {timelineData.map((item: any, index: number) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex items-center group cursor-pointer"
              onClick={() => setSelectedCommit(item)}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className={`hidden md:block absolute left-[-135px] text-[10px] font-bold tracking-widest uppercase transition-opacity duration-300 ${hoveredId === item.id ? 'opacity-100' : 'opacity-20'}`}
                   style={{ color: hoveredId === item.id ? item.color : 'var(--fg)' }}>
                {item.hash || 'COMMIT'}
              </div>

              <div className={`absolute left-[-32px] md:left-[-32px] w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-500 z-10 ${hoveredId === item.id ? 'scale-125' : 'border-white/10 bg-[var(--bg)]'}`}
                   style={{ 
                     borderColor: hoveredId === item.id ? item.color : 'rgba(255,255,255,0.1)',
                     backgroundColor: hoveredId === item.id ? `${item.color}11` : 'var(--bg)',
                     boxShadow: hoveredId === item.id ? `0 0 15px ${item.color}` : 'none'
                   }}>
                <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${hoveredId === item.id ? '' : 'bg-white/20'}`} 
                     style={{ backgroundColor: hoveredId === item.id ? item.color : 'rgba(128,128,128,0.3)' }} />
              </div>

              <div className="ml-8 md:ml-12 p-6 border transition-all duration-500 w-full max-w-[650px] relative overflow-hidden bg-white/[0.01] hover:bg-white/[0.04]" 
                   style={{ borderColor: hoveredId === item.id ? item.color : 'var(--border-color)' }}>
                
                {hoveredId === item.id && (
                   <motion.div 
                    layoutId="edge-light"
                    className="absolute inset-0 z-0 pointer-events-none"
                   >
                     <div className="absolute top-0 left-0 w-full h-[1px] opacity-50" style={{ backgroundImage: `linear-gradient(to right, transparent, ${item.color}, transparent)` }} />
                     <div className="absolute bottom-0 left-0 w-full h-[1px] opacity-50" style={{ backgroundImage: `linear-gradient(to right, transparent, ${item.color}, transparent)` }} />
                   </motion.div>
                )}

                <div className="relative z-10 flex justify-between items-center">
                  <div className="flex-1">
                    <div className={`flex items-center gap-2 text-[10px] mb-3 uppercase tracking-widest transition-colors duration-300 ${hoveredId === item.id ? '' : 'opacity-40'}`}
                         style={{ color: hoveredId === item.id ? item.color : 'var(--fg)' }}>
                      {getIcon(item.type)} <span>{item.date}</span>
                    </div>
                    <h4 className="text-xl font-heading font-extrabold uppercase tracking-tight transition-colors duration-300"
                        style={{ color: hoveredId === item.id ? 'var(--fg)' : 'var(--fg-muted)' }}>
                      {item.title}
                    </h4>
                    <div className="text-[10px] uppercase tracking-[0.3em] mt-2 opacity-30" style={{ color: 'var(--fg)' }}>@ {item.org}</div>
                  </div>
                  <ChevronRight size={24} className={`transition-all duration-300 ${hoveredId === item.id ? 'opacity-100 translate-x-2' : 'opacity-0'}`} style={{ color: item.color }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedCommit && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full md:w-[500px] border-l z-[60] p-0 shadow-2xl flex flex-col"
            style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border-color)' }}
          >
            <div className="p-6 border-b flex items-center justify-between bg-black/20" style={{ borderColor: 'var(--border-color)' }}>
               <button 
                onClick={() => setSelectedCommit(null)}
                className="flex items-center gap-2 text-[10px] font-mono tracking-widest hover:text-[var(--cyan)] transition-colors uppercase"
                style={{ color: 'var(--fg-muted)' }}
              >
                <ArrowLeft size={14} /> Close_Archive
              </button>
              <div className="font-mono text-[9px] opacity-30 tracking-[0.3em]">COMMIT_ID: {selectedCommit.hash || 'N/A'}</div>
            </div>

            <div className="flex-1 overflow-y-auto p-8 font-mono text-[var(--fg)]">
              <div className="mb-12">
                <div className="flex items-center gap-2 text-[10px] mb-4" style={{ color: selectedCommit.color }}>
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: selectedCommit.color }} />
                  COMMIT_MANIFEST_LOADED
                </div>
                <h2 className="text-4xl font-heading font-extrabold mb-4 uppercase tracking-tighter leading-none">
                  {selectedCommit.title}
                </h2>
                <div className="text-xl font-bold uppercase tracking-tight" style={{ color: selectedCommit.color }}>
                  @ {selectedCommit.org}
                </div>
                <div className="text-xs opacity-40 mt-2">{selectedCommit.date}</div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="text-[10px] opacity-30 uppercase tracking-[0.4em] mb-4">Description_Manifest</div>
                  <div className="p-6 border border-dashed text-sm leading-relaxed relative overflow-hidden" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
                    <div className="absolute top-0 right-0 p-2 opacity-5"><History size={40} /></div>
                    {selectedCommit.details}
                  </div>
                </div>

                {selectedCommit.stats && (
                  <div>
                    <div className="text-[10px] opacity-30 uppercase tracking-[0.4em] mb-4">Metric_Analysis</div>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(selectedCommit.stats).map(([key, val]) => (
                        <div key={key} className="p-4 border bg-white/5" style={{ borderColor: 'var(--border-color)' }}>
                          <div className="text-[8px] opacity-40 uppercase mb-1">{key}</div>
                          <div className="text-[10px] font-bold" style={{ color: selectedCommit.color }}>{val as string}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 border-t bg-black/20" style={{ borderColor: 'var(--border-color)' }}>
               <button 
                onClick={() => setSelectedCommit(null)}
                className="w-full py-4 border font-bold text-xs tracking-[0.3em] uppercase transition-all hover:bg-white/5 active:scale-[0.98]"
                style={{ borderColor: selectedCommit.color, color: selectedCommit.color }}
              >
                Return_to_Main_Frame
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {selectedCommit && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCommit(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55]"
          />
        )}
      </AnimatePresence>
    </section>
  );
};
