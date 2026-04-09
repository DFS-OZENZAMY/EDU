"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { PiggyBank, TrendingUp, ArrowUpRight, DollarSign, CreditCard, Calendar, Download, Filter, Search, MoreVertical, Building2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { getPlatformIntelligence } from "@/actions/super-admin"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

const dummyHistory = [
  { month: "Jan", revenue: 45000 },
  { month: "Feb", revenue: 52000 },
  { month: "Mar", revenue: 48000 },
  { month: "Apr", revenue: 61000 },
  { month: "May", revenue: 75000 },
  { month: "Jun", revenue: 89000 },
]

export default function RevenueIntelligencePage() {
  const [data, setData] = React.useState<any>(null)

  React.useEffect(() => {
    getPlatformIntelligence().then(setData)
  }, [])

  if (!data) return <div className="h-full flex items-center justify-center font-black text-slate-300 animate-pulse uppercase tracking-widest">Calculating Platform MRR...</div>

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-end gap-6 border-b border-gray-200 pb-8">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight uppercase italic">Financial Intelligence</h2>
          <p className="text-slate-500 font-bold mt-1 uppercase text-xs tracking-widest">Global MRR, Churn and Subscription Analytics</p>
        </div>
        <div className="flex gap-3">
            <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center gap-2">
                <Download className="h-4 w-4" /> EXPORT REPORT
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
              { label: "Total MRR", value: `${data.revenue.toLocaleString()} DH`, trend: "+14%", icon: DollarSign, color: "blue" },
              { label: "Gross Annual", value: `${(data.revenue * 12).toLocaleString()} DH`, trend: "+22%", icon: PiggyBank, color: "emerald" },
              { label: "Paid Subscriptions", value: data.activeSubs, trend: "+8", icon: CreditCard, color: "indigo" },
              { label: "Global ARPU", value: `${Math.round(data.revenue / (data.activeSubs || 1)).toLocaleString()} DH`, trend: "-0.4%", icon: TrendingUp, color: "red" },
          ].map((k, i) => (
              <Card key={i} className="p-8 rounded-[32px] border-0 shadow-sm flex flex-col justify-between group hover:shadow-xl transition-all bg-white relative overflow-hidden">
                 <div className="flex justify-between items-start mb-6">
                    <div className={`p-4 rounded-2xl bg-${k.color}-50 text-${k.color}-600 transition-transform group-hover:scale-110 shadow-sm`}>
                       <k.icon className="h-6 w-6" />
                    </div>
                    <span className={cn(
                        "text-[10px] font-black px-2 py-1 rounded-lg uppercase",
                        k.label === 'Global ARPU' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'
                    )}>{k.trend}</span>
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{k.label}</p>
                    <p className="text-2xl font-black text-slate-900 tracking-tighter">{k.value}</p>
                 </div>
              </Card>
          ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         <Card className="lg:col-span-2 p-10 border-0 shadow-sm rounded-[48px] bg-white">
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-10 flex items-center gap-3">
               <TrendingUp className="h-6 w-6 text-primary" /> MRR Growth Curve
            </h3>
            <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={dummyHistory}>
                        <defs>
                            <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#1e40af" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#1e40af" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#94a3b8'}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#94a3b8'}} />
                        <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}} />
                        <Area type="monotone" dataKey="revenue" stroke="#1e40af" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
         </Card>

         <div className="space-y-10">
            <Card className="p-10 border-0 shadow-sm rounded-[40px] bg-slate-900 text-white relative overflow-hidden">
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-8">Recent Payments</h3>
                <div className="space-y-6">
                   {data.recentPayments.map((sub: any, i: number) => (
                      <div key={i} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0">
                         <div className="flex items-center gap-4">
                            <div className="h-8 w-8 bg-white/10 rounded-xl flex items-center justify-center text-[10px] font-black italic">
                                {sub.school.name.charAt(0)}
                            </div>
                            <div>
                               <p className="text-xs font-black uppercase truncate w-32">{sub.school.name}</p>
                               <p className="text-[9px] font-bold text-slate-400 uppercase">{sub.tier} TIER</p>
                            </div>
                         </div>
                         <div className="text-right">
                            <p className="text-sm font-black">{sub.amount?.toLocaleString()} DH</p>
                            <p className="text-[8px] font-bold text-emerald-400 uppercase">ACTIVE</p>
                         </div>
                      </div>
                   ))}
                </div>
                <button className="w-full mt-10 py-4 bg-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all">VIEW ALL TRANSACTIONS</button>
            </Card>
         </div>
      </div>
    </div>
  )
}
