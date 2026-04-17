import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState } from 'react';

const historyData = [
  {
    id: 1,
    role: "Senior AI Researcher",
    company: "NeuralDynamics",
    date: "2023 - Present",
    metric: "Deployed GNN model reducing inference by 22%",
    description: "Spearheaded the development of highly scalable graph neural networks for molecular property prediction."
  },
  {
    id: 2,
    role: "Machine Learning Engineer",
    company: "DataCorp Analytics",
    date: "2021 - 2023",
    metric: "Improved recommendation accuracy by 15%",
    description: "Designed and implemented robust data pipelines and classical ML models for e-commerce personalization."
  },
  {
    id: 3,
    role: "Research Intern",
    company: "Cognitive Labs",
    date: "2020 - 2021",
    metric: "Co-authored 2 papers at top-tier conferences",
    description: "Explored novel attention mechanisms in sparse graph structures."
  }
];

export const TimelineSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="history" className="relative py-32 px-6 max-w-4xl mx-auto" ref={containerRef}>
      <div className="mb-20">
        <h2 className="text-sm font-mono text-[#BB86FC] tracking-widest uppercase mb-2">01. Timeline</h2>
        <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tighter" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Carrier/Nexus History.
        </h3>
      </div>

      <div className="relative pl-8 md:pl-0">
        {/* The Animated Line */}
        <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 md:-translate-x-1/2">
          <motion.div 
            className="absolute top-0 left-0 right-0 bg-gradient-to-b from-[#00FFFF] to-[#BB86FC]"
            style={{ height: lineHeight, filter: 'drop-shadow(0 0 8px rgba(0,255,255,0.5))' }}
          />
        </div>

        <div className="flex flex-col gap-24">
          {historyData.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <HistoryCard key={item.id} item={item} isEven={isEven} />
            );
          })}
        </div>
      </div>
    </section>
  );
};

const HistoryCard = ({ item, isEven }: { item: any, isEven: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`relative flex flex-col md:flex-row items-center justify-between w-full ${isEven ? 'md:flex-row-reverse' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Node */}
      <div className="absolute left-[-24px] md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-[#0A0E17] border-2 border-white/20 z-10 transition-colors duration-300 flex items-center justify-center">
         <div className={`w-2 h-2 rounded-full transition-all duration-300 ${isHovered ? 'bg-[#00FFFF] shadow-[0_0_10px_#00FFFF]' : 'bg-transparent'}`} />
      </div>

      <div className={`w-full md:w-[45%] ${isEven ? 'md:pl-12' : 'md:pr-12'}`}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className={`p-6 bg-white/5 border border-white/10 backdrop-blur-md rounded-none relative overflow-hidden group transition-all duration-500 hover:border-[#BB86FC]/50 hover:bg-white/10`}
        >
          {/* Subtle connecting filament on hover (simulated with a gradient line) */}
          <div className={`absolute top-1/2 ${isEven ? 'left-0 -translate-x-full' : 'right-0 translate-x-full'} w-12 h-[1px] bg-gradient-to-r from-[#BB86FC] to-transparent opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : ''}`} />

          <div className="text-[#00FFFF] font-mono text-xs mb-2">{item.date}</div>
          <h4 className="text-xl font-bold text-white mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.role}</h4>
          <div className="text-gray-400 text-sm mb-4 font-medium">{item.company}</div>
          <p className="text-gray-300 text-sm mb-4 leading-relaxed">{item.description}</p>
          
          <div className="bg-[#0A0E17] p-3 border border-white/5 text-xs text-[#BB86FC] font-mono flex items-start gap-2">
            <span className="mt-0.5">⚡</span>
            <span>{item.metric}</span>
          </div>
        </motion.div>
      </div>
      
      <div className="hidden md:block w-[45%]" />
    </div>
  );
};
