<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Frontend Engineering Directives (Impeccable Design Standard)

## Mandatory Automatic Activation
For ANY frontend, UI/UX, styling, layout, component creation, or web page modification task:
1. **Activate the Impeccable Skill**:
   - Consult `.agents/skills/impeccable/SKILL.md` automatically before writing or modifying any UI code.
   - Run the context helper: `.\.agents\skills\impeccable\scripts\impeccable.cmd context` (or inspect `PRODUCT.md` and `DESIGN.md`).
2. **Strict Anti-Slop Discipline**:
   - Zero AI cliches: no gratuitous purple/neon gradients, no "AI beige" cards, no decorative grid overlays, no side-tab card borders, no nested card apocalypse, no low-contrast text, no unanchored typography.
   - Maintain distinct visual hierarchy, purposeful white space, and intentional typography scales.
3. **Token Normativity & Living Specs**:
   - Capture product truth in `PRODUCT.md` (`/impeccable init`).
   - Define and adhere strictly to project design tokens in `DESIGN.md` (colors, typography, radii, spacing). Never invent ad-hoc inline colors or arbitrary font sizes.
4. **Appropriate Command Playbook**:
   - Building new surfaces: Follow `/impeccable shape` and `reference/new-work.md`.
   - Refining existing UI: Run `/impeccable polish`, `/impeccable typeset`, `/impeccable layout`, or `/impeccable distill`.
   - Evaluating: Run `/impeccable audit` or `/impeccable critique`.
5. **Mechanical Verification**:
   - Before finishing any UI task, run detector verification:
     ```bash
     .\.agents\skills\impeccable\scripts\impeccable.cmd detect
     ```
     or `npx impeccable detect`. Resolve all findings before handing back work.

# Strict Modular Architecture & Code Sizing Directives (MANDATORY)

> [!CRITICAL]
> **Strict Line Count & File Size Enforcement**: All agents working on this codebase MUST comply with the following file size caps. Monolithic files are strictly forbidden. Decomposing components into co-located modules is mandatory.

### 1. Mandatory File Line Limits & Thresholds

| File Category | Ideal Range | Strict Hard Cap | Contents & Responsibilities |
| :--- | :--- | :--- | :--- |
| **Route Page (`page.tsx`)** | **40 – 90 lines** | **120 lines** | **Orchestrator only**. Data fetching, route metadata, assembling section components. No inline modal bodies, raw datasets, or deep JSX trees. |
| **Route Layout (`layout.tsx`)** | **30 – 80 lines** | **120 lines** | Shell chrome, headers, footers, shared providers. |
| **Feature Section Component** | **80 – 160 lines** | **200 lines** | Route-specific section (e.g., `market-grid.tsx`, `terms-sections.tsx`). |
| **Interactive Leaf (`'use client'`)**| **40 – 120 lines** | **180 lines** | Interactive controls (filters, forms, search inputs, dialog triggers). |
| **Reusable UI Primitive** | **30 – 80 lines** | **120 lines** | Dumb design tokens/primitives (except upstream shadcn compound files). |
| **Hooks, Types & Utilities** | **30 – 90 lines** | **150 lines** | Single-responsibility state hooks, Zod schemas, helpers. |
| **GLOBAL APPLICATION CEILING** | — | **200 lines** | **Absolute limit for any app file** (ceiling: 250 only for huge static schemas). |

### 2. Mandatory Structural Rules

1. **Route Co-Location (`_components/`)**:
   - Subcomponents scoped to a specific route MUST live in `app/[route]/_components/` (or nested route folders).
   - Never dump route-specific components into root `/components/`.
   - Root `/components/` is strictly reserved for global `/components/ui/` primitives and cross-route shared layouts.

