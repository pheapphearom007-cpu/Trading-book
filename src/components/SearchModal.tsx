import React, { useState } from 'react';
import { CURRICULUM_MODULES } from '../data/curriculumData';
import { TRADING_STRATEGIES } from '../data/strategiesData';
import { GOLDEN_RULES } from '../data/tipsData';
import { Search, X, BookOpen, TrendingUp, ShieldAlert, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  onClose: () => void;
  onSelectLesson: (lessonId: string) => void;
  onSelectStrategy: (strategyId: string) => void;
  onOpenTips: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  onClose,
  onSelectLesson,
  onSelectStrategy,
  onOpenTips
}) => {
  const [query, setQuery] = useState('');

  const trimmed = query.trim().toLowerCase();

  const matchingLessons = trimmed.length >= 2 
    ? CURRICULUM_MODULES.flatMap(m => m.lessons).filter(l => 
        l.title.toLowerCase().includes(trimmed) || 
        l.summary.toLowerCase().includes(trimmed) ||
        l.moduleTitle.toLowerCase().includes(trimmed)
      )
    : [];

  const matchingStrategies = trimmed.length >= 2
    ? TRADING_STRATEGIES.filter(s =>
        s.title.toLowerCase().includes(trimmed) ||
        s.tagline.toLowerCase().includes(trimmed) ||
        s.category.toLowerCase().includes(trimmed) ||
        s.idealAssets.some(a => a.toLowerCase().includes(trimmed))
      )
    : [];

  const matchingRules = trimmed.length >= 2
    ? GOLDEN_RULES.filter(r =>
        r.title.toLowerCase().includes(trimmed) ||
        r.summary.toLowerCase().includes(trimmed) ||
        r.category.toLowerCase().includes(trimmed)
      )
    : [];

  const totalResults = matchingLessons.length + matchingStrategies.length + matchingRules.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-4 pt-16 sm:pt-20 bg-black/60 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-xl w-full max-w-xl max-h-[80vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-border flex items-center gap-3 bg-secondary/30">
          <Search className="w-5 h-5 text-primary shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search lessons, FVGs, order blocks, risk rules..."
            className="w-full bg-transparent text-foreground placeholder-muted-foreground text-sm focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1">
          {trimmed.length < 2 ? (
            <div className="text-center py-10 space-y-2">
              <p className="text-xs text-muted-foreground">Type at least 2 characters to search across the book.</p>
              <div className="flex flex-wrap justify-center gap-1.5 pt-2">
                {['Order Block', 'Fair Value Gap', 'RSI', 'Support', 'Leverage', '1% Rule'].map(chip => (
                  <button
                    key={chip}
                    onClick={() => setQuery(chip)}
                    className="px-2.5 py-1 rounded-lg bg-secondary border border-border text-xs text-foreground hover:bg-muted"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="text-center py-10 text-muted-foreground text-xs">
              No matching content found for "{query}". Try another search term.
            </div>
          ) : (
            <div className="space-y-4">
              {/* Lessons */}
              {matchingLessons.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block font-mono">
                    Lessons ({matchingLessons.length})
                  </span>
                  {matchingLessons.map(l => (
                    <button
                      key={l.id}
                      onClick={() => {
                        onSelectLesson(l.id);
                        onClose();
                      }}
                      className="w-full text-left p-3 rounded-xl bg-card hover:bg-muted/60 border border-border transition flex items-center justify-between group shadow-sm"
                    >
                      <div className="flex items-center gap-2.5">
                        <BookOpen className="w-4 h-4 text-accent shrink-0" />
                        <div>
                          <span className="text-xs font-semibold text-foreground block group-hover:text-primary transition">
                            {l.title}
                          </span>
                          <span className="text-[10px] text-muted-foreground block">{l.level} • {l.readTime}</span>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground" />
                    </button>
                  ))}
                </div>
              )}

              {/* Strategies */}
              {matchingStrategies.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block font-mono">
                    Strategies ({matchingStrategies.length})
                  </span>
                  {matchingStrategies.map(s => (
                    <button
                      key={s.id}
                      onClick={() => {
                        onSelectStrategy(s.id);
                        onClose();
                      }}
                      className="w-full text-left p-3 rounded-xl bg-card hover:bg-muted/60 border border-border transition flex items-center justify-between group shadow-sm"
                    >
                      <div className="flex items-center gap-2.5">
                        <TrendingUp className="w-4 h-4 text-primary shrink-0" />
                        <div>
                          <span className="text-xs font-semibold text-foreground block group-hover:text-primary transition">
                            {s.title}
                          </span>
                          <span className="text-[10px] text-muted-foreground block">{s.category} • R:R {s.riskReward}</span>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground" />
                    </button>
                  ))}
                </div>
              )}

              {/* Rules & Tips */}
              {matchingRules.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block font-mono">
                    Golden Rules & Psychology ({matchingRules.length})
                  </span>
                  {matchingRules.map(r => (
                    <button
                      key={r.id}
                      onClick={() => {
                        onOpenTips();
                        onClose();
                      }}
                      className="w-full text-left p-3 rounded-xl bg-card hover:bg-muted/60 border border-border transition flex items-center justify-between group shadow-sm"
                    >
                      <div className="flex items-center gap-2.5">
                        <ShieldAlert className="w-4 h-4 text-warning shrink-0" />
                        <div>
                          <span className="text-xs font-semibold text-foreground block group-hover:text-warning transition">
                            {r.title}
                          </span>
                          <span className="text-[10px] text-muted-foreground block">{r.category}</span>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
