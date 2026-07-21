import { Link, useNavigate, useParams } from 'react-router-dom'
import { Check, Copy, ExternalLink, Package } from 'lucide-react'
import { PageShell, PageHeader } from '@/components/layout/PageShell'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Separator } from '@/components/ui/separator'
import { EmptyState } from '@/components/ui/empty-state'
import { OrderStatusBadge } from '@/components/buyer/StatusBadges'
import { orders, formatCurrency, formatDate } from '@/data/buyer'
import { cn } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'

export function OrderDetailsPage() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()
  const order = orders.find((o) => o.id === orderId)

  if (!order) {
    return (
      <PageShell>
        <EmptyState
          icon={Package}
          title="Order not found"
          description="This order does not exist or may have been removed."
          action={{ label: 'Back to orders', onClick: () => navigate('/buyer/orders') }}
        />
      </PageShell>
    )
  }

  function copyTracking() {
    if (!order?.trackingNumber) return
    navigator.clipboard.writeText(order.trackingNumber)
    toast({ title: 'Copied', description: 'Tracking number copied to clipboard.' })
  }

  return (
    <PageShell>
      <PageHeader
        title={order.title}
        description={order.id}
        breadcrumb={[
          { label: 'Orders', href: '/buyer/orders' },
          { label: order.id },
        ]}
        actions={<OrderStatusBadge status={order.status} />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Shipment Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Shipment Timeline</CardTitle>
              <CardDescription>Progress from confirmation to delivery</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="relative space-y-0">
                {order.shipmentSteps.map((step, i) => {
                  const isLast = i === order.shipmentSteps.length - 1
                  return (
                    <li key={step.id} className="relative flex gap-4 pb-8 last:pb-0">
                      {!isLast && (
                        <span
                          className={cn(
                            'absolute left-[11px] top-6 h-[calc(100%-8px)] w-px',
                            step.completed ? 'bg-foreground' : 'bg-border'
                          )}
                        />
                      )}
                      <span
                        className={cn(
                          'relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2',
                          step.completed
                            ? 'border-foreground bg-foreground text-background'
                            : 'border-border bg-background',
                          step.current && !step.completed && 'border-foreground'
                        )}
                      >
                        {step.completed ? <Check className="h-3 w-3" strokeWidth={3} /> : null}
                      </span>
                      <div className="min-w-0 flex-1 pt-0.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <p
                            className={cn(
                              'text-sm font-medium',
                              !step.completed && !step.current && 'text-muted-foreground'
                            )}
                          >
                            {step.label}
                          </p>
                          {step.current && (
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
                        {step.date && (
                          <p className="text-xs text-muted-foreground mt-1">{formatDate(step.date)}</p>
                        )}
                      </div>
                    </li>
                  )
                })}
              </ol>
            </CardContent>
          </Card>

          {/* Line items */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Line Items</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Qty</TableHead>
                    <TableHead className="text-right">Unit</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.lineItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.description}</TableCell>
                      <TableCell className="text-right">{item.quantity}</TableCell>
                      <TableCell className="text-right">{formatCurrency(item.unitPrice)}</TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(item.quantity * item.unitPrice)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {/* Tracking Widget */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Tracking</CardTitle>
              <CardDescription>Carrier tracking widget</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {order.trackingNumber ? (
                <>
                  <div className="rounded-lg border bg-muted/30 p-3 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Carrier</span>
                      <span className="font-medium">{order.carrier}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2 text-sm">
                      <span className="text-muted-foreground shrink-0">Tracking #</span>
                      <div className="flex items-center gap-1 min-w-0">
                        <span className="font-mono text-xs truncate">{order.trackingNumber}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 shrink-0"
                          onClick={copyTracking}
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                    {order.estimatedDelivery && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">ETA</span>
                        <span>{formatDate(order.estimatedDelivery)}</span>
                      </div>
                    )}
                  </div>
                  <Button variant="outline" size="sm" className="w-full gap-1.5" asChild>
                    <a
                      href={`https://www.google.com/search?q=${order.carrier}+${order.trackingNumber}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Track on carrier site
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </Button>
                </>
              ) : (
                <p className="text-sm text-muted-foreground py-2">
                  Tracking will appear once the order ships.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Quote</span>
                <Link
                  to={`/buyer/quotes/${order.quoteId}`}
                  className="font-mono text-xs hover:underline"
                >
                  {order.quoteId}
                </Link>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created</span>
                <span>{formatDate(order.createdAt)}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total</span>
                <span className="font-medium">{formatCurrency(order.total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Deposit paid</span>
                <span>{formatCurrency(order.depositPaid)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Balance due</span>
                <span className="font-semibold">
                  {order.balanceDue > 0 ? formatCurrency(order.balanceDue) : '—'}
                </span>
              </div>
            </CardContent>
            {order.balanceDue > 0 && (
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link to={`/buyer/payments/balance?orderId=${order.id}`}>
                    Pay balance
                  </Link>
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </PageShell>
  )
}
