export interface LessonSection {
  title: string;
  content: string;
  bulletPoints?: string[];
  keyFormula?: string;
  tip?: string;
  diagramType?: 'candlestick' | 'support_resistance' | 'order_block' | 'breakout' | 'risk_reward';
}

export interface Lesson {
  id: string;
  moduleId: string;
  moduleTitle: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  title: string;
  readTime: string;
  summary: string;
  keyTakeaways: string[];
  sections: LessonSection[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface Module {
  id: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  badgeColor: string;
  description: string;
  lessons: Lesson[];
}

export const CURRICULUM_MODULES: Module[] = [
  {
    id: 'module-1',
    title: 'The Foundations of Financial Markets',
    level: 'Beginner',
    badgeColor: 'text-trade-green bg-trade-green/10 border-trade-green/20',
    description: 'Master the core mechanics, candlestick charts, order types, and avoid costly beginner mistakes.',
    lessons: [
      {
        id: 'lesson-1-1',
        moduleId: 'module-1',
        moduleTitle: 'The Foundations of Financial Markets',
        level: 'Beginner',
        title: 'How Financial Markets Really Work',
        readTime: '6 min read',
        summary: 'Understand market participants, liquidity, and how prices move between buyers and sellers.',
        keyTakeaways: [
          'Prices move strictly due to imbalance between buying and selling pressure.',
          'Retail traders trade against market makers, banks, and algorithmic institutions.',
          'Trading is a game of probabilities and capital protection, not prediction.'
        ],
        sections: [
          {
            title: '1. The Four Major Asset Classes',
            content: 'Before placing any trade, you must understand the arena you are competing in:',
            bulletPoints: [
              'Forex (Foreign Exchange): The largest market ($7+ Trillion daily volume). Trades in currency pairs (e.g., EUR/USD, GBP/JPY). High liquidity, low spread costs.',
              'Equities (Stocks): Ownership shares in public corporations (e.g., Apple, NVDA). Moves on quarterly earnings, macro data, and sector momentum.',
              'Cryptocurrency: 24/7 decentralized digital assets (BTC, ETH). High volatility, asymmetric upside, but requires strict risk sizing.',
              'Commodities & Futures: Physical goods (Crude Oil, Gold, Silver). Great for hedging and trend following based on geopolitical supply and demand.'
            ]
          },
          {
            title: '2. The Bid-Ask Spread and Market Makers',
            content: 'Every market quote has two prices: the Bid (highest price someone is willing to buy) and the Ask (lowest price someone is willing to sell). The gap between them is the "Spread".',
            tip: 'Always trade liquid assets during peak session hours. An illiquid pair with a wide spread instantly puts you in a loss the second you execute!'
          },
          {
            title: '3. The Zero-Sum Game Reality',
            content: 'For every dollar won in trading, another market participant lost that dollar (minus broker commissions). To be consistently profitable, you must transition from thinking like a reactive gambler to operating like a systematic casino owner.'
          }
        ],
        quiz: {
          question: 'What fundamentally causes the market price of an asset to move up?',
          options: [
            'More buyers than sellers in total quantity',
            'Aggressive buyers lifting the available Ask liquidity faster than sellers supply it',
            'Technical indicators crossing above 50',
            'A broker setting the price arbitrarily'
          ],
          correctIndex: 1,
          explanation: 'Price moves upward when aggressive market buyers absorb all limit sell orders at the Ask and push orders higher into the order book.'
        }
      },
      {
        id: 'lesson-1-2',
        moduleId: 'module-1',
        moduleTitle: 'The Foundations of Financial Markets',
        level: 'Beginner',
        title: 'Candlestick Anatomy & Timeframe Hierarchy',
        readTime: '7 min read',
        summary: 'Decode the language of candlesticks: Open, High, Low, Close (OHLC), and how timeframes nest into one another.',
        keyTakeaways: [
          'A single candlestick encapsulates the battle between bulls and bears across a specified time period.',
          'Long wicks represent price rejection; full solid bodies represent conviction.',
          'Higher timeframes (Daily/4H) always overpower lower timeframes (5m/1m).'
        ],
        sections: [
          {
            title: '1. The 4 Key Data Points of a Candle',
            content: 'Every Japanese candlestick displays four crucial metrics (OHLC):',
            bulletPoints: [
              'Open (O): The initial price when the candle period started.',
              'High (H): The peak price level reached during the period (tip of upper wick).',
              'Low (L): The lowest price level reached during the period (tip of lower wick).',
              'Close (C): The final price when the candle timer expired.'
            ],
            tip: 'Bullish candle: Close > Open (Green/White). Bearish candle: Close < Open (Red/Black).'
          },
          {
            title: '2. Wicks vs. Bodies: Reading Market Psychology',
            content: 'The body shows where the market settled, indicating who maintained control into the close. The wicks (shadows) reveal failed attempts. A long lower wick means sellers tried pushing price down, but buyers aggressively bought the dip before the close.'
          },
          {
            title: '3. Timeframe Hierarchy (The Russian Nesting Dolls)',
            content: 'Never trade a 5-minute chart in isolation! A 5-minute trend is merely noise inside a 1-Hour pullback, which is itself part of a Daily uptrend.',
            bulletPoints: [
              'Daily / Weekly: Institutional bias and macro direction.',
              '4-Hour / 1-Hour: Intermediate structure and key key support/resistance zones.',
              '15-Minute / 5-Minute: Precision entry triggers and execution.'
            ]
          }
        ],
        quiz: {
          question: 'What does a candlestick with a very long lower wick and a small upper body typically indicate?',
          options: [
            'Sellers dominated the entire session',
            'Strong price rejection from lows and buyers stepping in aggressively',
            'The market has closed permanently',
            'High likelihood of immediate downward crash'
          ],
          correctIndex: 1,
          explanation: 'A long lower wick shows that sellers drove price lower, but buyers absorbed all selling pressure and drove the price back up before the close (a classic Hammer/Pinbar rejection).'
        }
      },
      {
        id: 'lesson-1-3',
        moduleId: 'module-1',
        moduleTitle: 'The Foundations of Financial Markets',
        level: 'Beginner',
        title: 'Order Types: Market, Limit & Stop Orders',
        readTime: '5 min read',
        summary: 'Learn when to execute immediately with market orders vs. waiting patiently with limit and stop orders.',
        keyTakeaways: [
          'Market orders guarantee execution speed but sacrifice price certainty (slippage risk).',
          'Limit orders guarantee your price or better, but are not guaranteed to be filled.',
          'A Stop-Loss order is your insurance policy; never enter a trade without one.'
        ],
        sections: [
          {
            title: '1. The Primary Order Types',
            content: 'Executing trades properly saves thousands in friction costs:',
            bulletPoints: [
              'Market Order: Buys or sells instantly at the best available current market price. Use when you need urgent entry, but beware of spread and slippage.',
              'Limit Order: Executes only at your specified target price or better. Buy Limit is placed below current price; Sell Limit is placed above.',
              'Stop-Loss Order (SL): Automatically closes your position if price reaches a predetermined loss threshold to protect your account.',
              'Take-Profit Order (TP): Automatically locks in profits when your target price objective is tagged.'
            ]
          },
          {
            title: '2. One-Cancels-the-Other (OCO) & Bracket Orders',
            content: 'Professional trading software allows you to submit a "Bracket Order". When your entry is triggered, both your Stop-Loss and Take-Profit are automatically activated. If one is hit, the other is automatically cancelled.'
          }
        ],
        quiz: {
          question: 'If current Bitcoin price is $65,000 and you want to buy only when it pulls back to $63,000, what order type should you use?',
          options: [
            'Market Order',
            'Buy Limit Order',
            'Sell Stop Order',
            'Trailing Stop Order'
          ],
          correctIndex: 1,
          explanation: 'A Buy Limit order is placed below current market price to buy at your exact desired price or lower.'
        }
      },
      {
        id: 'lesson-1-4',
        moduleId: 'module-1',
        moduleTitle: 'The Foundations of Financial Markets',
        level: 'Beginner',
        title: 'Leverage, Margin & Liquidation Explained',
        readTime: '6 min read',
        summary: 'The double-edged sword of trading: how leverage multiplies gains, accelerates losses, and causes account blowups.',
        keyTakeaways: [
          'Leverage is borrowed capital from your broker to increase purchasing power.',
          '10x leverage means a 10% move against you results in a 100% loss of your margin (liquidation).',
          'Position sizing matters far more than the nominal leverage number.'
        ],
        sections: [
          {
            title: '1. How Leverage Works in Practice',
            content: 'If you have $1,000 and use 10:1 leverage, you control $10,000 worth of asset value. If the asset gains 5%, you make $500 (a 50% return on your $1,000 equity). However, if the asset drops 10%, your entire $1,000 is wiped out.',
            keyFormula: 'Liquidation % Distance ≈ 100 / Leverage Level'
          },
          {
            title: '2. The Danger of Over-Leveraging',
            content: '90% of retail traders blow their accounts within 90 days not because their technical analysis was wrong, but because they used excessive leverage. With high leverage, normal market breathing space and minor pullbacks trigger margin calls.',
            tip: 'Keep real account risk capped at 1% to 2% per trade regardless of what leverage multiplier your broker provides.'
          }
        ],
        quiz: {
          question: 'With 20x leverage on a position without a stop-loss, what percentage drop in the underlying asset leads to total liquidation?',
          options: ['20%', '10%', '5%', '50%'],
          correctIndex: 2,
          explanation: '100 divided by 20 = 5%. A mere 5% adverse move wipes out 100% of your collateral at 20x leverage.'
        }
      }
    ]
  },
  {
    id: 'module-2',
    title: 'Technical Analysis & Market Structure',
    level: 'Intermediate',
    badgeColor: 'text-trade-cyan bg-trade-cyan/10 border-trade-cyan/20',
    description: 'Learn how to map market trends, identify high-probability zones, chart patterns, and key indicator confluences.',
    lessons: [
      {
        id: 'lesson-2-1',
        moduleId: 'module-2',
        moduleTitle: 'Technical Analysis & Market Structure',
        level: 'Intermediate',
        title: 'Support, Resistance & Flip Zones',
        readTime: '7 min read',
        summary: 'Stop drawing random lines. Learn how institutions look at structural supply, demand, and flip zones.',
        keyTakeaways: [
          'Support and resistance are price zones (areas of interest), never single pixel-thin lines.',
          'When broken with high volume, old resistance converts into new support (and vice versa).',
          'The more times a level is tapped, the WEAKER it becomes as orders are absorbed.'
        ],
        sections: [
          {
            title: '1. What Are Support and Resistance Really?',
            content: 'Support is a price floor where buying demand exceeds selling supply. Resistance is a ceiling where supply outstrips demand. Instead of single lines, always draw rectangles representing value zones where price previously paused or reversed violently.'
          },
          {
            title: '2. The Role Reversal Principle (S/R Flip)',
            content: 'When price cleanly breaks through a major resistance level, that level flips into future support on the subsequent retest. Institutional breakout buyers defend this level, and short sellers cover their underwater positions.',
            tip: 'The highest probability trade is not buying the initial breakout, but buying the calm retest of the flipped support level!'
          },
          {
            title: '3. The "Tapped Out" Level Myth',
            content: 'Old retail books tell you that the more times a level is touched, the stronger it is. Modern institutional reality: each touch consumes limit orders sitting at that level. By the 4th or 5th touch, the level is thin on liquidity and primed for a violent breakout.'
          }
        ],
        quiz: {
          question: 'What usually happens when a key resistance level is broken with strong bullish volume?',
          options: [
            'It becomes invalid forever',
            'It acts as future support upon a retest',
            'It immediately reverses back down 100% of the time',
            'The market stops trading'
          ],
          correctIndex: 1,
          explanation: 'This is the S/R Flip principle: previous resistance becomes new support because former sellers look to break-even and breakout buyers defend the level.'
        }
      },
      {
        id: 'lesson-2-2',
        moduleId: 'module-2',
        moduleTitle: 'Technical Analysis & Market Structure',
        level: 'Intermediate',
        title: 'Market Structure: Trends, BOS & Ranges',
        readTime: '8 min read',
        summary: 'Map any chart in seconds: Higher Highs/Lows, Break of Structure (BOS), and consolidation phases.',
        keyTakeaways: [
          'Uptrend = Higher Highs (HH) + Higher Lows (HL).',
          'Downtrend = Lower Highs (LH) + Lower Lows (LL).',
          'A trend remains intact until the most recent structural low/high is breached with candle body closes.'
        ],
        sections: [
          {
            title: '1. Defining True Market Structure',
            content: 'Market structure is the cleanest representation of supply and demand without any lagging indicators. An uptrend creates higher swing points because buyers are willing to bid higher prices, while sellers refuse to sell cheap.',
            bulletPoints: [
              'Bullish Trend: Price prints HH then pulls back to create a HL above the previous swing low.',
              'Bearish Trend: Price prints LL then bounces to create a LH below the previous swing high.',
              'Consolidation / Range: Price oscillates between an established High and Low without clear direction.'
            ]
          },
          {
            title: '2. Break of Structure (BOS)',
            content: 'A Break of Structure occurs when price aggressively breaks through the previous structural swing point and closes beyond it on the current timeframe. This signals continuation of the existing trend.'
          }
        ],
        quiz: {
          question: 'In a healthy uptrend, what should you look for to establish a high-probability long entry?',
          options: [
            'Shorting at the exact higher high',
            'Buying on the pullback as price forms a Higher Low near key support',
            'Exiting all trades permanently',
            'Waiting for a lower low to print'
          ],
          correctIndex: 1,
          explanation: 'In an uptrend, high probability trade entries occur when price pulls back to print a Higher Low at key confluence zones, offering great risk-to-reward.'
        }
      },
      {
        id: 'lesson-2-3',
        moduleId: 'module-2',
        moduleTitle: 'Technical Analysis & Market Structure',
        level: 'Intermediate',
        title: 'High-Probability Candlestick Patterns',
        readTime: '7 min read',
        summary: 'Filter the noise: Master the 3 most reliable candlestick patterns and ignore the 50 useless ones.',
        keyTakeaways: [
          'Patterns mean nothing in isolation; context and location (support/resistance) are everything.',
          'Bullish/Bearish Engulfing indicates complete momentum takeover.',
          'Pin Bars / Hammers reveal aggressive liquidity rejection at key price levels.'
        ],
        sections: [
          {
            title: '1. The Bullish & Bearish Engulfing',
            content: 'A two-candle reversal formation. In a Bullish Engulfing, the body of the green candle completely engulfs the body of the preceding red candle. It signifies that buyers completely overwhelmed sellers within one single session.',
            tip: 'Only trade engulfing candles when they appear at key structural levels (Support/Demand), never in the middle of a choppy range!'
          },
          {
            title: '2. The Pin Bar / Hammer (Rejection Candle)',
            content: 'Features a very long tail (at least 2/3 the length of the entire candle) and a small real body near the opposite extreme. It demonstrates that the market probed into lower prices, encountered massive institutional bids, and was rejected violently upward.'
          },
          {
            title: '3. The Morning Star & Evening Star (3-Candle Reversal)',
            content: 'Consists of: (1) Strong directional candle, (2) Indecision doji/small candle, and (3) Strong reversal candle closing past the midpoint of the first candle. Indicates exhaustion of old momentum and inception of a new move.'
          }
        ],
        quiz: {
          question: 'Where is a Bullish Engulfing pattern most reliable?',
          options: [
            'In the middle of a consolidating sideways range',
            'At a major higher-timeframe support or demand zone after a pullback',
            'At the very top of an extended 10-day vertical rally',
            'On a 10-second chart'
          ],
          correctIndex: 1,
          explanation: 'Candlestick patterns derive their edge strictly from context. An engulfing candle at key support represents institutional buyers stepping in.'
        }
      },
      {
        id: 'lesson-2-4',
        moduleId: 'module-2',
        moduleTitle: 'Technical Analysis & Market Structure',
        level: 'Intermediate',
        title: 'Mastering Indicators (RSI, VWAP & Moving Averages)',
        readTime: '6 min read',
        summary: 'Stop cluttering your screen with 10 indicators. Use indicators only for objective divergence and trend filters.',
        keyTakeaways: [
          'Indicators are mathematical derivatives of price; they lag price action.',
          'RSI Divergences reveal hidden momentum exhaustion before price turns.',
          'VWAP (Volume Weighted Average Price) is the true institutional benchmark for intraday value.'
        ],
        sections: [
          {
            title: '1. RSI (Relative Strength Index) Divergence',
            content: 'RSI measures velocity and magnitude of price changes. When price prints a Higher High, but RSI prints a Lower High (Bearish Divergence), it signals that buying momentum is drying up and a reversal is imminent. Conversely, price Lower Low + RSI Higher Low = Bullish Divergence.'
          },
          {
            title: '2. The 200 EMA (Exponential Moving Average)',
            content: 'The 200 EMA on the Daily and 4H charts is respected by algorithmic funds worldwide. Trading with the side of the 200 EMA (long above it, short below it) instantly keeps you aligned with the macro trend.'
          },
          {
            title: '3. Anchored VWAP (Volume-Weighted Average Price)',
            content: 'Unlike simple moving averages, VWAP factors in trading volume. Institutions are judged by whether they buy below VWAP (discount) or sell above VWAP (premium).'
          }
        ],
        quiz: {
          question: 'What is a Bearish RSI Divergence?',
          options: [
            'Price makes a Higher High while RSI makes a Lower High',
            'Price and RSI both drop to zero',
            'RSI crosses above 80',
            'Price makes a Lower Low while RSI makes a Lower Low'
          ],
          correctIndex: 0,
          explanation: 'Bearish divergence occurs when price pushes to a higher peak, but the momentum oscillator fails to confirm it, signaling underlying exhaustion.'
        }
      }
    ]
  },
  {
    id: 'module-3',
    title: 'Smart Money Concepts & Institutional Flow',
    level: 'Advanced',
    badgeColor: 'text-trade-purple bg-trade-purple/10 border-trade-purple/20',
    description: 'Trade like the banks. Master liquidity sweeps, order blocks, fair value gaps, and market manipulation.',
    lessons: [
      {
        id: 'lesson-3-1',
        moduleId: 'module-3',
        moduleTitle: 'Smart Money Concepts & Institutional Flow',
        level: 'Advanced',
        title: 'Market Structure Shifts (MSS) vs. Retracements',
        readTime: '8 min read',
        summary: 'How to distinguish between an ordinary pullback and a real institutional trend reversal.',
        keyTakeaways: [
          'A Market Structure Shift (MSS) occurs when the key swing high/low that caused the latest extreme is violated with displacement.',
          'Displacement is characterized by large, energetic candles with minimal wicks (institutional footprint).',
          'MSS confirms the change of character (CHoCH) in market intent.'
        ],
        sections: [
          {
            title: '1. The Anatomy of an MSS',
            content: 'In a downtrend, price creates lower highs and lower lows. The swing high that created the lowest low is the protected structural pivot. When price violates this pivot with an energetic candle close, the bearish structure is officially invalidated, shifting market intent to bullish.'
          },
          {
            title: '2. What is Displacement?',
            content: 'A true shift requires "Displacement" — large bodied candles indicating institutional capital deployment, often creating Fair Value Gaps (imbalances). A weak wick poking above a level without a solid body close is usually just a liquidity sweep, NOT a structure shift.'
          }
        ],
        quiz: {
          question: 'What differentiates a genuine Market Structure Shift from a fakeout wick?',
          options: [
            'A random tweet on social media',
            'Aggressive displacement candles closing with strong body through the key structural pivot',
            'The market staying open late',
            'Using higher leverage'
          ],
          correctIndex: 1,
          explanation: 'True institutional participation creates displacement: long full-bodied candles closing decisively through the key pivot level.'
        }
      },
      {
        id: 'lesson-3-2',
        moduleId: 'module-3',
        moduleTitle: 'Smart Money Concepts & Institutional Flow',
        level: 'Advanced',
        title: 'Liquidity Pools & Stop Hunt Sweeps',
        readTime: '9 min read',
        summary: 'Understand where retail stops sit: Buy-Side Liquidity (BSL) and Sell-Side Liquidity (SSL).',
        keyTakeaways: [
          'Banks cannot execute multi-million dollar orders without adequate counterparty liquidity.',
          'Equal Highs (EQH) and Equal Lows (EQL) are retail stop-loss magnets.',
          'Institutional traders engineer fakeouts to trigger retail stops, filling their own large orders.'
        ],
        sections: [
          {
            title: '1. Why Liquidity is Oxygen for Institutions',
            content: 'If a hedge fund wants to buy $200M worth of an asset, they cannot simply click "Market Buy" without shooting the price up 5% against themselves. To buy at favorable prices, they need counterparties selling to them. Where are people forced to sell? Underneath obvious support levels where retail stop-losses sit!'
          },
          {
            title: '2. Buy-Side (BSL) vs. Sell-Side (SSL) Liquidity',
            content: 'Retail traders place buy stops above double tops and swing highs (BSL), and sell stops below double bottoms and swing lows (SSL). The "Stop Run" occurs when price briefly pierces these levels, absorbs all resting stops, and immediately reverses in the intended direction.'
          },
          {
            title: '3. How to Profit from the Sweep (The Turtle Soup Model)',
            content: 'Wait for price to sweep an obvious Equal High or Equal Low. Do not trade the initial breakout! Wait for price to snap back inside the range with a Market Structure Shift on the 5-minute chart, then enter in the reversal direction with tight stops.'
          }
        ],
        quiz: {
          question: 'Where is Sell-Side Liquidity (SSL) primarily located on a chart?',
          options: [
            'Above all-time highs',
            'Directly below obvious swing lows, double bottoms, and support levels',
            'Inside moving average ribbons',
            'At the current market price'
          ],
          correctIndex: 1,
          explanation: 'Sell-Side Liquidity consists of resting sell stop orders (stop-losses of long traders and breakout sell orders) located just below obvious swing lows.'
        }
      },
      {
        id: 'lesson-3-3',
        moduleId: 'module-3',
        moduleTitle: 'Smart Money Concepts & Institutional Flow',
        level: 'Advanced',
        title: 'Order Blocks (OB) & Fair Value Gaps (FVG)',
        readTime: '8 min read',
        summary: 'Identify the exact footprints left by institutional algorithmic rebalancing.',
        keyTakeaways: [
          'An Order Block is the last opposite candle before a violent displacement move.',
          'A Fair Value Gap (FVG) is a 3-candle imbalance where buyers or sellers completely overran the market.',
          'The 50% midpoint of an FVG (Consequent Encroachment) is a prime institutional entry zone.'
        ],
        sections: [
          {
            title: '1. Identifying a Valid Bullish Order Block',
            content: 'A Bullish Order Block is the lowest down-close candle prior to an aggressive upward move that breaks market structure. Institutions bought heavily during that down candle, leaving unfulfilled limit orders when price departed rapidly. When price returns to this zone, institutions defend it.'
          },
          {
            title: '2. The 3-Candle Anatomy of a Fair Value Gap (FVG)',
            content: 'Look at three consecutive candles: Candle 1, Candle 2 (large impulsive candle), and Candle 3. If there is a void/gap between Candle 1’s high and Candle 3’s low, that gap is an FVG. Price acts like a vacuum and frequently retraces into this gap to rebalance liquidity before continuing the trend.'
          }
        ],
        quiz: {
          question: 'What is Consequent Encroachment (C.E.) in Smart Money Concepts?',
          options: [
            'The 50% midpoint of a Fair Value Gap or Wick',
            'Closing a trading account',
            'The highest price of the day',
            'A broker commission fee'
          ],
          correctIndex: 0,
          explanation: 'Consequent Encroachment refers to the precise 50% equilibrium level of an imbalance (FVG) or long wick, often serving as a magnet for institutional fills.'
        }
      },
      {
        id: 'lesson-3-4',
        moduleId: 'module-3',
        moduleTitle: 'Smart Money Concepts & Institutional Flow',
        level: 'Advanced',
        title: 'Multi-Timeframe Top-Down Alignment',
        readTime: '7 min read',
        summary: 'Synchronize Daily macro trends with 15m/5m execution for optimal risk-to-reward ratios.',
        keyTakeaways: [
          'Never trade a lower timeframe in contradiction to higher timeframe liquidity draw.',
          'Higher timeframes determine the "WHERE" and "WHY"; lower timeframes provide the "WHEN".',
          'A 1:4+ Risk-to-Reward ratio is achievable by entering on 5m charts inside 4H zones of interest.'
        ],
        sections: [
          {
            title: '1. The 3-Tier Timeframe System',
            content: 'Professional traders organize their charts into three synchronized tiers:',
            bulletPoints: [
              'Tier 1 (Daily / 4H) - The Roadmap: Identify overall trend, major liquidity pools, and higher timeframe Order Blocks.',
              'Tier 2 (1H / 15m) - The Structure: Identify local Market Structure Shifts and intermediate swing points.',
              'Tier 3 (5m / 1m) - The Sniper Trigger: Execute entries when price sweeps local liquidity inside your higher timeframe zone with an immediate displacement candle.'
            ]
          }
        ],
        quiz: {
          question: 'What is the primary role of the Daily/4-Hour timeframe in a top-down trading strategy?',
          options: [
            'To place rapid 1-minute scalping orders',
            'To establish overall market bias, major liquidity pools, and key institutional zones',
            'To calculate exact spread fees',
            'To test new indicators'
          ],
          correctIndex: 1,
          explanation: 'The higher timeframes provide the high-level roadmap and structural bias. Lower timeframes are strictly used for timing entries.'
        }
      }
    ]
  }
];
