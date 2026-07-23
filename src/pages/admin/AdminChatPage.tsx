import { FormEvent, useMemo, useRef, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Send, ShoppingBag, FileText, ExternalLink } from 'lucide-react'
import { PageShell, PageHeader } from '@/components/layout/PageShell'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Link } from 'react-router-dom'
import {
  adminThreads,
  adminMessages as seedMessages,
  type AdminChatMessage,
} from '@/data/admin'
import { cn } from '@/lib/utils'

const STATUS_LABEL: Record<string, string> = {
  pending: 'Pending',
  approved: 'Approved',
  rejected: 'Rejected',
  expired: 'Expired',
  confirmed: 'Confirmed',
  in_production: 'In Production',
  shipped: 'Shipped',
  in_transit: 'In Transit',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
  new: 'New',
  in_review: 'In Review',
  quoted: 'Quoted',
  closed: 'Closed',
}

const STATUS_VARIANT: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  pending: 'secondary',
  approved: 'default',
  rejected: 'destructive',
  expired: 'outline',
  confirmed: 'default',
  in_production: 'default',
  in_transit: 'default',
  delivered: 'secondary',
  shipped: 'default',
  cancelled: 'destructive',
  new: 'secondary',
  in_review: 'default',
}

export function AdminChatPage() {
  const { threadId } = useParams()
  const navigate = useNavigate()
  const activeId = threadId ?? adminThreads[0]?.id
  const active = adminThreads.find((t) => t.id === activeId) ?? adminThreads[0]

  const [localMessages, setLocalMessages] = useState<AdminChatMessage[]>(seedMessages)
  const [draft, setDraft] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  const thread = useMemo(
    () => localMessages.filter((m) => m.threadId === active?.id),
    [localMessages, active?.id]
  )

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [thread.length])

  function sendMessage(e: FormEvent) {
    e.preventDefault()
    if (!draft.trim() || !active) return
    setLocalMessages((prev) => [
      ...prev,
      {
        id: `am-${Date.now()}`,
        threadId: active.id,
        sender: 'admin',
        senderName: 'You',
        text: draft.trim(),
        at: 'Just now',
      },
    ])
    setDraft('')
  }

  return (
    <PageShell className="max-w-6xl h-[calc(100vh-3.5rem-2rem)] flex flex-col !py-4">
      <PageHeader
        title="Buyer Conversations"
        description="Chat with buyers on specific orders and quotes"
        breadcrumb={[{ label: 'Chat' }]}
        className="mb-4 shrink-0"
      />

      <Card className="flex-1 min-h-0 overflow-hidden flex flex-col md:flex-row">
        {/* Thread list */}
        <aside className="w-full md:w-80 border-b md:border-b-0 md:border-r shrink-0 flex flex-col max-h-64 md:max-h-none">
          <div className="px-3 py-2.5 border-b">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Threads
            </span>
          </div>

          <ul className="overflow-y-auto flex-1">
            {adminThreads.map((t) => (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => navigate(`/admin/chat/${t.id}`)}
                  className={cn(
                    'w-full text-left px-3 py-2.5 hover:bg-muted/50 transition-colors border-b last:border-0',
                    active?.id === t.id && 'bg-muted'
                  )}
                >
                  <div className="flex items-start gap-2.5">
                    <div className={cn(
                      'mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md',
                      t.refType === 'order' ? 'bg-blue-50 text-blue-600' : 'bg-violet-50 text-violet-600'
                    )}>
                      {t.refType === 'order'
                        ? <ShoppingBag className="h-3.5 w-3.5" />
                        : <FileText className="h-3.5 w-3.5" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <p className="text-xs font-semibold truncate">{t.refId}</p>
                        <span className="text-[10px] text-muted-foreground shrink-0">{t.lastAt}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground font-medium truncate">{t.buyerName} · {t.company}</p>
                      <p className="text-[11px] text-muted-foreground/70 truncate mt-0.5">{t.lastMessage}</p>
                    </div>
                    {t.unread > 0 && (
                      <span className="mt-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-foreground px-1 text-[9px] font-medium text-background">
                        {t.unread}
                      </span>
                    )}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Chat window */}
        <div className="flex-1 flex flex-col min-w-0 min-h-0">
          {active ? (
            <>
              {/* Thread header */}
              <div className="flex items-center gap-3 px-4 py-3 border-b shrink-0">
                <div className={cn(
                  'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
                  active.refType === 'order' ? 'bg-blue-50 text-blue-600' : 'bg-violet-50 text-violet-600'
                )}>
                  {active.refType === 'order'
                    ? <ShoppingBag className="h-4 w-4" />
                    : <FileText className="h-4 w-4" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold">{active.refId}</p>
                    <Badge variant={STATUS_VARIANT[active.status] ?? 'secondary'} className="text-[10px] h-4 px-1.5">
                      {STATUS_LABEL[active.status] ?? active.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {active.title} &middot; <span className="font-medium">{active.buyerName}</span> ({active.company})
                  </p>
                </div>
                <Link
                  to={active.refType === 'order' ? `/admin/orders/${active.refId}` : `/admin/quotes/${active.refId}`}
                  className="shrink-0"
                >
                  <Button variant="ghost" size="icon" className="h-8 w-8" title="View details">
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {thread.length === 0 && (
                  <p className="text-center text-sm text-muted-foreground py-8">
                    No messages yet for this thread.
                  </p>
                )}
                {thread.map((m) => (
                  <div
                    key={m.id}
                    className={cn('flex flex-col', m.sender === 'admin' ? 'items-end' : 'items-start')}
                  >
                    {m.senderName && (
                      <div className={cn('flex items-center gap-1.5 mb-0.5 px-1', m.sender === 'admin' && 'flex-row-reverse')}>
                        <Avatar className="h-5 w-5">
                          <AvatarFallback className="text-[8px] bg-muted-foreground/20">
                            {m.senderName.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <p className="text-[10px] text-muted-foreground">{m.senderName}</p>
                      </div>
                    )}
                    <div
                      className={cn(
                        'max-w-[80%] rounded-lg px-3 py-2 text-sm',
                        m.sender === 'admin'
                          ? 'bg-foreground text-background'
                          : 'bg-muted text-foreground'
                      )}
                    >
                      <p>{m.text}</p>
                      <p className={cn(
                        'text-[10px] mt-1',
                        m.sender === 'admin' ? 'text-background/60' : 'text-muted-foreground'
                      )}>
                        {m.at}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              {/* Compose */}
              <form onSubmit={sendMessage} className="flex items-center gap-2 border-t p-3 shrink-0">
                <Input
                  placeholder={`Reply about ${active.refId}…`}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="icon" disabled={!draft.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground">
              Select a thread to start messaging
            </div>
          )}
        </div>
      </Card>
    </PageShell>
  )
}
