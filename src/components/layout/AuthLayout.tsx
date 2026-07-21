import { Outlet, Link } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'

export function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, hsl(245 70% 96%) 0%, transparent 40%), radial-gradient(circle at 80% 0%, hsl(174 60% 94%) 0%, transparent 35%)',
        }}
      />

      <div className="relative flex flex-1 flex-col items-center justify-center px-4 py-12">
        <Link to="/login" className="mb-8 flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-soft">
            <span className="text-sm font-bold text-primary-foreground">S</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">Savi</span>
        </Link>

        <div className="w-full max-w-[400px]">
          <Outlet />
        </div>
      </div>

      <footer className="relative py-6 text-center text-xs text-muted-foreground">
        <div className="flex items-center justify-center gap-4">
          <Link to="/legal/terms" className="hover:text-foreground transition-colors">
            Terms
          </Link>
          <span aria-hidden>·</span>
          <Link to="/legal/privacy" className="hover:text-foreground transition-colors">
            Privacy
          </Link>
          <span aria-hidden>·</span>
          <Link to="/legal/msa" className="hover:text-foreground transition-colors">
            MSA
          </Link>
          <span aria-hidden>·</span>
          <span>© {new Date().getFullYear()} Savi</span>
        </div>
      </footer>

      <Toaster />
    </div>
  )
}
