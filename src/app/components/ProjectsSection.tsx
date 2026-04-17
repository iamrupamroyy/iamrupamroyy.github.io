import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { ExternalLink, Code2, Database, Box } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "Quantum Graph Analyzer",
    desc: "A distributed GNN framework scaling to 10B+ edges with localized attention mechanisms.",
    stack: ["PyTorch", "Neo4j", "FastAPI"],
    icon: <Box size={24} className="text-[#00FFFF]" />
  },
  {
    id: 2,
    title: "Neural Search Engine",
    desc: "Semantic search engine leveraging dense vector embeddings and approximate nearest neighbors.",
    stack: ["HuggingFace", "Milvus", "React"],
    icon: <Database size={24} className="text-[#BB86FC]" />
  },
  {
    id: 3,
    title: "Temporal Dynamics Model",
    desc: "Predictive model for dynamic graphs forecasting node evolution over continuous time.",
    stack: ["CUDA", "Python", "Docker"],
    icon: <Code2 size={24} className="text-[#00FFFF]" />
  }
];

export const ProjectsSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="projects" className="relative py-32 px-6 max-w-7xl mx-auto">
      <div className="mb-20">
        <h2 className="text-sm font-mono text-[#BB86FC] tracking-widest uppercase mb-2">03. Showcase</h2>
        <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tighter" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Project Nexus.
        </h3>
      </div>

      <div className={`flex ${isMobile ? 'flex-col gap-8' : 'flex-row gap-6 overflow-x-auto pb-12 snap-x snap-mandatory hide-scrollbar'}`}>
        {projects.map((proj) => (
          isMobile ? <MobileCard key={proj.id} project={proj} /> : <HoloCard key={proj.id} project={proj} />
        ))}
      </div>
    </section>
  );
};

const HoloCard = ({ project }: { project: any }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateY, rotateX, transformStyle: "preserve-3d", perspective: "1000px" }}
      className="relative min-w-[350px] w-[350px] md:min-w-[450px] md:w-[450px] h-[500px] bg-white/5 border border-white/10 backdrop-blur-md p-8 snap-center flex flex-col cursor-pointer group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#00FFFF]/0 to-[#BB86FC]/0 group-hover:from-[#00FFFF]/5 group-hover:to-[#BB86FC]/5 transition-colors duration-500 pointer-events-none" style={{ transform: "translateZ(0px)" }} />
      
      <div style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }} className="flex flex-col h-full">
        <div className="w-16 h-16 bg-[#0A0E17] border border-white/20 rounded-2xl flex items-center justify-center mb-8 shadow-2xl">
          {project.icon}
        </div>
        
        <h4 className="text-2xl font-bold text-white mb-4 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {project.title}
        </h4>
        
        <p className="text-gray-400 text-sm leading-relaxed mb-auto">
          {project.desc}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.stack.map((tech: string, i: number) => (
            <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 text-xs text-[#00FFFF] font-mono rounded-full">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 mt-auto border-t border-white/10 pt-6">
          <a href="#" className="flex items-center gap-2 text-sm text-white hover:text-[#00FFFF] font-medium transition-colors">
            <ExternalLink size={16} />
            Demo
          </a>
          <a href="#" className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#BB86FC] font-medium transition-colors">
            Architecture
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const MobileCard = ({ project }: { project: any }) => (
  <div className="relative w-full bg-white/5 border border-white/10 p-6 flex flex-col group hover:border-[#00FFFF]/50 transition-colors shadow-[0_0_15px_rgba(0,0,0,0)] hover:shadow-[0_0_15px_rgba(0,255,255,0.1)]">
    <div className="flex items-start justify-between mb-4">
      <div className="w-12 h-12 bg-[#0A0E17] border border-white/20 rounded-xl flex items-center justify-center">
        {project.icon}
      </div>
      <a href="#" className="p-2 bg-white/5 border border-white/10 rounded-lg text-white hover:text-[#00FFFF]">
        <ExternalLink size={16} />
      </a>
    </div>
    
    <h4 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      {project.title}
    </h4>
    
    <p className="text-gray-400 text-sm leading-relaxed mb-6">
      {project.desc}
    </p>

    <div className="flex flex-wrap gap-2">
      {project.stack.map((tech: string, i: number) => (
        <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 text-xs text-[#00FFFF] font-mono rounded-full">
          {tech}
        </span>
      ))}
    </div>
  </div>
);
