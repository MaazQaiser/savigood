import { PageShell, PageHeader } from '@/components/layout/PageShell'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ClientStatusBadge, RfqStatusBadge } from '@/components/admin/StatusBadges'
import { OrderStatusBadge } from '@/components/buyer/StatusBadges'
import {
  clients,
  rfqs,
  adminOrders,
  formatCurrency,
  formatDate,
} from '@/data/admin'

export function ReportsPage() {
  const activeClients = clients.filter((c) => c.status === 'active')
  const totalSpend = clients.reduce((s, c) => s + c.totalSpend, 0)
  const rfqQuoted = rfqs.filter((r) => r.status === 'quoted').length
  const rfqConversion = rfqs.length ? Math.round((rfqQuoted / rfqs.length) * 100) : 0
  const orderVolume = adminOrders.reduce((s, o) => s + o.total, 0)

  return (
    <PageShell>
      <PageHeader
        title="Reports"
        description="Clients, RFQs, and orders analytics"
        breadcrumb={[{ label: 'Reports' }]}
      />

      <Tabs defaultValue="clients">
        <TabsList>
          <TabsTrigger value="clients">Clients Report</TabsTrigger>
          <TabsTrigger value="rfqs">RFQs Report</TabsTrigger>
          <TabsTrigger value="orders">Orders Report</TabsTrigger>
        </TabsList>

        <TabsContent value="clients" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total clients</CardDescription>
                <CardTitle className="text-2xl">{clients.length}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Active</CardDescription>
                <CardTitle className="text-2xl">{activeClients.length}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Lifetime spend</CardDescription>
                <CardTitle className="text-2xl">{formatCurrency(totalSpend)}</CardTitle>
              </CardHeader>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Client activity</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Spend</TableHead>
                    <TableHead>Since</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...clients]
                    .sort((a, b) => b.totalSpend - a.totalSpend)
                    .map((c) => (
                      <TableRow key={c.id}>
                        <TableCell className="font-medium">{c.company}</TableCell>
                        <TableCell>
                          <ClientStatusBadge status={c.status} />
                        </TableCell>
                        <TableCell>{c.orderCount}</TableCell>
                        <TableCell>{formatCurrency(c.totalSpend)}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDate(c.createdAt)}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rfqs" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total RFQs</CardDescription>
                <CardTitle className="text-2xl">{rfqs.length}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Quoted</CardDescription>
                <CardTitle className="text-2xl">{rfqQuoted}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Quote conversion</CardDescription>
                <CardTitle className="text-2xl">{rfqConversion}%</CardTitle>
              </CardHeader>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">RFQ volume by status</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>RFQ</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Received</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rfqs.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell>
                        <p className="font-medium text-sm">{r.title}</p>
                        <p className="font-mono text-xs text-muted-foreground">{r.id}</p>
                      </TableCell>
                      <TableCell className="text-sm">{r.clientName}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDate(r.createdAt)}
                      </TableCell>
                      <TableCell>
                        <RfqStatusBadge status={r.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Orders</CardDescription>
                <CardTitle className="text-2xl">{adminOrders.length}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Volume</CardDescription>
                <CardTitle className="text-2xl">{formatCurrency(orderVolume)}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Delivered</CardDescription>
                <CardTitle className="text-2xl">
                  {adminOrders.filter((o) => o.status === 'delivered').length}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Orders by status & timeline</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {adminOrders.map((o) => (
                    <TableRow key={o.id}>
                      <TableCell>
                        <p className="font-medium text-sm">{o.title}</p>
                        <p className="font-mono text-xs text-muted-foreground">{o.id}</p>
                      </TableCell>
                      <TableCell className="text-sm">{o.clientName}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDate(o.createdAt)}
                      </TableCell>
                      <TableCell>{formatCurrency(o.total)}</TableCell>
                      <TableCell>
                        <OrderStatusBadge status={o.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageShell>
  )
}
