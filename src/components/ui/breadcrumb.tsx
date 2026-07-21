import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  const homeHref = items[0]?.href?.startsWith('/admin') ? '/admin/dashboard' : '/buyer/dashboard'

  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center overflow-x-auto', className)}>
      <ol className="flex items-center gap-1 text-sm text-muted-foreground whitespace-nowrap">
        <li>
          <Link to={homeHref} className="flex items-center hover:text-foreground transition-colors">
            <Home className="h-3.5 w-3.5" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex items-center gap-1">
            <ChevronRight className="h-3.5 w-3.5 opacity-50 shrink-0" />
            {item.href && i < items.length - 1 ? (
              <Link to={item.href} className="hover:text-foreground transition-colors">
                {item.label}
              </Link>
            ) : (
              <span
                className={cn(
                  'truncate max-w-[140px] sm:max-w-none',
                  i === items.length - 1 && 'text-foreground font-medium'
                )}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
