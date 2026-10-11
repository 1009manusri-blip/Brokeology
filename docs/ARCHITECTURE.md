# Brokeology System Architecture & Component Design

## 1. Architectural Philosophy & Overview

**Brokeology** is built as an interactive financial survival simulator and behavioral economics learning system. The application models personal finance as an interrelated "world" where every spending decision dynamically impacts survival runway, daily spending ceilings, and future risk profiles.

The system is structured as a client-side Single Page Application (SPA) leveraging **React 19**, **TypeScript**, and **Vite**, featuring a hybrid rendering pipeline:
1. **Application Shell & UI Layer**: High-performance functional React components styled with Tailwind CSS v4 and animated using Motion (`motion/react`).
2. **Deterministic Financial Engine**: Pure mathematical functions (`src/utils/finance.ts`) operating on an immutable ledger of transactions.
3. **Procedural 3D WebGL Canvas**: A reactive Three.js canvas (`ThreeMoneyverse.tsx`) rendering an isometric floating campus island with raycasting, landmark focus, and dynamic lighting tied to financial status.
4. **Procedural Web Audio Engine**: Zero-asset, synthesizer-based audio cues created directly via the browser's native `AudioContext`.

---

## 2. Component Hierarchy & Responsibilities

```
                                      ┌───────────────┐
                                      │   main.tsx    │
                                      └───────┬───────┘
                                              │
                                      ┌───────▼───────┐
                                      │ GameProvider  │ (GameContext.tsx)
                                      └───────┬───────┘
                                              │
                                      ┌───────▼───────┐
                                      │    App.tsx    │
                                      └───────┬───────┘
         ┌────────────────────────────────────┼────────────────────────────────────┐
         │                                    │                                    │
  ┌──────▼──────┐                      ┌──────▼──────┐                      ┌──────▼──────┐
  │ Header.tsx  │                      │ Active View │                      │ Modals / ARIA│
  └─────────────┘                      └──────┬──────┘                      └──────┬──────┘
                                              │                                    │
       ┌──────────────┬──────────────┬────────┴─────┬──────────────┬────────┐      ├─ UnexpectedEventModal.tsx
       │              │              │              │              │        │      └─ KeyboardShortcutsModal.tsx
┌──────▼──────┐┌──────▼──────┐┌──────▼──────┐┌──────▼──────┐┌──────▼─────┐┌─▼─────┐
│LandingHero  ││Dashboard    ││Shop.tsx     ││Expense      ││Financial   ││Final  │
│             ││             ││             ││Tracker.tsx  ││Insights.tsx││Result │
└─────────────┘└──────┬──────┘└─────────────┘└─────────────┘└────────────┘└───────┘
                      │
               ┌──────▼──────────────┐
               │ThreeMoneyverse.tsx  │ (WebGL Canvas)
               └─────────────────────┘
```

### Component Breakdown

| Component | Path | Primary Responsibilities |
| :--- | :--- | :--- |
| **`App.tsx`** | `src/App.tsx` | View switcher router (`currentScreen`), skip navigation link (`#main-content`), modal mounts (`UnexpectedEventModal`, `KeyboardShortcutsModal`), and screen reader live region (`aria-live="polite"`). |
| **`Header.tsx`** | `src/components/Header.tsx` | Global persistent header with glassmorphism styling, challenge day counter, remaining rupee pill (`AnimatedRupee`), sound toggle button, and navigation tabs. |
| **`Dashboard.tsx`** | `src/components/Dashboard.tsx` | Primary 3-column control center: Days timeline & status, embedded 3D Moneyverse diorama, and daily student tasks checklist. |
| **`LandingHero.tsx`** | `src/components/LandingHero.tsx` | Cinematic introduction featuring parallax effects, SVG student character artwork, core pillars, interactive feature previews, and launch trigger. |
| **`Shop.tsx`** | `src/components/Shop.tsx` | Student marketplace offering essential and lifestyle catalog items, cart management, and real-time consequence simulation. |
| **`ExpenseTracker.tsx`**| `src/components/ExpenseTracker.tsx`| Ledger interface allowing logging of custom expenses with strict validation, category filtering, and transaction removal. |
| **`FinancialInsights.tsx`**| `src/components/FinancialInsights.tsx`| Analytical dashboard rendering category SVG donut charts, 7-day spending histograms, burn rate analysis, and dynamic recommendations. |
| **`ThreeMoneyverse.tsx`**| `src/components/ThreeMoneyverse.tsx`| Custom Three.js WebGL diorama with procedural floating island, buildings, lighting, raycasting, camera tweening, and render loop lifecycle guards. |
| **`MobileView.tsx`** | `src/components/MobileView.tsx` | Realistic mobile device simulation container showcasing the app in an iPhone-style frame with bottom tab navigation. |
| **`FinalResult.tsx`** | `src/components/FinalResult.tsx` | End-game evaluation triggered on Day 30 completion, rendering performance tier, savings rate, and debrief certificate. |
| **`UnexpectedEventModal.tsx`** | `src/components/UnexpectedEventModal.tsx` | Modal presenting unforeseen student crises (e.g., broken phone screen) with branching financial trade-offs. |
| **`KeyboardShortcutsModal.tsx`** | `src/components/KeyboardShortcutsModal.tsx` | Accessible modal cheat sheet for keyboard-driven navigation (`?` key toggle). |
| **`AnimatedRupee.tsx`** | `src/components/AnimatedRupee.tsx` | Smooth numerical counter interpolating balance changes with Indian Rupee formatting. |

