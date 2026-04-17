import { motion } from 'motion/react';
import { useState } from 'react';
import { Radio, Cpu, Database, Server, Layers, Code, Terminal, Zap } from 'lucide-react';
import { SectionHeader } from './ui/SectionHeader';
import portfolioData from '../../data/config.json';

const iconMap: Record<string, any> = {
  lang: <Code size={20} />,
  intelligence: <Cpu size={20} />,
  backend: <Server size={20} />,
  data: <Database size={20} />,
  systems: <Zap size={20} />,
  infra: <Layers size={20} />
};

export const TechStackMatrix = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const techClusters = portfolioData.techStack;

  return (
    <section id="skills" className="relative py-32 px-6 max-w-7xl mx-auto border-t overflow-hidden" style={{ borderColor: 'var(--border-color)' }}>
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-blueprint" />
      
      <SectionHeader 
        icon={Terminal} 
        sectionNum="02" 
        title="Skills" 
        subtitle="CAPABILITIES_MAPPING"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
        {techClusters.map((cluster) => (
          <motion.div
            key={cluster.id}
            onMouseEnter={() => setHovered(cluster.id)}
            onMouseLeave={() => setHovered(null)}
            className="relative h-auto min-h-[220px] p-6 border group cursor-crosshair transition-all duration-500"
            style={{ 
              backgroundColor: 'var(--card-bg)', 
              borderColor: hovered === cluster.id ? cluster.color : 'var(--border-color)',
              transform: hovered === cluster.id ? 'translateY(-5px)' : 'none'
            }}
          >
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l" style={{ borderColor: cluster.color }} />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r" style={{ borderColor: cluster.color }} />

            <div className="flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div 
                  className="p-3 border transition-colors duration-300"
                  style={{ color: cluster.color, borderColor: `${cluster.color}44` }}
                >
                  {iconMap[cluster.id] || <Radio size={20} />}
                </div>
                <div className="font-mono text-[9px] opacity-30 uppercase tracking-tighter" style={{ color: 'var(--fg)' }}>
                  0x{cluster.id.toUpperCase()}
                </div>
              </div>

              <h4 className="font-heading font-bold text-lg mb-4 uppercase tracking-tight" style={{ color: 'var(--fg)' }}>
                {cluster.title}
              </h4>

              <div className="flex flex-wrap gap-2 mt-auto">
                {cluster.skills.map(skill => (
                  <span 
                    key={skill}
                    className="text-[9px] font-mono px-2 py-0.5 border uppercase tracking-widest transition-all"
                    style={{ 
                      borderColor: hovered === cluster.id ? `${cluster.color}66` : 'var(--border-color)',
                      color: hovered === cluster.id ? 'var(--fg)' : 'var(--fg-muted)'
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="absolute bottom-0 left-0 h-[1px] transition-all duration-700"
                   style={{ 
                     backgroundColor: cluster.color, 
                     width: hovered === cluster.id ? '100%' : '0%',
                     opacity: hovered === cluster.id ? 0.6 : 0,
                     boxShadow: `0 0 10px ${cluster.color}`
                   }} />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
