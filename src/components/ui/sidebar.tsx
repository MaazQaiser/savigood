import type { ElementType } from 'react'
import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  FileText,
  CreditCard,
  Package,
  MessageSquare,
  User,
  BarChart3,
  PanelLeftClose,
  Building2,
  Inbox,
  Settings,
  HelpCircle,
  FilePlus,
} from 'lucide-react'
import { Button } from './button'
import { Separator } from './separator'

interface NavItem {
  label: string
  icon: ElementType
  href: string
  badge?: number
}

interface NavSection {
  title: string
  items: NavItem[]
}

const buyerSections: NavSection[] = [
  {
    title: 'General',
    items: [
      { label: 'Dashboard', icon: LayoutDashboard, href: '/buyer/dashboard' },
      { label: 'Request Quote', icon: FilePlus, href: '/buyer/rfqs/new' },
      { label: 'Quotes', icon: FileText, href: '/buyer/quotes' },
      { label: 'Orders', icon: Package, href: '/buyer/orders' },
      { label: 'Payments', icon: CreditCard, href: '/buyer/payments' },
      { label: 'Chat', icon: MessageSquare, href: '/buyer/chat', badge: 3 },
    ],
  },
  {
    title: 'Account',
    items: [
      { label: 'Account', icon: User, href: '/buyer/account' },
    ],
  },
]

const adminSections: NavSection[] = [
  {
    title: 'General',
    items: [
      { label: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
      { label: 'Clients', icon: Building2, href: '/admin/clients' },
      { label: 'RFQs', icon: Inbox, href: '/admin/rfqs', badge: 5 },
      { label: 'Quotes', icon: FileText, href: '/admin/quotes' },
      { label: 'Orders', icon: Package, href: '/admin/orders' },
    ],
  },
  {
    title: 'Tools',
    items: [
      { label: 'Reports', icon: BarChart3, href: '/admin/reports' },
      { label: 'Chat', icon: MessageSquare, href: '/admin/chat', badge: 2 },
    ],
  },
]

interface SidebarProps {
  variant?: 'buyer' | 'admin'
  collapsed?: boolean
  onToggle?: () => void
  onNavigate?: () => void
  showCollapseToggle?: boolean
  className?: string
}

export function Sidebar({
  variant = 'buyer',
  collapsed = false,
  onToggle,
  onNavigate,
  showCollapseToggle = true,
  className,
}: SidebarProps) {
  const sections = variant === 'admin' ? adminSections : buyerSections

  return (
    <aside
      className={cn(
        'flex flex-col h-full bg-sidebar border-r border-sidebar-border transition-all duration-300',
        collapsed ? 'w-[72px]' : 'w-[260px]',
        className
      )}
    >
      {/* Brand */}
      <div
        className={cn(
          'flex items-center h-16 px-4 shrink-0 gap-2.5',
          collapsed && 'justify-center px-2'
        )}
      >
        <button
          type="button"
          onClick={collapsed ? onToggle : undefined}
          className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary shadow-soft shrink-0"
          title={collapsed ? 'Expand sidebar' : undefined}
        >
          <span className="text-sm font-bold text-primary-foreground">S</span>
        </button>
        {!collapsed && (
          <>
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-semibold tracking-tight text-foreground">Savi</p>
            </div>
            {showCollapseToggle && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggle}
                className="hidden md:inline-flex h-8 w-8 text-muted-foreground"
                title="Collapse sidebar"
              >
                <PanelLeftClose className="h-4 w-4" />
              </Button>
            )}
          </>
        )}
      </div>

      {/* Nav sections */}
      <nav className="flex-1 overflow-y-auto px-3 pb-3 space-y-5">
        {sections.map((section) => (
          <div key={section.title}>
            {!collapsed && (
              <p className="px-2.5 mb-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
                {section.title}
              </p>
            )}
            <ul className="space-y-0.5">
              {section.items.map((item) => (
                <li key={item.href}>
                  <NavItemLink item={item} collapsed={collapsed} onNavigate={onNavigate} />
                </li>
              ))}
            </ul>
          </div>
        ))}

        {!collapsed && (
          <div>
            <p className="px-2.5 mb-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
              Support
            </p>
            <ul className="space-y-0.5">
              <li>
                <NavLink
                  to={variant === 'admin' ? '/admin/dashboard' : '/buyer/account'}
                  onClick={onNavigate}
                  className="flex items-center gap-3 rounded-xl px-2.5 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground transition-colors"
                >
                  <Settings className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span>Settings</span>
                </NavLink>
              </li>
              <li>
                <a
                  href="/legal/terms"
                  className="flex items-center gap-3 rounded-xl px-2.5 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground transition-colors"
                >
                  <HelpCircle className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span>Help</span>
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Footer — user info only, no portal switcher */}
      <div className="p-3 pt-0 shrink-0">
        <Separator className="mb-3" />
        {!collapsed ? (
          <div className="flex items-center gap-2.5 rounded-xl px-2.5 py-2">
            <div
              className={cn(
                'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold text-white',
                variant === 'admin' ? 'bg-chart-2' : 'bg-primary'
              )}
            >
              {variant === 'admin' ? 'A' : 'B'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">
                {variant === 'admin' ? 'Admin Portal' : 'Buyer Portal'}
              </p>
              <p className="text-[10px] text-muted-foreground truncate">
                {variant === 'admin' ? 'Operations team' : 'My workspace'}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-lg text-[10px] font-bold text-white',
                variant === 'admin' ? 'bg-chart-2' : 'bg-primary'
              )}
            >
              {variant === 'admin' ? 'A' : 'B'}
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}

function NavItemLink({
  item,
  collapsed,
  onNavigate,
}: {
  item: NavItem
  collapsed: boolean
  onNavigate?: () => void
}) {
  return (
    <NavLink
      to={item.href}
      end={item.href.endsWith('/new') ? false : undefined}
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 rounded-xl px-2.5 py-2 text-sm transition-all',
          isActive
            ? 'bg-primary/10 text-primary font-semibold border-l-[3px] border-primary pl-[calc(0.625rem-3px)]'
            : 'text-sidebar-foreground hover:bg-sidebar-accent/80 hover:text-foreground border-l-[3px] border-transparent pl-[calc(0.625rem-3px)]',
          collapsed && 'justify-center px-0 pl-0 w-10 mx-auto border-l-0'
        )
      }
      title={collapsed ? item.label : undefined}
    >
      {({ isActive }) => (
        <>
          <item.icon
            className={cn(
              'h-4 w-4 shrink-0',
              isActive ? 'text-primary' : 'text-muted-foreground'
            )}
          />
          {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
          {!collapsed && item.badge !== undefined && (
            <span
              className={cn(
                'ml-auto flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-semibold',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground'
              )}
            >
              {item.badge}
            </span>
          )}
        </>
      )}
    </NavLink>
  )
}
