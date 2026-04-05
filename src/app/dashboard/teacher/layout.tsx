"use client"
import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Calendar,
  BarChart3,
  LogOut,
  Bell,
  CheckSquare,
  MessageSquare
} from "lucide-react"
import { cn } from "@/lib/utils"
import { logout } from "@/actions/auth"

const sidebarNavigation = [
  { name: "Tableau de bord", href: "/dashboard/teacher", icon: LayoutDashboard },
  { name: "Mes Classes", href: "/dashboard/teacher/classes", icon: Users },
  { name: "Saisie de Notes", href: "/dashboard/teacher/grades", icon: BarChart3 },
  { name: "Appel de Présence", href: "/dashboard/teacher/attendance", icon: CheckSquare },
  { name: "Mon Emploi du temps", href: "/dashboard/teacher/calendar", icon: Calendar },
  { name: "Messages Parents", href: "/dashboard/teacher/messages", icon: MessageSquare },
]

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-white border-r border-gray-200">
        <div className="flex flex-col flex-1 min-h-0 overflow-y-auto">
          <div className="flex items-center h-16 px-6 border-b border-gray-200">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-green-600 flex items-center justify-center text-white font-bold text-xl">E</div>
              <span className="text-xl font-bold text-gray-900">EDU</span>
              <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold">PROF</span>
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
                    ? "bg-green-600 text-white shadow-sm"
                    : "text-gray-600 hover:bg-green-50 hover:text-green-700"
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
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-8 bg-white border-b border-gray-200 sticky top-0 z-10">
          <h1 className="text-xl font-bold text-gray-900">
             {sidebarNavigation.find(n => n.href === pathname)?.name || "Espace Enseignant"}
          </h1>
          <div className="flex items-center gap-6">
             <button className="text-gray-500 hover:text-green-600 relative">
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full border-2 border-white" />
             </button>
             <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                   <p className="text-sm font-bold text-gray-900 leading-none">Prof. Ahmed Alaoui</p>
                   <p className="text-xs text-gray-500">Français - Primaire</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-green-50 border border-green-200 flex items-center justify-center overflow-hidden">
                   <Users className="h-6 w-6 text-green-600" />
                </div>
             </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-8">
           {children}
        </main>
      </div>
    </div>
  )
}
