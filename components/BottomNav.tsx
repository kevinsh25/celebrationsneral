'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TabId } from '@/lib/types';
import { NAV_TABS, VIDEO_URLS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface BottomNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const [activeVideo, setActiveVideo] = useState<{ title: string; url: string } | null>(null);

  const handleTabClick = (tabId: string, label: string) => {
    if (tabId === 'location-av' || tabId === 'product-av') {
      setActiveVideo({ title: label, url: VIDEO_URLS[tabId] });
    } else {
      onTabChange(tabId as TabId);
    }
  };

  return (
    <>
      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-8"
            onClick={() => setActiveVideo(null)}
          >
            <div
              className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <iframe
                src={`${activeVideo.url}?autoplay=1&modestbranding=1&rel=0&iv_load_policy=3&playsinline=1`}
                title={activeVideo.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-8 md:bottom-12 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none">
        <motion.div
          className="relative flex items-center gap-1 sm:gap-2 p-1.5 rounded-full bg-white/50 backdrop-blur-3xl border border-black/5 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05),0_8px_32px_rgba(0,0,0,0.1)] pointer-events-auto"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Removed More Menu Popover */}
          {NAV_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id, tab.label)}
                className="relative flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2.5 px-4 sm:px-6 py-3 sm:py-3.5 rounded-full transition-colors duration-500 group"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-black/5 rounded-full shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)]"
                    transition={{ type: 'spring', bounce: 0.15, duration: 0.7 }}
                  />
                )}

                <Icon
                  strokeWidth={1.5}
                  className={cn(
                    "w-4 h-4 sm:w-[18px] sm:h-[18px] relative z-10 transition-all duration-500",
                    isActive ? "text-black drop-shadow-[0_0_8px_rgba(0,0,0,0.2)]" : "text-black/40 group-hover:text-black/70"
                  )}
                />
                <span
                  className={cn(
                    "text-[9px] sm:text-[10px] font-sans tracking-[0.15em] uppercase relative z-10 transition-all duration-500 whitespace-nowrap",
                    isActive ? "text-black drop-shadow-[0_0_8px_rgba(0,0,0,0.2)] font-medium" : "text-black/40 group-hover:text-black/70"
                  )}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </motion.div>
      </div>
    </>
  );
}
