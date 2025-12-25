import { GraduationCap, Award, BookOpen, Target } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

const highlights = [
  {
    icon: GraduationCap,
    title: "Education",
    description: "Currently pursuing MTech in Computer Science, focusing on advanced algorithms and reducing GNN training time"
  },
  {
    icon: Award,
    title: "Achievements",
    description: "Scored 98.87 Percentile (All over India) in GATE Examinations in Engineering"
  },
  {
    icon: BookOpen,
    title: "Continuous Learning",
    description: "Always expanding knowledge through online courses and workshops"
  },
  {
    icon: Target,
    title: "Career Goals",
    description: "Aspiring to contribute to innovative tech solutions that make a real-world impact"
  }
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 transition-colors" id="about" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-slate-900 dark:text-white">About Me</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            I'm a dedicated computer science student with a passion for solving complex problems 
            through technology. My journey in tech has been driven by curiosity and a desire to create 
            meaningful solutions that bridge the gap between innovative ideas and practical applications.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow dark:bg-slate-900 dark:border-slate-800 h-full">
                  <CardContent className="p-6">
                    <motion.div 
                      className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-4"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="size-8 text-blue-600 dark:text-blue-400" />
                    </motion.div>
                    <h3 className="mb-2 text-slate-900 dark:text-white">{item.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      {item.description}
                    </p>
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