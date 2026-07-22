import { Link } from 'react-router-dom'
import { Truck, ArrowRight, TrendingUp, TrendingDown, FileText, Package, CreditCard, Zap } from 'lucide-react'
import type { ElementType } from 'react'
import { PageShell, PageHeader } from '@/components/layout/PageShell'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { QuoteStatusBadge, OrderStatusBadge } from '@/components/buyer/StatusBadges'
import { quotes, orders, payments, formatCurrency, formatDate } from '@/data/buyer'
import { cn } from '@/lib/utils'

function KpiCard({
  label,
  value,
  hint,
  icon: Icon,
  iconColor,
  trend,
  trendUp,
  href,
}: {
  label: string
  value: string
  hint: string
  icon: ElementType
  iconColor: string
  trend?: string
  trendUp?: boolean
  href?: string
}) {
  return (
    <Card className="relative overflow-hidden">
      <CardContent className="pt-5 pb-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
            <p className="mt-1.5 text-[1.75rem] font-bold tracking-tight leading-none">{value}</p>
            <p className="mt-2 text-xs text-muted-foreground">{hint}</p>
            {trend && (
              <div className={cn('flex items-center gap-1 mt-2 text-xs font-medium', trendUp ? 'text-success' : 'text-destructive')}>
                {trendUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {trend}
              </div>
            )}
          </div>
          <div className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-xl', iconColor)}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
        {href && (
          <Link
            to={href}
            className="mt-3 block text-xs text-primary hover:underline"
          >
            View all →
          </Link>
        )}
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
        title="Welcome back, Alex"
        description="Here's what needs your attention today."
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <KpiCard
          label="Active Quotes"
          value={String(activeQuotes.length)}
          hint="Awaiting your decision"
          icon={FileText}
          iconColor="bg-primary/10 text-primary"
          trend="2 new this week"
          trendUp
          href="/buyer/quotes"
        />
        <KpiCard
          label="Open Orders"
          value={String(orders.filter((o) => o.status !== 'delivered' && o.status !== 'cancelled').length)}
          hint="In progress"
          icon={Package}
          iconColor="bg-sky-50 text-sky-600"
          href="/buyer/orders"
        />
        <KpiCard
          label="In Transit"
          value={String(orders.filter((o) => o.status === 'in_transit').length)}
          hint="Shipments en route"
          icon={Truck}
          iconColor="bg-emerald-50 text-emerald-600"
          trend="On track"
          trendUp
        />
        <KpiCard
          label="Payments Due"
          value={formatCurrency(duePayments.reduce((s, p) => s + p.amount, 0))}
          hint={`${duePayments.length} outstanding`}
          icon={CreditCard}
          iconColor="bg-amber-50 text-amber-600"
          href="/buyer/payments"
        />
      </div>

      {/* Quick action banner */}
      {activeQuotes.length > 0 && (
        <div className="mb-6 flex items-center gap-3 rounded-2xl bg-primary/5 border border-primary/20 px-4 py-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <Zap className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">
              You have {activeQuotes.length} quote{activeQuotes.length > 1 ? 's' : ''} awaiting review.
            </p>
            <p className="text-xs text-muted-foreground">Approve or request changes before they expire.</p>
          </div>
          <Button size="sm" asChild className="shrink-0">
            <Link to="/buyer/quotes">Review now</Link>
          </Button>
        </div>
      )}

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
            {shipments.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {shipments.map((o) => {
                  const current = o.shipmentSteps.find((s) => s.current)
                  return (
                    <Link
                      key={o.id}
                      to={`/buyer/orders/${o.id}`}
                      className="block rounded-xl border border-border/80 bg-muted/30 p-4 hover:bg-muted/50 hover:border-primary/30 transition-all"
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
            ) : (
              <p className="py-6 text-center text-sm text-muted-foreground">No active shipments.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
