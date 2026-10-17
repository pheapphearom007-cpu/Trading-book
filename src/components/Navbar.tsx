import React from 'react';
import { Search, Smartphone, Monitor, Sparkles, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  completedCount: number;
  totalLessons: number;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenSearch: () => void;
  onOpenCheatSheet: () => void;
  isPhoneFrame: boolean;
  onTogglePhoneFrame: () => void;
  onNavigateHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  completedCount,
  totalLessons,
  isDarkMode,
  onToggleTheme,
  onOpenSearch,
  onOpenCheatSheet,
  isPhoneFrame,
  onTogglePhoneFrame,
  onNavigateHome
}) => {
  const progressPercent = Math.round((completedCount / totalLessons) * 100) || 0;

  return (
    <header className="sticky top-0 z-40 bg-card/85 backdrop-blur-md border-b border-border px-4 sm:px-6 py-3 transition-colors">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        {/* Brand */}
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-2.5 text-left group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-accent to-primary flex items-center justify-center shadow-lg shadow-accent/15">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary-foreground stroke-current stroke-2 fill-none">
              <path d="M12 2v20M17 5v14M7 9v6" />
              <rect x="5" y="11" width="4" height="6" rx="1" fill="currentColor" opacity="0.4" />
              <rect x="15" y="7" width="4" height="8" rx="1" fill="currentColor" opacity="0.4" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm sm:text-base text-foreground tracking-tight group-hover:text-primary transition">
                The Trading Book
              </span>
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-accent/15 text-accent border border-accent/25">
                ROM
              </span>
            </div>
            <span className="text-[10px] text-muted-foreground hidden sm:block">Beginner to Institutional Academy</span>
          </div>
        </button>

        {/* Center Progress Tracker */}
        <div className="hidden md:flex items-center gap-2.5 bg-muted/60 px-3.5 py-1.5 rounded-full border border-border">
          <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden border border-border/50">
            <div
              className="h-full bg-gradient-to-r from-accent to-primary transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs font-mono font-bold text-foreground">
            {progressPercent}% Complete
          </span>
          <span className="text-[10px] text-muted-foreground font-mono">({completedCount}/{totalLessons})</span>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Theme Toggle (Light / Dark) */}
          <button
            onClick={onToggleTheme}
            className="p-2 sm:px-2.5 sm:py-1.5 rounded-xl bg-secondary/80 border border-border text-foreground hover:border-primary/50 transition active:scale-95 flex items-center gap-1.5"
            title={isDarkMode ? 'Switch to Warm Cream Theme' : 'Switch to Dark Charcoal Theme'}
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-warning" /> : <Moon className="w-4 h-4 text-primary" />}
            <span className="text-xs hidden md:inline">{isDarkMode ? 'Light' : 'Dark'}</span>
          </button>

          {/* Pattern Cheat Sheet Button */}
          <button
            onClick={onOpenCheatSheet}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary/80 border border-border text-xs text-foreground hover:border-accent/40 transition active:scale-95"
            title="Pattern Cheat Sheet"
          >
            <Sparkles className="w-3.5 h-3.5 text-warning" />
            <span className="hidden sm:inline">Cheat Sheet</span>
          </button>

          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-secondary/80 border border-border text-foreground hover:border-primary/50 transition flex items-center gap-1.5"
            title="Search the book"
          >
            <Search className="w-4 h-4 text-primary" />
            <span className="text-xs hidden sm:inline">Search</span>
            <kbd className="hidden lg:inline text-[10px] bg-card px-1.5 py-0.5 rounded border border-border text-muted-foreground font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Device Frame Toggle (Simulate iPhone 16 Pro on desktop) */}
          <button
            onClick={onTogglePhoneFrame}
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition active:scale-95 ${
              isPhoneFrame
                ? 'bg-accent/20 text-accent border-accent/40 font-bold'
                : 'bg-secondary/80 text-muted-foreground border-border hover:text-foreground'
            }`}
            title="Toggle iPhone 16 Pro Viewport Simulation"
          >
            {isPhoneFrame ? <Monitor className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
            <span>{isPhoneFrame ? 'Full Width' : 'iPhone View'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
