import { Github, Linkedin, Mail, FileDown } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./ui_components/ImageWithFallback";
import { motion } from "motion/react";
// TODO: Replace this with your actual profile picture
import heroImage from "../../assets/images/hero-image.jpeg";
import resume from "../../assets/resume/Rupam_Roy_Resume.pdf";

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 transition-colors">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <motion.div 
            className="text-center lg:text-left order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1 
              className="mb-4 text-slate-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Hi, I'm <span className="text-blue-600 dark:text-blue-400">Rupam Roy</span>
            </motion.h1>
            <motion.h2 
              className="text-slate-700 dark:text-slate-300 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              MTech CSE | Indian Institute of Technology, Bhilai
            </motion.h2>
            <motion.p 
              className="text-slate-600 dark:text-slate-400 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              I am currently pursuing a Master of Technology (M.Tech) in Computer Science and Engineering at the prestigious IIT Bhilai, with a specialization in High-Performance Computing.
My advanced academic work focuses on Parallel GPU Architectures and the application of Graph Neural Networks (GNNs) to accelerate data-intensive research. Backed by a strong foundation in core computer science and competitive programming, I strive to engineer scalable, high-performance solutions for complex computational challenges.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <a href={resume} download>
                <Button className="gap-2 hover:scale-105 transition-transform">
                  <FileDown className="size-4" />
                  Download Resume
                </Button>
              </a>
              <a href="mailto:iamrupamroyy@gmail.com">
                <Button variant="outline" className="gap-2 hover:scale-105 transition-transform">
                  <Mail className="size-4" />
                  Contact Me
                </Button>
              </a>
            </motion.div>
            
            <motion.div 
              className="flex gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <motion.a 
                href="https://github.com/iamrupamroyy" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github className="size-6" />
              </motion.a>
              <motion.a 
                href="https://linkedin.com/in/iamrupamroyy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin className="size-6" />
              </motion.a>
              <motion.a 
                href="mailto:iamrupamroyy@gmail.com"
                className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail className="size-6" />
              </motion.a>
            </motion.div>
          </motion.div>
          
          {/* Right side - Profile photo */}
          <motion.div 
            className="flex justify-center lg:justify-end order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <motion.div 
                className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-white dark:border-slate-700 shadow-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ImageWithFallback
                  src={heroImage}
                  alt="Profile photo"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              {/* Decorative elements */}
              <motion.div 
                className="absolute -z-10 top-4 -right-4 w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 bg-blue-200 dark:bg-blue-900 rounded-full opacity-50"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              ></motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}