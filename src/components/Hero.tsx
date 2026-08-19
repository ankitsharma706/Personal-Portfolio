import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Download, Mail, Terminal, Database, Code, Cloud, Layout, Server, Wrench, GitBranch, Cpu, Github, Linkedin, GitMerge } from "lucide-react";
import { SiCplusplus, SiDocker, SiGithubactions, SiNodedotjs, SiMongodb, SiReact, SiPostgresql, SiTypescript, SiGit, SiLinux, SiKubernetes, SiJenkins, SiNginx } from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';
const SquareOrbitIcon = ({ 
  icon, index, total, baseDuration, mobileSize, tabletSize, desktopSize 
}: { 
  icon: React.ReactNode, index: number, total: number, baseDuration: number,
  mobileSize: number, tabletSize: number, desktopSize: number
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const [size, setSize] = useState(desktopSize);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setSize(mobileSize);
      else if (window.innerWidth < 1024) setSize(tabletSize);
      else setSize(desktopSize);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileSize, tabletSize, desktopSize]);

  useEffect(() => {
    let animationFrameId: number;
    const duration = baseDuration;
    
    const animate = (time: number) => {
      if (ref.current) {
        const progress = ((time + (index / total) * duration) % duration) / duration;
        
        let x = 0, y = 0;
        if (progress < 0.25) {
          x = -size/2 + (progress * 4) * size;
          y = -size/2;
        } else if (progress < 0.5) {
          x = size/2;
          y = -size/2 + ((progress - 0.25) * 4) * size;
        } else if (progress < 0.75) {
          x = size/2 - ((progress - 0.5) * 4) * size;
          y = size/2;
        } else {
          x = -size/2;
          y = size/2 - ((progress - 0.75) * 4) * size;
        }
        
        ref.current.style.transform = `translate(${x}px, ${y}px)`;
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [index, total, size, baseDuration]);

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
      <div 
        ref={ref}
        className="premium-card flex items-center justify-center rounded-2xl w-12 h-12 sm:w-16 sm:h-16 bg-[var(--card-bg)]/80 backdrop-blur-md border border-white/10 shadow-xl hover:scale-110 transition-transform duration-300 cursor-default pointer-events-auto"
      >
        {icon}
      </div>
    </div>
  );
};

export default function Hero() {
  return (
    <section id="home" className="relative w-full min-h-screen flex items-center justify-center pt-24 pb-32 lg:pb-40 overflow-visible px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-8 items-center w-full z-10">
        
        {/* Left Side: Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-30 flex flex-col items-start text-left space-y-6"
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
              DevOps Engineer & Full Stack Developer 
            </span>
          </h1>
          
          <div className="h-8 flex items-center">
            <TypeAnimation
              sequence={[
                'Building Production-Ready Applications', 2000,
                'Deploying Cloud Infrastructure', 2000,
                'Automating CI/CD Pipelines', 2000,
                'Solving Real-World Engineering Problems', 2000
              ]}
              wrapper="span"
              speed={50}
              className="text-xl sm:text-2xl text-[var(--text-muted)] font-medium"
              repeat={Infinity}
            />
          </div>
          
          <p className="max-w-xl text-[var(--text-muted)] leading-relaxed">
            Passionate Full Stack Developer and DevOps Engineer focused on building scalable applications, cloud-native infrastructure, and automated deployment pipelines. Experienced with React, Node.js, Docker, CI/CD, MongoDB, and modern software engineering practices.
          </p>
          
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


          <div className="flex flex-wrap gap-8 pt-6">
            <div>
              <h3 className="text-2xl font-bold">20+</h3>
              <p className="text-sm text-[var(--text-muted)]">Projects</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold">500+</h3>
              <p className="text-sm text-[var(--text-muted)]">DSA Problems</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold">3+</h3>
              <p className="text-sm text-[var(--text-muted)]">Years Coding</p>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Animated Visuals */}
        <div className="relative z-10 w-full min-h-[500px] lg:min-h-[700px] flex items-center justify-center overflow-visible">
          
          {/* Background Glow */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[var(--color-primary)] opacity-10 blur-[120px] pointer-events-none" />

          {/* Main Avatar / Centerpiece */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-20"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-72 h-72 sm:w-[380px] sm:h-[380px] lg:w-[420px] lg:h-[420px] rounded-[32px] premium-card flex items-center justify-center bg-gradient-to-tr from-[var(--bg-secondary)]/80 to-[var(--card-bg)]/80 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden"
            >
              <div className="absolute inset-0 z-0 bg-grid-pattern opacity-30" />
              <div className="absolute z-0 w-56 h-56 bg-[var(--color-primary)] rounded-full blur-[80px] opacity-20" />
              <img
                src="/profilepic.jpeg"
                alt="Ankit Sharma"
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover rounded-[32px] relative z-10"
              />
            </motion.div>
          </motion.div>

          {/* Floating Brand & Tech Icons - Inner Square Orbit */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full z-30 pointer-events-none">
            {[
              <SiReact className="w-6 h-6 sm:w-8 sm:h-8 text-[#61DAFB]" />,
              <SiNodedotjs className="w-6 h-6 sm:w-8 sm:h-8 text-[#339933]" />,
              <SiMongodb className="w-6 h-6 sm:w-8 sm:h-8 text-[#47A248]" />,
              <SiPostgresql className="w-6 h-6 sm:w-8 sm:h-8 text-[#4169E1]" />,
              <SiTypescript className="w-6 h-6 sm:w-8 sm:h-8 text-[#3178C6]" />,
              <SiGit className="w-6 h-6 sm:w-8 sm:h-8 text-[#F05032]" />,
              <SiCplusplus className="w-6 h-6 sm:w-8 sm:h-8 text-[#00599C]" />,
              <SiDocker className="w-6 h-6 sm:w-8 sm:h-8 text-[#2496ED]" />,
              <Github className="w-6 h-6 sm:w-8 sm:h-8 text-[var(--text-primary)]" />,
              <SiGithubactions className="w-6 h-6 sm:w-8 sm:h-8 text-[#2088FF]" />,<SiLinux className="w-6 h-6 sm:w-8 sm:h-8 text-[#FCC624]" />,
              <FaAws className="w-6 h-6 sm:w-8 sm:h-8 text-[#232F3E]" />,
              <SiKubernetes className="w-6 h-6 sm:w-8 sm:h-8 text-[#326CE5]" />,
              <SiJenkins className="w-6 h-6 sm:w-8 sm:h-8 text-[#D24939]" />,
              <SiNginx className="w-6 h-6 sm:w-8 sm:h-8 text-[#009639]" />,
              <GitMerge className="w-6 h-6 sm:w-8 sm:h-8 text-[#F05032]" />,
              <Server className="w-6 h-6 sm:w-8 sm:h-8 text-[#8B5CF6]" />,
              <Cloud className="w-6 h-6 sm:w-8 sm:h-8 text-[#10B981]" />
            ].map((icon, i, arr) => (
              <SquareOrbitIcon 
                key={`inner-${i}`} 
                icon={icon} index={i} total={arr.length} 
                baseDuration={25000} mobileSize={260} tabletSize={440} desktopSize={520} 
              />
            ))}
          </div>

          {/* Floating Brand & Tech Icons - Outer Square Orbit */}
          {/* <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full z-30 pointer-events-none">
            {[
              
            ].map((icon, i, arr) => (
              <SquareOrbitIcon 
                key={`outer-${i}`} 
                icon={icon} index={i} total={arr.length} 
                baseDuration={35000} mobileSize={340} tabletSize={560} desktopSize={680} 
              />
            ))}
          </div> */}

        </div>
      </div>
    </section>
  );
}
