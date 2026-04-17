import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Power, Terminal, Shield, Cpu, Activity, Briefcase, Linkedin, Github, Mail, Award, ChevronDown } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import portfolioData from '../../data/config.json';

const iconMap: Record<string, any> = {
  Activity: <Activity size={14} />,
  Cpu: <Cpu size={14} />,
  Shield: <Shield size={14} />,
  Terminal: <Terminal size={14} />,
  Award: <Award size={14} />,
  Briefcase: <Briefcase size={14} />
};

const mobileIconMap: Record<string, any> = {
  Activity: <Activity size={20} />,
  Cpu: <Cpu size={20} />,
  Shield: <Shield size={20} />,
  Terminal: <Terminal size={20} />,
  Award: <Award size={20} />,
  Briefcase: <Briefcase size={20} />
};

const socialIconMap: Record<string, any> = {
  github: <Github size={16} />,
  linkedin: <Linkedin size={16} />,
  email: <Mail size={16} />
};

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSocialMenuOpen, setIsSocialMenuOpen] = useState(false);
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');
  const navLinks = portfolioData.navigation;
  const socials = portfolioData.socials;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerSystemReboot = () => {
    const newTheme = themeMode === 'dark' ? 'light' : 'dark';
    setThemeMode(newTheme);
    document.body.classList.add('glitch-active');
    setTimeout(() => {
      document.body.classList.remove('glitch-active');
      if (newTheme === 'light') {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      }
    }, 150);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={twMerge(
          'fixed top-0 left-0 right-0 z-50 hidden lg:flex items-center justify-between px-10 py-5 transition-all duration-500',
          isScrolled ? 'backdrop-blur-xl border-b' : 'bg-transparent border-transparent'
        )}
        style={{
          backgroundColor: isScrolled ? 'var(--bg)' : 'transparent',
          borderColor: isScrolled ? 'var(--border-color)' : 'transparent',
        }}
      >
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 text-2xl font-bold tracking-tighter group cursor-pointer"
        >
          <span style={{ color: 'var(--cyan)' }} className="group-hover:animate-pulse">{'//'}</span>
          <span style={{ color: 'var(--fg)' }} className="font-mono uppercase tracking-[0.2em] text-sm">Portfolio</span>
        </div>

        <div className="flex items-center gap-10">
          <div className="flex items-center gap-8 border-r pr-10" style={{ borderColor: 'var(--border-color)' }}>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative group flex flex-col items-center"
              >
                <div className="flex items-center gap-2 text-[10px] font-mono font-bold tracking-[0.2em] transition-colors" style={{ color: 'var(--fg-muted)' }}>
                  <span className="group-hover:text-[var(--cyan)] transition-colors">
                    {iconMap[link.icon] || <Activity size={14} />}
                  </span>
                  <span className="group-hover:text-white transition-colors">{link.name.toUpperCase()}</span>
                </div>
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--cyan)] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative group/social">
               <button 
                onMouseEnter={() => setIsSocialMenuOpen(true)}
                onMouseLeave={() => setIsSocialMenuOpen(false)}
                className="flex items-center gap-2 text-[10px] font-mono font-bold tracking-[0.2em]" style={{ color: 'var(--fg-muted)' }}
               >
                 CONNECT <ChevronDown size={10} className="group-hover/social:rotate-180 transition-transform" />
               </button>
               
               <AnimatePresence>
                 {isSocialMenuOpen && (
                   <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onMouseEnter={() => setIsSocialMenuOpen(true)}
                    onMouseLeave={() => setIsSocialMenuOpen(false)}
                    className="absolute top-full right-0 mt-4 p-2 border bg-[var(--bg)] min-w-[180px] shadow-2xl backdrop-blur-xl"
                    style={{ borderColor: 'var(--border-color)' }}
                   >
                     {socials.map((social) => (
                       <a 
                        key={social.platform} 
                        href={social.url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center justify-between p-3 hover:bg-[var(--cyan)] hover:text-[var(--bg)] transition-colors group font-mono text-[9px] uppercase tracking-widest"
                       >
                         {social.platform}
                         {socialIconMap[social.platform]}
                       </a>
                     ))}
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>

            <button 
              onClick={triggerSystemReboot}
              className="flex items-center gap-2 px-5 py-2 border font-mono text-[10px] font-bold transition-all relative group overflow-hidden"
              style={{ borderColor: 'var(--cyan)', color: 'var(--cyan)', backgroundColor: 'var(--cyan-dim)' }}
            >
              <div className="absolute inset-0 bg-[var(--cyan)] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <Power size={12} className="relative z-10 group-hover:text-[var(--bg)]" />
              <span className="relative z-10 group-hover:text-[var(--bg)] tracking-widest uppercase">REBOOT</span>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile & Tablet Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b flex justify-between items-center p-5" style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border-color)' }}>
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-lg font-bold font-mono tracking-widest cursor-pointer"
        >
          <span style={{ color: 'var(--cyan)' }}>{'//'}</span>
          <span style={{ color: 'var(--fg)' }}> Portfolio</span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 transition-transform active:scale-90"
          style={{ color: 'var(--cyan)' }}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="lg:hidden fixed inset-0 z-40 flex flex-col p-10 pt-28"
            style={{ backgroundColor: 'var(--bg)' }}
          >
            <div className="absolute inset-0 opacity-[0.03] bg-blueprint pointer-events-none" />

            <div className="flex flex-col gap-8 relative z-10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="group flex flex-col border-b py-5"
                  style={{ borderColor: 'var(--border-color)' }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                       <span style={{ color: 'var(--cyan)' }}>
                         {mobileIconMap[link.icon] || <Activity size={20} />}
                       </span>
                       <span className="text-3xl font-heading font-extrabold uppercase tracking-tighter" style={{ color: 'var(--fg)' }}>{link.name}</span>
                    </div>
                    <span className="font-mono text-[10px] opacity-40 uppercase tracking-widest" style={{ color: 'var(--fg-muted)' }}>{link.detail}</span>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-auto grid grid-cols-3 gap-4 pb-10">
              {socials.map((social) => (
                <a 
                  key={social.platform} 
                  href={social.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-center p-4 border rounded-none"
                  style={{ borderColor: 'var(--border-color)', color: 'var(--fg)' }}
                >
                  {socialIconMap[social.platform]}
                </a>
              ))}
            </div>

            <button 
              onClick={() => { triggerSystemReboot(); setIsMobileMenuOpen(false); }}
              className="flex items-center justify-center gap-4 py-6 border font-mono text-sm font-bold tracking-[0.4em]"
              style={{ borderColor: 'var(--cyan)', color: 'var(--cyan)', backgroundColor: 'var(--cyan-dim)' }}
            >
              <Power size={24} />
              SYSTEM_REBOOT
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
