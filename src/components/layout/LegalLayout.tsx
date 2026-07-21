import { Link, Outlet } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const legalNav = [
  { to: '/legal/terms', label: 'Terms of Service' },
  { to: '/legal/privacy', label: 'Privacy Policy' },
  { to: '/legal/msa', label: 'MSA' },
]

export function LegalLayout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b sticky top-0 z-10 bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-3xl px-4 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back
            </Link>
            <span className="text-border">|</span>
            <Link to="/login" className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-foreground">
                <span className="text-[10px] font-bold text-background">S</span>
              </div>
              <span className="text-sm font-semibold">Savi</span>
            </Link>
          </div>
          <nav className="hidden sm:flex items-center gap-4 text-xs">
            {legalNav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1 mx-auto w-full max-w-3xl px-4 py-10">
        <Outlet />
      </main>

      <footer className="border-t py-6 text-center text-xs text-muted-foreground">
        <div className="flex flex-wrap items-center justify-center gap-3 px-4">
          {legalNav.map((item, i) => (
            <span key={item.to} className="contents">
              {i > 0 && <span aria-hidden>·</span>}
              <Link to={item.to} className="hover:text-foreground transition-colors">
                {item.label}
              </Link>
            </span>
          ))}
          <span aria-hidden>·</span>
          <span>© {new Date().getFullYear()} Savi</span>
        </div>
      </footer>
    </div>
  )
}
