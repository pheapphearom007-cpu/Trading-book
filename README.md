# 📈 The Trading Book — Modern Interactive Academy & Playbooks

A high-performance, mobile-first digital trading book and execution academy built with **React 18, TypeScript, Tailwind CSS, and Vite**.

Optimized specifically for **iPhone (iOS Safari / PWA)** and all responsive screens (mobile, tablet, desktop).

---

## 📱 iPhone & Mobile-First Features
- **iOS Viewport Optimization**: Built with `viewport-fit=cover` and dynamic viewport heights (`100dvh`).
- **Safe Area Insets**: Native spacing around the iPhone notch, Dynamic Island, and bottom home indicator swipe bar.
- **Native iOS Tab Navigation**: Docked bottom navigation bar for one-thumb navigation.
- **PWA Ready**: Web App Manifest and Apple Touch meta tags configured for full-screen "Add to Home Screen" usage.
- **Desktop Device Simulator**: Click **"iPhone View"** in the top navigation bar to test the exact iPhone 16 Pro layout directly on your desktop browser.

---

## 📚 Curriculum Structure (Beginner to Advanced)

### Module 1: Foundations of Financial Markets (Beginner)
1. **How Financial Markets Really Work** — Liquidity, Market Makers, spreads, and the zero-sum game reality.
2. **Candlestick Anatomy & Timeframe Hierarchy** — Decoding OHLC, wicks vs. bodies, and Russian nesting doll timeframes.
3. **Order Types Demystified** — Market, Limit, Stop-Loss, Stop-Limit, and Bracket Orders.
4. **Leverage, Margin & Liquidation** — The mathematical truth of leverage and surviving volatility.

### Module 2: Technical Analysis & Market Structure (Intermediate)
1. **Support, Resistance & Flip Zones** — Why levels are zones, and the S/R role reversal principle.
2. **Market Structure: Trends, BOS & Ranges** — Higher Highs, Higher Lows, and Break of Structure (BOS).
3. **High-Probability Candlestick Formations** — Bullish Engulfing, Hammers, Pinbars, and Morning Stars.
4. **Indicators Used Correctly** — RSI Divergences, 200 EMA baseline, and Anchored VWAP.

### Module 3: Smart Money Concepts & Institutional Flow (Advanced)
1. **Market Structure Shifts (MSS)** — Recognizing displacement vs. fakeout wicks.
2. **Liquidity Pools & Stop Hunt Sweeps** — Buy-Side (BSL) and Sell-Side (SSL) stop-loss manipulation.
3. **Order Blocks (OB) & Fair Value Gaps (FVG)** — Institutional imbalance trading and 50% Consequent Encroachment.
4. **Multi-Timeframe Top-Down Alignment** — Daily/4H bias mapped to 5m/1m precision triggers.

---

## 🎯 5 Core Actionable Trading Strategies
1. **Breakout & Retest Confirmation** (Trend Continuation) — 1:2.5 to 1:3.5 R:R
2. **Fair Value Gap (FVG) + Order Block Sniper** (Smart Money) — 1:3 to 1:5 R:R
3. **RSI Divergence at Key S/R Reversal** (Reversal) — 1:3 to 1:4.5 R:R
4. **The London Session Liquidity Sweep** (Scalping) — 1:2.5 to 1:4 R:R
5. **200 EMA + Anchored VWAP Momentum Ride** (Trend Following) — 1:3 to 1:6 R:R

Each playbook includes:
- Timeframe, asset classes, and estimated win rates.
- Step-by-step setup conditions.
- Exact entry triggers and stop-loss placement rules.
- Multi-tier take profit targets.
- Interactive pre-execution confluence checklist.
- ASCII/Visual architecture diagrams.

---

## 🛠️ Interactive Tools & Features
- **Position Size & Risk Calculator**: Live calculation of lot sizes, stop-loss distance, dollar risk, and 1:2 / 1:3 / 1:4 profit targets.
- **Pre-Flight Trading Safety Checklist**: 7-point pre-execution checklist with local storage memory.
- **Pattern Cheat Sheet Modal**: High-definition interactive SVG renderings of Candlestick and Chart Patterns.
- **Global Instant Search (`Cmd + K`)**: Search lessons, strategies, order blocks, and risk rules in real time.
- **Progress Tracking & Celebrations**: LocalStorage persistence with celebratory confetti upon completing chapters.
- **Reading Comfort**: Text size switcher (`A / A+`) and bookmark system.

---

## 🚀 Running the App Locally

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Build for production
npm run build
```

Open your browser at: `http://localhost:5173` or your local network IP to view it on your physical iPhone!
