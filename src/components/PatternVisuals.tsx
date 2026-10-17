import React from 'react';

interface PatternVisualProps {
  type: string;
  className?: string;
}

export const PatternVisual: React.FC<PatternVisualProps> = ({ type, className = 'w-full h-40' }) => {
  switch (type) {
    case 'bullish-engulfing':
      return (
        <svg viewBox="0 0 200 120" className={className}>
          {/* Grid lines */}
          <line x1="10" y1="95" x2="190" y2="95" stroke="var(--border)" strokeDasharray="3 3" />
          <text x="15" y="112" fill="var(--muted-foreground)" fontSize="10" fontFamily="sans-serif">Support Zone</text>
          
          {/* Bearish candle 1 */}
          <line x1="60" y1="35" x2="60" y2="85" stroke="var(--destructive)" strokeWidth="2" />
          <rect x="52" y="45" width="16" height="30" fill="var(--destructive)" rx="2" />

          {/* Bullish Engulfing candle 2 */}
          <line x1="120" y1="20" x2="120" y2="95" stroke="var(--success)" strokeWidth="2" />
          <rect x="110" y="30" width="20" height="55" fill="var(--success)" rx="2" />
          
          {/* Annotations */}
          <path d="M 135 30 L 160 30" stroke="var(--primary)" strokeWidth="1" strokeDasharray="2 2" />
          <text x="165" y="33" fill="var(--primary)" fontSize="9" fontFamily="sans-serif">Engulfs Prior</text>
        </svg>
      );

    case 'hammer':
      return (
        <svg viewBox="0 0 200 120" className={className}>
          <line x1="10" y1="90" x2="190" y2="90" stroke="var(--border)" strokeDasharray="3 3" />
          {/* Downward trend arrow */}
          <path d="M 30 30 L 60 60" stroke="var(--destructive)" strokeWidth="2" strokeDasharray="3 3" />
          <polygon points="60,60 52,54 58,48" fill="var(--destructive)" />

          {/* Hammer candle */}
          <line x1="100" y1="40" x2="100" y2="105" stroke="var(--success)" strokeWidth="2" />
          <rect x="92" y="40" width="16" height="15" fill="var(--success)" rx="2" />

          {/* Rejection annotation */}
          <text x="115" y="85" fill="var(--success)" fontSize="10" fontFamily="sans-serif">Long Lower Wick</text>
          <text x="115" y="98" fill="var(--muted-foreground)" fontSize="9" fontFamily="sans-serif">(Price Rejected)</text>
        </svg>
      );

    case 'shooting-star':
      return (
        <svg viewBox="0 0 200 120" className={className}>
          <line x1="10" y1="25" x2="190" y2="25" stroke="var(--border)" strokeDasharray="3 3" />
          <text x="15" y="20" fill="var(--destructive)" fontSize="10" fontFamily="sans-serif">Resistance Zone</text>
          
          {/* Shooting Star candle */}
          <line x1="100" y1="20" x2="100" y2="85" stroke="var(--destructive)" strokeWidth="2" />
          <rect x="92" y="70" width="16" height="15" fill="var(--destructive)" rx="2" />

          {/* Annotation */}
          <text x="115" y="40" fill="var(--destructive)" fontSize="10" fontFamily="sans-serif">Upper Wick Rejection</text>
          <text x="115" y="53" fill="var(--muted-foreground)" fontSize="9" fontFamily="sans-serif">Bears in Control</text>
        </svg>
      );

    case 'double-bottom':
      return (
        <svg viewBox="0 0 200 120" className={className}>
          {/* Neckline */}
          <line x1="20" y1="45" x2="180" y2="45" stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="4 3" />
          <text x="25" y="40" fill="var(--primary)" fontSize="9" fontFamily="sans-serif">Neckline Breakout</text>

          {/* W-Path */}
          <path d="M 25 25 L 60 90 L 100 45 L 140 90 L 175 25" fill="none" stroke="var(--success)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Bottom points */}
          <circle cx="60" cy="90" r="4" fill="var(--warning)" />
          <circle cx="140" cy="90" r="4" fill="var(--warning)" />
          <text x="45" y="108" fill="var(--warning)" fontSize="9" fontFamily="sans-serif">Low 1</text>
          <text x="125" y="108" fill="var(--warning)" fontSize="9" fontFamily="sans-serif">Low 2</text>
        </svg>
      );

    case 'head-shoulders':
      return (
        <svg viewBox="0 0 200 120" className={className}>
          {/* Neckline */}
          <line x1="20" y1="85" x2="180" y2="85" stroke="var(--destructive)" strokeWidth="1.5" strokeDasharray="4 3" />
          <text x="25" y="102" fill="var(--destructive)" fontSize="9" fontFamily="sans-serif">Neckline Breakdown</text>

          {/* Head & shoulders path */}
          <path d="M 30 85 L 55 45 L 80 85 L 105 20 L 130 85 L 155 45 L 175 95" fill="none" stroke="var(--muted-foreground)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          
          <text x="45" y="38" fill="var(--muted-foreground)" fontSize="8">Left</text>
          <text x="96" y="14" fill="var(--primary)" fontSize="10" fontWeight="bold">Head</text>
          <text x="145" y="38" fill="var(--muted-foreground)" fontSize="8">Right</text>
        </svg>
      );

    case 'bull-flag':
      return (
        <svg viewBox="0 0 200 120" className={className}>
          {/* Flagpole */}
          <path d="M 35 105 L 75 30" stroke="var(--success)" strokeWidth="4" strokeLinecap="round" />
          <text x="25" y="80" fill="var(--success)" fontSize="9">Pole</text>

          {/* Flag channel */}
          <path d="M 75 30 L 145 60" stroke="var(--primary)" strokeWidth="2" strokeDasharray="3 2" />
          <path d="M 70 50 L 140 80" stroke="var(--primary)" strokeWidth="2" strokeDasharray="3 2" />
          
          {/* Price oscillation */}
          <path d="M 75 30 L 78 48 L 98 40 L 102 58 L 122 50 L 128 68 L 155 25" fill="none" stroke="var(--warning)" strokeWidth="2" />
          
          {/* Breakout arrow */}
          <path d="M 150 35 L 180 15" stroke="var(--success)" strokeWidth="2.5" />
          <text x="140" y="18" fill="var(--success)" fontSize="9" fontWeight="bold">Breakout!</text>
        </svg>
      );

    default:
      return (
        <div className="flex items-center justify-center h-40 bg-card text-muted-foreground text-sm">
          Chart Visual Preview
        </div>
      );
  }
};
