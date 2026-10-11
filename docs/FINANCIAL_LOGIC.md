# Brokeology Financial & Mathematical Modeling Specification

## 1. Executive Summary

Brokeology's simulation engine models the microeconomic dynamics of a student living on a finite monthly stipend of **₹10,000** across **30 continuous days**. Rather than acting as a simple subtraction ledger, the system implements predictive behavioral algorithms that continuously calculate:
- Dynamic spending ceilings (Safe Daily Allowance)
- Moving burn velocities
- Forward-looking exhaustion timelines (Survival Runway)
- Multi-variable financial stability indices (Survival Health Index)
- Real-time consequence simulations prior to transaction commitment

All calculations reside in `src/utils/finance.ts` as pure, deterministic functions.

---

## 2. Core Mathematical Formulations

### Variables & Notation

| Symbol | Definition | Default / Domain |
| :---: | :--- | :---: |
| $B_0$ | Initial Total Budget | ₹10,000 |
| $d_c$ | Current Elapsed Day of Challenge | $d_c \in [1, 30]$ |
| $D_{\text{total}}$ | Total Days in Simulation Horizon | 30 |
| $d_r$ | Remaining Days in Simulation Horizon | $d_r = \max(1, D_{\text{total}} - d_c)$ |
| $T$ | Set of all confirmed transactions | $\{t_1, t_2, \dots, t_n\}$ |
| $a_i$ | Amount of transaction $t_i$ | $a_i \in \mathbb{R}^+$ |

---

### 1. Cumulative Expenditure & Remaining Balance

The total expenditure $E_{\text{total}}$ is the sum of all valid recorded transactions:

$$E_{\text{total}} = \sum_{i=1}^{n} \max(0, a_i)$$

The remaining balance $B_{\text{remaining}}$ is clamped to prevent unhandled negative balances:

$$B_{\text{remaining}} = \max(0, B_0 - E_{\text{total}})$$

The cumulative spending percentage $P_{\text{spent}}$:

$$P_{\text{spent}} = \min\left(100, \left\lfloor \frac{E_{\text{total}}}{B_0} \times 100 \right\rfloor\right)$$

---

### 2. Dynamic Safe Daily Allowance ($S_d$)

The Safe Daily Allowance represents the maximum average capital a student can spend per day starting today through the end of Day 30 without entering bankruptcy:

$$S_d = \max\left(0, \left\lfloor \frac{B_{\text{remaining}}}{d_r} \right\rfloor\right)$$

#### Economic Behavioral Value:
If a student spends ₹1,200 on Day 3, their remaining ₹8,800 is distributed across the remaining 27 days, dropping $S_d$ from ₹333/day to ₹325/day. This immediately exposes the long-term friction of early impulse purchases.

---

### 3. Historical Burn Velocity ($\bar{V}_{\text{burn}}$)

The student's actual average daily spending velocity over elapsed time:

$$\bar{V}_{\text{burn}} = \max\left(1, \left\lfloor \frac{E_{\text{total}}}{d_c} \right\rfloor\right)$$

*Note:* Clamped to a minimum of ₹1/day to prevent asymptotic division anomalies when projecting forward.

---

### 4. Predictive Day 30 Projected Balance ($B_{\text{proj}}$)

A forward-looking estimate indicating whether the student will finish the month solvent or in debt based on historical momentum:

$$B_{\text{proj}} = B_{\text{remaining}} - \left(\bar{V}_{\text{burn}} \times d_r\right)$$

- **Positive ($B_{\text{proj}} \ge 0$)**: Student is on trajectory to complete Day 30 with a financial cushion.
- **Negative ($B_{\text{proj}} < 0$)**: Student is burning capital faster than sustainable and is projected to hit ₹0 before Day 30.

---

### 5. Survival Runway in Days ($R_{\text{runway}}$)

The calculated number of days until complete liquidity exhaustion at current burn velocity:

$$R_{\text{runway}} = \begin{cases} 
\min\left(D_{\text{total}}, \left\lfloor \frac{B_{\text{remaining}}}{\bar{V}_{\text{burn}}} \right\rfloor\right) & \text{if } \bar{V}_{\text{burn}} > 0 \\ 
d_r & \text{otherwise} 
\end{cases}$$

