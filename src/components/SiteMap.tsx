/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  Map, 
  Compass, 
  Eye, 
  BookOpen, 
  Target, 
  FolderCode, 
  Terminal, 
  Network, 
  Clock, 
  Book, 
  BarChart3, 
  Layers, 
  FileText, 
  Mail,
  Search,
  CheckCircle,
  HelpCircle
} from "lucide-react";

interface SiteMapProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MapItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  icon: React.ReactNode;
}

export default function SiteMap({ isOpen, onClose }: SiteMapProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const itemsRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const mapItems: MapItem[] = [
    {
      id: "hero",
      title: "Hero & Constellation",
      subtitle: "Technology Research & Systems Architecture",
      category: "INTRODUCTION",
      icon: <Compass className="w-4 h-4" />
    },
    {
      id: "review-board",
      title: "Peer Audit Registers",
      subtitle: "Multi-Persona System Audits & Reviews",
      category: "QUALITY AUDITING",
      icon: <Eye className="w-4 h-4" />
    },
    {
      id: "mission",
      title: "Core Philosophy",
      subtitle: "Engineering foundations vs features",
      category: "MANIFESTO",
      icon: <BookOpen className="w-4 h-4" />
    },
    {
      id: "domains",
      title: "Ecosystem Verticals",
      subtitle: "Strategic research & technology vectors",
      category: "DOMAINS",
      icon: <Target className="w-4 h-4" />
    },
    {
      id: "projects",
      title: "Projects & Synthesis Lab",
      subtitle: "Shipped physical & virtual infrastructure",
      category: "APPLICATIONS",
      icon: <FolderCode className="w-4 h-4" />
    },
    {
      id: "engineering-log",
      title: "Engineering Journal",
      subtitle: "System incidents, runbooks & playbooks",
      category: "OPERATIONS",
      icon: <Terminal className="w-4 h-4" />
    },
    {
      id: "architecture",
      title: "Network Architecture",
      subtitle: "Bespoke topologies, routing & SVGs",
      category: "DIAGRAMS",
      icon: <Network className="w-4 h-4" />
    },
    {
      id: "timeline",
      title: "Industrial Chronicle",
      subtitle: "Chronological registry of physical builds",
      category: "TIMELINE",
      icon: <Clock className="w-4 h-4" />
    },
    {
      id: "research",
      title: "Academic publications",
      subtitle: "Theoretical publications & reading index",
      category: "RESEARCH",
      icon: <Book className="w-4 h-4" />
    },
    {
      id: "metrics",
      title: "Ecosystem Analytics",
      subtitle: "Live system latency benchmarks & graphs",
      category: "METRICS & DATA",
      icon: <BarChart3 className="w-4 h-4" />
    },
    {
      id: "stack",
      title: "Pipeline Interconnects",
      subtitle: "Interactive developer ecosystem checklist",
      category: "TECH STACK",
      icon: <Layers className="w-4 h-4" />
    },
    {
      id: "vision",
      title: "Manifesto & Vision Cards",
      subtitle: "Philosophical insights & vision boards",
      category: "FUTURE VISION",
      icon: <FileText className="w-4 h-4" />
    },
    {
      id: "contact",
      title: "Outbound Interaction Grid",
      subtitle: "Inbound pipeline telemetry and social links",
      category: "CONNECTIVITY",
      icon: <Mail className="w-4 h-4" />
    }
  ];

  // Filter items based on search query
  const filteredItems = mapItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Focus search input when modal opens
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Keep active index in bounds after filtering
  useEffect(() => {
    setActiveIndex(0);
  }, [searchQuery]);

  // Handle global and local keyboard events
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (filteredItems.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex(prev => {
          const next = (prev + 1) % filteredItems.length;
          itemsRefs.current[next]?.scrollIntoView({ block: "nearest" });
          return next;
        });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex(prev => {
          const next = (prev - 1 + filteredItems.length) % filteredItems.length;
          itemsRefs.current[next]?.scrollIntoView({ block: "nearest" });
          return next;
        });
      } else if (e.key === "Enter") {
        e.preventDefault();
        const activeItem = filteredItems[activeIndex];
        if (activeItem) {
          handleNavigate(activeItem.id);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, activeIndex, filteredItems, onClose]);

  const handleNavigate = (id: string) => {
    onClose();
    // Allow closing animation to smooth out, then scroll
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        // Set focus or highlight active target temporarily
        el.focus({ preventScroll: true });
      }
    }, 150);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          id="site-map-portal"
          role="dialog"
          aria-modal="true"
          aria-label="Interactive Terminal Site Map"
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 md:p-10"
        >
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-950/45 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl bg-[#FFFDFB] border border-[#E2D2BF] rounded-lg shadow-2xl overflow-hidden flex flex-col relative z-20 max-h-[82vh]"
          >
            {/* Header & Search */}
            <div className="border-b border-[#EADAC7] p-4.5 bg-[#FCFAF5]">
              <div className="flex items-center justify-between mb-3.5 select-none">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#B8436E] animate-pulse" />
                  <span className="font-mono text-[10px] font-bold text-[#B8436E] tracking-[0.2em] uppercase">
                    SYSTEM INDEX MAP [ACTIVE]
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-1 text-[#7A6A5E] hover:text-[#B8436E] rounded-md hover:bg-[#F3EBE0] transition-colors"
                  aria-label="Close index registry"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Search input field */}
              <div className="relative flex items-center">
                <Search className="w-4 h-4 absolute left-3.5 text-[#A69585] pointer-events-none" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Query system section (e.g. journal, stack, pipeline)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#F5EFE6] border border-[#E2D2BF] rounded py-2.5 pl-10 pr-4 text-xs font-mono text-[#1E1610] placeholder-[#A69585] focus:outline-none focus:border-[#B8436E] focus:ring-1 focus:ring-[#B8436E]"
                />
              </div>

              {/* Keyboard help pill */}
              <div className="flex items-center justify-between mt-2.5 font-mono text-[9px] text-[#8C7A6B] uppercase tracking-wider select-none">
                <div className="flex items-center gap-1.5">
                  <span className="bg-[#EADAC7] text-[#4A3D36] px-1.5 py-0.5 rounded leading-none">↑↓</span>
                  <span>Navigate</span>
                  <span className="ml-2 bg-[#EADAC7] text-[#4A3D36] px-1.5 py-0.5 rounded leading-none">Enter</span>
                  <span>Select Section</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="bg-[#EADAC7] text-[#4A3D36] px-1.5 py-0.5 rounded leading-none">Esc</span>
                  <span>Close Map</span>
                </div>
              </div>
            </div>

            {/* List Body */}
            <div 
              ref={listRef}
              className="flex-1 overflow-y-auto p-3.5 max-h-[50vh] divide-y divide-[#F0E4D5]/60 bg-[#FFFDFB]"
            >
              {filteredItems.length > 0 ? (
                filteredItems.map((item, index) => {
                  const isFocused = index === activeIndex;
                  return (
                    <button
                      key={item.id}
                      ref={el => { itemsRefs.current[index] = el; }}
                      onClick={() => handleNavigate(item.id)}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={`w-full text-left py-3 px-4.5 rounded-md flex items-center justify-between transition-all duration-150 outline-none select-none relative group cursor-pointer ${
                        isFocused 
                          ? "bg-[#F4EFE7] border-l-3 border-[#B8436E] text-[#1E1610] shadow-sm translate-x-1" 
                          : "bg-transparent border-l-3 border-transparent text-[#4A3C32] hover:text-[#1E1610]"
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        {/* Section Icon Box */}
                        <div className={`w-8 h-8 rounded flex items-center justify-center shrink-0 border ${
                          isFocused 
                            ? "bg-[#FFF] border-[#E2D2BF] text-[#B8436E] scale-105" 
                            : "bg-[#F7F2EA] border-[#EADCCB] text-[#7A6A5E] group-hover:text-[#B8436E]"
                        } transition-colors`}>
                          {item.icon}
                        </div>

                        {/* Title details */}
                        <div className="text-left min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-serif italic font-medium text-sm">
                              {item.title}
                            </span>
                            <span className="font-mono text-[8px] bg-[#EADAC7]/50 text-[#826E5D] px-1.5 py-0.2 rounded font-bold uppercase shrink-0">
                              {item.category}
                            </span>
                          </div>
                          <p className="font-sans text-[11px] text-[#7A6A5E] mt-0.5 truncate leading-relaxed">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Right Indicator */}
                      <div className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-[#A69585]">
                        {isFocused && (
                          <motion.span 
                            initial={{ opacity: 0, x: -3 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-[#B8436E] font-bold"
                          >
                            GO →
                          </motion.span>
                        )}
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="py-12 flex flex-col items-center justify-center text-center font-mono select-none">
                  <HelpCircle className="w-8 h-8 text-[#A69585] mb-2" />
                  <span className="text-xs text-[#7A6A5E]">NO REGISTERED MATRIX FOR QUERY</span>
                  <span className="text-[10px] text-[#A69585] mt-1 italic">"{searchQuery}"</span>
                </div>
              )}
            </div>

            {/* Site Map Footer metadata */}
            <div className="border-t border-[#EADAC7] px-4.5 py-3 bg-[#FCFAF5] flex items-center justify-between font-mono text-[9px] text-[#A29180] tracking-wider select-none uppercase">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                INTEGRATED INTERACTIVE ROUTER
              </span>
              <span>INDEX v1.0.4 · PRESS ESC TO EXIT</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
