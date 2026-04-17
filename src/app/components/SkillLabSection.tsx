import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

const innerSkills = [
  { name: 'PyTorch', level: 5, time: '4 Yrs' },
  { name: 'GNNs', level: 5, time: '3 Yrs' },
  { name: 'Python', level: 5, time: '6 Yrs' },
  { name: 'Neo4j', level: 4, time: '2 Yrs' },
  { name: 'CUDA', level: 3, time: '1 Yr' },
];

const outerSkills = [
  { name: 'FastAPI', level: 4, time: '3 Yrs' },
  { name: 'Docker', level: 4, time: '3 Yrs' },
  { name: 'AWS', level: 3, time: '2 Yrs' },
  { name: 'React', level: 3, time: '2 Yrs' },
  { name: 'Git', level: 5, time: '5 Yrs' },
  { name: 'Ray', level: 4, time: '2 Yrs' },
  { name: 'MLOps', level: 4, time: '2 Yrs' },
  { name: 'SQL', level: 4, time: '4 Yrs' },
];

export const SkillLabSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="skills" className="relative py-32 px-6 max-w-6xl mx-auto overflow-hidden">
      <div className="text-center mb-20">
        <h2 className="text-sm font-mono text-[#00FFFF] tracking-widest uppercase mb-2">02. Infrastructure</h2>
        <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tighter" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          The Skill-Lab.
        </h3>
      </div>

      {isMobile ? (
        <div className="flex flex-wrap gap-3 justify-center max-w-lg mx-auto">
          {[...innerSkills, ...outerSkills].map((skill, i) => (
            <SkillTag key={i} skill={skill} />
          ))}
        </div>
      ) : (
        <div className="relative w-full max-w-[800px] h-[800px] mx-auto flex items-center justify-center mt-10">
          {/* Core Center */}
          <div className="absolute w-32 h-32 bg-white/5 border border-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,255,255,0.1)] z-30">
            <span className="text-xl font-bold text-white tracking-widest uppercase">Nexus</span>
          </div>

          {/* Inner Ring */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute w-[400px] h-[400px] border border-white/10 rounded-full flex items-center justify-center z-20"
          >
            {innerSkills.map((skill, i) => {
              const angle = (i / innerSkills.length) * Math.PI * 2;
              const radius = 200;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              return (
                <RingNode key={i} skill={skill} x={x} y={y} color="#00FFFF" reverseRotate />
              );
            })}
          </motion.div>

          {/* Outer Ring */}
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            className="absolute w-[650px] h-[650px] border border-white/5 border-dashed rounded-full flex items-center justify-center z-10"
          >
            {outerSkills.map((skill, i) => {
              const angle = (i / outerSkills.length) * Math.PI * 2;
              const radius = 325;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              return (
                <RingNode key={i} skill={skill} x={x} y={y} color="#BB86FC" reverseRotate={false} outer />
              );
            })}
          </motion.div>
        </div>
      )}
    </section>
  );
};

const RingNode = ({ skill, x, y, color, reverseRotate, outer = false }: { skill: any, x: number, y: number, color: string, reverseRotate: boolean, outer?: boolean }) => {
  return (
    <div 
      className="absolute group z-50"
      style={{ transform: `translate(${x}px, ${y}px)` }}
    >
      <motion.div
        animate={{ rotate: reverseRotate ? -360 : 360 }}
        transition={{ duration: outer ? 80 : 60, repeat: Infinity, ease: "linear" }}
        className="relative flex items-center justify-center cursor-pointer"
      >
        <div className="w-16 h-16 bg-[#0A0E17] border border-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-sm font-medium text-gray-300 hover:text-white hover:border-current transition-colors shadow-lg shadow-black/50" style={{ color: color }}>
          {skill.name}
        </div>
        
        {/* Tooltip */}
        <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none w-max bg-white/10 backdrop-blur-xl border border-white/20 p-3 rounded-lg flex flex-col items-center gap-1 shadow-2xl">
          <div className="text-white font-bold">{skill.name}</div>
          <div className="flex items-center gap-1 text-[#00FFFF] text-xs">
            {'★'.repeat(skill.level)}{'☆'.repeat(5 - skill.level)}
          </div>
          <div className="text-gray-400 text-xs font-mono">{skill.time} Mastery</div>
        </div>
      </motion.div>
    </div>
  );
};

const SkillTag = ({ skill }: { skill: any }) => (
  <div className="relative group p-3 border border-white/10 bg-white/5 rounded-lg text-sm text-gray-300 backdrop-blur-sm cursor-pointer hover:border-[#00FFFF]/50 hover:bg-white/10 transition-all flex flex-col items-center min-w-[100px]">
    <span className="font-bold mb-1">{skill.name}</span>
    <span className="text-xs font-mono text-[#BB86FC]">{skill.time}</span>
    <div className="text-[10px] text-[#00FFFF] mt-1 tracking-widest">
      {'●'.repeat(skill.level)}{'○'.repeat(5 - skill.level)}
    </div>
  </div>
);
