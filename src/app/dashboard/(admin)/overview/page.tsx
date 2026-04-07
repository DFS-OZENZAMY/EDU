"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { Users, GraduationCap, Calendar, BarChart3, TrendingUp, AlertTriangle, Bell, Zap, ArrowUpRight } from "lucide-react"
import { getAdminUsers, getAllStudents, getAllClasses } from "@/actions/data"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { cn } from "@/lib/utils"

export default function DashboardPage() {
  const [users, setUsers] = React.useState<any[]>([])
  const [students, setStudents] = React.useState<any[]>([])
  const [classes, setClasses] = React.useState<any[]>([])
  const [notifications, setNotifications] = React.useState<any[]>([])
  const [chartData, setChartData] = React.useState<any[]>([])

  React.useEffect(() => {
    getAdminUsers().then(setUsers)
    getAllStudents().then(setStudents)
    getAllClasses().then(setClasses)

    const refreshData = () => {
        import("@/actions/data").then(m => {
            m.getMyData().then((res: any) => {
                if (res?.notifications) setNotifications(res.notifications)
                if (res?.chartData) setChartData(res.chartData)
            })
        })
    }
    refreshData()
    const interval = setInterval(refreshData, 30000)
    return () => clearInterval(interval)
  }, [])

  const stats = [
    { name: "Total Élèves", value: students.length.toString(), icon: GraduationCap, color: "text-blue-600", bg: "bg-blue-50" },
    { name: "Enseignants", value: users.filter(u => u.role === 'TEACHER').length.toString(), icon: Users, color: "text-green-600", bg: "bg-green-50" },
    { name: "Classes", value: classes.length.toString(), icon: Calendar, color: "text-purple-600", bg: "bg-purple-50" },
    { name: "Parents", value: users.filter(u => u.role === 'PARENT').length.toString(), icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
  ]

  return (
    <div className="space-y-10 pb-20 animate-in fade-in duration-700">
      {/* Premium Welcome Banner */}
      <div className="relative overflow-hidden bg-slate-900 rounded-[32px] md:rounded-[40px] p-6 md:p-10 text-white shadow-2xl shadow-slate-900/20">
        <div className="absolute top-0 right-0 p-6 md:p-10 opacity-10">
            <Zap className="h-24 w-24 md:h-40 md:w-40 text-primary" />
        </div>
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 md:gap-10">
          <div>
            <h2 className="text-2xl md:text-4xl font-black tracking-tight mb-2 md:mb-3">Bonjour, Administrateur !</h2>
            <p className="text-slate-400 font-bold max-w-lg leading-relaxed text-sm md:text-base">
                Votre instance <span className="text-primary italic">SaaS EDU</span> est synchronisée.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:gap-4 w-full lg:w-auto">
             <div className="flex-1 lg:flex-none bg-white/10 px-4 py-3 md:px-6 md:py-4 rounded-xl md:rounded-[24px] backdrop-blur-md border border-white/10 text-center min-w-[100px] md:min-w-[120px] group hover:bg-white/20 transition-all">
                <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5 md:mb-1">Session</p>
                <p className="text-sm md:text-xl font-black">2026/27</p>
             </div>
             <div className="flex-1 lg:flex-none bg-primary px-4 py-3 md:px-6 md:py-4 rounded-xl md:rounded-[24px] text-center min-w-[100px] md:min-w-[120px] shadow-lg shadow-primary/20">
                <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-blue-100 mb-0.5 md:mb-1">État</p>
                <p className="text-sm md:text-xl font-black uppercase">Actif</p>
             </div>
          </div>
        </div>
      </div>

      {/* Modern Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <Card key={i} className="p-8 border-0 shadow-sm rounded-[32px] group hover:shadow-xl hover:shadow-slate-200/50 transition-all border-b-4 border-transparent hover:border-primary">
             <div className="flex justify-between items-start mb-6">
                <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl transition-transform group-hover:scale-110`}>
                   <stat.icon className="h-6 w-6" />
                </div>
                <div className="flex items-center gap-1 text-emerald-600 text-[10px] font-black bg-emerald-50 px-2 py-1 rounded-full">
                   <TrendingUp className="h-3 w-3" />
                   +2.4%
                </div>
             </div>
             <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{stat.name}</p>
                <p className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
             </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         {/* Enhanced Analytics Chart */}
         <Card className="lg:col-span-2 p-10 border-0 shadow-sm rounded-[40px] flex flex-col min-h-[450px] bg-white">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
               <div>
                  <h3 className="font-black text-slate-900 text-2xl tracking-tight">Activité Académique</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Fréquentation & Validations</p>
               </div>
               <div className="flex bg-slate-50 p-1.5 rounded-2xl gap-1">
                  <button className="px-4 py-2 bg-white text-[10px] font-black uppercase rounded-xl shadow-sm text-primary">7 JOURS</button>
                  <button className="px-4 py-2 text-[10px] font-black uppercase text-slate-400 hover:text-slate-600 transition-colors">30 JOURS</button>
               </div>
            </div>
            <div className="flex-1 w-full h-full min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}}
                        />
                        <Tooltip
                            contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '16px'}}
                        />
                        <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorVal)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
         </Card>

         {/* Modern Activity Feed */}
         <Card className="p-10 border-0 shadow-sm rounded-[40px] bg-white">
            <div className="flex justify-between items-center mb-10">
                <h3 className="font-black text-slate-900 text-xl tracking-tight">Flux d'Alertes</h3>
                <div className="h-2 w-2 bg-red-500 rounded-full animate-ping" />
            </div>
            <div className="space-y-8">
               {notifications.map((notif, i) => (
                  <div key={i} className="flex gap-5 group cursor-pointer">
                     <div className="h-12 w-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-primary/5 group-hover:border-primary/20 transition-all">
                        <Bell className="h-5 w-5 text-slate-400 group-hover:text-primary transition-colors" />
                     </div>
                     <div className="flex-1 min-w-0">
                        <p className="text-xs font-black text-slate-900 group-hover:text-primary transition-colors">{notif.title}</p>
                        <p className="text-[11px] text-slate-400 font-bold leading-relaxed mt-1 truncate">{notif.message}</p>
                        <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mt-2">{new Date(notif.createdAt).toLocaleTimeString()}</p>
                     </div>
                  </div>
               ))}
               {notifications.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-slate-300 text-xs font-black uppercase tracking-widest italic">Aucun signal détecté.</p>
                </div>
               )}
            </div>
            <button className="w-full mt-12 py-4 text-primary text-[10px] font-black uppercase tracking-[0.2em] hover:bg-blue-50 rounded-2xl transition-all border border-blue-50">
               CENTRE DE NOTIFICATIONS <ArrowUpRight className="h-3 w-3 inline-block ml-1" />
            </button>
         </Card>
      </div>
    </div>
  )
}
