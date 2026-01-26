import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// --- DATA ---
const row1 = [
  { name: "React", level: "Architecture", code: "FE-01" },
  { name: "Python", level: "Intelligence", code: "AI-02" },
  { name: "TypeScript", level: "Type Safety", code: "TS-99" },
  { name: "Next.js", level: "Full Stack", code: "NX-55" },
  { name: "Tailwind", level: "System UI", code: "CSS-3" },
  { name: "Figma", level: "Prototyping", code: "UX-01" },
  { name: "Node.js", level: "Runtime", code: "BE-00" },
];

const row2 = [
  { name: "Firebase", level: "Backend", code: "DB-X1" },
  { name: "TensorFlow", level: "Machine Learning", code: "ML-TF" },
  { name: "Docker", level: "Container", code: "OPS-D" },
  { name: "Postman", level: "API Testing", code: "REQ-2" },
  { name: "Git", level: "Version Control", code: "VCS-G" },
  { name: "OpenAPI", level: "Standards", code: "SPEC-1" },
  { name: "Pandas", level: "Data Science", code: "DS-PD" },
];

// The Replacement for Icons: A "Living" Data Grid
const QuantumGrid = ({ isHovered }: { isHovered: boolean }) => {
  return (
    <div className="grid grid-cols-3 gap-1 w-8 h-8">
      {[...Array(9)].map((_, i) => (
        <motion.div
          key={i}
          className="w-full h-full rounded-[1px]"
          animate={{
            backgroundColor: isHovered 
              ? ["rgba(197,160,89,0.2)", "rgba(197,160,89,1)", "rgba(197,160,89,0.2)"] 
              : "rgba(255,255,255,0.1)",
          }}
          transition={{
            duration: isHovered ? 0.4 : 2,
            repeat: Infinity,
            delay: isHovered ? Math.random() * 0.2 : i * 0.1, // Random scramble on hover
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

const SkillChip = ({ item }: { item: typeof row1[0] }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative mx-3 flex items-center gap-5 min-w-[240px] rounded-sm border border-white/5 bg-[#080808] px-6 py-5 transition-all duration-500 hover:border-[#C5A059]/40 hover:bg-[#C5A059]/5 cursor-default"
    >
      {/* 1. The Interactive "Thing" (Quantum Grid) */}
      <div className="shrink-0">
        <QuantumGrid isHovered={isHovered} />
      </div>
      
      {/* 2. Text Content */}
      <div className="flex flex-col relative z-10">
        <div className="flex items-center justify-between w-full gap-4">
           <span className="font-display text-lg text-zinc-200 tracking-wide transition-colors duration-300 group-hover:text-white">
             {item.name}
           </span>
           {/* Code Badge */}
           <span className="font-mono text-[9px] text-white/20 group-hover:text-[#C5A059] transition-colors">
             {item.code}
           </span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-600 transition-colors duration-300 group-hover:text-[#C5A059]/80 mt-1">
          {item.level}
        </span>
      </div>

      {/* 3. Luxury Scanline Effect */}
      <div className="absolute inset-0 overflow-hidden rounded-sm pointer-events-none">
          <motion.div 
            className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#C5A059] to-transparent opacity-0 group-hover:opacity-50"
            initial={{ left: "0%" }}
            animate={{ left: isHovered ? "100%" : "0%" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
      </div>
    </div>
  );
};

const SkillsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const x1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section id="skills" ref={containerRef} className="relative py-32 bg-[#050505] overflow-hidden border-t border-white/5">
      
      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]" 
           style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '50px 50px' }} 
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] pointer-events-none" />

      {/* Header */}
      <div className="container mx-auto px-6 mb-20 flex flex-col md:flex-row items-end justify-between gap-6 relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
             <div className="w-12 h-px bg-[#C5A059]" />
             <span className="text-[#C5A059] font-mono text-xs tracking-[0.3em] uppercase">
               System Capabilities
             </span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl text-white">
            Technical <span className="text-zinc-700 italic">Matrix</span>
          </h2>
        </div>
        
        <div className="hidden md:flex items-center gap-4 opacity-50">
          <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest text-right">
            Processing Power<br/>100% Optimal
          </span>
          <div className="flex gap-1">
             {[...Array(3)].map((_,i) => (
                <div key={i} className="w-1 h-8 bg-[#C5A059]/20" />
             ))}
             <div className="w-1 h-8 bg-[#C5A059] animate-pulse" />
          </div>
        </div>
      </div>

      {/* Infinite Scroll Container */}
      <div className="relative flex flex-col gap-8 w-full overflow-hidden">
        
        {/* Top Row */}
        <motion.div style={{ x: x1 }} className="flex w-full">
          <div className="flex w-max animate-marquee hover:pause">
            {[...row1, ...row1, ...row1].map((item, i) => (
              <SkillChip key={`r1-${i}`} item={item} />
            ))}
          </div>
        </motion.div>

        {/* Bottom Row */}
        <motion.div style={{ x: x2 }} className="flex w-full">
          <div className="flex w-max animate-marquee-reverse hover:pause">
            {[...row2, ...row2, ...row2].map((item, i) => (
              <SkillChip key={`r2-${i}`} item={item} />
            ))}
          </div>
        </motion.div>

      </div>

      <style>{`
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee 40s linear infinite reverse;
        }
        .hover\\:pause:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default SkillsSection;