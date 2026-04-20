'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 3500; // Slower, more cinematic (3.5s)
    const intervalTime = 50;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      // Use an ease-out calculation for progress to make it feel more natural
      const easeOutProgress = 1 - Math.pow(1 - currentStep / steps, 3);
      setProgress(Math.min(easeOutProgress * 100, 100));

      if (currentStep >= steps) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 800); // Longer pause at 100%
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.05,
        transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] }
      }}
    >
      {/* Cinematic noise/grain overlay placeholder */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}>
      </div>

      {/* Subtle deep background glow matching new monochromatic theme */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-black/[0.03] rounded-full blur-[120px]"
          animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] bg-gray-500/[0.02] rounded-full blur-[100px] translate-y-10"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <div className="mb-12 relative w-64 h-24 md:w-80 md:h-32">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Celebrations Neral Logo"
            className="w-full h-full object-contain drop-shadow-sm"
          />
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="w-64 md:w-80 h-[2px] bg-black/5 relative overflow-hidden rounded-full">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-gray-400 via-gray-600 to-black"
              initial={{ x: '-100%' }}
              animate={{ x: `${progress - 100}%` }}
              transition={{ duration: 0.1, ease: 'linear' }}
              style={{ width: '100%' }}
            />
          </div>
          <motion.p
            className="text-[9px] md:text-[10px] font-sans tracking-[0.3em] text-black/50 uppercase font-medium"
            animate={{ opacity: progress > 80 ? 0 : 1 }}
            transition={{ duration: 0.5 }}
          >
            Initiating Experience
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
}
