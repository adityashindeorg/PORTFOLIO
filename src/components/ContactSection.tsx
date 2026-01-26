import { useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import SocialLinks from './SocialLinks';

const ContactSection = () => {
  const [copied, setCopied] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { stiffness: 200, damping: 20 };
  const tooltipX = useSpring(mouseX, springConfig);
  const tooltipY = useSpring(mouseY, springConfig);

  const email = "adityashindeorgx@gmail.com";

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="contact" className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-surface" />
      
      {/* Large decorative orbs */}
      <div className="orb w-[600px] h-[600px] -left-64 top-1/4 animate-pulse-glow" />
      <div className="orb w-[500px] h-[500px] -right-48 bottom-1/4 animate-pulse-glow" style={{ animationDelay: '-2s' }} />

      {/* Top decorative line */}
      <div className="absolute top-0 left-0 right-0">
        <div className="ornament-line w-full" />
      </div>

      <div className="relative z-10 text-center px-4 w-full max-w-6xl">
        {/* Ornament */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-12"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="w-24 h-px bg-gradient-to-r from-transparent to-gold/40" />
          <motion.div
            className="w-4 h-4 border border-gold rotate-45"
            animate={{ rotate: [45, 225, 45] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          <div className="w-24 h-px bg-gradient-to-l from-transparent to-gold/40" />
        </motion.div>

        {/* Pre-text */}
        <motion.span
          className="text-gold font-body text-sm tracking-[0.4em] uppercase block mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Ready to Create Something Extraordinary?
        </motion.span>

        {/* Main CTA */}
        <motion.h2
          className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-luxury mb-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.8 }}
          style={{
            textShadow: '0 0 100px hsl(42, 85%, 65%, 0.3)',
          }}
        >
          LET'S CREATE.
        </motion.h2>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="ornament-line w-64 mx-auto mb-16"
        />

        {/* Email with dramatic hover */}
        <motion.div
          className="relative inline-block hover-target"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setTooltipVisible(true)}
          onMouseLeave={() => setTooltipVisible(false)}
          onClick={handleCopyEmail}
        >
          <motion.div
            className="relative group cursor-pointer"
            whileHover={{ scale: 1.02 }}
          >
            <span 
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-cream group-hover:text-shimmer transition-all duration-500"
              style={{
                textShadow: '0 0 40px hsl(45, 30%, 94%, 0.2)',
              }}
            >
              {email}
            </span>
            
            {/* Animated underline */}
            <motion.div
              className="absolute -bottom-4 left-0 right-0 h-px bg-gold origin-left"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
            
            {/* Decorative dots */}
            <motion.div
              className="absolute -left-8 top-1/2 -translate-y-1/2 w-2 h-2 bg-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ boxShadow: '0 0 20px hsl(42, 85%, 65%, 0.8)' }}
            />
            <motion.div
              className="absolute -right-8 top-1/2 -translate-y-1/2 w-2 h-2 bg-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ boxShadow: '0 0 20px hsl(42, 85%, 65%, 0.8)' }}
            />
          </motion.div>

          {/* Floating tooltip */}
          {tooltipVisible && (
            <motion.div
              className="absolute pointer-events-none z-20"
              style={{
                left: tooltipX,
                top: tooltipY,
                x: '-50%',
                y: '-150%',
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="px-5 py-3 glass-gold">
                <span className="text-sm font-body text-gold tracking-wider">
                  {copied ? '✓ Copied to clipboard!' : 'Click to copy'}
                </span>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Phone */}
        <motion.a
          href="tel:+917875811474"
          className="block mt-8 font-display text-xl text-cream-muted hover:text-gold transition-colors duration-500 hover-target italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          +91 787 581 1474
        </motion.a>

        {/* Social Links */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
        >
          <SocialLinks />
        </motion.div>

        {/* Stats with luxury styling */}
        <motion.div
          className="mt-20 flex items-center justify-center gap-12 md:gap-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <div className="text-center">
            <span className="block text-shimmer text-5xl md:text-6xl font-display mb-2">4+</span>
            <span className="text-cream-dim text-sm font-body uppercase tracking-[0.2em]">Years of Craft</span>
          </div>
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-gold/40 to-transparent" />
          <div className="text-center">
            <span className="block text-shimmer text-5xl md:text-6xl font-display mb-2">∞</span>
            <span className="text-cream-dim text-sm font-body uppercase tracking-[0.2em]">Possibilities</span>
          </div>
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-gold/40 to-transparent hidden md:block" />
          <div className="text-center hidden md:block">
            <span className="block text-shimmer text-5xl md:text-6xl font-display mb-2">1</span>
            <span className="text-cream-dim text-sm font-body uppercase tracking-[0.2em]">Vision</span>
          </div>
        </motion.div>
      </div>

      {/* Footer bottom */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1 }}
      >
        <p className="text-cream-dim text-sm font-body tracking-[0.2em]">
          © {new Date().getFullYear()} <span className="text-gold">ADITYA SHINDE</span> — Crafted with Obsession
        </p>
      </motion.div>

      {/* Corner ornaments */}
      <div className="absolute bottom-8 left-8 corner-ornament corner-bl hidden md:block" />
      <div className="absolute bottom-8 right-8 corner-ornament corner-br hidden md:block" />
    </footer>
  );
};

export default ContactSection;
