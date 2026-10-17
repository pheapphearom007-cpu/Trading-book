import React, { useState } from 'react';
import { Calculator as CalcIcon, TrendingUp, TrendingDown, DollarSign, Percent, AlertCircle, Copy, Check } from 'lucide-react';

export const Calculator: React.FC = () => {
  const [balance, setBalance] = useState<number>(10000);
  const [riskPercent, setRiskPercent] = useState<number>(1);
  const [entryPrice, setEntryPrice] = useState<number>(65000);
  const [stopLoss, setStopLoss] = useState<number>(64000);
  const [direction, setDirection] = useState<'long' | 'short'>('long');
  const [copied, setCopied] = useState<boolean>(false);

  // Calculations
  const riskAmount = (balance * riskPercent) / 100;
  const priceDiff = direction === 'long' 
    ? Math.max(0.0001, entryPrice - stopLoss) 
    : Math.max(0.0001, stopLoss - entryPrice);
    
  const stopDistancePercent = entryPrice > 0 ? (priceDiff / entryPrice) * 100 : 0;
  const positionSize = priceDiff > 0 ? riskAmount / priceDiff : 0;
  const positionValue = positionSize * entryPrice;

  // Take Profit Levels
  const tp2Price = direction === 'long' 
    ? entryPrice + (priceDiff * 2) 
    : entryPrice - (priceDiff * 2);
  const tp2Profit = riskAmount * 2;

  const tp3Price = direction === 'long' 
    ? entryPrice + (priceDiff * 3) 
    : entryPrice - (priceDiff * 3);
  const tp3Profit = riskAmount * 3;

  const isInvalidStop = direction === 'long' ? stopLoss >= entryPrice : stopLoss <= entryPrice;

  const handleCopySummary = () => {
    const text = `Trade Plan (${direction.toUpperCase()}):
Account Balance: $${balance.toLocaleString()}
Risk: ${riskPercent}% ($${riskAmount.toFixed(2)})
Entry: $${entryPrice.toLocaleString()}
Stop Loss: $${stopLoss.toLocaleString()} (${stopDistancePercent.toFixed(2)}%)
Position Size: ${positionSize.toFixed(4)} units ($${positionValue.toFixed(2)})
1:2 Target: $${tp2Price.toFixed(2)} (+$${tp2Profit.toFixed(2)})
1:3 Target: $${tp3Price.toFixed(2)} (+$${tp3Profit.toFixed(2)})`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20">
      {/* Header */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-secondary border border-border flex items-center justify-center text-primary">
              <CalcIcon className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-serif text-xl sm:text-2xl font-semibold text-foreground tracking-tight">Position Size & Risk Calculator</h1>
              <p className="text-xs text-muted-foreground mt-0.5">Institutional capital preservation sizing</p>
            </div>
          </div>
          <button
            onClick={handleCopySummary}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary border border-border text-xs text-foreground hover:bg-muted transition active:scale-95"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Long / Short Toggle */}
      <div className="grid grid-cols-2 gap-2 bg-secondary/60 p-1.5 rounded-xl border border-border">
        <button
          onClick={() => {
            setDirection('long');
            if (stopLoss >= entryPrice) setStopLoss(entryPrice * 0.98);
          }}
          className={`flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-sm transition-all duration-150 ${
            direction === 'long'
              ? 'bg-emerald-700 text-white dark:bg-emerald-600 shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>LONG (Buy)</span>
        </button>
        <button
          onClick={() => {
            setDirection('short');
            if (stopLoss <= entryPrice) setStopLoss(entryPrice * 1.02);
          }}
          className={`flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-sm transition-all duration-150 ${
            direction === 'short'
              ? 'bg-destructive text-white shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <TrendingDown className="w-4 h-4" />
          <span>SHORT (Sell)</span>
        </button>
      </div>

      {/* Inputs Card */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4 shadow-sm">
        {/* Account Balance */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-medium text-foreground flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-accent" /> Account Equity ($)
            </label>
            <div className="flex gap-1">
              {[1000, 5000, 10000, 50000].map(val => (
                <button
                  key={val}
                  onClick={() => setBalance(val)}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono transition ${
                    balance === val ? 'bg-primary text-primary-foreground font-semibold' : 'bg-secondary text-secondary-foreground border border-border'
                  }`}
                >
                  ${val >= 1000 ? `${val / 1000}k` : val}
                </button>
              ))}
            </div>
          </div>
          <input
            type="number"
            value={balance || ''}
            onChange={(e) => setBalance(parseFloat(e.target.value) || 0)}
            className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-foreground font-mono text-base focus:outline-none focus:border-primary transition"
            placeholder="10000"
          />
        </div>

        {/* Risk Percentage */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-medium text-foreground flex items-center gap-1">
              <Percent className="w-3.5 h-3.5 text-warning" /> Risk Percentage (%)
            </label>
            <div className="flex gap-1.5">
              {[0.5, 1, 1.5, 2].map(pct => (
                <button
                  key={pct}
                  onClick={() => setRiskPercent(pct)}
                  className={`px-2.5 py-0.5 rounded text-[11px] font-mono transition ${
                    riskPercent === pct ? 'bg-primary text-primary-foreground font-semibold' : 'bg-secondary text-secondary-foreground border border-border'
                  }`}
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>
          <div className="relative">
            <input
              type="number"
              step="0.1"
              value={riskPercent || ''}
              onChange={(e) => setRiskPercent(parseFloat(e.target.value) || 0)}
              className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-foreground font-mono text-base focus:outline-none focus:border-primary transition"
              placeholder="1"
            />
            <span className="absolute right-4 top-3.5 text-xs text-foreground font-mono font-medium">
              = ${riskAmount.toFixed(2)} Risk
            </span>
          </div>
        </div>

        {/* Entry and Stop Loss Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div>
            <label className="block text-xs font-medium text-foreground mb-1.5">Entry Price ($)</label>
            <input
              type="number"
              step="any"
              value={entryPrice || ''}
              onChange={(e) => setEntryPrice(parseFloat(e.target.value) || 0)}
              className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-foreground font-mono text-base focus:outline-none focus:border-primary transition"
              placeholder="65000"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground mb-1.5">Stop Loss ($)</label>
            <input
              type="number"
              step="any"
              value={stopLoss || ''}
              onChange={(e) => setStopLoss(parseFloat(e.target.value) || 0)}
              className={`w-full bg-secondary/50 border rounded-xl px-4 py-3 text-foreground font-mono text-base focus:outline-none transition ${
                isInvalidStop ? 'border-destructive ring-1 ring-destructive' : 'border-border focus:border-destructive'
              }`}
              placeholder="64000"
            />
          </div>
        </div>

        {isInvalidStop && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>
              {direction === 'long' 
                ? 'For a Long trade, your Stop-Loss must be lower than your Entry Price.'
                : 'For a Short trade, your Stop-Loss must be higher than your Entry Price.'}
            </span>
          </div>
        )}
      </div>

      {/* Results Card */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-5 shadow-sm">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Calculation Results</h3>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-secondary/60 border border-border rounded-xl p-3.5">
            <span className="text-[11px] text-muted-foreground block">Position Sizing</span>
            <span className="text-lg font-bold font-mono text-primary block mt-1">
              {positionSize.toFixed(4)} <span className="text-xs text-muted-foreground">units</span>
            </span>
            <span className="text-[10px] text-muted-foreground font-mono">Notional: ${positionValue.toFixed(2)}</span>
          </div>

          <div className="bg-secondary/60 border border-border rounded-xl p-3.5">
            <span className="text-[11px] text-muted-foreground block">Max Capital at Risk</span>
            <span className="text-lg font-bold font-mono text-destructive block mt-1">
              ${riskAmount.toFixed(2)}
            </span>
            <span className="text-[10px] text-muted-foreground font-mono">SL Distance: {stopDistancePercent.toFixed(2)}%</span>
          </div>
        </div>

        {/* Take Profit Milestones */}
        <div className="space-y-2 pt-2 border-t border-border">
          <span className="text-[11px] font-semibold text-muted-foreground block mb-2">TARGET PROFIT MILESTONES</span>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-secondary/50 border border-border">
            <div>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span> 1:2 R:R Objective
              </span>
              <span className="text-xs text-foreground font-mono block mt-0.5">Exit Price: ${tp2Price.toFixed(2)}</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold font-mono text-emerald-700 dark:text-emerald-400">+${tp2Profit.toFixed(2)}</span>
              <span className="text-[10px] text-muted-foreground block">+{(riskPercent * 2).toFixed(1)}% Account</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-secondary/50 border border-border">
            <div>
              <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary"></span> 1:3 R:R Objective
              </span>
              <span className="text-xs text-foreground font-mono block mt-0.5">Exit Price: ${tp3Price.toFixed(2)}</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold font-mono text-primary">+${tp3Profit.toFixed(2)}</span>
              <span className="text-[10px] text-muted-foreground block">+{(riskPercent * 3).toFixed(1)}% Account</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
