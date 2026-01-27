import { useEffect, ReactNode, useRef } from 'react';
import Lenis from 'lenis';

interface SmoothScrollProps {
  children: ReactNode;
}

const SmoothScroll = ({ children }: SmoothScrollProps) => {
  const requestRef = useRef<number>();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0, // Slightly faster for a snappier feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      lerp: 0.1, // Added linear interpolation for better smoothing
    });

    function raf(time: number) {
      lenis.raf(time);
      requestRef.current = requestAnimationFrame(raf);
    }

    requestRef.current = requestAnimationFrame(raf);

    // Cleanup function
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
