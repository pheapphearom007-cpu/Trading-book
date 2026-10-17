import React, { useState } from 'react';
import { PATTERN_CHEAT_SHEET, CheatSheetItem } from '../data/tipsData';
import { PatternVisual } from './PatternVisuals';
import { X, Search } from 'lucide-react';

interface PatternCheatSheetModalProps {
  onClose: () => void;
}

export const PatternCheatSheetModal: React.FC<PatternCheatSheetModalProps> = ({ onClose }) => {
  const [filterType, setFilterType] = useState<'All' | 'Candlestick' | 'Chart Pattern'>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = PATTERN_CHEAT_SHEET.filter(item => {
    const matchesFilter = filterType === 'All' || item.type === filterType;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-card border border-border rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-xl space-y-5 p-5 sm:p-7 relative my-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-foreground">Pattern Cheat Sheet</h2>
            <p className="text-xs text-muted-foreground mt-0.5">High-probability visual market formations</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-secondary border border-border text-muted-foreground hover:text-foreground transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Search */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search pattern name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-secondary/50 border border-border rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-foreground focus:outline-none focus:border-primary"
            />
          </div>
          <div className="flex gap-1.5 bg-secondary p-1 rounded-xl border border-border">
            {(['All', 'Candlestick', 'Chart Pattern'] as const).map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  filterType === type
                    ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of Pattern Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="bg-card border border-border rounded-xl p-4 flex flex-col justify-between space-y-3 shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full border ${
                    item.bias === 'Bullish'
                      ? 'bg-emerald-700/10 text-emerald-800 dark:text-emerald-300 border-emerald-700/20'
                      : 'bg-destructive/10 text-destructive border-destructive/20'
                  }`}>
                    {item.bias}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    Reliability: <strong className="text-foreground">{item.reliability}</strong>
                  </span>
                </div>

                <h3 className="font-serif text-sm font-semibold text-foreground">{item.name}</h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
              </div>

              {/* SVG Pattern Visual */}
              <div className="bg-secondary/40 rounded-lg p-2 border border-border flex items-center justify-center">
                <PatternVisual type={item.svgIcon} className="w-full h-28" />
              </div>

              <div className="pt-2 border-t border-border">
                <span className="text-[10px] text-primary font-semibold uppercase block font-mono">How to Execute:</span>
                <p className="text-[11px] text-muted-foreground mt-0.5">{item.howToTrade}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
