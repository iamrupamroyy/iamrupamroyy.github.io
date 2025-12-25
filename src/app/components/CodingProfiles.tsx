import { TrendingUp, Trophy, Star, Award } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

const codingPlatforms = [
  {
    name: "LeetCode",
    username: "iamrupamroyy",
    rating: "206,514",
    rank: "Global Rank",
    solved: "300+ Problems",
    badge: "N/A",
    color: "from-orange-500 to-yellow-500",
    icon: Trophy,
    link: "https://leetcode.com/iamrupamroyy"
  },
  {
    name: "Codeforces",
    username: "iamrupamroyy",
    rating: "948",
    rank: "Newbie",
    solved: "N/A",
    badge: "N/A",
    color: "from-blue-500 to-cyan-500",
    icon: Star,
    link: "https://codeforces.com/profile/iamrupamroyy"
  },
  {
    name: "CodeChef",
    username: "iamrupamroyy",
    rating: "1471",
    rank: "2 Stars",
    solved: "N/A",
    badge: "N/A",
    color: "from-amber-600 to-orange-600",
    icon: Award,
    link: "https://www.codechef.com/users/iamrupamroyy"
  }
];

export function CodingProfiles() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 transition-colors" id="coding-profiles" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-slate-900 dark:text-white">Competitive Programming</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            My rankings and ratings across popular competitive programming platforms
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {codingPlatforms.map((platform, index) => {
            const Icon = platform.icon;
            return (
              <motion.a
                key={index}
                href={platform.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="block"
              >
                <Card className="h-full hover:shadow-xl transition-all dark:bg-slate-900 dark:border-slate-800 overflow-hidden group">
                  <div className={`h-2 bg-gradient-to-r ${platform.color}`}></div>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-slate-900 dark:text-white mb-1">{platform.name}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">@{platform.username}</p>
                      </div>
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className={`p-2 rounded-lg bg-gradient-to-br ${platform.color}`}
                      >
                        <Icon className="size-5 text-white" />
                      </motion.div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600 dark:text-slate-400">Rating</span>
                        <span className={`bg-gradient-to-r ${platform.color} bg-clip-text text-transparent`}>
                          {platform.rating}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600 dark:text-slate-400">Rank</span>
                        <Badge variant="secondary" className="dark:bg-slate-800">
                          {platform.rank}
                        </Badge>
                      </div>

                      {(platform.solved !== "N/A" || platform.badge !== "N/A") && (
                        <div className="pt-3 border-t dark:border-slate-800">
                          {platform.solved !== "N/A" && (
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{platform.solved}</p>
                          )}
                          {platform.badge !== "N/A" && (
                            <Badge className={`bg-gradient-to-r ${platform.color} text-white border-0`}>
                              {platform.badge}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="mt-4 text-sm text-blue-600 dark:text-blue-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      View Profile 
                      <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
