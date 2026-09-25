import type { ReactNode } from "react"
import { IstClock } from "./ist-clock"

interface ChartsFooterProps {
  children?: ReactNode
}

export function ChartsFooter({ children }: ChartsFooterProps) {
  return (
    <footer className="flex h-10 shrink-0 items-center justify-between border-t border-border/60 bg-background px-3 select-none">
      <div className="flex items-center gap-2">
        {children}
      </div>
      <div className="flex items-center">
        <IstClock />
      </div>
    </footer>
  )
}
