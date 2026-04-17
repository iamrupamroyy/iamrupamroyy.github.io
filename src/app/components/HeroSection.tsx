import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Download } from 'lucide-react';

const MagneticButton = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative min-h-[44px] min-w-[44px] flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 hover:border-[#00FFFF]/50 backdrop-blur-sm text-white rounded-none font-medium uppercase tracking-wider overflow-hidden group ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      <div className="absolute inset-0 bg-gradient-to-r from-[#00FFFF]/20 to-[#BB86FC]/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
    </motion.button>
  );
};

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Subtle Graph Animation Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20 pointer-events-none">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="relative w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] border border-white/5 rounded-full"
        >
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
            className="absolute inset-4 border border-[#00FFFF]/10 rounded-full"
          />
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
            className="absolute inset-12 border border-[#BB86FC]/10 rounded-full border-dashed"
          />
        </motion.div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl w-full mt-16 md:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-block mb-6 px-4 py-1.5 border border-white/10 bg-white/5 backdrop-blur-sm rounded-full text-xs font-mono text-[#00FFFF] tracking-widest uppercase"
        >
          Status: Compiling Reality
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-600 mb-6 uppercase"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Quantum Graph <br className="hidden md:block" /> Architect.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl font-light"
        >
          <span className="text-white font-medium">Rupam Roy</span> | MTech Researcher @ IIT Bhilai | GNN & Scalable ML
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <MagneticButton>
            Download CV
            <Download size={18} />
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
};
