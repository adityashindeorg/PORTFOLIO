import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// --- ASSETS ---
import projectYosan from '@/assets/YOSAN.png';
import projectOrbit from '@/assets/ORBIT.png';
import projectAgency from '@/assets/CREA.jpeg';

interface Project {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  description: string;
  image?: string; // Optional now
  tags: string[];
  stats: { label: string; value: string }[];
  link?: string;
  status: 'completed' | 'in-progress'; // Status flag
}

const projects: Project[] = [
  {
    id: 1,
    title: "Yosan",
    subtitle: "Secure Cloud Architecture",
    category: "Full Stack Application",
    year: "2024",
    status: 'completed',
    description: "A production-ready ecosystem featuring secure OAuth 2.0 authentication and real-time Firestore synchronization. Engineered for scalability and data persistence.",
    image: projectYosan,
    tags: ["React.js", "Firebase", "OAuth 2.0", "Firestore"],
    stats: [
      { label: "Uptime", value: "99.9%" },
      { label: "Security", value: "Auth 2.0" },
      { label: "Sync", value: "Real-time" },
    ],
    link: "https://yosanos.netlify.app/"
  },
  {
    id: 2,
    title: "Orbit OS",
    subtitle: "SaaS Analytics Engine",
    category: "Enterprise Dashboard",
    year: "2025",
    status: 'completed',
    description: "A modular SaaS architecture focused on real-time activity tracking and data visualization. Features a high-performance component library and responsive grid systems designed for scalability.",
    image: projectOrbit,
    tags: ["React.js", "Tailwind CSS", "SaaS Architecture", "Analytics"],
    stats: [
      { label: "Components", value: "50+" },
      { label: "Latency", value: "<100ms" },
      { label: "Modules", value: "12+" },
    ],
    link: "https://orbitosx.netlify.app/"
  },
  {
    id: 3,
    title: "CashCheck AI",
    subtitle: "Financial Intelligence",
    category: "AI Integration",
    year: "2024",
    status: 'in-progress', // MARKED AS IN PROGRESS
    description: "Bridging Python-based Machine Learning models with a reactive frontend. A specialized interface for real-time currency validation and counterfeit detection algorithms.",
    // No image needed, we use the generator
    tags: ["Python", "Machine Learning", "React.js", "Computer Vision"],
    stats: [
      { label: "Training", value: "85%" },
      { label: "Model", value: "ResNet" },
      { label: "Status", value: "Active" },
    ],
  },
  {
    id: 4,
    title: "Adi Design Agency",
    subtitle: "API-Driven Experience",
    category: "Dynamic Web Application",
    year: "2025",
    status: 'completed',
    description: "A fully dynamic agency platform leveraging external REST APIs for content delivery. Demonstrates seamless front-end integration with live data sources and immersive UI patterns.",
    image: projectAgency,
    tags: ["React.js", "REST API", "Framer Motion", "Data Fetching"],
    stats: [
      { label: "Performance", value: "100%" },
      { label: "API Calls", value: "Optimized" },
      { label: "Integration", value: "Seamless" },
    ],
    link: "https://adityashindeorg.github.io/adi-design-agency/"
  },
];

