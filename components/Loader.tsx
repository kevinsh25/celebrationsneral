'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface LoaderProps {
  variant?: 'initial' | 'scene';
  onComplete?: () => void;
}

export default function Loader({ variant = 'initial', onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const isInitial = variant === 'initial';

  useEffect(() => {
    if (!isInitial) return;

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
        if (onComplete) {
          setTimeout(() => {
            onComplete();
          }, 800); // Longer pause at 100%
        }
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isInitial, onComplete]);

  return (
    <motion.div
      className={`${isInitial ? 'fixed z-50' : 'absolute z-20'} inset-0 flex flex-col items-center justify-center bg-white overflow-hidden`}
      initial={isInitial ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={
        isInitial
          ? { opacity: 0, scale: 1.05, transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] } }
          : { opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }
      }
    >
      {/* Cinematic noise/grain overlay placeholder */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}>
      </div>

      {/* Subtle deep background glow matching the new green logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className={`w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-[#84b145]/[0.05] rounded-full blur-[120px]`}
          animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        {isInitial && (
          <motion.div
            className="absolute w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] bg-[#a0c052]/[0.04] rounded-full blur-[100px] translate-y-10"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        )}
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={isInitial ? { opacity: 0, y: 10, filter: 'blur(10px)' } : { opacity: 0 }}
        animate={isInitial ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 1 }}
        transition={isInitial ? { duration: 1.5, ease: 'easeOut' } : { duration: 0.8 }}
      >
        <div className={`relative flex items-center justify-center ${isInitial ? 'mb-12 w-64 md:w-80' : 'mb-8 w-48 md:w-56'} aspect-[2.5]`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Terra-Scope-2.png"
            alt="Terra Scope Frame"
            className="absolute inset-0 w-full h-full object-contain drop-shadow-sm"
          />
          <motion.img
            src="/Terra-Scope-1.png"
            alt="Terra Scope Rhombus"
            className="absolute inset-0 w-full h-full object-contain drop-shadow-sm"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            style={{ originX: 0.31071, originY: 0.50133 }}
          />
        </div>

        <div className={`flex flex-col items-center ${isInitial ? 'gap-6' : 'gap-4'}`}>
          <div className={`${isInitial ? 'w-64 md:w-80 h-[2px]' : 'w-40 md:w-48 h-[1px]'} bg-[#84b145]/10 relative overflow-hidden rounded-full`}>
            {isInitial ? (
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#84b145]/40 via-[#84b145] to-[#a0c052]"
                initial={{ x: '-100%' }}
                animate={{ x: `${progress - 100}%` }}
                transition={{ duration: 0.1, ease: 'linear' }}
                style={{ width: '100%' }}
              />
            ) : (
              <motion.div
                className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-[#84b145]/60 to-transparent"
                animate={{ x: ['-100%', '300%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
          </div>
          <motion.p
            className={`font-sans text-[#84b145] uppercase font-medium ${isInitial ? 'text-[9px] md:text-[10px] tracking-[0.3em] opacity-80' : 'text-[8px] md:text-[9px] tracking-[0.4em] opacity-60'}`}
            animate={isInitial ? { opacity: progress > 80 ? 0 : 0.8 } : undefined}
            transition={{ duration: 0.5 }}
          >
            {isInitial ? 'Initiating Experience' : 'Loading Scene'}
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
}
