import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Terminal as TerminalIcon, Mail, CheckCircle2, AlertCircle, Clock, RefreshCcw } from 'lucide-react';
import { SectionHeader } from './ui/SectionHeader';
import portfolioData from '../../data/config.json';

export const BriefcaseContact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error' | 'cooldown'>('idle');
  
  useEffect(() => {
    const lastSent = localStorage.getItem('form_last_sent');
    if (lastSent) {
      const hoursPassed = (Date.now() - parseInt(lastSent)) / (1000 * 60 * 60);
      if (hoursPassed < 2) setStatus('cooldown');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'cooldown') {
      const subject = `Direct Transmission from ${formData.name || 'Portfolio'}`;
      window.location.href = `mailto:${portfolioData.profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(formData.message)}`;
      return;
    }
    
    setStatus('submitting');
    
    try {
      const response = await fetch(`https://formspree.io/f/${portfolioData.formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        localStorage.setItem('form_last_sent', Date.now().toString());
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="relative py-32 px-6 max-w-7xl mx-auto border-t" style={{ borderColor: 'var(--border-color)' }}>
      <SectionHeader 
        icon={Mail} 
        sectionNum="06" 
        title="Terminal" 
        subtitle="INBOUND_TRANSMISSION"
      />

      <div className="relative border rounded-none overflow-hidden font-mono shadow-2xl max-w-4xl" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
        <div className="flex items-center gap-2 px-4 py-2 border-b" style={{ borderColor: 'var(--border-color)', backgroundColor: 'rgba(0,0,0,0.1)' }}>
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-4 text-xs tracking-widest opacity-40">initiate_contact.js</span>
        </div>

        <div className="flex">
          <div className="hidden sm:flex flex-col px-4 py-6 text-right text-xs border-r select-none opacity-20" style={{ color: 'var(--fg)', borderColor: 'var(--border-color)' }}>
            {[...Array(18)].map((_, i) => <span key={i} className="leading-6">{i + 1}</span>)}
          </div>

          <form className="flex-1 p-6 text-sm md:text-base leading-6 relative overflow-hidden" style={{ color: 'var(--fg)' }} onSubmit={handleSubmit}>
            <AnimatePresence>
              {status === 'success' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[var(--bg)] p-8 text-center border-2 border-[var(--green)]">
                  <CheckCircle2 size={48} className="text-[var(--green)] mb-4 animate-bounce" />
                  <h4 className="text-xl font-heading font-extrabold uppercase tracking-widest mb-2">Transmission Sent</h4>
                  <p className="text-xs opacity-50 font-mono">ENCRYPTED_PACKET_RECEIVED_BY_COMMAND</p>
                  <button onClick={() => setStatus('idle')} className="mt-6 text-[10px] border px-4 py-2 hover:bg-white/5 uppercase tracking-widest">OK_Return</button>
                </motion.div>
              )}
            </AnimatePresence>

            <div><span style={{ color: '#c678dd' }}>const</span> <span style={{ color: '#e5c07b' }}>payload</span> = {'{'}</div>
            <div className="pl-8 flex items-center group">
              <span style={{ color: '#e06c75' }}>sender</span>: <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="ml-2 bg-transparent border-none outline-none w-full focus:bg-white/5" style={{ color: 'var(--green)' }} placeholder='"Name"' />
              <span className="opacity-40">,</span>
            </div>
            <div className="pl-8 flex items-center group">
              <span style={{ color: '#e06c75' }}>origin</span>: <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="ml-2 bg-transparent border-none outline-none w-full focus:bg-white/5" style={{ color: 'var(--green)' }} placeholder='"Email"' />
              <span className="opacity-40">,</span>
            </div>
            <div className="pl-8 flex items-start group">
              <span style={{ color: '#e06c75' }}>message</span>: <span style={{ color: 'var(--green)', marginLeft: '8px' }}>`</span>
              <textarea rows={2} required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="bg-transparent border-none outline-none w-full resize-none focus:bg-white/5" style={{ color: 'var(--green)' }} placeholder="Enter transmission..." />
              <span style={{ color: 'var(--green)' }}>`</span>
            </div>
            <div>{'}'};</div>
            
            <div className="mt-4 opacity-80">
              <span style={{ color: '#c678dd' }}>await</span> <span style={{ color: '#61afef' }}>fetch</span>(<span style={{ color: 'var(--green)' }}>'/api/transmit'</span>, {'{'}
              <div className="pl-8"><span style={{ color: '#e06c75' }}>method</span>: <span style={{ color: 'var(--green)' }}>'POST'</span>,</div>
              <div className="pl-8"><span style={{ color: '#e06c75' }}>body</span>: <span style={{ color: '#e5c07b' }}>JSON</span>.<span style={{ color: '#56b6c2' }}>stringify</span>(<span style={{ color: '#e5c07b' }}>payload</span>)</div>
              {'})'};
            </div>
            
            <div className="mt-8 flex justify-end items-center gap-6">
              {status === 'cooldown' && (
                <span className="text-[9px] font-mono text-[var(--green)] animate-pulse hidden sm:inline uppercase tracking-widest">
                  &gt; Fallback_Mode: Mailto
                </span>
              )}
              <button 
                type="submit" 
                className="flex items-center gap-3 px-8 py-3 border font-mono text-xs font-bold tracking-[0.3em] transition-all"
                style={{ 
                  borderColor: status === 'cooldown' ? 'var(--cyan)' : 'var(--green)', 
                  color: status === 'cooldown' ? 'var(--cyan)' : 'var(--green)',
                  backgroundColor: status === 'cooldown' ? 'var(--cyan-dim)' : 'var(--green-dim)' 
                }}
              >
                {status === 'submitting' ? <RefreshCcw size={16} className="animate-spin" /> : status === 'cooldown' ? <Mail size={16} /> : status === 'error' ? <AlertCircle size={16} /> : <TerminalIcon size={16} />}
                {status === 'submitting' ? "UPLOADING..." : status === 'cooldown' ? "USE_MAIL_AGENT" : status === 'error' ? "RETRY_TRANS" : "EXECUTE_SEND"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
