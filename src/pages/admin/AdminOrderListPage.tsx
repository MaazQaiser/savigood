import { Link } from 'react-router-dom'
import { PageShell, PageHeader } from '@/components/layout/PageShell'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { OrderStatusBadge } from '@/components/buyer/StatusBadges'
import { adminOrders, formatCurrency, formatDate } from '@/data/admin'

export function AdminOrderListPage() {
  return (
    <PageShell>
      <PageHeader
        title="Orders"
        description="Manage fulfillment across all buyers"
        breadcrumb={[{ label: 'Orders' }]}
      />

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Client</TableHead>
                <TableHead className="hidden lg:table-cell">Created</TableHead>
                <TableHead className="hidden sm:table-cell">Total</TableHead>
                <TableHead className="hidden lg:table-cell">Balance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-16 sm:w-24" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminOrders.map((o) => (
                <TableRow key={o.id}>
                  <TableCell className="font-mono text-xs">{o.id}</TableCell>
                  <TableCell className="font-medium max-w-[120px] truncate sm:max-w-none">
                    {o.title}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm">{o.clientName}</TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                    {formatDate(o.createdAt)}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{formatCurrency(o.total)}</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {o.balanceDue > 0 ? formatCurrency(o.balanceDue) : '—'}
                  </TableCell>
                  <TableCell>
                    <OrderStatusBadge status={o.status} />
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/admin/orders/${o.id}`}>View</Link>
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
