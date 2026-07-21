import { useState, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormField } from '@/components/ui/form-field'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/hooks/use-toast'

export function LoginPage() {
  const navigate = useNavigate()
  const { toast } = useToast()
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
    // Mock auth — any valid credentials succeed
    setTimeout(() => {
      setLoading(false)
      toast({
        variant: 'success',
        title: 'Signed in',
        description: 'Welcome back to Savi.',
      })
      // Route by email hint: admin@ → admin, else buyer
      if (email.toLowerCase().includes('admin')) {
        navigate('/admin/dashboard')
      } else {
        navigate('/buyer/dashboard')
      }
    }, 800)
  }

  return (
    <Card className="border shadow-sm">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-xl">Sign in</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
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
            {loading ? 'Signing in…' : 'Sign in'}
          </Button>
        </form>

        <Separator className="my-6" />

        <div className="space-y-3">
          <p className="text-center text-xs text-muted-foreground">Or enter as</p>
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => navigate('/buyer/dashboard')}
            >
              Buyer
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => navigate('/admin/dashboard')}
            >
              Admin
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
