# Features Specification

## 1. Landing Page (`/`)
- Sovereign ViewMarket visual architecture adapted to non-custodial fintech SaaS and Indian regulatory standards with Next.js 16 (Turbopack) and Tailwind CSS v4.
- **Header**: Responsive glassmorphic pill navigation with ViewMarket feature modules (Strategy Builder, Analytics, AI Research, Library), broker integrations, and "Launch Studio" CTAs.
- **Hero**: `font-mackinac` typography, ViewMarket non-custodial value proposition, primary "Open Strategy Studio" conversion CTA, and twilight mountain horizon backdrop.
- **Direct Broker Execution & Compliance (`Section1`)**: Direct client-to-broker execution card with hand-sketched world globe, 4-tier colored feature grid (BYOA model, mandatory click-to-trade, descriptive analytics, sandboxed compute-as-a-service), SEBI regulatory compliance shield, enterprise-grade privacy checklist.
- **Strategy Studio & Ecosystem (`Section2`)**: Visual condition builder with NLP logic translation flowchart, sub-millisecond client rule evaluation, open-source indicator library, embedded SEBI risk disclosures, 9-item modern performance stack grid (`Tech`), rule-based systematic execution CTA card with architectural trader workstation.
- **Footer**: Multi-column navigation with modules, supported brokers (Zerodha, Upstox, Dhan, Angel One), documentation, direct email contact links (`support@viewmarket.in`, `legal@viewmarket.in`), and 6 active legal routes.

## 2. Legal & Trust Center (`/legal/*`)
- Shared 3-column architecture fully grounded in ViewMarket's Indian regulatory architecture (`LEGAL.md`).
- **Shared Layout (`app/legal/layout.tsx` & `components/legal/LegalPageShell.tsx`)**:
  - Full-width hero canvas with breadcrumbs, document metadata, version information, and a plain-English summary.
  - Left Column: Sticky legal-document index with active route highlighting and an inquiry contact.
  - Center Column: High-density editorial legal text matching landing page typography scale (`font-mackinac`, `font-bricolage`), clause hierarchy, and callouts.
  - Right Column: Sticky Table of Contents anchor dock and inquiry contact.
- **Dedicated Legal Routes**:
  - `/legal/terms`: Terms of Service (SaaS workflow tooling scope, BYOA model, mandatory human confirmation clicks, compute billing, strategy sovereignty).
  - `/legal/disclaimer`: SEBI Non-Registration Notice, Descriptive vs. Prescriptive analytics doctrine, zero performance marketing or leaderboards.
  - `/legal/risk-disclosure`: Mandatory SEBI Derivatives (F&O) Loss Warning (9 out of 10 individual traders incur net losses), algorithmic logic & broker API hazards.
  - `/legal/privacy`: Indian DPDP Act 2023 compliance, Zero Broker Token Storage in backend databases, direct client-to-broker tick streaming.
  - `/legal/cookies`: First-party dashboard sidebar preference cookie, current browser-storage disclosures, and zero advertising or behavioral-tracking cookies.
  - `/legal/refund`: Pure cloud compute runtime billing, complete exclusion of market trading losses, SaaS cancellation terms.

## 3. Authentication Surface (`/sign-in`) & Engine
- Custom split-screen authentication architecture tailored to ViewMarket's sovereign branding.
- **Pure Sign-In Layout**: Streamlined dedicated sign-in interface without sign-up toggles at `/sign-in`.
- **Left Panel (50% on desktop)**: Full-height architectural celestial observatory artwork asset with glowing "VM" continuous loop (`public/assets/auth-illustration.png`), responsive (hidden on mobile, visible on `lg:` 50% split).
- **Right Panel (50% on desktop, 100% on mobile)**: Brand header linking to `/`, centered OAuth social buttons (GitHub and Google) wired to redirect directly to `/dashboard/overview`, and statutory Terms and Privacy links.
- **Engine (Better Auth + Firestore Native)**: Persistent 30-day sessions with 1-day rolling renewal, backing collections (`users`, `sessions`, `accounts`, `verifications`) provisioned on Google Cloud Firestore in Mumbai (`asia-south1`).
- **Edge Route Protection (`proxy.ts`)**: Automatic bouncing of authenticated users visiting `/sign-in` or `/login` to `/dashboard/overview`, unauthenticated interception on `/dashboard/*` redirecting to `/sign-in`, and sanitization against open redirect attacks.
- **Adaptive Navigation (`components/NavAuth.tsx`)**: Header and mobile drawer dynamically morph between `"Sign In"` / `"Launch Studio"` and `"Dashboard"` / User Avatar dropdown with 0px Cumulative Layout Shift.

## 4. Dashboard Overview Surface (`/dashboard/overview`)
- **Layout & Routing**: Dedicated dashboard workspace at `/dashboard/overview` (`/dashboard` and `/overview` automatically redirect to `/dashboard/overview`).
- **Left Navigation Sidebar (`components/dashboard/Sidebar.tsx`)**:
  - ViewMarket logo, BYOA client-side mode beacon, and navigation links with **Overview** as the prominent primary active item.
  - Secondary module links: Strategy Studio, Descriptive Analytics, AI Research Assistant, Broker Gateways, Compute Backtesting, Compliance & Audit.
  - Ephemeral user session dock showing zero server token storage and quick disconnect action.