2. **Isolate Server & Client Boundaries**:
   - `page.tsx` must always be a **React Server Component (RSC)** orchestrator. Never add `'use client'` to a `page.tsx`.
   - Push `'use client'` down strictly to leaf interactive components.
   - Separate static configuration arrays, navigation trees, and mock datasets into separate `*.ts` files rather than inlining them inside JSX components.

3. **Dynamic Import for Heavy Client Dependencies**:
   - Heavy client widgets (charts, drag-and-drop, date pickers, rich editors) must be lazy-loaded using `next/dynamic` with skeleton loading states.

4. **Mandatory Mechanical Audit Before Task Completion**:
   - Before handing back work that touches or creates components/pages, inspect the file line counts:
     - Ensure no `page.tsx` exceeds **120 lines**.
     - Ensure no application file exceeds **200 lines**.
     - Run `npx tsc --noEmit` to ensure type integrity.

---

# Autonomous Skill Execution Directives

> [!IMPORTANT]
> **Zero Permission Protocol**: When building, designing, planning, reviewing, deploying, or modifying code, automatically activate and execute the relevant installed skill directly without asking the user for confirmation. If a task falls under a skill domain, consultation and execution of that skill is mandatory.
> 
> **Frontend & UI Building Directive**: For building the frontend and the UI, you must **use Impeccable skills** (`.agents/skills/impeccable/SKILL.md`) by default. Never build or touch UI code without activating Impeccable principles, anti-slop rules, and running mechanical detection.
>
> **Modular Architecture & File Size Directive (MANDATORY)**: You must strictly follow **Next.js Modular Architecture** (`.agents/skills/nextjs-modular-architecture/SKILL.md`). Enforce file size limits (< 200 lines, `page.tsx` < 120 lines), co-located route `_components/`, leaf-only `'use client'`, and lazy dynamic imports.

---

# Installed Skills Reference & Activation Triggers

### 1. Senior Architecture, Planning & Engineering Lifecycle
- **`.agents/skills/scope/SKILL.md`** (`scope`):
  - *When to use*: Plan a product or new feature slice, define boundaries, break down milestones, or maintain `docs/scope/`. Always run before starting large or multi-step feature work.
- **`.agents/skills/architect/SKILL.md`** (`architect`):
  - *When to use*: Make load-bearing technical decisions, select frameworks/libraries, design services/APIs, or write technical specifications in `docs/specs/`.
- **`.agents/skills/develop/SKILL.md`** (`develop`):
  - *When to use*: Implement full features, backend services, or UI components from approved architectural specs.
- **`.agents/skills/check/SKILL.md`** (`check`):
  - *When to use*: Verify implemented code against acceptance criteria (`/check verify`) or conduct senior code reviews (`/check review`) before finalizing changes.

### 2. Next.js & Modern React Engineering
- **`.agents/skills/nextjs-modular-architecture/SKILL.md`** (`nextjs-modular-architecture`):
  - *When to use*: **MANDATORY**: Whenever writing, modifying, decomposing, or reviewing any Next.js pages or components. Enforces strict file sizing (< 200 lines, `page.tsx` < 120 lines), co-located route `_components/`, leaf-only `'use client'` boundaries, and lazy dynamic imports.
- **`.agents/skills/vercel-react-best-practices/SKILL.md`** (`vercel-react-best-practices`):
  - *When to use*: Writing, refactoring, or reviewing any Next.js (App Router) pages, Server/Client Components, Server Actions, data fetching, or bundle optimization.
- **`.agents/skills/vercel-composition-patterns/SKILL.md`** (`vercel-composition-patterns`):
  - *When to use*: Designing component APIs, avoiding boolean prop proliferation, creating compound components, or using React 19 patterns.
- **`.agents/skills/vercel-optimize/SKILL.md`** (`vercel-optimize`):
  - *When to use*: Optimizing Next.js performance, minimizing function invocation overhead, improving Core Web Vitals (LCP, INP, CLS), and route cache tuning.
