import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageShell, PageHeader } from '@/components/layout/PageShell'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DataToolbar } from '@/components/ui/data-toolbar'
import { Pagination, usePagination } from '@/components/ui/pagination'
import { RowActions } from '@/components/ui/row-actions'
import { OrderStatusBadge } from '@/components/buyer/StatusBadges'
import { orders, formatCurrency, formatDate } from '@/data/buyer'

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'processing', label: 'Processing' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
]

export function OrderListPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return orders.filter(
      (o) =>
        (!q || o.title.toLowerCase().includes(q) || o.id.toLowerCase().includes(q)) &&
        (!status || o.status === status)
    )
  }, [search, status])

  const { page, totalPages, pageSize, totalItems, paginated, setPage } = usePagination(filtered, 5)

  return (
    <PageShell>
      <PageHeader
        title="Orders"
        description="Track order status and shipments"
        breadcrumb={[{ label: 'Orders' }]}
      />

      <Card>
        <div className="px-4 pt-4 pb-2">
          <DataToolbar
            searchValue={search}
            onSearchChange={(v) => { setSearch(v); setPage(1) }}
            searchPlaceholder="Search orders…"
            statusOptions={STATUS_OPTIONS}
            statusValue={status}
            onStatusChange={(v) => { setStatus(v); setPage(1) }}
          />
        </div>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Created</TableHead>
                <TableHead className="hidden sm:table-cell">Total</TableHead>
                <TableHead className="hidden lg:table-cell">Balance Due</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map((o) => (
                <TableRow
                  key={o.id}
                  className="group cursor-pointer"
                  onClick={() => navigate(`/buyer/orders/${o.id}`)}
                >
                  <TableCell className="font-mono text-xs">{o.id}</TableCell>
                  <TableCell className="font-medium max-w-[120px] sm:max-w-none truncate">
                    {o.title}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                    {formatDate(o.createdAt)}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{formatCurrency(o.total)}</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {o.balanceDue > 0 ? (
                      <span className="font-medium">{formatCurrency(o.balanceDue)}</span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <OrderStatusBadge status={o.status} />
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <RowActions
                      actions={[
                        { label: 'View details', onClick: () => navigate(`/buyer/orders/${o.id}`) },
                        ...(o.balanceDue > 0
                          ? [{ label: 'Pay balance', onClick: () => navigate(`/buyer/payments/balance?orderId=${o.id}`) }]
                          : []),
                        { label: 'Copy ID', onClick: () => navigator.clipboard?.writeText(o.id) },
                      ]}
                    />
                  </TableCell>
                </TableRow>
              ))}
              {paginated.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="py-12 text-center text-muted-foreground text-sm">
                    No orders match your filters.
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
