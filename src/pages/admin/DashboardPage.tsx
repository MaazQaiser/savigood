import { Link } from 'react-router-dom'
import { ArrowRight, TrendingUp, TrendingDown, Inbox, FileText, Package, DollarSign } from 'lucide-react'
import type { ElementType } from 'react'
import { PageShell, PageHeader } from '@/components/layout/PageShell'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { RfqStatusBadge } from '@/components/admin/StatusBadges'
import { OrderStatusBadge, QuoteStatusBadge } from '@/components/buyer/StatusBadges'
import {
  clients,
  rfqs,
  adminQuotes,
  adminOrders,
  formatCurrency,
  formatDate,
} from '@/data/admin'
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
          <Link to={href} className="mt-3 block text-xs text-primary hover:underline">
            View all →
          </Link>
        )}
      </CardContent>
    </Card>
  )
}

export function AdminDashboardPage() {
  const openRfqs = rfqs.filter((r) => r.status === 'new' || r.status === 'in_review')
  const activeQuotes = adminQuotes.filter((q) => q.status === 'pending')
  const openOrders = adminOrders.filter(
    (o) => o.status !== 'delivered' && o.status !== 'cancelled'
  )
  const revenue = adminOrders.reduce((s, o) => s + o.total, 0)

  return (
    <PageShell>
      <PageHeader
        title="Operations Dashboard"
        description="Live overview across clients, RFQs, and fulfillment"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <KpiCard
          label="Open RFQs"
          value={String(openRfqs.length)}
          hint="Needs attention"
          icon={Inbox}
          iconColor="bg-primary/10 text-primary"
          trend="3 new"
          trendUp
          href="/admin/rfqs"
        />
        <KpiCard
          label="Active Quotes"
          value={String(activeQuotes.length)}
          hint="Awaiting buyer"
          icon={FileText}
          iconColor="bg-sky-50 text-sky-600"
          href="/admin/quotes"
        />
        <KpiCard
          label="Open Orders"
          value={String(openOrders.length)}
          hint="In fulfillment"
          icon={Package}
          iconColor="bg-emerald-50 text-emerald-600"
          href="/admin/orders"
        />
        <KpiCard
          label="Order Volume"
          value={formatCurrency(revenue)}
          hint={`${clients.filter((c) => c.status === 'active').length} active clients`}
          icon={DollarSign}
          iconColor="bg-amber-50 text-amber-600"
          trend="12.4% vs last month"
          trendUp
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base">RFQ Inbox</CardTitle>
            <Button variant="ghost" size="sm" asChild className="rounded-lg">
              <Link to="/admin/rfqs" className="gap-1 text-muted-foreground">
                View all <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>RFQ</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {openRfqs.slice(0, 4).map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>
                      <Link to={`/admin/rfqs/${r.id}`} className="hover:underline">
                        <p className="font-medium text-sm">{r.title}</p>
                        <p className="font-mono text-xs text-muted-foreground">{r.id}</p>
                      </Link>
                    </TableCell>
                    <TableCell className="text-sm">{r.clientName}</TableCell>
                    <TableCell>
                      <RfqStatusBadge status={r.status} />
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
              <Link to="/admin/orders" className="gap-1 text-muted-foreground">
                View all <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {adminOrders.slice(0, 4).map((o) => (
                  <TableRow key={o.id}>
                    <TableCell>
                      <Link to={`/admin/orders/${o.id}`} className="hover:underline">
                        <p className="font-medium text-sm">{o.title}</p>
                        <p className="font-mono text-xs text-muted-foreground">{o.id}</p>
                      </Link>
                    </TableCell>
                    <TableCell className="text-sm">{o.clientName}</TableCell>
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
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base">Pending Quotes</CardTitle>
            <Button variant="ghost" size="sm" asChild className="rounded-lg">
              <Link to="/admin/quotes" className="gap-1 text-muted-foreground">
                View all <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Quote</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Valid Until</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeQuotes.map((q) => (
                  <TableRow key={q.id}>
                    <TableCell>
                      <Link to={`/admin/quotes/${q.id}/edit`} className="hover:underline">
                        <p className="font-medium text-sm">{q.title}</p>
                        <p className="font-mono text-xs text-muted-foreground">{q.id}</p>
                      </Link>
                    </TableCell>
                    <TableCell className="text-sm">{q.clientName}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(q.validUntil)}
                    </TableCell>
                    <TableCell>{formatCurrency(q.total)}</TableCell>
                    <TableCell>
                      <QuoteStatusBadge status={q.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
