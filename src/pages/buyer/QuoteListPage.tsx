import { Link } from 'react-router-dom'
import { PageShell, PageHeader } from '@/components/layout/PageShell'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { QuoteStatusBadge } from '@/components/buyer/StatusBadges'
import { quotes, formatCurrency, formatDate } from '@/data/buyer'

export function QuoteListPage() {
  return (
    <PageShell>
      <PageHeader
        title="Quotes"
        description="Review and respond to quotes from Savi"
        breadcrumb={[{ label: 'Quotes' }]}
      />

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Quote ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Created</TableHead>
                <TableHead className="hidden lg:table-cell">Valid Until</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-16 sm:w-24" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotes.map((q) => (
                <TableRow key={q.id}>
                  <TableCell className="font-mono text-xs">{q.id}</TableCell>
                  <TableCell className="font-medium max-w-[140px] sm:max-w-none truncate">
                    {q.title}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
                    {formatDate(q.createdAt)}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-muted-foreground text-sm">
                    {formatDate(q.validUntil)}
                  </TableCell>
                  <TableCell>{formatCurrency(q.total)}</TableCell>
                  <TableCell>
                    <QuoteStatusBadge status={q.status} />
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/buyer/quotes/${q.id}`}>View</Link>
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
