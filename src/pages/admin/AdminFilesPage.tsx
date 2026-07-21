import { useMemo, useState } from 'react'
import { FileText, Search } from 'lucide-react'
import { PageShell, PageHeader } from '@/components/layout/PageShell'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { EmptyState } from '@/components/ui/empty-state'
import { adminFiles, formatDate } from '@/data/admin'

export function AdminFilesPage() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    if (!q) return adminFiles
    return adminFiles.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.clientName.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <PageShell>
      <PageHeader
        title="Uploaded Files"
        description="Documents uploaded by buyers across all clients"
        breadcrumb={[{ label: 'Files' }]}
      />

      <Card className="mb-4">
        <CardContent className="pt-4">
          <div className="relative max-w-md">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Search by name, client, or category…"
              className="pl-8"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">All files</CardTitle>
          <CardDescription>
            {filtered.length} file{filtered.length !== 1 ? 's' : ''}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <EmptyState
              icon={FileText}
              title="No files found"
              description="Try a different search term."
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Uploaded</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((f) => (
                  <TableRow key={f.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span className="font-medium text-sm">{f.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{f.clientName}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{f.category}</Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{f.type}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{f.size}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(f.uploadedAt)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </PageShell>
  )
}
