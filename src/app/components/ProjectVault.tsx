import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Database, ExternalLink, Github, Eye, Terminal } from 'lucide-react';
import { SectionHeader } from './ui/SectionHeader';
import { useIsMobile } from './ui/use-mobile';
import portfolioData from '../../data/config.json';

export const ProjectVault = () => {
  const projects = portfolioData.projects;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const isMobile = useIsMobile();

  return (
    <section id="projects" className="relative py-32 px-6 max-w-7xl mx-auto border-t" style={{ borderColor: 'var(--border-color)' }}>
      <SectionHeader 
        icon={Database} 
        sectionNum="03" 
        title="Vault" 
        subtitle="ARTIFACT_COLLECTION"
      />

      {isMobile ? (
        <div className="flex flex-col gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="border flex flex-col overflow-hidden"
              style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}
            >
              <div className="relative h-48 w-full overflow-hidden border-b" style={{ borderColor: 'var(--border-color)' }}>
                <img src={project.image} className="w-full h-full object-cover opacity-60 grayscale" alt={project.title} />
                <div className="absolute top-4 left-4 px-2 py-1 bg-black/80 backdrop-blur-md border border-[var(--cyan)] font-mono text-[8px] text-[var(--cyan)] tracking-widest uppercase">
                  {project.status}
                </div>
              </div>
              <div className="p-6 flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <h4 className="text-xl font-heading font-extrabold uppercase tracking-tight" style={{ color: 'var(--fg)' }}>
                    {project.title}
                  </h4>
                  <span className="font-mono text-[9px] opacity-40 uppercase tracking-widest">#{String(idx + 1).padStart(2, '0')}</span>
                </div>
                <p className="text-gray-400 font-mono text-xs leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map(t => (
                    <span key={t} className="text-[9px] font-mono border px-2 py-0.5 opacity-50 uppercase tracking-tighter" style={{ borderColor: 'var(--border-color)', color: 'var(--fg)' }}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3 pt-2">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 p-3 border font-mono text-[10px] uppercase tracking-widest hover:bg-white/5 transition-all" style={{ borderColor: 'var(--border-color)', color: 'var(--fg)' }}>
                      <Github size={12} /> Source
                    </a>
                  )}
                  {project.external && (
                    <a href={project.external} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 p-3 border font-mono text-[10px] uppercase tracking-widest transition-all" style={{ borderColor: project.color, color: project.color, backgroundColor: `${project.color}11` }}>
                      <ExternalLink size={12} /> Live
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 h-[700px]">
          <div className="w-full lg:w-1/3 flex flex-col border overflow-hidden" style={{ borderColor: 'var(--border-color)' }}>
            <div className="p-4 border-b bg-black/40 font-mono text-[10px] tracking-widest flex items-center justify-between" style={{ borderColor: 'var(--border-color)' }}>
              <span style={{ color: 'var(--fg)' }}>PROJECT_ROOT/ARTIFACTS</span>
              <span style={{ color: 'var(--cyan)' }}>[{projects.length}]</span>
            </div>
            
            <div className="flex-1 overflow-y-auto hide-scrollbar p-2 flex flex-col gap-2">
              {projects.map((project, idx) => (
                <button
                  key={project.id}
                  onClick={() => setSelectedIndex(idx)}
                  className={`relative p-5 text-left border transition-all duration-300 group overflow-hidden ${selectedIndex === idx ? 'bg-[var(--card-bg)]' : 'border-transparent hover:bg-white/5'}`}
                  style={{ borderColor: selectedIndex === idx ? project.color : 'transparent' }}
                >
                  <div className="relative z-10 flex flex-col gap-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-mono text-[8px] tracking-[0.2em] opacity-40" style={{ color: 'var(--fg)' }}>#{String(idx + 1).padStart(2, '0')}</span>
                      {selectedIndex === idx && <Eye size={12} style={{ color: project.color }} className="animate-pulse" />}
                    </div>
                    <h4 
                      className="text-lg font-heading font-bold uppercase tracking-tight transition-colors duration-300"
                      style={{ color: selectedIndex === idx ? 'var(--fg)' : 'gray' }}
                    >
                      {project.title}
                    </h4>
                    <div className="flex gap-2 opacity-30">
                       {project.tech.slice(0, 2).map(t => <span key={t} className="text-[8px] font-mono" style={{ color: 'var(--fg)' }}>{t}</span>)}
                    </div>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="p-4 border-t bg-black/40 font-mono text-[8px] opacity-30 uppercase tracking-[0.4em]" style={{ borderColor: 'var(--border-color)', color: 'var(--fg)' }}>
              Explorer_Status: READY
            </div>
          </div>

          <div className="flex-1 border relative overflow-hidden flex flex-col" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex-1 flex flex-col"
              >
                <div className="relative h-64 md:h-80 w-full overflow-hidden border-b" style={{ borderColor: 'var(--border-color)' }}>
                  <img src={projects[selectedIndex].image} className="w-full h-full object-cover opacity-60 grayscale brightness-50" alt={projects[selectedIndex].title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] to-transparent opacity-60" />
                  
                  <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
                    <div className="flex justify-between font-mono text-[9px] tracking-widest opacity-40" style={{ color: 'var(--fg)' }}>
                      <span className="flex items-center gap-2"><Terminal size={10} /> ACCESS_MODE: READ_ONLY</span>
                      <span>TIMESTAMP: 2026.04.17</span>
                    </div>
                    
                    <div className="flex items-end justify-between">
                      <div className="flex flex-col gap-1">
                        <div className="h-[1px] w-48 bg-white/10 relative overflow-hidden">
                          <motion.div 
                            initial={{ x: '-100%' }}
                            animate={{ x: '100%' }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 w-1/3"
                            style={{ backgroundColor: projects[selectedIndex].color }}
                          />
                        </div>
                        <span className="font-mono text-[8px] tracking-[0.3em] opacity-40 uppercase" style={{ color: 'var(--fg)' }}>Scanning_Logic_Gates...</span>
                      </div>
                      <div className="text-[var(--cyan)] font-mono text-xl font-bold opacity-20">0{selectedIndex + 1}</div>
                    </div>
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col gap-8">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2 mb-6">
                        <span className="px-3 py-1 border font-mono text-[9px] tracking-[0.2em] bg-white/5" style={{ color: projects[selectedIndex].color, borderColor: `${projects[selectedIndex].color}44` }}>
                          {projects[selectedIndex].status}
                        </span>
                        {projects[selectedIndex].tech.map(t => (
                          <span key={t} className="text-[10px] font-mono border px-2 py-1 opacity-50 uppercase tracking-tighter" style={{ borderColor: 'var(--border-color)', color: 'var(--fg)' }}>
                            {t}
                          </span>
                        ))}
                      </div>
                      <p className="font-mono text-sm leading-relaxed max-w-2xl border-l-2 pl-6 py-2" style={{ borderColor: projects[selectedIndex].color, color: 'var(--fg-muted)' }}>
                        {projects[selectedIndex].description}
                      </p>
                    </div>
                    
                    <div className="flex flex-col gap-3 min-w-[200px] w-full md:w-auto">
                      {projects[selectedIndex].github && (
                        <a href={projects[selectedIndex].github} target="_blank" rel="noreferrer" className="flex items-center justify-between px-4 py-3 border font-mono text-[10px] uppercase tracking-widest hover:bg-white/5 transition-all" style={{ borderColor: 'var(--border-color)', color: 'var(--fg)' }}>
                          <Github size={14} /> View Source
                        </a>
                      )}
                      {projects[selectedIndex].external && (
                        <a href={projects[selectedIndex].external} target="_blank" rel="noreferrer" className="flex items-center justify-between px-4 py-3 border font-mono text-[10px] uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)]" style={{ borderColor: projects[selectedIndex].color, backgroundColor: `${projects[selectedIndex].color}11`, color: projects[selectedIndex].color }}>
                          <ExternalLink size={14} /> View Live
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="mt-auto border-t pt-8 flex items-center justify-between font-mono text-[8px] opacity-30 uppercase tracking-[0.5em]" style={{ color: 'var(--fg)' }}>
                    <span>V_NODE: {projects[selectedIndex].category}</span>
                    <div className="flex gap-4">
                      <span>SECTOR_7</span>
                      <span>ARCHIVE_404</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}
    </section>
  );
};
