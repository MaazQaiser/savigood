import { FormEvent, useState } from 'react'
import { PageShell, PageHeader } from '@/components/layout/PageShell'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormField } from '@/components/ui/form-field'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { buyerProfile } from '@/data/buyer'
import { useToast } from '@/hooks/use-toast'

export function AccountPage() {
  const { toast } = useToast()
  const [profile, setProfile] = useState(buyerProfile)
  const [saving, setSaving] = useState(false)

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [pwErrors, setPwErrors] = useState<Record<string, string>>({})
  const [pwLoading, setPwLoading] = useState(false)

  function saveProfile(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      toast({
        variant: 'success',
        title: 'Profile updated',
        description: 'Your account details have been saved.',
      })
    }, 600)
  }

  function changePassword(e: FormEvent) {
    e.preventDefault()
    const next: Record<string, string> = {}
    if (!currentPassword) next.currentPassword = 'Current password is required'
    if (newPassword.length < 8) next.newPassword = 'Must be at least 8 characters'
    if (newPassword !== confirmPassword) next.confirmPassword = 'Passwords do not match'
    setPwErrors(next)
    if (Object.keys(next).length) return

    setPwLoading(true)
    setTimeout(() => {
      setPwLoading(false)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      toast({
        variant: 'success',
        title: 'Password changed',
        description: 'Use your new password next time you sign in.',
      })
    }, 600)
  }

  return (
    <PageShell className="max-w-2xl">
      <PageHeader
        title="Account"
        description="Manage your profile and security"
        breadcrumb={[{ label: 'Account' }]}
      />

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="password">Change Password</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Profile</CardTitle>
              <CardDescription>Update how Savi contacts you</CardDescription>
            </CardHeader>
            <CardContent>
              <form id="profile-form" onSubmit={saveProfile} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Full name" required>
                    <Input
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                  </FormField>
                  <FormField label="Job title">
                    <Input
                      value={profile.jobTitle}
                      onChange={(e) => setProfile({ ...profile, jobTitle: e.target.value })}
                    />
                  </FormField>
                </div>
                <FormField label="Email" required>
                  <Input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </FormField>
                <FormField label="Phone">
                  <Input
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </FormField>
                <Separator />
                <FormField label="Company">
                  <Input
                    value={profile.company}
                    onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                  />
                </FormField>
                <FormField label="Address">
                  <Input
                    value={profile.address}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  />
                </FormField>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="City">
                    <Input
                      value={profile.city}
                      onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                    />
                  </FormField>
                  <FormField label="Country">
                    <Input
                      value={profile.country}
                      onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                    />
                  </FormField>
                </div>
              </form>
            </CardContent>
            <CardFooter className="justify-end">
              <Button type="submit" form="profile-form" disabled={saving}>
                {saving ? 'Saving…' : 'Save changes'}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Change Password</CardTitle>
              <CardDescription>Choose a strong password you don’t use elsewhere</CardDescription>
            </CardHeader>
            <CardContent>
              <form id="password-form" onSubmit={changePassword} className="space-y-4" noValidate>
                <FormField label="Current password" required error={pwErrors.currentPassword}>
                  <Input
                    type="password"
                    autoComplete="current-password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    error={!!pwErrors.currentPassword}
                  />
                </FormField>
                <FormField label="New password" required error={pwErrors.newPassword} hint="At least 8 characters">
                  <Input
                    type="password"
                    autoComplete="new-password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    error={!!pwErrors.newPassword}
                  />
                </FormField>
                <FormField label="Confirm new password" required error={pwErrors.confirmPassword}>
                  <Input
                    type="password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={!!pwErrors.confirmPassword}
                  />
                </FormField>
              </form>
            </CardContent>
            <CardFooter className="justify-end">
              <Button type="submit" form="password-form" disabled={pwLoading}>
                {pwLoading ? 'Updating…' : 'Update password'}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </PageShell>
  )
}
