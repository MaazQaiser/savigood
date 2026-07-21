import { Link } from 'react-router-dom'
import { PageShell, PageHeader } from '@/components/layout/PageShell'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { RfqStatusBadge } from '@/components/admin/StatusBadges'
import { rfqs, formatDate } from '@/data/admin'

export function RfqInboxPage() {
  return (
    <PageShell>
      <PageHeader
        title="RFQ Inbox"
        description="Incoming requests for quote"
        breadcrumb={[{ label: 'RFQs' }]}
      />

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden sm:table-cell">RFQ ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Client</TableHead>
                <TableHead className="hidden md:table-cell">Received</TableHead>
                <TableHead className="hidden lg:table-cell">Needed by</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-16 sm:w-24" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {rfqs.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="hidden sm:table-cell font-mono text-xs">{r.id}</TableCell>
                  <TableCell className="font-medium max-w-[140px] truncate sm:max-w-none">
                    {r.title}
                  </TableCell>
                  <TableCell className="text-sm">{r.clientName}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                    {formatDate(r.createdAt)}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                    {r.neededBy ? formatDate(r.neededBy) : '—'}
                  </TableCell>
                  <TableCell>
                    <RfqStatusBadge status={r.status} />
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/admin/rfqs/${r.id}`}>View</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </PageShell>
  )
}
