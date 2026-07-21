import { Link } from 'react-router-dom'
import { FileQuestion } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function NotFoundPage() {
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
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
          <FileQuestion className="h-7 w-7 text-muted-foreground" />
        </div>
        <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-2">
          Error 404
        </p>
        <h1 className="text-h1 font-bold tracking-tight">Page not found</h1>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          The page you’re looking for doesn’t exist or may have been moved.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <Button asChild>
            <Link to="/login">Go to sign in</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/buyer/dashboard">Buyer dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
