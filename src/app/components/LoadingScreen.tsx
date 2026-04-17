import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { Cpu } from 'lucide-react';

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('INITIALIZING_SYSTEM_CORE');
  const [isVisible, setIsVisible] = useState(true);

  const statusMessages = [
    'ENCRYPTING_NEURAL_SYNAPSE...',
    'LOADING_GRAPH_ARCHIVE...',
    'MOUNTING_CAPABILITIES_MATRIX...',
    'SYNCING_COMPETITIVE_NODES...',
    'ESTABLISHING_COMMAND_LINK...',
    'SYSTEM_READY'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsVisible(false);
            onComplete();
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    const messageIndex = Math.min(
      Math.floor((progress / 100) * statusMessages.length),
      statusMessages.length - 1
    );
    setStatus(statusMessages[messageIndex]);
  }, [progress]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center p-6 overflow-hidden"
        >
          <div className="absolute inset-0 opacity-[0.03] bg-blueprint pointer-events-none" />
          
          <div className="relative w-full max-w-md flex flex-col items-center">
            <motion.div
              animate={{ 
                rotate: [0, 90, 180, 270, 360],
                boxShadow: ["0 0 20px var(--cyan-dim)", "0 0 40px var(--cyan)", "0 0 20px var(--cyan-dim)"]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 border-2 border-[var(--cyan)] flex items-center justify-center mb-12 relative"
            >
               <Cpu size={32} style={{ color: 'var(--cyan)' }} />
               <div className="absolute -top-1 -left-1 w-2 h-2 bg-[var(--cyan)]" />
               <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[var(--cyan)]" />
            </motion.div>

            <div className="w-full h-1 bg-white/5 border border-white/10 mb-6 relative overflow-hidden">
               <motion.div 
                 className="absolute inset-y-0 left-0 bg-[var(--cyan)]"
                 animate={{ width: `${progress}%` }}
                 transition={{ duration: 0.3 }}
               />
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]" />
            </div>

            <div className="w-full flex justify-between font-mono text-[10px] tracking-widest mb-2">
              <span style={{ color: 'var(--cyan)' }}>&gt; {status}</span>
              <span style={{ color: 'var(--fg-muted)' }}>{Math.floor(progress)}%</span>
            </div>

            <div className="w-full p-4 bg-white/5 border border-white/5 font-mono text-[9px] leading-relaxed opacity-40">
               <div className="flex gap-2"><span className="text-[var(--green)]">[OK]</span> CORE_LOAD_SUCCESSFUL</div>
               <div className="flex gap-2"><span className="text-[var(--green)]">[OK]</span> NEURAL_LINK_ESTABLISHED</div>
               <div className="flex gap-2"><span className="text-[var(--cyan)]">[~]</span> FETCHING_REMOTE_ARTIFACTS...</div>
            </div>
          </div>

          <style>{`
            @keyframes shimmer {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(100%); }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
