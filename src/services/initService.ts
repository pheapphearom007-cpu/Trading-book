import { CURRICULUM_MODULES } from '../data/curriculumData';
import { TRADING_STRATEGIES } from '../data/strategiesData';
import { GOLDEN_RULES, PRE_FLIGHT_CHECKLIST_ITEMS } from '../data/tipsData';
import { UserProgress } from '../types';

export interface InitProgressCallback {
  (percentage: number, statusMessage: string): void;
}

export interface InitResult {
  progress: UserProgress;
  theme: 'light' | 'dark';
  stats: {
    totalLessons: number;
    totalStrategies: number;
    totalRules: number;
  };
}

const STORAGE_KEY = 'trading_book_progress_v1';
const THEME_KEY = 'trading_book_theme_mode';

/**
 * Validates local storage access without throwing uncaught security errors
 */
function testStorageSafety(): boolean {
  try {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return false;
    }
    const testKey = '__tb_storage_probe__';
    localStorage.setItem(testKey, '1');
    localStorage.removeItem(testKey);
    return true;
  } catch (err) {
    console.warn('Storage probe warning:', err);
    return false;
  }
}

/**
 * Orchestrates full application startup and readiness check
 */
export async function initializeApplication(
  onProgress: InitProgressCallback,
  signal?: AbortSignal
): Promise<InitResult> {
  const checkAborted = () => {
    if (signal?.aborted) {
      throw new Error('Initialization was cancelled.');
    }
  };

  // Step 1: Environment & Storage Verification (0% -> 25%)
  onProgress(15, 'Verifying environment & storage integrity...');
  await new Promise(r => setTimeout(r, 120));
  checkAborted();

  const isStorageSafe = testStorageSafety();
  if (!isStorageSafe) {
    console.warn('LocalStorage is restricted. Running in in-memory session mode.');
  }

  // Step 2: Restore User Session & Progress (25% -> 50%)
  onProgress(40, 'Restoring user session and reading history...');
  await new Promise(r => setTimeout(r, 150));
  checkAborted();

  let userProgress: UserProgress = {
    completedLessonIds: ['lesson-1-1'],
    bookmarkedLessonIds: [],
    bookmarkedStrategyIds: ['strategy-breakout-retest'],
    checkedChecklistIds: ['chk-1', 'chk-2']
  };

  let savedTheme: 'light' | 'dark' = 'dark';

  if (isStorageSafe) {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === 'object') {
          userProgress = {
            completedLessonIds: Array.isArray(parsed.completedLessonIds) ? parsed.completedLessonIds : ['lesson-1-1'],
            bookmarkedLessonIds: Array.isArray(parsed.bookmarkedLessonIds) ? parsed.bookmarkedLessonIds : [],
            bookmarkedStrategyIds: Array.isArray(parsed.bookmarkedStrategyIds) ? parsed.bookmarkedStrategyIds : [],
            checkedChecklistIds: Array.isArray(parsed.checkedChecklistIds) ? parsed.checkedChecklistIds : []
          };
        }
      }

      const storedTheme = localStorage.getItem(THEME_KEY);
      if (storedTheme === 'light' || storedTheme === 'dark') {
        savedTheme = storedTheme;
      }
    } catch (e) {
      console.warn('Corrupted session data handled gracefully:', e);
    }
  }

  // Step 3: Verify Curriculum & Market Data Integrity (50% -> 75%)
  onProgress(65, 'Verifying curriculum modules & strategy playbooks...');
  await new Promise(r => setTimeout(r, 150));
  checkAborted();

  if (!CURRICULUM_MODULES || CURRICULUM_MODULES.length === 0) {
    throw new Error('Curriculum data could not be verified.');
  }

  if (!TRADING_STRATEGIES || TRADING_STRATEGIES.length === 0) {
    throw new Error('Strategy playbooks could not be verified.');
  }

  const allLessons = CURRICULUM_MODULES.flatMap(m => m.lessons);

  // Step 4: Index Search & Pre-warm Cache (75% -> 90%)
  onProgress(85, 'Pre-warming search index & knowledge base...');
  await new Promise(r => setTimeout(r, 120));
  checkAborted();

  // Validate integrity of user completed lessons vs all lessons
  const validLessonIds = new Set(allLessons.map(l => l.id));
  userProgress.completedLessonIds = userProgress.completedLessonIds.filter(id => validLessonIds.has(id));

  // Step 5: Finalizing (90% -> 100%)
  onProgress(95, 'Preparing your trading workspace...');
  await new Promise(r => setTimeout(r, 100));
  checkAborted();

  onProgress(100, 'Ready');

  return {
    progress: userProgress,
    theme: savedTheme,
    stats: {
      totalLessons: allLessons.length,
      totalStrategies: TRADING_STRATEGIES.length,
      totalRules: GOLDEN_RULES.length + PRE_FLIGHT_CHECKLIST_ITEMS.length
    }
  };
}
