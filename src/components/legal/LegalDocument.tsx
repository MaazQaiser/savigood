import type { ReactNode } from 'react'

interface LegalDocumentProps {
  title: string
  updated: string
  children: ReactNode
}

export function LegalDocument({ title, updated, children }: LegalDocumentProps) {
  return (
    <article className="prose-legal">
      <header className="mb-8 space-y-2">
        <h1 className="text-h1 font-bold tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground">Last updated {updated}</p>
      </header>
      <div className="space-y-6 text-sm leading-relaxed text-foreground/90 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-foreground [&_h2]:mt-8 [&_h2]:mb-2 [&_p]:text-muted-foreground [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ul]:text-muted-foreground [&_li]:leading-relaxed">
        {children}
      </div>
    </article>
  )
}
