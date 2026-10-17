export interface GoldenRule {
  id: string;
  category: 'Risk Management' | 'Psychology' | 'Execution' | 'Habits';
  title: string;
  badge: string;
  summary: string;
  details: string;
  ruleOfThumb: string;
}

export interface CheatSheetItem {
  id: string;
  name: string;
  type: 'Candlestick' | 'Chart Pattern';
  bias: 'Bullish' | 'Bearish' | 'Neutral';
  description: string;
  reliability: 'High' | 'Very High' | 'Medium';
  howToTrade: string;
  svgIcon: string;
}

export const GOLDEN_RULES: GoldenRule[] = [
  {
    id: 'rule-risk-1-percent',
    category: 'Risk Management',
    title: 'The 1% - 2% Capital Rule',
    badge: 'Non-Negotiable',
    summary: 'Never risk more than 1% to 2% of your total account balance on a single trade setup.',
    details: 'If your account is $10,000, your maximum dollar loss if your stop-loss is hit must never exceed $100 (1%) or $200 (2%). This ensures that even an unprecedented 10-trade losing streak only dents your capital by ~9.5%, leaving you fully solvent to recover.',
    ruleOfThumb: 'Risk in Dollars = Account Equity × 0.01. Calculate position size backwards from your stop-loss distance!'
  },
  {
    id: 'rule-asymmetric-rr',
    category: 'Risk Management',
    title: 'Asymmetric Risk-to-Reward (Minimum 1:2)',
    badge: 'Mathematical Edge',
    summary: 'Only take setups where potential profit is at least twice your maximum downside risk.',
    details: 'With a 1:2 Risk-to-Reward ratio, you can be wrong 60% of the time (40% win rate) and still make steady profits! 10 trades: 4 wins × $200 = +$800. 6 losses × $100 = -$600. Net Profit = +$200. Trading is about risk asymmetry, not a 90% win rate illusion.',
    ruleOfThumb: 'Never enter a trade where the take-profit target is smaller than your stop-loss distance.'
  },
  {
    id: 'rule-drawdown-math',
    category: 'Risk Management',
    title: 'The Brutal Math of Drawdown Recovery',
    badge: 'Survival Math',
    summary: 'Recovering from deep capital losses requires exponentially higher percentage gains.',
    details: 'A 10% loss requires an 11% gain to break even. A 20% loss requires a 25% gain. A 50% loss requires a 100% gain! And an 80% loss requires a 400% gain just to return to zero. Protect your capital with your life.',
    ruleOfThumb: 'If you lose 3% of your account in a single day, shut off your screens immediately.'
  },
  {
    id: 'rule-fomo-cure',
    category: 'Psychology',
    title: 'Curing FOMO (Fear Of Missing Out)',
    badge: 'Mindset',
    summary: 'The market will be here tomorrow, next week, and for the next 50 years. Missed moves cost zero dollars.',
    details: 'When a coin or stock pumps 20% vertically, amateur retail traders feel acute pain and buy the top. Institutional traders celebrate because retail liquidity just arrived to buy their exit bags. Remind yourself: cash is an active, profitable position.',
    ruleOfThumb: 'If you feel the urgent emotional impulse to chase a green candle, that is your biological signal NOT to enter.'
  },
  {
    id: 'rule-revenge-trading',
    category: 'Psychology',
    title: 'Eliminating the Revenge Trading Virus',
    badge: 'Discipline',
    summary: 'Trying to "make back" money from a bad loss is the #1 cause of total account liquidation.',
    details: 'After taking a painful loss, your brain enters an emotional fight-or-flight state. Cortisol spikes, rational decision-making shuts down, and traders double their position sizes on poor setups to "get even". Institute a mandatory 2-hour timeout after 2 consecutive stop-outs.',
    ruleOfThumb: 'The market owes you nothing. Each trade is independent and has zero memory of your previous trade.'
  },
  {
    id: 'rule-journaling',
    category: 'Habits',
    title: 'The Holy Trinity: Plan, Execute, Journal',
    badge: 'Professionalism',
    summary: 'If you cannot measure your trades, you cannot improve your edge.',
    details: 'Every professional hedge fund reviews trade logs daily. Screenshot your chart before entry, at exit, and log: Entry Price, Stop Loss, Target, Reason for Entry, Mistake or Conformance to Plan, and Emotional State. Patterns of mistakes will emerge clearly within 30 days.',
    ruleOfThumb: 'Review your worst 5 losing trades every weekend. Most losses stem from violating your own rules.'
  }
];

