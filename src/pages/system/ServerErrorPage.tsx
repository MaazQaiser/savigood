import { Link } from 'react-router-dom'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ServerErrorPageProps {
  onRetry?: () => void
}

export function ServerErrorPage({ onRetry }: ServerErrorPageProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="h-7 w-7 text-destructive" />
        </div>
        <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-2">
          Error 500
        </p>
        <h1 className="text-h1 font-bold tracking-tight">Something went wrong</h1>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          We hit an unexpected server error. Please try again in a moment. If the problem
          continues, contact support.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {onRetry ? (
            <Button onClick={onRetry} className="gap-1.5">
              <RefreshCw className="h-4 w-4" />
              Try again
            </Button>
          ) : (
            <Button asChild className="gap-1.5">
              <Link to="/login">
                <RefreshCw className="h-4 w-4" />
                Back to sign in
              </Link>
            </Button>
          )}
          <Button variant="outline" asChild>
            <Link to="/buyer/dashboard">Buyer dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
