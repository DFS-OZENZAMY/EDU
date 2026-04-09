"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { Activity, Users, BookOpen, Truck, ChefHat, Wallet, MessageSquare, ShieldCheck, Zap, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { getPlatformIntelligence } from "@/actions/super-admin"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts'

export default function UsageAnalyticsPage() {
  const [data, setData] = React.useState<any>(null)

  React.useEffect(() => {
    getPlatformIntelligence().then(setData)
  }, [])

  if (!data) return <div className="h-full flex items-center justify-center font-black text-slate-300 animate-pulse uppercase tracking-widest">Aggregating Module Activity...</div>

  const colors = ["#3b82f6", "#8b5cf6", "#10b981", "#ef4444", "#f59e0b", "#6366f1", "#ec4899", "#14b8a6"]

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-end gap-6 border-b border-gray-200 pb-8">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight uppercase italic">Usage Analytics</h2>
          <p className="text-slate-500 font-bold mt-1 uppercase text-xs tracking-widest">Global Module Adoption and User Activity</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         <Card className="lg:col-span-2 p-10 border-0 shadow-sm rounded-[48px] bg-white">
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-10 flex items-center gap-3">
               <Activity className="h-6 w-6 text-primary" /> Module Adoption (Number of Schools)
            </h3>
            <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.moduleAdoption}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#94a3b8'}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#94a3b8'}} />
                        <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '16px', border: 'none'}} />
                        <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={60}>
                            {data.moduleAdoption.map((entry: any, index: number) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
         </Card>

         <div className="space-y-10">
            <Card className="p-10 border-0 shadow-sm rounded-[40px] bg-white">
               <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-8 text-center italic">Platform Scale</h3>
               <div className="space-y-8">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-3xl border border-slate-100">
                     <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase">Paid Tenants</p>
                        <p className="text-xl font-black text-slate-900">{data.activeSubs}</p>
                     </div>
                     <ShieldCheck className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-3xl border border-slate-100">
                     <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase">Avg Modules / School</p>
                        <p className="text-xl font-black text-slate-900">
                            {(data.moduleAdoption.reduce((acc: any, curr: any) => acc + curr.value, 0) / (data.activeSubs || 1)).toFixed(1)}
                        </p>
                     </div>
                     <Zap className="h-6 w-6 text-amber-500" />
                  </div>
               </div>
            </Card>

            <Card className="p-10 bg-indigo-600 text-white rounded-[40px] relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12"><Zap className="h-32 w-32" /></div>
                <div className="relative z-10">
                    <h3 className="text-xl font-black uppercase tracking-tight mb-4 italic">Growth Signal</h3>
                    <div className="space-y-4">
                        <p className="text-xs font-bold text-indigo-100 leading-relaxed">
                            The platform is seeing a 24% increase in "Pédagogie & Notes" module usage this month.
                        </p>
                        <button className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/80 hover:text-white transition-colors">
                            DOWNLOAD FULL REPORT <ArrowUpRight className="h-3 w-3" />
                        </button>
                    </div>
                </div>
            </Card>
         </div>
      </div>
    </div>
  )
}
