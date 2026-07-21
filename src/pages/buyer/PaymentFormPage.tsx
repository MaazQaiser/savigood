import { FormEvent, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { PageShell, PageHeader } from '@/components/layout/PageShell'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormField } from '@/components/ui/form-field'
import { Separator } from '@/components/ui/separator'
import { quotes, orders, formatCurrency } from '@/data/buyer'

interface PaymentFormPageProps {
  type: 'deposit' | 'balance'
}

export function PaymentFormPage({ type }: PaymentFormPageProps) {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const quoteId = params.get('quoteId')
  const orderId = params.get('orderId')
  const paymentId = params.get('paymentId')

  const quote = quoteId ? quotes.find((q) => q.id === quoteId) : undefined
  const order = orderId ? orders.find((o) => o.id === orderId) : orders[0]

  const amount =
    type === 'deposit'
      ? quote
        ? (quote.total * quote.depositPercent) / 100
        : order
          ? order.depositPaid || order.total * 0.3
          : 0
      : order?.balanceDue ?? 2100

  const title = type === 'deposit' ? 'Deposit Payment' : 'Balance Payment'
  const refLabel = quote?.title ?? order?.title ?? 'Payment'
  const refId = quote?.id ?? order?.id ?? paymentId ?? '—'

  const [cardName, setCardName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  function validate() {
    const next: Record<string, string> = {}
    if (!cardName.trim()) next.cardName = 'Name on card is required'
    if (!cardNumber.replace(/\s/g, '').match(/^\d{15,16}$/)) next.cardNumber = 'Enter a valid card number'
    if (!expiry.match(/^\d{2}\/\d{2}$/)) next.expiry = 'Use MM/YY'
    if (!cvc.match(/^\d{3,4}$/)) next.cvc = 'Enter a valid CVC'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      const ref = `PAY-${Date.now().toString().slice(-8)}`
      navigate(
        `/buyer/payments/success?ref=${ref}&amount=${amount}&type=${type}&for=${encodeURIComponent(refId)}`
      )
    }, 900)
  }

  return (
    <PageShell className="max-w-xl">
      <PageHeader
        title={title}
        description={refLabel}
        breadcrumb={[
          { label: 'Payments', href: '/buyer/payments' },
          { label: title },
        ]}
      />

      <Card className="mb-4">
        <CardContent className="pt-6 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Reference</span>
            <span className="font-mono text-xs">{refId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Type</span>
            <span className="capitalize">{type}</span>
          </div>
          <Separator />
          <div className="flex justify-between text-base font-semibold">
            <span>Amount due</span>
            <span>{formatCurrency(amount)}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Payment details</CardTitle>
          <CardDescription>Mock card form — no real charges</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="pay-form" onSubmit={handleSubmit} className="space-y-4" noValidate>
            <FormField label="Name on card" required error={errors.cardName}>
              <Input
                placeholder="Alex Johnson"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                error={!!errors.cardName}
              />
            </FormField>
            <FormField label="Card number" required error={errors.cardNumber}>
              <Input
                placeholder="4242 4242 4242 4242"
                inputMode="numeric"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                error={!!errors.cardNumber}
              />
            </FormField>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Expiry" required error={errors.expiry}>
                <Input
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  error={!!errors.expiry}
                />
              </FormField>
              <FormField label="CVC" required error={errors.cvc}>
                <Input
                  placeholder="123"
                  inputMode="numeric"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  error={!!errors.cvc}
                />
              </FormField>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button variant="outline" asChild className="flex-1">
            <Link to="/buyer/payments">Cancel</Link>
          </Button>
          <Button type="submit" form="pay-form" className="flex-1" disabled={loading}>
            {loading ? 'Processing…' : `Pay ${formatCurrency(amount)}`}
          </Button>
        </CardFooter>
      </Card>
    </PageShell>
  )
}
