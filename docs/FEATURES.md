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

## 3. Authentication Surface (`/sign-in`)
- Custom split-screen authentication architecture tailored to ViewMarket's sovereign branding.
- **Pure Sign-In Layout**: Streamlined dedicated sign-in interface without sign-up toggles at `/sign-in`.
- **Left Panel (50% on desktop)**: Full-height architectural celestial observatory artwork asset with glowing "VM" continuous loop (`public/assets/auth-illustration.png`), responsive (hidden on mobile, visible on `lg:` 50% split).
- **Right Panel (50% on desktop, 100% on mobile)**: Brand header linking to `/`, centered OAuth social buttons (GitHub and Google) wired to redirect directly to `/dashboard/overview`, and statutory Terms and Privacy links.
- **Navigation Redirection**: Global desktop navigation bar and mobile drawer "Sign In" buttons navigate directly to `/sign-in`. Legacy `/signin` and `/login` routes automatically redirect to `/sign-in`.

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
