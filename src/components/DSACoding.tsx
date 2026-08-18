import React from "react";
import { motion } from "motion/react";
import { Award, Code2, Terminal, Trophy } from "lucide-react";

const platforms = [
  {
    name: "LeetCode",
    icon: <Code2 className="w-8 h-8 text-[#FFA116]" />,
    stats: { problems: "300+", rating: "Top 15%" },
    badges: ["Daily Challenge", "Algorithm I"],
    color: "hover:border-[#FFA116]"
  },
  {
    name: "GeeksforGeeks",
    icon: <Terminal className="w-8 h-8 text-[#2F8D46]" />,
    stats: { problems: "250+", score: "1500+" },
    badges: ["Institute Rank #5"],
    color: "hover:border-[#2F8D46]"
  },
  {
    name: "CodeChef",
    icon: <Trophy className="w-8 h-8 text-[#5B4638]" />,
    stats: { rating: "3 Star", maxRating: "1650" },
    badges: ["Global Rank 500 in Starters"],
    color: "hover:border-[#5B4638]"
  },
  {
    name: "HackerRank",
    icon: <Award className="w-8 h-8 text-[#00EA64]" />,
    stats: { stars: "5 Star", domain: "Problem Solving" },
    badges: ["Gold Badge in C++", "SQL Basic"],
    color: "hover:border-[#00EA64]"
  }
];

export default function DSACoding() {
  return (
    <section id="dsa" className="w-full py-24 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col items-center mb-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Problem Solving & DSA</h2>
        <p className="text-[var(--text-muted)] max-w-2xl">
          Consistent practice in data structures and algorithms across multiple platforms to maintain sharp logical thinking and optimized code construction.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {platforms.map((platform, i) => (
          <motion.div
            key={platform.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`premium-card p-6 flex flex-col group transition-all duration-300 ${platform.color}`}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-14 h-14 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center shadow-sm">
                {platform.icon}
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">{platform.name}</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6 flex-1">
              {Object.entries(platform.stats).map(([key, value]) => (
                <div key={key} className="flex flex-col">
                  <span className="text-xs uppercase tracking-wider text-[var(--text-muted)]">{key}</span>
                  <span className="font-mono font-semibold text-[var(--text-primary)]">{value}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              {platform.badges.map(badge => (
                <div key={badge} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--bg-secondary)] border border-[var(--color-border)] text-xs font-medium text-[var(--text-secondary)] mr-2 mb-2">
                  <Award className="w-3 h-3 text-[var(--color-primary)]" />
                  {badge}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
