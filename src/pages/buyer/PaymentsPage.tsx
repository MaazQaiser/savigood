import { Link } from 'react-router-dom'
import { PageShell, PageHeader } from '@/components/layout/PageShell'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { PaymentStatusBadge } from '@/components/buyer/StatusBadges'
import { payments, formatCurrency, formatDate } from '@/data/buyer'

export function PaymentsPage() {
  const due = payments.filter((p) => p.status === 'due' || p.status === 'overdue')
  const paid = payments.filter((p) => p.status === 'paid')
  const dueTotal = due.reduce((s, p) => s + p.amount, 0)

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
            <p className="text-xs text-muted-foreground">{due.length} payment{due.length !== 1 ? 's' : ''} due</p>
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
        <CardHeader>
          <CardTitle className="text-base">Payment schedule</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead className="hidden sm:table-cell">Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="hidden md:table-cell">Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-20 sm:w-28" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((p) => (
                <TableRow key={p.id}>
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
                    {(p.status === 'due' || p.status === 'overdue') && (
                      <Button size="sm" asChild>
                        <Link
                          to={
                            p.type === 'deposit'
                              ? `/buyer/payments/deposit?orderId=${p.orderId}`
                              : `/buyer/payments/balance?orderId=${p.orderId}&paymentId=${p.id}`
                          }
                        >
                          Pay now
                        </Link>
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </PageShell>
  )
}