- **Dashboard Header (`components/dashboard/DashboardHeader.tsx`)**:
  - Clean title "Overview" and live NSE/BSE gateway status indicator.
  - Quick action controls: Refresh market ticks, "Connect Broker", and "New Strategy" CTA.
  - Responsive mobile drawer support for smaller viewports.
- **Compact KPI Metrics Row (`components/dashboard/KpiCard.tsx`)**:
  - Exactly 4 compact, slim cards arranged on a single row (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` in a constrained `max-w-6xl` container):
    1. **Total**: Margin allocated (`₹12,45,800`, `+₹45,800`, 42% utilization)
    2. **Today's P&L**: Realized intraday return (`+₹18,420`, `+1.48% vs Open`)
    3. **Overall P&L**: Realized fiscal return (`+₹1,94,250`, `+18.42% FY26`)
    4. **Day Trades**: Execution count (`14 Orders`, `100% Human Confirmed`)

## 5. Cloud Hosting, Autoscaling & CI/CD Pipeline
- **Platform**: Google Cloud Run (Serverless Managed Containers).
- **Target Project**: `viewmarket-platform-2026`.
- **Region**: `asia-south1` (Mumbai, India) — colocated with production Firestore database to minimize query latency and eliminate cross-region network egress overhead.
- **Autoscaling Configuration**:
  - Horizontal container autoscaling.
  - `--min-instances=1`: 1 instance constantly active/warm during low-traffic periods, eliminating cold starts.
  - `--max-instances=10`: Dynamically scales up horizontally under load and concurrent request bursts.
  - `--concurrency=80`: Maximum concurrent requests per container instance.
- **Production Secrets Management**:
  - Managed via **Google Cloud Secret Manager** replicated in `asia-south1`.
  - Secrets injected directly into Cloud Run container environment at runtime (`BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `NEXT_PUBLIC_APP_URL`, OAuth credentials, `GCP_PROJECT_ID`, GCP credentials).
  - Production custom domain: `https://viewmarket.in`.
- **CI/CD Pipeline (`.github/workflows/deploy.yml`)**:
  - Automated continuous deployment triggered on pushes to `master`.
  - **Quality Gates**: Runs full TypeScript typechecking (`tsc --noEmit`) and Vitest test suite (`pnpm run test`).
  - **Docker Build & Push**: Multi-stage standalone Next.js 16 container built and pushed to Google Artifact Registry (`asia-south1-docker.pkg.dev/viewmarket-platform-2026/viewmarket-repo/web:${{ github.sha }}`).
  - **Cloud Run Deployment**: Deploys updated revision to Cloud Run with zero downtime rolling replacement.

## 6. System 1 AI Decision Engine (ModernBERT / AWS Mumbai)
- **Architecture**: Sub-30ms deterministic Cross-Encoder Natural Language Inference (NLI) engine powered by ModernBERT (`dleemiller/ModernCE-base-nli`).
- **Compute Cluster**: Dedicated AWS EC2 `c6a.2xlarge` (8 vCPUs AMD EPYC Milan 3.6 GHz, 16 GiB RAM) in Mumbai (`ap-south-1`) with graph-fused Microsoft ONNX Runtime.
- **Latency Performance**: 23ms – 37ms server-side single inference, 16ms/item parallel batch processing.
- **Security & Access Control**: Cryptographic constant-time authentication (`X-Internal-Secret`). Zero browser client exposure; accessed exclusively via Next.js server-side client wrapper ([`lib/decision-engine.ts`](../lib/decision-engine.ts)).
- **Integration Scope**: Voice & Chat AI agent (VA) tool gating, automated strategy rule triggering, real-time risk limit enforcement, multi-asset chart ticker scanning, and grounded RAG verification.
- **Full Specification**: See [`docs/specs/decision-engine.md`](specs/decision-engine.md) and [`docs/modernbert-infra.md`](modernbert-infra.md).

## 7. Broker Execution Gateways & Connections Suite (`/dashboard/connections`)
- **Supported Brokers (8)**: Zerodha (Kite Connect v3), Angel One (SmartAPI v2), Upstox (API v2/v3), Dhan (DhanHQ v2), Fyers (API v3), Kotak Neo (Trade API v2), ICICI Direct (Breeze API v2), and Shoonya by Finvasia (Noren API).
- **Non-Custodial BYOA Model**: Client-side AES-256 session credential storage, zero server token databases, click-to-trade mandatory confirmation.
- **Connections Tab Order**:
  1. `Overview` (`tab=overview`): Integrated services and session health monitoring.
  2. `Brokers` (`tab=brokers`): Horizontal bar-shaped expandable broker rows with real-time keyword search and market type filtering (All, NSE/BSE, Crypto).
  3. `Data Providers` (`tab=data-providers`): External market feeds.
  4. `Messaging` (`tab=messaging`): Alert destinations (Telegram, Discord, WhatsApp).
- **Technical Specification**: Comprehensive endpoint matrices, auth lifecycles, WebSocket framing protocols, ping-pong intervals, historical candle APIs, and symbol master sources documented in [`docs/brokers/INDIAN_BROKERS_SPECIFICATION.md`](brokers/INDIAN_BROKERS_SPECIFICATION.md).