- **`.agents/skills/vercel-react-view-transitions/SKILL.md`** (`vercel-react-view-transitions`):
  - *When to use*: Implementing animated route transitions, shared layout morphs, or state transitions in Next.js using the View Transitions API.

### 3. Google Cloud Platform & DevOps
- **`.agents/skills/gcloud/SKILL.md`** (`gcloud`):
  - *When to use*: Executing, generating, or validating any `gcloud` CLI commands, GCP resource management, IAM permissions, Cloud Run, GCS, or cloud infrastructure operations.

### 4. GitHub CLI & Source Control
- **`.agents/skills/github-cli/SKILL.md`** (`github-cli`):
  - *When to use*: Running `gh` CLI commands, managing PRs, reviewing pull requests, inspecting issues, configuring GitHub Actions, releases, or repo automation.

### 5. AI Agents: Voice, Telephony & Real-Time Chat Systems
- **`.agents/skills/building-livekit-agents/SKILL.md`** (`building-livekit-agents`):
  - *When to use*: Building conversational AI agents, WebRTC streaming pipelines, voice bots, phone telecalling/SIP trunking, speech-to-text, text-to-speech, and chat-based systems.
- **`.agents/skills/debugging-livekit-agents/SKILL.md`** (`debugging-livekit-agents`):
  - *When to use*: Testing voice/chat agents locally, inspecting tool call reasoning, debugging turn latencies, or resolving agent conversation bugs.
- **`.agents/skills/operating-livekit-agents/SKILL.md`** (`operating-livekit-agents`):
  - *When to use*: Deploying voice/chat agents to production, managing worker processes, VAD prewarming, handling graceful shutdowns, and production observability.

### 6. Google Stitch Design & Screen Generation Suite
- **`.agents/skills/stitch-generate-design/SKILL.md`** (`stitch-generate-design`):
  - *When to use*: Generating new UI screens from text prompts/images, editing existing screens, or generating layout variants via Stitch MCP.
- **`.agents/skills/stitch-manage-design-system/SKILL.md`** (`stitch-manage-design-system`):
  - *When to use*: Creating, updating, or applying design systems and themes (`DESIGN.md`) across Stitch screens.
- **`.agents/skills/stitch-code-to-design/SKILL.md`** (`stitch-code-to-design`):
  - *When to use*: Converting existing frontend code (React, Vue, etc.) into Stitch designs.
- **`.agents/skills/stitch-extract-design-md/SKILL.md`** (`stitch-extract-design-md`):
  - *When to use*: Extracting a complete `DESIGN.md` design system from existing source code.
- **`.agents/skills/stitch-extract-static-html/SKILL.md`** (`stitch-extract-static-html`):
  - *When to use*: Extracting self-contained static HTML snapshots with inlined assets from running apps.
- **`.agents/skills/stitch-upload-to-stitch/SKILL.md`** (`stitch-upload-to-stitch`):
  - *When to use*: Uploading local assets, mockups, and HTML files into Stitch projects.
- **`.agents/skills/stitch-react-components/SKILL.md`** (`stitch-react-components`):
  - *When to use*: Converting Stitch screens into clean, modular, AST-validated React components.
- **`.agents/skills/stitch-react-native/SKILL.md`** (`stitch-react-native`):
  - *When to use*: Converting Stitch designs into React Native components with StyleSheet.
- **`.agents/skills/stitch-loop/SKILL.md`** (`stitch-loop`):
  - *When to use*: Autonomous loop generation for complete multi-page websites via Stitch.
- **`.agents/skills/taste-design/SKILL.md`** (`taste-design`):
  - *When to use*: Generating premium, anti-generic design systems with strict typography and color palettes.
- **`.agents/skills/enhance-prompt/SKILL.md`** (`enhance-prompt`):
  - *When to use*: Optimizing raw UI ideas into structured, high-fidelity prompts for Stitch generation.
- **`.agents/skills/design-md/SKILL.md`** (`design-md`):
  - *When to use*: Synthesizing semantic `DESIGN.md` files from existing Stitch projects.
