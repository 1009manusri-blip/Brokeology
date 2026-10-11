# Brokeology Verification & Testing Protocol

## 1. Overview & Testing Philosophy

This document outlines the systematic verification and testing protocol for **Brokeology**. The application has been built and audited against strict functional, mathematical, responsive, and accessibility requirements.

Because Brokeology is an interactive single-page application with 3D WebGL rendering, Web Audio synthesis, and local persistence, testing combines **static analysis (TypeScript strict compilation)**, **deterministic mathematical verification**, and **manual end-to-end user journey validation**.

---

## 2. Automated Static Analysis & Build Verification

The project includes strict TypeScript type-checking and Vite production build pipelines:

### 1. Static Type Checking & Linting
```bash
npm run lint
```
- **Command**: `tsc --noEmit`
- **Verification Criterion**: 0 errors, 0 warnings.
- **Coverage**: Full interface adherence across `src/types/game.ts`, `src/utils/finance.ts`, `src/context/GameContext.tsx`, and all UI components.

### 2. Production Bundle Compilation
```bash
npm run build
```
- **Command**: `vite build`
- **Verification Criterion**: Successful generation of client assets into `/dist` without chunking warnings or unresolved modules.
- **Assets Generated**:
  - `dist/index.html`
  - `dist/assets/index-[hash].js`
  - `dist/assets/index-[hash].css`

---

## 3. End-to-End User Journey Test Scenarios

Evaluators can verify the complete user lifecycle through the following reproducible test matrices:

### Journey 1: Landing Page & Onboarding
| Step | Action | Expected Behavior | Pass Criteria |
| :---: | :--- | :--- | :--- |
| **1.1** | Load `http://localhost:3000` | Landing hero displays with title, subtitle, SVG illustration, and stats banner. | Zero console errors; audio context initialized on first interaction. |
| **1.2** | Click **"Begin 30-Day Survival"** button | Screen transitions smoothly to the primary Day Dashboard. | Header displays Day 3 / 30, remaining balance of ₹8,050, and safe daily spend. |
| **1.3** | Press <kbd>?</kbd> key | Keyboard Shortcuts Modal pops open with accessible dialog role. | Modal traps focus; displays shortcut list; closes on <kbd>Esc</kbd>. |

---

### Journey 2: Campus Marketplace & Cart Consequence Simulation
| Step | Action | Expected Behavior | Pass Criteria |
| :---: | :--- | :--- | :--- |
| **2.1** | Navigate to **Campus Shop** (Tab or Key <kbd>3</kbd>) | Marketplace grid displays 6 items across Food, Essentials, Travel, Lifestyle. | Each card shows title, category, description, and price in ₹. |
| **2.2** | Click **"Add to Cart"** on *Artisanal Cold Brew (₹250)* | Item appears in the Right Consequence Sidebar. | Sidebar updates: New Projected Balance = Current - 250; Daily Safe Spend drops; Risk Tier calculated. |
| **2.3** | Click **"Add to Cart"** on *Sneakers (₹2,500)* | Multi-item cart calculates total impact (₹2,750). | Risk Tier escalates to "Moderate" or "Severe" with color-coded warning. |
| **2.4** | Click **"Confirm & Purchase (₹2,750)"** | Transaction processed; cart clears; coin sound chimes. | Balance pill decrements in Header; Safe Daily Allowance recalculates; ARIA live region announces purchase. |

---

### Journey 3: Custom Expense Ledger (CRUD)
| Step | Action | Expected Behavior | Pass Criteria |
| :---: | :--- | :--- | :--- |
| **3.1** | Navigate to **Expense Tracker** (Tab or Key <kbd>5</kbd>) | Transaction ledger displays historical records with dates and categories. | Table or list renders cleanly. |
| **3.2** | Attempt to submit empty description | Form validation halts submission. | Error message: *"Expense description cannot be empty."* |
| **3.3** | Enter *"Library Late Fee"*, Amount: `120`, Category: `Essentials` | Transaction adds to ledger instantly. | Balance decreases by ₹120; audio chime plays. |
| **3.4** | Click **Delete (Trash icon)** on the newly created transaction | Transaction is purged from the ledger. | Balance restores by ₹120; safe daily allowance updates immediately. |

---

