# Specification: Enterprise Better Auth + Google Cloud Firestore Integration

## 1. System Overview & Architecture

ViewMarket requires a production-grade, secure authentication system supporting Google and GitHub social logins. The system is backed by Google Cloud Firestore (provisioned in `asia-south1` - Mumbai) running on Next.js 16 (App Router, React 19).

```mermaid
flowchart TD
    Browser["User Browser / Client"] -->|HTTPS| EdgeMW["Next.js Middleware (middleware.ts)"]
    EdgeMW -->|Public Route| Landing["Landing Page (/) / Legal (/legal/*)"]
    EdgeMW -->|Unauthenticated & /dashboard/*| BounceSignIn["Redirect -> /sign-in?callbackUrl=..."]
    EdgeMW -->|Authenticated & /sign-in| BounceDash["Redirect -> /dashboard/overview"]
    
    Browser -->|OAuth Login Click| AuthAPI["Better Auth API Route (/api/auth/[...all])"]
    AuthAPI -->|OAuth Handshake (PKCE)| Providers["Google / GitHub OAuth Server"]
    Providers -->|OAuth Callback + Tokens| AuthAPI
    AuthAPI -->|Persist User & Session| Firestore[("Google Cloud Firestore (asia-south1)\n- users\n- sessions\n- accounts\n- verifications")]
    AuthAPI -->|Set HttpOnly Cookie| Browser

    Landing -->|Client Hook useSession()| NavAuth["Adaptive Nav Header (Sign In vs Dashboard)"]
```

---

## 2. Infrastructure & Environment Configuration

### Provisioned GCP Resources
- **GCP Project ID**: `viewmarket-platform-2026`
- **Location**: `asia-south1` (Mumbai, low-latency for Indian markets NSE/BSE)
- **Database**: Firestore Native Mode (`(default)`, standard edition, free tier enabled)
- **Service Account**: `viewmarket-app@viewmarket-platform-2026.iam.gserviceaccount.com`
- **Role Binding**: `roles/datastore.user`

