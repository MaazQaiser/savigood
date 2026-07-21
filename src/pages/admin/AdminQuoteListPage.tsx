import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { PageShell, PageHeader } from '@/components/layout/PageShell'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { QuoteStatusBadge } from '@/components/buyer/StatusBadges'
import { adminQuotes, formatCurrency, formatDate } from '@/data/admin'

export function AdminQuoteListPage() {
  return (
    <PageShell>
      <PageHeader
        title="Quotes"
        description="Build and manage buyer quotes"
        breadcrumb={[{ label: 'Quotes' }]}
        actions={
          <Button asChild className="gap-1.5">
            <Link to="/admin/quotes/new">
              <Plus className="h-4 w-4" />
              Create quote
            </Link>
          </Button>
        }
      />

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden sm:table-cell">Quote ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Client</TableHead>
                <TableHead className="hidden lg:table-cell">Created</TableHead>
                <TableHead className="hidden lg:table-cell">Valid Until</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-16 sm:w-24" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminQuotes.map((q) => (
                <TableRow key={q.id}>
                  <TableCell className="hidden sm:table-cell font-mono text-xs">{q.id}</TableCell>
                  <TableCell className="font-medium max-w-[140px] truncate sm:max-w-none">
                    {q.title}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm">{q.clientName}</TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                    {formatDate(q.createdAt)}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                    {formatDate(q.validUntil)}
                  </TableCell>
                  <TableCell>{formatCurrency(q.total)}</TableCell>
                  <TableCell>
                    <QuoteStatusBadge status={q.status} />
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/admin/quotes/${q.id}/edit`}>Edit</Link>
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
