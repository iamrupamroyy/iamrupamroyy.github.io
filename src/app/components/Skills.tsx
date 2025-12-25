import { Code, Database, Cloud, GitBranch, Brain, Smartphone, Heart } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

const skillCategories = [
  {
    icon: Code,
    title: "Programming Languages",
    skills: ["C++ (Expert)", "C", "Python", "Java", "PHP", "CUDA (Parallel Computing)", "JavaScript"]
  },
  {
    icon: Smartphone,
    title: "Web Technologies",
    skills: ["HTML/CSS", "ReactJS", "NodeJS", "ExpressJS", "Restful APIs"]
  },
  {
    icon: GitBranch,
    title: "Tools & Platforms",
    skills: ["Git/GitHub", "Linux", "VS Code"]
  },
  {
    icon: Database,
    title: "Databases",
    skills: ["SQL", "NoSQL", "Database Management Systems (DBMS)"]
  },
  {
    icon: Brain,
    title: "Core Computer Science & Research",
    skills: ["Data Structures & Algorithms (DSA)", "Operating Systems (OS)", "Computer Architecture (COA)", "Graph Algorithms", "Parallel Programming", "Machine Learning / GNN", "System Designing", "Computer Networking", "Network Science"]
  },
  {
    icon: Heart,
    title: "Interests & Activities",
    skills: ["Advanced Competitive Coding", "Parallel Programming Research", "InterIIT Cultural Contingent (2024)", "Digital Arts & Design", "Playing Guitar", "Drawing & Sketching"]
  }
];

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 transition-colors" id="skills" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-slate-900 dark:text-white">Technical Skills</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and the technologies I work with
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <Card className="hover:shadow-lg transition-shadow dark:bg-slate-900 dark:border-slate-800 h-full">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <motion.div 
                        className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg flex-shrink-0"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className="size-5 sm:size-6 text-blue-600 dark:text-blue-400" />
                      </motion.div>
                      <h3 className="text-slate-900 dark:text-white">{category.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.span 
                          key={skillIndex}
                          className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-sm"
                          whileHover={{ scale: 1.1, backgroundColor: "rgb(59 130 246)" }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}