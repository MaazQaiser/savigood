import { Link } from 'react-router-dom'
import { ArrowRight, TrendingUp } from 'lucide-react'
import { PageShell, PageHeader } from '@/components/layout/PageShell'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
        title="Dashboard"
        description="Operations overview across clients, RFQs, and orders"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard
          label="Open RFQs"
          value={String(openRfqs.length)}
          hint="Needs attention"
          trend="3 new"
          trendUp
        />
        <KpiCard
          label="Active Quotes"
          value={String(activeQuotes.length)}
          hint="Awaiting buyer"
        />
        <KpiCard
          label="Open Orders"
          value={String(openOrders.length)}
          hint="In fulfillment"
        />
        <KpiCard
          label="Order Volume"
          value={formatCurrency(revenue)}
          hint={`${clients.filter((c) => c.status === 'active').length} active clients`}
          trend="12.4%"
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
