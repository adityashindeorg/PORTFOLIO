import { useRef, useState, MouseEvent } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

// --- DATA ---
const experiences = [
  {
    id: 1,
    role: "Software Developer Intern",
    company: "Lockated",
    period: "Feb 2025 – Sept 2025",
    description: "Architected enterprise SaaS platforms with cutting-edge technologies. Delivered scalable React solutions that redefined digital excellence for real estate giants.",
    highlights: ["React Architecture", "SaaS Scalability", "Performance Tuning"],
  },
  {
    id: 2,
    role: "Graphic Design Intern",
    company: "Makers Row",
    period: "Sep 2024 – Jan 2025",
    description: "Transformed visionary Figma designs into pixel-perfect interfaces. Bridged the gap between artistic vision and technical precision for a US-based client.",
    highlights: ["Figma Mastery", "Design Systems", "Visual Identity"],
  },
  {
    id: 3,
    role: "UI/UX Designer",
    company: "GDSC",
    period: "Jul 2023 – Aug 2024",
    description: "Designed intuitive user experiences and contributed to community design initiatives. Established new standards for usability and accessibility.",
    highlights: ["User Research", "Prototyping", "Interaction Design"],
  },
];

const ExperienceCard = ({ 
  experience, 
  index, 
  isActive, 
  onHover 
}: { 
  experience: typeof experiences[0]; 
  index: number;
  isActive: boolean;
  onHover: (id: number | null) => void;
}) => {
  const isLeft = index % 2 === 0;
  
  // --- MOUSE PARALLAX EFFECT ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const xSpring = useSpring(mouseX, springConfig);
  const ySpring = useSpring(mouseY, springConfig);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    mouseX.set(x * 40); // 40px movement range
    mouseY.set(y * 40);
  }

  return (
    <motion.div
      className={`relative flex items-center ${isLeft ? 'md:justify-start' : 'md:justify-end'} justify-center`}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* 1. CENTRAL JEWEL (Timeline Node) */}
      <div className="absolute left-1/2 transform -translate-x-1/2 z-20 hidden md:flex items-center justify-center">
        <motion.div
          animate={{ 
            scale: isActive ? 1.5 : 1,
            backgroundColor: isActive ? "#C5A059" : "#050505",
            borderColor: isActive ? "rgba(197, 160, 89, 0.5)" : "rgba(255, 255, 255, 0.1)"
          }}
          className="w-3 h-3 rounded-full border border-white/20 transition-all duration-500 shadow-[0_0_20px_-5px_rgba(0,0,0,1)]"
        />
      </div>

      {/* 2. THE CARD */}
      <div 
        className={`w-full md:w-[45%] ${isLeft ? 'md:pr-16' : 'md:pl-16'} px-4 relative perspective-1000`}
        onMouseEnter={() => onHover(experience.id)}
        onMouseLeave={() => onHover(null)}
        onMouseMove={handleMouseMove}
      >
        <motion.div 
          className="group relative overflow-hidden rounded-sm border border-white/5 bg-[#080808] p-10 md:p-12 transition-all duration-700 hover:border-[#C5A059]/40 hover:shadow-[0_20px_80px_-20px_rgba(0,0,0,0.8)]"
          whileHover={{ y: -5 }}
        >
          
          {/* A. 3D FLOATING NUMBER (Behind Text) */}
          <motion.div 
            style={{ x: xSpring, y: ySpring }}
            className="absolute -top-10 -right-6 font-display text-[180px] leading-none text-white/[0.02] select-none pointer-events-none z-0 transition-colors duration-700 group-hover:text-[#C5A059]/[0.04]"
          >
            0{experience.id}
          </motion.div>

          {/* B. CONTENT (Foreground) */}
          <div className="relative z-10">
            
            {/* Header: Period */}
            <div className="flex items-center gap-4 mb-8">
               <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#C5A059]">
                 {experience.period}
               </span>
               <div className="h-px w-12 bg-[#C5A059]/30" />
            </div>

            {/* Role & Company */}
            <div className="mb-8">
              <h3 className="font-display text-3xl md:text-4xl text-white mb-2 leading-[1.1] group-hover:text-[#C5A059] transition-colors duration-500">
                {experience.role}
              </h3>
              <div className="text-lg text-zinc-500 font-display italic">
                @ {experience.company}
              </div>
            </div>

            {/* Description */}
            <p className="font-body text-zinc-400 text-sm leading-relaxed mb-8 border-l border-white/5 pl-6 group-hover:border-[#C5A059]/50 transition-colors duration-500">
              {experience.description}
            </p>

            {/* Tech Badges (Holographic) */}
            <div className="flex flex-wrap gap-2">
              {experience.highlights.map((tech, i) => (
                <span 
                  key={i} 
                  className="px-3 py-1 text-[9px] font-mono uppercase tracking-widest text-zinc-500 border border-white/5 bg-white/[0.01] group-hover:text-white group-hover:border-[#C5A059]/20 group-hover:bg-[#C5A059]/5 transition-all duration-500"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* C. LUXURY SHINE (Moves across on hover) */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />
          
          {/* D. GOLD RIM LIGHT (Bottom) */}
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C5A059]/0 to-transparent group-hover:via-[#C5A059]/50 transition-all duration-700" />

        </motion.div>
      </div>
    </motion.div>
  );
};

const ExperienceSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<number | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Parallax line height
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.7], ["0%", "100%"]);

  return (
    <section id="experience" ref={containerRef} className="relative py-40 bg-[#050505] overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#050505] to-transparent z-10" />
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#050505] to-transparent z-10" />

      <div className="container mx-auto px-6 relative z-20">
        
        {/* Header */}
        <motion.div
          className="text-center mb-40"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            className="inline-block text-[#C5A059] font-mono text-xs tracking-[0.4em] uppercase mb-4 border border-[#C5A059]/20 px-4 py-2 rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            Career Trajectory
          </motion.span>
          <h2 className="font-display text-6xl md:text-8xl text-white tracking-tight">
            The <span className="text-zinc-800 italic">Timeline</span>
          </h2>
        </motion.div>

        {/* Timeline Layout */}
        <div className="relative max-w-7xl mx-auto">
          
          {/* Central Golden Thread */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-px bg-white/5 hidden md:block">
            <motion.div
              className="w-full bg-[#C5A059] shadow-[0_0_30px_#C5A059]"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Cards */}
          <div className="space-y-32">
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                index={index}
                isActive={activeId === experience.id}
                onHover={setActiveId}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ExperienceSection;