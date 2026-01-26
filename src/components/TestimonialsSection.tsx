import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- ASSETS ---
import certJP from '@/assets/JP.png';
import certAWS from '@/assets/AWS.png';
import certBCG from '@/assets/BCG.png';
import certAccenture from '@/assets/ACCENTURE.png';
import certIBM from '@/assets/IBM.png';
import certHP from '@/assets/HP.png';
import certDeloitte from '@/assets/DELOITE.png';

// --- DATA ---
const certifications = [
  {
    id: 1,
    title: "Software Engineering",
    subtitle: "Job Simulation",
    issuer: "J.P. Morgan",
    date: "Aug 2025",
    skills: ["System Architecture", "Financial Tech", "Python", "React"],
    credentialId: "GvYKNSW8Wq5jmJym",
    logoChar: "J",
    accent: "#0A2F6B",
    image: certJP,
  },
  {
    id: 2,
    title: "AWS Solutions Architect",
    subtitle: "Job Simulation",
    issuer: "Forage",
    date: "Aug 2025",
    skills: ["Cloud Architecture", "Scalability", "Security"],
    logoChar: "A",
    accent: "#FF9900",
    image: certAWS,
  },
  {
    id: 3,
    title: "Strategic Experience Design",
    subtitle: "Job Simulation",
    issuer: "BCG X",
    date: "Jul 2025",
    skills: ["Strategy", "UX Design", "Business Logic"],
    logoChar: "B",
    accent: "#004D40",
    image: certBCG,
  },
  {
    id: 4,
    title: "Product Design",
    subtitle: "Job Simulation",
    issuer: "Accenture NA",
    date: "Jun 2024",
    skills: ["UI/UX Strategy", "Figma", "User Research"],
    logoChar: "A",
    accent: "#A100FF",
    image: certAccenture,
  },
  {
    id: 5,
    title: "Artificial Intelligence",
    subtitle: "Fundamentals",
    issuer: "IBM SkillsBuild",
    date: "Apr 2024",
    skills: ["AI Concepts", "Machine Learning", "Ethics"],
    logoChar: "I",
    accent: "#006699",
    image: certIBM,
  },
  {
    id: 6,
    title: "Technology Consulting",
    subtitle: "Job Simulation",
    issuer: "Deloitte",
    date: "Jul 2024",
    skills: ["Cloud Logic", "Data Structures", "Forensics"],
    credentialId: "F6XCJCIA7FqwTp7T2",
    logoChar: "D",
    accent: "#86BC25",
    image: certDeloitte,
  },
  {
    id: 7,
    title: "Customer Experience",
    subtitle: "Business Success",
    issuer: "HP",
    date: "Nov 2025",
    skills: ["CRM Strategy", "Client Relations", "Sales Logic"],
    logoChar: "H",
    accent: "#0096D6",
    image: certHP,
  },
];

// SPEED: 4 seconds
const AUTOPLAY_DURATION = 4000;

