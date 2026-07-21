import { Badge } from '@/components/ui/badge'
import type { QuoteStatus, OrderStatus, PaymentStatus } from '@/data/buyer'

export function QuoteStatusBadge({ status }: { status: QuoteStatus }) {
  const map = {
    pending: { label: 'Pending', variant: 'warning' as const },
    approved: { label: 'Approved', variant: 'success' as const },
    rejected: { label: 'Rejected', variant: 'destructive' as const },
    expired: { label: 'Expired', variant: 'secondary' as const },
  }
  const s = map[status]
  return <Badge variant={s.variant}>{s.label}</Badge>
}

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const map = {
    pending: { label: 'Pending', variant: 'warning' as const },
    confirmed: { label: 'Confirmed', variant: 'default' as const },
    in_production: { label: 'In Production', variant: 'default' as const },
    shipped: { label: 'Shipped', variant: 'default' as const },
    in_transit: { label: 'In Transit', variant: 'default' as const },
    delivered: { label: 'Delivered', variant: 'success' as const },
    cancelled: { label: 'Cancelled', variant: 'destructive' as const },
  }
  const s = map[status]
  return <Badge variant={s.variant}>{s.label}</Badge>
}

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  const map = {
    due: { label: 'Due', variant: 'warning' as const },
    paid: { label: 'Paid', variant: 'success' as const },
    overdue: { label: 'Overdue', variant: 'destructive' as const },
  }
  const s = map[status]
  return <Badge variant={s.variant}>{s.label}</Badge>
}
