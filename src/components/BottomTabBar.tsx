import React from 'react';
import { AppTab } from '../types';
import { BookOpen, TrendingUp, Calculator, ShieldCheck, Bookmark } from 'lucide-react';

interface BottomTabBarProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  bookmarksCount: number;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  activeTab,
  onTabChange,
  bookmarksCount
}) => {
  const tabs = [
    { id: 'curriculum' as AppTab, label: 'Curriculum', icon: BookOpen },
    { id: 'strategies' as AppTab, label: 'Strategies', icon: TrendingUp },
    { id: 'calculator' as AppTab, label: 'Calculator', icon: Calculator },
    { id: 'tips' as AppTab, label: 'Rules & Tips', icon: ShieldCheck },
    { id: 'bookmarks' as AppTab, label: 'Saved', icon: Bookmark, badge: bookmarksCount },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-t border-border px-3 pt-2 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.1)] transition-colors">
      <div className="max-w-md mx-auto grid grid-cols-5 gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all duration-150 relative select-none active:scale-95 ${
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 stroke-[2.2]' : 'stroke-[1.8]'}`} />
                {Boolean(tab.badge && tab.badge > 0) && (
                  <span className="absolute -top-1.5 -right-2.5 min-w-4 h-4 px-1 rounded-full bg-warning text-primary-foreground text-[9px] font-mono font-bold flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-[11px] mt-1 tracking-tight ${isActive ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
