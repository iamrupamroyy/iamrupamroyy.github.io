import { ExternalLink, Github } from "lucide-react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./ui_components/ImageWithFallback";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import project1 from "../../assets/images/project-1.jpg";
import project2 from "../../assets/images/project-2.jpg";
import project3 from "../../assets/images/project-3.jpg";
import project4 from "../../assets/images/project-4.jpg";
import project5 from "../../assets/images/project-5.jpg";
import project6 from "../../assets/images/project-6.jpg";


const projects = [
  {
    title: "Network Science Analysis for Music Artists Collaboration Network",
    description: "Applied Network Science principles and a Graph Attention Network (GAT) to analyze large-scale music artist collaboration graphs. The project successfully predicted trending future collaborations and identified small cultural artist communities for preservation support.",
    image: project1,
    tags: ["Python", "GAT (Graph Attention Network)", "graph-tool", "Scikit-learn", "Network Science"],
    githubUrl: "https://github.com/iamrupamroyy/Music-Artist-Network-Analysis",
    liveUrl: null
  },
  {
    title: "OpenWindow",
    description: "A lightweight social media website where users can chat with multiple people.",
    image: project5,
    tags: ["HTML", "CSS", "React", "TypeScript", "Node.js", "Express", "Socket.io"],
    githubUrl: "https://github.com/iamrupamroyy/OpenWindow",
    liveUrl: "https://openwindow-tycn.onrender.com/"
  },
  {
    title: "watch2gether",
    description: "A full-stack web application that enables users to watch videos with friends online in real time. It provides synchronized playback with minimal delay to ensure a shared viewing experience. Users can create or join rooms and watch videos together through a responsive, real-time system.",
    image: project6,
    tags: ["HTML", "CSS", "React", "Node.js", "Express", "Socket.io"],
    githubUrl: "https://github.com/iamrupamroyy/watch2gether",
    liveUrl: "https://watch2gether-rho.vercel.app/"
  },
  {
    title: "Interactive NLP-Based Voice Assistant",
    description: "Developed an intelligent voice assistant capable of interactive communication and performing complex user tasks. The solution utilizes a supervised model and advanced NLP techniques, showcasing expertise in conversational AI and speech processing systems.",
    image: project2,
    tags: ["Python", "Supervised Learning", "Natural Language Processing (NLP)"],
    githubUrl: null,
    liveUrl: null
  },
  {
    title: "Basic College Management System",
    description: "Implemented a full-stack college management system to centralize student academic profiles and manage essential details like library book issuance, utilizing PHP for backend logic and MySQL for robust database management.",
    image: project3,
    tags: ["MySQL", "PHP", "HTML", "CSS"],
    githubUrl: null,
    liveUrl: null
  },
  {
    title: "Portfolio Website",
    description: "The portfolio you are currently viewing, built from scratch to demonstrate expertise in modern frontend development, clean structure, and interactive design principles.",
    image: project4,
    tags: ["HTML", "Tailwind CSS", "JavaScript", "ReactJS"],
    githubUrl: "https://github.com/iamrupamroyy/iamrupamroyy.github.io",
    liveUrl: null
  }
];

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900 transition-colors" id="projects" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-slate-900 dark:text-white">Featured Projects</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Showcasing my work in software development, machine learning, and system design
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all dark:bg-slate-950 dark:border-slate-800 h-full flex flex-col group">
                <div className="relative aspect-video overflow-hidden bg-slate-200 dark:bg-slate-800">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </div>
                <CardContent className="p-4 sm:p-6 flex-grow">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-slate-900 dark:text-white flex-1">{project.title}</h3>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm sm:text-base leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="dark:bg-slate-800 dark:text-slate-300">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-4 sm:p-6 pt-0 flex gap-3 border-t dark:border-slate-800">
                  {project.githubUrl && (
                    <motion.div whileHover={{ scale: 1.05 }} className="flex-1">
                      <Button variant="outline" size="sm" className="gap-2 w-full" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="size-4" />
                          Source Code
                        </a>
                      </Button>
                    </motion.div>
                  )}
                  {project.liveUrl && (
                    <motion.div whileHover={{ scale: 1.05 }} className="flex-1">
                      <Button size="sm" className="gap-2 w-full" asChild>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="size-4" />
                          Live Demo
                        </a>
                      </Button>
                    </motion.div>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}