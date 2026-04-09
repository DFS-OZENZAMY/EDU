"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { Building2, Users, CreditCard, Activity, Globe, ArrowUpRight, TrendingUp, AlertCircle } from "lucide-react"
import { getPlatformStats } from "@/actions/super-admin"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { cn } from "@/lib/utils"

export default function SuperAdminPage() {
  const [stats, setStats] = React.useState<any>(null)

  React.useEffect(() => {
    getPlatformStats().then(setStats)
  }, [])

  if (!stats) return <div className="h-full flex items-center justify-center font-black text-slate-400">LOADING SaaS DATA...</div>

  const kpis = [
    { name: "Total Schools", value: stats.totalSchools, icon: Building2, color: "text-blue-600", bg: "bg-blue-50" },
    { name: "Total Users", value: stats.totalUsers, icon: Users, color: "text-green-600", bg: "bg-green-50" },
    { name: "Active Subs", value: stats.activeSubscriptions, icon: CreditCard, color: "text-purple-600", bg: "bg-purple-50" },
    { name: "Global Health", value: "99.9%", icon: Activity, color: "text-emerald-600", bg: "bg-emerald-50" },
  ]

  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-end gap-6 border-b border-gray-200 pb-8">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">SaaS Console</h2>
          <p className="text-slate-500 font-bold mt-1 uppercase text-xs tracking-widest">Platform Performance Monitoring</p>
        </div>
        <div className="flex gap-3">
            <button className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-xs font-black text-slate-600 hover:bg-gray-50 transition-all flex items-center gap-2">
                <Globe className="h-4 w-4" /> REFRESH CACHE
            </button>
            <button className="bg-blue-600 px-6 py-2 rounded-xl text-xs font-black text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2">
                <Building2 className="h-4 w-4" /> ADD SCHOOL
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((stat, i) => (
          <Card key={i} className="p-6 border-0 shadow-sm rounded-2xl relative overflow-hidden group">
             <div className="flex justify-between items-start mb-4">
                <div className={`${stat.bg} ${stat.color} p-3 rounded-xl transition-transform group-hover:scale-110`}>
                   <stat.icon className="h-6 w-6" />
                </div>
                <div className="flex items-center gap-1 text-green-600 text-[10px] font-black bg-green-50 px-2 py-1 rounded-full">
                   <TrendingUp className="h-3 w-3" />
                   +12%
                </div>
             </div>
             <div>
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">{stat.name}</p>
                <p className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
             </div>
             <div className="absolute right-0 bottom-0 p-2 opacity-5">
                 <stat.icon className="h-16 w-16" />
             </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <Card className="lg:col-span-2 p-8 border-0 shadow-sm rounded-2xl min-h-[400px] flex flex-col">
            <div className="flex justify-between items-center mb-10">
               <div>
                  <h3 className="font-black text-slate-900 text-xl tracking-tight">Growth by Tier</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Subscription distribution</p>
               </div>
               <select className="text-xs font-black border-gray-100 bg-gray-50 rounded-xl px-3 py-2 outline-none">
                  <option>Last 30 Days</option>
                  <option>Last Quarter</option>
               </select>
            </div>
            <div className="flex-1 w-full h-full min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats.tierStats}>
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
                            cursor={{fill: '#f8fafc'}}
                            contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px'}}
                        />
                        <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={50}>
                             {stats.tierStats.map((entry: any, index: number) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                             ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
         </Card>

         <Card className="p-8 border-0 shadow-sm rounded-2xl flex flex-col">
            <h3 className="font-black text-slate-900 text-xl tracking-tight mb-8">System Health</h3>
            <div className="flex-1 space-y-6">
                <div className="p-4 bg-emerald-50 rounded-2xl flex gap-4">
                    <div className="h-10 w-10 bg-emerald-100 flex items-center justify-center rounded-xl text-emerald-600">
                        <Globe className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-xs font-black text-emerald-900 uppercase">API Availability</p>
                        <p className="text-lg font-black text-emerald-700">100.0% <span className="text-[10px] font-bold opacity-70 italic ml-1">Normal</span></p>
                    </div>
                </div>
                <div className="p-4 bg-blue-50 rounded-2xl flex gap-4">
                    <div className="h-10 w-10 bg-blue-100 flex items-center justify-center rounded-xl text-blue-600">
                        <Activity className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-xs font-black text-blue-900 uppercase">Server Load</p>
                        <p className="text-lg font-black text-blue-700">24.5% <span className="text-[10px] font-bold opacity-70 italic ml-1">Optimal</span></p>
                    </div>
                </div>
                <div className="p-4 bg-amber-50 rounded-2xl flex gap-4">
                    <div className="h-10 w-10 bg-amber-100 flex items-center justify-center rounded-xl text-amber-600">
                        <AlertCircle className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-xs font-black text-amber-900 uppercase">Failed Logins</p>
                        <p className="text-lg font-black text-amber-700">12 <span className="text-[10px] font-bold opacity-70 italic ml-1">Low Risk</span></p>
                    </div>
                </div>
            </div>
            <button className="w-full mt-10 py-3 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all">
                Full System Log
            </button>
         </Card>
      </div>

      <Card className="p-8 border-0 shadow-sm rounded-2xl overflow-hidden">
        <div className="flex justify-between items-center mb-8">
            <h3 className="font-black text-slate-900 text-xl tracking-tight">Recent Registrations</h3>
            <button className="text-blue-600 text-xs font-black hover:underline">View all schools</button>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b border-gray-100">
                        <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">School Name</th>
                        <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Domain</th>
                        <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Tier</th>
                        <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 text-right">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {stats.recentSchools.map((school: any) => (
                        <tr key={school.id} className="hover:bg-gray-50 transition-all group cursor-pointer">
                            <td className="py-5 px-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center font-black text-xs">{school.name.charAt(0)}</div>
                                    <span className="text-sm font-black text-slate-900">{school.name}</span>
                                </div>
                            </td>
                            <td className="py-5 px-4 text-xs font-bold text-slate-400">{school.domain || "no-domain.edu"}</td>
                            <td className="py-5 px-4">
                                <span className={cn(
                                    "text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest",
                                    school.plan === 'FREE' ? 'bg-slate-100 text-slate-500' :
                                    school.plan === 'PREMIUM' ? 'bg-purple-50 text-purple-600 border border-purple-100' :
                                    'bg-blue-50 text-blue-600 border border-blue-100'
                                )}>{school.plan}</span>
                            </td>
                            <td className="py-5 px-4 text-right">
                                <span className="h-2 w-2 bg-emerald-500 rounded-full inline-block shadow-sm shadow-emerald-500/50" />
                                <span className="ml-2 text-[10px] font-black text-emerald-600 uppercase">Active</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </Card>
    </div>
  )
}
