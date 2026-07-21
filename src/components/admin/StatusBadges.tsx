import { Badge } from '@/components/ui/badge'
import type { ClientStatus, RfqStatus } from '@/data/admin'

export function ClientStatusBadge({ status }: { status: ClientStatus }) {
  const map = {
    active: { label: 'Active', variant: 'success' as const },
    inactive: { label: 'Inactive', variant: 'secondary' as const },
    prospect: { label: 'Prospect', variant: 'warning' as const },
  }
  const s = map[status]
  return <Badge variant={s.variant}>{s.label}</Badge>
}

export function RfqStatusBadge({ status }: { status: RfqStatus }) {
  const map = {
    new: { label: 'New', variant: 'warning' as const },
    in_review: { label: 'In Review', variant: 'default' as const },
    quoted: { label: 'Quoted', variant: 'success' as const },
    closed: { label: 'Closed', variant: 'secondary' as const },
  }
  const s = map[status]
  return <Badge variant={s.variant}>{s.label}</Badge>
}
