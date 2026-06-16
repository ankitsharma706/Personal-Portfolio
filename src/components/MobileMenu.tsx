import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Github, Linkedin, Twitter } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  navLinks: { label: string; href: string }[];
}

export default function MobileMenu({ isOpen, setIsOpen, navLinks }: MobileMenuProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Body scroll lock
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

  // Escape key close & focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
      
      // Basic focus trap inside the menu
      if (e.key === "Tab" && menuRef.current) {
        const focusableElements = menuRef.current.querySelectorAll(
          'a[href], button:not([disabled])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 100);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, setIsOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          ref={menuRef}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed inset-0 z-[100] bg-apricot-bg/97 backdrop-blur-[20px] -webkit-backdrop-blur-[20px] flex flex-col justify-between p-6 overflow-y-auto"
        >
          {/* Header row in mobile menu overlay */}
          <div className="flex items-center justify-between h-14 border-b border-white/5 pb-2 select-none">
            <span className="font-serif font-extrabold text-[15px] tracking-tight text-[#E8EDF5]">
              Ankit Sharma
            </span>
            <button
              ref={closeButtonRef}
              onClick={() => setIsOpen(false)}
              className="flex justify-center items-center w-11 h-11 text-[#E8EDF5] hover:text-apricot-accent focus:outline-none transition-colors cursor-pointer"
              aria-label="Close navigation menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Centered Syne links block */}
          <div className="flex flex-col items-center justify-center my-auto py-8">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 + 0.1 }}
                className="font-serif font-bold text-[36px] text-[#E8EDF5] py-4 border-b border-white/5 w-full text-center hover:text-apricot-accent hover:[text-shadow:0_0_20px_rgba(0,229,204,0.7)] transition-all duration-200 focus:outline-none"
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          {/* Footer containing Email and Social Icons */}
          <div className="border-t border-white/5 pt-6 flex flex-col items-center gap-4">
            <a
              href="mailto:ankitwhatsapps@gmail.com"
              className="font-mono text-xs text-[#8A9BB8] hover:text-apricot-accent transition-colors break-all"
            >
              ankitwhatsapps@gmail.com
            </a>
            
            {/* Social Icons row */}
            <div className="flex items-center gap-6 mt-1">
              <a 
                href="https://github.com/ankitsharma706" 
                target="_blank" 
                rel="noreferrer noopener"
                className="w-11 h-11 flex items-center justify-center border border-white/10 rounded-full text-[#8A9BB8] hover:text-apricot-accent hover:border-apricot-accent transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/ankitsharma706/" 
                target="_blank" 
                rel="noreferrer noopener"
                className="w-11 h-11 flex items-center justify-center border border-white/10 rounded-full text-[#8A9BB8] hover:text-apricot-accent hover:border-apricot-accent transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://x.com/ankit_sharma708" 
                target="_blank" 
                rel="noreferrer noopener"
                className="w-11 h-11 flex items-center justify-center border border-white/10 rounded-full text-[#8A9BB8] hover:text-apricot-accent hover:border-apricot-accent transition-colors"
                aria-label="Twitter Profile"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
            
            <div className="text-[9px] font-mono text-[#4A5A70] uppercase tracking-[0.16em] mt-2 select-none">
              OBSIDIAN FIELD SYSTEM ACTIVE // 2025
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
