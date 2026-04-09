"use client"
import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LogOut,
  Bell,
  BarChart3,
  BookOpen,
  BrainCircuit,
  Calendar,
  CheckSquare,
  LayoutDashboard,
  MessageSquare,
  Users,
  Wallet,
  Truck,
  ChefHat
} from "lucide-react"
import { cn } from "@/lib/utils"
import { logout, getSessionUser } from "@/actions/auth"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { getMyRoleModules } from "@/actions/permissions"

const fullNavigation = [
  { name: "Tableau de bord", href: "/dashboard/teacher", icon: LayoutDashboard, key: "DASHBOARD" },
  { name: "Mes Classes", href: "/dashboard/teacher/classes", icon: Users, key: "SIS" },
  { name: "Saisie de Notes", href: "/dashboard/teacher/grades", icon: BarChart3, key: "LMS" },
  { name: "Appel de Présence", href: "/dashboard/teacher/attendance", icon: CheckSquare, key: "LMS" },
  { name: "Cahier de Texte", href: "/dashboard/teacher/cahier-texte", icon: BookOpen, key: "LMS" },
  { name: "Assistant IA", href: "/dashboard/teacher/ai-assistant", icon: BrainCircuit, key: "LMS" },
  { name: "Emploi du temps", href: "/dashboard/teacher/calendar", icon: Calendar, key: "LMS" },
  { name: "Communication", href: "/dashboard/teacher/messages", icon: MessageSquare, key: "MESSAGING" },
  { name: "Trésorerie", href: "/dashboard/finance", icon: Wallet, key: "FINANCE" },
  { name: "Transport", href: "/dashboard/transport", icon: Truck, key: "TRANSPORT" },
  { name: "Cantine", href: "/dashboard/canteen", icon: ChefHat, key: "CANTEEN" },
]

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [user, setUser] = React.useState<any>(null)
  const [allowedModules, setAllowedModules] = React.useState<string[]>([])

  React.useEffect(() => {
    getSessionUser().then(setUser)
    getMyRoleModules().then(setAllowedModules)
  }, [])

  const sidebarNavigation = fullNavigation.filter(item =>
    item.key === "DASHBOARD" || allowedModules.includes(item.key)
  )

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-white border-r border-gray-200">
        <div className="flex flex-col flex-1 min-h-0 overflow-y-auto">
          <div className="flex items-center h-16 px-6 border-b border-gray-200">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-black text-xl italic shadow-lg">E</div>
              <span className="text-xl font-black text-slate-900 tracking-tighter uppercase italic">SaaS <span className="text-blue-600">EDU</span></span>
              <span className="text-[9px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded-lg font-black uppercase tracking-widest">{user?.role || "STAFF"}</span>
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
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-gray-600 hover:bg-slate-100 hover:text-slate-900"
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
          roleLabel={user?.role || "STAFF"}
          roleColor="bg-slate-900"
        />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
           {children}
        </main>
      </div>
    </div>
  )
}
