'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import BottomNav from './BottomNav';
import PanoFrame from './PanoFrame';
import Logo from './Logo';
import VirtualTourMenu from './VirtualTourMenu';
import VillaVisualisationScreen from './VillaVisualisationScreen';
import VillaDetailScreen from './VillaDetailScreen';
import { ArrowLeft } from 'lucide-react';
import { TabId } from '@/lib/types';
import { SCENES, ASSET_BASE_URL, VillaConfig } from '@/lib/constants';

export default function AppShell() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [activeVirtualTour, setActiveVirtualTour] = useState<'clubhouse' | 'riverhuts' | 'riverparc' | null>(null);
  const [showVillaVisualisation, setShowVillaVisualisation] = useState(false);
  const [selectedVilla, setSelectedVilla] = useState<VillaConfig | null>(null);

  // Reset activeVirtualTour when navigating away from the virtual tour tab
  useEffect(() => {
    if (activeTab !== 'virtual-tour') {
      setActiveVirtualTour(null);
    }
  }, [activeTab]);

  const handleVillaVisualisationOpen = () => {
    setShowVillaVisualisation(true);
    setSelectedVilla(null);
  };

  const handleVillaVisualisationClose = () => {
    setShowVillaVisualisation(false);
    setSelectedVilla(null);
  };

  const handleVillaSelect = (villa: VillaConfig) => {
    setSelectedVilla(villa);
  };

  const handleVillaDetailBack = () => {
    setSelectedVilla(null); // go back to the villa list
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-white">
      {/* Global Logo */}
      <Logo />

      {/*
        We render all PanoFrames and control visibility via CSS/framer-motion.
        This prevents iframes from reloading when switching tabs.
      */}
      {Object.values(SCENES).map((scene, index) => {
        if (scene.id === 'virtual-tour') return null; // Handled separately
        return (
          <PanoFrame
            key={scene.id}
            src={scene.src}
            isActive={activeTab === scene.id && !showVillaVisualisation}
            preload={index === 0} // Preload the first scene for instant display
          />
        );
      })}

      {/* Virtual Tour Panos */}
      <PanoFrame
        src={`${ASSET_BASE_URL}/panos/virtualtour/index.html`}
        isActive={activeTab === 'virtual-tour' && activeVirtualTour === 'clubhouse' && !showVillaVisualisation}
      />
      <PanoFrame
        src={`${ASSET_BASE_URL}/panos/riverparc/index.html`}
        isActive={activeTab === 'virtual-tour' && activeVirtualTour === 'riverparc' && !showVillaVisualisation}
      />
      <PanoFrame
        src={`${ASSET_BASE_URL}/panos/riverhuts/index.html`}
        isActive={activeTab === 'virtual-tour' && activeVirtualTour === 'riverhuts' && !showVillaVisualisation}
      />

      {/* Virtual Tour Menu */}
      <AnimatePresence>
        {activeTab === 'virtual-tour' && activeVirtualTour === null && !showVillaVisualisation && (
          <VirtualTourMenu onSelect={setActiveVirtualTour} />
        )}
      </AnimatePresence>

      {/* Back to Menu Button */}
      <AnimatePresence>
        {activeTab === 'virtual-tour' && activeVirtualTour !== null && !showVillaVisualisation && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setActiveVirtualTour(null)}
            className="absolute top-6 left-6 sm:top-10 sm:left-10 z-50 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white/40 hover:bg-white/90 backdrop-blur-md border border-black/5 rounded-full shadow-lg transition-all duration-300 group"
            aria-label="Back to Tours"
          >
            <ArrowLeft className="w-5 h-5 text-black/70 group-hover:text-black transition-colors" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Villa Visualisation — List Screen */}
      <AnimatePresence>
        {showVillaVisualisation && selectedVilla === null && (
          <VillaVisualisationScreen
            onBack={handleVillaVisualisationClose}
            onVillaSelect={handleVillaSelect}
          />
        )}
      </AnimatePresence>

      {/* Villa Detail Screen — Interiors / Exteriors / Walkthrough */}
      <AnimatePresence>
        {showVillaVisualisation && selectedVilla !== null && (
          <VillaDetailScreen
            villa={selectedVilla}
            onBack={handleVillaDetailBack}
          />
        )}
      </AnimatePresence>

      {/* Global Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onVillaVisualisation={handleVillaVisualisationOpen}
      />
    </div>
  );
}
