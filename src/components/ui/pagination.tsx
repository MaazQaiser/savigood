import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './button'
import { cn } from '@/lib/utils'

interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  pageSize?: number
  totalItems?: number
  className?: string
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  pageSize,
  totalItems,
  className,
}: PaginationProps) {
  // Always render — row count is always shown; page buttons only appear when needed
  const start = pageSize ? (page - 1) * pageSize + 1 : null
  const end = pageSize && totalItems ? Math.min(page * pageSize, totalItems) : null

  const pages = totalPages > 1
    ? Array.from({ length: totalPages }, (_, i) => i + 1)
        .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
        .reduce<(number | '…')[]>((acc, p, idx, arr) => {
          if (idx > 0 && (arr[idx - 1] as number) + 1 < p) acc.push('…')
          acc.push(p)
          return acc
        }, [])
    : []

  return (
    <div className={cn('flex items-center justify-between border-t border-border/60 px-1 py-2.5', className)}>
      {/* Always-visible row count */}
      <p className="text-xs text-muted-foreground">
        {start && end && totalItems
          ? `Showing ${start}–${end} of ${totalItems} rows`
          : totalItems
          ? `${totalItems} row${totalItems !== 1 ? 's' : ''}`
          : `Page ${page} of ${totalPages}`}
      </p>

      {/* Page buttons — only when more than 1 page */}
      {totalPages > 1 && (
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-lg"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous</span>
          </Button>

          {pages.map((p, i) =>
            p === '…' ? (
              <span key={`ellipsis-${i}`} className="px-1 text-xs text-muted-foreground">
                …
              </span>
            ) : (
              <Button
                key={p}
                variant={p === page ? 'default' : 'ghost'}
                size="icon"
                className="h-8 w-8 rounded-lg text-xs"
                onClick={() => onPageChange(p as number)}
              >
                {p}
              </Button>
            )
          )}

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-lg"
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next</span>
          </Button>
        </div>
      )}
    </div>
  )
}

export function usePagination<T>(items: T[], pageSize = 5) {
  const [page, setPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize))
  const safePage = Math.min(page, totalPages)
  const paginated = items.slice((safePage - 1) * pageSize, safePage * pageSize)

  return {
    page: safePage,
    totalPages,
    pageSize,
    totalItems: items.length,
    paginated,
    setPage: (p: number) => setPage(Math.max(1, Math.min(p, totalPages))),
  }
}
