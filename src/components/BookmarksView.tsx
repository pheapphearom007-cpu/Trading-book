import React from 'react';
import { CURRICULUM_MODULES, Lesson } from '../data/curriculumData';
import { TRADING_STRATEGIES, TradingStrategy } from '../data/strategiesData';
import { Bookmark, BookOpen, TrendingUp, ArrowRight, Trash2 } from 'lucide-react';

interface BookmarksViewProps {
  bookmarkedLessonIds: string[];
  bookmarkedStrategyIds: string[];
  onSelectLesson: (lessonId: string) => void;
  onOpenStrategy: (strategy: TradingStrategy) => void;
  onToggleLessonBookmark: (lessonId: string) => void;
  onToggleStrategyBookmark: (strategyId: string) => void;
}

export const BookmarksView: React.FC<BookmarksViewProps> = ({
  bookmarkedLessonIds,
  bookmarkedStrategyIds,
  onSelectLesson,
  onOpenStrategy,
  onToggleLessonBookmark,
  onToggleStrategyBookmark
}) => {
  const allLessons = CURRICULUM_MODULES.flatMap(m => m.lessons);
  const savedLessons = allLessons.filter(l => bookmarkedLessonIds.includes(l.id));
  const savedStrategies = TRADING_STRATEGIES.filter(s => bookmarkedStrategyIds.includes(s.id));

  const totalSaved = savedLessons.length + savedStrategies.length;

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-24">
      {/* Header */}
      <div className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-secondary border border-border flex items-center justify-center text-warning">
            <Bookmark className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-serif text-xl sm:text-2xl font-semibold text-foreground tracking-tight">Your Saved Library</h1>
            <p className="text-xs text-muted-foreground mt-0.5">Quick-access playbooks and lessons for live market execution</p>
          </div>
        </div>
      </div>

      {totalSaved === 0 ? (
        <div className="rounded-xl border border-border bg-card p-12 text-center space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-secondary border border-border mx-auto flex items-center justify-center text-muted-foreground">
            <Bookmark className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-base font-semibold text-foreground">No Bookmarks Saved Yet</h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            Tap the bookmark icon on any lesson or trading strategy to save it here for fast reference while you trade.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Saved Strategies */}
          {savedStrategies.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span>Saved Strategies ({savedStrategies.length})</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {savedStrategies.map(strat => (
                  <div
                    key={strat.id}
                    className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition flex flex-col justify-between shadow-sm"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/25">
                          {strat.category}
                        </span>
                        <button
                          onClick={() => onToggleStrategyBookmark(strat.id)}
                          className="text-muted-foreground hover:text-destructive transition p-1"
                          title="Remove bookmark"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <h4 className="font-serif text-sm font-semibold text-foreground">{strat.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{strat.tagline}</p>
                    </div>

                    <button
                      onClick={() => onOpenStrategy(strat)}
                      className="mt-3 flex items-center justify-between text-xs font-semibold text-primary hover:underline pt-2 border-t border-border"
                    >
                      <span>Open Playbook</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Saved Lessons */}
          {savedLessons.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-accent" />
                <span>Saved Chapters ({savedLessons.length})</span>
              </h2>

              <div className="divide-y divide-border rounded-xl border border-border bg-card overflow-hidden shadow-sm">
                {savedLessons.map(lesson => (
                  <div
                    key={lesson.id}
                    className="p-4 hover:bg-muted/40 transition flex items-center justify-between gap-3"
                  >
                    <button
                      onClick={() => onSelectLesson(lesson.id)}
                      className="text-left flex-1"
                    >
                      <span className="text-[10px] font-semibold text-primary uppercase font-mono">{lesson.level} • {lesson.readTime}</span>
                      <h4 className="text-sm font-medium text-foreground">{lesson.title}</h4>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onToggleLessonBookmark(lesson.id)}
                        className="p-1.5 text-muted-foreground hover:text-destructive transition rounded-lg"
                        title="Remove bookmark"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onSelectLesson(lesson.id)}
                        className="p-1.5 text-muted-foreground hover:text-foreground"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
