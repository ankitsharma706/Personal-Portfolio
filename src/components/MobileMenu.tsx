import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Github, Linkedin, Mail } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  navLinks: { label: string; href: string; id: string }[];
  activeSection: string;
}

export default function MobileMenu({ isOpen, setIsOpen, navLinks, activeSection }: MobileMenuProps) {
  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex flex-col bg-[var(--bg-primary)]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6">
            <span className="font-bold text-lg text-[var(--text-primary)]">Menu</span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-[var(--text-primary)] focus:outline-none bg-[var(--bg-secondary)] rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center justify-center flex-1 py-8 px-6 space-y-4 overflow-y-auto">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.id}
                href={link.href}
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 + 0.1 }}
                className={`w-full text-center py-4 rounded-2xl text-2xl font-semibold transition-all ${
                  activeSection === link.id
                    ? "bg-[var(--color-primary)] text-white"
                    : "text-[var(--text-primary)] bg-[var(--bg-secondary)]"
                }`}
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          {/* Footer Socials */}
          <div className="p-8 border-t border-[var(--color-border)] flex items-center justify-center gap-8">
            <a href="https://github.com" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="mailto:ankit.kumar@example.com" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
