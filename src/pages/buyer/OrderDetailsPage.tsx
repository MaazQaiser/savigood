import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  Check,
  Copy,
  ExternalLink,
  Package,
  MapPin,
  Clock,
  Truck,
  Paperclip,
  Upload,
  FileText,
} from 'lucide-react'
import { PageShell, PageHeader } from '@/components/layout/PageShell'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Separator } from '@/components/ui/separator'
import { EmptyState } from '@/components/ui/empty-state'
import { OrderStatusBadge } from '@/components/buyer/StatusBadges'
import { orders, files, formatCurrency, formatDate } from '@/data/buyer'
import { cn } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'

const MOCK_SCANS = [
  { location: 'Memphis, TN', event: 'In transit to destination', at: 'Jul 19, 11:38 PM' },
  { location: 'Memphis, TN', event: 'Arrived at facility', at: 'Jul 19, 3:10 AM' },
  { location: 'Louisville, KY', event: 'Departed facility', at: 'Jul 18, 9:42 PM' },
  { location: 'Louisville, KY', event: 'Arrived at facility', at: 'Jul 18, 2:15 PM' },
]

export function OrderDetailsPage() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()
  const order = orders.find((o) => o.id === orderId)
  const orderFiles = files.filter((f) => f.orderId === orderId)
  const [showAllScans, setShowAllScans] = useState(false)

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

  const visibleScans = showAllScans ? MOCK_SCANS : MOCK_SCANS.slice(0, 2)

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
              <CardTitle className="text-base">Shipment Progress</CardTitle>
              <CardDescription>Step-by-step fulfillment status</CardDescription>
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
                            step.completed ? 'bg-primary/60' : 'bg-border'
                          )}
                        />
                      )}
                      <span
                        className={cn(
                          'relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2',
                          step.completed
                            ? 'border-primary bg-primary text-primary-foreground'
                            : step.current
                            ? 'border-primary bg-accent'
                            : 'border-border bg-background'
                        )}
                      >
                        {step.completed ? <Check className="h-3 w-3" strokeWidth={3} /> : null}
                        {step.current && !step.completed && (
                          <span className="h-2 w-2 rounded-full bg-primary block" />
                        )}
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
                            <Badge variant="outline" className="text-[10px] h-4 px-1.5 border-primary/40 text-primary">
                              Current
                            </Badge>
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

          {/* Files */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Files</CardTitle>
                  <CardDescription>Documents for this order</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Upload className="h-3.5 w-3.5" />
                  Upload
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {orderFiles.length > 0 ? (
                <ul className="divide-y divide-border">
                  {orderFiles.map((f) => (
                    <li key={f.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{f.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {f.category} · {f.size} · {formatDate(f.uploadedAt)}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="py-6 text-center">
                  <p className="text-sm text-muted-foreground">No files attached to this order.</p>
                  <Button variant="outline" size="sm" className="mt-3 gap-1.5">
                    <Upload className="h-3.5 w-3.5" />
                    Upload file
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {/* Embedded Tracking Widget */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-primary" />
                <CardTitle className="text-base">Live Tracking</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {order.trackingNumber ? (
                <>
                  {/* Current status banner */}
                  <div className="rounded-xl bg-primary/8 border border-primary/20 p-3 space-y-1.5">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {MOCK_SCANS[0].location}
                        </p>
                        <p className="text-xs text-muted-foreground">{MOCK_SCANS[0].event}</p>
                      </div>
                    </div>
                    {order.estimatedDelivery && (
                      <div className="flex items-center gap-1.5 pl-6">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">
                          Est. delivery{' '}
                          <span className="font-medium text-foreground">
                            {formatDate(order.estimatedDelivery)}
                          </span>
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Scan history */}
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                      Scan history
                    </p>
                    <ul className="space-y-2.5">
                      {visibleScans.map((scan, i) => (
                        <li key={i} className="flex gap-3">
                          <div className="mt-1 h-2 w-2 rounded-full bg-border shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs font-medium">{scan.location}</p>
                            <p className="text-xs text-muted-foreground">{scan.event}</p>
                            <p className="text-[11px] text-muted-foreground/70 mt-0.5">{scan.at}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                    {MOCK_SCANS.length > 2 && (
                      <button
                        type="button"
                        onClick={() => setShowAllScans((v) => !v)}
                        className="mt-2 text-xs text-primary hover:underline"
                      >
                        {showAllScans ? 'Show less' : `Show ${MOCK_SCANS.length - 2} more`}
                      </button>
                    )}
                  </div>

                  <Separator />

                  {/* Carrier details */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Carrier</span>
                      <span className="font-medium">{order.carrier}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
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
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full gap-1.5 text-muted-foreground"
                    asChild
                  >
                    <a
                      href={`https://www.google.com/search?q=${order.carrier}+tracking+${order.trackingNumber}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open carrier site
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </Button>
                </>
              ) : (
                <p className="text-sm text-muted-foreground py-2">
                  Tracking details will appear once the order ships.
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
                  <Link to={`/buyer/payments/balance?orderId=${order.id}`}>Pay balance</Link>
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </PageShell>
  )
}
