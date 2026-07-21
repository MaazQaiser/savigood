import * as React from 'react'
import { cn } from '@/lib/utils'
import { Label } from './label'

interface FormFieldProps {
  label?: string
  hint?: string
  error?: string
  required?: boolean
  children: React.ReactNode
  className?: string
}

export function FormField({ label, hint, error, required, children, className }: FormFieldProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <Label>
          {label}
          {required && <span className="text-destructive ml-0.5">*</span>}
        </Label>
      )}
      {children}
      {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}

interface FormSectionProps {
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
}

export function FormSection({ title, description, children, className }: FormSectionProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {(title || description) && (
        <div className="space-y-0.5">
          {title && <h3 className="text-sm font-semibold">{title}</h3>}
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </div>
      )}
      {children}
    </div>
  )
}
