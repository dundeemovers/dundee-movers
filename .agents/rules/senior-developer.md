# Senior Developer & Architecture Rules

Enforce modular, clean, and maintainable software engineering practices.

## Core Rules

1. **Max 500 Lines per File:** Split files exceeding 500 lines into sub-components, custom hooks, services, or utility modules.
2. **Strict Modularity & Separation of Concerns:**
   - UI components focus strictly on presentation.
   - Business logic belongs in hooks, controllers, or services.
   - Pure math / string / date manipulations belong in isolated utilities.
3. **No `any` Types:** Use explicit interfaces, generics, or union types.
4. **Resilient Error & State Handling:** Explicitly implement Loading, Empty, Error, and Success states for UI elements.
5. **Clean Code & Guard Clauses:** Use early returns to minimize indentation and cognitive complexity.
