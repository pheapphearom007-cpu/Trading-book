import React, { useState } from 'react';
import { TradingStrategy } from '../data/strategiesData';
import { X, CheckSquare, Square, Bookmark, BookmarkCheck, Shield, Target, Crosshair, Sparkles } from 'lucide-react';

interface StrategyDetailModalProps {
  strategy: TradingStrategy;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (strategyId: string) => void;
}

export const StrategyDetailModal: React.FC<StrategyDetailModalProps> = ({
  strategy,
  onClose,
  isBookmarked,
  onToggleBookmark
}) => {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const toggleCheck = (idx: number) => {
    setCheckedItems(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const allChecked = strategy.checklist.every((_, idx) => checkedItems[idx]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-card border border-border rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl space-y-6 p-5 sm:p-7 relative my-auto">
        {/* Close & Bookmark Buttons */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-accent/15 text-accent border border-accent/25">
              {strategy.category}
            </span>
            <span className="text-xs text-muted-foreground font-mono">
              R:R {strategy.riskReward}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(strategy.id)}
              className={`p-2 rounded-lg border transition ${
                isBookmarked 
                  ? 'bg-warning/20 text-warning border-warning/40' 
                  : 'bg-secondary text-muted-foreground border-border hover:text-foreground'
              }`}
              title="Bookmark strategy"
            >
              {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-secondary border border-border text-muted-foreground hover:text-foreground transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Title & Tagline */}
        <div>
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-foreground">{strategy.title}</h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">{strategy.tagline}</p>
        </div>

        {/* Overview & Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="p-3 rounded-lg bg-secondary/60 border border-border">
            <span className="text-[10px] text-muted-foreground uppercase font-semibold block">Timeframe</span>
            <span className="text-xs font-mono font-bold text-foreground mt-0.5 block">{strategy.timeframe}</span>
          </div>
          <div className="p-3 rounded-lg bg-secondary/60 border border-border">
            <span className="text-[10px] text-muted-foreground uppercase font-semibold block">Est. Win Rate</span>
            <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 block">{strategy.winRateEst}</span>
          </div>
          <div className="p-3 rounded-lg bg-secondary/60 border border-border col-span-2">
            <span className="text-[10px] text-muted-foreground uppercase font-semibold block">Ideal Assets</span>
            <span className="text-xs text-foreground mt-0.5 block truncate">{strategy.idealAssets.join(', ')}</span>
          </div>
        </div>

        {/* Strategy Description */}
        <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed bg-secondary/40 p-4 rounded-xl border border-border">
          {strategy.overview}
        </p>

        {/* ASCII / Visual Diagram */}
        <div className="bg-secondary border border-border rounded-xl p-4 overflow-x-auto">
          <span className="text-[11px] font-semibold text-muted-foreground block mb-2 uppercase tracking-wider font-mono">Setup Visual Architecture</span>
          <pre className="text-[11px] sm:text-xs font-mono text-primary leading-tight select-none">
            {strategy.asciiVisual}
          </pre>
        </div>

        {/* Execution Rules Cards */}
        <div className="space-y-3.5">
          {/* Setup Conditions */}
          <div className="p-4 rounded-xl bg-secondary/60 border border-border space-y-2">
            <h4 className="text-xs font-semibold text-primary flex items-center gap-1.5 uppercase tracking-wider font-mono">
              <Crosshair className="w-3.5 h-3.5" /> 1. Pre-Conditions Required
            </h4>
            <ul className="space-y-1.5 pl-1">
              {strategy.setupConditions.map((cond, idx) => (
                <li key={idx} className="text-xs text-foreground flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span>{cond}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Entry Triggers */}
          <div className="p-4 rounded-xl bg-secondary/60 border border-border space-y-2">
            <h4 className="text-xs font-semibold text-accent flex items-center gap-1.5 uppercase tracking-wider font-mono">
              <Sparkles className="w-3.5 h-3.5" /> 2. Precision Entry Trigger
            </h4>
            <ul className="space-y-1.5 pl-1">
              {strategy.entryTriggers.map((trig, idx) => (
                <li key={idx} className="text-xs text-foreground flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                  <span>{trig}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Stop Loss & Take Profit */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 space-y-1">
              <span className="text-xs font-semibold text-destructive flex items-center gap-1 uppercase tracking-wider font-mono">
                <Shield className="w-3.5 h-3.5" /> Invalidation (Stop Loss)
              </span>
              <p className="text-xs text-foreground">{strategy.stopLossRule}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-secondary border border-border space-y-1">
              <span className="text-xs font-semibold text-primary flex items-center gap-1 uppercase tracking-wider font-mono">
                <Target className="w-3.5 h-3.5" /> Take Profit Objectives
              </span>
              <ul className="space-y-1">
                {strategy.takeProfitRules.map((tp, idx) => (
                  <li key={idx} className="text-[11px] text-muted-foreground">• {tp}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Live Execution Checklist */}
        <div className="p-4 rounded-xl bg-secondary/50 border border-border space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground uppercase tracking-wider font-mono">
              Pre-Execution Confluence Checklist
            </span>
            <span className="text-[11px] font-mono text-muted-foreground">
              {Object.values(checkedItems).filter(Boolean).length} / {strategy.checklist.length} Verified
            </span>
          </div>

          <div className="space-y-2">
            {strategy.checklist.map((item, idx) => (
              <button
                key={idx}
                onClick={() => toggleCheck(idx)}
                className="w-full flex items-start gap-2.5 text-left p-2.5 rounded-lg bg-card hover:bg-muted transition border border-border"
              >
                {checkedItems[idx] ? (
                  <CheckSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-4 h-4 text-muted-foreground/60 shrink-0 mt-0.5" />
                )}
                <span className={`text-xs ${checkedItems[idx] ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                  {item}
                </span>
              </button>
            ))}
          </div>

          {allChecked && (
            <div className="p-2.5 rounded-lg bg-emerald-700/10 border border-emerald-600/30 text-center text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              ✓ All Confluences Satisfied — Trade is Approved!
            </div>
          )}
        </div>

        {/* Pro Tip */}
        <div className="p-3.5 rounded-xl bg-secondary border border-border text-xs text-foreground">
          <span className="font-semibold text-warning">Pro Tip: </span>
          {strategy.proTip}
        </div>
      </div>
    </div>
  );
};
