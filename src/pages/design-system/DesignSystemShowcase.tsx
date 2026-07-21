import * as React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { EmptyState } from '@/components/ui/empty-state'
import { LoadingState } from '@/components/ui/loading-state'
import { ErrorState, InlineError } from '@/components/ui/error-state'
import { FormField } from '@/components/ui/form-field'
import { useToast } from '@/hooks/use-toast'
import {
  FileText,
  Package,
  Plus,
  Search,
  Download,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Clock,
  XCircle,
} from 'lucide-react'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-h3 font-semibold">{title}</h2>
        <Separator className="mt-3" />
      </div>
      {children}
    </section>
  )
}

function TokenRow({ name, value, swatch }: { name: string; value: string; swatch?: string }) {
  return (
    <div className="flex items-center gap-4 py-2.5 border-b last:border-0">
      {swatch && (
        <div
          className="h-6 w-6 rounded border border-border shrink-0"
          style={{ background: swatch }}
        />
      )}
      <code className="text-xs font-mono text-muted-foreground w-48 shrink-0">{name}</code>
      <span className="text-sm">{value}</span>
    </div>
  )
}

const sampleOrders = [
  { id: 'ORD-001', client: 'Acme Corp', amount: '$12,400', status: 'delivered', date: 'Jul 18, 2026' },
  { id: 'ORD-002', client: 'Globex Inc', amount: '$8,200', status: 'in_transit', date: 'Jul 17, 2026' },
  { id: 'ORD-003', client: 'Initech', amount: '$3,600', status: 'pending', date: 'Jul 16, 2026' },
  { id: 'ORD-004', client: 'Umbrella Co', amount: '$21,000', status: 'cancelled', date: 'Jul 15, 2026' },
]

const statusMap: Record<string, { label: string; variant: 'success' | 'default' | 'warning' | 'destructive' | 'outline' | 'secondary' }> = {
  delivered: { label: 'Delivered', variant: 'success' },
  in_transit: { label: 'In Transit', variant: 'default' },
  pending: { label: 'Pending', variant: 'warning' },
  cancelled: { label: 'Cancelled', variant: 'destructive' },
}

