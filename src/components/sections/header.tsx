"use client"
import * as React from "react"
import Link from "next/link"
import { Menu, X, LayoutDashboard, LogOut, ShieldCheck, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { getSessionUser, logout } from "@/actions/auth"

const navigation = [
  { name: "Avantages", href: "/#avantages" },
  { name: "SaaS Features", href: "/#modules" },
  { name: "Multi-Tenant", href: "/#interfaces" },
  { name: "Tarification", href: "/#tarifs" },
]

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [user, setUser] = React.useState<any>(null)
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    getSessionUser().then(setUser)
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-white/90 backdrop-blur-xl border-b border-slate-200 py-3 shadow-lg shadow-slate-900/5" : "bg-transparent py-6"
    )}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 rounded-2xl bg-slate-900 flex items-center justify-center text-white font-black text-xl shadow-xl shadow-slate-900/20 group-hover:scale-110 transition-transform">E</div>
            <span className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">SaaS <span className="text-primary">EDU</span></span>
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="p-2.5 text-slate-900 bg-slate-100 rounded-xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-10 items-center">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href} className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-primary transition-colors">
              {item.name}
            </Link>
          ))}
          <div className="h-1 w-1 bg-slate-300 rounded-full" />
          <Link href="/register" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-600 hover:text-emerald-700">
             <Zap className="h-3 w-3 fill-current" /> Partenaire SaaS
          </Link>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-4">
          {user ? (
            <div className="flex items-center gap-3">
              <Button variant="ghost" className="rounded-xl font-black text-[10px] uppercase tracking-widest h-12 px-6" asChild>
                <Link href="/dashboard" className="flex items-center gap-2">
                  <LayoutDashboard className="h-4 w-4" />
                  Console
                </Link>
              </Button>
              <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-black text-[10px] uppercase tracking-widest h-12 px-6 shadow-xl shadow-slate-900/10" onClick={() => logout()}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Button variant="ghost" className="rounded-xl font-black text-[10px] uppercase tracking-widest h-12 px-6 text-slate-600" asChild>
                <Link href="/login">Accès Client</Link>
              </Button>
              <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl font-black text-[10px] uppercase tracking-widest h-12 px-8 shadow-xl shadow-primary/20" asChild>
                <Link href="/register" className="flex items-center gap-2">
                    REJOINDRE <ShieldCheck className="h-4 w-4" />
                </Link>
              </Button>
            </>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-[70px] bg-white z-50 animate-in slide-in-from-top duration-300 p-6 space-y-8">
          <div className="space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-xl font-black text-slate-900 uppercase tracking-tighter hover:text-primary border-b border-slate-50 pb-4"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-4 pt-4">
            {user ? (
                <Button className="bg-primary w-full py-8 rounded-2xl font-black uppercase tracking-widest text-white shadow-xl shadow-primary/20" asChild onClick={() => setIsOpen(false)}>
                  <Link href="/dashboard">CONSOLE DE GESTION</Link>
                </Button>
            ) : (
              <>
                <Button variant="ghost" className="w-full py-8 rounded-2xl font-black uppercase tracking-widest text-slate-600 border border-slate-100" asChild onClick={() => setIsOpen(false)}>
                  <Link href="/login">ACCÈS CLIENT</Link>
                </Button>
                <Button className="bg-primary w-full py-8 rounded-2xl font-black uppercase tracking-widest text-white shadow-xl shadow-primary/20" asChild onClick={() => setIsOpen(false)}>
                  <Link href="/register">CRÉER UNE INSTANCE</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
