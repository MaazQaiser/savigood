import { useState, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, ShoppingBag, Settings2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormField } from '@/components/ui/form-field'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

type Role = 'buyer' | 'admin'

export function LoginPage() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [role, setRole] = useState<Role>('buyer')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [loading, setLoading] = useState(false)

  function validate() {
    const next: { email?: string; password?: string } = {}
    if (!email.trim()) next.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Enter a valid email address'
    if (!password) next.password = 'Password is required'
    else if (password.length < 8) next.password = 'Password must be at least 8 characters'
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
        title: 'Signed in',
        description: `Welcome back to Savi ${role === 'admin' ? 'Admin' : 'Buyer Portal'}.`,
      })
      navigate(role === 'admin' ? '/admin/dashboard' : '/buyer/dashboard')
    }, 700)
  }

  return (
    <div className="space-y-6">
      {/* Role selector — primary decision */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setRole('buyer')}
          className={cn(
            'flex flex-col items-center gap-2.5 rounded-2xl border-2 p-4 text-sm font-medium transition-all',
            role === 'buyer'
              ? 'border-primary bg-accent text-primary shadow-soft'
              : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground'
          )}
        >
          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-xl',
              role === 'buyer' ? 'bg-primary/10' : 'bg-muted'
            )}
          >
            <ShoppingBag className={cn('h-5 w-5', role === 'buyer' ? 'text-primary' : 'text-muted-foreground')} />
          </div>
          <div className="text-center">
            <p className="font-semibold">Buyer</p>
            <p className="text-[11px] font-normal text-muted-foreground mt-0.5">
              Quotes &amp; orders
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setRole('admin')}
          className={cn(
            'flex flex-col items-center gap-2.5 rounded-2xl border-2 p-4 text-sm font-medium transition-all',
            role === 'admin'
              ? 'border-primary bg-accent text-primary shadow-soft'
              : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground'
          )}
        >
          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-xl',
              role === 'admin' ? 'bg-primary/10' : 'bg-muted'
            )}
          >
            <Settings2 className={cn('h-5 w-5', role === 'admin' ? 'text-primary' : 'text-muted-foreground')} />
          </div>
          <div className="text-center">
            <p className="font-semibold">Admin</p>
            <p className="text-[11px] font-normal text-muted-foreground mt-0.5">
              Operations
            </p>
          </div>
        </button>
      </div>

      {/* Credentials */}
      <Card className="border shadow-card">
        <CardHeader className="space-y-0.5 pb-4">
          <CardTitle className="text-lg">
            Sign in as {role === 'admin' ? 'Admin' : 'Buyer'}
          </CardTitle>
          <CardDescription>
            {role === 'admin'
              ? 'Access operations, clients, and quote builder.'
              : 'Access your quotes, orders, and payments.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <FormField label="Email" required error={errors.email}>
              <Input
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (errors.email) setErrors((p) => ({ ...p, email: undefined }))
                }}
                error={!!errors.email}
              />
            </FormField>

            <FormField label="Password" required error={errors.password}>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
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

            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing in…' : `Sign in as ${role === 'admin' ? 'Admin' : 'Buyer'}`}
            </Button>
          </form>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Demo: use any email + password (8+ chars)
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
