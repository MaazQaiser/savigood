import { Link, useNavigate } from 'react-router-dom'
import { Bell, ChevronDown, Menu, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu'
import { Avatar, AvatarFallback } from './avatar'

interface HeaderProps {
  title?: string
  notificationCount?: number
  variant?: 'buyer' | 'admin'
  user?: {
    name: string
    email: string
    role?: string
  }
  onMenuToggle?: () => void
  className?: string
}

export function Header({
  title,
  notificationCount = 0,
  variant = 'buyer',
  user = { name: 'Alex Johnson', email: 'alex@company.com', role: 'Buyer' },
  onMenuToggle,
  className,
}: HeaderProps) {
  const navigate = useNavigate()
  const accountHref = variant === 'admin' ? '/admin/dashboard' : '/buyer/account'
  const chatHref = variant === 'admin' ? '/admin/chat' : '/buyer/chat'

  return (
    <header
      className={cn(
        'flex h-16 items-center gap-3 border-b border-border/80 bg-card/80 backdrop-blur-sm px-4 sm:px-6 shrink-0',
        className
      )}
    >
      <Button variant="ghost" size="icon" className="md:hidden shrink-0 rounded-xl" onClick={onMenuToggle}>
        <Menu className="h-5 w-5" />
        <span className="sr-only">Open menu</span>
      </Button>

      {title && (
        <h1 className="text-sm font-semibold text-foreground truncate hidden lg:block">{title}</h1>
      )}

      <div className="flex-1" />

      <div className="flex items-center gap-1 sm:gap-1.5 ml-auto shrink-0">
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 rounded-xl"
          onClick={() => navigate(chatHref)}
          title="Notifications"
        >
          <Bell className="h-4 w-4" />
          {notificationCount > 0 && (
            <span className="absolute top-1.5 right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-medium text-primary-foreground">
              {notificationCount > 9 ? '9+' : notificationCount}
            </span>
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-xl hidden sm:inline-flex"
          onClick={() =>
            navigate(variant === 'admin' ? '/admin/quotes/new' : '/buyer/quotes')
          }
          title="Quick action"
        >
          <Plus className="h-4 w-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2.5 rounded-xl px-1.5 py-1 hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ml-1">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs bg-primary/10 text-primary font-semibold">
                  {user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2)
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold leading-none">{user.name}</p>
                {user.role && (
                  <p className="text-[11px] text-muted-foreground mt-0.5">{user.role}</p>
                )}
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground hidden sm:block" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52 rounded-xl">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-0.5">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to={accountHref}>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="text-destructive focus:text-destructive">
              <Link to="/login">Sign out</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
