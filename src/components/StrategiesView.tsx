import React, { useState } from 'react';
import { TRADING_STRATEGIES, TradingStrategy } from '../data/strategiesData';
import { TrendingUp, Bookmark, BookmarkCheck, ArrowUpRight, Zap, Target, Shield } from 'lucide-react';

interface StrategiesViewProps {
  bookmarkedStrategyIds: string[];
  onToggleBookmark: (strategyId: string) => void;
  onOpenStrategy: (strategy: TradingStrategy) => void;
}

export const StrategiesView: React.FC<StrategiesViewProps> = ({
  bookmarkedStrategyIds,
  onToggleBookmark,
  onOpenStrategy
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Trend Continuation', 'Smart Money', 'Reversal', 'Scalping', 'Momentum'];

  const filteredStrategies = TRADING_STRATEGIES.filter(s =>
    selectedCategory === 'All' || s.category === selectedCategory
  );

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-24">
      {/* Header Banner */}
      <div className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-secondary-foreground border border-border text-xs font-medium mb-3">
          <Zap className="w-3.5 h-3.5 text-accent" />
          <span>High-Probability Setups</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
          Actionable Trading Playbooks
        </h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-xl leading-relaxed">
          Mechanical, rule-based strategies with exact entry triggers, stop-loss calculations, and multi-tier take-profit targets. Never guess what to do next.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                : 'bg-secondary text-secondary-foreground hover:bg-muted border border-border'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Strategies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredStrategies.map((strategy) => {
          const isSaved = bookmarkedStrategyIds.includes(strategy.id);

          return (
            <div
              key={strategy.id}
              className="rounded-xl border border-border bg-card text-card-foreground hover:border-primary/50 p-5 flex flex-col justify-between transition-all group shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase px-2.5 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/25">
                    {strategy.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      R:R {strategy.riskReward}
                    </span>
                    <button
                      onClick={() => onToggleBookmark(strategy.id)}
                      className={`p-1.5 rounded-lg border transition ${
                        isSaved
                          ? 'bg-warning/20 text-warning border-warning/40'
                          : 'text-muted-foreground hover:text-foreground border-transparent hover:border-border hover:bg-secondary'
                      }`}
                      title="Bookmark strategy"
                    >
                      {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-primary transition">
                    {strategy.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {strategy.tagline}
                  </p>
                </div>

                {/* Key Spec Badges */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/70">
                  <div className="p-2.5 rounded-lg bg-secondary/60 border border-border/70">
                    <span className="text-[10px] text-muted-foreground uppercase font-semibold block">Timeframe</span>
                    <span className="text-xs font-semibold text-foreground truncate block mt-0.5">{strategy.timeframe}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-secondary/60 border border-border/70">
                    <span className="text-[10px] text-muted-foreground uppercase font-semibold block">Est. Win Rate</span>
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 block mt-0.5">{strategy.winRateEst}</span>
                  </div>
                </div>
              </div>

              {/* View Playbook Button */}
              <button
                onClick={() => onOpenStrategy(strategy)}
                className="mt-4 w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-secondary hover:bg-muted border border-border text-xs font-semibold text-foreground hover:text-primary transition-all active:scale-95"
              >
                <span>Inspect Playbook</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
