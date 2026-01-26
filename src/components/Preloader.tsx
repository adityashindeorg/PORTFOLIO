import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [systemStep, setSystemStep] = useState(0);

  const systemChecks = [
    "INITIALIZING KERNEL...",
    "LOADING ASSETS...",
    "VERIFYING BIOMETRICS...",
    "ESTABLISHING SECURE CONNECTION...",
    "ACCESS GRANTED"
  ];

  useEffect(() => {
    // 1. Progress Bar Logic (Fast & Smooth)
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 1200); // Hold for impact
          return 100;
        }
        // Random speed bursts for "processing" realism
        const burst = Math.random() < 0.2 ? 10 : 2;
        return Math.min(prev + burst, 100);
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  // 2. System Check Text Logic (Syncs with progress)
  useEffect(() => {
    const step = Math.floor((progress / 100) * (systemChecks.length - 1));
    setSystemStep(step);
  }, [progress]);

  // ANIMATION VARIANTS
  const curtainVariant = {
    initial: { height: "50vh" },
    exit: { 
      height: 0, 
      transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 } 
    }
  };

  const textReveal = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  return (
    <motion.div
      initial="initial"
      exit="exit"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center cursor-wait"
    >
      {/* TOP CURTAIN 
        (Slides UP on exit)
      */}
      <motion.div
        variants={curtainVariant}
        className="absolute top-0 left-0 w-full bg-[#050505] z-0 border-b border-[#C5A059]/10"
      >
         {/* Top Grain */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]" />
      </motion.div>

      {/* BOTTOM CURTAIN 
        (Slides DOWN on exit)
      */}
      <motion.div
        variants={curtainVariant}
        className="absolute bottom-0 left-0 w-full bg-[#050505] z-0 border-t border-[#C5A059]/10"
      >
         {/* Bottom Grain */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]" />
      </motion.div>

      {/* CONTENT LAYER 
        (Lives in the center, fades out before curtains open)
      */}
      <motion.div 
        className="relative z-10 flex flex-col items-center justify-center w-full max-w-md px-6"
        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.5 } }}
      >
        
        {/* THE "LUXURY" RING LOADER */}
        <div className="relative w-48 h-48 mb-12 flex items-center justify-center">
          {/* Outer Static Ring */}
          <div className="absolute inset-0 border border-[#C5A059]/10 rounded-full" />
          
          {/* Inner Rotating Ring (Slow) */}
          <motion.div 
            className="absolute inset-2 border border-[#C5A059]/20 rounded-full border-t-transparent border-l-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Middle Counter-Rotating Ring (Fast) */}
          <motion.div 
            className="absolute inset-8 border border-[#C5A059]/40 rounded-full border-b-transparent border-r-transparent"
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />

          {/* Center Percentage */}
          <div className="flex flex-col items-center">
             <span className="text-5xl font-display font-light text-[#E4E4E7] tracking-tighter">
               {Math.round(progress)}
             </span>
             <span className="text-[10px] text-[#C5A059] uppercase tracking-[0.3em] mt-1">
               Loaded
             </span>
          </div>
        </div>

        {/* SYSTEM CHECK TEXT (Typewriter feel) */}
        <div className="h-8 overflow-hidden flex flex-col items-center justify-center w-full">
           <AnimatePresence mode="wait">
             <motion.p
               key={systemStep}
               variants={textReveal}
               initial="initial"
               animate="animate"
               exit="exit"
               className="font-mono text-xs text-[#C5A059] tracking-widest uppercase"
             >
               {`> ${systemChecks[systemStep]}`}
             </motion.p>
           </AnimatePresence>
        </div>

        {/* PROGRESS BAR (Thin & Sharp) */}
        <div className="w-full h-[1px] bg-zinc-800 mt-6 relative overflow-hidden">
           <motion.div 
             className="absolute left-0 top-0 h-full bg-[#C5A059] shadow-[0_0_15px_#C5A059]"
             initial={{ width: 0 }}
             animate={{ width: `${progress}%` }}
             transition={{ ease: "linear", duration: 0.1 }}
           />
        </div>

        {/* FOOTER METADATA */}
        <motion.div 
          className="mt-8 flex justify-between w-full opacity-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.5 }}
        >
          <span className="font-mono text-[9px] uppercase tracking-widest">Sys.Config_2026</span>
          <span className="font-mono text-[9px] uppercase tracking-widest">Secure_Mode</span>
        </motion.div>

      </motion.div>
    </motion.div>
  );
};

export default Preloader;