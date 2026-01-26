import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Preloader from '@/components/Preloader';
import CustomCursor from '@/components/CustomCursor';
import GrainOverlay from '@/components/GrainOverlay';
import SmoothScroll from '@/components/SmoothScroll';
import FloatingNav from '@/components/FloatingNav';
import HeroSection from '@/components/HeroSection';
import ExperienceSection from '@/components/ExperienceSection';
import SkillsSection from '@/components/SkillsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import AwardsSection from '@/components/AwardsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import SectionReveal from '@/components/SectionReveal';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Staggered section animation config
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <>
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Grain Overlay */}
      <GrainOverlay />

      {/* Preloader */}
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Floating Navigation */}
            <FloatingNav />
            
            <SmoothScroll>
              <main className="relative bg-obsidian overflow-hidden">
                {/* Hero - immediate display */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <HeroSection />
                </motion.div>
                
                {/* Experience Section */}
                <SectionReveal delay={0}>
                  <ExperienceSection />
                </SectionReveal>
                
                {/* Skills Section */}
                <SectionReveal delay={0.05}>
                  <SkillsSection />
                </SectionReveal>
                
                {/* Testimonials Section */}
                <SectionReveal delay={0.1}>
                  <TestimonialsSection />
                </SectionReveal>
                
                {/* Awards Section */}
                <SectionReveal delay={0.05}>
                  <AwardsSection />
                </SectionReveal>
                
                {/* Projects Section */}
                <SectionReveal delay={0.1}>
                  <ProjectsSection />
                </SectionReveal>
                
                {/* Contact Section */}
                <SectionReveal delay={0.05}>
                  <ContactSection />
                </SectionReveal>
              </main>
            </SmoothScroll>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Index;
