import { useRef, useEffect, useState, MouseEvent } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // --- MOUSE PHYSICS ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth springs for fluid movement
  const springConfig = { damping: 20, stiffness: 100 };
  
  // Tilt Rotation (The card tilts towards mouse)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);
  
  // Parallax Layers (The "Echo" layers move at different speeds)
  const layer1X = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), springConfig);
  const layer1Y = useSpring(useTransform(mouseY, [-0.5, 0.5], [-20, 20]), springConfig);
  
  const layer2X = useSpring(useTransform(mouseX, [-0.5, 0.5], [-40, 40]), springConfig);
  const layer2Y = useSpring(useTransform(mouseY, [-0.5, 0.5], [-40, 40]), springConfig);

  // Scroll Effects
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 500], [0, 150]);
  const contentOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  const handleMouseMove = (e: MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    const x = e.clientX / innerWidth - 0.5;
    const y = e.clientY / innerHeight - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030303] perspective-1000"
      style={{ perspective: "1200px" }}
    >
      
      {/* 1. ATMOSPHERE LAYERS */}
      {/* The "Aurora" Top Light */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[120%] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(197,160,89,0.15),transparent_70%)] blur-[100px] pointer-events-none z-0 opacity-60" />
      
      {/* Moving "Stardust" Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-[#C5A059] rounded-full opacity-20"
            style={{
              width: Math.random() * 3 + 1 + "px",
              height: Math.random() * 3 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
            }}
            animate={{
              y: [0, Math.random() * -100 - 50],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10,
            }}
          />
        ))}
      </div>

      {/* 2. ARCHITECTURAL GRID (Floor) */}
      <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t from-[#C5A059]/[0.02] to-transparent z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] pointer-events-none z-0" />


      {/* 3. MAIN CONTENT (3D TILT CONTAINER) */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center"
        style={{ 
          rotateX, 
          rotateY, 
          y: contentY, 
          opacity: contentOpacity,
          transformStyle: "preserve-3d" 
        }}
      >
        
        {/* TOP BADGE */}
        <motion.div 
          className="mb-12 flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          style={{ transform: "translateZ(50px)" }} // Pops out
        >
          <div className="h-8 w-[1px] bg-gradient-to-b from-transparent to-[#C5A059]" />
          <div className="px-4 py-1.5 border border-[#C5A059]/30 rounded-full bg-[#C5A059]/[0.02] backdrop-blur-sm flex items-center gap-3">
             <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse shadow-[0_0_10px_#C5A059]" />
             <span className="text-[10px] font-mono text-[#C5A059] tracking-[0.3em] uppercase">
               System Online
             </span>
          </div>
        </motion.div>

        {/* THE "GOLDEN ECHO" TYPOGRAPHY */}
        <div className="relative mb-8 text-center group cursor-default">
          
          {/* Layer 1: The Shadow/Echo (Drifts far) */}
          <motion.h1 
            style={{ x: layer2X, y: layer2Y }}
            className="font-display text-8xl sm:text-9xl md:text-[11rem] leading-[0.85] tracking-tighter text-[#C5A059]/10 absolute inset-0 blur-sm select-none"
          >
            ADITYA<br/>SHINDE
          </motion.h1>

          {/* Layer 2: The Mid-Tone (Drifts slightly) */}
          <motion.h1 
            style={{ x: layer1X, y: layer1Y }}
            className="font-display text-8xl sm:text-9xl md:text-[11rem] leading-[0.85] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#C5A059]/40 to-transparent absolute inset-0 select-none mix-blend-overlay"
          >
            ADITYA<br/>SHINDE
          </motion.h1>

          {/* Layer 3: The Hero (Sharp, Front) */}
          <motion.h1 
            className="font-display text-8xl sm:text-9xl md:text-[11rem] leading-[0.85] tracking-tighter text-white relative z-10 drop-shadow-2xl"
            style={{ transform: "translateZ(100px)" }} // Massive pop out
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-zinc-500">
              ADITYA
            </span>
            <br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#C5A059] via-[#8A6E36] to-zinc-800 italic pr-4">
              SHINDE
            </span>
          </motion.h1>
        </div>

        {/* ROLES / SUBTITLE */}
        <motion.div 
          className="flex flex-col md:flex-row items-center gap-6 md:gap-12 mt-8"
          style={{ transform: "translateZ(40px)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <div className="flex flex-col items-center md:items-end">
             <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest mb-1">Role 01</span>
             <span className="text-zinc-300 font-display text-lg tracking-wide">Software Developer</span>
          </div>
          
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-[#C5A059]/50 to-transparent hidden md:block" />
          
          <div className="flex flex-col items-center md:items-start">
             <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest mb-1">Role 02</span>
             <span className="text-zinc-300 font-display text-lg tracking-wide">UI/UX Designer</span>
          </div>
        </motion.div>

        {/* CTA BUTTONS */}
        <motion.div 
          className="mt-16 flex gap-6"
          style={{ transform: "translateZ(60px)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <a href="#projects" className="group relative px-8 py-4 bg-[#C5A059] overflow-hidden">
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative z-10 font-mono text-xs font-bold text-black tracking-[0.2em] uppercase group-hover:text-black transition-colors">
              View Work
            </span>
          </a>
          <a href="#contact" className="group px-8 py-4 border border-white/10 hover:border-[#C5A059] transition-colors duration-300">
            <span className="font-mono text-xs font-bold text-white tracking-[0.2em] uppercase group-hover:text-[#C5A059] transition-colors">
              Contact
            </span>
          </a>
        </motion.div>

      </motion.div>

      {/* 4. HUD / DECORATIONS */}
      {/* Bottom Ticker */}
      <motion.div 
        className="absolute bottom-10 left-0 w-full overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="flex justify-center items-center gap-4 text-[9px] font-mono text-[#C5A059]/40 tracking-widest uppercase">
           <span>Initialization Complete</span>
           <span className="w-1 h-1 rounded-full bg-[#C5A059]" />
           <span>Ready for Interaction</span>
           <span className="w-1 h-1 rounded-full bg-[#C5A059]" />
           <span>Scroll to Begin</span>
        </div>
      </motion.div>

      {/* Corner Brackets */}
      <div className="absolute top-8 left-8 w-4 h-4 border-l border-t border-[#C5A059]/30" />
      <div className="absolute top-8 right-8 w-4 h-4 border-r border-t border-[#C5A059]/30" />
      <div className="absolute bottom-8 left-8 w-4 h-4 border-l border-b border-[#C5A059]/30" />
      <div className="absolute bottom-8 right-8 w-4 h-4 border-r border-b border-[#C5A059]/30" />

    </section>
  );
};

export default HeroSection;