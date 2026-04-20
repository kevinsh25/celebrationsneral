'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import SceneLoader from './SceneLoader';

interface PanoFrameProps {
  src: string;
  isActive: boolean;
  preload?: boolean;
}

export default function PanoFrame({ src, isActive, preload = false }: PanoFrameProps) {
  const [hasMounted, setHasMounted] = useState(preload || isActive);
  const [isLoaded, setIsLoaded] = useState(false);

  // Lazy load: mount the iframe only when it becomes active (or if preloaded)
  if (isActive && !hasMounted) {
    setHasMounted(true);
  }

  return (
    <motion.div
      className="absolute inset-0 w-full h-full"
      initial={{ opacity: 0 }}
      animate={{
        opacity: isActive ? 1 : 0,
        zIndex: isActive ? 10 : 0,
      }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: isActive ? 'auto' : 'none' }}
    >
      {/* Loading State */}
      <AnimatePresence>
        {hasMounted && !isLoaded && (
          <motion.div
            className="absolute inset-0 z-20"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <SceneLoader />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Iframe Container */}
      {hasMounted && (
        <iframe
          src={src}
          className="absolute inset-0 w-full h-full border-none outline-none bg-white"
          allow="xr-spatial-tracking; gyroscope; accelerometer; fullscreen"
          onLoad={() => setIsLoaded(true)}
          tabIndex={isActive ? 0 : -1}
          title="Immersive 360 Scene"
        />
      )}

    </motion.div>
  );
}
