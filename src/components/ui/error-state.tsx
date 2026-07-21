import { cn } from '@/lib/utils'
import { AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from './button'

interface ErrorStateProps {
  title?: string
  description?: string
  onRetry?: () => void
  className?: string
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'An unexpected error occurred. Please try again.',
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 px-4 text-center', className)}>
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
        <AlertCircle className="h-6 w-6 text-destructive" />
      </div>
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground max-w-xs">{description}</p>
      {onRetry && (
        <Button size="sm" variant="outline" className="mt-4 gap-2" onClick={onRetry}>
          <RefreshCw className="h-3.5 w-3.5" />
          Try again
        </Button>
      )}
    </div>
  )
}

interface InlineErrorProps {
  message: string
  className?: string
}

export function InlineError({ message, className }: InlineErrorProps) {
  return (
    <div className={cn('flex items-center gap-2 text-sm text-destructive', className)}>
      <AlertCircle className="h-4 w-4 shrink-0" />
      <span>{message}</span>
    </div>
  )
}
