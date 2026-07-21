import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search } from 'lucide-react'
import { PageShell, PageHeader } from '@/components/layout/PageShell'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ClientStatusBadge } from '@/components/admin/StatusBadges'
import { clients, formatCurrency, type ClientStatus } from '@/data/admin'

export function ClientListPage() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<string>('all')

  const filtered = useMemo(() => {
    return clients.filter((c) => {
      const q = query.toLowerCase()
      const matchesQuery =
        !q ||
        c.company.toLowerCase().includes(q) ||
        c.contactName.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q)
      const matchesStatus = status === 'all' || c.status === status
      return matchesQuery && matchesStatus
    })
  }, [query, status])

  return (
    <PageShell>
      <PageHeader
        title="Clients"
        description="Manage buyer accounts"
        breadcrumb={[{ label: 'Clients' }]}
        actions={
          <Button asChild className="gap-1.5">
            <Link to="/admin/clients/new">
              <Plus className="h-4 w-4" />
              Add client
            </Link>
          </Button>
        }
      />

      <Card className="mb-4">
        <CardContent className="pt-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Search clients…"
              className="pl-8"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="prospect">Prospect</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden sm:table-cell">ID</TableHead>
                <TableHead>Company</TableHead>
                <TableHead className="hidden md:table-cell">Contact</TableHead>
                <TableHead className="hidden lg:table-cell">Location</TableHead>
                <TableHead className="hidden md:table-cell">Orders</TableHead>
                <TableHead className="hidden sm:table-cell">Spend</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-16 sm:w-24" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="hidden sm:table-cell font-mono text-xs">{c.id}</TableCell>
                  <TableCell className="font-medium">{c.company}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <p className="text-sm">{c.contactName}</p>
                    <p className="text-xs text-muted-foreground">{c.email}</p>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                    {c.city}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{c.orderCount}</TableCell>
                  <TableCell className="hidden sm:table-cell">{formatCurrency(c.totalSpend)}</TableCell>
                  <TableCell>
                    <ClientStatusBadge status={c.status as ClientStatus} />
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/admin/clients/${c.id}`}>View</Link>
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
