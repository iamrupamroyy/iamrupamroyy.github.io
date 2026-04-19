import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Database, ExternalLink, Github, Eye, Terminal, Layers, Star, Clock } from 'lucide-react';
import { SectionHeader } from './ui/SectionHeader';
import portfolioData from '../../data/config.json';

export const ProjectVault = () => {
  // Respect original data order and casing
  const projects = portfolioData.projects;
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <section id="projects" className="relative py-20 md:py-32 border-t overflow-hidden" style={{ borderColor: 'var(--border-color)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader 
          icon={Database} 
          sectionNum="03" 
          title="Vault" 
          subtitle="ARTIFACT_COLLECTION"
        />

        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-stretch lg:h-[650px]">
          
          {/* Project Navigation List */}
          <div className="w-full lg:w-72 flex flex-col border flex-shrink-0 bg-black/20" style={{ borderColor: 'var(--border-color)' }}>
            <div className="p-3 border-b bg-black/40 font-mono text-[9px] tracking-widest flex items-center justify-between" style={{ borderColor: 'var(--border-color)' }}>
              <span className="opacity-50">INDEX_MANIFEST</span>
              <span style={{ color: 'var(--cyan)' }}>[{projects.length}]</span>
            </div>
            
            <div className="flex lg:flex-col overflow-x-auto lg:overflow-y-auto flex-nowrap hide-scrollbar p-2 gap-2 max-w-full lg:h-full">
              {projects.map((project, idx) => (
                <button
                  key={project.id}
                  onClick={() => setSelectedIndex(idx)}
                  className={`relative p-3 md:p-4 text-left border transition-all duration-300 group flex-shrink-0 w-32 sm:w-40 lg:w-full ${selectedIndex === idx ? 'bg-[var(--card-bg)] shadow-[inset_0_0_20px_rgba(0,0,0,0.4)]' : 'border-transparent hover:bg-white/5'}`}
                  style={{ borderColor: selectedIndex === idx ? project.color : 'transparent' }}
                >
                  <div className="relative z-10 flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                       <span className="font-mono text-[7px] opacity-30" style={{ color: 'var(--fg)' }}>#{String(idx + 1).padStart(2, '0')}</span>
                       {project.featured && <Star size={8} style={{ color: project.color }} className="fill-current animate-pulse" />}
                    </div>
                    {/* Casing preserved: Removed 'uppercase' class */}
                    <h4 
                      className="text-[10px] md:text-xs font-heading font-bold tracking-wider truncate"
                      style={{ color: selectedIndex === idx ? 'var(--fg)' : 'gray' }}
                    >
                      {project.title}
                    </h4>
                    <span className="font-mono text-[6px] opacity-20 uppercase tracking-widest truncate">{project.date?.split('-')[0]}</span>
                  </div>
                  {selectedIndex === idx && (
                    <motion.div layoutId="vault-active" className="absolute left-0 top-0 bottom-0 w-0.5 bg-current" style={{ color: project.color }} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Detailed View */}
          <div className="flex-1 border flex flex-col bg-[var(--card-bg)] min-w-0 lg:h-full" style={{ borderColor: 'var(--border-color)' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col w-full h-full"
              >
                {/* Visual Header */}
                <div className="relative aspect-video sm:aspect-[21/9] lg:aspect-auto lg:h-64 w-full overflow-hidden border-b flex-shrink-0" style={{ borderColor: 'var(--border-color)' }}>
                  <img 
                    src={projects[selectedIndex].image} 
                    className="w-full h-full object-cover opacity-40 grayscale" 
                    alt={projects[selectedIndex].title} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent opacity-90" />
                  
                  <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-between pointer-events-none">
                    <div className="flex justify-between font-mono text-[7px] md:text-[9px] tracking-[0.2em] opacity-30" style={{ color: 'var(--fg)' }}>
                      <div className="flex items-center gap-2"><Terminal size={10} /> SYS_DATA_READY</div>
                      <span>ENCRYPT_STABLE</span>
                    </div>
                    
                    <div className="flex items-end justify-between">
                       <div className="flex flex-col gap-2">
                          <div className="h-[1px] w-24 md:w-40 bg-white/10 relative overflow-hidden">
                             <motion.div 
                              initial={{ x: '-100%' }}
                              animate={{ x: '100%' }}
                              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                              className="absolute inset-0 w-1/3"
                              style={{ backgroundColor: projects[selectedIndex].color }}
                             />
                          </div>
                          <span className="font-mono text-[6px] md:text-[8px] tracking-widest opacity-30 uppercase">Build_Date: {projects[selectedIndex].date}</span>
                       </div>
                       <div className="text-[var(--cyan)] font-mono text-xl md:text-3xl font-black opacity-10">0{selectedIndex + 1}</div>
                    </div>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-4 sm:p-6 md:p-10 flex flex-col gap-6 md:gap-8 overflow-y-auto hide-scrollbar flex-1">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {projects[selectedIndex].featured && (
                           <span className="px-3 py-1 border font-mono text-[8px] md:text-[9px] tracking-[0.3em] bg-white/10 flex items-center gap-2" style={{ color: projects[selectedIndex].color, borderColor: projects[selectedIndex].color }}>
                              <Star size={10} className="fill-current" /> CORE_ARTIFACT
                           </span>
                        )}
                        <span className="px-3 py-1 border font-mono text-[8px] md:text-[9px] tracking-[0.2em] bg-white/5 uppercase" 
                              style={{ 
                                color: projects[selectedIndex].status === 'ACTIVE' ? 'var(--green)' : 
                                       projects[selectedIndex].status === 'DEPLOYED' ? 'var(--cyan)' : 
                                       projects[selectedIndex].status === 'COMPLETED' ? '#FFB86C' : 'var(--fg-muted)', 
                                borderColor: projects[selectedIndex].status === 'ACTIVE' ? 'var(--green-dim)' : 
                                             projects[selectedIndex].status === 'DEPLOYED' ? 'var(--cyan-dim)' : 
                                             projects[selectedIndex].status === 'COMPLETED' ? 'rgba(255, 184, 108, 0.2)' : 'var(--border-color)' 
                              }}>
                          {projects[selectedIndex].status}
                        </span>
                        <span className="px-3 py-1 border font-mono text-[8px] md:text-[9px] tracking-[0.2em] bg-[var(--cyan-dim)] uppercase" style={{ color: 'var(--cyan)', borderColor: 'var(--cyan)' }}>
                          {projects[selectedIndex].type}
                        </span>
                        {projects[selectedIndex].tech.map(t => (
                          <span key={t} className="text-[7px] md:text-[9px] font-mono border px-2 py-0.5 opacity-40 uppercase tracking-tighter" style={{ borderColor: 'var(--border-color)', color: 'var(--fg)' }}>
                            {t}
                          </span>
                        ))}
                      </div>
                      
                      {/* Casing preserved: Removed 'uppercase' class */}
                      <h4 className="text-xl sm:text-3xl lg:text-4xl font-heading font-black mb-4 tracking-tighter" style={{ color: 'var(--fg)' }}>
                        {projects[selectedIndex].title}
                      </h4>
                      
                      <p className="font-mono text-xs sm:text-sm leading-relaxed opacity-70 border-l-2 pl-4 md:pl-8 py-1 max-w-full" style={{ borderColor: projects[selectedIndex].color, color: 'var(--fg)' }}>
                        {projects[selectedIndex].description}
                      </p>
                    </div>
                    
                    {/* Responsive Actions */}
                    <div className="flex flex-col gap-2 w-full md:w-52 flex-shrink-0">
                      {projects[selectedIndex].github && (
                        <a href={projects[selectedIndex].github} target="_blank" rel="noreferrer" className="flex items-center justify-between px-4 py-3 border font-mono text-[8px] md:text-[10px] uppercase tracking-widest hover:bg-white/5 transition-all group" style={{ borderColor: 'var(--border-color)', color: 'var(--fg)' }}>
                          <Github size={14} /> 
                          <span>Source_File</span>
                          <ExternalLink size={10} className="opacity-20" />
                        </a>
                      )}
                      {projects[selectedIndex].url && (
                        <a href={projects[selectedIndex].url} target="_blank" rel="noreferrer" className="flex items-center justify-between px-4 py-3 border font-mono text-[8px] md:text-[10px] uppercase tracking-widest transition-all group" style={{ borderColor: projects[selectedIndex].color, backgroundColor: `${projects[selectedIndex].color}11`, color: projects[selectedIndex].color }}>
                          <Layers size={14} /> 
                          <span>Live_Uplink</span>
                          <ExternalLink size={10} className="opacity-40" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="mt-auto pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[7px] md:text-[9px] opacity-20 uppercase tracking-[0.4em]" style={{ borderColor: 'var(--border-color)', color: 'var(--fg)' }}>
                    <div className="flex items-center gap-2">
                      <Clock size={10} />
                      <span>TIMELINE: {projects[selectedIndex].date}</span>
                    </div>
                    <span>SYNC_STABLE_V4</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
