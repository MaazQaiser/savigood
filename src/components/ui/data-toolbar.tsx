import { Search } from 'lucide-react'
import { Input } from './input'
import { cn } from '@/lib/utils'

interface FilterOption {
  value: string
  label: string
}

interface DataToolbarProps {
  searchValue?: string
  onSearchChange?: (value: string) => void
  searchPlaceholder?: string
  statusOptions?: FilterOption[]
  statusValue?: string
  onStatusChange?: (value: string) => void
  dateValue?: string
  onDateChange?: (value: string) => void
  children?: React.ReactNode
  className?: string
}

export function DataToolbar({
  searchValue = '',
  onSearchChange,
  searchPlaceholder = 'Search…',
  statusOptions,
  statusValue = '',
  onStatusChange,
  dateValue = '',
  onDateChange,
  children,
  className,
}: DataToolbarProps) {
  return (
    <div className={cn('flex flex-col sm:flex-row gap-2', className)}>
      {/* Search */}
      <div className="relative flex-1 min-w-0 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => onSearchChange?.(e.target.value)}
          className="pl-9 h-9 rounded-xl bg-muted/50 border-border/60 focus-visible:ring-1 shadow-none"
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        {statusOptions && statusOptions.length > 0 && (
          <select
            value={statusValue}
            onChange={(e) => onStatusChange?.(e.target.value)}
            className={cn(
              'h-9 rounded-xl border border-border/60 bg-card px-3 text-sm text-foreground',
              'focus:outline-none focus:ring-1 focus:ring-ring',
              'shadow-none appearance-none cursor-pointer',
              !statusValue && 'text-muted-foreground'
            )}
            style={{ minWidth: '140px' }}
          >
            <option value="">All statuses</option>
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        )}

        {onDateChange !== undefined && (
          <input
            type="date"
            value={dateValue}
            onChange={(e) => onDateChange(e.target.value)}
            className={cn(
              'h-9 rounded-xl border border-border/60 bg-card px-3 text-sm text-foreground',
              'focus:outline-none focus:ring-1 focus:ring-ring',
              'shadow-none cursor-pointer',
              !dateValue && 'text-muted-foreground'
            )}
          />
        )}

        {children}
      </div>
    </div>
  )
}
