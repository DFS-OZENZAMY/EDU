"use client"
import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Calendar,
  BarChart3,
  Wallet,
  Settings,
  LogOut,
  Bell,
  User as UserIcon
} from "lucide-react"
import { cn } from "@/lib/utils"
import { logout, getSessionUser } from "@/actions/auth"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

const sidebarNavigation = [
  { name: "Vue d'ensemble", href: "/dashboard/overview", icon: LayoutDashboard },
  { name: "Utilisateurs", href: "/dashboard/users", icon: Users },
  { name: "Liaisons", href: "/dashboard/link-accounts", icon: GraduationCap },
  { name: "Pointage Profs", href: "/dashboard/teacher-attendance", icon: Calendar },
  { name: "Élèves", href: "/dashboard/students", icon: GraduationCap },
  { name: "Classes", href: "/dashboard/classes", icon: Users },
  { name: "Notes & Bulletins", href: "/dashboard/grades", icon: BarChart3 },
  { name: "Emploi du temps", href: "/dashboard/calendar", icon: Calendar },
  { name: "Finances", href: "/dashboard/finance", icon: Wallet },
  { name: "Mon Profil", href: "/dashboard/profile", icon: UserIcon },
  { name: "Cantine", href: "/dashboard/canteen", icon: Wallet },
  { name: "Paramètres", href: "/dashboard/settings", icon: Settings },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [user, setUser] = React.useState<any>(null)

  React.useEffect(() => {
    getSessionUser().then(setUser)
  }, [])

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-white border-r border-gray-200">
        <div className="flex flex-col flex-1 min-h-0 overflow-y-auto">
          <div className="flex items-center h-16 px-6 border-b border-gray-200">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-xl">E</div>
              <span className="text-xl font-bold text-gray-900">EDU</span>
            </Link>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-1">
            {sidebarNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  pathname === item.href
                    ? "bg-primary text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-primary"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={() => logout()}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50"
            >
              <LogOut className="h-5 w-5" />
              Déconnexion
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 md:pl-64 overflow-hidden">
        <DashboardHeader
          user={user}
          navigation={sidebarNavigation}
          roleLabel="ADMIN"
          roleColor="bg-primary"
        />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
           {children}
        </main>
      </div>
    </div>
  )
}