---

## 3. State Management & Data Flow

The application relies on a single, centralized context: **`GameContext`** (`src/context/GameContext.tsx`).

### State Structure (`GameState`)
```typescript
interface GameState {
  initialBudget: number;           // Fixed at ₹10,000 for standard challenge
  currentDay: number;              // Current day (1 through 30)
  totalDays: number;               // 30
  transactions: Transaction[];     // Append-only transaction ledger
  cart: ShopProduct[];             // Active marketplace cart
  tasksByDay: Record<number, DayTask[]>; // Dynamic checklist keyed by day index
  eventModalOpen: boolean;         // Visibility of crisis modal
  currentEvent: {                  // Currently active life event
    title: string;
    description: string;
    cost: number;
    resolved: boolean;
  } | null;
}
```

### Transaction Lifecycle Flow

```
User Action (Shop Purchase / Custom Expense / Crisis Event)
                           │
                           ▼
               Input & Balance Validation
         (validateExpenseInput / simulateConsequence)
                           │
                           ▼
          Context Dispatch (addTransaction)
                           │
      ┌────────────────────┴────────────────────┐
      ▼                                         ▼
1. Ledger Update                          2. Feedback Execution
   - Append to state.transactions            - Play audio cue (playCoinSound)
   - Update state.cart (clear)               - Screen reader announcement
   - Set localStorage backup                 - Recompute FinancialMetrics
      │                                         │
      └────────────────────┬────────────────────┘
                           ▼
               Reactive Component Updates
   - Header: Balance pill decrements with animation
   - Dashboard: Safe daily allowance adjusts
   - Shop: Consequence preview reflects updated capital
   - Insights: Donut chart & histogram redraw
```

---

## 4. Data Persistence Strategy

State persistence is handled cleanly via the browser's **`localStorage`**:

- **Storage Key**: `brokeology_game_state_v2`
- **Audio Preference Key**: `brokeology_sound_muted`
- **Validation on Hydration**:
  - State is loaded during initial mount inside `GameContext`.
  - Stored data is sanitized to ensure all numbers are valid, arrays are defined, and `initialBudget` defaults to `10000`.
  - In the event of schema corruption or parsing exceptions, the system logs a warning and gracefully initializes default state without crashing.
- **Save Trigger**: Synchronized whenever `transactions`, `currentDay`, `cart`, or `tasksByDay` updates.
- **Reset Capability**: The `resetGame()` action cleans stored state and restores the Day 1 baseline.

---

## 5. Error Handling & Input Validation Strategy

To prevent corrupt state, invalid negative balances, or unexpected crashes:

1. **Transaction Amount Validation**: `validateExpenseInput()` enforces:
   - Non-empty description string (maximum 80 characters).
   - Valid numeric amount strictly greater than ₹0 and within realistic upper limits (₹100,000).
   - Strict category enumeration (`Food`, `Travel`, `Lifestyle`, `Essentials`, `Other`).
2. **Defensive Math Computations**: All mathematical formulas in `finance.ts` wrap denominators in `Math.max(1, ...)` to eliminate division-by-zero risks on Day 30 or with zero transactions.
3. **Boundary Protection**: Day transitions are capped at `[1, 30]`. Budgets and daily allowances are clamped to a lower bound of `0`.

---

## 6. Rendering Optimization & Lifecycle Architecture

### Three.js WebGL Lifecycle Guard
The 3D canvas in `ThreeMoneyverse.tsx` includes strict memory and resource management:
- **`IntersectionObserver`**: Pauses the Three.js `requestAnimationFrame` loop whenever the canvas scrolls out of viewport.
- **`document.visibilitychange`**: Suspends rendering if the browser tab becomes hidden.
- **Explicit Disposal**: On component unmount, all geometry buffers (`geometry.dispose()`) and materials (`material.dispose()`) are flushed from GPU VRAM.

### Synthesized Web Audio
- Uses a singleton native `AudioContext` loaded on first user interaction.
- Pure oscillator nodes (`sine`, `triangle`, `sawtooth`) with exponential gain ramps (`gainNode.gain.exponentialRampToValueAtTime`) eliminate network asset loading and latency.
