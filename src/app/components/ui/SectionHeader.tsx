import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  icon: LucideIcon;
  sectionNum: string;
  title: string;
  subtitle: string;
  color?: string;
}

export const SectionHeader = ({ icon: Icon, sectionNum, title, subtitle, color = 'var(--cyan)' }: SectionHeaderProps) => {
  return (
    <div className="relative z-10 mb-20">
      <div className="flex items-center gap-3 mb-4">
        <Icon size={16} style={{ color }} className="animate-pulse" />
        <h2 className="text-xs font-mono tracking-[0.4em] uppercase" style={{ color: 'var(--stroke-color)' }}>
          {sectionNum}_{subtitle}
        </h2>
      </div>
      <motion.h3 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-5xl md:text-8xl font-heading font-extrabold tracking-tighter uppercase leading-[0.85]" 
        style={{ color: 'var(--fg)' }}
      >
        {title}<br />
        <span style={{ WebkitTextStroke: '1px var(--stroke-color)', color: 'var(--fill-dim)' }}>
          Archive.
        </span>
      </motion.h3>
    </div>
  );
};
