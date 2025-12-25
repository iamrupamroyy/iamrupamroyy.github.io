import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { motion } from "motion/react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="mb-2">Rupam Roy</h3>
            <p className="text-slate-400 text-sm sm:text-base">MTech CSE | IIT Bhilai</p>
          </div>
          
          <div className="flex gap-6">
            {[
              { icon: Github, href: "https://github.com/iamrupamroyy" },
              { icon: Linkedin, href: "https://linkedin.com/in/iamrupamroyy" },
              { icon: Mail, href: "mailto:iamrupamroyy@gmail.com" }
            ].map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={index}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-slate-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="size-6" />
                </motion.a>
              );
            })}
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-slate-800 text-center text-slate-400 text-sm">
          <p>&copy; {currentYear} Rupam Roy. All rights reserved. Built with passion and code.</p>
        </div>
      </div>
    </footer>
  );
}