import { Link, useNavigate, useParams } from 'react-router-dom'
import { Building2, Pencil } from 'lucide-react'
import { PageShell, PageHeader } from '@/components/layout/PageShell'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { EmptyState } from '@/components/ui/empty-state'
import { ClientStatusBadge } from '@/components/admin/StatusBadges'
import { OrderStatusBadge } from '@/components/buyer/StatusBadges'
import {
  clients,
  adminOrders,
  adminFiles,
  formatCurrency,
  formatDate,
} from '@/data/admin'

export function ClientDetailsPage() {
  const { clientId } = useParams()
  const navigate = useNavigate()
  const client = clients.find((c) => c.id === clientId)

  if (!client) {
    return (
      <PageShell>
        <EmptyState
          icon={Building2}
          title="Client not found"
          description="This client does not exist."
          action={{ label: 'Back to clients', onClick: () => navigate('/admin/clients') }}
        />
      </PageShell>
    )
  }

  const clientOrders = adminOrders.filter((o) => o.clientId === client.id)
  const clientFiles = adminFiles.filter((f) => f.clientName === client.company)

  return (
    <PageShell>
      <PageHeader
        title={client.company}
        description={client.id}
        breadcrumb={[
          { label: 'Clients', href: '/admin/clients' },
          { label: client.company },
        ]}
        actions={
          <Button variant="outline" asChild className="gap-1.5">
            <Link to={`/admin/clients/${client.id}/edit`}>
              <Pencil className="h-4 w-4" />
              Edit
            </Link>
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Profile</CardTitle>
              <ClientStatusBadge status={client.status} />
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <p className="text-muted-foreground text-xs">Contact</p>
              <p className="font-medium">{client.contactName}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Email</p>
              <p>{client.email}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Phone</p>
              <p>{client.phone}</p>
            </div>
            <Separator />
            <div>
              <p className="text-muted-foreground text-xs">Address</p>
              <p>{client.address}</p>
              <p>{client.city}</p>
              <p>{client.country}</p>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Orders</span>
              <span className="font-medium">{client.orderCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total spend</span>
              <span className="font-medium">{formatCurrency(client.totalSpend)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Client since</span>
              <span>{formatDate(client.createdAt)}</span>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Order history</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {clientOrders.length === 0 ? (
                <p className="p-6 text-sm text-muted-foreground">No orders yet.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clientOrders.map((o) => (
                      <TableRow key={o.id}>
                        <TableCell>
                          <Link to={`/admin/orders/${o.id}`} className="hover:underline">
                            <p className="font-medium text-sm">{o.title}</p>
                            <p className="font-mono text-xs text-muted-foreground">{o.id}</p>
                          </Link>
                        </TableCell>
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
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Documents</CardTitle>
              <CardDescription>Files uploaded by this client</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {clientFiles.length === 0 ? (
                <p className="p-6 text-sm text-muted-foreground">No documents.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Uploaded</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clientFiles.map((f) => (
                      <TableRow key={f.id}>
                        <TableCell className="font-medium text-sm">{f.name}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{f.category}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDate(f.uploadedAt)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageShell>
  )
}
