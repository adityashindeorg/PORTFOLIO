import { ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const SectionReveal = ({ children, className = '', delay = 0 }: SectionRevealProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const springConfig = { stiffness: 100, damping: 30 };
  
  const y = useSpring(
    useTransform(scrollYProgress, [0, 0.3], [80, 0]),
    springConfig
  );
  
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0, 1]),
    springConfig
  );

  const scale = useSpring(
    useTransform(scrollYProgress, [0, 0.3], [0.95, 1]),
    springConfig
  );

  return (
    <motion.div
      ref={containerRef}
      className={`relative ${className}`}
      style={{
        y: isInView ? y : 80,
        opacity: isInView ? opacity : 0,
        scale: isInView ? scale : 0.95,
      }}
    >
      {/* Reveal curtain effect */}
      <motion.div
        className="absolute inset-0 bg-obsidian z-50 pointer-events-none origin-top"
        initial={{ scaleY: 1 }}
        animate={isInView ? { scaleY: 0 } : { scaleY: 1 }}
        transition={{ 
          duration: 1.2, 
          delay: delay,
          ease: [0.76, 0, 0.24, 1] 
        }}
      />
      
      {/* Gold line accent on reveal */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent z-50 pointer-events-none"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: [0, 1, 0] } : { scaleX: 0 }}
        transition={{ 
          duration: 1.5, 
          delay: delay + 0.3,
          ease: "easeInOut" 
        }}
      />
      
      {children}
    </motion.div>
  );
};

export default SectionReveal;
