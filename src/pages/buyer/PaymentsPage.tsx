import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageShell, PageHeader } from '@/components/layout/PageShell'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { DataToolbar } from '@/components/ui/data-toolbar'
import { Pagination, usePagination } from '@/components/ui/pagination'
import { RowActions } from '@/components/ui/row-actions'
import { PaymentStatusBadge } from '@/components/buyer/StatusBadges'
import { payments, formatCurrency, formatDate } from '@/data/buyer'

const STATUS_OPTIONS = [
  { value: 'due', label: 'Due' },
  { value: 'overdue', label: 'Overdue' },
  { value: 'paid', label: 'Paid' },
]

export function PaymentsPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')

  const due = payments.filter((p) => p.status === 'due' || p.status === 'overdue')
  const paid = payments.filter((p) => p.status === 'paid')
  const dueTotal = due.reduce((s, p) => s + p.amount, 0)

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return payments.filter(
      (p) =>
        (!q || p.orderTitle.toLowerCase().includes(q) || p.orderId.toLowerCase().includes(q)) &&
        (!status || p.status === status)
    )
  }, [search, status])

  const { page, totalPages, pageSize, totalItems, paginated, setPage } = usePagination(filtered, 10)

  return (
    <PageShell>
      <PageHeader
        title="Payments"
        description="Manage deposits and balance payments"
        breadcrumb={[{ label: 'Payments' }]}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Outstanding</CardDescription>
            <CardTitle className="text-2xl font-bold">{formatCurrency(dueTotal)}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              {due.length} payment{due.length !== 1 ? 's' : ''} due
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Paid (recent)</CardDescription>
            <CardTitle className="text-2xl font-bold">
              {formatCurrency(paid.reduce((s, p) => s + p.amount, 0))}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">{paid.length} completed</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Payment schedule</CardTitle>
        </CardHeader>
        <div className="px-4 pb-2">
          <DataToolbar
            searchValue={search}
            onSearchChange={(v) => { setSearch(v); setPage(1) }}
            searchPlaceholder="Search by order…"
            statusOptions={STATUS_OPTIONS}
            statusValue={status}
            onStatusChange={(v) => { setStatus(v); setPage(1) }}
          />
        </div>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead className="hidden sm:table-cell">Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="hidden md:table-cell">Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map((p) => (
                <TableRow key={p.id} className="group">
                  <TableCell>
                    <p className="font-medium text-sm max-w-[140px] sm:max-w-none truncate">
                      {p.orderTitle}
                    </p>
                    <p className="font-mono text-xs text-muted-foreground">{p.orderId}</p>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant="outline" className="capitalize">
                      {p.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{formatCurrency(p.amount)}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                    {formatDate(p.dueDate)}
                  </TableCell>
                  <TableCell>
                    <PaymentStatusBadge status={p.status} />
                  </TableCell>
                  <TableCell>
                    <RowActions
                      actions={[
                        ...(p.status === 'due' || p.status === 'overdue'
                          ? [{
                              label: 'Pay now',
                              onClick: () =>
                                navigate(
                                  p.type === 'deposit'
                                    ? `/buyer/payments/deposit?orderId=${p.orderId}`
                                    : `/buyer/payments/balance?orderId=${p.orderId}&paymentId=${p.id}`
                                ),
                            }]
                          : []),
                        {
                          label: 'View order',
                          onClick: () => navigate(`/buyer/orders/${p.orderId}`),
                        },
                      ]}
                    />
                  </TableCell>
                </TableRow>
              ))}
              {paginated.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="py-12 text-center text-muted-foreground text-sm">
                    No payments match your filters.
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
