'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { VILLAS, VillaConfig } from '@/lib/constants';
import { getBlur } from '@/lib/blur-data';

interface VillaVisualisationScreenProps {
  onBack: () => void;
  onVillaSelect: (villa: VillaConfig) => void;
}

export default function VillaVisualisationScreen({
  onBack,
  onVillaSelect,
}: VillaVisualisationScreenProps) {
  const villas = Object.values(VILLAS);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 z-30 flex flex-col bg-[#F7F5F2]"
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
            Celebrations Neral
          </p>
          <h1 className="text-xl sm:text-2xl font-light tracking-wide text-black/80">
            Villa Visualisation
          </h1>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex-1 flex flex-col sm:flex-row items-stretch gap-4 px-4 sm:px-8 pb-36 overflow-auto">
        {villas.map((villa, i) => (
          <motion.button
            key={villa.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => onVillaSelect(villa)}
            className="relative flex-1 min-h-[240px] sm:min-h-0 rounded-3xl overflow-hidden group shadow-xl border border-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
            aria-label={`${villa.name} – ${villa.area}`}
          >
            {/* Thumbnail Image */}
            <Image
              src={villa.thumbImage}
              alt={villa.name}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              placeholder="blur"
              blurDataURL={getBlur(villa.thumbImage)}
              priority={i === 0}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            {/* Label */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-left">
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/60 font-medium mb-1">
                {villa.area}
              </p>
              <h2 className="text-2xl sm:text-3xl font-light tracking-wide text-white">
                {villa.name}
              </h2>
            </div>

            {/* Hover shimmer */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white/5" />
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
