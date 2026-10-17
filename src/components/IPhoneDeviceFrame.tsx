import React from 'react';
import { Smartphone, X } from 'lucide-react';

interface IPhoneDeviceFrameProps {
  children: React.ReactNode;
  onExitFrame: () => void;
}

export const IPhoneDeviceFrame: React.FC<IPhoneDeviceFrameProps> = ({ children, onExitFrame }) => {
  return (
    <div className="min-h-screen bg-muted/80 py-8 px-4 flex flex-col items-center justify-center transition-colors">
      {/* Device Mode Notice Bar */}
      <div className="mb-4 flex items-center justify-between w-full max-w-[420px] px-3.5 py-2.5 rounded-xl bg-card border border-border text-xs text-foreground shadow-sm">
        <div className="flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-accent" />
          <span className="font-medium">iPhone 16 Pro Viewport (393 × 852px)</span>
        </div>
        <button
          onClick={onExitFrame}
          className="flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline"
        >
          <span>Exit Frame</span>
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* iPhone 16 Pro Titanium Chassis */}
      <div className="relative w-[393px] h-[844px] bg-background rounded-[54px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5),0_0_0_8px_#27272a,0_0_0_12px_#3f3f46] border border-border flex flex-col overflow-hidden">
        {/* Dynamic Island */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 w-28 h-7 bg-black rounded-full flex items-center justify-between px-3">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
        </div>

        {/* Inner Phone Screen Container */}
        <div className="w-full h-full rounded-[44px] overflow-hidden flex flex-col relative bg-background">
          <div className="flex-1 overflow-y-auto overscroll-contain">
            {children}
          </div>

          {/* iOS Bottom Home Bar */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
            <div className="w-32 h-1 bg-foreground/30 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
