'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

import { ASSET_BASE_URL } from '@/lib/constants';
import { getBlur } from '@/lib/blur-data';

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
  const thumbStripRef = useRef<HTMLDivElement>(null);
  const activeThumbRef = useRef<HTMLButtonElement>(null);

  // Auto-scroll the active thumbnail into view
  useEffect(() => {
    if (activeThumbRef.current && thumbStripRef.current) {
      activeThumbRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [currentIndex]);

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
        className="absolute top-6 right-6 sm:top-10 sm:right-10 z-[110] p-3 bg-white/10 hover:bg-[#274b3b]/40 text-white hover:text-[#7b5a3c] rounded-full backdrop-blur-md transition-all"
      >
        <X className="w-6 h-6" />
      </button>

      <button
        onClick={prevImage}
        className="absolute left-4 sm:left-10 z-[110] p-3 bg-white/10 hover:bg-[#274b3b]/40 text-white hover:text-[#7b5a3c] rounded-full backdrop-blur-md transition-all"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      <button
        onClick={nextImage}
        className="absolute right-4 sm:right-10 z-[110] p-3 bg-white/10 hover:bg-[#274b3b]/40 text-white hover:text-[#7b5a3c] rounded-full backdrop-blur-md transition-all"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      <div className="relative w-full h-full max-w-[90vw] max-h-[75vh] flex items-center justify-center">
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
              placeholder="blur"
              blurDataURL={getBlur(GALLERY_ITEMS[currentIndex].src)}
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
            transition={{ duration: 0.3 }}
            className="flex items-center gap-3"
          >
            <span className="text-white/40 text-[10px] tracking-widest tabular-nums">
              {currentIndex + 1} / {GALLERY_ITEMS.length}
            </span>
            <span className="w-px h-3 bg-white/20" />
            <span className="text-white text-xs sm:text-sm tracking-[0.2em] uppercase font-light drop-shadow-md">
              {GALLERY_ITEMS[currentIndex].label}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnail strip */}
      <div className="absolute bottom-0 left-0 right-0 z-[110] bg-gradient-to-t from-black/80 to-transparent pt-6 pb-4 px-4">
        <div
          ref={thumbStripRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide max-w-5xl mx-auto"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {GALLERY_ITEMS.map((item, idx) => (
            <button
              key={idx}
              ref={idx === currentIndex ? activeThumbRef : null}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to ${item.label}`}
              className={`relative flex-shrink-0 w-16 h-10 sm:w-20 sm:h-13 rounded-md overflow-hidden transition-all duration-300 ${
                idx === currentIndex
                  ? 'ring-2 ring-[#274b3b] opacity-100 scale-105'
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
