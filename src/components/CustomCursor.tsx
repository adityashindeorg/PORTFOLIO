import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  // Slower trailing spring for the glow
  const trailConfig = { damping: 30, stiffness: 150, mass: 1 };
  const trailXSpring = useSpring(cursorX, trailConfig);
  const trailYSpring = useSpring(cursorY, trailConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, .hover-target');
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => setIsHovering(false));
      });
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    addHoverListeners();
    
    const observer = new MutationObserver(addHoverListeners);
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
      {/* Outer glow trail */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: trailXSpring,
          y: trailYSpring,
        }}
        animate={{
          opacity: isVisible ? 0.6 : 0,
        }}
      >
        <div 
          className="w-48 h-48 -ml-24 -mt-24 rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(42, 85%, 65%, 0.08) 0%, transparent 60%)',
          }}
        />
      </motion.div>

      {/* Main cursor orb */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
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
          <div 
            className={`rounded-full transition-all duration-300 ${
              isHovering 
                ? 'w-12 h-12 -ml-6 -mt-6 bg-transparent border border-gold' 
                : 'w-4 h-4 -ml-2 -mt-2 bg-gold'
            }`}
            style={{
              boxShadow: isHovering 
                ? '0 0 40px hsl(42, 85%, 65%, 0.6), inset 0 0 20px hsl(42, 85%, 65%, 0.3)' 
                : '0 0 30px hsl(42, 85%, 65%, 0.8)',
            }}
          />
          {/* Inner dot on hover */}
          {isHovering && (
            <motion.div
              className="absolute top-1/2 left-1/2 w-1 h-1 -ml-0.5 -mt-0.5 bg-gold rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
            />
          )}
        </motion.div>
      </motion.div>

      {/* Secondary trailing dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: trailXSpring,
          y: trailYSpring,
        }}
        animate={{
          opacity: isVisible && !isHovering ? 0.5 : 0,
          scale: isHovering ? 0 : 1,
        }}
      >
        <div 
          className="w-2 h-2 -ml-1 -mt-1 rounded-full bg-gold/50"
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;
