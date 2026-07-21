import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from '@/components/ui/sidebar'
import { Header } from '@/components/ui/header'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'

interface AppLayoutProps {
  variant?: 'buyer' | 'admin'
  title?: string
}

export function AppLayout({ variant = 'buyer', title }: AppLayoutProps) {
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px) and (max-width: 1023px)')
    const apply = () => setCollapsed(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-[2px] md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden
        />
      )}

      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 md:relative md:flex shadow-soft md:shadow-none',
          mobileOpen ? 'flex' : 'hidden md:flex'
        )}
      >
        <Sidebar
          variant={variant}
          collapsed={mobileOpen ? false : collapsed}
          onToggle={() => setCollapsed((v) => !v)}
          onNavigate={() => setMobileOpen(false)}
          showCollapseToggle={!mobileOpen}
        />
      </div>

      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <Header
          title={title}
          notificationCount={2}
          onMenuToggle={() => setMobileOpen((v) => !v)}
          variant={variant}
          user={
            variant === 'admin'
              ? { name: 'Sam Wilson', email: 'sam@savi.com', role: 'Admin' }
              : { name: 'Alex Johnson', email: 'alex@company.com', role: 'Buyer' }
          }
        />
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <Outlet />
        </main>
      </div>

      <Toaster />
    </div>
  )
}
