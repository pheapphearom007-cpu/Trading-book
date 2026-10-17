import React, { useState } from 'react';
import { CURRICULUM_MODULES } from '../data/curriculumData';
import { CheckCircle2, Circle, Clock, ArrowRight, Bookmark, BookmarkCheck, Sparkles, BookOpen } from 'lucide-react';

interface CurriculumViewProps {
  completedLessonIds: string[];
  bookmarkedLessonIds: string[];
  onSelectLesson: (lessonId: string) => void;
  onToggleBookmark: (lessonId: string) => void;
}

export const CurriculumView: React.FC<CurriculumViewProps> = ({
  completedLessonIds,
  bookmarkedLessonIds,
  onSelectLesson,
  onToggleBookmark
}) => {
  const [selectedLevel, setSelectedLevel] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');

  const filteredModules = CURRICULUM_MODULES.filter(m => 
    selectedLevel === 'All' || m.level === selectedLevel
  );

  const totalLessons = CURRICULUM_MODULES.flatMap(m => m.lessons).length;
  const completedCount = completedLessonIds.length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100) || 0;

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-24">
      {/* Hero Welcome Banner - matching rom-latex card style */}
      <div className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm relative overflow-hidden transition-colors">
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-secondary-foreground border border-border text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>Structured Trading Curriculum</span>
          </div>

          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
              The Complete Trader's Roadmap
            </h1>
            <p className="mt-2 text-sm text-muted-foreground max-w-2xl leading-relaxed">
              From market mechanics and candlestick anatomy to institutional order blocks and liquidity sweeps. Master every phase with battle-tested playbooks.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex flex-wrap items-center gap-6 pt-3 border-t border-border/70">
            <div>
              <span className="text-xs text-muted-foreground block font-sans">Curriculum Progress</span>
              <span className="text-xl font-bold font-mono text-primary">
                {progressPercent}% Complete
              </span>
            </div>
            <div className="h-8 w-px bg-border hidden sm:block" />
            <div>
              <span className="text-xs text-muted-foreground block font-sans">Chapters Mastered</span>
              <span className="text-xl font-bold font-mono text-foreground">
                {completedCount} <span className="text-xs text-muted-foreground font-normal">/ {totalLessons}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Level Filter Tabs - matching rom-latex category pill style */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1">
        {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map(lvl => (
          <button
            key={lvl}
            onClick={() => setSelectedLevel(lvl)}
            className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              selectedLevel === lvl
                ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                : 'bg-secondary text-secondary-foreground hover:bg-muted border border-border'
            }`}
          >
            {lvl} {lvl !== 'All' && 'Tier'}
          </button>
        ))}
      </div>

      {/* Modules List */}
      <div className="space-y-6">
        {filteredModules.map((module, mIdx) => {
          const moduleCompletedCount = module.lessons.filter(l => completedLessonIds.includes(l.id)).length;
          const isModuleFullyDone = moduleCompletedCount === module.lessons.length;

          // Distinct subtle badge per tier matching rom-latex catalog colors
          const badgeStyle = module.level === 'Beginner'
            ? 'bg-primary/10 text-primary border-primary/20'
            : module.level === 'Intermediate'
            ? 'bg-accent/15 text-accent border-accent/25'
            : 'bg-warning/15 text-warning border-warning/25';

          return (
            <div
              key={module.id}
              className="rounded-xl border border-border bg-card text-card-foreground shadow-sm overflow-hidden transition-all"
            >
              {/* Module Header */}
              <div className="p-5 border-b border-border bg-secondary/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-muted-foreground">MODULE {mIdx + 1}</span>
                    <span className={`text-[11px] font-semibold uppercase px-2.5 py-0.5 rounded-full border ${badgeStyle}`}>
                      {module.level}
                    </span>
                    {isModuleFullyDone && (
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-700/10 text-emerald-700 dark:text-emerald-400 border border-emerald-700/20">
                        Mastered ✓
                      </span>
                    )}
                  </div>
                  <h2 className="font-serif text-lg sm:text-xl font-semibold text-foreground tracking-tight">{module.title}</h2>
                  <p className="text-xs sm:text-sm text-muted-foreground">{module.description}</p>
                </div>

                <div className="text-xs font-mono text-muted-foreground shrink-0 bg-card px-3 py-1.5 rounded-lg border border-border">
                  {moduleCompletedCount} / {module.lessons.length} Finished
                </div>
              </div>

              {/* Lessons in Module */}
              <div className="divide-y divide-border">
                {module.lessons.map((lesson) => {
                  const isDone = completedLessonIds.includes(lesson.id);
                  const isSaved = bookmarkedLessonIds.includes(lesson.id);

                  return (
                    <div
                      key={lesson.id}
                      className="p-4 hover:bg-muted/40 transition flex items-center justify-between gap-3 group"
                    >
                      <button
                        onClick={() => onSelectLesson(lesson.id)}
                        className="flex items-start gap-3 flex-1 text-left"
                      >
                        <div className="mt-0.5 shrink-0">
                          {isDone ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                          ) : (
                            <Circle className="w-5 h-5 text-muted-foreground/60 group-hover:text-foreground transition" />
                          )}
                        </div>

                        <div className="space-y-1">
                          <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition">
                            {lesson.title}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
                            <span className="flex items-center gap-1 font-mono">
                              <Clock className="w-3 h-3" />
                              {lesson.readTime}
                            </span>
                            <span>•</span>
                            <span className="line-clamp-1">{lesson.summary}</span>
                          </div>
                        </div>
                      </button>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => onToggleBookmark(lesson.id)}
                          className={`p-2 rounded-lg border transition ${
                            isSaved 
                              ? 'bg-warning/20 text-warning border-warning/40' 
                              : 'text-muted-foreground hover:text-foreground border-transparent hover:border-border hover:bg-secondary'
                          }`}
                          title="Bookmark"
                        >
                          {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                        </button>

                        <button
                          onClick={() => onSelectLesson(lesson.id)}
                          className="p-2 rounded-lg text-muted-foreground group-hover:text-primary transition"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
