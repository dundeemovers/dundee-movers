# Clean & Scalable Frontend Architecture Reference

This reference guides AI agents on how to decompose complex UI features into clean, modular, and maintainable files that strictly stay under the **500-line maximum limit** (targeting 150–250 lines).

---

## 1. Modular Directory Blueprint

Organize code by feature domain to keep files small, focused, and testable:

```text
src/
├── components/                  # Presentation / Reusable UI Primitives
│   ├── ui/
│   │   ├── Button/
│   │   │   ├── Button.tsx       # Core button presentation (< 100 lines)
│   │   │   ├── Button.module.css # Scoped styles
│   │   │   └── types.ts         # Component prop types
│   │   ├── Modal/
│   │   └── Card/
│   └── layout/
│       ├── Navbar.tsx
│       └── Footer.tsx
├── features/                    # Domain-Specific Modules (Self-Contained)
│   └── quote-calculator/
│       ├── components/
│       │   ├── StepAddress.tsx  # Step 1 UI (< 150 lines)
│       │   ├── StepInventory.tsx# Step 2 UI (< 150 lines)
│       │   └── StepSummary.tsx  # Step 3 UI (< 150 lines)
│       ├── hooks/
│       │   ├── useQuoteState.ts # Encapsulated state & persistence (< 120 lines)
│       │   └── useDistanceCalc.ts # Map/Distance service hook (< 80 lines)
│       ├── services/
│       │   └── quoteApi.ts      # Pure API requests (< 60 lines)
│       ├── types/
│       │   └── quote.types.ts   # Data contracts (< 50 lines)
│       └── QuoteCalculator.tsx  # Master orchestrator (< 120 lines)
├── hooks/                       # Shared Custom Hooks
│   ├── useLenis.ts
│   ├── useMediaQuery.ts
│   └── useScrollReveal.ts
├── utils/                       # Pure Helper Functions (Zero Side-Effects)
│   ├── formatters.ts
│   └── math.ts
└── styles/
    ├── tokens.css               # Design tokens (OKLCH, clamp typography)
    └── globals.css
```

---

## 2. File Decomposition Patterns

### Pattern A: Extract State into Dedicated Custom Hooks
**Anti-Pattern:** Putting state, effects, validation, and layout inside a single 450-line component.  
**Senior Pattern:** Move all state logic into `use[Feature]State.ts`:

```typescript
// features/quote-calculator/hooks/useQuoteState.ts
import { useState, useCallback } from 'react';
import type { QuoteData } from '../types/quote.types';

export function useQuoteState() {
  const [step, setStep] = useState<number>(1);
  const [data, setData] = useState<QuoteData>({ pickup: '', dropoff: '', items: [] });

  const nextStep = useCallback(() => setStep(prev => prev + 1), []);
  const prevStep = useCallback(() => setStep(prev => Math.max(1, prev - 1)), []);
  const updateData = useCallback((patch: Partial<QuoteData>) => {
    setData(prev => ({ ...prev, ...patch }));
  }, []);

  return { step, data, nextStep, prevStep, updateData };
}
```

---

### Pattern B: Extract Pure Business Math into Pure Utilities
Never embed pricing calculation formulas directly inside UI render trees:

```typescript
// features/quote-calculator/utils/calculateEstimate.ts
import type { QuoteData, PriceEstimate } from '../types/quote.types';

const BASE_RATE = 120;
const MILE_RATE = 2.5;

export function calculateEstimate(data: QuoteData, distanceMiles: number): PriceEstimate {
  if (distanceMiles <= 0) {
    return { subtotal: BASE_RATE, tax: BASE_RATE * 0.2, total: BASE_RATE * 1.2 };
  }
  const subtotal = BASE_RATE + distanceMiles * MILE_RATE;
  const tax = subtotal * 0.2;
  return { subtotal, tax, total: subtotal + tax };
}
```

---

### Pattern C: Strict Prop Types & Discriminated Unions
Avoid ambiguous optional fields; use discriminated unions for robust state transitions:

```typescript
// types/ui.types.ts
export type AsyncState<T> =
  | { status: 'idle'; data: null; error: null }
  | { status: 'loading'; data: null; error: null }
  | { status: 'success'; data: T; error: null }
  | { status: 'error'; data: null; error: string };
```
