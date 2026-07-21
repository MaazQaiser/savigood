import { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormField } from '@/components/ui/form-field'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string>()
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  function validate() {
    if (!email.trim()) {
      setError('Email is required')
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email address')
      return false
    }
    setError(undefined)
    return true
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSent(true)
    }, 800)
  }

  if (sent) {
    return (
      <Card className="border shadow-sm">
        <CardHeader className="space-y-1 pb-4 text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <Mail className="h-5 w-5 text-foreground" />
          </div>
          <CardTitle className="text-xl">Check your email</CardTitle>
          <CardDescription>
            We sent a password reset link to{' '}
            <span className="font-medium text-foreground">{email}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-sm text-muted-foreground">
            Didn’t receive the email? Check your spam folder or try again.
          </p>
          <Button variant="outline" className="w-full" onClick={() => setSent(false)}>
            Try another email
          </Button>
          {/* Prototype shortcut — real app would use emailed link */}
          <Button asChild className="w-full">
            <Link to="/reset-password">Continue to reset password</Link>
          </Button>
          <div className="text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border shadow-sm">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-xl">Forgot password</CardTitle>
        <CardDescription>
          Enter your email and we’ll send you a link to reset your password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <FormField label="Email" required error={error}>
            <Input
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (error) setError(undefined)
              }}
              error={!!error}
            />
          </FormField>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Sending…' : 'Send reset link'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
