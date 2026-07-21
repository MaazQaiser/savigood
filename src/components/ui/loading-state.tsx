import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Spinner({ size = 'md', className }: SpinnerProps) {
  return (
    <Loader2
      className={cn(
        'animate-spin text-muted-foreground',
        size === 'sm' && 'h-4 w-4',
        size === 'md' && 'h-6 w-6',
        size === 'lg' && 'h-8 w-8',
        className
      )}
    />
  )
}

interface LoadingStateProps {
  label?: string
  className?: string
}

export function LoadingState({ label = 'Loading…', className }: LoadingStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 gap-3', className)}>
      <Spinner size="lg" />
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  )
}

interface PageLoadingProps {
  className?: string
}

export function PageLoading({ className }: PageLoadingProps) {
  return (
    <div className={cn('flex items-center justify-center min-h-[400px]', className)}>
      <Spinner size="lg" />
    </div>
  )
}
