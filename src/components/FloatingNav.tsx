import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";

const navItems = [
  { label: 'Home', possibleIds: ['home', 'hero'] },
  { label: 'Experience', possibleIds: ['experience', 'timeline'] },
  { label: 'Skills', possibleIds: ['skills', 'matrix', 'arsenal'] },
  { label: 'Credentials', possibleIds: ['credentials', 'testimonials', 'awards'] },
  { label: 'Projects', possibleIds: ['projects', 'work'] },
  { label: 'Contact', possibleIds: ['contact', 'footer'] },
];

const FloatingNav = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);

      const viewportCenter = window.innerHeight / 2;
      let closestSection = 'home';
      let minDistance = Infinity;

      navItems.forEach((item) => {
        item.possibleIds.forEach((id) => {
          const element = document.getElementById(id);
          if (element) {
            const rect = element.getBoundingClientRect();
            const sectionCenter = rect.top + rect.height / 2;
            const distance = Math.abs(sectionCenter - viewportCenter);

            if (distance < minDistance) {
              minDistance = distance;
              closestSection = item.label.toLowerCase();
            }
          }
        });
      });
      setActiveSection(closestSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent, label: string) => {
    e.preventDefault();
    const item = navItems.find(i => i.label === label);
    const validId = item?.possibleIds.find(id => document.getElementById(id));
    
    if (validId) {
      const element = document.getElementById(validId);
      if (element) {
        const offset = 100;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        window.scrollTo({
          top: elementRect - bodyRect - offset,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          className="fixed top-8 left-1/2 -translate-x-1/2 z-[1000] hidden lg:block"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Main Container: Elegant Rectangular Morph Glass */}
          <div className="relative flex items-center bg-black/40 backdrop-blur-2xl border border-white/10 px-1 py-1 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)]">
            
            {/* Corner Accents (The "Morph" feel) */}
            <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l border-[#C5A059]/50" />
            <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b border-r border-[#C5A059]/50" />

            {navItems.map((item) => {
              const isActive = activeSection === item.label.toLowerCase();
              return (
                <button
                  key={item.label}
                  onClick={(e) => scrollToSection(e, item.label)}
                  className="relative px-6 py-3 transition-all duration-500 group overflow-hidden"
                >
                  {/* Active Background: Dark Glass Reveal */}
                  {isActive && (
                    <motion.div
                      layoutId="activeLuxuryRect"
                      className="absolute inset-0 bg-white/[0.03] z-0"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  {/* Active Underline Scanline */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C5A059] shadow-[0_0_10px_#C5A059]"
                    />
                  )}

                  <span className={cn(
                    "relative z-10 font-mono text-[10px] uppercase tracking-[0.3em] transition-colors duration-500",
                    isActive ? "text-[#C5A059]" : "text-zinc-500 group-hover:text-zinc-200"
                  )}>
                    {item.label}
                  </span>
                </button>
              );
            })}
            
            {/* The "Hire Me" High-Contrast Block */}
            <motion.button
              onClick={(e) => scrollToSection(e, 'Contact')}
              className="relative ml-2 px-8 py-3 bg-[#C5A059] group overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Internal Hover Effect */}
              <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10 font-mono text-[10px] font-bold text-black group-hover:text-[#C5A059] uppercase tracking-[0.3em]">
                Contact
              </span>
            </motion.button>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default FloatingNav;