export function DesignSystemShowcase() {
  const { toast } = useToast()
  const [checked, setChecked] = useState(false)
  const [toggled, setToggled] = useState(false)
  const [inputError, setInputError] = useState(false)

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-14">
      {/* Page title */}
      <div>
        <Breadcrumb items={[{ label: 'Design System' }]} />
        <div className="mt-4 space-y-1">
          <h1 className="text-display">Design System</h1>
          <p className="text-muted-foreground">Phase 1 — Foundation · Savi B&W Enterprise UI</p>
        </div>
      </div>

      {/* ── Color Tokens ─────────────────────────────── */}
      <Section title="Color Tokens">
        <Card>
          <CardContent className="p-0 divide-y">
            <TokenRow name="--background" value="#FFFFFF — Page backgrounds" swatch="#FFFFFF" />
            <TokenRow name="--foreground" value="#0A0A0A — Primary text" swatch="#0A0A0A" />
            <TokenRow name="--muted" value="#F5F5F5 — Muted backgrounds" swatch="#F5F5F5" />
            <TokenRow name="--muted-foreground" value="#737373 — Secondary text" swatch="#737373" />
            <TokenRow name="--border" value="#E5E5E5 — Borders & dividers" swatch="#E5E5E5" />
            <TokenRow name="--primary" value="#171717 — Buttons & accents" swatch="#171717" />
            <TokenRow name="--destructive" value="#EF4444 — Error / delete" swatch="#EF4444" />
            <TokenRow name="--success" value="#22C55E — Success states" swatch="#22C55E" />
            <TokenRow name="--warning" value="#F59E0B — Warning states" swatch="#F59E0B" />
          </CardContent>
        </Card>
      </Section>

      {/* ── Typography ───────────────────────────────── */}
      <Section title="Typography">
        <div className="space-y-4 p-6 border rounded-lg">
          <div>
            <p className="text-xs text-muted-foreground mb-1 font-mono">display · 40px · 700</p>
            <p className="text-display leading-tight">Display Heading</p>
          </div>
          <Separator />
          <div>
            <p className="text-xs text-muted-foreground mb-1 font-mono">h1 · 32px · 700</p>
            <h1>Page Heading H1</h1>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1 font-mono">h2 · 24px · 600</p>
            <h2>Section Heading H2</h2>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1 font-mono">h3 · 20px · 600</p>
            <h3>Subsection Heading H3</h3>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1 font-mono">h4 · 18px · 600</p>
            <h4>Card Title H4</h4>
          </div>
          <Separator />
          <div>
            <p className="text-xs text-muted-foreground mb-1 font-mono">body · 14px · 400</p>
            <p>The quick brown fox jumps over the lazy dog. Body text used for paragraph content across all screens.</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1 font-mono">small · 12px · 400</p>
            <p className="text-xs text-muted-foreground">Metadata, timestamps, secondary labels, badge text, table captions.</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1 font-mono">mono · 12px · 400</p>
            <p className="font-mono text-sm">ORD-2026-00142 · TRK-94820XB · REF#00291</p>
          </div>
        </div>
      </Section>

      {/* ── Buttons ──────────────────────────────────── */}
      <Section title="Buttons">
        <Tabs defaultValue="variants">
          <TabsList>
            <TabsTrigger value="variants">Variants</TabsTrigger>
            <TabsTrigger value="sizes">Sizes</TabsTrigger>
            <TabsTrigger value="states">States</TabsTrigger>
          </TabsList>
          <TabsContent value="variants">
            <div className="flex flex-wrap gap-3 p-4 border rounded-lg">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>
          </TabsContent>
          <TabsContent value="sizes">
            <div className="flex flex-wrap items-center gap-3 p-4 border rounded-lg">
              <Button size="lg">Large</Button>
              <Button>Default</Button>
              <Button size="sm">Small</Button>
              <Button size="icon"><Plus className="h-4 w-4" /></Button>
            </div>
          </TabsContent>
          <TabsContent value="states">
            <div className="flex flex-wrap gap-3 p-4 border rounded-lg">
              <Button>Active</Button>
              <Button disabled>Disabled</Button>
              <Button variant="outline" disabled>Outline Disabled</Button>
              <Button className="gap-2"><Download className="h-4 w-4" />With Icon</Button>
            </div>
          </TabsContent>
        </Tabs>
      </Section>

      {/* ── Inputs ───────────────────────────────────── */}
      <Section title="Inputs & Form Controls">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Text Input" hint="Enter your company name">
            <Input placeholder="Acme Corporation" />
          </FormField>
          <FormField label="Search Input">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
              <Input placeholder="Search orders…" className="pl-8" />
            </div>
          </FormField>
          <FormField label="Password" hint="At least 8 characters">
            <Input type="password" placeholder="••••••••" />
          </FormField>
          <FormField label="Error State" error="This field is required">
            <Input placeholder="Required field" error={true} />
          </FormField>
          <FormField label="Disabled">
            <Input placeholder="Read-only value" disabled value="Locked content" readOnly />
          </FormField>
          <FormField label="Select">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select status…" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Textarea" className="sm:col-span-2">
            <Textarea placeholder="Add notes or comments…" rows={3} />
          </FormField>
        </div>

        {/* Checkbox & Switch */}
        <div className="flex flex-wrap gap-8 p-4 border rounded-lg mt-2">
          <div className="flex items-center gap-2">
            <Checkbox
              id="terms"
              checked={checked}
              onCheckedChange={(v) => setChecked(!!v)}
            />
            <Label htmlFor="terms" className="cursor-pointer">Accept terms</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="disabled-cb" disabled />
            <Label htmlFor="disabled-cb" className="opacity-50">Disabled</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              id="notifications"
              checked={toggled}
              onCheckedChange={setToggled}
            />
            <Label htmlFor="notifications" className="cursor-pointer">
              Notifications {toggled ? 'on' : 'off'}
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="disabled-sw" disabled />
            <Label htmlFor="disabled-sw" className="opacity-50">Disabled toggle</Label>
          </div>
        </div>
      </Section>

      {/* ── Badges ───────────────────────────────────── */}
      <Section title="Badges">
        <div className="flex flex-wrap gap-2 p-4 border rounded-lg">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="success">
            <CheckCircle2 className="mr-1 h-3 w-3" />Delivered
          </Badge>
          <Badge variant="warning">
            <Clock className="mr-1 h-3 w-3" />Pending
          </Badge>
          <Badge variant="destructive">
            <XCircle className="mr-1 h-3 w-3" />Cancelled
          </Badge>
        </div>
      </Section>

      {/* ── Cards ────────────────────────────────────── */}
      <Section title="Cards">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardDescription>Total Orders</CardDescription>
              <CardTitle className="text-2xl font-bold">142</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Active Quotes</CardDescription>
              <CardTitle className="text-2xl font-bold">8</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">2 awaiting approval</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Revenue (MTD)</CardDescription>
              <CardTitle className="text-2xl font-bold">$84,200</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Across 11 clients</p>
            </CardContent>
          </Card>
          <Card className="sm:col-span-3">
            <CardHeader>
              <CardTitle>Card with Footer</CardTitle>
              <CardDescription>This is a card with header, content, and footer sections.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Cards are used for grouping related content. They support headers with titles and descriptions, a body content area, and an optional footer for actions.
              </p>
            </CardContent>
            <CardFooter className="gap-2">
              <Button size="sm">Primary Action</Button>
              <Button size="sm" variant="outline">Cancel</Button>
            </CardFooter>
          </Card>
        </div>
      </Section>

      {/* ── Table ────────────────────────────────────── */}
      <Section title="Table">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Orders</CardTitle>
              <Button size="sm" className="gap-1.5">
                <Plus className="h-3.5 w-3.5" />New Order
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="w-12" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleOrders.map((row) => {
                  const s = statusMap[row.status]
                  return (
                    <TableRow key={row.id}>
                      <TableCell className="font-mono text-xs">{row.id}</TableCell>
                      <TableCell className="font-medium">{row.client}</TableCell>
                      <TableCell>{row.amount}</TableCell>
                      <TableCell>
                        <Badge variant={s.variant}>{s.label}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-xs">{row.date}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Section>

      {/* ── Skeleton Loading ─────────────────────────── */}
      <Section title="Skeleton / Loading">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-16 mt-1" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
          <Card className="p-4 space-y-3">
            <div className="flex items-center gap-3">
              <Skeleton className="h-9 w-9 rounded-full" />
              <div className="space-y-1.5 flex-1">
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-4/5" />
            <Skeleton className="h-3 w-3/5" />
          </Card>
        </div>
      </Section>

      {/* ── Modal ────────────────────────────────────── */}
      <Section title="Modals">
        <div className="flex flex-wrap gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Open Base Modal</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Modal Title</DialogTitle>
                <DialogDescription>
                  This is a base modal. It can contain any content including forms, tables, or informational copy.
                </DialogDescription>
              </DialogHeader>
              <p className="text-sm text-muted-foreground">Modal body content goes here. It can span multiple lines and include any React elements.</p>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Confirm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">Confirm Delete</Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-destructive shrink-0" />
                  <DialogTitle>Delete Order</DialogTitle>
                </div>
                <DialogDescription>
                  This action cannot be undone. Order ORD-001 will be permanently deleted.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button variant="destructive">Delete</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </Section>

      {/* ── Toasts ───────────────────────────────────── */}
      <Section title="Toasts">
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'Success Toast', variant: 'success' as const, title: 'Order created', description: 'ORD-005 has been created successfully.' },
            { label: 'Error Toast', variant: 'destructive' as const, title: 'Upload failed', description: 'Please check your file and try again.' },
            { label: 'Warning Toast', variant: 'warning' as const, title: 'Session expiring', description: 'Your session will expire in 5 minutes.' },
            { label: 'Default Toast', variant: 'default' as const, title: 'Copied to clipboard', description: undefined },
          ].map(({ label, variant, title, description }) => (
            <Button
              key={label}
              variant="outline"
              size="sm"
              onClick={() => toast({ variant, title, description })}
            >
              {label}
            </Button>
          ))}
        </div>
      </Section>

      {/* ── Empty / Error / Loading States ───────────── */}
      <Section title="Feedback States">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-0 pt-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Empty State</p>
            </CardHeader>
            <EmptyState
              icon={FileText}
              title="No quotes yet"
              description="Once you submit an RFQ, your quotes will appear here."
              action={{ label: 'Request a Quote', onClick: () => {} }}
            />
          </Card>
          <Card>
            <CardHeader className="pb-0 pt-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Loading State</p>
            </CardHeader>
            <LoadingState label="Loading orders…" />
          </Card>
          <Card>
            <CardHeader className="pb-0 pt-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Error State</p>
            </CardHeader>
            <ErrorState
              title="Failed to load"
              description="We couldn't fetch your data. Please try again."
              onRetry={() => {}}
            />
          </Card>
        </div>

        {/* Inline error */}
        <div className="p-4 border rounded-lg space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Inline Error</p>
          <InlineError message="Invalid email address. Please check and try again." />
          <InlineError message="Payment declined. Contact your bank or use a different card." />
        </div>
      </Section>

      {/* ── Breadcrumb ───────────────────────────────── */}
      <Section title="Breadcrumb">
        <div className="space-y-3 p-4 border rounded-lg">
          <Breadcrumb items={[{ label: 'Orders' }]} />
          <Breadcrumb items={[{ label: 'Orders', href: '/orders' }, { label: 'ORD-001' }]} />
          <Breadcrumb items={[{ label: 'Admin', href: '/admin' }, { label: 'Clients', href: '/admin/clients' }, { label: 'Acme Corp' }]} />
        </div>
      </Section>

      {/* ── Spacing & Grid ───────────────────────────── */}
      <Section title="Spacing Scale">
        <div className="space-y-2 p-4 border rounded-lg">
          {[['4px', 'w-1'], ['8px', 'w-2'], ['12px', 'w-3'], ['16px', 'w-4'], ['24px', 'w-6'], ['32px', 'w-8'], ['48px', 'w-12'], ['64px', 'w-16']].map(([label, cls]) => (
            <div key={label} className="flex items-center gap-4">
              <span className="text-xs font-mono text-muted-foreground w-10">{label}</span>
              <div className={`h-4 ${cls} bg-foreground rounded-sm`} />
            </div>
          ))}
        </div>
      </Section>

      <div className="pb-8" />
    </div>
  )
}
