import { motion } from 'framer-motion';
import { Linkedin, Github, Instagram, AtSign } from 'lucide-react';

const socialLinks = [
  { 
    name: 'LinkedIn', 
    icon: Linkedin, 
    href: 'https://www.linkedin.com/in/aditya-shinde-59b998279' 
  },
  { 
    name: 'GitHub', 
    icon: Github, 
    href: 'https://github.com/adityashindeorg' 
  },
  { 
    name: 'Instagram', 
    icon: Instagram, 
    href: 'https://www.instagram.com/adityashindeorg/' 
  },
  { 
    name: 'Threads', 
    icon: AtSign, // The 'AtSign' icon matches the Threads logo
    href: 'https://www.threads.net/@adityashindeorg' 
  },
];

const SocialLinks = () => {
  return (
    <motion.div
      className="flex items-center gap-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5 }}
    >
      {socialLinks.map((social, index) => (
        <motion.a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="hover-target group relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 * index }}
          whileHover={{ y: -5 }}
        >
          {/* Background glow */}
          <motion.div
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: 'radial-gradient(circle, rgba(197, 160, 89, 0.2) 0%, transparent 70%)',
              transform: 'scale(2)',
            }}
          />
          
          {/* Icon container */}
          <div className="relative w-12 h-12 flex items-center justify-center border border-[#C5A059]/20 group-hover:border-[#C5A059]/60 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(197,160,89,0.3)]">
            <social.icon 
              size={20} 
              className="text-zinc-500 group-hover:text-[#C5A059] transition-colors duration-300" 
            />
          </div>
          
          {/* Label tooltip */}
          <motion.span
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono uppercase tracking-widest text-[#C5A059] opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
          >
            {social.name}
          </motion.span>
        </motion.a>
      ))}
    </motion.div>
  );
};

export default SocialLinks;