export const PRE_FLIGHT_CHECKLIST_ITEMS = [
  { id: 'chk-1', text: 'Is there a clear higher-timeframe trend or structural bias supporting this trade?' },
  { id: 'chk-2', text: 'Has price reached a key confluence zone (S/R, FVG, Order Block, or dynamic EMA)?' },
  { id: 'chk-3', text: 'Is there an objective rejection or displacement trigger candle confirmed on the close?' },
  { id: 'chk-4', text: 'Is the Stop-Loss placed at a logical structural invalidation point (not an arbitrary dollar amount)?' },
  { id: 'chk-5', text: 'Is the Risk-to-Reward ratio at least 1:2 to the first take-profit target?' },
  { id: 'chk-6', text: 'Have you verified that high-impact economic news (CPI, FOMC, NFP) is NOT releasing in the next 15 minutes?' },
  { id: 'chk-7', text: 'Is your total position risk capped at 1% or less of your current account balance?' }
];

export const PATTERN_CHEAT_SHEET: CheatSheetItem[] = [
  {
    id: 'pat-bull-engulfing',
    name: 'Bullish Engulfing',
    type: 'Candlestick',
    bias: 'Bullish',
    reliability: 'High',
    description: 'A large green body that completely covers the prior red body. Shows buyers overwhelming sellers at support.',
    howToTrade: 'Enter on candle close at support with SL below the lowest wick.',
    svgIcon: 'bullish-engulfing'
  },
  {
    id: 'pat-hammer-pinbar',
    name: 'Hammer / Pin Bar',
    type: 'Candlestick',
    bias: 'Bullish',
    reliability: 'High',
    description: 'Small body near top with a long lower shadow (at least 2x body length). Indicates strong price rejection from the lows.',
    howToTrade: 'Enter on break of the hammer high, SL placed tightly beneath the lower wick.',
    svgIcon: 'hammer'
  },
  {
    id: 'pat-shooting-star',
    name: 'Shooting Star',
    type: 'Candlestick',
    bias: 'Bearish',
    reliability: 'High',
    description: 'Long upper wick rejection with small body near the bottom. Shows buyers exhausted at key resistance.',
    howToTrade: 'Enter short when low of the shooting star is broken. SL above high wick.',
    svgIcon: 'shooting-star'
  },
  {
    id: 'pat-double-bottom',
    name: 'Double Bottom (W-Pattern)',
    type: 'Chart Pattern',
    bias: 'Bullish',
    reliability: 'Very High',
    description: 'Two distinct troughs formed near the same price level with a neckline between them. Classic institutional accumulation.',
    howToTrade: 'Enter on breakout and retest of the neckline. Target equal to height of pattern.',
    svgIcon: 'double-bottom'
  },
  {
    id: 'pat-head-shoulders',
    name: 'Head & Shoulders',
    type: 'Chart Pattern',
    bias: 'Bearish',
    reliability: 'Very High',
    description: 'Left Shoulder, Higher Peak (Head), and Lower Peak (Right Shoulder). Signals exhaustion of a macro uptrend.',
    howToTrade: 'Enter on breakdown and retest of the neckline. Measure head height for projection.',
    svgIcon: 'head-shoulders'
  },
  {
    id: 'pat-bull-flag',
    name: 'Bull Flag (Continuation)',
    type: 'Chart Pattern',
    bias: 'Bullish',
    reliability: 'High',
    description: 'Strong upward impulse pole followed by a shallow, orderly downward sloping channel.',
    howToTrade: 'Enter on break of the upper channel line with volume confirmation.',
    svgIcon: 'bull-flag'
  }
];