- **`.agents/skills/site-md/SKILL.md`** (`site-md`):
  - *When to use*: Synthesizing `SITE.md` project constitutions for multi-page builds.
- **`.agents/skills/remotion/SKILL.md`** (`remotion`):
  - *When to use*: Generating programmatic walkthrough videos from Stitch screens using Remotion.
- **`.agents/skills/shadcn-ui/SKILL.md`** (`shadcn-ui`):
  - *When to use*: Installing, customizing, and composing shadcn/ui components.
- **`.agents/skills/react-vite-dashboard/SKILL.md`** (`react-vite-dashboard`):
  - *When to use*: Converting Stitch screens into production React + Vite dashboards with TanStack Query.

### 7. Core Frontend, UI & Data Operations
- **`.agents/skills/impeccable/SKILL.md`** (`impeccable`):
  - *When to use*: **MANDATORY**: For building the frontend and the UI, always use Impeccable skills. Use when creating, modifying, polishing, styling, refining, critiquing, or auditing any UI components, web pages, layouts, micro-interactions, forms, dashboards, or design system tokens.
- **`.agents/skills/frontend-design/SKILL.md`** (`frontend-design`):
  - *When to use*: Designing and implementing distinctive, high-fidelity web components, pages, or entire UI flows.
- **`.agents/skills/firestore-data/SKILL.md`** (`firestore-data`):
  - *When to use*: Querying, managing, or mutating NoSQL Firestore document hierarchies and collections.

---

# Next.js 16 Proxy Convention — No Middleware (MANDATORY)

