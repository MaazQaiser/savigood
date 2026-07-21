import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Check, Package } from 'lucide-react'
import { PageShell, PageHeader } from '@/components/layout/PageShell'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormField } from '@/components/ui/form-field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Separator } from '@/components/ui/separator'
import { EmptyState } from '@/components/ui/empty-state'
import { OrderStatusBadge } from '@/components/buyer/StatusBadges'
import { adminOrders, formatCurrency, formatDate } from '@/data/admin'
import type { OrderStatus } from '@/data/buyer'
import { cn } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'

const STATUS_OPTIONS: OrderStatus[] = [
  'pending',
  'confirmed',
  'in_production',
  'shipped',
  'in_transit',
  'delivered',
  'cancelled',
]

export function AdminOrderDetailsPage() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()
  const seed = adminOrders.find((o) => o.id === orderId)

  const [status, setStatus] = useState<OrderStatus | undefined>(seed?.status)
  const [carrier, setCarrier] = useState(seed?.carrier ?? '')
  const [trackingNumber, setTrackingNumber] = useState(seed?.trackingNumber ?? '')
  const [eta, setEta] = useState(seed?.estimatedDelivery ?? '')
  const [savingStatus, setSavingStatus] = useState(false)
  const [savingTracking, setSavingTracking] = useState(false)

  if (!seed) {
    return (
      <PageShell>
        <EmptyState
          icon={Package}
          title="Order not found"
          description="This order does not exist."
          action={{ label: 'Back to orders', onClick: () => navigate('/admin/orders') }}
        />
      </PageShell>
    )
  }

  const order = seed
  const currentStatus = status ?? order.status

  function saveStatus() {
    setSavingStatus(true)
    setTimeout(() => {
      setSavingStatus(false)
      toast({
        variant: 'success',
        title: 'Status updated',
        description: `${order.id} → ${currentStatus.replace(/_/g, ' ')}`,
      })
    }, 500)
  }

  function saveTracking() {
    setSavingTracking(true)
    setTimeout(() => {
      setSavingTracking(false)
      toast({
        variant: 'success',
        title: 'Tracking overridden',
        description: trackingNumber || 'Tracking cleared',
      })
    }, 500)
  }

  return (
    <PageShell>
      <PageHeader
        title={order.title}
        description={order.id}
        breadcrumb={[
          { label: 'Orders', href: '/admin/orders' },
          { label: order.id },
        ]}
        actions={<OrderStatusBadge status={currentStatus} />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Shipment status timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Shipment Status</CardTitle>
              <CardDescription>Fulfillment timeline</CardDescription>
            </CardHeader>
            <CardContent>
              <ol>
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
                            : 'border-border bg-background'
                        )}
                      >
                        {step.completed ? <Check className="h-3 w-3" strokeWidth={3} /> : null}
                      </span>
                      <div className="pt-0.5">
                        <p className="text-sm font-medium">{step.label}</p>
                        <p className="text-xs text-muted-foreground">{step.description}</p>
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
          {/* Update Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Update Status</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField label="Order status">
                <Select
                  value={currentStatus}
                  onValueChange={(v) => setStatus(v as OrderStatus)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s.replace(/_/g, ' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={saveStatus} disabled={savingStatus}>
                {savingStatus ? 'Saving…' : 'Save status'}
              </Button>
            </CardFooter>
          </Card>

          {/* Manual Tracking Override */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Manual Tracking Override</CardTitle>
              <CardDescription>Correct or enter carrier tracking</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <FormField label="Carrier">
                <Input
                  placeholder="UPS, FedEx, USPS…"
                  value={carrier}
                  onChange={(e) => setCarrier(e.target.value)}
                />
              </FormField>
              <FormField label="Tracking number">
                <Input
                  placeholder="Tracking ID"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="font-mono text-xs"
                />
              </FormField>
              <FormField label="Estimated delivery">
                <Input type="date" value={eta} onChange={(e) => setEta(e.target.value)} />
              </FormField>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full"
                onClick={saveTracking}
                disabled={savingTracking}
              >
                {savingTracking ? 'Saving…' : 'Save tracking'}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between gap-2">
                <span className="text-muted-foreground">Client</span>
                <Link
                  to={`/admin/clients/${order.clientId}`}
                  className="font-medium hover:underline text-right"
                >
                  {order.clientName}
                </Link>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Quote</span>
                <span className="font-mono text-xs">{order.quoteId}</span>
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
          </Card>
        </div>
      </div>
    </PageShell>
  )
}
