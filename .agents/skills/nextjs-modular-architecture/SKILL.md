---
name: nextjs-modular-architecture
description: "Enforces lean file sizing, modular component decomposition, strict line thresholds (max 150-200 lines), Server/Client boundary isolation, co-located route components, and dynamic lazy-loading for peak Next.js performance and maintainability."
---

# Next.js Modular Component Architecture & File Sizing Directive

A strict engineering standard to keep Next.js files lean, maintainable, and blazingly fast. Prevents monolithic page files, reduces cognitive overhead, and optimizes client bundle sizes by isolating Server and Client Component boundaries.

---

## 1. Line Count Budget & Thresholds

| File Category | Ideal Range | Strict Hard Cap | Purpose & Contents |
| :--- | :--- | :--- | :--- |
| **Route Page (`page.tsx`)** | 40 – 90 lines | **120 lines** | Server orchestrator: data fetching, metadata, passing data to section components. No direct complex JSX or inline modals. |
| **Route Layout (`layout.tsx`)** | 30 – 80 lines | **120 lines** | Shared chrome, headers, footers, providers. |
| **Feature Section** | 80 – 160 lines | **200 lines** | Co-located section (e.g., `market-grid.tsx`, `hero-banner.tsx`). |
| **Client Interactive Leaf** | 40 – 120 lines | **180 lines** | Isolated `'use client'` widget (filter bar, search input, upvote button). |
| **Reusable UI Primitive** | 30 – 80 lines | **120 lines** | Reusable atomic primitives (buttons, badges, metric cards). |
| **Custom Hooks & Utils** | 30 – 90 lines | **150 lines** | Single responsibility state machines or formatting helpers. |

> [!CRITICAL]
> **Max File Threshold**: No source file shall exceed **200 lines** (absolute ceiling: **250 lines** for heavily typed schemas). When a file crosses 200 lines, immediately decompose it into co-located child components or sub-modules.

---

## 2. Directory Architecture & Co-Location

Do **not** dump page-specific components into global `/components/`. Keep them private to the route:

```text
app/
├── (routes)/
│   └── market/
│       ├── page.tsx                 # [RSC] Orchestrator (40-80 lines)
│       ├── loading.tsx              # Skeleton fallback
│       ├── error.tsx                # Error boundary
│       ├── types.ts                 # Route-specific types (if needed)
│       └── _components/             # Route-private components
│           ├── market-header.tsx    # [RSC] Static or server-rendered section
│           ├── market-grid.tsx      # [RSC] Grid container with Suspense boundaries
│           ├── market-filter.tsx    # ['use client'] Filter bar leaf
│           ├── market-item-card.tsx # [RSC] Item presentation
│           └── market-chart.tsx     # ['use client'] Heavy chart loaded via next/dynamic
components/
├── ui/                              # Global design system primitives (shadcn, buttons, inputs)
└── shared/                          # Components truly shared across 2+ distinct routes
```

---

## 3. Server vs. Client Boundary Rules (Zero-Bundle Overhead)

1. **Push `'use client'` to the Leaves**:
   - `page.tsx` must remain a React Server Component (RSC).
   - Never mark an entire page or large container with `'use client'`.
   - Extract only the interactive element (button, dropdown, search input) into a small client leaf under `_components/`.

2. **Lazy-Load Heavy Client Dependencies**:
   - Non-critical client widgets (modals, drawsheets, complex charts, rich-text editors) MUST be dynamically loaded using `next/dynamic`:
   ```tsx
   import dynamic from 'next/dynamic';

   const AnalyticsChart = dynamic(
     () => import('./_components/analytics-chart'),
     {
       ssr: false,
       loading: () => <SkeletonChart />
     }
   );
   ```

3. **Pass Server Content as Props or Children**:
   - When a client wrapper (e.g. animated drawer or modal) surrounds heavy content, pass the content as `children` to keep the inner content rendered on the server:
   ```tsx
   <ClientModal>
     <ServerRenderedDetail item={data} />
   </ClientModal>
   ```

---

## 4. Decomposition Protocol (When & How to Split)

Follow these rules when writing or refactoring code:

1. **When to Split**:
   - File approaches 180+ lines.
   - A component contains multiple nested sub-views or conditional branches (e.g., tabs, accordions, multiple modals).
   - An interactive UI widget requires local state inside a Server Component.
   - A chunk of JSX has a distinct domain responsibility (e.g., table pagination vs table row).

2. **When NOT to Split (Avoid Component Soup)**:
   - Do NOT split 5–10 line static HTML snippets into separate files just to lower line count.
   - Do NOT create single-use abstractions that only get used once and introduce indirection without boundary or performance benefits.

---

## 5. Verification Checklist

Before completing any Next.js feature or page:
- [ ] Is `page.tsx` under 120 lines?
- [ ] Are all files in the feature under 200 lines?
- [ ] Are route-specific components co-located in `_components/`?
- [ ] Is `'use client'` strictly restricted to leaf components?
- [ ] Are heavy third-party client components dynamically imported?
