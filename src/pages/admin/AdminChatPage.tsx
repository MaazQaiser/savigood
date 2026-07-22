import { FormEvent, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Send } from 'lucide-react'
import { PageShell, PageHeader } from '@/components/layout/PageShell'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  adminConversations,
  adminMessages as seedMessages,
  type AdminChatMessage,
} from '@/data/admin'
import { cn } from '@/lib/utils'

export function AdminChatPage() {
  const { conversationId } = useParams()
  const navigate = useNavigate()
  const activeId = conversationId ?? adminConversations[0]?.id
  const active = adminConversations.find((c) => c.id === activeId) ?? adminConversations[0]

  const [localMessages, setLocalMessages] = useState<AdminChatMessage[]>(seedMessages)
  const [draft, setDraft] = useState('')

  const thread = useMemo(
    () => localMessages.filter((m) => m.conversationId === active?.id),
    [localMessages, active?.id]
  )

  function sendMessage(e: FormEvent) {
    e.preventDefault()
    if (!draft.trim() || !active) return
    setLocalMessages((prev) => [
      ...prev,
      {
        id: `am-${Date.now()}`,
        conversationId: active.id,
        sender: 'admin',
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
        description="Chat with buyer accounts"
        breadcrumb={[{ label: 'Chat' }]}
        className="mb-4 shrink-0"
      />

      <Card className="flex-1 min-h-0 overflow-hidden flex flex-col md:flex-row">
        <aside className="w-full md:w-72 border-b md:border-b-0 md:border-r shrink-0 flex flex-col max-h-48 md:max-h-none">
          <div className="px-3 py-2.5 border-b flex items-center justify-between gap-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Conversations
            </span>
            <span
              title="Chat threads are grouped by buyer contact, as per the signed MSA."
              className="cursor-help rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground"
            >
              By contact
            </span>
          </div>
          <ul className="overflow-y-auto flex-1">
            {adminConversations.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => navigate(`/admin/chat/${c.id}`)}
                  className={cn(
                    'w-full text-left px-3 py-3 hover:bg-muted/50 transition-colors border-b last:border-0',
                    active?.id === c.id && 'bg-muted'
                  )}
                >
                  <div className="flex items-start gap-2.5">
                    <Avatar className="h-8 w-8 mt-0.5">
                      <AvatarFallback className="text-[10px] bg-foreground text-background">
                        {c.buyerName
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium truncate">{c.buyerName}</p>
                        <span className="text-[10px] text-muted-foreground shrink-0">{c.lastAt}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{c.company}</p>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{c.lastMessage}</p>
                    </div>
                    {c.unread > 0 && (
                      <span className="mt-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-foreground px-1 text-[10px] font-medium text-background">
                        {c.unread}
                      </span>
                    )}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className="flex-1 flex flex-col min-w-0 min-h-0">
          {active ? (
            <>
              <div className="flex items-center gap-3 px-4 py-3 border-b shrink-0">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-[10px] bg-foreground text-background">
                    {active.buyerName
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{active.buyerName}</p>
                  <p className="text-xs text-muted-foreground">{active.company}</p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {thread.map((m) => (
                  <div
                    key={m.id}
                    className={cn('flex', m.sender === 'admin' ? 'justify-end' : 'justify-start')}
                  >
                    <div
                      className={cn(
                        'max-w-[80%] rounded-lg px-3 py-2 text-sm',
                        m.sender === 'admin'
                          ? 'bg-foreground text-background'
                          : 'bg-muted text-foreground'
                      )}
                    >
                      <p>{m.text}</p>
                      <p
                        className={cn(
                          'text-[10px] mt-1',
                          m.sender === 'admin' ? 'text-background/70' : 'text-muted-foreground'
                        )}
                      >
                        {m.at}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={sendMessage} className="flex items-center gap-2 border-t p-3 shrink-0">
                <Input
                  placeholder="Reply as admin…"
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
              Select a conversation
            </div>
          )}
        </div>
      </Card>
    </PageShell>
  )
}
