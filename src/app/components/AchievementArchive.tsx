import { motion } from 'motion/react';
import { Award, Trophy, Zap, Star, ShieldCheck } from 'lucide-react';
import { SectionHeader } from './ui/SectionHeader';
import portfolioData from '../../data/config.json';

const iconMap: Record<string, any> = {
  Trophy: <Trophy size={22} />,
  Zap: <Zap size={22} />,
  Star: <Star size={22} />,
  Award: <Award size={22} />
};

export const AchievementArchive = () => {
  const { achievements } = portfolioData;

  return (
    <section id="achievements" className="relative py-32 px-6 max-w-7xl mx-auto border-t overflow-hidden" style={{ borderColor: 'var(--border-color)' }}>
      <SectionHeader 
        icon={ShieldCheck} 
        sectionNum="04" 
        title="Honors" 
        subtitle="ACCOMPLISHMENT_LOG"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {achievements.map((item: any, idx: number) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group relative"
          >
            <div className="relative h-full p-8 border border-white/10 bg-white/[0.01] backdrop-blur-md transition-all duration-500 group-hover:bg-white/[0.04] group-hover:border-white/20">
              <div className="absolute top-0 left-0 w-full h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
                <div className="w-full h-full animate-[shimmer_2s_infinite]" style={{ backgroundColor: item.color }} />
              </div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-10">
                  <div 
                    className="w-12 h-12 border flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                    style={{ color: item.color, borderColor: `${item.color}44` }}
                  >
                    {iconMap[item.icon] || <Award size={22} />}
                  </div>
                  <div className="font-mono text-[10px] opacity-20 uppercase tracking-[0.3em]" style={{ color: 'var(--fg)' }}>
                    V_0{idx + 1}
                  </div>
                </div>

                <h4 className="text-xl font-heading font-extrabold uppercase tracking-tight mb-4" style={{ color: 'var(--fg)' }}>
                  {item.title}
                </h4>
                
                <p className="text-sm font-mono leading-relaxed opacity-50" style={{ color: 'var(--fg)' }}>
                  {item.details}
                </p>

                <div className="mt-auto pt-8 flex items-center justify-between">
                   <div className="h-px flex-1 bg-white/5" />
                   <span className="ml-4 font-mono text-[8px] tracking-[0.3em] uppercase opacity-20" style={{ color: 'var(--fg)' }}>Secure_Verify</span>
                </div>
              </div>

              <div className="absolute bottom-0 right-0 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity">
                 <div className="absolute bottom-1 right-1 w-1 h-1 rounded-full" style={{ backgroundColor: item.color }} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
};
