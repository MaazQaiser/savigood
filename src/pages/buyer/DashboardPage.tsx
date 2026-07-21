import { Link } from 'react-router-dom'
import { Truck, ArrowRight, TrendingUp } from 'lucide-react'
import { PageShell, PageHeader } from '@/components/layout/PageShell'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { QuoteStatusBadge, OrderStatusBadge } from '@/components/buyer/StatusBadges'
import { quotes, orders, payments, formatCurrency, formatDate } from '@/data/buyer'

function KpiCard({
  label,
  value,
  hint,
  trend,
  trendUp,
}: {
  label: string
  value: string
  hint: string
  trend?: string
  trendUp?: boolean
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardDescription className="text-xs font-medium">{label}</CardDescription>
          {trend && (
            <Badge
              variant={trendUp ? 'success' : 'destructive'}
              className="gap-0.5 font-medium tabular-nums"
            >
              <TrendingUp className={`h-3 w-3 ${trendUp ? '' : 'rotate-180'}`} />
              {trend}
            </Badge>
          )}
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight">{value}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground">{hint}</p>
      </CardContent>
    </Card>
  )
}

export function BuyerDashboardPage() {
  const activeQuotes = quotes.filter((q) => q.status === 'pending')
  const recentOrders = orders.slice(0, 3)
  const duePayments = payments.filter((p) => p.status === 'due')
  const shipments = orders.filter((o) =>
    ['shipped', 'in_transit', 'in_production'].includes(o.status)
  )

  return (
    <PageShell>
      <PageHeader
        title="Dashboard"
        description="Overview of your quotes, orders, and shipments"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard
          label="Active Quotes"
          value={String(activeQuotes.length)}
          hint="Awaiting your decision"
          trend="2 new"
          trendUp
        />
        <KpiCard
          label="Open Orders"
          value={String(
            orders.filter((o) => o.status !== 'delivered' && o.status !== 'cancelled').length
          )}
          hint="In progress"
        />
        <KpiCard
          label="In Transit"
          value={String(orders.filter((o) => o.status === 'in_transit').length)}
          hint="Shipments en route"
          trend="On track"
          trendUp
        />
        <KpiCard
          label="Payments Due"
          value={formatCurrency(duePayments.reduce((s, p) => s + p.amount, 0))}
          hint={`${duePayments.length} outstanding`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base">Active Quotes</CardTitle>
            <Button variant="ghost" size="sm" asChild className="rounded-lg">
              <Link to="/buyer/quotes" className="gap-1 text-muted-foreground">
                View all <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Quote</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeQuotes.map((q) => (
                  <TableRow key={q.id}>
                    <TableCell>
                      <Link to={`/buyer/quotes/${q.id}`} className="hover:underline">
                        <p className="font-medium text-sm">{q.title}</p>
                        <p className="font-mono text-xs text-muted-foreground">{q.id}</p>
                      </Link>
                    </TableCell>
                    <TableCell className="text-sm">{formatCurrency(q.total)}</TableCell>
                    <TableCell>
                      <QuoteStatusBadge status={q.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base">Recent Orders</CardTitle>
            <Button variant="ghost" size="sm" asChild className="rounded-lg">
              <Link to="/buyer/orders" className="gap-1 text-muted-foreground">
                View all <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((o) => (
                  <TableRow key={o.id}>
                    <TableCell>
                      <Link to={`/buyer/orders/${o.id}`} className="hover:underline">
                        <p className="font-medium text-sm">{o.title}</p>
                        <p className="font-mono text-xs text-muted-foreground">{o.id}</p>
                      </Link>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(o.createdAt)}
                    </TableCell>
                    <TableCell>
                      <OrderStatusBadge status={o.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Shipment Status</CardTitle>
            <CardDescription>Orders currently moving through fulfillment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {shipments.map((o) => {
                const current = o.shipmentSteps.find((s) => s.current)
                return (
                  <Link
                    key={o.id}
                    to={`/buyer/orders/${o.id}`}
                    className="block rounded-xl border border-border/80 bg-muted/30 p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <p className="text-sm font-medium line-clamp-1">{o.title}</p>
                        <p className="font-mono text-xs text-muted-foreground mt-0.5">{o.id}</p>
                      </div>
                      <OrderStatusBadge status={o.status} />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Truck className="h-3.5 w-3.5 shrink-0 text-primary" />
                      <span>{current?.label ?? 'Processing'}</span>
                    </div>
                    {o.estimatedDelivery && (
                      <p className="mt-2 text-xs text-muted-foreground">
                        ETA {formatDate(o.estimatedDelivery)}
                      </p>
                    )}
                  </Link>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
