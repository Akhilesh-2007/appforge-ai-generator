'use client';

import { useAppStore } from '@/store/useAppStore';
import { useDarkMode } from '@/hooks/useDarkMode';
import { Menu, Moon, Sun, Bell } from 'lucide-react';

export function Header() {
  const setSidebarOpen = useAppStore((s) => s.setSidebarOpen);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl flex items-center justify-between px-4 lg:px-6">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 rounded-lg hover:bg-white/10 text-white/50"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-white/80 transition-colors"
          title={isDarkMode ? 'Light mode' : 'Dark mode'}
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-white/80 transition-colors">
          <Bell size={18} />
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold ml-1">
          U
        </div>
      </div>
    </header>
  );
}
