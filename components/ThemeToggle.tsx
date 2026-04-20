'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  return (
    <div className="absolute top-6 md:top-8 left-6 md:left-8 z-50">
      <button
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-black/10 dark:bg-white/10 backdrop-blur-md border border-black/5 dark:border-white/5 transition-all hover:bg-black/20 dark:hover:bg-white/20"
        aria-label="Toggle theme"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.5, type: 'spring' }}
        >
          {isDark ? (
            <Sun className="w-4 h-4 text-white/80" />
          ) : (
            <Moon className="w-4 h-4 text-black/80" />
          )}
        </motion.div>
      </button>
    </div>
  );
}
