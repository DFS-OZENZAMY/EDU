"use client"
import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Menu, X, LogOut, LayoutDashboard, Building2,
  CreditCard, Settings, Bell, Globe, Search, User
} from "lucide-react"
import { cn } from "@/lib/utils"
import { logout } from "@/actions/auth"

const superNavigation = [
  { name: "SaaS Overview", href: "/dashboard/super", icon: LayoutDashboard },
  { name: "Manage Schools", href: "/dashboard/super/schools", icon: Building2 },
  { name: "Subscriptions", href: "/dashboard/super/subscriptions", icon: CreditCard },
  { name: "Platform Config", href: "/dashboard/super/settings", icon: Settings },
]

export function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true)

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className={cn(
        "bg-slate-900 text-white flex flex-col transition-all duration-300",
        isSidebarOpen ? "w-64" : "w-20"
      )}>
        <div className="h-16 flex items-center px-6 border-b border-white/10 gap-3">
          <div className="h-8 w-8 bg-blue-500 rounded-lg shrink-0 flex items-center justify-center font-black text-white italic">S</div>
          {isSidebarOpen && <span className="text-xl font-black tracking-tighter">SaaS <span className="text-blue-400">EDU</span></span>}
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          {superNavigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-3 py-3 rounded-xl transition-all font-bold text-sm group",
                pathname === item.href
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {isSidebarOpen && <span>{item.name}</span>}
              {!isSidebarOpen && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                  {item.name}
                </div>
              )}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => logout()}
            className="w-full flex items-center gap-4 px-3 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all font-bold text-sm"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {isSidebarOpen && <span>Déconnexion</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-40 shadow-sm">
          <div className="flex items-center gap-4">
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
            >
                <Menu className="h-5 w-5" />
            </button>
            <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search schools, domains..."
                    className="pl-10 pr-4 py-2 bg-gray-50 border-0 rounded-xl text-sm w-80 focus:ring-2 focus:ring-blue-500/10 outline-none"
                />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="h-px w-6 bg-gray-200 rotate-90" />
            <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                    <p className="text-sm font-black text-slate-900 leading-none">Super Admin</p>
                    <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mt-1">Platform Master</p>
                </div>
                <div className="h-10 w-10 bg-slate-900 rounded-full flex items-center justify-center text-white font-black text-sm border-2 border-white shadow-md">
                    SA
                </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 bg-gray-50/50">
          {children}
        </main>
      </div>
    </div>
  )
}
