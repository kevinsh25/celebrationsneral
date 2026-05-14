'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

import { ASSET_BASE_URL } from '@/lib/constants';

interface GalleryModalProps {
  onClose: () => void;
}

// Actual gallery images (converted to WebP for ~55% smaller file sizes)
const GALLERY_IMAGES = [
  // a) Aerial View of development (broad)
  `${ASSET_BASE_URL}/gallery/ghat-2-upscale-6x-2.webp`,

  // b) Clubhouse 1 - Ravine Clubhouse
  `${ASSET_BASE_URL}/gallery/clubhouse-01.webp`,
  `${ASSET_BASE_URL}/gallery/clubhouse-03.webp`,
  `${ASSET_BASE_URL}/gallery/CH1-ArrivalBayIMG_9765.webp`,
  `${ASSET_BASE_URL}/gallery/SwimingPool1DSLR_IMG_9814.webp`,
  `${ASSET_BASE_URL}/gallery/CH1-RestaurantBest1_IMG_0109.webp`,
  `${ASSET_BASE_URL}/gallery/CH1-RestaurantBest2_IMG_0104.webp`,
  `${ASSET_BASE_URL}/gallery/CH1-Bar1_IMG_0079.webp`,
  `${ASSET_BASE_URL}/gallery/Gym01.webp`,
  `${ASSET_BASE_URL}/gallery/SPA.webp`,
  `${ASSET_BASE_URL}/gallery/YOGADeckIMG_9424.webp`,
  `${ASSET_BASE_URL}/gallery/KidsPlay1_DJI_0003.webp`,
  `${ASSET_BASE_URL}/gallery/MultipurposeCourt.webp`,

  // c) Clubhouse 2 - Riverside Clubhouse
  `${ASSET_BASE_URL}/gallery/CHRiverParc01.webp`,
  `${ASSET_BASE_URL}/gallery/CHRiverParc02.webp`,
  `${ASSET_BASE_URL}/gallery/CHDining01.webp`,
  `${ASSET_BASE_URL}/gallery/CHDining02.webp`,
  `${ASSET_BASE_URL}/gallery/Dining01.webp`,

  // Remaining images
  `${ASSET_BASE_URL}/gallery/CH1-Bar2_IMG_9760.webp`,
  `${ASSET_BASE_URL}/gallery/CHDining03.webp`,
  `${ASSET_BASE_URL}/gallery/CHDining04.webp`,
  `${ASSET_BASE_URL}/gallery/CHDining05.webp`,
  `${ASSET_BASE_URL}/gallery/CHDining06.webp`,
  `${ASSET_BASE_URL}/gallery/CHRiverParc03.webp`,
  `${ASSET_BASE_URL}/gallery/CHRiverParc04.webp`,
  `${ASSET_BASE_URL}/gallery/CHRiverParc05.webp`,
  `${ASSET_BASE_URL}/gallery/CHRiverParc06.webp`,
  `${ASSET_BASE_URL}/gallery/CHRiverParc07.webp`,
  `${ASSET_BASE_URL}/gallery/Dining02.webp`,
  `${ASSET_BASE_URL}/gallery/Dining03.webp`,
  `${ASSET_BASE_URL}/gallery/Gym02.webp`,
  `${ASSET_BASE_URL}/gallery/RHBathroom01.webp`,
  `${ASSET_BASE_URL}/gallery/RHBathroom02.webp`,
  `${ASSET_BASE_URL}/gallery/Riverhuts.webp`,
  `${ASSET_BASE_URL}/gallery/RiverhutsBR.webp`,
  `${ASSET_BASE_URL}/gallery/RiverhutsBR01.webp`,
  `${ASSET_BASE_URL}/gallery/RiverhutsBR02.webp`,
  `${ASSET_BASE_URL}/gallery/Sauna.webp`,
  `${ASSET_BASE_URL}/gallery/SwimingPool2DSLR_IMG_9792.webp`,
  `${ASSET_BASE_URL}/gallery/clubhouse-02.webp`,
  `${ASSET_BASE_URL}/gallery/clubhouse-04.webp`,
  `${ASSET_BASE_URL}/gallery/clubhouse-05.webp`,
  `${ASSET_BASE_URL}/gallery/clubhouse-second01.webp`,
  `${ASSET_BASE_URL}/gallery/entance-gate.webp`,
  `${ASSET_BASE_URL}/gallery/equestarian-copy_-recover-v2-5000w.webp`,
  `${ASSET_BASE_URL}/gallery/ghat-1-close-upscale-6x.webp`,
  `${ASSET_BASE_URL}/gallery/ghat-3-close_-recover-v2-5000w.webp`,
  `${ASSET_BASE_URL}/gallery/ghat-3-upscale-6x.webp`,
  `${ASSET_BASE_URL}/gallery/land-zorbing-ball.webp`,
  `${ASSET_BASE_URL}/gallery/river-huts.webp`,
  `${ASSET_BASE_URL}/gallery/river-park.webp`,
  `${ASSET_BASE_URL}/gallery/wmremove-transformed.webp`,
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
