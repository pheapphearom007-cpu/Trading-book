export interface TradingStrategy {
  id: string;
  title: string;
  tagline: string;
  category: 'Trend Continuation' | 'Reversal' | 'Smart Money' | 'Scalping' | 'Momentum';
  timeframe: string;
  idealAssets: string[];
  winRateEst: string;
  riskReward: string;
  indicatorsNeeded: string[];
  overview: string;
  setupConditions: string[];
  entryTriggers: string[];
  stopLossRule: string;
  takeProfitRules: string[];
  checklist: string[];
  proTip: string;
  asciiVisual: string;
}

export const TRADING_STRATEGIES: TradingStrategy[] = [
  {
    id: 'strategy-breakout-retest',
    title: 'The S/R Breakout & Retest Confirmation',
    tagline: 'The most reliable trend continuation setup in any liquid financial asset.',
    category: 'Trend Continuation',
    timeframe: '15m to 4H charts',
    idealAssets: ['Forex (EUR/USD, GBP/USD)', 'Crypto (BTC, ETH)', 'Index Futures (NQ, ES)'],
    winRateEst: '55% - 62%',
    riskReward: '1:2.5 to 1:3.5',
    indicatorsNeeded: ['Horizontal Volume Profile or 20/50 EMA for trend filter', 'Volume Oscillator'],
    overview: 'Instead of gambling on volatile breakout candles (which frequently turn into bull/bear traps), this playbook waits for price to decisively break resistance, let aggressive buyers cool off, and enters when the broken resistance is retested as validated support.',
    setupConditions: [
      'Identify a distinct horizontal resistance level tested at least 2-3 times.',
      'A strong impulsive candle with above-average volume breaks above the resistance zone and closes above it.',
      'Allow price to retrace smoothly (low volume pullback) back to the broken resistance level (now flipped support).'
    ],
    entryTriggers: [
      'Wait for a bullish rejection candle (Pin Bar / Hammer / Bullish Engulfing) to form directly on the retested level.',
      'Enter long on the close of the confirmation candle, or place a Buy Stop order 1 tick above its high.'
    ],
    stopLossRule: 'Place your Stop-Loss 1-2 ATR below the retest swing low or beneath the flipped support zone.',
    takeProfitRules: [
      'Take Profit 1 (50% position): The recent breakout swing high (Move SL to Breakeven).',
      'Take Profit 2 (remaining 50%): Next major higher-timeframe resistance level (aiming for 1:3 R:R).'
    ],
    checklist: [
      'Did the breakout candle have high volume and close outside the range?',
      'Is the pullback towards the retest slow and corrective (not impulsive)?',
      'Did a rejection candle print at the exact retest level?',
      'Is the risk-to-reward ratio at least 1:2 to the first target?'
    ],
    proTip: 'If the retest slices right back into the previous range with high momentum, cancel the setup immediately. That is a failed breakout (fakeout), not a retest!',
    asciiVisual: `
      [Impulsive Breakout] --->  /\\
                                /  \\  (Low Volume Pullback)
    === RESISTANCE LEVEL ======+====\\====================
                                      \\   [Bullish Pin Bar / ENTRY]
    === NEW SUPPORT LEVEL =============\\_ /-----------------> [TARGET TP2]
                                         v
                                    [STOP LOSS]
    `
  },
  {
    id: 'strategy-fvg-orderblock',
    title: 'Fair Value Gap (FVG) + Order Block Sniper',
    tagline: 'Trade in harmony with institutional algorithmic order flow and liquidity rebalancing.',
    category: 'Smart Money',
    timeframe: '5m entry aligned with 1H / 4H bias',
    idealAssets: ['Forex Majors', 'Gold (XAU/USD)', 'Nasdaq (NQ)', 'Bitcoin'],
    winRateEst: '60% - 68%',
    riskReward: '1:3 to 1:5',
    indicatorsNeeded: ['None (Pure Price Action & Volume Imbalance)'],
    overview: 'Banks leave footprints when they enter the market with hundreds of millions of dollars. This strategy catches institutional rebalancing as price returns into an unmitigated Order Block paired with a Fair Value Gap before accelerating in the true trend direction.',
    setupConditions: [
      'Higher Timeframe (1H/4H): Establish clear market structure and identify the draw on liquidity (e.g., target equal highs).',
      'Lower Timeframe (5m/15m): Price creates a clear Market Structure Shift (MSS) with an energetic displacement candle.',
      'A distinct 3-candle Fair Value Gap (FVG) is left behind directly overlapping with the origin Order Block.'
    ],
    entryTriggers: [
      'Set a Limit order at the top of the Bullish FVG or at the 50% Consequent Encroachment (C.E.) of the gap.',
      'Alternatively, wait for price to touch the FVG and enter on a 1-minute shift of structure.'
    ],
    stopLossRule: 'Place Stop-Loss 2 ticks below the lowest wick of the bullish Order Block.',
    takeProfitRules: [
      'Target 1: Recent swing high where retail Buy-Side Liquidity (BSL) rests.',
      'Target 2: Opposing Higher-Timeframe unmitigated Fair Value Gap or major liquidity pool.'
    ],
    checklist: [
      'Did the displacement move break prior structure (MSS) with conviction?',
      'Is there a clean 3-candle imbalance (FVG) where wicks do not overlap?',
      'Is the trade aligned with the higher timeframe directional bias?',
      'Is the stop loss protected behind the Order Block invalidation level?'
    ],
    proTip: 'The strongest FVGs are created between 8:30 AM and 10:00 AM New York time (post-macro news release). Avoid FVGs formed during sleepy lunchtime chop.',
    asciiVisual: `
    Candle 1: Normal Bullish Candle
    Candle 2: [ MASSIVE DISPLACEMENT BODY ] ---> (Leaves FVG)
    Candle 3: High doesn't touch Candle 1 Low!
                 |--- [ FAIR VALUE GAP ] ---|
                     Retracement re-enters here ---> [ BUY LIMIT / ENTRY ]
                     Order Block Low --------------> [ STOP LOSS ]
    `
  },
  {
    id: 'strategy-rsi-divergence',
    title: 'RSI Divergence at Key S/R Reversal',
    tagline: 'Exploit momentum exhaustion at major historical extremes with tight invalidation.',
    category: 'Reversal',
    timeframe: '1H or 4H charts (Swing/Position)',
    idealAssets: ['Equities', 'Crypto', 'Commodities (Oil, Gold)'],
    winRateEst: '52% - 58%',
    riskReward: '1:3 to 1:4.5',
    indicatorsNeeded: ['RSI (14 period, standard 70/30 levels)', 'Horizontal Key Support/Resistance'],
    overview: 'Never fight a trend blindly. This strategy only catches tops and bottoms when an asset hits a multi-week historical level AND shows severe mathematical momentum divergence between price and the RSI indicator.',
    setupConditions: [
      'Price reaches a well-defined Daily/4H Major Support zone (for Long) or Major Resistance zone (for Short).',
      'Regular Bullish Divergence forms: Price creates a Lower Low, while RSI (14) creates a distinctly Higher Low in oversold territory (<35).',
      'Volume on the second price low is noticeably lower than on the first low (seller exhaustion).'
    ],
    entryTriggers: [
      'Wait for a bullish engulfing candle or a close back above the 20 EMA on the 1-hour chart.',
      'Enter on the open of the subsequent candle.'
    ],
    stopLossRule: 'Place Stop-Loss just below the lowest wick of the second divergence low (giving 0.5% buffer).',
    takeProfitRules: [
      'Target 1: The median line or 50 RSI level (trim 40%).',
      'Target 2: The next major opposing swing pivot / resistance zone.'
    ],
    checklist: [
      'Is divergence happening directly at a major historical key level?',
      'Has RSI printed at least 2 clearly defined troughs?',
      'Is the second drop showing declining volume?',
      'Is the stop loss tightly defined below the divergence wick?'
    ],
    proTip: 'Never trade RSI divergence on a 1-minute or 5-minute chart in a strong trending market. Divergences can stay extended for hours on low timeframes; use 1H/4H charts!',
    asciiVisual: `
    PRICE:  \\
             \\_ Swing Low 1
               \\              \\
                \\              \\_ Lower Low (Swing Low 2) ---> [ENTRY ON REVERSAL]
    ----------------------------------------------------------
    RSI:     \\
              \\_ Trough 1
                          /
                         /_ HIGHER LOW (Divergence!)
    `
  },
  {
    id: 'strategy-london-sweep',
    title: 'The London Session Liquidity Sweep',
    tagline: 'The premier intraday setup for Forex and Index day traders.',
    category: 'Scalping',
    timeframe: '5m / 15m intraday',
    idealAssets: ['GBP/USD', 'EUR/USD', 'GER40 / DAX', 'Gold'],
    winRateEst: '62% - 70%',
    riskReward: '1:2.5 to 1:4',
    indicatorsNeeded: ['Asian Session Range Indicator or High/Low Box (00:00 - 07:00 UTC)'],
    overview: 'During the Asian session, volatility is low, creating a tight consolidation range with retail stop-losses stacked just above the Asian High and below the Asian Low. At the London Open (07:00-08:00 UTC), institutions push price past one side of the Asian range to trigger stops, then engineer the real daily trend in the opposite direction.',
    setupConditions: [
      'Mark the High and Low of the Asian consolidation session.',
      'London open (or 30 mins prior) violently pokes 10-25 pips above the Asian High or below the Asian Low.',
      'Price fails to sustain above/below the Asian range and immediately prints a sharp rejection wick.'
    ],
    entryTriggers: [
      'On the 5-minute chart, wait for a candle to close back INSIDE the Asian range.',
      'Enter market in the direction of the reversal.'
    ],
    stopLossRule: 'Place Stop-Loss 2-3 pips beyond the extreme tip of the sweep wick.',
    takeProfitRules: [
      'Target 1: Asian Session Equilibrium (50% midpoint).',
      'Target 2: The opposite extreme of the Asian Range (e.g. Asian Low if you swept Asian High).'
    ],
    checklist: [
      'Did price sweep the Asian High/Low during the London Open window (07:00-09:00 UTC)?',
      'Did price close back inside the Asian range (false breakout confirmation)?',
      'Is the sweep wick clearly defined with high tick volume?',
      'Is your stop placed directly above/below the manipulation high/low?'
    ],
    proTip: 'If high-impact UK or Euro CPI/GDP news is scheduled at London open, wait until 15 minutes after the news release before hunting the sweep.',
    asciiVisual: `
    +----------------------------------+
    |       Asian Session Range        |  Asian High
    |   ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~    |
    |                                  |  Asian Low
    +----------------------------------+
                   ^
    London Open:   | [Violent Sweep Wick] --> Sweeps Buy Stops
                   v [Closes back inside] --> [ SHORT ENTRY ]
                   |
                   v [Draws toward Asian Low] --> [ TAKE PROFIT ]
    `
  },
  {
    id: 'strategy-trend-ema-vwap',
    title: '200 EMA + Anchored VWAP Momentum Ride',
    tagline: 'Rule-based trend-following system to capture explosive multi-day swings.',
    category: 'Momentum',
    timeframe: '1H & Daily charts',
    idealAssets: ['Tech Stocks (NVDA, TSLA, AAPL)', 'Crypto (SOL, BTC)', 'S&P 500 ETF (SPY)'],
    winRateEst: '50% - 55%',
    riskReward: '1:3 to 1:6 (Runners yield massive R)',
    indicatorsNeeded: ['200 EMA (Long-term baseline)', '20 EMA (Short-term momentum)', 'Daily VWAP'],
    overview: 'Ride institutional momentum by only buying pullbacks when price is trading in a verified super-trend. This mechanical system keeps you on the right side of the tape 100% of the time and prevents catching falling knives.',
    setupConditions: [
      'Price must be trading above both the 200 EMA and the 20 EMA on the Daily/1H chart.',
      'The 20 EMA is angled upward and positioned cleanly above the 200 EMA.',
      'Price makes a shallow pullback to touch the 20 EMA or the Anchored VWAP.'
    ],
    entryTriggers: [
      'Enter long on the first candle that closes back above the 20 EMA after testing the VWAP support band.',
      'Alternative trigger: Breakout of the counter-trend micro-trendline.'
    ],
    stopLossRule: 'Place Stop-Loss beneath the recent swing low or just under the dynamic 20 EMA line.',
    takeProfitRules: [
      'Trail your stop-loss behind each consecutive Higher Low on the 1H/4H chart.',
      'Lock in 50% at 1:2 R:R, and let the remaining 50% run until price closes beneath the 20 EMA.'
    ],
    checklist: [
      'Is price comfortably trading above the 200 EMA?',
      'Is the 20 EMA sloping upward at a 30-45 degree angle?',
      'Has price respected the VWAP or 20 EMA during the pullback?',
      'Are you willing to let trailing winners run instead of exiting early?'
    ],
    proTip: 'The big money in trading comes from sitting on your hands and letting winning trends compound. Use a trailing stop to let runners pay for all your small losses.',
    asciiVisual: `
    PRICE:        /\\       /\\        /\\
                 /  \\     /  \\_     /  \\
    20 EMA:     /----\\---/-----\\---/----\\----> [DYNAMIC SUPPORT RIDE]
               /      \\_/       \\_/
    200 EMA:  /================================> [MACRO TREND BASELINE]
    `
  }
];
