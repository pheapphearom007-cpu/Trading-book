import React from 'react';
import { AlertCircle, RotateCcw, ShieldCheck, Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  progressPercent: number;
  statusMessage: string;
  isFadingOut: boolean;
  error: string | null;
  onRetry: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  progressPercent,
  statusMessage,
  isFadingOut,
  error,
  onRetry
}) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-foreground transition-opacity duration-500 ease-out select-none p-6 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background ambient lighting */}
      <div className="absolute w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none -translate-y-12" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-md w-full space-y-6">
        {/* Animated Brand Logo */}
        <div className="relative">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-accent to-primary flex items-center justify-center shadow-xl shadow-accent/20 transition-transform duration-500">
            <svg viewBox="0 0 24 24" className="w-9 h-9 sm:w-11 sm:h-11 text-primary-foreground stroke-current stroke-2 fill-none animate-pulse">
              <path d="M12 2v20M17 5v14M7 9v6" />
              <rect x="5" y="11" width="4" height="6" rx="1" fill="currentColor" opacity="0.3" />
              <rect x="15" y="7" width="4" height="8" rx="1" fill="currentColor" opacity="0.3" />
            </svg>
          </div>
          {/* Subtle spinning accent ring */}
          {!error && (
            <div className="absolute -inset-2 rounded-3xl border border-accent/30 animate-[spin_6s_linear_infinite] pointer-events-none" />
          )}
        </div>

        {/* Brand Titles */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground border border-border text-[11px] font-medium mb-1">
            <Sparkles className="w-3 h-3 text-accent" />
            <span>ROM Trading Academy</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
            The Trading Book
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Master Modern Financial Markets — Beginner to Advanced
          </p>
        </div>

        {/* Dynamic Loading State vs Error State */}
        {error ? (
          <div className="w-full bg-card border border-destructive/30 rounded-xl p-5 space-y-3.5 shadow-sm mt-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-center gap-2 text-destructive">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <h2 className="font-serif text-base font-semibold text-foreground">Initialization Halted</h2>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {error}
            </p>
            <button
              onClick={onRetry}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-primary text-primary-foreground font-semibold text-xs transition-all hover:opacity-90 active:scale-95 shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Initialization</span>
            </button>
          </div>
        ) : (
          <div className="w-full space-y-3 mt-4">
            {/* Progress Bar */}
            <div className="w-full h-2 bg-secondary rounded-full overflow-hidden border border-border">
              <div
                className="h-full bg-gradient-to-r from-accent to-primary transition-all duration-300 ease-out rounded-full"
                style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
              />
            </div>

            {/* Progress Percent & Live Status Text */}
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-muted-foreground truncate max-w-[240px] text-left font-sans text-[11px]">
                {statusMessage}
              </span>
              <span className="font-bold text-primary shrink-0 ml-2">
                {progressPercent}%
              </span>
            </div>
          </div>
        )}

        {/* Security / Privacy reassurance indicator */}
        <div className="pt-4 flex items-center gap-1.5 text-[11px] text-muted-foreground/80 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-accent" />
          <span>Local session verified & encrypted</span>
        </div>
      </div>
    </div>
  );
};
