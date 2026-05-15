'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

import { ASSET_BASE_URL } from '@/lib/constants';

interface GalleryModalProps {
  onClose: () => void;
}

// Actual gallery images (converted to WebP max 4K lossless, no spaces)
const GALLERY_ITEMS = [
  { src: `${ASSET_BASE_URL}/gallery/01_Bird_view.webp`, label: 'Aerial View' },
  { src: `${ASSET_BASE_URL}/gallery/02_Clubhouse06copy_-recoverv2-5000w.webp`, label: 'Ravine Club House' },
  { src: `${ASSET_BASE_URL}/gallery/03_Clubhouse03copy_-recoverv2-5000w.webp`, label: 'Ravine Club House' },
  { src: `${ASSET_BASE_URL}/gallery/04_CH1-ArrivalBayIMG_9765.webp`, label: 'Arrival Bay' },
  { src: `${ASSET_BASE_URL}/gallery/05_Swimmingpool.webp`, label: 'Swimming Pool' },
  { src: `${ASSET_BASE_URL}/gallery/06_SwimingPool1DSLR_IMG_9814.webp`, label: 'Swimming Pool' },
  { src: `${ASSET_BASE_URL}/gallery/07_CH1-RestaurantBest1_IMG_0109.webp`, label: 'Restaurant' },
  { src: `${ASSET_BASE_URL}/gallery/08_CHDining02.webp`, label: 'Fine Dine' },
  { src: `${ASSET_BASE_URL}/gallery/09_CH1-Bar1_IMG_0079.webp`, label: 'Bar Area' },
  { src: `${ASSET_BASE_URL}/gallery/10_Gym01.webp`, label: 'Gymnasium' },
  { src: `${ASSET_BASE_URL}/gallery/11_SPA.webp`, label: 'Spa Lounge' },
  { src: `${ASSET_BASE_URL}/gallery/12_YOGADeckIMG_9424.webp`, label: 'Yoga Deck' },
  { src: `${ASSET_BASE_URL}/gallery/13_KidsPlay1_DJI_0003.webp`, label: 'Kids Play Area' },
  { src: `${ASSET_BASE_URL}/gallery/14_MultipurposeCourt.webp`, label: 'Multi-purpose Court' },
  { src: `${ASSET_BASE_URL}/gallery/15_CHRiverParc07.webp`, label: 'River Parc Clubhouse' },
  { src: `${ASSET_BASE_URL}/gallery/16_CHRiverParc06.webp`, label: 'River Parc Clubhouse' },
  { src: `${ASSET_BASE_URL}/gallery/17_CHRiverParc02.webp`, label: 'River Parc Restaurant' },
  { src: `${ASSET_BASE_URL}/gallery/18_CHRiverParc01.webp`, label: 'River Parc Lounge' },
  { src: `${ASSET_BASE_URL}/gallery/19_CHRiverParc05.webp`, label: 'Riverview Seating' },
  { src: `${ASSET_BASE_URL}/gallery/20_Equestariancopy_-recoverv2-5000w.webp`, label: 'Equestrian' },
  { src: `${ASSET_BASE_URL}/gallery/21_PettingZone.webp`, label: 'Pet Zone' },
  { src: `${ASSET_BASE_URL}/gallery/22_RiverGhatDJI_0275.webp`, label: 'River Ghat' },
  { src: `${ASSET_BASE_URL}/gallery/23_Ghat3Close_-recoverv2-5000w.webp`, label: 'River Ghat' },
  { src: `${ASSET_BASE_URL}/gallery/24_KiteFlyingZone_DJI_0280.webp`, label: 'Kite Flying Zone' },
  { src: `${ASSET_BASE_URL}/gallery/25_CelebrationSquare.webp`, label: 'Celebration Plaza' },
  { src: `${ASSET_BASE_URL}/gallery/26_OpenGYM.webp`, label: 'Open Gym' },
  { src: `${ASSET_BASE_URL}/gallery/27_StarGazingDeck.webp`, label: 'Star Gazing Deck' },
  { src: `${ASSET_BASE_URL}/gallery/28_RockClimbing_IMG_9868.webp`, label: 'Rock Climbing Zone' },
  { src: `${ASSET_BASE_URL}/gallery/29_Cricketturf.webp`, label: 'Cricket Turf' },
  { src: `${ASSET_BASE_URL}/gallery/30_Landzorbingball.webp`, label: 'Land Zorbing' },
  { src: `${ASSET_BASE_URL}/gallery/31_KidsPool.webp`, label: 'Kids Pool' },
  { src: `${ASSET_BASE_URL}/gallery/32_Infinitypool_.webp`, label: 'Infinity Pool' },
  { src: `${ASSET_BASE_URL}/gallery/33_Jacuzzi_IMG_9809.webp`, label: 'Jacuzzi' },
  { src: `${ASSET_BASE_URL}/gallery/34_RiverPark.webp`, label: 'River Park' },
  { src: `${ASSET_BASE_URL}/gallery/35_RiverHuts.webp`, label: 'River Huts' },
  { src: `${ASSET_BASE_URL}/gallery/36_Entancegate.webp`, label: 'Entrance' }
];

export default function GalleryModal({ onClose }: GalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % GALLERY_ITEMS.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
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
        className="absolute top-6 right-6 sm:top-10 sm:right-10 z-[110] p-3 bg-white/10 hover:bg-[#84b145]/40 text-white hover:text-[#a0c052] rounded-full backdrop-blur-md transition-all"
      >
        <X className="w-6 h-6" />
      </button>

      <button
        onClick={prevImage}
        className="absolute left-4 sm:left-10 z-[110] p-3 bg-white/10 hover:bg-[#84b145]/40 text-white hover:text-[#a0c052] rounded-full backdrop-blur-md transition-all"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      <button
        onClick={nextImage}
        className="absolute right-4 sm:right-10 z-[110] p-3 bg-white/10 hover:bg-[#84b145]/40 text-white hover:text-[#a0c052] rounded-full backdrop-blur-md transition-all"
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
              src={GALLERY_ITEMS[currentIndex].src}
              alt={GALLERY_ITEMS[currentIndex].label}
              fill
              sizes="(max-width: 768px) 100vw, 90vw"
              className="object-contain drop-shadow-2xl"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Image Label centered at the bottom, above the dots */}
      <div className="absolute bottom-20 left-0 right-0 flex justify-center z-[110] pointer-events-none px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="px-6 py-2.5 bg-black/40 backdrop-blur-md rounded-full border border-white/10 shadow-2xl"
          >
            <span className="text-white text-xs sm:text-sm tracking-[0.2em] uppercase font-light drop-shadow-md">
              {GALLERY_ITEMS[currentIndex].label}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnails indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center flex-wrap gap-2 sm:gap-3 px-4 z-[110] max-w-4xl mx-auto">
        {GALLERY_ITEMS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-[#84b145] w-6 sm:w-8' : 'bg-white/30 hover:bg-[#a0c052]/60'}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
}
