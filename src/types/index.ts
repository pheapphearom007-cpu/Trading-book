export type AppTab = 'curriculum' | 'strategies' | 'calculator' | 'tips' | 'bookmarks';

export interface UserProgress {
  completedLessonIds: string[];
  bookmarkedLessonIds: string[];
  bookmarkedStrategyIds: string[];
  checkedChecklistIds: string[];
}
