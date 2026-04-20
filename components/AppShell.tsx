'use client';

import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import BottomNav from './BottomNav';
import PanoFrame from './PanoFrame';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import { TabId } from '@/lib/types';
import { SCENES } from '@/lib/constants';

export default function AppShell() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  return (
    <div className="relative w-full h-screen overflow-hidden bg-white">
      {/* Global Logo */}
      <Logo />

      {/* 
        We render all PanoFrames and control visibility via CSS/framer-motion.
        This prevents iframes from reloading when switching tabs.
      */}
      {Object.values(SCENES).map((scene, index) => (
        <PanoFrame
          key={scene.id}
          src={scene.src}
          isActive={activeTab === scene.id}
          preload={index === 0} // Preload the first scene for instant display
        />
      ))}



      {/* Global Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
