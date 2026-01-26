import { motion } from 'framer-motion';

const GrainOverlay = () => {
  return (
    <motion.div
      className="grain"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.035 }}
      transition={{ duration: 2, delay: 0.5 }}
    />
  );
};

export default GrainOverlay;
