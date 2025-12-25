import { Briefcase, GraduationCap, Award, Code } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

const timelineData = [
  {
    year: "2024 - Present",
    title: "MTech, Computer Science and Engineering",
    organization: "IIT Bhilai — CGPA 8.25",
    description: "Advanced Research: Thesis on GPU-based Graph Algorithms",
    icon: GraduationCap,
    type: "education"
  },
  {
    year: "2025 (M)",
    title: "Teaching Assistantship: Compiler Design",
    organization: "IIT Bhilai",
    description: "Conducted comprehensive labs for 57 students, covering compiler design topics from basic concepts to advanced techniques like lexical analysis, LALR parsing, and code generation, strengthening their practical and analytical skills.",
    icon: Briefcase,
    type: "work"
  },
  {
    year: "2024 (W)",
    title: "Teaching Assistantship: Computer Organization and Architecture (COA)",
    organization: "IIT Bhilai",
    description: "Managed and delivered laboratory practicals for a cohort of 60 students, ensuring conceptual clarity in hardware-software interfaces.",
    icon: Briefcase,
    type: "work"
  },
  {
    year: "2024 (M)",
    title: "Teaching Assistantship: C & DSA",
    organization: "IIT Bhilai",
    description: "Co-led instruction for 300+ novices, delivering targeted C and DSA tutorials, labs, and assessments to accelerate foundational programming and problem-solving skills.",
    icon: Briefcase,
    type: "work"
  },
  {
    year: "2024",
    title: "Graduate Aptitude Test in Engineering (GATE) - CS",
    organization: "Score: 98.87 percentile",
    description: "",
    icon: Award,
    type: "achievement"
  },
  {
    year: "2023",
    title: "Graduate Aptitude Test in Engineering (GATE) - CS",
    organization: "Score: 97.40 percentile",
    description: "",
    icon: Award,
    type: "achievement"
  }, 
  {
    year: "2018 - 2022",
    title: "BTech, Computer Science and Engineering",
    organization: "MAKAUT — CGPA 9.18",
    description: "I completed my B.Tech in Computer Science and Engineering from Maulana Abul Kalam Azad University of Technology with a strong academic record, gaining deep exposure to core CS subjects and problem-solving techniques",
    icon: GraduationCap,
    type: "education"
  }
];

export function Timeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900 transition-colors" id="timeline" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-slate-900 dark:text-white">Career Journey</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A timeline of my academic achievements, professional experiences, and milestones
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-900"></div>

          <div className="space-y-12">
            {timelineData.map((item, index) => {
              const Icon = item.icon;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={index}
                  className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                >
                  {/* Content */}
                  <div className={`w-full md:w-5/12 ${isEven ? 'md:pr-12' : 'md:pl-12'} pl-20 md:pl-0`}>
                    <Card className="hover:shadow-lg transition-shadow dark:bg-slate-950 dark:border-slate-800">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4 mb-3">
                          <div className={`p-2 rounded-lg ${
                            item.type === 'education' ? 'bg-blue-100 dark:bg-blue-900' :
                            item.type === 'work' ? 'bg-green-100 dark:bg-green-900' :
                            'bg-purple-100 dark:bg-purple-900'
                          }`}>
                            <Icon className={`size-5 ${
                              item.type === 'education' ? 'text-blue-600 dark:text-blue-400' :
                              item.type === 'work' ? 'text-green-600 dark:text-green-400' :
                              'text-purple-600 dark:text-purple-400'
                            }`} />
                          </div>
                          <div>
                            <span className="text-sm text-slate-500 dark:text-slate-400">{item.year}</span>
                            <h3 className="text-slate-900 dark:text-white mt-1">{item.title}</h3>
                            <p className="text-blue-600 dark:text-blue-400 text-sm">{item.organization}</p>
                          </div>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Timeline dot */}
                  <motion.div 
                    className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-blue-600 dark:bg-blue-400 border-4 border-white dark:border-slate-950 transform -translate-x-1/2 z-10"
                    whileHover={{ scale: 1.5 }}
                  ></motion.div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block w-5/12"></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
