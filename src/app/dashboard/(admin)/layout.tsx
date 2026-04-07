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
  CreditCard,
  ChefHat,
  BrainCircuit,
  BookOpen,
  ShieldCheck,
  Layout,
  MessageSquare
} from "lucide-react"
import { cn } from "@/lib/utils"
import { logout, getSessionUser } from "@/actions/auth"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { getSchoolModules } from "@/actions/school-config"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [user, setUser] = React.useState<any>(null)
  const [enabledModules, setEnabledModules] = React.useState<any>({})

  React.useEffect(() => {
    getSessionUser().then(setUser)
    getSchoolModules().then(setEnabledModules)
  }, [])

  const sidebarNavigation = [
    { name: "Vue d'ensemble", href: "/dashboard/overview", icon: LayoutDashboard, show: true },
    { name: "Utilisateurs", href: "/dashboard/users", icon: Users, show: true },
    { name: "Liaisons", href: "/dashboard/link-accounts", icon: GraduationCap, show: enabledModules.SIS },
    { name: "Pointage Profs", href: "/dashboard/teacher-attendance", icon: Calendar, show: true },
    { name: "Élèves", href: "/dashboard/students", icon: GraduationCap, show: enabledModules.SIS },
    { name: "Classes", href: "/dashboard/classes", icon: Users, show: enabledModules.SIS },
    { name: "Notes & Bulletins", href: "/dashboard/grades", icon: BarChart3, show: enabledModules.LMS },
    { name: "Emploi du temps", href: "/dashboard/calendar", icon: Calendar, show: enabledModules.LMS },
    { name: "Finances", href: "/dashboard/finance", icon: Wallet, show: enabledModules.FINANCE },
    { name: "Abonnement", href: "/dashboard/subscription", icon: CreditCard, show: true },
    { name: "AI Analytics", href: "/dashboard/analytics", icon: BrainCircuit, show: enabledModules.ANALYTICS },
    { name: "Bibliothèque", href: "/dashboard/library", icon: BookOpen, show: true },
    { name: "Personnel", href: "/dashboard/staff", icon: ShieldCheck, show: true },
    { name: "Cantine", href: "/dashboard/canteen", icon: ChefHat, show: enabledModules.CANTEEN },
    { name: "Modules", href: "/dashboard/settings/modules", icon: Layout, show: true },
    { name: "Paramètres", href: "/dashboard/settings", icon: Settings, show: true },
  ]

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-white border-r border-gray-100 shadow-sm">
        <div className="flex flex-col flex-1 min-h-0 overflow-y-auto">
          <div className="flex items-center h-16 px-6 border-b border-gray-100">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-2xl bg-primary flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary/20">E</div>
              <span className="text-xl font-black text-slate-900 tracking-tighter uppercase italic">SaaS <span className="text-primary">EDU</span></span>
            </Link>
          </div>
          <nav className="flex-1 px-4 py-8 space-y-1">
            {sidebarNavigation.filter(n => n.show).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-4 px-3 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all",
                  pathname === item.href
                    ? "bg-primary text-white shadow-xl shadow-primary/20"
                    : "text-slate-400 hover:bg-gray-50 hover:text-primary"
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t border-gray-100">
            <button
              onClick={() => logout()}
              className="w-full flex items-center gap-4 px-3 py-3 text-[10px] font-black uppercase tracking-widest text-red-500 rounded-xl hover:bg-red-50 transition-all"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              Déconnexion
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 md:pl-64 overflow-hidden">
        <DashboardHeader
          user={user}
          navigation={sidebarNavigation.filter(n => n.show)}
          roleLabel="ADMIN"
          roleColor="bg-primary"
        />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-10 bg-gray-50/50">
           <div className="max-w-7xl mx-auto">
             {children}
           </div>
        </main>
      </div>
    </div>
  )
}
