import { Navbar } from './components/Navbar';
import { TechNoirHero } from './components/TechNoirHero';
import { ArenaSection } from './components/ArenaSection';
import { TechStackMatrix } from './components/TechStackMatrix';
import { ProjectVault } from './components/ProjectVault';
import { CareerLog } from './components/CareerLog';
import { BriefcaseContact } from './components/BriefcaseContact';
import { LoadingScreen } from './components/LoadingScreen';
import { AchievementArchive } from './components/AchievementArchive';
import { useEffect, useState, createContext, useContext } from 'react';
import { Activity, Mail, Github, Linkedin, Award } from 'lucide-react';
import portfolioData from '../data/config.json';

// Create a context to share the loaded state
export const AppContext = createContext({ isLoaded: false });

const socialIconMap: Record<string, any> = {
  github: <Github size={12} />,
  linkedin: <Linkedin size={12} />,
  email: <Mail size={12} />
};

export default function AppRoot() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { socials } = portfolioData;

  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
    // We'll let LoadingScreen trigger this, but as a safety:
    const timer = setTimeout(() => setIsLoaded(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AppContext.Provider value={{ isLoaded }}>
      <div id="top" className="relative min-h-screen selection:bg-[var(--cyan-dim)] selection:text-[var(--cyan)] font-sans overflow-x-hidden">
        <LoadingScreen onComplete={() => setIsLoaded(true)} />
        
        <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03] bg-blueprint" />
        
        <Navbar />
        
        <main className="relative z-10 flex flex-col pb-32">
          <TechNoirHero />
          <ArenaSection />
          <TechStackMatrix />
          <ProjectVault />
          <AchievementArchive />
          <CareerLog />
          <BriefcaseContact />
        </main>

        <footer className="relative z-10 py-32 px-6 max-w-7xl mx-auto border-t" style={{ borderColor: 'var(--border-color)' }}>
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-3 mb-4">
                <Activity size={16} className="text-[var(--cyan)] animate-pulse" />
                <h2 className="text-xs font-mono tracking-[0.4em] uppercase" style={{ color: 'var(--cyan)' }}>
                  System_Terminal
                </h2>
              </div>
            </div>
            
            <div className="flex flex-col items-start md:items-end gap-6 font-mono w-full md:w-auto">
              <div className="flex flex-wrap gap-4 md:gap-8 mb-2">
                {socials.map((social) => (
                  <a 
                    key={social.platform}
                    href={social.url} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-2 text-[10px] tracking-widest hover:text-[var(--cyan)] transition-colors uppercase"
                  >
                    {socialIconMap[social.platform] || <Activity size={12} />} 
                    {social.label}
                  </a>
                ))}
              </div>
              <div className="text-[10px] tracking-[0.3em] uppercase opacity-50" style={{ color: 'var(--fg)' }}>
                &copy; 2026 iAmRupamRoyy_Archives
              </div>
              <div className="flex flex-wrap gap-6 text-[10px] tracking-widest">
                 <span className="flex items-center gap-2" style={{ color: 'var(--green)' }}>
                   <div className="w-1.5 h-1.5 rounded-full bg-[var(--green)] animate-pulse" />
                   SERVER_ONLINE
                 </span>
                 <span style={{ color: 'var(--fg-muted)' }}>V2.4.12_STABLE</span>
                 <span style={{ color: 'var(--fg-muted)' }}>NODE_OS_LINUX</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </AppContext.Provider>
  );
}