---

### 6. Survival Health Index ($H \in [0, 100]$)

A composite financial fitness score that assesses immediate liquidity alongside forward burn sustainability:

$$H = \begin{cases}
0 & \text{if } B_{\text{remaining}} \le 0 \\
\operatorname{clamp}\left(15, 50, \left\lfloor \frac{R_{\text{runway}}}{D_{\text{total}}} \times 100 \right\rfloor\right) & \text{if } B_{\text{proj}} < 0 \\
\operatorname{clamp}\left(55, 100, \left\lfloor \left(\frac{B_{\text{remaining}}}{B_0} \times 100\right) + (30 - P_{\text{spent}}) \times 0.4 \right\rfloor\right) & \text{if } B_{\text{proj}} \ge 0
\end{cases}$$

---

### 7. Capital Buffer Status Classification

The system categorizes overall financial standing into three distinct behavioral tiers:

$$\text{Status} = \begin{cases}
\text{Critical} & \text{if } P_{\text{spent}} > 75\% \text{ or } B_{\text{remaining}} < ₹1,500 \\
\text{Caution} & \text{if } P_{\text{spent}} > 45\% \text{ or } B_{\text{remaining}} < ₹4,000 \\
\text{Safe} & \text{otherwise}
\end{cases}$$

---

## 3. Real-Time Consequence Simulation Algorithm

The consequence simulator (`simulateConsequence`) enables risk-free previewing of transactions (e.g., in the Campus Marketplace cart):

Given a candidate expense of amount $E_x$:

1. **Projected Balance**:
   $$B' = \max(0, B_{\text{remaining}} - E_x)$$

2. **Projected Safe Daily Allowance**:
   $$S'_d = \max\left(0, \left\lfloor \frac{B'}{d_r} \right\rfloor\right)$$

3. **Daily Allowance Reduction Penalty**:
   $$\Delta S_d = S_d - S'_d$$

4. **Instant Capital Depletion Ratio**:
   $$\rho = \left\lfloor \frac{E_x}{B_{\text{remaining}}} \times 100 \right\rfloor$$

5. **Risk Classification Tier**:
   $$\text{Tier} = \begin{cases}
   \text{Severe} & \text{if } \rho > 25\% \text{ or } B' < ₹1,000 \\
   \text{Moderate} & \text{if } \rho > 8\% \text{ or } B' < ₹3,500 \\
   \text{Negligible} & \text{otherwise}
   \end{cases}$$

6. **Affordability Boolean**:
   $$\text{canAfford} = (B_{\text{remaining}} \ge E_x)$$

---

## 4. Category Breakdown Modeling

Expenses are categorized across five domain-specific categories:
- **Food**: Mess meals, cafeteria snacks, groceries, coffee.
- **Travel**: Metro passes, bus fares, auto-rickshaws.
- **Lifestyle**: Movies, gaming, weekend outings, footwear.
- **Essentials**: Prescriptions, stationary, study materials, phone recharges.
- **Other**: Unforeseen miscellaneous costs.

For each category $C_k$, the total expenditure $E(C_k)$ and proportional percentage $P(C_k)$ are derived as:

$$E(C_k) = \sum_{t_i \in T,\, \text{cat}(t_i) = C_k} a_i$$

$$P(C_k) = \begin{cases}
\left\lfloor \frac{E(C_k)}{E_{\text{total}}} \times 100 \right\rfloor & \text{if } E_{\text{total}} > 0 \\
0 & \text{otherwise}
\end{cases}$$

---

## 5. Defensive Edge-Case Guarantees

The financial engine guarantees mathematical safety under all operating conditions:
1. **Division by Zero Protection**: $d_r$ is bounded by $\max(1, 30 - d_c)$, guaranteeing non-zero denominators even when $d_c = 30$.
2. **Negative Amount Defense**: All inputs pass through $a_i = \max(0, a_i)$ and validation checks before arithmetic execution.
3. **Upper Bound Clamp**: Input forms enforce a ₹100,000 ceiling to avoid floating-point overflow.
4. **Rounding Consistency**: Currency values are rounded to nearest whole rupees using `Math.round()` to match standard student budgeting UX.
