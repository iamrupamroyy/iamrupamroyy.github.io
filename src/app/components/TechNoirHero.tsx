import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect, useContext } from 'react';
import { Download, FileText, ChevronRight, Activity, Crosshair, Zap } from 'lucide-react';
import portfolioData from '../../data/config.json';
import { AppContext } from '../AppRoot';

const TypewriterText = ({ text, delay = 0, speed = 30, start = false }: { text: string, delay?: number, speed?: number, start?: boolean }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  
  useEffect(() => {
    if (start && !isStarted) {
       const timer = setTimeout(() => setIsStarted(true), delay);
       return () => clearTimeout(timer);
    }
  }, [start, delay, isStarted]);

  useEffect(() => {
    if (isStarted) {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText(text.slice(0, i));
        i++;
        if (i > text.length) clearInterval(interval);
      }, speed);
      return () => clearInterval(interval);
    }
  }, [isStarted, text, speed]);

  return <span>{displayedText}</span>;
};

export const TechNoirHero = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [showResumeMenu, setShowResumeMenu] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { profile, resumes } = portfolioData;
  const { isLoaded } = useContext(AppContext);

  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center px-6 overflow-hidden bg-blueprint pt-12 pb-20">
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-24">
        
        {/* Left Side: Text Block */}
        <div className="w-full md:w-1/2 flex flex-col justify-center gap-8 order-2 md:order-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-2"
          >
            <Activity size={16} style={{ color: 'var(--cyan)' }} className="animate-pulse" />
            <h2 className="text-[10px] font-mono tracking-[0.5em] uppercase" style={{ color: 'var(--cyan)' }}>
              SYSTEM_IDENTIFICATION_ROOT
            </h2>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-[110px] font-heading font-extrabold tracking-tighter uppercase leading-[0.8]"
            style={{ color: 'var(--fg)' }}
          >
            <span className="text-transparent block" style={{ WebkitTextStroke: '1px var(--stroke-color)', opacity: 0.4 }}>
              RUPAM
            </span>
            ROY.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="p-6 md:p-8 border font-mono relative group max-w-lg"
            style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}
          >
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: 'var(--cyan)' }} />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2" style={{ borderColor: 'var(--cyan)' }} />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2" style={{ borderColor: 'var(--cyan)' }} />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2" style={{ borderColor: 'var(--cyan)' }} />

            <h2 className="text-xl md:text-2xl font-bold mb-4 uppercase tracking-tight" style={{ color: 'var(--fg)' }}>
              &gt; <TypewriterText text={profile.handle} delay={500} speed={40} start={isLoaded} />
            </h2>
            <div className="text-xs md:text-sm leading-relaxed opacity-70 mb-6" style={{ color: 'var(--fg)' }}>
              <div>STATUS: <span style={{ color: 'var(--green)' }}>[ONLINE]</span> <TypewriterText text={profile.location} delay={1000} speed={20} start={isLoaded} /></div>
              <div>DIRECTIVE: <TypewriterText text={profile.directive} delay={1500} speed={20} start={isLoaded} /></div>
              <div>NODE_OS: <TypewriterText text={profile.node} delay={2000} speed={20} start={isLoaded} /></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative flex flex-col sm:flex-row gap-4 mt-2"
          >
            <div className="relative">
              <button 
                onClick={() => setShowResumeMenu(!showResumeMenu)}
                className="group relative px-10 py-5 bg-[var(--cyan)] text-[var(--bg)] font-bold font-mono text-xs uppercase tracking-[0.2em] overflow-hidden transition-all hover:scale-105 flex items-center justify-center gap-3 w-full sm:w-auto"
              >
                <FileText size={16} />
                Access_Resumes
                <ChevronRight size={14} className={`transition-transform duration-300 ${showResumeMenu ? 'rotate-90' : ''}`} />
              </button>
              
              <AnimatePresence>
                {showResumeMenu && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute bottom-full mb-4 left-0 w-full sm:w-64 border z-50 p-2 shadow-2xl backdrop-blur-xl"
                    style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--cyan)' }}
                  >
                    <div className="text-[8px] font-mono opacity-40 p-2 uppercase tracking-widest border-b mb-2" style={{ borderColor: 'var(--border-color)' }}>Select_Focus</div>
                    {resumes.map((res: any, i: number) => (
                      <a 
                        key={i}
                        href={res.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between p-3 hover:bg-[var(--cyan)] hover:text-[var(--bg)] transition-colors group font-mono text-[10px] uppercase tracking-tighter"
                      >
                        {res.label}
                        <Download size={12} className="opacity-0 group-hover:opacity-100" />
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Pop-Out Portrait - Optimized for small screen heights */}
        <div className="w-full md:w-1/2 flex items-center justify-center order-1 md:order-2 px-4 md:px-0">
          <div className="relative w-full flex justify-center">
            
            <div className="absolute -inset-8 md:-inset-16 border border-white/5 rounded-full pointer-events-none opacity-20" />

            <div 
              className="relative w-full max-w-[260px] aspect-[3/4] sm:max-w-[320px] md:max-w-[420px] md:h-[560px] group cursor-none"
              onMouseEnter={() => setIsFocused(true)}
              onMouseLeave={() => setIsFocused(false)}
            >
              {/* Main Image Container */}
              <div className="absolute inset-0 z-0 border overflow-hidden transition-all duration-700 shadow-2xl bg-black" 
                   style={{ borderColor: isFocused ? 'var(--cyan)' : 'var(--border-color)' }}>
                
                {!imageLoaded && <div className="absolute inset-0 bg-white/5 animate-pulse" />}

                <img 
                  src={profile.heroImage} 
                  alt="Background" 
                  onLoad={() => setImageLoaded(true)}
                  className={`w-full h-full object-cover object-top transition-all duration-1000 ${!imageLoaded ? 'opacity-0' : isFocused ? 'grayscale blur-md opacity-30 brightness-50' : 'brightness-110 contrast-110 opacity-100'}`}
                />
              </div>

              {/* Pop-Out Layer */}
              <motion.div 
                animate={{ 
                  scale: isFocused ? 1.15 : 1,
                  opacity: isFocused ? 1 : 0,
                  y: isFocused ? -15 : 0
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 z-20 pointer-events-none"
              >
                <img 
                  src={profile.heroPopImage} 
                  alt="Pop-Out" 
                  className="w-full h-full object-cover object-top drop-shadow-[0_20px_50px_rgba(0,242,255,0.2)] filter brightness-110"
                />
              </motion.div>

              {/* HUD elements */}
              <div className="absolute inset-0 z-30 p-6 flex flex-col justify-between pointer-events-none">
                <div className="flex justify-between font-mono text-[9px] tracking-widest transition-colors duration-500" style={{ color: isFocused ? 'var(--cyan)' : 'var(--fg-muted)' }}>
                  <span className="flex items-center gap-2 font-bold"><Crosshair size={12} className={isFocused ? 'animate-spin' : ''} /> {isFocused ? 'IDENTITY_LOCKED' : 'SYSTEM_READY'}</span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-end justify-between transition-colors duration-500" style={{ color: isFocused ? 'var(--cyan)' : 'white' }}>
                     <div className="font-mono text-[8px] tracking-[0.4em] uppercase font-bold opacity-40">Bio_Extraction</div>
                     <Zap size={14} className={isFocused ? 'animate-pulse' : 'opacity-20'} />
                  </div>
                  <div className="h-0.5 w-full bg-white/5 relative overflow-hidden">
                     <motion.div 
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 w-1/3 bg-[var(--cyan)]"
                     />
                  </div>
                </div>
              </div>

              <div className={`absolute -right-4 md:-right-8 top-1/4 z-40 transition-all duration-700 hidden sm:block ${isFocused ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                 <div className="p-3 border backdrop-blur-md font-mono text-[8px] tracking-widest text-white/60 bg-black/40" style={{ borderColor: 'var(--border-color)' }}>
                    COORD_X: {profile.coordinates.x}<br />
                    COORD_Y: {profile.coordinates.y}
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
