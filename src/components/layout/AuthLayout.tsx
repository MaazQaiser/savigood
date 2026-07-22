import { Outlet, Link } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'

export function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      {/* Gradient wash */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 10% 10%, hsl(245 70% 96% / 0.9) 0%, transparent 45%), radial-gradient(ellipse at 90% 5%, hsl(174 60% 94% / 0.6) 0%, transparent 40%), radial-gradient(ellipse at 50% 100%, hsl(245 70% 96% / 0.4) 0%, transparent 50%)',
        }}
      />

      <div className="relative flex flex-1 flex-col items-center justify-center px-4 py-12">
        {/* Brand mark */}
        <Link to="/login" className="mb-8 flex flex-col items-center gap-3">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl shadow-soft"
            style={{
              background: 'linear-gradient(135deg, hsl(245 58% 51%) 0%, hsl(265 60% 58%) 100%)',
            }}
          >
            <span className="text-xl font-bold text-white">S</span>
          </div>
          <div className="text-center">
            <span className="text-2xl font-bold tracking-tight text-foreground">Savi</span>
            <p className="text-xs text-muted-foreground mt-0.5">Procurement Portal</p>
          </div>
        </Link>

        <div className="w-full max-w-[420px]">
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
