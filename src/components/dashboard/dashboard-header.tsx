"use client"
import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Menu, X, LogOut, LayoutDashboard, Users,
  GraduationCap, Calendar, BarChart3, Wallet,
  Settings, Bell, User as UserIcon
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { logout } from "@/actions/auth"

interface DashboardHeaderProps {
  user: any
  navigation: any[]
  roleLabel?: string
  roleColor?: string
}

export function DashboardHeader({ user, navigation, roleLabel, roleColor = "bg-primary" }: DashboardHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [isProfileOpen, setIsProfileOpen] = React.useState(false)
  const pathname = usePathname()
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-8 bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button
          className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-lg md:text-xl font-bold text-gray-900 truncate max-w-[200px] md:max-w-none">
          {navigation.find(n => n.href === pathname)?.name || "Tableau de bord"}
        </h1>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <button className="text-gray-500 hover:text-primary relative p-2">
          <Bell className="h-5 w-5 md:h-6 md:w-6" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full border-2 border-white" />
        </button>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 p-1 rounded-full hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-gray-900 leading-none">{user?.name || "Utilisateur"}</p>
              <p className="text-[10px] text-gray-500 mt-1 uppercase font-semibold tracking-wider">{user?.role || "Membre"}</p>
            </div>
            <div className={cn("h-8 w-8 md:h-10 md:w-10 rounded-full flex items-center justify-center text-white font-bold", roleColor)}>
              {user?.name?.charAt(0) || <UserIcon className="h-5 w-5" />}
            </div>
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in duration-150">
              <div className="px-4 py-3 border-b border-gray-50 mb-2">
                <p className="text-sm font-bold text-gray-900 truncate">{user?.name}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
              <Link href="/dashboard/profile" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors">
                <UserIcon className="h-4 w-4" /> Mon Profil
              </Link>
              <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors">
                <Settings className="h-4 w-4" /> Paramètres
              </Link>
              <div className="h-px bg-gray-50 my-2" />
              <button
                onClick={() => logout()}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
              >
                <LogOut className="h-4 w-4" /> Déconnexion
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <aside className="fixed inset-y-0 left-0 w-72 bg-white shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between h-16 px-6 border-b border-gray-100">
              <Link href="/" className="flex items-center gap-2">
                <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center text-white font-bold text-xl", roleColor)}>
                  {roleLabel?.charAt(0) || "E"}
                </div>
                <span className="text-xl font-bold text-gray-900">EDU</span>
                {roleLabel && (
                  <span className={cn("text-[10px] px-1.5 py-0.5 rounded font-bold uppercase", roleColor.replace('bg-', 'bg-') + "/10", roleColor.replace('bg-', 'text-'))}>
                    {roleLabel}
                  </span>
                )}
              </Link>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg">
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all",
                    pathname === item.href
                      ? cn(roleColor, "text-white shadow-lg")
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="p-4 border-t border-gray-100">
              <button
                onClick={() => logout()}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-600 rounded-xl hover:bg-red-50 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                Se déconnecter
              </button>
            </div>
          </aside>
        </div>
      )}
    </header>
  )
}
