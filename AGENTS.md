# Senior Software Engineering Rules & Standards

These rules enforce industry-standard senior developer best practices for architecture, modularity, code quality, and maintainability across all files in this project.

---

## 1. Modular Architecture & File Size Limits

* **500-Line Maximum File Limit:** No single source code file may exceed **500 lines**. Target 150–300 lines for optimal maintainability.
* **Single Responsibility Principle (SRP):** Each file must have one clearly defined responsibility.
  * Split large UI components into atomic sub-components (`HeroHeader`, `HeroCTA`, `HeroStats`).
  * Extract complex state or side-effects into dedicated custom hooks (`useAuth`, `useCart`).
  * Move pure transformation and math logic into isolated utility modules (`utils/formatters.ts`).
* **Feature-Driven Directory Structure:**
  ```text
  src/
  ├── components/        # Reusable presentation components
  │   ├── ui/            # Primitive design system components (Button, Modal)
  │   └── layout/        # Navbar, Footer, Container
  ├── features/          # Domain-specific modules (e.g., booking, quote)
  │   ├── components/    # Domain-specific UI
  │   ├── hooks/         # Domain-specific state/data
  │   └── services/      # Domain API calls
  ├── hooks/             # Shared custom hooks
  ├── utils/             # Pure helper functions
  ├── types/             # TypeScript definitions & interfaces
  └── styles/            # Design system tokens and globals
  ```

---

## 2. Code Cleanliness & Readability (Clean Code)

* **Self-Documenting Names:** Use descriptive identifiers that state intent without ambiguity.
  * *Good:* `isPaymentProcessing`, `calculateDeliveryEstimate()`, `userProfile`
  * *Bad:* `flag`, `calc()`, `data`, `temp`, `x`
* **Early Returns & Flat Hierarchy:** Avoid deeply nested `if/else` ladders. Use guard clauses to exit early:
  ```typescript
  // Preferred
  function processBooking(booking: Booking) {
    if (!booking.isValid) return { error: "Invalid booking" };
    if (booking.isExpired) return { error: "Booking expired" };
    
    return submitBooking(booking);
  }
  ```
* **Pure Functions & Immutability:** Prefer pure functions without hidden side effects. Avoid mutating objects or arrays directly (use spread operators, `map`, `filter`).

---

## 3. Type Safety & Defensive Engineering

* **Strict Typing:** Never use `any`. Explicitly declare return types on exported functions and interfaces for all payload structures.
* **Input Validation at Boundaries:** Validate all external inputs (API responses, user forms, URL params) at the application boundaries using schema validation (e.g., Zod).
* **Comprehensive State Handling:** Every interactive UI component must gracefully handle all four lifecycle states:
  1. **Idle / Initial**
  2. **Loading / Pending** (with skeletons/spinners)
  3. **Success / Populated**
  4. **Error / Empty** (with clear recovery actions)

---

## 4. Performance & Efficiency

* **Prevent Unnecessary Computations:** Memoize expensive calculations and debounce high-frequency events (scroll, search input, window resize).
* **Code Splitting & Lazy Loading:** Dynamically import heavy libraries, modals, or below-the-fold routes.
* **Zero Console Noise:** Remove all temporary debugging `console.log` statements before finalizing code. Only structured logging should remain.

---

## 5. Error Handling & Resilience

* Wrap asynchronous operations in `try/catch` blocks with typed error responses or fallback values.
* Never swallow errors silently. Always log meaningful context or present user-facing recovery messages.