### Local Environment (`.env.local`)
```env
# Better Auth Core
BETTER_AUTH_SECRET="<generated-cryptographic-entropy>"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Social OAuth Credentials
GOOGLE_CLIENT_ID="<your-google-oauth-client-id>"
GOOGLE_CLIENT_SECRET="<your-google-oauth-client-secret>"
GITHUB_CLIENT_ID="<your-github-oauth-client-id>"
GITHUB_CLIENT_SECRET="<your-github-oauth-client-secret>"

# GCP Firestore Service Account Credentials
GCP_PROJECT_ID="viewmarket-platform-2026"
GCP_CLIENT_EMAIL="viewmarket-app@viewmarket-platform-2026.iam.gserviceaccount.com"
GCP_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

---

## 3. Database Schema (Firestore Collections)

Better Auth models collections in Firestore under 4 core tables:

1. **`users` Collection**:
   - `id`: string (UUID)
   - `name`: string
   - `email`: string (indexed, unique)
   - `emailVerified`: boolean
   - `image`: string (avatar URL)
   - `createdAt`: Timestamp
   - `updatedAt`: Timestamp

2. **`sessions` Collection**:
   - `id`: string (session token identifier)
   - `userId`: string (foreign key to `users.id`)
   - `token`: string (hashed session token)
   - `expiresAt`: Timestamp (sliding 30-day expiration)
   - `ipAddress`: string
   - `userAgent`: string
   - `createdAt`: Timestamp
   - `updatedAt`: Timestamp

3. **`accounts` Collection**:
   - `id`: string
   - `userId`: string (foreign key to `users.id`)
   - `accountId`: string (OAuth provider's user ID)
   - `providerId`: `"google"` | `"github"`
   - `accessToken`: string (encrypted)
   - `refreshToken`: string (encrypted)
   - `accessTokenExpiresAt`: Timestamp
   - `createdAt`: Timestamp
   - `updatedAt`: Timestamp

4. **`verifications` Collection**:
   - `id`: string
   - `identifier`: string
   - `value`: string
   - `expiresAt`: Timestamp

---

## 4. Session Persistence & Security Hardening

### A. Sliding Window Session Persistence
To ensure that an already authenticated user does not repeatedly sign in:
- **Lifespan (`expiresIn`)**: 30 days (`2592000` seconds).
- **Rolling Update Window (`updateAge`)**: 1 day (`86400` seconds). Every active visit refreshes the cookie expiration date seamlessly.
- **Cookie Security Policy**:
  - `HttpOnly`: true (JavaScript inaccessible, immune to XSS theft).
  - `Secure`: true in production (HTTPS-only).
  - `SameSite`: `"lax"` (Strict protection against CSRF while enabling smooth OAuth cross-origin redirects).
  - Prefix: `__Host-` in production (ensures domain-bound and root path scope).

### B. Threat Mitigations
- **Open Redirect Protection**: Post-login redirect targets are strictly validated against an internal route whitelist (`/dashboard/overview`, `/dashboard/*`). External redirects are blocked.
- **PKCE (Proof Key for Code Exchange)**: Enforced on all OAuth 2.0 exchanges to prevent authorization code interception attacks.
- **Broker Vault Isolation**: In compliance with ViewMarket's non-custodial doctrine, any broker credentials stored in Firestore must reside in a separate encrypted collection (`vault`) utilizing Google Cloud KMS envelope encryption.

---

## 5. User Flows & Navigation UX

### Flow 1: Adaptive Landing Page Header
1. User visits `/`.
2. Header initializes with optimistic client state (`useSession()`).
3. While loading: Clean skeleton pill placeholder (matching exact layout bounds, 0px Cumulative Layout Shift).
4. **If Unauthenticated**:
   - Shows `"Sign In"` button (links to `/sign-in`).
   - Shows `"Launch Studio"` button.
5. **If Authenticated**:
   - Shows `"Dashboard"` button (links to `/dashboard/overview`).
   - Shows user avatar with dropdown (Name, Email, `"Sign Out"` action).

### Flow 2: Sign-in Redirection Matrix
- **Unauthenticated visiting `/sign-in`**:
  - Displays social login buttons for GitHub and Google.
  - Clicking a provider dispatches `signIn.social({ provider, callbackURL: "/dashboard/overview" })`.
  - On OAuth completion $\to$ immediately redirects to `/dashboard/overview`.
- **Already Authenticated visiting `/sign-in`**:
  - Middleware intercepts and immediately bounces to `/dashboard/overview`.
- **Unauthenticated accessing `/dashboard/*`**:
  - Middleware intercepts and bounces to `/sign-in?callbackUrl=<target_path>`.

---

## 6. Implementation Checklist & Files

1. **Dependencies**:
   - `pnpm add better-auth @google-cloud/firestore`
2. **Database & Auth Initialization**:
   - [lib/firestore.ts](file:///c:/Users/medev/Desktop/viewmarket/lib/firestore.ts): Firestore singleton instance initialized with service account from `.env.local`.
   - [lib/auth.ts](file:///c:/Users/medev/Desktop/viewmarket/lib/auth.ts): Better Auth server configuration with Google, GitHub, and Firestore adapter.
   - [lib/auth-client.ts](file:///c:/Users/medev/Desktop/viewmarket/lib/auth-client.ts): Client hooks (`useSession`, `signIn`, `signOut`).
3. **Route Handlers & Middleware**:
   - `app/api/auth/[...all]/route.ts`: Better Auth catch-all HTTP handler.
   - `middleware.ts`: Next.js Edge route guard.
4. **Component Updates**:
   - [components/Header.tsx](file:///c:/Users/medev/Desktop/viewmarket/components/Header.tsx): Incorporate `NavAuth` component.
   - [components/NavAuth.tsx](file:///c:/Users/medev/Desktop/viewmarket/components/NavAuth.tsx): Client-side leaf switching between Sign In and Dashboard buttons.
   - [components/HeaderMenu.tsx](file:///c:/Users/medev/Desktop/viewmarket/components/HeaderMenu.tsx): Mobile drawer mirror of `NavAuth`.
   - [app/sign-in/_components/social-auth-buttons.tsx](file:///c:/Users/medev/Desktop/viewmarket/app/sign-in/_components/social-auth-buttons.tsx): Connect active Better Auth social sign-in methods with loading states.
5. **Verification & Testing**:
   - E2E auth matrix verification.
   - Strict TypeScript compile (`npx tsc --noEmit`).
   - Sizing compliance checks (all files < 200 lines).
