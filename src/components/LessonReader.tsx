import React, { useState, useEffect } from 'react';
import { Lesson, CURRICULUM_MODULES } from '../data/curriculumData';
import { 
  ArrowLeft, ArrowRight, Bookmark, BookmarkCheck, CheckCircle2, 
  HelpCircle, Lightbulb, Sparkles, Clock, Layers, Award 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface LessonReaderProps {
  lesson: Lesson;
  onBack: () => void;
  onSelectLesson: (lessonId: string) => void;
  isCompleted: boolean;
  isBookmarked: boolean;
  onToggleComplete: (lessonId: string) => void;
  onToggleBookmark: (lessonId: string) => void;
}

export const LessonReader: React.FC<LessonReaderProps> = ({
  lesson,
  onBack,
  onSelectLesson,
  isCompleted,
  isBookmarked,
  onToggleComplete,
  onToggleBookmark
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');

  // Reset quiz state when lesson changes
  useEffect(() => {
    setSelectedOption(null);
    setQuizSubmitted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [lesson.id]);

  // Find all lessons in flat array for prev/next navigation
  const allLessons = CURRICULUM_MODULES.flatMap(m => m.lessons);
  const currentIndex = allLessons.findIndex(l => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const handleCompleteCelebration = () => {
    if (!isCompleted) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#1f3d5c', '#0f766e', '#b45309', '#9ec5e8']
      });
    }
    onToggleComplete(lesson.id);
  };

  const isQuizCorrect = selectedOption === lesson.quiz.correctIndex;

  return (
    <div className="max-w-3xl mx-auto pb-28">
      {/* Top Floating Action Bar */}
      <div className="sticky top-0 z-30 bg-background/90 backdrop-blur-md border-b border-border px-4 py-3 flex items-center justify-between -mx-4 sm:mx-0 sm:rounded-b-xl mb-6 transition-colors">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-medium text-foreground px-2.5 py-1.5 rounded-lg bg-secondary border border-border hover:bg-muted"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Curriculum</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Font Size Toggle */}
          <button
            onClick={() => setFontSize(f => f === 'normal' ? 'large' : 'normal')}
            className="px-2.5 py-1.5 rounded-lg bg-secondary border border-border text-xs text-foreground hover:bg-muted font-mono"
            title="Toggle text size"
          >
            {fontSize === 'normal' ? 'A+' : 'A'}
          </button>

          {/* Bookmark Toggle */}
          <button
            onClick={() => onToggleBookmark(lesson.id)}
            className={`p-1.5 rounded-lg border transition ${
              isBookmarked
                ? 'bg-warning/20 text-warning border-warning/40'
                : 'bg-secondary text-muted-foreground border-border hover:text-foreground hover:bg-muted'
            }`}
            title="Bookmark lesson"
          >
            {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Lesson Header Banner */}
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-secondary text-secondary-foreground border border-border">
            {lesson.level}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
            <Clock className="w-3.5 h-3.5" />
            {lesson.readTime}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Layers className="w-3.5 h-3.5" />
            {lesson.moduleTitle}
          </span>
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground tracking-tight leading-snug">
          {lesson.title}
        </h1>

        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed bg-secondary/40 p-4 rounded-xl border border-border">
          {lesson.summary}
        </p>
      </div>

      {/* Key Takeaways Box */}
      <div className="rounded-xl border border-border bg-card p-6 mb-8 shadow-sm">
        <div className="flex items-center gap-2 text-primary font-semibold text-sm mb-3">
          <Sparkles className="w-4 h-4 text-accent" />
          <span>Core Takeaways</span>
        </div>
        <ul className="space-y-2.5">
          {lesson.keyTakeaways.map((point, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0"></span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content Sections */}
      <div className={`space-y-8 ${fontSize === 'large' ? 'text-base sm:text-lg' : 'text-sm sm:text-base'}`}>
        {lesson.sections.map((section, idx) => (
          <div key={idx} className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-semibold text-foreground flex items-center gap-2 border-b border-border pb-2">
              {section.title}
            </h2>

            <p className="text-foreground/90 leading-relaxed font-sans">
              {section.content}
            </p>

            {section.bulletPoints && (
              <ul className="space-y-2 pl-2">
                {section.bulletPoints.map((bp, bidx) => (
                  <li key={bidx} className="flex items-start gap-2.5 text-muted-foreground text-xs sm:text-sm leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></span>
                    <span className="text-foreground/90">{bp}</span>
                  </li>
                ))}
              </ul>
            )}

            {section.keyFormula && (
              <div className="p-3.5 rounded-xl bg-secondary border border-border font-mono text-xs sm:text-sm text-foreground flex items-center gap-2">
                <span className="text-muted-foreground font-sans text-xs">Formula:</span>
                <span className="font-semibold text-primary">{section.keyFormula}</span>
              </div>
            )}

            {section.tip && (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/80 border border-border text-xs sm:text-sm text-foreground leading-relaxed">
                <Lightbulb className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-warning">Pro Tip: </span>
                  {section.tip}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Interactive Comprehension Quiz */}
      <div className="mt-12 rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-primary font-semibold text-sm">
          <HelpCircle className="w-5 h-5 text-accent" />
          <span>Comprehension Check</span>
        </div>

        <p className="text-sm sm:text-base font-semibold text-foreground font-serif">
          {lesson.quiz.question}
        </p>

        <div className="space-y-2.5 pt-1">
          {lesson.quiz.options.map((option, oIdx) => {
            const isSelected = selectedOption === oIdx;
            const isCorrect = oIdx === lesson.quiz.correctIndex;
            let btnStyle = 'bg-secondary/40 border-border hover:bg-secondary text-foreground';

            if (quizSubmitted) {
              if (isCorrect) {
                btnStyle = 'bg-emerald-700/15 border-emerald-600 text-emerald-800 dark:text-emerald-300 font-semibold';
              } else if (isSelected && !isCorrect) {
                btnStyle = 'bg-destructive/15 border-destructive text-destructive';
              }
            } else if (isSelected) {
              btnStyle = 'bg-primary/20 border-primary text-foreground font-medium';
            }

            return (
              <button
                key={oIdx}
                disabled={quizSubmitted}
                onClick={() => setSelectedOption(oIdx)}
                className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
              >
                <span>{option}</span>
                {quizSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />}
              </button>
            );
          })}
        </div>

        {!quizSubmitted ? (
          <button
            disabled={selectedOption === null}
            onClick={() => setQuizSubmitted(true)}
            className="w-full mt-3 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm transition hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Check Answer
          </button>
        ) : (
          <div className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed space-y-1 ${
            isQuizCorrect 
              ? 'bg-emerald-700/10 border-emerald-600/30 text-foreground' 
              : 'bg-destructive/10 border-destructive/30 text-foreground'
          }`}>
            <span className={`font-semibold block ${isQuizCorrect ? 'text-emerald-700 dark:text-emerald-400' : 'text-destructive'}`}>
              {isQuizCorrect ? '🎯 Spot on!' : '💡 Not quite:'}
            </span>
            <p className="text-muted-foreground">{lesson.quiz.explanation}</p>
          </div>
        )}
      </div>

      {/* Completion & Next Actions */}
      <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={handleCompleteCelebration}
          className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all active:scale-95 ${
            isCompleted
              ? 'bg-secondary text-foreground border border-border hover:bg-muted'
              : 'bg-primary text-primary-foreground hover:opacity-90 shadow-sm'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>{isCompleted ? 'Completed ✓ (Click to reset)' : 'Mark Chapter as Completed'}</span>
        </button>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {prevLesson && (
            <button
              onClick={() => onSelectLesson(prevLesson.id)}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-secondary border border-border text-xs text-foreground hover:bg-muted"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
          )}

          {nextLesson && (
            <button
              onClick={() => onSelectLesson(nextLesson.id)}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl bg-primary text-primary-foreground hover:opacity-90 text-xs font-semibold shadow-sm"
            >
              <span>Next Lesson</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