// --- THE NEURAL PIXEL GENERATOR (Luxury Interaction) ---
const NeuralPixelGenerator = () => {
  const [pixels, setPixels] = useState<number[]>([]);

  useEffect(() => {
    // Generate a static grid reference
    setPixels(Array.from({ length: 64 })); // 8x8 grid abstract
  }, []);

  return (
    <div className="w-full h-full bg-[#050505] relative overflow-hidden flex items-center justify-center">
      {/* 1. The Scanning Grid */}
      <div className="grid grid-cols-8 gap-1 w-full h-full opacity-30 p-4">
        {pixels.map((_, i) => (
          <motion.div
            key={i}
            className="bg-[#C5A059] rounded-[1px]"
            animate={{
              opacity: [0.05, 0.4, 0.05],
              scale: [0.8, 1, 0.8],
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* 2. The Scanner Line */}
      <motion.div
        className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent shadow-[0_0_20px_#C5A059]"
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 4, ease: "linear", repeat: Infinity }}
      />

      {/* 3. The Central "Processing" Core */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <div className="relative w-24 h-24 border border-[#C5A059]/20 flex items-center justify-center">
            {/* Corner Markers */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#C5A059]" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#C5A059]" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#C5A059]" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#C5A059]" />
            
            <motion.div 
               className="font-mono text-[#C5A059] text-xs animate-pulse"
               animate={{ opacity: [0.5, 1, 0.5] }}
               transition={{ duration: 0.5, repeat: Infinity }}
            >
               SCANNING
            </motion.div>
        </div>
      </div>
      
      {/* 4. Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#050505_100%)]" />
    </div>
  );
};

const ProjectCard = ({ 
  project, 
  index,
  isActive,
  onHover,
}: { 
  project: Project; 
  index: number;
  isActive: boolean;
  onHover: (id: number | null) => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const imageY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.1]);

  return (
    <motion.div
      ref={cardRef}
      className={`relative flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center`}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* ----------------- VISUAL CONTAINER ----------------- */}
      <motion.div
        className="relative w-full lg:w-3/5 aspect-[16/10] overflow-hidden hover-target group cursor-pointer border border-white/5 bg-[#080808]"
        style={{ y }}
        onMouseEnter={() => onHover(project.id)}
        onMouseLeave={() => onHover(null)}
        onClick={() => project.status === 'completed' && project.link && window.open(project.link, '_blank')}
      >
        {/* Render Logic: Image OR Neural Generator */}
        {project.status === 'in-progress' ? (
          <NeuralPixelGenerator />
        ) : (
          <motion.div
            className="absolute inset-0"
            style={{ y: imageY, scale: imageScale }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-all duration-700 opacity-60 group-hover:opacity-100"
            />
          </motion.div>
        )}

        {/* Status Overlay for In-Progress */}
        {project.status === 'in-progress' && (
          <div className="absolute inset-0 bg-[#050505]/40 backdrop-blur-[2px] flex flex-col items-center justify-end pb-8 z-20 pointer-events-none">
             <div className="flex items-center gap-3 px-4 py-2 border border-[#C5A059]/30 bg-[#050505]/80 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-ping" />
                <span className="text-[#C5A059] font-mono text-[9px] uppercase tracking-[0.2em]">
                   System Training In Progress
                </span>
             </div>
          </div>
        )}

        {/* Standard Hover Border */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            border: '1px solid rgba(197, 160, 89, 0.4)',
            boxShadow: 'inset 0 0 60px rgba(197, 160, 89, 0.1)',
          }}
        />

        {/* Decorative Corners */}
        <div className="absolute top-4 left-4 w-12 h-12 pointer-events-none">
          <div className="absolute top-0 left-0 w-8 h-px bg-[#C5A059]/40" />
          <div className="absolute top-0 left-0 h-8 w-px bg-[#C5A059]/40" />
        </div>
        <div className="absolute bottom-4 right-4 w-12 h-12 pointer-events-none">
          <div className="absolute bottom-0 right-0 w-8 h-px bg-[#C5A059]/40" />
          <div className="absolute bottom-0 right-0 h-8 w-px bg-[#C5A059]/40" />
        </div>

        {/* Category Badge */}
        <div className="absolute top-6 right-6 px-4 py-2 bg-[#050505]/80 backdrop-blur-md border border-[#C5A059]/20 z-20">
          <span className="text-[#C5A059] text-xs font-mono tracking-[0.2em] uppercase">
            {project.category}
          </span>
        </div>

        {/* HOVER REVEAL: Full Stats */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              className="absolute inset-0 flex items-end p-8 z-30 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                className="w-full bg-[#050505]/95 backdrop-blur-xl border border-white/10 p-6 shadow-2xl"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 30, opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                {/* Stats Row */}
                <div className="flex gap-8 mb-4">
                  {project.stats.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="text-center"
                    >
                      <span className="block text-white text-xl font-display">{stat.value}</span>
                      <span className="text-zinc-500 text-[10px] font-mono uppercase tracking-wider">{stat.label}</span>
                    </motion.div>
                  ))}
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                      className="px-3 py-1 text-[10px] font-mono text-[#C5A059] border border-[#C5A059]/30 bg-[#C5A059]/5"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ----------------- TEXT CONTENT ----------------- */}
      <div className={`w-full lg:w-2/5 ${isEven ? 'lg:text-left' : 'lg:text-right'} text-center`}>
        {/* Year & Number */}
        <motion.div
          className={`flex items-center gap-4 mb-6 ${isEven ? 'lg:justify-start' : 'lg:justify-end'} justify-center`}
          initial={{ opacity: 0, x: isEven ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-[#C5A059] font-mono text-sm tracking-[0.2em]">{project.year}</span>
          <div className="w-12 h-px bg-[#C5A059]/40" />
          <span className="font-display text-3xl text-[#C5A059]/40 italic">0{project.id}</span>
        </motion.div>

        {/* Title */}
        <motion.h3
          className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-2 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {project.title}
        </motion.h3>
        
        <motion.p
          className="font-display text-xl md:text-2xl text-[#C5A059] italic mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {project.subtitle}
        </motion.p>

        {/* Description */}
        <motion.p
          className="font-body text-zinc-400 leading-relaxed mb-8 max-w-md mx-auto lg:mx-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          {project.description}
        </motion.p>

        {/* Action Button Logic */}
        {project.status === 'in-progress' ? (
          <div className={`inline-flex items-center gap-3 px-8 py-4 font-mono text-xs tracking-[0.2em] uppercase text-zinc-500 border border-white/10 ${isEven ? '' : 'lg:ml-auto'}`}>
             <span className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A059] opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C5A059]"></span>
             </span>
             <span>In Development</span>
          </div>
        ) : (
          project.link && (
            <motion.button
              onClick={() => window.open(project.link, '_blank')}
              className={`group relative inline-flex items-center gap-3 px-8 py-4 font-mono text-sm tracking-[0.2em] uppercase text-[#C5A059] border border-[#C5A059]/40 hover:border-[#C5A059] transition-all duration-500 hover-target ${isEven ? '' : 'lg:ml-auto'}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              whileHover={{ 
                boxShadow: '0 0 40px rgba(197, 160, 89, 0.2)',
              }}
            >
              <span className="relative z-10">View Deployed Project</span>
              <motion.span
                className="relative z-10"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
              <motion.div
                className="absolute inset-0 bg-[#C5A059]/10 origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
              />
            </motion.button>
          )
        )}
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<number | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <section id="projects" ref={containerRef} className="relative py-32 md:py-48 overflow-hidden bg-[#050505]">
      {/* Background with parallax */}
      <motion.div 
        className="absolute inset-0 bg-[#050505]"
        style={{ y: backgroundY }}
      />
      
      {/* Decorative elements */}
      <div className="absolute w-[700px] h-[700px] -left-96 top-1/4 opacity-5 bg-[#C5A059] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] -right-64 bottom-1/4 opacity-5 bg-[#C5A059] blur-[150px] rounded-full pointer-events-none" />
      
      {/* Floating geometric shapes */}
      <motion.div
        className="absolute left-16 top-1/3 w-32 h-32 border border-[#C5A059]/10 rotate-45 hidden lg:block"
        animate={{ rotate: [45, 90, 45], y: [0, 20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-24 bottom-1/3 w-24 h-24 border border-[#C5A059]/10 hidden lg:block"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-24 md:mb-32"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Ornament */}
          <motion.div
            className="flex items-center justify-center gap-4 mb-8"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-[#C5A059]/40" />
            <motion.div
              className="w-3 h-3 border border-[#C5A059] rotate-45"
              animate={{ rotate: [45, 225, 45] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-[#C5A059]/40" />
          </motion.div>

          <motion.span
            className="text-[#C5A059] font-mono text-sm tracking-[0.4em] uppercase block mb-6"
          >
            Selected Works
          </motion.span>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-white mb-6">
            The Portfolio
          </h2>
          <p className="font-display text-xl md:text-2xl text-zinc-500 italic max-w-2xl mx-auto">
            A curated collection of digital masterpieces, each crafted with obsessive attention to detail
          </p>
        </motion.div>

        {/* Projects */}
        <div className="space-y-32 md:space-y-48">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isActive={activeId === project.id}
              onHover={setActiveId}
            />
          ))}
        </div>

        {/* View all CTA */}
        <motion.div
          className="text-center mt-32"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex flex-col items-center gap-6 hover-target group cursor-pointer"
            whileHover={{ y: -5 }}
            onClick={() => window.open('https://github.com/adityashindeorg', '_blank')}
          >
            <span className="font-display text-3xl md:text-4xl text-white group-hover:text-[#C5A059] transition-all duration-500">
              Explore All Projects
            </span>
            <motion.div
              className="w-16 h-16 rounded-full border border-[#C5A059]/40 flex items-center justify-center group-hover:border-[#C5A059] group-hover:shadow-[0_0_40px_rgba(197,160,89,0.3)] transition-all duration-500"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-[#C5A059] text-2xl">↓</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;