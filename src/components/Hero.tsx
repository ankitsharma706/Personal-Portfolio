import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Download, Mail, Github, Terminal, Database, Code, Cloud } from "lucide-react";
import { TypeAnimation } from 'react-type-animation';

export default function Hero() {
  return (
    <section id="home" className="relative w-full min-h-[90vh] flex items-center justify-center pt-24 pb-12 overflow-hidden px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center w-full z-10">
        
        {/* Left Side: Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start text-left space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-medium text-sm border border-[var(--color-primary)]/20 shadow-sm backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-primary)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-primary)]"></span>
            </span>
            Available for new opportunities
          </div>
          
          <h1 className="tracking-tight leading-[1.1]">
            <span className="block mb-2 uppercase text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-muted)]">
              ANKIT SHARMA
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] pb-2 text-3xl sm:text-4xl lg:text-5xl font-bold mt-2">
              DevOps & Cloud Enthusiast
            </span>
            <span className="block text-[var(--text-secondary)] text-2xl sm:text-3xl font-bold mt-2">
              Full Stack Developer
            </span>
          </h1>
          
          <div className="h-8 flex items-center">
            <TypeAnimation
              sequence={[
                'Building scalable web applications', 2000,
                'Learning DevOps & Cloud', 2000,
                'Solving real-world problems', 2000,
                'Open Source Contributor', 2000
              ]}
              wrapper="span"
              speed={50}
              className="text-xl sm:text-2xl text-[var(--text-muted)] font-medium"
              repeat={Infinity}
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a href="#projects" className="group flex items-center gap-2 px-6 py-3 bg-[var(--color-primary)] text-white font-medium rounded-xl shadow-lg hover:shadow-xl shadow-[var(--color-primary)]/20 hover:bg-blue-600 transition-all duration-300">
              View Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a href="https://drive.google.com/file/d/1Sv4mo3iojk13nqAd0MkgUtfsK9oWqAei/view?usp=sharing" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-[var(--card-bg)] text-[var(--text-primary)] font-medium rounded-xl border border-[var(--color-border)] shadow-sm hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all duration-300">
              <Download className="w-4 h-4" />
              Resume
            </a>

            <a href="#contact" className="flex items-center gap-2 px-4 py-3 text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition-colors font-medium">
              <Mail className="w-4 h-4" />
              Contact Me
            </a>

          
          </div>
        </motion.div>

        {/* Right Side: Animated Visuals */}
        <div className="relative w-full h-[400px] sm:h-[500px] flex items-center justify-center">
          
          {/* Main Avatar / Centerpiece */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 rounded-full premium-card flex items-center justify-center bg-gradient-to-tr from-[var(--bg-secondary)] to-[var(--card-bg)] shadow-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-50" />
            <div className="absolute w-32 h-32 bg-[var(--color-primary)] rounded-full blur-[60px] opacity-20" />
            <Terminal className="w-24 h-24 text-[var(--color-primary)] animate-float" />
          </motion.div>

          {/* Floating Orbital Icons */}
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 z-20 pointer-events-none"
          >
            {/* React / Frontend */}
            <div className="absolute top-[10%] left-[20%] w-14 h-14 premium-card flex items-center justify-center rounded-2xl animate-float" style={{ animationDelay: "0s", animationDuration: "5s" }}>
              <Code className="w-6 h-6 text-[#06B6D4]" />
            </div>
            {/* Node / Backend */}
            <div className="absolute bottom-[20%] left-[10%] w-12 h-12 premium-card flex items-center justify-center rounded-full animate-float" style={{ animationDelay: "1s", animationDuration: "6s" }}>
              <Database className="w-5 h-5 text-[#10B981]" />
            </div>
            {/* Cloud / DevOps */}
            <div className="absolute top-[30%] right-[10%] w-16 h-16 premium-card flex items-center justify-center rounded-xl animate-float" style={{ animationDelay: "2s", animationDuration: "7s" }}>
              <Cloud className="w-7 h-7 text-[#F59E0B]" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
