import React from "react";
import { motion } from "motion/react";
import { Mail, Github, Instagram, ArrowRight, Copy, ExternalLink } from "lucide-react";
import toast from 'react-hot-toast';

export default function Contact() {
  const email = "ankitkumar724310@gmail.com";
  const github = "https://github.com/ankitsharma706?utm_source=chatgpt.com";
  
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    toast.success("Email copied successfully");
  };

  const handleOpenGithub = () => {
    toast.success("Opening GitHub Profile");
    setTimeout(() => {
      window.open(github, '_blank');
    }, 1000);
  };

  return (
    <section id="contact" className="w-full py-24 px-6 lg:px-12 max-w-5xl mx-auto relative z-10">
      <div className="flex flex-col items-center mb-16 text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Let's Connect</h2>
        <p className="text-[var(--text-muted)] max-w-2xl text-lg">
          Currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="premium-card w-full flex flex-col md:flex-row overflow-hidden shadow-2xl"
      >
        {/* Left / Top: Info Section */}
        <div className="bg-[var(--bg-secondary)] p-10 md:w-1/2 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[var(--color-border)]">
          <div>
            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Contact Information</h3>
            <p className="text-[var(--text-secondary)] mb-10 leading-relaxed">
              Reach out via email or connect with me on GitHub to discuss projects, opportunities, or collaborations.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-[var(--text-primary)] font-medium group">
                <div className="w-12 h-12 rounded-full bg-[var(--card-bg)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-primary)] shadow-sm group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <span>{email}</span>
              </div>
              <div className="flex items-center gap-4 text-[var(--text-primary)] font-medium group">
                <div className="w-12 h-12 rounded-full bg-[var(--card-bg)] border border-[var(--color-border)] flex items-center justify-center text-[var(--text-primary)] shadow-sm group-hover:scale-110 transition-transform">
                  <Github className="w-5 h-5" />
                </div>
                <span>ankitsharma706</span>
              </div>
              <div className="flex items-center gap-4 text-[var(--text-primary)] font-medium group">
                <div className="w-12 h-12 rounded-full bg-[var(--card-bg)] border border-[var(--color-border)] flex items-center justify-center text-[var(--text-primary)] shadow-sm group-hover:scale-110 transition-transform">
                  <Instagram className="w-5 h-5" />
                </div>
                <span>@oxitasm</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right / Bottom: Action Section */}
        <div className="p-10 md:w-1/2 flex flex-col justify-center space-y-4">
          <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">Quick Actions</h3>
          
          <a 
            href={`mailto:${email}`}
            className="group flex items-center justify-between w-full py-4 px-6 rounded-xl bg-[var(--text-primary)] text-[var(--bg-primary)] font-medium hover:scale-[1.02] transition-transform shadow-md"
          >
            <span className="flex items-center gap-3">
              <Mail className="w-5 h-5" />
              Send Email
            </span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>

          <button 
            onClick={handleCopyEmail}
            className="group flex items-center justify-between w-full py-4 px-6 rounded-xl premium-card font-medium hover:border-[var(--color-primary)] transition-colors"
          >
            <span className="flex items-center gap-3 text-[var(--text-primary)]">
              <Copy className="w-5 h-5 text-[var(--text-secondary)] group-hover:text-[var(--color-primary)] transition-colors" />
              Copy Email Address
            </span>
          </button>

          <button 
            onClick={handleOpenGithub}
            className="group flex items-center justify-between w-full py-4 px-6 rounded-xl premium-card font-medium hover:border-[var(--text-primary)] transition-colors"
          >
            <span className="flex items-center gap-3 text-[var(--text-primary)]">
              <Github className="w-5 h-5 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors" />
              Open GitHub
            </span>
            <ExternalLink className="w-5 h-5 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors" />
          </button>
        </div>
      </motion.div>
    </section>
  );
}