> [!CRITICAL]
> **This repo uses `proxy.ts` only. `middleware.ts` is forbidden.** The `middleware` file convention was deprecated in Next.js 16 and renamed to `proxy` (https://nextjs.org/docs/messages/middleware-to-proxy).

1. **Single source of truth**: root `proxy.ts` exporting `export function proxy(request: NextRequest)` plus `export const config = { matcher: [...] }`. Tests live in `test/proxy.test.ts` importing `import { proxy } from "@/proxy"`.
2. **Never create** `middleware.ts`, `src/middleware.ts`, or any `*middleware*` file. Never export `function middleware` or `const middleware`. Never import from `@/middleware`.
3. **When editing auth guards**: edit `proxy.ts` only. Keep the matcher scoped (`/dashboard/:path*`, `/sign-in`, `/signin`, `/login`). Keep open-redirect sanitization (reject `//` and non-`/` callbackUrls).
4. **Docs use proxy naming**: `docs/FEATURES.md` and `docs/specs/auth-firestore-betterauth.md` say `proxy.ts` / Proxy. Do not reintroduce `middleware.ts` wording in project docs.
5. **Ignore upstream skill wording**: files under `.agents/skills/**` and `.gemini/**` still mention "middleware" (Vercel/Next.js upstream docs, cost scanners). Those are third-party references — do not edit them and do not copy the term into app code or project docs.

---

# Testing & Verification Constraints

- **No Chrome DevTools or Browser Testing Without Explicit User Command**: Never use Chrome DevTools, browser automation, or browser testing tools unless the user explicitly requests browser verification.
- **Selective Build Testing (`npm run build`)**: Do not run `npm run build` by default. Only run `npm run build` when making changes where verification is necessary to confirm success, or when the user explicitly instructs to run the build.

---

# System 1 AI Decision Engine Directive (ModernBERT / Jev-AI Pattern)

> [!IMPORTANT]
> **Deterministic Sub-30ms Decision Layer**: This codebase uses a dedicated **System 1 Decision Engine** deployed on an 8-vCPU AWS EC2 instance (`13.200.254.164`, AMD EPYC Milan) running ModernBERT (`dleemiller/ModernCE-base-nli`) with fused ONNX Runtime.

1. **When to Use**:
   - Evaluating trade conditions, strategy entry/exit rules, or candle formations.
   - Enforcing platform risk parameters, leverage limits, and SEBI compliance rules.
   - Tool gating and confirmation checks in Voice & Chat AI Agents (VA): model returns instant calibrated confidence scores (0.0–1.0) and boolean verdicts without token generation latency or hallucination.
   - Batch evaluation of multi-asset ticker signals (16ms per condition).

2. **Server-Side Import & Usage**:
   - Import exclusively from `@/lib/decision-engine`:
     ```typescript
     import { evaluateTradeCondition, evaluateTradeBatch } from "@/lib/decision-engine";

     const result = await evaluateTradeCondition(
       "BTC broke 68,000 resistance with RSI at 64.",
       "Market structure is strongly bullish."
     );
     // result.match -> boolean
     // result.verdict -> "entailment" | "contradiction" | "neutral"
     // result.confidence -> 0.732 (73.2%)
     // result.latency_ms -> 36.0ms
     ```

3. **Security & Zero-Client-Exposure**:
   - `DECISION_ENGINE_URL` and `DECISION_ENGINE_API_KEY` are **strictly server-side** in `.env.local` and Cloud Run / Secret Manager.
   - **NEVER** expose the AWS IP or API key to browser client bundles (no `NEXT_PUBLIC_` prefix).
   - All client UI actions call Next.js Server Actions or Route Handlers (`app/api/...`), which proxy requests securely with the `X-Internal-Secret` header.

---

# Knowledge Base, System Prompt & AI Guardrail Sizing Directives (MANDATORY)

> [!CRITICAL]
> **Strict Limits for AI Prompts & Knowledge Base Modules**: To maintain ultra-low latency, prevent token overflow, avoid prompt dilution, and keep embedding search accurate, all knowledge base files and prompts MUST adhere to the following strict boundaries:

### 1. File Sizing & Chunk Thresholds
| Module / File Type | Ideal Range | Strict Hard Cap | Contents & Responsibilities |
| :--- | :--- | :--- | :--- |
| **System Prompt File** (`system-prompt.ts`) | **40 – 70 lines** | **90 lines** | Persona, role identity, and high-level behavioral directives. Zero bloated inlined manuals. |
| **Domain Guardrails** (`guardrails.ts`) | **50 – 80 lines** | **100 lines** | Exact out-of-domain refusal pivots, allowed/forbidden topics, and validation helpers. |
| **Regulatory & Identity Specs** (`about-us.ts`) | **60 – 100 lines** | **120 lines** | Non-broker identity, SEBI compliance, non-custodial model, and product capabilities. |
| **Firestore Knowledge Chunk Size** | **300 – 600 chars** | **800 chars (max 200 tokens)** | Single-concept chunks for vector indexing (`text-embedding-004`). Prevents semantic dilution. |

### 2. Behavioral Directives for AI Agent
1. **Strict Financial & Trading Boundary**: The agent ONLY handles stock markets, financial data, technical analysis, quantitative modeling, trading strategies, and ViewMarket capabilities. Any out-of-domain query (e.g. general programming, poems, politics, health) must be refused politely and firmly with the standard pivot.
2. **Regulatory Positioning ("About Us")**:
   - ViewMarket is **NOT a registered broker** (not SEBI-registered RIA/RA).
   - ViewMarket is a **non-custodial software technology platform** (BYOA: Bring Your Own Account).
   - Supported Brokers (8): Zerodha (Kite Connect v3), Angel One (SmartAPI v2), Upstox (API v2), Dhan (DhanHQ), Fyers (API v3), Kotak Neo (Trade API), ICICI Direct (Breeze API), and Shoonya by Finvasia (Noren API).
   - Orders require mandatory human confirmation (click-to-trade). Zero autonomous money management or profit guarantees.
   - 9 out of 10 individual traders in derivatives (F&O) incur net losses.



