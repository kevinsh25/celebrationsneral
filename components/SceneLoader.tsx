'use client';

import { motion } from 'motion/react';

export default function SceneLoader() {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white overflow-hidden">
      {/* Cinematic noise/grain overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}>
      </div>

      {/* Background glows matching the monochromatic theme */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-black/[0.02] rounded-full blur-[120px]"
          animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mb-8 relative w-48 h-12 md:w-56 md:h-16">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Celebrations Neral Logo"
            className="w-full h-full object-contain opacity-80 drop-shadow-sm"
          />
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="w-40 md:w-48 h-[1px] bg-black/5 relative overflow-hidden rounded-full">
            <motion.div
              className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-black/40 to-transparent"
              animate={{ x: ['-100%', '300%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <p className="text-[8px] md:text-[9px] font-sans tracking-[0.4em] text-black/30 uppercase font-medium">
            Loading Scene
          </p>
        </div>
      </motion.div>
    </div>
  );
}
