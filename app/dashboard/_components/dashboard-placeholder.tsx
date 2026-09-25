import type { ReactNode } from "react"

type DashboardPlaceholderProps = {
  eyebrow: string
  title: string
  description: string
  children?: ReactNode
}

export function DashboardPlaceholder({
  eyebrow,
  title,
  description,
  children,
}: DashboardPlaceholderProps) {
  return (
    <div className="px-3 py-3 lg:px-4">
      <div className="rounded-2xl border bg-card p-5 md:p-6">
        <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        {children ? <div className="mt-6">{children}</div> : null}
      </div>
    </div>
  )
}
