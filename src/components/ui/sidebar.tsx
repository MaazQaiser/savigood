import type { ElementType } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  FileText,
  CreditCard,
  Package,
  MessageSquare,
  Upload,
  User,
  BarChart3,
  PanelLeftClose,
  Building2,
  Inbox,
  Settings,
  HelpCircle,
  ChevronDown,
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
      { label: 'Quotes', icon: FileText, href: '/buyer/quotes' },
      { label: 'Payments', icon: CreditCard, href: '/buyer/payments' },
      { label: 'Orders', icon: Package, href: '/buyer/orders' },
      { label: 'Chat', icon: MessageSquare, href: '/buyer/chat', badge: 3 },
    ],
  },
  {
    title: 'Workspace',
    items: [
      { label: 'Files', icon: Upload, href: '/buyer/files' },
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
      { label: 'Files', icon: Upload, href: '/admin/files' },
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
  const navigate = useNavigate()
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
              <p className="px-2.5 mb-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/80">
                {section.title}
              </p>
            )}
            <ul className="space-y-0.5">
              {section.items.map((item) => (
                <li key={item.href}>
                  <NavItem item={item} collapsed={collapsed} onNavigate={onNavigate} />
                </li>
              ))}
            </ul>
          </div>
        ))}

        {!collapsed && (
          <div>
            <p className="px-2.5 mb-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/80">
              Support
            </p>
            <ul className="space-y-0.5">
              <li>
                <NavLink
                  to={variant === 'admin' ? '/admin/dashboard' : '/buyer/account'}
                  onClick={onNavigate}
                  className="flex items-center gap-3 rounded-xl px-2.5 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground transition-colors"
                >
                  <Settings className="h-4 w-4 shrink-0" />
                  <span>Settings</span>
                </NavLink>
              </li>
              <li>
                <a
                  href="/legal/terms"
                  className="flex items-center gap-3 rounded-xl px-2.5 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground transition-colors"
                >
                  <HelpCircle className="h-4 w-4 shrink-0" />
                  <span>Help</span>
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Portal switcher + footer */}
      <div className="p-3 pt-0 space-y-2 shrink-0">
        <Separator className="mb-3" />
        {!collapsed ? (
          <>
            <div className="rounded-xl border border-border bg-muted/40 p-1.5 flex gap-1">
              <button
                type="button"
                onClick={() => {
                  onNavigate?.()
                  navigate('/buyer/dashboard')
                }}
                className={cn(
                  'flex-1 rounded-lg px-2 py-1.5 text-xs font-medium transition-colors',
                  variant === 'buyer'
                    ? 'bg-card text-foreground shadow-soft'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                Buyer
              </button>
              <button
                type="button"
                onClick={() => {
                  onNavigate?.()
                  navigate('/admin/dashboard')
                }}
                className={cn(
                  'flex-1 rounded-lg px-2 py-1.5 text-xs font-medium transition-colors',
                  variant === 'admin'
                    ? 'bg-card text-foreground shadow-soft'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                Admin
              </button>
            </div>
            <div className="flex items-center gap-2.5 rounded-xl border border-border px-2.5 py-2">
              <div
                className={cn(
                  'flex h-7 w-7 items-center justify-center rounded-lg text-[10px] font-bold text-white',
                  variant === 'admin' ? 'bg-chart-2' : 'bg-primary'
                )}
              >
                {variant === 'admin' ? 'A' : 'B'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate">
                  {variant === 'admin' ? 'Admin Portal' : 'Buyer Portal'}
                </p>
                <p className="text-[10px] text-muted-foreground truncate">Switch above</p>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <button
              type="button"
              title="Buyer"
              onClick={() => navigate('/buyer/dashboard')}
              className={cn(
                'h-8 w-8 rounded-lg text-[10px] font-bold',
                variant === 'buyer' ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
              )}
            >
              B
            </button>
            <button
              type="button"
              title="Admin"
              onClick={() => navigate('/admin/dashboard')}
              className={cn(
                'h-8 w-8 rounded-lg text-[10px] font-bold',
                variant === 'admin' ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
              )}
            >
              A
            </button>
          </div>
        )}
      </div>
    </aside>
  )
}

function NavItem({
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
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 rounded-xl px-2.5 py-2 text-sm transition-colors',
          isActive
            ? 'bg-sidebar-accent text-foreground font-medium'
            : 'text-sidebar-foreground hover:bg-sidebar-accent/70 hover:text-foreground',
          collapsed && 'justify-center px-0 w-10 mx-auto'
        )
      }
      title={collapsed ? item.label : undefined}
    >
      {({ isActive }) => (
        <>
          <item.icon
            className={cn('h-4 w-4 shrink-0', isActive ? 'text-primary' : 'text-muted-foreground')}
          />
          {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
          {!collapsed && item.badge !== undefined && (
            <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-muted px-1.5 text-[11px] font-medium text-foreground">
              {item.badge}
            </span>
          )}
        </>
      )}
    </NavLink>
  )
}
