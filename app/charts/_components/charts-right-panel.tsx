import type { ReactNode } from "react"

interface ChartsRightPanelProps {
  children?: ReactNode
}

export function ChartsRightPanel({ children }: ChartsRightPanelProps) {
  return (
    <aside className="flex w-10 shrink-0 flex-col items-center border-l border-border/60 bg-background select-none">
      {children}
    </aside>
  )
}
