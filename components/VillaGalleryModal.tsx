'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { VillaGalleryItem } from '@/lib/constants';
import { getBlur } from '@/lib/blur-data';

interface VillaGalleryModalProps {
  title: string;
  items: VillaGalleryItem[];
  onClose: () => void;
}

export default function VillaGalleryModal({ title, items, onClose }: VillaGalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const thumbStripRef = useRef<HTMLDivElement>(null);
  const activeThumbRef = useRef<HTMLButtonElement>(null);

  // Auto-scroll active thumbnail into view
  useEffect(() => {
    if (activeThumbRef.current) {
      activeThumbRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [currentIndex]);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [next, prev, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl"
    >
      {/* Title */}
      <div className="absolute top-6 left-0 right-0 flex justify-center z-[110] pointer-events-none">
        <span className="text-white/50 text-[10px] tracking-[0.3em] uppercase font-light">
          {title}
        </span>
      </div>

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[110] p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all"
        aria-label="Close gallery"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Prev */}
      <button
        onClick={prev}
        className="absolute left-3 sm:left-8 z-[110] p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-7 h-7" />
      </button>

      {/* Next */}
      <button
        onClick={next}
        className="absolute right-3 sm:right-8 z-[110] p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all"
        aria-label="Next image"
      >
        <ChevronRight className="w-7 h-7" />
      </button>

      {/* Image */}
      <div className="relative w-full h-full max-w-[90vw] max-h-[72vh] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full h-full"
          >
            <Image
              src={items[currentIndex].src}
              alt={items[currentIndex].label}
              fill
              sizes="(max-width: 768px) 100vw, 90vw"
              className="object-contain drop-shadow-2xl"
              placeholder="blur"
              blurDataURL={getBlur(items[currentIndex].src)}
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Label + counter */}
      <div className="absolute bottom-[132px] left-0 right-0 flex items-center justify-center gap-4 z-[110] pointer-events-none px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-3"
          >
            <span className="text-white/40 text-[10px] tracking-widest tabular-nums">
              {currentIndex + 1} / {items.length}
            </span>
            <span className="w-px h-3 bg-white/20" />
            <span className="text-white text-xs sm:text-sm tracking-[0.2em] uppercase font-light">
              {items[currentIndex].label}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnail strip */}
      <div className="absolute bottom-0 left-0 right-0 z-[110] bg-gradient-to-t from-black/80 to-transparent pt-6 pb-4 px-4">
        <div
          ref={thumbStripRef}
          className="flex gap-2 overflow-x-auto max-w-5xl mx-auto"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((item, idx) => (
            <button
              key={idx}
              ref={idx === currentIndex ? activeThumbRef : null}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to ${item.label}`}
              className={`relative flex-shrink-0 w-16 h-10 sm:w-20 sm:h-13 rounded-md overflow-hidden transition-all duration-300 ${
                idx === currentIndex
                  ? 'ring-2 ring-white opacity-100 scale-105'
                  : 'opacity-40 hover:opacity-75 ring-1 ring-white/10'
              }`}
            >
              <Image
                src={item.src}
                alt={item.label}
                fill
                sizes="80px"
                className="object-cover"
                placeholder="blur"
                blurDataURL={getBlur(item.src)}
              />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
