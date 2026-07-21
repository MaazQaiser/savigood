import { Link } from 'react-router-dom'
import { PageShell, PageHeader } from '@/components/layout/PageShell'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { OrderStatusBadge } from '@/components/buyer/StatusBadges'
import { orders, formatCurrency, formatDate } from '@/data/buyer'

export function OrderListPage() {
  return (
    <PageShell>
      <PageHeader
        title="Orders"
        description="Track order status and shipments"
        breadcrumb={[{ label: 'Orders' }]}
      />

      <Card>
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
                <TableHead className="w-16 sm:w-24" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((o) => (
                <TableRow key={o.id}>
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
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/buyer/orders/${o.id}`}>View</Link>
                    </Button>
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
