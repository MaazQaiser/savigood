import { FormEvent, useMemo, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Send, Paperclip } from 'lucide-react'
import { PageShell, PageHeader } from '@/components/layout/PageShell'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { conversations, messages as seedMessages, type ChatMessage } from '@/data/buyer'
import { cn } from '@/lib/utils'

export function ChatPage() {
  const { conversationId } = useParams()
  const navigate = useNavigate()
  const activeId = conversationId ?? conversations[0]?.id
  const active = conversations.find((c) => c.id === activeId) ?? conversations[0]

  const [localMessages, setLocalMessages] = useState<ChatMessage[]>(seedMessages)
  const [draft, setDraft] = useState('')

  const thread = useMemo(
    () => localMessages.filter((m) => m.conversationId === active?.id),
    [localMessages, active?.id]
  )

  function selectConversation(id: string) {
    navigate(`/buyer/chat/${id}`)
  }

  function sendMessage(e: FormEvent) {
    e.preventDefault()
    if (!draft.trim() || !active) return
    const msg: ChatMessage = {
      id: `m-${Date.now()}`,
      conversationId: active.id,
      sender: 'buyer',
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
        description="Message your Savi account team"
        breadcrumb={[{ label: 'Chat' }]}
        className="mb-4 shrink-0"
      />

      <Card className="flex-1 min-h-0 overflow-hidden flex flex-col md:flex-row">
        {/* Conversation list */}
        <aside className="w-full md:w-72 border-b md:border-b-0 md:border-r shrink-0 flex flex-col max-h-48 md:max-h-none">
          <div className="px-3 py-2.5 border-b flex items-center justify-between gap-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Conversations
            </span>
            <span
              title="Chat is organized by your Savi contacts (account managers, support), as agreed in your MSA."
              className="cursor-help rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground"
            >
              By contact
            </span>
          </div>
          <ul className="overflow-y-auto flex-1">
            {conversations.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => selectConversation(c.id)}
                  className={cn(
                    'w-full text-left px-3 py-3 hover:bg-muted/50 transition-colors border-b last:border-0',
                    active?.id === c.id && 'bg-muted'
                  )}
                >
                  <div className="flex items-start gap-2.5">
                    <Avatar className="h-8 w-8 mt-0.5">
                      <AvatarFallback className="text-[10px] bg-foreground text-background">
                        {c.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium truncate">{c.name}</p>
                        <span className="text-[10px] text-muted-foreground shrink-0">{c.lastAt}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{c.role}</p>
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

        {/* Chat window */}
        <div className="flex-1 flex flex-col min-w-0 min-h-0">
          {active ? (
            <>
              <div className="flex items-center gap-3 px-4 py-3 border-b shrink-0">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-[10px] bg-foreground text-background">
                    {active.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{active.name}</p>
                  <p className="text-xs text-muted-foreground">{active.role}</p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {thread.length === 0 && (
                  <p className="text-center text-sm text-muted-foreground py-8">
                    No messages yet. Say hello.
                  </p>
                )}
                {thread.map((m) => (
                  <div
                    key={m.id}
                    className={cn('flex', m.sender === 'buyer' ? 'justify-end' : 'justify-start')}
                  >
                    <div
                      className={cn(
                        'max-w-[80%] rounded-lg px-3 py-2 text-sm',
                        m.sender === 'buyer'
                          ? 'bg-foreground text-background'
                          : 'bg-muted text-foreground'
                      )}
                    >
                      <p>{m.text}</p>
                      <p
                        className={cn(
                          'text-[10px] mt-1',
                          m.sender === 'buyer' ? 'text-background/70' : 'text-muted-foreground'
                        )}
                      >
                        {m.at}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={sendMessage} className="flex items-center gap-2 border-t p-3 shrink-0">
                <Button type="button" variant="ghost" size="icon" className="shrink-0" disabled>
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Type a message…"
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

      {/* Ensure deep link works when landing on /buyer/chat */}
      {!conversationId && active && (
        <Link to={`/buyer/chat/${active.id}`} className="sr-only">
          Open default chat
        </Link>
      )}
    </PageShell>
  )
}
