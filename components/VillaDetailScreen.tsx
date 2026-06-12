'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { ArrowLeft, X, Images, Home, Play, Layers } from 'lucide-react';
import { VillaConfig } from '@/lib/constants';
import { getBlur } from '@/lib/blur-data';
import VillaGalleryModal from './VillaGalleryModal';

interface Option {
  id: 'interiors' | 'exteriors' | 'walkthrough' | 'floorplan';
  label: string;
  sublabel: string;
  icon: React.ElementType;
  thumbnailKey: 'interiorsThumbnail' | 'exteriorsThumbnail' | 'walkthroughThumbnail' | 'floorplanThumbnail';
}

const OPTIONS: Option[] = [
  {
    id: 'interiors',
    label: 'Interiors',
    sublabel: 'Inside the villa',
    icon: Home,
    thumbnailKey: 'interiorsThumbnail',
  },
  {
    id: 'exteriors',
    label: 'Exteriors',
    sublabel: 'Outside & surroundings',
    icon: Images,
    thumbnailKey: 'exteriorsThumbnail',
  },
  {
    id: 'walkthrough',
    label: 'Walkthrough',
    sublabel: '3D interactive tour',
    icon: Play,
    thumbnailKey: 'walkthroughThumbnail',
  },
  {
    id: 'floorplan',
    label: 'Floor Plan',
    sublabel: 'Ground & 1st Floor',
    icon: Layers,
    thumbnailKey: 'floorplanThumbnail',
  },
];

interface VillaDetailScreenProps {
  villa: VillaConfig;
  onBack: () => void;
}

export default function VillaDetailScreen({ villa, onBack }: VillaDetailScreenProps) {
  const [activeGallery, setActiveGallery] = useState<'interiors' | 'exteriors' | 'floorplan' | null>(null);
  const [showWalkthrough, setShowWalkthrough] = useState(false);

  const handleOptionClick = (optionId: 'interiors' | 'exteriors' | 'walkthrough' | 'floorplan') => {
    if (optionId === 'interiors') setActiveGallery('interiors');
    else if (optionId === 'exteriors') setActiveGallery('exteriors');
    else if (optionId === 'floorplan') setActiveGallery('floorplan');
    else if (optionId === 'walkthrough') setShowWalkthrough(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 40 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-40 flex flex-col bg-[#F7F5F2]"
      >
        {/* Header */}
        <div className="relative flex items-center justify-center px-6 pt-14 pb-6">
          <button
            onClick={onBack}
            className="absolute left-6 top-14 flex items-center justify-center w-10 h-10 bg-white/70 hover:bg-white border border-black/5 rounded-full shadow-md backdrop-blur-md transition-all duration-300 group"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5 text-black/60 group-hover:text-black transition-colors" />
          </button>

          <div className="text-center">
            <p className="text-[10px] tracking-[0.25em] uppercase text-black/40 font-medium mb-1">
              {villa.area}
            </p>
            <h1 className="text-xl sm:text-2xl font-light tracking-wide text-black/80">
              {villa.name}
            </h1>
          </div>
        </div>

        {/* Option Cards */}
        <div className="flex-1 overflow-auto pb-36 px-4 sm:px-8">
          <div className="grid grid-cols-2 gap-3 sm:gap-6 max-w-5xl mx-auto w-full">
            {OPTIONS.map((opt, i) => {
              const Icon = opt.icon;
              const thumbnailSrc = villa[opt.thumbnailKey];

              return (
                <motion.button
                  key={opt.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => handleOptionClick(opt.id)}
                  className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-3xl overflow-hidden group shadow-xl border border-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
                  aria-label={opt.label}
                >
                  {/* Thumbnail — falls back to a colour if CDN image not yet uploaded */}
                  <Image
                    src={thumbnailSrc}
                    alt={opt.label}
                    fill
                    sizes="(max-width: 640px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    placeholder="blur"
                    blurDataURL={getBlur(thumbnailSrc)}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.opacity = '0';
                    }}
                  />

                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Fallback bg (visible when thumbnail not uploaded yet) */}
                  <div
                    className={`absolute inset-0 -z-10 ${
                      opt.id === 'interiors'
                        ? 'bg-stone-800'
                        : opt.id === 'exteriors'
                        ? 'bg-stone-700'
                        : opt.id === 'walkthrough'
                        ? 'bg-stone-900'
                        : 'bg-stone-600'
                    }`}
                  />

                  {/* Label */}
                  <div className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-7 text-left">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
                      <div className="flex items-center justify-center w-5.5 h-5.5 sm:w-7 sm:h-7 rounded-full bg-white/15 backdrop-blur-sm">
                        <Icon className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-white/90" />
                      </div>
                      <p className="text-[7.5px] sm:text-[9px] tracking-[0.25em] uppercase text-white/50 font-medium">
                        {opt.sublabel}
                      </p>
                    </div>
                    <h2 className="text-sm sm:text-2xl font-light tracking-wide text-white">
                      {opt.label}
                    </h2>
                  </div>

                  {/* Hover shimmer */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white/5 rounded-3xl" />
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Interiors / Exteriors Gallery */}
      <AnimatePresence>
        {activeGallery === 'interiors' && (
          <VillaGalleryModal
            title={`${villa.name} — Interiors`}
            items={villa.interiors}
            onClose={() => setActiveGallery(null)}
          />
        )}
        {activeGallery === 'exteriors' && (
          <VillaGalleryModal
            title={`${villa.name} — Exteriors`}
            items={villa.exteriors}
            onClose={() => setActiveGallery(null)}
          />
        )}
        {activeGallery === 'floorplan' && (
          <VillaGalleryModal
            title={`${villa.name} — Floor Plans`}
            items={villa.floorplans}
            onClose={() => setActiveGallery(null)}
          />
        )}
      </AnimatePresence>

      {/* Walkthrough Fullscreen iFrame */}
      <AnimatePresence>
        {showWalkthrough && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black flex flex-col"
          >
            <button
              onClick={() => setShowWalkthrough(false)}
              className="absolute top-4 right-4 z-[120] p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all"
              aria-label="Close walkthrough"
            >
              <X className="w-5 h-5" />
            </button>
            <iframe
              src={villa.walkthroughUrl}
              title={`${villa.name} Walkthrough`}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; gyroscope; fullscreen"
              allowFullScreen
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
