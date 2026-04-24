'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

interface VirtualTourMenuProps {
  onSelect: (tour: 'clubhouse' | 'riverhuts') => void;
}

export default function VirtualTourMenu({ onSelect }: VirtualTourMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 z-10 flex items-center justify-center bg-white p-6 sm:p-12 pb-32 sm:pb-40"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12 w-full max-w-7xl h-[65vh] sm:h-[75vh]">
        {/* Ravine Club */}
        <motion.button
          onClick={() => onSelect('clubhouse')}
          className="relative w-full h-full rounded-3xl overflow-hidden group shadow-2xl border border-black/5"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-700 z-10" />
          <Image
            src="/clubhouse.jpg"
            alt="Ravine Club"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 gap-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-[0.2em] uppercase drop-shadow-xl text-center px-4">
              Ravine Club
            </h2>
            <div className="px-6 py-2 border border-white/30 rounded-full backdrop-blur-sm bg-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
              <span className="text-[10px] sm:text-xs font-sans tracking-[0.2em] uppercase text-white">Enter Tour</span>
            </div>
          </div>
        </motion.button>

        {/* River Huts */}
        <motion.button
          onClick={() => onSelect('riverhuts')}
          className="relative w-full h-full rounded-3xl overflow-hidden group shadow-2xl border border-black/5"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-700 z-10" />
          <Image
            src="/riverhuts.jpg"
            alt="River Huts"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 gap-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-[0.2em] uppercase drop-shadow-xl text-center px-4">
              River Huts
            </h2>
            <div className="px-6 py-2 border border-white/30 rounded-full backdrop-blur-sm bg-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
              <span className="text-[10px] sm:text-xs font-sans tracking-[0.2em] uppercase text-white">Enter Tour</span>
            </div>
          </div>
        </motion.button>
      </div>
    </motion.div>
  );
}