const TestimonialsSection = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const timerRef = useRef<any>(null);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % certifications.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setIndex((prev) => (prev === 0 ? certifications.length - 1 : prev - 1));
  }, []);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(nextSlide, AUTOPLAY_DURATION);
    return () => clearInterval(timerRef.current);
  }, [nextSlide, index]);

  const currentCert = certifications[index];
  const luxuryEase = [0.25, 1, 0.5, 1] as const; 
  const transitionDuration = 0.8;

  const contentVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
      zIndex: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      zIndex: 1,
      transition: { duration: transitionDuration, ease: luxuryEase },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
      zIndex: 0,
      transition: { duration: transitionDuration, ease: luxuryEase },
    }),
  };

  const textStaggerVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (custom: number) => ({
      y: 0,
      opacity: 1,
      transition: { delay: 0.1 + (custom * 0.05), duration: 0.6, ease: luxuryEase }
    }),
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  return (
   <section id="credentials" className="relative h-[90vh] min-h-[700px] bg-[#050505] overflow-hidden flex items-center group select-none">
      {/* 1. DYNAMIC BACKGROUND */}
      <AnimatePresence>
        <motion.div
          key={`bg-${index}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 60% 50%, ${currentCert.accent}, transparent 70%)`,
          }}
        />
      </AnimatePresence>
      
      {/* 2. TEXTURE OVERLAYS */}
      <div className="absolute inset-0 opacity-[0.04] z-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10 w-full h-full flex flex-col justify-center">
        
        {/* HEADER LABEL */}
        <div className="absolute top-12 left-6 md:left-12 flex items-center gap-4">
          <div className="w-12 h-px bg-[#C5A059]" />
          <span className="text-[#C5A059] font-mono text-xs tracking-[0.3em] uppercase">
            Credentials & Licenses
          </span>
        </div>

        {/* MAIN SLIDER STAGE */}
        <div className="relative w-full max-w-6xl mx-auto h-[500px] flex items-center">
          
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={contentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-24"
            >
              
              {/* LEFT COLUMN: Typography */}
              <div className="w-full md:w-1/2 relative z-20">
                <motion.span 
                   variants={textStaggerVariants} custom={0} initial="hidden" animate="visible" exit="exit"
                   className="font-display text-9xl text-white/5 absolute -top-24 -left-12 pointer-events-none"
                >
                  0{index + 1}
                </motion.span>

                <motion.div variants={textStaggerVariants} custom={1} initial="hidden" animate="visible" exit="exit">
                   <h3 className="text-[#C5A059] font-mono text-sm tracking-widest uppercase mb-4 flex items-center gap-2">
                     <span className="w-2 h-2 bg-[#C5A059] rounded-full" />
                     {currentCert.issuer}
                   </h3>
                </motion.div>

                <motion.h2 
                   variants={textStaggerVariants} custom={2} initial="hidden" animate="visible" exit="exit"
                   className="font-display text-5xl md:text-7xl text-white leading-[1.1] mb-2"
                >
                  {currentCert.title}
                </motion.h2>

                <motion.p 
                   variants={textStaggerVariants} custom={3} initial="hidden" animate="visible" exit="exit"
                   className="font-display text-2xl md:text-3xl text-white/40 italic mb-10"
                >
                  {currentCert.subtitle}
                </motion.p>

                {/* Info Grid */}
                <motion.div 
                   variants={textStaggerVariants} custom={4} initial="hidden" animate="visible" exit="exit"
                   className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8"
                >
                  <div>
                    <span className="block text-[10px] text-zinc-500 uppercase tracking-widest mb-2">Issued</span>
                    <span className="block text-white font-mono">{currentCert.date}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-zinc-500 uppercase tracking-widest mb-2">Verification</span>
                    <span className="block text-white font-mono text-xs">
                      {currentCert.credentialId ? `ID: ${currentCert.credentialId}` : 'Verified Credential'}
                    </span>
                  </div>
                </motion.div>
                
                {/* Skills Tags */}
                <motion.div 
                   variants={textStaggerVariants} custom={5} initial="hidden" animate="visible" exit="exit"
                   className="mt-8 flex flex-wrap gap-2"
                >
                  {currentCert.skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 border border-white/10 text-[10px] text-zinc-400 uppercase tracking-wider bg-white/5">
                      {skill}
                    </span>
                  ))}
                </motion.div>
              </div>

              {/* RIGHT COLUMN: The Certificate Visual */}
              <div className="w-full md:w-1/2 h-full relative flex items-center justify-center">
                 {/* Giant Letter Behind */}
                 <motion.div
                   initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
                   animate={{ opacity: 1, scale: 1, rotate: 0 }}
                   exit={{ opacity: 0, scale: 1.1, rotate: -5 }}
                   transition={{ duration: 1.0, ease: luxuryEase }}
                   className="absolute z-0"
                 >
                    <span 
                      className="font-display text-[20rem] md:text-[30rem] leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/5 to-transparent select-none pointer-events-none"
                      style={{ WebkitTextStroke: '1px rgba(255,255,255,0.05)' }}
                    >
                      {currentCert.logoChar}
                    </span>
                 </motion.div>
                 
                 {/* The Certificate Card (Glass Encased & Smart Cropped) */}
                 <motion.div
                    initial={{ y: 60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -60, opacity: 0 }}
                    transition={{ delay: 0.1, duration: 0.8, ease: luxuryEase }}
                    // Glass Container Styling
                    className="relative z-10 w-full max-w-[400px] aspect-[16/10] rounded-lg overflow-hidden"
                    style={{
                      // Multi-layered box-shadow for thick glass effect
                      boxShadow: `
                        0 0 0 1px rgba(255, 255, 255, 0.1),
                        0 0 0 4px rgba(5, 5, 5, 0.6), 
                        0 20px 50px rgba(0,0,0,0.5),
                        inset 0 0 30px rgba(255,255,255,0.05)
                      `
                    }}
                 >
                    {/* Glass Background Layer */}
                    <div className="absolute inset-0 bg-[#080808]/40 backdrop-blur-md" />
                    
                    {/* Image Container (Inset) */}
                    <div className="absolute inset-[4px] rounded-md overflow-hidden relative z-20 bg-[#F5F5F5]">
                        {/* The Smart-Cropped Image */}
                        <img 
                          src={currentCert.image} 
                          alt={currentCert.title} 
                          // Changed from object-contain to object-cover for smart cropping
                          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        />
                        
                        {/* Luxury Overlays */}
                        {/* Darken slightly to integrate with dark theme */}
                        <div className="absolute inset-0 bg-[#050505]/10 mix-blend-multiply pointer-events-none" />
                        {/* Glass Shine reflection */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-70 pointer-events-none mix-blend-overlay" />
                        {/* Subtle accent tint */}
                        <div className="absolute inset-0 mix-blend-overlay opacity-20 pointer-events-none" style={{ backgroundColor: currentCert.accent }} />
                    </div>
                 </motion.div>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* CONTROLS (Bottom) */}
          <div className="absolute -bottom-16 md:bottom-0 left-0 w-full flex justify-between items-end z-30">
             
             {/* Progress Indicators */}
             <div className="flex gap-2">
                {certifications.map((_, i) => (
                  <div 
                    key={i}
                    onClick={() => {
                        setDirection(i > index ? 1 : -1);
                        setIndex(i);
                    }}
                    className={`h-1 cursor-pointer transition-all duration-500 rounded-full overflow-hidden relative ${i === index ? 'w-24 bg-white/10' : 'w-4 bg-white/5 hover:bg-white/20'}`}
                  >
                    {i === index && (
                      <motion.div 
                        className="absolute inset-0 bg-[#C5A059]"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: AUTOPLAY_DURATION / 1000, ease: "linear" }}
                      />
                    )}
                  </div>
                ))}
             </div>
             
             {/* Navigation Arrows */}
             <div className="flex gap-6">
                <button onClick={prevSlide} className="group flex items-center gap-3 text-white/40 hover:text-white transition-colors">
                  <span className="text-2xl font-light">←</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-300">Prev</span>
                </button>
                <div className="w-px h-6 bg-white/10" />
                <button onClick={nextSlide} className="group flex items-center gap-3 text-white/40 hover:text-white transition-colors">
                  <span className="text-[10px] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-300">Next</span>
                  <span className="text-2xl font-light">→</span>
                </button>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;