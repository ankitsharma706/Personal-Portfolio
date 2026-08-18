import React from "react";
import { motion } from "motion/react";
import { Server, Layout, Database, Cloud, Code, Wrench, GitBranch, Cpu } from "lucide-react";

const categories = [
  {
    title: "Languages",
    icon: <Code className="w-6 h-6 text-[#EAB308]" />,
    skills: ["Java", "C++", "JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3", "SQL"],
    color: "group-hover:border-[#EAB308]"
  },
  {
    title: "Frontend",
    icon: <Layout className="w-6 h-6 text-[#3B82F6]" />,
    skills: ["React.js", "Next.js", "Redux", "Vite", "Recharts", "Responsive 3D Web Design"],
    color: "group-hover:border-[#3B82F6]"
  },
  {
    title: "Backend",
    icon: <Server className="w-6 h-6 text-[#10B981]" />,
    skills: ["Node.js", "Express.js", "RESTful APIs", "JWT", "OAuth", "Authentication & Authorization"],
    color: "group-hover:border-[#10B981]"
  },
  {
    title: "Database",
    icon: <Database className="w-6 h-6 text-[#F59E0B]" />,
    skills: ["MongoDB", "Mongoose", "MySQL", "PostgreSQL", "GraphDB", "Firebase"],
    color: "group-hover:border-[#F59E0B]"
  },
  {
    title: "DevOps & Cloud",
    icon: <Cloud className="w-6 h-6 text-[#8B5CF6]" />,
    skills: ["Docker", "AWS", "Kubernetes", "GitHub Actions (CI/CD)", "Vercel", "Netlify", "Nginx", "Linux (Ubuntu)", "Shell Scripting"],
    color: "group-hover:border-[#8B5CF6]"
  },
  {
    title: "Build Tools",
    icon: <Wrench className="w-6 h-6 text-[#64748B]" />,
    skills: ["Vite", "Webpack", "npm", "Yarn", "Babel", "ESLint", "Prettier"],
    color: "group-hover:border-[#64748B]"
  },
  {
    title: "Version Control",
    icon: <GitBranch className="w-6 h-6 text-[#F97316]" />,
    skills: ["Git", "GitHub", "GitHub Actions", "Conventional Commits"],
    color: "group-hover:border-[#F97316]"
  },
  {
    title: "Tools & AI",
    icon: <Cpu className="w-6 h-6 text-[#EC4899]" />,
    skills: ["Postman", "VS Code", "OpenAI API", "MongoDB Compass"],
    color: "group-hover:border-[#EC4899]"
  }
];

export default function TechStack() {
  return (
    <section id="skills" className="w-full py-24 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col items-center mb-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Technical Arsenal</h2>
        <p className="text-[var(--text-muted)] max-w-2xl">
          A comprehensive overview of the technologies, frameworks, and tools I use to build scalable web applications and cloud infrastructure.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`premium-card p-6 flex flex-col group ${cat.color}`}
          >
            <div className="w-12 h-12 rounded-xl bg-[var(--bg-secondary)] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
              {cat.icon}
            </div>
            <h3 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">{cat.title}</h3>
            <ul className="flex flex-col gap-3 flex-1">
              {cat.skills.map(skill => (
                <li key={skill} className="flex items-start gap-3 text-[var(--text-secondary)]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-border)] group-hover:bg-current transition-colors mt-2 flex-shrink-0" />
                  <span className="text-sm leading-snug">{skill}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
