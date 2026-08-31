import React, { useState, useEffect } from "react";
import { Menu, X, House, CodeXml, FolderGit2, BriefcaseBusiness, Trophy, CloudCog, Mail, SunMoon } from "lucide-react";
import MobileMenu from "./MobileMenu";
import { motion, useScroll, useSpring } from "motion/react";

interface NavProps {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

export default function Nav({ theme, setTheme }: NavProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const navLinks = [
    { label: "Home", href: "#home", id: "home", Icon: House },
    { label: "Skills", href: "#skills", id: "skills", Icon: CodeXml },
    { label: "Projects", href: "#projects", id: "projects", Icon: FolderGit2 },
    { label: "Experience", href: "#experience", id: "experience", Icon: BriefcaseBusiness },
    { label: "DSA", href: "#dsa", id: "dsa", Icon: Trophy },
    { label: "DevOps", href: "#devops", id: "devops", Icon: CloudCog },
    { label: "Contact", href: "#contact", id: "contact", Icon: Mail }
  ];

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
      
      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY = currentScrollY;

      // Scroll spy logic
      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPosition = currentScrollY + window.innerHeight / 3;

      let currentActive = "home";
      sections.forEach(section => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentActive = section.id;
          }
        }
      });
      
      setActiveSection(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        id="top-nav"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        } ${
          isScrolled
            ? "bg-[var(--bg-primary)]/80 backdrop-blur-lg border-b border-[var(--color-border)] shadow-sm h-16"
            : "bg-transparent border-b border-transparent h-20"
        }`}
      >
        <div className="max-w-7xl mx-auto w-full h-full px-6 lg:px-12 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2 select-none">
            <a href="#home" className="font-bold text-lg tracking-tight text-[var(--text-primary)] hover:text-[var(--color-primary)] transition-colors">
              Ankitsharma.dev
            </a>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`group relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
                  }`}
                >
                  <motion.div 
                    whileHover={{ scale: 1.2, rotate: isActive ? 0 : 10 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <link.Icon className="w-4 h-4" />
                  </motion.div>
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Right Action & Mobile Toggle */}
          <div className="flex items-center gap-4">
            
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 text-[var(--text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--bg-secondary)] rounded-full transition-colors"
              aria-label="Toggle Theme"
            >
              <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }}>
                <SunMoon className="w-5 h-5" />
              </motion.div>
            </button>

            <a 
              href="#contact"
              className="hidden sm:flex items-center justify-center px-5 py-2 text-sm font-medium text-[var(--bg-primary)] bg-[var(--text-primary)] rounded-full hover:scale-105 transition-transform"
            >
              Hire Me
            </a>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-[var(--text-primary)] focus:outline-none"
              aria-label="Open Mobile Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Scroll Progress Indicator */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] origin-left"
          style={{ scaleX }}
        />
      </nav>

      <MobileMenu
        isOpen={mobileMenuOpen}
        setIsOpen={setMobileMenuOpen}
        navLinks={navLinks as any}
        activeSection={activeSection}
      />
    </>
  );
}
