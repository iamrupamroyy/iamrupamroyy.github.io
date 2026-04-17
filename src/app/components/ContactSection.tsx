import { motion, useAnimationFrame } from 'motion/react';
import { useRef } from 'react';
import { Mail, Send, MapPin, ExternalLink, Github, Linkedin, Twitter } from 'lucide-react';

export const ContactSection = () => {
  return (
    <section id="contact" className="relative py-32 px-6 max-w-6xl mx-auto border-t border-white/5">
      <div className="mb-20">
        <h2 className="text-sm font-mono text-[#BB86FC] tracking-widest uppercase mb-2">06. Network</h2>
        <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tighter" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Communication Hub.
        </h3>
      </div>

      <div className="flex flex-col lg:flex-row gap-16">
        {/* Contact Form */}
        <div className="w-full lg:w-1/2">
          <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-mono text-gray-400 uppercase tracking-wider">Identity</label>
              <input 
                type="text" 
                id="name"
                className="bg-[#0A0E17] border-b border-white/20 focus:border-[#00FFFF] py-3 text-white outline-none transition-colors text-lg font-light placeholder-gray-600"
                placeholder="Name or Alias"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-mono text-gray-400 uppercase tracking-wider">Signal Frequency (Email)</label>
              <input 
                type="email" 
                id="email"
                className="bg-[#0A0E17] border-b border-white/20 focus:border-[#BB86FC] py-3 text-white outline-none transition-colors text-lg font-light placeholder-gray-600"
                placeholder="your@frequency.com"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-mono text-gray-400 uppercase tracking-wider">Transmission</label>
              <textarea 
                id="message"
                rows={4}
                className="bg-[#0A0E17] border-b border-white/20 focus:border-[#00FFFF] py-3 text-white outline-none transition-colors text-lg font-light placeholder-gray-600 resize-none"
                placeholder="Transmit your message..."
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4 flex items-center justify-center gap-3 bg-white/5 border border-white/20 hover:border-[#00FFFF]/50 hover:bg-[#00FFFF]/5 text-white py-4 px-8 uppercase tracking-widest font-mono text-sm transition-all min-h-[44px]"
            >
              Initialize Handshake <Send size={16} />
            </motion.button>
          </form>
        </div>

        {/* Contact Info & 3D Matrix */}
        <div className="w-full lg:w-1/2 flex flex-col items-start lg:items-end lg:text-right gap-12">
          <div className="flex flex-col gap-6">
            <div className="flex items-center lg:flex-row-reverse gap-4 group">
              <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center text-[#00FFFF] group-hover:bg-[#00FFFF]/10 transition-colors">
                <Mail size={20} />
              </div>
              <div>
                <div className="text-xs font-mono text-gray-400 mb-1">Direct Ping</div>
                <div className="text-lg text-white font-medium hover:text-[#00FFFF] transition-colors cursor-pointer" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  alex.chen@quantum-nexus.ai
                </div>
              </div>
            </div>
            
            <div className="flex items-center lg:flex-row-reverse gap-4 group">
              <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center text-[#BB86FC] group-hover:bg-[#BB86FC]/10 transition-colors">
                <MapPin size={20} />
              </div>
              <div>
                <div className="text-xs font-mono text-gray-400 mb-1">Physical Node</div>
                <div className="text-lg text-white font-medium hover:text-[#BB86FC] transition-colors cursor-pointer" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  IIT Bhilai, India (Earth)
                </div>
              </div>
            </div>
          </div>

          <div className="relative w-full max-w-[300px] h-[300px] mt-auto">
            <MatrixCube />
          </div>
        </div>
      </div>
    </section>
  );
};

const MatrixCube = () => {
  const cubeRef = useRef<HTMLDivElement>(null);

  useAnimationFrame((time) => {
    if (cubeRef.current) {
      cubeRef.current.style.transform = `rotateX(${time * 0.02}deg) rotateY(${time * 0.03}deg)`;
    }
  });

  const socials = [
    { icon: <Github size={24} />, url: "#", label: "GitHub" },
    { icon: <Linkedin size={24} />, url: "#", label: "LinkedIn" },
    { icon: <Twitter size={24} />, url: "#", label: "Twitter" },
    { icon: <ExternalLink size={24} />, url: "#", label: "Scholar" },
  ];

  return (
    <div className="w-full h-full flex items-center justify-center" style={{ perspective: "1000px" }}>
      <div 
        ref={cubeRef} 
        className="relative w-40 h-40"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="absolute inset-0 flex items-center justify-center border border-[#00FFFF]/30 bg-[#00FFFF]/5 backdrop-blur-md" style={{ transform: "translateZ(80px)" }}>
          <a href={socials[0].url} className="text-white hover:text-[#00FFFF] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label={socials[0].label}>{socials[0].icon}</a>
        </div>
        <div className="absolute inset-0 flex items-center justify-center border border-[#BB86FC]/30 bg-[#BB86FC]/5 backdrop-blur-md" style={{ transform: "rotateY(180deg) translateZ(80px)" }}>
          <a href={socials[1].url} className="text-white hover:text-[#BB86FC] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label={socials[1].label}>{socials[1].icon}</a>
        </div>
        <div className="absolute inset-0 flex items-center justify-center border border-[#00FFFF]/30 bg-[#00FFFF]/5 backdrop-blur-md" style={{ transform: "rotateY(90deg) translateZ(80px)" }}>
          <a href={socials[2].url} className="text-white hover:text-[#00FFFF] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label={socials[2].label}>{socials[2].icon}</a>
        </div>
        <div className="absolute inset-0 flex items-center justify-center border border-[#BB86FC]/30 bg-[#BB86FC]/5 backdrop-blur-md" style={{ transform: "rotateY(-90deg) translateZ(80px)" }}>
          <a href={socials[3].url} className="text-white hover:text-[#BB86FC] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label={socials[3].label}>{socials[3].icon}</a>
        </div>
        <div className="absolute inset-0 border border-white/10 bg-transparent" style={{ transform: "rotateX(90deg) translateZ(80px)" }} />
        <div className="absolute inset-0 border border-white/10 bg-transparent" style={{ transform: "rotateX(-90deg) translateZ(80px)" }} />
      </div>
    </div>
  );
};
