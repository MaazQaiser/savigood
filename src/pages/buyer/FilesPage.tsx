import { useRef, useState } from 'react'
import { FileUp, Trash2, FileText, Upload } from 'lucide-react'
import { PageShell, PageHeader } from '@/components/layout/PageShell'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { EmptyState } from '@/components/ui/empty-state'
import { files as seedFiles, type UploadedFile, formatDate } from '@/data/buyer'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

export function FilesPage() {
  const { toast } = useToast()
  const inputRef = useRef<HTMLInputElement>(null)
  const [fileList, setFileList] = useState<UploadedFile[]>(seedFiles)
  const [dragging, setDragging] = useState(false)

  function addFiles(fileListObj: FileList | null) {
    if (!fileListObj?.length) return
    const added: UploadedFile[] = Array.from(fileListObj).map((f, i) => ({
      id: `f-new-${Date.now()}-${i}`,
      name: f.name,
      size: f.size > 1024 * 1024
        ? `${(f.size / (1024 * 1024)).toFixed(1)} MB`
        : `${Math.max(1, Math.round(f.size / 1024))} KB`,
      type: f.name.split('.').pop()?.toUpperCase() ?? 'FILE',
      uploadedAt: new Date().toISOString().slice(0, 10),
      category: 'Upload',
    }))
    setFileList((prev) => [...added, ...prev])
    toast({
      variant: 'success',
      title: 'Files uploaded',
      description: `${added.length} file${added.length > 1 ? 's' : ''} added (mock).`,
    })
  }

  function removeFile(id: string) {
    setFileList((prev) => prev.filter((f) => f.id !== id))
    toast({ title: 'File removed' })
  }

  return (
    <PageShell>
      <PageHeader
        title="Files"
        description="Upload and manage documents for your orders"
        breadcrumb={[{ label: 'Files' }]}
      />

      {/* Upload zone */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">Upload Files</CardTitle>
          <CardDescription>PDF, images, or ZIP — max 25 MB each (mock)</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            role="button"
            tabIndex={0}
            onClick={() => inputRef.current?.click()}
            onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault()
              setDragging(true)
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault()
              setDragging(false)
              addFiles(e.dataTransfer.files)
            }}
            className={cn(
              'flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed px-6 py-12 cursor-pointer transition-colors',
              dragging ? 'border-foreground bg-muted/50' : 'border-border hover:bg-muted/30'
            )}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Upload className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium">Drag and drop files here</p>
              <p className="text-xs text-muted-foreground mt-1">or click to browse</p>
            </div>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="gap-1.5"
              onClick={(e) => {
                e.stopPropagation()
                inputRef.current?.click()
              }}
            >
              <FileUp className="h-3.5 w-3.5" />
              Browse files
            </Button>
            <input
              ref={inputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(e) => {
                addFiles(e.target.files)
                e.target.value = ''
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* File list */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">File List</CardTitle>
          <CardDescription>{fileList.length} document{fileList.length !== 1 ? 's' : ''}</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {fileList.length === 0 ? (
            <EmptyState
              icon={FileText}
              title="No files yet"
              description="Upload purchase orders, specs, or reference documents."
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Uploaded</TableHead>
                  <TableHead className="w-12" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {fileList.map((f) => (
                  <TableRow key={f.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span className="font-medium text-sm">{f.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{f.category}</Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{f.type}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{f.size}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(f.uploadedAt)}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => removeFile(f.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
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
