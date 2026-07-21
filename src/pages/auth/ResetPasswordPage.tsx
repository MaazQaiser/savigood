import { useState, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormField } from '@/components/ui/form-field'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

function PasswordRule({ met, label }: { met: boolean; label: string }) {
  return (
    <li className={cn('flex items-center gap-2 text-xs', met ? 'text-foreground' : 'text-muted-foreground')}>
      {met ? (
        <Check className="h-3.5 w-3.5 text-success shrink-0" />
      ) : (
        <X className="h-3.5 w-3.5 opacity-40 shrink-0" />
      )}
      {label}
    </li>
  )
}

export function ResetPasswordPage() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [errors, setErrors] = useState<{ password?: string; confirm?: string }>({})
  const [loading, setLoading] = useState(false)

  const rules = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
  }
  const allRulesMet = rules.length && rules.upper && rules.number

  function validate() {
    const next: { password?: string; confirm?: string } = {}
    if (!password) next.password = 'Password is required'
    else if (!allRulesMet) next.password = 'Password does not meet requirements'
    if (!confirm) next.confirm = 'Please confirm your password'
    else if (password !== confirm) next.confirm = 'Passwords do not match'
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
        title: 'Password updated',
        description: 'You can now sign in with your new password.',
      })
      navigate('/login')
    }, 800)
  }

  return (
    <Card className="border shadow-sm">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-xl">Reset password</CardTitle>
        <CardDescription>Choose a new password for your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <FormField label="New password" required error={errors.password}>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (errors.password) setErrors((p) => ({ ...p, password: undefined }))
                }}
                error={!!errors.password}
                className="pr-10"
              />
              <button
                type="button"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </FormField>

          {password.length > 0 && (
            <ul className="space-y-1.5 rounded-md border bg-muted/40 px-3 py-2.5">
              <PasswordRule met={rules.length} label="At least 8 characters" />
              <PasswordRule met={rules.upper} label="One uppercase letter" />
              <PasswordRule met={rules.number} label="One number" />
            </ul>
          )}

          <FormField label="Confirm password" required error={errors.confirm}>
            <div className="relative">
              <Input
                type={showConfirm ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="••••••••"
                value={confirm}
                onChange={(e) => {
                  setConfirm(e.target.value)
                  if (errors.confirm) setErrors((p) => ({ ...p, confirm: undefined }))
                }}
                error={!!errors.confirm}
                className="pr-10"
              />
              <button
                type="button"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setShowConfirm((v) => !v)}
                tabIndex={-1}
                aria-label={showConfirm ? 'Hide password' : 'Show password'}
              >
                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </FormField>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Updating…' : 'Update password'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
