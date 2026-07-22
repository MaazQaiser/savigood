import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { PageShell, PageHeader } from '@/components/layout/PageShell'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DataToolbar } from '@/components/ui/data-toolbar'
import { Pagination, usePagination } from '@/components/ui/pagination'
import { RowActions } from '@/components/ui/row-actions'
import { QuoteStatusBadge } from '@/components/buyer/StatusBadges'
import { adminQuotes, formatCurrency, formatDate } from '@/data/admin'

const STATUS_OPTIONS = [
  { value: 'pending-review', label: 'Pending review' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'expired', label: 'Expired' },
]

export function AdminQuoteListPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return adminQuotes.filter(
      (item) =>
        (!q ||
          item.title.toLowerCase().includes(q) ||
          item.id.toLowerCase().includes(q) ||
          item.clientName.toLowerCase().includes(q)) &&
        (!status || item.status === status)
    )
  }, [search, status])

  const { page, totalPages, pageSize, totalItems, paginated, setPage } = usePagination(filtered, 10)

  return (
    <PageShell>
      <PageHeader
        title="Quotes"
        description="Build and manage buyer quotes"
        breadcrumb={[{ label: 'Quotes' }]}
        actions={
          <Button asChild className="gap-1.5">
            <Link to="/admin/quotes/new">
              <Plus className="h-4 w-4" />
              Create quote
            </Link>
          </Button>
        }
      />

      <Card>
        <div className="px-4 pt-4 pb-2">
          <DataToolbar
            searchValue={search}
            onSearchChange={(v) => { setSearch(v); setPage(1) }}
            searchPlaceholder="Search quotes…"
            statusOptions={STATUS_OPTIONS}
            statusValue={status}
            onStatusChange={(v) => { setStatus(v); setPage(1) }}
          />
        </div>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden sm:table-cell">Quote ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Client</TableHead>
                <TableHead className="hidden lg:table-cell">Created</TableHead>
                <TableHead className="hidden lg:table-cell">Valid Until</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map((q) => (
                <TableRow
                  key={q.id}
                  className="group cursor-pointer"
                  onClick={() => navigate(`/admin/quotes/${q.id}/edit`)}
                >
                  <TableCell className="hidden sm:table-cell font-mono text-xs">{q.id}</TableCell>
                  <TableCell className="font-medium max-w-[140px] truncate sm:max-w-none">
                    {q.title}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm">{q.clientName}</TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                    {formatDate(q.createdAt)}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                    {formatDate(q.validUntil)}
                  </TableCell>
                  <TableCell>{formatCurrency(q.total)}</TableCell>
                  <TableCell>
                    <QuoteStatusBadge status={q.status} />
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <RowActions
                      actions={[
                        { label: 'Edit quote', onClick: () => navigate(`/admin/quotes/${q.id}/edit`) },
                        { label: 'Duplicate', onClick: () => {} },
                        { label: 'Copy ID', onClick: () => navigator.clipboard?.writeText(q.id) },
                      ]}
                    />
                  </TableCell>
                </TableRow>
              ))}
              {paginated.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="py-12 text-center text-muted-foreground text-sm">
                    No quotes match your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>

        <div className="px-4">
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            pageSize={pageSize}
            totalItems={totalItems}
          />
        </div>
      </Card>
    </PageShell>
  )
}
