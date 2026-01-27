import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  
  // 1. RAW VALUES (No React State lag)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // 2. OPTIMIZED PHYSICS (Snappier, less "draggy")
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  // 3. SMOOTH TRAIL (Optimized for GPU)
  const trailConfig = { damping: 40, stiffness: 200, mass: 0.8 };
  const trailXSpring = useSpring(cursorX, trailConfig);
  const trailYSpring = useSpring(cursorY, trailConfig);

  useEffect(() => {
    // 4. PERFORMANCE: Passive listener for zero-blocking
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Optimized hover detection
    const addHoverListeners = () => {
      const selectors = 'a, button, [role="button"], input, textarea, .hover-target, h1, h2';
      const interactiveElements = document.querySelectorAll(selectors);
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => setIsHovering(false));
      });
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    addHoverListeners();
    
    // Throttled Observer to save CPU
    const observer = new MutationObserver((mutations) => {
       // Only re-run if nodes were added
       if (mutations.some(m => m.addedNodes.length > 0)) {
         addHoverListeners();
       }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
    };
  }, [cursorX, cursorY, isVisible]);

  return (
    <>
      {/* OUTER GLOW TRAIL - Hardware Accelerated */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: trailXSpring,
          y: trailYSpring,
          willChange: 'transform', // FORCE GPU
        }}
        animate={{
          opacity: isVisible ? 0.6 : 0,
        }}
      >
        <div 
          className="w-48 h-48 -ml-24 -mt-24 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(197, 160, 89, 0.08) 0%, transparent 60%)',
            transform: 'translateZ(0)', // HACK: Force separate layer
          }}
        />
      </motion.div>

      {/* MAIN CURSOR - Snappy */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          willChange: 'transform', // FORCE GPU
        }}
        animate={{
          scale: isHovering ? 2 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          scale: { type: "spring", stiffness: 400, damping: 25 },
          opacity: { duration: 0.2 },
        }}
      >
        <motion.div 
          className="relative"
          animate={{
            rotate: isHovering ? 180 : 0,
          }}
          transition={{ duration: 0.4 }}
        >
          {/* The Ring/Dot */}
          <div 
            className={`rounded-full transition-all duration-300 ${
              isHovering 
                ? 'w-12 h-12 -ml-6 -mt-6 bg-transparent border border-[#C5A059]' 
                : 'w-4 h-4 -ml-2 -mt-2 bg-[#C5A059]'
            }`}
            style={{
              boxShadow: isHovering 
                ? '0 0 40px rgba(197, 160, 89, 0.6), inset 0 0 20px rgba(197, 160, 89, 0.3)' 
                : '0 0 30px rgba(197, 160, 89, 0.8)',
            }}
          />
          
          {/* Inner Dot (Only on Hover) */}
          {isHovering && (
            <motion.div
              className="absolute top-1/2 left-1/2 w-1 h-1 -ml-0.5 -mt-0.5 bg-[#C5A059] rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
            />
          )}
        </motion.div>
      </motion.div>
    </>
  );
};

export default CustomCursor;
