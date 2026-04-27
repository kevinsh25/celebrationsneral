'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface GalleryModalProps {
  onClose: () => void;
}

// Actual gallery images (converted to WebP for ~55% smaller file sizes)
const GALLERY_IMAGES = [
  '/gallery/clubhouse-01.webp',
  '/gallery/clubhouse-03.webp',
  '/gallery/clubhouse-06.webp',
  '/gallery/clubhouse-second01.webp',
  '/gallery/entance-gate.webp',
  '/gallery/CHDining01.webp',
  '/gallery/CHDining02.webp',
  '/gallery/CHDining03.webp',
  '/gallery/CHDining04.webp',
  '/gallery/CHDining05.webp',
  '/gallery/CHDining06.webp',
  '/gallery/Dining01.webp',
  '/gallery/Dining02.webp',
  '/gallery/Dining03.webp',
  '/gallery/Gym01.webp',
  '/gallery/Gym02.webp',
  '/gallery/RHBathroom01.webp',
  '/gallery/RHBathroom02.webp',
  '/gallery/Riverhuts.webp',
  '/gallery/RiverhutsBR.webp',
  '/gallery/RiverhutsBR01.webp',
  '/gallery/RiverhutsBR02.webp',
  '/gallery/SPA.webp',
  '/gallery/Sauna.webp',
];

export default function GalleryModal({ onClose }: GalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl"
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 sm:top-10 sm:right-10 z-[110] p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      <button
        onClick={prevImage}
        className="absolute left-4 sm:left-10 z-[110] p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-colors"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      <button
        onClick={nextImage}
        className="absolute right-4 sm:right-10 z-[110] p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-colors"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      <div className="relative w-full h-full max-w-[90vw] max-h-[85vh] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full h-full"
          >
            <Image
              src={GALLERY_IMAGES[currentIndex]}
              alt={`Gallery Image ${currentIndex + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 90vw"
              className="object-contain drop-shadow-2xl"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnails indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 px-4 z-[110]">
        {GALLERY_IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-white w-8' : 'bg-white/30 hover:bg-white/60'
              }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
}
