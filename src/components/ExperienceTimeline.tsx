import React from "react";
import { motion } from "motion/react";
import { Briefcase, GraduationCap, GitPullRequest, Code } from "lucide-react";

const timelineEvents = [
  {
    title: "Open Source Contributor",
    organization: "Global Communities",
    date: "2023 - Present",
    icon: <GitPullRequest className="w-5 h-5 text-white" />,
    color: "bg-purple-500",
    description: "Actively contributing to open source projects, resolving issues, and building tools for developers."
  },
  {
    title: "Freelance Software Engineer",
    organization: "Independent",
    date: "2024 - Present",
    icon: <Briefcase className="w-5 h-5 text-white" />,
    color: "bg-blue-500",
    description: "Architecting and developing full-stack web applications for diverse clients, focusing on scalable solutions and modern UX."
  },
  {
    title: "Google developer students club , ITER",
    organization: "Google Developer Students Club",
    date: "2023-2024",
    icon: <Code className="w-5 h-5 text-white" />,
    color: "bg-emerald-500",
    description: "Developed features for the core product, optimized database queries, and participated in agile development cycles."
  },
  {
    title: "B.Tech in Computer Science",
    organization: "Institute of Technical Education and Research",
    date: "2023 - 2027",
    icon: <GraduationCap className="w-5 h-5 text-white" />,
    color: "bg-amber-500",
    description: "Focused on Software Engineering, Data Structures, Algorithms, and Cloud Computing. Lead developer at GDG ITER."
  }
];

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="w-full py-24 px-6 lg:px-12 max-w-4xl mx-auto">
      <div className="flex flex-col items-center mb-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Experience & Journey</h2>
        <p className="text-[var(--text-muted)] max-w-2xl">
          My professional timeline detailing roles, education, and contributions to the software engineering community.
        </p>
      </div>

      <div className="relative border-l-2 border-[var(--color-border)] ml-6 md:ml-12 space-y-12 pb-8">
        {timelineEvents.map((event, i) => (
          <motion.div 
            key={event.title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative pl-8 md:pl-12"
          >
            {/* Timeline Dot */}
            <div className={`absolute -left-[13px] md:-left-[17px] top-1 w-6 h-6 md:w-8 md:h-8 rounded-full ${event.color} flex items-center justify-center ring-4 ring-[var(--bg-primary)] shadow-md`}>
              {event.icon}
            </div>

            {/* Content Card */}
            <div className="premium-card p-6 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-[var(--text-primary)]">{event.title}</h3>
                <h4 className="text-[var(--color-primary)] font-medium mb-2">{event.organization}</h4>
                <p className="text-[var(--text-secondary)]">{event.description}</p>
              </div>
              <span className="shrink-0 text-sm font-semibold text-[var(--text-muted)] bg-[var(--bg-secondary)] px-3 py-1 rounded-full border border-[var(--color-border)] self-start">
                {event.date}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
