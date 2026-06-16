import React, { useState, useEffect } from "react";
import { X, Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Work", href: "#projects" },
    { label: "About", href: "#mission" },
    { label: "Stack", href: "#tech-stack" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <>
      <nav
        id="top-nav"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-apricot-bg/90 backdrop-blur-[12px] -webkit-backdrop-blur-[12px] border-b border-white/5 h-16"
            : "bg-transparent border-b border-transparent h-16"
        }`}
      >
        <div className="max-w-7xl mx-auto w-full h-full px-6 md:px-10 flex items-center justify-between">
          
          {/* Left: Branding & Separator */}
          <div className="flex items-center gap-3 select-none">
            <a
              href="#"
              className="font-serif font-semibold text-[15px] tracking-tight text-[#E8EDF5] transition-colors hover:text-apricot-accent"
            >
              Ankit Sharma
            </a>
            
            {/* 1px Vertical Separator */}
            <div className="h-3.5 w-[1px] bg-white/10 hidden sm:block" />

            <span className="hidden sm:inline font-mono text-[11px] text-[#4A5A70] tracking-wider">
              Engineer · Builder
            </span>
          </div>

          {/* Right: Work · About · Stack · Contact Navlinks + Status Pill */}
          <div className="flex items-center gap-6 md:gap-8">
            
            {/* Desktop Navigation Link row */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-sans text-[14px] text-[#8A9BB8] hover:text-[#E8EDF5] transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Subtle vertical rule between navlinks and status badge */}
            <div className="h-3.5 w-[1px] bg-white/10 hidden md:block" />

            {/* "Open to Work" status indicator pill */}
            <div 
              className="flex items-center gap-2 border border-[#007A6E] text-apricot-accent bg-[rgba(0,229,204,0.06)] font-mono text-[11px] rounded-full px-3.5 py-1"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-apricot-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-apricot-accent"></span>
              </span>
              <span>Open to Work</span>
            </div>

            {/* Mobile Hamburger menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden flex items-center justify-center w-11 h-11 text-[#E8EDF5] hover:text-apricot-accent transition-colors focus:outline-none"
              aria-label="Open Mobile Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Shared Mobile Menu Full screen Overlay panel */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        setIsOpen={setMobileMenuOpen}
        navLinks={navLinks}
      />
    </>
  );
}
