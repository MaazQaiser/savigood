import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Breadcrumb } from '@/components/ui/breadcrumb'

interface PageHeaderProps {
  title: string
  description?: string
  breadcrumb?: { label: string; href?: string }[]
  actions?: ReactNode
  className?: string
}

export function PageHeader({ title, description, breadcrumb, actions, className }: PageHeaderProps) {
  return (
    <div className={cn('mb-6', className)}>
      {breadcrumb && breadcrumb.length > 0 && (
        <Breadcrumb items={breadcrumb} className="mb-3" />
      )}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-h2 font-semibold tracking-tight">{title}</h1>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2 shrink-0">{actions}</div>}
      </div>
    </div>
  )
}

export function PageShell({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full animate-fade-in', className)}>
      {children}
    </div>
  )
}
