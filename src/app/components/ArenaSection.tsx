import { motion } from 'motion/react';
import { Activity, ExternalLink, User, Target, CheckCircle2, Shield, BarChart, Clock, AlertCircle, Award } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SectionHeader } from './ui/SectionHeader';
import portfolioData from '../../data/config.json';
import statsData from '../../data/stats.json';

const PLATFORMS = portfolioData.cpPlatforms;

export const ArenaSection = () => {
  const [data, setData] = useState<any[]>([]);
  const lastSync = (statsData as any).lastUpdated;

  useEffect(() => {
    const initial = PLATFORMS.map(p => {
      const cached = (statsData as any)[p.id];
      const isFallback = !cached;
      
      return {
        ...p,
        rank: cached?.rank || p.backupRank,
        rating: cached?.lastSolved?.replace('Rating: ', '') || p.backupSolved?.replace('Rating: ', ''),
        lastSolved: cached?.lastSolved || p.backupSolved,
        dataSource: isFallback ? 'FALLBACK_MODE' : 'SYNCED_LIVE',
        isLive: !isFallback
      };
    });
    setData(initial);
  }, []);

  return (
    <section id="arena" className="relative py-32 px-6 max-w-7xl mx-auto border-t" style={{ borderColor: 'var(--border-color)' }}>
      <SectionHeader 
        icon={Target} 
        sectionNum="01" 
        title="Arena" 
        subtitle="COMPETITIVE_METRICS"
      />
      
      <div className="flex flex-col md:flex-row justify-end items-end md:items-center gap-4 mb-16">
        {lastSync && (
          <div className="flex items-center gap-2 font-mono text-[9px] opacity-40 uppercase tracking-widest">
            <Clock size={10} /> Node_Sync: {new Date(lastSync).toLocaleString()}
          </div>
        )}
        <div className="flex items-center gap-3 font-mono text-[10px] border px-4 py-2 bg-[var(--card-bg)]" style={{ borderColor: 'var(--border-color)' }}>
          <CheckCircle2 size={12} className="text-[var(--green)]" />
          <span style={{ color: 'var(--green)' }} className="tracking-[0.2em]">
            OS_INTEGRITY_STABLE
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        {data.map((board, i) => (
          <ScoreboardCard key={board.id} data={board} index={i} />
        ))}
      </div>
    </section>
  );
};

const ScoreboardCard = ({ data, index }: { data: any, index: number }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex flex-col border bg-white/[0.01] transition-all duration-500 hover:bg-white/[0.03] group overflow-hidden"
      style={{ borderColor: 'var(--border-color)' }}
    >
      {/* Platform Header */}
      <div className="p-6 border-b flex justify-between items-center" style={{ borderColor: 'var(--border-color)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
        <div className="flex items-center gap-3">
           <div className="w-2 h-2 rounded-full" style={{ backgroundColor: data.color, boxShadow: `0 0 10px ${data.color}` }} />
           <h4 className="text-xl font-heading font-extrabold uppercase tracking-tight" style={{ color: 'var(--fg)' }}>{data.name}</h4>
        </div>
        <div className={`px-2 py-0.5 border font-mono text-[8px] tracking-widest uppercase ${data.isLive ? 'border-[var(--green)] text-[var(--green)]' : 'border-[#e06c75] text-[#e06c75]'}`}>
          {data.dataSource}
        </div>
      </div>

      <div className="p-8 flex flex-col gap-8 flex-1">
         {/* Profile Link */}
         <div className="flex flex-col gap-1">
            <span className="text-[9px] font-mono opacity-30 uppercase tracking-widest">Authenticated_Identity</span>
            <a href={data.url} target="_blank" rel="noreferrer" className="text-lg font-mono font-bold flex items-center gap-2 hover:text-[var(--cyan)] transition-colors" style={{ color: 'var(--fg)' }}>
              &gt; {data.username} <ExternalLink size={12} className="opacity-20" />
            </a>
         </div>

         {/* Visual Badge Display */}
         <div className="relative py-4 flex flex-col items-center justify-center border border-dashed p-6 bg-white/[0.02]" style={{ borderColor: 'var(--border-color)' }}>
            <div className="absolute top-2 right-2"><Award size={14} style={{ color: data.color }} className="opacity-40" /></div>
            
            <div className="text-[10px] font-mono opacity-30 uppercase tracking-[0.4em] mb-2">Class_Designation</div>
            <div className="text-2xl font-heading font-black uppercase tracking-tighter text-center" style={{ color: 'var(--fg)' }}>
               {data.rank.split('(')[0].trim()}
            </div>
            {data.rank.includes('(') && (
               <div className="mt-1 font-mono text-sm font-bold" style={{ color: data.color }}>
                  {data.rank.match(/\(([^)]+)\)/)?.[0]}
               </div>
            )}
         </div>

         {/* Detailed Metrics */}
         <div className="grid grid-cols-2 gap-4">
            <div className="p-3 border border-white/5 bg-black/20 flex flex-col gap-1">
               <span className="text-[8px] font-mono opacity-30 uppercase">Metric</span>
               <span className="text-xs font-mono font-bold" style={{ color: 'var(--fg)' }}>RATING_ID</span>
            </div>
            <div className="p-3 border border-white/5 bg-black/20 flex flex-col gap-1 text-right">
               <span className="text-[8px] font-mono opacity-30 uppercase">Value</span>
               <span className="text-xs font-mono font-bold" style={{ color: data.color }}>{data.rating || 'N/A'}</span>
            </div>
         </div>

         {/* Footer Activity */}
         <div className="mt-auto pt-6 border-t flex items-center justify-between font-mono text-[9px] opacity-40 uppercase tracking-[0.2em]" style={{ borderColor: 'var(--border-color)', color: 'var(--fg)' }}>
            <div className="flex items-center gap-2">
               <Activity size={10} className="animate-pulse" />
               {data.lastSolved}
            </div>
         </div>
      </div>

      {/* Shimmer Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
         <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_3s_infinite]" />
      </div>
    </motion.div>
  );
};
