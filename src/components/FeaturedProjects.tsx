import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Github, Code2, BookOpen, Building2 } from "lucide-react";
import Tilt from "react-parallax-tilt";
import ConduitCaseStudy from "./ConduitCaseStudy";
import ConduitOrgShowcase from "./ConduitOrgShowcase";

const projects = [
  {
    title: "AfterMa – Postpartum Wellness Platform",
    category: "Healthcare / Women's Health",
    description: "A dedicated healthcare platform supporting mothers through postpartum recovery with analytics, wellness dashboard, and community-focused resources.",
    tech: ["React", "Node.js", "MongoDB", "REST APIs", "Authentication"],
    features: ["Postpartum recovery tracking", "Wellness dashboard", "Community-focused platform", "Healthcare-oriented UI"],
    liveUrl: "https://afterma.online/",
    githubUrl: "https://github.com/ankitsharma706/main-afterma",
    docsUrl: "",
    color: "from-rose-500/20 to-pink-500/20",
    image: "/afterma.png"
  },
  {
    title: "Nivaara",
    category: "Healthcare / Menopause Support Platform",
    description: "Medically-Informed, Community-Supported Menopause Transition Assistant.",
    tech: ["React", "Node.js", "MongoDB", "REST APIs", "Authentication", "Data Visualization"],
    features: ["Postpartum recovery tracking", "Wellness dashboard", "Community-focused platform", "Healthcare-oriented UI"],
    liveUrl: "https://nivaara23.vercel.app/dashboard",
    githubUrl: "https://github.com/ankitsharma706/Nivaara",
    docsUrl: "",
    color: "from-emerald-500/20 to-teal-500/20",
    image: "/Nivarra.png"
  },
  {
    title: "Conduit – FinTech Platform",
    category: "FinTech",
    description: "A highly scalable financial workflow management platform built on modern architecture with secure API integrations.",
    tech: ["React", "Node.js", "MongoDB", "Authentication", "Financial APIs"],
    features: ["Authentication system", "Financial workflow management", "Modern architecture", "API integrations", "Scalable application design"],
    liveUrl: "https://conduits.vercel.app/",
    githubUrl: "https://github.com/CONDUIT-FINTECH",
    docsUrl: "https://docsconduit.netlify.app/overview",
    color: "from-blue-500/20 to-cyan-500/20",
    image: "/conduit.png",
    isConduit: true // Special flag to trigger case study / org views
  },
  {
    title: "OpalSphere",
    category: "Web Platform",
    description: "OpalSphere is a high-end, cinematic web experience designed for a luxury floral brand. It translates the delicate beauty of artisanal floral design into a premium digital journey, centered around the core narrative of Transformation.",
    tech: ["React", "Frontend UI", "Responsive Design"],
    features: ["Landing page screenshots", "Feature showcase", "UI highlights"],
    liveUrl: "https://opalsphere.vercel.app/",
    githubUrl: "https://github.com/ankitsharma706/opalsphere",
    docsUrl: "",
    color: "from-purple-500/20 to-fuchsia-500/20",
    image: "/opalsphere.png"
  },
  {
    title: "Construct",
    category: "Personal / Professional",
    description: "A personal/professional project highlighting the development journey, technologies, and features constructed.",
    tech: ["React", "Vite", "Tailwind CSS"],
    features: ["Feature Highlights", "Technologies Overview", "Development Journey"],
    liveUrl: "https://constructankit.vercel.app/",
    githubUrl: "https://github.com/ankitsharma706/construct",
    docsUrl: "",
    color: "from-orange-500/20 to-amber-500/20",
    image: "/construct.png"
  }
];

export default function FeaturedProjects() {
  const [activeModal, setActiveModal] = useState<"case-study" | "org-showcase" | null>(null);

  return (
    <>
      <AnimatePresence>
        {activeModal === "case-study" && (
          <ConduitCaseStudy onClose={() => setActiveModal(null)} />
        )}
        {activeModal === "org-showcase" && (
          <ConduitOrgShowcase onClose={() => setActiveModal(null)} />
        )}
      </AnimatePresence>

      <section id="projects" className="w-full py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-20 text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-[var(--text-primary)]">Featured Work</h2>
          <p className="text-[var(--text-muted)] max-w-2xl text-lg">
            A selection of robust, scalable applications I've engineered, focusing on performance, enterprise-level user experiences, and solving real-world problems in Healthcare and FinTech.
          </p>
        </div>

        <div className="flex flex-col gap-32">
          {projects.map((project, i) => (
            <div key={project.title} className={`flex flex-col ${i % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}>
              
              {/* Project Visual / Mockup */}
              <motion.div 
                initial={{ opacity: 0, x: i % 2 !== 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="w-full lg:w-1/2"
              >
                <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={2500} className="w-full">
                  <div className={`premium-card w-full aspect-video rounded-2xl bg-gradient-to-br ${project.color} p-2 md:p-6 group overflow-hidden cursor-pointer flex items-center justify-center`}>
                    <div className="w-full h-full relative rounded-xl shadow-2xl overflow-hidden border border-[var(--color-border)] transform group-hover:scale-105 transition-transform duration-700 bg-[var(--bg-primary)]">
                      {project.image ? (
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Code2 className="w-16 h-16 text-[var(--color-border)] group-hover:text-[var(--color-primary)] transition-colors duration-500" />
                        </div>
                      )}
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>
                </Tilt>
              </motion.div>

              {/* Project Details */}
              <motion.div 
                initial={{ opacity: 0, x: i % 2 !== 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full lg:w-1/2 flex flex-col items-start"
              >
                <div className="mb-2">
                  <span className="px-3 py-1 bg-[var(--bg-secondary)] border border-[var(--color-border)] rounded-full text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)]">
                    {project.category}
                  </span>
                </div>
                <h3 className="text-3xl font-bold mb-4 text-[var(--text-primary)]">{project.title}</h3>
                <p className="text-[var(--text-secondary)] mb-6 text-lg leading-relaxed">
                  {project.description}
                </p>
                
                <div className="mb-6 w-full">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-3">Key Features</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.features.map(feature => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-[var(--text-primary)]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] flex-shrink-0" />
                        <span className="truncate" title={feature}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map(tech => (
                    <span key={tech} className="px-3 py-1 bg-[var(--bg-secondary)] border border-[var(--color-border)] rounded-md text-xs font-medium text-[var(--text-secondary)]">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <motion.a 
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-2 px-5 py-2.5 bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-lg font-medium shadow-lg hover:shadow-xl transition-all"
                  >
                    <ExternalLink className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                    Live Demo
                  </motion.a>

                  {project.isConduit ? (
                    <>
                      <motion.button 
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveModal("case-study")}
                        className="group flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all"
                      >
                        <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        Case Study
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveModal("org-showcase")}
                        className="group flex items-center gap-2 px-5 py-2.5 premium-card hover:border-indigo-500 font-medium transition-all text-[var(--text-primary)]"
                      >
                        <Building2 className="w-4 h-4 group-hover:scale-110 transition-transform text-indigo-500" />
                        Org Showcase
                      </motion.button>
                    </>
                  ) : (
                    <motion.a 
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.githubUrl} 
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-2 px-5 py-2.5 premium-card hover:border-[var(--color-primary)] font-medium transition-all"
                    >
                      <Github className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                      Source Code
                    </motion.a>
                  )}
                </div>
              </motion.div>

            </div>
          ))}
        </div>
      </section>
    </>
  );
}
