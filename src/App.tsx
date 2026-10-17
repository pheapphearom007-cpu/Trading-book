import React, { useState, useEffect } from 'react';
import { AppTab, UserProgress } from './types';
import { CURRICULUM_MODULES, Lesson } from './data/curriculumData';
import { TRADING_STRATEGIES, TradingStrategy } from './data/strategiesData';
import { PRE_FLIGHT_CHECKLIST_ITEMS } from './data/tipsData';
import { useAppInitialization } from './hooks/useAppInitialization';

// Components
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { BottomTabBar } from './components/BottomTabBar';
import { CurriculumView } from './components/CurriculumView';
import { StrategiesView } from './components/StrategiesView';
import { Calculator } from './components/Calculator';
import { TipsView } from './components/TipsView';
import { BookmarksView } from './components/BookmarksView';
import { LessonReader } from './components/LessonReader';
import { StrategyDetailModal } from './components/StrategyDetailModal';
import { PatternCheatSheetModal } from './components/PatternCheatSheetModal';
import { SearchModal } from './components/SearchModal';
import { IPhoneDeviceFrame } from './components/IPhoneDeviceFrame';

const STORAGE_KEY = 'trading_book_progress_v1';
const THEME_KEY = 'trading_book_theme_mode';

export const App: React.FC = () => {
  // Application initialization hook
  const {
    isInitialized,
    isFadingOut,
    progressPercent,
    statusMessage,
    error: initError,
    initResult,
    retry: retryInit
  } = useAppInitialization();

  const [activeTab, setActiveTab] = useState<AppTab>('curriculum');
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [activeStrategyModal, setActiveStrategyModal] = useState<TradingStrategy | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isCheatSheetOpen, setIsCheatSheetOpen] = useState<boolean>(false);
  const [isPhoneFrame, setIsPhoneFrame] = useState<boolean>(false);

  // Theme State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_KEY);
      if (savedTheme !== null) return savedTheme === 'dark';
    } catch (e) {
      console.error(e);
    }
    return true; // Default dark
  });

  // Sync theme with document element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      try { localStorage.setItem(THEME_KEY, 'dark'); } catch (e) {}
    } else {
      document.documentElement.classList.remove('dark');
      try { localStorage.setItem(THEME_KEY, 'light'); } catch (e) {}
    }
  }, [isDarkMode]);

  // Persistent user state
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load progress from localStorage', e);
    }
    return {
      completedLessonIds: ['lesson-1-1'],
      bookmarkedLessonIds: [],
      bookmarkedStrategyIds: ['strategy-breakout-retest'],
      checkedChecklistIds: ['chk-1', 'chk-2']
    };
  });

  // When initialization finishes, synchronize any loaded state safely
  useEffect(() => {
    if (initResult) {
      if (initResult.progress) {
        setProgress(initResult.progress);
      }
      if (initResult.theme) {
        setIsDarkMode(initResult.theme === 'dark');
      }
    }
  }, [initResult]);

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save progress to localStorage', e);
    }
  }, [progress]);

  // Global Keyboard Shortcuts (Cmd+K / Ctrl+K for search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsCheatSheetOpen(false);
        setActiveStrategyModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handlers
  const handleToggleComplete = (lessonId: string) => {
    setProgress(prev => {
      const isCompleted = prev.completedLessonIds.includes(lessonId);
      return {
        ...prev,
        completedLessonIds: isCompleted
          ? prev.completedLessonIds.filter(id => id !== lessonId)
          : [...prev.completedLessonIds, lessonId]
      };
    });
  };

  const handleToggleLessonBookmark = (lessonId: string) => {
    setProgress(prev => {
      const isBookmarked = prev.bookmarkedLessonIds.includes(lessonId);
      return {
        ...prev,
        bookmarkedLessonIds: isBookmarked
          ? prev.bookmarkedLessonIds.filter(id => id !== lessonId)
          : [...prev.bookmarkedLessonIds, lessonId]
      };
    });
  };

  const handleToggleStrategyBookmark = (strategyId: string) => {
    setProgress(prev => {
      const isBookmarked = prev.bookmarkedStrategyIds.includes(strategyId);
      return {
        ...prev,
        bookmarkedStrategyIds: isBookmarked
          ? prev.bookmarkedStrategyIds.filter(id => id !== strategyId)
          : [...prev.bookmarkedStrategyIds, strategyId]
      };
    });
  };

  const handleToggleChecklistItem = (itemId: string) => {
    setProgress(prev => {
      const isChecked = prev.checkedChecklistIds.includes(itemId);
      return {
        ...prev,
        checkedChecklistIds: isChecked
          ? prev.checkedChecklistIds.filter(id => id !== itemId)
          : [...prev.checkedChecklistIds, itemId]
      };
    });
  };

  const handleResetChecklist = () => {
    setProgress(prev => ({ ...prev, checkedChecklistIds: [] }));
  };

  const allLessons = CURRICULUM_MODULES.flatMap(m => m.lessons);
  const currentReadingLesson = activeLessonId 
    ? allLessons.find(l => l.id === activeLessonId) || null 
    : null;

  const totalBookmarks = progress.bookmarkedLessonIds.length + progress.bookmarkedStrategyIds.length;

  const showLoadingOverlay = !isInitialized || isFadingOut;

  const mainContent = (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-accent/20 selection:text-foreground transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar
        completedCount={progress.completedLessonIds.length}
        totalLessons={allLessons.length}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(prev => !prev)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCheatSheet={() => setIsCheatSheetOpen(true)}
        isPhoneFrame={isPhoneFrame}
        onTogglePhoneFrame={() => setIsPhoneFrame(prev => !prev)}
        onNavigateHome={() => {
          setActiveLessonId(null);
          setActiveTab('curriculum');
        }}
      />

      {/* Main Body Viewport */}
      <main className="flex-1 px-4 sm:px-6 pt-5 pb-nav-safe max-w-5xl w-full mx-auto">
        {currentReadingLesson ? (
          <LessonReader
            lesson={currentReadingLesson}
            onBack={() => setActiveLessonId(null)}
            onSelectLesson={(newId) => setActiveLessonId(newId)}
            isCompleted={progress.completedLessonIds.includes(currentReadingLesson.id)}
            isBookmarked={progress.bookmarkedLessonIds.includes(currentReadingLesson.id)}
            onToggleComplete={handleToggleComplete}
            onToggleBookmark={handleToggleLessonBookmark}
          />
        ) : (
          <>
            {activeTab === 'curriculum' && (
              <CurriculumView
                completedLessonIds={progress.completedLessonIds}
                bookmarkedLessonIds={progress.bookmarkedLessonIds}
                onSelectLesson={(id) => setActiveLessonId(id)}
                onToggleBookmark={handleToggleLessonBookmark}
              />
            )}

            {activeTab === 'strategies' && (
              <StrategiesView
                bookmarkedStrategyIds={progress.bookmarkedStrategyIds}
                onToggleBookmark={handleToggleStrategyBookmark}
                onOpenStrategy={(strategy) => setActiveStrategyModal(strategy)}
              />
            )}

            {activeTab === 'calculator' && (
              <Calculator />
            )}

            {activeTab === 'tips' && (
              <TipsView
                checkedChecklistIds={progress.checkedChecklistIds}
                onToggleChecklistItem={handleToggleChecklistItem}
                onResetChecklist={handleResetChecklist}
              />
            )}

            {activeTab === 'bookmarks' && (
              <BookmarksView
                bookmarkedLessonIds={progress.bookmarkedLessonIds}
                bookmarkedStrategyIds={progress.bookmarkedStrategyIds}
                onSelectLesson={(id) => setActiveLessonId(id)}
                onOpenStrategy={(strat) => setActiveStrategyModal(strat)}
                onToggleLessonBookmark={handleToggleLessonBookmark}
                onToggleStrategyBookmark={handleToggleStrategyBookmark}
              />
            )}
          </>
        )}
      </main>

      {/* Bottom Tab Bar (iOS style docked navigation) */}
      <BottomTabBar
        activeTab={activeTab}
        onTabChange={(newTab) => {
          setActiveLessonId(null);
          setActiveTab(newTab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        bookmarksCount={totalBookmarks}
      />

      {/* Modals */}
      {activeStrategyModal && (
        <StrategyDetailModal
          strategy={activeStrategyModal}
          onClose={() => setActiveStrategyModal(null)}
          isBookmarked={progress.bookmarkedStrategyIds.includes(activeStrategyModal.id)}
          onToggleBookmark={handleToggleStrategyBookmark}
        />
      )}

      {isCheatSheetOpen && (
        <PatternCheatSheetModal
          onClose={() => setIsCheatSheetOpen(false)}
        />
      )}

      {isSearchOpen && (
        <SearchModal
          onClose={() => setIsSearchOpen(false)}
          onSelectLesson={(lessonId) => {
            setActiveLessonId(lessonId);
            setIsSearchOpen(false);
          }}
          onSelectStrategy={(stratId) => {
            const found = TRADING_STRATEGIES.find(s => s.id === stratId);
            if (found) setActiveStrategyModal(found);
            setIsSearchOpen(false);
          }}
          onOpenTips={() => {
            setActiveLessonId(null);
            setActiveTab('tips');
            setIsSearchOpen(false);
          }}
        />
      )}

      {/* Professional Full-Screen Loading Screen Overlay */}
      {showLoadingOverlay && (
        <LoadingScreen
          progressPercent={progressPercent}
          statusMessage={statusMessage}
          isFadingOut={isFadingOut}
          error={initError}
          onRetry={retryInit}
        />
      )}
    </div>
  );

  if (isPhoneFrame) {
    return (
      <IPhoneDeviceFrame onExitFrame={() => setIsPhoneFrame(false)}>
        {mainContent}
      </IPhoneDeviceFrame>
    );
  }

  return mainContent;
};

export default App;
