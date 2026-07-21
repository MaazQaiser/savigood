import { FormEvent, useMemo, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Plus, Trash2 } from 'lucide-react'
import { PageShell, PageHeader } from '@/components/layout/PageShell'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { FormField } from '@/components/ui/form-field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { clients, adminQuotes, rfqs, formatCurrency, type AdminQuote } from '@/data/admin'
import type { LineItem } from '@/data/buyer'
import { useToast } from '@/hooks/use-toast'

function emptyLine(): LineItem {
  return {
    id: `li-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    description: '',
    quantity: 1,
    unitPrice: 0,
  }
}

export function QuoteBuilderPage() {
  const { quoteId } = useParams()
  const [params] = useSearchParams()
  const isEdit = Boolean(quoteId)
  const existing = isEdit ? adminQuotes.find((q) => q.id === quoteId) : undefined
  const navigate = useNavigate()
  const { toast } = useToast()

  const rfqIdParam = params.get('rfqId')
  const clientIdParam = params.get('clientId')
  const linkedRfq = rfqIdParam ? rfqs.find((r) => r.id === rfqIdParam) : undefined

  const [clientId, setClientId] = useState(
    existing?.clientId ?? clientIdParam ?? linkedRfq?.clientId ?? ''
  )
  const [title, setTitle] = useState(existing?.title ?? linkedRfq?.title ?? '')
  const [validUntil, setValidUntil] = useState(existing?.validUntil ?? '2026-08-15')
  const [depositPercent, setDepositPercent] = useState(String(existing?.depositPercent ?? 30))
  const [notes, setNotes] = useState(existing?.notes ?? '')
  const [rfqId] = useState(existing?.rfqId ?? rfqIdParam ?? '')
  const [lineItems, setLineItems] = useState<LineItem[]>(
    existing?.lineItems?.length ? existing.lineItems.map((l) => ({ ...l })) : [emptyLine()]
  )
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const total = useMemo(
    () => lineItems.reduce((s, l) => s + l.quantity * l.unitPrice, 0),
    [lineItems]
  )

  function updateLine(id: string, patch: Partial<LineItem>) {
    setLineItems((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)))
  }

  function removeLine(id: string) {
    setLineItems((prev) => (prev.length <= 1 ? prev : prev.filter((l) => l.id !== id)))
  }

  function validate() {
    const next: Record<string, string> = {}
    if (!clientId) next.clientId = 'Select a client'
    if (!title.trim()) next.title = 'Title is required'
    if (!lineItems.some((l) => l.description.trim())) next.lines = 'Add at least one line item'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      const payload: Partial<AdminQuote> = {
        clientId,
        title,
        validUntil,
        depositPercent: Number(depositPercent),
        notes,
        lineItems,
        total,
        rfqId: rfqId || undefined,
      }
      void payload
      toast({
        variant: 'success',
        title: isEdit ? 'Quote updated' : 'Quote created',
        description: `${title} · ${formatCurrency(total)}`,
      })
      navigate('/admin/quotes')
    }, 700)
  }

  return (
    <PageShell>
      <PageHeader
        title={isEdit ? 'Edit Quote' : 'Create Quote'}
        description={isEdit ? existing?.id : 'Build a quote with line items'}
        breadcrumb={[
          { label: 'Quotes', href: '/admin/quotes' },
          { label: isEdit ? 'Edit' : 'Create' },
        ]}
      />

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quote details</CardTitle>
            {rfqId && (
              <CardDescription>
                Linked RFQ:{' '}
                <Link to={`/admin/rfqs/${rfqId}`} className="font-mono hover:underline">
                  {rfqId}
                </Link>
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Client" required error={errors.clientId} className="sm:col-span-2">
              <Select value={clientId} onValueChange={setClientId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select client…" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.company}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="Title" required error={errors.title} className="sm:col-span-2">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                error={!!errors.title}
              />
            </FormField>
            <FormField label="Valid until">
              <Input type="date" value={validUntil} onChange={(e) => setValidUntil(e.target.value)} />
            </FormField>
            <FormField label="Deposit %">
              <Input
                type="number"
                min={0}
                max={100}
                value={depositPercent}
                onChange={(e) => setDepositPercent(e.target.value)}
              />
            </FormField>
            <FormField label="Notes" className="sm:col-span-2">
              <Textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Lead time, terms…"
              />
            </FormField>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Line Items</CardTitle>
              {errors.lines && <p className="text-xs text-destructive mt-1">{errors.lines}</p>}
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={() => setLineItems((prev) => [...prev, emptyLine()])}
            >
              <Plus className="h-3.5 w-3.5" />
              Add line
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[45%]">Description</TableHead>
                  <TableHead className="w-24">Qty</TableHead>
                  <TableHead className="w-32">Unit price</TableHead>
                  <TableHead className="w-28 text-right">Amount</TableHead>
                  <TableHead className="w-12" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {lineItems.map((line) => (
                  <TableRow key={line.id}>
                    <TableCell>
                      <Input
                        placeholder="Item description"
                        value={line.description}
                        onChange={(e) => updateLine(line.id, { description: e.target.value })}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min={1}
                        value={line.quantity}
                        onChange={(e) =>
                          updateLine(line.id, { quantity: Number(e.target.value) || 0 })
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min={0}
                        step="0.01"
                        value={line.unitPrice}
                        onChange={(e) =>
                          updateLine(line.id, { unitPrice: Number(e.target.value) || 0 })
                        }
                      />
                    </TableCell>
                    <TableCell className="text-right font-medium text-sm">
                      {formatCurrency(line.quantity * line.unitPrice)}
                    </TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => removeLine(line.id)}
                        disabled={lineItems.length <= 1}
                      >
                        <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="justify-end border-t bg-muted/30">
            <p className="text-base font-semibold">
              Total <span className="ml-4">{formatCurrency(total)}</span>
            </p>
          </CardFooter>
        </Card>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" asChild>
            <Link to="/admin/quotes">Cancel</Link>
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving…' : isEdit ? 'Save quote' : 'Create quote'}
          </Button>
        </div>
      </form>
    </PageShell>
  )
}
