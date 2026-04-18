import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { Terminal } from 'lucide-react';

export const RouteLoader = ({ onComplete }: { onComplete?: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 1200); 
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }} // Start fully opaque
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] bg-[#050505] flex flex-col items-center justify-center font-mono"
        >
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-4 text-[var(--cyan)] text-sm tracking-[0.3em] uppercase animate-pulse">
               <Terminal size={18} />
               <span>Switching_Context...</span>
            </div>
            
            <div className="w-64 h-[1px] bg-white/5 relative overflow-hidden">
               <motion.div 
                 initial={{ x: '-100%' }}
                 animate={{ x: '100%' }}
                 transition={{ duration: 1, ease: "easeInOut" }}
                 className="absolute inset-y-0 w-1/3 bg-[var(--cyan)]"
               />
            </div>

            <div className="text-[9px] opacity-30 text-white uppercase tracking-widest">
               Buffer_Load: [ {Math.random().toString(16).slice(2, 8).toUpperCase()} ]
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
