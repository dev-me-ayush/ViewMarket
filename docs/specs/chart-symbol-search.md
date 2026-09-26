# Symbol Search Dialog (TradingView-type)

**Status**: Accepted (Phase 1 built 2026-09-26; Phase 2 deferred)
**Date**: 2026-09-26
**Scope**: `/charts` header symbol button → command-palette dialog

## Goal

Clicking the symbol button in the chart header opens a TradingView-style
search dialog. Phase 1 runs on demo symbols only. Phase 2 plugs in live
broker instrument masters without changing the dialog contract.

## UX spec

- **Trigger**: symbol button in `ChartsToolbarLeft`, plus `/` shortcut.
  Esc closes, click-outside closes.
- **Layout**: centered dialog, max-w-lg. Search input on top with autofocus.
  Results below, grouped. Footer hint: `↑↓ navigate · Enter select · Esc close`.
- **Sections** (in order):
  1. `Recent` — last 5 selections from `localStorage` (`vm:recent-symbols`).
     Shown only when query is empty and recents exist.
  2. `Indices`, then `Stocks` — demo list, filtered by query.
  3. Empty state: `No symbols match "<query>"`.
- **Row**: symbol (semibold) + full name (muted), exchange badge (`NSE`),
  type tag (`Index` / `Equity`). Active row highlighted, check on selected.
- **Keyboard**: ↑↓ moves active, Enter selects, Esc closes. Active resets
  to first result on each keystroke.
- **Select**: updates header label, snapshot meta (`symbol`, `exchange`),
  persists to recents + `vm:chart-symbol`. Chart candles stay sample data
  (label-only switch, same honesty rule as timeframe).

## Data model

```ts
interface SymbolEntry {
  symbol: string      // "RELIANCE"
  name: string        // "Reliance Industries"
  exchange: "NSE" | "BSE"
  type: "Index" | "Equity"
}
```

Phase 1 list (~20, `chart-demo-symbols.ts`): NIFTY 50, NIFTY BANK,
FINNIFTY, INDIA VIX, RELIANCE, HDFCBANK, ICICIBANK, SBIN, INFY, TCS,
TATAMOTORS, TITAN, ASIANPAINT, AXISBANK, KOTAKBANK, LT, MARUTI, SUNPHARMA,
TATASTEEL, ULTRACEMCO.

## Phase 1 files (all in `app/charts/_components/`)

| File | Lines | Role |
|---|---|---|
| `chart-demo-symbols.ts` | ~40 | `SymbolEntry[]` demo list |
| `use-chart-symbol.ts` | ~45 | selected symbol + recents, `localStorage` |
| `symbol-search-dialog.tsx` | ~120 | Base UI `Dialog` + search + keyboard |
| `components/ui/dialog.tsx` | ~60 | shared Base UI dialog primitive (new) |

`ChartsToolbarLeft` renders the trigger + dialog; `ChartsShell` owns state
and feeds `snapshotMeta`. Zero new npm deps (`@base-ui/react` already present).

## Phase 2 (deferred, feed required)

- Replace `chart-demo-symbols.ts` source with broker instrument master
  (per connected broker, client-side fetch, BYOA — no token storage).
- Add `Favorites` section (star toggle, `localStorage`).
- Add live LTP/ Equations: LTP + day-change in rows (poll, debounced).
- Virtualize list past ~200 rows (`@tanstack/react-virtual` or paging).
- Dialog contract unchanged: it consumes `SymbolEntry[]` + `onSelect`.

## Acceptance criteria

1. Click or `/` opens dialog with autofocus; Esc closes.
2. Typing `rel` shows RELIANCE first; Enter selects it.
3. Header + snapshot filename reflect selection after reload (persisted).
4. `npx tsc --noEmit` clean; every touched file under caps.

## Non-goals

Volume sparklines, multi-exchange search, option-chain entries,
server-side search API.
