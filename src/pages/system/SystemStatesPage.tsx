import { Link } from 'react-router-dom'
import { FileText, Loader2 } from 'lucide-react'
import { PageShell, PageHeader } from '@/components/layout/PageShell'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { EmptyState } from '@/components/ui/empty-state'
import { LoadingState } from '@/components/ui/loading-state'
import { ErrorState } from '@/components/ui/error-state'
import { Button } from '@/components/ui/button'

/** Reference screen for reusable empty / loading / error patterns (Phase 5). */
export function SystemStatesPage() {
  return (
    <PageShell>
      <PageHeader
        title="System States"
        description="Reusable empty, loading, and error patterns"
        breadcrumb={[{ label: 'System States' }]}
        actions={
          <Button variant="outline" size="sm" asChild>
            <Link to="/500">View 500 page</Link>
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-0 pt-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Empty State
            </p>
          </CardHeader>
          <CardContent className="px-0">
            <EmptyState
              icon={FileText}
              title="Nothing here yet"
              description="When this list is empty, this pattern is shown."
              action={{ label: 'Primary action', onClick: () => {} }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-0 pt-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Loading State
            </p>
          </CardHeader>
          <CardContent className="px-0">
            <LoadingState label="Loading data…" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-0 pt-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Error State
            </p>
          </CardHeader>
          <CardContent className="px-0">
            <ErrorState
              title="Failed to load"
              description="Inline page-level error with retry."
              onRetry={() => {}}
            />
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4">
        <CardContent className="py-8 flex flex-col items-center gap-3 text-center">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Full-page 404 and 500 screens are available at{' '}
            <Link to="/404" className="underline underline-offset-2 text-foreground">
              /404
            </Link>{' '}
            and{' '}
            <Link to="/500" className="underline underline-offset-2 text-foreground">
              /500
            </Link>
            .
          </p>
        </CardContent>
      </Card>
    </PageShell>
  )
}
