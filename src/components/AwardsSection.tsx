import { motion } from 'framer-motion';

const AwardsSection = () => {
  return (
    <section className="relative w-full bg-[#050505] border-b border-white/5 overflow-hidden">
      
      {/* 1. The "Gold Seam" Top Border */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/50 to-transparent" />
      
      {/* Background Sheen */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.02),transparent)] opacity-50" />

      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* LEFT: Degree (Luxury Serif Font) */}
          <div className="flex items-center gap-4 text-center md:text-left">
             <div className="hidden md:flex items-center justify-center w-8 h-8 rounded-full border border-[#C5A059]/20 bg-[#C5A059]/5 text-[#C5A059]">
               <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l9-5-9-5-9 5 9 5z" />
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
               </svg>
             </div>
             
             <div className="flex flex-col">
               <span className="font-mono text-[9px] text-[#C5A059] uppercase tracking-[0.2em] mb-1">
                 Academic Qualification
               </span>
               <h3 className="font-display text-2xl text-white tracking-wide leading-none">
                 Bachelor of <span className="italic text-zinc-400">Engineering</span>
               </h3>
             </div>
          </div>

          {/* RIGHT: Technical Details (Monospace) */}
          <div className="flex items-center gap-6 md:gap-8">
             
             {/* University Info */}
             <div className="text-center md:text-right border-r border-white/10 pr-6 md:pr-8 last:border-0 last:pr-0">
               <span className="block font-display text-sm text-zinc-300">
                 Computer Engineering
               </span>
               <span className="block font-mono text-[9px] text-zinc-600 uppercase tracking-widest mt-0.5">
                 MMCOE • SPPU University
               </span>
             </div>

             {/* Status Badge */}
             <div className="flex flex-col items-center md:items-end">
               <div className="flex items-center gap-2">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                  </span>
                  <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
                    Status
                  </span>
               </div>
               <span className="font-display text-sm text-white mt-0.5">
                 Final Semester
               </span>
             </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default AwardsSection;