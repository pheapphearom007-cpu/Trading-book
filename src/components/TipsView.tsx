import React from 'react';
import { GOLDEN_RULES, PRE_FLIGHT_CHECKLIST_ITEMS } from '../data/tipsData';
import { ShieldCheck, AlertTriangle, CheckSquare, Square, HeartPulse, Brain, RotateCcw } from 'lucide-react';

interface TipsViewProps {
  checkedChecklistIds: string[];
  onToggleChecklistItem: (id: string) => void;
  onResetChecklist: () => void;
}

export const TipsView: React.FC<TipsViewProps> = ({
  checkedChecklistIds,
  onToggleChecklistItem,
  onResetChecklist
}) => {
  const allChecked = PRE_FLIGHT_CHECKLIST_ITEMS.every(item => checkedChecklistIds.includes(item.id));

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-24">
      {/* Header Banner */}
      <div className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-secondary-foreground border border-border text-xs font-medium mb-3">
          <Brain className="w-3.5 h-3.5 text-warning" />
          <span>The Trader's Armor</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
          Risk Management & Psychology
        </h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-xl leading-relaxed">
          Technical analysis gets you into trades. Risk management and psychological discipline are what keep you alive and build long-term generational wealth.
        </p>
      </div>

      {/* Interactive Pre-Flight Trade Checklist */}
      <div className="rounded-xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
          <div>
            <h2 className="font-serif text-lg font-semibold text-foreground flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-accent" />
              <span>Pre-Flight Execution Checklist</span>
            </h2>
            <p className="text-xs text-muted-foreground">Complete all safety verifications before opening any position.</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-foreground bg-secondary px-3 py-1 rounded-lg border border-border">
              {checkedChecklistIds.length} / {PRE_FLIGHT_CHECKLIST_ITEMS.length} Checked
            </span>
            <button
              onClick={onResetChecklist}
              className="p-1.5 rounded-lg bg-secondary border border-border text-muted-foreground hover:text-foreground transition"
              title="Reset Checklist"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {PRE_FLIGHT_CHECKLIST_ITEMS.map((item) => {
            const isChecked = checkedChecklistIds.includes(item.id);

            return (
              <button
                key={item.id}
                onClick={() => onToggleChecklistItem(item.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition flex items-start gap-3 ${
                  isChecked
                    ? 'bg-accent/10 border-accent/30 text-foreground'
                    : 'bg-secondary/40 border-border text-foreground hover:bg-muted'
                }`}
              >
                {isChecked ? (
                  <CheckSquare className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-5 h-5 text-muted-foreground/60 shrink-0 mt-0.5" />
                )}
                <span className={`text-xs sm:text-sm leading-relaxed ${isChecked ? 'line-through text-muted-foreground' : ''}`}>
                  {item.text}
                </span>
              </button>
            );
          })}
        </div>

        {allChecked ? (
          <div className="p-3.5 rounded-xl bg-emerald-700/10 border border-emerald-700/20 text-center text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-400">
            ✓ Checklist 100% Satisfied: Your risk is protected. Good trading!
          </div>
        ) : (
          <div className="p-3 rounded-xl bg-secondary/50 border border-border text-center text-xs text-muted-foreground">
            Verify every box above to prevent emotional errors and impulsive trades.
          </div>
        )}
      </div>

      {/* The Brutal Math of Drawdown Table */}
      <div className="rounded-xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-destructive">
          <AlertTriangle className="w-5 h-5" />
          <h2 className="font-serif text-lg font-semibold text-foreground">The Asymmetry of Drawdown</h2>
        </div>
        <p className="text-xs text-muted-foreground">
          Losses hurt far more than gains help. Because your account size shrinks after each loss, the return required to return to even grows exponentially:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="py-2.5 px-3">Capital Loss</th>
                <th className="py-2.5 px-3">Gain Needed to Breakeven</th>
                <th className="py-2.5 px-3">Survival Difficulty</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="py-2 px-3 text-foreground">-10%</td>
                <td className="py-2 px-3 text-emerald-600 dark:text-emerald-400 font-bold">+11.1%</td>
                <td className="py-2 px-3 text-muted-foreground">Manageable</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-foreground">-20%</td>
                <td className="py-2 px-3 text-primary font-bold">+25.0%</td>
                <td className="py-2 px-3 text-muted-foreground">Moderate</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-foreground">-30%</td>
                <td className="py-2 px-3 text-warning font-bold">+42.8%</td>
                <td className="py-2 px-3 text-muted-foreground">Dangerous</td>
              </tr>
              <tr className="bg-destructive/5">
                <td className="py-2 px-3 text-destructive font-bold">-50%</td>
                <td className="py-2 px-3 text-destructive font-bold">+100.0%</td>
                <td className="py-2 px-3 text-destructive font-semibold">Severe Distress</td>
              </tr>
              <tr className="bg-destructive/10">
                <td className="py-2 px-3 text-destructive font-bold">-75%</td>
                <td className="py-2 px-3 text-destructive font-bold">+300.0%</td>
                <td className="py-2 px-3 text-destructive font-semibold">Near Impossible</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* The 6 Golden Rules Cards */}
      <div className="space-y-4">
        <h2 className="font-serif text-xl font-semibold text-foreground flex items-center gap-2">
          <HeartPulse className="w-5 h-5 text-accent" />
          <span>Core Mental Models</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {GOLDEN_RULES.map((rule) => (
            <div
              key={rule.id}
              className="rounded-xl border border-border bg-card p-5 space-y-3 shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground border border-border">
                    {rule.badge}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono">{rule.category}</span>
                </div>

                <h3 className="font-serif text-lg font-semibold text-foreground">{rule.title}</h3>
                <p className="text-xs text-foreground font-medium">{rule.summary}</p>
                <p className="text-xs text-muted-foreground leading-relaxed pt-1">{rule.details}</p>
              </div>

              <div className="p-3 rounded-lg bg-secondary text-xs font-mono text-foreground border border-border">
                💡 <span className="font-sans text-muted-foreground">Rule: </span>{rule.ruleOfThumb}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
