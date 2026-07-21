import { Link, useNavigate, useParams } from 'react-router-dom'
import { FileText, Paperclip } from 'lucide-react'
import { PageShell, PageHeader } from '@/components/layout/PageShell'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { EmptyState } from '@/components/ui/empty-state'
import { RfqStatusBadge } from '@/components/admin/StatusBadges'
import { rfqs, formatDate } from '@/data/admin'

export function RfqDetailsPage() {
  const { rfqId } = useParams()
  const navigate = useNavigate()
  const rfq = rfqs.find((r) => r.id === rfqId)

  if (!rfq) {
    return (
      <PageShell>
        <EmptyState
          icon={FileText}
          title="RFQ not found"
          description="This RFQ does not exist."
          action={{ label: 'Back to inbox', onClick: () => navigate('/admin/rfqs') }}
        />
      </PageShell>
    )
  }

  return (
    <PageShell>
      <PageHeader
        title={rfq.title}
        description={rfq.id}
        breadcrumb={[
          { label: 'RFQs', href: '/admin/rfqs' },
          { label: rfq.id },
        ]}
        actions={
          <>
            <RfqStatusBadge status={rfq.status} />
            {(rfq.status === 'new' || rfq.status === 'in_review') && (
              <Button asChild>
                <Link to={`/admin/quotes/new?rfqId=${rfq.id}&clientId=${rfq.clientId}`}>
                  Create quote
                </Link>
              </Button>
            )}
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Request details</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{rfq.description}</p>
          </CardContent>
          {rfq.attachments.length > 0 && (
            <CardFooter className="flex flex-col items-stretch gap-2 border-t">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Attachments
              </p>
              {rfq.attachments.map((name) => (
                <div
                  key={name}
                  className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm"
                >
                  <Paperclip className="h-3.5 w-3.5 text-muted-foreground" />
                  {name}
                </div>
              ))}
            </CardFooter>
          )}
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <RfqStatusBadge status={rfq.status} />
            </div>
            <Separator />
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground shrink-0">Client</span>
              <Link
                to={`/admin/clients/${rfq.clientId}`}
                className="text-right hover:underline font-medium"
              >
                {rfq.clientName}
              </Link>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Received</span>
              <span>{formatDate(rfq.createdAt)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Needed by</span>
              <span>{rfq.neededBy ? formatDate(rfq.neededBy) : '—'}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
