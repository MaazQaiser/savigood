import { FormEvent, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { PageShell, PageHeader } from '@/components/layout/PageShell'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormField } from '@/components/ui/form-field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { clients, type ClientStatus } from '@/data/admin'
import { useToast } from '@/hooks/use-toast'

export function ClientFormPage() {
  const { clientId } = useParams()
  const isEdit = Boolean(clientId) && clientId !== 'new'
  const existing = isEdit ? clients.find((c) => c.id === clientId) : undefined
  const navigate = useNavigate()
  const { toast } = useToast()

  const [company, setCompany] = useState(existing?.company ?? '')
  const [contactName, setContactName] = useState(existing?.contactName ?? '')
  const [email, setEmail] = useState(existing?.email ?? '')
  const [phone, setPhone] = useState(existing?.phone ?? '')
  const [address, setAddress] = useState(existing?.address ?? '')
  const [city, setCity] = useState(existing?.city ?? '')
  const [country, setCountry] = useState(existing?.country ?? 'United States')
  const [status, setStatus] = useState<ClientStatus>(existing?.status ?? 'prospect')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  function validate() {
    const next: Record<string, string> = {}
    if (!company.trim()) next.company = 'Company is required'
    if (!contactName.trim()) next.contactName = 'Contact name is required'
    if (!email.trim()) next.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Enter a valid email'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast({
        variant: 'success',
        title: isEdit ? 'Client updated' : 'Client created',
        description: company,
      })
      navigate(isEdit ? `/admin/clients/${clientId}` : '/admin/clients')
    }, 600)
  }

  return (
    <PageShell className="max-w-2xl">
      <PageHeader
        title={isEdit ? 'Edit Client' : 'Add Client'}
        description={isEdit ? existing?.company : 'Create a new buyer account'}
        breadcrumb={[
          { label: 'Clients', href: '/admin/clients' },
          { label: isEdit ? 'Edit' : 'Add' },
        ]}
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Client details</CardTitle>
        </CardHeader>
        <CardContent>
          <form id="client-form" onSubmit={handleSubmit} className="space-y-4" noValidate>
            <FormField label="Company" required error={errors.company}>
              <Input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                error={!!errors.company}
              />
            </FormField>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Contact name" required error={errors.contactName}>
                <Input
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  error={!!errors.contactName}
                />
              </FormField>
              <FormField label="Status">
                <Select value={status} onValueChange={(v) => setStatus(v as ClientStatus)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="prospect">Prospect</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Email" required error={errors.email}>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!errors.email}
                />
              </FormField>
              <FormField label="Phone">
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
              </FormField>
            </div>
            <FormField label="Address">
              <Input value={address} onChange={(e) => setAddress(e.target.value)} />
            </FormField>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="City">
                <Input value={city} onChange={(e) => setCity(e.target.value)} />
              </FormField>
              <FormField label="Country">
                <Input value={country} onChange={(e) => setCountry(e.target.value)} />
              </FormField>
            </div>
          </form>
        </CardContent>
        <CardFooter className="justify-end gap-2">
          <Button variant="outline" asChild>
            <Link to={isEdit ? `/admin/clients/${clientId}` : '/admin/clients'}>Cancel</Link>
          </Button>
          <Button type="submit" form="client-form" disabled={loading}>
            {loading ? 'Saving…' : isEdit ? 'Save changes' : 'Create client'}
          </Button>
        </CardFooter>
      </Card>
    </PageShell>
  )
}
