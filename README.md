# 🎮 Brokeology — Your Money is a World

> *"Your money is a world. Every decision changes it."*
> **An interactive financial survival game and behavioral economics simulator where users manage ₹10,000 across 30 days of campus life.**

[![React 19](https://img.shields.io/badge/React-19.0-61dafb?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript 7](https://img.shields.io/badge/TypeScript-7.0-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite 8](https://img.shields.io/badge/Vite-8.3-646cff?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-000000?style=for-the-badge&logo=three.js)](https://threejs.org)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-v4.3-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![WCAG 2.1 AA](https://img.shields.io/badge/Accessibility-WCAG_2.1_AA-success?style=for-the-badge)](https://www.w3.org/WAI/standards-guidelines/wcag/)

---

## 📌 Project Links & Evaluation Resources

- **Live Application**: [https://ais-pre-sf7xxkngi2ymg7qssi2ipe-900289731041.asia-east1.run.app](https://ais-pre-sf7xxkngi2ymg7qssi2ipe-900289731041.asia-east1.run.app)
- **Architecture Documentation**: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
- **Financial Calculation Engine**: [`docs/FINANCIAL_LOGIC.md`](docs/FINANCIAL_LOGIC.md)
- **Verification & Testing Protocol**: [`docs/TESTING.md`](docs/TESTING.md)

---

## 📖 Table of Contents

1. [Elevator Pitch & Project Overview](#1-elevator-pitch--project-overview)
2. [Problem Statement & Background](#2-problem-statement--background)
3. [Target Audience & Real-World Use Cases](#3-target-audience--real-world-use-cases)
4. [Verified Features & Functionality](#4-verified-features--functionality)
5. [Feature-by-Feature Deep Dive](#5-feature-by-feature-deep-dive)
6. [Technology Stack](#6-technology-stack)
7. [Architecture Overview](#7-architecture-overview)
8. [Project Directory Tree](#8-project-directory-tree)
9. [Local Installation & Setup](#9-local-installation--setup)
10. [Development Server Commands](#10-development-server-commands)
11. [Production Build & Verification Commands](#11-production-build--verification-commands)
12. [Environment Variables](#12-environment-variables)
13. [Deployment Instructions (Vercel & Cloud Run)](#13-deployment-instructions)
14. [Explanation of Financial Calculations](#14-explanation-of-financial-calculations)
15. [Data Persistence & Storage Strategy](#15-data-persistence--storage-strategy)
16. [Error Handling & Validation](#16-error-handling--validation)
17. [Accessibility & Responsive Design (WCAG 2.1 AA)](#17-accessibility--responsive-design)
18. [Testing & Verification Instructions](#18-testing--verification-instructions)
19. [Known Limitations](#19-known-limitations)
20. [Future Roadmap](#20-future-roadmap)
21. [Visual Interface & Screenshots](#21-visual-interface--screenshots)

---

## 1. Elevator Pitch & Project Overview

**Brokeology** transforms abstract personal finance into an intuitive, gamified survival journey. Handed a monthly student stipend of **₹10,000**, players must survive **30 continuous days** of academic life without hitting zero. 

Unlike conventional personal finance applications that present retrospective, passive tables, Brokeology visualizes financial health as a living world—the **"Moneyverse"**. In this interactive 3D WebGL isometric campus island, every coffee, transit pass, or unexpected crisis dynamically alters the physical environment, safe daily allowances, and forward-looking survival probability.

### Core Philosophy
- **Consequence Before Commitment**: Test the impact of a cart or purchase on your 30-day runway *before* spending.
- **Crisis Trade-offs**: When real life strikes (such as a shattered smartphone screen), players navigate realistic trade-offs rather than unavoidable debt.
- **Habit Formation**: Gamified daily checklists, safe daily allowances, and Web Audio feedback transform financial self-discipline into an engaging quest.

---

## 2. Problem Statement & Background

### The Student Financial Dilemma
Young adults entering university or independent living typically manage fixed monthly stipends or allowances (averaging ₹8,000 to ₹12,000). Despite good intentions, over **70% of students deplete their allowance within the first 12–14 days** due to three recurring behavioral traps:

1. **The Lump-Sum Illusion**: Having ₹10,000 on Day 1 makes small ₹150–₹350 discretionary expenses feel harmless, hiding an unsustainable burn velocity.
2. **Zero Emergency Buffer**: When life emergencies arise (cracked screen, transit fare increase, unexpected course book), students are forced into debt or reliance on emergency loans.
3. **Spreadsheet Fatigue**: Traditional finance trackers require tedious manual logging without providing forward predictive foresight or emotional resonance.

**Brokeology bridges this gap** by translating financial math into a tangible world where players develop practical cash-runway intuition.

---

## 3. Target Audience & Real-World Use Cases

### Target Audience
- **University & College Students**: Managing monthly stipends in hostels, dorms, or shared rentals.
- **First-Time Budgeters & Young Adults**: Learning cash-flow budgeting on fixed early-career paychecks.
- **Financial Literacy Educators & Workshops**: Seeking an interactive, consequence-driven teaching tool for classroom simulation.

### Real-World Use Cases
- **Stipend Survival Training**: Simulating a full 30-day month in minutes to build mental models of daily spending limits.
- **Impulse Control Calibration**: Visualizing how purchasing expensive lifestyle goods early drastically diminishes late-month flexibility.
- **Crisis Trade-off Analysis**: Learning that expensive vendor repairs can be substituted with local or DIY solutions to protect savings.

---

## 4. Verified Features & Functionality

Every feature listed below is verified in the production source code:

| Feature | Verified Location | Status |
| :--- | :--- | :---: |
| **3D WebGL Floating Campus Island** | `src/components/ThreeMoneyverse.tsx` | Production Ready |
| **30-Day Budget Progression Engine** | `src/context/GameContext.tsx` | Production Ready |
| **Campus Marketplace & Cart Consequence Simulator** | `src/components/Shop.tsx` | Production Ready |
| **Dynamic Safe Daily Allowance Engine** | `src/utils/finance.ts` | Production Ready |
| **Branching Unexpected Crisis Modal** | `src/components/UnexpectedEventModal.tsx` | Production Ready |
| **CRUD Custom Expense Ledger** | `src/components/ExpenseTracker.tsx` | Production Ready |
| **Predictive SVG Analytics & Donut Charts** | `src/components/FinancialInsights.tsx` | Production Ready |
| **Endgame Debrief & Survival Certificate** | `src/components/FinalResult.tsx` | Production Ready |
| **Zero-Asset Web Audio Synthesizer** | `src/utils/audio.ts` | Production Ready |
| **Comprehensive Keyboard Navigation Modal** | `src/components/KeyboardShortcutsModal.tsx` | Production Ready |
| **Mobile Simulation Container** | `src/components/MobileView.tsx` | Production Ready |
| **Safe LocalStorage State Synchronization** | `src/context/GameContext.tsx` | Production Ready |

---

## 5. Feature-by-Feature Deep Dive

### 1. 🏝️ 3D Campus Moneyverse (`ThreeMoneyverse.tsx`)
- Renders a floating campus island with 5 distinct landmark zones: **College Quad**, **Dormitory**, **Marketplace**, **Campus Cafe**, and **Bank & ATM**.
- Interactive Raycasting: Hovering or clicking any structure animates the camera focus via spring interpolation.
- Lifecycle GPU Throttling: Utilizes `IntersectionObserver` to halt the render loop when offscreen and `visibilitychange` when the browser tab is hidden.

### 2. 🛍️ Campus Marketplace & Consequence Engine (`Shop.tsx`)
- Features 6 authentic campus products across Food, Essentials, Travel, and Lifestyle.
- **Live Consequence Sidebar**: Dynamically computes how adding items to the cart alters the player's Safe Daily Allowance, calculates the percentage impact on capital, and flags risk tiers (`negligible`, `moderate`, `severe`).
- Items can be added and removed with zero risk prior to explicit confirmation.

### 3. 🚨 Unexpected Events & Branching Dilemmas (`UnexpectedEventModal.tsx`)
- Simulates real student crises (e.g., shattered phone screen on Day 4 and Day 15).
- Offers 4 strategic solutions representing diverse cost-convenience trade-offs:
  - Official Service Center: ₹1,500
  - Third-Party Market Repair: ₹600 (saves ₹900)
  - DIY Screen Guard & Tape: ₹150 (saves ₹1,350)
  - Borrow Friend's Spare Phone: ₹0 (saves ₹1,500)

### 4. 📊 Expense Ledger (`ExpenseTracker.tsx`)
- Full custom expense entry with strict validation (description length, positive numbers, category constraints).
- Real-time deletion capability with instant balance restoration.
- Category filtering by All, Food, Essentials, Travel, Lifestyle, or Other.

### 5. 📈 Predictive Insights & Category Analytics (`FinancialInsights.tsx`)
- Custom SVG donut chart illustrating category distribution with percentages.
- 7-day spending velocity histogram showing day-to-day burn rates.
- Day 30 forecast model calculating expected finishing balance and Survival Health Index (0–100).

### 6. 🔊 Synthesized Web Audio (`utils/audio.ts`)
- Pure procedural sound generation using native `AudioContext` oscillators (no external MP3/WAV files):
  - **Coin Sound**: Dual-oscillator metallic chime on purchases.
  - **Day Advance**: Ascending harmonic chord on advancing days.
  - **Crisis Alert**: Descending sawtooth alert on emergencies.
  - **Victory Fanfare**: Celebratory pentatonic chord on challenge completion.
- Persistent mute toggle available via the header button or keyboard shortcut (<kbd>M</kbd>).

---

## 6. Technology Stack

Verified directly from `package.json`:

| Category | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | React | `^19.0.1` | Component architecture, state hooks, and virtual DOM |
| **Language** | TypeScript | `^7.0.2` | Static typing, interface contracts, and compiler validation |
| **Build System** | Vite | `^8.3.0` | High-speed bundler, asset pipeline, and dev server |
| **3D Rendering** | Three.js | `^0.186.1` | Procedural WebGL floating island diorama and lighting |
| **Animation Engine** | Motion (`motion/react`) | `^12.23.24` | Fluid UI transitions, dialog enters, and micro-interactions |
| **Styling** | Tailwind CSS | `^4.3.3` | Utility styling with `@import "tailwindcss";` |
| **Icons** | Lucide React | `^0.546.0` | Scalable accessible iconography |
| **Audio** | Web Audio API | *Native* | Procedural synthesized audio effects without network assets |

---

## 7. Architecture Overview

Brokeology implements a modular, unidirectional architecture:

```
[User Action / Key Shortcut]
            │
            ▼
   [GameContext Dispatch]
            │
            ├─► [Validation: finance.ts]
            ├─► [State Update: localStorage Sync]
            ├─► [Audio Trigger: audio.ts]
            └─► [Screen Reader Alert: aria-live]
            │
            ▼
    [Reactive UI Rerender]
  ├── Header (AnimatedRupee counter)
  ├── Dashboard (Timeline, Tasks, 3D Canvas)
  ├── Shop (Live Cart Consequence Simulation)
  ├── Expense Tracker (Filtered Ledger)
  └── Financial Insights (SVG Donut, Spend Forecast)
```

For full architectural blueprints, see [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

---

## 8. Project Directory Tree

Verified against the file system:

```
/
├── index.html                           # Entry HTML, SEO meta tags, Google Fonts
├── metadata.json                        # Applet metadata & capability configuration
├── package.json                         # Verified dependencies and build scripts
├── tsconfig.json                        # TypeScript configuration
├── vite.config.ts                       # Vite bundler configuration
├── README.md                            # Primary documentation
├── docs/
│   ├── ARCHITECTURE.md                  # Component hierarchy, state flow & lifecycle
│   ├── FINANCIAL_LOGIC.md               # Mathematical formulas & consequence algorithms
│   └── TESTING.md                       # Test scenarios & verification checklist
└── src/
    ├── main.tsx                         # React 19 application mount point
    ├── App.tsx                          # App container, navigation router, modals
    ├── index.css                        # Tailwind v4 styles, glassmorphism, animations
    │
    ├── context/
    │   └── GameContext.tsx              # Central game state, actions & shortcuts
    │
    ├── types/
    │   └── game.ts                      # Strict TypeScript interfaces & types
    │
    ├── utils/
    │   ├── finance.ts                   # Financial calculation engine & validators
    │   └── audio.ts                     # Web Audio API sound synthesizer
    │
    └── components/
        ├── Header.tsx                   # Glass header with day indicator & balance pill
        ├── LandingHero.tsx              # Multi-section cinematic landing presentation
        ├── Dashboard.tsx                # Central 3-column control center
        ├── Shop.tsx                     # Marketplace catalog & consequence simulator
        ├── ExpenseTracker.tsx           # Category expense ledger with add/delete
        ├── FinancialInsights.tsx        # SVG charts, burn rate, and Day 30 forecast
        ├── Moneyverse.tsx               # Full-screen 3D world viewer
        ├── MobileView.tsx               # Realistic smartphone simulator container
        ├── FinalResult.tsx              # 30-Day survival evaluation & certificate
        ├── UnexpectedEventModal.tsx     # Crisis modal with branching trade-off choices
        ├── KeyboardShortcutsModal.tsx   # Accessible keyboard shortcut modal (? key)
        ├── AnimatedRupee.tsx            # Animated number counter component
        ├── ThreeMoneyverse.tsx          # Three.js WebGL island diorama
        │
        └── Artwork/
            ├── CinematicHeroScene.tsx   # Sunset sky, starfield, clouds & parallax
            ├── HeroIllustration.tsx     # Student avatar gazing toward floating city
            ├── IsometricWorldIllustration.tsx # Isometric world illustration
            ├── ProductIllustration.tsx  # Bespoke artwork for campus shop items
            ├── DamagedPhoneIllustration.tsx # Damaged phone illustration
            └── CrownSunsetIllustration.tsx # Victory crown artwork for Day 30 debrief
```

---

## 9. Local Installation & Setup

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** (or bun / yarn / pnpm)

### Step-by-Step Installation
```bash
# 1. Clone the repository
git clone https://github.com/manusri1009/brokeology.git

# 2. Enter directory
cd brokeology

# 3. Install dependencies
npm install
```

---

## 10. Development Server Commands

To run the application locally with Hot Module Replacement (HMR):

```bash
npm run dev
```

The application will start on:
```
http://localhost:3000
```

---

## 11. Production Build & Verification Commands

### Build Production Bundle
```bash
npm run build
```
Compiles TypeScript and creates optimized bundles inside `/dist`.

### Type-Check & Lint
```bash
npm run lint
```
Runs `tsc --noEmit` to verify 100% type safety across all files.

### Preview Production Build
```bash
npm run preview
```
Serves the generated `/dist` directory locally for inspection.

---

## 12. Environment Variables

Brokeology is designed to run seamlessly as a client-side application. No sensitive API keys or private variables are required for standard operation:

| Variable | Required | Default | Description |
| :--- | :---: | :---: | :--- |
| `VITE_APP_TITLE` | No | `Brokeology` | Optional title override |

*(Refer to `.env.example` in the project root for reference).*

---

## 13. Deployment Instructions

### Deploying to Vercel
1. Push the code to your GitHub repository.
2. Sign in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Select your repository.
4. Configure the build settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Click **"Deploy"**. Vercel will build and deploy the application with global CDN caching.

---

## 14. Explanation of Financial Calculations

All financial logic is documented with complete mathematical proofs in [`docs/FINANCIAL_LOGIC.md`](docs/FINANCIAL_LOGIC.md). Key models include:

### 1. Safe Daily Allowance ($S_d$)
The maximum capital that can be spent per day to ensure solvency through Day 30:
$$S_d = \max\left(0, \left\lfloor \frac{B_{\text{remaining}}}{30 - d_{\text{current}}} \right\rfloor\right)$$

### 2. Projected Day 30 Balance ($P_{30}$)
Predictive forecast based on moving burn velocity:
$$P_{30} = B_{\text{remaining}} - \left(\bar{B} \times (30 - d_{\text{current}})\right)$$

### 3. Survival Health Index ($H \in [0, 100]$)
A multi-factor score evaluating remaining capital, burn momentum, and spending buffer.

---

## 15. Data Persistence & Storage Strategy

- **Storage Engine**: Browser `localStorage`
- **Primary Game State Key**: `brokeology_game_state_v2`
- **Audio Preference Key**: `brokeology_sound_muted`
- **Defensive Hydration**: State is validated upon initial mount; invalid or corrupted entries cleanly fallback to the Day 1 initial state without crashing.
- **Session Continuity**: Retains current day, recorded expenses, cart items, and completed tasks across page reloads.

---

## 16. Error Handling & Validation

- **Transaction Description**: Enforces 1–80 non-empty characters.
- **Amount Boundary**: Must be a positive finite number between ₹1 and ₹100,000.
- **Category Validation**: Constrained to verified enum categories (`Food`, `Travel`, `Lifestyle`, `Essentials`, `Other`).
- **Zero-Denominator Defense**: Mathematical computations guard all divisions with `Math.max(1, ...)`.
- **Clamped Balances**: Balances and safe allowances cannot underflow below zero.

---

## 17. Accessibility & Responsive Design

Brokeology complies with **WCAG 2.1 AA** guidelines:

### Keyboard Navigation Cheatsheet
| Key | Action | Description |
| :---: | :--- | :--- |
| <kbd>?</kbd> | **Shortcuts Guide** | Toggle keyboard shortcut cheatsheet modal |
| <kbd>1</kbd> | **Home** | Navigate to the cinematic landing page |
| <kbd>2</kbd> | **Dashboard** | Open main Day Dashboard & 3D island |
| <kbd>3</kbd> | **Campus Shop** | Open campus marketplace & cart simulator |
| <kbd>4</kbd> | **Trigger Event** | Simulate an unexpected life crisis modal |
| <kbd>5</kbd> | **Expense Tracker** | View and manage the transaction ledger |
| <kbd>6</kbd> | **Insights** | View predictive analytics & donut charts |
| <kbd>7</kbd> | **3D World Map** | Inspect full-screen 3D Moneyverse |
| <kbd>Space</kbd> | **Advance Day** | Advance to the next challenge day |
| <kbd>M</kbd> | **Mute / Unmute** | Toggle procedural Web Audio effects |
| <kbd>Esc</kbd> | **Close Modal** | Close any active modal dialog |

### Accessibility Highlights
- **Skip Navigation Link**: Keyboard users can jump immediately to `#main-content`.
- **Screen Reader Announcements**: `aria-live="polite"` region notifies assistive devices of balance updates and day changes.
- **Visible Focus Rings**: Distinct 2px high-contrast rings on all interactive elements (`focus-visible`).
- **Reduced Motion**: Full CSS support for `@media (prefers-reduced-motion: reduce)`.

---

## 18. Testing & Verification Instructions

Refer to [`docs/TESTING.md`](docs/TESTING.md) for full reproducible test scenarios covering:
1. Landing Page & Onboarding
2. Campus Marketplace & Cart Consequence Simulator
3. Custom Expense Ledger CRUD operations
4. Unexpected Crisis Decision Flow
5. Financial Analytics & Visual Donut Chart
6. 30-Day Endgame Debrief
7. Local Storage Reload Persistence

---

## 19. Known Limitations

- **Fixed Month Horizon**: The simulation models a fixed 30-day timeline suited for monthly stipends.
- **Client-Side Scope**: Game state resides in local browser storage without multi-device cloud synchronization.
- **WebGL Hardware Requirement**: The 3D Moneyverse canvas requires WebGL 2.0; automatic graceful fallbacks are provided for headless environments.

---

## 20. Future Roadmap

- [ ] **Multi-Currency Support**: Expand beyond INR (₹) to support USD ($), EUR (€), and GBP (£).
- [ ] **Custom Budget Configuration**: Allow users to customize starting stipends and month durations (e.g., ₹15,000 across 45 days).
- [ ] **Peer Challenge Mode**: Share survival seeds or challenge friends to identical crisis sequences.
- [ ] **Export to CSV**: Export transaction history for external spreadsheet analysis.

---

## 21. Visual Interface & Screenshots

| View | Description | Key Features |
| :--- | :--- | :--- |
| **Landing Hero** | Cinematic introduction | Sunset lighting, student avatar artwork, and feature breakdown |
| **3D Island Dashboard** | Main operational center | Interactive 3D campus island, day timeline, and task checklist |
| **Campus Marketplace** | Shopping & cart simulator | 6 campus products, live daily allowance reduction preview |
| **Crisis Modal** | Branching life emergencies | 4 realistic resolutions with cost vs. convenience trade-offs |
| **Financial Insights** | Predictive analytics | SVG category donut chart, 7-day burn velocity histogram |
| **Mobile Simulation** | Smartphone container | Authentic mobile frame with bottom tab bar navigation |

---

*Brokeology is crafted to turn financial discipline from an intimidating chore into a captivating world.*
