import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Radio, Send, CheckCircle2, Terminal, ShieldCheck, ChevronDown, Minus, ArrowLeft, ArrowRight, Home } from 'lucide-react';
import { SectionHeader } from './ui/SectionHeader';
import { RouteLoader } from './RouteLoader';
import { Link } from 'react-router';
import portfolioData from '../../data/config.json';
import wallData from '../../data/wall.json';

const ACCENT_COLORS = ['#00F2FF', '#00FF41', '#FF79C6', '#BD93F9', '#FFB86C', '#FF5555'];

export const SignalArchive = () => {
  const [formData, setFormData] = useState({ name: '', handle: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [isPromptOpen, setIsPromptOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSwitching, setIsSwitching] = useState(true);
  const messagesPerPage = 10;
  const MAX_CHARS = 500;

  const sortedSignals = [...wallData].reverse();

  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = sortedSignals.slice(indexOfFirstMessage, indexOfLastMessage);
  const totalPages = Math.ceil(sortedSignals.length / messagesPerPage);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.message.length > MAX_CHARS) return;
    setStatus('submitting');
    
    try {
      await fetch(`https://formspree.io/f/${portfolioData.formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'SIGNAL_ENTRY_VERIFY',
          ...formData
        }),
      });
      setStatus('success');
      setFormData({ name: '', handle: '', message: '' });
      setTimeout(() => setStatus('idle'), 8000);
    } catch (error) {
      setStatus('idle');
    }
  };

  const getAccentColor = (id: number) => {
    return ACCENT_COLORS[id % ACCENT_COLORS.length];
  };

  return (
    <>
      <RouteLoader onComplete={() => setIsSwitching(false)} />
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isSwitching ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen pt-32 pb-32 px-6 max-w-7xl mx-auto flex flex-col gap-12"
      >
        {/* Navigation Back Button */}
        <Link 
          to="/" 
          className="group flex items-center gap-3 w-fit px-6 py-3 border border-[var(--border-color)] bg-[var(--card-bg)] hover:border-[var(--cyan)] hover:bg-[var(--cyan-dim)] transition-all duration-300"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform text-[var(--cyan)]" />
          <span className="font-mono text-xs font-bold tracking-[0.3em] uppercase" style={{ color: 'var(--fg)' }}>Back_to_Mainframe</span>
        </Link>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div className="flex-1">
            <SectionHeader 
              icon={Radio} 
              sectionNum="ARC" 
              title="Signals" 
              subtitle="COMMUNITY_WALL"
            />
            <div className="p-4 border-l-2 border-[var(--cyan-dim)] bg-[var(--card-bg)] max-w-xl">
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--fg-muted)' }}>
                &gt; STATUS: Public_Access_Open<br/>
                &gt; DIRECTIVE: Share your remarks below. A valid contact ID is required for verification protocols.
              </p>
            </div>
          </div>

          {/* Browser-style Tab Prompt */}
          <div className="w-full md:w-[400px] z-30">
            <div className="border border-[var(--border-color)] bg-black shadow-2xl overflow-hidden flex flex-col transition-all">
              <div className="flex items-center justify-between px-4 py-2 bg-[#1a1a1a] border-b border-[var(--border-color)] select-none">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                  </div>
                  <div className="px-3 py-1 bg-black border-x border-[var(--border-color)] font-mono text-[9px] text-[var(--cyan)] flex items-center gap-2 uppercase tracking-tighter">
                    <Terminal size={10} /> initiate_signal.sh
                  </div>
                </div>
                <button 
                  onClick={() => setIsPromptOpen(!isPromptOpen)}
                  className="p-1 text-white/40 hover:text-white transition-colors"
                >
                  {isPromptOpen ? <Minus size={14} /> : <ChevronDown size={14} />}
                </button>
              </div>

              <AnimatePresence>
                {isPromptOpen && (
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4 relative">
                      <AnimatePresence>
                        {status === 'success' && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black p-6 text-center border-t border-[var(--green)]"
                          >
                            <CheckCircle2 size={32} className="text-[var(--green)] mb-3" />
                            <h5 className="text-sm font-bold uppercase text-white mb-2 tracking-widest">Signal Received</h5>
                            <p className="text-[9px] font-mono text-white/50 leading-relaxed uppercase tracking-tighter max-w-[250px]">
                              Transmission queued for verification. Rupam will contact you if approval is required.
                            </p>
                            <button onClick={() => setStatus('idle')} className="mt-6 text-[8px] border border-white/20 px-4 py-1.5 hover:bg-white/5 uppercase tracking-widest text-white transition-all">Return_Prompt</button>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <span className="text-[8px] font-mono text-[var(--cyan)] opacity-50 uppercase tracking-widest">Name_IDENT</span>
                          <input 
                            type="text" required
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            placeholder="USER_NAME"
                            className="bg-white/5 border border-white/10 p-2 font-mono text-[10px] outline-none focus:border-[var(--cyan)] text-white uppercase"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <span className="text-[8px] font-mono text-[var(--cyan)] opacity-50 uppercase tracking-widest">Inbound_Auth_ID</span>
                          <input 
                            type="text" required
                            value={formData.handle}
                            onChange={(e) => setFormData({...formData, handle: e.target.value})}
                            placeholder="EMAIL_OR_SOCIAL"
                            className="bg-white/5 border border-white/10 p-2 font-mono text-[10px] outline-none focus:border-[var(--cyan)] text-white"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between items-center">
                          <span className="text-[8px] font-mono text-[var(--cyan)] opacity-50 uppercase tracking-widest">Signal_Payload</span>
                          <span className={`text-[8px] font-mono ${formData.message.length > MAX_CHARS ? 'text-red-500' : 'opacity-30'}`}>
                            {formData.message.length}/{MAX_CHARS}
                          </span>
                        </div>
                        <textarea 
                          required rows={3}
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          placeholder="MESSAGE_CONTENT..."
                          className="bg-white/5 border border-white/10 p-3 font-mono text-[10px] outline-none focus:border-[var(--cyan)] text-white resize-none"
                        />
                      </div>

                      <button 
                        type="submit"
                        disabled={status !== 'idle' || formData.message.length > MAX_CHARS}
                        className="py-3 bg-white/5 border border-white/10 text-white font-bold text-[10px] tracking-[0.4em] flex items-center justify-center gap-3 hover:bg-[var(--cyan)] hover:text-black transition-all disabled:opacity-50 active:scale-95"
                      >
                        {status === 'submitting' ? (
                          <div className="animate-spin h-3 w-3 border-2 border-current border-t-transparent rounded-full" />
                        ) : <Send size={12} />}
                        {status === 'submitting' ? 'UPLOADING' : 'EXECUTE'}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="columns-1 md:columns-2 gap-6 space-y-6">
            {currentMessages.map((signal: any, idx: number) => {
              const accentColor = getAccentColor(signal.id || idx);
              return (
                <motion.div
                  key={`${signal.id}-${idx}`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="break-inside-avoid p-8 border border-[var(--border-color)] transition-all duration-500 relative group mb-6 hover:shadow-[0_0_30px_rgba(0,0,0,0.3)]"
                  style={{ backgroundColor: 'var(--card-bg)', borderLeftColor: accentColor }}
                >
                  <div className="absolute top-0 left-0 w-1 h-full transition-all duration-300" style={{ backgroundColor: accentColor }} />
                  
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b pb-4" style={{ borderColor: 'var(--border-color)' }}>
                      <div className="flex flex-col">
                        <span className="text-base font-heading font-black uppercase tracking-tight" style={{ color: 'var(--fg)' }}>
                          {signal.name}
                        </span>
                        {signal.url ? (
                          <a 
                            href={signal.url} 
                            target="_blank" 
                            rel="noreferrer"
                            className="font-mono text-[9px] tracking-widest hover:underline transition-all"
                            style={{ color: accentColor }}
                          >
                            {signal.handle}
                          </a>
                        ) : (
                          <span className="font-mono text-[9px] tracking-widest opacity-50" style={{ color: accentColor }}>
                            {signal.handle}
                          </span>
                        )}
                      </div>
                      <div className="font-mono text-[9px] uppercase tracking-widest opacity-30" style={{ color: 'var(--fg)' }}>
                        {signal.timestamp}
                      </div>
                    </div>

                    <p className="font-mono text-sm leading-relaxed opacity-70 italic whitespace-pre-wrap break-words" style={{ color: 'var(--fg)' }}>
                      "{signal.message}"
                    </p>

                    <div className="flex justify-end pt-2">
                      <div className="flex items-center gap-2 text-[8px] font-mono opacity-20 uppercase tracking-[0.4em]" style={{ color: 'var(--fg)' }}>
                          <ShieldCheck size={10} style={{ color: accentColor }} /> Verified_Signal
                      </div>
                  </div>
                </div>
              </motion.div>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="mt-16 flex justify-center items-center gap-6">
              <button 
                disabled={currentPage === 1}
                onClick={() => {
                  setCurrentPage(p => p - 1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-4 border border-[var(--border-color)] disabled:opacity-10 hover:bg-[var(--card-bg)] transition-all text-[var(--fg)]"
              >
                <ArrowLeft size={18} />
              </button>
              <span className="font-mono text-[11px] tracking-[0.4em] opacity-40 uppercase" style={{ color: 'var(--fg)' }}>
                Log_{currentPage}_Of_{totalPages}
              </span>
              <button 
                disabled={currentPage === totalPages}
                onClick={() => {
                  setCurrentPage(p => p + 1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-4 border border-[var(--border-color)] disabled:opacity-10 hover:bg-[var(--card-bg)] transition-all text-[var(--fg)]"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};
