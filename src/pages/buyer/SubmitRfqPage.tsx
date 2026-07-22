import { useState, FormEvent, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, X, FilePlus } from 'lucide-react'
import { PageShell, PageHeader } from '@/components/layout/PageShell'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { FormField } from '@/components/ui/form-field'
import { useToast } from '@/hooks/use-toast'
import { rfqs } from '@/data/admin'
import type { Rfq } from '@/data/admin'

interface RfqFormErrors {
  title?: string
  description?: string
}

export function SubmitRfqPage() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [neededBy, setNeededBy] = useState('')
  const [attachmentNames, setAttachmentNames] = useState<string[]>([])
  const [errors, setErrors] = useState<RfqFormErrors>({})
  const [loading, setLoading] = useState(false)

  function validate(): boolean {
    const next: RfqFormErrors = {}
    if (!title.trim()) next.title = 'Title is required'
    if (!description.trim()) next.description = 'Description is required'
    else if (description.trim().length < 20)
      next.description = 'Please provide at least 20 characters'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files ?? []).map((f) => f.name)
    setAttachmentNames((prev) => [...prev, ...selected.filter((n) => !prev.includes(n))])
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  function removeAttachment(name: string) {
    setAttachmentNames((prev) => prev.filter((n) => n !== name))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    setTimeout(() => {
      // Append to mock RFQ list so admin inbox sees it
      const newRfq: Rfq = {
        id: `RFQ-${Date.now().toString().slice(-6)}`,
        clientId: 'CL-001',
        clientName: 'Acme Corporation',
        title: title.trim(),
        status: 'new',
        createdAt: new Date().toISOString().split('T')[0],
        neededBy: neededBy || undefined,
        description: description.trim(),
        attachments: attachmentNames,
      }
      rfqs.unshift(newRfq)

      setLoading(false)
      toast({
        variant: 'success',
        title: 'RFQ submitted',
        description: "Your request has been sent. We'll respond within 1–2 business days.",
      })
      navigate('/buyer/quotes')
    }, 800)
  }

  return (
    <PageShell>
      <PageHeader
        title="Request a Quote"
        description="Tell us what you need — we'll send a detailed quote within 1–2 business days."
        breadcrumb={[{ label: 'Quotes', href: '/buyer/quotes' }, { label: 'Request quote' }]}
      />

      <div className="max-w-2xl">
        <form onSubmit={handleSubmit} noValidate>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
                  <FilePlus className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base">RFQ Details</CardTitle>
                  <CardDescription>Provide as much detail as possible for an accurate quote.</CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-5">
              <FormField label="Title" required error={errors.title}>
                <Input
                  placeholder="e.g. 500 units — M8 Hex Bolts Grade 8.8"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value)
                    if (errors.title) setErrors((p) => ({ ...p, title: undefined }))
                  }}
                  error={!!errors.title}
                />
              </FormField>

              <FormField label="Description" required error={errors.description}>
                <Textarea
                  placeholder="Include product specs, quantity, tolerances, packaging requirements, delivery address, and any other relevant details…"
                  rows={6}
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value)
                    if (errors.description) setErrors((p) => ({ ...p, description: undefined }))
                  }}
                  className={errors.description ? 'border-destructive' : ''}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {description.length} characters
                </p>
              </FormField>

              <FormField label="Needed by (optional)">
                <Input
                  type="date"
                  value={neededBy}
                  onChange={(e) => setNeededBy(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </FormField>

              {/* Attachments */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Attachments <span className="text-muted-foreground font-normal">(optional)</span>
                </label>
                <div
                  className="rounded-xl border-2 border-dashed border-border p-5 text-center cursor-pointer hover:border-primary/50 hover:bg-accent/50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload drawings, specs, or reference photos
                  </p>
                  <p className="text-xs text-muted-foreground/70 mt-1">PDF, PNG, JPEG, DXF up to 25 MB each</p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.png,.jpg,.jpeg,.dxf,.xlsx,.docx"
                  className="hidden"
                  onChange={handleFileSelect}
                />

                {attachmentNames.length > 0 && (
                  <ul className="mt-3 space-y-1.5">
                    {attachmentNames.map((name) => (
                      <li
                        key={name}
                        className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-3 py-2 text-sm"
                      >
                        <span className="flex-1 truncate">{name}</span>
                        <button
                          type="button"
                          onClick={() => removeAttachment(name)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                {attachmentNames.length === 0 && (
                  <p className="mt-2 text-xs text-muted-foreground">No files selected.</p>
                )}
              </div>

              {/* Estimated turnaround note */}
              <div className="rounded-xl bg-accent/60 border border-border px-4 py-3 text-sm text-muted-foreground">
                <strong className="text-foreground">What happens next?</strong> Our team will review
                your request and send a detailed quote within{' '}
                <span className="font-medium text-foreground">1–2 business days</span>. You'll be
                notified by email and via Chat.
              </div>
            </CardContent>

            <CardFooter className="gap-3">
              <Button type="submit" disabled={loading}>
                {loading ? 'Submitting…' : 'Submit request'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/buyer/quotes')}
                disabled={loading}
              >
                Cancel
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </PageShell>
  )
}
