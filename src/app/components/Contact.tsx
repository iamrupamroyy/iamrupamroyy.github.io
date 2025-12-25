import { Mail, MapPin, Phone } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { useRef } from "react";
import { motion } from "motion/react";
import { useInView } from "motion/react";

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 transition-colors" id="contact" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-slate-900 dark:text-white">Get In Touch</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            I'm always open to discussing new projects, opportunities, or collaborations
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {[
            { icon: Mail, title: "Email", content: "iamrupamroyy@gmail.com", href: "mailto:iamrupamroyy@gmail.com" },
            { icon: Phone, title: "Phone", content: "+91 6296070903", href: "tel:+916296070903" },
            { icon: MapPin, title: "Location", content: "West Bengal\nIndia 721127", href: null }
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="dark:bg-slate-900 dark:border-slate-800 h-full">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <motion.div 
                        className="p-2 sm:p-3 bg-blue-100 dark:bg-blue-900 rounded-lg flex-shrink-0"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className="size-5 sm:size-6 text-blue-600 dark:text-blue-400" />
                      </motion.div>
                      <div className="min-w-0">
                        <h3 className="mb-1 text-slate-900 dark:text-white">{item.title}</h3>
                        {item.href ? (
                          <a href={item.href} className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm sm:text-base break-all">
                            {item.content}
                          </a>
                        ) : (
                          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base whitespace-pre-line">
                            {item.content}
                          </p>
                        )}
                      </div>
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
