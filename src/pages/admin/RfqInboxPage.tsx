import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageShell, PageHeader } from '@/components/layout/PageShell'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DataToolbar } from '@/components/ui/data-toolbar'
import { Pagination, usePagination } from '@/components/ui/pagination'
import { RowActions } from '@/components/ui/row-actions'
import { RfqStatusBadge } from '@/components/admin/StatusBadges'
import { rfqs, formatDate } from '@/data/admin'

const STATUS_OPTIONS = [
  { value: 'new', label: 'New' },
  { value: 'reviewing', label: 'Reviewing' },
  { value: 'quoted', label: 'Quoted' },
  { value: 'closed', label: 'Closed' },
]

export function RfqInboxPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return rfqs.filter(
      (r) =>
        (!q ||
          r.title.toLowerCase().includes(q) ||
          r.id.toLowerCase().includes(q) ||
          r.clientName.toLowerCase().includes(q)) &&
        (!status || r.status === status)
    )
  }, [search, status])

  const { page, totalPages, pageSize, totalItems, paginated, setPage } = usePagination(filtered, 10)

  return (
    <PageShell>
      <PageHeader
        title="RFQ Inbox"
        description="Incoming requests for quote"
        breadcrumb={[{ label: 'RFQs' }]}
      />

      <Card>
        <div className="px-4 pt-4 pb-2">
          <DataToolbar
            searchValue={search}
            onSearchChange={(v) => { setSearch(v); setPage(1) }}
            searchPlaceholder="Search RFQs…"
            statusOptions={STATUS_OPTIONS}
            statusValue={status}
            onStatusChange={(v) => { setStatus(v); setPage(1) }}
          />
        </div>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden sm:table-cell">RFQ ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Client</TableHead>
                <TableHead className="hidden md:table-cell">Received</TableHead>
                <TableHead className="hidden lg:table-cell">Needed by</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map((r) => (
                <TableRow
                  key={r.id}
                  className="group cursor-pointer"
                  onClick={() => navigate(`/admin/rfqs/${r.id}`)}
                >
                  <TableCell className="hidden sm:table-cell font-mono text-xs">{r.id}</TableCell>
                  <TableCell className="font-medium max-w-[140px] truncate sm:max-w-none">
                    {r.title}
                  </TableCell>
                  <TableCell className="text-sm">{r.clientName}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                    {formatDate(r.createdAt)}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                    {r.neededBy ? formatDate(r.neededBy) : '—'}
                  </TableCell>
                  <TableCell>
                    <RfqStatusBadge status={r.status} />
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <RowActions
                      actions={[
                        { label: 'View RFQ', onClick: () => navigate(`/admin/rfqs/${r.id}`) },
                        { label: 'Create quote', onClick: () => navigate('/admin/quotes/new') },
                        { label: 'Copy ID', onClick: () => navigator.clipboard?.writeText(r.id) },
                      ]}
                    />
                  </TableCell>
                </TableRow>
              ))}
              {paginated.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="py-12 text-center text-muted-foreground text-sm">
                    No RFQs match your filters.
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
