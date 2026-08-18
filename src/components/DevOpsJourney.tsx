import React from "react";
import { motion } from "motion/react";
import { Command, Package, Workflow, Cloud, Boxes } from "lucide-react";

const nodes = [
  { id: 1, label: "Linux Basics", icon: <Command className="w-6 h-6" />, status: "completed" },
  { id: 2, label: "Docker", icon: <Package className="w-6 h-6" />, status: "completed" },
  { id: 3, label: "CI/CD & Actions", icon: <Workflow className="w-6 h-6" />, status: "completed" },
  { id: 4, label: "AWS Core Services", icon: <Cloud className="w-6 h-6" />, status: "completed" },
  { id: 5, label: "Kubernetes", icon: <Boxes className="w-6 h-6" />, status: "completed" }
];

export default function DevOpsJourney() {
  return (
    <section id="devops" className="w-full py-24 px-6 lg:px-12 max-w-5xl mx-auto">
      <div className="flex flex-col items-center mb-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">DevOps & Cloud Journey</h2>
        <p className="text-[var(--text-muted)] max-w-2xl">
          Visualizing my continuous learning path towards mastering infrastructure, deployments, and scalable cloud architecture.
        </p>
      </div>

      <div className="relative w-full overflow-hidden premium-card p-8 md:px-16 md:pt-16 md:pb-28 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">
        
        {/* Background Connecting Line (Desktop) */}
        <div className="hidden md:block absolute top-24 left-16 right-16 h-1 bg-[var(--color-border)] -translate-y-1/2 z-0" />
        
        {/* Animated Progress Line */}
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: "calc(100% - 8rem)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="hidden md:block absolute top-24 left-16 h-1 bg-[var(--color-primary)] -translate-y-1/2 z-0"
        />

        {/* Background Connecting Line (Mobile) */}
        <div className="block md:hidden absolute top-8 bottom-8 left-1/2 w-1 bg-[var(--color-border)] -translate-x-1/2 z-0" />

        {nodes.map((node, i) => (
          <div key={node.id} className="relative z-10 flex flex-col items-center group">
            
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: i * 0.2 }}
              className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-all duration-300
                ${node.status === 'completed' 
                  ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]' 
                  : node.status === 'learning'
                    ? 'bg-[var(--card-bg)] border-[var(--color-accent)] text-[var(--color-accent)] shadow-[0_0_20px_rgba(6,182,212,0.2)]'
                    : 'bg-[var(--bg-secondary)] border-[var(--color-border)] text-[var(--text-muted)]'
                }
              `}
            >
              {node.icon}
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.3, delay: i * 0.2 + 0.2 }}
              className="mt-4 text-center md:absolute md:top-20 md:w-32"
            >
              <h4 className={`font-semibold text-sm ${node.status === 'planned' ? 'text-[var(--text-muted)]' : 'text-[var(--text-primary)]'}`}>
                {node.label}
              </h4>
              <span className="text-xs uppercase tracking-wider text-[var(--text-muted)] mt-1 block">
                {node.status}
              </span>
            </motion.div>

          </div>
        ))}
      </div>
    </section>
  );
}
