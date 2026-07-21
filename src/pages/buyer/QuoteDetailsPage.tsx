import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Check, X } from 'lucide-react'
import { PageShell, PageHeader } from '@/components/layout/PageShell'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { FormField } from '@/components/ui/form-field'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Separator } from '@/components/ui/separator'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { QuoteStatusBadge } from '@/components/buyer/StatusBadges'
import { EmptyState } from '@/components/ui/empty-state'
import { FileText } from 'lucide-react'
import { quotes, formatCurrency, formatDate } from '@/data/buyer'
import { useToast } from '@/hooks/use-toast'

export function QuoteDetailsPage() {
  const { quoteId } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()
  const quote = quotes.find((q) => q.id === quoteId)

  const [approveOpen, setApproveOpen] = useState(false)
  const [rejectOpen, setRejectOpen] = useState(false)
  const [rejectReason, setRejectReason] = useState('')
  const [status, setStatus] = useState(quote?.status)

  if (!quote) {
    return (
      <PageShell>
        <EmptyState
          icon={FileText}
          title="Quote not found"
          description="This quote does not exist or may have been removed."
          action={{ label: 'Back to quotes', onClick: () => navigate('/buyer/quotes') }}
        />
      </PageShell>
    )
  }

  const deposit = (quote.total * quote.depositPercent) / 100
  const currentStatus = status ?? quote.status
  const canAct = currentStatus === 'pending'

  function handleApprove() {
    setStatus('approved')
    setApproveOpen(false)
    toast({
      variant: 'success',
      title: 'Quote approved',
      description: `${quote!.id} has been approved. Proceed to deposit payment.`,
    })
    navigate(`/buyer/payments/deposit?quoteId=${quote!.id}`)
  }

  function handleReject() {
    setStatus('rejected')
    setRejectOpen(false)
    toast({
      title: 'Quote rejected',
      description: `${quote!.id} has been rejected.`,
    })
  }

  return (
    <PageShell>
      <PageHeader
        title={quote.title}
        description={quote.id}
        breadcrumb={[
          { label: 'Quotes', href: '/buyer/quotes' },
          { label: quote.id },
        ]}
        actions={
          canAct ? (
            <>
              <Button variant="outline" className="gap-1.5" onClick={() => setRejectOpen(true)}>
                <X className="h-4 w-4" />
                Reject
              </Button>
              <Button className="gap-1.5" onClick={() => setApproveOpen(true)}>
                <Check className="h-4 w-4" />
                Approve
              </Button>
            </>
          ) : (
            <QuoteStatusBadge status={currentStatus} />
          )
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
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
                    <TableHead className="text-right">Unit Price</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {quote.lineItems.map((item) => (
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
            <CardFooter className="flex justify-end border-t bg-muted/30">
              <div className="text-right space-y-1 py-1">
                <p className="text-sm text-muted-foreground">
                  Subtotal{' '}
                  <span className="font-medium text-foreground ml-4">
                    {formatCurrency(quote.total)}
                  </span>
                </p>
                <p className="text-base font-semibold">
                  Total{' '}
                  <span className="ml-4">{formatCurrency(quote.total)}</span>
                </p>
              </div>
            </CardFooter>
          </Card>

          {quote.notes && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{quote.notes}</p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <QuoteStatusBadge status={currentStatus} />
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created</span>
                <span>{formatDate(quote.createdAt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Valid until</span>
                <span>{formatDate(quote.validUntil)}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Deposit ({quote.depositPercent}%)</span>
                <span className="font-medium">{formatCurrency(deposit)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Balance</span>
                <span className="font-medium">{formatCurrency(quote.total - deposit)}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="font-medium">Total</span>
                <span className="font-semibold">{formatCurrency(quote.total)}</span>
              </div>
            </CardContent>
            {currentStatus === 'approved' && (
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link to={`/buyer/payments/deposit?quoteId=${quote.id}`}>
                    Pay deposit
                  </Link>
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>

      {/* Approve dialog */}
      <Dialog open={approveOpen} onOpenChange={setApproveOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve quote</DialogTitle>
            <DialogDescription>
              Approve {quote.id} for {formatCurrency(quote.total)}. You will be asked to pay a{' '}
              {quote.depositPercent}% deposit of {formatCurrency(deposit)}.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setApproveOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleApprove}>Approve quote</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject dialog */}
      <Dialog open={rejectOpen} onOpenChange={setRejectOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject quote</DialogTitle>
            <DialogDescription>
              Optionally share a reason. This helps us improve future quotes.
            </DialogDescription>
          </DialogHeader>
          <FormField label="Reason (optional)">
            <Textarea
              placeholder="Pricing, lead time, specs…"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={3}
            />
          </FormField>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReject}>
              Reject quote
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageShell>
  )
}
