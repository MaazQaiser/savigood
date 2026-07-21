import { Link, useSearchParams } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { PageShell } from '@/components/layout/PageShell'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { formatCurrency } from '@/data/buyer'

export function PaymentSuccessPage() {
  const [params] = useSearchParams()
  const ref = params.get('ref') ?? 'PAY-00000000'
  const amount = Number(params.get('amount') ?? 0)
  const type = params.get('type') ?? 'payment'
  const forRef = params.get('for') ?? '—'

  return (
    <PageShell className="max-w-md">
      <Card className="text-center">
        <CardHeader className="pb-2">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-success/10">
            <CheckCircle2 className="h-7 w-7 text-success" />
          </div>
          <CardTitle className="text-xl">Payment successful</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Your {type} payment has been processed.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4 text-sm space-y-2 text-left">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Reference</span>
              <span className="font-mono text-xs">{ref}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">For</span>
              <span className="font-mono text-xs">{forRef}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold">
              <span>Amount paid</span>
              <span>{formatCurrency(amount)}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 sm:flex-row">
          <Button variant="outline" className="w-full" asChild>
            <Link to="/buyer/payments">Back to payments</Link>
          </Button>
          <Button className="w-full" asChild>
            <Link to="/buyer/orders">View orders</Link>
          </Button>
        </CardFooter>
      </Card>
    </PageShell>
  )
}
