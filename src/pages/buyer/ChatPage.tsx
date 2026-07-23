import { FormEvent, useMemo, useRef, useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Send, Paperclip, ShoppingBag, FileText, ExternalLink } from 'lucide-react'
import { PageShell, PageHeader } from '@/components/layout/PageShell'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { threads, messages as seedMessages, type ChatMessage } from '@/data/buyer'
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
}

export function ChatPage() {
  const { threadId } = useParams()
  const navigate = useNavigate()
  const activeId = threadId ?? threads[0]?.id
  const active = threads.find((t) => t.id === activeId) ?? threads[0]

  const [localMessages, setLocalMessages] = useState<ChatMessage[]>(seedMessages)
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
    const msg: ChatMessage = {
      id: `m-${Date.now()}`,
      threadId: active.id,
      sender: 'buyer',
      senderName: 'You',
      text: draft.trim(),
      at: 'Just now',
    }
    setLocalMessages((prev) => [...prev, msg])
    setDraft('')
  }

  return (
    <PageShell className="max-w-6xl h-[calc(100vh-3.5rem-2rem)] flex flex-col !py-4">
      <PageHeader
        title="Chat"
        description="Message your Savi account team about a specific order or quote"
        breadcrumb={[{ label: 'Chat' }]}
        className="mb-4 shrink-0"
      />

      <Card className="flex-1 min-h-0 overflow-hidden flex flex-col md:flex-row">
        {/* Thread list */}
        <aside className="w-full md:w-72 border-b md:border-b-0 md:border-r shrink-0 flex flex-col max-h-64 md:max-h-none">
          <div className="px-3 py-2.5 border-b">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Threads
            </span>
          </div>

          <div className="px-2 pt-2 pb-1">
            <p className="text-[10px] font-medium text-muted-foreground/70 uppercase tracking-wider px-1 mb-1">
              Orders
            </p>
          </div>
          <ul className="overflow-y-auto flex-1">
            {/* Order threads */}
            {threads.filter((t) => t.refType === 'order').map((t) => (
              <ThreadItem
                key={t.id}
                thread={t}
                active={active?.id === t.id}
                onClick={() => navigate(`/buyer/chat/${t.id}`)}
              />
            ))}

            <li className="px-2 pt-3 pb-1">
              <p className="text-[10px] font-medium text-muted-foreground/70 uppercase tracking-wider px-1">
                Quotes
              </p>
            </li>

            {/* Quote threads */}
            {threads.filter((t) => t.refType === 'quote').map((t) => (
              <ThreadItem
                key={t.id}
                thread={t}
                active={active?.id === t.id}
                onClick={() => navigate(`/buyer/chat/${t.id}`)}
              />
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
                  <p className="text-xs text-muted-foreground truncate">{active.title}</p>
                </div>
                <Link
                  to={active.refType === 'order' ? `/buyer/orders/${active.refId}` : `/buyer/quotes/${active.refId}`}
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
                    No messages yet. Start the conversation below.
                  </p>
                )}
                {thread.map((m) => (
                  <div
                    key={m.id}
                    className={cn('flex flex-col', m.sender === 'buyer' ? 'items-end' : 'items-start')}
                  >
                    {m.senderName && (
                      <p className="text-[10px] text-muted-foreground mb-0.5 px-1">{m.senderName}</p>
                    )}
                    <div
                      className={cn(
                        'max-w-[80%] rounded-lg px-3 py-2 text-sm',
                        m.sender === 'buyer'
                          ? 'bg-foreground text-background'
                          : 'bg-muted text-foreground'
                      )}
                    >
                      <p>{m.text}</p>
                      <p className={cn(
                        'text-[10px] mt-1',
                        m.sender === 'buyer' ? 'text-background/60' : 'text-muted-foreground'
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
                <Button type="button" variant="ghost" size="icon" className="shrink-0" disabled>
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Input
                  placeholder={`Message about ${active.refId}…`}
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

      {!threadId && active && (
        <Link to={`/buyer/chat/${active.id}`} className="sr-only">
          Open default thread
        </Link>
      )}
    </PageShell>
  )
}

interface ThreadItemProps {
  thread: typeof threads[0]
  active: boolean
  onClick: () => void
}

function ThreadItem({ thread, active, onClick }: ThreadItemProps) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className={cn(
          'w-full text-left px-3 py-2.5 hover:bg-muted/50 transition-colors border-b last:border-0',
          active && 'bg-muted'
        )}
      >
        <div className="flex items-start gap-2.5">
          <div className={cn(
            'mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs font-bold',
            thread.refType === 'order' ? 'bg-blue-50 text-blue-600' : 'bg-violet-50 text-violet-600'
          )}>
            {thread.refType === 'order'
              ? <ShoppingBag className="h-3.5 w-3.5" />
              : <FileText className="h-3.5 w-3.5" />}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-1">
              <p className="text-xs font-semibold truncate">{thread.refId}</p>
              <span className="text-[10px] text-muted-foreground shrink-0">{thread.lastAt}</span>
            </div>
            <p className="text-[11px] text-muted-foreground truncate">{thread.title}</p>
            <p className="text-[11px] text-muted-foreground/70 truncate mt-0.5">{thread.lastMessage}</p>
          </div>
          {thread.unread > 0 && (
            <span className="mt-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-foreground px-1 text-[9px] font-medium text-background">
              {thread.unread}
            </span>
          )}
        </div>
      </button>
    </li>
  )
}