### Journey 4: Unexpected Crisis Simulation & Branching Choices
| Step | Action | Expected Behavior | Pass Criteria |
| :---: | :--- | :--- | :--- |
| **4.1** | Trigger event via Header button or Key <kbd>4</kbd> | `UnexpectedEventModal` opens with *"Emergency: Screen Shattered!"* | Backdrop blur active; focus trapped inside modal. |
| **4.2** | Inspect the 4 resolution options | Options present realistic student trade-offs: ₹1,500, ₹600, ₹150, ₹0. | Cost and consequence differences clearly highlighted. |
| **4.3** | Select *"Local Market Fix (₹600)"* and click **Resolve** | ₹600 deducted; modal closes; audio confirms resolution. | Balance updates; screen reader announces crisis resolution. |

---

### Journey 5: Financial Insights & Predictive Analytics
| Step | Action | Expected Behavior | Pass Criteria |
| :---: | :--- | :--- | :--- |
| **5.1** | Navigate to **Insights** (Tab or Key <kbd>6</kbd>) | Visual analytics screen loads. | SVG Donut chart accurately reflects category percentages. |
| **5.2** | Inspect **7-Day Spending Velocity** | Bar chart shows daily spend with today's marker. | Bar heights scale proportionally. |
| **5.3** | Inspect **Day 30 Forecast & Health Score** | Displays projected Day 30 balance and Survival Health Index (0-100). | Matches calculations from `src/utils/finance.ts`. |

---

### Journey 6: Day Progression & 30-Day Endgame Debrief
| Step | Action | Expected Behavior | Pass Criteria |
| :---: | :--- | :--- | :--- |
| **6.1** | Click **"Next Day"** button (or press <kbd>Space</kbd>) | Current day advances from Day 3 to Day 4. | Harmonic day transition chord plays; daily checklist shifts to Day 4 tasks; Safe Daily Allowance recalculates with fewer remaining days. |
| **6.2** | Advance continuously until Day 30 is completed | Screen transitions to `FinalResult.tsx`. | Victory fanfare sounds; displays Final Savings Rate, Performance Badge, and summary debrief. |
| **6.3** | Click **"Play Again"** | Challenge resets cleanly. | State reverts to Day 1, ₹10,000 initial balance, default starter transactions. |

---

### Journey 7: Local Storage Persistence
| Step | Action | Expected Behavior | Pass Criteria |
| :---: | :--- | :--- | :--- |
| **7.1** | Add a custom transaction and advance to Day 8 | Active state updated in React memory. | Stored in `localStorage.getItem('brokeology_game_state_v2')`. |
| **7.2** | Refresh the browser page (<kbd>F5</kbd> / <kbd>Cmd+R</kbd>) | App re-mounts from clean reload. | Day remains 8; transaction remains in ledger; balance matches pre-refresh state exactly. |

---

## 4. Accessibility & Responsiveness Audit Checklist

### Accessibility (WCAG 2.1 AA)
- [x] **Keyboard Navigation**: Entire application operable using <kbd>Tab</kbd>, <kbd>Enter</kbd>, <kbd>Space</kbd>, and assigned shortcuts (<kbd>1</kbd>-<kbd>7</kbd>, <kbd>?</kbd>, <kbd>M</kbd>, <kbd>Esc</kbd>).
- [x] **Focus Management**: Distinct high-contrast 2px focus rings (`focus-visible:ring-2 focus-visible:ring-pink-500`).
- [x] **Skip Navigation**: Accessible link at top of document (`#main-content`).
- [x] **ARIA Roles**: Modal dialogs use `role="dialog"`, `aria-modal="true"`, `aria-labelledby`.
- [x] **Screen Reader Alerts**: Dynamic financial balance changes use `aria-live="polite"`.
- [x] **Motion Preferences**: Respects `prefers-reduced-motion: reduce` by halting CSS animations.

### Responsiveness
- [x] **Mobile Viewports (375px - 640px)**: Header condenses; cards stack into single columns; dedicated smartphone simulator view available.
- [x] **Tablet Viewports (768px - 1024px)**: 2-column responsive layout with adjusted gutters.
- [x] **Desktop (1280px+)**: Full 3-column dashboard layout with embedded 3D WebGL viewport.
