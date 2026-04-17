import { motion } from 'motion/react';
import { Activity, ExternalLink, User, Target, CheckCircle2, Shield, BarChart, Clock } from 'lucide-react';
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
      return {
        ...p,
        rank: cached?.rank || p.backupRank,
        percent: cached?.percent || parseFloat(p.backupPercent),
        lastSolved: cached?.lastSolved || p.backupSolved,
        isLive: !!cached
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
            <Clock size={10} /> Last_Sync: {new Date(lastSync).toLocaleString()}
          </div>
        )}
        <div className="flex items-center gap-3 font-mono text-[10px] border px-4 py-2 bg-[var(--card-bg)]" style={{ borderColor: 'var(--border-color)' }}>
          <CheckCircle2 size={12} className="text-[var(--green)]" />
          <span style={{ color: 'var(--green)' }} className="tracking-[0.2em]">
            SYSTEM_SYNC_STABLE
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
  // Determine the correct label based on platform
  const metricLabel = data.id === 'leetcode' ? 'Percentile' : 'Skill_Index';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex flex-col border bg-white/[0.01] transition-all duration-500 hover:bg-white/[0.03] group overflow-hidden"
      style={{ borderColor: 'var(--border-color)' }}
    >
      <div className="p-6 border-b flex justify-between items-center" style={{ borderColor: 'var(--border-color)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
        <div className="flex items-center gap-3">
           <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: data.color }} />
           <h4 className="text-xl font-heading font-extrabold uppercase tracking-tight" style={{ color: 'var(--fg)' }}>{data.name}</h4>
        </div>
        <div className="font-mono text-[9px] opacity-40 uppercase tracking-[0.2em]">{data.id}</div>
      </div>

      <div className="p-8 flex flex-col gap-8 flex-1">
         
         <div className="flex flex-col gap-1">
            <span className="text-[9px] font-mono opacity-30 uppercase tracking-widest">Authorized_User</span>
            <a 
              href={data.url} 
              target="_blank" 
              rel="noreferrer" 
              className="text-lg font-mono font-bold flex items-center gap-2 hover:text-[var(--cyan)] transition-colors"
              style={{ color: 'var(--fg)' }}
            >
              &gt; {data.username} <ExternalLink size={12} className="opacity-20" />
            </a>
         </div>

         <div className="flex items-center justify-center py-4">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="72" cy="72" r="64" fill="none" strokeWidth="2" stroke="var(--border-color)" className="opacity-10" />
                <motion.circle 
                  cx="72" cy="72" r="64" fill="none" strokeWidth="4" 
                  stroke={data.color}
                  strokeLinecap="butt"
                  strokeDasharray={402} /* 2 * PI * 64 */
                  initial={{ strokeDashoffset: 402 }}
                  animate={{ strokeDashoffset: 402 - (402 * (data.percent || 0)) / 100 }}
                  transition={{ duration: 2, delay: 0.5 }}
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-bold font-mono tracking-tighter" style={{ color: 'var(--fg)' }}>{Math.round(data.percent || 0)}%</span>
                <span className="text-[8px] font-mono uppercase tracking-[0.2em] opacity-40" style={{ color: 'var(--fg)' }}>{metricLabel}</span>
              </div>
            </div>
         </div>

         <div className="text-center font-mono font-bold tracking-widest text-xs z-10 p-4 border border-dashed transition-all group-hover:border-[var(--cyan)]" style={{ color: 'var(--fg)', borderColor: 'var(--border-color)' }}>
           {data.rank}
         </div>

         <div className="mt-auto pt-8 border-t flex flex-col gap-2" style={{ borderColor: 'var(--border-color)' }}>
            <div className="flex items-center justify-between text-[10px] font-mono">
               <span className="opacity-40 uppercase">Activity_Log:</span>
               <span style={{ color: data.color }}>{data.lastSolved}</span>
            </div>
         </div>
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
         <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_3s_infinite]" />
      </div>
    </motion.div>
  );
};
