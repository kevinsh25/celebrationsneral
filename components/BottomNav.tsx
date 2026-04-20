'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TabId } from '@/lib/types';
import { NAV_TABS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Play, Film, X } from 'lucide-react';

interface BottomNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<{ title: string; url: string } | null>(null);

  const handleTabClick = (tabId: TabId) => {
    if (tabId === 'amenities') {
      setIsMoreMenuOpen(!isMoreMenuOpen);
    } else {
      setIsMoreMenuOpen(false);
      onTabChange(tabId);
    }
  };

  const moreOptions = [
    { id: 'location-av', label: 'Location AV', icon: Film, url: 'https://www.youtube.com/embed/MbeBBPHfxn4' }, // Replace with actual URL
    { id: 'product-av', label: 'Product Walkthrough AV', icon: Play, url: 'https://www.youtube.com/embed/1zhYYLOgSSk' }, // Replace with actual URL
  ];

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
          {/* More Menu Popover */}
          <AnimatePresence>
            {isMoreMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-full right-0 mb-4 p-2 bg-white/80 backdrop-blur-xl border border-black/5 shadow-2xl rounded-2xl pointer-events-auto flex flex-col gap-1 min-w-[200px] origin-bottom-right"
              >
                {moreOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.id}
                      onClick={() => {
                        setActiveVideo({ title: option.label, url: option.url });
                        setIsMoreMenuOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-black/5 transition-colors text-left group"
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black/5 group-hover:bg-white transition-colors">
                        <Icon className="w-4 h-4 text-black/60 group-hover:text-[#008DD2]" />
                      </div>
                      <span className="text-xs font-medium tracking-wide text-black/70 group-hover:text-black uppercase">
                        {option.label}
                      </span>
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
          {NAV_TABS.map((tab) => {
            const isActive = activeTab === tab.id && tab.id !== 'amenities';
            const isMoreActive = tab.id === 'amenities' && isMoreMenuOpen;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className="relative flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2.5 px-4 sm:px-6 py-3 sm:py-3.5 rounded-full transition-colors duration-500 group"
              >
                {(isActive || isMoreActive) && (
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
                    (isActive || isMoreActive) ? "text-[#008DD2] drop-shadow-[0_0_8px_rgba(0,141,210,0.4)]" : "text-black/40 group-hover:text-black/70"
                  )}
                />
                <span
                  className={cn(
                    "text-[9px] sm:text-[10px] font-sans tracking-[0.15em] uppercase relative z-10 transition-all duration-500",
                    (isActive || isMoreActive) ? "text-[#008DD2] drop-shadow-[0_0_8px_rgba(0,141,210,0.4)] font-medium" : "text-black/40 group-hover:text-black/70"
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
